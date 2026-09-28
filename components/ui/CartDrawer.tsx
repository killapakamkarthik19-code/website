"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatINR } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalAmount,
    totalItems,
  } = useCartStore();

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const subtotal = totalAmount();
  const itemCount = totalItems();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99990] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md h-full bg-[var(--bg-secondary)] border-l border-[var(--border-subtle)] shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[var(--accent-terracotta)]" />
                <h3 className="font-serif text-xl tracking-tight">
                  Your Sanctuary Cart
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] font-mono">
                  {itemCount}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-[var(--bg-tertiary)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Delivery Bar */}
            <div className="bg-[var(--bg-tertiary)]/70 px-6 py-2.5 text-xs text-[var(--text-secondary)] flex items-center justify-between border-b border-[var(--border-subtle)]">
              <span>🚚 Free White-Glove Delivery</span>
              <span className="text-[var(--accent-sage)] font-medium">
                Andhra Pradesh & Tirupati
              </span>
            </div>

            {/* Item List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-muted)]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-[var(--text-primary)]">
                      Your bag is empty
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] max-w-xs mt-1">
                      Explore our handcrafted sofas, beds, and dining collections made in Srikalahasthi.
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--accent-terracotta)] text-white text-xs font-medium tracking-wide hover:bg-[var(--accent-terracotta-hover)] transition-all cursor-pointer mt-2"
                  >
                    Explore Shop <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor.name}`}
                    className="flex gap-4 p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)]"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[var(--bg-tertiary)] shrink-0">
                      <Image
                        src={item.product.primaryImage}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="text-sm font-medium line-clamp-1 text-[var(--text-primary)]">
                            {item.product.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className="w-3 h-3 rounded-full border border-black/20"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            <span className="text-xs text-[var(--text-secondary)]">
                              {item.selectedColor.name}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            removeItem(item.product.id, item.selectedColor.name)
                          }
                          className="text-[var(--text-muted)] hover:text-red-400 p-1 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[var(--border-subtle)] rounded-lg bg-[var(--bg-secondary)]">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedColor.name,
                                -1
                              )
                            }
                            className="p-1 px-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedColor.name,
                                1
                              )
                            }
                            className="p-1 px-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-[var(--text-primary)]">
                          {formatINR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)] space-y-4">
                <div className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[var(--text-primary)] font-medium">
                      {formatINR(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Assembly & Delivery</span>
                    <span className="text-[var(--accent-sage)] font-medium">
                      FREE
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-serif pt-2 border-t border-[var(--border-subtle)] text-[var(--text-primary)]">
                    <span className="font-sans font-medium">Estimated Total</span>
                    <span className="text-base font-semibold">
                      {formatINR(subtotal)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href="https://wa.me/919393972660?text=Hi%20GYP%20Signatures,%20I%20would%20like%20to%20place%20an%20order%20for%20my%20selected%20items."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[var(--accent-terracotta)] text-white text-xs font-medium tracking-wide hover:bg-[var(--accent-terracotta-hover)] transition-all shadow-lg shadow-[var(--accent-terracotta-glow)] cursor-pointer"
                  >
                    Confirm Order via WhatsApp / Studio <ArrowRight className="w-4 h-4" />
                  </a>
                  <p className="text-[10px] text-center text-[var(--text-muted)]">
                    Instant concierge support: 9393972660 · Srikalahasthi Studio
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
