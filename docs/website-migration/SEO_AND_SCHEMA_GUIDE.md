# SEO & Schema Markup Guide for Phase 1

## 1. OpenGraph Configuration Extensions

### Updated lib/og-tags.js

Add these new configurations alongside existing `defaultOGTags` and `whitePaperOGTags`:

```javascript
export const boardOGTags = {
  title: 'Board of Directors - Bitcoin Land Bond',
  description: '13-member board of directors: 50% formerly incarcerated leaders. Equal voice, lived experience, shared mission for housing recovery.',
  image: '/board-og-preview.png',
  url: 'https://formerlyincarcerated.org/board',
  type: 'website',
  imageWidth: '1200',
  imageHeight: '630',
};

export const teamOGTags = {
  title: 'Our Team - Bitcoin Land Bond',
  description: '15-person team dedicated to housing recovery. Transparent compensation, open positions, full-time and contract roles. Join us.',
  image: '/team-og-preview.png',
  url: 'https://formerlyincarcerated.org/team',
  type: 'website',
  imageWidth: '1200',
  imageHeight: '630',
};

export const advisorsOGTags = {
  title: 'Advisors & Partners - Bitcoin Land Bond',
  description: 'Strategic partnerships with Dignifi, government liaisons, and technical advisors. Building the future of housing recovery together.',
  image: '/advisors-og-preview.png',
  url: 'https://formerlyincarcerated.org/advisors',
  type: 'website',
  imageWidth: '1200',
  imageHeight: '630',
};

export const careersOGTags = {
  title: 'Careers at Bitcoin Land Bond',
  description: 'Join our mission to use seized cryptocurrency to fund permanent housing for 600,000+ formerly incarcerated individuals. 5 open roles.',
  image: '/careers-og-preview.png',
  url: 'https://formerlyincarcerated.org/careers',
  type: 'website',
  imageWidth: '1200',
  imageHeight: '630',
};

export const newsOGTags = {
  title: 'News & Impact - Bitcoin Land Bond',
  description: 'Latest press coverage, partnerships, funding milestones, and policy wins. Real impact stories from our mission.',
  image: '/og-image.png', // default
  url: 'https://formerlyincarcerated.org/news',
  type: 'website',
  imageWidth: '1200',
  imageHeight: '630',
};

// Per-article OG tags (used in news.jsx)
export const createNewsOGTags = (article) => ({
  title: article.title,
  description: article.excerpt,
  image: article.image || '/og-image.png',
  url: `https://formerlyincarcerated.org/news/${article.id}`,
  type: 'article',
  imageWidth: '1200',
  imageHeight: '630',
});
```

### Page Integration in Next.js

Each page uses `OpenGraphHead` component at top:

```jsx
// pages/board.jsx
<OpenGraphHead
  title={boardOGTags.title}
  description={boardOGTags.description}
  image={boardOGTags.image}
  url={boardOGTags.url}
  type={boardOGTags.type}
/>

// pages/team.jsx
<OpenGraphHead
  title={teamOGTags.title}
  description={teamOGTags.description}
  image={teamOGTags.image}
  url={teamOGTags.url}
/>

// pages/advisors.jsx
<OpenGraphHead
  title={advisorsOGTags.title}
  description={advisorsOGTags.description}
  image={advisorsOGTags.image}
  url={advisorsOGTags.url}
/>

// pages/careers.jsx
<OpenGraphHead
  title={careersOGTags.title}
  description={careersOGTags.description}
  image={careersOGTags.image}
  url={careersOGTags.url}
/>

// pages/news.jsx (dynamic)
{newsItem && (
  <OpenGraphHead
    title={createNewsOGTags(newsItem).title}
    description={createNewsOGTags(newsItem).description}
    image={createNewsOGTags(newsItem).image}
    url={createNewsOGTags(newsItem).url}
    type="article"
  />
)}
```

---

## 2. JSON-LD Schema Markup

### New File: lib/schema.js

```javascript
/**
 * JSON-LD Schema Markup Generators
 * Includes: Person, Organization, JobPosting, NewsArticle, BreadcrumbList
 */

// PERSON SCHEMA - For board members and team
export const personSchema = (member) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: member.name,
  jobTitle: member.title || member.role,
  description: member.bio,
  ...(member.image && { image: `https://formerlyincarcerated.org${member.image}` }),
  ...(member.links?.linkedin && { url: member.links.linkedin }),
  ...(member.links?.email && { email: member.links.email }),
  ...(member.expertise && {
    knowsAbout: member.expertise,
  }),
  ...(member.joinedYear && {
    additionalName: `Since ${member.joinedYear}`,
  }),
  sameAs: member.links?.linkedin ? [member.links.linkedin] : [],
});

// ORGANIZATION SCHEMA - For Dignifi and partners
export const organizationSchema = (advisor) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: advisor.organization,
  description: advisor.bio,
  ...(advisor.logo && { logo: `https://formerlyincarcerated.org${advisor.logo}` }),
  ...(advisor.links?.org_url && { url: advisor.links.org_url }),
  ...(advisor.links?.email && { contactPoint: {
    '@type': 'ContactPoint',
    telephone: '[not available]',
    contactType: 'General Contact',
    email: advisor.links.email,
  }}),
  sameAs: advisor.links?.org_url ? [advisor.links.org_url] : [],
});

// JOB POSTING SCHEMA - For career page
export const jobPostingSchema = (role) => ({
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: role.role,
  description: role.bio,
  jobLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
      addressRegion: 'CA', // adjust as needed
    },
  },
  baseSalary: {
    '@type': 'PriceSpecification',
    priceCurrency: 'USD',
    price: role.compensation.band,
  },
  employmentType: role.status.toUpperCase().replace('-', '_'),
  hiringOrganization: {
    '@type': 'Organization',
    name: 'Bitcoin Land Bond',
    sameAs: 'https://formerlyincarcerated.org',
  },
  applicantLocationRequirements: {
    '@type': 'Country',
    name: 'US',
  },
  jobStartDate: role.startDate || new Date().toISOString().split('T')[0],
});

// NEWS ARTICLE SCHEMA
export const newsArticleSchema = (article) => ({
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: article.title,
  description: article.excerpt,
  image: article.image ? `https://formerlyincarcerated.org${article.image}` : undefined,
  datePublished: article.date.toISOString(),
  dateModified: article.date.toISOString(),
  author: {
    '@type': 'Organization',
    name: 'Bitcoin Land Bond',
    url: 'https://formerlyincarcerated.org',
  },
  publisher: {
    '@type': 'Organization',
    name: article.source,
  },
  mainEntity: {
    '@type': 'Article',
    headline: article.title,
  },
});

// BREADCRUMB SCHEMA
export const breadcrumbSchema = (breadcrumbs) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `https://formerlyincarcerated.org${item.path}`,
  })),
});

// ORGANIZATION MAIN SCHEMA (site-wide)
export const siteOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Bitcoin Land Bond',
  url: 'https://formerlyincarcerated.org',
  logo: 'https://formerlyincarcerated.org/og-image.png',
  description: 'Criminal Asset Recovery Initiative for funding permanent deed-restricted housing for 600,000+ formerly incarcerated individuals.',
  sameAs: [
    'https://twitter.com/formerlyincarcerated',
    'https://linkedin.com/company/bitcoin-land-bond',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'General Contact',
    email: 'hello@formerlyincarcerated.org',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
    addressRegion: 'CA',
  },
};
```

### Schema Injection in pages

Add to `pages/_document.jsx` or use in page components:

```jsx
// pages/board.jsx
import Head from 'next/head';
import { personSchema, breadcrumbSchema } from '../lib/schema';
import { boardMembers } from '../lib/data/boardMembers';

export default function BoardPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Board', path: '/board' },
  ];

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema(breadcrumbs)),
          }}
        />
        {boardMembers.map((member) => (
          <script
            key={member.id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(personSchema(member)),
            }}
          />
        ))}
      </Head>
      {/* Page content */}
    </>
  );
}
```

---

## 3. OpenGraph Image Specifications

### Required Images

| Image | Size | Path | Purpose | Design |
|-------|------|------|---------|--------|
| `board-og-preview.png` | 1200×630 | `/public/` | Board page social share | Board diversity + governance |
| `team-og-preview.png` | 1200×630 | `/public/` | Team page social share | Team collaboration visual |
| `advisors-og-preview.png` | 1200×630 | `/public/` | Advisors page social share | Partner logos (Dignifi featured) |
| `careers-og-preview.png` | 1200×630 | `/public/` | Careers page social share | "We're Hiring" visual + BLB logo |

### Design Guidelines

**Board OG Preview:**
- Left: Bitcoin Land Bond logo + "Board of Directors"
- Right: 6 circular avatars (diverse representation)
- Bottom: "50% Formerly Incarcerated Leaders"
- Color: HP Dark + Orange accents

**Team OG Preview:**
- Left: Team silhouettes (5-6 people)
- Center: "15 Roles" + "Transparent Compensation"
- Right: HP Orange + White
- Color: HP Blue + White text

**Advisors OG Preview:**
- Center: Dignifi logo large
- Bottom: "+10 Strategic Partners"
- Text: "Government | Technical | Community"
- Color: Dignifi brand colors + HP Orange

**Careers OG Preview:**
- Bold text: "We're Hiring"
- Subtext: "5 Open Roles"
- Icons: House + heart + people
- Color: HP Orange gradient + White

---

## 4. SEO Meta Tags Per Page

### pages/board.jsx
```jsx
<OpenGraphHead
  title="Board of Directors - Bitcoin Land Bond"
  description="13-member board: 50% formerly incarcerated leaders, housing developers, finance experts, government liaisons. Equal voice, shared mission."
  image="/board-og-preview.png"
  url="https://formerlyincarcerated.org/board"
  type="website"
/>
```

### pages/team.jsx
```jsx
<OpenGraphHead
  title="Our Team - Bitcoin Land Bond"
  description="15-person operations, legal, policy, housing, and community team. Transparent compensation bands, open positions, full-time and contract roles."
  image="/team-og-preview.png"
  url="https://formerlyincarcerated.org/team"
  type="website"
/>
```

### pages/advisors.jsx
```jsx
<OpenGraphHead
  title="Advisors & Partners - Bitcoin Land Bond"
  description="Strategic partnership with Dignifi fintech. Government liaisons, technical advisors, community partners. Building housing recovery together."
  image="/advisors-og-preview.png"
  url="https://formerlyincarcerated.org/advisors"
  type="website"
/>
```

### pages/careers.jsx
```jsx
<OpenGraphHead
  title="Careers at Bitcoin Land Bond"
  description="Join our mission to fund permanent housing for 600,000+ formerly incarcerated individuals. 5 open roles. Transparent compensation. Apply today."
  image="/careers-og-preview.png"
  url="https://formerlyincarcerated.org/careers"
  type="website"
/>
```

---

## 5. Testing & Validation

### Social Platform Debuggers
1. **Facebook Sharing Debugger:** https://developers.facebook.com/tools/debug/sharing/
   - Test each page URL
   - Verify image size: 1200×630px
   - Confirm title + description display correctly

2. **LinkedIn Post Inspector:** https://www.linkedin.com/feed/
   - Paste URL in share box
   - Verify preview shows correct OG image + text

3. **Twitter Card Validator:** https://cards-dev.twitter.com/validator
   - Test twitter:card = summary_large_image
   - Verify image displays at 1200×630

### Schema Validation
1. **Google Rich Results Test:** https://search.google.com/test/rich-results
   - Paste page URL
   - Verify Person, Organization, NewsArticle schemas
   - Check for errors/warnings

2. **Schema.org Validator:** https://validator.schema.org/
   - Paste JSON-LD markup
   - Validate syntax

### SEO Checklist
- [ ] All pages have unique meta titles (50-60 chars)
- [ ] Descriptions are 150-160 characters
- [ ] OG images are 1200×630px PNG
- [ ] JSON-LD schemas validate without errors
- [ ] Breadcrumbs structured correctly
- [ ] No duplicate content across pages
- [ ] All links are canonical/absolute URLs

