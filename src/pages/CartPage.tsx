import React, { useState } from 'react';
import { PageRoute } from '../types/jewelry';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Gift,
  ArrowLeft
} from 'lucide-react';

interface CartPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenCheckout: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate, onOpenCheckout }) => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discountAmount,
    promoCode,
    applyPromoCode,
    shippingCost,
    amountNeededForFreeShipping,
    shippingThreshold,
    total
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [giftNote, setGiftNote] = useState('');
  const [includeGiftBox, setIncludeGiftBox] = useState(true);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    setPromoFeedback(res);
  };

  const progressPercent = Math.min(100, Math.round((subtotal / shippingThreshold) * 100));

  return (
    <div className="bg-[#FAF9F6] text-[#2C221E] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-sans text-[#8C7D75] mb-6">
        <button onClick={() => onNavigate({ name: 'home' })} className="hover:text-[#2C221E] transition-colors">
          Home
        </button>
        <ChevronRight className="w-3 h-3" />
        <button onClick={() => onNavigate({ name: 'shop' })} className="hover:text-[#2C221E] transition-colors">
          Shop
        </button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#2C221E] font-medium">Your Shopping Bag</span>
      </nav>

      <div className="border-b border-[#EAE3D8] pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] block mb-1">
            Order Review
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#2C221E] font-normal tracking-tight">
            Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
          </h1>
        </div>

        {cart.length > 0 && (
          <button
            onClick={() => onNavigate({ name: 'shop' })}
            className="text-xs font-sans text-[#8C7D75] hover:text-[#2C221E] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="py-24 text-center bg-[#F4F0EA] border border-[#EAE3D8] p-8 max-w-xl mx-auto my-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FAF9F6] flex items-center justify-center text-[#8C7D75]">
            <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
          </div>
          <h2 className="font-serif text-2xl text-[#2C221E] mb-2">Your shopping bag is currently empty</h2>
          <p className="text-xs text-[#8C7D75] font-sans max-w-sm mx-auto mb-8 leading-relaxed">
            Discover our handmade fine jewelry handcrafted in 18k solid gold vermeil, natural baroque pearls, and untreated gemstones.
          </p>
          <button
            onClick={() => onNavigate({ name: 'shop' })}
            className="py-3 px-8 bg-[#2C221E] hover:bg-[#382C26] text-[#FAF9F6] text-xs font-sans uppercase tracking-widest transition-colors font-medium border border-[#D4AF37]/30 shadow-sm"
          >
            Explore the Collection
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Selected Items List */}
          <div className="lg:col-span-8 space-y-6">
            {/* Free Shipping Progress Meter */}
            <div className="bg-[#FAF5EB] p-4 border border-[#D4AF37]/20">
              {amountNeededForFreeShipping > 0 ? (
                <div>
                  <div className="flex items-center justify-between text-xs font-sans text-[#5A4A42] mb-2">
                    <span>
                      Add <strong className="text-[#2C221E] font-semibold">${amountNeededForFreeShipping}</strong> more to qualify for <strong>Complimentary Express Shipping</strong>
                    </span>
                    <span className="font-mono text-xs text-[#D4AF37] font-semibold">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-[#EAE3D8] h-2 overflow-hidden">
                    <div
                      className="bg-[#D4AF37] h-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs font-sans text-[#2C221E] font-medium">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Congratulations! You qualify for <strong>Complimentary Tracked & Insured Shipping</strong>.</span>
                </div>
              )}
            </div>

            {/* Table of Items */}
            <div className="bg-[#FAF9F6] border border-[#EAE3D8] divide-y divide-[#EAE3D8]">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}`} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  {/* Thumbnail */}
                  <div
                    onClick={() => onNavigate({ name: 'product', id: item.product.id })}
                    className="w-20 h-24 sm:w-24 sm:h-28 shrink-0 bg-[#F4F0EA] border border-[#EAE3D8] cursor-pointer overflow-hidden group"
                  >
                    <ImageWithFallback
                      src={item.product.galleryImages[0]}
                      alt={item.product.name}
                      containerClassName="w-full h-full"
                      className="group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C7D75]">
                      {item.product.category}
                    </span>
                    <h3
                      onClick={() => onNavigate({ name: 'product', id: item.product.id })}
                      className="font-serif text-lg text-[#2C221E] hover:text-[#D4AF37] cursor-pointer transition-colors leading-snug truncate"
                    >
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-[#8C7D75] font-sans mt-0.5">
                      Finish: <span className="text-[#2C221E] font-medium">{item.selectedColor}</span>
                    </p>
                    <p className="text-[11px] text-[#5A4A42] font-sans font-light mt-1 line-clamp-1">
                      {item.product.materials}
                    </p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#EAE3D8] bg-[#F4F0EA]">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.selectedColor, item.quantity - 1)
                      }
                      className="p-2 text-[#5A4A42] hover:text-[#2C221E] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center text-xs font-mono tabular-nums text-[#2C221E] font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.selectedColor, item.quantity + 1)
                      }
                      className="p-2 text-[#5A4A42] hover:text-[#2C221E] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="sm:text-right flex sm:flex-col justify-between w-full sm:w-auto items-center sm:items-end">
                    <span className="font-sans font-semibold text-base text-[#2C221E] tabular-nums">
                      ${item.product.price * item.quantity} USD
                    </span>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                      className="text-[#8C7D75] hover:text-[#D00D00] text-xs font-sans flex items-center gap-1 mt-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Gift Options Note Box */}
            <div className="bg-[#F4F0EA] p-6 border border-[#EAE3D8] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#D4AF37]" />
                  <h4 className="font-serif text-base text-[#2C221E]">Complimentary Gift Box & Note</h4>
                </div>
                <label className="flex items-center gap-2 text-xs font-sans text-[#5A4A42] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeGiftBox}
                    onChange={(e) => setIncludeGiftBox(e.target.checked)}
                    className="accent-[#D4AF37]"
                  />
                  <span>Include Embossed Linen Box</span>
                </label>
              </div>

              <div>
                <label className="block text-[11px] font-sans uppercase tracking-wider text-[#8C7D75] mb-1">
                  Handwritten Calligraphy Gift Card Message (Optional)
                </label>
                <textarea
                  rows={2}
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Leave a personalized message to be penned on heavyweight textured cotton cardstock..."
                  className="w-full bg-[#FAF9F6] border border-[#EAE3D8] p-3 text-xs font-sans text-[#2C221E] placeholder:text-[#8C7D75] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout Action */}
          <div className="lg:col-span-4 bg-[#F4F0EA] border border-[#EAE3D8] p-6 sm:p-8 sticky top-28">
            <h3 className="font-serif text-2xl text-[#2C221E] mb-4 pb-3 border-b border-[#EAE3D8]">
              Order Summary
            </h3>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="mb-6">
              <label className="block text-[11px] font-sans uppercase tracking-wider text-[#8C7D75] mb-1.5">
                Collector Promo Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="e.g. LUME15"
                  className="flex-1 bg-[#FAF9F6] border border-[#EAE3D8] px-3 py-2 text-xs font-sans text-[#2C221E] focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="py-2 px-4 bg-[#2C221E] hover:bg-[#382C26] text-[#FAF9F6] text-xs font-sans uppercase tracking-wider transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoFeedback && (
                <p
                  className={`text-[11px] mt-1.5 font-sans ${
                    promoFeedback.success ? 'text-[#058900]' : 'text-[#D00D00]'
                  }`}
                >
                  {promoFeedback.message}
                </p>
              )}
              {promoCode && !promoFeedback && (
                <p className="text-[11px] mt-1.5 text-[#058900] font-sans">
                  Code <strong>{promoCode}</strong> applied.
                </p>
              )}
            </form>

            {/* Cost Breakdown */}
            <div className="space-y-3 text-xs font-sans text-[#5A4A42] border-t border-[#EAE3D8] pt-4 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-sm text-[#2C221E] tabular-nums">${subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#058900]">
                  <span>Atelier Promo Discount</span>
                  <span className="font-mono text-sm tabular-nums">-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Insured Express Shipping</span>
                <span className="font-mono text-sm text-[#2C221E] tabular-nums">
                  {shippingCost === 0 ? (
                    <span className="text-[#058900] font-medium">Complimentary</span>
                  ) : (
                    `$${shippingCost}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#2C221E] pt-3 border-t border-[#EAE3D8]">
                <span className="font-serif text-lg">Estimated Total</span>
                <span className="font-mono text-lg tabular-nums">${total} USD</span>
              </div>
            </div>

            {/* Prominent Checkout Button */}
            <button
              type="button"
              onClick={onOpenCheckout}
              className="w-full py-4 px-6 bg-[#D4AF37] hover:bg-[#C59F2D] text-[#2C221E] font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors mb-4"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="space-y-2 text-[11px] text-[#8C7D75] font-sans pt-3 border-t border-[#EAE3D8]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>256-Bit Bank Grade Encryption</span>
              </div>
              <p className="font-light">
                Every piece is insured during transit and protected by our 30-Day trial policy and Lifetime Atelier Warranty.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
