"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { PRODUCTS } from "@/lib/products";
import { ProductCategory } from "@/lib/types";
import { Filter, SlidersHorizontal, X, ArrowLeft } from "lucide-react";
import Link from "next/link";

const CATEGORIES: { label: string; value: ProductCategory | "all" }[] = [
  { label: "All Collections", value: "all" },
  { label: "Sofas & Couches", value: "sofas" },
  { label: "Beds & Platforms", value: "beds" },
  { label: "Dining Tables & Suites", value: "dining" },
  { label: "Chairs & Armchairs", value: "chairs" },
  { label: "Storage & Credenzas", value: "storage" },
  { label: "Lighting & Pendants", value: "lighting" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [priceMax, setPriceMax] = useState<number>(120000);
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (activeCategory !== "all" && p.category !== activeCategory) {
        return false;
      }
      // Price filter
      if (p.price > priceMax) {
        return false;
      }
      // Tag filter
      if (selectedTag !== "all" && !p.tags.includes(selectedTag)) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [activeCategory, priceMax, selectedTag, sortBy]);

  const allTags = ["all", "Best Seller", "New", "Signature Series", "Minimalist", "Space Saver", "Solid Wood"];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Header />

      <main className="pt-28 md:pt-36 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Breadcrumb & Title */}
        <div className="mb-8 md:mb-12 space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Sanctuary Home</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent-terracotta)] block">
                The Atelier Catalog · 24 Masterpieces
              </span>
              <h1 className="display-h1 font-serif text-[var(--text-primary)] mt-1">
                Furniture & Decor
              </h1>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs font-mono uppercase tracking-wider"
            >
              <Filter className="w-4 h-4 text-[var(--accent-terracotta)]" />
              <span>Filters ({filteredProducts.length} Results)</span>
            </button>
          </div>
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 mb-8 border-b border-[var(--border-subtle)]">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-[var(--accent-terracotta)] text-white shadow-md shadow-[var(--accent-terracotta-glow)]"
                      : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Right Controls: Sort & Price Count */}
          <div className="flex items-center justify-between lg:justify-end gap-4">
            <span className="text-xs font-mono text-[var(--text-muted)]">
              Showing <span className="text-[var(--text-primary)] font-semibold">{filteredProducts.length}</span> of {PRODUCTS.length} pieces
            </span>

            {/* Sort Select */}
            <div className="flex items-center gap-2 bg-[var(--bg-secondary)] px-3 py-1.5 rounded-xl border border-[var(--border-subtle)]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs text-[var(--text-primary)] outline-none cursor-pointer"
              >
                <option value="featured">Featured & Bestsellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tag Chips Filter */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar">
          <span className="text-xs font-mono uppercase text-[var(--text-muted)] shrink-0 mr-1">
            Filter by tag:
          </span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase transition-colors cursor-pointer ${
                selectedTag === tag
                  ? "bg-[var(--text-primary)] text-[var(--bg-primary)] font-semibold"
                  : "bg-[var(--bg-tertiary)]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {tag}
            </button>
          ))}
          {selectedTag !== "all" && (
            <button
              onClick={() => setSelectedTag("all")}
              className="text-xs text-[var(--accent-terracotta)] flex items-center gap-1 hover:underline ml-2"
            >
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <h3 className="font-serif text-2xl text-[var(--text-primary)]">
              No matching pieces found
            </h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
              Try adjusting your category or tag filters, or speak with our custom design team for bespoke commissions.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSelectedTag("all");
                setPriceMax(120000);
              }}
              className="px-6 py-2.5 rounded-full bg-[var(--accent-terracotta)] text-white text-xs font-medium cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} priority={idx < 6} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
          <div className="w-10 h-10 rounded-full border-2 border-[var(--accent-terracotta)] border-t-transparent animate-spin" />
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
