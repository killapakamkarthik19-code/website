"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ROOMS } from "@/lib/rooms";

export function ShopByRoom() {
  return (
    <section id="rooms" className="py-24 md:py-36 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent-terracotta)] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-terracotta)]" />
            Curated Spaces
          </span>
          <h2 className="display-h2 font-serif text-[var(--text-primary)] mt-3">
            Shop by Room Sanctuaries
          </h2>
        </div>
        <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-md">
          Explore complete room environments curated by our art directors. Every piece is proportioned to flow harmoniously together.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[280px] md:auto-rows-[340px]">
        {ROOMS.map((room) => {
          return (
            <Link
              key={room.id}
              href={`/shop?room=${room.slug}`}
              data-cursor="View"
              className={`group relative rounded-3xl overflow-hidden border border-[var(--border-subtle)] hover:border-[var(--accent-terracotta)]/50 transition-all duration-500 shadow-xl cursor-pointer ${room.gridSpan}`}
            >
              {/* Background Photography */}
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 group-hover:from-black/90 transition-all duration-300" />

              {/* Top Meta Tag */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-black/40 backdrop-blur-md border border-white/10 text-[#F4EFE6]">
                  {room.itemCount} Designs
                </span>
                <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[var(--accent-terracotta)] group-hover:border-transparent transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-6 left-6 right-6 z-10 space-y-1.5">
                <h3 className="font-serif text-2xl md:text-3xl text-white font-medium tracking-tight group-hover:text-[var(--accent-peach)] transition-colors">
                  {room.name}
                </h3>
                <p className="text-xs text-white/75 font-sans line-clamp-1 max-w-sm">
                  {room.tagline}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs text-[var(--accent-butter)] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Shop This Sanctuary</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
