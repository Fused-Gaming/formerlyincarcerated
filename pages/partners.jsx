import React from 'react';
import PageLayout from '../components/PageLayout';
import { Users, Building2, Heart, Handshake } from 'lucide-react';

export default function PartnersPage() {
  const partners = [
    {
      category: 'Reentry Organizations',
      icon: <Heart size={32} />,
      description: 'National organizations with deep expertise in reentry housing and support',
    },
    {
      category: 'Housing Developers',
      icon: <Building2 size={32} />,
      description: 'Mission-driven developers who build permanently affordable housing',
    },
    {
      category: 'City Governments',
      icon: <Handshake size={32} />,
      description: 'Municipal governments supporting pilot phases in their communities',
    },
    {
      category: 'Institutional Investors',
      icon: <Users size={32} />,
      description: 'Impact investors committed to criminal justice reform',
    },
  ];

  return (
    <PageLayout
      title="Partners - Formerly Incarcerated"
      description="Join a coalition transforming criminal justice through permanent housing and community investment."
      url="https://formerlyincarcerated.org/partners"
    >
      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-hp-gradient-hero">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-6 animate-fade-up">
            <h1 className="text-5xl md:text-7xl font-bold font-display text-hp-white">
              Our <span className="text-hp-orange">Partners</span>
            </h1>
            <p className="text-xl text-hp-gray-light max-w-2xl">
              Building a national coalition of developers, nonprofits, government, and investors aligned around one mission: housing for reentry.
            </p>
          </div>
        </div>
      </section>

      {/* Partner Categories */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold font-display mb-12">Partner Categories</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="bg-hp-dark border-2 border-hp-orange/30 rounded-lg p-8 hover:border-hp-orange transition-colors duration-200"
            >
              <div className="text-hp-orange mb-4">{partner.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{partner.category}</h3>
              <p className="text-hp-gray-light">{partner.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="py-20 bg-hp-dark">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold font-display mb-12">How to Partner</h2>

          <div className="space-y-8">
            <div className="border-l-4 border-hp-orange pl-6">
              <h3 className="text-2xl font-bold mb-3">Pilot City Participation</h3>
              <p className="text-hp-gray-light mb-4">
                City governments and community organizations can apply to host initial pilot phases. First cohort target: 5 cities (2026-2027).
              </p>
              <a href="/contact" className="text-hp-orange hover:text-hp-orange-glow font-bold inline-flex items-center gap-2">
                Apply Now →
              </a>
            </div>

            <div className="border-l-4 border-hp-orange pl-6">
              <h3 className="text-2xl font-bold mb-3">Developer Partnerships</h3>
              <p className="text-hp-gray-light mb-4">
                Mission-driven housing developers can partner with us to develop, construct, and manage permanent housing communities.
              </p>
              <a href="/contact" className="text-hp-orange hover:text-hp-orange-glow font-bold inline-flex items-center gap-2">
                Learn More →
              </a>
            </div>

            <div className="border-l-4 border-hp-orange pl-6">
              <h3 className="text-2xl font-bold mb-3">Service Organizations</h3>
              <p className="text-hp-gray-light mb-4">
                Nonprofits with expertise in reentry support, employment, and mental health services can join our support network.
              </p>
              <a href="/contact" className="text-hp-orange hover:text-hp-orange-glow font-bold inline-flex items-center gap-2">
                Get Involved →
              </a>
            </div>

            <div className="border-l-4 border-hp-orange pl-6">
              <h3 className="text-2xl font-bold mb-3">Institutional Investment</h3>
              <p className="text-hp-gray-light mb-4">
                Impact funds and institutional investors can support this work as both financial partners and board representatives.
              </p>
              <a href="/contact" className="text-hp-orange hover:text-hp-orange-glow font-bold inline-flex items-center gap-2">
                Inquire →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold font-display mb-6">
          Ready to <span className="text-hp-orange">Transform</span> Criminal Justice?
        </h2>
        <p className="text-xl text-hp-gray-light mb-8 max-w-2xl mx-auto">
          Whether you represent a city, development company, service organization, or investment fund, we have a partnership model for you.
        </p>
        <a href="/contact" className="inline-block bg-hp-orange text-hp-black px-8 py-4 font-bold rounded-lg hover:bg-hp-orange-glow transition-all duration-200">
          Start a Conversation
        </a>
      </section>
    </PageLayout>
  );
}
