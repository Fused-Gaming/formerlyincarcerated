import { createOGTags, defaultOGTags, whitePaperOGTags } from '../lib/og-tags';

describe('Open Graph Tags', () => {
  describe('defaultOGTags', () => {
    test('has correct domain configuration', () => {
      expect(defaultOGTags.url).toBe('https://formerlyincarcerated.org');
    });

    test('has correct default title', () => {
      expect(defaultOGTags.title).toContain('Bitcoin Land Bond');
    });

    test('has default image path', () => {
      expect(defaultOGTags.image).toBe('/og-image.png');
    });

    test('has correct site name', () => {
      expect(defaultOGTags.siteName).toBe('Bitcoin Land Bond');
    });
  });

  describe('whitePaperOGTags', () => {
    test('has article type', () => {
      expect(whitePaperOGTags.type).toBe('article');
    });

    test('has whitepaper-specific title', () => {
      expect(whitePaperOGTags.title).toContain('White Paper');
    });

    test('has whitepaper image', () => {
      expect(whitePaperOGTags.image).toBe('/whitepaper-og-preview.png');
    });

    test('has correct whitepaper URL', () => {
      expect(whitePaperOGTags.url).toBe('https://formerlyincarcerated.org/whitepaper');
    });
  });

  describe('createOGTags', () => {
    test('creates default OG tags when no custom tags provided', () => {
      const tags = createOGTags();

      const ogType = tags.find(tag => tag.property === 'og:type');
      expect(ogType.content).toBe('website');

      const ogTitle = tags.find(tag => tag.property === 'og:title');
      expect(ogTitle.content).toContain('Bitcoin Land Bond');

      const ogImage = tags.find(tag => tag.property === 'og:image');
      expect(ogImage.content).toContain('/og-image.png');
    });

    test('creates article type tags for whitepaper', () => {
      const tags = createOGTags({
        title: whitePaperOGTags.title,
        description: whitePaperOGTags.description,
        image: whitePaperOGTags.image,
        url: whitePaperOGTags.url,
        type: whitePaperOGTags.type,
        imageWidth: '1536',
        imageHeight: '1024',
      });

      const ogType = tags.find(tag => tag.property === 'og:type');
      expect(ogType.content).toBe('article');

      const ogImage = tags.find(tag => tag.property === 'og:image');
      expect(ogImage.content).toContain('whitepaper-og-preview.png');

      const ogImageWidth = tags.find(tag => tag.property === 'og:image:width');
      expect(ogImageWidth.content).toBe('1536');

      const ogImageHeight = tags.find(tag => tag.property === 'og:image:height');
      expect(ogImageHeight.content).toBe('1024');
    });

    test('includes Twitter card tags', () => {
      const tags = createOGTags();

      const twitterCard = tags.find(tag => tag.name === 'twitter:card');
      expect(twitterCard.content).toBe('summary_large_image');

      const twitterSite = tags.find(tag => tag.name === 'twitter:site');
      expect(twitterSite.content).toBe('@formerlyincarcerated');

      const twitterCreator = tags.find(tag => tag.name === 'twitter:creator');
      expect(twitterCreator.content).toBe('@formerlyincarcerated');
    });

    test('includes all required social media tags', () => {
      const tags = createOGTags();
      const tagNames = tags.map(tag => tag.property || tag.name);

      // Facebook/LinkedIn
      expect(tagNames).toContain('og:type');
      expect(tagNames).toContain('og:url');
      expect(tagNames).toContain('og:title');
      expect(tagNames).toContain('og:description');
      expect(tagNames).toContain('og:image');

      // Twitter
      expect(tagNames).toContain('twitter:card');
      expect(tagNames).toContain('twitter:image');
      expect(tagNames).toContain('twitter:domain');

      // Discord
      expect(tagNames).toContain('theme-color');

      // Telegram
      expect(tagNames).toContain('telegram:image');
    });

    test('uses absolute image URLs with domain', () => {
      const tags = createOGTags({ image: '/og-image.png' });

      const ogImage = tags.find(tag => tag.property === 'og:image');
      expect(ogImage.content).toContain('https://formerlyincarcerated.org');
      expect(ogImage.content).toContain('/og-image.png');
    });

    test('enforces HTTPS for secure image URLs', () => {
      const tags = createOGTags({ image: '/test-image.png' });

      const secureImageUrl = tags.find(tag => tag.property === 'og:image:secure_url');
      expect(secureImageUrl.content).toMatch(/^https:\/\//);
    });

    test('respects custom image dimensions', () => {
      const tags = createOGTags({
        imageWidth: '1200',
        imageHeight: '630',
      });

      const width = tags.find(tag => tag.property === 'og:image:width');
      const height = tags.find(tag => tag.property === 'og:image:height');

      expect(width.content).toBe('1200');
      expect(height.content).toBe('630');
    });

    test('includes image type as PNG', () => {
      const tags = createOGTags();

      const imageType = tags.find(tag => tag.property === 'og:image:type');
      expect(imageType.content).toBe('image/png');
    });

    test('includes locale and site name', () => {
      const tags = createOGTags();

      const locale = tags.find(tag => tag.property === 'og:locale');
      expect(locale.content).toBe('en_US');

      const siteName = tags.find(tag => tag.property === 'og:site_name');
      expect(siteName.content).toBe('Bitcoin Land Bond');
    });

    test('merges custom tags with defaults', () => {
      const customTitle = 'Custom Title';
      const customUrl = 'https://formerlyincarcerated.org/custom';

      const tags = createOGTags({
        title: customTitle,
        url: customUrl,
      });

      const ogTitle = tags.find(tag => tag.property === 'og:title');
      expect(ogTitle.content).toBe(customTitle);

      const ogUrl = tags.find(tag => tag.property === 'og:url');
      expect(ogUrl.content).toBe(customUrl);

      // Verify defaults are still used for unspecified fields
      const ogImage = tags.find(tag => tag.property === 'og:image');
      expect(ogImage.content).toContain('/og-image.png');
    });
  });
});
