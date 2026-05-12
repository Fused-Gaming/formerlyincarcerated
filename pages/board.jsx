import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import { Mail, Linkedin } from 'lucide-react';

export default function BoardPage() {
  const [boardMembers] = useState([
    {
      name: 'Director Name',
      title: 'Formerly Incarcerated Advocate',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      links: { email: '#', linkedin: '#' },
    },
    {
      name: 'Director Name',
      title: 'Housing Developer',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      links: { email: '#', linkedin: '#' },
    },
    {
      name: 'Director Name',
      title: 'Finance & Compliance',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      links: { email: '#', linkedin: '#' },
    },
    {
      name: 'Director Name',
      title: 'Community Representative',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      links: { email: '#', linkedin: '#' },
    },
  ]);

  return (
    <PageLayout
      title="Board - Formerly Incarcerated"
      description="Meet our board of directors. Equal voice, lived experience, and shared mission."
      url="https://formerlyincarcerated.org/board"
    >
      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-hp-gradient-hero">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-6 animate-fade-up">
            <h1 className="text-5xl md:text-7xl font-bold font-display text-hp-white">
              Board of <span className="text-hp-orange">Directors</span>
            </h1>
            <p className="text-xl text-hp-gray-light max-w-2xl">
              Diverse expertise, equal voice, shared mission. Our board is 50% formerly incarcerated leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Board Composition */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold font-display mb-12">Board Composition</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-hp-dark border-2 border-hp-orange/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Our Structure</h3>
            <ul className="space-y-3 text-hp-gray-light">
              <li className="flex gap-2">
                <span className="text-hp-orange font-bold">4</span>
                <span>Formerly incarcerated advocates & leaders</span>
              </li>
              <li className="flex gap-2">
                <span className="text-hp-orange font-bold">3</span>
                <span>Housing developers & land trust directors</span>
              </li>
              <li className="flex gap-2">
                <span className="text-hp-orange font-bold">3</span>
                <span>Finance, legal, & compliance specialists</span>
              </li>
              <li className="flex gap-2">
                <span className="text-hp-orange font-bold">3</span>
                <span>Local government & community representatives</span>
              </li>
            </ul>
          </div>

          <div className="bg-hp-dark border-2 border-hp-orange/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Governance Principles</h3>
            <ul className="space-y-2 text-hp-gray-light">
              <li>✓ One person, one vote (all equal voice)</li>
              <li>✓ 50% representation of formerly incarcerated individuals</li>
              <li>✓ Community Advisory Board veto power</li>
              <li>✓ Transparency in all decision-making</li>
              <li>✓ Annual external audits</li>
              <li>✓ Public impact reporting</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Board Members Grid */}
      <section className="py-20 bg-hp-dark">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold font-display mb-12">Board Members</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {boardMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-hp-black border-2 border-hp-orange/30 rounded-lg overflow-hidden hover:border-hp-orange transition-colors duration-200"
              >
                {/* Placeholder for profile image */}
                <div className="w-full h-48 bg-gradient-to-br from-hp-orange/10 to-hp-dark flex items-center justify-center">
                  <div className="text-6xl text-hp-orange/20">👤</div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-hp-orange text-sm font-semibold mb-3">{member.title}</p>
                  <p className="text-hp-gray-light text-sm mb-4">{member.bio}</p>

                  <div className="flex gap-3">
                    <a
                      href={member.links.email}
                      className="flex items-center gap-1 text-hp-orange hover:text-hp-orange-glow transition-colors duration-200"
                      aria-label="Email"
                    >
                      <Mail size={18} />
                    </a>
                    <a
                      href={member.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-hp-orange hover:text-hp-orange-glow transition-colors duration-200"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board Application */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="bg-hp-dark border-2 border-hp-orange/30 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold font-display mb-4">Apply to Our Board</h2>
          <p className="text-hp-gray-light mb-6">
            We are seeking individuals with deep expertise in housing, criminal justice, finance, and community leadership. Board service is volunteer-based.
          </p>
          <a href="/contact" className="inline-block bg-hp-orange text-hp-black px-8 py-4 font-bold rounded-lg hover:bg-hp-orange-glow transition-all duration-200">
            Submit Application
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
