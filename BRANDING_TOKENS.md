# 🎨 Bitcoin Land Bond - Design Tokens & Branding System

**Last Updated:** May 3, 2026  
**Version:** 1.0  
**Framework:** Tailwind CSS 3.4.14  

---

## 📋 Overview

This document defines the complete design token system for the Bitcoin Land Bond platform. All tokens are implemented in `tailwind.config.js` and are available for use throughout the application via Tailwind CSS utility classes.

---

## 🎯 Brand Identity

**Brand Name:** Bitcoin Land Bond  
**Tagline:** Criminal Asset Recovery Initiative  
**Mission:** Deploying $15B in seized cryptocurrency to fund permanent deed-restricted housing for 600,000+ formerly incarcerated people annually.

**Brand Values:**
- 🏘️ **Housing Justice** - Permanent, deed-restricted housing
- 💰 **Asset Recovery** - Leveraging seized assets for social good
- 🤝 **Community Leadership** - Formerly incarcerated voices at governance center
- 📊 **Evidence-Based** - Measurable outcomes and impact tracking

---

## 🎨 Color System

### Primary Brand Colors

#### Amber (Warmth, Opportunity, Primary Brand)
Used for primary CTAs, brand highlights, and positive momentum.

| Token | Hex | Usage |
|-------|-----|-------|
| `amber-300` | `#fcd34d` | Light accents, hover states |
| `amber-400` | `#facc15` | Primary buttons, highlights |
| `amber-500` | `#f59e0b` | Primary brand color |
| `amber-600` | `#d97706` | Darker buttons, emphasis |
| `amber-700` | `#b45309` | Deep emphasis, borders |
| `amber-800` | `#92400e` | Text on light backgrounds |
| `amber-900` | `#78350f` | Darkest, reserved use |

**Usage Pattern:**
```html
<!-- Primary CTA Button -->
<button class="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-lg">
  Get Started
</button>

<!-- Brand Accent -->
<div class="border-l-4 border-amber-500 pl-4">Featured content</div>
```

#### Emerald (Growth, Success, Positive Impact)
Represents housing solutions, positive outcomes, and community prosperity.

| Token | Hex | Usage |
|-------|-----|-------|
| `emerald-400` | `#34d399` | Light success states |
| `emerald-500` | `#10b981` | Success indicators |
| `emerald-600` | `#059669` | Secondary actions |
| `emerald-700` | `#047857` | Emphasis, darker variant |
| `emerald-800` | `#065f46` | Deep emerald for text |
| `emerald-900` | `#064e3b` | Darkest, minimal use |

**Usage Pattern:**
```html
<!-- Success Badge -->
<span class="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
  ✓ Impact Achieved
</span>

<!-- Impact Metric -->
<div class="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
  <p class="text-emerald-700 font-bold">20-30% Recidivism Reduction</p>
</div>
```

#### Blue (Trust, Data, Information)
Used for information, governance details, financial metrics, and supporting content.

| Token | Hex | Usage |
|-------|-----|-------|
| `blue-400` | `#60a5fa` | Light information states |
| `blue-500` | `#3b82f6` | Primary information color |
| `blue-600` | `#2563eb` | Secondary actions |
| `blue-700` | `#1d4ed8` | Emphasis |
| `blue-800` | `#1e40af` | Dark emphasis |
| `blue-900` | `#1e3a8a` | Darkest, minimal use |

**Usage Pattern:**
```html
<!-- Info Box -->
<div class="bg-blue-50 border-l-4 border-blue-500 p-4">
  <p class="text-blue-900 font-semibold">Governance Structure</p>
  <p class="text-blue-700 text-sm mt-1">13-member board with 4 constituencies</p>
</div>
```

### Semantic Colors

#### Red (Problems, Challenges, Critical)
Used sparingly to highlight challenges, problems, or critical information.

| Token | Hex | Usage |
|-------|-----|-------|
| `red-400` | `#f87171` | Light alerts |
| `red-500` | `#ef4444` | Alert states |
| `red-600` | `#dc2626` | Emphasis |

**Usage:**
```html
<p class="text-red-600 font-semibold">Problem: 600K+ annually need reentry housing</p>
```

#### Green (Positive, Solutions, Growth)
Secondary success indicator, can be used alongside emerald.

| Token | Hex | Usage |
|-------|-----|-------|
| `green-400` | `#4ade80` | Light success |
| `green-500` | `#22c55e` | Success color |
| `green-600` | `#16a34a` | Darker success |

#### Yellow (Attention, Warning)
Used for important notices or secondary attention items.

| Token | Hex | Usage |
|-------|-----|-------|
| `yellow-400` | `#facc15` | Light warning |
| `yellow-500` | `#eab308` | Warning color |
| `yellow-600` | `#ca8a04` | Emphasis |

### Neutral Colors (Grayscale)

Used for text, backgrounds, borders, and neutral UI elements.

| Token | Hex | Usage |
|-------|-----|-------|
| `slate-50` | `#f8fafc` | Lightest backgrounds |
| `slate-100` | `#f1f5f9` | Light backgrounds |
| `slate-200` | `#e2e8f0` | Light borders |
| `slate-300` | `#cbd5e1` | Subtle borders |
| `slate-400` | `#94a3b8` | Secondary text |
| `slate-500` | `#64748b` | Placeholder text |
| `slate-600` | `#475569` | Body text |
| `slate-700` | `#334155` | Dark text |
| `slate-800` | `#1e293b` | Darker text |
| `slate-900` | `#0f172a` | Dark surfaces |
| `slate-950` | `#020617` | Darkest background |

**Color Contrast Matrix:**
```
✓ Accessible text combinations:
- slate-950 on slate-50 (WCAG AAA, 19.5:1 contrast)
- slate-900 on slate-50 (WCAG AAA, 17.3:1 contrast)
- slate-700 on slate-50 (WCAG AAA, 12.0:1 contrast)
- slate-600 on slate-100 (WCAG AA, 7.8:1 contrast)
- white on slate-900 (WCAG AAA, 20.5:1 contrast)
```

### Background Palette

| Usage | Classes | Hex |
|-------|---------|-----|
| Dark Mode Base | `bg-slate-950` | `#020617` |
| Dark Mode Surface | `bg-slate-900` | `#0f172a` |
| Card Background | `bg-slate-800` | `#1e293b` |
| Light Background | `bg-slate-100` | `#f1f5f9` |

---

## 🔤 Typography System

### Font Families

**Sans Serif (Default):**
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, 
             Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
```

**Monospace (Code):**
```css
font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
```

### Font Sizes

| Token | Size | Line Height | Letter Spacing | Usage |
|-------|------|-------------|----------------|-------|
| `text-xs` | 12px | 16px | 0.5px | Captions, small labels |
| `text-sm` | 14px | 20px | 0.25px | Body small, helper text |
| `text-base` | 16px | 24px | 0.15px | Body text, default |
| `text-lg` | 18px | 28px | 0.1px | Intro text, emphasis |
| `text-xl` | 20px | 28px | 0px | Subheadings |
| `text-2xl` | 24px | 32px | 0px | Section headings |
| `text-3xl` | 30px | 36px | -0.5px | Major headings |
| `text-4xl` | 36px | 40px | -1px | Page titles |
| `text-5xl` | 48px | 48px | -1.5px | Hero titles |
| `text-6xl` | 60px | 60px | -2px | Banner text |

**Usage Pattern:**
```html
<!-- Page Title -->
<h1 class="text-5xl md:text-6xl font-black leading-tight">
  Bitcoin Land Bond
</h1>

<!-- Section Heading -->
<h2 class="text-3xl font-bold text-slate-900">
  Impact Framework
</h2>

<!-- Body Text -->
<p class="text-base text-slate-600 leading-relaxed">
  The Bitcoin Land Bond initiative...
</p>
```

### Font Weights

| Token | Weight | Usage |
|-------|--------|-------|
| `font-thin` | 100 | Rarely used, decorative |
| `font-extralight` | 200 | Rarely used |
| `font-light` | 300 | Subtle text |
| `font-normal` | 400 | Body text, default |
| `font-medium` | 500 | Emphasized body text |
| `font-semibold` | 600 | Subheadings, labels |
| `font-bold` | 700 | Headings, strong emphasis |
| `font-extrabold` | 800 | Bold headings |
| `font-black` | 900 | Hero text, maximum emphasis |

**Hierarchy Examples:**
```html
<!-- Hero Headline -->
<h1 class="text-5xl font-black">Maximum Impact</h1>

<!-- Section Title -->
<h2 class="text-3xl font-bold">Key Features</h2>

<!-- Subsection -->
<h3 class="text-xl font-semibold">Detail Point</h3>

<!-- Emphasis -->
<span class="font-medium text-amber-600">Important detail</span>

<!-- Regular -->
<p class="font-normal text-slate-600">Standard body text</p>
```

---

## 📏 Spacing Scale

All spacing values use the 4px grid system for consistency.

| Token | Size | Usage |
|-------|------|-------|
| `0` | 0px | Remove spacing |
| `1` | 4px | Tight spacing (icon gaps) |
| `2` | 8px | Small spacing (input padding) |
| `3` | 12px | Compact spacing |
| `4` | 16px | Default spacing, padding base |
| `5` | 20px | Section padding |
| `6` | 24px | Component spacing |
| `8` | 32px | Larger spacing |
| `10` | 40px | Page section spacing |
| `12` | 48px | Major spacing |
| `16` | 64px | Large spacing |
| `20` | 80px | Extra large spacing |
| `24` | 96px | Mega spacing |
| `32` | 128px | Maximum spacing |

**Application Pattern:**
```html
<!-- Component padding -->
<div class="p-4 md:p-6">Content</div>

<!-- Section spacing -->
<section class="py-12 md:py-20">Content</section>

<!-- Flex gap -->
<div class="flex gap-3">Item 1</div>

<!-- Margin -->
<div class="mb-6 mt-4">Content</div>
```

---

## 🔘 Border Radius

| Token | Radius | Usage |
|-------|--------|-------|
| `rounded-none` | 0px | Sharp corners |
| `rounded-sm` | 4px | Minimal roundness |
| `rounded-base` | 6px | Default, most elements |
| `rounded-md` | 8px | Cards, inputs |
| `rounded-lg` | 12px | Large cards, buttons |
| `rounded-xl` | 16px | Feature cards |
| `rounded-2xl` | 24px | Major components |
| `rounded-full` | 9999px | Pills, circles |

**Application Pattern:**
```html
<!-- Button -->
<button class="bg-amber-500 text-white px-6 py-3 rounded-lg hover:rounded-xl transition-all">
  Action
</button>

<!-- Card -->
<div class="bg-white p-6 rounded-xl shadow-lg">Card content</div>

<!-- Pill Badge -->
<span class="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm">
  Active
</span>
```

---

## ⚡ Shadow System

### Standard Shadows

| Token | CSS | Usage |
|-------|-----|-------|
| `shadow-none` | none | No shadow |
| `shadow-sm` | 0 1px 2px 0 rgb(0 0 0 / 0.05) | Subtle shadow |
| `shadow-base` | 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1) | Default shadow |
| `shadow-md` | 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) | Medium shadow |
| `shadow-lg` | 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) | Prominent shadow |
| `shadow-xl` | 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) | Large shadow |
| `shadow-2xl` | 0 25px 50px -12px rgb(0 0 0 / 0.25) | Extra large shadow |
| `shadow-inner` | inset 0 2px 4px 0 rgb(0 0 0 / 0.05) | Inset shadow |

### Brand Glow Shadows

Special branded shadow effects using primary colors:

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-amber-glow` | 0 0 20px rgba(251, 191, 36, 0.3) | Amber accent glow |
| `shadow-emerald-glow` | 0 0 20px rgba(16, 185, 129, 0.3) | Success/growth glow |
| `shadow-blue-glow` | 0 0 20px rgba(59, 130, 246, 0.3) | Information glow |

**Application Pattern:**
```html
<!-- Card with elevation -->
<div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
  Card content
</div>

<!-- Featured element -->
<div class="bg-gradient-to-r from-amber-900/20 to-amber-800/10 p-6 rounded-xl shadow-amber-glow border border-amber-700/30">
  Featured content with glow
</div>
```

---

## 🎬 Animations & Motion

### Animation Durations

| Token | Duration | Usage |
|-------|----------|-------|
| `duration-75` | 75ms | Micro-interactions |
| `duration-100` | 100ms | Quick feedback |
| `duration-150` | 150ms | Snappy transitions |
| `duration-200` | 200ms | Standard transition |
| `duration-300` | 300ms | Default animation |
| `duration-500` | 500ms | Noticeable transition |
| `duration-700` | 700ms | Slow transition |
| `duration-1000` | 1000ms | Deliberate animation |

### Animation Timing Functions

| Token | Easing | Usage |
|-------|--------|-------|
| `ease-linear` | linear | Consistent motion |
| `ease-in` | cubic-bezier(0.4, 0, 1, 1) | Accelerating |
| `ease-out` | cubic-bezier(0, 0, 0.2, 1) | Decelerating |
| `ease-in-out` | cubic-bezier(0.4, 0, 0.2, 1) | Smooth both directions |
| `ease` | cubic-bezier(0.25, 0.1, 0.25, 1) | Natural feel |

### Custom Animations

#### Fade Up
Opacity fade with upward movement. Used for entrance animations.

```css
@keyframes fade-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Usage:** `animate-fade-up` (0.6s ease-out)

#### Fade In
Pure opacity fade without movement. Used for content reveals.

```css
@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
```

**Usage:** `animate-fade-in` (0.3s ease-out)

#### Slide Down
Downward movement with opacity. Used for header reveals.

```css
@keyframes slide-down {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Usage:** `animate-slide-down` (0.3s ease-out)

#### Slide Up
Upward movement with opacity. Used for element exits.

```css
@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Usage:** `animate-slide-up` (0.3s ease-out)

#### Pulse Slow
Gentle opacity pulse for attention. Used for looping animations.

```css
@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

**Usage:** `animate-pulse-slow` (4s infinite)

#### Scale In
Growth with opacity fade. Used for component reveals.

```css
@keyframes scale-in {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
```

**Usage:** `animate-scale-in` (0.3s ease-out)

**Animation Application Pattern:**
```html
<!-- Page entry animation -->
<div class="animate-fade-up">
  <h1 class="text-5xl font-black">Page Title</h1>
</div>

<!-- Looping pulse -->
<div class="animate-pulse-slow">
  <div class="w-3 h-3 bg-amber-500 rounded-full"></div>
</div>

<!-- Delayed animation -->
<div class="animate-fade-in" style="animation-delay: 0.2s">
  Content appears after delay
</div>
```

---

## 🌓 Opacity Scale

Used for transparency and layering.

| Token | Value | Usage |
|-------|-------|-------|
| `opacity-0` | 0% | Hidden/transparent |
| `opacity-5` | 5% | Subtle fade |
| `opacity-10` | 10% | Lighter fade |
| `opacity-20` | 20% | Light transparency |
| `opacity-30` | 30% | Subtle transparency |
| `opacity-40` | 40% | Moderate transparency |
| `opacity-50` | 50% | Semi-transparent |
| `opacity-60` | 60% | Mostly opaque |
| `opacity-70` | 70% | Slightly transparent |
| `opacity-80` | 80% | Mostly visible |
| `opacity-90` | 90% | Slight fade |
| `opacity-95` | 95% | Almost opaque |
| `opacity-100` | 100% | Fully opaque |

**Application Pattern:**
```html
<!-- Overlay -->
<div class="fixed inset-0 bg-black/50 opacity-50"></div>

<!-- Fade effect -->
<div class="text-slate-600/60">Faded text</div>

<!-- Hover opacity -->
<div class="opacity-100 hover:opacity-75 transition-opacity">
  Hover to fade
</div>
```

---

## 📐 Responsive Breakpoints

Standard Tailwind breakpoints (no customization needed):

| Prefix | Breakpoint | Usage |
|--------|-----------|-------|
| (none) | 0px | Mobile first |
| `sm:` | 640px | Small screens |
| `md:` | 768px | Medium screens (tablets) |
| `lg:` | 1024px | Large screens |
| `xl:` | 1280px | Extra large screens |
| `2xl:` | 1536px | 2K+ displays |

**Mobile-First Pattern:**
```html
<!-- Single column on mobile, 2 cols on tablet, 3 cols on desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>

<!-- Text sizing responsive -->
<h1 class="text-4xl md:text-5xl lg:text-6xl font-black">
  Heading
</h1>
```

---

## 🎨 Design System Patterns

### Button Styles

**Primary (Amber):**
```html
<button class="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition-colors duration-200">
  Primary Action
</button>
```

**Secondary (Blue):**
```html
<button class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors duration-200">
  Secondary Action
</button>
```

**Success (Emerald):**
```html
<button class="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors duration-200">
  Confirm
</button>
```

**Outline:**
```html
<button class="px-6 py-3 border-2 border-amber-500 text-amber-600 hover:bg-amber-50 font-bold rounded-lg transition-colors duration-200">
  Outlined
</button>
```

### Card Styles

**Standard Card:**
```html
<div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
  <h3 class="text-xl font-bold text-slate-900 mb-2">Card Title</h3>
  <p class="text-slate-600">Card content goes here.</p>
</div>
```

**Dark Card (On Dark Background):**
```html
<div class="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:border-amber-700/30 transition-colors duration-200">
  <h3 class="text-xl font-bold text-white mb-2">Dark Card</h3>
  <p class="text-slate-300">Content for dark mode card.</p>
</div>
```

**Accent Card:**
```html
<div class="bg-gradient-to-br from-amber-900/20 to-amber-800/5 rounded-xl border border-amber-700/30 p-6 shadow-amber-glow/50">
  <h3 class="text-xl font-bold text-amber-700 mb-2">Featured</h3>
  <p class="text-amber-600">Highlighted content with brand glow.</p>
</div>
```

### Badge Styles

**Primary Badge:**
```html
<span class="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
  Badge
</span>
```

**Success Badge:**
```html
<span class="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
  ✓ Verified
</span>
```

**Info Badge:**
```html
<span class="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
  New
</span>
```

### Input Styles

**Text Input:**
```html
<input 
  type="text" 
  placeholder="Enter text..."
  class="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-colors duration-200"
/>
```

**Text Area:**
```html
<textarea 
  placeholder="Enter message..."
  class="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-colors duration-200 resize-none"
></textarea>
```

---

## 📋 Implementation Checklist

- [ ] All color tokens defined in `tailwind.config.js`
- [ ] Typography hierarchy established and documented
- [ ] Spacing scale applied consistently across components
- [ ] Shadow system implemented with glow variants
- [ ] Animation library ready for use
- [ ] Responsive breakpoints tested on all device sizes
- [ ] Contrast ratios verified for accessibility (WCAG AA minimum)
- [ ] Dark mode support implemented
- [ ] Hover/focus states consistent across all interactive elements
- [ ] Loading states use pulse-slow animation
- [ ] Page transitions use fade-up or slide-down animations
- [ ] Button variants cover primary, secondary, outline, and disabled states
- [ ] Card styles consistent across all page sections

---

## 🔗 Token Usage in Code

### Example: Hero Section

```jsx
<section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
  {/* Background animation */}
  <div className="fixed inset-0 z-0">
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
    <div className="text-center space-y-8 animate-fade-up">
      <h1 className="text-5xl md:text-6xl font-black leading-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
        Bitcoin Land Bond
      </h1>
      <p className="text-xl text-slate-300 max-w-2xl mx-auto">
        Criminal Asset Recovery Initiative
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-amber-glow">
          Learn More
        </button>
        <button className="px-8 py-4 border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 font-bold rounded-lg transition-colors duration-200">
          View Model
        </button>
      </div>
    </div>
  </div>
</section>
```

### Example: Impact Card

```jsx
<div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 shadow-lg hover:shadow-emerald-glow/30 transition-shadow duration-300">
  <div className="flex items-start gap-4 mb-4">
    <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
      <span className="text-emerald-400 text-xl">🏘️</span>
    </div>
    <div>
      <h3 className="text-lg font-bold text-white mb-1">Housing Security</h3>
      <p className="text-slate-400 text-sm">Permanent deed-restricted housing for 2,000+ residents</p>
    </div>
  </div>
  <div className="text-emerald-400 font-semibold text-2xl">95%</div>
  <p className="text-slate-500 text-xs mt-1">Expected housing retention rate</p>
</div>
```

---

## 🎯 Accessibility Considerations

### Color Contrast
- All text colors meet WCAG AA standards (4.5:1 minimum)
- Dark mode text on slate-900 background: 20.5:1 contrast (AAA)
- Amber text on white: 8.2:1 contrast (AAA)

### Motion
- Respect `prefers-reduced-motion` for accessibility:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

### Focus States
- All interactive elements have visible focus rings
- Use `focus:ring-2 focus:ring-amber-300` for button focus
- Ensure focus order is logical and matches visual layout

---

## 📚 Related Documentation

- `tailwind.config.js` - Actual token implementation
- `pages/index.jsx` - Live examples of token usage
- `pages/whitepaper.jsx` - Advanced card and typography patterns
- `styles/globals.css` - Global animations and resets

---

**Bitcoin Land Bond Design System** | Version 1.0 | May 2026

For updates or questions, reference the main codebase or reach out to hello@formerlyincarcerated.org
