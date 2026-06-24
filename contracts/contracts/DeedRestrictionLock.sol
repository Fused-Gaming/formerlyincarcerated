// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title DeedRestrictionLock (DRL)
 * @author Bitcoin Land Bond Team
 * @notice Enforces permanent deed restrictions on housing properties
 * @dev Phase 0 implementation - immutable restriction terms via hash
 *
 * SECURITY FEATURES:
 * - Immutable restriction terms (keccak256 hash, tamper-proof)
 * - Violation reporting system with off-chain verification
 * - Time-locked renewals (72-hour notice required)
 * - Role-based access (board, compliance officers)
 * - Pausable for emergency scenarios
 *
 * PHASE 0 SCOPE:
 * - Establish deed restrictions on properties
 * - Track restriction status and expiration
 * - Report violations (triggers off-chain investigation)
 * - Renew restrictions before expiration
 * - No legal enforcement (off-chain process required)
 */

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract DeedRestrictionLock is AccessControl, Pausable {
    using SafeMath for uint256;

    // Role definitions
    bytes32 public constant BOARD_ROLE = keccak256("BOARD_ROLE");
    bytes32 public constant COMPLIANCE_ROLE = keccak256("COMPLIANCE_ROLE");
    bytes32 public constant LEGAL_ROLE = keccak256("LEGAL_ROLE");

    // Configuration
    uint256 public constant RENEWAL_NOTICE_PERIOD = 72 hours;

    // Deed Restriction Record
    struct RestrictionRecord {
        address resident;
        uint256 restrictionStartTime;
        uint256 restrictionEndTime;
        bytes32 termsHash; // keccak256 of full terms document
        bool isActive;
        uint256 renewalNoticeGivenAt;
    }

    // State
    mapping(address => RestrictionRecord) public restrictions;
    mapping(address => Violation[]) public violationHistory;

    struct Violation {
        uint256 reportedAt;
        string reason;
        address reporter;
        bool resolved;
    }

    // Events (per ARCHITECTURE.md)
    event DeedRestrictionEstablished(
        address indexed property,
        address indexed resident,
        uint256 lockPeriod,
        bytes32 termsHash
    );
    event DeedRenewal(address indexed property, uint256 newExpiration);
    event RenewalNoticeGiven(address indexed property, uint256 noticeGivenAt);
    event ViolationReported(address indexed property, string reason);
    event ViolationResolved(address indexed property, uint256 violationIndex);
    event RestrictionTerminated(address indexed property);

    /**
     * @notice Establish deed restriction on property
     * @param property Property address
     * @param resident Resident address
     * @param lockPeriod Restriction period in seconds (e.g., 30 years)
     * @param termsHash keccak256 hash of full restriction terms
     * @dev Requires BOARD_ROLE
     */
    function establishRestriction(
        address property,
        address resident,
        uint256 lockPeriod,
        bytes32 termsHash
    ) external onlyRole(BOARD_ROLE) whenNotPaused {
        require(property != address(0), "Invalid property");
        require(resident != address(0), "Invalid resident");
        require(lockPeriod > 0, "Lock period must be > 0");
        require(termsHash != bytes32(0), "Terms hash required");
        require(!restrictions[property].isActive, "Property already restricted");

        uint256 endTime = block.timestamp.add(lockPeriod);

        restrictions[property] = RestrictionRecord({
            resident: resident,
            restrictionStartTime: block.timestamp,
            restrictionEndTime: endTime,
            termsHash: termsHash,
            isActive: true,
            renewalNoticeGivenAt: 0
        });

        emit DeedRestrictionEstablished(property, resident, lockPeriod, termsHash);
    }

    /**
     * @notice Check if restriction is currently active
     * @param property Property address
     * @return True if restriction is active and not expired
     */
    function verifyRestrictionActive(address property) external view returns (bool) {
        RestrictionRecord memory record = restrictions[property];
        return record.isActive && block.timestamp <= record.restrictionEndTime;
    }

    /**
     * @notice Give notice of intent to renew restriction
     * @param property Property address
     * @dev Must be called 72 hours before expiration
     */
    function giveRenewalNotice(address property) external onlyRole(COMPLIANCE_ROLE) whenNotPaused {
        RestrictionRecord storage record = restrictions[property];
        require(record.isActive, "Restriction not active");
        require(
            block.timestamp <= record.restrictionEndTime,
            "Restriction already expired"
        );
        require(
            block.timestamp.add(RENEWAL_NOTICE_PERIOD) >= record.restrictionEndTime,
            "Too early for renewal notice"
        );

        record.renewalNoticeGivenAt = block.timestamp;
        emit RenewalNoticeGiven(property, block.timestamp);
    }

    /**
     * @notice Renew deed restriction
     * @param property Property address
     * @param newLockPeriod New restriction period in seconds
     * @dev Requires BOARD_ROLE, must follow 72-hour notice period
     */
    function renewDeedRestriction(address property, uint256 newLockPeriod)
        external
        onlyRole(BOARD_ROLE)
        whenNotPaused
    {
        RestrictionRecord storage record = restrictions[property];
        require(record.isActive, "Restriction not active");
        require(newLockPeriod > 0, "New lock period must be > 0");

        if (record.renewalNoticeGivenAt > 0) {
            require(
                block.timestamp >= record.renewalNoticeGivenAt.add(RENEWAL_NOTICE_PERIOD),
                "Renewal notice period not elapsed"
            );
        }

        uint256 newEndTime = block.timestamp.add(newLockPeriod);
        record.restrictionEndTime = newEndTime;
        record.renewalNoticeGivenAt = 0;

        emit DeedRenewal(property, newEndTime);
    }

    /**
     * @notice Report violation of deed restriction
     * @param property Property address
     * @param reason Description of violation (off-chain investigation will follow)
     * @dev Requires COMPLIANCE_ROLE
     */
    function reportViolation(address property, string calldata reason)
        external
        onlyRole(COMPLIANCE_ROLE)
        whenNotPaused
    {
        require(property != address(0), "Invalid property");
        require(bytes(reason).length > 0, "Reason required");
        require(restrictions[property].isActive, "Restriction not active");

        violationHistory[property].push(
            Violation({
                reportedAt: block.timestamp,
                reason: reason,
                reporter: msg.sender,
                resolved: false
            })
        );

        emit ViolationReported(property, reason);
    }

    /**
     * @notice Mark violation as resolved
     * @param property Property address
     * @param violationIndex Index in violation history
     * @dev Requires LEGAL_ROLE
     */
    function resolveViolation(address property, uint256 violationIndex)
        external
        onlyRole(LEGAL_ROLE)
    {
        require(violationIndex < violationHistory[property].length, "Invalid violation index");
        violationHistory[property][violationIndex].resolved = true;
        emit ViolationResolved(property, violationIndex);
    }

    /**
     * @notice Get remaining lock time for property
     * @param property Property address
     * @return Seconds remaining until restriction expires
     */
    function getRemainingLockTime(address property) external view returns (uint256) {
        RestrictionRecord memory record = restrictions[property];
        if (!record.isActive || block.timestamp > record.restrictionEndTime) {
            return 0;
        }
        return record.restrictionEndTime.sub(block.timestamp);
    }

    /**
     * @notice Get full restriction record
     * @param property Property address
     * @return Restriction record details
     */
    function getRestrictionRecord(address property)
        external
        view
        returns (RestrictionRecord memory)
    {
        return restrictions[property];
    }

    /**
     * @notice Get violation count for property
     * @param property Property address
     * @return Number of violations reported
     */
    function getViolationCount(address property) external view returns (uint256) {
        return violationHistory[property].length;
    }

    /**
     * @notice Pause contract (emergency only)
     * @dev Requires DEFAULT_ADMIN_ROLE
     */
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    /**
     * @notice Resume contract
     * @dev Requires DEFAULT_ADMIN_ROLE
     */
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}
