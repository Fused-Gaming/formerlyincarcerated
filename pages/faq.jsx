import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-hp-orange/20 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 px-6 flex justify-between items-center hover:bg-hp-dark/50 transition-colors duration-200"
      >
        <h3 className="text-lg font-bold text-hp-white text-left">{question}</h3>
        {isOpen ? (
          <ChevronUp className="text-hp-orange flex-shrink-0" size={24} />
        ) : (
          <ChevronDown className="text-hp-orange flex-shrink-0" size={24} />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-hp-gray-light">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function FAQPage() {
  const faqs = [
    {
      question: 'Where does the funding come from?',
      answer:
        'Funding comes from seized cryptocurrency assets held by federal law enforcement agencies. These assets are currently being held in federal vaults with no productive use. The Bitcoin Land Bond redirects these assets to permanent housing infrastructure.',
    },
    {
      question: 'Why is housing the solution to recidivism?',
      answer:
        'Research consistently shows that stable housing reduces rearrest rates by 20-30% compared to control groups. Homelessness after release is one of the strongest predictors of recidivism. When people have a safe, stable place to live, they can focus on employment, family, and rebuilding their lives.',
    },
    {
      question: 'How are residents selected?',
      answer:
        'Selection prioritizes individuals with the highest need: those returning from prison without family support, at-risk of homelessness, and committed to program engagement. Each pilot city develops its own intake criteria in partnership with our organization, but we maintain consistent standards across all sites.',
    },
    {
      question: 'What happens if someone breaks the lease?',
      answer:
        'Our housing model emphasizes support over eviction. Program residents have access to intensive case management, dispute resolution, and support services before lease termination. Eviction is always a last resort. When it does occur, we work to rehouse participants in alternative placements.',
    },
    {
      question: 'How do you ensure mission stays intact over time?',
      answer:
        'Mission is protected through perpetual deed restrictions, enforceable by state attorneys general, community advisory board veto power, and annual audits. The structure makes it legally impossible to convert properties to market-rate housing. Our governance ensures formerly incarcerated leaders have a permanent seat at the table.',
    },
    {
      question: 'Can this model work in my city?',
      answer:
        'We are currently accepting pilot city applications for Phase 1 (2026-2027). We prioritize cities with: existing reentry infrastructure, supportive city government, property availability, and demonstrated community commitment. Apply through our partnerships page.',
    },
    {
      question: 'How do you measure success?',
      answer:
        'We track three levels: individual outcomes (housing retention, employment, recidivism), community impact (neighborhood investment, public safety), and system-level change (cost-benefit, policy influence). All data is published annually and externally audited.',
    },
    {
      question: 'Is this a government program?',
      answer:
        'No. This is a 501(c)(3) nonprofit initiative. We work in partnership with government agencies, but we are independently governed and funded. Our board includes formerly incarcerated leaders, housing experts, and finance specialists.',
    },
  ];

  return (
    <PageLayout
      title="FAQ - Formerly Incarcerated"
      description="Common questions about the Bitcoin Housing Bond, our model, and how to get involved."
      url="https://formerlyincarcerated.org/faq"
    >
      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-hp-gradient-hero">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-6 animate-fade-up">
            <h1 className="text-5xl md:text-7xl font-bold font-display text-hp-white">
              Frequently Asked <span className="text-hp-orange">Questions</span>
            </h1>
            <p className="text-xl text-hp-gray-light max-w-2xl">
              Everything you need to know about our approach, impact, and how to partner with us.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <div className="bg-hp-dark border-2 border-hp-orange/30 rounded-lg overflow-hidden">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-hp-dark text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold font-display mb-4">Can't find your answer?</h2>
          <p className="text-hp-gray-light mb-6">
            Reach out to our team directly. We're here to answer any questions about our work.
          </p>
          <a href="/contact" className="inline-block bg-hp-orange text-hp-black px-8 py-4 font-bold rounded-lg hover:bg-hp-orange-glow transition-all duration-200">
            Contact Us
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
