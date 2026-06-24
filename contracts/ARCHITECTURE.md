# Bitcoin Land Bond Smart Contract Architecture

## Phase 0 Overview

Bitcoin Land Bond leverages four core contracts to manage criminal asset recovery, deed restrictions, housing allocation, and impact metrics.

## Contract Specifications

### 1. Capital Allocation Tracker (CAT)
**Purpose:** Manages Bitcoin legacy recovery and capital distribution to housing initiatives.

**Key Functions:**
```solidity
// Contract Events & Core Functions
event CapitalReceived(address indexed source, uint256 amount, string fundSource);
event AllocationApproved(address indexed recipient, uint256 amount, bytes32 programId);
event WithdrawalExecuted(address indexed recipient, uint256 amount, uint256 timestamp);

function receiveCapital(string calldata fundSource) external payable;
function approveAllocation(address recipient, uint256 amount, bytes32 programId) external;
function executeWithdrawal(address recipient) external returns (uint256);
function getBalanceByProgram(bytes32 programId) external view returns (uint256);
function pauseAllocations() external;
function emergencyWithdraw(address payable target) external;
```

**Security:**
- Multi-sig required for allocations >50 ETH
- Circuit breaker on daily withdrawal limits
- Emergency pause functionality

### 2. Deed Restriction Lock (DRL)
**Purpose:** Enforces permanent deed restrictions on housing properties.

**Key Functions:**
```solidity
event DeedRestrictionEstablished(
    address indexed property,
    address indexed resident,
    uint256 lockPeriod,
    bytes32 termsHash
);
event DeedRenewal(address indexed property, uint256 newExpiration);
event ViolationReported(address indexed property, string reason);

function establishRestriction(
    address property,
    address resident,
    uint256 lockPeriod,
    bytes32 termsHash
) external;
function verifyRestrictionActive(address property) external view returns (bool);
function renewDeedRestriction(address property) external;
function reportViolation(address property, string calldata reason) external;
function getRemainingLockTime(address property) external view returns (uint256);
```

**Security:**
- Immutable restriction terms (hash-based)
- Violation reporting system
- Time-locked renewals (72 hour notice)

### 3. Resident Housing Registry (RHR)
**Purpose:** Maintains resident records, allocation history, and compliance tracking.

**Key Functions:**
```solidity
event ResidentRegistered(
    address indexed resident,
    bytes32 programId,
    address propertyAddress,
    uint256 registrationTime
);
event ResidentStatusUpdated(address indexed resident, string newStatus);
event ComplianceCheckPerformed(address indexed resident, bool passed);

function registerResident(
    address resident,
    bytes32 programId,
    address propertyAddress
) external;
function updateResidentStatus(address resident, string calldata newStatus) external;
function performComplianceCheck(address resident) external returns (bool);
function getResidentHistory(address resident) external view returns (ResidentRecord[] memory);
function checkAllocationEligibility(address resident) external view returns (bool);
function getSupportServices(address resident) external view returns (string[] memory);
```

**Security:**
- Privacy-preserving resident data (only core fields on-chain)
- Compliance audit trail
- Role-based access control

### 4. Impact Metrics Aggregator (IMA)
**Purpose:** Tracks housing stability metrics, resident outcomes, and program ROI.

**Key Functions:**
```solidity
event MetricRecorded(
    bytes32 indexed programId,
    string metricType,
    uint256 value,
    uint256 timestamp
);
event ImpactReportGenerated(bytes32 indexed programId, uint256 residents, uint256 savings);

function recordMetric(bytes32 programId, string calldata metricType, uint256 value) external;
function recordOutcome(
    address resident,
    string calldata outcomeType,
    uint256 value
) external;
function generateImpactReport(bytes32 programId) external view returns (ImpactReport memory);
function getHousingStabilityRate(bytes32 programId) external view returns (uint256);
function getAverageCostSavings() external view returns (uint256);
function getRecidivismReduction() external view returns (uint256);
```

**Security:**
- Time-series data integrity
- Aggregated privacy (never individual resident data in reports)
- Immutable metric ledger

## Security Architecture

### Multi-Signature Requirements
- Allocations >50 ETH: 3-of-5 multi-sig board approval
- Contract upgrades: 4-of-5 board approval
- Emergency actions: 2-of-3 ops team authorization

### Circuit Breakers
- Daily capital withdrawal limit: 500 ETH
- Single allocation cap: 100 ETH (without multi-sig)
- Rate limiting: max 10 allocations/block

### Emergency Pause
- All four contracts support `emergencyPause()` function
- Callable by board multi-sig or designated ops address
- Blocks allocations/withdrawals but preserves data integrity
- Requires governance vote to resume

## Solidity Version & Dependencies
- **Version:** 0.8.24 (EVM compatibility, recent security patches)
- **OpenZeppelin Contracts:** 5.0.0+ (AccessControl, Pausable, ReentrancyGuard)
- **Standards:** ERC-165 for interface detection, custom events for transparency

## Deployment Architecture
- **Testnet:** Sepolia (week 4)
- **Mainnet:** Ethereum L1 (week 8, post-audit)
- **Upgrade Pattern:** UUPS proxy for future governance iterations
- **Verification:** Full source on Etherscan + manual audit trail

---

**Phase 0 Target:** May 2026 | **Audit Completion:** Week 6 | **Mainnet Launch:** Week 8
