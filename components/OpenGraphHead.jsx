import Head from 'next/head';
import { createOGTags } from '../lib/og-tags';

/**
 * Component to override Open Graph and Twitter meta tags for a specific page
 * Place this at the top of any page component to customize its social media preview
 *
 * Example:
 * <OpenGraphHead
 *   title="Whitepaper"
 *   description="Read our comprehensive whitepaper..."
 *   url="https://formerlyincarcerated.org/whitepaper"
 * />
 */
export default function OpenGraphHead({ title, description, image, url, type = 'website', imageWidth, imageHeight }) {
  const ogTags = createOGTags({ title, description, image, url, type, imageWidth, imageHeight });

  return (
    <Head>
      {ogTags.map((tag, index) => {
        if (tag.property) {
          return <meta key={index} property={tag.property} content={tag.content} />;
        }
        return <meta key={index} name={tag.name} content={tag.content} />;
      })}
      {url && <link rel="canonical" href={url} />}
    </Head>
  );
}
