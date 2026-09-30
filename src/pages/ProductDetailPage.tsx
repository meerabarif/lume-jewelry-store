import React, { useState } from 'react';
import { PageRoute } from '../types/jewelry';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { RatingStars } from '../components/common/RatingStars';
import { ProductCard } from '../components/common/ProductCard';
import {
  ChevronRight,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  ChevronDown,
  Check,
  Share2
} from 'lucide-react';

interface ProductDetailPageProps {
  productId: number;
  onNavigate: (route: PageRoute) => void;
  onOpenCheckout: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onNavigate,
  onOpenCheckout
}) => {
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const { addToCart, isInWishlist, toggleWishlist } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colorOptions[0] || 'Champagne Gold'
  );
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('materials');
  const [copiedLink, setCopiedLink] = useState(false);

  // New review input state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [localReviews, setLocalReviews] = useState(product.reviews);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Related products from same category or complementary
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const isFavorited = isInWishlist(product.id);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity, true);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, quantity, false);
    onOpenCheckout();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev = {
      id: `user-rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: 'Just now',
      verified: true,
      title: newReviewTitle.trim() || 'Remarkable Handcrafted Quality',
      comment: newReviewComment.trim()
    };

    setLocalReviews([newRev, ...localReviews]);
    setReviewSubmitted(true);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
  };

  return (
    <div className="bg-[#FAF9F6] text-[#2C221E] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-sans text-[#8C7D75] mb-8">
        <button onClick={() => onNavigate({ name: 'home' })} className="hover:text-[#2C221E] transition-colors">
          Home
        </button>
        <ChevronRight className="w-3 h-3" />
        <button onClick={() => onNavigate({ name: 'shop' })} className="hover:text-[#2C221E] transition-colors">
          Shop
        </button>
        <ChevronRight className="w-3 h-3" />
        <button
          onClick={() => onNavigate({ name: 'category', category: product.category })}
          className="hover:text-[#2C221E] capitalize transition-colors"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#2C221E] font-medium truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main Two-Column Product Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pb-16 border-b border-[#EAE3D8]">
        {/* Left: Gallery & Thumbnail Selector */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Vertical Thumbnail Strip */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
            {product.galleryImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-20 sm:w-20 sm:h-24 bg-[#F4F0EA] border overflow-hidden transition-all shrink-0 ${
                  activeImageIndex === idx
                    ? 'border-[#2C221E] ring-1 ring-[#2C221E]'
                    : 'border-[#EAE3D8] opacity-75 hover:opacity-100 hover:border-[#D4AF37]'
                }`}
              >
                <ImageWithFallback
                  src={img}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  containerClassName="w-full h-full"
                />
              </button>
            ))}
          </div>

          {/* Primary Viewport Image */}
          <div className="flex-1 relative aspect-[4/5] bg-[#F4F0EA] border border-[#EAE3D8] overflow-hidden">
            <ImageWithFallback
              src={product.galleryImages[activeImageIndex] || product.galleryImages[0]}
              alt={product.name}
              containerClassName="w-full h-full"
              className="w-full h-full object-cover transition-all duration-500"
            />

            {/* Badges & Actions */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              {product.isBestSeller && (
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#D4AF37] bg-[#2C221E]/95 px-2.5 py-1">
                  Atelier Bestseller
                </span>
              )}
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#2C221E] bg-[#FAF9F6]/90 px-2.5 py-0.5 border border-[#EAE3D8]">
                Handmade in Studio
              </span>
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
                onClick={handleShare}
                aria-label="Share product"
                title="Copy share link"
                className="p-2.5 rounded-full bg-[#FAF9F6]/90 backdrop-blur-sm text-[#2C221E] hover:text-[#D4AF37] shadow-xs transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
                className="p-2.5 rounded-full bg-[#FAF9F6]/90 backdrop-blur-sm text-[#2C221E] hover:text-[#D4AF37] shadow-xs transition-colors"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorited ? 'fill-[#D4AF37] text-[#D4AF37]' : ''
                  }`}
                />
              </button>
            </div>

            {copiedLink && (
              <div className="absolute bottom-4 inset-x-4 p-2 bg-[#2C221E] text-[#FAF9F6] text-center text-xs font-sans">
                Product link copied to clipboard!
              </div>
            )}
          </div>
        </div>

        {/* Right: Contiguous Purchase & Story Module */}
        <div className="lg:col-span-5 flex flex-col">
          {/* Header Info */}
          <div className="border-b border-[#EAE3D8] pb-6 mb-6">
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
              Lumé Atelier · {product.category}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#2C221E] font-normal leading-tight tracking-tight mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-4">
              <RatingStars rating={product.rating} count={localReviews.length} size="md" />
              <span className="text-xs text-[#8C7D75]">·</span>
              <span className="text-xs text-[#058900] font-sans font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> In Stock & Ready to Ship
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl text-[#2C221E] font-normal tabular-nums">
                ${product.price}
              </span>
              <span className="text-xs text-[#8C7D75] font-sans">USD (Taxes included at checkout)</span>
            </div>
          </div>

          {/* Narrative Storytelling */}
          <div className="mb-6">
            <p className="text-xs sm:text-sm text-[#5A4A42] font-sans font-light leading-relaxed mb-3">
              {product.description}
            </p>
            <p className="text-xs text-[#8C7D75] font-serif italic border-l-2 border-[#D4AF37]/50 pl-3 py-0.5">
              “{product.story}”
            </p>
          </div>

          {/* Color Variant Selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-sans mb-2.5">
              <span className="text-[#8C7D75] uppercase tracking-wider text-[11px]">Select Metal Finish:</span>
              <span className="font-medium text-[#2C221E]">{selectedColor}</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {product.colorOptions.map((color) => {
                const isSelected = selectedColor === color;
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`py-2 px-3 text-xs font-sans text-center border transition-all ${
                      isSelected
                        ? 'bg-[#2C221E] text-[#FAF9F6] border-[#2C221E]'
                        : 'bg-[#F4F0EA] text-[#5A4A42] border-[#EAE3D8] hover:border-[#D4AF37]'
                    }`}
                  >
                    {color}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector & CTAs */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#EAE3D8] bg-[#F4F0EA]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-[#5A4A42] hover:text-[#2C221E] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-12 text-center text-xs font-mono tabular-nums text-[#2C221E] font-semibold">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-[#5A4A42] hover:text-[#2C221E] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 bg-[#2C221E] hover:bg-[#382C26] text-[#FAF9F6] text-xs font-sans uppercase tracking-widest font-medium flex items-center justify-center gap-2 border border-[#D4AF37]/30 transition-all shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                <span>Add to Shopping Bag</span>
              </button>
            </div>

            {/* Buy Now CTA */}
            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full py-3.5 px-6 bg-[#D4AF37] hover:bg-[#C59F2D] text-[#2C221E] text-xs font-sans uppercase tracking-widest font-semibold transition-colors shadow-xs"
            >
              Instant Buy Now · ${product.price * quantity} USD
            </button>
          </div>

          {/* Shipping & Delivery Info Box */}
          <div className="bg-[#FAF5EB] p-4 border border-[#D4AF37]/30 mb-8 space-y-2 text-xs font-sans">
            <div className="flex items-center gap-2 text-[#2C221E] font-medium">
              <Truck className="w-4 h-4 text-[#D4AF37]" />
              <span>Complimentary Express Shipping on orders over $150</span>
            </div>
            <p className="text-[11px] text-[#5A4A42] pl-6 font-light">
              Crafted and inspected in 1–2 business days. Tracked courier transit across US & EU within 2–4 business days.
            </p>
            <div className="flex items-center gap-4 text-[11px] text-[#8C7D75] pl-6 pt-1 border-t border-[#D4AF37]/20">
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3 h-3 text-[#D4AF37]" /> 30-Day Returns
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#D4AF37]" /> Lifetime Atelier Warranty
              </span>
            </div>
          </div>

          {/* Expandable Accordions: Materials & Sizing Details */}
          <div className="border-t border-[#EAE3D8] divide-y divide-[#EAE3D8]">
            {/* Materials Accordion */}
            <div className="py-3">
              <button
                type="button"
                onClick={() => toggleAccordion('materials')}
                className="w-full flex items-center justify-between text-xs font-sans uppercase tracking-wider text-[#2C221E] py-1 text-left"
              >
                <span className="font-semibold">Materials & Noble Metals</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#8C7D75] transition-transform ${
                    openAccordion === 'materials' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'materials' && (
                <div className="pt-2 pb-1 text-xs text-[#5A4A42] font-sans font-light leading-relaxed">
                  <p className="mb-2">{product.materials}</p>
                  <p className="text-[11px] text-[#8C7D75]">
                    All alloys are certified 100% hypoallergenic, nickel-free, cadmium-free, and lead-free. Sealed with an invisible organic ceramic coating to resist tarnishing from sea salt and air.
                  </p>
                </div>
              )}
            </div>

            {/* Sizing Details Accordion */}
            <div className="py-3">
              <button
                type="button"
                onClick={() => toggleAccordion('sizing')}
                className="w-full flex items-center justify-between text-xs font-sans uppercase tracking-wider text-[#2C221E] py-1 text-left"
              >
                <span className="font-semibold">Sizing & Dimensions</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#8C7D75] transition-transform ${
                    openAccordion === 'sizing' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'sizing' && (
                <div className="pt-2 pb-1 text-xs text-[#5A4A42] font-sans font-light leading-relaxed">
                  <p className="mb-2">{product.sizingDetails}</p>
                  <p className="text-[11px] text-[#8C7D75]">
                    Need custom chain lengths or a half ring size? Contact our atelier concierge via the contact page for bespoke tailoring at no extra charge.
                  </p>
                </div>
              )}
            </div>

            {/* Care Guide Accordion */}
            <div className="py-3">
              <button
                type="button"
                onClick={() => toggleAccordion('care')}
                className="w-full flex items-center justify-between text-xs font-sans uppercase tracking-wider text-[#2C221E] py-1 text-left"
              >
                <span className="font-semibold">Heirloom Care Guide</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#8C7D75] transition-transform ${
                    openAccordion === 'care' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'care' && (
                <div className="pt-2 pb-1 text-xs text-[#5A4A42] font-sans font-light leading-relaxed space-y-1.5">
                  <p>• Avoid contact with perfumes, hairsprays, and harsh detergents.</p>
                  <p>• Clean gently with the micro-suede polishing cloth provided.</p>
                  <p>• Store inside your velvet Lumé pouch to prevent scratches.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="py-16 border-b border-[#EAE3D8]">
        <div className="max-w-4xl mx-auto text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-[#EAE3D8]">
            <div>
              <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] block mb-1">
                Verified Feedback
              </span>
              <h3 className="font-serif text-3xl text-[#2C221E] font-normal tracking-tight">
                Customer Reviews
              </h3>
            </div>
            <div className="mt-3 sm:mt-0 flex items-center gap-3">
              <RatingStars rating={product.rating} size="lg" />
              <span className="text-xs font-sans text-[#8C7D75]">
                {localReviews.length} reviews
              </span>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6 mb-12 divide-y divide-[#EAE3D8]">
            {localReviews.map((rev) => (
              <div key={rev.id} className="pt-6 first:pt-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-semibold text-xs text-[#2C221E]">
                      {rev.author}
                    </span>
                    {rev.verified && (
                      <span className="text-[10px] text-[#058900] font-sans font-medium flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Verified Buyer
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#8C7D75] font-sans">{rev.date}</span>
                </div>

                <div className="mb-2">
                  <RatingStars rating={rev.rating} size="sm" showCountText={false} />
                </div>

                <h4 className="font-serif text-base text-[#2C221E] mb-1 font-medium">{rev.title}</h4>
                <p className="text-xs sm:text-sm text-[#5A4A42] font-sans font-light leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>

          {/* Add a Review Form */}
          <div className="bg-[#F4F0EA] p-6 sm:p-8 border border-[#EAE3D8]">
            <h4 className="font-serif text-xl text-[#2C221E] mb-1">Share Your Experience</h4>
            <p className="text-xs text-[#8C7D75] font-sans mb-4">
              Have you received this Lumé creation? We cherish your reflections on craftsmanship and wear.
            </p>

            {reviewSubmitted ? (
              <div className="p-4 bg-[#FAF9F6] border border-[#058900]/40 text-xs text-[#058900] font-sans">
                Thank you! Your verified review has been recorded and published above.
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider text-[#8C7D75] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      placeholder="e.g. Genevieve Laurent"
                      className="w-full bg-[#FAF9F6] border border-[#EAE3D8] px-3 py-2 text-xs font-sans text-[#2C221E] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider text-[#8C7D75] mb-1">
                      Rating
                    </label>
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="w-full bg-[#FAF9F6] border border-[#EAE3D8] px-3 py-2 text-xs font-sans text-[#2C221E] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value={5}>5 Stars — Flawless Heirloom</option>
                      <option value={4}>4 Stars — Very Beautiful</option>
                      <option value={3}>3 Stars — Average</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-wider text-[#8C7D75] mb-1">
                    Review Headline
                  </label>
                  <input
                    type="text"
                    value={newReviewTitle}
                    onChange={(e) => setNewReviewTitle(e.target.value)}
                    placeholder="e.g. Exquisite luster and comfortable wear"
                    className="w-full bg-[#FAF9F6] border border-[#EAE3D8] px-3 py-2 text-xs font-sans text-[#2C221E] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-wider text-[#8C7D75] mb-1">
                    Your Review
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="Describe the luster, weight, and feeling of wearing this piece..."
                    className="w-full bg-[#FAF9F6] border border-[#EAE3D8] px-3 py-2 text-xs font-sans text-[#2C221E] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="py-2.5 px-6 bg-[#2C221E] hover:bg-[#382C26] text-[#FAF9F6] text-xs font-sans uppercase tracking-widest transition-colors"
                >
                  Submit Patron Review
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Related Products Grid (3 items) */}
      <section className="pt-16 text-left">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] block mb-1">
              Harmonious Complements
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2C221E] font-normal tracking-tight">
              You May Also Adore
            </h3>
          </div>
          <button
            onClick={() => onNavigate({ name: 'shop' })}
            className="text-xs font-sans uppercase tracking-widest text-[#2C221E] hover:text-[#D4AF37] transition-colors"
          >
            Explore All Jewels →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {relatedProducts.map((relProduct) => (
            <ProductCard key={relProduct.id} product={relProduct} onNavigate={onNavigate} />
          ))}
        </div>
      </section>
    </div>
  );
};
