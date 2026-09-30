import React, { useState } from 'react';
import { PageRoute, ProductCategory } from '../../types/jewelry';
import { useCart } from '../../context/CartContext';
import { CATEGORIES } from '../../data/products';
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, onOpenSearch }) => {
  const { totalCount, setIsCartOpen, wishlist } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const isActive = (name: PageRoute['name'], category?: ProductCategory) => {
    if (currentRoute.name === name) {
      if (name === 'category' && 'category' in currentRoute) {
        return currentRoute.category === category;
      }
      return true;
    }
    return false;
  };

  const handleNav = (route: PageRoute) => {
    setIsMobileMenuOpen(false);
    setIsCategoryDropdownOpen(false);
    onNavigate(route);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#EAE3D8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#2C221E] hover:text-[#D4AF37] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Left / Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-sans uppercase tracking-widest text-[#2C221E]">
            <button
              onClick={() => handleNav({ name: 'home' })}
              className={`transition-colors py-2 relative hover:text-[#D4AF37] ${
                isActive('home') ? 'text-[#D4AF37] font-semibold' : ''
              }`}
            >
              Home
              {isActive('home') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]" />
              )}
            </button>

            <button
              onClick={() => handleNav({ name: 'shop' })}
              className={`transition-colors py-2 relative hover:text-[#D4AF37] ${
                isActive('shop') ? 'text-[#D4AF37] font-semibold' : ''
              }`}
            >
              Shop All
              {isActive('shop') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]" />
              )}
            </button>

            {/* Categories with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCategoryDropdownOpen(true)}
              onMouseLeave={() => setIsCategoryDropdownOpen(false)}
            >
              <button
                onClick={() => handleNav({ name: 'shop' })}
                className={`transition-colors py-2 flex items-center gap-1 hover:text-[#D4AF37] ${
                  currentRoute.name === 'category' ? 'text-[#D4AF37] font-semibold' : ''
                }`}
              >
                <span>Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Dropdown Menu */}
              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-[#FAF9F6] border border-[#EAE3D8] shadow-xl py-3 px-2 transition-all">
                  <div className="px-3 pb-2 mb-2 border-b border-[#EAE3D8] text-[10px] text-[#8C7D75] tracking-widest font-mono">
                    FINE JEWELRY ATELIER
                  </div>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => handleNav({ name: 'category', category: cat.slug })}
                      className="w-full text-left px-3 py-2 text-xs font-serif text-[#2C221E] hover:text-[#D4AF37] hover:bg-[#F4F0EA] transition-colors flex items-center justify-between group"
                    >
                      <span className="text-sm font-normal">{cat.title}</span>
                      <span className="text-[11px] font-sans text-[#8C7D75] group-hover:text-[#D4AF37]">
                        {cat.count} designs
                      </span>
                    </button>
                  ))}
                  <div className="pt-2 mt-2 border-t border-[#EAE3D8] px-3">
                    <button
                      onClick={() => handleNav({ name: 'shop' })}
                      className="text-[11px] font-sans text-[#D4AF37] hover:underline"
                    >
                      View All Jewelry Collections →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav({ name: 'about' })}
              className={`transition-colors py-2 relative hover:text-[#D4AF37] ${
                isActive('about') ? 'text-[#D4AF37] font-semibold' : ''
              }`}
            >
              About Atelier
              {isActive('about') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]" />
              )}
            </button>

            <button
              onClick={() => handleNav({ name: 'contact' })}
              className={`transition-colors py-2 relative hover:text-[#D4AF37] ${
                isActive('contact') ? 'text-[#D4AF37] font-semibold' : ''
              }`}
            >
              Contact
              {isActive('contact') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]" />
              )}
            </button>
          </nav>

          {/* Center Brand Logo */}
          <div className="text-center cursor-pointer select-none" onClick={() => handleNav({ name: 'home' })}>
            <span className="font-serif text-3xl sm:text-4xl tracking-tight text-[#2C221E] hover:text-[#D4AF37] transition-colors font-normal">
              Lumé
            </span>
            <span className="block text-[9px] font-sans uppercase tracking-[0.25em] text-[#8C7D75] -mt-1">
              Atelier Joaillerie
            </span>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-5 text-[#2C221E]">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search collection"
              className="p-2 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 text-xs font-sans"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
              <span className="hidden xl:inline text-[11px] uppercase tracking-wider text-[#8C7D75]">
                Search
              </span>
            </button>

            {/* Wishlist Indicator */}
            <button
              onClick={() => handleNav({ name: 'shop' })}
              aria-label="Wishlist"
              className="relative p-2 hover:text-[#D4AF37] transition-colors hidden sm:block"
              title={`${wishlist.length} saved pieces`}
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#D4AF37] text-[#2C221E] text-[10px] font-mono font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping bag"
              className="relative p-2 text-[#2C221E] hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              <span className="hidden sm:inline text-xs font-sans uppercase tracking-wider font-medium">
                Bag
              </span>
              {totalCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 sm:static sm:ml-1 px-1.5 py-0.2 bg-[#2C221E] text-[#D4AF37] border border-[#D4AF37]/40 text-[10px] font-mono font-bold min-w-4 text-center">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Slide-down */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAE3D8] bg-[#FAF9F6] px-6 py-6 transition-all">
          <div className="flex flex-col space-y-4 text-sm font-sans uppercase tracking-widest text-[#2C221E]">
            <button
              onClick={() => handleNav({ name: 'home' })}
              className={`text-left py-1 hover:text-[#D4AF37] ${
                isActive('home') ? 'text-[#D4AF37] font-semibold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav({ name: 'shop' })}
              className={`text-left py-1 hover:text-[#D4AF37] ${
                isActive('shop') ? 'text-[#D4AF37] font-semibold' : ''
              }`}
            >
              Shop All Jewelry
            </button>

            {/* Mobile Categories list */}
            <div className="pl-4 py-2 border-l border-[#D4AF37]/30 space-y-2">
              <span className="text-[10px] text-[#8C7D75] font-mono block mb-1">COLLECTIONS</span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => handleNav({ name: 'category', category: cat.slug })}
                  className="block text-xs font-serif text-[#5A4A42] hover:text-[#D4AF37] text-left capitalize py-0.5"
                >
                  {cat.title} ({cat.count})
                </button>
              ))}
            </div>

            <button
              onClick={() => handleNav({ name: 'about' })}
              className={`text-left py-1 hover:text-[#D4AF37] ${
                isActive('about') ? 'text-[#D4AF37] font-semibold' : ''
              }`}
            >
              Our Story & Craft
            </button>
            <button
              onClick={() => handleNav({ name: 'contact' })}
              className={`text-left py-1 hover:text-[#D4AF37] ${
                isActive('contact') ? 'text-[#D4AF37] font-semibold' : ''
              }`}
            >
              Contact & Concierge
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-[#EAE3D8] flex items-center justify-between text-xs text-[#8C7D75]">
            <span>Free Express Shipping Over $150</span>
            <span className="text-[#2C221E] font-mono">USD ($)</span>
          </div>
        </div>
      )}
    </header>
  );
};
