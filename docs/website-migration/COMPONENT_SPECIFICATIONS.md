# Component Specifications for Phase 1

## 1. BoardMemberCard.jsx

**Purpose:** Display individual board member in grid layout with category badge, expertise tags, and contact links.

**Props:**
```javascript
{
  member: {
    id: string,
    name: string,
    title: string,
    category: 'formerly-incarcerated' | 'housing' | 'finance' | 'government',
    bio: string,
    expertise: string[],
    links: { email?: string, linkedin?: string },
    image?: string,
    joinedYear?: number,
  }
}
```

**Features:**
- Category badge (color-coded, top-left)
- Membership year (top-right)
- Profile image with fallback emoji avatar
- Name + title
- Bio excerpt (first 150 chars with "...")
- Expertise tags (inline, max 3)
- Email + LinkedIn links
- Hover state: Bio expands in tooltip
- Responsive: Full width mobile → 2-col tablet → responsive desktop

**Styling:**
- Container: `bg-hp-black border-2 border-hp-orange/30 rounded-lg overflow-hidden hover:border-hp-orange transition`
- Badge: `absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold [category-color]`
- Links: `text-hp-orange hover:text-hp-orange-glow`

**Integration:** Used in `pages/board.jsx` board members grid

---

## 2. TeamMemberCard.jsx

**Purpose:** Display team member with department color-coding, compensation band, and status (hiring/filled).

**Props:**
```javascript
{
  member: {
    id: string,
    name: string,
    role: string,
    department: 'operations' | 'legal' | 'policy' | 'housing' | 'community',
    bio: string,
    compensation: { salary: string, band: string },
    links: { email?: string, linkedin?: string },
    status: 'full-time' | 'contract' | 'hiring',
    startDate?: date,
  }
}
```

**Features:**
- Department color stripe (top border, 4px)
- Status badge: 
  - "Full-time" (green)
  - "Contract" (blue)
  - "🔵 Hiring" (orange pulsing animation)
- Department breadcrumb + role title
- Bio excerpt (100 chars)
- Compensation band (banded not exact): "$65k - $85k"
- Start date or "Open Position"
- LinkedIn link (if available)
- "Apply Now" CTA button for hiring roles
- Contract duration if applicable

**Styling:**
- Container: `bg-hp-dark border border-hp-gray-medium rounded-lg overflow-hidden`
- Department stripe: `h-1 [department-color] bg-opacity-80`
- Status: `inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold`
- CTA: `bg-hp-orange text-hp-black hover:bg-hp-orange-glow font-bold px-4 py-2 rounded`

**Integration:** Used in `pages/team.jsx` team members grid

---

## 3. AdvisorCard.jsx

**Purpose:** Display advisor/partner with organization logo, expertise, and contact info.

**Props:**
```javascript
{
  advisor: {
    id: string,
    name: string,
    organization: string,
    role: string,
    category: 'partner' | 'government' | 'technical',
    bio: string,
    expertise: string[],
    links: { email?: string, website?: string, org_url?: string },
    logo?: string,
    featured: boolean,
  }
}
```

**Features:**
- Featured flag: Larger card (featured) vs compact (regular)
- Organization logo (200px width, center-aligned)
- Category badge (top-right)
- Name + organization + role
- Expertise chips (clickable to filter if applicable)
- Bio excerpt (100 chars)
- Contact links: Email + website + org URL
- CTA: "Learn More" or "Partner With Us" (featured only)
- Hover state: Slight lift + shadow increase

**Featured Styling (Dignifi):**
- `col-span-2` (takes up 2 grid columns)
- Border: HP orange gradient
- Background: Subtle orange tint
- Logo: 250px width
- Full bio display (not truncated)
- All links visible

**Regular Styling:**
- `col-span-1`
- Border: Standard gray
- Logo: 180px width
- Bio truncated to 75 chars

**Integration:** Used in `pages/advisors.jsx` in filtered grid

---

## 4. NewsCard.jsx

**Purpose:** Display news article with category, publication, social sharing.

**Props:**
```javascript
{
  item: {
    id: string,
    date: date,
    title: string,
    source: string,
    category: 'funding' | 'partnership' | 'policy' | 'coverage',
    excerpt: string,
    url?: string,
    featured: boolean,
    image?: string,
  }
}
```

**Features:**
- Featured flag: Hero layout vs compact layout
- Category badge (top-left, color-coded)
- Publication source (gray text)
- Date (formatted: "Jun 15, 2024")
- Title (h3 for featured, h4 for regular)
- Excerpt (100-150 chars, truncated with ellipsis)
- Featured image (if available):
  - Featured: 800×400px full width
  - Regular: 300×200px thumbnail
- "Read Full Article" link (right-arrow icon)
- Social share buttons (featured only):
  - Twitter/X
  - LinkedIn
  - Facebook
  - Copy link
- Hover state: Border color → orange, shadow lift

**Featured Layout:**
- Full width or 2-column span
- Large image + content beside
- All social buttons visible
- Full excerpt visible

**Regular Layout:**
- Single column
- Image above content
- Category + date only
- Truncated excerpt
- "Read More" link

**Integration:** Used in `pages/news.jsx` timeline + `components/NewsSection.jsx` home page

---

## 5. UpdatedPages Integration

### Enhanced board.jsx
```jsx
import BoardMemberCard from '../components/BoardMemberCard';
import { boardMembers, boardCategories } from '../lib/data/boardMembers';

// Use map: boardMembers.map(member => <BoardMemberCard member={member} />)
```

### New team.jsx
```jsx
import TeamMemberCard from '../components/TeamMemberCard';
import { teamMembers, departmentColors } from '../lib/data/teamMembers';

// Filter by department tabs
// Show hiring roles with special CTA
```

### New advisors.jsx
```jsx
import AdvisorCard from '../components/AdvisorCard';
import { advisors, advisorCategories } from '../lib/data/advisors';

// Featured: Dignifi (col-span-2)
// Regular: Grid of 10+ advisors
// Filter by category
```

### New careers.jsx
```jsx
import TeamMemberCard from '../components/TeamMemberCard';
import { teamMembers } from '../lib/data/teamMembers';

// Filter: status === 'hiring'
// Show only open roles
// Add form at bottom for general inquiries
```

### Enhanced news.jsx
```jsx
import NewsCard from '../components/NewsCard';
import { newsUpdates, newsCategories } from '../lib/data/newsUpdates';

// Timeline view OR grid view toggle
// Filter by category buttons
// Sort by featured first, then by date
```

---

## 6. Accessibility Requirements (WCAG AA)

### All Components Must Include:
- Semantic HTML (`article`, `figure`, `figcaption`)
- ARIA labels on interactive elements
- Color not sole means of information (icon + text)
- Keyboard navigation support
- Focus indicators (blue ring outline, 2px)
- `alt` text on all images
- Proper heading hierarchy

### Specific Requirements:
**BoardMemberCard:**
- `role="article"` on container
- `aria-label={member.name} is a board member`
- Email link: `aria-label="Email {name}"`
- LinkedIn link: `aria-label="{name} LinkedIn profile"`

**TeamMemberCard:**
- `role="article"` on container
- Status badge with text (not just color)
- Department stripe + text in breadcrumb
- "Apply Now" button: keyboard accessible, enter/space activates

**AdvisorCard:**
- `figure` + `figcaption` for logo + name
- All links: descriptive `aria-label`
- Category visible as text + color

**NewsCard:**
- `article` container
- Image with `alt="{title} news preview"`
- Date: machine-readable with `<time>` tag
- All links: descriptive text (not "Read more")

---

## 7. Mobile Responsiveness Breakpoints

### Tailwind Breakpoints:
- `sm`: 640px - Tablets small
- `md`: 768px - Tablets
- `lg`: 1024px - Desktops
- `xl`: 1280px - Large desktops

### Grid Layouts:
**BoardMemberCard Grid:**
- Mobile: 1 column (`grid-cols-1`)
- Tablet: 2 columns (`md:grid-cols-2`)
- Desktop: 2 columns (`lg:grid-cols-2`)

**TeamMemberCard Grid:**
- Mobile: 1 column
- Tablet: 2 columns (`md:grid-cols-2`)
- Desktop: 3 columns (`lg:grid-cols-3`)

**AdvisorCard Grid:**
- Mobile: 1 column (featured = full width)
- Tablet: 2 columns (`md:grid-cols-2`)
- Desktop: 3 columns (`lg:grid-cols-3`)

**NewsCard Grid:**
- Mobile: 1 column (featured = full width)
- Tablet: 2 columns (`md:grid-cols-2`)
- Desktop: Featured spans 2 cols, regular 1 col each

---

## 8. Performance Optimization

### Image Optimization:
- Use Next.js `<Image>` component with `priority` for featured
- Implement `srcSet` for responsive images
- WebP format with PNG fallback
- Lazy load non-featured images

### Code Splitting:
- CardComponents: Static import
- DataFiles: Static import (bundled at build)
- OG Images: Lazy load only on page head

### Caching Strategy:
- Data files: Never change (static)
- Images: 1 year cache (immutable filenames)
- OG images: 7 day cache (may update)

