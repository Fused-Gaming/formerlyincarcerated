# Implementation Guide: GitHub Project Setup

Step-by-step deployment for Bitcoin Land Bond investor transparency system.

## Phase A: Manual Setup (1-2 days)

### 1. Create Milestones
```bash
# Via GitHub CLI
gh milestone create -R Fused-Gaming/formerlyincarcerated \
  --title "Phase 0: Infrastructure Foundation" \
  --description "30-day infrastructure and legal setup" \
  --due-date 2026-07-15

# Repeat for Phase 1, 2, 3 (see GITHUB_MILESTONES.md)
```

### 2. Setup Kanban Boards
1. Go to `github.com/Fused-Gaming/formerlyincarcerated/projects`
2. Click "New Project"
3. Select "Board" template
4. Name: "Bitcoin Land Bond MVP Board"
5. Add columns: Backlog, In Progress, Review, Testing, Done
6. Repeat for Operations and Scale boards

### 3. Configure Board Settings
```bash
# For MVP Board:
# - Set default column: Backlog
# - Enable: Auto-add new issues
# - Enable: Auto-close merged PRs
# - Visibility: Public

# For Operations Board:
# - Visibility: Private
# - Team access: Operations + Eng leads

# For Scale Board:
# - Visibility: Public
# - Default sort: Priority, Phase
```

---

## Phase B: Create Issues (1 week)

### Template: Copy & Modify

```markdown
## [Category] Issue Title

**Milestone:** Phase X
**Labels:** category, type, priority, phase-X

### Description
[From GITHUB_ISSUES.md templates]

### Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

### Acceptance Criteria
- [ ] Verification steps

### Assignee
[Team member]

### Related Issues
Blocks: #123, #456
Related to: #789
```

### Bulk Create via CLI
```bash
# Create from CSV (convert GITHUB_ISSUES.md to CSV)
while IFS=',' read title phase labels; do
  gh issue create -R Fused-Gaming/formerlyincarcerated \
    --title "$title" \
    --milestone "$phase" \
    --label "$labels"
done < issues.csv
```

### Issue Categories (120+ total)

| Category | Count | Phase |
|----------|-------|-------|
| Blockchain | 12 | Phase 0 |
| Backend API | 15 | Phase 0-1 |
| Frontend | 10 | Phase 1 |
| Operations | 20 | Phase 1-2 |
| Dignifi | 8 | Phase 1 |
| Marketing | 12 | Phase 0-1 |
| Legal | 6 | Phase 0 |
| Infrastructure | 20+ | Phase 0-1 |
| Testing | 10+ | Phase 0-2 |
| Documentation | 5+ | All |

---

## Phase C: Deploy Automation (2-3 days)

### 1. Create GitHub Actions Workflows

```bash
mkdir -p .github/workflows

# Copy workflows from GITHUB_AUTOMATION.md
touch .github/workflows/auto-move-done.yml
touch .github/workflows/auto-label-phase.yml
touch .github/workflows/weekly-investor-report.yml
touch .github/workflows/check-blocking.yml
```

### 2. Configure Secrets

Go to Settings → Secrets and Variables → Actions

```bash
# Required secrets:
SENDGRID_API_KEY=SG.xxx...
INVESTOR_EMAIL_LIST=emails@example.com
GITHUB_TOKEN=ghp_xxx...  # Auto-provided
```

### 3. Deploy Scripts

```bash
# Create scripts directory
mkdir -p scripts

# Add Python script
cp scripts/investor-dashboard.py .

# Add shell scripts
cp scripts/send-investor-report.sh .

# Make executable
chmod +x scripts/*.sh
```

### 4. Test Workflows

```bash
# Manually trigger test
gh workflow run auto-label-phase.yml -R Fused-Gaming/formerlyincarcerated

# Check status
gh workflow view auto-label-phase.yml -R Fused-Gaming/formerlyincarcerated
```

---

## Phase D: Setup Dashboard (1 day)

### 1. Create GitHub Pages Site

```bash
# Enable in Settings → Pages
# Source: gh-pages branch
# Custom domain: dashboard.formerlyincarcerated.org (optional)

git checkout --orphan gh-pages
rm -rf *
```

### 2. Deploy Dashboard HTML

```bash
# Copy dashboard.html to docs/
cp docs/github-setup/dashboard.html docs/dashboard.html

# Create metrics.json endpoint
echo '{}' > docs/metrics.json

# Commit and push
git add docs/
git commit -m "Add investor dashboard"
git push origin gh-pages
```

### 3. Link from Milestones

Add dashboard URL to each milestone description:

```markdown
## Phase 1: Operational MVP
Due: 2026-08-30

**Investor Dashboard:** https://formerlyincarcerated.org/dashboard

**Current Status:**
- Issues: 45/50 (90%)
- Residents: 22/50 (44%)
- Capital: $1.2M/$2.5M (48%)
```

---

## Phase E: Populate Investor Access (1 day)

### 1. Create Team

```bash
# Settings → Teams → New Team
# Name: "Investor Advisory Board"
# Add team members
# Grant: Read access (milestones, boards, dashboard)
```

### 2. Share Resources

Email to investors:
```
Subject: Bitcoin Land Bond - Investor Transparency Portal

Hello,

We're excited to share our project management infrastructure 
with our investors.

**Public Resources:**
- Milestones: github.com/.../milestones
- MVP Board: github.com/.../projects/1
- Scale Board: github.com/.../projects/3
- Dashboard: formerlyincarcerated.org/dashboard

**Your Access:**
- Accept team invitation (link)
- Watch repository for updates
- Subscribe to weekly reports (email)

Questions? Reply to this email.

Best regards,
Bitcoin Land Bond Team
```

### 3. Onboarding Call

- 30-minute walkthrough
- Show all 3 boards
- Explain metrics calculation
- Q&A

---

## Phase F: Monitoring & Maintenance

### Weekly Tasks
- [ ] Update metrics (Monday 6 AM)
- [ ] Review progress (Monday standup)
- [ ] Send investor digest (Monday afternoon)

### Monthly Tasks
- [ ] Verify milestone progress
- [ ] Update ROI projections
- [ ] Archive completed issues
- [ ] Investor board meeting

### Quarterly Tasks
- [ ] Phase completion assessment
- [ ] Milestone adjustment
- [ ] Team retrospective
- [ ] Update documentation

---

## Rollout Timeline

| Date | Phase | Duration | Owner |
|------|-------|----------|-------|
| 2026-06-24 | A: Manual Setup | 1-2 days | Tech Lead |
| 2026-06-26 | B: Create Issues | 1 week | Product Manager |
| 2026-07-03 | C: Deploy Automation | 2-3 days | DevOps |
| 2026-07-06 | D: Setup Dashboard | 1 day | DevOps |
| 2026-07-07 | E: Investor Access | 1 day | Investor Relations |
| 2026-07-08 | F: Launch & Training | - | All Hands |

---

## Success Criteria

✅ **Complete when:**
- [ ] All 4 milestones created and visible
- [ ] All 3 project boards configured
- [ ] 120+ issues created and assigned
- [ ] All 4 GitHub Actions workflows running
- [ ] Dashboard live and updating
- [ ] 10+ investors with access
- [ ] First weekly report delivered
- [ ] Zero broken links in documentation

---

## Troubleshooting

### Issue: Workflows not triggering
```bash
# Check workflow syntax
gh workflow view auto-label-phase.yml

# Manually trigger
gh workflow run auto-label-phase.yml

# View logs
gh run list -R Fused-Gaming/formerlyincarcerated
```

### Issue: Dashboard not updating
```bash
# Check metrics.json generation
python scripts/investor-dashboard.py > /tmp/metrics.json

# Verify JSON is valid
cat /tmp/metrics.json | jq '.'

# Push to gh-pages
git add docs/metrics.json
git commit -m "Update metrics"
git push origin gh-pages
```

### Issue: Metrics calculation incorrect
- Verify issue milestone assignments
- Check label taxonomy matches automation
- Run dashboard script manually
- Compare with manual count

---

## Runbook: Weekly Investor Report

```bash
#!/bin/bash
# scripts/weekly-report.sh

DATE=$(date +%Y-%m-%d)
OWNER="Fused-Gaming"
REPO="formerlyincarcerated"

echo "=== Bitcoin Land Bond Weekly Report ==="
echo "Date: $DATE"
echo ""

# Get phase progress
for phase in "Phase 0" "Phase 1" "Phase 2" "Phase 3"; do
  CLOSED=$(gh issue list -R $OWNER/$REPO \
    --search "milestone:\"$phase\" is:closed" --json number | jq length)
  TOTAL=$(gh issue list -R $OWNER/$REPO \
    --search "milestone:\"$phase\"" --json number | jq length)
  PERCENT=$((CLOSED * 100 / TOTAL))
  
  echo "$phase: $CLOSED/$TOTAL ($PERCENT%)"
done

echo ""
echo "Velocity: $(gh issue list -R $OWNER/$REPO \
  --search "closed:>=$DATE-7d" --json number | jq length) issues closed this week"
```

---

**Created:** 2026-06-24
**Last Updated:** 2026-06-24
**Implementation Status:** Ready to Deploy
**Estimated Effort:** 5-7 days (1 person equivalent)
**Success Rate Target:** 99% (automated processes)
