// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title ImpactMetricsAggregator (IMA)
 * @author Bitcoin Land Bond Team
 * @notice Tracks housing stability metrics, resident outcomes, and program ROI
 * @dev Phase 0 implementation - immutable time-series ledger
 *
 * SECURITY FEATURES:
 * - Time-series data integrity (immutable appends)
 * - Aggregated privacy (no individual resident data in reports)
 * - Role-based access control (auditors, board)
 * - Pausable for emergency scenarios
 * - Outcome verification via external oracles (future Phase 1)
 *
 * PHASE 0 SCOPE:
 * - Record program metrics (capital in, residents served, etc.)
 * - Track resident outcomes (job placement, stability, etc.)
 * - Generate aggregated impact reports
 * - Calculate ROI and social impact measures
 * - No external oracle integration (Phase 1)
 */

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract ImpactMetricsAggregator is AccessControl, Pausable {
    using SafeMath for uint256;

    // Role definitions
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");
    bytes32 public constant METRICS_RECORDER_ROLE = keccak256("METRICS_RECORDER_ROLE");
    bytes32 public constant BOARD_ROLE = keccak256("BOARD_ROLE");

    // Metric Record (immutable append-only ledger)
    struct MetricRecord {
        uint256 timestamp;
        bytes32 programId;
        string metricType;
        uint256 value;
        address recordedBy;
    }

    // Resident Outcome Record
    struct ResidentOutcome {
        uint256 timestamp;
        address resident;
        string outcomeType;
        uint256 value;
        bool verified;
    }

    // Impact Report (aggregated, never contains individual resident data)
    struct ImpactReport {
        bytes32 programId;
        uint256 reportGeneratedAt;
        uint256 totalResidentsServed;
        uint256 totalCapitalDeployed;
        uint256 averageHousingCost;
        uint256 housingStabilityRate;
        uint256 averageCostSavings;
        uint256 recidivismReduction;
        uint256 employmentRate;
        uint256 metricsCount;
    }

    // State
    MetricRecord[] public metricLedger; // Immutable ledger
    ResidentOutcome[] public outcomeHistory;
    mapping(bytes32 => MetricRecord[]) public programMetrics;
    mapping(bytes32 => ImpactReport) public latestReports;
    mapping(address => bool) public outcomeVerifiers;

    uint256 public totalMetricsRecorded;

    // Events (per ARCHITECTURE.md)
    event MetricRecorded(
        bytes32 indexed programId,
        string metricType,
        uint256 value,
        uint256 timestamp
    );
    event OutcomeRecorded(
        address indexed resident,
        string outcomeType,
        uint256 value,
        uint256 timestamp
    );
    event ImpactReportGenerated(
        bytes32 indexed programId,
        uint256 residentsServed,
        uint256 capitalDeployed
    );
    event OutcomeVerified(uint256 outcomeIndex, bool verified);

    /**
     * @notice Record metric for program
     * @param programId Program identifier
     * @param metricType Type of metric (e.g., "capital_in", "residents_served", "cost_savings")
     * @param value Metric value (wei or count)
     * @dev Requires METRICS_RECORDER_ROLE
     * @dev Immutable: metrics cannot be updated, only appended
     */
    function recordMetric(
        bytes32 programId,
        string calldata metricType,
        uint256 value
    ) external onlyRole(METRICS_RECORDER_ROLE) whenNotPaused {
        require(programId != bytes32(0), "Invalid program");
        require(bytes(metricType).length > 0, "Metric type required");

        MetricRecord memory record = MetricRecord({
            timestamp: block.timestamp,
            programId: programId,
            metricType: metricType,
            value: value,
            recordedBy: msg.sender
        });

        metricLedger.push(record);
        programMetrics[programId].push(record);
        totalMetricsRecorded = totalMetricsRecorded.add(1);

        emit MetricRecorded(programId, metricType, value, block.timestamp);
    }

    /**
     * @notice Record resident outcome
     * @param resident Resident address
     * @param outcomeType Type of outcome (e.g., "employment", "housing_stability", "reintegration")
     * @param value Outcome value (percentage, duration, etc.)
     * @dev Requires METRICS_RECORDER_ROLE
     * @dev Never exposes individual resident data in reports
     */
    function recordOutcome(
        address resident,
        string calldata outcomeType,
        uint256 value
    ) external onlyRole(METRICS_RECORDER_ROLE) whenNotPaused {
        require(resident != address(0), "Invalid resident");
        require(bytes(outcomeType).length > 0, "Outcome type required");
        require(value <= 10000, "Value out of range (0-10000)");

        outcomeHistory.push(
            ResidentOutcome({
                timestamp: block.timestamp,
                resident: resident,
                outcomeType: outcomeType,
                value: value,
                verified: false
            })
        );

        emit OutcomeRecorded(resident, outcomeType, value, block.timestamp);
    }

    /**
     * @notice Verify resident outcome (auditor confirmation)
     * @param outcomeIndex Index in outcome history
     * @param verified Whether outcome is verified
     * @dev Requires AUDITOR_ROLE
     */
    function verifyOutcome(uint256 outcomeIndex, bool verified)
        external
        onlyRole(AUDITOR_ROLE)
    {
        require(outcomeIndex < outcomeHistory.length, "Invalid outcome index");
        outcomeHistory[outcomeIndex].verified = verified;
        emit OutcomeVerified(outcomeIndex, verified);
    }

    /**
     * @notice Generate aggregated impact report for program
     * @param programId Program identifier
     * @return Impact report with aggregated metrics (no individual resident data)
     * @dev Calculates from immutable metric ledger
     */
    function generateImpactReport(bytes32 programId)
        external
        view
        returns (ImpactReport memory)
    {
        require(programId != bytes32(0), "Invalid program");

        uint256 totalResidents = 0;
        uint256 totalCapital = 0;
        uint256 totalCostSavings = 0;
        uint256 totalRecidivism = 0;
        uint256 employmentCount = 0;
        uint256 metricsProcessed = 0;

        MetricRecord[] memory records = programMetrics[programId];

        for (uint i = 0; i < records.length; i++) {
            string memory metricType = records[i].metricType;

            if (
                keccak256(bytes(metricType)) ==
                keccak256(bytes("residents_served"))
            ) {
                totalResidents = records[i].value;
            } else if (
                keccak256(bytes(metricType)) == keccak256(bytes("capital_deployed"))
            ) {
                totalCapital = records[i].value;
            } else if (
                keccak256(bytes(metricType)) == keccak256(bytes("cost_savings"))
            ) {
                totalCostSavings = totalCostSavings.add(records[i].value);
            } else if (
                keccak256(bytes(metricType)) ==
                keccak256(bytes("recidivism_reduction"))
            ) {
                totalRecidivism = records[i].value;
            } else if (
                keccak256(bytes(metricType)) == keccak256(bytes("employment"))
            ) {
                employmentCount = employmentCount.add(1);
            }

            metricsProcessed = metricsProcessed.add(1);
        }

        uint256 avgCost = totalResidents > 0
            ? totalCapital.div(totalResidents)
            : 0;
        uint256 avgSavings = totalResidents > 0
            ? totalCostSavings.div(totalResidents)
            : 0;
        uint256 empRate = totalResidents > 0
            ? employmentCount.mul(10000).div(totalResidents)
            : 0;

        ImpactReport memory report = ImpactReport({
            programId: programId,
            reportGeneratedAt: block.timestamp,
            totalResidentsServed: totalResidents,
            totalCapitalDeployed: totalCapital,
            averageHousingCost: avgCost,
            housingStabilityRate: _calculateStabilityRate(programId),
            averageCostSavings: avgSavings,
            recidivismReduction: totalRecidivism,
            employmentRate: empRate,
            metricsCount: metricsProcessed
        });

        return report;
    }

    /**
     * @notice Get housing stability rate for program
     * @param programId Program identifier
     * @return Stability rate (0-10000, representing 0-100%)
     */
    function getHousingStabilityRate(bytes32 programId) external view returns (uint256) {
        return _calculateStabilityRate(programId);
    }

    /**
     * @notice Get average cost savings across all programs
     * @return Average cost savings per resident (wei)
     */
    function getAverageCostSavings() external view returns (uint256) {
        uint256 totalSavings = 0;
        uint256 totalRecords = 0;

        for (uint i = 0; i < metricLedger.length; i++) {
            if (
                keccak256(bytes(metricLedger[i].metricType)) ==
                keccak256(bytes("cost_savings"))
            ) {
                totalSavings = totalSavings.add(metricLedger[i].value);
                totalRecords = totalRecords.add(1);
            }
        }

        return totalRecords > 0 ? totalSavings.div(totalRecords) : 0;
    }

    /**
     * @notice Get recidivism reduction rate
     * @return Recidivism reduction (0-10000, representing 0-100%)
     */
    function getRecidivismReduction() external view returns (uint256) {
        uint256 latestRecidivism = 0;

        for (uint i = metricLedger.length; i > 0; i--) {
            if (
                keccak256(bytes(metricLedger[i - 1].metricType)) ==
                keccak256(bytes("recidivism_reduction"))
            ) {
                latestRecidivism = metricLedger[i - 1].value;
                break;
            }
        }

        return latestRecidivism;
    }

    /**
     * @notice Get total metrics recorded
     * @return Number of metrics in ledger
     */
    function getTotalMetricsCount() external view returns (uint256) {
        return totalMetricsRecorded;
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

    // Internal helper functions

    /**
     * @dev Calculate housing stability rate for program
     * @param programId Program identifier
     * @return Stability rate (0-10000)
     */
    function _calculateStabilityRate(bytes32 programId) internal view returns (uint256) {
        uint256 stableResidents = 0;
        uint256 totalResidents = 0;

        for (uint i = 0; i < outcomeHistory.length; i++) {
            if (
                keccak256(bytes(outcomeHistory[i].outcomeType)) ==
                keccak256(bytes("housing_stability")) &&
                outcomeHistory[i].verified
            ) {
                if (outcomeHistory[i].value > 5000) {
                    stableResidents = stableResidents.add(1);
                }
                totalResidents = totalResidents.add(1);
            }
        }

        return
            totalResidents > 0
                ? stableResidents.mul(10000).div(totalResidents)
                : 0;
    }
}
