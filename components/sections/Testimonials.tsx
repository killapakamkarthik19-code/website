"use client";

import React, { useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  location: string;
  role: string;
  furniture: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "We spent months visiting furniture malls in Bangalore and Chennai, but nothing came close to the wood thickness, grain matching, and personalized dimensions that GYP SIGNATURES delivered in Srikalahasthi. Our living room feels like an architectural sanctuary.",
    name: "Siddharth & Meera Rao",
    location: "Alipiri, Tirupati",
    role: "First-Time Apartment Owners",
    furniture: "Haveli 3-Seater Sofa & Chakra Round Table",
  },
  {
    quote: "As a product designer, I am obsessed with tolerances. The tambour slatted sliding mechanism on our Koshi media unit is pure poetry. Zero wobbling, silent glide, and the natural oil finish smells of pure forest.",
    name: "Arjun Varma",
    location: "Srikalahasthi",
    role: "Design Lead & Remote Technologist",
    furniture: "Koshi Media Console & Dew Swivel Chair",
  },
  {
    quote: "Our ancestral courtyard needed modern furniture that wouldn't disrespect the original architecture. Their team custom-proportioned the Nimbus Cane Daybeds with local handloom cushions. Guests cannot stop taking photos.",
    name: "Dr. K. Jayasree",
    location: "Bazaar Street, Srikalahasthi",
    role: "Pediatrician & Heritage Homeowner",
    furniture: "Nimbus Daybed & Surya Armchair Pair",
  },
  {
    quote: "The white-glove installation crew was exceptional. They arrived on time in Tirupati, laid protective mats over our Italian marble, assembled the hydraulic storage bed with precision, and cleaned up every speck of dust.",
    name: "Naveen & Prathyusha K.",
    location: "Padmavathi Puram, Tirupati",
    role: "Software Engineers",
    furniture: "Lotus Hydraulic Bed & Veda King Suite",
  },
  {
    quote: "Being able to walk into their Srikalahasthi workshop, smell the timber, and shake hands with the artisans who made our dining table was the most memorable purchasing experience of our wedding year.",
    name: "Gautham & Pooja Reddy",
    location: "Chandragiri Road, Tirupati Dist.",
    role: "Entrepreneurs",
    furniture: "Mati Live Edge Acacia Dining Set",
  },
];

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = direction === "left" ? -420 : 420;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="py-24 md:py-36 px-4 md:px-8 max-w-7xl mx-auto border-t border-[var(--border-subtle)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent-terracotta)] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-terracotta)]" />
            Client Reverberations
          </span>
          <h2 className="display-h2 font-serif text-[var(--text-primary)] mt-3">
            Loved by Modern Homeowners
          </h2>
        </div>

        {/* Carousel buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full border border-[var(--border-subtle)] hover:border-[var(--accent-terracotta)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full border border-[var(--border-subtle)] hover:border-[var(--accent-terracotta)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Testimonials Carousel Rail */}
      <div
        ref={scrollRef}
        data-cursor="Drag"
        className="flex gap-6 overflow-x-auto no-scrollbar pb-6 pt-2 scroll-smooth"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {TESTIMONIALS.map((t, idx) => (
          <div
            key={idx}
            className="w-[320px] sm:w-[420px] md:w-[460px] shrink-0 p-8 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex flex-col justify-between space-y-6 shadow-md"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[var(--accent-butter)]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-[var(--accent-terracotta)] opacity-40" />
              </div>

              <p className="font-serif text-base md:text-lg italic text-[var(--text-primary)] leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-[var(--text-primary)]">
                  {t.name}
                </span>
                <span className="text-[11px] font-mono text-[var(--accent-sage)]">
                  Verified Buyer
                </span>
              </div>
              <div className="text-xs text-[var(--text-secondary)]">
                {t.role} · {t.location}
              </div>
              <div className="text-[11px] text-[var(--text-muted)] font-mono pt-1">
                Custom Pieces: {t.furniture}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
