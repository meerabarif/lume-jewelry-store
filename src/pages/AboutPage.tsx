import React from 'react';
import { PageRoute } from '../types/jewelry';
import { CRAFT_STEPS, artisanImg, heroImg } from '../data/products';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { ChevronRight, ArrowRight, ShieldCheck, Heart, Sparkles, Award } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#FAF9F6] text-[#2C221E] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-sans text-[#8C7D75] mb-6">
        <button onClick={() => onNavigate({ name: 'home' })} className="hover:text-[#2C221E] transition-colors">
          Home
        </button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#2C221E] font-medium">About Atelier Lumé</span>
      </nav>

      {/* Hero Narrative Section */}
      <section className="mb-20">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
            The Atelier Journey
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#2C221E] font-normal tracking-tight leading-[1.15] mb-6">
            Born from a passion for delicate craftsmanship and quiet luxury.
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-[#5A4A42] leading-relaxed mb-6">
            “We wanted to create jewelry that feels like an extension of your own skin—sculptural, poetic, and untouched by industrial haste.”
          </p>
          <p className="text-xs sm:text-sm text-[#5A4A42] font-sans font-light leading-relaxed">
            Founded by a collective of European metalsmiths and gemologists, Lumé was conceived as an alternative to anonymous fast-fashion accessories. We work exclusively with small artisan ateliers where master craftsmen carve master models in wax, pour recycled noble metals by hand, and knot natural baroque pearls individually on botanical silk.
          </p>
        </div>

        {/* Full-width Atelier Banner */}
        <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden border border-[#EAE3D8]">
          <ImageWithFallback
            src={artisanImg}
            alt="Lumé master goldsmith bench in our artisanal workshop"
            containerClassName="w-full h-full"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C221E]/60 via-transparent to-transparent flex items-end p-6 sm:p-10">
            <div className="max-w-lg text-[#FAF9F6]">
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#D4AF37] block mb-1">
                Atelier Bench, 2026
              </span>
              <p className="font-serif text-lg sm:text-xl font-light">
                Where molten gold meets the timeless patience of artisan hands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement: Sustainable Luxury & Fair Practices */}
      <section className="py-16 border-y border-[#EAE3D8] mb-20 bg-[#F4F0EA] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
              Our Core Ethos
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C221E] font-normal tracking-tight">
              Sustainable Luxury & Fair Artisan Practices
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF9F6] p-8 border border-[#EAE3D8]">
              <div className="w-10 h-10 rounded-full bg-[#FAF5EB] text-[#D4AF37] flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-lg text-[#2C221E] mb-2">100% Recycled Gold</h3>
              <p className="text-xs text-[#5A4A42] font-sans font-light leading-relaxed">
                We refuse newly mined metals. All of our gold and silver comes from certified post-consumer scrap and refiners audited by the Responsible Jewellery Council.
              </p>
            </div>

            <div className="bg-[#FAF9F6] p-8 border border-[#EAE3D8]">
              <div className="w-10 h-10 rounded-full bg-[#FAF5EB] text-[#D4AF37] flex items-center justify-center mb-4">
                <Heart className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-lg text-[#2C221E] mb-2">Living Wages for Artisans</h3>
              <p className="text-xs text-[#5A4A42] font-sans font-light leading-relaxed">
                Our bench jewelers earn more than 2.5x the regional living wage, with comprehensive health coverage, safe ventilation studios, and ownership in small-batch runs.
              </p>
            </div>

            <div className="bg-[#FAF9F6] p-8 border border-[#EAE3D8]">
              <div className="w-10 h-10 rounded-full bg-[#FAF5EB] text-[#D4AF37] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-lg text-[#2C221E] mb-2">Non-Toxic & Closed-Loop</h3>
              <p className="text-xs text-[#5A4A42] font-sans font-light leading-relaxed">
                Zero harsh cyanide-based gold plating baths. We use ultrasonic water baths and plant-based polishing waxes that leave zero toxic footprint behind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Handmade Process Breakdown (Step-by-Step Visual) */}
      <section className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
            The Atelier Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C221E] font-normal tracking-tight mb-3">
            Handmade Process Breakdown
          </h2>
          <p className="text-xs sm:text-sm text-[#5A4A42] font-sans font-light">
            Follow the metamorphosis of raw noble metal and natural sea pearls into personal talismans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CRAFT_STEPS.map((stepItem) => (
            <div
              key={stepItem.step}
              className="bg-[#FAF9F6] border border-[#EAE3D8] p-6 sm:p-8 flex flex-col justify-between hover:border-[#D4AF37] transition-colors relative"
            >
              <div>
                <span className="font-serif text-4xl text-[#D4AF37] font-light block mb-4">
                  {stepItem.step}
                </span>
                <h3 className="font-serif text-xl text-[#2C221E] mb-3 leading-snug">
                  {stepItem.title}
                </h3>
                <p className="text-xs text-[#5A4A42] font-sans font-light leading-relaxed">
                  {stepItem.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#EAE3D8] text-[10px] uppercase tracking-widest text-[#8C7D75] font-mono">
                Atelier Phase {stepItem.step}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Lumé Feature Banner */}
      <section className="bg-[#2C221E] text-[#FAF9F6] p-8 sm:p-14 border border-[#D4AF37]/30 relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
            Wear It for a Lifetime
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF9F6] font-normal tracking-tight mb-4">
            Jewelry Designed to Be Lived In
          </h2>
          <p className="text-xs sm:text-sm text-[#D8CEBE] font-sans font-light leading-relaxed mb-8">
            Unlike plated fashion jewelry meant to be discarded after a season, Lumé creations are fortified with generous 3.0-micron gold vermeil layers and heirloom-tested solder joints. We invite you to experience the tactile resonance of genuine handmade artistry.
          </p>

          <button
            onClick={() => onNavigate({ name: 'shop' })}
            className="py-3 px-8 bg-[#D4AF37] hover:bg-[#C59F2D] text-[#2C221E] text-xs font-sans uppercase tracking-widest font-semibold flex items-center gap-2 transition-colors shadow-sm"
          >
            <span>Explore All Creations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
