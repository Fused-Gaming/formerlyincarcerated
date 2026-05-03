/**
 * Open Graph tags configuration for social media sharing
 * Use in pages via next/head to override defaults
 */

export const defaultOGTags = {
  title: 'Bitcoin Land Bond - Criminal Asset Recovery Initiative',
  description: 'The Bitcoin Land Bond deploys $15B in seized cryptocurrency to fund permanent deed-restricted housing for 600,000+ formerly incarcerated people annually.',
  image: '/og-image.png',
  url: 'https://formerlyincarcerated.org',
  type: 'website',
  siteName: 'Bitcoin Land Bond',
};

export const createOGTags = (customTags = {}) => {
  const domain = 'formerlyincarcerated.org';
  const canonicalUrl = `https://${domain}`;

  const tags = {
    title: customTags.title || defaultOGTags.title,
    description: customTags.description || defaultOGTags.description,
    image: customTags.image || `${canonicalUrl}${defaultOGTags.image}`,
    url: customTags.url || canonicalUrl,
    type: customTags.type || defaultOGTags.type,
    siteName: customTags.siteName || defaultOGTags.siteName,
  };

  return [
    { property: 'og:type', content: tags.type },
    { property: 'og:url', content: tags.url },
    { property: 'og:title', content: tags.title },
    { property: 'og:description', content: tags.description },
    { property: 'og:image', content: tags.image },
    { property: 'og:site_name', content: tags.siteName },
    { property: 'og:locale', content: 'en_US' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: tags.url },
    { name: 'twitter:title', content: tags.title },
    { name: 'twitter:description', content: tags.description },
    { name: 'twitter:image', content: tags.image },
  ];
};

export const createCanonicalTag = (path = '') => {
  const domain = 'formerlyincarcerated.org';
  const canonicalUrl = path ? `https://${domain}${path}` : `https://${domain}`;
  return { rel: 'canonical', href: canonicalUrl };
};
