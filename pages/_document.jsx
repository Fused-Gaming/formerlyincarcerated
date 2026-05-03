import { Html, Head, Main, NextScript } from 'next/document';
import { defaultOGTags } from '../lib/og-tags';

export default function Document() {
  const domain = 'formerlyincarcerated.org';
  const canonicalUrl = `https://${domain}`;
  const title = defaultOGTags.title;
  const description = defaultOGTags.description;
  const image = `${canonicalUrl}${defaultOGTags.image}`;

  return (
    <Html lang="en">
      <Head>
        {/* Primary Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <meta name="keywords" content="criminal asset recovery, reentry housing, formerly incarcerated, Bitcoin Land Bond, sustainable housing" />
        <meta name="theme-color" content="#1e293b" />

        {/* Canonical URL - can be overridden by pages */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Social Media - Default tags for all pages */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:site_name" content="Bitcoin Land Bond" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:domain" content={domain} />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Security & Performance */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="email=no" />

        {/* Robots & Indexing */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        {/* Additional Meta Tags */}
        <meta name="author" content="Bitcoin Land Bond" />
        <meta name="organization" content="Bitcoin Land Bond" />
        <meta name="url" content={canonicalUrl} />
        <meta name="identifier-URL" content={canonicalUrl} />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href={`https://${domain}`} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
