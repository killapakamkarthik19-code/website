"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ui/ProductCard";

export function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const featured = PRODUCTS.slice(0, 8);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = direction === "left" ? -420 : 420;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section id="featured" className="py-24 md:py-36 overflow-hidden bg-[var(--bg-primary)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-10 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent-terracotta)] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Signature Masterpieces
          </span>
          <h2 className="display-h2 font-serif text-[var(--text-primary)] mt-3">
            Handcrafted for Generations
          </h2>
        </div>

        {/* Scroll Controls & View All */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-[var(--border-subtle)] hover:border-[var(--accent-terracotta)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-[var(--border-subtle)] hover:border-[var(--accent-terracotta)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-terracotta)] text-xs font-medium tracking-wide text-[var(--text-primary)] transition-all cursor-pointer"
          >
            <span>View All 24+ Pieces</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--accent-terracotta)]" />
          </Link>
        </div>
      </div>

      {/* Horizontal Rail */}
      <div
        ref={scrollRef}
        data-cursor="Drag"
        className="flex gap-6 overflow-x-auto no-scrollbar px-4 md:px-8 pb-8 pt-2 scroll-smooth"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {featured.map((product, idx) => (
          <div
            key={product.id}
            className="w-[300px] sm:w-[350px] md:w-[380px] shrink-0"
            style={{ scrollSnapAlign: "start" }}
          >
            <ProductCard product={product} priority={idx < 3} />
          </div>
        ))}
      </div>
    </section>
  );
}
