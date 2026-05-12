# Bitcoin Land Bond - Project Documentation

## Project Overview

Bitcoin Land Bond is a Criminal Asset Recovery Initiative for funding permanent deed-restricted housing for formerly incarcerated individuals. This document guides Claude Code and other AI assistants through the project architecture, codebase structure, and development practices.

## MCP Framework Setup

This project uses the **Model Context Protocol (MCP)** ecosystem for intelligent automation:

### Quick Start

Every Claude Code session automatically:
1. Runs `.mcp/scripts/init-mcp.js` on session start
2. Checks for package updates (@h4shed/mcp-cli, mcp-core, skill-syncpulse)
3. Verifies framework integrity
4. Loads available skills and configuration
5. Prepares project context

**Manual initialization:**
```bash
npm run mcp:init        # Initialize framework
npm run mcp:check-updates  # Check for updates
npm run mcp:sync        # Initialize + Check Updates
```

### MCP Configuration

- **Config File:** `.mcp/config/mcp.config.json`
- **Init Script:** `.mcp/scripts/init-mcp.js`
- **File Filters:** `.claudeignore`
- **Session Hook:** `.mcp/config/session-start-hook.json`
- **Documentation:** `.mcp/README.md`

### Available MCP Skills

- `session-start-hook` - Setup and framework initialization
- `update-config` - Configure Claude Code harness settings
- `review` - Pull request and code analysis
- `security-review` - Security assessment of changes
- `simplify` - Code quality and efficiency review
- `init` - Initialize CLAUDE.md documentation

### MCP Servers

Connected to:
- **Vercel** - Deployment and preview management
- **GitHub** - Repository and PR automation
- **Cloudflare** - Edge computing and storage
- **Supabase** - Database and backend services

## Project Structure

```
formerlyincarcerated/
├── .mcp/                          # MCP Framework
│   ├── config/
│   │   ├── mcp.config.json       # Main configuration
│   │   └── session-start-hook.json
│   ├── scripts/
│   │   └── init-mcp.js           # Initialization script
│   ├── skills/                   # Skill implementations
│   ├── servers/                  # Server configurations
│   └── README.md                 # MCP Documentation
│
├── pages/                         # Next.js pages
│   ├── index.jsx                 # Home page
│   ├── whitepaper.jsx            # Whitepaper page
│   ├── impact.jsx                # Impact metrics
│   ├── model.jsx                 # Governance model
│   ├── partners.jsx              # Partnership tiers
│   ├── docs.jsx                  # Documentation
│   ├── faq.jsx                   # FAQ section
│   ├── contact.jsx               # Contact form
│   ├── about.jsx                 # About page
│   ├── about/team.jsx            # Team page
│   ├── board.jsx                 # Board of directors
│   ├── news.jsx                  # News timeline
│   ├── _document.jsx             # Global layout
│   └── _app.jsx                  # App wrapper
│
├── components/                    # React components
│   ├── Header.jsx                # Site navigation
│   ├── Footer.jsx                # Site footer
│   ├── PageLayout.jsx            # Page wrapper
│   ├── CTAButtons.jsx            # Call-to-action buttons
│   └── OpenGraphHead.jsx         # OG meta tags
│
├── public/                        # Static assets
│   ├── og-image.png              # Default OG preview
│   ├── whitepaper-og-preview.png # Whitepaper OG image (1536×1024)
│   ├── bitcoin-land-bond-social-square.png # Social logo (1254×1254)
│   └── whitepapers/              # Downloadable documents
│
├── lib/                          # Utility libraries
│   └── og-tags.js               # OG tag generation
│
├── styles/                       # Global styles
│   └── globals.css              # CSS imports and resets
│
├── .github/                      # GitHub configuration
│   └── workflows/
│       └── deployment-test.yml  # CI/CD pipeline
│
├── .claudeignore                 # Claude Code file filters
├── .gitignore                    # Git file filters
├── package.json                  # Dependencies and scripts
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── CLAUDE.md                    # This file
├── README.md                    # Project overview
└── DEPLOYMENT_TEST_GUIDE.md     # Testing documentation
```

## Technology Stack

### Core Framework
- **Next.js 15.2.6** - React framework with SSR
- **React 19.0.0** - UI component library
- **Tailwind CSS 3.4.14** - Utility-first CSS

### Design System
- **HP Brand Colors** - Custom color palette
- **Bebas Neue Font** - Display typography
- **Inter Font** - Body typography
- **Responsive Spacing System** - Mobile-first design

### Dependencies
- **Lucide React** - Icon library
- **@react-pdf/renderer** - PDF generation
- **pdfjs-dist** - PDF rendering
- **PostCSS** - CSS processing
- **Autoprefixer** - Browser compatibility

### Development Tools
- **Next.js Linter** - Code quality
- **Tailwind CSS** - Styling framework
- **Git** - Version control

### Deployment & Hosting
- **Vercel** - Edge deployment
- **GitHub Actions** - CI/CD pipeline
- **Cloudflare** - Content delivery

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Start development server (with MCP initialization)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# MCP Commands
npm run mcp:init           # Initialize framework
npm run mcp:check-updates  # Check for updates
npm run mcp:sync          # Initialize + Check Updates
```

### Git Workflow

**Feature Branch:**
```bash
git checkout -b feature/description
# Make changes
git add .
git commit -m "Description of changes"
git push origin feature/description
# Create PR on GitHub
```

**Working on Assigned Branch:**
```bash
git fetch origin
git checkout claude/white-papers-social-preview-bRJ4w
npm run mcp:sync  # Initialize and check updates
# Make changes
git add .
git commit -m "Description of changes"
git push origin claude/white-papers-social-preview-bRJ4w
```

## Open Graph & Social Preview

### Configuration

All pages use Open Graph meta tags for social media sharing:

**Implementation:**
- `components/OpenGraphHead.jsx` - Meta tag component
- `lib/og-tags.js` - OG tag generation library
- `pages/_document.jsx` - Global OG configuration

**Social Platforms Covered:**
- Facebook
- LinkedIn
- Twitter/X
- Discord
- Telegram
- Reddit
- Slack
- WhatsApp
- Pinterest

### Image Specifications

| Image | Size | Format | Purpose |
|-------|------|--------|---------|
| `og-image.png` | 1200×630 | PNG | Default OG preview |
| `whitepaper-og-preview.png` | 1536×1024 | PNG | Whitepaper article preview |
| `bitcoin-land-bond-social-square.png` | 1254×1254 | PNG | Social media logo |

### Whitepaper Downloads

- **Location:** `public/whitepapers/`
- **Download Function:** `handleDownload()` in pages/whitepaper.jsx
- **Formats:** PDF documents
- **Access:** Linked from whitepaper page

## Design System

### Colors (HP Brand)

**Core Palette:**
- `hp-black` (#050505)
- `hp-charcoal` (#111111)
- `hp-dark` (#1A1A1A)
- `hp-orange` (#F7931A) - Primary accent
- `hp-orange-deep` (#D97706)
- `hp-orange-glow` (#FFB347)
- `hp-cream` (#F6F1E8)
- `hp-white` (#FFFFFF)
- `hp-gray-light` (#E5E5E5)
- `hp-gray-medium` (#A3A3A3)
- `hp-gray-dark` (#525252)

### Typography

**Display Font:** Bebas Neue
```css
font-family: display;
font-size: clamp(36px, 5vw, 60px);
```

**Body Font:** Inter
```css
font-family: sans;
font-size: 16px;
line-height: 24px;
```

### Spacing System

- `0`: 0px
- `1`: 4px
- `2`: 8px
- `3`: 12px
- `4`: 16px
- `5`: 20px
- `6`: 24px
- `8`: 32px
- `10`: 40px
- `12`: 48px
- `16`: 64px
- `20`: 80px
- `24`: 96px
- `32`: 128px

### Gradients

**Hero Gradient:**
```css
background-image: linear-gradient(135deg, #050505 0%, #111111 35%, rgba(247,147,26,0.18) 100%);
```

**Sunset Gradient:**
```css
background-image: linear-gradient(180deg, rgba(247,147,26,0.00) 0%, rgba(247,147,26,0.20) 50%, rgba(247,147,26,0.45) 100%);
```

**Footer Gradient:**
```css
background-image: linear-gradient(90deg, #050505 0%, #111111 50%, #050505 100%);
```

## CI/CD Pipeline

### GitHub Actions Workflow

**File:** `.github/workflows/deployment-test.yml`

**Triggers:**
- Push to `main` branch
- Push to `claude/white-papers-social-preview-bRJ4w`
- Pull requests to `main`

**Jobs:**

1. **Build & Test (Matrix: Node 18.x, 20.x)**
   - Checkout code
   - Setup Node.js with cache
   - Install dependencies
   - Run linter
   - Build Next.js application
   - Verify build artifacts (.next directory)

2. **Deployment Verification**
   - Verify public assets exist
   - Verify page components
   - Check download links
   - Verify Open Graph configuration
   - Content validity checks

3. **Summary**
   - Aggregate all test results
   - Report final status

### Manual Deployment

**To Vercel:**
```bash
npm run build
npm start
```

**Preview:**
Automatic on PR creation via Vercel GitHub integration

## Code Quality Standards

### Linting

```bash
npm run lint
```

Checks:
- Variable naming conventions
- Unused imports
- Code formatting
- Component structure

### Accessibility

- WCAG AA compliance minimum
- 11.2:1 contrast ratio (exceeds 7:1 requirement)
- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigation support

### Performance

- Image optimization
- Code splitting
- Static generation where possible
- Edge caching via Vercel

## Common Tasks

### Add a New Page

1. Create file: `pages/new-page.jsx`
2. Import `PageLayout` and `OpenGraphHead`
3. Define metadata props
4. Implement page content
5. Test locally: `npm run dev`
6. Commit and create PR

### Update Open Graph Tags

1. Edit `lib/og-tags.js` for global changes
2. Or update individual page's `OpenGraphHead` props
3. Test with Meta Sharing Debugger
4. Commit changes

### Add a Component

1. Create file: `components/MyComponent.jsx`
2. Export as default
3. Add to page or other components
4. Update styles as needed
5. Test responsive design
6. Commit

### Deploy Changes

1. Push to branch
2. Create PR (auto-deploys preview via Vercel)
3. Review in preview deployment
4. Request review from team
5. Merge when approved
6. Main branch auto-deploys to production

## Environment Variables

No environment variables required for development. All configuration is in:
- `tailwind.config.js` - Design tokens
- `.mcp/config/mcp.config.json` - MCP settings
- `next.config.js` - Next.js configuration

## Troubleshooting

### MCP Framework Issues

**Problem:** Init script fails
```bash
# Solution: Verify initialization
npm run mcp:init
```

**Problem:** Package updates available
```bash
# Solution: Update packages
npm run mcp:check-updates
npm update @h4shed/mcp-cli @h4shed/mcp-core @h4shed/skill-syncpulse
```

### Build Issues

**Problem:** Build fails with styling errors
```bash
# Solution: Rebuild Tailwind cache
npm run build -- --clean
```

**Problem:** Module not found errors
```bash
# Solution: Reinstall dependencies
rm -rf node_modules
npm install
npm run build
```

### Development Issues

**Problem:** Changes not reflecting in browser
```bash
# Solution: Clear Next.js cache
rm -rf .next
npm run dev
```

**Problem:** Port 3000 already in use
```bash
# Solution: Use different port
npm run dev -- -p 3001
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Open Graph Protocol](https://ogp.me/)
- [MCP Protocol Documentation](https://modelcontextprotocol.io)

## Git Conventions

### Branch Naming

- Feature: `feature/description`
- Fix: `fix/description`
- Development: `claude/feature-name-suffix`
- Release: `release/version`

### Commit Messages

Format:
```
[TYPE] Brief description

- Detailed change 1
- Detailed change 2

Relates to #issue-number
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Pull Requests

1. Create from feature/development branch
2. Title: Clear, descriptive
3. Description: What, why, how
4. Link related issues
5. Request reviews
6. Address feedback
7. Merge when approved

## Contact & Support

- **Email:** hello@formerlyincarcerated.org
- **Website:** https://formerlyincarcerated.org
- **GitHub:** https://github.com/Fused-Gaming/formerlyincarcerated

---

**Last Updated:** 2026-05-12
**Framework Version:** 1.0.0
**Status:** ✅ Active & Maintained
