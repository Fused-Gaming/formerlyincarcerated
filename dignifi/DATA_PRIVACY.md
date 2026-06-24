# Data Privacy & Compliance Framework

## Resident Consent Form Template

```
BITCOIN LAND BOND - DIGNIFI IDENTITY & PAYMENT INTEGRATION CONSENT

I, [NAME], consent to:
1. Dignifi verifying my identity using provided personal information
2. Secure sharing of verification status with Bitcoin Land Bond
3. Encrypted storage of my identity verification record
4. Monthly outcome tracking (housing status, income impact)
5. Audit trail logging for regulatory compliance

CONSENT ACKNOWLEDGMENTS:
☐ I understand my data is encrypted end-to-end
☐ I can revoke this consent anytime by emailing privacy@formerlyincarcerated.org
☐ My SSN/DOB are used ONLY for identity verification, never stored by BLB
☐ I have received and read the Data Processing Addendum

Signature: ________________  Date: __________
```

---

## PII Handling Matrix

| Data Point | Stored by BLB? | Stored by Dignifi? | Encrypted? | Retention |
|-----------|---|---|---|---|
| Full Name | No | Yes | Yes | Duration of relationship |
| SSN (last 4 only) | No | Yes | Yes | During verification |
| Full SSN | No | Yes | Yes | 30 days (verification only) |
| DOB | No | Yes | Yes | Duration of relationship |
| Address | Yes | Yes | Yes | For housing records |
| Email/Phone | Yes | No | Yes | For contact |
| Bank Account Details | No | Yes | Yes | During disbursement only |
| Risk Assessment Score | Yes | Yes | Yes | 12 months |
| Verification ID (encrypted) | Yes | Yes | Yes | 7 years (audit trail) |

**Key Rule:** BLB stores encrypted pointer to Dignifi verification record; never stores raw PII.

---

## Encryption Strategy for Encrypted Identifiers

### Resident Encrypted ID Generation
```
encrypted_id = AES-256-GCM(
  plaintext: resident_verification_id,
  key: env.DIGNIFI_ENCRYPTION_KEY,
  iv: crypto.randomBytes(16),
  aad: [resident_id, timestamp]
)
```

### Storage
- **Table:** `residents_dignifi_mapping`
- **Columns:** 
  - `resident_id` (BLB internal ID)
  - `encrypted_verification_id` (AES-256-GCM encrypted)
  - `verification_timestamp`
  - `consent_signed_at`
  - `revoked` (boolean, for consent withdrawal)

### Key Rotation
- Encryption keys rotated every 6 months
- Re-encrypt all identifiers with new key (background job)
- Old keys retained for 30 days (emergency decryption)

---

## HIPAA Compliance Checklist

- [ ] **Risk Assessment:** Conduct HIPAA Security Rule gap analysis (Week 1)
- [ ] **BAA Draft:** Execute Business Associate Agreement with Dignifi (Week 2)
- [ ] **Access Controls:** Implement role-based access to verification data (Week 3)
- [ ] **Audit Controls:** Enable Dignifi API request logging with timestamps (Week 3)
- [ ] **Integrity:** HMAC verification on all Dignifi responses (Week 4)
- [ ] **Transmission Security:** TLS 1.3 mandatory for all API calls (Week 1)
- [ ] **Encryption At Rest:** Verified identifiers encrypted in database (Week 2)
- [ ] **Incident Response:** Documented response plan for data breaches (Week 4)
- [ ] **Staff Training:** HIPAA training for all staff with data access (Week 5)
- [ ] **Consent Documentation:** Stored consent forms with timestamp + signature (Week 2)

---

## Data Breach Response Protocol

1. **Detection:** Monitor for unauthorized access attempts via CloudTrail
2. **Containment:** Immediately revoke affected resident consent records
3. **Notification:** Contact residents within 72 hours if PII exposed
4. **Reporting:** File HIPAA breach report if >500 residents affected
5. **Remediation:** Rotate encryption keys + force Dignifi re-verification

---

## Third-Party Data Processing

**Dignifi as Data Processor:**
- Processes verification data on BLB's behalf
- Bound by BAA (Business Associate Agreement)
- No marketing use of resident data
- 30-day notice required before subprocessor changes

**Annual Audit:** Dignifi SOC 2 Type II certification required
