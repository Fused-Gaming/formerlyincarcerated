# Bitcoin Land Bond Phase 0 - Contract Suite Index

## Quick Navigation

### Documentation (Start Here)
- **[SETUP_SUMMARY.md](SETUP_SUMMARY.md)** - Complete setup overview & next steps
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical specifications for all 4 contracts
- **[DEPLOYMENT_PLAN.md](DEPLOYMENT_PLAN.md)** - Week-by-week testnet→audit→mainnet timeline
- **[SECURITY.md](SECURITY.md)** - Pre-deployment checklist & audit scope
- **[README.md](README.md)** - Quick start guide for developers

### Core Contracts (1,113 lines total)

#### 1. Capital Allocation Tracker (CAT)
**File:** `contracts/CapitalAllocationTracker.sol` (189 lines)

Manages Bitcoin legacy recovery and capital distribution.

```solidity
// Key functions:
receiveCapital(string fundSource)          // Accept capital
approveAllocation(address, uint256, bytes32) // Allocate to program
executeWithdrawal(address)                 // Withdraw allocated funds
getBalanceByProgram(bytes32)               // Query program balance
pauseAllocations()                         // Emergency pause
emergencyWithdraw(address)                 // Recover funds
```

**Security:** Multi-sig (3-of-5 board) for allocations >50 ETH, circuit breaker 500 ETH/day

#### 2. Deed Restriction Lock (DRL)
**File:** `contracts/DeedRestrictionLock.sol` (260 lines)

Enforces permanent deed restrictions on properties.

```solidity
// Key functions:
establishRestriction(address, address, uint256, bytes32) // Create restriction
verifyRestrictionActive(address)            // Check if active
renewDeedRestriction(address, uint256)     // Renew with notice
reportViolation(address, string)           // Report breach
getRemainingLockTime(address)              // Query expiration
```

**Security:** Immutable terms (hash-based), 72-hour renewal notice, violation tracking

#### 3. Resident Housing Registry (RHR)
**File:** `contracts/ResidentHousingRegistry.sol` (309 lines)

Maintains resident records, allocation history, and compliance tracking.

```solidity
// Key functions:
registerResident(address, bytes32, address)  // Register in program
updateResidentStatus(address, string)        // Update status
performComplianceCheck(address, bool, string) // Record check
recordAllocation(address, address, uint256, string) // Track allocation
checkAllocationEligibility(address)          // Verify eligible
getSupportServices(address)                  // Query services
```

**Security:** Privacy-preserving (minimal on-chain), compliance audit trail, role-based access

#### 4. Impact Metrics Aggregator (IMA)
**File:** `contracts/ImpactMetricsAggregator.sol` (355 lines)

Tracks housing stability metrics, resident outcomes, and program ROI.

```solidity
// Key functions:
recordMetric(bytes32, string, uint256)       // Record program metric
recordOutcome(address, string, uint256)      // Record resident outcome
generateImpactReport(bytes32)                // Generate report (aggregated)
getHousingStabilityRate(bytes32)            // Query stability %
getAverageCostSavings()                     // Query ROI
getRecidivismReduction()                    // Query recidivism %
```

**Security:** Immutable time-series ledger, aggregated privacy, outcome verification

### Testing & Deployment

#### Test Suite
- **[test/CapitalAllocationTracker.test.js](test/CapitalAllocationTracker.test.js)** - 8+ test cases
  - Capital reception, allocations, withdrawals
  - Emergency pause, reentrancy protection
  - Daily limit enforcement

#### Deployment
- **[scripts/deploy.js](scripts/deploy.js)** - Hardhat deployment script
  - Deploy all 4 contracts in order
  - Grant roles to board/ops members
  - Output contract addresses for verification

### Configuration

- **[hardhat.config.js](hardhat.config.js)** - Sepolia + Mainnet RPC endpoints
- **[package.json](package.json)** - Dependencies (Hardhat, OpenZeppelin, tools)
- **[.env.example](.env.example)** - Environment variables template
- **[.gitignore](.gitignore)** - Git exclusions (artifacts, node_modules, .env)

---

## Development Workflow

### 1. Setup (5 minutes)
```bash
npm install
cp .env.example .env
# Edit .env with RPC URLs and private key
```

### 2. Compile & Test (10 minutes)
```bash
npm run compile
npm test
npm run test:gas  # Check gas usage
```

### 3. Deploy to Testnet (Sepolia)
```bash
npm run deploy:sepolia
# Save contract addresses for audit
```

### 4. Verify on Etherscan
```bash
npm run verify:sepolia 0xContractAddress <constructorArgs>
```

### 5. Deploy to Mainnet (post-audit)
```bash
npm run deploy:mainnet
npm run verify:mainnet 0xContractAddress <constructorArgs>
```

---

## Key Metrics

| Metric | Value |
|--------|-------|
| Total Lines of Code | 1,113 (contracts) |
| Number of Contracts | 4 (CAT, DRL, RHR, IMA) |
| Number of Functions | 28+ (core functions across all contracts) |
| Event Definitions | 20+ (full audit trail) |
| Test Cases | 8+ (CapitalAllocationTracker) |
| Solidity Version | 0.8.24 |
| OpenZeppelin Version | 5.0.0+ |
| Security Reviews | Multi-sig, circuit breaker, pause, reentrancy guard |

---

## Timeline

| Week | Milestone | Status |
|------|-----------|--------|
| 4 | Sepolia deployment | 📅 Target: June 15 |
| 5 | Third-party audit | 📅 Target: June 22 |
| 6 | Audit findings + board vote | 📅 Target: June 29 |
| 7 | Mainnet staging | 📅 Target: July 6 |
| 8 | Ethereum L1 deployment | 📅 Target: July 13 |

---

## Security Checklist

- ✅ Multi-signature authorization (3-of-5 board)
- ✅ Circuit breaker (daily withdrawal limits)
- ✅ Emergency pause (ops team control)
- ✅ ReentrancyGuard on all state changes
- ✅ Role-based access control (RBAC)
- ✅ Event emissions for audit trail
- ✅ Immutable core logic (no upgrades Phase 0)
- ✅ Solidity 0.8.24 (overflow/underflow protection)

---

## Support

**Questions?** See:
- ARCHITECTURE.md for technical details
- SECURITY.md for pre-audit checklist
- DEPLOYMENT_PLAN.md for timeline
- README.md for quick start

**Ready to deploy?** Follow SETUP_SUMMARY.md → Next Steps section
