import React, { useState, useEffect } from 'react';
import { ChevronDown, MapPin, Users, Home, TrendingUp, Lock, ArrowRight } from 'lucide-react';

export default function BitcoinLandBond() {
  const [activeTab, setActiveTab] = useState('impact');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Sticky Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
            Bitcoin Land Bond
          </div>
          <nav className="hidden md:flex gap-8 text-sm">
            <a href="#" className="hover:text-amber-400 transition-colors">Impact</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Model</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Partners</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Docs</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4 animate-fade-up">
              <p className="text-sm font-semibold text-amber-400 uppercase tracking-widest">Criminal Asset Recovery</p>
              <h1 className="text-5xl md:text-6xl font-black leading-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Criminals' Proceeds.<br />Law-Abiding Citizens.<br />Housing for Life.
              </h1>
              <p className="text-lg text-slate-300 max-w-lg">
                The Bitcoin Land Bond deploys $15B in seized cryptocurrency to fund permanent deed-restricted housing for 600,000+ formerly incarcerated people annually.
              </p>
            </div>

            <div className="flex gap-4 flex-col sm:flex-row animate-fade-up" style={{animationDelay: '0.1s'}}>
              <button className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all transform hover:scale-105">
                Read White Paper
                <ArrowRight className="inline ml-2" size={18} />
              </button>
              <button className="px-8 py-4 border-2 border-slate-600 text-white font-bold rounded-lg hover:border-amber-400 hover:text-amber-400 transition-all">
                View Pilot Cities
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800">
              <div className="space-y-2">
                <p className="text-3xl font-bold text-amber-400">$15B</p>
                <p className="text-xs text-slate-400">Seized Digital Assets</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-emerald-400">600K</p>
                <p className="text-xs text-slate-400">Annual Reentry Need</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-blue-400">-25%</p>
                <p className="text-xs text-slate-400">Recidivism Impact</p>
              </div>
            </div>
          </div>

          {/* Interactive Map Placeholder */}
          <div className="hidden md:block relative h-96 bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="space-y-4 text-center">
                <MapPin className="mx-auto text-amber-400" size={48} />
                <p className="text-sm text-slate-300">Five Pilot Cities</p>
                <p className="text-xs text-slate-500">SF · Oakland · LA · Chicago · NYC</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
          </div>
        </div>
      </section>

      {/* The Problem / Opportunity */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-slate-800">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-8 border border-slate-700/50 hover:border-slate-600 transition-colors">
            <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
              <Lock size={24} />
              The Problem
            </h3>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">•</span>
                <span>$15B in seized cryptocurrency sits idle in federal vaults</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">•</span>
                <span>75% of landlords reject formerly incarcerated tenants</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">•</span>
                <span>600,000 people released annually; 95% shortfall in reentry housing</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">•</span>
                <span>Homelessness after release increases recidivism by 20-30%</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-emerald-900/20 to-slate-900/50 rounded-xl p-8 border border-emerald-700/30 hover:border-emerald-600/50 transition-colors">
            <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <TrendingUp size={24} />
              The Opportunity
            </h3>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li className="flex gap-3">
                <span className="text-emerald-500 font-bold">•</span>
                <span>Redeploy seized assets to permanent housing infrastructure</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 font-bold">•</span>
                <span>Land holdings appreciate 3-5% annually (inflation hedge)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 font-bold">•</span>
                <span>Bipartisan narrative: "criminals' proceeds → law-abiding citizens"</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 font-bold">•</span>
                <span>Stable housing reduces recidivism 20-30%, improves employment 25%</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Impact Tabs */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-black mb-12">Measured Impact Framework</h2>

        <div className="flex gap-4 mb-8 border-b border-slate-800">
          {['impact', 'governance', 'financials'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {activeTab === 'impact' && (
            <>
              <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700">
                <p className="text-4xl font-black text-amber-400 mb-2">2,000+</p>
                <p className="text-slate-300">Residents Stably Housed (7-year target)</p>
                <p className="text-xs text-slate-500 mt-2">Phase 3 completion</p>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700">
                <p className="text-4xl font-black text-emerald-400 mb-2">20-30%</p>
                <p className="text-slate-300">Recidivism Reduction</p>
                <p className="text-xs text-slate-500 mt-2">Research-backed outcome</p>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700">
                <p className="text-4xl font-black text-blue-400 mb-2">25%</p>
                <p className="text-slate-300">Employment Increase</p>
                <p className="text-xs text-slate-500 mt-2">90-day post-housing cohort</p>
              </div>
            </>
          )}

          {activeTab === 'governance' && (
            <>
              <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700">
                <p className="text-sm font-bold text-amber-400 mb-3">BOARD COMPOSITION</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>4 seats: Reentry advocates & formerly incarcerated leaders</li>
                  <li>3 seats: Housing developers & land trust directors</li>
                  <li>3 seats: Finance & compliance specialists</li>
                  <li>3 seats: Local government & community</li>
                </ul>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700">
                <p className="text-sm font-bold text-emerald-400 mb-3">MISSION LOCK</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>✓ Perpetual deed restrictions</li>
                  <li>✓ Enforceable by attorney general</li>
                  <li>✓ Community Advisory Board veto power</li>
                  <li>✓ Binding on successors in perpetuity</li>
                </ul>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700">
                <p className="text-sm font-bold text-blue-400 mb-3">ACCOUNTABILITY</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>✓ Annual impact reports published</li>
                  <li>✓ Housing stability (12-mo. retention)</li>
                  <li>✓ Recidivism tracking</li>
                  <li>✓ Employment & income outcomes</li>
                </ul>
              </div>
            </>
          )}

          {activeTab === 'financials' && (
            <>
              <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700">
                <p className="text-sm font-bold text-amber-400 mb-3">CAPITAL ALLOCATION</p>
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex justify-between">
                    <span>Land Acquisition</span>
                    <span className="font-bold">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Developer Partnerships</span>
                    <span className="font-bold">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resident Services</span>
                    <span className="font-bold">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Administration</span>
                    <span className="font-bold">5%</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700">
                <p className="text-sm font-bold text-emerald-400 mb-3">DEPLOYMENT PHASES</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li><span className="text-emerald-400">Phase 1:</span> $100M (Yr 1)</li>
                  <li><span className="text-emerald-400">Phase 2:</span> $200M (Yrs 2-3)</li>
                  <li><span className="text-emerald-400">Phase 3:</span> $200M (Yrs 4-7)</li>
                  <li><span className="text-emerald-400">Total:</span> $500M initial</li>
                </ul>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700">
                <p className="text-sm font-bold text-blue-400 mb-3">SELF-SUSTAINING (Yr 8+)</p>
                <ul className="space-y-2 text-sm text-slate-300">
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
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-slate-800">
        <div className="bg-gradient-to-r from-amber-900/20 to-emerald-900/20 rounded-xl p-12 border border-amber-700/30 text-center space-y-6">
          <h2 className="text-3xl font-black">Ready to Transform Criminal Justice?</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            The Bitcoin Land Bond is now accepting applications from housing developers, nonprofit partners, and city governments for pilot phase participation.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all">
              Partner With Us
            </button>
            <button className="px-8 py-4 border-2 border-emerald-500 text-emerald-400 font-bold rounded-lg hover:bg-emerald-500/10 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="font-bold text-amber-400 mb-3">Bitcoin Land Bond</p>
              <p className="text-sm text-slate-400">Criminal asset recovery for reentry housing</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-300 mb-3">Organization</p>
              <ul className="space-y-1 text-sm text-slate-400">
                <li><a href="#" className="hover:text-slate-300">About</a></li>
                <li><a href="#" className="hover:text-slate-300">Board</a></li>
                <li><a href="#" className="hover:text-slate-300">Impact</a></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-300 mb-3">Resources</p>
              <ul className="space-y-1 text-sm text-slate-400">
                <li><a href="#" className="hover:text-slate-300">White Paper</a></li>
                <li><a href="#" className="hover:text-slate-300">Pilot Details</a></li>
                <li><a href="#" className="hover:text-slate-300">News</a></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-300 mb-3">Contact</p>
              <ul className="space-y-1 text-sm text-slate-400">
                <li><a href="#" className="hover:text-slate-300">hello@btclandbond.org</a></li>
                <li><a href="#" className="hover:text-slate-300">Twitter</a></li>
                <li><a href="#" className="hover:text-slate-300">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            <p>© 2026 Bitcoin Land Bond. Mission-driven nonprofit. 501(c)(3) Status.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-up {
          animation: fade-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
// Deployment test: Vercel root directory configuration fixed
