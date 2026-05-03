import Head from 'next/head';
import { createOGTags } from '../lib/og-tags';

/**
 * Component to set Open Graph and Twitter meta tags for a page
 * Usage in pages: <OpenGraphHead title="..." description="..." />
 */
export const OpenGraphHead = ({ title, description, image, url, type = 'website' }) => {
  const ogTags = createOGTags({ title, description, image, url, type });

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
};

export default OpenGraphHead;
