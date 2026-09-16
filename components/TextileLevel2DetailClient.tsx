"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Package,
  Globe,
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  Zap,
  TrendingUp,
  Award,
  Layers,
  HelpCircle,
  Truck,
  Anchor,
  Search,
  Layers3,
  ChevronDown,
} from "lucide-react";
import type { TextileLevel2Data, TextileCategoryData } from "@/lib/textiles";
import TextileLeadGenForm from "@/components/TextileLeadGenForm";

interface Props {
  data: TextileLevel2Data;
  siblingVarieties: TextileLevel2Data[];
  relatedCategories: TextileCategoryData[];
}

export default function TextileLevel2DetailClient({
  data,
  siblingVarieties,
  relatedCategories,
}: Props) {
  const [tableSearch, setTableSearch] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const filteredSpecs = data.technical_specifications.filter((spec) => {
    if (tableSearch) {
      const q = tableSearch.toLowerCase();
      return (
        spec.parameter.toLowerCase().includes(q) ||
        spec.specification_range.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const parentSlug = data.parentCategory?.slug || data.categorySlug;
  const parentName = data.parentCategory?.category_name || data.parent_category;

  return (
    <div className="min-h-screen bg-[var(--canvas)] font-sans text-[var(--ink)] antialiased">
      {/* Top Informational Bar */}
      <div className="border-b border-[#EAE5D9] bg-[#FAF5E8] py-2.5 px-4 text-xs tracking-wide text-[#5A5A5A]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#1A1A1A]">Indian Textiles Export Registry</span>
            <span className="text-[#B0A898]">•</span>
            <span className="text-[#6A6A6A]">Level-2 Commercial Specification &amp; Mill Batch Testing</span>
          </div>
          <div className="text-xs text-[#767676] hidden sm:block">
            Pre-Screened Export Mills &bull; Containerized Logistics &bull; Lot COA
          </div>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="border-b border-[#EAE5D9] bg-white/70 py-3 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 text-xs text-[#767676] sm:px-6 lg:px-8">
          <Link href="/" className="transition hover:text-[#0A0A0A]">
            Home
          </Link>
          <span className="text-[#C5BFA9]">/</span>
          <Link href="/textiles" className="transition hover:text-[#0A0A0A]">
            Textiles
          </Link>
          <span className="text-[#C5BFA9]">/</span>
          <Link href={`/textiles/${parentSlug}`} className="transition hover:text-[#0A0A0A]">
            {parentName}
          </Link>
          <span className="text-[#C5BFA9]">/</span>
          <span className="font-medium text-[#0A0A0A]">{data.sub_category_name}</span>
        </div>
      </nav>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
        {/* ================================================================= */}
        {/* 1. HERO SECTION WITH LEAD GEN FORM                                */}
        {/* ================================================================= */}
        <section className="relative overflow-hidden rounded-2xl border border-[#E5E0D0] bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
          {/* Subtle Ambient Radial Glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-6"
            >
              {/* Badge Strip */}
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Link
                  href={`/textiles/${parentSlug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-900 transition hover:bg-emerald-100 no-underline"
                >
                  <Layers3 className="h-3.5 w-3.5 text-emerald-600" />
                  Category: {parentName}
                </Link>
                <span className="inline-flex items-center gap-1 rounded-full border border-[#E5E0D0] bg-[#FAF5E8] px-3 py-1 text-xs font-mono font-medium text-[#1A1A1A]">
                  <span className="text-[#767676]">HS Code:</span> {data.hs_code}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Origin: India
                </span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#0A0A0A] leading-tight">
                {data.sub_category_name}
              </h1>

              <p className="mt-1.5 text-sm sm:text-base font-medium text-emerald-800">
                {data.hero_headline}
              </p>

              {data.hero_subheadline && (
                <p className="mt-1 text-xs font-medium text-[#767676]">
                  {data.hero_subheadline}
                </p>
              )}

              <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-[#3A3A3A]">
                {data.commercial_overview}
              </p>

              {/* Commercial Metrics Strip */}
              <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4 border-t border-[#EAE5D9] pt-4">
                <div className="rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#767676]">Harmonized</div>
                  <div className="mt-1 text-xs font-semibold text-[#0A0A0A]">HS {data.hs_code}</div>
                </div>
                <div className="rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#767676]">Compliance</div>
                  <div className="mt-1 text-xs font-semibold text-[#0A0A0A]">OEKO-TEX / GOTS</div>
                </div>
                <div className="rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#767676]">Typical MOQ</div>
                  <div className="mt-1 text-xs font-semibold text-[#0A0A0A]">1x 20ft FCL</div>
                </div>
                <div className="rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#767676]">Lab Samples</div>
                  <div className="mt-1 text-xs font-semibold text-[#0A0A0A]">Cones / Swatches</div>
                </div>
              </div>

              {/* Fast B2B Sourcing Protocol Alert */}
              <div className="mt-4 rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-3.5 text-xs text-[#5A5A5A] space-y-1">
                <div className="font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-amber-600" />
                  Direct Factory Sourcing Protocol
                </div>
                <p className="leading-relaxed">
                  Submit your required specifications on the right to receive tailored commercial quotations and Uster test certificates directly from vetted Indian textile mills.
                </p>
              </div>
            </motion.div>

            {/* Right: Lead Gen Form */}
            <div className="lg:col-span-6 flex justify-center">
              <TextileLeadGenForm
                textileCategory={`${parentName} - ${data.sub_category_name}`}
                hsCode={data.hs_code}
                buttonText={`Request Pricing for ${data.sub_category_name}`}
                className="w-full shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 2. TECHNICAL SPECIFICATIONS TABLE (SEARCHABLE)                    */}
        {/* ================================================================= */}
        {data.technical_specifications.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#EAE5D9] pb-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <FileSpreadsheet className="h-4 w-4" />
                  Analytical Parameters
                </div>
                <h2 className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight text-[#0A0A0A]">
                  Technical Specifications &amp; Quality Benchmarks
                </h2>
              </div>

              {/* Quick Table Search */}
              <div className="relative w-full sm:w-72">
                <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-[#8A8A8A]" />
                <input
                  type="text"
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  placeholder="Search parameter (e.g. Count, CSP, IPI)..."
                  className="w-full rounded-xl border border-[#E5E0D0] bg-white py-2 pl-9 pr-3 text-xs text-[#0A0A0A] placeholder:text-[#9A9A9A] focus:border-[#0A0A0A] focus:outline-none transition"
                />
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-[#E5E0D0] bg-white shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-[#3A3A3A]">
                  <thead className="border-b border-[#EAE5D9] bg-[#FAF5E8] text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                    <tr>
                      <th scope="col" className="py-3.5 px-6 w-1/3">
                        Analytical Parameter
                      </th>
                      <th scope="col" className="py-3.5 px-6">
                        Standard Commercial Specification / Range
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE5D9]">
                    {filteredSpecs.map((spec, index) => (
                      <tr
                        key={index}
                        className="hover:bg-[#FAF7F0] transition-colors"
                      >
                        <td className="py-3.5 px-6 font-medium text-[#0A0A0A] text-xs sm:text-sm">
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 shrink-0" />
                            {spec.parameter}
                          </div>
                        </td>
                        <td className="py-3.5 px-6 text-[#1A1A1A]">
                          <span className="inline-block font-mono text-xs font-medium text-emerald-950 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                            {spec.specification_range}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-[#EAE5D9] bg-[#FAF5E8] px-6 py-2.5 text-xs text-[#767676] flex flex-wrap items-center justify-between gap-2">
                <span>* Values represent export standards. Mill-specific Uster test reports available upon request.</span>
                <span className="text-emerald-800 font-medium">Custom parameters accommodated upon technical RFQ</span>
              </div>
            </div>
          </motion.section>
        )}

        {/* ================================================================= */}
        {/* 3. COMMERCIAL APPLICATIONS & END USES                             */}
        {/* ================================================================= */}
        {data.applications_and_end_uses.length > 0 && (
          <section className="space-y-3.5">
            <div className="border-b border-[#EAE5D9] pb-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <Layers className="h-4 w-4" />
                Industry Applications
              </div>
              <h2 className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight text-[#0A0A0A]">
                Commercial End Uses for {data.sub_category_name}
              </h2>
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2">
              {data.applications_and_end_uses.map((app, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#E5E0D0] bg-white p-4 sm:p-5 shadow-2xs"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 font-semibold text-xs border border-emerald-200 shrink-0 mt-0.5">
                      0{idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-[#3A3A3A] leading-relaxed font-medium">
                      {app}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* 4. EXPORT PACKAGING & CONTAINER LOGISTICS                         */}
        {/* ================================================================= */}
        <section className="rounded-2xl border border-[#E5E0D0] bg-white p-5 sm:p-7 shadow-xs">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-3.5">
              <div className="inline-flex items-center gap-1.5 rounded-md bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-900 border border-amber-200">
                <Package className="h-3.5 w-3.5 text-amber-600" />
                Seaworthy Export Logistics
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-[#0A0A0A]">
                Export Packaging, Payload &amp; Minimum Order Quantities
              </h2>
              <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                {data.export_packaging_and_moq.standard_packaging}
              </p>

              <div className="rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-3.5 text-xs">
                <span className="block font-semibold text-[#1A1A1A] uppercase tracking-wider text-[10px] mb-1">
                  Standard Minimum Order Quantity (MOQ):
                </span>
                <span className="font-semibold text-emerald-800">
                  {data.export_packaging_and_moq.typical_moq}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[#E5E0D0] bg-[#FAF7F0] p-5 space-y-3">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#767676]">
                  Certifications Supported For {data.sub_category_name}
                </h4>
                <div className="space-y-2">
                  {data.quality_certifications_supported.map((cert, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 rounded-xl bg-white p-2.5 text-xs font-medium text-[#1A1A1A] border border-[#E5E0D0]"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 5. SOURCING PROCESS STEPS                                         */}
        {/* ================================================================= */}
        {data.sourcing_process_steps.length > 0 && (
          <section className="rounded-2xl border border-[#E5E0D0] bg-white p-5 sm:p-7 shadow-xs">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
              Procurement Workflow
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-[#0A0A0A]">
              Sourcing Process for {data.sub_category_name}
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {data.sourcing_process_steps.map((s) => (
                <div
                  key={s.step}
                  className="rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-4 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs font-semibold text-emerald-800 bg-white px-2 py-0.5 rounded border border-[#E5E0D0]">
                      Step 0{s.step}
                    </span>
                    <h4 className="mt-2.5 text-xs sm:text-sm font-semibold text-[#0A0A0A]">{s.title}</h4>
                    <p className="mt-1 text-xs text-[#5A5A5A] leading-relaxed">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* 6. INTERACTIVE B2B FAQ ACCORDION                                  */}
        {/* ================================================================= */}
        {data.faqs.length > 0 && (
          <section className="space-y-3.5">
            <div className="border-b border-[#EAE5D9] pb-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4" />
                Frequently Asked Questions
              </div>
              <h2 className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight text-[#0A0A0A]">
                Commercial Sourcing FAQs: {data.sub_category_name}
              </h2>
            </div>

            <div className="space-y-2.5">
              {data.faqs.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-2xl border border-[#E5E0D0] bg-white transition shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between p-4 sm:p-5 text-left transition hover:bg-[#FAF7F0] cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-[#0A0A0A] pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-[#767676] shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#0A0A0A]" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-[#EAE5D9] bg-[#FAF7F0]/40 px-4 sm:px-5 py-3.5"
                        >
                          <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* 7. SIBLING VARIETIES GRID (CLEAN DATA-FIRST CARDS)                 */}
        {/* ================================================================= */}
        {siblingVarieties.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-[#EAE5D9]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#767676]">
                  Sibling Varieties
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-[#0A0A0A]">
                  Other Export Grades in {parentName}
                </h2>
              </div>
              <Link
                href={`/textiles/${parentSlug}`}
                className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
              >
                View Category Hub &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingVarieties.map((item) => (
                <Link
                  key={item.slug}
                  href={`/textiles/${item.categorySlug}/${item.varietySlug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-[#E5E0D0] bg-white p-4 transition hover:border-[#0A0A0A]/40 hover:shadow-md hover:-translate-y-0.5 no-underline"
                >
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-[#EAE5D9]">
                      <span className="font-mono text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        HS {item.hs_code}
                      </span>
                      <span className="text-[11px] text-[#767676]">
                        {item.technical_specifications.length} Specs
                      </span>
                    </div>
                    <div className="mt-2.5">
                      <h4 className="text-sm font-semibold text-[#0A0A0A] group-hover:text-emerald-800 transition">
                        {item.sub_category_name}
                      </h4>
                      <p className="mt-1 line-clamp-2 text-xs text-[#5A5A5A] leading-relaxed">
                        {item.commercial_overview || item.hero_subheadline}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#EAE5D9] flex items-center justify-end text-xs font-medium text-emerald-800 group-hover:translate-x-1 transition">
                    View Specifications &rarr;
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
