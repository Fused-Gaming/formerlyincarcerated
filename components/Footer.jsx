import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, Twitter, BarChart3 } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-hp-gradient-footer text-hp-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Footer Grid */}
        <div className="grid md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-bold text-hp-orange mb-3">
              Formerly Incarcerated
            </h3>
            <p className="text-sm text-hp-gray-light">
              Bitcoin Housing Bond Initiative for Human Park
            </p>
          </div>

          {/* Organization */}
          <div>
            <h4 className="text-sm font-semibold text-hp-orange mb-4 uppercase tracking-widest">
              Organization
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-hp-gray-light hover:text-hp-orange transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/about/team"
                  className="text-hp-gray-light hover:text-hp-orange transition-colors duration-200"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/board"
                  className="text-hp-gray-light hover:text-hp-orange transition-colors duration-200"
                >
                  Board
                </Link>
              </li>
              <li>
                <Link
                  href="/impact"
                  className="text-hp-gray-light hover:text-hp-orange transition-colors duration-200"
                >
                  Impact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-hp-orange mb-4 uppercase tracking-widest">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/whitepaper"
                  className="text-hp-gray-light hover:text-hp-orange transition-colors duration-200"
                >
                  Whitepaper
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-hp-gray-light hover:text-hp-orange transition-colors duration-200"
                >
                  Docs
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-hp-gray-light hover:text-hp-orange transition-colors duration-200"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-hp-gray-light hover:text-hp-orange transition-colors duration-200"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h4 className="text-sm font-semibold text-hp-orange mb-4 uppercase tracking-widest">
              Connect
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:hello@formerlyincarcerated.org"
                className="text-hp-gray-light hover:text-hp-orange transition-colors duration-200 flex items-center gap-2 text-sm"
              >
                <Mail size={16} />
                hello@formerlyincarcerated.org
              </a>
              <div className="flex gap-4 pt-2">
                <a
                  href="https://twitter.com/vlnlabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hp-gray-light hover:text-hp-orange transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="https://linkedin.com/company/formerly-incarcerated"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hp-gray-light hover:text-hp-orange transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://github.com/fused-gaming/formerlyincarcerated"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hp-gray-light hover:text-hp-orange transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-hp-orange/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-hp-gray-light">
            <p>© {currentYear} Formerly Incarcerated Initiative. Mission-driven nonprofit.</p>
            <div className="flex gap-4">
              <Link href="/about" className="hover:text-hp-orange transition-colors duration-200">
                Privacy
              </Link>
              <Link href="/about" className="hover:text-hp-orange transition-colors duration-200">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
