"use client";

import React from "react";
import Link from "next/link";
import {
  Compass,
  Layers,
  Hammer,
  Truck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Site Discovery & Consultation",
    timeline: "Days 1 — 3",
    icon: Compass,
    tagline: "Listening to your rituals, spatial constraints, and aesthetic dreams.",
    description: "Our principal design team visits your home in Tirupati or Srikalahasthi (or connects via video). We conduct laser room scans, map natural light flow, and understand how you move through daily life.",
    deliverables: ["Precision Laser 3D Floorplan", "Material Moodboard", "Transparent Budget Estimate"],
  },
  {
    step: "02",
    title: "3D Photorealistic Concept",
    timeline: "Days 4 — 10",
    icon: Layers,
    tagline: "Experience your future sanctuary before a single piece of wood is cut.",
    description: "We deliver full 4K architectural walkthroughs showing every custom cabinet, wall acoustic panel, sofa silhouette, and lighting scene in true-to-life materials.",
    deliverables: ["4K Photorealistic Renders", "Custom Joinery Blueprints", "Fabric & Veneer Physical Swatch Box"],
  },
  {
    step: "03",
    title: "Atelier Handcraft & Millwork",
    timeline: "Weeks 2 — 4",
    icon: Hammer,
    tagline: "Precision CNC cutting married with hand-buffed mortise joinery.",
    description: "Crafted directly inside our Srikalahasthi woodworking studio. You are invited to visit, inspect your raw timber slabs, and witness your pieces taking shape under master hands.",
    deliverables: ["Weekly Workshop Video Updates", "Pre-assembly Dry Run Inspection", "Zero-VOC Protective Finishing"],
  },
  {
    step: "04",
    title: "White-Glove Installation",
    timeline: "48 Hours Turnaround",
    icon: Truck,
    tagline: "Zero dust, zero stress. Walk in and immediately feel at home.",
    description: "Our dedicated installation artisans deliver, assemble, mount, and clean your sanctuary. We align drawer reveals to the millimeter and test every dimmable lighting circuit before handover.",
    deliverables: ["Dust-Free Room Sanitization", "5-Year Warranty Certificate", "Complimentary Care Kit"],
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="py-24 md:py-36 bg-[#0E0D0C] text-[#F4EFE6] border-t border-white/10 relative overflow-hidden select-none"
    >
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#F4EFE6_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24 space-y-4">
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent-terracotta)] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-terracotta)]" />
            Turnkey Architecture & Interior Wood Works
          </span>
          <h2 className="display-h2 font-serif text-white">
            The 4-Step Journey to Your Bespoke Sanctuary
          </h2>
          <p className="text-sm md:text-base text-[#A89F91] font-normal leading-relaxed">
            From initial site measurement to final pillow fluffing, we handle complete spatial architecture, electrical coordination, custom millwork, and furniture installation.
          </p>
        </div>

        {/* 4 Steps Grid with connecting line */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative p-7 rounded-3xl bg-[#171614] border border-white/10 hover:border-[var(--accent-terracotta)]/60 transition-all duration-300 flex flex-col justify-between space-y-6 hover:shadow-2xl hover:shadow-[var(--accent-terracotta)]/10"
              >
                {/* Step number & icon */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-light text-[var(--accent-terracotta)]">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--accent-peach)] group-hover:bg-[var(--accent-terracotta)] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-[var(--accent-butter)]">
                    {item.timeline}
                  </span>

                  <h3 className="font-serif text-xl font-medium text-white group-hover:text-[var(--accent-peach)] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#A89F91] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Deliverables */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block">
                    What You Receive:
                  </span>
                  {item.deliverables.map((d, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-center gap-2 text-xs text-white/80"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-sage)] shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Consultation Banner */}
        <div className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[#1C1A18] to-[#141312] border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="font-serif text-2xl md:text-3xl text-white">
              Planning a new home or renovation in Tirupati District?
            </h3>
            <p className="text-sm text-[#A89F91] max-w-xl">
              Meet our principal architect for a free 45-minute spatial consultation. Bring your builder floorplan or rough sketches.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <Link href="/#consultation">
              <MagneticButton variant="primary">
                <span>Book Free Design Session</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </Link>
            <a
              href="tel:9393972660"
              className="px-6 py-3 rounded-full border border-white/20 hover:border-white text-xs font-mono uppercase tracking-wider text-white transition-colors"
            >
              Call 9393972660
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
