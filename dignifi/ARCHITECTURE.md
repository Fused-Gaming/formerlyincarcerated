# Dignifi Integration Architecture

## Integration Framework Overview

Four integration points enabling secure identity verification, housing disbursement, outcome tracking, and compliance automation.

## 4 Integration Points

### 1. Verification (`/api/dignifi/verify`)
**Purpose:** Initial identity verification before enrollment
- **Request:** Resident PII (name, DOB, SSN last 4, address)
- **Response:** `{ verification_id, status, risk_score, timestamp }`
- **Status Values:** `verified`, `pending_review`, `failed`
- **Retry Logic:** 3 attempts with exponential backoff (30s, 90s, 270s)
- **Timeout:** 45 seconds

### 2. Disbursement (`/api/dignifi/disburse`)
**Purpose:** Release housing assistance funds
- **Request:** `{ resident_id, amount, account_type, housing_stage }`
- **Response:** `{ transaction_id, status, settlement_date }`
- **Account Types:** `bank_account`, `debit_card`, `cash_alternative`
- **Approval Rules:** Verification complete + housing readiness confirmed
- **Error Codes:** 
  - `UNVERIFIED` → Route to manual review
  - `INSUFFICIENT_FUNDS` → Escalate to finance
  - `ACCOUNT_ERROR` → Offer alt payment method

### 3. Outcomes (`/api/dignifi/outcomes`)
**Purpose:** Track housing retention + impact metrics
- **Request:** `{ resident_id, metric_type, value, period }`
- **Metrics:** Housing status (active/departed), days stably housed, income change
- **Frequency:** Monthly automated sync
- **Data Retention:** 24 months rolling

### 4. Compliance (`/api/dignifi/compliance`)
**Purpose:** Audit trail + regulatory reporting
- **Request:** `{ audit_type, resident_id, timestamp_range }`
- **Response:** Encrypted audit log + risk flags
- **Audit Types:** `fund_flow`, `identity_verification`, `data_access`, `consent`
- **Retention:** 7 years (regulatory requirement)

---

## Data Flow Diagrams

```
VERIFICATION FLOW
─────────────────
Resident Application
        ↓
Collect PII + Consent
        ↓
/api/dignifi/verify ←→ Dignifi Service
        ↓
Risk Score Assessment
        ↓
status: verified/pending/failed
        ↓
Enrollment Gate (only proceed if verified)

DISBURSEMENT FLOW
─────────────────
Housing Stage Milestone
        ↓
Verify Fund Release Conditions
        ↓
/api/dignifi/disburse ←→ Payment Processor
        ↓
Transaction Status
        ↓
Resident Account Credited
        ↓
Compliance Log Entry

OUTCOMES FLOW
─────────────
Monthly Sync Job (Day 1)
        ↓
Query Housing Status DB
        ↓
/api/dignifi/outcomes ←→ Dignifi Platform
        ↓
Aggregate Impact Metrics
        ↓
Generate Monthly Report

COMPLIANCE FLOW
───────────────
Audit Request
        ↓
Date Range + Audit Type
        ↓
/api/dignifi/compliance ←→ Encrypted Log
        ↓
Regulatory Report Export
```

---

## Error Handling Strategy

| Error | Status Code | BLB Action | Escalation |
|-------|-------------|-----------|------------|
| Network timeout | 504 | Retry with backoff | Alert ops after 2 retries |
| Invalid PII format | 400 | Return error to resident | Manual review queue |
| Risk score too high | 200 OK + `pending_review` | Hold enrollment | Fraud team review |
| Verification service down | 503 | Use fallback verification | Activate manual process |
| Disbursement rejected | 402 | Offer alt payment method | Finance team escalation |
| Missing consent | 403 | Re-prompt resident | Halt fund release |

---

## Fallback Mechanisms

- **Verification Delay:** Manual third-party ID check (gov't ID + address proof)
- **Disbursement Failure:** Direct ACH transfer or check
- **Outcome Sync Failure:** Manual data entry with supervisor approval

---

## Security Requirements

- All API calls require TLS 1.3
- Encrypted identifiers stored in separate table
- Resident consent logged with timestamp + IP
- Rate limiting: 100 req/minute per resident
- Request signing: HMAC-SHA256 with shared secret key rotation every 90 days
