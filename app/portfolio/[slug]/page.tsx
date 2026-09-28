"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { ProductCard } from "@/components/ui/ProductCard";
import { PROJECTS } from "@/lib/projects";
import { PRODUCTS } from "@/lib/products";
import { ArrowLeft, MapPin, Calendar, Clock, Sparkles } from "lucide-react";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const project = PROJECTS.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const featuredProductItems = PRODUCTS.filter((p) =>
    project.featuredProducts.includes(p.id)
  );

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Header />

      <main className="pt-28 md:pt-36 pb-24 px-4 md:px-8 max-w-7xl mx-auto space-y-16">
        {/* Breadcrumb & Navigation */}
        <div className="space-y-4">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio Gallery</span>
          </Link>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-terracotta)]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{project.location}</span>
              <span>·</span>
              <span>{project.roomType}</span>
            </div>
            <h1 className="display-h1 font-serif text-[var(--text-primary)]">
              {project.title}
            </h1>
            <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl font-normal leading-relaxed">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Stats Highlight Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
          {project.stats.map((st) => (
            <div key={st.label}>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                {st.label}
              </span>
              <span className="font-serif text-xl md:text-2xl font-semibold text-[var(--text-primary)]">
                {st.value}
              </span>
            </div>
          ))}
        </div>

        {/* Before / After Transformation Spotlight */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent-terracotta)] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              The Transformation
            </span>
            <span className="text-xs font-mono text-[var(--text-muted)] hidden sm:block">
              Drag divider to compare Before & After
            </span>
          </div>
          <BeforeAfterSlider
            beforeImage={project.beforeImage}
            afterImage={project.afterImage}
            beforeAlt={`${project.title} original space`}
            afterAlt={`${project.title} completed architectural interior`}
          />
        </div>

        {/* Narrative & Testimonial Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-serif text-2xl md:text-3xl text-[var(--text-primary)]">
              Spatial Narrative & Execution
            </h3>
            <div className="text-sm md:text-base text-[var(--text-secondary)] space-y-4 leading-relaxed font-normal">
              <p>{project.description}</p>
              <p>
                Every joint in this residence was custom engineered to withstand climate humidity variations without settling cracks. Using Burma teak frames paired with raw linen cushions and satin brass hardware, we established an unbroken visual continuum across all living zones.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 p-8 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent-butter)] block">
              Homeowner Words
            </span>
            <p className="font-serif text-lg italic text-[var(--text-primary)] leading-relaxed">
              &ldquo;{project.clientTestimonial.quote}&rdquo;
            </p>
            <div className="pt-3 border-t border-[var(--border-subtle)]">
              <span className="text-xs font-medium text-[var(--text-primary)] block">
                {project.clientTestimonial.author}
              </span>
              <span className="text-[11px] text-[var(--text-secondary)]">
                {project.clientTestimonial.role}
              </span>
            </div>
          </div>
        </div>

        {/* Featured Custom Pieces Used in this Residence */}
        {featuredProductItems.length > 0 && (
          <div className="space-y-6 pt-10 border-t border-[var(--border-subtle)]">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent-terracotta)] block">
                Custom Millwork Commissioned
              </span>
              <h3 className="font-serif text-2xl text-[var(--text-primary)] mt-1">
                Pieces in this Sanctuary
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProductItems.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
