# Dignifi Integration Phase 0-1 Checklist

## Week 1-2: API Documentation & Design Review

- [ ] **Schedule kickoff call with Dignifi** (Day 1)
  - Confirm API endpoint URLs, rate limits, SLAs
  - Review authentication method (API key vs. OAuth)
  - Discuss test environment access
  
- [ ] **Document Dignifi API specs** (Week 1, 3 days)
  - Verification endpoint: request/response schema
  - Disbursement endpoint: payment methods, settlement times
  - Outcomes endpoint: required metrics, update frequency
  - Compliance endpoint: audit log format, retention policies
  
- [ ] **Design BLB integration layer** (Week 1-2, 5 days)
  - `/api/dignifi/*` route handlers
  - Error handling + retry logic implementation
  - Encryption key management strategy
  
- [ ] **Security review:** Dignifi data handling practices (Week 2)
  - Confirm TLS 1.3, encryption at rest
  - Request SOC 2 Type II certification
  - Review PII retention policies

---

## Week 2-3: Data Sharing Agreement & Consent

- [ ] **Draft Data Processing Agreement (DPA)** (Week 2, 3 days)
  - Define what data Dignifi stores vs. BLB stores
  - Specify retention periods per data type
  - Include BAA obligations (HIPAA compliance)
  
- [ ] **Create resident consent form** (Week 2, 2 days)
  - Use template from `DATA_PRIVACY.md`
  - Translate to primary resident languages (Spanish, etc.)
  - Legal review of consent language
  
- [ ] **Establish audit logging** (Week 3)
  - Dignifi API request logs (timestamp, resident_id, response status)
  - Encryption key access logs
  - Failed verification retry logs
  
- [ ] **Execute DPA with Dignifi** (Week 3, by end of week)
  - Legal team review + signature
  - Share BLB privacy policy
  - Confirm subprocessor restrictions

---

## Week 3-4: Test Environment & SDK Integration

- [ ] **Obtain test environment credentials** (Week 3, Day 1)
  - Test API keys
  - Test webhook URLs
  - Test database access (if applicable)
  
- [ ] **Build integration SDK** (Week 3-4, 10 days)
  - Implement Verification API client
  - Implement Disbursement API client
  - Implement Outcomes sync job
  - Error handling + exponential backoff
  
- [ ] **Set up encrypted identifier storage** (Week 4)
  - Create `residents_dignifi_mapping` table
  - Test AES-256-GCM encryption/decryption
  - Verify key rotation mechanism
  
- [ ] **Unit test API integration** (Week 4)
  - Test happy path: verify → disburse → outcome
  - Test error scenarios: network timeout, invalid PII, risk rejection
  - Test retry logic + idempotency

---

## Week 5-6: 10-Resident Pilot Verification

- [ ] **Recruit 10 test residents** (Week 5, Day 1)
  - Mix of different ages, backgrounds, income levels
  - All provide informed consent
  
- [ ] **Manual verification of 10 residents** (Week 5)
  - Collect PII + consent forms
  - Submit to Dignifi verification endpoint
  - Document verification_id for each resident
  
- [ ] **Monitor & validate results** (Week 5-6)
  - Confirm status: verified/pending/failed for each
  - Test encryption of verification_id
  - Validate audit logs created
  - Check zero PII leakage to BLB database
  
- [ ] **Conduct user acceptance test** (Week 6)
  - Residents confirm data handling
  - Test consent withdrawal flow
  - Validate privacy notice clarity

---

## Week 6-7: Disbursement Test Path

- [ ] **Test disbursement for 3 pilot residents** (Week 6)
  - Submit housing stage milestone
  - Trigger `/api/dignifi/disburse` call
  - Confirm payment method options presented
  - Validate transaction_id logging
  
- [ ] **Payment processing verification** (Week 6-7)
  - Direct bank transfer (1-2 business days)
  - Alternative payment method (debit card or cash alternative)
  - Confirm settlement_date accuracy
  
- [ ] **Fallback testing** (Week 7)
  - Simulate Dignifi service down → test manual disbursement flow
  - Simulate failed payment → test alt payment method routing
  - Document fallback procedures

---

## Week 8-9: Compliance & Production Hardening

- [ ] **Complete HIPAA checklist** (Week 8)
  - All items from `DATA_PRIVACY.md` signed off
  - Staff HIPAA training complete
  - Incident response plan documented
  
- [ ] **Load testing & performance** (Week 8)
  - Verify API handles 100 concurrent verification requests
  - Test outcome sync monthly batch job
  - Measure encryption/decryption latency
  
- [ ] **Production environment setup** (Week 8-9)
  - Provision prod API keys from Dignifi
  - Deploy encryption keys to secure vault (AWS Secrets Manager)
  - Configure prod monitoring + alerting
  
- [ ] **Final security audit** (Week 9)
  - Penetration test of `/api/dignifi/*` endpoints
  - Code review of encryption implementation
  - Validate no PII in logs or error messages

---

## Week 9+: Production Deployment

- [ ] **Gradual rollout (Week 9-10)**
  - Deploy to 10% of new residents
  - Monitor error rates, verification success rate
  - Scale to 50%, then 100%
  
- [ ] **Outcomes tracking** (Ongoing)
  - Monthly sync job running reliably
  - Impact metrics dashboard updated
  - Audit trail archiving to long-term storage (S3)
  
- [ ] **Maintenance plan**
  - Quarterly security reviews
  - Annual SOC 2 audit with Dignifi
  - Encryption key rotation every 6 months

---

## Success Criteria

- ✅ 100% of pilot residents verified within 24 hours
- ✅ Zero PII leakage to BLB systems
- ✅ All 4 API integration points working reliably
- ✅ HIPAA compliance checklist 100% complete
- ✅ Fallback flows tested and documented
- ✅ Residents report clear privacy understanding
