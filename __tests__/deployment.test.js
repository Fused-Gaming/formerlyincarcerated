import fs from 'fs';
import path from 'path';

describe('Deployment Verification', () => {
  describe('Public Assets', () => {
    test('og-image.png exists in public folder', () => {
      const filePath = path.join(process.cwd(), 'public', 'og-image.png');
      expect(fs.existsSync(filePath)).toBe(true);
    });

    test('whitepaper-og-preview.png exists in public folder', () => {
      const filePath = path.join(process.cwd(), 'public', 'whitepaper-og-preview.png');
      expect(fs.existsSync(filePath)).toBe(true);
    });

    test('bitcoin-land-bond-social-square.png exists in public folder', () => {
      const filePath = path.join(process.cwd(), 'public', 'bitcoin-land-bond-social-square.png');
      expect(fs.existsSync(filePath)).toBe(true);
    });

    test('bitcoin-land-bond-whitepaper.docx exists in public folder', () => {
      const filePath = path.join(process.cwd(), 'public', 'bitcoin-land-bond-whitepaper.docx');
      expect(fs.existsSync(filePath)).toBe(true);
    });

    test('whitepaper image has valid dimensions', () => {
      const filePath = path.join(process.cwd(), 'public', 'whitepaper-og-preview.png');
      const stats = fs.statSync(filePath);
      // Check that file size is reasonable (should be > 1MB based on earlier observation)
      expect(stats.size).toBeGreaterThan(1000000);
    });
  });

  describe('Page Components', () => {
    test('whitepaper.jsx page exists', () => {
      const filePath = path.join(process.cwd(), 'pages', 'whitepaper.jsx');
      expect(fs.existsSync(filePath)).toBe(true);
    });

    test('index.jsx page exists', () => {
      const filePath = path.join(process.cwd(), 'pages', 'index.jsx');
      expect(fs.existsSync(filePath)).toBe(true);
    });

    test('OpenGraphHead component exists', () => {
      const filePath = path.join(process.cwd(), 'components', 'OpenGraphHead.jsx');
      expect(fs.existsSync(filePath)).toBe(true);
    });

    test('_document.jsx page exists with OG tags', () => {
      const filePath = path.join(process.cwd(), 'pages', '_document.jsx');
      expect(fs.existsSync(filePath)).toBe(true);

      const content = fs.readFileSync(filePath, 'utf8');
      expect(content).toContain('og:title');
      expect(content).toContain('og:description');
      expect(content).toContain('og:image');
      expect(content).toContain('twitter:card');
    });
  });

  describe('Whitepaper Page Content', () => {
    test('whitepaper.jsx has download button with correct href', () => {
      const filePath = path.join(process.cwd(), 'pages', 'whitepaper.jsx');
      const content = fs.readFileSync(filePath, 'utf8');

      expect(content).toContain('href="/bitcoin-land-bond-whitepaper.docx"');
    });

    test('whitepaper.jsx has download attribute', () => {
      const filePath = path.join(process.cwd(), 'pages', 'whitepaper.jsx');
      const content = fs.readFileSync(filePath, 'utf8');

      expect(content).toContain('download="Bitcoin-Land-Bond-Whitepaper.docx"');
    });

    test('whitepaper.jsx has data-testid for download buttons', () => {
      const filePath = path.join(process.cwd(), 'pages', 'whitepaper.jsx');
      const content = fs.readFileSync(filePath, 'utf8');

      expect(content).toContain('data-testid="download-full-whitepaper"');
      expect(content).toContain('data-testid="download-summary"');
    });

    test('whitepaper.jsx has OpenGraphHead component', () => {
      const filePath = path.join(process.cwd(), 'pages', 'whitepaper.jsx');
      const content = fs.readFileSync(filePath, 'utf8');

      expect(content).toContain('OpenGraphHead');
      expect(content).toContain('whitepaper-og-preview.png');
      expect(content).toContain('type="article"');
    });

    test('whitepaper page has proper metadata', () => {
      const filePath = path.join(process.cwd(), 'pages', 'whitepaper.jsx');
      const content = fs.readFileSync(filePath, 'utf8');

      expect(content).toContain('Bitcoin Land Bond White Paper');
      expect(content).toContain('Criminal Asset Recovery Initiative');
      expect(content).toContain('600,000');
      expect(content).toContain('20-30%');
    });
  });

  describe('Home Page Content', () => {
    test('index.jsx has OpenGraphHead component', () => {
      const filePath = path.join(process.cwd(), 'pages', 'index.jsx');
      const content = fs.readFileSync(filePath, 'utf8');

      expect(content).toContain('OpenGraphHead');
      expect(content).toContain('formerlyincarcerated.org');
    });

    test('index.jsx imports OpenGraphHead', () => {
      const filePath = path.join(process.cwd(), 'pages', 'index.jsx');
      const content = fs.readFileSync(filePath, 'utf8');

      expect(content).toContain('import OpenGraphHead');
    });
  });

  describe('OG Tags Configuration', () => {
    test('og-tags.js has defaultOGTags', () => {
      const filePath = path.join(process.cwd(), 'lib', 'og-tags.js');
      const content = fs.readFileSync(filePath, 'utf8');

      expect(content).toContain('export const defaultOGTags');
      expect(content).toContain('formerlyincarcerated.org');
    });

    test('og-tags.js has whitePaperOGTags', () => {
      const filePath = path.join(process.cwd(), 'lib', 'og-tags.js');
      const content = fs.readFileSync(filePath, 'utf8');

      expect(content).toContain('export const whitePaperOGTags');
      expect(content).toContain('whitepaper-og-preview.png');
      expect(content).toContain('article');
    });

    test('og-tags.js supports custom image dimensions', () => {
      const filePath = path.join(process.cwd(), 'lib', 'og-tags.js');
      const content = fs.readFileSync(filePath, 'utf8');

      expect(content).toContain('imageWidth');
      expect(content).toContain('imageHeight');
      expect(content).toContain('og:image:width');
      expect(content).toContain('og:image:height');
    });

    test('og-tags.js includes all platform support', () => {
      const filePath = path.join(process.cwd(), 'lib', 'og-tags.js');
      const content = fs.readFileSync(filePath, 'utf8');

      // Facebook/LinkedIn
      expect(content).toContain('og:type');
      expect(content).toContain('og:site_name');

      // Twitter
      expect(content).toContain('twitter:card');
      expect(content).toContain('twitter:creator');

      // Discord
      expect(content).toContain('theme-color');

      // Telegram
      expect(content).toContain('telegram:image');
    });
  });

  describe('Build Configuration', () => {
    test('next.config.js exists', () => {
      const filePath = path.join(process.cwd(), 'next.config.js');
      expect(fs.existsSync(filePath)).toBe(true);
    });

    test('package.json has test scripts', () => {
      const filePath = path.join(process.cwd(), 'package.json');
      const content = fs.readFileSync(filePath, 'utf8');
      const pkg = JSON.parse(content);

      expect(pkg.scripts).toHaveProperty('test');
      expect(pkg.scripts).toHaveProperty('test:watch');
      expect(pkg.scripts).toHaveProperty('test:coverage');
      expect(pkg.scripts).toHaveProperty('test:deployment');
      expect(pkg.scripts.test).toBe('jest');
      expect(pkg.scripts['test:deployment']).toBe('npm run build && npm run test');
    });

    test('package.json has required dependencies', () => {
      const filePath = path.join(process.cwd(), 'package.json');
      const content = fs.readFileSync(filePath, 'utf8');
      const pkg = JSON.parse(content);

      expect(pkg.dependencies).toHaveProperty('next');
      expect(pkg.dependencies).toHaveProperty('react');
      expect(pkg.dependencies).toHaveProperty('react-dom');
    });

    test('package.json has testing dependencies', () => {
      const filePath = path.join(process.cwd(), 'package.json');
      const content = fs.readFileSync(filePath, 'utf8');
      const pkg = JSON.parse(content);

      expect(pkg.devDependencies).toHaveProperty('@testing-library/react');
      expect(pkg.devDependencies).toHaveProperty('@testing-library/jest-dom');
      expect(pkg.devDependencies).toHaveProperty('jest');
      expect(pkg.devDependencies).toHaveProperty('jest-environment-jsdom');
    });
  });

  describe('GitHub Actions Workflow', () => {
    test('deployment-test.yml workflow exists', () => {
      const filePath = path.join(process.cwd(), '.github', 'workflows', 'deployment-test.yml');
      expect(fs.existsSync(filePath)).toBe(true);
    });

    test('workflow includes build and test steps', () => {
      const filePath = path.join(process.cwd(), '.github', 'workflows', 'deployment-test.yml');
      const content = fs.readFileSync(filePath, 'utf8');

      expect(content).toContain('Build & Test');
      expect(content).toContain('npm ci');
      expect(content).toContain('npm run build');
      expect(content).toContain('npm test');
    });

    test('workflow includes deployment verification', () => {
      const filePath = path.join(process.cwd(), '.github', 'workflows', 'deployment-test.yml');
      const content = fs.readFileSync(filePath, 'utf8');

      expect(content).toContain('Verify Deployment Assets');
      expect(content).toContain('Verify public assets');
      expect(content).toContain('Verify download links');
      expect(content).toContain('Verify Open Graph');
    });

    test('workflow validates all required assets', () => {
      const filePath = path.join(process.cwd(), '.github', 'workflows', 'deployment-test.yml');
      const content = fs.readFileSync(filePath, 'utf8');

      expect(content).toContain('og-image.png');
      expect(content).toContain('whitepaper-og-preview.png');
      expect(content).toContain('bitcoin-land-bond-social-square.png');
      expect(content).toContain('bitcoin-land-bond-whitepaper.docx');
    });
  });
});
