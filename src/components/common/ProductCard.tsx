import React, { useState } from 'react';
import { Product } from '../../types/jewelry';
import { useCart } from '../../context/CartContext';
import { ImageWithFallback } from './ImageWithFallback';
import { RatingStars } from './RatingStars';
import { Heart, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onNavigate: (route: { name: 'product'; id: number }) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate }) => {
  const { addToCart, isInWishlist, toggleWishlist } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colorOptions[0] || 'Champagne Gold');

  const isFavorited = isInWishlist(product.id);
  const primaryImage = product.galleryImages[0];
  const secondaryImage = product.galleryImages[1] || product.galleryImages[0];

  const handleCardClick = (e: React.MouseEvent) => {
    // Only navigate if not clicking directly on action buttons
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }
    onNavigate({ name: 'product', id: product.id });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor, 1, true);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <article
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer flex flex-col bg-transparent text-left transition-transform duration-300"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F4F0EA] border border-[#EAE3D8]/70">
        <ImageWithFallback
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.name}
          containerClassName="w-full h-full"
          className="transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Badges / Wishlist Action */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
          <div>
            {product.isBestSeller && (
              <span className="text-[11px] font-sans uppercase tracking-widest text-[#D4AF37] bg-[#2C221E]/90 px-2 py-0.5">
                Bestseller
              </span>
            )}
            {!product.isBestSeller && product.isFeatured && (
              <span className="text-[11px] font-sans uppercase tracking-widest text-[#2C221E] bg-[#FAF9F6]/90 px-2 py-0.5 border border-[#EAE3D8]">
                Artisan Pick
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleToggleWishlist}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
            className="pointer-events-auto p-2 rounded-full bg-[#FAF9F6]/85 backdrop-blur-sm text-[#2C221E] hover:text-[#D4AF37] hover:scale-110 transition-all shadow-xs"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorited ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-[#2C221E]'
              }`}
            />
          </button>
        </div>

        {/* Hover Quick Add Overlay */}
        <div className="absolute bottom-3 inset-x-3 pointer-events-auto opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-4 bg-[#2C221E] hover:bg-[#382C26] text-[#FAF9F6] text-xs font-sans uppercase tracking-wider flex items-center justify-center gap-2 border border-[#D4AF37]/30 transition-colors shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Quick Add · ${product.price}</span>
          </button>
        </div>
      </div>

      {/* Product Metadata (Clean, unboxed typography) */}
      <div className="pt-3.5 pb-2 flex flex-col flex-grow">
        <div className="flex items-center justify-between text-xs text-[#8C7D75] mb-1">
          <span className="uppercase tracking-widest font-sans text-[10px]">
            {product.category}
          </span>
          <RatingStars rating={product.rating} count={product.reviewCount} size="sm" />
        </div>

        <h3 className="font-serif text-lg text-[#2C221E] group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-1 mb-1">
          {product.name}
        </h3>

        <p className="text-xs text-[#5A4A42] line-clamp-1 mb-2 font-sans font-light">
          {product.materials}
        </p>

        <div className="mt-auto flex items-center justify-between pt-1 border-t border-[#EAE3D8]/50">
          <span className="font-sans font-medium text-sm text-[#2C221E] tabular-nums">
            ${product.price} <span className="text-[11px] text-[#8C7D75] font-normal">USD</span>
          </span>

          {/* Color variant dots */}
          <div className="flex items-center gap-1.5" title="Available Finishes">
            {product.colorOptions.map((color) => {
              const isGold = color.toLowerCase().includes('gold') && !color.toLowerCase().includes('rose');
              const isRose = color.toLowerCase().includes('rose');
              const isSilver = color.toLowerCase().includes('silver');
              const bg = isGold ? '#D4AF37' : isRose ? '#E0A899' : '#C0C0C0';
              const isSelected = selectedColor === color;

              return (
                <button
                  key={color}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(color);
                  }}
                  title={color}
                  className={`w-2.5 h-2.5 rounded-full border transition-all ${
                    isSelected ? 'ring-1 ring-[#2C221E] scale-110' : 'border-black/10 opacity-70'
                  }`}
                  style={{ backgroundColor: bg }}
                  aria-label={color}
                />
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
};
