"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Room before transformation",
  afterAlt = "Room after transformation by GYP SIGNATURES",
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(clampedPct);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleStart = () => {
    isDragging.current = true;
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onMouseMove={handleMouseMove}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onTouchMove={handleTouchMove}
      className={`relative select-none overflow-hidden rounded-3xl border border-[var(--border-subtle)] shadow-2xl cursor-ew-resize ${className}`}
      style={{ aspectRatio: "16/10" }}
    >
      {/* After Image (Background full bleed) */}
      <Image
        src={afterImage}
        alt={afterAlt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover pointer-events-none"
      />

      {/* Before Image (Clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
        }}
      >
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        {/* Subtle grayer mood tone on before image */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Badges */}
      <div className="absolute top-6 left-6 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono tracking-wider uppercase text-white/80 border border-white/10 pointer-events-none">
        Before Construction
      </div>
      <div className="absolute top-6 right-6 z-10 px-3 py-1 rounded-full bg-[var(--accent-terracotta)] text-[10px] font-mono tracking-wider uppercase text-white font-medium shadow-lg pointer-events-none">
        After GYP Millwork
      </div>

      {/* Draggable Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20 pointer-events-none -translate-x-1/2"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle Pill */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-black shadow-2xl flex items-center justify-center border-2 border-[var(--accent-terracotta)]">
          <ChevronsLeftRight className="w-5 h-5 text-[var(--accent-terracotta)]" />
        </div>
      </div>
    </div>
  );
}
