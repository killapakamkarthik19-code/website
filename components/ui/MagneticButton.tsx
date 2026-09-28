"use client";

import React, { useRef, useState } from "react";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "glass";
}

export function MagneticButton({
  children,
  strength = 0.25,
  className = "",
  variant = "primary",
  onClick,
  ...props
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variantStyles = {
    primary:
      "bg-[var(--accent-terracotta)] text-white hover:bg-[var(--accent-terracotta-hover)] shadow-lg shadow-[var(--accent-terracotta-glow)]",
    secondary:
      "bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-medium)] hover:border-[var(--accent-terracotta)]",
    ghost:
      "bg-transparent text-[var(--text-primary)] hover:text-[var(--accent-terracotta)] border border-transparent hover:border-[var(--border-medium)]",
    glass:
      "glass-pill text-[var(--text-primary)] hover:border-[var(--accent-terracotta)]",
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 ? "transform 0.4s cubic-bezier(0.2, 0.9, 0.3, 1)" : "transform 0.1s ease-out",
      }}
      className={`relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm tracking-wide transition-colors duration-200 cursor-pointer overflow-hidden ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
