# Deployment Test & Verification Guide

## Overview

This document outlines the comprehensive deployment testing workflow for the Bitcoin Land Bond whitepaper initiative. The testing suite ensures proper deployment, functional download buttons, and correct content display across all platforms.

## Test Structure

### 1. Unit Tests

#### Whitepaper Page Tests (`__tests__/whitepaper.test.jsx`)
Tests the whitepaper page component for:
- Correct page rendering with proper title
- Open Graph head component integration
- Document sections display (overview, key sections, quick facts)
- Download button functionality and attributes
- Contact section and navigation links
- Accessibility compliance

**Run with:**
```bash
npm test -- whitepaper.test.jsx
```

#### Open Graph Tags Tests (`__tests__/og-tags.test.js`)
Tests the OG tags library for:
- Default tag configuration
- Whitepaper-specific metadata
- Custom tag merging
- Image dimension support (1536x1024 for whitepaper, 1200x630 default)
- Twitter card integration
- Social platform coverage (Facebook, LinkedIn, Twitter, Discord, Telegram)
- HTTPS enforcement for secure URLs

**Run with:**
```bash
npm test -- og-tags.test.js
```

#### Deployment Verification Tests (`__tests__/deployment.test.js`)
Tests deployment readiness:
- Public asset existence (images, whitepaper file)
- Page component availability
- Download button configuration
- Open Graph tag presence
- Content validity
- Build configuration

**Run with:**
```bash
npm test -- deployment.test.js
```

### 2. GitHub Actions Workflow

#### File: `.github/workflows/deployment-test.yml`

**Triggers:**
- Push to `main` or `claude/white-papers-social-preview-bRJ4w`
- Pull requests to `main`

**Jobs:**

##### Build & Test Job
- **Node versions tested:** 18.x, 20.x
- **Steps:**
  1. Checkout code
  2. Setup Node.js with caching
  3. Install dependencies
  4. Run linter
  5. Run test suite with coverage
  6. Build Next.js application
  7. Verify build artifacts

##### Deployment Verification Job
- **Steps:**
  1. Verify all public assets exist:
     - `public/og-image.png` (default OG preview)
     - `public/whitepaper-og-preview.png` (whitepaper-specific)
     - `public/bitcoin-land-bond-social-square.png` (social media logo)
     - `public/bitcoin-land-bond-whitepaper.docx` (downloadable file)

  2. Verify page components:
     - `pages/whitepaper.jsx`
     - `pages/index.jsx`
     - `components/OpenGraphHead.jsx`

  3. Verify download functionality:
     - Download links present
     - Correct file references
     - Test IDs for automation

  4. Verify Open Graph configuration:
     - og:title, og:description, og:image tags
     - twitter:card support
     - Social platform coverage

  5. Content validity:
     - Site name present
     - Initiative description
     - Key metrics displayed

## Running Tests Locally

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm test:watch
```

### Generate Coverage Report
```bash
npm test:coverage
```

### Run Deployment Test Script
```bash
npm run test:deployment
```
This builds the app then runs all tests—simulating what CI/CD will do.

## Test Coverage

The test suite covers:

| Area | Coverage | Test Count |
|------|----------|-----------|
| Whitepaper Page | Component, rendering, download buttons | 11 tests |
| Open Graph Tags | Configuration, social platforms, dimensions | 13 tests |
| Deployment Assets | File existence, configuration | 15 tests |
| **Total** | | **39 tests** |

## Download Button Implementation

### File: `pages/whitepaper.jsx`

The whitepaper page includes two download buttons with:

```jsx
<a
  href="/bitcoin-land-bond-whitepaper.docx"
  download="Bitcoin-Land-Bond-Whitepaper.docx"
  data-testid="download-full-whitepaper"
>
```

**Features:**
- Direct link to `/public/bitcoin-land-bond-whitepaper.docx`
- Proper `download` attribute for browser handling
- Test IDs for automated verification
- Accessible link styling

## Content Display

### Whitepaper Page Structure

1. **Header**
   - Navigation back to home
   - Sticky positioning

2. **Title Section**
   - Main heading with gradient text
   - Subtitle with initiative context

3. **Document Overview**
   - Key sections list
   - Quick facts with metrics

4. **Download Options**
   - Two download buttons
   - Full whitepaper
   - Executive summary

5. **Document Information**
   - Publication date
   - Organization name
   - Domain reference
   - Contact email

6. **Contact CTA**
   - Email link for inquiries

### Open Graph Preview

The whitepaper page sends to social media:
- **Title:** "Bitcoin Land Bond White Paper - Criminal Asset Recovery Initiative"
- **Description:** Comprehensive summary with policy, roadmap, and model info
- **Image:** whitepaper-og-preview.png (1536×1024)
- **URL:** https://formerlyincarcerated.org/whitepaper
- **Type:** article (for better SEO/sharing)

## CI/CD Integration

### When Tests Run
- On every commit to `main`
- On pull requests to `main`
- On any push to the development branch

### What Happens on Failure
1. Build/test logs displayed
2. Specific failure identified
3. PR status blocked until fixed
4. Detailed error messages for debugging

### Deployment Checklist
Before merging to main, ensure:
- ✅ All tests pass
- ✅ All assets verified
- ✅ Download buttons functional
- ✅ Open Graph tags configured
- ✅ Content displays correctly
- ✅ Build succeeds without warnings

## Troubleshooting

### Test Failures

**"Missing file in public folder"**
- Ensure all images and DOCX are copied to `public/`
- Check file names match test expectations
- Verify files aren't in `.gitignore`

**"Download button not found"**
- Check `pages/whitepaper.jsx` has correct href
- Verify `data-testid` attributes present
- Ensure file is in public folder

**"Build artifacts missing"**
- Run `npm run build` locally
- Check `.next` directory exists
- Verify no build errors in console

**"OG tags not rendering"**
- Verify `OpenGraphHead` imported in page
- Check props passed correctly
- Ensure `pages/_document.jsx` has global tags

## Performance Notes

- OG image sizes optimized (whitepaper: 2.1MB, default: 921KB)
- Whitepaper DOCX compressed (13KB)
- Test suite completes in ~30 seconds
- CI/CD workflow completes in ~2-3 minutes

## Future Enhancements

- [ ] Add E2E tests with Playwright/Cypress
- [ ] Add Lighthouse performance checks
- [ ] Add security scanning (OWASP)
- [ ] Add accessibility (axe-core) tests
- [ ] Add visual regression testing
- [ ] Add load testing for deployment

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Next.js Testing](https://nextjs.org/docs/testing)

## Contact

For test-related questions or improvements, refer to the deployment team or review the CI/CD logs in GitHub Actions.
