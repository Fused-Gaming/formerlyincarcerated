# Data Structure Templates for Phase 1

## 1. boardMembers.js Template

```javascript
/**
 * Board Members Data Structure
 * 13-member board: 4 formerly incarcerated + 3 housing + 3 finance + 3 government
 */

export const boardMembers = [
  // CATEGORY: Formerly Incarcerated Leaders (4 total)
  {
    id: 'board-001',
    name: '[Director Name]',
    title: '[Formerly Incarcerated Advocate / Community Leader]',
    category: 'formerly-incarcerated',
    bio: '[150-250 word biography covering lived experience, expertise, why they joined the board]',
    expertise: ['[Tag 1]', '[Tag 2]', '[Tag 3]'],
    links: {
      email: 'mailto:name@example.com',
      linkedin: 'https://linkedin.com/in/[profile]',
    },
    image: '/team/board/[name-slug].jpg',
    joinedYear: 2024,
  },
  // ... 3 more formerly incarcerated directors
  
  // CATEGORY: Housing Developers & Land Trust (3 total)
  {
    id: 'board-005',
    name: '[Housing Expert]',
    title: '[Housing Developer / Land Trust Director]',
    category: 'housing',
    bio: '[Biography focused on housing policy, land trusts, development]',
    expertise: ['Community Land Trusts', 'Affordable Housing', 'Development Finance'],
    links: {
      email: 'mailto:name@example.com',
      linkedin: 'https://linkedin.com/in/[profile]',
    },
    image: '/team/board/[name-slug].jpg',
    joinedYear: 2024,
  },
  // ... 2 more housing experts

  // CATEGORY: Finance, Legal & Compliance (3 total)
  {
    id: 'board-008',
    name: '[Finance/Legal Expert]',
    title: '[CFO / General Counsel / Compliance Officer]',
    category: 'finance',
    bio: '[Biography covering financial oversight, legal expertise, governance]',
    expertise: ['Financial Oversight', 'Non-profit Law', 'Compliance'],
    links: {
      email: 'mailto:name@example.com',
      linkedin: 'https://linkedin.com/in/[profile]',
    },
    image: '/team/board/[name-slug].jpg',
    joinedYear: 2024,
  },
  // ... 2 more finance/legal experts

  // CATEGORY: Government & Community Representatives (3 total)
  {
    id: 'board-011',
    name: '[Government/Community Leader]',
    title: '[City Council Member / Community Advocate / Government Liaison]',
    category: 'government',
    bio: '[Biography covering government relationship, community ties, policy influence]',
    expertise: ['Government Relations', 'Policy', 'Community Engagement'],
    links: {
      email: 'mailto:name@example.com',
      linkedin: 'https://linkedin.com/in/[profile]',
    },
    image: '/team/board/[name-slug].jpg',
    joinedYear: 2024,
  },
  // ... 2 more government/community representatives
];

export const boardCategories = {
  'formerly-incarcerated': {
    label: 'Formerly Incarcerated Leaders',
    color: 'bg-hp-orange',
    count: 4,
  },
  'housing': {
    label: 'Housing & Land Trust',
    color: 'bg-blue-500',
    count: 3,
  },
  'finance': {
    label: 'Finance, Legal & Compliance',
    color: 'bg-green-500',
    count: 3,
  },
  'government': {
    label: 'Government & Community',
    color: 'bg-purple-500',
    count: 3,
  },
};
```

---

## 2. teamMembers.js Template

```javascript
/**
 * Team Members Data Structure
 * 15-staff template with departments, compensation bands, and status
 */

export const compensationBands = {
  'associate': '$45k - $65k',
  'specialist': '$65k - $85k',
  'senior': '$85k - $110k',
  'lead': '$110k - $140k',
  'director': '$140k - $180k',
};

export const teamMembers = [
  // OPERATIONS (4 staff)
  {
    id: 'team-001',
    name: '[Team Member Name]',
    role: '[Job Title]',
    department: 'operations',
    bio: '[100-150 word bio about background, expertise, why they do this work]',
    compensation: {
      salary: 'associate', // Maps to compensationBands
      band: '$45k - $65k',
    },
    links: {
      email: 'mailto:name@example.com',
      linkedin: 'https://linkedin.com/in/[profile]',
    },
    status: 'full-time', // 'full-time' | 'contract' | 'hiring'
    startDate: '2024-01-15',
  },
  // Operations: repeat 3 more staff

  // LEGAL & COMPLIANCE (2 staff + 1 hiring)
  {
    id: 'team-005',
    name: '[Legal Expert]',
    role: '[General Counsel / Compliance Officer]',
    department: 'legal',
    bio: '[Background in non-profit law, compliance, governance]',
    compensation: {
      salary: 'senior',
      band: '$85k - $110k',
    },
    links: {
      email: 'mailto:name@example.com',
      linkedin: 'https://linkedin.com/in/[profile]',
    },
    status: 'full-time',
    startDate: '2024-02-01',
  },
  {
    id: 'team-006',
    name: 'OPEN ROLE',
    role: 'Contracts Manager',
    department: 'legal',
    bio: 'Seeking detail-oriented professional to manage legal agreements and partnerships',
    compensation: {
      salary: 'specialist',
      band: '$65k - $85k',
    },
    links: {
      email: 'mailto:careers@formerlyincarcerated.org',
      linkedin: null,
    },
    status: 'hiring',
    startDate: null,
  },
  // Legal: 1 more staff

  // POLICY (3 staff)
  {
    id: 'team-007',
    name: '[Policy Director]',
    role: '[Policy Director / Criminal Justice Specialist]',
    department: 'policy',
    bio: '[Background in criminal justice reform, housing policy]',
    compensation: {
      salary: 'lead',
      band: '$110k - $140k',
    },
    links: {
      email: 'mailto:name@example.com',
      linkedin: 'https://linkedin.com/in/[profile]',
    },
    status: 'full-time',
    startDate: '2024-01-01',
  },
  // Policy: 2 more staff

  // HOUSING (3 staff)
  {
    id: 'team-010',
    name: '[Housing Manager]',
    role: '[Housing Operations Manager]',
    department: 'housing',
    bio: '[Background in property management, community engagement]',
    compensation: {
      salary: 'specialist',
      band: '$65k - $85k',
    },
    links: {
      email: 'mailto:name@example.com',
      linkedin: 'https://linkedin.com/in/[profile]',
    },
    status: 'full-time',
    startDate: '2024-03-01',
  },
  // Housing: 2 more staff

  // COMMUNITY (3 staff + 1 hiring)
  {
    id: 'team-013',
    name: '[Community Liaison]',
    role: '[Community Engagement Manager]',
    department: 'community',
    bio: '[Background in community organizing, reentry services]',
    compensation: {
      salary: 'specialist',
      band: '$65k - $85k',
    },
    links: {
      email: 'mailto:name@example.com',
      linkedin: 'https://linkedin.com/in/[profile]',
    },
    status: 'full-time',
    startDate: '2024-02-15',
  },
  {
    id: 'team-014',
    name: 'OPEN ROLE',
    role: 'Community Coordinator',
    department: 'community',
    bio: 'Join our community team to build relationships with local organizations and residents',
    compensation: {
      salary: 'associate',
      band: '$45k - $65k',
    },
    links: {
      email: 'mailto:careers@formerlyincarcerated.org',
      linkedin: null,
    },
    status: 'hiring',
    startDate: null,
  },
  // Community: 1 more staff (total 3 filled + 1 open)
];

export const departmentColors = {
  'operations': 'bg-blue-600',
  'legal': 'bg-red-600',
  'policy': 'bg-green-600',
  'housing': 'bg-yellow-600',
  'community': 'bg-purple-600',
};
```

---

## 3. advisors.js Template

```javascript
/**
 * Advisors Data Structure
 * Dignifi partnership + city government liaisons + technical advisors
 */

export const advisors = [
  // FEATURED PARTNER: Dignifi
  {
    id: 'advisor-dignifi',
    name: 'Dignifi',
    organization: 'Dignifi Inc.',
    role: 'Strategic Partner - Fintech & Credit Access',
    category: 'partner',
    bio: 'Dignifi is a fintech company dedicated to providing access to credit and financial services for individuals with limited credit history. They serve as strategic partners to Bitcoin Land Bond in expanding financial inclusion for formerly incarcerated individuals.',
    expertise: ['Fintech', 'Credit Access', 'Financial Inclusion', 'Alternative Credit'],
    links: {
      email: 'partnerships@dignifi.com',
      website: 'https://www.dignifi.com',
      org_url: 'https://www.dignifi.com',
    },
    logo: '/advisors/dignifi-logo.png',
    featured: true,
  },

  // GOVERNMENT LIAISONS (3-4)
  {
    id: 'advisor-gov-001',
    name: '[Government Official Name]',
    organization: '[City] Department of [Housing/Justice/etc]',
    role: '[Director / Officer of Criminal Justice / Housing]',
    category: 'government',
    bio: '[Background, why they advise Bitcoin Land Bond, impact focus]',
    expertise: ['Government Policy', 'Housing', 'Criminal Justice Reform'],
    links: {
      email: 'mailto:name@[city].gov',
      website: null,
      org_url: 'https://[city].gov',
    },
    logo: null, // Government seal or city logo
    featured: false,
  },
  // Government: 2-3 more liaisons

  // TECHNICAL ADVISORS (3-4)
  {
    id: 'advisor-tech-001',
    name: '[Developer/Technical Lead]',
    organization: '[Company / University]',
    role: '[CTO / Software Architect / AI Lead]',
    category: 'technical',
    bio: '[Background in blockchain, fintech, or housing tech. Role in Bitcoin Land Bond tech stack]',
    expertise: ['Blockchain', 'Smart Contracts', 'Web3', 'Backend Architecture'],
    links: {
      email: 'mailto:name@example.com',
      website: 'https://[personal-site].com',
      org_url: 'https://[company].com',
    },
    logo: '/advisors/[company-logo].png',
    featured: false,
  },
  // Technical: 2-3 more advisors

  // COMMUNITY PARTNERS (2-3)
  {
    id: 'advisor-community-001',
    name: '[Community Organization Lead]',
    organization: '[Reentry Organization / Non-Profit]',
    role: '[Executive Director / Program Lead]',
    category: 'partner',
    bio: '[How their organization works with formerly incarcerated populations, partnership focus]',
    expertise: ['Reentry Services', 'Community Organizing', 'Housing Access'],
    links: {
      email: 'mailto:name@example.com',
      website: null,
      org_url: 'https://[org-site].org',
    },
    logo: '/advisors/[org-logo].png',
    featured: false,
  },
  // Community: 1-2 more partners
];

export const advisorCategories = {
  'partner': { label: 'Strategic Partners', color: 'bg-hp-orange' },
  'government': { label: 'Government Liaisons', color: 'bg-blue-600' },
  'technical': { label: 'Technical Advisors', color: 'bg-green-600' },
};
```

---

## 4. newsUpdates.js Template

```javascript
/**
 * News Updates Data Structure
 * Real press coverage, partnerships, and milestones
 */

export const newsUpdates = [
  {
    id: 'news-001',
    date: new Date('2024-06-15'),
    title: '[Bitcoin Land Bond Launches $15B Initiative for Housing Recovery]',
    source: '[Publication Name]',
    category: 'funding', // 'funding' | 'partnership' | 'policy' | 'coverage'
    excerpt: '[100-150 word summary of announcement, impact, key details]',
    url: 'https://[publication].com/article-url',
    featured: true,
    image: '/news/[article-preview].jpg',
  },
  {
    id: 'news-002',
    date: new Date('2024-06-01'),
    title: '[Bitcoin Land Bond Partners with Dignifi for Financial Inclusion]',
    source: '[Press Release / News Site]',
    category: 'partnership',
    excerpt: '[Summary of Dignifi partnership, fintech integration, impact]',
    url: 'https://[source].com/dignifi-partnership',
    featured: true,
    image: '/news/[partnership-image].jpg',
  },
  {
    id: 'news-003',
    date: new Date('2024-05-20'),
    title: '[City Council Approves Bitcoin Land Bond Housing Initiative]',
    source: '[Local Government News]',
    category: 'policy',
    excerpt: '[Policy approval, government support, implementation timeline]',
    url: 'https://[city].gov/news/bitcoin-land-bond',
    featured: false,
    image: null,
  },
  {
    id: 'news-004',
    date: new Date('2024-05-10'),
    title: '[Criminal Justice Leaders Launch Asset Recovery Housing Program]',
    source: '[National News Outlet]',
    category: 'coverage',
    excerpt: '[Media coverage, program overview, team quotes, national impact]',
    url: 'https://[outlet].com/bitcoin-land-bond-coverage',
    featured: false,
    image: '/news/[coverage-image].jpg',
  },
  // Add 11-15 more news items covering:
  // - Funding announcements
  // - Partnership launches
  // - Policy wins
  // - Media features
  // - Impact milestones
];

export const newsCategories = {
  'funding': { label: 'Funding', color: 'bg-green-600', icon: '💰' },
  'partnership': { label: 'Partnerships', color: 'bg-blue-600', icon: '🤝' },
  'policy': { label: 'Policy', color: 'bg-purple-600', icon: '📜' },
  'coverage': { label: 'Media Coverage', color: 'bg-hp-orange', icon: '📰' },
};
```

---

## 5. Implementation Notes

### Image Directory Structure
```
public/
├── team/
│   ├── board/
│   │   ├── [name-slug].jpg
│   │   └── ...
│   └── staff/
│       ├── [name-slug].jpg
│       └── ...
├── advisors/
│   ├── dignifi-logo.png
│   ├── [company-logo].png
│   └── ...
└── news/
    ├── [article-preview].jpg
    └── ...
```

### Validation Helper
```javascript
// lib/data/validation.js
export const validateBoardMember = (member) => {
  const required = ['id', 'name', 'title', 'category', 'bio', 'expertise', 'links'];
  const missing = required.filter(key => !member[key]);
  if (missing.length) throw new Error(`Missing fields: ${missing.join(', ')}`);
};
```

### Category Badge Colors
- **Formerly Incarcerated:** HP Orange (#F7931A)
- **Housing:** Blue (#3B82F6)
- **Finance/Legal:** Green (#10B981)
- **Government:** Purple (#8B5CF6)
- **Partner:** Orange (#F7931A)
- **Technical:** Cyan (#06B6D4)

