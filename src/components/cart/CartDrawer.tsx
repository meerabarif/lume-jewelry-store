import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { PageRoute } from '../../types/jewelry';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  onNavigate: (route: PageRoute) => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate, onOpenCheckout }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
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

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    setPromoFeedback(res);
  };

  const handleNavigateProduct = (id: number) => {
    setIsCartOpen(false);
    onNavigate({ name: 'product', id });
  };

  const handleViewFullCart = () => {
    setIsCartOpen(false);
    onNavigate({ name: 'cart' });
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    onOpenCheckout();
  };

  const progressPercent = Math.min(100, Math.round((subtotal / shippingThreshold) * 100));

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-[#2C221E]/60 backdrop-blur-xs transition-opacity duration-300"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-[#FAF9F6] border-l border-[#EAE3D8] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#EAE3D8] flex items-center justify-between bg-[#F4F0EA]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="font-serif text-xl font-normal text-[#2C221E]">Shopping Bag</h2>
              <span className="text-xs font-mono text-[#8C7D75] tabular-nums">
                ({cart.reduce((a, b) => a + b.quantity, 0)})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#8C7D75] hover:text-[#2C221E] transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-[#FAF5EB] px-6 py-3 border-b border-[#D4AF37]/20">
            {amountNeededForFreeShipping > 0 ? (
              <div>
                <p className="text-xs font-sans text-[#5A4A42] mb-1.5 flex items-center justify-between">
                  <span>Add <strong className="text-[#2C221E] font-semibold">${amountNeededForFreeShipping}</strong> more for complimentary shipping</span>
                  <span className="text-[10px] text-[#D4AF37] font-mono">{progressPercent}%</span>
                </p>
                <div className="w-full bg-[#EAE3D8] h-1.5 overflow-hidden">
                  <div
                    className="bg-[#D4AF37] h-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-[#2C221E] font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>You’ve unlocked <strong>Complimentary Insured Express Shipping!</strong></span>
              </div>
            )}
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#EAE3D8]">
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F4F0EA] flex items-center justify-center text-[#8C7D75]">
                  <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
                </div>
                <p className="font-serif text-xl text-[#2C221E] mb-2">Your shopping bag is empty</p>
                <p className="text-xs text-[#8C7D75] font-sans max-w-xs mx-auto mb-6">
                  Discover our timeless handcrafted necklaces, bangles, and solitaire rings.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigate({ name: 'shop' });
                  }}
                  className="py-2.5 px-6 bg-[#2C221E] text-[#FAF9F6] text-xs font-sans uppercase tracking-widest hover:bg-[#382C26] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}`} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div
                    onClick={() => handleNavigateProduct(item.product.id)}
                    className="w-20 h-24 shrink-0 bg-[#F4F0EA] border border-[#EAE3D8] cursor-pointer overflow-hidden group"
                  >
                    <ImageWithFallback
                      src={item.product.galleryImages[0]}
                      alt={item.product.name}
                      containerClassName="w-full h-full"
                      className="group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => handleNavigateProduct(item.product.id)}
                          className="font-serif text-base text-[#2C221E] hover:text-[#D4AF37] cursor-pointer transition-colors leading-tight line-clamp-1"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                          aria-label="Remove item"
                          className="text-[#8C7D75] hover:text-[#D00D00] p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-[#8C7D75] font-sans mt-0.5">
                        Finish: <span className="text-[#2C221E] font-medium">{item.selectedColor}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#EAE3D8]/50">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#EAE3D8] bg-[#F4F0EA]">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedColor, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          className="p-1.5 text-[#5A4A42] hover:text-[#2C221E] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono tabular-nums text-[#2C221E]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedColor, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="p-1.5 text-[#5A4A42] hover:text-[#2C221E] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-sans font-medium text-sm text-[#2C221E] tabular-nums">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Calculations */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#EAE3D8] bg-[#F4F0EA]">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Promo code (e.g. LUME15)"
                    className="flex-1 bg-[#FAF9F6] border border-[#EAE3D8] px-3 py-1.5 text-xs font-sans text-[#2C221E] focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#2C221E] text-[#FAF9F6] text-xs font-sans uppercase tracking-wider hover:bg-[#382C26] transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoFeedback && (
                  <p
                    className={`text-[11px] mt-1 font-sans ${
                      promoFeedback.success ? 'text-[#058900]' : 'text-[#D00D00]'
                    }`}
                  >
                    {promoFeedback.message}
                  </p>
                )}
                {promoCode && !promoFeedback && (
                  <p className="text-[11px] mt-1 text-[#058900] font-sans">
                    Code <strong>{promoCode}</strong> applied.
                  </p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#5A4A42] font-sans mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#2C221E] tabular-nums">${subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#058900]">
                    <span>Artisan Promo Discount</span>
                    <span className="font-mono tabular-nums">-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-mono text-[#2C221E] tabular-nums">
                    {shippingCost === 0 ? (
                      <span className="text-[#058900] font-medium">Free</span>
                    ) : (
                      `$${shippingCost}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium text-[#2C221E] pt-2 border-t border-[#EAE3D8]">
                  <span className="font-serif text-base">Total</span>
                  <span className="font-mono text-base tabular-nums">${total} USD</span>
                </div>
              </div>

              {/* Checkout CTAs */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 px-4 bg-[#D4AF37] hover:bg-[#C59F2D] text-[#2C221E] font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleViewFullCart}
                  className="w-full py-2.5 text-center text-xs font-sans text-[#5A4A42] hover:text-[#2C221E] transition-colors underline underline-offset-4"
                >
                  View Full Cart Page & Order Summary
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-[#8C7D75]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> Secure Checkout
                </span>
                <span>·</span>
                <span>Lifetime Warranty</span>
                <span>·</span>
                <span>30-Day Returns</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
