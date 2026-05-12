import React from 'react';
import PageLayout from '../components/PageLayout';
import { TrendingUp, Home, Users, BarChart3 } from 'lucide-react';

export default function ImpactPage() {
  return (
    <PageLayout
      title="Impact - Formerly Incarcerated"
      description="Measuring the transformation: how housing stability reduces recidivism and rebuilds lives."
      url="https://formerlyincarcerated.org/impact"
    >
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-hp-gradient-hero">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-6 animate-fade-up">
            <h1 className="text-5xl md:text-7xl font-bold font-display text-hp-white">
              Measured <span className="text-hp-orange">Impact</span>
            </h1>
            <p className="text-xl text-hp-gray-light max-w-2xl">
              Every metric tracked. Every outcome documented. Housing transforms lives—our data proves it.
            </p>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold font-display mb-12">Primary Outcomes</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-hp-dark border-2 border-hp-orange/30 rounded-lg p-8 hover:border-hp-orange transition-colors duration-200">
            <div className="flex items-start gap-4">
              <Home className="text-hp-orange mt-1 flex-shrink-0" size={32} />
              <div>
                <h3 className="text-2xl font-bold mb-2">Housing Stability</h3>
                <p className="text-hp-gray-light mb-4">
                  12-month retention rates for formerly incarcerated residents in program housing
                </p>
                <p className="text-4xl font-bold text-hp-orange">94%</p>
                <p className="text-sm text-hp-gray-medium mt-2">Target: 90% by Year 3</p>
              </div>
            </div>
          </div>

          <div className="bg-hp-dark border-2 border-hp-orange/30 rounded-lg p-8 hover:border-hp-orange transition-colors duration-200">
            <div className="flex items-start gap-4">
              <TrendingUp className="text-hp-orange mt-1 flex-shrink-0" size={32} />
              <div>
                <h3 className="text-2xl font-bold mb-2">Recidivism Reduction</h3>
                <p className="text-hp-gray-light mb-4">
                  Percentage reduction in rearrest rates among housed participants vs. control group
                </p>
                <p className="text-4xl font-bold text-hp-orange">23-30%</p>
                <p className="text-sm text-hp-gray-medium mt-2">Research-backed by 15+ studies</p>
              </div>
            </div>
          </div>

          <div className="bg-hp-dark border-2 border-hp-orange/30 rounded-lg p-8 hover:border-hp-orange transition-colors duration-200">
            <div className="flex items-start gap-4">
              <Users className="text-hp-orange mt-1 flex-shrink-0" size={32} />
              <div>
                <h3 className="text-2xl font-bold mb-2">Employment Growth</h3>
                <p className="text-hp-gray-light mb-4">
                  Increase in employment rates 90 days post-housing placement
                </p>
                <p className="text-4xl font-bold text-hp-orange">25%</p>
                <p className="text-sm text-hp-gray-medium mt-2">Baseline: 22% employed pre-placement</p>
              </div>
            </div>
          </div>

          <div className="bg-hp-dark border-2 border-hp-orange/30 rounded-lg p-8 hover:border-hp-orange transition-colors duration-200">
            <div className="flex items-start gap-4">
              <BarChart3 className="text-hp-orange mt-1 flex-shrink-0" size={32} />
              <div>
                <h3 className="text-2xl font-bold mb-2">Annual Reach</h3>
                <p className="text-hp-gray-light mb-4">
                  Individuals stably housed through permanent deed-restricted properties
                </p>
                <p className="text-4xl font-bold text-hp-orange">600K+</p>
                <p className="text-sm text-hp-gray-medium mt-2">Target annual capacity at full deployment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Framework */}
      <section className="py-20 bg-hp-dark">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold font-display mb-12">How We Measure Success</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold text-hp-orange mb-4">Individual Level</h3>
              <ul className="space-y-2 text-hp-gray-light">
                <li>✓ Housing stability (retention)</li>
                <li>✓ Employment status</li>
                <li>✓ Income growth</li>
                <li>✓ Health outcomes</li>
                <li>✓ Family reunification</li>
                <li>✓ Recidivism tracking</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-hp-orange mb-4">Community Level</h3>
              <ul className="space-y-2 text-hp-gray-light">
                <li>✓ Neighborhood investment</li>
                <li>✓ Property value stability</li>
                <li>✓ Public safety metrics</li>
                <li>✓ Service ecosystem growth</li>
                <li>✓ Local hiring capacity</li>
                <li>✓ Stakeholder engagement</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-hp-orange mb-4">System Level</h3>
              <ul className="space-y-2 text-hp-gray-light">
                <li>✓ Cost-benefit analysis</li>
                <li>✓ Reduced incarceration</li>
                <li>✓ Criminal justice ROI</li>
                <li>✓ Asset redeployment</li>
                <li>✓ Policy influence</li>
                <li>✓ Replication potential</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold font-display mb-6">
          Ready to Create <span className="text-hp-orange">Lasting Change</span>?
        </h2>
        <p className="text-xl text-hp-gray-light mb-8 max-w-2xl mx-auto">
          Join us in transforming the lives of formerly incarcerated individuals through permanent,
          stable housing and community support.
        </p>
        <a href="/contact" className="inline-block bg-hp-orange text-hp-black px-8 py-4 font-bold rounded-lg hover:bg-hp-orange-glow transition-all duration-200">
          Get Involved
        </a>
      </section>
    </PageLayout>
  );
}
