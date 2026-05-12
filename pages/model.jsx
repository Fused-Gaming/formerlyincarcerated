import React from 'react';
import PageLayout from '../components/PageLayout';
import { Shield, Lock, Users, Zap, Award, TrendingUp } from 'lucide-react';

export default function ModelPage() {
  return (
    <PageLayout
      title="The Model - Formerly Incarcerated"
      description="How seized cryptocurrency becomes permanent housing: governance, mission lock, and self-sustaining deployment."
      url="https://formerlyincarcerated.org/model"
    >
      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-hp-gradient-hero">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-6 animate-fade-up">
            <h1 className="text-5xl md:text-7xl font-bold font-display text-hp-white">
              The <span className="text-hp-orange">Model</span>
            </h1>
            <p className="text-xl text-hp-gray-light max-w-2xl">
              Criminal asset recovery → Land acquisition → Permanent housing → Transformed lives
            </p>
          </div>
        </div>
      </section>

      {/* Core Components */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold font-display mb-12">Core Components</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-hp-dark border-2 border-hp-orange/30 rounded-lg p-8">
            <Shield className="text-hp-orange mb-4" size={32} />
            <h3 className="text-2xl font-bold mb-4">Mission Lock</h3>
            <p className="text-hp-gray-light mb-4">
              Perpetual deed restrictions ensure housing remains affordable and mission-aligned forever.
            </p>
            <ul className="space-y-2 text-sm text-hp-gray-light">
              <li>✓ Legally binding on all successors</li>
              <li>✓ Enforceable by state attorney general</li>
              <li>✓ Community Advisory Board veto power</li>
              <li>✓ Annual compliance verification</li>
            </ul>
          </div>

          <div className="bg-hp-dark border-2 border-hp-orange/30 rounded-lg p-8">
            <Lock className="text-hp-orange mb-4" size={32} />
            <h3 className="text-2xl font-bold mb-4">Governance Structure</h3>
            <p className="text-hp-gray-light mb-4">
              Board composition ensures lived experience, expertise, and community accountability.
            </p>
            <ul className="space-y-2 text-sm text-hp-gray-light">
              <li>✓ 4 seats: Reentry advocates & formerly incarcerated leaders</li>
              <li>✓ 3 seats: Housing developers & land trust directors</li>
              <li>✓ 3 seats: Finance & compliance specialists</li>
              <li>✓ 3 seats: Local government & community representatives</li>
            </ul>
          </div>

          <div className="bg-hp-dark border-2 border-hp-orange/30 rounded-lg p-8">
            <Users className="text-hp-orange mb-4" size={32} />
            <h3 className="text-2xl font-bold mb-4">Resident Support</h3>
            <p className="text-hp-gray-light mb-4">
              Wraparound services ensure housing success is paired with healing and opportunity.
            </p>
            <ul className="space-y-2 text-sm text-hp-gray-light">
              <li>✓ Case management (20% of budget)</li>
              <li>✓ Mental health & substance use support</li>
              <li>✓ Employment training & job placement</li>
              <li>✓ Family reunification support</li>
            </ul>
          </div>

          <div className="bg-hp-dark border-2 border-hp-orange/30 rounded-lg p-8">
            <TrendingUp className="text-hp-orange mb-4" size={32} />
            <h3 className="text-2xl font-bold mb-4">Financial Sustainability</h3>
            <p className="text-hp-gray-light mb-4">
              Land appreciation + ground lease income = perpetual operational independence.
            </p>
            <ul className="space-y-2 text-sm text-hp-gray-light">
              <li>✓ 3-5% annual property appreciation</li>
              <li>✓ Ground lease income (Year 8+)</li>
              <li>✓ $15-25M annual value growth at scale</li>
              <li>✓ Zero public funding required after initial deployment</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Deployment Phases */}
      <section className="py-20 bg-hp-dark">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold font-display mb-12">Deployment Timeline</h2>

          <div className="space-y-6">
            <div className="flex gap-6 items-start">
              <div className="bg-hp-orange text-hp-black rounded-full w-16 h-16 flex items-center justify-center font-bold flex-shrink-0">Phase 1</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Year 1: Foundation</h3>
                <p className="text-hp-gray-light mb-2">$100M deployment across 5 pilot cities</p>
                <ul className="text-sm text-hp-gray-light space-y-1">
                  <li>• Establish governance & advisory boards</li>
                  <li>• Acquire & improve first properties</li>
                  <li>• House 200+ residents in pilot cities</li>
                  <li>• Establish outcome tracking systems</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="bg-hp-orange text-hp-black rounded-full w-16 h-16 flex items-center justify-center font-bold flex-shrink-0">Phase 2</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Years 2-3: Scale</h3>
                <p className="text-hp-gray-light mb-2">$200M additional deployment to 8+ cities</p>
                <ul className="text-sm text-hp-gray-light space-y-1">
                  <li>• Expand to secondary markets</li>
                  <li>• House 600+ additional residents</li>
                  <li>• Build developer partnerships network</li>
                  <li>• Publish 1-year impact data</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="bg-hp-orange text-hp-black rounded-full w-16 h-16 flex items-center justify-center font-bold flex-shrink-0">Phase 3</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Years 4-7: Sustainability</h3>
                <p className="text-hp-gray-light mb-2">$200M strategic redeployment to critical markets</p>
                <ul className="text-sm text-hp-gray-light space-y-1">
                  <li>• National footprint established</li>
                  <li>• 2,000+ residents stably housed</li>
                  <li>• Ground lease income begins</li>
                  <li>• Full operational independence achieved</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="bg-hp-orange text-hp-black rounded-full w-16 h-16 flex items-center justify-center font-bold flex-shrink-0">Phase 4</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Year 8+: Perpetual</h3>
                <p className="text-hp-gray-light mb-2">Self-sustaining via appreciation & income</p>
                <ul className="text-sm text-hp-gray-light space-y-1">
                  <li>• Zero new capital required</li>
                  <li>• 600K+ annual housing capacity</li>
                  <li>• Expansion to adjacent communities</li>
                  <li>• Model replication in other jurisdictions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capital Allocation */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold font-display mb-12">Capital Allocation</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-hp-orange to-hp-orange-deep rounded-lg flex items-center justify-center text-2xl font-bold">45%</div>
                <div>
                  <h4 className="font-bold text-lg">Land Acquisition</h4>
                  <p className="text-hp-gray-light text-sm">Strategic property purchases in high-opportunity markets</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-hp-orange to-hp-orange-deep rounded-lg flex items-center justify-center text-2xl font-bold">30%</div>
                <div>
                  <h4 className="font-bold text-lg">Developer Partnerships</h4>
                  <p className="text-hp-gray-light text-sm">Building construction & property improvement</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-hp-orange to-hp-orange-deep rounded-lg flex items-center justify-center text-2xl font-bold">20%</div>
                <div>
                  <h4 className="font-bold text-lg">Resident Services</h4>
                  <p className="text-hp-gray-light text-sm">Case management, support, and wraparound care</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-hp-orange to-hp-orange-deep rounded-lg flex items-center justify-center text-2xl font-bold">5%</div>
                <div>
                  <h4 className="font-bold text-lg">Administration</h4>
                  <p className="text-hp-gray-light text-sm">Governance, compliance, and operations</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-hp-dark border-2 border-hp-orange/30 rounded-lg p-8 h-full flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4">Why This Matters</h3>
            <p className="text-hp-gray-light mb-4">
              This allocation prioritizes housing creation while ensuring residents receive the wraparound support needed for long-term success.
            </p>
            <p className="text-hp-gray-light mb-4">
              Land acquisition and development create permanent assets. Service investment ensures those assets transform lives. Administration remains lean while maintaining institutional excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-hp-dark text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold font-display mb-6">Ready to Partner?</h2>
          <p className="text-xl text-hp-gray-light mb-8">
            Housing developers, nonprofit organizations, and local governments can apply to participate in our pilot phase.
          </p>
          <a href="/contact" className="inline-block bg-hp-orange text-hp-black px-8 py-4 font-bold rounded-lg hover:bg-hp-orange-glow transition-all duration-200">
            Partner With Us
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
