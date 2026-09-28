"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { PRODUCTS } from "@/lib/products";
import { formatINR } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import {
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Heart,
  Plus,
  Minus,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const product = PRODUCTS.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const { addItem, toggleWishlist, isInWishlist } = useCartStore();
  const [selectedImage, setSelectedImage] = useState(product.primaryImage);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("dimensions");

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Header />

      <main className="pt-28 md:pt-36 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--text-primary)]">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[var(--text-primary)]">
            Shop
          </Link>
          <span>/</span>
          <span className="capitalize">{product.categoryLabel}</span>
          <span>/</span>
          <span className="text-[var(--text-primary)] truncate max-w-xs">
            {product.name}
          </span>
        </div>

        {/* Product Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/3.2] rounded-3xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-subtle)] shadow-2xl">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-6 right-6 z-10 w-11 h-11 rounded-full backdrop-blur-md border flex items-center justify-center transition-all cursor-pointer ${
                  inWishlist
                    ? "bg-[var(--accent-terracotta)] text-white border-transparent"
                    : "bg-black/30 border-white/20 text-white hover:scale-110"
                }`}
                aria-label="Wishlist toggle"
              >
                <Heart
                  className={`w-5 h-5 ${inWishlist ? "fill-white" : ""}`}
                />
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
              {product.galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-24 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    selectedImage === img
                      ? "border-[var(--accent-terracotta)] ring-2 ring-[var(--accent-terracotta-glow)]"
                      : "border-[var(--border-subtle)] opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Purchasing & Configuration */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--accent-terracotta)]">
                <span className="uppercase tracking-widest">
                  {product.categoryLabel} · GYP Bespoke
                </span>
                <div className="flex items-center gap-1 text-[var(--accent-butter)]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-[var(--text-primary)] font-semibold">
                    {product.rating}
                  </span>
                  <span className="text-[var(--text-muted)]">
                    ({product.reviewCount} Reviews)
                  </span>
                </div>
              </div>

              <h1 className="font-serif text-3xl md:text-4xl text-[var(--text-primary)] font-medium leading-tight">
                {product.name}
              </h1>

              <p className="text-sm text-[var(--text-secondary)] font-normal leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price & Savings */}
            <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                  Crafted Price (Incl. GST)
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-3xl font-semibold text-[var(--text-primary)]">
                    {formatINR(product.price)}
                  </span>
                  {product.comparePrice && (
                    <span className="text-sm line-through text-[var(--text-muted)] font-mono">
                      {formatINR(product.comparePrice)}
                    </span>
                  )}
                </div>
              </div>

              {product.comparePrice && (
                <span className="px-3 py-1.5 rounded-full bg-[var(--accent-sage)]/20 text-[var(--accent-sage)] text-xs font-mono font-medium">
                  Save {formatINR(product.comparePrice - product.price)}
                </span>
              )}
            </div>

            {/* Color Swatch Selection */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono uppercase tracking-wider text-[var(--text-muted)]">
                  Finish / Upholstery:
                </span>
                <span className="font-medium text-[var(--text-primary)]">
                  {selectedColor.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all cursor-pointer ${
                      selectedColor.name === c.name
                        ? "bg-[var(--bg-primary)] border-[var(--accent-terracotta)] ring-1 ring-[var(--accent-terracotta)]"
                        : "bg-[var(--bg-secondary)] border-[var(--border-subtle)] hover:border-[var(--text-secondary)]"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-[var(--text-primary)]">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart Action */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center border border-[var(--border-subtle)] rounded-full bg-[var(--bg-secondary)] px-2 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 font-mono text-sm font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-6 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                  added
                    ? "bg-[var(--accent-sage)] text-white"
                    : "bg-[var(--accent-terracotta)] hover:bg-[var(--accent-terracotta-hover)] text-white shadow-[var(--accent-terracotta-glow)]"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Sanctuary Cart
                  </>
                ) : (
                  <>
                    <span>Add to Sanctuary Cart</span>
                    <span>·</span>
                    <span>{formatINR(product.price * quantity)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center">
              <div className="p-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-1">
                <Truck className="w-4 h-4 mx-auto text-[var(--accent-terracotta)]" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-secondary)] block">
                  Free AP Delivery
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-1">
                <ShieldCheck className="w-4 h-4 mx-auto text-[var(--accent-sage)]" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-secondary)] block">
                  5-Yr Warranty
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-1">
                <RotateCcw className="w-4 h-4 mx-auto text-[var(--accent-butter)]" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-secondary)] block">
                  In-Home Assembly
                </span>
              </div>
            </div>

            {/* Accordions */}
            <div className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
              {/* Dimensions */}
              <div className="border border-[var(--border-subtle)] rounded-2xl overflow-hidden bg-[var(--bg-secondary)]">
                <button
                  onClick={() => toggleAccordion("dimensions")}
                  className="w-full p-4 flex items-center justify-between text-left text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-medium cursor-pointer"
                >
                  <span>Architectural Dimensions</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordion === "dimensions" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "dimensions" && (
                  <div className="p-4 pt-0 border-t border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] space-y-2">
                    <div className="grid grid-cols-2 gap-2 pt-3">
                      <div>
                        <span className="text-[10px] text-[var(--text-muted)] font-mono block">
                          WIDTH
                        </span>
                        <span className="font-medium text-[var(--text-primary)]">
                          {product.dimensions.width}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[var(--text-muted)] font-mono block">
                          DEPTH
                        </span>
                        <span className="font-medium text-[var(--text-primary)]">
                          {product.dimensions.depth}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[var(--text-muted)] font-mono block">
                          HEIGHT
                        </span>
                        <span className="font-medium text-[var(--text-primary)]">
                          {product.dimensions.height}
                        </span>
                      </div>
                      {product.dimensions.seatHeight && (
                        <div>
                          <span className="text-[10px] text-[var(--text-muted)] font-mono block">
                            SEAT HEIGHT
                          </span>
                          <span className="font-medium text-[var(--text-primary)]">
                            {product.dimensions.seatHeight}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Materials & Joinery */}
              <div className="border border-[var(--border-subtle)] rounded-2xl overflow-hidden bg-[var(--bg-secondary)]">
                <button
                  onClick={() => toggleAccordion("materials")}
                  className="w-full p-4 flex items-center justify-between text-left text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-medium cursor-pointer"
                >
                  <span>Materials & Joinery Details</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordion === "materials" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "materials" && (
                  <div className="p-4 pt-0 border-t border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] space-y-2 pt-3">
                    <p className="leading-relaxed">{product.longDescription}</p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {product.materials.map((m) => (
                        <span
                          key={m}
                          className="px-2.5 py-1 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[11px]"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery & Lead Times */}
              <div className="border border-[var(--border-subtle)] rounded-2xl overflow-hidden bg-[var(--bg-secondary)]">
                <button
                  onClick={() => toggleAccordion("delivery")}
                  className="w-full p-4 flex items-center justify-between text-left text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-medium cursor-pointer"
                >
                  <span>Delivery & Lead Times</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordion === "delivery" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "delivery" && (
                  <div className="p-4 pt-0 border-t border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] space-y-2 pt-3">
                    <p>
                      <strong className="text-[var(--text-primary)]">Lead Time:</strong>{" "}
                      {product.leadTime}
                    </p>
                    <p>
                      Delivered via our dedicated white-glove transport team directly from our Srikalahasthi atelier to your room of choice, including unboxing and placement.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products: Complete the Look */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-[var(--border-subtle)] space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent-terracotta)] block">
                  Harmonious Pairings
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-[var(--text-primary)] font-medium mt-1">
                  Complete the Look
                </h3>
              </div>
              <Link
                href="/shop"
                className="text-xs font-mono uppercase tracking-wider text-[var(--accent-terracotta)] hover:underline"
              >
                View All Catalog →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
