import React, { useState, useMemo } from 'react';
import { PageRoute, ProductCategory } from '../types/jewelry';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown, X, ChevronRight } from 'lucide-react';

interface ShopPageProps {
  initialCategory?: ProductCategory;
  initialSearch?: string;
  onNavigate: (route: PageRoute) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory,
  initialSearch = '',
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>(
    initialCategory || 'all'
  );
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Available price limits
  const minAvailablePrice = 90;
  const maxAvailablePrice = 200;

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      // In stock
      if (onlyInStock && !product.inStock) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.materials.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query);
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.id - b.id; // default featured order
    });
  }, [selectedCategory, maxPrice, searchQuery, sortBy, onlyInStock]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMaxPrice(200);
    setSortBy('featured');
    setOnlyInStock(false);
  };

  return (
    <div className="bg-[#FAF9F6] text-[#2C221E] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      {/* Subtle Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-sans text-[#8C7D75] mb-6">
        <button onClick={() => onNavigate({ name: 'home' })} className="hover:text-[#2C221E] transition-colors">
          Home
        </button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#2C221E] font-medium">Shop Collection</span>
        {selectedCategory !== 'all' && (
          <>
            <ChevronRight className="w-3 h-3" />
            <span className="capitalize text-[#D4AF37] font-medium">{selectedCategory}</span>
          </>
        )}
      </nav>

      {/* Header Banner */}
      <div className="border-b border-[#EAE3D8] pb-8 mb-8">
        <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
          The Full Atelier Catalog
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#2C221E] font-normal tracking-tight mb-3">
          Handmade Fine Jewelry
        </h1>
        <p className="text-xs sm:text-sm text-[#5A4A42] font-sans font-light max-w-2xl leading-relaxed">
          Crafted in limited studio editions with 18k solid gold vermeil, natural baroque pearls, and untreated gemstones.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-[#F4F0EA] border border-[#EAE3D8] p-4 sm:p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Real-time Search Input */}
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 text-[#8C7D75] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, pearl, gemstone, or metal..."
              className="w-full bg-[#FAF9F6] border border-[#EAE3D8] pl-10 pr-8 py-2.5 text-xs font-sans text-[#2C221E] placeholder:text-[#8C7D75] focus:outline-none focus:border-[#D4AF37]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C7D75] hover:text-[#2C221E]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Price Range Slider */}
          <div className="lg:col-span-4 flex items-center gap-3 bg-[#FAF9F6] px-4 py-2 border border-[#EAE3D8]">
            <span className="text-xs font-sans text-[#8C7D75] shrink-0">Max Price:</span>
            <input
              type="range"
              min={minAvailablePrice}
              max={maxAvailablePrice}
              step={5}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
            <span className="font-mono text-xs font-semibold text-[#2C221E] tabular-nums shrink-0">
              ${maxPrice}
            </span>
          </div>

          {/* Sort By Dropdown */}
          <div className="lg:col-span-3 flex items-center gap-2">
            <span className="text-xs font-sans text-[#8C7D75] shrink-0 hidden sm:inline">Sort:</span>
            <div className="relative w-full">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-[#FAF9F6] border border-[#EAE3D8] px-3 py-2.5 text-xs font-sans text-[#2C221E] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated Patron Reviews</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Buttons (Segmented style, compliant with Zero-Pill discipline) */}
        <div className="mt-4 pt-4 border-t border-[#EAE3D8] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-sans text-[#8C7D75] mr-2">Category:</span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-sans transition-colors border ${
                selectedCategory === 'all'
                  ? 'bg-[#2C221E] text-[#FAF9F6] border-[#2C221E]'
                  : 'bg-[#FAF9F6] text-[#5A4A42] border-[#EAE3D8] hover:border-[#D4AF37]'
              }`}
            >
              All Pieces ({PRODUCTS.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-1.5 text-xs font-sans transition-colors border capitalize ${
                  selectedCategory === cat.slug
                    ? 'bg-[#2C221E] text-[#FAF9F6] border-[#2C221E]'
                    : 'bg-[#FAF9F6] text-[#5A4A42] border-[#EAE3D8] hover:border-[#D4AF37]'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs font-sans text-[#8C7D75]">
            <span className="font-mono tabular-nums text-[#2C221E]">
              Showing {filteredProducts.length} of {PRODUCTS.length} creations
            </span>
            {(selectedCategory !== 'all' || searchQuery || maxPrice < 200 || onlyInStock) && (
              <button
                onClick={handleResetFilters}
                className="text-[#D4AF37] hover:underline underline-offset-4"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-[#F4F0EA] border border-[#EAE3D8] p-8">
          <h3 className="font-serif text-2xl text-[#2C221E] mb-2">No jewelry pieces match your criteria</h3>
          <p className="text-xs text-[#8C7D75] font-sans max-w-sm mx-auto mb-6">
            Try adjusting your search query, increasing your price range, or clearing category filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="py-2.5 px-6 bg-[#2C221E] text-[#FAF9F6] text-xs font-sans uppercase tracking-widest hover:bg-[#382C26] transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
