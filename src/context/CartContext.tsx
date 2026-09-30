import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types/jewelry';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, selectedColor?: string, quantity?: number, openDrawer?: boolean) => void;
  updateQuantity: (productId: number, selectedColor: string, newQuantity: number) => void;
  removeFromCart: (productId: number, selectedColor: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  totalCount: number;
  subtotal: number;
  discountAmount: number;
  promoCode: string;
  promoDiscount: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  shippingThreshold: number;
  shippingCost: number;
  amountNeededForFreeShipping: number;
  total: number;
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  toastMessage: string | null;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'lume_cart_items_v1';
const WISHLIST_STORAGE_KEY = 'lume_wishlist_items_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0); // percentage, e.g. 15 for 15%
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3500);
  };

  const dismissToast = () => setToastMessage(null);

  const addToCart = (
    product: Product,
    selectedColor: string = product.colorOptions[0] || 'Champagne Gold',
    quantity: number = 1,
    openDrawer: boolean = true
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === selectedColor
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }
      return [...prev, { product, selectedColor, quantity }];
    });

    showToast(`Added ${product.name} (${selectedColor}) to your shopping bag`);
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const updateQuantity = (productId: number, selectedColor: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedColor === selectedColor) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: number, selectedColor: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedColor === selectedColor)
      )
    );
    showToast('Item removed from shopping bag');
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setPromoDiscount(0);
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'LUME10') {
      setPromoCode('LUME10');
      setPromoDiscount(10);
      return { success: true, message: '10% welcome discount applied!' };
    }
    if (clean === 'LUME15' || clean === 'ARTISAN15') {
      setPromoCode(clean);
      setPromoDiscount(15);
      return { success: true, message: '15% artisanal collector discount applied!' };
    }
    if (clean === 'FREESHIP') {
      setPromoCode('FREESHIP');
      setPromoDiscount(0);
      return { success: true, message: 'Complimentary expedited shipping unlocked!' };
    }
    return { success: false, message: 'Invalid promo code. Try "LUME15" or "LUME10"' };
  };

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: number) => wishlist.includes(productId);

  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (promoDiscount / 100));
  const shippingThreshold = 150;
  const isFreeShipPromo = promoCode === 'FREESHIP';
  const shippingCost = subtotal === 0 || subtotal >= shippingThreshold || isFreeShipPromo ? 0 : 12;
  const amountNeededForFreeShipping = Math.max(0, shippingThreshold - subtotal);
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalCount,
        subtotal,
        discountAmount,
        promoCode,
        promoDiscount,
        applyPromoCode,
        shippingThreshold,
        shippingCost,
        amountNeededForFreeShipping,
        total,
        wishlist,
        toggleWishlist,
        isInWishlist,
        toastMessage,
        dismissToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
