import React from 'react';
import PageLayout from '../components/PageLayout';
import { Download, FileText } from 'lucide-react';

export default function WhitepaperPage() {
  const handleDownload = (filename) => {
    const link = document.createElement('a');
    link.href = `/whitepapers/${filename}`;
    link.download = filename;
    link.click();
  };

  return (
    <PageLayout
      title="Whitepaper - Formerly Incarcerated"
      description="Download our comprehensive whitepaper on using seized cryptocurrency to fund permanent deed-restricted housing for 600,000+ formerly incarcerated individuals annually."
      url="https://formerlyincarcerated.org/whitepaper"
      ogImage="/whitepaper-og-preview.png"
    >
      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-hp-gradient-hero">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-6 animate-fade-up">
            <h1 className="text-5xl md:text-7xl font-bold font-display text-hp-white">
              Official <span className="text-hp-orange">Whitepaper</span>
            </h1>
            <p className="text-xl text-hp-gray-light max-w-2xl">
              Comprehensive policy framework for the Bitcoin Housing Bond Initiative. Design system, governance, and impact specification.
            </p>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold font-display mb-12">Download Resources</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Full Whitepaper */}
          <div className="bg-hp-dark border-2 border-hp-orange/30 rounded-lg p-8 hover:border-hp-orange hover:shadow-hp-cinematic transition-all duration-200 group">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-hp-orange/10 group-hover:bg-hp-orange/20 transition-colors duration-200">
                  <FileText className="text-hp-orange" size={32} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Full Whitepaper (PDF)</h3>
                <p className="text-hp-gray-light text-sm mb-4">
                  Complete specification of design tokens, responsive system, governance, and impact framework. 129 pages, publication quality.
                </p>
                <div className="space-y-3">
                  <p className="text-xs text-hp-gray-medium">File size: 12.5 MB | Format: PDF | Version: 2.0</p>
                  <button
                    onClick={() => handleDownload('49567801-HQ_Final_Whitepaper_2026.pdf')}
                    className="inline-flex items-center gap-2 bg-hp-orange text-hp-black px-6 py-3 font-bold rounded-lg hover:bg-hp-orange-glow transition-all duration-200"
                  >
                    <Download size={18} />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="bg-hp-dark border-2 border-hp-orange/30 rounded-lg p-8 hover:border-hp-orange hover:shadow-hp-cinematic transition-all duration-200 group">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-hp-orange/10 group-hover:bg-hp-orange/20 transition-colors duration-200">
                  <FileText className="text-hp-orange" size={32} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Executive Summary</h3>
                <p className="text-hp-gray-light text-sm mb-4">
                  Quick reference guide covering key sections: mission, model, governance, and impact. Perfect for stakeholders and partners.
                </p>
                <div className="space-y-3">
                  <p className="text-xs text-hp-gray-medium">File size: 2.1 MB | Format: PDF | Version: 2.0</p>
                  <button
                    onClick={() => handleDownload('Executive-Summary-2026.pdf')}
                    className="inline-flex items-center gap-2 bg-hp-orange text-hp-black px-6 py-3 font-bold rounded-lg hover:bg-hp-orange-glow transition-all duration-200"
                  >
                    <Download size={18} />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Overview */}
      <section className="py-20 bg-hp-dark">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold font-display mb-12">What's Inside</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-l-4 border-hp-orange pl-6">
              <h3 className="text-xl font-bold mb-3">Design System</h3>
              <ul className="space-y-2 text-hp-gray-light text-sm">
                <li>✓ Brand colors & gradients</li>
                <li>✓ Typography system</li>
                <li>✓ Responsive breakpoints</li>
                <li>✓ Grid & layout standards</li>
                <li>✓ Shadow & spacing tokens</li>
              </ul>
            </div>

            <div className="border-l-4 border-hp-orange pl-6">
              <h3 className="text-xl font-bold mb-3">Governance</h3>
              <ul className="space-y-2 text-hp-gray-light text-sm">
                <li>✓ Board composition</li>
                <li>✓ Mission lock framework</li>
                <li>✓ Decision-making process</li>
                <li>✓ Accountability mechanisms</li>
                <li>✓ Community advisory board</li>
              </ul>
            </div>

            <div className="border-l-4 border-hp-orange pl-6">
              <h3 className="text-xl font-bold mb-3">Impact & Finance</h3>
              <ul className="space-y-2 text-hp-gray-light text-sm">
                <li>✓ Impact measurement framework</li>
                <li>✓ Deployment timeline</li>
                <li>✓ Financial model & ROI</li>
                <li>✓ Capital allocation</li>
                <li>✓ Sustainability roadmap</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Document Info */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="bg-hp-dark border-2 border-hp-orange/30 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6">Document Information</h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-hp-orange font-semibold mb-2">Published</p>
              <p className="text-hp-gray-light">May 2026 | Version 2.0</p>
            </div>

            <div>
              <p className="text-hp-orange font-semibold mb-2">Organization</p>
              <p className="text-hp-gray-light">Formerly Incarcerated Initiative</p>
            </div>

            <div>
              <p className="text-hp-orange font-semibold mb-2">Domain</p>
              <p className="text-hp-gray-light">formerlyincarcerated.org</p>
            </div>

            <div>
              <p className="text-hp-orange font-semibold mb-2">Contact</p>
              <a href="mailto:hello@formerlyincarcerated.org" className="text-hp-orange hover:text-hp-orange-glow">
                hello@formerlyincarcerated.org
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-hp-orange/20">
            <p className="text-hp-gray-light text-sm mb-4">
              All documents are digitally signed and version-controlled for authenticity and compliance. SHA-256 checksums available upon request.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Context */}
      <section className="py-20 bg-hp-dark">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold font-display mb-6">Impact in Context</h2>

          <p className="text-xl text-hp-gray-light mb-8">
            This whitepaper outlines how seized cryptocurrency becomes permanent housing infrastructure. Read the specifications, understand the model, and explore the opportunity to transform criminal justice.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-hp-orange mb-2">$15B</p>
              <p className="text-hp-gray-light text-sm">Seized digital assets deployed</p>
            </div>

            <div>
              <p className="text-4xl font-bold text-hp-orange mb-2">600K+</p>
              <p className="text-hp-gray-light text-sm">Annual housing capacity at scale</p>
            </div>

            <div>
              <p className="text-4xl font-bold text-hp-orange mb-2">23-30%</p>
              <p className="text-hp-gray-light text-sm">Expected recidivism reduction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold font-display mb-4">Questions About the Whitepaper?</h2>
        <p className="text-hp-gray-light mb-8">
          Our team is available to discuss the specifications, implementation, and partnership opportunities.
        </p>
        <a href="/contact" className="inline-block bg-hp-orange text-hp-black px-8 py-4 font-bold rounded-lg hover:bg-hp-orange-glow transition-all duration-200">
          Get in Touch
        </a>
      </section>
    </PageLayout>
  );
}
