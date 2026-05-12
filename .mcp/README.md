# MCP Framework Setup & Orchestration

## Overview

The Bitcoin Land Bond project uses the **Model Context Protocol (MCP)** ecosystem for intelligent tooling orchestration, featuring automated initialization on every Claude Code session and continuous package update monitoring.

### Technology Stack

- **@h4shed/mcp-cli** (v1.0.11): Command-line interface for MCP operations
- **@h4shed/mcp-core** (v1.0.11): Core protocol handler and server management
- **@h4shed/skill-syncpulse** (v0.2.0): Skill synchronization and orchestration engine

## Architecture

```
Session Start
    ↓
init-mcp.js (Initialization Script)
    ├── Load Configuration (.mcp/config/mcp.config.json)
    ├── Check Package Updates (npm outdated)
    ├── Verify MCP Integrity (directory structure)
    ├── Verify Dependencies (required packages)
    ├── Sync Skills (load available skills)
    └── Load Project Context (CLAUDE.md, configuration)
    ↓
preSessionStart Hooks Execute
    ├── check-package-updates
    ├── verify-mcp-integrity
    └── initialize-framework
    ↓
Skills Loaded
    ├── session-start-hook (setup & config)
    ├── update-config (harness settings)
    ├── review (PR analysis)
    ├── security-review (safety checks)
    ├── simplify (code quality)
    └── init (documentation)
    ↓
MCP Servers Connected
    ├── Vercel (deployment)
    ├── GitHub (repos & PRs)
    ├── Cloudflare (edge computing)
    └── Supabase (database)
    ↓
postSessionStart Hooks Execute
    ├── sync-skills
    └── load-project-context
```

## Configuration Files

### `.mcp/config/mcp.config.json`

Main configuration file for the MCP framework:

```json
{
  "name": "Bitcoin Land Bond - MCP Orchestration",
  "version": "1.0.0",
  "initialized": true,
  "servers": [
    { "name": "vercel", "enabled": true },
    { "name": "github", "enabled": true },
    { "name": "cloudflare", "enabled": true },
    { "name": "supabase", "enabled": true }
  ],
  "skills": [
    { "name": "session-start-hook", "enabled": true },
    { "name": "update-config", "enabled": true },
    { "name": "security-review", "enabled": true }
  ],
  "hooks": {
    "preSessionStart": [
      "check-package-updates",
      "verify-mcp-integrity",
      "initialize-framework"
    ],
    "postSessionStart": [
      "sync-skills",
      "load-project-context"
    ]
  }
}
```

### `.claudeignore`

File and directory filters for Claude Code sessions:

- MCP local runtime and cache (`.mcp/runtime/`, `.mcp/cache/`)
- Node modules and dependencies
- Environment files and secrets
- Build artifacts and cache
- Development temporary files

## Initialization Script

### Location: `.mcp/scripts/init-mcp.js`

Runs automatically on:
1. **Session Start** - via `npm run mcp:init`
2. **Session Resume** - checks for updates
3. **Package Installation** - via postinstall hook

**Checks performed:**

```javascript
✓ Check Package Updates
  → Identifies outdated @h4shed packages
  → Logs available updates
  
✓ Verify MCP Integrity
  → Ensures .mcp directory structure exists
  → Validates required configuration files
  
✓ Verify Dependencies
  → Confirms all MCP packages installed
  → Reports missing dependencies
  
✓ Sync Skills
  → Loads enabled skills from config
  → Prepares skill registry
  
✓ Load Project Context
  → Reads CLAUDE.md
  → Loads project configuration
```

## NPM Scripts

### MCP-Specific Commands

```bash
# Initialize framework (runs automatically on session start)
npm run mcp:init

# Check for package updates
npm run mcp:check-updates

# Initialize + Check Updates (recommended for resumed sessions)
npm run mcp:sync

# Automatic on npm install
npm run postinstall
```

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

## Session Hooks

### preSessionStart Hooks

Execute before skills are loaded:

1. **check-package-updates**
   - Runs `npm outdated`
   - Identifies updates for @h4shed packages
   - Warns if updates available

2. **verify-mcp-integrity**
   - Checks directory structure
   - Validates configuration files
   - Auto-creates missing directories

3. **initialize-framework**
   - Calls init-mcp.js
   - Performs all startup checks
   - Updates lastUpdated timestamp

### postSessionStart Hooks

Execute after skills are loaded:

1. **sync-skills**
   - Synchronizes available skills
   - Loads skill registry from config
   - Prepares skill context

2. **load-project-context**
   - Reads CLAUDE.md documentation
   - Loads project-specific configuration
   - Prepares development context

## Automation

### Automatic Initialization

Every Claude Code session automatically:

1. Runs `.mcp/scripts/init-mcp.js`
2. Checks for package updates
3. Verifies MCP integrity
4. Loads skills and configuration
5. Prepares project context

### Update Monitoring

On **resumed sessions**, the framework:

1. Checks if packages have been updated
2. Verifies `.mcp/config/mcp.config.json` integrity
3. Reloads configuration if changed
4. Synchronizes skill registry
5. Updates lastUpdated timestamp

**Manual check:**
```bash
npm run mcp:check-updates
# Shows available updates for:
# - @h4shed/mcp-cli
# - @h4shed/mcp-core
# - @h4shed/skill-syncpulse
```

## Available Skills

All skills are automatically loaded during session initialization:

| Skill | Purpose | Trigger |
|-------|---------|---------|
| `session-start-hook` | Setup and configuration | Session start |
| `update-config` | Configure Claude Code harness | On request |
| `review` | Pull request analysis | On request |
| `security-review` | Security analysis of changes | On request |
| `simplify` | Code quality and efficiency | On request |
| `init` | Initialize CLAUDE.md documentation | On request |

## MCP Servers

Connected to the following MCP servers:

### Vercel
- Project deployment management
- Preview deployment handling
- Environment configuration

### GitHub
- Repository management
- Pull request automation
- Issue tracking and automation

### Cloudflare
- Edge computing (Workers)
- R2 object storage
- D1 database operations
- KV namespace management

### Supabase
- PostgreSQL database
- Edge function deployment
- Authentication management
- Real-time subscriptions

## Directory Structure

```
.mcp/
├── config/
│   └── mcp.config.json          # Main configuration
├── scripts/
│   └── init-mcp.js              # Initialization script
├── skills/                       # Skill implementations
├── servers/                      # Server configurations
└── README.md                     # This file

.claudeignore                     # File filters for Claude Code

package.json                      # Updated with mcp:* scripts
```

## Quick Start

### First Time Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
   This automatically runs `postinstall` → `npm run mcp:init`

2. **Verify initialization:**
   ```bash
   npm run mcp:init
   ```
   You should see all checks pass ✓

3. **Check for updates:**
   ```bash
   npm run mcp:check-updates
   ```

### On Each Session

The framework automatically:
- ✓ Initializes on session start
- ✓ Checks package updates
- ✓ Verifies MCP integrity
- ✓ Loads skills and configuration
- ✓ Prepares project context

### On Resumed Sessions

To check for updates and reinitialize:
```bash
npm run mcp:sync
```

## Troubleshooting

### Issue: Init script fails

**Solution:** Verify all required files exist:
```bash
ls -la .mcp/config/mcp.config.json
ls -la .mcp/scripts/init-mcp.js
```

### Issue: Package updates available but not applied

**Solution:** Update packages:
```bash
npm update @h4shed/mcp-cli @h4shed/mcp-core @h4shed/skill-syncpulse
npm run mcp:init
```

### Issue: Skills not loading

**Solution:** Verify configuration:
```bash
cat .mcp/config/mcp.config.json | grep -A 10 '"skills"'
```

### Issue: .claudeignore not working

**Solution:** Verify file syntax and location:
```bash
ls -la .claudeignore
# Should be in project root
```

## Configuration Management

### Adding a New Skill

1. Update `.mcp/config/mcp.config.json`:
   ```json
   {
     "name": "my-skill",
     "enabled": true,
     "description": "Description"
   }
   ```

2. Reinitialize:
   ```bash
   npm run mcp:init
   ```

### Enabling/Disabling Servers

Edit `.mcp/config/mcp.config.json`:
```json
"servers": [
  {
    "name": "vercel",
    "enabled": true
  }
]
```

### Updating Hooks

Add pre/post session hooks in `.mcp/config/mcp.config.json`:
```json
"hooks": {
  "preSessionStart": [
    "check-package-updates",
    "verify-mcp-integrity",
    "initialize-framework"
  ]
}
```

## Monitoring

The framework logs all activities with timestamps:

```
[MCP-INFO] Starting MCP Framework Initialization
[MCP-INFO] Timestamp: 2026-05-12T07:44:00Z
[MCP-OK] All MCP packages are up to date
[MCP-OK] All required files present
[MCP-OK] All MCP dependencies installed
[MCP-OK] Synced 5 skills
[MCP-OK] Loaded 3/3 context files
[MCP-INFO] Initialization Complete: 5 passed, 0 failed
```

Last initialization recorded in `.mcp/config/mcp.config.json` → `lastUpdated`

## References

- [MCP Protocol Documentation](https://modelcontextprotocol.io)
- [@h4shed/mcp-cli GitHub](https://github.com/h4shed/mcp-cli)
- [@h4shed/mcp-core GitHub](https://github.com/h4shed/mcp-core)
- [@h4shed/skill-syncpulse GitHub](https://github.com/h4shed/skill-syncpulse)

---

**Last Updated:** 2026-05-12
**Framework Version:** 1.0.0
**Status:** ✅ Active & Monitoring
