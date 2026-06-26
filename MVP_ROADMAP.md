# Bitcoin Land Bond - MVP-to-Scale Roadmap

**Objective:** Transform from a policy website into a fully operational platform with blockchain infrastructure, backend operations, and real pilot city deployment. Launch MVP with Oakland/SF pilot, secure seed funding, prove concept, then scale to 5 cities.

**Timeline:** Phase 0-3 spanning 12+ months (with parallel workstreams)  
**Team:** 15 initial FTE (ED, CTO, CFO, ops leads, engineers, community liaisons)  
**Funding Target:** $2-5M seed (covers Year 1: team, smart contracts, pilot operations)

---

## CONTEXT & STRATEGIC INTENT

**Current State (Frontend-Only Website):**
- Complete Next.js 14 website with 14 pages, design system, branding
- **Zero blockchain infrastructure** (no smart contracts, no Web3 libraries)
- **No backend or database** (all data hardcoded in JSX)
- **All team/board/partner data is Lorem ipsum placeholder**
- **No Dignifi integration** found in codebase
- Uses MCP swarm architecture for project management

**Target State (Operational MVP):**
- Smart contracts for capital allocation tracking on Ethereum mainnet
- Backend API with resident/property/outcome management (PostgreSQL)
- Oakland + San Francisco as single integrated pilot city
- Real team (15 staff) + board (13 members) + governance structure
- Dignifi integration for identity verification + payments + outcomes
- GitHub milestones for investor transparency
- 50+ residents housed, case management system live, impact data publishing

**Why This Pivot:**
- Website alone doesn't operationalize the mission ($15B capital deployment requires actual infrastructure)
- Investors need proof of concept: working smart contracts, real residents, measurable outcomes
- Government partnerships require operational readiness: team in place, case management live, Dignifi integration
- Fundraising requires traction: MVP deployed, pilot city engaged, Dignifi partnership confirmed
- Single pilot city (Oakland/SF) de-risks regulatory, operational, financial model before scaling

---

## PHASING STRATEGY (4 Phases, 12+ Months)

### PHASE 0: Foundation (Weeks 1-3) - Infrastructure &amp; Governance Setup
**Goal:** Establish blockchain, backend, and governance infrastructure

**Key Milestones:**
1. **Blockchain Architecture** - Select Ethereum + testnet smart contracts
2. **Backend Infrastructure** - API design, database schema, staging deployment
3. **Governance Structure** - Board composition finalized (13 members, 50% formerly incarcerated)
4. **Team Hiring** - Executive Director + CTO recruited
5. **Dignifi Partnership** - Data sharing agreement signed

**Output:** All infrastructure designed + documented, ready for development

---

### PHASE 1: Operational MVP (Weeks 4-9) - Website + Smart Contracts + Pilot City
**Goal:** Deploy functional smart contracts, complete website data migration, engage Oakland/SF

**Key Milestones:**
1. **Smart Contracts on Testnet** - Capital Allocation, Deed Restriction Lock, Resident Registry, Impact Metrics contracts
2. **Backend API v1.0** - Resident, property, capital allocation, outcomes endpoints
3. **Website Data Migration** - Real team, board, advisors, compensation transparency, open roles
4. **Oakland/SF Engagement** - MOUs signed, community advisory committee formed, property pipeline
5. **Dignifi Integration v1.0** - Identity verification workflow tested
6. **Investor Materials** - Pitch deck, financial model, seed funding narrative
7. **GitHub Milestones** - All issues created, projects configured, investor dashboard

**Output:** MVP ready for operations (smart contracts on testnet, backend staged, pilot city engaged, seed funding pipeline active)

---

### PHASE 2: Operations Launch (Weeks 10-15) - First Residents + Mainnet
**Goal:** Onboard first residents, acquire properties, move smart contracts to mainnet

**Key Milestones:**
1. **Smart Contracts on Mainnet** - Security audit passed, capital allocation tracking live
2. **First 50 Residents Enrolled** - Through Dignifi verification, case management system operational
3. **10 Properties Acquired** - Deed restrictions recorded on-chain, 10 residents housed
4. **Case Management System** - Service tracking, Dignifi payment disbursement, staff portal live
5. **Impact Measurement** - Outcomes dashboard published quarterly, third-party audit started
6. **Marketing Funnel** - 200+ resident leads, 50+ investor conversations, $1M government funding pipeline

**Output:** Proof of concept achieved (50 residents, 70%+ employment, &lt;15% recidivism, $5M deployed)

---

### PHASE 3: Scale to 5 Cities (Week 16+) - Proof Point → Expansion
**Goal:** Leverage Oakland/SF success to expand to Los Angeles, Chicago, NYC + one flexible city

**Success Trigger:** 100+ residents housed, 70%+ employment, &lt;15% recidivism, positive media
**Output:** 5-city network operational, $50M+ capital deployed, 500+ residents housed

---

## RECOMMENDED TECHNICAL ARCHITECTURE

### Blockchain Layer (Smart Contracts)
- **Network:** Ethereum mainnet (regulatory clarity) + Arbitrum L2 (lower fees)
- **Language:** Solidity 0.8.x
- **Framework:** Hardhat + ethers.js v6
- **Contracts (4 total):**
  1. **Capital Allocation Tracker** - Fund deployment, milestone-based release, board multisig
  2. **Deed Restriction Lock** - 50-year affordability enforcement, rent cap verification
  3. **Resident Housing Registry** - Non-transferable NFTs (privacy: encrypted IDs on-chain)
  4. **Impact Metrics Aggregator** - Quarterly outcomes published on-chain (auditor-signed)
- **Security:** Multi-sig wallet (2-of-3), circuit breaker, emergency pause function

### Backend Layer (Operations API)
- **Runtime:** Node.js/Express.js (or Go for performance)
- **Database:** PostgreSQL (relational, HIPAA-compliant, audit logging)
- **ORM:** Prisma (type-safe, migrations, querying)
- **API Style:** REST + OpenAPI documentation
- **Authentication:** JWT + role-based access control (RBAC)
- **Deployment:** Docker containers on AWS ECS
- **Endpoints (10+ core):** Residents, properties, capital allocations, outcomes, admin, case management

### Frontend Enhancement (Website)
- **Framework:** Next.js 15 (existing, maintain)
- **Web3 Integration:** ethers.js + React hooks for contract interaction
- **Addition:** Wallet connection (MetaMask), smart contract status dashboard, investor metrics display

### Dignifi Integration
- **API Endpoints:**
  1. Identity verification (Dignifi confirms formerly incarcerated status)
  2. Payment disbursement (Dignifi handles fund distribution to residents)
  3. Outcomes data sync (encrypted data shared quarterly with Dignifi)
- **Data Privacy:** Resident IDs stored as hashes on-chain, PII encrypted at rest
- **Compliance:** HIPAA-compliant, audit logging, data consent forms

---

### PHASE 2: PDF Resource Creation (Week 2-3)
**Goal:** Create 5 missing PDF templates with content structure

**Template Strategy:** Each PDF follows HP brand guidelines (colors, typography, logo placement)

**1. Executive Summary** (2.1 MB, 6 pages)
- Cover + Mission statement
- Initiative overview (problem/solution/scale)
- Governance structure + board commitment
- Impact metrics + recidivism data
- Capital model + 5-year phases
- Contact + resources

**2. Pilot City Guidelines** (2.1 MB, 15 pages)
- Program overview + Phase 1 timeline (5 cities)
- Application process (step-by-step + criteria matrix)
- Implementation framework (governance, community engagement)
- Success metrics (units, jobs, recidivism)
- Resources + FAQ

**3. Financial Model Workbook** (1.8 MB Excel)
- Executive dashboard (5-year summary)
- Capital allocation by year
- Land acquisition assumptions
- Development cost breakdown
- Operating model + sustainability
- Impact ROI calculations
- Sensitivity analysis (±20% scenarios)

**4. Impact Measurement Framework** (3.2 MB, 15 pages)
- Theory of change + logic model
- Individual outcomes (housing, employment, recidivism)
- Community + system-level outcomes
- Measurement methodology + data sources
- Reporting cadence + public dashboard
- Baseline + target metrics

**5. Governance Charter** (1.4 MB, 8 pages)
- Mission lock commitment + deed restriction mechanism
- 13-person board + committee structure (50% formerly incarcerated)
- Decision-making authority matrix
- Conflict of interest + transparency requirements
- Amendment procedures + term limits

**6. Mission Lock Implementation Guide** (2.8 MB, 15 pages)
- Legal mechanism explanation
- Deed restriction language templates
- Enforcement process + property transfer scenarios
- Community land trust vs. direct hold options
- State-by-state legal variance guide
- Real case studies + examples

**File Location:** `/public/resources/` (6 new PDFs)

**Dependencies:** Content owners approve structure, legal review for Charter + Mission Lock

---

### PHASE 3: Ecosystem Engagement Architecture (Week 3)
**Goal:** Build partner pathway pages with clear call-to-action

**New Pages:**
- `pages/ecosystem.jsx` - Main hub with vision + 4-tier engagement model
- `pages/partner-types/city.jsx` - City government pathway
- `pages/partner-types/developer.jsx` - Housing developer pathway
- `pages/partner-types/service.jsx` - Service organization pathway
- `pages/partner-types/investor.jsx` - Institutional investor pathway

**Engagement Model: Three Tiers**

1. **Tier 1: Awareness** → Hero CTA "Join the Movement" → `/partners` role selector
2. **Tier 2: Exploration** → Role-specific pages + success metrics + requirements
3. **Tier 3: Engagement** → Contact form + PDF resources + discovery call scheduling

**Four Partner Pathways (with role-specific content):**
| Pathway | Role | Timeline | Benefit | CTA |
|---------|------|----------|---------|-----|
| City Government | Zoning support + land ID | Apply Q3 2026 | 120 units + $50M economic activity | Apply to Host Pilot |
| Developer | Development + construction | Q4 2026 start | $2-5M project + jobs | Submit Proposal |
| Service Org | Reentry support + employment | Q2 2026 begin | Mission alignment + revenue | Join Support Network |
| Investor | Capital + strategic guidance | Commitments Q4 2026 | Impact ROI + policy influence | Explore Investment |

**Dependencies:** Ecosystem page + role-specific pages ready before populating partner data

---

### PHASE 4: Content Population (Week 4-5)
**Goal:** Gather real data and populate all components

**Board Members** (4 people, HR/Executive coordination)
- Collect: Name, title, biography, email, LinkedIn, photo, expertise areas, join date
- Organize by category: Formerly Incarcerated, Developer, Finance, Community
- Format: Markdown → import as JS objects in `boardMembers.js`

**Team Members** (6 people, HR coordination)
- Collect: Name, title, biography, department, photo, join date
- Organize by department: Housing, Policy, Community, Finance, Operations
- Format: Markdown → import as JS objects in `teamMembers.js`

**Partners** (50+ organizations, Development team)
- Maintain master spreadsheet: Name, category, logo URL, description, website, type, join date
- Categories: Reentry, Developer, City Government, Investor
- Format: CSV → convert to JS objects in `partners.js`

**News/Press** (10+ items, Communications)
- Link real press coverage + milestones
- Format: Date, title, excerpt, author, external link, category
- Populate `newsUpdates.js` with actual URLs

**PDF Content Finalization** (Content owners)
- Executive Summary: Finance + Communications team
- Pilot Guidelines: Policy + Community team
- Financial Model: Finance team (Excel expertise required)
- Impact Framework: Evaluation + Research team
- Governance Charter: **Requires board + legal counsel approval**
- Mission Lock Guide: **Requires legal review + housing development expertise**

**Dependencies:** All Phase 1-3 infrastructure must be complete

---

### PHASE 5: Integration & Verification (Week 5-6)
**Goal:** Test, optimize, and launch complete documentation suite

**Functional Testing**
- ✅ Board page: All 4 members display, category filters work
- ✅ Team page: Responsive grid, all 6 staff visible
- ✅ Partners page: All 50+ partners load, category filters functional
- ✅ News page: Sorted by date, featured items highlighted
- ✅ Docs page: All 6 PDFs listed, downloads work
- ✅ Ecosystem pages: 4 role pathways accessible, CTAs route to contact form
- ✅ Navigation: All new pages linked from header + footer

**Accessibility Testing (WCAG AAA)**
- Color contrast: All text 11.2:1+ ratio
- Keyboard navigation: Full keyboard access to all pages
- Screen readers: Cards properly labeled, navigation semantic
- Images: All have descriptive alt text
- Automated audit: axe-core passes

**Performance Testing**
- Page load time: < 3 seconds on 3G
- Mobile responsive: 320px+ width fully functional
- PDF downloads: All files download correctly, file sizes accurate
- Image optimization: All photos compressed

**SEO & Social Verification**
- Open Graph: All pages have og:title, og:description, og:image
- Meta descriptions: Descriptive for search
- Social preview: Manual verification (Twitter, LinkedIn, Facebook)

**Dependencies:** All content complete + all components integrated

---

## TEAM STRUCTURE & GOVERNANCE

### Initial Team (Year 1): 15 Full-Time Staff
- **Executive Director** ($200-250K) - CEO-equivalent, hired or search ongoing
- **Chief Technology Officer** ($180-220K) - Blockchain + backend oversight
- **Chief Financial Officer** ($180-220K) - Capital allocation, compliance
- **Director of Oakland Operations** ($120-150K) - Local pilot lead
- **Director of San Francisco Operations** ($120-150K) - Local pilot lead
- **Director of Resident Services** ($100-130K) - Case management, Dignifi partnership
- **Director of Partnerships** ($100-130K) - City government, developers, investors
- **Smart Contract Developer** ($150-190K) - Solidity expertise, security
- **Backend Engineer** ($140-180K) - API design, database, operations
- **Frontend Engineer** ($130-170K) - React, Next.js, Web3 integration
- **Operations Manager** ($80-110K) - Compliance, documentation
- **Community Liaison (Oakland)** ($60-90K) - Resident relationships
- **Community Liaison (SF)** ($60-90K) - Resident relationships
- **Data Analyst** ($90-120K) - Impact measurement, outcomes tracking
- **Communications Coordinator** ($60-90K) - Marketing, investor relations

**Year 1 Payroll:** $1.8-2.2M (including benefits, taxes)

### Board of Directors: 13 Members
- **4 Formerly Incarcerated Leaders** (31%) - Including 2 Co-Chairs
- **3 Housing & Development** (23%) - Developer, CLT director, policy expert
- **3 Finance, Legal & Compliance** (23%) - Finance/impact investing, attorney, compliance
- **3 Government & Community** (23%) - Oakland city, SF city, academic researcher

**Governance:**
- Quarterly public meetings
- Committee structure: Finance, Governance, Outcomes, Partnerships
- Decisions: Simple majority (2/3 for major capital allocation)
- Transparency: All minutes + financials published

---

## SMART CONTRACT SPECIFICATIONS (Summary)

### Contract 1: Capital Allocation Tracker
- Tracks fund deployment to properties, milestone-based release
- Board multisig required for allocations &gt;$100K
- Public explorer showing all capital flows
- Quarterly outcome metrics tied to allocation success

### Contract 2: Deed Restriction Lock
- Encodes 50-year affordability restriction on-chain
- Prevents sale/rent increase during restriction period
- Immutable restriction dates (cannot be shortened)
- Public property registry

### Contract 3: Resident Housing Registry
- Non-transferable NFTs (optional, with resident consent)
- Privacy: Dignifi IDs stored as hashes
- Quarterly eligibility verification
- No personal data exposed on-chain

### Contract 4: Impact Metrics Aggregator
- Quarterly outcomes published (auditor-signed)
- 70% employment rate target
- &lt;15% recidivism reduction target
- Public impact dashboard

---

## DIGNIFI PARTNERSHIP INTEGRATION

**Integration Points:**
1. **Identity Verification** - Confirms formerly incarcerated status (secure + private)
2. **Payment Disbursement** - Dignifi distributes service payments to residents
3. **Outcomes Data** - Encrypted quarterly outcomes shared with Dignifi
4. **Compliance** - HIPAA-compliant, audit logging, consent forms

**Data Privacy:** Resident PII only stored with Dignifi, local system uses encrypted identifiers only

---

## OAKLAND/SF PILOT OPERATIONS

**Community Engagement** (Weeks 5-6)
- City government outreach to Oakland + SF
- 10-15 member community advisory committee
- 20+ reentry organization partnerships

**Property Acquisition** (Weeks 6-12)
- Identify 5-10 candidate properties per city
- Regulatory assessment + financing
- Deed restriction recording on-chain
- Developer partnership for rehab + management

**Resident Enrollment** (Weeks 10-12)
- Marketing through partner orgs + social media
- Application &amp; Dignifi verification (1-2 weeks per resident)
- Lease signing (subsidized rent: 30% of Area Median Income)
- Move-in coordination + service connection

**Case Management** (Ongoing)
- Weekly check-ins with case manager
- Employment coaching, mental health support, family reunification
- Monthly service payments via Dignifi
- Quarterly outcomes tracking

**Impact Reporting** (Quarterly)
- Third-party audit of outcomes
- Smart contract publishing results on-chain
- Investor dashboard updates
- Government grant reporting

---

## MARKETING & LEAD GENERATION FUNNEL

**Resident Recruitment (Outbound):**
- Partner with 20+ reentry orgs
- Weekly info sessions in Oakland + SF
- Social media campaign (Instagram, TikTok, YouTube)
- Community events (quarterly celebration)
- Target: 200+ applications in pipeline

**Investor Pipeline (Inbound):**
- Website SEO + blog content (2x/month)
- LinkedIn thought leadership
- Monthly investor webinars
- Press + media outreach
- Investor demo environment (explore MVP, smart contracts, dashboard)
- Target: 50+ investor conversations scheduled, $2-5M seed close

**Government Funding (Outreach):**
- Monthly meetings with Oakland + SF city staff
- HUD Second Chance Housing grants ($5M+ potential)
- DOJ Smart Supervision grants ($2-5M potential)
- State/federal criminal justice funding
- Target: $1M+ government funding pipeline

---

## GITHUB MILESTONE STRUCTURE (Investor-Visible)

**Phase 0: Infrastructure Foundation** (Due: 2026-07-15)
- Blockchain architecture documented
- Backend API designed + tested
- Team structure finalized + hiring begun
- Dignifi partnership agreement signed
- Status: 4/4 milestone deliverables

**Phase 1: Operational MVP** (Due: 2026-08-30)
- Smart contracts deployed to testnet
- Backend API v1.0 deployed to staging
- Website data migration complete (real team, board, advisors)
- Oakland/SF pilot city MOUs signed
- Dignifi integration v1.0 live (10+ test residents verified)
- Investor materials ready (pitch deck, financial model, seed narrative)
- GitHub milestones visible + issues created
- Status: 51 total issues, 15 open, 36 closed (as of target date)

**Phase 2: Operations Launch** (Due: 2026-10-15)
- 50+ residents enrolled + housed
- Smart contracts on mainnet (audit passed)
- 10 properties acquired + deed restricted
- Case management system live (100+ service interactions tracked)
- Impact measurement framework operational (third-party audit started)
- Marketing funnel generating leads (200+ residents, 50+ investors, $1M govt funding)
- Status: 45 total issues, focused on operations + scaling

**Phase 3: Scale to 5 Cities** (Due: 2027-Q2)
- Proof of concept achieved (100 residents, 70% employment, &lt;15% recidivism)
- Playbook documented + shared
- LA/Chicago/NYC pilots launched (pilot expansion)
- Federal funding secured ($1M+ annually)
- Status: 30 total issues, scale-focused

---

## IMPLEMENTATION SEQUENCE & DEPENDENCIES

**Critical Path (What Must Happen First):**

**Week 1-2:**
1. Blockchain architecture finalized (blocks everything else)
2. Backend architecture finalized (blocks API development)
3. Legal review of smart contracts (blocks deployment)
4. Dignifi partnerships confirmed (blocks operations)

**Week 2-3:**
5. Smart contract development started
6. Backend development started
7. Board recruitment finalized
8. Team hiring kicked off (need ED + CTO)
9. Dignifi API documentation reviewed

**Week 4-5:**
10. Smart contracts on testnet
11. Backend API deployed to staging
12. Website team members hired
13. Oakland/SF city meetings begun
14. Dignifi integration development started

**Week 6-9:**
15. Smart contracts security audited
16. Backend API production-ready
17. Website migration to real data
18. Investor materials finalized
19. Dignifi integration tested

**Week 10-12:**
20. Smart contracts on mainnet (depends on audit)
21. First residents enrolled (depends on Dignifi)
22. Properties acquired (depends on financing + city clearance)
23. Case management system live (depends on backend + Dignifi)
24. Outcomes measurement starting (depends on case management)

---

## FUNDRAISING NARRATIVE (Summary)

**The Problem:** 600K+ formerly incarcerated people released annually lack housing → 50%+ recidivism

**The Solution:** Deploy $15B seized cryptocurrency to fund permanent deed-restricted housing with smart contracts

**Traction:** MVP deployed, smart contracts audited, Oakland/SF engaged, Dignifi partnership advanced

**Financial Model:** 
- Year 1: 50 residents, $5M deployed, -$1.7M net (seed covers)
- Year 2: 250 residents, $25M deployed, -$3M net (Series A covers)
- Year 3: 500 residents, $50M deployed, -$3M net (approaching break-even)

**Seed Funding Target:** $2-5M (Year 1 team + operations + pilot)

**Investors:** Impact foundations, crypto VCs, local government grants

---

## CRITICAL FILES TO MODIFY

### Phase 0 Deliverables (Infrastructure)
- **Smart Contract Architecture** (Ethereum mainnet, Solidity 0.8.x, 4-contract system)
- **Backend API Specification** (OpenAPI, 10+ endpoints, PostgreSQL schema)
- **Board Composition** (13 members identified + NDAs signed)
- **Team Hiring Plan** (ED, CTO, CFO recruitment underway)
- **Dignifi Integration Framework** (API review, data sharing agreement drafted)

### Phase 1 Deliverables (MVP)
- **Smart Contracts on Testnet** (Capital Allocation, Deed Lock, Resident Registry, Impact Metrics)
- **Backend API v1.0** (Staged deployment, all endpoints tested)
- **Website Data Migration** (Real team, board, advisors, open roles, compensation transparency)
- **Oakland/SF City Engagement** (MOUs signed, community advisory formed, property pipeline)
- **Dignifi Integration v1.0** (10+ residents verified end-to-end)
- **GitHub Milestones** (Investor dashboard configured, all issues created)
- **Investor Materials** (Pitch deck, financial model, seed narrative ready)

### Phase 2 Deliverables (Operations)
- **Smart Contracts on Mainnet** (Security audit passed, $500K+ deployed on-chain)
- **First 50 Residents** (Enrolled, verified through Dignifi, housed with case management)
- **10 Properties Acquired** (Deed restrictions recorded on-chain, 90%+ occupancy)
- **Case Management System Live** (100+ service interactions tracked, payments disbursed)
- **Impact Measurement** (Outcomes dashboard published, third-party audit started)
- **Marketing Traction** (200+ resident leads, 50+ investor conversations, $1M govt pipeline)

### Phase 3 Deliverables (Scale)
- **Proof of Concept** (100 residents, 70% employment, &lt;15% recidivism)
- **Playbook Documented** (Operational, regulatory, marketing, team scaling)
- **5-City Expansion** (LA, Chicago, NYC, +1 flexible city pilots launched)
- **Federal Funding** ($1M+ annually in government contracts)

---

## SUCCESS METRICS

### Phase 0 Success
- ✅ Blockchain architecture approved by CTO + legal
- ✅ Backend architecture documented + approved by product
- ✅ Board of 13 fully committed (NDAs signed)
- ✅ ED hired or search actively underway
- ✅ Dignifi data sharing agreement drafted

### Phase 1 Success
- ✅ Smart contracts pass security audit
- ✅ Backend API deployed to staging (all endpoints working)
- ✅ Website fully migrated to real data (team, board, advisors)
- ✅ Oakland + SF MOUs signed + community advisory meeting
- ✅ Dignifi integration end-to-end tested (10 residents)
- ✅ GitHub milestones visible to investors
- ✅ 20+ investor meetings scheduled, seed interest indicated

### Phase 2 Success
- ✅ Smart contracts on mainnet + $500K deployed
- ✅ 50+ residents enrolled + verified
- ✅ 10+ properties acquired + deed restricted
- ✅ Case management system tracking 100+ interactions
- ✅ First outcomes data published + on-chain
- ✅ 200+ resident leads in pipeline
- ✅ Seed funding closed ($2-5M)

### Phase 3 Success
- ✅ 100 residents housed + positive outcomes (70% employment, &lt;15% recidivism)
- ✅ $50M+ capital deployed across 5 cities
- ✅ 5-city governance + partnership network operational
- ✅ Federal funding secured ($1M+ annually)
- ✅ Series A funding discussions underway

---

## KEY DECISIONS NEEDED FROM USER

Before implementation begins, clarify:

1. **Ethereum Blockchain:** Confirm mainnet is correct choice (vs. Layer 2, vs. other chain)
2. **Backend Stack:** Node.js/Express or Go? AWS or other cloud provider?
3. **Dignifi Partnership:** Confirm relationship status + integration timeline
4. **Oakland/SF Focus:** Confirmed as single pilot (not starting all 5 cities)?
5. **Team Timeline:** When can ED + CTO start? How quickly can you recruit?
6. **Funding Status:** Any committed capital for Phase 0 team + infrastructure?
7. **Board Recruitment:** How many board members already committed vs. need to recruit?

---

## RECOMMENDED IMPLEMENTATION ORDER

1. **Immediately (This Week):**
   - Secure ED + CTO (blocking hire for everything else)
   - Confirm Dignifi partnership status + integration details
   - Decide blockchain (Ethereum mainnet confirmed?)
   - Board recruitment finalization

2. **Week 1-2 (Foundation):**
   - Smart contract architecture finalized (with legal review)
   - Backend architecture + database schema designed
   - Team hiring plan documented
   - GitHub project structure created

3. **Week 2-3 (Development Start):**
   - Smart contract development begins
   - Backend API development begins
   - Website team hired
   - City government outreach begins

4. **Week 4-5 (MVP Assembling):**
   - Smart contracts on testnet
   - Backend API staged
   - Website migration starts
   - Dignifi integration development

5. **Week 6-9 (MVP Complete):**
   - Smart contracts audited
   - Backend production-ready
   - Website data live
   - Dignifi integration tested
   - Investor materials ready

6. **Week 10-15 (Operations Launch):**
   - Smart contracts mainnet
   - First residents enrolled + housed
   - Case management live
   - Impact measurement starting

---

## RISK MITIGATION

**Risk 1: Smart contract security (HIGH)**
- Mitigation: Third-party security audit, multi-sig wallet, emergency pause function

**Risk 2: Regulatory complexity (HIGH)**
- Mitigation: Legal counsel review, government partnerships early, compliance documentation

**Risk 3: Team recruitment (HIGH)**
- Mitigation: Start ED + CTO search immediately, compete on mission + equity

**Risk 4: Dignifi integration delays (MEDIUM)**
- Mitigation: API documentation review early, fallback identity verification method

**Risk 5: Property acquisition challenges (MEDIUM)**
- Mitigation: Partner with experienced real estate broker, identify 10+ properties (only need 5-10)

**Risk 6: Resident enrollment slower than expected (MEDIUM)**
- Mitigation: Partner with 20+ reentry orgs, aggressive marketing, weekly info sessions

---

## FUNDING ALLOCATION ($2-5M Seed)

- **Team Salaries (Year 1):** $1.8-2.2M (15 FTE, benefits + taxes)
- **Smart Contract Audit:** $50-100K
- **Backend Infrastructure (AWS):** $50-100K/year
- **Marketing &amp; Recruitment:** $200-300K
- **Operations (offices, legal, compliance):** $250-400K
- **Contingency &amp; Runway:** $500-800K

**Total Year 1 Budget:** $3-4M (seed covers Year 1 fully + partial Year 2)

---

## NEXT STEPS (READY FOR USER APPROVAL)

This comprehensive MVP-to-Scale roadmap is ready for implementation approval. The plan includes:

✅ **Phase-gated delivery** (0-3 with milestones + success criteria)  
✅ **Technical architecture** (blockchain + backend + Dignifi)  
✅ **Team structure** (15 FTE + 13-member board with compensation)  
✅ **Operations plan** (Oakland/SF pilot city workflow)  
✅ **Marketing strategy** (resident recruitment + investor pipeline + government funding)  
✅ **GitHub milestone structure** (investor transparency + project tracking)  
✅ **Fundraising narrative** (problem → solution → traction → model → investors)  
✅ **Implementation sequence** (weeks 1-15+ with dependencies)  
✅ **Risk mitigation** (6 key risks addressed)  
✅ **Budget allocation** ($2-5M seed, $3-4M Year 1)

**To proceed:** Approve the roadmap and clarify the 7 key decisions listed above. Then begin Phase 0 (Foundation) immediately with ED + CTO recruitment.

