import React from "react";
import type { Metadata } from "next";
import { getAllTextiles } from "@/lib/textiles";
import TextilesDirectoryClient from "@/components/TextilesDirectoryClient";

export const metadata: Metadata = {
  title: "Bulk Indian Textiles Export Directory | Verified Mills & Specifications",
  description:
    "Explore verified Indian textile export categories under HS Chapter 50-63. View technical specifications, count parameters, GOTS/OEKO-TEX compliance, and request direct mill quotes.",
  keywords: [
    "Indian textiles export directory",
    "bulk cotton yarn exporter India",
    "wholesale cotton fabrics India",
    "silk fabrics denim jute linen RMG",
    "verified Indian spinning weaving mills",
    "B2B textile procurement",
    "OEKO-TEX GOTS certified textiles India",
  ],
};

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://www.goexports.co.uk").replace(/\/$/, "");

export default function TextilesDirectoryPage() {
  const textiles = getAllTextiles();

  const directorySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Indian Textiles Commercial Export Directory",
    description: "Directory of commercial Indian textile export categories and specifications",
    itemListElement: textiles.map((t, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: t.category_name,
      url: `${BASE_URL}/textiles/${t.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-[var(--canvas)] font-sans text-[var(--ink)] antialiased">
      {/* Top Bar */}
      <div className="border-b border-[#EAE5D9] bg-[#FAF5E8] py-2.5 px-4 text-xs tracking-wide text-[#5A5A5A]">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#1A1A1A]">Indian Textiles Export Directory</span>
            <span className="text-[#B0A898]">•</span>
            <span className="text-[#6A6A6A]">15 Industrial Categories &amp; Direct Mill Sourcing</span>
          </div>
          <div className="text-[#6A6A6A] hidden sm:block">
            B2B Commercial Sourcing Guide &bull; OEKO-TEX &bull; GOTS &bull; BCI
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(directorySchema) }}
      />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <TextilesDirectoryClient textiles={textiles} />
      </main>
    </div>
  );
}
