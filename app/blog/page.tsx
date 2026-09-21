import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogs, getAllBlogCategories } from "@/lib/blogs";
import BlogListClient from "@/components/blog/BlogListClient";
import { BookOpen, ShieldCheck, ArrowRight, Sparkles, Globe2, Layers } from "lucide-react";

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://www.goexports.co.uk").replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Global Trade & Export Compliance Guides | GoExports Knowledge Hub",
  description:
    "Authoritative guides for international exporters and importers. Learn about IEC registration, Incoterms 2020, customs clearance in India, HS codes, and global B2B procurement.",
  keywords: [
    "export business India",
    "IEC registration",
    "Incoterms 2020",
    "customs clearance India",
    "HS codes",
    "international trade guides",
    "export documentation checklist",
    "import duty India",
    "letter of credit",
    "global B2B trade",
  ],
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    title: "Global Trade & Export Compliance Guides | GoExports Knowledge Hub",
    description:
      "Explore 30+ expert-written guides covering Indian export regulations, customs documentation, Incoterms 2020, and international trade compliance.",
    url: `${BASE_URL}/blog`,
    siteName: "GoExports - Global Trade Platform",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/assets/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "GoExports Global Trade & Export Intelligence Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Trade & Export Compliance Guides | GoExports Knowledge Hub",
    description:
      "Explore 30+ expert-written guides covering Indian export regulations, customs documentation, Incoterms 2020, and international trade compliance.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogHubPage() {
  const blogs = getAllBlogs();
  const categories = getAllBlogCategories();

  // JSON-LD structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog & Trade Intelligence",
        item: `${BASE_URL}/blog`,
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "GoExports Global Trade & Export Compliance Hub",
    description:
      "Authoritative compliance guides, checklists, and operational methodologies for global import-export enterprises.",
    url: `${BASE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: "GoExports",
      url: BASE_URL,
    },
    hasPart: blogs.slice(0, 15).map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      url: `${BASE_URL}/blog/${blog.slug}`,
      description: blog.metaDescription,
      datePublished: "2026-02-15",
    })),
  };

  return (
    <div className="min-h-screen bg-[var(--canvas)] font-sans text-[var(--ink)] antialiased">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* ── Top Utility Sub-Header ── */}
      <div className="border-b border-[#EAE5D9] bg-[#FAF5E8] py-2.5 px-4 text-xs tracking-wide text-[#5A5A5A]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#1A1A1A]">GoExports Knowledge Hub</span>
            <span className="text-[#B0A898]">•</span>
            <span className="text-[#6A6A6A]">
              International Trade Intelligence, Compliance &amp; Sourcing Guides
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[#6A6A6A]">
            <span>31 Verified Guides</span>
            <span className="text-[#D0C8B8]">|</span>
            <span>Incoterms &bull; Customs &bull; Banking</span>
          </div>
        </div>
      </div>

      {/* ── Breadcrumb Navigation ── */}
      <nav aria-label="Breadcrumb" className="border-b border-[#EAE5D9] bg-white/70 py-3 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 text-xs text-[#767676] sm:px-6 lg:px-8">
          <Link href="/" className="transition hover:text-[#0A0A0A]">
            Home
          </Link>
          <span className="text-[#C5BFA9]">/</span>
          <span className="font-semibold text-[#0A0A0A]">Blog &amp; Knowledge Hub</span>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="py-12 sm:py-16 border-b border-[var(--hairline)] bg-gradient-to-b from-[var(--surface-soft)] to-[var(--canvas)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--brand-ochre)]/20 text-[var(--ink)] border border-[var(--brand-ochre)]/40">
                <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                <span>Global Trade Editorial &amp; Advisory</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.15] m-0">
                International Trade, Compliance &amp; Sourcing Guides
              </h1>

              <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed m-0">
                Master the operational intricacies of cross-border trade. Comprehensive, step-by-step guides on Indian export setups, DGFT mandates, customs clearances, Incoterms 2020, and international buyer verification.
              </p>
            </div>

            {/* Quick Stats Pill Group */}
            <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 shrink-0">
              <div className="px-4 py-3 rounded-2xl bg-[var(--surface-card)] border border-[var(--hairline)] text-center">
                <span className="block text-2xl font-black text-[var(--ink)]">31</span>
                <span className="block text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wider">Guides</span>
              </div>
              <div className="px-4 py-3 rounded-2xl bg-[var(--surface-card)] border border-[var(--hairline)] text-center">
                <span className="block text-2xl font-black text-amber-700">600+</span>
                <span className="block text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wider">Expert Q&amp;As</span>
              </div>
              <div className="px-4 py-3 rounded-2xl bg-[var(--surface-card)] border border-[var(--hairline)] text-center">
                <span className="block text-2xl font-black text-emerald-700">100%</span>
                <span className="block text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wider">Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Area (Blog List Client with live search & filters) ── */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <BlogListClient initialBlogs={blogs} categories={categories} />
      </main>

      {/* ── Pre-Footer Advisory / Lead Banner ── */}
      <section className="border-t border-[var(--hairline)] bg-[var(--surface-soft)] py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Trade Network</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] tracking-tight m-0">
            Ready to Expand Your Business Across International Borders?
          </h2>

          <p className="text-sm sm:text-base text-[var(--muted)] max-w-2xl mx-auto leading-relaxed m-0">
            Whether you need customized export documentation advisory or direct access to verified B2B buyers in 190+ countries, GoExports connects your enterprise to global commerce.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/create-export-profile"
              className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold no-underline shadow-sm transition-transform active:scale-[0.98]"
              style={{ backgroundColor: "var(--brand-ochre)", color: "var(--ink)" }}
            >
              <span>Create Free Export Profile</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/spices"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-[var(--hairline)] bg-[var(--surface-card)] text-[var(--ink)] no-underline hover:bg-[var(--surface-soft)] transition-colors shadow-2xs"
            >
              <Globe2 className="w-4 h-4 text-emerald-600" />
              <span>Explore Sourcing Hubs</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
