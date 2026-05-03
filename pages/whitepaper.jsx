import React from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';
import OpenGraphHead from '../components/OpenGraphHead';

export default function WhitepaperPage() {
  return (
    <>
      <OpenGraphHead
        title="Bitcoin Land Bond White Paper"
        description="Download our comprehensive white paper on using seized cryptocurrency to fund permanent housing for 600,000+ formerly incarcerated individuals annually."
        url="https://formerlyincarcerated.org/whitepaper"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-black leading-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Bitcoin Land Bond White Paper
            </h1>
            <p className="text-xl text-slate-300">
              Criminal Asset Recovery Initiative - Reentry Housing Program
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-8 border border-slate-700/50 space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-amber-400">Document Overview</h2>
              <p className="text-slate-300">
                The Bitcoin Land Bond White Paper presents a comprehensive policy framework for deploying seized cryptocurrency assets to fund permanent deed-restricted housing for formerly incarcerated individuals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-slate-700">
              <div className="space-y-3">
                <h3 className="font-bold text-emerald-400">Key Sections</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex gap-2">
                    <span className="text-emerald-500">•</span>
                    <span>Executive Summary & Problem Statement</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500">•</span>
                    <span>Criminal Asset Recovery Framework</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500">•</span>
                    <span>Housing Solution Design & Implementation</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500">•</span>
                    <span>Financial Model & Sustainability</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500">•</span>
                    <span>Governance & Accountability Mechanisms</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500">•</span>
                    <span>Impact Metrics & Research Evidence</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-blue-400">Quick Facts</h3>
                <div className="space-y-2 text-sm text-slate-300">
                  <div>
                    <p className="text-blue-400 font-semibold">Total Asset Deployment</p>
                    <p>$15 billion in seized digital assets</p>
                  </div>
                  <div>
                    <p className="text-blue-400 font-semibold">Annual Beneficiaries</p>
                    <p>600,000+ formerly incarcerated individuals</p>
                  </div>
                  <div>
                    <p className="text-blue-400 font-semibold">Recidivism Reduction</p>
                    <p>20-30% expected impact</p>
                  </div>
                  <div>
                    <p className="text-blue-400 font-semibold">Implementation Timeline</p>
                    <p>7-year phased rollout across 5 pilot cities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-200">Download Options</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <a
                href="#whitepaper-pdf"
                className="bg-gradient-to-br from-amber-900/30 to-slate-900/50 rounded-lg p-6 border border-amber-700/50 hover:border-amber-600 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <Download className="text-amber-400 flex-shrink-0 group-hover:scale-110 transition-transform" size={32} />
                  <div>
                    <h3 className="font-bold text-amber-400 mb-1">Full White Paper (PDF)</h3>
                    <p className="text-sm text-slate-400 mb-3">Complete policy framework and implementation guide</p>
                    <p className="text-xs text-slate-500">File size: ~2.5 MB | Format: PDF</p>
                  </div>
                </div>
              </a>

              <a
                href="#whitepaper-summary"
                className="bg-gradient-to-br from-emerald-900/30 to-slate-900/50 rounded-lg p-6 border border-emerald-700/50 hover:border-emerald-600 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <Download className="text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform" size={32} />
                  <div>
                    <h3 className="font-bold text-emerald-400 mb-1">Executive Summary (PDF)</h3>
                    <p className="text-sm text-slate-400 mb-3">Quick overview of key proposals and impact metrics</p>
                    <p className="text-xs text-slate-500">File size: ~800 KB | Format: PDF</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-lg p-6 border border-slate-700/50 space-y-4">
            <h3 className="font-bold text-slate-200">Document Information</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-400">
              <div>
                <p className="text-slate-500 mb-1">Published</p>
                <p>2026 - Current Version 2.0</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Organization</p>
                <p>Bitcoin Land Bond Initiative</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Domain</p>
                <p>formerlyincarcerated.org</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Contact</p>
                <p>hello@formerlyincarcerated.org</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-slate-400 mb-4">Questions about the white paper?</p>
            <a
              href="mailto:hello@formerlyincarcerated.org"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>
    </div>
    </>
  );
}
