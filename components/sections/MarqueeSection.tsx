"use client";

import React from "react";
import { motion } from "framer-motion";

const MARQUEE_ITEMS_1 = [
  "LIVING SANCTUARIES",
  "BURMA TEAK WOOD WORKS",
  "FULL INTERIOR DESIGN",
  "SRIKALAHASTHI ATELIER",
  "BESPOKE BEDROOM SUITES",
  "SCULPTURAL DINING TABLES",
];

const MARQUEE_ITEMS_2 = [
  "ANDHRA PRADESH",
  "GEN Z FIRST HOMES",
  "MODULAR KITCHENS",
  "5-YEAR WARRANTY",
  "WHITE-GLOVE INSTALL",
  "ACOUSTIC MILLWORK",
];

export function MarqueeSection() {
  return (
    <section
      id="marquee"
      className="py-12 md:py-16 overflow-hidden border-y border-[var(--border-subtle)] bg-[var(--bg-secondary)]/40 relative select-none"
    >
      {/* Row 1: Leftward scroll */}
      <div className="flex overflow-hidden whitespace-nowrap mb-4">
        <motion.div
          animate={{ x: [0, -1400] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 28,
          }}
          className="flex items-center gap-8 text-2xl md:text-5xl font-serif tracking-tight text-[var(--text-primary)]"
        >
          {[...MARQUEE_ITEMS_1, ...MARQUEE_ITEMS_1, ...MARQUEE_ITEMS_1].map(
            (item, index) => (
              <span key={index} className="flex items-center gap-8">
                <span
                  className={
                    index % 2 === 0
                      ? "font-normal"
                      : "text-outline font-light opacity-80"
                  }
                >
                  {item}
                </span>
                <span className="text-[var(--accent-terracotta)] text-lg md:text-2xl">
                  ✦
                </span>
              </span>
            )
          )}
        </motion.div>
      </div>

      {/* Row 2: Rightward scroll */}
      <div className="flex overflow-hidden whitespace-nowrap">
        <motion.div
          animate={{ x: [-1400, 0] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 32,
          }}
          className="flex items-center gap-8 text-2xl md:text-5xl font-serif tracking-tight text-[var(--text-secondary)]"
        >
          {[...MARQUEE_ITEMS_2, ...MARQUEE_ITEMS_2, ...MARQUEE_ITEMS_2].map(
            (item, index) => (
              <span key={index} className="flex items-center gap-8">
                <span
                  className={
                    index % 2 !== 0
                      ? "font-normal text-[var(--text-primary)]"
                      : "text-outline font-light opacity-70"
                  }
                >
                  {item}
                </span>
                <span className="text-[var(--accent-sage)] text-lg md:text-2xl">
                  ✦
                </span>
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
