import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CartDrawer } from "@/components/ui/CartDrawer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gypsignatures.com"),
  title: {
    default: "GYP SIGNATURES — Mastercrafted Furniture & Turnkey Interior Design",
    template: "%s | GYP SIGNATURES",
  },
  description:
    "Award-winning bespoke furniture, solid Burma teak wood works, and turnkey interior design in Srikalahasthi & Tirupati District, Andhra Pradesh. Built for modern sanctuaries.",
  keywords: [
    "furniture shop srikalahasthi",
    "interior design tirupati",
    "teak wood furniture andhra pradesh",
    "custom sofas tirupati",
    "modular kitchens srikalahasthi",
    "gyp signatures",
    "wood works srikalahasthi",
  ],
  authors: [{ name: "GYP SIGNATURES" }],
  creator: "GYP SIGNATURES",
  openGraph: {
    title: "GYP SIGNATURES — Furniture That Feels Like Home",
    description:
      "Bespoke furniture & turnkey interior design in Srikalahasthi & Tirupati. Handcrafted Burma teak, modular kitchens, and architectural living sanctuaries.",
    url: "https://gypsignatures.com",
    siteName: "GYP SIGNATURES",
    images: [
      {
        url: "/images/hero/hero-living.jpg",
        width: 1200,
        height: 630,
        alt: "GYP SIGNATURES Architectural Living Sanctuary",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GYP SIGNATURES — Furniture That Feels Like Home",
    description:
      "Mastercrafted furniture & turnkey interior design in Srikalahasthi, Tirupati District.",
    images: ["/images/hero/hero-living.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: "GYP SIGNATURES",
    image: "https://gypsignatures.com/logo.jpg",
    description:
      "Bespoke furniture, solid Burma teak wood works, and turnkey interior design in Srikalahasthi & Tirupati District.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Srikalahasthi",
      addressLocality: "Tirupati District",
      addressRegion: "Andhra Pradesh",
      postalCode: "517644",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.7498,
      longitude: 79.7036,
    },
    url: "https://gypsignatures.com",
    telephone: "+919393972660",
    email: "gypsignatures@gmail.com",
    priceRange: "₹₹₹",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    ],
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-[var(--accent-terracotta)] selection:text-white">
        {/* Accessibility Skip Link */}
        <a
          href="#rooms"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999999] focus:px-4 focus:py-2 focus:bg-[var(--accent-terracotta)] focus:text-white focus:rounded-full text-xs font-mono"
        >
          Skip to main content
        </a>

        {/* Tactile Grain Overlay */}
        <div className="grain-overlay" aria-hidden="true" />

        <ThemeProvider>
          <SmoothScrollProvider>
            {/* Custom Interactive Follow Cursor */}
            <CustomCursor />

            {/* Slide-in Cart Drawer */}
            <CartDrawer />

            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
