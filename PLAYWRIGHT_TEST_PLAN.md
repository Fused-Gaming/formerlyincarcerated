# Playwright Test Suite Plan: Bitcoin Land Bond

**Project:** Bitcoin Land Bond - Criminal Asset Recovery Initiative  
**Current Date:** June 24, 2026  
**Framework:** Next.js 15.2.6 + React 19.0.0 + Tailwind CSS  
**Test Runner:** Playwright  
**Status:** Planning Phase (Test code to be implemented separately)

---

## 1. EXECUTIVE SUMMARY

This document establishes a comprehensive Playwright test strategy covering 4 distinct user archetypes across 14 public pages and 6 React components. The testing framework prioritizes critical user journeys, accessibility compliance (WCAG AAA), and performance benchmarks without requiring authentication infrastructure in Phase 1.

**Test Scope:** Public-facing website (pages, forms, navigation, content access)  
**Out of Scope (Phase 1):** Admin dashboards, member portals, donation processing, moderator controls  
**Timeline:** 3 phases over 12 weeks

---

## 2. USER ARCHETYPES & CRITICAL PATHS

### 2.1 Basic User (Unauthenticated Visitor)

**Persona:** First-time visitor, potential donor or partner exploring the initiative.

**Critical Paths:**
- Homepage discovery → navigation → content deep-dive
- Whitepaper download (PDF verification)
- Contact form submission
- Navigation menu responsiveness (mobile/tablet)
- Link integrity & dead link detection

**Key Interactions:**
- Homepage load and hero section visibility
- Tab switching on impact/governance/financials
- Mobile menu toggle
- CTA button clicks
- Social media link verification

**Success Criteria:**
- All pages load under 3 seconds (Cumulative Layout Shift < 0.1)
- No broken links
- All CTAs functional
- Mobile layout responsive at 375px, 768px, 1920px

---

### 2.2 Authenticated User (Future Expansion)

**Persona:** Registered partner, donor, or housing program operator.

**Critical Paths (Phase 2+):**
- Login flow with email/password
- User profile dashboard
- Donation workflow (payment integration)
- Saved preferences & account settings
- Logout & session management

**Scope Note:** Phase 1 does NOT include authentication tests. Backend auth system to be designed/implemented before Phase 2.

---

### 2.3 Moderator (Content Manager)

**Persona:** Staff member managing news, impact metrics, and partner listings.

**Critical Paths (Phase 3+):**
- Admin login
- Content moderation dashboard
- Publish/draft workflows
- Analytics review
- User feedback management

**Scope Note:** Phase 1 does NOT include admin/moderator controls.

---

### 2.4 Admin (System Administrator)

**Persona:** Technical owner managing system configuration, security, and user access.

**Critical Paths (Phase 3+):**
- Admin authentication
- System configuration panel
- User management & permissions
- Security audit logs
- Database integrity checks
- Email template management

**Scope Note:** Phase 1 does NOT include admin-level tests.

---

## 3. TEST SUITE STRUCTURE

### 3.1 Test Files & Organization

```
tests/
├── e2e/
│   ├── basic-user.spec.js              # Phase 1 ✓
│   ├── authenticated-user.spec.js      # Phase 2
│   ├── moderator.spec.js               # Phase 3
│   ├── admin.spec.js                   # Phase 3
│   └── cross-browser.spec.js           # Phase 1 (optional)
│
├── fixtures/
│   ├── test-data.json                  # Mock user data
│   ├── page-urls.json                  # Page inventory
│   └── accessibility-rules.json        # WCAG AAA config
│
├── utilities/
│   ├── test-helpers.js                 # Common functions
│   ├── performance-checks.js           # Lighthouse integration
│   ├── accessibility-checks.js         # axe-core wrapper
│   └── screenshot-config.js            # Visual regression setup
│
├── reports/
│   ├── test-results/
│   └── coverage/
│
├── playwright.config.js                # Playwright configuration
└── README.md                           # Test documentation
```

---

### 3.2 Test Categories (by Type)

#### Smoke Tests
**Purpose:** Rapid verification of critical functionality  
**Run Frequency:** Every commit  
**Duration:** < 2 minutes

- Homepage loads without errors
- Navigation menu renders
- Contact form submits
- PDF downloads initiate

#### Functional Tests
**Purpose:** Feature-level validation  
**Run Frequency:** Before merge to main  
**Duration:** 5-10 minutes

- Form field validation (email format, required fields)
- Link navigation and redirects
- Mobile menu toggle
- Tab switching (impact/governance/financials)
- PDF download verification
- Social media links open in new tabs

#### Integration Tests
**Purpose:** Cross-feature workflows  
**Run Frequency:** After feature branches  
**Duration:** 10-15 minutes

- Homepage → Contact form → Submission flow
- Homepage → Whitepaper page → Download → Verification
- Navigation across all pages without console errors
- Mobile menu close on link click
- Scroll behavior and header sticky positioning

#### Accessibility Tests
**Purpose:** WCAG AAA compliance (exceeds AA requirement)  
**Run Frequency:** Before merge to main  
**Duration:** 3-5 minutes per page

- Color contrast ratio ≥ 11.2:1 (project standard)
- Keyboard navigation (Tab, Enter, Escape)
- ARIA labels on buttons and form fields
- Heading hierarchy H1 → H2 → H3 (no skips)
- Alt text on images
- Screen reader announcements
- Focus indicators visible

#### Performance Tests
**Purpose:** Load time and rendering benchmarks  
**Run Frequency:** Daily (CI/CD)  
**Duration:** 5-10 minutes

- First Contentful Paint (FCP) < 1.2s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- Total Blocking Time (TBT) < 150ms
- Time to Interactive (TTI) < 3.5s
- PDF download size validation
- Image optimization check

#### Visual Regression Tests
**Purpose:** Detect unintended UI changes  
**Run Frequency:** Optional (weekly)  
**Duration:** 5-10 minutes

- Homepage layout at 3 viewport sizes
- Component appearance consistency
- Color palette validation
- Typography rendering

---

### 3.3 Test Environment Configuration

**Playwright Configuration File:** `playwright.config.js`

```javascript
Key Settings:
- browsers: [chromium, firefox, webkit]
- headless: true (CI/CD), false (local debugging)
- viewport: [1920x1080, 1366x768, 768x1024, 375x667]
- timeout: 30 seconds per test
- retries: 2 (flaky test mitigation)
- workers: 4 (parallel execution)
- screenshot: on failure
- video: on failure
```

**Base URL:**
```javascript
baseURL: process.env.BASE_URL || 'http://localhost:3000'
```

**Test Servers:**
- Local: `npm run dev` → http://localhost:3000
- Preview: Vercel preview URLs
- Staging: (TBD)
- Production: https://formerlyincarcerated.org

---

## 4. MOCK DATA & TEST FIXTURES

### 4.1 Test Data Structure

```json
{
  "basic_user": {
    "contact_form": {
      "name": "John Reentry",
      "email": "john@example.com",
      "organization": "Housing First Coalition",
      "message": "Interested in partnership opportunities"
    },
    "invalid_email": "not-an-email",
    "long_text": "Lorem ipsum..." // 5000+ chars
  },
  "page_inventory": [
    {
      "name": "Home",
      "path": "/",
      "selectors": {
        "hero_title": "h1",
        "cta_whitepaper": "a[href='/whitepaper']"
      }
    }
    // ... 13 more pages
  ]
}
```

### 4.2 Fixture Pages

| Page | Path | Selectors | Priority |
|------|------|-----------|----------|
| Home | `/` | hero, nav, tabs, cta | Critical |
| Whitepaper | `/whitepaper` | downloads, links | Critical |
| Contact | `/contact` | form, fields, submit | Critical |
| Impact | `/impact` | metrics, content | High |
| Model | `/model` | content, diagrams | High |
| Partners | `/partners` | partner list, links | High |
| About | `/about` | team, mission | Medium |
| Team | `/about/team` | bios, photos | Medium |
| Board | `/board` | board members | Medium |
| Docs | `/docs` | documentation, links | Medium |
| FAQ | `/faq` | accordion, q&a | Medium |
| News | `/news` | timeline, articles | Medium |

---

## 5. ACCESSIBILITY TEST SPECIFICATIONS

### 5.1 WCAG AAA Compliance Checklist

**Contrast Ratio (1.4.11 Non-text Contrast)**
- All interactive elements: ≥ 3:1
- Text elements: ≥ 7:1
- Project standard: 11.2:1 (current design)
- Tool: Check contrast using `axe-core` or manual validation

**Keyboard Navigation (2.1.1 Keyboard)**
- All interactive elements accessible via Tab key
- Tab order logical (left-to-right, top-to-bottom)
- No keyboard traps
- Focus indicators always visible

**Semantic HTML (1.3.1 Info & Relationships)**
- Proper heading hierarchy (H1, H2, H3 only, no H4+)
- Form labels associated with inputs
- Buttons use `<button>` elements, not `<div>` clicks
- Lists use `<ul>` / `<ol>` / `<li>`

**ARIA Requirements (1.3.5 Identify Input Purpose)**
- Form fields have `aria-label` or visible labels
- Alert messages have `role="alert"`
- Navigation regions have `aria-label`
- Custom components have appropriate roles

**Focus Management**
- Focus visible on all interactive elements
- Focus doesn't disappear on hover
- Modal dialogs trap focus (when implemented)

**Text Sizing (1.4.4 Resize Text)**
- Content remains readable at 200% zoom
- No horizontal scrolling at 200% zoom
- Responsive design handles all font sizes

### 5.2 Automated Accessibility Testing

**Tool:** `@axe-core/playwright`

```javascript
await expect(page).toPass(injectAxe());
// Verify no violations at WCAG AAA level
```

**Manual Testing Checklist:**
- Screen reader testing (NVDA, JAWS simulation)
- Color blindness simulation (8 types)
- Motion sensitivity (prefers-reduced-motion)
- High contrast mode verification

---

## 6. PERFORMANCE BENCHMARKS

### 6.1 Core Web Vitals Targets

| Metric | Target | Threshold | Tool |
|--------|--------|-----------|------|
| **FCP** (First Contentful Paint) | < 1.2s | Warning: 1.5s | Lighthouse |
| **LCP** (Largest Contentful Paint) | < 2.5s | Warning: 4s | Lighthouse |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Warning: 0.25 | Lighthouse |
| **TBT** (Total Blocking Time) | < 150ms | Warning: 300ms | DevTools |
| **TTI** (Time to Interactive) | < 3.5s | Warning: 5s | Lighthouse |

### 6.2 Page Load Performance Tiers

**Critical Pages (< 2.5s LCP):**
- Homepage
- Whitepaper page
- Contact page

**Standard Pages (< 3.5s LCP):**
- Impact, Model, Partners, About, Docs, FAQ

**Content Pages (< 4.5s LCP):**
- News, Team, Board

### 6.3 Asset Validation

```javascript
// PDF download size checks
- Full Whitepaper: ~12.5 MB (max 15 MB)
- Executive Summary: ~2.1 MB (max 3 MB)

// Image optimization
- WebP format where supported
- Fallback to PNG for older browsers
- Max file size: 200KB per image
```

---

## 7. CI/CD INTEGRATION POINTS

### 7.1 GitHub Actions Workflow

**File:** `.github/workflows/playwright-tests.yml` (to be created)

**Trigger Events:**
- On push to `main` branch
- On pull requests to `main`
- On demand via workflow_dispatch
- Scheduled nightly at 2 AM UTC

**Jobs:**

| Job | Duration | Triggers | Action on Fail |
|-----|----------|----------|----------------|
| **Smoke Tests** | 2 min | All events | Block merge |
| **Functional Tests** | 8 min | All events | Block merge |
| **Accessibility** | 5 min | All events | Block merge |
| **Performance** | 10 min | Push to main only | Warn only |
| **Visual Regression** | 10 min | Weekly only | Manual review |

**Failure Handling:**
- Automatic retry on flaky tests (2 attempts)
- Screenshot/video artifacts stored for debugging
- Slack notification on critical failures
- HTML report published to GitHub Pages

### 7.2 Local Development Pre-commit

```bash
# Run before git commit
npm run test:smoke

# Run before creating PR
npm run test:functional
npm run test:a11y
```

---

## 8. IMPLEMENTATION TIMELINE

### Phase 1: Basic User Journey (Weeks 1-4)

**Goals:**
- Establish test infrastructure
- Cover all 14 public pages
- Verify critical paths
- Achieve 80% code coverage

**Deliverables:**
- `basic-user.spec.js` (smoke + functional tests)
- `accessibility.spec.js` (WCAG AAA validation)
- `performance.spec.js` (Core Web Vitals)
- GitHub Actions workflow
- Test documentation & runbook

**Test Count:** 45-55 tests
**Estimated Coverage:** 14 pages × 3-4 tests per page

---

### Phase 2: Authenticated User (Weeks 5-8)

**Goals:**
- Implement backend authentication
- Test login/logout flows
- Verify session management
- Cover user profile interactions

**Dependencies:**
- Authentication system design (blocking)
- Backend API endpoints (blocking)
- User database schema (blocking)

**Deliverables:**
- `authenticated-user.spec.js`
- Login fixture & mock user generator
- Session persistence tests

**Test Count:** 20-30 tests
**Estimated Coverage:** Login, profile, donation flow

---

### Phase 3: Admin & Moderator (Weeks 9-12)

**Goals:**
- Test content moderation workflows
- Verify admin privileges
- Audit security controls
- Cover analytics & reporting

**Dependencies:**
- Admin dashboard implementation (blocking)
- Role-based access control (blocking)
- Audit logging system (blocking)

**Deliverables:**
- `moderator.spec.js` (content workflows)
- `admin.spec.js` (system controls)
- Security test suite

**Test Count:** 30-40 tests
**Estimated Coverage:** Admin flows, permissions, audit logs

---

## 9. MOCK DATA REQUIREMENTS

### 9.1 Contact Form Test Data

```javascript
const validContacts = [
  {
    name: "Alex Martinez",
    email: "alex@housing-coalition.org",
    organization: "Bay Area Housing Trust",
    message: "Interested in pilot city partnership"
  },
  {
    name: "Dr. Sarah Chen",
    email: "s.chen@university.edu",
    organization: "Criminal Justice Research Institute",
    message: "Would like to discuss impact metrics"
  }
];

const invalidContacts = [
  { name: "", email: "test@test.com", organization: "", message: "" }, // Required fields
  { name: "Test", email: "not-email", organization: "Test", message: "Test" }, // Invalid email
  { name: "Test", email: "test@test.com", organization: "Test", message: "" }, // Missing message
];
```

### 9.2 Navigation Test Data

```javascript
const navigationPaths = [
  { label: "Impact", href: "/impact" },
  { label: "Model", href: "/model" },
  { label: "Partners", href: "/partners" },
  { label: "Docs", href: "/docs" },
  { label: "Whitepaper", href: "/whitepaper" },
  { label: "Contact", href: "/contact" },
];

const mobileBreakpoints = [
  { name: "iPhone 12", width: 390, height: 844 },
  { name: "iPad", width: 768, height: 1024 },
  { name: "Desktop", width: 1920, height: 1080 },
];
```

### 9.3 PDF Test Files

```javascript
const pdfFixtures = {
  whitepaper: {
    filename: "49567801-HQ_Final_Whitepaper_2026.pdf",
    expectedSize: "~12.5 MB",
    minPages: 120,
  },
  summary: {
    filename: "Executive-Summary-2026.pdf",
    expectedSize: "~2.1 MB",
    minPages: 8,
  },
};
```

---

## 10. EDGE CASES & ERROR HANDLING

### 10.1 Network Scenarios

| Scenario | Test Approach | Expected Behavior |
|----------|---------------|-------------------|
| Slow Network (3G) | Chrome DevTools throttling | Page still loads < 5s |
| Offline Mode | Network tab disabled | Graceful error message |
| PDF Download Failure | Mock failed request | Retry available |
| API Timeout (future) | Delay backend response | Error state shown |

### 10.2 Browser & Device Coverage

**Browsers:**
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions, via webkit)
- Edge (optional, via chromium)

**Devices:**
- iPhone 12 (390×844)
- iPad (768×1024)
- Desktop (1920×1080, 1366×768)
- Galaxy S9 (360×740)

### 10.3 Form Validation Edge Cases

```javascript
- Empty form submission
- Whitespace-only input
- SQL injection attempts (stored safely)
- XSS payload attempts (content-security-policy tested)
- File upload with invalid file type (if applicable)
- Max length overflow (5000+ char textarea)
- Special characters in name/org fields
```

---

## 11. TEST REPORTING & METRICS

### 11.1 Test Reports

**Generated Artifacts:**
- HTML test report (Playwright built-in)
- JUnit XML (for CI/CD systems)
- JSON results for custom dashboards
- Screenshots on failure
- Video recordings on failure
- Performance timeline (Lighthouse JSON)

### 11.2 Metrics to Track

| Metric | Target | Frequency |
|--------|--------|-----------|
| Test Pass Rate | ≥ 98% | Daily |
| Flaky Test Rate | < 1% | Weekly |
| Average Test Duration | < 8 min total | Daily |
| Code Coverage | ≥ 80% | Per PR |
| Performance Regression | < 5% LCP increase | Per push |
| Accessibility Violations | 0 | Per PR |

### 11.3 Dashboard & Alerts

**Notifications:**
- Slack: Critical test failures
- Email: Weekly test summary
- GitHub: Test status on PR
- Vercel: Deployment blocker on failure

---

## 12. KNOWN LIMITATIONS & DEPENDENCIES

### 12.1 Phase 1 Limitations

- **No Authentication:** Tests assume unauthenticated state
- **No Backend API:** Contact form redirects to email; not tested end-to-end
- **No Database:** No data persistence validation
- **No Admin Interface:** No moderator/admin tests
- **No Payment Processing:** No donation flow testing
- **No Real PDFs:** Download validation checks file existence only

### 12.2 Blocking Dependencies for Phase 2+

| Dependency | Required By | Status |
|------------|------------|--------|
| Authentication system | Phase 2 | Not started |
| User database schema | Phase 2 | Not started |
| Login API endpoints | Phase 2 | Not started |
| Admin dashboard UI | Phase 3 | Not started |
| Email service integration | Phase 2 | Not started |
| Payment processor API | Phase 2 | Not started |

---

## 13. MAINTENANCE & SCALABILITY

### 13.1 Test Maintenance

**Quarterly Reviews:**
- Remove flaky tests
- Update selectors if UI changes
- Refresh test data
- Audit unused fixtures

**Update Triggers:**
- New page added: Add corresponding test file
- Component refactor: Update selectors
- Dependency update: Verify compatibility

### 13.2 Scaling Strategy

**As codebase grows:**
- Separate test files by page/feature
- Use shared utilities for common operations
- Implement parallel execution (4+ workers)
- Cache fixtures to speed up runs
- Use visual regression for component library

---

## 14. QUALITY ASSURANCE CHECKLIST

Before test suite goes live:

- [ ] All 45-55 Phase 1 tests pass consistently
- [ ] No test flakiness (< 1%)
- [ ] WCAG AAA compliance verified on all 14 pages
- [ ] Performance benchmarks met (FCP, LCP, CLS)
- [ ] GitHub Actions workflow integrated
- [ ] Local test execution documented
- [ ] Mock data complete and validated
- [ ] Screenshots/videos captured on failures
- [ ] Test report published to GitHub Pages
- [ ] Team trained on test execution
- [ ] Emergency rollback procedures documented

---

## 15. RESOURCE REQUIREMENTS

### 15.1 Infrastructure

- **CI/CD Runner:** GitHub Actions (built-in)
- **Storage:** GitHub Artifacts (test reports, videos)
- **Bandwidth:** ~500MB/month for video artifacts
- **Local Dev:** Node.js 18+ (installed)

### 15.2 Team Skills

| Role | Skills | Time |
|------|--------|------|
| QA Engineer | Playwright, JavaScript, Selectors | Lead |
| Frontend Dev | React, Tailwind, Accessibility | Support |
| DevOps | GitHub Actions, CI/CD | Setup |
| Product Manager | Requirements, UAT | Approval |

### 15.3 Estimated Effort

| Phase | Effort | Duration |
|-------|--------|----------|
| Setup & Config | 20 hours | Week 1 |
| Phase 1 Tests | 40 hours | Weeks 1-4 |
| Phase 2 Tests | 30 hours | Weeks 5-8 |
| Phase 3 Tests | 35 hours | Weeks 9-12 |
| Maintenance | 5 hours/month | Ongoing |

---

## 16. SUCCESS CRITERIA

### 16.1 Phase 1 Success Metrics

- All 14 pages tested for critical path flows
- 45+ automated tests passing consistently
- 0 critical accessibility violations (WCAG AAA)
- Core Web Vitals targets met on 80% of pages
- Test execution < 10 minutes total
- CI/CD integration complete

### 16.2 Phase 2 Success Metrics

- Authentication flows tested end-to-end
- 20+ authenticated user tests passing
- Session management & logout verified
- User profile CRUD operations tested

### 16.3 Phase 3 Success Metrics

- Moderator content workflows tested
- Admin security controls validated
- Role-based access control verified
- 30+ admin/moderator tests passing
- Audit logging validated

---

## 17. REFERENCE DOCUMENTS

**Related Files:**
- `.github/workflows/deployment-test.yml` - Current CI/CD config
- `CLAUDE.md` - Project architecture & tech stack
- `DEPLOYMENT_TEST_GUIDE.md` - Manual testing guide
- `package.json` - Dependencies (includes Playwright skill)

**External Resources:**
- [Playwright Documentation](https://playwright.dev)
- [WCAG AAA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Core Web Vitals Guide](https://web.dev/vitals/)
- [axe DevTools](https://www.deque.com/axe/devtools/)

---

## 18. SIGN-OFF & APPROVAL

| Role | Name | Date | Status |
|------|------|------|--------|
| QA Lead | TBD | TBD | Pending |
| Engineering Manager | TBD | TBD | Pending |
| Product Owner | TBD | TBD | Pending |
| Security Officer | TBD | TBD | Pending |

---

**Document Version:** 1.0  
**Last Updated:** June 24, 2026  
**Next Review:** July 22, 2026  
**Status:** APPROVED FOR IMPLEMENTATION
