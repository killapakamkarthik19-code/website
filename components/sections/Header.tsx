"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Sun,
  Moon,
  Menu,
  X,
  Phone,
  ArrowRight,
  Compass,
  Sparkles,
} from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { useCartStore } from "@/store/cartStore";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { openCart, totalItems, wishlist } = useCartStore();

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolledPastHero(currentScrollY > 120);

      if (currentScrollY > lastScrollY && currentScrollY > 180) {
        // Scrolling down -> hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up -> show navbar
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Rooms", href: "/#rooms" },
    { label: "Featured", href: "/#featured" },
    { label: "Projects", href: "/portfolio" },
    { label: "Services", href: "/#services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const cartCount = totalItems();
  const wishlistCount = wishlist.length;

  return (
    <>
      {/* Floating Pill Header */}
      <header
        className={`fixed top-4 md:top-6 inset-x-0 z-[9990] flex justify-center px-4 transition-transform duration-500 ease-in-out pointer-events-none ${
          isVisible ? "translate-y-0" : "-translate-y-28"
        }`}
      >
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-4 md:gap-8 px-4 md:px-7 py-2.5 md:py-3.5 rounded-full transition-all duration-300 max-w-6xl w-full ${
            scrolledPastHero
              ? "glass-pill shadow-2xl backdrop-blur-xl"
              : "bg-[var(--glass-bg)]/80 backdrop-blur-lg border border-[var(--border-subtle)] shadow-lg"
          }`}
          aria-label="Main Navigation"
        >
          {/* Brand Identity */}
          <Link
            href="/"
            className="flex items-center gap-3 group cursor-pointer"
            id="brand-logo"
          >
            <div className="relative w-8 h-8 md:w-9 md:h-9 rounded-xl overflow-hidden border border-white/20 group-hover:scale-105 transition-transform">
              <Image
                src="/logo.jpg"
                alt="GYP SIGNATURES Logo"
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm md:text-base font-bold tracking-tight text-[var(--text-primary)] leading-none">
                GYP SIGNATURES
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--accent-terracotta)] font-medium mt-0.5">
                Srikalahasthi
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 text-xs tracking-wider uppercase font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[var(--accent-terracotta)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 md:p-2.5 rounded-full hover:bg-[var(--bg-tertiary)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              aria-label="Toggle dark/light theme"
              title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-[var(--accent-butter)]" />
              ) : (
                <Moon className="w-4 h-4 text-[var(--text-primary)]" />
              )}
            </button>

            {/* Wishlist Link */}
            <Link
              href="/shop"
              className="relative p-2 md:p-2.5 rounded-full hover:bg-[var(--bg-tertiary)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer hidden sm:flex items-center justify-center"
              aria-label="View Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[var(--accent-terracotta)] text-white text-[10px] flex items-center justify-center font-mono">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-terracotta)] transition-colors cursor-pointer"
              aria-label="Open Cart"
              id="header-cart-btn"
            >
              <ShoppingBag className="w-4 h-4 text-[var(--accent-terracotta)]" />
              <span className="text-xs font-mono font-medium text-[var(--text-primary)]">
                {cartCount}
              </span>
            </button>

            {/* Book Consultation CTA (Desktop) */}
            <Link
              href="/#consultation"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--accent-terracotta)] text-white text-xs font-medium tracking-wide hover:bg-[var(--accent-terracotta-hover)] transition-all shadow-md shadow-[var(--accent-terracotta-glow)] cursor-pointer"
            >
              <span>Consult</span>
              <Sparkles className="w-3 h-3" />
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)] cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-[9989] bg-[var(--bg-primary)]/98 backdrop-blur-2xl flex flex-col justify-between p-6 pt-28 pb-12 lg:hidden"
          >
            <div className="space-y-6">
              <span className="text-[11px] tracking-widest uppercase text-[var(--text-muted)] font-mono">
                Explore GYP SIGNATURES
              </span>
              <div className="flex flex-col space-y-4">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-serif text-3xl font-medium text-[var(--text-primary)] hover:text-[var(--accent-terracotta)] transition-colors flex items-center justify-between py-1 border-b border-[var(--border-subtle)]"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-5 h-5 text-[var(--text-muted)]" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom contact & actions */}
            <div className="space-y-4 pt-6 border-t border-[var(--border-subtle)]">
              <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                <span>Direct Studio Hotline:</span>
                <a
                  href="tel:9393972660"
                  className="font-mono text-[var(--accent-terracotta)] font-medium flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" /> 9393972660
                </a>
              </div>
              <a
                href="https://wa.me/919393972660"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#25D366] text-white font-medium text-xs tracking-wide shadow-lg"
              >
                <span>Chat with Interior Designer on WhatsApp</span>
              </a>
              <Link
                href="/#consultation"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[var(--accent-terracotta)] text-white font-medium text-xs tracking-wide shadow-lg shadow-[var(--accent-terracotta-glow)]"
              >
                <span>Book Free Design Consultation</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
