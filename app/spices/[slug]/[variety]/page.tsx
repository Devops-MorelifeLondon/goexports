import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllLevel2Spices,
  getLevel2SpiceByParams,
  getLevel2SpiceBySlug,
  getAllLevel2SpiceParams,
  getLevel2SpicesByParentId,
  getAllSpices,
} from "@/lib/spices";
import SpiceLevel2DetailClient from "@/components/SpiceLevel2DetailClient";

interface PageProps {
  params: Promise<{ slug: string; variety: string }>;
}

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://www.goexports.co.uk").replace(/\/$/, "");

// ─── SSG: Pre-generate all static paths for all 45 Level-2 varieties ───
export async function generateStaticParams() {
  const params = getAllLevel2SpiceParams();
  return params;
}

// ─── Programmatic SEO Metadata ───
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, variety } = await params;
  const data = getLevel2SpiceByParams(slug, variety) || getLevel2SpiceBySlug(`/spices/${slug}/${variety}`);

  if (!data) {
    return {
      title: "Spice Variety Export | GoExports",
      description: "Indian spice variety export specifications and supplier directory.",
    };
  }

  const title = data.meta_title;
  const description = data.meta_description;
  const url = `${BASE_URL}${data.slug}`;
  const parentName = data.parentCategory?.category_name || data.category;

  const keywords = [
    data.variety,
    `${data.variety} exporters`,
    `bulk ${data.variety}`,
    `wholesale ${data.variety}`,
    `${parentName} exporter India`,
    "Indian spice varieties",
    "B2B spice procurement",
    "export grade spices",
    "COA certified spices",
    "FCL spice shipping",
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
          url: `${BASE_URL}/og/spice-${data.varietySlug}.png`,
          width: 1200,
          height: 630,
          alt: `${data.variety} Specifications & Export Sourcing`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/og/spice-${data.varietySlug}.png`],
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

// ─── Dynamic Level 2 Variety Page Component ───
export default async function SpiceLevel2Page({ params }: PageProps) {
  const { slug, variety } = await params;
  const data = getLevel2SpiceByParams(slug, variety) || getLevel2SpiceBySlug(`/spices/${slug}/${variety}`);

  if (!data) {
    notFound();
  }

  const parentSlug = data.parentCategory?.slug || data.categorySlug;
  const parentName = data.parentCategory?.category_name || data.category;
  const parentHsCode = data.parentCategory?.hs_code || "0904.00.00";

  const allSiblings = getLevel2SpicesByParentId(data.parent_id);
  const siblingVarieties = allSiblings.filter((s) => s.varietySlug !== data.varietySlug);
  const allCategories = getAllSpices();
  const relatedCategories = allCategories.filter((c) => c.id !== data.parent_id);

  // Dynamic Schema.org FAQPage Structured Data
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
    name: `${data.variety} (Export Grade)`,
    description: data.overview,
    category: `Agricultural Raw Materials > Spices & Herbs > ${parentName}`,
    sku: `HS-${parentHsCode}-${data.varietySlug}`,
    countryOfOrigin: {
      "@type": "Country",
      name: "India",
    },
  };

  // Structured BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${BASE_URL}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Spices",
        item: `${BASE_URL}/spices`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: parentName,
        item: `${BASE_URL}/spices/${parentSlug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: data.variety,
        item: `${BASE_URL}${data.slug}`,
      },
    ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Top Informational Bar */}
      <div className="border-b border-[#EAE5D9] bg-[#FAF5E8] py-2.5 px-4 text-xs tracking-wide text-[#5A5A5A]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#1A1A1A]">Indian Spices Export Directory</span>
            <span className="text-[#B0A898]">•</span>
            <span className="text-[#6A6A6A]">
              {data.variety} &bull; Specifications &amp; Direct Exporter Sourcing
            </span>
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
          <Link href="/spices" className="transition hover:text-[#0A0A0A]">
            Spices
          </Link>
          <span className="text-[#C5BFA9]">/</span>
          <Link href={`/spices/${parentSlug}`} className="transition hover:text-[#0A0A0A]">
            {parentName}
          </Link>
          <span className="text-[#C5BFA9]">/</span>
          <span className="font-semibold text-[#0A0A0A]">{data.variety}</span>
        </div>
      </nav>

      {/* Main Variety Detail Interface */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SpiceLevel2DetailClient
          data={data}
          siblingVarieties={siblingVarieties}
          relatedCategories={relatedCategories}
        />
      </main>
    </div>
  );
}
