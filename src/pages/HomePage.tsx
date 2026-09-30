import React, { useState } from 'react';
import { PageRoute, ProductCategory } from '../types/jewelry';
import { PRODUCTS, CATEGORIES, TESTIMONIALS, INSTAGRAM_PHOTOS, heroImg, artisanImg } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { RatingStars } from '../components/common/RatingStars';
import { ArrowRight, ShieldCheck, Sparkles, Award, RefreshCw, Gift, Instagram } from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterJoined, setNewsletterJoined] = useState(false);

  // Top 4 featured items
  const featuredProducts = PRODUCTS.slice(0, 4);

  // Top 4 best sellers (sorted by rating / reviewCount)
  const bestSellers = [...PRODUCTS]
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, 4);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;
    setNewsletterJoined(true);
    setNewsletterEmail('');
  };

  return (
    <div className="bg-[#FAF9F6] text-[#2C221E] transition-colors">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-[#F4F0EA] border-b border-[#EAE3D8]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[660px]">
          {/* Hero Copy (Left) */}
          <div className="lg:col-span-5 flex flex-col justify-center px-6 sm:px-12 py-12 lg:py-20 z-10 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] mb-4">
              <span className="w-6 h-px bg-[#D4AF37]" />
              <span>Atelier Collection 2026</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2C221E] font-normal leading-[1.1] tracking-tight mb-6">
              Timeless Artisanal Jewelry Made for You
            </h1>

            <p className="text-sm sm:text-base text-[#5A4A42] font-sans font-light leading-relaxed mb-8 max-w-md">
              Each piece is individually forged in solid 18k gold vermeil and adorned with organic Mediterranean freshwater pearls—created to feel intimate, delicate, and enduring.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate({ name: 'shop' })}
                className="py-3.5 px-8 bg-[#2C221E] hover:bg-[#382C26] text-[#FAF9F6] text-xs font-sans uppercase tracking-widest flex items-center justify-center gap-3 border border-[#D4AF37]/30 transition-all shadow-sm group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate({ name: 'about' })}
                className="py-3.5 px-6 text-[#2C221E] hover:text-[#D4AF37] text-xs font-sans uppercase tracking-widest border border-[#EAE3D8] hover:border-[#D4AF37] transition-all bg-[#FAF9F6]/50"
              >
                Our Craft Philosophy
              </button>
            </div>

            {/* Micro Credibility Badges */}
            <div className="mt-12 pt-6 border-t border-[#EAE3D8] flex items-center gap-6 text-[11px] text-[#8C7D75] font-sans">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                100% Recycled Gold
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                Lifetime Guarantee
              </span>
            </div>
          </div>

          {/* Hero Imagery (Right) */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-full overflow-hidden">
            <ImageWithFallback
              src={heroImg}
              alt="Lumé Mediterranean campaign featuring handcrafted 18k gold necklace with baroque pearl"
              containerClassName="w-full h-full"
              className="w-full h-full object-cover object-center"
            />
            {/* Soft luxury vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C221E]/30 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 right-6 hidden sm:block bg-[#FAF9F6]/90 backdrop-blur-md p-4 border border-[#EAE3D8] max-w-xs text-left shadow-lg">
              <p className="text-[10px] uppercase tracking-widest text-[#8C7D75] font-sans mb-1">
                Featured Atelier Creation
              </p>
              <h4 className="font-serif text-base text-[#2C221E] leading-snug">
                Aura Baroque Pearl Choker
              </h4>
              <p className="text-xs text-[#5A4A42] font-mono mt-1 font-medium">$185 USD · 18k Solid Vermeil</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left">
          <div>
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
              Curated Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C221E] font-normal tracking-tight">
              Featured Creations
            </h2>
          </div>
          <button
            onClick={() => onNavigate({ name: 'shop' })}
            className="mt-4 md:mt-0 text-xs font-sans uppercase tracking-widest text-[#2C221E] hover:text-[#D4AF37] flex items-center gap-1.5 transition-colors group"
          >
            <span>View All Jewelry</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      {/* 3. Shop by Category (Visual Cards) */}
      <section className="py-16 bg-[#F4F0EA] border-y border-[#EAE3D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
              Explore Our Taxonomy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C221E] font-normal tracking-tight mb-3">
              Shop by Category
            </h2>
            <p className="text-xs sm:text-sm text-[#5A4A42] font-sans font-light">
              Sculptural forms crafted to accompany you through every gesture and celebration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((category) => (
              <div
                key={category.slug}
                onClick={() => onNavigate({ name: 'category', category: category.slug })}
                className="group relative cursor-pointer overflow-hidden bg-[#FAF9F6] border border-[#EAE3D8] hover:border-[#D4AF37] transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[4/5] w-full overflow-hidden bg-[#EAE3D8]">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.title}
                    containerClassName="w-full h-full"
                    className="group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C221E]/80 via-[#2C221E]/20 to-transparent transition-opacity group-hover:from-[#2C221E]/90" />
                </div>

                <div className="absolute bottom-0 inset-x-0 p-5 text-left text-[#FAF9F6]">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-[#D4AF37] block mb-1">
                    {category.count} Pieces
                  </span>
                  <h3 className="font-serif text-2xl text-[#FAF9F6] font-normal mb-1 group-hover:translate-x-1 transition-transform">
                    {category.title}
                  </h3>
                  <p className="text-xs text-[#D8CEBE] font-sans font-light line-clamp-1 opacity-90">
                    {category.tagline}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-sans uppercase tracking-wider text-[#D4AF37] group-hover:underline">
                    Discover Collection <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Best Sellers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left">
          <div>
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
              Beloved by Collectors
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C221E] font-normal tracking-tight">
              Best Sellers
            </h2>
          </div>
          <p className="mt-2 md:mt-0 text-xs sm:text-sm text-[#8C7D75] font-sans max-w-md">
            Our most cherished heirloom silhouettes, hand-carved in wax and cast in molten 18k solid gold.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      {/* 5. Why Choose Lumé (4 Pillars) */}
      <section className="py-20 bg-[#FAF5EB] border-y border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
              Our Commitments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C221E] font-normal tracking-tight mb-3">
              Why Choose Lumé
            </h2>
            <p className="text-xs sm:text-sm text-[#5A4A42] font-sans font-light">
              We reject mass production in favor of human intentionality, ethical sourcing, and lifelong wearability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            <div className="bg-[#FAF9F6] p-8 border border-[#EAE3D8] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#F4F0EA] flex items-center justify-center text-[#D4AF37] mb-5">
                  <Award className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-xl text-[#2C221E] mb-2">Handcrafted Quality</h3>
                <p className="text-xs text-[#5A4A42] font-sans font-light leading-relaxed">
                  Every jewel is sculpted in wax and hand-finished with meticulous precision by seasoned goldsmiths at our bench atelier.
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest mt-6 block">
                01 · Small Batch Cast
              </span>
            </div>

            <div className="bg-[#FAF9F6] p-8 border border-[#EAE3D8] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#F4F0EA] flex items-center justify-center text-[#D4AF37] mb-5">
                  <Sparkles className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-xl text-[#2C221E] mb-2">Sustainable Sourcing</h3>
                <p className="text-xs text-[#5A4A42] font-sans font-light leading-relaxed">
                  Crafted exclusively with 100% recycled precious metals, conflict-free stones, and eco-certified cultured freshwater pearls.
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest mt-6 block">
                02 · Eco-Conscious
              </span>
            </div>

            <div className="bg-[#FAF9F6] p-8 border border-[#EAE3D8] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#F4F0EA] flex items-center justify-center text-[#D4AF37] mb-5">
                  <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-xl text-[#2C221E] mb-2">Lifetime Warranty</h3>
                <p className="text-xs text-[#5A4A42] font-sans font-light leading-relaxed">
                  We stand irrevocably behind our work. Includes complimentary cleaning, re-polishing, and chain repairs for life.
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest mt-6 block">
                03 · Heirloom Guarantee
              </span>
            </div>

            <div className="bg-[#FAF9F6] p-8 border border-[#EAE3D8] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#F4F0EA] flex items-center justify-center text-[#D4AF37] mb-5">
                  <Gift className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-xl text-[#2C221E] mb-2">Elegant Gift Packaging</h3>
                <p className="text-xs text-[#5A4A42] font-sans font-light leading-relaxed">
                  Every jewel arrives enveloped in an embossed ivory linen box with velvet interior, silk ribbons, and a suede travel pouch.
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest mt-6 block">
                04 · Atelier Packaging
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Atelier Craftsmanship Spotlight */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden border border-[#EAE3D8]">
            <ImageWithFallback
              src={artisanImg}
              alt="Artisan jeweler hand-polishing delicate gold pieces at an antique wooden workbench"
              containerClassName="w-full h-full"
            />
          </div>

          <div className="lg:col-span-6 text-left">
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
              Inside Our Workshop
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C221E] font-normal tracking-tight mb-5">
              Born from Passion for Delicate Craftsmanship
            </h2>
            <p className="text-xs sm:text-sm text-[#5A4A42] font-sans font-light leading-relaxed mb-6">
              In our quiet studio, time moves at the rhythm of the jeweler’s saw and soldering flame. We believe true luxury lies not in mass repetition, but in the subtle variations left by human hands—a soft hammer strike on a gold band, the irregular contours of an Aegean pearl, the warmth of metal burnished by eye.
            </p>
            <div className="space-y-3 mb-8 text-xs font-sans text-[#2C221E]">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>Cast in micro-batches to guarantee zero metal waste</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>Each baroque pearl handpicked for unique orient and luster</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>3.0-micron 18k solid gold vermeil for enduring brilliance</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate({ name: 'about' })}
              className="py-3 px-6 bg-[#2C221E] hover:bg-[#382C26] text-[#FAF9F6] text-xs font-sans uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              <span>Explore Our Story & Process</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Customer Reviews Carousel / Grid */}
      <section className="py-20 bg-[#F4F0EA] border-y border-[#EAE3D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
              Atelier Testimonials
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C221E] font-normal tracking-tight mb-2">
              Words from Our Collectors
            </h2>
            <div className="flex items-center justify-center gap-2 text-xs text-[#8C7D75]">
              <RatingStars rating={4.9} size="md" />
              <span>4.9 / 5.0 Average rating across 240+ verified patrons</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-[#FAF9F6] p-8 border border-[#EAE3D8] flex flex-col justify-between text-left"
              >
                <div>
                  <div className="mb-4">
                    <RatingStars rating={testimonial.rating} showCountText={false} size="sm" />
                  </div>
                  <p className="font-serif italic text-base text-[#2C221E] leading-relaxed mb-6">
                    “{testimonial.quote}”
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EAE3D8] text-xs">
                  <p className="font-sans font-semibold text-[#2C221E]">{testimonial.author}</p>
                  <p className="text-[#8C7D75] font-sans font-light">
                    {testimonial.city} · Purchased {testimonial.itemPurchased}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Instagram Gallery (6-Photo Aesthetic Grid) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] mb-2">
            <Instagram className="w-4 h-4" />
            <span>@lume.finejewelry</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C221E] font-normal tracking-tight">
            Follow the Atelier on Instagram
          </h2>
          <p className="text-xs text-[#5A4A42] font-sans font-light mt-2">
            Tag #LumeJewelry to be featured in our seasonal lookbook.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-square overflow-hidden bg-[#F4F0EA] border border-[#EAE3D8]"
            >
              <ImageWithFallback
                src={photo.url}
                alt={photo.caption}
                containerClassName="w-full h-full"
                className="group-hover:scale-110 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-[#2C221E]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center">
                <p className="text-[11px] font-sans text-[#FAF9F6] line-clamp-3">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Newsletter Signup */}
      <section className="py-20 bg-[#FAF5EB] border-t border-[#D4AF37]/30 text-center px-4">
        <div className="max-w-xl mx-auto">
          <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
            Stay Connected
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C221E] font-normal tracking-tight mb-3">
            Join the Lumé Society
          </h2>
          <p className="text-xs sm:text-sm text-[#5A4A42] font-sans font-light mb-8 leading-relaxed">
            Be the first to explore limited artisan releases, private trunk shows, and receive 10% off your inaugural order.
          </p>

          {newsletterJoined ? (
            <div className="p-4 bg-[#FAF9F6] border border-[#D4AF37] text-xs font-sans text-[#2C221E] shadow-sm">
              Thank you for subscribing. Your exclusive welcome gift code <strong>LUME10</strong> is now active.
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-[#FAF9F6] border border-[#EAE3D8] px-4 py-3 text-xs font-sans text-[#2C221E] placeholder:text-[#8C7D75] focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="py-3 px-8 bg-[#2C221E] hover:bg-[#382C26] text-[#FAF9F6] text-xs font-sans uppercase tracking-widest transition-colors font-medium border border-[#D4AF37]/30"
              >
                Join Lumé
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
