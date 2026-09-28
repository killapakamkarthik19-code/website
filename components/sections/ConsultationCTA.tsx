"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, Send, Phone, Mail, MapPin, Sparkles } from "lucide-react";
import { formatINR } from "@/lib/utils";

import { createClient } from "@/utils/supabase/client";

export function ConsultationCTA() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    roomType: "Living Room Sanctuary",
    budget: 150000,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("Please provide your full name.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setError("Please provide a valid 10-digit mobile number.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      // 1. Save lead to Supabase database
      await supabase.from("inquiries").insert([
        {
          name: formData.name,
          phone: formData.phone,
          service_type: formData.roomType,
          budget: `₹${formData.budget.toLocaleString("en-IN")}`,
          message: formData.message || "Consultation request from home page",
        },
      ]);

      // 2. Send instant free email alert via Web3Forms to your inbox
      const web3formData = new FormData();
      web3formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "5e8f6780-e765-454a-b1e3-5aee058ff921");
      web3formData.append("subject", `New Consultation Lead from ${formData.name}`);
      web3formData.append("from_name", "GYP SIGNATURES Website");
      web3formData.append("Customer Name", formData.name);
      web3formData.append("Mobile Number", formData.phone);
      web3formData.append("Service Required", formData.roomType);
      web3formData.append("Anticipated Budget", `₹${formData.budget.toLocaleString("en-IN")}`);
      web3formData.append("Vision / Notes", formData.message || "None provided");

      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: web3formData,
      });
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D9673F", "#F2D98B", "#A9B79A", "#F0A87A"],
      });
    }
  };

  return (
    <section
      id="consultation"
      className="py-24 md:py-36 px-4 md:px-8 relative overflow-hidden bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)] border-t border-[var(--border-subtle)]"
    >
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[var(--accent-terracotta)]/8 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Narrative & Contact Cards */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent-terracotta)] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Complimentary Consultation
              </span>
              <h2 className="display-h2 font-serif text-[var(--text-primary)]">
                Let&apos;s Design Your Dream Sanctuary
              </h2>
              <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
                Whether you need a single customized sofa for an awkward nook or complete turnkey architectural millwork for an entire villa, our master team is here to guide you.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              <a
                href="tel:9393972660"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-terracotta)] transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-terracotta)]/10 text-[var(--accent-terracotta)] flex items-center justify-center group-hover:bg-[var(--accent-terracotta)] group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                    Call / WhatsApp Studio
                  </span>
                  <span className="font-mono text-sm font-semibold text-[var(--text-primary)]">
                    +91 9393972660
                  </span>
                </div>
              </a>

              <a
                href="mailto:gypsignatures@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-terracotta)] transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-sage)]/10 text-[var(--accent-sage)] flex items-center justify-center group-hover:bg-[var(--accent-sage)] group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                    Email Design Team
                  </span>
                  <span className="font-mono text-sm font-semibold text-[var(--text-primary)]">
                    gypsignatures@gmail.com
                  </span>
                </div>
              </a>

              <a
                href="https://share.google/SDO6mLLMBKUosE16b"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-terracotta)] transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-butter)]/20 text-[#8C6D23] dark:text-[var(--accent-butter)] flex items-center justify-center group-hover:bg-[var(--accent-butter)] group-hover:text-black transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                    Experience Center & Workshop
                  </span>
                  <span className="text-xs font-medium text-[var(--text-primary)]">
                    Srikalahasthi, Tirupati District, AP - 517644
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Glass Consultation Form */}
          <div className="lg:col-span-6">
            <div className="p-7 md:p-10 rounded-3xl glass-panel shadow-2xl relative">
              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--accent-sage)]/20 text-[var(--accent-sage)] flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-[var(--text-primary)] font-medium">
                    Consultation Requested!
                  </h3>
                  <p className="text-xs md:text-sm text-[var(--text-secondary)] max-w-sm">
                    Thank you, <span className="font-semibold text-[var(--text-primary)]">{formData.name}</span>. Our lead interior designer will call you within 2 hours to confirm your site visit or virtual session.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href={`https://wa.me/919393972660?text=${encodeURIComponent(
                        `Hi GYP SIGNATURES, I just requested a consultation on your website.\nName: ${formData.name}\nMobile: ${formData.phone}\nService: ${formData.roomType}\nBudget: ₹${formData.budget.toLocaleString("en-IN")}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg"
                    >
                      <span>Connect on WhatsApp Now</span>
                    </a>
                  </div>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        phone: "",
                        roomType: "Living Room Sanctuary",
                        budget: 150000,
                        message: "",
                      });
                    }}
                    className="mt-3 text-xs font-mono uppercase tracking-wider text-[var(--accent-terracotta)] hover:underline cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-serif text-2xl text-[var(--text-primary)] font-medium">
                      Book a Free Consultation
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      No commitment required. We respect your time and privacy.
                    </p>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400">
                      {error}
                    </div>
                  )}

                  {/* Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="form-name"
                      className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]"
                    >
                      Your Name *
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      required
                      placeholder="e.g. Karthik Reddy"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--accent-terracotta)] text-sm text-[var(--text-primary)] outline-none transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="form-phone"
                      className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]"
                    >
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      id="form-phone"
                      type="tel"
                      required
                      placeholder="e.g. 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--accent-terracotta)] text-sm text-[var(--text-primary)] outline-none transition-colors"
                    />
                  </div>

                  {/* Room Type */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="form-room"
                      className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]"
                    >
                      Room or Service Required
                    </label>
                    <select
                      id="form-room"
                      value={formData.roomType}
                      onChange={(e) =>
                        setFormData({ ...formData, roomType: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--accent-terracotta)] text-sm text-[var(--text-primary)] outline-none transition-colors cursor-pointer"
                    >
                      <option value="Living Room Sanctuary">Living Room Sanctuary</option>
                      <option value="Master Bedroom Suite">Master Bedroom Suite</option>
                      <option value="Dining & Bar Space">Dining & Bar Space</option>
                      <option value="Modular Kitchen & Pantry">Modular Kitchen & Pantry</option>
                      <option value="Executive Home Studio">Executive Home Studio</option>
                      <option value="Full Villa Turnkey Interior">Full Villa Turnkey Interior</option>
                      <option value="Custom Wood Works Only">Custom Wood Works Only</option>
                    </select>
                  </div>

                  {/* Budget Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="uppercase tracking-wider text-[var(--text-muted)]">
                        Anticipated Budget:
                      </span>
                      <span className="text-sm font-semibold text-[var(--accent-terracotta)]">
                        {formatINR(formData.budget)}
                        {formData.budget >= 1000000 ? "+" : ""}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={50000}
                      max={1000000}
                      step={25000}
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          budget: parseInt(e.target.value),
                        })
                      }
                      className="w-full accent-[var(--accent-terracotta)] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[var(--text-muted)] font-mono">
                      <span>₹50,000</span>
                      <span>₹5 Lakhs</span>
                      <span>₹10 Lakhs+</span>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="form-message"
                      className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]"
                    >
                      Tell Us About Your Vision (Optional)
                    </label>
                    <textarea
                      id="form-message"
                      rows={2}
                      placeholder="e.g. We have a 3BHK flat in Tirupati and need an L-shaped sofa, dining set, and master wardrobe."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--accent-terracotta)] text-sm text-[var(--text-primary)] outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-[var(--accent-terracotta)] hover:bg-[var(--accent-terracotta-hover)] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[var(--accent-terracotta-glow)] transition-all cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    ) : (
                      <>
                        <span>Submit Free Consultation Request</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
