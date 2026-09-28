import { createClient } from "@supabase/supabase-js";
import { PRODUCTS } from "../lib/products";
import { PROJECTS } from "../lib/projects";

const supabaseUrl = "https://lidyrlkwhffsdjzejaak.supabase.co";
const supabaseKey = "sb_publishable_dvD7v_jJt7b49K_VBLWSoQ_VkvPyZVY";

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("Seeding products...");
  const mappedProducts = PRODUCTS.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    category: p.category,
    category_label: p.categoryLabel,
    price: p.price,
    compare_price: p.comparePrice,
    rating: p.rating,
    review_count: p.reviewCount,
    tagline: p.tagline,
    description: p.description,
    long_description: p.longDescription,
    materials: p.materials,
    dimensions: p.dimensions,
    colors: p.colors,
    primary_image: p.primaryImage,
    hover_image: p.hoverImage,
    gallery_images: p.galleryImages,
    tags: p.tags,
    is_bestseller: p.isBestseller,
    in_stock: p.inStock,
    lead_time: p.leadTime,
  }));

  const { error: prodErr } = await supabase.from("products").upsert(mappedProducts, { onConflict: "id" });
  if (prodErr) {
    console.error("Products seed error:", prodErr.message);
  } else {
    console.log(`Successfully seeded ${mappedProducts.length} products!`);
  }

  console.log("Seeding projects...");
  const mappedProjects = PROJECTS.map((pr) => ({
    id: pr.id,
    slug: pr.slug,
    title: pr.title,
    tagline: pr.tagline,
    location: pr.location,
    room_type: pr.roomType,
    year: pr.year,
    area: pr.area,
    duration: pr.duration,
    budget_range: pr.budgetRange,
    description: pr.description,
    cover_image: pr.coverImage,
    before_image: pr.beforeImage,
    after_image: pr.afterImage,
    gallery: pr.gallery,
    stats: pr.stats,
    client_testimonial: pr.clientTestimonial,
    featured_products: pr.featuredProducts,
  }));

  const { error: projErr } = await supabase.from("projects").upsert(mappedProjects, { onConflict: "id" });
  if (projErr) {
    console.error("Projects seed error:", projErr.message);
  } else {
    console.log(`Successfully seeded ${mappedProjects.length} projects!`);
  }
}

seed();
