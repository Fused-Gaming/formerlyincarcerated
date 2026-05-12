import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import OpenGraphHead from './OpenGraphHead';

const PageLayout = ({
  children,
  title,
  description,
  ogImage = '/og-image.png',
  url = 'https://formerlyincarcerated.org',
  hideHeader = false,
  hideFooter = false,
  headerClass = '',
  footerClass = '',
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <OpenGraphHead
        title={title}
        description={description}
        image={ogImage}
        url={url}
      />
      <div className="min-h-screen bg-hp-black text-hp-white flex flex-col">
        {!hideHeader && <Header scrolled={scrolled} />}

        <main className={`flex-1 ${headerClass}`}>
          {children}
        </main>

        {!hideFooter && <Footer />}
      </div>
    </>
  );
};

export default PageLayout;
