import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import { Mail, Linkedin, Twitter, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission - could integrate with email service
    window.location.href = `mailto:hello@formerlyincarcerated.org?subject=Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}`;
  };

  return (
    <PageLayout
      title="Contact - Formerly Incarcerated"
      description="Get in touch with our team about partnerships, questions, or opportunities."
      url="https://formerlyincarcerated.org/contact"
    >
      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-hp-gradient-hero">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-6 animate-fade-up">
            <h1 className="text-5xl md:text-7xl font-bold font-display text-hp-white">
              Get in <span className="text-hp-orange">Touch</span>
            </h1>
            <p className="text-xl text-hp-gray-light max-w-2xl">
              Questions about partnerships, impact, or our vision? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <Mail className="text-hp-orange mx-auto mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <a href="mailto:hello@formerlyincarcerated.org" className="text-hp-orange hover:text-hp-orange-glow">
              hello@formerlyincarcerated.org
            </a>
          </div>

          <div className="text-center">
            <Linkedin className="text-hp-orange mx-auto mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">LinkedIn</h3>
            <a href="https://linkedin.com/company/formerly-incarcerated" target="_blank" rel="noopener noreferrer" className="text-hp-orange hover:text-hp-orange-glow">
              @formerlyincarcerated
            </a>
          </div>

          <div className="text-center">
            <Twitter className="text-hp-orange mx-auto mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Twitter</h3>
            <a href="https://twitter.com/vlnlabs" target="_blank" rel="noopener noreferrer" className="text-hp-orange hover:text-hp-orange-glow">
              @vlnlabs
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-hp-dark">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold font-display mb-8 text-center">Send us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-hp-gray-light text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-hp-black border-2 border-hp-orange/30 rounded-lg px-4 py-3 text-hp-white focus:border-hp-orange focus:outline-none transition-colors duration-200"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block text-hp-gray-light text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-hp-black border-2 border-hp-orange/30 rounded-lg px-4 py-3 text-hp-white focus:border-hp-orange focus:outline-none transition-colors duration-200"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-hp-gray-light text-sm font-semibold mb-2">Organization</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="w-full bg-hp-black border-2 border-hp-orange/30 rounded-lg px-4 py-3 text-hp-white focus:border-hp-orange focus:outline-none transition-colors duration-200"
                placeholder="Your organization (optional)"
              />
            </div>

            <div>
              <label className="block text-hp-gray-light text-sm font-semibold mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="w-full bg-hp-black border-2 border-hp-orange/30 rounded-lg px-4 py-3 text-hp-white focus:border-hp-orange focus:outline-none transition-colors duration-200"
                placeholder="Tell us how you want to engage..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-hp-orange text-hp-black px-8 py-4 font-bold rounded-lg hover:bg-hp-orange-glow transition-all duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </PageLayout>
  );
}
