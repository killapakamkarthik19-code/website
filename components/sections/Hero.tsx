"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Sparkles,
  ShieldCheck,
  Truck,
  Palette,
  MapPin,
} from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

// Dynamically import SofaScene to avoid SSR WebGL issues
const SofaScene = dynamic(
  () => import("@/components/3d/SofaScene").then((mod) => mod.SofaScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[420px] md:h-[560px] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-[var(--accent-terracotta)] border-t-transparent animate-spin" />
      </div>
    ),
  }
);

export function Hero() {
  const [selectedColor, setSelectedColor] = useState("#D9673F");

  const colorSwatches = [
    { label: "Terracotta", hex: "#D9673F" },
    { label: "Olive Moss", hex: "#4A5D43" },
    { label: "Warm Charcoal", hex: "#222120" },
    { label: "Butter Cream", hex: "#D1B26F" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 md:pt-36 pb-12 px-4 md:px-8 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] md:w-[850px] h-[550px] md:h-[850px] rounded-full bg-[var(--accent-terracotta)]/8 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] rounded-full bg-[var(--accent-sage)]/6 blur-[100px] pointer-events-none -z-10" />

      {/* Top Banner Tag */}
      <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs text-[var(--text-secondary)] w-fit"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--accent-terracotta)] animate-ping" />
          <span className="text-[var(--text-primary)] font-medium">GYP SIGNATURES</span>
          <span className="text-[var(--text-muted)]">|</span>
          <span className="flex items-center gap-1 text-[var(--accent-terracotta)]">
            <MapPin className="w-3 h-3" /> Srikalahasthi, Tirupati Dist.
          </span>
        </motion.div>

        {/* Floating Quick Chips */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="hidden md:flex items-center gap-2 text-[11px] font-mono tracking-wider uppercase text-[var(--text-muted)]"
        >
          <span className="px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center gap-1.5">
            <Truck className="w-3 h-3 text-[var(--accent-sage)]" /> Free AP Delivery
          </span>
          <span className="px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-[var(--accent-butter)]" /> 5-Yr Teak Warranty
          </span>
        </motion.div>
      </div>

      {/* Giant Typography Headline */}
      <div className="max-w-7xl mx-auto w-full text-center relative z-10 select-none">
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="display-hero font-serif tracking-tighter"
        >
          <span className="block text-[var(--text-primary)] font-extralight tracking-tight">
            Furniture that
          </span>
          <span className="block mt-[-0.05em] font-medium">
            feels like{" "}
            <span className="italic font-normal gradient-terracotta">
              home.
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-2xl mx-auto text-sm md:text-base lg:text-lg text-[var(--text-secondary)] mt-4 md:mt-6 font-normal leading-relaxed"
        >
          Bespoke architectural furniture, handcrafted Burma teak joinery, and full interior turnkey design for modern sanctuaries across Andhra Pradesh.
        </motion.p>
      </div>

      {/* Center 3D Stage with Swatch Controls */}
      <div className="relative max-w-5xl mx-auto w-full my-[-20px] md:my-[-35px] z-20">
        <SofaScene sofaColor={selectedColor} />

        {/* 3D Color Customizer Swatches */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-2 md:bottom-6 z-30 flex items-center gap-3 px-4 py-2 rounded-full glass-pill"
        >
          <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5 hidden sm:flex">
            <Palette className="w-3.5 h-3.5 text-[var(--accent-terracotta)]" />
            Finish:
          </span>
          <div className="flex items-center gap-2">
            {colorSwatches.map((swatch) => (
              <button
                key={swatch.hex}
                onClick={() => setSelectedColor(swatch.hex)}
                className={`w-5 h-5 rounded-full transition-transform cursor-pointer border ${
                  selectedColor === swatch.hex
                    ? "scale-125 border-white ring-2 ring-[var(--accent-terracotta)]"
                    : "border-black/30 hover:scale-110"
                }`}
                style={{ backgroundColor: swatch.hex }}
                title={`Change color to ${swatch.label}`}
                aria-label={`Select ${swatch.label} 3D color`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA Row & Scroll Prompt */}
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-6 z-10 border-t border-[var(--border-subtle)]/60">
        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/shop">
            <MagneticButton variant="primary">
              <span>Explore Curated Shop</span>
              <Sparkles className="w-4 h-4" />
            </MagneticButton>
          </Link>
          <Link href="/#consultation">
            <MagneticButton variant="secondary">
              <span>Book Free Consultation</span>
            </MagneticButton>
          </Link>
        </div>

        {/* Location & Contact reassurance */}
        <div className="text-center md:text-right space-y-1">
          <p className="text-xs text-[var(--text-primary)] font-medium">
            Srikalahasthi Experience Studio & Workshop
          </p>
          <p className="text-[11px] text-[var(--text-secondary)] font-mono">
            Direct Design Line: 9393972660 · Mon-Sun 9AM - 9PM
          </p>
        </div>

        {/* Scroll Indicator */}
        <Link
          href="/#marquee"
          className="flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer group"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-7 h-7 rounded-full border border-[var(--border-subtle)] flex items-center justify-center group-hover:border-[var(--accent-terracotta)] group-hover:text-[var(--accent-terracotta)] transition-colors">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </Link>
      </div>
    </section>
  );
}
