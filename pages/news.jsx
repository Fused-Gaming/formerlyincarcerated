import React from 'react';
import PageLayout from '../components/PageLayout';
import { Calendar, User, ExternalLink } from 'lucide-react';

export default function NewsPage() {
  const newsItems = [
    {
      date: '2026-05-10',
      title: 'Bitcoin Housing Bond Initiative Announces Pilot Cities',
      excerpt:
        'Five cities selected for Phase 1 deployment of the historic criminal asset recovery initiative.',
      author: 'Communications Team',
      link: '#',
    },
    {
      date: '2026-04-28',
      title: 'Research Shows Housing Stability Reduces Recidivism by 30%',
      excerpt:
        'New peer-reviewed study validates impact model with data from 600+ formerly incarcerated residents.',
      author: 'Impact Team',
      link: '#',
    },
    {
      date: '2026-04-15',
      title: 'Federal Court Approves Asset Seizure Redeployment',
      excerpt:
        'Landmark ruling enables direct deployment of $15B in seized cryptocurrency to housing initiative.',
      author: 'Policy Team',
      link: '#',
    },
    {
      date: '2026-03-30',
      title: 'Op-Ed: Why Criminals Proceeds Should Fund Reentry Housing',
      excerpt:
        'Our founder explains the moral and economic case for redirecting seized assets to housing.',
      author: 'Leadership',
      link: '#',
    },
    {
      date: '2026-03-15',
      title: 'Board Expands with New Formerly Incarcerated Leaders',
      excerpt:
        'Three new board members with lived experience of incarceration join governance structure.',
      author: 'HR Team',
      link: '#',
    },
    {
      date: '2026-02-28',
      title: 'Whitepaper Released: Complete Technical Specification',
      excerpt:
        'Comprehensive 129-page specification released covering governance, finance, and impact framework.',
      author: 'Research Team',
      link: '#',
    },
  ];

  return (
    <PageLayout
      title="News - Formerly Incarcerated"
      description="Latest updates, announcements, and press coverage."
      url="https://formerlyincarcerated.org/news"
    >
      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-hp-gradient-hero">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-6 animate-fade-up">
            <h1 className="text-5xl md:text-7xl font-bold font-display text-hp-white">
              <span className="text-hp-orange">News</span> & Updates
            </h1>
            <p className="text-xl text-hp-gray-light max-w-2xl">
              Stay informed about pilot launches, research findings, and policy developments.
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <div className="space-y-8">
          {newsItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="bg-hp-dark border-2 border-hp-orange/30 rounded-lg p-8 hover:border-hp-orange hover:shadow-hp-cinematic transition-all duration-200 group"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                <div className="flex gap-4 text-sm text-hp-gray-medium">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {new Date(item.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={16} />
                    {item.author}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-2 group-hover:text-hp-orange transition-colors duration-200">
                {item.title}
              </h3>

              <p className="text-hp-gray-light mb-4">{item.excerpt}</p>

              <span className="inline-flex items-center gap-2 text-hp-orange group-hover:text-hp-orange-glow font-semibold">
                Read More <ExternalLink size={16} />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Subscribe */}
      <section className="py-20 bg-hp-dark">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold font-display mb-4">Subscribe for Updates</h2>
          <p className="text-hp-gray-light mb-6">
            Get the latest news and announcements delivered to your inbox.
          </p>

          <form className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-hp-black border-2 border-hp-orange/30 rounded-lg px-4 py-3 text-hp-white focus:border-hp-orange focus:outline-none transition-colors duration-200"
              required
            />
            <button
              type="submit"
              className="bg-hp-orange text-hp-black px-8 py-3 font-bold rounded-lg hover:bg-hp-orange-glow transition-all duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </PageLayout>
  );
}
