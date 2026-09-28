"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Check if user has already seen loader in this session
    const hasLoaded = sessionStorage.getItem("gyp-loader-seen");
    if (hasLoaded) {
      setIsComplete(true);
      return;
    }

    const duration = 1600; // 1.6s
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(updateCounter);
      } else {
        setTimeout(() => {
          setIsComplete(true);
          sessionStorage.setItem("gyp-loader-seen", "true");
        }, 300);
      }
    };

    const frameId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[999999] bg-[#0E0D0C] text-[#F4EFE6] flex flex-col justify-between p-8 md:p-14 select-none pointer-events-auto"
        >
          {/* Top meta */}
          <div className="flex justify-between items-center text-xs tracking-widest uppercase text-[#A89F91]">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-terracotta)] animate-pulse" />
              Srikalahasthi · Tirupati District
            </span>
            <span className="font-mono">EST. 2020</span>
          </div>

          {/* Center Brand Identity */}
          <div className="flex flex-col items-center justify-center space-y-6 text-center my-auto">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <Image
                src="/logo.jpg"
                alt="GYP SIGNATURES Emblem"
                fill
                priority
                sizes="128px"
                className="object-cover"
              />
            </motion.div>

            <div className="space-y-1">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-serif text-3xl md:text-5xl font-bold tracking-tight"
              >
                GYP SIGNATURES
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#A89F91]"
              >
                Furniture That Feels Like Home
              </motion.p>
            </div>
          </div>

          {/* Bottom Counter Bar */}
          <div className="w-full flex items-end justify-between border-t border-white/10 pt-6">
            <div className="text-xs text-[#A89F91] tracking-wider uppercase hidden sm:block">
              Mastercrafted Living & Wood Works
            </div>
            <div className="flex items-baseline gap-1 font-serif text-4xl md:text-6xl font-light">
              <span>{progress.toString().padStart(2, "0")}</span>
              <span className="text-sm font-sans text-[var(--accent-terracotta)]">
                %
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
