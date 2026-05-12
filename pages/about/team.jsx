import React from 'react';
import PageLayout from '../../components/PageLayout';

export default function TeamPage() {
  return (
    <PageLayout
      title="Team - Formerly Incarcerated"
      description="Meet the staff and advisors building this initiative."
      url="https://formerlyincarcerated.org/about/team"
    >
      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-hp-gradient-hero">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-6 animate-fade-up">
            <h1 className="text-5xl md:text-7xl font-bold font-display text-hp-white">
              Our <span className="text-hp-orange">Team</span>
            </h1>
            <p className="text-xl text-hp-gray-light max-w-2xl">
              Housing experts, criminal justice reformers, and formerly incarcerated leaders working toward one mission.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="bg-hp-dark border-2 border-hp-orange/30 rounded-lg overflow-hidden hover:border-hp-orange transition-colors duration-200"
            >
              {/* Placeholder for profile image */}
              <div className="w-full h-40 bg-gradient-to-br from-hp-orange/10 to-hp-dark flex items-center justify-center">
                <div className="text-5xl text-hp-orange/20">👤</div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold mb-1">Team Member Name</h3>
                <p className="text-hp-orange text-sm font-semibold mb-2">Role / Title</p>
                <p className="text-hp-gray-light text-sm">
                  Brief bio or background information about the team member's expertise and role.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Advisors */}
      <section className="py-20 bg-hp-dark">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold font-display mb-12">Strategic Advisors</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-l-4 border-hp-orange pl-6">
              <h3 className="text-xl font-bold mb-2">Criminal Justice Reform</h3>
              <p className="text-hp-gray-light">
                Advisors with deep expertise in reentry, recidivism reduction, and criminal justice policy.
              </p>
            </div>

            <div className="border-l-4 border-hp-orange pl-6">
              <h3 className="text-xl font-bold mb-2">Housing & Development</h3>
              <p className="text-hp-gray-light">
                Experts in permanent supportive housing, community land trusts, and affordable housing development.
              </p>
            </div>

            <div className="border-l-4 border-hp-orange pl-6">
              <h3 className="text-xl font-bold mb-2">Finance & Impact</h3>
              <p className="text-hp-gray-light">
                Financial strategists and impact measurement experts ensuring transparency and accountability.
              </p>
            </div>

            <div className="border-l-4 border-hp-orange pl-6">
              <h3 className="text-xl font-bold mb-2">Community & Lived Experience</h3>
              <p className="text-hp-gray-light">
                Formerly incarcerated leaders and community organizers guiding our work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-20 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold font-display mb-6">Join Our Team</h2>
        <p className="text-xl text-hp-gray-light mb-8 max-w-2xl mx-auto">
          We're actively hiring for positions in housing development, community engagement, finance, and program management.
        </p>
        <a href="/contact" className="inline-block bg-hp-orange text-hp-black px-8 py-4 font-bold rounded-lg hover:bg-hp-orange-glow transition-all duration-200">
          Explore Careers
        </a>
      </section>
    </PageLayout>
  );
}
