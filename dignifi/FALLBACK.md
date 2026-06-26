# Dignifi Integration Fallback Strategy

## Risk Overview

**Critical Dependency:** Dignifi integration touches enrollment gate and fund disbursement. Delays on either path block housing provision.

**Phase 0-1 Timeline Risk:** 9-week deployment requires contingency if Dignifi delays API access, encounters compliance issues, or changes pricing.

---

## Scenario 1: Dignifi API Delayed (>2 weeks beyond Week 3)

### Alternative Identity Verification Path

**Trigger:** Test environment access not provided by end of Week 3

**Implementation (Week 4):**

1. **Manual Government ID Verification**
   - Resident uploads: Driver's License OR Passport (photo page)
   - Staff reviews for: Name match, DOB validity, address consistency
   - Document: Photo verification + timestamp in audit log
   - Cost: $0 (internal labor)

2. **Third-Party Verification Service** (if manual capacity limited)
   - **Provider Options:** LexisNexis IDology, Socure, Jumio
   - **Cost:** $2-5 per resident verification
   - **Turnaround:** 5-30 minutes
   - **Setup:** 1 week (API integration, testing)
   - **Data Flow:** BLB → Third-party service (direct), NOT via Dignifi

3. **Address Proof Requirement**
   - Utility bill (electric, gas, water) OR
   - Recent lease/housing document OR
   - Bank statement with address
   - Dated within 60 days

4. **Risk Scoring** (manual override)
   - Internal checklist: ID valid, no fraud flags, income verified
   - Supervisor signs off on risk acceptance
   - Escalation rule: Anything flagged → manual review

**Success Metrics:**
- Verification turnaround: <48 hours
- Success rate: >95%
- False positive rate: <5%

---

## Scenario 2: Dignifi Disbursement Delays (Payment Processing)

### Alternative Payment Methods

**Trigger:** Dignifi disbursement endpoint down OR payment settlement delayed >5 business days

**Implementation (Immediate):**

1. **Direct Bank ACH Transfer**
   - Resident provides: Bank name, account number, routing number
   - BLB initiates ACH via established banking relationship
   - Timeline: 1-2 business days settlement
   - Cost: $0.50-1.00 per transaction (existing banking infrastructure)
   - Encryption: Account details stored encrypted, destroyed after transaction

2. **Debit Card Issuance** (if resident lacks bank account)
   - Partner: Green Dot, NetSpend, or Wisely
   - Load amount onto prepaid card
   - Timeline: Card shipped 3-5 days OR instant virtual card
   - Cost: $2-3 per card + $1.50 per load
   - Advantage: Resident keeps financial access long-term

3. **Check Disbursement** (highest friction fallback)
   - Issued via BLB business bank account
   - Mailed via certified mail (receipt tracking)
   - Timeline: 5-7 business days
   - Cost: $1-2 per check
   - Use only if resident refuses digital methods

4. **Cash Pickup Alternative** (for high-risk verification)
   - Partner: MoneyGram, Western Union, or local credit union
   - Resident picks up at nearest location
   - Timeline: Same day (within 2-4 hours of fund release)
   - Cost: $3-5 per transaction
   - Documentation: Photo ID at pickup, receipt kept

**Selection Logic:**
```
IF resident.has_bank_account:
  Use ACH (1-2 days, lowest cost)
ELSE IF resident_declined_digital_methods:
  Offer debit card (3-5 days, better than check)
ELSE:
  Default to check (fallback of last resort)

IF verification_risk_high AND resident_unbanked:
  Offer cash pickup (same-day, traceability)
```

---

## Scenario 3: Dignifi Compliance/Pricing Changes

### Risk Mitigation for Critical Path Delay

**Trigger:** Dignifi raises pricing >$10/resident, changes data retention, or regulatory change halts partnership

**Mitigation Strategy:**

1. **Contractual Protections (Week 2-3 DPA)**
   - Lock pricing for 12 months
   - 90-day notice required for material changes
   - Termination clause: Either party exits with 30 days notice
   - Data portability: All encrypted identifiers returned within 15 days

2. **Gradual Provider Transition** (if early termination needed)
   - Parallel run: Keep Dignifi + switch to third-party verifier for new residents
   - Timeline: 2-week overlap to migrate outstanding verifications
   - Zero resident impact: Existing verified residents unaffected

3. **Cost Containment**
   - Fallback third-party service caps at $5/resident (vs. Dignifi unknown cost)
   - Budget allocated for manual verification (internal staff cost)
   - Batch verification processing (bulk discount if available)

---

## Deployment Rollback Plan

### If Integration Fails at Week 9 Production Deployment

| Issue | Action | Timing |
|-------|--------|--------|
| >10% API failures | Pause Dignifi enrollment, use manual verification | Immediate |
| Encryption key loss | Revert to unencrypted audit logs (temporary), restore from backup | 1 hour |
| Disbursement failures | Switch to ACH fallback for affected residents | Real-time |
| Data breach detected | Revoke all Dignifi credentials, force re-verification via third-party | <1 hour |
| Dignifi outage >4 hours | Escalate to manual processing for all pending tasks | Per incident |

**Rollback Trigger:** >5% of daily transactions failing for >2 consecutive hours

---

## Timeline Estimates (Alternative Paths)

| Milestone | Dignifi Plan | Manual + Third-Party Plan | Variance |
|-----------|---|---|---|
| API review | Week 1-2 | Week 1 (skip) | -1 week |
| Verification ready | Week 4 | Week 3 | -1 week |
| Pilot 10 residents | Week 5-6 | Week 4-5 | -1 week |
| Production ready | Week 9 | Week 7-8 | -1-2 weeks |

**Total Risk Mitigation Benefit:** 1-2 week acceleration available if Dignifi delays

---

## Cost Impact Analysis

| Component | Dignifi Path | Fallback Path | Variance |
|-----------|---|---|---|
| Verification | $0/resident (TBD pricing) | $2-5/resident (3rd party) | +$2-5 per 100 residents |
| Disbursement | $0 (platform included) | $0.50-5 per txn | +$50-500 per 100 residents |
| Internal labor | 1 FTE (integration) | 0.5 FTE (manual review) | -50% labor |
| **Total 100 residents** | TBD | ~$250-750 + labor | Likely 30% cheaper, 2x slower |

**Recommendation:** Pursue Dignifi integration as primary; maintain fallback vendor agreements as insurance.
