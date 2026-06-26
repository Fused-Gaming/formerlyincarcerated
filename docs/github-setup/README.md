# Bitcoin Land Bond - GitHub Project Setup Guide

Complete infrastructure for investor-transparent project management and impact reporting.

## Contents

### 1. **GITHUB_MILESTONES.md** (4 Phases)
- Phase 0: Infrastructure Foundation (2026-07-15)
- Phase 1: Operational MVP (2026-08-30)
- Phase 2: Operations Launch (2026-10-15)
- Phase 3: Scale to 5 Cities (2027-Q2)

### 2. **GITHUB_ISSUES.md** (120+ Issues)
- Blockchain layer (12 issues)
- Backend API (15 issues)
- Frontend/website (10 issues)
- Operations (20 issues)
- Dignifi integration (8 issues)
- Marketing/partnerships (12 issues)
- Legal/compliance (6 issues)
- Cross-cutting concerns (37+ issues)

### 3. **GITHUB_PROJECTS.md** (3 Kanban Boards)
- MVP Board: Backlog → In Progress → Review → Testing → Done
- Oakland/SF Operations: Property Acquisition → Enrollment → Services → Impact → Government
- Scale to 5 Cities: LA → Chicago → NYC → Flexible → Playbook

### 4. **GITHUB_AUTOMATION.md** (7 Workflows)
- Auto-move issues to "Done" on PR merge
- Auto-label issues by milestone/phase
- Weekly investor progress reports
- Real-time investor dashboard metrics
- Issue dependency blocking
- Monthly investor email digest
- Public GitHub Pages dashboard

## Quick Setup (Manual)

### Step 1: Create Milestones
```bash
# Create 4 milestones via GitHub UI or API
gh milestone create --owner Fused-Gaming --repo formerlyincarcerated \
  --title "Phase 0: Infrastructure Foundation" \
  --due-date 2026-07-15
```

### Step 2: Configure Project Boards
1. Go to Repository → Projects
2. Create 3 new Kanban boards (MVP, Operations, Scale)
3. Add columns per board spec (GITHUB_PROJECTS.md)
4. Enable auto-close when PR merged

### Step 3: Deploy Automation
```bash
# Copy workflows to .github/workflows/
cp GITHUB_AUTOMATION.md .github/workflows/

# Enable Actions in repository settings
# Configure secrets: SENDGRID_API_KEY, INVESTOR_EMAIL_LIST
```

### Step 4: Populate Issues
- Use GITHUB_ISSUES.md as template
- Create 120+ issues via GitHub CLI or UI
- Assign milestones and labels
- Link to project boards

## Investor Visibility

### Public Resources
- **Milestones:** `/milestones` (all phases visible)
- **MVP Board:** `/projects/1` (development progress)
- **Scale Board:** `/projects/3` (expansion roadmap)
- **Dashboard:** `formerlyincarcerated.org/dashboard` (metrics widget)

### Private Resources
- Operations Board: `/projects/2` (internal only)

## Key Metrics Tracked

| Metric | Phase 0 | Phase 1 | Phase 2 | Phase 3 |
|--------|---------|---------|---------|---------|
| Residents Housed | - | 50 | 150 | 500+ |
| Capital Deployed | $5M | $2.5M | $5M | $25M+ |
| Housing Retention | - | >95% | >98% | >98% |
| Employment Rate | - | >70% | >80% | >85% |
| ROI Target | - | 8-12% | 8-12% | 8-12% |

## Automation Workflows

1. **Auto-move to Done** → PR merged + deployed
2. **Label by Phase** → Issue milestone assigned
3. **Weekly Report** → Every Monday, 6 AM
4. **Dashboard Update** → Real-time via API
5. **Monthly Digest** → First of month email
6. **Dependency Check** → Blocks tracking
7. **Archive/Backup** → Weekly automated

## Implementation Status

- [x] Milestone templates created
- [x] Issue templates created (120+)
- [x] Project board structure designed
- [x] Automation workflows documented
- [ ] Workflows deployed to .github/
- [ ] Secrets configured
- [ ] Issues created in GitHub
- [ ] Dashboard deployed
- [ ] Investor onboarding complete

## Next Steps

1. **Setup Phase (1-2 days)**
   - Manually create 4 milestones
   - Setup 3 Kanban boards
   - Configure GitHub Pages for dashboard

2. **Population Phase (1 week)**
   - Create 120+ issues from templates
   - Assign to appropriate milestones
   - Link to project boards

3. **Automation Phase (2-3 days)**
   - Deploy GitHub Actions workflows
   - Configure SendGrid/email integration
   - Test automation end-to-end

4. **Launch Phase (1 day)**
   - Enable public dashboard
   - Notify investors
   - Share milestone access
   - Training/onboarding call

## Files Location

```
formerlyincarcerated/
├── docs/github-setup/
│   ├── README.md (this file)
│   ├── GITHUB_MILESTONES.md
│   ├── GITHUB_ISSUES.md
│   ├── GITHUB_PROJECTS.md
│   └── GITHUB_AUTOMATION.md
│
├── .github/workflows/ (deploy automation here)
│   ├── auto-move-done.yml
│   ├── auto-label-phase.yml
│   ├── weekly-investor-report.yml
│   └── check-blocking.yml
│
└── docs/dashboard.html (public metrics widget)
```

## Support

For setup questions: `hello@formerlyincarcerated.org`
For technical issues: GitHub Issues on this repo
For investor questions: Investor relations team

---

**Created:** 2026-06-24
**Status:** Ready for Implementation
**Maintained by:** Bitcoin Land Bond Project Team
