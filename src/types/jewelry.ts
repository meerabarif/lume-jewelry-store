export type ProductCategory = 'necklaces' | 'bracelets' | 'earrings' | 'rings';

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  comment: string;
}

export interface Product {
  id: number;
  name: string;
  tagline?: string;
  price: number;
  category: ProductCategory;
  rating: number;
  reviewCount: number;
  description: string;
  story: string;
  materials: string;
  sizingDetails: string;
  colorOptions: string[];
  galleryImages: string[];
  reviews: ProductReview[];
  isBestSeller?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  quantity: number;
}

export type PageRoute = 
  | { name: 'home' }
  | { name: 'shop'; category?: ProductCategory; search?: string }
  | { name: 'category'; category: ProductCategory }
  | { name: 'product'; id: number }
  | { name: 'about' }
  | { name: 'contact' }
  | { name: 'cart' };
