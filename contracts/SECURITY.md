# Security Checklist & Audit Plan

## Pre-Deployment Security Review

### Code-Level Controls
- [ ] No unchecked external calls (all use CEI pattern)
- [ ] ReentrancyGuard on all state-changing functions
- [ ] Overflow/underflow protected (Solidity 0.8.24+)
- [ ] No hardcoded addresses (all immutable constructor args)
- [ ] Function visibility explicit (no accidental public functions)
- [ ] Events emitted for all state changes (audit trail)
- [ ] Access control: role-based via OpenZeppelin AccessControl
- [ ] Pause functionality tested (circuit breaker blocking)

### Architecture Review
- [ ] Multi-sig signer count verified (3-of-5 board, 2-of-3 ops)
- [ ] Daily withdrawal limits enforced (500 ETH)
- [ ] Single allocation cap tested (<100 ETH without multi-sig)
- [ ] Rate limiting in place (10 allocations/block max)
- [ ] Emergency pause callable by 2-of-3 ops team
- [ ] Board governance vote required for contract upgrades

### Data Integrity
- [ ] Deed restriction hashes immutable (tamper-proof terms)
- [ ] Metric timestamps validated (no backfill)
- [ ] Resident data privacy preserved (only core fields on-chain)
- [ ] Compliance audit trail immutable (ledger-style)

## Known Vulnerabilities to Test For

### Reentrancy Scenarios
**Test Case:** CAT withdrawal to malicious contract that calls `executeWithdrawal()` again
- Expected: Blocked by ReentrancyGuard, funds safe
- Severity: CRITICAL if fails

### Integer Overflow on Cumulative Metrics
**Test Case:** IMA.recordMetric() called with max uint256 values
- Expected: No overflow, revert on cap exceeded
- Severity: HIGH if fails

### Multi-Sig Authorization Bypass
**Test Case:** Single signer attempts allocation >50 ETH without full approval
- Expected: Transaction reverted
- Severity: CRITICAL if fails

### Deed Restriction Violation Reporting DoS
**Test Case:** DRL.reportViolation() called 10K times in rapid succession
- Expected: Gas-efficient, doesn't block critical functions
- Severity: MEDIUM if expensive

### Circuit Breaker Evasion
**Test Case:** Multiple addresses rapidly executing withdrawals to exceed daily limit
- Expected: Cumulative limit enforced, later txs revert
- Severity: HIGH if fails

## Audit Scope Definition

### Third-Party Audit Requirements
**Scope:** All four Phase 0 contracts (CAT, DRL, RHR, IMA)
- ~800 lines of code total (lean, focused)
- Full function-level coverage
- Known limitations documented (no UUPS proxy in Phase 0)
- Emergency pause behavior explicitly tested

**Audit Timeline:**
- **Submission:** Week 5 (June 15, 2026)
- **Review Period:** 2-3 weeks (industry standard)
- **Findings Delivery:** Week 6 (June 28, 2026)
- **Fix & Retest:** Week 7 (July 5, 2026)

**Audit Firm Candidates:**
- OpenZeppelin Labs (top-tier, expensive)
- Trail of Bits (specialized in financial protocols)
- Spearbit (emerging, cost-effective)
- Consensys Diligence (hybrid offering)

### Audit Report Structure
1. **Executive Summary** - Risk classification, key findings
2. **Function-Level Analysis** - Detailed review of each contract method
3. **Known Limitations** - Explicit scope boundaries
4. **Recommendations** - Prioritized by severity (CRITICAL → LOW)
5. **Test Coverage** - Assertions verified by auditor

## Security Timeline

**Week 4 (June 9-15):** Testnet Live, Internal Security Review
- Deploy to Sepolia
- Run Slither + MythX automated tools
- Manual code review (3 internal eyes)
- Prepare audit submission package

**Week 5 (June 16-22):** Audit Underway
- Third-party audit begins
- Team available for clarifications
- Testnet tests continue (no mainnet prep yet)

**Week 6 (June 23-29):** Audit Findings & Remediation
- Audit report delivered
- CRITICAL/HIGH findings resolved same-day
- MEDIUM findings fixed within 48 hours
- Regression testing on all fixes
- Board governance vote (approval required)

**Week 7 (June 30-July 6):** Final Testing & Mainnet Staging
- Audit re-test (auditor validates fixes)
- Mainnet parameter tuning
- Staging environment mirrors mainnet config
- Go/No-Go decision (board vote Thursday)

**Week 8 (July 7-13):** Mainnet Deployment
- Live on Ethereum L1
- First allocations begin
- 72-hour monitoring (24/7 ops team)
- Public transparency report

## Risk Mitigation Strategies

### CRITICAL Risk: Unauthorized Capital Drain
- **Mitigation:** Multi-sig on all allocations >50 ETH
- **Verification:** Board signers pre-registered, keys in secure custody
- **Backup Plan:** Emergency pause + manual board meeting within 4 hours

### HIGH Risk: Deed Restriction Invalidation
- **Mitigation:** Immutable hash-based terms, no governance override
- **Verification:** Legal review confirms on-chain restrictions enforceable
- **Backup Plan:** Off-chain legal documents serve as fallback

### HIGH Risk: Circuit Breaker Misconfiguration
- **Mitigation:** Testnet stress-tests with 10x daily volume
- **Verification:** Limit checked on every withdrawal, pre-computed cumulative
- **Backup Plan:** Emergency pause if limits fail during week 1

### MEDIUM Risk: Gas Cost Overruns
- **Mitigation:** Optimize contract bytecode, use storage-efficient structures
- **Verification:** Hardhat gas reporter on all test scenarios
- **Backup Plan:** Board may increase gas budget, revert to simpler logic if needed

---

**Audit Completion Target:** Week 6 | **Board Approval:** Week 7 | **Mainnet Launch:** Week 8
