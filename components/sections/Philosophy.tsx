"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Hammer, Award, Leaf } from "lucide-react";

export function Philosophy() {
  const stats = [
    { value: "320+", label: "Homes Furnished in AP" },
    { value: "100%", label: "Seasoned Burma Teak" },
    { value: "25-Yr", label: "Structural Millwork Warranty" },
    { value: "4.9★", label: "Customer Satisfaction" },
  ];

  return (
    <section className="py-24 md:py-36 px-4 md:px-8 max-w-7xl mx-auto border-t border-[var(--border-subtle)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Stacked Parallax Photos */}
        <div className="lg:col-span-6 relative">
          {/* Main Large Image */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[var(--border-subtle)] shadow-2xl">
            <Image
              src="/images/hero/about-craft.jpg"
              alt="Artisan woodcarving at GYP SIGNATURES workshop"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-butter)]">
                Srikalahasthi Atelier
              </span>
              <p className="font-serif text-lg">
                Where ancient joinery traditions meet contemporary spatial geometry.
              </p>
            </div>
          </div>

          {/* Overlapping Floating Small Image */}
          <div className="absolute -bottom-8 -right-4 sm:-right-8 w-48 sm:w-60 aspect-square rounded-2xl overflow-hidden border-4 border-[var(--bg-primary)] shadow-2xl hidden sm:block">
            <Image
              src="/images/hero/workshop-artisan.jpg"
              alt="Teakwood joinery detail"
              fill
              sizes="240px"
              className="object-cover"
            />
          </div>

          {/* Floating Artisan Badge */}
          <div className="absolute top-6 right-6 px-4 py-2 rounded-full glass-pill text-xs font-medium text-[var(--text-primary)] flex items-center gap-2">
            <Hammer className="w-3.5 h-3.5 text-[var(--accent-terracotta)]" />
            <span>Master Craftsmen Led</span>
          </div>
        </div>

        {/* Right Editorial Copy */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent-terracotta)] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-terracotta)]" />
              Our Design Philosophy
            </span>
            <h2 className="display-h2 font-serif text-[var(--text-primary)]">
              Rejecting mass-produced conformity for soulful, living timber.
            </h2>
          </div>

          <div className="space-y-5 text-sm md:text-base text-[var(--text-secondary)] leading-relaxed font-normal">
            <p>
              At GYP SIGNATURES, we believe true luxury isn't found in a cardboard flat-pack from an anonymous warehouse. It lives in the tactile ridges of hand-planed teak, the silent closure of a tambour credenza, and the embrace of a sofa proportioned precisely for human ease.
            </p>
            <p>
              Rooted in Srikalahasthi—a town steeped in artisanal mastery—our in-house workshop merges time-tested mortise-and-tenon joinery with high-precision CNC millwork. We design specifically for young homeowners furnishing their first permanent sanctuaries: spaces that balance effortless hospitality with enduring durability.
            </p>
          </div>

          {/* Three Core Tenets */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-2">
              <Award className="w-5 h-5 text-[var(--accent-terracotta)]" />
              <h4 className="font-serif text-sm font-medium text-[var(--text-primary)]">
                Bespoke Sizing
              </h4>
              <p className="text-xs text-[var(--text-muted)]">
                Every sofa and dining table can be customized to the exact centimeter of your layout.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-2">
              <Leaf className="w-5 h-5 text-[var(--accent-sage)]" />
              <h4 className="font-serif text-sm font-medium text-[var(--text-primary)]">
                Zero-VOC Hardwax
              </h4>
              <p className="text-xs text-[var(--text-muted)]">
                All timber finishes use organic plant-derived waxes that are safe for toddlers and pets.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-2">
              <Hammer className="w-5 h-5 text-[var(--accent-butter)]" />
              <h4 className="font-serif text-sm font-medium text-[var(--text-primary)]">
                Lifetime Service
              </h4>
              <p className="text-xs text-[var(--text-muted)]">
                Our local artisans are always a phone call away for polishing and care down the decades.
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="pt-6 border-t border-[var(--border-subtle)] grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                  {s.value}
                </div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-0.5 font-sans">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Action Link */}
          <div className="pt-2">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent-terracotta)] hover:underline"
            >
              <span>Explore Our 4-Step Turnkey Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
