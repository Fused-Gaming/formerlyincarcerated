#!/usr/bin/env node

/**
 * Pre-Deployment Validation Script
 * Uses SyncPulse to validate deployment readiness
 */

import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { createSyncPulseSkill } from '@h4shed/skill-syncpulse';
import { fileURLToPath } from 'url';

const execPromise = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.dirname(__dirname);

const VALIDATION_CHECKS = {
  PROJECT_FILES: 'project-files',
  BUILD_OUTPUT: 'build-output',
  DEPENDENCIES: 'dependencies',
  CONFIGURATION: 'configuration',
  CODE_QUALITY: 'code-quality',
  ENVIRONMENT: 'environment',
};

const VALIDATION_RESULTS = {};
let totalChecks = 0;
let passedChecks = 0;

/**
 * Log validation result
 */
function logResult(checkName, passed, message = '') {
  totalChecks++;
  if (passed) passedChecks++;

  const status = passed ? '✓' : '✗';
  const color = passed ? '\x1b[32m' : '\x1b[31m'; // Green or Red
  const reset = '\x1b[0m';

  console.log(`${color}${status}${reset} ${checkName}${message ? ': ' + message : ''}`);
  VALIDATION_RESULTS[checkName] = { passed, message };
}

/**
 * Check project files exist
 */
function validateProjectFiles() {
  console.log('\n📁 Checking Project Files...');

  const requiredFiles = [
    'package.json',
    'pages/index.jsx',
    'pages/_app.jsx',
    'pages/whitepaper.jsx',
    'styles/globals.css',
    'tailwind.config.js',
    'next.config.js',
    'vercel.json',
  ];

  requiredFiles.forEach((file) => {
    const filePath = path.join(projectRoot, file);
    const exists = fs.existsSync(filePath);
    logResult(`File: ${file}`, exists);
  });

  const requiredDirs = [
    'components',
    'lib',
    'contexts',
    'hooks',
    'docs',
    'examples',
    'public/documents',
  ];

  requiredDirs.forEach((dir) => {
    const dirPath = path.join(projectRoot, dir);
    const exists = fs.existsSync(dirPath);
    logResult(`Directory: ${dir}`, exists);
  });
}

/**
 * Check dependencies
 */
function validateDependencies() {
  console.log('\n📦 Checking Dependencies...');

  try {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8')
    );

    const requiredDeps = [
      'next',
      'react',
      'react-dom',
      'lucide-react',
      'tailwindcss',
      'autoprefixer',
      'postcss',
      '@h4shed/skill-syncpulse',
      'pdfjs-dist',
    ];

    const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };

    requiredDeps.forEach((dep) => {
      const exists = !!allDeps[dep];
      logResult(`Dependency: ${dep}`, exists, exists ? allDeps[dep] : 'missing');
    });
  } catch (error) {
    logResult('Parse package.json', false, error.message);
  }
}

/**
 * Check configuration files
 */
function validateConfiguration() {
  console.log('\n⚙️  Checking Configuration...');

  try {
    // Check next.config.js
    const nextConfig = path.join(projectRoot, 'next.config.js');
    logResult('next.config.js', fs.existsSync(nextConfig));

    // Check tailwind.config.js
    const tailwindConfig = path.join(projectRoot, 'tailwind.config.js');
    const tailwindExists = fs.existsSync(tailwindConfig);
    logResult('tailwind.config.js', tailwindExists);

    if (tailwindExists) {
      const content = fs.readFileSync(tailwindConfig, 'utf8');
      const hasColors = content.includes('amber') && content.includes('emerald');
      logResult('Tailwind colors configured', hasColors);
    }

    // Check vercel.json
    const vercelJson = path.join(projectRoot, 'vercel.json');
    const vercelExists = fs.existsSync(vercelJson);
    logResult('vercel.json', vercelExists);

    if (vercelExists) {
      const vercel = JSON.parse(fs.readFileSync(vercelJson, 'utf8'));
      logResult('Vercel build command', !!vercel.buildCommand);
      logResult('Vercel framework', vercel.framework === 'nextjs');
    }

    // Check .env.local (optional but good to have)
    const envLocal = path.join(projectRoot, '.env.local');
    logResult('.env.local exists', fs.existsSync(envLocal), 'optional');
  } catch (error) {
    logResult('Configuration validation', false, error.message);
  }
}

/**
 * Check build artifacts
 */
function validateBuildOutput() {
  console.log('\n🔨 Checking Build Output...');

  try {
    const nextDir = path.join(projectRoot, '.next');
    const buildExists = fs.existsSync(nextDir);
    logResult('.next build directory exists', buildExists, buildExists ? 'ready' : 'needs build');

    if (!buildExists) {
      console.log(
        '  ⚠️  Run "npm run build" to create build artifacts before deployment'
      );
    }
  } catch (error) {
    logResult('Build output check', false, error.message);
  }
}

/**
 * Check code quality
 */
function validateCodeQuality() {
  console.log('\n✨ Checking Code Quality...');

  try {
    // Check for critical files
    const files = [
      'pages/index.jsx',
      'pages/whitepaper.jsx',
      'components/PDFViewer.jsx',
      'lib/orchestration.js',
    ];

    files.forEach((file) => {
      const filePath = path.join(projectRoot, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const hasExport = content.includes('export') || content.includes('module.exports');
        logResult(`${file} exports`, hasExport);
      }
    });

    // Check for console.log (development artifacts)
    const srcFiles = fs.readdirSync(path.join(projectRoot, 'pages')).filter((f) => f.endsWith('.jsx'));
    let consoleLogsFound = 0;

    srcFiles.forEach((file) => {
      const content = fs.readFileSync(path.join(projectRoot, 'pages', file), 'utf8');
      const matches = content.match(/console\.(log|warn|error)/g);
      if (matches) consoleLogsFound += matches.length;
    });

    logResult('No excessive console.log', consoleLogsFound < 5, `found ${consoleLogsFound}`);
  } catch (error) {
    logResult('Code quality check', false, error.message);
  }
}

/**
 * Check environment
 */
async function validateEnvironment() {
  console.log('\n🌍 Checking Environment...');

  const nodeVersion = process.version;
  const nodeMajor = parseInt(nodeVersion.split('.')[0].substring(1));
  logResult(`Node.js version`, nodeMajor >= 16, nodeVersion);

  try {
    const { stdout } = await execPromise('npm -v');
    const npmVersion = stdout.trim();
    logResult('npm installed', !!npmVersion, npmVersion);
  } catch (error) {
    logResult('npm installed', false, error.message);
  }

  logResult('Git repository', fs.existsSync(path.join(projectRoot, '.git')));
}

/**
 * Validate with SyncPulse
 */
async function validateWithSyncPulse() {
  console.log('\n🔄 SyncPulse Project State Validation...');

  try {
    const skill = createSyncPulseSkill();
    const syncTool = skill.tools.find((t) => t.name === 'synchronize_project_state');

    if (syncTool) {
      const result = await syncTool.handler({
        projectId: 'bitcoin-land-bond',
        includeGit: true,
        cacheTTL: 3600000,
      });

      logResult('Project state synchronized', result.success, result.message);
      logResult('Git included', result.state.gitIncluded);
    }
  } catch (error) {
    console.log('  ⚠️  SyncPulse validation skipped:', error.message);
  }
}

/**
 * Generate validation report
 */
function generateReport() {
  console.log('\n' + '='.repeat(50));
  console.log('📋 VALIDATION REPORT');
  console.log('='.repeat(50));

  const passed = passedChecks;
  const total = totalChecks;
  const percentage = ((passed / total) * 100).toFixed(1);

  console.log(`\n✓ Passed: ${passed}/${total} (${percentage}%)`);

  if (passed === total) {
    console.log('\n🎉 All validations passed! Safe to deploy.');
    return true;
  } else {
    console.log(`\n⚠️  ${total - passed} validation(s) failed. Review above for details.`);
    return false;
  }
}

/**
 * Main validation runner
 */
async function main() {
  console.log(
    '\n' +
      '█'.repeat(50) +
      '\n' +
      '🚀 Bitcoin Land Bond - Pre-Deployment Validation\n' +
      '█'.repeat(50)
  );

  console.log(`📍 Project Root: ${projectRoot}`);
  console.log(`⏰ Timestamp: ${new Date().toISOString()}\n`);

  // Run all validations
  validateProjectFiles();
  validateDependencies();
  validateConfiguration();
  validateBuildOutput();
  validateCodeQuality();
  await validateEnvironment();
  await validateWithSyncPulse();

  // Generate report
  const isReady = generateReport();

  console.log('\n' + '='.repeat(50) + '\n');

  if (!isReady) {
    process.exit(1);
  }
}

// Run validation
main().catch((error) => {
  console.error('Validation error:', error);
  process.exit(1);
});
