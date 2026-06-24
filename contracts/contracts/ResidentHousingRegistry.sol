// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title ResidentHousingRegistry (RHR)
 * @author Bitcoin Land Bond Team
 * @notice Maintains resident records, allocation history, and compliance tracking
 * @dev Phase 0 implementation - minimal on-chain data (privacy-preserving)
 *
 * SECURITY FEATURES:
 * - Privacy-preserving design (only core fields on-chain)
 * - Compliance audit trail immutable
 * - Role-based access control (board, case workers, auditors)
 * - Pausable for emergency scenarios
 * - Support services tracking (off-chain linkage)
 *
 * PHASE 0 SCOPE:
 * - Register residents in program
 * - Track housing allocation
 * - Record compliance check results
 * - Maintain allocation history
 * - No PII storage (encrypted off-chain)
 */

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract ResidentHousingRegistry is AccessControl, Pausable {
    using SafeMath for uint256;

    // Role definitions
    bytes32 public constant BOARD_ROLE = keccak256("BOARD_ROLE");
    bytes32 public constant CASE_WORKER_ROLE = keccak256("CASE_WORKER_ROLE");
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");

    // Resident Record (minimal on-chain footprint)
    struct ResidentRecord {
        address residentAddress;
        bytes32 programId;
        address propertyAddress;
        uint256 registrationTime;
        string status; // "active", "completed", "suspended", "exited"
        uint256 complianceCheckCount;
        uint256 lastComplianceCheckTime;
        bool eligible;
    }

    // Allocation History Entry
    struct AllocationHistoryEntry {
        uint256 timestamp;
        address propertyAddress;
        uint256 allocationAmount;
        string allocationReason;
    }

    // Compliance Check Record
    struct ComplianceCheck {
        uint256 timestamp;
        bool passed;
        string notes;
        address checkedBy;
    }

    // State
    mapping(address => ResidentRecord) public residents;
    mapping(address => AllocationHistoryEntry[]) public allocationHistory;
    mapping(address => ComplianceCheck[]) public complianceHistory;
    mapping(bytes32 => address[]) public programResidents;
    mapping(address => string[]) public supportServices;

    uint256 public totalResidentsRegistered;

    // Events (per ARCHITECTURE.md)
    event ResidentRegistered(
        address indexed resident,
        bytes32 programId,
        address propertyAddress,
        uint256 registrationTime
    );
    event ResidentStatusUpdated(address indexed resident, string newStatus);
    event ComplianceCheckPerformed(address indexed resident, bool passed);
    event AllocationRecorded(
        address indexed resident,
        address propertyAddress,
        uint256 amount
    );
    event SupportServiceAdded(address indexed resident, string service);

    /**
     * @notice Register resident in housing program
     * @param resident Resident address
     * @param programId Program identifier (keccak256 hash)
     * @param propertyAddress Initial housing property address
     * @dev Requires CASE_WORKER_ROLE
     */
    function registerResident(
        address resident,
        bytes32 programId,
        address propertyAddress
    ) external onlyRole(CASE_WORKER_ROLE) whenNotPaused {
        require(resident != address(0), "Invalid resident");
        require(programId != bytes32(0), "Invalid program");
        require(propertyAddress != address(0), "Invalid property");
        require(residents[resident].registrationTime == 0, "Resident already registered");

        residents[resident] = ResidentRecord({
            residentAddress: resident,
            programId: programId,
            propertyAddress: propertyAddress,
            registrationTime: block.timestamp,
            status: "active",
            complianceCheckCount: 0,
            lastComplianceCheckTime: 0,
            eligible: true
        });

        programResidents[programId].push(resident);
        totalResidentsRegistered = totalResidentsRegistered.add(1);

        emit ResidentRegistered(resident, programId, propertyAddress, block.timestamp);
    }

    /**
     * @notice Update resident status
     * @param resident Resident address
     * @param newStatus New status string ("active", "completed", "suspended", "exited")
     * @dev Requires CASE_WORKER_ROLE
     */
    function updateResidentStatus(address resident, string calldata newStatus)
        external
        onlyRole(CASE_WORKER_ROLE)
        whenNotPaused
    {
        require(residents[resident].registrationTime != 0, "Resident not found");
        require(bytes(newStatus).length > 0, "Status required");

        residents[resident].status = newStatus;
        emit ResidentStatusUpdated(resident, newStatus);
    }

    /**
     * @notice Perform compliance check
     * @param resident Resident address
     * @param passed Whether compliance check passed
     * @param notes Additional notes (off-chain details reference)
     * @return Compliance check passed
     * @dev Requires CASE_WORKER_ROLE
     */
    function performComplianceCheck(
        address resident,
        bool passed,
        string calldata notes
    ) external onlyRole(CASE_WORKER_ROLE) whenNotPaused returns (bool) {
        require(residents[resident].registrationTime != 0, "Resident not found");

        complianceHistory[resident].push(
            ComplianceCheck({
                timestamp: block.timestamp,
                passed: passed,
                notes: notes,
                checkedBy: msg.sender
            })
        );

        residents[resident].complianceCheckCount = residents[resident].complianceCheckCount.add(1);
        residents[resident].lastComplianceCheckTime = block.timestamp;

        emit ComplianceCheckPerformed(resident, passed);
        return passed;
    }

    /**
     * @notice Record housing allocation
     * @param resident Resident address
     * @param propertyAddress Property allocated to
     * @param amount Allocation amount (in wei or as index)
     * @param reason Allocation reason (program phase, renewal, etc.)
     * @dev Requires CASE_WORKER_ROLE
     */
    function recordAllocation(
        address resident,
        address propertyAddress,
        uint256 amount,
        string calldata reason
    ) external onlyRole(CASE_WORKER_ROLE) whenNotPaused {
        require(residents[resident].registrationTime != 0, "Resident not found");
        require(propertyAddress != address(0), "Invalid property");

        allocationHistory[resident].push(
            AllocationHistoryEntry({
                timestamp: block.timestamp,
                propertyAddress: propertyAddress,
                allocationAmount: amount,
                allocationReason: reason
            })
        );

        residents[resident].propertyAddress = propertyAddress;
        emit AllocationRecorded(resident, propertyAddress, amount);
    }

    /**
     * @notice Add support service for resident
     * @param resident Resident address
     * @param service Support service description (job training, mental health, etc.)
     * @dev Requires CASE_WORKER_ROLE
     */
    function addSupportService(address resident, string calldata service)
        external
        onlyRole(CASE_WORKER_ROLE)
        whenNotPaused
    {
        require(residents[resident].registrationTime != 0, "Resident not found");
        require(bytes(service).length > 0, "Service required");

        supportServices[resident].push(service);
        emit SupportServiceAdded(resident, service);
    }

    /**
     * @notice Get resident record
     * @param resident Resident address
     * @return Resident record
     */
    function getResidentRecord(address resident)
        external
        view
        returns (ResidentRecord memory)
    {
        require(residents[resident].registrationTime != 0, "Resident not found");
        return residents[resident];
    }

    /**
     * @notice Get allocation history for resident
     * @param resident Resident address
     * @return Array of allocation history entries
     */
    function getResidentHistory(address resident)
        external
        view
        returns (AllocationHistoryEntry[] memory)
    {
        require(residents[resident].registrationTime != 0, "Resident not found");
        return allocationHistory[resident];
    }

    /**
     * @notice Check allocation eligibility
     * @param resident Resident address
     * @return True if resident eligible for new allocation
     */
    function checkAllocationEligibility(address resident) external view returns (bool) {
        ResidentRecord memory record = residents[resident];
        if (record.registrationTime == 0) return false;
        if (!record.eligible) return false;
        if (bytes(record.status).length == 0) return false;

        // Eligible if status is "active" and last compliance check passed
        ComplianceCheck[] memory checks = complianceHistory[resident];
        if (checks.length == 0) return false;

        return checks[checks.length - 1].passed;
    }

    /**
     * @notice Get support services for resident
     * @param resident Resident address
     * @return Array of support services
     */
    function getSupportServices(address resident)
        external
        view
        returns (string[] memory)
    {
        require(residents[resident].registrationTime != 0, "Resident not found");
        return supportServices[resident];
    }

    /**
     * @notice Get residents in program
     * @param programId Program identifier
     * @return Array of resident addresses
     */
    function getProgramResidents(bytes32 programId)
        external
        view
        returns (address[] memory)
    {
        return programResidents[programId];
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
