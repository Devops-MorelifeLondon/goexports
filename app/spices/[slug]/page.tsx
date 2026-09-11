import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getSpiceBySlug,
  getAllSpiceSlugs,
  getAllSpices,
  getLevel2SpicesByParentId,
  getLevel2SpicesByCategory,
} from "@/lib/spices";
import Image from "next/image";
import { Sparkles, Layers3, ArrowRight, ShieldCheck } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://www.goexports.co.uk").replace(/\/$/, "");

export async function generateStaticParams() {
  const slugs = getAllSpiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getSpiceBySlug(slug);

  if (!data) {
    return {
      title: "Spice Export Category | GoExports",
      description: "Indian spice export specifications and supplier directory."
    };
  }

  return {
    title: data.meta_title,
    description: data.meta_description,
    alternates: {
      canonical: `${BASE_URL}/exports/spices/${data.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

export default async function LegacySpiceRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  const data = getSpiceBySlug(slug);

  if (!data) {
    notFound();
  }

  const varieties = data.id
    ? getLevel2SpicesByParentId(data.id)
    : getLevel2SpicesByCategory(data.category_name);

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

  return (
    <div className="min-h-screen bg-[var(--canvas)] font-sans text-[var(--ink)] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Top Informational Bar */}
      <div className="border-b border-[#EAE5D9] bg-[#FAF5E8] py-2.5 px-4 text-xs tracking-wide text-[#5A5A5A]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#1A1A1A]">Indian Spices Export Directory</span>
            <span className="text-[#B0A898]">•</span>
            <span className="text-[#6A6A6A]">Technical Specifications &amp; Sourcing Information</span>
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
          <span className="font-semibold text-[#0A0A0A]">{data.category_name}</span>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
        <section className="relative overflow-hidden rounded-2xl border border-[#E5E0D0] bg-white p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <div className="mb-4 flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">
                  <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                  Export Grade Sourcing
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-[#E5E0D0] bg-[#FAF5E8] px-3 py-1 text-xs font-mono font-medium text-[#1A1A1A]">
                  <span className="text-[#767676]">HS Code:</span> {data.hs_code}
                </span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-[#0A0A0A] sm:text-4xl lg:text-5xl">
                {data.category_name}
              </h1>

              <p className="mt-2 text-base font-semibold text-[#8B6008] sm:text-lg">
                Technical Specifications &amp; Sourcing Details
              </p>

              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#3A3A3A] sm:text-base">
                {data.overview}
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-[#1A2A2A] bg-[#0A1A1A] text-white p-6 shadow-xl">
                <h3 className="text-base font-bold text-white">Connect with Exporters</h3>
                <p className="mt-1 text-xs text-slate-400">Request Live Quotes &amp; Specifications</p>
                <div className="mt-6">
                  <Link
                    href={`/exports/spices/${data.slug}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3.5 text-center text-sm font-bold text-slate-950 transition hover:bg-amber-300"
                  >
                    View Full Specifications &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Commercial Varieties (Level 2) */}
        {varieties.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#EAE5D9] pb-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#8B6008] flex items-center gap-1.5">
                  <Layers3 className="h-4 w-4" />
                  Available Varieties
                </div>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#0A0A0A] sm:text-3xl">
                  {data.category_name} Commercial Varieties &amp; Grades
                </h2>
              </div>
              <span className="text-xs text-[#767676]">
                {varieties.length} export grades
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {varieties.map((v) => (
                <Link
                  key={v.varietySlug}
                  href={v.slug}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E5E0D0] bg-white transition hover:border-[#0A0A0A]/40 hover:shadow-md hover:-translate-y-1"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-[#FAF5E8]">
                    <Image
                      src={v.image}
                      alt={v.variety}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="font-mono text-[11px] font-semibold text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20">
                        {data.category_name}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 left-3 right-3 text-white text-xs flex items-center justify-between">
                      <span className="font-semibold">{v.technical_specifications.length} Technical Specs</span>
                      <span className="text-[11px] text-white/90 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-500/30">
                        Export Ready
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#0A0A0A] group-hover:text-[#8B6008] transition">
                        {v.variety}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#5A5A5A]">
                        {v.overview}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[#EAE5D9] pt-3 text-xs">
                      <span className="text-[#767676]">MOQ: 1x 20ft FCL</span>
                      <span className="font-semibold text-[#8B6008] group-hover:translate-x-1 transition flex items-center gap-1">
                        View Specifications &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
