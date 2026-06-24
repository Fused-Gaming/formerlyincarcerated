# GitHub Projects Setup - Bitcoin Land Bond

Kanban boards for investor transparency and operational tracking.

---

## Project 1: Bitcoin Land Bond MVP Board

**Type:** Kanban | **Owner:** Engineering Lead | **Visibility:** Public

### Board Columns

#### Backlog
Issues awaiting grooming and assignment
- Sort by: Priority, then Phase
- Auto-add: New GitHub issues
- SLA: Move to In Progress within 5 days

#### In Progress
Currently active work (max 15 concurrent)
- Assigned to developer or team
- Target: Complete within phase cycle
- Update: Daily standup sync
- Drag to "Review" when PR opened

#### Review
Code review & QA verification
- PR linked to issue
- Requires 2 approvals minimum
- Auto-move to "Testing" when merged
- Block: Security/compliance issues

#### Testing
Verification against acceptance criteria
- QA tester assigned
- Test plan executed
- Performance benchmarks verified
- Manual testing completion: <24hrs

#### Done
Completed & deployed to production
- Automatically moved when PR merged + deployed
- Closes associated issues
- Counted in sprint velocity
- Investor dashboard updated

### Board Automation

```yaml
# Auto-move when PR is merged
on: pull_request.merged
  if: labels contains "phase-0" or "phase-1" or "phase-2" or "phase-3"
  then: move_to_column("Done")
  and: close_related_issues()
  and: notify_investors()
```

---

## Project 2: Oakland/SF Pilot Operations

**Type:** Kanban | **Owner:** Operations Lead | **Visibility:** Private

### Board Columns

#### Property Acquisition
- Pre-construction phase
- Title clearance
- Zoning approval
- 10 properties target (Phase 1)

#### Enrollment
- Resident intake
- Background screening (Dignifi)
- Financial assessment
- 50 residents target (Phase 1)

#### Services
- Housing support (landlord relations)
- Employment placement (partner employers)
- Financial literacy
- Health services coordination

#### Impact
- Monthly metrics collection
- Resident success tracking
- Asset accumulation monitoring
- ROI calculation

#### Government
- City partnership agreements
- Compliance reporting
- Policy advocacy
- Grant applications

### Key Metrics (Auto-Updated)

```
Residents Housed: 0/50 (0%) ↑
Properties Operational: 0/10 (0%) ↑
Employment Placements: 0/35 (0%) ↑
Avg Monthly Cost: $0 (Target: <$800)
Capital Deployed: $0 / $2.5M (0%)
```

---

## Project 3: Scale to 5 Cities

**Type:** Kanban | **Owner:** Growth Lead | **Visibility:** Public

### Board Columns

#### LA Expansion
- Market research
- Property acquisition (20 units)
- Partnership development
- Target: Q4 2026

#### Chicago Expansion
- Market analysis
- Real estate scouting
- Government relations
- Target: Q1 2027

#### NYC Expansion
- Feasibility study
- Regulatory navigation
- Capital partners
- Target: Q2 2027

#### Flexible Cities
- Secondary markets evaluation
- Remote operations model
- Franchise-style partnerships
- Target: Rolling basis

#### Playbook
- Operations manual documentation
- Training curriculum
- Replication templates
- Quality assurance standards

### Expansion Metrics

```
Target Cities: 5 (Oakland, SF, LA, Chicago, NYC)
Target Residents: 500+ across 5 cities
Target Capital: $25M deployed
Timeline: 2027-Q2 completion
ROI Target: 10% + social impact
```

---

## Investor Dashboard Integration

### Public Metrics Widget

```json
{
  "phase": "Phase 1",
  "progress": 45,
  "residents_housed": 22,
  "residents_target": 50,
  "capital_deployed": "$1.2M",
  "capital_target": "$2.5M",
  "employment_rate": 68,
  "housing_retention": 96,
  "phases_complete": 0,
  "phases_total": 4
}
```

### Access URLs

- **MVP Board:** `/Fused-Gaming/formerlyincarcerated/projects/1`
- **Operations Board:** `/Fused-Gaming/formerlyincarcerated/projects/2` (Private)
- **Scale Board:** `/Fused-Gaming/formerlyincarcerated/projects/3`

---

## Board Synchronization

### Real-time Updates

| Trigger | Action | Destination |
|---------|--------|-------------|
| Issue created | Add to Backlog | MVP Board |
| PR merged | Move to Done | MVP Board + Operations Board |
| Milestone completed | Update investor dashboard | Public widget |
| Issue closed | Calculate velocity | Sprint report |

### Daily Auto-Refresh
- 6:00 AM: Metrics calculation
- 12:00 PM: Investor dashboard update
- 5:00 PM: Team notification summary
- 11:00 PM: Backup & archive

---

## Configuration (API)

```bash
# Create project
POST /repos/{owner}/{repo}/projects
{
  "name": "Bitcoin Land Bond MVP Board",
  "body": "Investor-facing development roadmap",
  "state": "open"
}

# Add column
POST /projects/{project_id}/columns
{"name": "In Progress"}

# Move issue to column
POST /projects/columns/cards
{
  "content_id": {issue_id},
  "content_type": "Issue"
}
```

---

**Total Projects:** 3 boards
**Total Columns:** 15 active
**Update Frequency:** Real-time with daily sync
**Investor Visibility:** 2 of 3 public

---

**Created:** 2026-06-24 | **Last Updated:** 2026-06-24
