# Bitcoin Land Bond - Case Management System

## Overview

**Platform:** Supabase database + custom admin portal (Vercel)
**Staff:** 1 Case Manager per 12-15 residents (4-5 total for 50 residents)
**Schedule:** Weekly check-ins, monthly deeper reviews, quarterly outcomes

---

## Weekly Case Manager Check-Ins

**Frequency:** Every Tuesday, 30-45 min per resident (async Slack option available)

**Check-In Template:**
1. **Housing Stability Check (5 min)**
   - Any housing/lease issues?
   - Utility/maintenance concerns?
   - Rent payment status (via Dignifi)?
   - Neighbor conflicts or safety concerns?

2. **Employment Progress (10 min)**
   - Job search status (actively applying?)
   - Interviews scheduled or recent rejections?
   - Skill development (training, certifications)?
   - Income from employment vs. benefits mix?

3. **Health & Wellbeing (10 min)**
   - Mental health check (counseling participation?)
   - Substance use monitoring (if applicable)
   - Medical appointments (insurance, healthcare access)
   - Medication compliance (SSDI/SSI recipients)

4. **Family & Social Support (10 min)**
   - Family contact progress (reunification goal tracking)
   - Community participation (group events, peer support)
   - Isolation/loneliness indicators
   - Social service referrals needed?

5. **Documentation (5 min)**
   - Case note entry in Supabase (see template below)
   - Update resident status, action items
   - Flag escalations (mental health crisis, eviction risk)
   - Set next check-in date

**Case Note Template (Supabase):**
```
Date: [Week start date]
Resident: [Name]
Case Manager: [Name]

Housing: [Status summary]
Employment: [Status summary]
Health: [Status summary]
Family: [Status summary]
Action Items: [1. ..., 2. ..., 3. ...]
Escalation Flag: [None / Urgent / Follow-up]
Next Check-in: [Date]
```

---

## Service Tracking & Referrals

**Categories Tracked:**
1. **Employment Services**
   - Job training programs (Coding Dojo, apprenticeships, temp agencies)
   - Resume help, interview prep
   - Job placement tracking (goal: 6-month employment rate 60%+)

2. **Housing Support**
   - Lease enforcement, eviction prevention
   - Maintenance requests coordination
   - Moving/furniture assistance

3. **Counseling & Mental Health**
   - Therapy/psychiatric care referrals
   - Substance abuse treatment (if needed)
   - Peer support groups
   - Crisis hotline (24/7 availability)

4. **Family Reunification**
   - Family counseling services
   - Child custody support (legal, emotional)
   - Parenting classes, support groups
   - Contact facilitation

**Referral Process:**
1. Case manager identifies need in weekly check-in
2. Case manager secures resident consent (written or recorded verbal)
3. Refer to partner organization (phone call + email with resident CC)
4. Follow up in 1 week (did they attend? any barriers?)
5. Document referral outcome in Supabase (accepted, declined, in progress)

**Service Partner Network (Oakland + SF):**
- Employment: Workforce Development Board, UCSF Hiring Initiative
- Mental Health: BART Health Plan, Community Mental Health Centers
- Substance Use: Bay Area Recovery Collective, Harm Reduction Coalition
- Family: Family Support Centers, Legal Aid
- Food/Benefits: SNAP, WIC, CalFresh coordinators

---

## Monthly Payment Disbursement via Dignifi

**Payment Schedule:** 1st business day of each month

**Verification Steps:**
1. **Rent Payment (Primary)**
   - Confirm lease is active (Supabase + property manager)
   - Verify rent amount & due date
   - Process payment from resident's Dignifi wallet via ACH/card
   - If resident has employment income, encourage self-payment (builds accountability)

2. **Supplemental Support (if needed)**
   - Income shortfall analysis (is rent covered by SSI/SSDI/employment?)
   - Program fills gap (goal: keep housing stable)
   - Max $800/month/resident supplemental support
   - Monthly spend tracking (budget report)

3. **Payment Confirmation**
   - Case manager verifies rent paid to landlord
   - Dignifi statement reviewed with resident
   - Document in Supabase case notes
   - Identify any payment barriers for future months

**Dignifi Admin Access:**
- Case managers see: Resident balance, transaction history, spending patterns
- Flagging system: Alert if balance low (<$500), no recent deposits, missed payments
- Resident notification: Auto-SMS alerts on low balance, available support
- Privacy: Case manager cannot override resident spending (empowerment)

---

## Quarterly Outcomes Collection

**Schedule:** End of Months 3, 6, 9, 12 (quarterly check-in, 60-90 min)

**Outcomes Measured:**

| Outcome | Target | Measurement |
|---------|--------|-------------|
| Housing Stability | 95% | Lease active, no eviction filings |
| Employment | 60% | Employed 20+ hrs/week or in training |
| Income | $1,200+/mo | Combined benefits + employment |
| Family Contact | 70% | Regular contact (phone/visit) established |
| Mental Health | 80% | In treatment or stable without treatment |
| Community Participation | 75% | Attending 1+ community events/month |

**Quarterly Assessment Survey:**
1. Housing satisfaction (1-10 scale)
2. Employment progress (% hours worked, income)
3. Health improvement (self-rated improvement?)
4. Family relationships (contact frequency, quality)
5. Overall wellbeing (1-10 scale)
6. Program satisfaction & feedback
7. Barriers & needed support

**Data Collection Methods:**
- Resident self-report survey (10 min)
- Case manager observations (documented in notes)
- Administrative verification (employment verification letters, lease confirmation)
- Service provider input (employer, therapist, job trainer - with consent)

**Reporting:**
- Individual resident outcome report (shared with resident + case manager)
- Cohort summary (aggregate outcomes across 50 residents)
- Program-level dashboard (Vercel admin portal, accessible to leadership)

---

## Admin Portal for Staff Access

**Access:** Case managers + Program Director (Vercel login)

**Dashboard Views:**

1. **Resident Directory**
   - Name, contact, case manager assignment
   - Housing status (lease active? move-in date?)
   - Employment status (employed? job title? hours?)
   - Service referral history
   - Next scheduled check-in

2. **Case Manager Workload**
   - Assigned residents (count, names)
   - This week's check-ins (completed vs. pending)
   - Overdue follow-ups (flagged in red)
   - Critical escalations (mental health, eviction risk)

3. **Outcome Tracking**
   - Individual resident progress (employment, income, family contact)
   - Cohort aggregate (housing stability %, employment %, income average)
   - Trend over time (quarterly reports, charts)
   - Export to CSV (funder reports, board presentations)

4. **Payment Administration**
   - Monthly disbursement summary (total spent, per resident)
   - Dignifi wallet status (balances, transaction alerts)
   - Payment confirmations (verified rent payments)
   - Budget utilization (spend vs. allocation)

5. **Alerts & Escalations**
   - Eviction risk (missed 1+ rent payments)
   - Mental health crisis (self-harm report, suicidal ideation)
   - No recent check-in (overdue 2+ weeks)
   - Employment milestone (first job landed! - celebrate)

**Security & Privacy:**
- Login: Email + password, 2FA for admin accounts
- Supabase Row Level Security (RLS) - case managers see only their residents
- Program Director sees all residents
- Encrypted storage of sensitive data (background, income)
- Access log (audit trail of who viewed what, when)

---

## Case Management Timeline

| Phase | Month | Activities | Outcomes |
|-------|-------|-----------|----------|
| **Onboarding** | Month 1 | Intake, service plan, weekly check-ins | 50 residents engaged |
| **Stabilization** | Month 2-3 | Employment referrals, family contact, Q1 assessment | 60% in job training |
| **Progress** | Month 4-6 | Job placement support, mental health, Q2 assessment | 60%+ employed |
| **Sustainability** | Month 7-12 | Long-term support, Q3-Q4 outcomes, renewal planning | 95%+ housing stability |

---

## Budget & Staffing

| Item | Cost |
|------|------|
| 4 Case Managers @ $50K/yr (pro-rata Q1-2) | $40K |
| Supabase database + admin portal development | $8K |
| Service referral partner payments (coordination) | $5K |
| Dignifi monthly fees (transaction, wallet) | $3K |
| **Total Operations Support** | **$56K** |
| **Per-Resident Annual Cost** | **$1,120** |

---

## Success Measures

✅ 100% of residents have assigned case manager
✅ 95% of weekly check-ins completed on schedule
✅ 90% of service referrals accepted/completed
✅ 95%+ housing retention (no evictions)
✅ 60%+ employment or job training within 6 months
✅ 75%+ family contact goals achieved
✅ Net Promoter Score 70+ (resident satisfaction)
