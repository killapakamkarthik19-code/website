"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import type { FormEvent } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "Interior Design", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createClient();
      // 1. Save to Supabase
      await supabase.from("inquiries").insert([
        {
          name: form.name,
          phone: form.phone,
          email: form.email,
          service_type: form.service,
          message: form.message || "Contact form submission",
        },
      ]);

      // 2. Send instant free email alert via Web3Forms
      const web3formData = new FormData();
      web3formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "5e8f6780-e765-454a-b1e3-5aee058ff921");
      web3formData.append("subject", `New Contact Message from ${form.name}`);
      web3formData.append("from_name", "GYP SIGNATURES Website");
      web3formData.append("Customer Name", form.name);
      web3formData.append("Phone Number", form.phone);
      if (form.email) web3formData.append("Email Address", form.email);
      web3formData.append("Service of Interest", form.service);
      web3formData.append("Customer Message", form.message || "None provided");

      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: web3formData,
      });
    } catch (err) {
      console.error("Failed to submit contact inquiry:", err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] pt-28 pb-24">
      <section className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="mb-14 text-center">
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent-terracotta)] flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-px bg-[var(--accent-terracotta)]" />
            Lets Connect
            <span className="w-8 h-px bg-[var(--accent-terracotta)]" />
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-[var(--text-primary)] leading-none tracking-tight">Get in Touch</h1>
          <p className="mt-4 text-[var(--text-secondary)] max-w-xl mx-auto text-base leading-relaxed">
            Whether you have a blank canvas or an existing space that needs a second life — we want to hear about it. Book a free site visit today.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left Info Column */}
          <div className="lg:col-span-4 space-y-6">
            {[
              { icon: MapPin, label: "Visit Our Studio", value: "Door No. [Main Road], Srikalahasthi, Tirupati District, Andhra Pradesh — 517644" },
              { icon: Phone, label: "Call or WhatsApp", value: "+91 93939 72660" },
              { icon: Mail, label: "Email", value: "gypsignatures@gmail.com" },
              { icon: Clock, label: "Studio Hours", value: "Mon – Sat: 9 AM – 7 PM\nSunday: By Appointment" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-4 p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-terracotta)]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[var(--accent-terracotta)]" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">{label}</p>
                  <p className="text-sm text-[var(--text-primary)] font-medium whitespace-pre-line">{value}</p>
                </div>
              </div>
            ))}

            {/* Google Maps Embed Placeholder */}
            <div className="rounded-2xl overflow-hidden border border-[var(--border-subtle)] aspect-[4/3]">
              <iframe
                src="https://maps.google.com/maps?q=Srikalahasthi,Andhra+Pradesh&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="GYP SIGNATURES location"
              />
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-8 md:p-12">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)]">Message Received!</h3>
                  <p className="text-[var(--text-secondary)] max-w-sm mx-auto text-sm">
                    Thank you for reaching out. Our team will call you within 24 hours to schedule your free site visit.
                  </p>
                  <p className="text-xs text-[var(--text-muted)] font-mono mt-4">
                    Or WhatsApp us directly at <span className="text-[var(--accent-terracotta)]">+91 93939 72660</span>
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] mb-2">Book a Free Consultation</h2>
                  <p className="text-sm text-[var(--text-muted)] mb-6">Fill out the form and we will call you within 24 hours.</p>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">Full Name *</label>
                      <input
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Srihari Naidu"
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:border-[var(--accent-terracotta)] focus:ring-1 focus:ring-[var(--accent-terracotta)] outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">Phone / WhatsApp *</label>
                      <input
                        name="phone"
                        required
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 9XXXXXXXXX"
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:border-[var(--accent-terracotta)] focus:ring-1 focus:ring-[var(--accent-terracotta)] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:border-[var(--accent-terracotta)] focus:ring-1 focus:ring-[var(--accent-terracotta)] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">Service Interested In *</label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm focus:border-[var(--accent-terracotta)] focus:ring-1 focus:ring-[var(--accent-terracotta)] outline-none transition-colors cursor-pointer"
                    >
                      {["Full Interior Design", "Custom / Modular Furniture", "Wood Works & Carpentry", "Sofas & Seating", "Beds & Bedroom Furniture", "Dining Sets", "Lighting & Decor", "Storage Solutions", "Other / Not Sure Yet"].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">Tell Us About Your Project</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="e.g. 3BHK apartment in Tirupati, looking for full interior + modular kitchen. Budget around ₹15L."
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:border-[var(--accent-terracotta)] focus:ring-1 focus:ring-[var(--accent-terracotta)] outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[var(--accent-terracotta)] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition-all shadow-lg cursor-pointer"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-[var(--text-muted)]">
                    Or reach us instantly on{" "}
                    <a href="tel:+919393972660" className="text-[var(--accent-terracotta)] hover:underline font-medium">
                      +91 93939 72660
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
