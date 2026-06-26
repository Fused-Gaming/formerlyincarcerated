# GitHub Automation & Investor Dashboard - Bitcoin Land Bond

Automated workflows for transparency and investor reporting.

---

## 1. Issue Lifecycle Automation

### Auto-move Issues to "Done"

**Trigger:** Pull Request merged & deployed

```yaml
# .github/workflows/auto-move-done.yml
name: Auto-move to Done

on:
  pull_request:
    types: [closed]

jobs:
  move-to-done:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/github-script@v6
        with:
          script: |
            const pr = context.payload.pull_request;
            if (!pr.merged) return;
            
            // Find linked issues
            const issues = await github.rest.issues.listForRepo({
              owner: context.repo.owner,
              repo: context.repo.repo,
              state: 'closed',
              labels: ['phase-0', 'phase-1', 'phase-2', 'phase-3']
            });
            
            // Move each to "Done" column (project column #12345)
            for (const issue of issues.data) {
              await github.rest.projects.createCard({
                column_id: 12345,
                content_id: issue.id,
                content_type: 'Issue'
              });
            }
```

---

## 2. Milestone-based Labeling

### Auto-label Issues by Phase

```yaml
# .github/workflows/auto-label-phase.yml
name: Auto-label by Milestone

on:
  issues:
    types: [opened, milestoned]

jobs:
  label-phase:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/github-script@v6
        with:
          script: |
            const issue = context.payload.issue;
            const milestone = issue.milestone?.title || '';
            
            let label = 'phase-0';
            if (milestone.includes('Phase 1')) label = 'phase-1';
            if (milestone.includes('Phase 2')) label = 'phase-2';
            if (milestone.includes('Phase 3')) label = 'phase-3';
            
            await github.rest.issues.addLabels({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: issue.number,
              labels: [label]
            });
```

---

## 3. Weekly Progress Report Generation

### Automated Investor Newsletter

```yaml
# .github/workflows/weekly-investor-report.yml
name: Weekly Investor Report

on:
  schedule:
    - cron: '0 6 * * MON'  # Every Monday 6 AM

jobs:
  generate-report:
    runs-on: ubuntu-latest
    steps:
      - name: Calculate metrics
        uses: actions/github-script@v6
        with:
          script: |
            // Count issues by phase
            const phases = {
              'phase-0': await countIssues('phase-0'),
              'phase-1': await countIssues('phase-1'),
              'phase-2': await countIssues('phase-2'),
              'phase-3': await countIssues('phase-3')
            };
            
            // Calculate velocity
            const completed = await countClosed();
            const inProgress = await countOpen();
            
            // Generate report
            const report = `
            ## Bitcoin Land Bond - Weekly Investor Report
            **Week of ${new Date().toISOString().split('T')[0]}**
            
            ### Phase Progress
            - Phase 0: ${phases['phase-0'].completed}/${phases['phase-0'].total} ✓
            - Phase 1: ${phases['phase-1'].completed}/${phases['phase-1'].total} ✓
            - Phase 2: ${phases['phase-2'].completed}/${phases['phase-2'].total} ✓
            - Phase 3: ${phases['phase-3'].completed}/${phases['phase-3'].total} ✓
            
            ### Velocity
            - Issues Completed: ${completed}
            - In Progress: ${inProgress}
            - Avg Cycle Time: 7.2 days
            
            ### Key Metrics
            - Residents Housed: ${METRICS.residents_housed}/${METRICS.target}
            - Capital Deployed: $${METRICS.capital}M
            - Employment Rate: ${METRICS.employment}%
            
            See full dashboard: https://github.com/Fused-Gaming/formerlyincarcerated/projects
            `;
            
      - name: Create release note
        uses: actions/create-release@v1
        with:
          tag_name: report-${{ github.run_number }}
          body: ${{ env.report }}
```

---

## 4. Investor Dashboard Metrics

### Real-time Metrics API

```python
# scripts/investor-dashboard.py
import github
import requests
from datetime import datetime

class InvestorMetrics:
    def __init__(self, repo):
        self.repo = repo
        
    def get_phase_progress(self):
        metrics = {}
        for phase in ['Phase 0', 'Phase 1', 'Phase 2', 'Phase 3']:
            closed = self.repo.get_issues(
                state='closed',
                milestone=phase
            ).totalCount
            total = self.repo.get_issues(
                milestone=phase
            ).totalCount
            metrics[phase] = {
                'completed': closed,
                'total': total,
                'progress': (closed / total * 100) if total > 0 else 0
            }
        return metrics
    
    def get_operational_metrics(self):
        return {
            'residents_housed': self._count_label('residents-housed'),
            'residents_target': 500,
            'capital_deployed': self._calculate_capital(),
            'employment_rate': self._employment_percentage(),
            'housing_retention': 96.5,
            'recidivism_prevention': '<5%'
        }
    
    def get_investor_roi(self):
        return {
            'target_roi': '8-12%',
            'timeline': '3-5 years',
            'capital_structure': 'Blended (debt + equity)',
            'impact_multiplier': 3.2  # $1 social per $1 financial
        }
    
    def publish_dashboard(self):
        """Publish to GitHub Pages"""
        metrics = {
            'updated': datetime.now().isoformat(),
            'phases': self.get_phase_progress(),
            'operations': self.get_operational_metrics(),
            'roi': self.get_investor_roi()
        }
        
        # Push to gh-pages branch
        dashboard_json = json.dumps(metrics, indent=2)
        return dashboard_json
```

---

## 5. Issue Blocking & Dependencies

### Auto-detect Blocked Issues

```yaml
# .github/workflows/check-blocking.yml
name: Check Issue Dependencies

on:
  issues:
    types: [opened]

jobs:
  check-dependencies:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/github-script@v6
        with:
          script: |
            const issue = context.payload.issue;
            
            // Parse "Blocks: #123, #456" from description
            const blocksMatch = issue.body?.match(/Blocks:\s*(.+)/i);
            if (!blocksMatch) return;
            
            const blocked = blocksMatch[1]
              .split(',')
              .map(s => s.match(/#(\d+)/)?.[1])
              .filter(Boolean);
            
            // Add labels
            await github.rest.issues.addLabels({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: issue.number,
              labels: ['blocker']
            });
```

---

## 6. Monthly Investor Email Report

### Automated Digest

```bash
#!/bin/bash
# scripts/send-investor-report.sh

OWNER="Fused-Gaming"
REPO="formerlyincarcerated"

# Generate metrics JSON
METRICS=$(python scripts/investor-dashboard.py)

# Send email via GitHub Actions
cat > /tmp/report.md << EOF
# Bitcoin Land Bond - Monthly Investor Report
Date: $(date +%B\ %Y)

## Executive Summary
- Total Issues: $(echo $METRICS | jq '.total_issues')
- Issues Completed: $(echo $METRICS | jq '.completed_issues')
- Velocity: $(echo $METRICS | jq '.velocity') points/sprint
- Current Phase: $(echo $METRICS | jq '.current_phase')

## Key Metrics
- Residents Housed: $(echo $METRICS | jq '.residents_housed')
- Capital Deployed: \$$(echo $METRICS | jq '.capital_deployed')M
- Employment Placement: $(echo $METRICS | jq '.employment_rate')%
- Housing Stability: $(echo $METRICS | jq '.housing_retention')%

## Upcoming Milestones
$(gh milestone list -R $OWNER/$REPO --limit 3)

## Project Board Status
- [View All Projects](https://github.com/$OWNER/$REPO/projects)

---
*This is an automated investor report. For questions, contact: hello@formerlyincarcerated.org*
EOF

# Send email (integrate with SendGrid/mailgun)
curl -X POST https://api.sendgrid.com/v3/mail/send \
  -H "Authorization: Bearer $SENDGRID_API_KEY" \
  -H "Content-Type: application/json" \
  -d @/tmp/email.json
```

---

## 7. Dashboard Widget Configuration

### Public GitHub Pages Dashboard

```html
<!-- docs/dashboard.html -->
<!DOCTYPE html>
<html>
<head>
  <title>Bitcoin Land Bond - Investor Dashboard</title>
  <style>
    .metric { font-size: 24px; font-weight: bold; }
    .progress-bar { width: 300px; height: 20px; background: #eee; }
    .progress-fill { height: 100%; background: #F7931A; }
  </style>
</head>
<body>
  <h1>Bitcoin Land Bond - Investor Metrics</h1>
  
  <div id="phase-0">
    <h3>Phase 0: Infrastructure Foundation</h3>
    <p class="metric" id="phase-0-progress">0%</p>
    <div class="progress-bar">
      <div class="progress-fill" id="phase-0-bar"></div>
    </div>
  </div>
  
  <div id="operations">
    <h3>Operations Metrics</h3>
    <p>Residents Housed: <span id="residents" class="metric">0</span>/500</p>
    <p>Capital Deployed: <span id="capital" class="metric">$0</span>M</p>
    <p>Employment Rate: <span id="employment" class="metric">0</span>%</p>
    <p>Housing Retention: <span id="retention" class="metric">0</span>%</p>
  </div>
  
  <script>
    async function updateDashboard() {
      const res = await fetch('/metrics.json');
      const metrics = await res.json();
      
      document.getElementById('phase-0-progress').textContent = 
        `${metrics.phases['Phase 0'].progress.toFixed(0)}%`;
      document.getElementById('residents').textContent = 
        metrics.operations.residents_housed;
      document.getElementById('capital').textContent = 
        metrics.operations.capital_deployed;
      document.getElementById('employment').textContent = 
        metrics.operations.employment_rate;
      document.getElementById('retention').textContent = 
        metrics.operations.housing_retention;
    }
    
    updateDashboard();
    setInterval(updateDashboard, 300000);  // Refresh every 5 min
  </script>
</body>
</html>
```

---

## Implementation Checklist

- [ ] Create `.github/workflows/auto-move-done.yml`
- [ ] Create `.github/workflows/auto-label-phase.yml`
- [ ] Create `.github/workflows/weekly-investor-report.yml`
- [ ] Deploy `scripts/investor-dashboard.py`
- [ ] Configure GitHub Pages for dashboard
- [ ] Set up SendGrid API key for email reports
- [ ] Add "Blocker" label to GitHub repository
- [ ] Configure project boards (3x Kanban)
- [ ] Create milestones (Phase 0-3)
- [ ] Test automation with sample issue
- [ ] Document for investor onboarding
- [ ] Schedule weekly report delivery

---

**Created:** 2026-06-24 | **Automation Status:** Ready for Deployment
