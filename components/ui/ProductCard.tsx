"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Plus, Check, Star } from "lucide-react";
import { Product } from "@/lib/types";
import { formatINR } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { addItem, toggleWishlist, isInWishlist } = useCartStore();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // 3D perspective tilt states
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 8, y: x * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, selectedColor, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className="group relative rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-terracotta)]/40 transition-shadow duration-300 shadow-md hover:shadow-2xl overflow-hidden flex flex-col justify-between"
    >
      {/* Top Image Canvas */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative aspect-[4/3.8] w-full overflow-hidden bg-[var(--bg-tertiary)] block cursor-pointer"
        data-cursor="View"
      >
        {/* Primary Image */}
        <Image
          src={product.primaryImage}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-all duration-700 ${
            isHovered && product.hoverImage
              ? "opacity-0 scale-105"
              : "opacity-100 scale-100"
          }`}
        />

        {/* Hover Image Crossfade */}
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-all duration-700 absolute inset-0 ${
              isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
          />
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
          {product.isBestseller && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[var(--accent-terracotta)] text-white shadow-sm">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[var(--accent-sage)] text-white shadow-sm">
              New Arrival
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full backdrop-blur-md border flex items-center justify-center transition-all cursor-pointer ${
            inWishlist
              ? "bg-[var(--accent-terracotta)] text-white border-transparent"
              : "bg-black/30 border-white/20 text-white hover:scale-110"
          }`}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              inWishlist ? "fill-white scale-110" : ""
            }`}
          />
        </button>

        {/* Quick Add Floating Button (Desktop) */}
        <div className="absolute inset-x-4 bottom-4 z-10 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-4 rounded-full font-medium text-xs tracking-wide flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer ${
              addedAnimation
                ? "bg-[var(--accent-sage)] text-white"
                : "bg-white text-black hover:bg-[var(--accent-terracotta)] hover:text-white"
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added to Sanctuary Cart
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" /> Quick Add · {formatINR(product.price)}
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Bottom Details */}
      <div className="p-5 md:p-6 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating and Category */}
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
            <span className="uppercase tracking-wider">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-[var(--accent-butter)]">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-[var(--text-primary)] font-medium">
                {product.rating}
              </span>
              <span className="text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <Link href={`/shop/${product.slug}`} className="block mt-1.5 group-hover:text-[var(--accent-terracotta)] transition-colors">
            <h3 className="font-serif text-lg md:text-xl font-medium tracking-tight text-[var(--text-primary)] line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Tagline */}
          <p className="text-xs text-[var(--text-secondary)] line-clamp-1 mt-1 font-sans">
            {product.tagline}
          </p>
        </div>

        {/* Swatches & Pricing Row */}
        <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
          {/* Color Swatch Dots */}
          <div className="flex items-center gap-1.5">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedColor(c);
                }}
                className={`w-4 h-4 rounded-full border transition-transform cursor-pointer ${
                  selectedColor.name === c.name
                    ? "scale-125 border-white ring-1 ring-[var(--accent-terracotta)]"
                    : "border-black/20 hover:scale-110"
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
                aria-label={`Select color ${c.name}`}
              />
            ))}
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="flex items-baseline gap-2">
              {product.comparePrice && (
                <span className="text-xs line-through text-[var(--text-muted)] font-mono">
                  {formatINR(product.comparePrice)}
                </span>
              )}
              <span className="font-serif text-base md:text-lg font-semibold text-[var(--text-primary)]">
                {formatINR(product.price)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
