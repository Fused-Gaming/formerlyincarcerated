import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Header = ({ scrolled = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Impact', href: '/impact' },
    { label: 'Model', href: '/model' },
    { label: 'Partners', href: '/partners' },
    { label: 'Docs', href: '/docs' },
    { label: 'Whitepaper', href: '/whitepaper' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-hp-black/95 backdrop-blur-md border-b border-hp-orange/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl md:text-2xl font-bold tracking-tighter">
          <span className="text-hp-orange">Formerly</span>
          <span className="text-hp-white ml-2">Incarcerated</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-8 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-hp-gray-light hover:text-hp-orange transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-hp-orange"
        >
          {mobileMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-hp-dark border-t border-hp-orange/20">
          <nav className="flex flex-col gap-4 px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-hp-gray-light hover:text-hp-orange transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
