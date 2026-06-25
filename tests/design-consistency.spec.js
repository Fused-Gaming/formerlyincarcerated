import { test, expect } from '@playwright/test';

test.describe('Design System Consistency', () => {
  const pages = [
    { url: '/', name: 'Home' },
    { url: '/news', name: 'News' },
    { url: '/impact', name: 'Impact' },
    { url: '/about', name: 'About' },
    { url: '/model', name: 'Model' },
    { url: '/partners', name: 'Partners' },
    { url: '/docs', name: 'Docs' },
    { url: '/faq', name: 'FAQ' },
    { url: '/whitepaper', name: 'Whitepaper' },
    { url: '/contact', name: 'Contact' },
  ];

  test.describe('Header consistency', () => {
    pages.forEach(({ url, name }) => {
      test(`${name} page has consistent header`, async ({ page }) => {
        await page.goto(`http://localhost:3000${url}`);

        // Check header exists
        const header = page.locator('header');
        await expect(header).toBeVisible();

        // Check for sticky positioning
        const headerClass = await header.getAttribute('class');
        expect(headerClass).toContain('sticky');
        expect(headerClass).toContain('z-50');

        // Check header uses hp-black background
        const headerBg = await header.evaluate((el) => {
          return window.getComputedStyle(el).backgroundColor;
        });
        // Header background should be transparent initially or hp-black
        expect(['transparent', 'rgba(0, 0, 0, 0)', 'rgb(5, 5, 5)'].some(
          (bg) => headerBg.includes(bg) || headerBg === 'transparent'
        )).toBeTruthy();
      });
    });
  });

  test.describe('Color palette usage', () => {
    pages.forEach(({ url, name }) => {
      test(`${name} page uses HP brand colors, not slate/amber`, async ({ page }) => {
        await page.goto(`http://localhost:3000${url}`);

        // Get the HTML content
        const htmlContent = await page.content();

        // Should NOT use slate or amber colors in the page classes
        // (except for base tailwind palette in theme)
        const pageBody = page.locator('body');
        const classes = await pageBody.evaluate((el) => {
          return el.className;
        });

        // Check that hp-orange is used if orange is present
        if (htmlContent.includes('text-amber')) {
          throw new Error(
            `${name} page uses amber colors - should use hp-orange instead`
          );
        }

        if (htmlContent.includes('bg-slate-')) {
          throw new Error(
            `${name} page uses slate background - should use hp colors instead`
          );
        }

        // Verify HP brand colors are used
        expect(htmlContent.includes('hp-orange') ||
               htmlContent.includes('hp-white') ||
               htmlContent.includes('hp-dark')).toBeTruthy();
      });
    });
  });

  test.describe('Footer consistency', () => {
    pages.forEach(({ url, name }) => {
      test(`${name} page has consistent footer`, async ({ page }) => {
        await page.goto(`http://localhost:3000${url}`);

        // Check footer exists
        const footer = page.locator('footer');
        await expect(footer).toBeVisible();

        // Check footer contains required links
        const footerText = await footer.textContent();
        expect(footerText).toContain('Formerly Incarcerated');
        expect(footerText).toContain('Organization');
        expect(footerText).toContain('Resources');

        // Check footer has hp-gradient-footer class
        const footerClass = await footer.getAttribute('class');
        expect(footerClass).toContain('hp-gradient-footer');
      });
    });
  });

  test.describe('Main content area styling', () => {
    pages.forEach(({ url, name }) => {
      test(`${name} page uses hp-black background`, async ({ page }) => {
        await page.goto(`http://localhost:3000${url}`);

        // Check main wrapper
        const wrapper = page.locator('body > div:first-child');
        const wrapperClasses = await wrapper.getAttribute('class');

        expect(['bg-hp-black', 'bg-hp-dark'].some(
          (cls) => wrapperClasses.includes(cls)
        ) || wrapperClasses.includes('hp-gradient')).toBeTruthy();
      });
    });
  });

  test.describe('Typography consistency', () => {
    test('Home page uses font-display for headings', async ({ page }) => {
      await page.goto('http://localhost:3000/');

      const h1 = page.locator('h1');
      const classes = await h1.getAttribute('class');
      expect(classes).toContain('font-display');
    });

    test('Other pages use consistent heading styles', async ({ page }) => {
      await page.goto('http://localhost:3000/news');

      const mainHeading = page.locator('main h1, main h2').first();
      await expect(mainHeading).toBeVisible();

      const headingClasses = await mainHeading.getAttribute('class');
      expect(headingClasses).toBeTruthy();
    });
  });

  test.describe('Navigation links accessibility', () => {
    test('Home page can navigate to all major pages', async ({ page }) => {
      await page.goto('http://localhost:3000/');

      const navLinks = ['Impact', 'Model', 'Partners', 'News'];

      for (const linkText of navLinks) {
        const link = page.getByRole('link', { name: linkText });
        await expect(link).toBeVisible();
      }
    });
  });

  test.describe('Responsive design', () => {
    pages.forEach(({ url, name }) => {
      test(`${name} page is responsive at mobile and desktop`, async ({ page }) => {
        // Test mobile view
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto(`http://localhost:3000${url}`);
        const headerMobile = page.locator('header');
        await expect(headerMobile).toBeVisible();

        // Test tablet view
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto(`http://localhost:3000${url}`);
        const headerTablet = page.locator('header');
        await expect(headerTablet).toBeVisible();

        // Test desktop view
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto(`http://localhost:3000${url}`);
        const headerDesktop = page.locator('header');
        await expect(headerDesktop).toBeVisible();
      });
    });
  });
});
