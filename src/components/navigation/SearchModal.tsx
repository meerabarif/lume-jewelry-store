import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { Product, PageRoute } from '../../types/jewelry';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: PageRoute) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setResults([]);
      return;
    }

    const filtered = PRODUCTS.filter((product) => {
      return (
        product.name.toLowerCase().includes(trimmed) ||
        product.category.toLowerCase().includes(trimmed) ||
        product.materials.toLowerCase().includes(trimmed) ||
        product.description.toLowerCase().includes(trimmed)
      );
    });

    setResults(filtered);
  }, [query]);

  const handleSelectProduct = (id: number) => {
    onClose();
    onNavigate({ name: 'product', id });
  };

  const handleViewAllResults = () => {
    onClose();
    onNavigate({ name: 'shop', search: query });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#2C221E]/60 backdrop-blur-sm transition-all"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#FAF9F6] border border-[#EAE3D8] shadow-2xl overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-6 py-5 border-b border-[#EAE3D8] bg-[#F4F0EA]">
          <Search className="w-5 h-5 text-[#8C7D75] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pearls, gold bangles, rings, earrings..."
            className="w-full bg-transparent text-base sm:text-lg font-serif text-[#2C221E] placeholder:text-[#8C7D75] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 mr-2 text-[#8C7D75] hover:text-[#2C221E] text-xs font-sans uppercase tracking-wider"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1 text-[#8C7D75] hover:text-[#2C221E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestions or Results */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {!query.trim() ? (
            <div>
              <p className="text-xs uppercase tracking-widest text-[#8C7D75] font-sans mb-3">
                Trending Searches
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Baroque Pearl', 'Solstice Bangle', 'Moonstone Ring', 'Waterdrop Huggies', '18k Solid Gold'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="text-xs font-sans py-1.5 px-3 bg-[#F4F0EA] hover:bg-[#EAE3D8] text-[#2C221E] border border-[#EAE3D8] transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>

              <div className="border-t border-[#EAE3D8] pt-4">
                <p className="text-xs uppercase tracking-widest text-[#8C7D75] font-sans mb-3">
                  Featured Collections
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Necklaces', count: '2 pieces', cat: 'necklaces' as const },
                    { label: 'Bracelets', count: '2 pieces', cat: 'bracelets' as const },
                    { label: 'Earrings', count: '2 pieces', cat: 'earrings' as const },
                    { label: 'Rings', count: '2 pieces', cat: 'rings' as const }
                  ].map((cat) => (
                    <button
                      key={cat.label}
                      onClick={() => {
                        onClose();
                        onNavigate({ name: 'category', category: cat.cat });
                      }}
                      className="p-3 bg-[#F4F0EA] hover:bg-[#EAE3D8] text-left border border-[#EAE3D8] transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <div className="font-serif text-sm font-medium text-[#2C221E] group-hover:text-[#D4AF37]">
                          {cat.label}
                        </div>
                        <div className="text-[11px] text-[#8C7D75] font-sans">{cat.count}</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#8C7D75] group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs uppercase tracking-widest text-[#8C7D75] font-sans">
                  Found {results.length} handcrafted {results.length === 1 ? 'piece' : 'pieces'}
                </p>
                <button
                  onClick={handleViewAllResults}
                  className="text-xs font-sans text-[#D4AF37] hover:underline flex items-center gap-1"
                >
                  View in Shop <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="divide-y divide-[#EAE3D8]">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.id)}
                    className="py-3 flex items-center gap-4 hover:bg-[#F4F0EA] px-2 -mx-2 cursor-pointer transition-colors group"
                  >
                    <div className="w-16 h-16 shrink-0 bg-[#F4F0EA] border border-[#EAE3D8] overflow-hidden">
                      <ImageWithFallback
                        src={product.galleryImages[0]}
                        alt={product.name}
                        containerClassName="w-full h-full"
                        className="group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-widest text-[#8C7D75] font-sans">
                        {product.category}
                      </p>
                      <h4 className="font-serif text-base text-[#2C221E] group-hover:text-[#D4AF37] transition-colors truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#8C7D75] truncate font-light font-sans">
                        {product.materials}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-sans font-medium text-sm text-[#2C221E] tabular-nums">
                        ${product.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-10 text-center">
              <p className="font-serif text-lg text-[#2C221E] mb-1">No matching jewels found</p>
              <p className="text-xs text-[#8C7D75] font-sans">
                Try searching for “pearl”, “gold”, “ring”, or “earrings”.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
