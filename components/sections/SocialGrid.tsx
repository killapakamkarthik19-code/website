"use client";

import React from "react";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

const SOCIAL_POSTS = [
  {
    image: "/images/social/social-1.jpg",
    caption: "Morning sunlight touching hand-sanded teak grain in our Srikalahasthi studio.",
    likes: "428",
    comments: "32",
  },
  {
    image: "/images/social/social-2.jpg",
    caption: "The Nila Loveseat styled in a Tirupati apartment sanctuary.",
    likes: "612",
    comments: "45",
  },
  {
    image: "/images/social/social-3.jpg",
    caption: "Solid Burma teak dining table installation day at Swarnamukhi Villa.",
    likes: "589",
    comments: "38",
  },
  {
    image: "/images/social/social-4.jpg",
    caption: "Tambour slatted curves in progress. Master woodturner Ramu at work.",
    likes: "734",
    comments: "62",
  },
  {
    image: "/images/social/social-5.jpg",
    caption: "Octagonal cane weaving by our women artisan collective in Andhra Pradesh.",
    likes: "892",
    comments: "74",
  },
  {
    image: "/images/social/social-6.jpg",
    caption: "Client reveal day! 4,200 sq.ft turnkey residence handover.",
    likes: "945",
    comments: "88",
  },
];

export function SocialGrid() {
  return (
    <section className="py-24 md:py-36 px-4 md:px-8 max-w-7xl mx-auto border-t border-[var(--border-subtle)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-14">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent-terracotta)] flex items-center gap-2">
            <InstagramIcon className="w-3.5 h-3.5" />
            @gypsignatures
          </span>
          <h2 className="display-h2 font-serif text-[var(--text-primary)] mt-3">
            Life Inside the Atelier
          </h2>
        </div>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-terracotta)] text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] transition-all cursor-pointer"
        >
          <InstagramIcon className="w-4 h-4 text-[var(--accent-terracotta)]" />
          <span>Follow Us on Instagram</span>
        </a>
      </div>

      {/* Grid of 6 Photos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {SOCIAL_POSTS.map((post, idx) => (
          <a
            key={idx}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="View"
            className="group relative aspect-square rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-subtle)] cursor-pointer"
          >
            <Image
              src={post.image}
              alt={post.caption}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Hover Scrim with engagement stats */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
              <div className="flex justify-end">
                <InstagramIcon className="w-4 h-4 text-[var(--accent-peach)]" />
              </div>
              <p className="text-[10px] line-clamp-2 text-white/80 font-sans leading-tight">
                {post.caption}
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--accent-butter)]">
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-current" /> {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" /> {post.comments}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
