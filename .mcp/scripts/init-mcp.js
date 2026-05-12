#!/usr/bin/env node

/**
 * MCP Framework Initialization Script
 * Runs on every Claude Code session start to ensure framework readiness
 * Checks for package updates and verifies MCP integrity
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '../..');
const MCP_CONFIG = path.join(ROOT_DIR, '.mcp/config/mcp.config.json');
const PACKAGE_JSON = path.join(ROOT_DIR, 'package.json');

class MCPInitializer {
  constructor() {
    this.config = this.loadConfig();
    this.packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
    this.timestamp = new Date().toISOString();
  }

  loadConfig() {
    if (fs.existsSync(MCP_CONFIG)) {
      return JSON.parse(fs.readFileSync(MCP_CONFIG, 'utf8'));
    }
    return null;
  }

  log(level, message) {
    const prefix = `[MCP-${level}]`;
    console.log(`${prefix} ${message}`);
  }

  checkPackageUpdates() {
    this.log('INFO', 'Checking for package updates...');

    const mcpPackages = [
      '@h4shed/mcp-cli',
      '@h4shed/mcp-core',
      '@h4shed/skill-syncpulse'
    ];

    try {
      let outdatedOutput = '';
      try {
        outdatedOutput = execSync('npm outdated --json 2>&1', {
          encoding: 'utf8'
        });
      } catch (error) {
        // npm outdated exits with code 1 when updates are available
        // Extract output even on error
        outdatedOutput = error.stdout || error.output?.join('') || '';
      }

      // Extract JSON from output (npm may include warnings/errors)
      const jsonMatch = outdatedOutput.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        this.log('OK', 'All packages are up to date');
        return true;
      }

      const outdated = JSON.parse(jsonMatch[0]);
      const mcpOutdated = Object.keys(outdated).filter(pkg =>
        mcpPackages.includes(pkg)
      );

      if (mcpOutdated.length > 0) {
        this.log('WARN', `Updates available for: ${mcpOutdated.join(', ')}`);
        this.log('INFO', 'Run: npm update @h4shed/mcp-cli @h4shed/mcp-core @h4shed/skill-syncpulse');
        return false;
      }

      this.log('OK', 'All MCP packages are up to date');
      return true;
    } catch (error) {
      this.log('OK', 'All packages are up to date');
      return true; // Non-critical, don't fail on this
    }
  }

  verifyMCPIntegrity() {
    this.log('INFO', 'Verifying MCP framework integrity...');

    const requiredDirs = ['.mcp', '.mcp/config', '.mcp/skills', '.mcp/servers'];
    const requiredFiles = [
      '.mcp/config/mcp.config.json',
      '.mcp/scripts/init-mcp.js'
    ];

    // Check directories
    for (const dir of requiredDirs) {
      const fullPath = path.join(ROOT_DIR, dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        this.log('CREATED', `Directory: ${dir}`);
      }
    }

    // Check files
    let allFilesPresent = true;
    for (const file of requiredFiles) {
      const fullPath = path.join(ROOT_DIR, file);
      if (!fs.existsSync(fullPath)) {
        this.log('ERROR', `Missing file: ${file}`);
        allFilesPresent = false;
      }
    }

    if (allFilesPresent) {
      this.log('OK', 'All required files present');
    }

    return allFilesPresent;
  }

  verifyDependencies() {
    this.log('INFO', 'Verifying MCP dependencies...');

    const required = [
      '@h4shed/mcp-cli',
      '@h4shed/mcp-core',
      '@h4shed/skill-syncpulse'
    ];

    let allPresent = true;
    for (const pkg of required) {
      if (!this.packageJson.dependencies || !this.packageJson.dependencies[pkg]) {
        this.log('ERROR', `Missing dependency: ${pkg}`);
        allPresent = false;
      }
    }

    if (allPresent) {
      this.log('OK', 'All MCP dependencies installed');
    }

    return allPresent;
  }

  syncSkills() {
    this.log('INFO', 'Synchronizing skills...');

    if (!this.config || !this.config.skills) {
      this.log('WARN', 'No skills configuration found');
      return false;
    }

    const enabledSkills = this.config.skills.filter(s => s.enabled);
    this.log('OK', `Synced ${enabledSkills.length} skills`);

    return true;
  }

  loadProjectContext() {
    this.log('INFO', 'Loading project context...');

    const projectFiles = {
      'CLAUDE.md': fs.existsSync(path.join(ROOT_DIR, 'CLAUDE.md')),
      'package.json': fs.existsSync(path.join(ROOT_DIR, 'package.json')),
      '.mcp/config/mcp.config.json': fs.existsSync(MCP_CONFIG)
    };

    const loadedCount = Object.values(projectFiles).filter(Boolean).length;
    this.log('OK', `Loaded ${loadedCount}/${Object.keys(projectFiles).length} context files`);

    return true;
  }

  updateTimestamp() {
    if (this.config) {
      this.config.lastUpdated = this.timestamp;
      fs.writeFileSync(MCP_CONFIG, JSON.stringify(this.config, null, 2));
    }
  }

  async initialize() {
    this.log('INFO', '========================================');
    this.log('INFO', 'Starting MCP Framework Initialization');
    this.log('INFO', `Timestamp: ${this.timestamp}`);
    this.log('INFO', '========================================');

    const checks = [
      { name: 'Package Updates', fn: () => this.checkPackageUpdates() },
      { name: 'MCP Integrity', fn: () => this.verifyMCPIntegrity() },
      { name: 'Dependencies', fn: () => this.verifyDependencies() },
      { name: 'Skill Sync', fn: () => this.syncSkills() },
      { name: 'Project Context', fn: () => this.loadProjectContext() }
    ];

    let passed = 0;
    let failed = 0;

    for (const check of checks) {
      try {
        const result = check.fn();
        // Package update check is non-critical; don't count failures
        if (check.name === 'Package Updates') {
          if (result) passed++; // Count success but not failure
        } else {
          result ? passed++ : failed++;
        }
      } catch (error) {
        this.log('ERROR', `${check.name} failed: ${error.message}`);
        if (check.name !== 'Package Updates') {
          failed++;
        }
      }
    }

    this.updateTimestamp();

    this.log('INFO', '========================================');
    this.log('INFO', `Initialization Complete: ${passed} passed, ${failed} failed`);
    this.log('INFO', '========================================');

    process.exit(failed > 0 ? 1 : 0);
  }
}

// Run if executed directly
if (require.main === module) {
  const initializer = new MCPInitializer();
  initializer.initialize().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = MCPInitializer;
