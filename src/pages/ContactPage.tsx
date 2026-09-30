import React, { useState } from 'react';
import { PageRoute } from '../types/jewelry';
import { FAQS } from '../data/products';
import { ChevronRight, Mail, Instagram, Clock, MapPin, Send, ChevronDown, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Custom Sizing & Bespoke Inquiries',
    orderNumber: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      topic: 'Custom Sizing & Bespoke Inquiries',
      orderNumber: '',
      message: ''
    });
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="bg-[#FAF9F6] text-[#2C221E] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-sans text-[#8C7D75] mb-6">
        <button onClick={() => onNavigate({ name: 'home' })} className="hover:text-[#2C221E] transition-colors">
          Home
        </button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#2C221E] font-medium">Contact & Concierge</span>
      </nav>

      {/* Header */}
      <div className="border-b border-[#EAE3D8] pb-8 mb-12">
        <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
          Atelier Concierge
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#2C221E] font-normal tracking-tight mb-3">
          We Welcome Your Inquiry
        </h1>
        <p className="text-xs sm:text-sm text-[#5A4A42] font-sans font-light max-w-xl leading-relaxed">
          Whether you have a question regarding chain lengths, ring sizing, bespoke bridal creations, or an existing heirloom order, our artisans are here to assist you.
        </p>
      </div>

      {/* Contact Grid: Left Info / Right Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-[#EAE3D8]">
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[#F4F0EA] p-8 border border-[#EAE3D8]">
            <h3 className="font-serif text-2xl text-[#2C221E] mb-6">Atelier Concierge Desk</h3>

            <div className="space-y-6 text-xs font-sans">
              <div className="flex items-start gap-3.5">
                <Mail className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                <div>
                  <span className="text-[#8C7D75] uppercase tracking-wider text-[10px] block mb-0.5">
                    Direct Email
                  </span>
                  <a
                    href="mailto:concierge@lumejewelry.com"
                    className="text-sm font-medium text-[#2C221E] hover:text-[#D4AF37] transition-colors"
                  >
                    concierge@lumejewelry.com
                  </a>
                  <p className="text-[11px] text-[#8C7D75] font-light mt-0.5">
                    Artisans reply within 24 business hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Instagram className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                <div>
                  <span className="text-[#8C7D75] uppercase tracking-wider text-[10px] block mb-0.5">
                    Instagram Direct
                  </span>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-[#2C221E] hover:text-[#D4AF37] transition-colors"
                  >
                    @lume.finejewelry
                  </a>
                  <p className="text-[11px] text-[#8C7D75] font-light mt-0.5">
                    Behind-the-scenes bench photos & lookbook styling.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                <div>
                  <span className="text-[#8C7D75] uppercase tracking-wider text-[10px] block mb-0.5">
                    Studio & Salon Hours
                  </span>
                  <p className="text-sm font-medium text-[#2C221E]">
                    Monday – Friday: 9:00 AM – 6:00 PM CET
                  </p>
                  <p className="text-xs text-[#5A4A42] font-light mt-0.5">
                    Saturday by private appointment only.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                <div>
                  <span className="text-[#8C7D75] uppercase tracking-wider text-[10px] block mb-0.5">
                    Atelier Locations
                  </span>
                  <p className="text-xs text-[#2C221E] font-medium">
                    Paris Studio: 14 Rue de Charonne, 75011 Paris, France
                  </p>
                  <p className="text-xs text-[#5A4A42] font-light mt-0.5">
                    New York Showroom: 82 Mercer Street, SoHo, NY 10012
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-[#FAF9F6] p-8 border border-[#EAE3D8]">
            <h3 className="font-serif text-2xl text-[#2C221E] mb-2">Send an Atelier Message</h3>
            <p className="text-xs text-[#8C7D75] font-sans mb-6">
              Please share your inquiries below and a member of our metalsmith team will reach out directly.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-[#FAF5EB] border border-[#D4AF37]/40">
                <CheckCircle2 className="w-10 h-10 text-[#D4AF37] mx-auto mb-3" />
                <h4 className="font-serif text-xl text-[#2C221E] mb-1">Inquiry Received with Gratitude</h4>
                <p className="text-xs text-[#5A4A42] font-sans max-w-sm mx-auto mb-4">
                  Thank you for reaching out. We have logged your request and our concierge will respond within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="py-2 px-6 bg-[#2C221E] text-[#FAF9F6] text-xs font-sans uppercase tracking-widest hover:bg-[#382C26] transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider text-[#8C7D75] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full bg-[#F4F0EA] border border-[#EAE3D8] px-3.5 py-2.5 text-xs font-sans text-[#2C221E] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider text-[#8C7D75] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. eleanor@example.com"
                      className="w-full bg-[#F4F0EA] border border-[#EAE3D8] px-3.5 py-2.5 text-xs font-sans text-[#2C221E] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider text-[#8C7D75] mb-1">
                      Inquiry Topic
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full bg-[#F4F0EA] border border-[#EAE3D8] px-3.5 py-2.5 text-xs font-sans text-[#2C221E] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                    >
                      <option value="Custom Sizing & Bespoke Inquiries">Custom Sizing & Bespoke Inquiries</option>
                      <option value="Shipping, Delivery & Tracking">Shipping, Delivery & Tracking</option>
                      <option value="Returns & 30-Day Exchanges">Returns & 30-Day Exchanges</option>
                      <option value="Jewelry Care & Warranty Service">Jewelry Care & Warranty Service</option>
                      <option value="Press & Bridal Consultations">Press & Bridal Consultations</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider text-[#8C7D75] mb-1">
                      Order Number (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.orderNumber}
                      onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                      placeholder="e.g. LUME-729104"
                      className="w-full bg-[#F4F0EA] border border-[#EAE3D8] px-3.5 py-2.5 text-xs font-sans text-[#2C221E] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-wider text-[#8C7D75] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the piece you are considering or questions on dimensions and noble metals..."
                    className="w-full bg-[#F4F0EA] border border-[#EAE3D8] px-3.5 py-2.5 text-xs font-sans text-[#2C221E] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="py-3.5 px-8 bg-[#2C221E] hover:bg-[#382C26] text-[#FAF9F6] text-xs font-sans uppercase tracking-widest font-semibold flex items-center justify-center gap-2 border border-[#D4AF37]/30 transition-all shadow-sm"
                >
                  <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Transmit Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <section className="pt-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
              Common Inquiries
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C221E] font-normal tracking-tight mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-[#5A4A42] font-sans font-light">
              Clear answers regarding our shipping timelines, sizing guides, and lifetime jewelry warranty.
            </p>
          </div>

          <div className="divide-y divide-[#EAE3D8] border-y border-[#EAE3D8]">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="py-4">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between text-left py-2 font-serif text-lg sm:text-xl text-[#2C221E] hover:text-[#D4AF37] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8C7D75] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="pt-2 pb-3 text-xs sm:text-sm text-[#5A4A42] font-sans font-light leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
