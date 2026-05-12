import React from 'react';
import PageLayout from '../components/PageLayout';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <PageLayout
      title="About - Formerly Incarcerated"
      description="Our mission, vision, and the team building permanent housing for formerly incarcerated people."
      url="https://formerlyincarcerated.org/about"
    >
      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-hp-gradient-hero">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-6 animate-fade-up">
            <h1 className="text-5xl md:text-7xl font-bold font-display text-hp-white">
              Our <span className="text-hp-orange">Mission</span>
            </h1>
            <p className="text-xl text-hp-gray-light max-w-2xl">
              Transform criminal justice by deploying seized assets to create permanent, stable housing for formerly incarcerated people.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-hp-dark border-2 border-hp-orange/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-hp-orange mb-4">Mission</h3>
            <p className="text-hp-gray-light">
              Deploy $15B in seized cryptocurrency to fund permanent deed-restricted housing for 600,000+ formerly incarcerated people annually, reducing recidivism and transforming lives.
            </p>
          </div>

          <div className="bg-hp-dark border-2 border-hp-orange/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-hp-orange mb-4">Vision</h3>
            <p className="text-hp-gray-light">
              A nation where every person released from incarceration has access to stable, permanent housing and community support to rebuild their lives with dignity.
            </p>
          </div>

          <div className="bg-hp-dark border-2 border-hp-orange/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-hp-orange mb-4">Values</h3>
            <ul className="space-y-2 text-hp-gray-light text-sm">
              <li>✓ Dignity over punishment</li>
              <li>✓ Restoration over stigma</li>
              <li>✓ Community over isolation</li>
              <li>✓ Opportunity over despair</li>
              <li>✓ Humanity over systems</li>
            </ul>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 bg-hp-dark">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold font-display mb-12">Our Story</h2>

          <div className="space-y-8 max-w-3xl">
            <p className="text-lg text-hp-gray-light leading-relaxed">
              The Formerly Incarcerated Initiative was founded on a simple observation: billions of dollars in seized cryptocurrency sit idle in federal vaults while 600,000 people are released from prison annually with nowhere to go.
            </p>

            <p className="text-lg text-hp-gray-light leading-relaxed">
              Homelessness after release increases recidivism by 20-30%. Three meals, a safe place to sleep, and community support—these basic human needs unlock possibilities. People thrive when given the conditions necessary to heal, belong, and build.
            </p>

            <p className="text-lg text-hp-gray-light leading-relaxed">
              That became our guiding principle. We designed a model that redeploys seized assets to create permanent housing infrastructure, funded through appreciation and ground leases, ensuring perpetual operational independence.
            </p>

            <p className="text-lg text-hp-gray-light leading-relaxed">
              Our approach centers on lived experience. Our board includes formerly incarcerated leaders, housing developers, finance experts, and community representatives. Everyone has equal voice and voting power.
            </p>
          </div>
        </div>
      </section>

      {/* Team & Board */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold font-display mb-12">Leadership</h2>

        <div className="mb-12">
          <Link href="/about/team" className="inline-block bg-hp-orange text-hp-black px-8 py-4 font-bold rounded-lg hover:bg-hp-orange-glow transition-all duration-200 mb-8">
            Meet Our Team →
          </Link>
          <p className="text-hp-gray-light">
            Our team includes formerly incarcerated leaders, housing experts, economists, and criminal justice reformers united around a single mission.
          </p>
        </div>

        <div>
          <Link href="/board" className="inline-block bg-hp-orange text-hp-black px-8 py-4 font-bold rounded-lg hover:bg-hp-orange-glow transition-all duration-200 mb-8">
            View Our Board →
          </Link>
          <p className="text-hp-gray-light">
            Our board of directors ensures accountability, expertise, and mission alignment across governance, finance, housing, and reentry domains.
          </p>
        </div>
      </section>

      {/* 501(c)(3) Status */}
      <section className="py-20 bg-hp-dark text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold font-display mb-4">501(c)(3) Nonprofit Status</h2>
          <p className="text-hp-gray-light text-lg mb-6">
            The Formerly Incarcerated Initiative is a registered 501(c)(3) nonprofit organization. All contributions are tax-deductible.
          </p>
          <p className="text-hp-gray-light text-sm">
            Financial transparency is core to our mission. Annual audited statements and impact reports are available upon request.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
