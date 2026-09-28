import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Hammer, Users, Award, MapPin, Quote, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | GYP SIGNATURES — Srikalahasthi Interior Designers",
  description: "Meet P. Gayathri, Founder & CEO of GYP SIGNATURES — Andhra Pradesh's most loved bespoke furniture and interior design studio, based in Srikalahasthi.",
};

const STATS = [
  { label: "Years of Craft", value: "14+" },
  { label: "Projects Delivered", value: "320+" },
  { label: "Happy Families", value: "280+" },
  { label: "Artisans on Team", value: "35+" },
];

const TEAM = [
  { name: "GYP Raju", role: "Master Craftsman", bio: "Third-generation woodworker, trained in Shekhawati inlay traditions and Burmese teak joinery.", image: "/images/hero/about-craft.jpg" },
  { name: "Priya Lakshmi", role: "Lead Interior Architect", bio: "CIDA certified, 12 years designing apartments and villas across Tirupati, Guntur, and Vijayawada.", image: "/images/hero/workshop-artisan.jpg" },
  { name: "Venkat Rao", role: "3D Visualisation & Planning", bio: "Creates photorealistic renders before a single nail is driven, so clients see their dream before it exists.", image: "/images/rooms/bedroom.jpg" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] pt-28 pb-24">

      {/* ══ FOUNDER HERO — P. GAYATHRI ══ */}
      <section className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto mb-24">

        {/* Eyebrow label */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-[var(--accent-terracotta)] flex items-center justify-center gap-3">
            <span className="w-10 h-px bg-[var(--accent-terracotta)]" />
            The Visionary Behind the Brand
            <span className="w-10 h-px bg-[var(--accent-terracotta)]" />
          </span>
        </div>

        {/* Main Founder Card */}
        <div className="relative rounded-[2rem] overflow-hidden border border-[var(--border-subtle)] shadow-2xl bg-[var(--bg-secondary)]">

          {/* Ambient glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--accent-terracotta)]/8 blur-[120px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--accent-butter)]/5 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative grid lg:grid-cols-2 min-h-[680px]">

            {/* Left — Portrait */}
            <div className="relative min-h-[480px] lg:min-h-full overflow-hidden bg-gradient-to-br from-[#1a1208] to-[#0d0d0d]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/founder-gayathri.jpg"
                alt="P. Gayathri — Founder & CEO, GYP SIGNATURES"
                className="absolute inset-0 w-full h-full object-cover object-[center_top]"
                loading="eager"
              />
              {/* Right-edge fade to card bg on desktop */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-secondary)]/60 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[var(--bg-secondary)]" />

              {/* Floating badge — bottom-left */}
              <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-terracotta)] animate-pulse" />
                <span className="text-[11px] text-white/70 font-mono uppercase tracking-wider">Srikalahasthi, AP</span>
              </div>
            </div>

            {/* Right — Story */}
            <div className="relative flex flex-col justify-center px-10 py-14 lg:pl-14 lg:pr-16">

              {/* Sparkle icon */}
              <div className="w-12 h-12 rounded-2xl bg-[var(--accent-terracotta)]/10 border border-[var(--accent-terracotta)]/20 flex items-center justify-center mb-8">
                <Sparkles className="w-5 h-5 text-[var(--accent-terracotta)]" />
              </div>

              {/* Title pill */}
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent-terracotta)]/10 border border-[var(--accent-terracotta)]/30 text-[var(--accent-terracotta)] text-[11px] font-mono uppercase tracking-widest w-fit mb-5">
                Founder &amp; CEO
              </span>

              {/* Name */}
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-[var(--text-primary)] leading-none tracking-tight mb-1">
                P. Gayathri
              </h1>
              <div className="flex items-center gap-3 mb-8">
                <span className="h-px w-12 bg-[var(--accent-terracotta)]" />
                <span className="text-xs text-[var(--accent-butter)] font-mono uppercase tracking-widest">GYP SIGNATURES</span>
              </div>

              {/* Story */}
              <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-5">
                GYP SIGNATURES was born from one woman's uncompromising conviction — that every home in Andhra Pradesh deserves interiors that are both soulful and masterfully crafted. P. Gayathri founded this studio with a single goal: to bring Awwwards-level design thinking to the families of Srikalahasthi and beyond.
              </p>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8">
                Under her leadership, the brand has grown from a boutique workshop into Andhra Pradesh's most trusted full-service interior design and bespoke furniture studio — completing 320+ projects while never compromising on material quality, craft, or client care.
              </p>

              {/* Pull quote */}
              <blockquote className="border-l-2 border-[var(--accent-terracotta)] pl-5 mb-8">
                <Quote className="w-4 h-4 text-[var(--accent-terracotta)] mb-2 opacity-60" />
                <p className="font-serif italic text-lg text-[var(--text-primary)] leading-relaxed">
                  "Your home should feel like the truest version of you — not a showroom, not a catalogue. That is what we build."
                </p>
                <span className="text-xs text-[var(--text-muted)] font-mono mt-2 block">— P. Gayathri</span>
              </blockquote>

              {/* CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent-terracotta)] text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg w-fit"
              >
                Work With Us <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-terracotta)]/30 transition-colors">
              <p className="font-serif text-5xl font-bold text-[var(--accent-terracotta)] mb-2">{s.value}</p>
              <p className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Story */}
      <section className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto mb-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent-terracotta)] flex items-center gap-2">
              <span className="w-8 h-px bg-[var(--accent-terracotta)]" />
              Our Story
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-none tracking-tight">
              Crafted in<br />Srikalahasthi
            </h2>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed">
              GYP SIGNATURES began as a one-woman vision in the temple town of Srikalahasthi. Today it stands as Andhra Pradesh's most trusted bespoke furniture atelier and full-suite interior design firm — still rooted in the same workshop, still driven by the same obsession with craft.
            </p>
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] font-mono">
              <MapPin className="w-4 h-4 text-[var(--accent-terracotta)]" />
              Srikalahasthi, Tirupati District, AP — 517644
            </div>
          </div>
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-subtle)]">
            <Image src="/images/hero/about-craft.jpg" alt="GYP SIGNATURES workshop" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-xs font-mono uppercase tracking-widest text-[var(--accent-butter)] mb-1">Our Atelier</p>
              <p className="font-serif text-lg">Where every piece begins — hand-selected timber, hand-finished joints.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto mb-20">
        <div className="mb-10">
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent-terracotta)] flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-[var(--accent-terracotta)]" />
            Our Philosophy
          </span>
          <h2 className="font-serif text-4xl font-bold text-[var(--text-primary)]">Three Principles.<br />One Standard.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Hammer, title: "Craft First", desc: "Every joint is hand-finished. We use only FSC-certified teak, sheesham, and solid hardwoods — no MDF cores, no veneers on visible surfaces." },
            { icon: Users, title: "Client-Led Design", desc: "Your lifestyle dictates the design brief, not our portfolio. We visit your site, understand your routines, and design around how you actually live." },
            { icon: Award, title: "Lifetime Guarantee", desc: "All structural joinery carries a 10-year guarantee. Upholstery and finishes, 3 years. We service what we build — for life." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-terracotta)]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-terracotta)]/10 flex items-center justify-center mb-5">
                <Icon className="w-5 h-5 text-[var(--accent-terracotta)]" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[var(--text-primary)] mb-3">{title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inspiration — P Kishore Kumar */}
      <section className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto mb-20">
        <div className="mb-12 text-center">
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent-terracotta)] flex items-center justify-center gap-3 mb-4">
            <span className="w-12 h-px bg-[var(--accent-terracotta)]" />
            The Spark Behind the Brand
            <span className="w-12 h-px bg-[var(--accent-terracotta)]" />
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--text-primary)]">Our Inspiration</h2>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-[var(--border-subtle)] shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#111118] to-[#1a1a28]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[var(--accent-terracotta)]/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

          <div className="relative grid lg:grid-cols-2 min-h-[600px]">
            <div className="relative min-h-[420px] lg:min-h-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/inspiration-founder.jpg"
                alt="P Kishore Kumar — Inspiration behind GYP SIGNATURES"
                className="absolute inset-0 w-full h-full object-cover object-[center_top]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-transparent to-[#0a0a0f]" />
              <div className="absolute inset-0 bg-[#0a0a0f]/15" />
            </div>

            <div className="relative flex flex-col justify-center px-10 py-14 lg:pl-14 lg:pr-16">
              <div className="w-12 h-12 rounded-2xl bg-[var(--accent-terracotta)]/15 flex items-center justify-center mb-8 border border-[var(--accent-terracotta)]/20">
                <Quote className="w-6 h-6 text-[var(--accent-terracotta)]" />
              </div>
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--accent-terracotta)] mb-4 block">The Visionary</span>
              <h3 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-2">P Kishore<br />Kumar</h3>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-[var(--accent-terracotta)]" />
                <span className="text-xs text-[var(--accent-butter)] font-mono uppercase tracking-widest">Inspiration Behind GYP SIGNATURES</span>
              </div>
              <p className="text-[#b8b0a6] text-base leading-relaxed mb-5">
                Every brand needs a north star. For GYP SIGNATURES, that person is P Kishore Kumar — whose taste, conviction, and hunger for excellence redefined what is possible.
              </p>
              <blockquote className="border-l-2 border-[var(--accent-terracotta)] pl-5">
                <p className="text-white/70 font-serif italic text-lg leading-relaxed">
                  "A beautiful space does not just look good — it makes you feel like the best version of yourself."
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto mb-20">
        <div className="mb-10">
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent-terracotta)] flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-[var(--accent-terracotta)]" />
            The People
          </span>
          <h2 className="font-serif text-4xl font-bold text-[var(--text-primary)]">Meet the Team</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TEAM.map((member) => (
            <div key={member.name} className="rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-secondary)] group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={member.image} alt={member.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-semibold text-[var(--text-primary)]">{member.name}</h3>
                <p className="text-xs text-[var(--accent-terracotta)] font-mono uppercase tracking-wider mt-1 mb-3">{member.role}</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-10 px-6 md:px-12 lg:px-20 max-w-4xl mx-auto text-center">
        <div className="rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-12 md:p-16">
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">Ready to build your dream interior?</h3>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto mb-8">Reach out for a free site visit. No pressure, no hard sell — just an honest conversation about your space.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--accent-terracotta)] text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg">
            Get in Touch <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </main>
  );
}
