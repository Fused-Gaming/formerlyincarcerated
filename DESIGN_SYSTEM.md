# Human Park Initiative - Design System & Tokens

Complete responsive design system, branding tokens, and visual specifications for the Formerly Incarcerated Bitcoin Housing Bond Initiative.

## Brand Colors

### Core Palette
```css
--hp-black: #050505
--hp-charcoal: #111111
--hp-dark: #1A1A1A
--hp-orange: #F7931A
--hp-orange-deep: #D97706
--hp-orange-glow: #FFB347
--hp-cream: #F6F1E8
--hp-white: #FFFFFF
--hp-gray-light: #E5E5E5
--hp-gray-medium: #A3A3A3
--hp-gray-dark: #525252
```

### Gradients
```css
--hp-gradient-hero: linear-gradient(
  135deg,
  #050505 0%,
  #111111 35%,
  rgba(247,147,26,0.18) 100%
);

--hp-gradient-sunset: linear-gradient(
  180deg,
  rgba(247,147,26,0.00) 0%,
  rgba(247,147,26,0.20) 50%,
  rgba(247,147,26,0.45) 100%
);

--hp-gradient-footer: linear-gradient(
  90deg,
  #050505 0%,
  #111111 50%,
  #050505 100%
);
```

## Typography

### Font Stack
```
display: "Bebas Neue", "Oswald", "Inter", "Helvetica Neue", sans-serif
sans: "Inter", system fonts, sans-serif
mono: "Source Code Pro", monospace
```

### Font Sizes
```
Hero (Desktop):  clamp(72px, 8vw, 160px)
Hero (Mobile):   clamp(36px, 10vw, 64px)
Section Header:  clamp(36px, 4vw, 64px)
Body (Desktop):  18px
Body (Mobile):   16px
Line Height:     1.7
```

## Layout System

### Grid Standards
```
Max Width:        1440px
Content Width:    1280px
Gutter Desktop:   48px
Gutter Mobile:    20px
Section Spacing:  clamp(48px, 6vw, 120px)
```

### Header/Footer
```
Header Desktop:   140px
Header Mobile:    92px
Footer Desktop:   110px
Footer Mobile:    84px
```

### Safe Zone (Print)
```
Padding Desktop:  80px
Padding Mobile:   24px
```

## Spacing

```
4px   (0.25rem)  - sm
8px   (0.5rem)   - xs
12px  (0.75rem)  - 3
16px  (1rem)     - 4
20px  (1.25rem)  - 5
24px  (1.5rem)   - 6
32px  (2rem)     - 8
40px  (2.5rem)   - 10
48px  (3rem)     - 12
64px  (4rem)     - 16
80px  (5rem)     - 20
96px  (6rem)     - 24
128px (8rem)     - 32
```

## Border Radius

```
hp-small:   8px
hp-medium:  16px
hp-large:   28px
hp-xl:      48px
```

## Shadows

```
hp-soft: 0 8px 30px rgba(0,0,0,0.18);
hp-cinematic: 0 20px 60px rgba(0,0,0,0.45);
```

## Responsive Breakpoints

```
320px and below    - Legacy Phones
321-480px          - Modern Phones
481-768px          - Large Phones
769-1024px         - Tablets
1025-1366px        - Small Laptops
1367-1920px        - Desktop
1921px and above   - Ultra-Wide
```

## Aspect Ratios

### Portrait
- 9:16 (1080×1920) - Mobile
- 19.5:9 (Modern iPhones)
- 4:5 (Instagram Portrait)
- A4 Portrait, Letter Portrait (Print)

### Landscape
- 16:9 (1920×1080) - Standard
- 21:9 (Ultrawide)
- 4:3 (Legacy)
- 3:2 (Surface devices)

## Accessibility

### WCAG Compliance
- Target: WCAG AA minimum
- Preferred: WCAG AAA for text-heavy content

### Contrast
- Body text: 7:1 minimum
- Headings: 4.5:1 minimum

## Print Specifications

### CMYK Colors
| Color | CMYK |
|-------|------|
| Orange | 0 55 100 0 |
| Black | 0 0 0 100 |
| Cream | 4 5 9 0 |

### Resolution
- 300 DPI minimum
- PNG for raster assets
- SVG for vectors
- PDF/X for final exports

### Export Sizes
```
Social OG:         1200 × 630
Instagram Portrait: 1080 × 1350
Presentation:      1920 × 1080
Whitepaper:        2550 × 3300 (8.5×11" @ 300dpi)
```

## Motion & Animation

### Philosophy
- Calm, intentional, restorative
- Cinematic, smooth
- No jitter, aggression, or flashing

### Available Animations
```
fade-up:    0.6s ease-out (opacity + translateY)
fade-in:    0.3s ease-out
slide-down: 0.3s ease-out
slide-up:   0.3s ease-out
scale-in:   0.3s ease-out
pulse-slow: 4s cubic-bezier infinite
```

## Component Library

### Header
- Sticky positioning with scroll detection
- Logo left/right alternation per page
- Mobile menu drawer
- Navigation: Impact, Model, Partners, Docs, Whitepaper, Contact

### Footer
- Dark gradient background
- Organized sections: Organization, Resources, Contact
- Social icons: Twitter, LinkedIn, GitHub
- Mission statement and copyright

### CTAButtons
- Variants: primary (orange), secondary (border), dark, outline
- Sizes: sm, md, lg
- Icons: Arrow, Download supported
- Download variant: special styling

### PageLayout
- Header + Footer wrapper
- Scroll-based header styling
- OG meta tags
- Consistent spacing

## Page Structure

### Navigation
```
/               - Home
/impact         - Impact metrics & outcomes
/model          - Business & governance model
/partners       - Partnership opportunities
/docs           - Technical documentation
/faq            - Frequently asked questions
/about          - Mission & story
/about/team     - Team & advisors
/board          - Board of directors
/contact        - Contact form & email
/whitepaper     - PDF download (v2.0, 12.5MB)
/news           - News & updates
```

### Footer Categories
**Organization**: About, Team, Board, Impact
**Resources**: Whitepaper, Docs, News, FAQ
**Contact**: Email, Twitter, LinkedIn
**Socials**: GitHub, Telegram, LinkedIn, Medium, Instagram, Facebook, X

## Design Principles

Every layout, image, interaction, and animation should reinforce:

1. **Dignity over punishment**
2. **Restoration over stigma**
3. **Community over isolation**
4. **Opportunity over despair**
5. **Humanity over systems**

### Visual Philosophy
- Cinematic realism
- Hopeful futurism
- Institutional professionalism
- Trauma-informed warmth
- Technology-driven transparency

### Imagery
- Golden hour lighting
- Cinematic contrast
- Hopeful body language
- Urban/nature integration
- Diversity & community
- Restoration symbolism
- Forward motion

## Implementation Notes

### Tailwind Classes
All brand colors available as Tailwind utilities:
```
bg-hp-orange, text-hp-white, border-hp-orange, etc.
bg-hp-gradient-hero, bg-hp-gradient-sunset, etc.
rounded-hp-medium, shadow-hp-cinematic, etc.
```

### Color Accessibility
- Orange (#F7931A) on black achieves 11.2:1 contrast
- All color combinations tested for WCAG AA/AAA
- Consider colorblindness in supporting visuals

### Responsive Images
- Use `clamp()` for fluid sizing
- Optimize for mobile-first approach
- Placeholder frames provided for holding graphics
- Story-telling graphics prioritized by page

## Asset Delivery

### Whitepaper
- Location: `/public/whitepapers/49567801-HQ_Final_Whitepaper_2026.pdf`
- Version: 2.0 (May 2026)
- Size: 12.5 MB
- Format: PDF, 300 DPI, publication quality
- Signature: Version controlled with git commits

### Web Signature
- Digital signature available on whitepaper page
- SHA-256 checksums provided upon request
- Audit trail via git history

---

**Document Version**: 2.0
**Last Updated**: May 2026
**Maintainer**: Design System Team
**Status**: Active
