"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUp,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Check,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setSubscribed(true);

    try {
      // 1. Send email notification via Web3Forms
      const web3formData = new FormData();
      web3formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "5e8f6780-e765-454a-b1e3-5aee058ff921");
      web3formData.append("subject", `New Newsletter Subscriber: ${email}`);
      web3formData.append("from_name", "GYP SIGNATURES Website");
      web3formData.append("Subscriber Email", email);
      web3formData.append("Type", "Sanctuary Chronicles Newsletter Subscription");

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: web3formData,
      }).catch((e) => console.log("Web3Forms error:", e));
    } catch (err) {
      console.error("Newsletter error:", err);
    }

    setTimeout(() => {
      setEmail("");
    }, 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0E0D0C] text-[#F4EFE6] pt-20 md:pt-28 pb-12 px-4 md:px-8 border-t border-white/10 overflow-hidden select-none">
      {/* Background oversized wordmark */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none opacity-[0.035] -z-0">
        <span className="font-serif text-[13vw] font-bold tracking-tight text-white whitespace-nowrap block leading-none">
          GYP SIGNATURES
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Top Newsletter & Brand Pitch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/20">
                <Image
                  src="/logo.jpg"
                  alt="GYP SIGNATURES Logo"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                GYP SIGNATURES
              </span>
            </div>
            <p className="text-sm text-[#A89F91] max-w-md leading-relaxed">
              Bespoke furniture and turnkey interior architecture. Designed with soul, mastercrafted in Srikalahasthi, built to be passed down across generations.
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-terracotta)] block">
              Sanctuary Chronicles Newsletter
            </span>
            <p className="text-xs text-[#A89F91]">
              Receive private lookbooks of new releases, woodworking stories, and interior styling guides.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-full bg-[#181715] border border-white/15 focus:border-[var(--accent-terracotta)] text-xs text-white outline-none transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[var(--accent-terracotta)] hover:bg-[var(--accent-terracotta-hover)] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Subscribed
                  </>
                ) : (
                  <>
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* 4 Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-xs">
          {/* Col 1: Shop Categories */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/50">
              Collections
            </h4>
            <ul className="space-y-2.5 text-[#A89F91]">
              <li>
                <Link href="/shop?category=sofas" className="hover:text-white transition-colors">
                  Sofas & Sectionals
                </Link>
              </li>
              <li>
                <Link href="/shop?category=beds" className="hover:text-white transition-colors">
                  Platform Beds & Hydraulic
                </Link>
              </li>
              <li>
                <Link href="/shop?category=dining" className="hover:text-white transition-colors">
                  Solid Wood Dining Suites
                </Link>
              </li>
              <li>
                <Link href="/shop?category=chairs" className="hover:text-white transition-colors">
                  Accent & Executive Chairs
                </Link>
              </li>
              <li>
                <Link href="/shop?category=storage" className="hover:text-white transition-colors">
                  Tambour Consoles & Wardrobes
                </Link>
              </li>
              <li>
                <Link href="/shop?category=lighting" className="hover:text-white transition-colors">
                  Ceramic & Brass Lighting
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Services & Millwork */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/50">
              Services & Wood Works
            </h4>
            <ul className="space-y-2.5 text-[#A89F91]">
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Full Interior Turnkey Design
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Custom Teak Wood Works
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Modular Kitchens & Pantries
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Acoustic Fluted Paneling
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Bespoke Commercial Fitouts
                </Link>
              </li>
              <li>
                <Link href="/#craft" className="hover:text-white transition-colors">
                  Complimentary Swatch Kits
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Studio & Market Location */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/50">
              Atelier & Location
            </h4>
            <div className="space-y-2.5 text-[#A89F91]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[var(--accent-terracotta)] shrink-0 mt-0.5" />
                <span>
                  Srikalahasthi, Tirupati District,<br />
                  Andhra Pradesh, INDIA — 517644
                </span>
              </div>
              <div>
                <a
                  href="https://share.google/SDO6mLLMBKUosE16b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-butter)] hover:underline inline-flex items-center gap-1 font-mono text-[11px]"
                >
                  View on Google Maps <ArrowRight className="w-3 h-3" />
                </a>
              </div>
              <div className="pt-2 text-[11px] text-white/60">
                Experience Center Open:<br />
                Mon — Sun: 9:00 AM — 9:00 PM IST
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Socials */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/50">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-[#A89F91]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[var(--accent-terracotta)] shrink-0" />
                <a href="tel:9393972660" className="hover:text-white font-mono">
                  +91 9393972660
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--accent-sage)] shrink-0" />
                <a
                  href="mailto:gypsignatures@gmail.com"
                  className="hover:text-white font-mono break-all"
                >
                  gypsignatures@gmail.com
                </a>
              </div>

              {/* Social Pills */}
              <div className="flex items-center gap-2 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[var(--accent-terracotta)] flex items-center justify-center text-white transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/919393972660"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors font-mono text-[10px] flex items-center gap-1"
                >
                  WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Back to top */}
        <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A89F91] font-mono">
          <div className="flex items-center gap-4 flex-wrap">
            <span>© {new Date().getFullYear()} GYP SIGNATURES. All rights reserved.</span>
            <span>·</span>
            <span>Crafted with pride in Srikalahasthi, Andhra Pradesh.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 hover:border-white text-white transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[var(--accent-terracotta)]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
