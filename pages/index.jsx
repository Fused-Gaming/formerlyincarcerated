import React, { useState } from 'react';
import { TrendingUp, Lock, ArrowRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';

export default function BitcoinLandBond() {
  const [activeTab, setActiveTab] = useState('impact');

  return (
    <PageLayout
      title="Bitcoin Land Bond - Criminal Asset Recovery Initiative"
      description="The Bitcoin Land Bond deploys $15B in seized cryptocurrency to fund permanent deed-restricted housing for 600,000+ formerly incarcerated people annually."
      url="https://formerlyincarcerated.org"
    >
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-hp-gradient-hero">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-8">
            <div className="space-y-6 animate-fade-up">
              <p className="text-sm font-semibold text-hp-orange uppercase tracking-widest">Criminal Asset Recovery Initiative</p>
              <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight text-hp-white">
                <span className="text-hp-orange">Criminals' Proceeds</span><br/>
                Law-Abiding Citizens<br/>
                Housing for Life
              </h1>
              <p className="text-xl text-hp-gray-light max-w-2xl">
                The Bitcoin Land Bond deploys $15B in seized cryptocurrency to fund permanent deed-restricted housing for 600,000+ formerly incarcerated people annually.
              </p>
            </div>

            <div className="flex gap-4 flex-col sm:flex-row animate-fade-up" style={{animationDelay: '0.1s'}}>
              <a href="https://formerlyincarcerated.org/whitepaper" className="inline-flex items-center px-8 py-4 bg-hp-orange text-hp-black font-bold rounded-lg hover:shadow-lg hover:shadow-hp-orange/50 transition-all transform hover:scale-105">
                Read White Paper
                <ArrowRight className="inline ml-2" size={18} />
              </a>
              <a href="https://formerlyincarcerated.org/model" className="inline-flex items-center px-8 py-4 border-2 border-hp-orange/30 text-hp-white font-bold rounded-lg hover:border-hp-orange hover:text-hp-orange transition-all">
                View Model
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-hp-orange/20">
              <div className="space-y-2">
                <p className="text-3xl font-bold text-hp-orange">$15B</p>
                <p className="text-sm text-hp-gray-medium">Seized Digital Assets</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-hp-orange">600K</p>
                <p className="text-sm text-hp-gray-medium">Annual Reentry Need</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-hp-orange">-25%</p>
                <p className="text-sm text-hp-gray-medium">Recidivism Impact</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem / Opportunity */}
      <section className="py-20 max-w-6xl mx-auto px-6 border-t border-hp-orange/20">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-hp-dark rounded-lg p-8 border border-hp-orange/20 hover:border-hp-orange/40 transition-colors">
            <h3 className="text-2xl font-bold text-hp-orange mb-6 flex items-center gap-3">
              <Lock size={28} />
              The Problem
            </h3>
            <ul className="space-y-4 text-hp-gray-light text-sm">
              <li className="flex gap-3">
                <span className="text-hp-orange font-bold flex-shrink-0">•</span>
                <span>$15B in seized cryptocurrency sits idle in federal vaults</span>
              </li>
              <li className="flex gap-3">
                <span className="text-hp-orange font-bold flex-shrink-0">•</span>
                <span>75% of landlords reject formerly incarcerated tenants</span>
              </li>
              <li className="flex gap-3">
                <span className="text-hp-orange font-bold flex-shrink-0">•</span>
                <span>600,000 people released annually; 95% shortfall in reentry housing</span>
              </li>
              <li className="flex gap-3">
                <span className="text-hp-orange font-bold flex-shrink-0">•</span>
                <span>Homelessness after release increases recidivism by 20-30%</span>
              </li>
            </ul>
          </div>

          <div className="bg-hp-dark rounded-lg p-8 border border-hp-orange/20 hover:border-hp-orange/40 transition-colors">
            <h3 className="text-2xl font-bold text-hp-orange mb-6 flex items-center gap-3">
              <TrendingUp size={28} />
              The Opportunity
            </h3>
            <ul className="space-y-4 text-hp-gray-light text-sm">
              <li className="flex gap-3">
                <span className="text-hp-orange font-bold flex-shrink-0">•</span>
                <span>Redeploy seized assets to permanent housing infrastructure</span>
              </li>
              <li className="flex gap-3">
                <span className="text-hp-orange font-bold flex-shrink-0">•</span>
                <span>Land holdings appreciate 3-5% annually (inflation hedge)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-hp-orange font-bold flex-shrink-0">•</span>
                <span>Bipartisan narrative: "criminals' proceeds → law-abiding citizens"</span>
              </li>
              <li className="flex gap-3">
                <span className="text-hp-orange font-bold flex-shrink-0">•</span>
                <span>Stable housing reduces recidivism 20-30%, improves employment 25%</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Impact Framework */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold font-display mb-12 text-hp-white">Measured Impact Framework</h2>

        <div className="flex gap-4 mb-8 border-b border-hp-orange/20">
          {['impact', 'governance', 'financials'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-bold capitalize transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-hp-orange text-hp-orange'
                  : 'border-b-2 border-transparent text-hp-gray-medium hover:text-hp-gray-light'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {activeTab === 'impact' && (
            <>
              <div className="bg-hp-dark rounded-lg p-8 border border-hp-orange/20">
                <p className="text-4xl font-bold text-hp-orange mb-3">2,000+</p>
                <p className="text-hp-gray-light font-semibold">Residents Stably Housed</p>
                <p className="text-xs text-hp-gray-medium mt-2">(7-year target, Phase 3 completion)</p>
              </div>
              <div className="bg-hp-dark rounded-lg p-8 border border-hp-orange/20">
                <p className="text-4xl font-bold text-hp-orange mb-3">20-30%</p>
                <p className="text-hp-gray-light font-semibold">Recidivism Reduction</p>
                <p className="text-xs text-hp-gray-medium mt-2">Research-backed outcome</p>
              </div>
              <div className="bg-hp-dark rounded-lg p-8 border border-hp-orange/20">
                <p className="text-4xl font-bold text-hp-orange mb-3">25%</p>
                <p className="text-hp-gray-light font-semibold">Employment Increase</p>
                <p className="text-xs text-hp-gray-medium mt-2">90-day post-housing cohort</p>
              </div>
            </>
          )}

          {activeTab === 'governance' && (
            <>
              <div className="bg-hp-dark rounded-lg p-8 border border-hp-orange/20">
                <p className="text-sm font-bold text-hp-orange mb-4 uppercase tracking-widest">Board Composition</p>
                <ul className="space-y-3 text-sm text-hp-gray-light">
                  <li className="flex gap-2"><span className="text-hp-orange">✓</span> 4 seats: Reentry advocates & formerly incarcerated leaders</li>
                  <li className="flex gap-2"><span className="text-hp-orange">✓</span> 3 seats: Housing developers & land trust directors</li>
                  <li className="flex gap-2"><span className="text-hp-orange">✓</span> 3 seats: Finance & compliance specialists</li>
                  <li className="flex gap-2"><span className="text-hp-orange">✓</span> 3 seats: Local government & community</li>
                </ul>
              </div>
              <div className="bg-hp-dark rounded-lg p-8 border border-hp-orange/20">
                <p className="text-sm font-bold text-hp-orange mb-4 uppercase tracking-widest">Mission Lock</p>
                <ul className="space-y-3 text-sm text-hp-gray-light">
                  <li className="flex gap-2"><span className="text-hp-orange">✓</span> Perpetual deed restrictions</li>
                  <li className="flex gap-2"><span className="text-hp-orange">✓</span> Enforceable by attorney general</li>
                  <li className="flex gap-2"><span className="text-hp-orange">✓</span> Community Advisory Board veto power</li>
                  <li className="flex gap-2"><span className="text-hp-orange">✓</span> Binding on successors in perpetuity</li>
                </ul>
              </div>
              <div className="bg-hp-dark rounded-lg p-8 border border-hp-orange/20">
                <p className="text-sm font-bold text-hp-orange mb-4 uppercase tracking-widest">Accountability</p>
                <ul className="space-y-3 text-sm text-hp-gray-light">
                  <li className="flex gap-2"><span className="text-hp-orange">✓</span> Annual impact reports published</li>
                  <li className="flex gap-2"><span className="text-hp-orange">✓</span> Housing stability (12-mo. retention)</li>
                  <li className="flex gap-2"><span className="text-hp-orange">✓</span> Recidivism tracking</li>
                  <li className="flex gap-2"><span className="text-hp-orange">✓</span> Employment & income outcomes</li>
                </ul>
              </div>
            </>
          )}

          {activeTab === 'financials' && (
            <>
              <div className="bg-hp-dark rounded-lg p-8 border border-hp-orange/20">
                <p className="text-sm font-bold text-hp-orange mb-4 uppercase tracking-widest">Capital Allocation</p>
                <div className="space-y-3 text-sm text-hp-gray-light">
                  <div className="flex justify-between"><span>Land Acquisition</span><span className="font-bold text-hp-orange">45%</span></div>
                  <div className="flex justify-between"><span>Developer Partnerships</span><span className="font-bold text-hp-orange">30%</span></div>
                  <div className="flex justify-between"><span>Resident Services</span><span className="font-bold text-hp-orange">20%</span></div>
                  <div className="flex justify-between"><span>Administration</span><span className="font-bold text-hp-orange">5%</span></div>
                </div>
              </div>
              <div className="bg-hp-dark rounded-lg p-8 border border-hp-orange/20">
                <p className="text-sm font-bold text-hp-orange mb-4 uppercase tracking-widest">Deployment Phases</p>
                <ul className="space-y-2 text-sm text-hp-gray-light">
                  <li><span className="text-hp-orange font-semibold">Phase 1:</span> $100M (Yr 1)</li>
                  <li><span className="text-hp-orange font-semibold">Phase 2:</span> $200M (Yrs 2-3)</li>
                  <li><span className="text-hp-orange font-semibold">Phase 3:</span> $200M (Yrs 4-7)</li>
                  <li><span className="text-hp-orange font-semibold">Total:</span> $500M initial</li>
                </ul>
              </div>
              <div className="bg-hp-dark rounded-lg p-8 border border-hp-orange/20">
                <p className="text-sm font-bold text-hp-orange mb-4 uppercase tracking-widest">Self-Sustaining (Yr 8+)</p>
                <ul className="space-y-2 text-sm text-hp-gray-light">
                  <li>$500M portfolio appreciates 3-5%/year</li>
                  <li>$15-25M annual value growth</li>
                  <li>Ground lease income begins</li>
                  <li>Full operational independence</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-hp-dark border-t border-hp-orange/20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-4xl font-bold font-display">Ready to Transform Criminal Justice?</h2>
          <p className="text-hp-gray-light max-w-2xl mx-auto text-lg">
            The Bitcoin Land Bond is now accepting applications from housing developers, nonprofit partners, and city governments for pilot phase participation.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="https://formerlyincarcerated.org/impact" className="inline-flex items-center px-8 py-4 bg-hp-orange text-hp-black font-bold rounded-lg hover:shadow-lg hover:shadow-hp-orange/50 transition-all transform hover:scale-105">
              Learn More
            </a>
            <a href="https://formerlyincarcerated.org/contact" className="inline-flex items-center px-8 py-4 border-2 border-hp-orange/30 text-hp-white font-bold rounded-lg hover:border-hp-orange hover:text-hp-orange transition-all">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
