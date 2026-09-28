"use client";

import React, { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouchDevice) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const onMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "a, button, input, select, textarea, [role='button'], [data-cursor]"
      );
      setIsHovered(!!interactive);
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;
    const render = () => {
      setPos((prev) => ({
        x: lerp(prev.x, targetPos.x, 0.18),
        y: lerp(prev.y, targetPos.y, 0.18),
      }));
      animFrameRef.current = requestAnimationFrame(render);
    };
    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [targetPos, isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Small pinpoint dot */}
      <div
        className="fixed pointer-events-none z-[99999] rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          left: `${targetPos.x}px`,
          top: `${targetPos.y}px`,
          width: isHovered ? "0px" : "6px",
          height: isHovered ? "0px" : "6px",
          backgroundColor: "var(--accent-terracotta)",
        }}
      />

      {/* Subtle follow ring — never shows text, never turns orange */}
      <div
        className={`fixed pointer-events-none z-[99998] rounded-full -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-200 ease-out ${
          isHovered
            ? "w-10 h-10 border border-[var(--accent-terracotta)] bg-transparent"
            : "w-8 h-8 border border-[var(--text-secondary)] bg-transparent opacity-50"
        }`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      />
    </>
  );
}
