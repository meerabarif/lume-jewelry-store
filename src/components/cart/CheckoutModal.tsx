import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { X, ShieldCheck, CheckCircle2, Lock, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess
}) => {
  const { cart, subtotal, discountAmount, shippingCost, total, clearCart } = useCart();

  const [step, setStep] = useState<'details' | 'success'>('details');
  const [formData, setFormData] = useState({
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor.vance@example.com',
    address: '742 Evergreen Terrace, Suite 4B',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    cardName: 'Eleanor Vance',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '08/28',
    cvv: '•••'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrderId, setCompletedOrderId] = useState('');

  if (!isOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `LUME-${Math.floor(100000 + Math.random() * 900000)}`;
      setCompletedOrderId(orderId);
      setIsProcessing(false);
      setStep('success');
      clearCart();
      onOrderSuccess(orderId);
    }, 1200);
  };

  const handleClose = () => {
    setStep('details');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C221E]/75 backdrop-blur-sm overflow-y-auto"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-2xl bg-[#FAF9F6] border border-[#EAE3D8] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAE3D8] bg-[#F4F0EA]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-serif text-lg text-[#2C221E]">
              {step === 'details' ? 'Secure Atelier Checkout' : 'Order Confirmed'}
            </span>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close checkout"
            className="p-1 text-[#8C7D75] hover:text-[#2C221E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'details' ? (
          <form onSubmit={handleSubmitOrder} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Shipping & Payment Inputs */}
              <div className="space-y-4">
                <h3 className="font-serif text-sm text-[#2C221E] uppercase tracking-wider font-semibold border-b border-[#EAE3D8] pb-1.5">
                  1. Delivery Details
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider text-[#8C7D75] mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-[#F4F0EA] border border-[#EAE3D8] px-3 py-1.5 text-xs text-[#2C221E] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider text-[#8C7D75] mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-[#F4F0EA] border border-[#EAE3D8] px-3 py-1.5 text-xs text-[#2C221E] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-wider text-[#8C7D75] mb-1">
                    Email for Shipment Tracking
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F4F0EA] border border-[#EAE3D8] px-3 py-1.5 text-xs text-[#2C221E] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-wider text-[#8C7D75] mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#F4F0EA] border border-[#EAE3D8] px-3 py-1.5 text-xs text-[#2C221E] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-sans uppercase tracking-wider text-[#8C7D75] mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#F4F0EA] border border-[#EAE3D8] px-2 py-1.5 text-xs text-[#2C221E] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans uppercase tracking-wider text-[#8C7D75] mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-[#F4F0EA] border border-[#EAE3D8] px-2 py-1.5 text-xs text-[#2C221E] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans uppercase tracking-wider text-[#8C7D75] mb-1">
                      ZIP
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full bg-[#F4F0EA] border border-[#EAE3D8] px-2 py-1.5 text-xs text-[#2C221E] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <h3 className="font-serif text-sm text-[#2C221E] uppercase tracking-wider font-semibold border-b border-[#EAE3D8] pt-2 pb-1.5">
                  2. Payment Method
                </h3>
                <div className="p-3 bg-[#FAF5EB] border border-[#D4AF37]/30 text-xs text-[#5A4A42]">
                  <p className="font-medium text-[#2C221E] mb-1">Encrypted Payment Simulator</p>
                  <p className="text-[11px] text-[#8C7D75]">
                    No real charge will be incurred. All test card information is safely simulated.
                  </p>
                </div>
              </div>

              {/* Right Column: Order Summary */}
              <div className="bg-[#F4F0EA] p-5 border border-[#EAE3D8] flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-base text-[#2C221E] mb-3">Order Bag Summary</h4>

                  <div className="max-h-48 overflow-y-auto divide-y divide-[#EAE3D8] pr-1 mb-4">
                    {cart.map((item) => (
                      <div key={`${item.product.id}-${item.selectedColor}`} className="py-2.5 flex items-center gap-3">
                        <div className="w-12 h-14 shrink-0 bg-[#FAF9F6] border border-[#EAE3D8] overflow-hidden">
                          <ImageWithFallback
                            src={item.product.galleryImages[0]}
                            alt={item.product.name}
                            containerClassName="w-full h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="font-serif text-xs text-[#2C221E] truncate">
                            {item.product.name}
                          </p>
                          <p className="text-[10px] text-[#8C7D75]">
                            Qty: {item.quantity} · {item.selectedColor}
                          </p>
                        </div>
                        <span className="font-mono text-xs tabular-nums text-[#2C221E]">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5 text-xs text-[#5A4A42] border-t border-[#EAE3D8] pt-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono text-[#2C221E] tabular-nums">${subtotal}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#058900]">
                        <span>Promo Discount</span>
                        <span className="font-mono tabular-nums">-${discountAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Expedited Insured Shipping</span>
                      <span className="font-mono text-[#2C221E] tabular-nums">
                        {shippingCost === 0 ? 'Complimentary' : `$${shippingCost}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-[#2C221E] pt-2 border-t border-[#EAE3D8]">
                      <span className="font-serif text-base">Grand Total</span>
                      <span className="font-mono text-base tabular-nums">${total} USD</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EAE3D8]">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3 px-4 bg-[#D4AF37] hover:bg-[#C59F2D] text-[#2C221E] font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span>Authorizing Atelier Order...</span>
                    ) : (
                      <>
                        <span>Complete Order (${total} USD)</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-[#8C7D75]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>256-Bit SSL Protection · Lifetime Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FAF5EB] text-[#D4AF37] flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-sans block mb-1">
              Thank You for Your Patronage
            </span>
            <h3 className="font-serif text-2xl text-[#2C221E] mb-2">
              Your Lumé Order is Hand-Crafted
            </h3>
            <p className="text-xs text-[#5A4A42] font-sans max-w-md mx-auto mb-6 leading-relaxed">
              Order confirmation <strong className="font-mono text-[#2C221E]">{completedOrderId}</strong> has been transmitted to our master jeweler. We will dispatch your hand-inspected pieces with insurance and tracking within 1–2 business days.
            </p>

            <div className="p-4 bg-[#F4F0EA] border border-[#EAE3D8] text-left max-w-md mx-auto text-xs space-y-1.5 mb-6">
              <div className="flex justify-between text-[#8C7D75]">
                <span>Recipient:</span>
                <span className="text-[#2C221E]">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between text-[#8C7D75]">
                <span>Shipping Address:</span>
                <span className="text-[#2C221E] truncate max-w-[200px]">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between text-[#8C7D75]">
                <span>Tracking updates sent to:</span>
                <span className="text-[#2C221E]">{formData.email}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="py-3 px-8 bg-[#2C221E] text-[#FAF9F6] text-xs font-sans uppercase tracking-widest hover:bg-[#382C26] transition-colors"
            >
              Continue Exploring
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
