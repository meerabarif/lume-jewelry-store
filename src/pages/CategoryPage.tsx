import React from 'react';
import { PageRoute, ProductCategory } from '../types/jewelry';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface CategoryPageProps {
  category: ProductCategory;
  onNavigate: (route: PageRoute) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ category, onNavigate }) => {
  const currentCategory = CATEGORIES.find((c) => c.slug === category) || CATEGORIES[0];
  const products = PRODUCTS.filter((p) => p.category === category);

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
        <span className="text-[#2C221E] font-medium capitalize">{currentCategory.title}</span>
      </nav>

      {/* Category Hero Banner */}
      <div className="bg-[#F4F0EA] border border-[#EAE3D8] p-8 sm:p-12 mb-12 relative overflow-hidden">
        <div className="max-w-2xl">
          <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
            Collection Series · {products.length} Designs
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#2C221E] font-normal tracking-tight mb-4">
            {currentCategory.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#5A4A42] font-sans font-light leading-relaxed mb-6">
            {currentCategory.description}
          </p>

          {/* Quick jump to siblings */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#EAE3D8]">
            <span className="text-xs text-[#8C7D75] font-sans mr-2">Other Collections:</span>
            {CATEGORIES.filter((c) => c.slug !== category).map((cat) => (
              <button
                key={cat.slug}
                onClick={() => onNavigate({ name: 'category', category: cat.slug })}
                className="text-xs font-sans py-1 px-3 bg-[#FAF9F6] hover:bg-[#EAE3D8] text-[#2C221E] border border-[#EAE3D8] transition-colors capitalize"
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mb-6 flex items-center justify-between text-xs text-[#8C7D75] font-sans border-b border-[#EAE3D8] pb-3">
        <span>Handcrafted in limited atelier runs</span>
        <span className="font-mono text-[#2C221E] tabular-nums">
          Showing all {products.length} {currentCategory.title.toLowerCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
        ))}
      </div>

      {/* Back to Shop Navigation */}
      <div className="mt-16 pt-8 border-t border-[#EAE3D8] text-center">
        <button
          onClick={() => onNavigate({ name: 'shop' })}
          className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#2C221E] hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Jewelry Categories</span>
        </button>
      </div>
    </div>
  );
};
