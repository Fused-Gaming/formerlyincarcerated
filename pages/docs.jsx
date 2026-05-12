import React from 'react';
import PageLayout from '../components/PageLayout';
import { FileText, Download, ExternalLink } from 'lucide-react';

export default function DocsPage() {
  const resources = [
    {
      title: 'Whitepaper: Bitcoin Housing Bond Initiative',
      description: 'Complete specification of our model, governance, and financial sustainability.',
      type: 'PDF',
      size: '12.5 MB',
      link: '/whitepaper',
    },
    {
      title: 'Pilot City Guidelines',
      description: 'Requirements and application process for communities interested in pilot participation.',
      type: 'PDF',
      size: '2.1 MB',
      link: '#',
    },
    {
      title: 'Financial Model Workbook',
      description: 'Detailed financial projections and capital allocation methodology.',
      type: 'Excel',
      size: '1.8 MB',
      link: '#',
    },
    {
      title: 'Impact Measurement Framework',
      description: 'Our comprehensive approach to tracking individual, community, and system-level outcomes.',
      type: 'PDF',
      size: '3.2 MB',
      link: '#',
    },
    {
      title: 'Governance Charter',
      description: 'Board composition, decision-making process, and accountability mechanisms.',
      type: 'PDF',
      size: '1.4 MB',
      link: '#',
    },
    {
      title: 'Mission Lock Implementation Guide',
      description: 'How perpetual deed restrictions are drafted and enforced across all properties.',
      type: 'PDF',
      size: '2.8 MB',
      link: '#',
    },
  ];

  return (
    <PageLayout
      title="Documentation - Formerly Incarcerated"
      description="Technical documentation, guides, and resources for partners and stakeholders."
      url="https://formerlyincarcerated.org/docs"
    >
      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-hp-gradient-hero">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-6 animate-fade-up">
            <h1 className="text-5xl md:text-7xl font-bold font-display text-hp-white">
              <span className="text-hp-orange">Documentation</span>
            </h1>
            <p className="text-xl text-hp-gray-light max-w-2xl">
              Technical specifications, implementation guides, and resources for partners.
            </p>
          </div>
        </div>
      </section>

      {/* Documentation Grid */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold font-display mb-12">Available Resources</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {resources.map((resource, idx) => (
            <a
              key={idx}
              href={resource.link}
              className="bg-hp-dark border-2 border-hp-orange/30 rounded-lg p-8 hover:border-hp-orange hover:shadow-hp-cinematic transition-all duration-200 group"
            >
              <div className="flex gap-4">
                <FileText className="text-hp-orange flex-shrink-0 group-hover:scale-110 transition-transform duration-200" size={32} />
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-hp-orange transition-colors duration-200">
                    {resource.title}
                  </h3>
                  <p className="text-hp-gray-light text-sm mb-3">{resource.description}</p>
                  <div className="flex justify-between items-center text-sm text-hp-gray-medium">
                    <span>{resource.type} • {resource.size}</span>
                    <Download size={16} className="group-hover:text-hp-orange transition-colors duration-200" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-20 bg-hp-dark">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold font-display mb-12">External Resources</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-l-4 border-hp-orange pl-6">
              <h3 className="text-xl font-bold mb-3">Research & Studies</h3>
              <ul className="space-y-2 text-hp-gray-light">
                <li>
                  <a href="#" className="text-hp-orange hover:text-hp-orange-glow inline-flex items-center gap-2">
                    Recidivism Reduction Meta-Analysis <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-hp-orange hover:text-hp-orange-glow inline-flex items-center gap-2">
                    Housing First Effectiveness Studies <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-hp-orange hover:text-hp-orange-glow inline-flex items-center gap-2">
                    Seized Asset Deployment Framework <ExternalLink size={14} />
                  </a>
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-hp-orange pl-6">
              <h3 className="text-xl font-bold mb-3">News & Media</h3>
              <ul className="space-y-2 text-hp-gray-light">
                <li>
                  <a href="/news" className="text-hp-orange hover:text-hp-orange-glow inline-flex items-center gap-2">
                    Latest Updates <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-hp-orange hover:text-hp-orange-glow inline-flex items-center gap-2">
                    Press Coverage <ExternalLink size={14} />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-hp-orange hover:text-hp-orange-glow inline-flex items-center gap-2">
                    Opinion Pieces <ExternalLink size={14} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold font-display mb-4">Need Something Specific?</h2>
        <p className="text-hp-gray-light mb-6">
          Contact us for additional documentation, custom materials, or technical questions.
        </p>
        <a href="/contact" className="inline-block bg-hp-orange text-hp-black px-8 py-4 font-bold rounded-lg hover:bg-hp-orange-glow transition-all duration-200">
          Get in Touch
        </a>
      </section>
    </PageLayout>
  );
}
