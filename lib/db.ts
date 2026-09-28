import { createClient } from "@/utils/supabase/client";
import { PRODUCTS } from "@/lib/products";
import { PROJECTS } from "@/lib/projects";
import { Product, PortfolioProject } from "@/lib/types";

// Convert database row to Product type
function mapDbProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category,
    categoryLabel: row.category_label || row.category,
    price: Number(row.price),
    comparePrice: row.compare_price ? Number(row.compare_price) : undefined,
    rating: Number(row.rating) || 5.0,
    reviewCount: row.review_count || 0,
    tagline: row.tagline || "",
    description: row.description || "",
    longDescription: row.long_description || "",
    materials: row.materials || [],
    dimensions: row.dimensions || { width: "", depth: "", height: "" },
    colors: row.colors || [],
    primaryImage: row.primary_image,
    hoverImage: row.hover_image,
    galleryImages: row.gallery_images || [row.primary_image],
    tags: row.tags || [],
    isBestseller: row.is_bestseller || false,
    inStock: row.in_stock !== false,
    leadTime: row.lead_time || "7-10 Days Delivery",
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("products").select("*").order("name");
    if (error || !data || data.length === 0) {
      return PRODUCTS;
    }
    return data.map(mapDbProduct);
  } catch {
    return PRODUCTS;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("products").select("*").eq("slug", slug).single();
    if (error || !data) {
      return PRODUCTS.find((p) => p.slug === slug) || null;
    }
    return mapDbProduct(data);
  } catch {
    return PRODUCTS.find((p) => p.slug === slug) || null;
  }
}
