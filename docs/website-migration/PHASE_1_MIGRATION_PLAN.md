# Phase 1 Website Data Migration Plan
**Bitcoin Land Bond - Team, Board, Advisors & News**

## Overview
Comprehensive migration from Lorem ipsum placeholders to real people/roles with governance structure, compensation transparency, and Dignifi partnerships.

## 1. DATA STRUCTURE FILES (`lib/data/`)

### `boardMembers.js`
**Template:** 13-member board (4 formerly incarcerated + 3 housing + 3 finance/legal + 3 government/community)
```javascript
{
  id: string,
  name: string,
  title: string,
  category: 'formerly-incarcerated' | 'housing' | 'finance' | 'government',
  bio: string (150-250 words),
  expertise: string[],
  links: { email?: string, linkedin?: string, website?: string },
  image?: string (path to /public/team/board/),
  joinedYear: number,
}
```
**Deliverable:** Template with 13 placeholder entries, field validation, category colors

### `teamMembers.js`
**Template:** 15-staff roles with department, compensation bands, status (full-time/contract)
```javascript
{
  id: string,
  name: string,
  role: string,
  department: 'operations' | 'legal' | 'policy' | 'housing' | 'community',
  bio: string (100-150 words),
  compensation: { salary: string, band: 'associate-to-director' },
  links: { email?: string, linkedin?: string },
  status: 'full-time' | 'contract' | 'hiring',
  startDate?: date,
}
```
**Deliverable:** Template with compensation bands, open roles marked "hiring"

### `advisors.js`
**Template:** Dignifi partnership + city govt liaisons + developer advisors
```javascript
{
  id: string,
  name: string,
  organization: string,
  role: string,
  category: 'partner' | 'government' | 'technical',
  bio: string (75-100 words),
  expertise: string[],
  links: { email?: string, website?: string, org_url?: string },
  logo?: string (org logo path),
  featured: boolean,
}
```
**Deliverable:** Dignifi as featured partner + 8-10 advisors across categories

### `newsUpdates.js`
**Template:** Real press coverage, partnerships, funding milestones
```javascript
{
  id: string,
  date: date,
  title: string,
  source: string,
  category: 'funding' | 'partnership' | 'policy' | 'coverage',
  excerpt: string (100-150 words),
  url?: string,
  featured: boolean,
  image?: string,
}
```
**Deliverable:** 12-15 news items with template structure

---

## 2. PAGE UPDATES (`pages/`)

### `board.jsx` → Enhanced Version
- Replace Lorem ipsum with real member data
- Add category badges (color-coded: orange/blue/green/purple)
- Show governance structure with real percentages
- Add "empty" slots for upcoming appointments
- Board application form integration

### `team.jsx` → NEW Page
- Department sections with color-coding
- Compensation transparency (bands, not exact salaries)
- Open roles with "We're Hiring" CTAs
- Team culture mission statement
- Application links to job listings

### `advisors.jsx` → NEW Page
- Dignifi partnership featured section
- Advisor grid with logos
- Category filters: Partner / Government / Technical
- Contact forms for advisor inquiries
- "Become an Advisor" application

### `careers.jsx` → NEW Page
- Open roles with responsibilities + requirements
- Application process timeline
- Company culture values
- Benefits overview
- LinkedIn job postings embedded

### `news.jsx` → Enhanced Version
- Real press coverage timeline
- Category filtering (funding/partnership/policy/coverage)
- External links to full articles
- Social sharing per article
- Archive view by year

---

## 3. COMPONENT ENHANCEMENTS (`components/`)

### `BoardMemberCard.jsx`
```jsx
Props: member {name, title, category, bio, expertise, links, image}
Features:
- Category badge (color-coded)
- Expertise tags
- Email + LinkedIn links
- Fallback avatar
- Hover effect → show bio preview
```

### `TeamMemberCard.jsx`
```jsx
Props: member {name, role, department, bio, compensation, status}
Features:
- Department color (header stripe)
- Role + department breadcrumb
- Status badge (full-time/contract/hiring)
- Compensation band (public but banded)
- LinkedIn link
- "Apply" CTA if hiring
```

### `AdvisorCard.jsx`
```jsx
Props: advisor {name, organization, role, category, bio, logo, links}
Features:
- Organization logo
- Category badge
- Expertise chips
- Contact CTA
- Featured flag styling
```

### `NewsCard.jsx`
```jsx
Props: item {title, date, source, category, excerpt, url, featured}
Features:
- Category badge
- "Read Full Article" link
- Social share buttons
- Featured (large) vs regular (compact) layout
```

---

## 4. OPENGRAPH & SEO ENHANCEMENTS

### `lib/og-tags.js` → Extended
**New OG configurations:**
- `boardOGTags` - 50% formerly incarcerated leadership
- `teamOGTags` - Transparent salary bands, 15 roles
- `advisorsOGTags` - Dignifi partnership featured
- `careersOGTags` - Join our team, 5 open roles
- `newsOGTags` - Real impact, real voices

### New OG Images
- `board-og-preview.png` (1200×630) - Board diversity visual
- `team-og-preview.png` (1200×630) - Team culture snapshot
- `advisors-og-preview.png` (1200×630) - Partnership logos
- `careers-og-preview.png` (1200×630) - "We're Hiring" visual

### Schema Markup (`lib/schema.js` → NEW)
```javascript
- Person schema for board/team members
- Organization schema for Dignifi + partners
- JobPosting schema for careers page
- NewsArticle schema for news items
- BreadcrumbList schema for navigation
```

---

## 5. MIGRATION CHECKLIST

### Phase 1a: Data Structure (Week 1)
- [ ] Create `lib/data/` directory
- [ ] Build `boardMembers.js` template
- [ ] Build `teamMembers.js` template with compensation bands
- [ ] Build `advisors.js` template with Dignifi featured
- [ ] Build `newsUpdates.js` template
- [ ] Create data validation utilities

### Phase 1b: Components (Week 1)
- [ ] Create `BoardMemberCard.jsx`
- [ ] Create `TeamMemberCard.jsx`
- [ ] Create `AdvisorCard.jsx`
- [ ] Create `NewsCard.jsx`
- [ ] Integrate into existing pages

### Phase 1c: Pages (Week 2)
- [ ] Update `board.jsx` with real data + components
- [ ] Create `team.jsx` new page
- [ ] Create `advisors.jsx` new page
- [ ] Create `careers.jsx` new page
- [ ] Update `news.jsx` with real coverage

### Phase 1d: SEO & OG (Week 2)
- [ ] Extend `lib/og-tags.js` with new page configs
- [ ] Create `lib/schema.js` for JSON-LD markup
- [ ] Design 4 new OG preview images
- [ ] Update `pages/_document.jsx` with schema injection
- [ ] Test with Meta/LinkedIn debuggers

### Phase 1e: Testing & Refinement (Week 2-3)
- [ ] Accessibility audit (WCAG AA)
- [ ] Mobile responsiveness test
- [ ] OG preview validation
- [ ] Performance testing
- [ ] Team review & feedback

---

## 6. DATA ENTRY GUIDE

### Board Members (13 total)
Collect from real directors:
- Headshot (400×400px minimum)
- Full bio (150-250 words)
- Expertise areas (3-5 tags)
- Contact (email + LinkedIn URL)
- Join year for board

### Team Members (15 roles)
Collect from staff:
- Role + department
- 100-150 word bio
- Compensation band (not exact)
- Full-time / Contract status
- LinkedIn profile URL
- Start date

### Advisors (10-12 total)
Include:
- **Dignifi (featured)** - Partnership details + contact
- **City liaisons (3-4)** - Government relationships
- **Tech advisors (3-4)** - Developer partnerships
- **Community partners (2-3)** - Reentry orgs

### News Items (12-15)
Sources:
- Press releases
- Media coverage
- Funding announcements
- Partnership launches
- Policy wins
- Impact milestones

---

## 7. INTEGRATION POINTS

### Navigation (`Header.jsx`)
- Add "Team" link
- Add "Advisors" link  
- Update "About" dropdown with new pages
- Add "Careers" CTA

### Footer (`Footer.jsx`)
- "Careers" link
- "Board of Directors" link
- "Contact an Advisor" link

### Home Page (`index.jsx`)
- Featured advisor card (Dignifi)
- "We're Hiring" callout
- Latest news updates (3 items)

### Contact Page (`contact.jsx`)
- Form routing: "Advisor Inquiry" option
- "Career Question" option
- "General Inquiry" option

---

## 8. DELIVERABLES SUMMARY

**Files Created:** 12
- 4 data structure files
- 4 new components
- 5 new/updated pages
- Extended SEO/OG config
- Schema markup utility

**Total Migration Scope:**
- 13 board members
- 15 team members
- 10-12 advisors
- 15 news items
- 4 new OG images
- Full schema markup coverage

---

## NEXT STEPS

1. **Collect real data** from team/board/partners
2. **Design OG images** matching brand
3. **Set up data files** with templates
4. **Build components** with Tailwind styling
5. **Update pages** with real content
6. **Test & validate** before production deploy

**Timeline:** 2-3 weeks for complete Phase 1

