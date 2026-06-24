# Phase 1 Implementation Summary
**Bitcoin Land Bond - Website Data Migration**

---

## Quick Start Checklist

### Week 1: Data Structure Setup
- [ ] Create `lib/data/boardMembers.js` with 13-member template
- [ ] Create `lib/data/teamMembers.js` with 15-role template + compensation bands
- [ ] Create `lib/data/advisors.js` with Dignifi featured + 10-12 advisors
- [ ] Create `lib/data/newsUpdates.js` with 12-15 article template
- [ ] Create `lib/data/validation.js` for data integrity checks

### Week 1: Component Development
- [ ] Build `components/BoardMemberCard.jsx`
- [ ] Build `components/TeamMemberCard.jsx`
- [ ] Build `components/AdvisorCard.jsx`
- [ ] Build `components/NewsCard.jsx`
- [ ] All components: Mobile responsive, a11y compliant

### Week 2: Page Development
- [ ] Update `pages/board.jsx` - Integrate BoardMemberCard + real data
- [ ] Create `pages/team.jsx` - NEW page with TeamMemberCard grid
- [ ] Create `pages/advisors.jsx` - NEW page with AdvisorCard + Dignifi featured
- [ ] Create `pages/careers.jsx` - NEW page for hiring roles
- [ ] Update `pages/news.jsx` - Integrate NewsCard + real coverage
- [ ] Update `components/Header.jsx` navigation links
- [ ] Update `components/Footer.jsx` links

### Week 2: SEO & OG Configuration
- [ ] Extend `lib/og-tags.js` with new page configs
- [ ] Create `lib/schema.js` with JSON-LD generators
- [ ] Create 4 OG preview images (1200×630px each)
- [ ] Inject schemas into page heads
- [ ] Test OG tags on Facebook/LinkedIn/Twitter debuggers
- [ ] Validate JSON-LD schemas

### Week 3: Content & Testing
- [ ] Collect real board member data + headshots
- [ ] Collect real team member data + bios
- [ ] Collect advisor data + org logos
- [ ] Compile 12-15 news items + external links
- [ ] Run accessibility audit (WCAG AA)
- [ ] Mobile device testing
- [ ] Performance testing (Lighthouse)
- [ ] Team review + feedback iteration

---

## File Structure After Phase 1

```
formerlyincarcerated/
├── lib/data/
│   ├── boardMembers.js           # 13-member board template
│   ├── teamMembers.js            # 15-staff + compensation bands
│   ├── advisors.js               # Dignifi + 10-12 advisors
│   ├── newsUpdates.js            # 12-15 news items
│   └── validation.js             # Data integrity checks
│
├── components/
│   ├── BoardMemberCard.jsx       # NEW
│   ├── TeamMemberCard.jsx        # NEW
│   ├── AdvisorCard.jsx           # NEW
│   ├── NewsCard.jsx              # NEW
│   ├── Header.jsx                # UPDATED (nav links)
│   ├── Footer.jsx                # UPDATED (links)
│   ├── OpenGraphHead.jsx         # (no change)
│   ├── PageLayout.jsx            # (no change)
│   └── ...
│
├── pages/
│   ├── board.jsx                 # UPDATED (real data)
│   ├── team.jsx                  # NEW
│   ├── advisors.jsx              # NEW
│   ├── careers.jsx               # NEW
│   ├── news.jsx                  # UPDATED (real coverage)
│   ├── index.jsx                 # UPDATED (featured sections)
│   ├── contact.jsx               # UPDATED (form routing)
│   └── ...
│
├── lib/
│   ├── og-tags.js                # EXTENDED (new page configs)
│   └── schema.js                 # NEW (JSON-LD generators)
│
├── public/
│   ├── team/
│   │   ├── board/                # Board member headshots
│   │   └── staff/                # Staff photos
│   ├── advisors/                 # Organization logos
│   ├── news/                     # Article preview images
│   ├── board-og-preview.png      # NEW OG image
│   ├── team-og-preview.png       # NEW OG image
│   ├── advisors-og-preview.png   # NEW OG image
│   └── careers-og-preview.png    # NEW OG image
│
└── docs/website-migration/       # This documentation
    ├── PHASE_1_MIGRATION_PLAN.md
    ├── DATA_STRUCTURE_TEMPLATES.md
    ├── COMPONENT_SPECIFICATIONS.md
    ├── SEO_AND_SCHEMA_GUIDE.md
    └── IMPLEMENTATION_SUMMARY.md (this file)
```

---

## Key Features by Component

### BoardMemberCard
✓ Category badge (color-coded)
✓ Expertise tags
✓ Email + LinkedIn links
✓ Fallback avatar
✓ Hover bio preview
✓ WCAG AA compliant

### TeamMemberCard
✓ Department color stripe
✓ Status badge (Full-time/Contract/Hiring)
✓ Compensation band (transparent but banded)
✓ "Apply Now" CTA for open roles
✓ Start date or "Open Position"
✓ LinkedIn integration

### AdvisorCard
✓ Featured vs regular layouts
✓ Organization logo + branding
✓ Expertise chips
✓ Category filtering
✓ Contact links (email, website, org)
✓ Hover state animations

### NewsCard
✓ Featured vs compact layouts
✓ Category badge + publication source
✓ Social share buttons (featured)
✓ External link to full article
✓ Date + category filtering
✓ Responsive image handling

---

## Data Requirements

### Board Members (13 total)
Per member:
- Name + title
- Category (formerly-incarcerated/housing/finance/government)
- 150-250 word bio
- 3-5 expertise tags
- Email + LinkedIn URL
- Headshot (400×400px)
- Join year

**Collection point:** Direct from board directors

### Team Members (15 roles)
Per role:
- Name + job title
- Department (operations/legal/policy/housing/community)
- 100-150 word bio
- Compensation band (associate/specialist/senior/lead/director)
- Full-time / Contract / Hiring status
- Start date
- LinkedIn URL
- Optional: Staff photo

**Collection point:** HR + department heads

### Advisors (10-12 total)
**Dignifi (1 featured):**
- Company name + role
- 100-word partnership description
- Contact email + website
- Logo (250×250px minimum)
- Expertise: Fintech, Credit Access, Financial Inclusion

**Government liaisons (3-4):**
- Name + organization + role
- Brief bio
- Contact info
- Gov't seal or logo

**Technical advisors (3-4):**
- Name + organization + role
- Expertise areas
- Website + LinkedIn
- Company logo

**Community partners (2-3):**
- Organization name + contact
- Partnership description
- Logo + website
- Expertise areas

**Collection point:** Partnership team + external requests

### News Items (12-15 total)
Per item:
- Title + publication source
- Category (funding/partnership/policy/coverage)
- 100-150 word excerpt
- External URL to full article
- Date published
- Optional: Preview image (800×400px)
- Featured flag (for Dignifi partnership, major funding)

**Collection point:** Press releases + media monitoring

---

## Color Coding System

### Board Member Categories
| Category | Color | Hex |
|----------|-------|-----|
| Formerly Incarcerated | Orange | #F7931A |
| Housing | Blue | #3B82F6 |
| Finance | Green | #10B981 |
| Government | Purple | #8B5CF6 |

### Department Colors (Team)
| Department | Color | Hex |
|------------|-------|-----|
| Operations | Blue | #0066CC |
| Legal | Red | #DC2626 |
| Policy | Green | #16A34A |
| Housing | Yellow | #CA8A04 |
| Community | Purple | #7C3AED |

### News Categories
| Category | Color | Icon |
|----------|-------|------|
| Funding | Green | 💰 |
| Partnership | Blue | 🤝 |
| Policy | Purple | 📜 |
| Coverage | Orange | 📰 |

---

## Compensation Transparency Model

**Salary Bands (Public):**
```
Associate:  $45k - $65k
Specialist: $65k - $85k
Senior:     $85k - $110k
Lead:       $110k - $140k
Director:   $140k - $180k
```

**Page Strategy:**
- Show band ranges (not exact salaries)
- Display on team card
- Explain transparency rationale
- Link to full compensation philosophy page (future)

---

## Integration Points

### Header Navigation
```
Home | Impact | Model | Whitepaper | About ▼
                                       ├── Team
                                       ├── Board
                                       ├── Advisors
                                       └── Careers
News | FAQ | Contact | 🔵 Donate
```

### Footer Links (New)
- Team
- Careers
- Board of Directors
- Advisors & Partners
- News Archive

### Home Page Updates
- Featured Dignifi advisor card (under partnerships)
- "We're Hiring" callout (above FAQ)
- 3 latest news items (news section)

### Contact Page
- Form dropdown: "Advisor Inquiry", "Career Question", "General"
- Route to appropriate email

---

## OG Image Design Checklist

Each image (1200×630px PNG):
- [ ] Bitcoin Land Bond logo/branding
- [ ] Clear headline text
- [ ] Visual hierarchy
- [ ] On-brand color palette
- [ ] High contrast (dark text on light, or white on dark)
- [ ] No copyright issues
- [ ] Compressed < 200KB

**Board:** Board diversity visual + governance
**Team:** Team collaboration + "15 Roles"
**Advisors:** Dignifi logo large + "10+ Partners"
**Careers:** "We're Hiring" + "5 Open Roles"

---

## Testing Before Launch

### Functionality
- [ ] All cards render with placeholder data
- [ ] Cards responsive on mobile/tablet/desktop
- [ ] Sorting/filtering works (departments, categories)
- [ ] External links open correctly
- [ ] Email links trigger mail client

### Accessibility
- [ ] WAVE audit shows no errors
- [ ] Keyboard navigation complete
- [ ] Screen reader announces all content
- [ ] Color contrast meets WCAG AA 4.5:1
- [ ] No focus traps

### Performance
- [ ] Lighthouse score > 90
- [ ] Images optimized (WebP + fallback)
- [ ] Lazy loading on non-featured
- [ ] No console errors

### SEO
- [ ] OG tags validate on all platforms
- [ ] JSON-LD schemas validate
- [ ] Meta titles/descriptions unique
- [ ] Breadcrumbs structure correctly
- [ ] Canonical URLs set

### Content
- [ ] No Lorem ipsum remains
- [ ] All links functional
- [ ] Data matches source documents
- [ ] Typos reviewed + corrected
- [ ] Team sign-off received

---

## Timeline Estimate

| Phase | Week | Deliverables | Owner |
|-------|------|--------------|-------|
| Data Setup | 1 | 4 data files, validation | Dev |
| Components | 1 | 4 new components, tests | Dev |
| Pages | 2 | 5 pages updated/created | Dev |
| SEO/OG | 2 | 4 OG images, schema markup | Design + Dev |
| Content | 3 | Real data entry, photos | Product + Team |
| Testing | 3 | Full audit, QA | QA + Dev |
| Launch | 3 | Deploy, monitor | Dev + Ops |

**Total: 2-3 weeks from data collection start**

---

## Success Metrics

### Visibility
- Board page: 50% formerly incarcerated representation clearly stated
- Team page: Compensation transparency builds trust
- Advisors: Dignifi partnership prominently featured
- Careers: Career growth path, open positions visible

### Engagement
- News section: 30%+ click-through to external articles
- Team cards: LinkedIn links drive profile visits
- Careers page: 10+ applications/month
- Advisor cards: Partnership inquiry leads

### SEO
- OG images appear correctly on social shares
- JSON-LD schemas show in Google Rich Results
- News page indexed and ranking
- Team/Board/Advisors ranking for brand searches

---

## Next Phase (Future)

After Phase 1 launch, consider:
- Phase 2: Interactive team directory with filtering
- Phase 3: Testimonials from formerly incarcerated residents
- Phase 4: Impact metrics dashboard
- Phase 5: Event calendar + webinar recordings

---

## Documentation References

- **PHASE_1_MIGRATION_PLAN.md** - Full migration strategy
- **DATA_STRUCTURE_TEMPLATES.md** - Data field definitions + examples
- **COMPONENT_SPECIFICATIONS.md** - Component API + styling details
- **SEO_AND_SCHEMA_GUIDE.md** - OG tags + schema markup
- **CLAUDE.md** - Project architecture + tech stack

---

**Status:** Ready for implementation
**Last Updated:** 2026-06-24
**Approval Required:** Product + Design + Dev lead

