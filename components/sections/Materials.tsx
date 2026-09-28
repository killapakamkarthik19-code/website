"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Shield, Droplets, Check } from "lucide-react";

interface MaterialSwatch {
  id: string;
  name: string;
  category: "Timber" | "Fabric" | "Leather" | "Hardware";
  origin: string;
  image: string;
  textureThumb: string;
  tagline: string;
  description: string;
  durability: string;
  finish: string;
}

const SWATCHES: MaterialSwatch[] = [
  {
    id: "teak",
    name: "Seasoned Burma Teak",
    category: "Timber",
    origin: "Sustainable Plantation Grown",
    image: "/images/hero/about-craft.jpg",
    textureThumb: "/images/materials/teak.jpg",
    tagline: "High natural oil content that repels termites and resists moisture.",
    description: "Our signature structural timber. Kiln-dried to 8-10% moisture content to prevent seasonal warping or cracking under southern Indian climate extremes.",
    durability: "Lifetime Structural Integrity (50+ Years)",
    finish: "Hand-rubbed organic matte hardwax oil",
  },
  {
    id: "walnut",
    name: "American Black Walnut",
    category: "Timber",
    origin: "FSC Certified Appalachian Hardwoods",
    image: "/images/products/koshi-credenza-1.jpg",
    textureThumb: "/images/materials/walnut.jpg",
    tagline: "Deep espresso heartwood with luminous golden sapwood swirls.",
    description: "Prized for its acoustic resonance and silky touch. We bookmatch grain across adjacent drawers and cabinet doors for architectural harmony.",
    durability: "Heavy Commercial Grade Janka 1010",
    finish: "Silky zero-sheen protective seal",
  },
  {
    id: "linen",
    name: "Belgian Raw Linen",
    category: "Fabric",
    origin: "Flanders, Belgium & Local Handloom Weaves",
    image: "/images/products/veda-king-1.jpg",
    textureThumb: "/images/materials/linen.jpg",
    tagline: "Breathable natural flax fiber that cools in summer and warms in monsoon.",
    description: "Pre-washed for heirloom softness without shrinkage. Treated with nano water-repellent protection so liquids bead on the surface.",
    durability: "45,000 Martindale Rubs (Heavy Residential)",
    finish: "Nano stain-guard invisible shield",
  },
  {
    id: "velvet",
    name: "Terracotta Royal Velvet",
    category: "Fabric",
    origin: "Venetian Micro-pile Technology",
    image: "/images/products/surya-chair-1.jpg",
    textureThumb: "/images/materials/velvet.jpg",
    tagline: "Irresistibly tactile deep-pile velvet with multidirectional luster.",
    description: "Engineered specifically to resist pet claws and child play. Spill liquids wipe clean with a damp microfiber cloth.",
    durability: "70,000 Martindale Rubs (Commercial Lounge)",
    finish: "Pet-friendly snag-resistant weave",
  },
  {
    id: "leather",
    name: "Full-Grain Waxed Leather",
    category: "Leather",
    origin: "Tuscan Vegetable Tanning",
    image: "/images/products/raga-recliner-1.jpg",
    textureThumb: "/images/materials/leather.jpg",
    tagline: "Uncorrected top grain that develops a magnificent amber patina.",
    description: "Dyed in wooden drums with natural chestnut tree barks and beeswax. Every crease tells the authentic story of natural hide.",
    durability: "Puncture & Tear Proof (Passes BIFMA X5.4)",
    finish: "Organic hot-stuffed carnauba wax",
  },
  {
    id: "brass",
    name: "Spun Champagne Brass",
    category: "Hardware",
    origin: "Artisanal Metal Foundries",
    image: "/images/products/soma-lamp-1.jpg",
    textureThumb: "/images/materials/brass.jpg",
    tagline: "Solid non-magnetic alloy hand-brushed to a luminous satin sheen.",
    description: "No cheap zinc plating. We machine solid brass rods and bells, coated with micro-crystalline wax to age gracefully without pitting.",
    durability: "Solid Non-Corrosive Alloy",
    finish: "Brushed satin lacquer seal",
  },
];

export function Materials() {
  const [selected, setSelected] = useState(SWATCHES[0]);

  return (
    <section id="craft" className="py-24 md:py-36 px-4 md:px-8 max-w-7xl mx-auto border-t border-[var(--border-subtle)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent-terracotta)] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Tactile Materiality
          </span>
          <h2 className="display-h2 font-serif text-[var(--text-primary)] mt-3">
            Honest Materials, Zero Compromise
          </h2>
        </div>
        <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-md">
          Touch matters as much as sight. We curate sustainably harvested hardwoods, natural fibers, and solid metals designed to outlast fast trends.
        </p>
      </div>

      {/* Interactive Swatch Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[var(--bg-secondary)] rounded-3xl p-6 md:p-10 border border-[var(--border-subtle)] shadow-xl">
        {/* Left Large Preview Photo */}
        <div className="lg:col-span-6 relative aspect-[4/3.5] rounded-2xl overflow-hidden shadow-lg border border-[var(--border-subtle)]">
          <Image
            src={selected.image}
            alt={selected.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Floating Category Badge */}
          <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/50 backdrop-blur-md text-white border border-white/10">
            {selected.category} · {selected.origin}
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-10 text-white space-y-1">
            <h3 className="font-serif text-2xl font-medium">{selected.name}</h3>
            <p className="text-xs text-white/80 line-clamp-1">{selected.tagline}</p>
          </div>
        </div>

        {/* Right Swatch Selector & Technical Specs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Swatch Pill Buttons */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">
              Choose Material Swatch:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {SWATCHES.map((swatch) => {
                const isActive = selected.id === swatch.id;
                return (
                  <button
                    key={swatch.id}
                    onClick={() => setSelected(swatch)}
                    className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? "bg-[var(--bg-primary)] border-[var(--accent-terracotta)] ring-1 ring-[var(--accent-terracotta)]"
                        : "bg-[var(--bg-tertiary)]/50 border-[var(--border-subtle)] hover:border-[var(--text-secondary)]"
                    }`}
                  >
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-black/10">
                      <Image
                        src={swatch.textureThumb}
                        alt={swatch.name}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-medium text-[var(--text-primary)] block truncate">
                        {swatch.name.split(" ")[0]} {swatch.name.split(" ")[1] || ""}
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)] font-mono block">
                        {swatch.category}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description & Technical Properties */}
          <div className="p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] space-y-4">
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              {selected.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[var(--border-subtle)]">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-[var(--accent-sage)] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                    Durability Rating
                  </span>
                  <span className="text-xs font-medium text-[var(--text-primary)]">
                    {selected.durability}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Droplets className="w-4 h-4 text-[var(--accent-terracotta)] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                    Surface Protection
                  </span>
                  <span className="text-xs font-medium text-[var(--text-primary)]">
                    {selected.finish}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Swatch kit delivery reassurance */}
          <div className="flex items-center gap-2 text-xs text-[var(--accent-sage)] font-mono">
            <Check className="w-4 h-4" />
            <span>Complimentary sample box delivered to your address on booking consultation</span>
          </div>
        </div>
      </div>
    </section>
  );
}
