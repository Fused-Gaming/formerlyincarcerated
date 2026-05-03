# Open Graph Tags Configuration Guide

This guide explains how to use Open Graph (OG) tags for comprehensive social media sharing across all pages of the Bitcoin Land Bond website.

## Overview

Open Graph tags are meta tags that control how content appears when shared on social media platforms. The implementation provides full support for:

**Supported Platforms:**
- Facebook & Instagram
- Twitter/X
- LinkedIn
- Discord
- Telegram
- Reddit
- Pinterest
- Slack
- WhatsApp
- And more

The implementation provides:

- **Default OG tags** for all pages (set in `_document.jsx`)
- **Per-page customization** for specific pages
- **Consistent social media previews** across the domain
- **Universal compatibility** with major social platforms

## Default Configuration

All pages automatically include default Open Graph tags:

- **Title**: "Bitcoin Land Bond - Criminal Asset Recovery Initiative"
- **Description**: "The Bitcoin Land Bond deploys $15B in seized cryptocurrency to fund permanent deed-restricted housing for 600,000+ formerly incarcerated people annually."
- **Image**: `/og-image.png` (1200x630px recommended)
- **URL**: `https://formerlyincarcerated.org`
- **Type**: `website`

## Using Custom OG Tags on Specific Pages

To override default tags on any page, use the `OpenGraphHead` component at the top of your page:

### Example: Whitepaper Page

```jsx
import OpenGraphHead from '../components/OpenGraphHead';

export default function WhitepaperPage() {
  return (
    <>
      <OpenGraphHead
        title="Bitcoin Land Bond White Paper"
        description="Download our comprehensive white paper on using seized cryptocurrency to fund permanent housing for 600,000+ formerly incarcerated individuals annually."
        url="https://formerlyincarcerated.org/whitepaper"
      />
      {/* Rest of your page content */}
    </>
  );
}
```

### Props

The `OpenGraphHead` component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | Default title | Page-specific title for social sharing |
| `description` | string | Default description | Page-specific description for social sharing |
| `image` | string | `/og-image.png` | URL to the OG image (full URL or relative path) |
| `url` | string | `https://formerlyincarcerated.org` | Canonical URL for this page |
| `type` | string | `website` | OG type (e.g., `article`, `website`, `video`) |

## File Structure

```
lib/
├── og-tags.js                    # Core OG tags configuration and utilities
pages/
├── _document.jsx                 # Global default OG tags
├── whitepaper.jsx                # Example: Custom OG tags per page
components/
├── OpenGraphHead.jsx             # Component for setting custom OG tags
public/
└── og-image.png                  # Default OG image (1200x630px)
```

## Adding OG Image

Place your Open Graph image in the `public/` directory:

- **File**: `public/og-image.png`
- **Recommended Size**: 1200x630px
- **Format**: PNG, JPG, or WebP
- **Color Scheme**: Match your brand colors (currently using emerald/green and amber/yellow)

## How It Works

1. **Global Tags** (`_document.jsx`): Every page includes the default OG tags
2. **Page Override** (`OpenGraphHead`): Pages can import and use the component to override specific tags
3. **Meta Tag Generation** (`lib/og-tags.js`): Utilities handle proper meta tag creation

### Meta Tags Included

The system automatically generates comprehensive tags for all platforms:

#### Open Graph Tags (Facebook, LinkedIn, Discord, Telegram, Reddit, Pinterest, Slack, WhatsApp)
- `og:type` - Type of content (website, article, etc.)
- `og:url` - Canonical URL
- `og:title` - Page title
- `og:description` - Page description
- `og:image` - Social media preview image
- `og:image:secure_url` - HTTPS image URL
- `og:image:width` - Image width (1200)
- `og:image:height` - Image height (630)
- `og:image:type` - Image format (image/png)
- `og:site_name` - Site name
- `og:locale` - Language/locale (en_US)

#### Twitter/X Card Tags
- `twitter:card` - Card type (summary_large_image)
- `twitter:site` - Site handle (@formerlyincarcerated)
- `twitter:url` - Tweet URL
- `twitter:title` - Tweet title
- `twitter:description` - Tweet description
- `twitter:image` - Tweet image
- `twitter:image:alt` - Image alt text for accessibility
- `twitter:domain` - Domain for verification

#### Platform-Specific Tags
- `theme-color` - Discord embed color (#10b981)
- `telegram:image` - Telegram preview image
- `image` - Generic image meta tag (universal)
- `description` - Generic description (universal)
- `msapplication-TileImage` - Windows tile image

#### Security & Accessibility
- Secure image URLs for HTTPS compatibility
- Image alt text for screen readers
- Proper image dimensions for optimal rendering

## Platform Support Details

### Facebook & Instagram
Uses Open Graph tags for rich previews. Supports:
- Title, description, and image
- Image dimensions (1200x630px recommended)
- Secure image URL fallback

### Twitter/X
Full Twitter Card support with:
- Summary Large Image card type
- Site handle (@formerlyincarcerated)
- Image alt text for accessibility
- Domain verification

### LinkedIn
Uses Open Graph tags for:
- Document preview on profile shares
- Rich article cards
- Image display in feed

### Discord
Uses Open Graph tags plus:
- Theme color (#10b981 - emerald green) for embed color
- Rich embed previews with image
- Title and description in embed

### Telegram
Uses Open Graph tags plus:
- Dedicated image tag for preview
- Title and description from OG tags
- Rich message preview

### Reddit
Uses Open Graph tags for:
- Thumbnail preview in feeds
- Post preview cards
- Title and description display

### Pinterest
Uses Open Graph tags for:
- Pin creation from URLs
- Rich pin previews
- Image pinning

### Slack
Uses Open Graph tags for:
- Message unfurling/preview
- Rich link previews
- Image embedding

### WhatsApp
Uses Open Graph tags for:
- Message preview cards
- Image display
- Title and description

## Testing Social Media Previews

### Facebook
Use the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/sharing/):
1. Paste your URL
2. Click "Scrape Again" to refresh
3. Preview social card

### Twitter/X
Use the [Twitter Card Validator](https://cards-dev.twitter.com/validator):
1. Enter your URL
2. Check the preview
3. Verify image dimensions and alt text

### LinkedIn
1. Copy your page URL
2. Paste in LinkedIn's update box
3. Wait for preview to load

### Discord
1. Paste your URL in a Discord message
2. Wait for embed to unfurl
3. Check title, description, and theme color

### Telegram
1. Share link in Telegram chat
2. Preview will show title, description, and image
3. Verify layout and appearance

### Reddit
1. Create a post with your URL
2. Submit and view preview
3. Check thumbnail and title display

### Slack
1. Paste URL in Slack message
2. Unfurl preview will appear
3. Verify image and text display

## Best Practices

1. **Image Optimization**: Use 1200x630px images optimized for web
2. **Descriptive Text**: Keep titles under 60 chars, descriptions under 160 chars
3. **Unique Content**: Each page should have unique OG tags
4. **Consistency**: Use consistent branding across all social previews
5. **Testing**: Always test on multiple platforms before publishing

## Adding OG Tags to New Pages

For every new page that needs custom social media preview:

```jsx
import OpenGraphHead from '../components/OpenGraphHead';

export default function NewPage() {
  return (
    <>
      <OpenGraphHead
        title="Your Custom Title"
        description="Your custom description"
        url="https://formerlyincarcerated.org/your-page"
      />
      {/* Page content */}
    </>
  );
}
```

## Troubleshooting

### Preview not updating
- Clear browser cache
- Check that image file exists
- Verify image size (1200x630px recommended)
- Test with the actual domain (not localhost)

### Image not showing
- Check `public/og-image.png` exists
- Verify absolute URL path in og-tags.js
- Ensure image is publicly accessible

### Meta tags not appearing
- Verify `OpenGraphHead` component is placed at page top
- Check that Next.js is rebuilt after changes
- Inspect page source to confirm tags exist

## Resources

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Facebook Open Graph](https://developers.facebook.com/docs/sharing/webmasters/)
- [LinkedIn Article Publishing](https://www.linkedin.com/help/linkedin/answer/80959)
