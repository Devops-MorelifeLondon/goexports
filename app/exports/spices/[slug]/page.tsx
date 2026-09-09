import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getSpiceBySlug,
  getAllSpiceSlugs,
  getAllSpices,
} from "@/lib/spices";
import SpiceDetailClient from "@/components/SpiceDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://www.goexports.co.uk").replace(/\/$/, "");

// ─── SSG: Pre-generate all static paths ───
export async function generateStaticParams() {
  const slugs = getAllSpiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ─── Programmatic SEO Metadata ───
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getSpiceBySlug(slug);

  if (!data) {
    return {
      title: "Spice Export Category | GoExports",
      description: "Indian spice export specifications and supplier directory."
    };
  }

  const title = data.meta_title;
  const description = data.meta_description;
  const url = `${BASE_URL}/exports/spices/${data.slug}`;
  const keywords = [
    data.category_name,
    `HS Code ${data.hs_code}`,
    `${data.category_name} exporters`,
    `${data.category_name} wholesale suppliers`,
    "bulk Indian spice exporters",
    "B2B spice procurement",
    "export grade spices",
    "organic spice suppliers India",
    "spice specifications",
    "FCL container spice shipping"
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "GoExports - B2B Global Trade Platform",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: `${BASE_URL}/og/spice-${data.slug}.png`,
          width: 1200,
          height: 630,
          alt: `${data.category_name} B2B Specifications & Sourcing`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/og/spice-${data.slug}.png`],
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large" as const,
      "max-video-preview": -1,
    },
  };
}

// ─── Dynamic Programmatic Sourcing Page Component ───
export default async function SpiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = getSpiceBySlug(slug);

  if (!data) {
    notFound();
  }

  const allSpices = getAllSpices();
  const relatedSpices = allSpices.filter((s) => s.slug !== data.slug).slice(0, 6);

  // Dynamic Schema.org FAQPage Structured Data (Authentic from dataset)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.b2b_faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Structured B2B Item / Commodity Schema
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: `${data.category_name} (Commercial Grade)`,
    description: data.overview,
    category: "Agricultural Raw Materials > Spices & Herbs",
    sku: `HS-${data.hs_code}`,
    countryOfOrigin: {
      "@type": "Country",
      name: "India",
    },
  };

  return (
    <div className="min-h-screen bg-[var(--canvas)] font-sans text-[var(--ink)] antialiased">
      {/* ─── Inject Structured Schema Markups ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Top Informational Bar */}
      <div className="border-b border-[#EAE5D9] bg-[#FAF5E8] py-2.5 px-4 text-xs tracking-wide text-[#5A5A5A]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#1A1A1A]">Indian Spices Export Directory</span>
            <span className="text-[#B0A898]">•</span>
            <span className="text-[#6A6A6A]">Technical Specifications, Sourcing Requirements &amp; Exporter Directory</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[#6A6A6A]">
            <span>Commercial Export Standards</span>
            <span className="text-[#D0C8B8]">|</span>
            <span>B2B Procurement Inquiries</span>
          </div>
        </div>
      </div>

      {/* Breadcrumbs Navigation */}
      <nav aria-label="Breadcrumb" className="border-b border-[#EAE5D9] bg-white/70 py-3 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 text-xs text-[#767676] sm:px-6 lg:px-8">
          <Link href="/" className="transition hover:text-[#0A0A0A]">
            Home
          </Link>
          <span className="text-[#C5BFA9]">/</span>
          <Link href="/exports/spices" className="transition hover:text-[#0A0A0A]">
            Exports
          </Link>
          <span className="text-[#C5BFA9]">/</span>
          <Link href="/exports/spices" className="transition hover:text-[#0A0A0A]">
            Spices
          </Link>
          <span className="text-[#C5BFA9]">/</span>
          <span className="font-semibold text-[#0A0A0A]">{data.category_name}</span>
        </div>
      </nav>

      {/* Animated Client Body Component */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SpiceDetailClient data={data} relatedSpices={relatedSpices} />
      </main>
    </div>
  );
}
