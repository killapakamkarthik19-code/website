"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Filter } from "lucide-react";
import { PROJECTS } from "@/lib/projects";

const FILTERS = ["All", "Living", "Bedroom", "Dining", "Kitchen", "Full Architecture"];

export default function PortfolioPage() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.roomType.toLowerCase().includes(active.toLowerCase()));

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] pt-28 pb-24">
      <section className="px-6 md:px-12 lg:px-20 mb-16 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent-terracotta)] flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-[var(--accent-terracotta)]" />
              Our Work
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-[var(--text-primary)] leading-none">
              Portfolio
            </h1>
            <p className="mt-4 text-[var(--text-secondary)] max-w-xl text-base leading-relaxed">
              Every project begins with a conversation. Browse our completed interiors across Andhra Pradesh — from intimate apartments to sprawling villas.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] font-mono">
            <Filter className="w-4 h-4" />
            <span>{filtered.length} Projects</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-8">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-full text-xs font-medium font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                active === f
                  ? "bg-[var(--accent-terracotta)] text-white border-[var(--accent-terracotta)] shadow-lg"
                  : "bg-transparent text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--accent-terracotta)] hover:text-[var(--text-primary)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filtered.map((proj, i) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <Link
                  href={`/portfolio/${proj.slug}`}
                  className="group block rounded-3xl overflow-hidden border border-[var(--border-subtle)] hover:border-[var(--accent-terracotta)]/50 transition-all duration-500 bg-[var(--bg-secondary)] hover:shadow-2xl"
                >
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={proj.coverImage}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/50 backdrop-blur-md text-white border border-white/10">
                        {proj.roomType}
                      </span>
                      <span className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[var(--accent-terracotta)] transition-colors duration-300">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                      <h2 className="font-serif text-xl font-medium leading-tight">{proj.title}</h2>
                    </div>
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex gap-4">
                      {proj.stats.slice(0, 2).map((s) => (
                        <div key={s.label}>
                          <p className="text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-wider">{s.label}</p>
                          <p className="text-sm font-semibold text-[var(--text-primary)] mt-0.5">{s.value}</p>
                        </div>
                      ))}
                    </div>
                    <span className="text-xs font-mono text-[var(--text-muted)]">{proj.year}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="mt-24 px-6 md:px-12 lg:px-20 max-w-4xl mx-auto text-center">
        <div className="rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-12 md:p-16">
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">Have a Space in Mind?</h3>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto mb-8">
            Book a free 30-minute consultation with our design team. We will visit your site and craft a bespoke proposal.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--accent-terracotta)] text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg"
          >
            Book Free Consultation
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
