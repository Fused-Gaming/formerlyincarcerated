# Deployment Strategy - Bitcoin Land Bond Contracts

## Phase 0 Timeline

### Week 4: Testnet Deployment (Sepolia)
**Objective:** Validate contract functionality and integration

**Sequence:**
1. Deploy `CAT.sol` to Sepolia (Capital Allocation Tracker)
2. Deploy `DRL.sol` to Sepolia (Deed Restriction Lock)
3. Deploy `RHR.sol` to Sepolia (Resident Housing Registry)
4. Deploy `IMA.sol` to Sepolia (Impact Metrics Aggregator)
5. Initialize multi-sig signer addresses (3-of-5 board members)
6. Execute test scenarios: allocation, restriction, compliance
7. Verify Etherscan source code publication

**Testnet RPC:** `https://sepolia.infura.io/v3/YOUR_PROJECT_ID`

### Week 5: Staging & Audit Preparation
**Objective:** Third-party security review + mainnet readiness

**Actions:**
- Deploy to staging environment (Sepolia with prod configuration)
- Generate audit scope document (function level, known limits)
- Provide contracts to auditor (OpenZeppelin Labs / Trail of Bits)
- Begin mainnet configuration (gas optimization, parameter tuning)
- Set up mainnet RPC endpoints + failover

### Week 6: Audit Completion & Findings Resolution
**Objective:** Address audit findings, finalize contracts

**Deliverables:**
- Audit report with severity classifications
- Resolution of all HIGH/CRITICAL findings
- Regression testing on test suite
- Board approval vote (Notion: Bitcoin Land Bond Governance)
- Public audit summary (transparency + community confidence)

### Week 8: Mainnet Deployment (Ethereum L1)
**Objective:** Live capital management begins

**Deployment Sequence:**
1. Transfer audit-approved contracts to mainnet
2. Deploy CAT with real board multi-sig addresses
3. Deploy DRL, RHR, IMA (linked to CAT)
4. Initialize governance parameters (withdrawal limits, thresholds)
5. Publish verified source on Etherscan
6. Announce mainnet launch (press release, social)
7. Begin accepting first capital allocations

## Staging Environment Configuration

**Network:** Sepolia (acts as mainnet staging)
```
CAT Address: 0x[staging-cat-address]
DRL Address: 0x[staging-drl-address]
RHR Address: 0x[staging-rhr-address]
IMA Address: 0x[staging-ima-address]

Multi-Sig Signers: 3-of-5 board addresses
Daily Withdrawal Limit: 500 ETH
Single Allocation Cap: 100 ETH
```

**Testing Requirements:**
- Full allocation → restriction → compliance flow
- Emergency pause scenarios
- Multi-sig authorization workflows
- Data integrity under concurrent operations

## Mainnet Deployment Requirements

### Pre-Deployment Checklist
- [ ] Audit report finalized (no CRITICAL findings)
- [ ] Board approval via Notion governance vote
- [ ] Mainnet RPC endpoints tested + failover configured
- [ ] Real multi-sig signer addresses validated
- [ ] Withdrawal limits finalized (may differ from testnet)
- [ ] Legal review complete (deed restriction enforceability)

### Mainnet Configuration
```
Network: Ethereum Mainnet (Chain ID: 1)
Withdrawal Limit: 500 ETH/day (Board adjustable)
Allocation Cap: 100 ETH (without multi-sig approval)
Emergency Signers: 2-of-3 ops team (separate from board)
Expected Gas: ~2.5M (deployment), ~80K per allocation
```

### Post-Deployment Validation
1. Verify all contract addresses on Etherscan
2. Test initial board multi-sig authorization
3. Execute first small allocation ($10K) as dry run
4. Monitor contract for 72 hours (no anomalies)
5. Publish transparency report (capital in, allocations made)

## Public Verification Process

**Etherscan Publication:**
- Full source code visibility (no proxy hiding)
- Constructor args decoded + validated
- Contract interaction UI enabled (for board signers)
- "Verified" checkmark for community confidence

**Community Transparency:**
- Weekly capital flow reports (total in, allocated, reserved)
- Monthly impact metrics (residents served, stability rate)
- Quarterly audit summaries (findings, resolutions)
- Public board meeting notes (governance decisions)

---

**Testnet Live:** June 2026 | **Audit Underway:** Early June | **Mainnet Ready:** Early July
