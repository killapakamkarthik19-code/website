"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { PROJECTS } from "@/lib/projects";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

export function Portfolio() {
  const [activeProject, setActiveProject] = useState(PROJECTS[0]);

  return (
    <section id="portfolio" className="py-24 md:py-36 px-4 md:px-8 max-w-7xl mx-auto border-t border-[var(--border-subtle)]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent-terracotta)] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Built In Andhra Pradesh
          </span>
          <h2 className="display-h2 font-serif text-[var(--text-primary)] mt-3">
            Realized Sanctuaries & Millwork
          </h2>
        </div>
        <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-md">
          Step inside recent architectural interior transformations executed across Srikalahasthi, Tirupati, and Rayalaseema.
        </p>
      </div>

      {/* Featured Flagship Before/After Spotlight */}
      <div className="mb-16 p-6 md:p-10 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Draggable Slider */}
          <div className="lg:col-span-7">
            <BeforeAfterSlider
              beforeImage={activeProject.beforeImage}
              afterImage={activeProject.afterImage}
              beforeAlt={`${activeProject.title} before work`}
              afterAlt={`${activeProject.title} after custom millwork`}
            />
            <p className="text-[11px] font-mono text-[var(--text-muted)] text-center mt-3 uppercase tracking-wider">
              ✦ Drag handle horizontally to reveal room transformation
            </p>
          </div>

          {/* Project Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-terracotta)]">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeProject.location}</span>
                <span>·</span>
                <span>{activeProject.year}</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-[var(--text-primary)] font-medium">
                {activeProject.title}
              </h3>
              <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
                {activeProject.description}
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {activeProject.stats.map((st) => (
                <div
                  key={st.label}
                  className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)]"
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                    {st.label}
                  </span>
                  <span className="text-sm font-serif font-semibold text-[var(--text-primary)]">
                    {st.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Client Testimonial Callout */}
            <div className="p-4 rounded-2xl bg-[var(--bg-tertiary)]/50 border-l-2 border-[var(--accent-terracotta)] space-y-1">
              <p className="text-xs italic text-[var(--text-primary)] font-serif leading-relaxed">
                &ldquo;{activeProject.clientTestimonial.quote}&rdquo;
              </p>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block pt-1">
                — {activeProject.clientTestimonial.author} ({activeProject.clientTestimonial.role})
              </span>
            </div>

            {/* Link to detail */}
            <Link
              href={`/portfolio/${activeProject.slug}`}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent-terracotta)] hover:underline"
            >
              <span>View Full Case Study & Floorplans</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Grid of Other Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((proj) => (
          <div
            key={proj.id}
            onClick={() => setActiveProject(proj)}
            data-cursor="View"
            className={`group relative rounded-3xl overflow-hidden bg-[var(--bg-secondary)] border transition-all duration-300 cursor-pointer ${
              activeProject.id === proj.id
                ? "border-[var(--accent-terracotta)] shadow-xl"
                : "border-[var(--border-subtle)] hover:border-[var(--border-medium)]"
            }`}
          >
            {/* Image */}
            <div className="relative aspect-[16/11] overflow-hidden">
              <Image
                src={proj.coverImage}
                alt={proj.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/50 backdrop-blur-md text-white border border-white/10">
                  {proj.roomType}
                </span>
                <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[var(--accent-terracotta)] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-10">
                <h4 className="font-serif text-lg text-white font-medium line-clamp-1">
                  {proj.title}
                </h4>
              </div>
            </div>

            {/* Bottom mini bar */}
            <div className="p-4 flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono">
              <span>{proj.area}</span>
              <span className="text-[var(--accent-terracotta)] font-medium">
                {proj.budgetRange}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
