import React, { useState } from 'react';
import { PageRoute, ProductCategory } from '../../types/jewelry';
import { CATEGORIES } from '../../data/products';
import { Instagram, Send, ShieldCheck, RefreshCw, Award, Gift, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD ($)');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#2C221E] text-[#FAF9F6] border-t border-[#D4AF37]/30 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Pillars / Assurance Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-14 border-b border-[#FAF9F6]/10 text-center">
          <div className="flex flex-col items-center p-3">
            <Award className="w-6 h-6 text-[#D4AF37] mb-2.5 stroke-[1.5]" />
            <h4 className="font-serif text-sm text-[#FAF9F6] mb-1">Handcrafted Artistry</h4>
            <p className="text-xs text-[#D8CEBE] font-sans font-light">Individual small-batch casting</p>
          </div>
          <div className="flex flex-col items-center p-3">
            <ShieldCheck className="w-6 h-6 text-[#D4AF37] mb-2.5 stroke-[1.5]" />
            <h4 className="font-serif text-sm text-[#FAF9F6] mb-1">18k Solid Vermeil</h4>
            <p className="text-xs text-[#D8CEBE] font-sans font-light">Recycled noble metals & pearls</p>
          </div>
          <div className="flex flex-col items-center p-3">
            <RefreshCw className="w-6 h-6 text-[#D4AF37] mb-2.5 stroke-[1.5]" />
            <h4 className="font-serif text-sm text-[#FAF9F6] mb-1">30-Day Complimentary Trial</h4>
            <p className="text-xs text-[#D8CEBE] font-sans font-light">Risk-free returns & exchanges</p>
          </div>
          <div className="flex flex-col items-center p-3">
            <Gift className="w-6 h-6 text-[#D4AF37] mb-2.5 stroke-[1.5]" />
            <h4 className="font-serif text-sm text-[#FAF9F6] mb-1">Heirloom Gift Box</h4>
            <p className="text-xs text-[#D8CEBE] font-sans font-light">Embossed linen case with velvet</p>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-14 border-b border-[#FAF9F6]/10 text-left">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <span className="font-serif text-3xl tracking-tight text-[#FAF9F6] block mb-1">
              Lumé
            </span>
            <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#D4AF37] block mb-4">
              Atelier Joaillerie Handcrafted
            </span>
            <p className="text-xs text-[#D8CEBE] font-sans font-light leading-relaxed max-w-sm mb-6">
              Rooted in the quiet beauty of artisanal craftsmanship, Lumé designs heirloom-quality jewelry forged in 18k solid gold vermeil, recycled silver, and handpicked Mediterranean freshwater pearls.
            </p>
            <div className="flex items-center gap-4 text-[#D8CEBE]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-[#D8CEBE]/30 flex items-center justify-center hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <span className="text-xs text-[#D8CEBE]/80 font-sans tracking-wider">
                @lume.finejewelry
              </span>
            </div>
          </div>

          {/* Quick Links: Collections */}
          <div>
            <h4 className="font-serif text-base text-[#FAF9F6] mb-4 tracking-wide">Collections</h4>
            <ul className="space-y-2 text-xs font-sans text-[#D8CEBE]">
              <li>
                <button
                  onClick={() => onNavigate({ name: 'shop' })}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  All Jewelry
                </button>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => onNavigate({ name: 'category', category: cat.slug })}
                    className="hover:text-[#D4AF37] transition-colors text-left capitalize"
                  >
                    {cat.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate({ name: 'shop' })}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  Bestsellers
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links: Client Care */}
          <div>
            <h4 className="font-serif text-base text-[#FAF9F6] mb-4 tracking-wide">Atelier & Care</h4>
            <ul className="space-y-2 text-xs font-sans text-[#D8CEBE]">
              <li>
                <button
                  onClick={() => onNavigate({ name: 'about' })}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  Our Artisan Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'contact' })}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  Contact Concierge
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'contact' })}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  Shipping & Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'contact' })}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  Ring Sizing Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'contact' })}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  Jewelry Care Instructions
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="font-serif text-base text-[#FAF9F6] mb-2 tracking-wide">The Lumé Society</h4>
            <p className="text-xs text-[#D8CEBE] font-sans font-light mb-4 leading-relaxed">
              Subscribe to receive private salon preview invitations, bespoke jewelry care guides, and 10% off your first heirloom order.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#FAF5EB]/10 border border-[#D4AF37]/40 text-xs text-[#D4AF37] font-sans">
                Welcome to the Lumé Atelier. Check your inbox for your 10% collector code.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-[#FAF9F6]/10 border border-[#FAF9F6]/20 px-3.5 py-2.5 text-xs text-[#FAF9F6] placeholder:text-[#8C7D75] focus:outline-none focus:border-[#D4AF37] font-sans"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#D4AF37] hover:bg-[#C59F2D] text-[#2C221E] transition-colors flex items-center justify-center"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-[#8C7D75] font-sans font-light">
                  We honor your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Currency & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7D75] font-sans gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-wider text-[#D8CEBE]">Currency:</span>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="bg-[#2C221E] border border-[#FAF9F6]/20 text-[#FAF9F6] text-xs px-2.5 py-1 focus:outline-none focus:border-[#D4AF37] font-mono cursor-pointer"
            >
              <option value="USD ($)">USD ($ United States)</option>
              <option value="EUR (€)">EUR (€ European Union)</option>
              <option value="GBP (£)">GBP (£ United Kingdom)</option>
              <option value="CAD ($)">CAD ($ Canada)</option>
            </select>
          </div>

          <p className="text-center sm:text-right font-light text-[11px]">
            © {new Date().getFullYear()} Lumé Artisanal Jewelry. Handcrafted with reverence. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
