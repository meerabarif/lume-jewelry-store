import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { PageRoute, ProductCategory } from './types/jewelry';
import { AnnouncementBar } from './components/navigation/AnnouncementBar';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/navigation/Footer';
import { SearchModal } from './components/navigation/SearchModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';

function AppContent() {
  // Parse initial route from window.location.hash
  const parseRouteFromHash = (): PageRoute => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash || hash === '') return { name: 'home' };

    const parts = hash.split('/');
    if (parts[0] === 'shop') {
      return { name: 'shop' };
    }
    if (parts[0] === 'category' && parts[1]) {
      const validCategories: ProductCategory[] = ['necklaces', 'bracelets', 'earrings', 'rings'];
      if (validCategories.includes(parts[1] as ProductCategory)) {
        return { name: 'category', category: parts[1] as ProductCategory };
      }
      return { name: 'shop' };
    }
    if (parts[0] === 'product' && parts[1]) {
      const id = parseInt(parts[1], 10);
      if (!isNaN(id)) {
        return { name: 'product', id };
      }
    }
    if (parts[0] === 'about') return { name: 'about' };
    if (parts[0] === 'contact') return { name: 'contact' };
    if (parts[0] === 'cart') return { name: 'cart' };

    return { name: 'home' };
  };

  const [currentRoute, setCurrentRoute] = useState<PageRoute>(parseRouteFromHash);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const { toastMessage, dismissToast } = useCart();

  // Sync hash changes (Back/Forward browser buttons)
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(parseRouteFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
    let newHash = '';
    if (route.name === 'home') newHash = '';
    else if (route.name === 'shop') newHash = 'shop';
    else if (route.name === 'category') newHash = `category/${route.category}`;
    else if (route.name === 'product') newHash = `product/${route.id}`;
    else if (route.name === 'about') newHash = 'about';
    else if (route.name === 'contact') newHash = 'contact';
    else if (route.name === 'cart') newHash = 'cart';

    window.location.hash = newHash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#2C221E] font-sans antialiased selection:bg-[#D4AF37]/30 selection:text-[#2C221E]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C221E] text-[#FAF9F6] px-5 py-3 border border-[#D4AF37]/40 shadow-2xl flex items-center justify-between gap-4 text-xs font-sans animate-fade-in max-w-sm">
          <span>{toastMessage}</span>
          <button
            onClick={dismissToast}
            className="text-[#D4AF37] hover:text-[#FAF9F6] text-[11px] uppercase tracking-wider font-semibold"
          >
            Close
          </button>
        </div>
      )}

      {/* Top Persistent Navigation Components */}
      <AnnouncementBar />
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Dynamic Viewport Rendering */}
      <main className="flex-1">
        {currentRoute.name === 'home' && <HomePage onNavigate={navigateTo} />}

        {currentRoute.name === 'shop' && (
          <ShopPage
            initialCategory={currentRoute.category}
            initialSearch={currentRoute.search}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute.name === 'category' && (
          <CategoryPage
            category={currentRoute.category}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute.name === 'product' && (
          <ProductDetailPage
            productId={currentRoute.id}
            onNavigate={navigateTo}
            onOpenCheckout={() => setIsCheckoutOpen(true)}
          />
        )}

        {currentRoute.name === 'about' && <AboutPage onNavigate={navigateTo} />}

        {currentRoute.name === 'contact' && <ContactPage onNavigate={navigateTo} />}

        {currentRoute.name === 'cart' && (
          <CartPage
            onNavigate={navigateTo}
            onOpenCheckout={() => setIsCheckoutOpen(true)}
          />
        )}
      </main>

      {/* Persistent Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Interactive Overlays */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigateTo}
      />

      <CartDrawer
        onNavigate={navigateTo}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={(orderId) => {
          console.log(`Order ${orderId} successfully completed.`);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
