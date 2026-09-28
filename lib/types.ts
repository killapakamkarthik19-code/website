export type ProductCategory =
  | "sofas"
  | "beds"
  | "dining"
  | "chairs"
  | "storage"
  | "lighting"
  | "decor"
  | "modular"
  | "interior-services"
  | "wood-works";

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductDimension {
  width: string;
  depth: string;
  height: string;
  seatHeight?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  comparePrice?: number;
  rating: number;
  reviewCount: number;
  tagline: string;
  description: string;
  longDescription: string;
  materials: string[];
  dimensions: ProductDimension;
  colors: ProductColor[];
  primaryImage: string;
  hoverImage: string;
  galleryImages: string[];
  tags: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  inStock: boolean;
  leadTime: string;
}

export interface ProjectStat {
  label: string;
  value: string;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  location: string;
  roomType: string;
  year: string;
  area: string;
  duration: string;
  budgetRange: string;
  description: string;
  coverImage: string;
  beforeImage: string;
  afterImage: string;
  gallery: string[];
  stats: ProjectStat[];
  clientTestimonial: {
    quote: string;
    author: string;
    role: string;
  };
  featuredProducts: string[]; // product IDs
}

export interface RoomCategory {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  itemCount: number;
  image: string;
  gridSpan: string; // for bento layout
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  quantity: number;
}
