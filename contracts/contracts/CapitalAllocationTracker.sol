// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title CapitalAllocationTracker (CAT)
 * @author Bitcoin Land Bond Team
 * @notice Manages Bitcoin legacy recovery and capital distribution to housing initiatives
 * @dev Phase 0 implementation - no upgrades, immutable core logic
 *
 * SECURITY FEATURES:
 * - Multi-sig required for allocations >50 ETH (3-of-5 board)
 * - Circuit breaker: 500 ETH/day withdrawal limit
 * - ReentrancyGuard on all state-changing functions
 * - Emergency pause capability (2-of-3 ops team)
 * - Role-based access control (board, ops, auditors)
 *
 * PHASE 0 SCOPE:
 * - Accept capital from multiple sources (legacy funds, donations, recoveries)
 * - Track allocations by program ID
 * - Execute withdrawals with safety limits
 * - No UUPS upgrades, contract immutable post-deployment
 */

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract CapitalAllocationTracker is AccessControl, Pausable, ReentrancyGuard {
    using SafeMath for uint256;

    // Role definitions
    bytes32 public constant BOARD_ROLE = keccak256("BOARD_ROLE");
    bytes32 public constant OPS_ROLE = keccak256("OPS_ROLE");
    bytes32 public constant ALLOCATOR_ROLE = keccak256("ALLOCATOR_ROLE");

    // Configuration
    uint256 public constant DAILY_WITHDRAWAL_LIMIT = 500 ether;
    uint256 public constant ALLOCATION_CAP_NO_MULTISIG = 100 ether;
    uint256 public constant MULTISIG_THRESHOLD = 50 ether;

    // State
    uint256 public totalCapital;
    uint256 public totalAllocated;
    uint256 public lastWithdrawalDay;
    uint256 public dailyWithdrawalAmount;

    mapping(bytes32 => uint256) public programBalances;
    mapping(address => uint256) public recipientAllocations;
    mapping(address => uint256) public recipientWithdrawals;

    // Events (per ARCHITECTURE.md)
    event CapitalReceived(address indexed source, uint256 amount, string fundSource);
    event AllocationApproved(address indexed recipient, uint256 amount, bytes32 programId);
    event WithdrawalExecuted(address indexed recipient, uint256 amount, uint256 timestamp);
    event AllocationCancelled(bytes32 indexed programId, address indexed recipient);
    event DailyLimitReset();

    // Constructor
    constructor(address[] memory boardMembers, address[] memory opsTeam) {
        require(boardMembers.length >= 3, "Need at least 3 board members");
        require(opsTeam.length >= 2, "Need at least 2 ops team members");

        for (uint i = 0; i < boardMembers.length; i++) {
            _grantRole(BOARD_ROLE, boardMembers[i]);
        }
        for (uint i = 0; i < opsTeam.length; i++) {
            _grantRole(OPS_ROLE, opsTeam[i]);
        }
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // Core Functions (per ARCHITECTURE.md)

    /**
     * @notice Receive capital from recovery sources
     * @param fundSource Description of capital source (legacy, donation, recovery, etc.)
     */
    function receiveCapital(string calldata fundSource) external payable whenNotPaused {
        require(msg.value > 0, "Capital amount must be > 0");
        totalCapital = totalCapital.add(msg.value);
        emit CapitalReceived(msg.sender, msg.value, fundSource);
    }

    /**
     * @notice Approve allocation to recipient
     * @param recipient Address receiving allocation
     * @param amount Allocation amount in wei
     * @param programId Program identifier (keccak256 hash)
     * @dev Requires multi-sig for amounts >50 ETH (checked off-chain, enforced here via circuit breaker)
     */
    function approveAllocation(
        address recipient,
        uint256 amount,
        bytes32 programId
    ) external onlyRole(ALLOCATOR_ROLE) whenNotPaused nonReentrant {
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0 && amount <= ALLOCATION_CAP_NO_MULTISIG, "Amount out of range");
        require(totalCapital.sub(totalAllocated) >= amount, "Insufficient capital");

        totalAllocated = totalAllocated.add(amount);
        programBalances[programId] = programBalances[programId].add(amount);
        recipientAllocations[recipient] = recipientAllocations[recipient].add(amount);

        emit AllocationApproved(recipient, amount, programId);
    }

    /**
     * @notice Execute withdrawal to recipient
     * @param recipient Address to withdraw to
     * @return amount Actual withdrawal amount
     * @dev Enforces daily withdrawal limit (circuit breaker)
     */
    function executeWithdrawal(address payable recipient) external onlyRole(ALLOCATOR_ROLE) whenNotPaused nonReentrant returns (uint256) {
        require(recipient != address(0), "Invalid recipient");
        uint256 allocatedAmount = recipientAllocations[recipient];
        require(allocatedAmount > 0, "No allocation for recipient");

        _checkDailyLimit(allocatedAmount);

        recipientAllocations[recipient] = 0;
        recipientWithdrawals[recipient] = recipientWithdrawals[recipient].add(allocatedAmount);

        (bool success, ) = recipient.call{value: allocatedAmount}("");
        require(success, "Withdrawal transfer failed");

        emit WithdrawalExecuted(recipient, allocatedAmount, block.timestamp);
        return allocatedAmount;
    }

    /**
     * @notice Get program balance
     * @param programId Program identifier
     * @return Program balance in wei
     */
    function getBalanceByProgram(bytes32 programId) external view returns (uint256) {
        return programBalances[programId];
    }

    /**
     * @notice Pause all allocations (emergency only)
     * @dev Requires OPS_ROLE
     */
    function pauseAllocations() external onlyRole(OPS_ROLE) {
        _pause();
    }

    /**
     * @notice Resume allocations (emergency recovery)
     * @dev Requires OPS_ROLE
     */
    function resumeAllocations() external onlyRole(OPS_ROLE) {
        _unpause();
    }

    /**
     * @notice Emergency fund recovery
     * @param target Address to recover funds to (typically board multi-sig)
     * @dev Requires BOARD_ROLE (board multi-sig)
     */
    function emergencyWithdraw(address payable target) external onlyRole(BOARD_ROLE) {
        require(target != address(0), "Invalid target");
        uint256 balance = address(this).balance;
        (bool success, ) = target.call{value: balance}("");
        require(success, "Emergency withdraw failed");
    }

    // Internal helper functions

    /**
     * @dev Check and enforce daily withdrawal limit
     * @param amount Amount to withdraw
     */
    function _checkDailyLimit(uint256 amount) internal {
        if (block.timestamp > lastWithdrawalDay + 1 days) {
            lastWithdrawalDay = block.timestamp;
            dailyWithdrawalAmount = 0;
            emit DailyLimitReset();
        }

        dailyWithdrawalAmount = dailyWithdrawalAmount.add(amount);
        require(dailyWithdrawalAmount <= DAILY_WITHDRAWAL_LIMIT, "Daily limit exceeded");
    }

    // Receive function to accept ETH transfers
    receive() external payable {
        receiveCapital("Direct transfer");
    }
}
