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
  Users,
  ChevronDown,
} from "lucide-react";
import type { TextileCategoryData, TextileLevel2Data } from "@/lib/textiles";
import TextileLeadGenForm from "@/components/TextileLeadGenForm";

interface Props {
  data: TextileCategoryData;
  relatedTextiles: TextileCategoryData[];
  varieties?: TextileLevel2Data[];
}

export default function TextileDetailClient({
  data,
  relatedTextiles,
  varieties = [],
}: Props) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[var(--canvas)] font-sans text-[var(--ink)] antialiased">
      {/* Top Informational Bar */}
      <div className="border-b border-[#EAE5D9] bg-[#FAF5E8] py-2.5 px-4 text-xs tracking-wide text-[#5A5A5A]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#1A1A1A]">Indian Textiles Export Directory</span>
            <span className="text-[#B0A898]">•</span>
            <span className="text-[#6A6A6A]">Direct Mill Procurement &amp; Verified Specifications</span>
          </div>
          <div className="text-xs text-[#767676] hidden sm:block">
            OEKO-TEX Standard 100 &bull; GOTS Organic &bull; BCI &bull; ISO 9001:2015
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
          <span className="font-medium text-[#0A0A0A]">{data.category_name}</span>
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
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-900">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                  Commercial Export Grade
                </span>
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
                {data.category_name}
              </h1>

              <p className="mt-1.5 text-sm sm:text-base font-medium text-emerald-800">
                Technical Specifications, Quality Benchmarks &amp; Exporter Sourcing
              </p>

              <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-[#3A3A3A]">
                {data.overview}
              </p>

              {/* Commercial Metrics Strip */}
              <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4 border-t border-[#EAE5D9] pt-4">
                <div className="rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#767676]">Origin</div>
                  <div className="mt-1 text-xs font-semibold text-[#0A0A0A]">India Mill Hubs</div>
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
                  <div className="mt-1 text-xs font-semibold text-[#0A0A0A]">Swatches &amp; Cones</div>
                </div>
              </div>

              {/* Fast B2B Sourcing Protocol Alert */}
              <div className="mt-4 rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-3.5 text-xs text-[#5A5A5A] space-y-1">
                <div className="font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-amber-600" />
                  Direct Factory Sourcing Protocol
                </div>
                <p className="leading-relaxed">
                  Submit your required yarn count, fabric construction, or container volume on the right to receive direct factory quotations and technical Uster/lab datasheets within 24 hours.
                </p>
              </div>
            </motion.div>

            {/* Right: Lead Gen Form */}
            <div className="lg:col-span-6 flex justify-center">
              <TextileLeadGenForm
                textileCategory={data.category_name}
                hsCode={data.hs_code}
                availableForms={data.export_forms_details.map((f) => ({ form: f.form }))}
                className="w-full shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 2. COMMERCIAL VARIETIES & SUB-CATEGORIES (LEVEL 2)                */}
        {/* ================================================================= */}
        {varieties.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#EAE5D9] pb-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <Layers3 className="h-4 w-4" />
                  Sub-Categories &amp; Commercial Grades
                </div>
                <h2 className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight text-[#0A0A0A]">
                  Commercial {data.category_name} Export Varieties
                </h2>
              </div>
              <span className="text-xs text-[#767676]">
                {varieties.length} commercial specifications with factory-direct supply
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {varieties.map((v) => (
                <Link
                  key={v.slug}
                  href={`/textiles/${v.categorySlug}/${v.varietySlug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-[#E5E0D0] bg-white p-5 transition hover:border-[#0A0A0A]/40 hover:shadow-md hover:-translate-y-0.5 no-underline"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#EAE5D9]">
                      <span className="font-mono text-xs font-semibold text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        HS {v.hs_code}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-[#FAF5E8] px-2 py-0.5 rounded border border-[#E5E0D0]">
                        Export Ready
                      </span>
                    </div>

                    <div className="mt-3.5">
                      <h3 className="text-base font-semibold text-[#0A0A0A] group-hover:text-emerald-800 transition">
                        {v.sub_category_name}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#5A5A5A]">
                        {v.commercial_overview || v.hero_subheadline}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[#EAE5D9] pt-3 text-xs">
                    <span className="text-[#767676] text-[11px]">
                      {v.technical_specifications.length} Technical Specs
                    </span>
                    <span className="font-semibold text-emerald-800 group-hover:translate-x-1 transition flex items-center gap-1 text-xs">
                      View Specifications &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* ================================================================= */}
        {/* 3. EXPORT FORMS & CONSTRUCTION DETAILS                            */}
        {/* ================================================================= */}
        {data.export_forms_details.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="border-b border-[#EAE5D9] pb-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <Layers className="h-4 w-4" />
                Processing Formats &amp; Specifications
              </div>
              <h2 className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight text-[#0A0A0A]">
                Commercial Export Forms &amp; Industry Applications
              </h2>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.export_forms_details.map((form, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#E5E0D0] bg-white p-5 shadow-2xs hover:border-[#0A0A0A]/30 transition"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 font-semibold text-xs border border-emerald-200">
                      0{idx + 1}
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-[#0A0A0A]">{form.form}</h3>
                  </div>

                  <div className="mt-3.5 space-y-2.5 text-xs">
                    <div>
                      <span className="block font-medium text-[#767676] uppercase tracking-wider text-[10px]">
                        Primary Application:
                      </span>
                      <p className="mt-0.5 text-[#2A2A2A] font-medium leading-relaxed">
                        {form.best_use_case}
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-3">
                      <span className="block font-medium text-emerald-900 uppercase tracking-wider text-[10px]">
                        Target Manufacturing Sector:
                      </span>
                      <p className="mt-0.5 text-[#4A4A4A] leading-relaxed">
                        {form.industry_application}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ================================================================= */}
        {/* 4. INTERNATIONAL TRADE & COMPLIANCE (3 CARDS)                     */}
        {/* ================================================================= */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="border-b border-[#EAE5D9] pb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <Globe className="h-4 w-4" />
              International Trade Intelligence
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight text-[#0A0A0A]">
              Compliance Standards, Packaging &amp; Mill Quality Control
            </h2>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {/* Card 1: Target Market & Buyer Archetypes */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#E5E0D0] bg-white p-5 shadow-2xs">
              <div>
                <div className="flex items-center justify-between border-b border-[#EAE5D9] pb-3">
                  <h3 className="text-sm sm:text-base font-semibold text-[#0A0A0A] flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    Target Buyer Profiles
                  </h3>
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-800 border border-blue-200">
                    Enterprise
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["United States", "European Union", "GCC & Middle East", "Asia-Pacific"].map((dest) => (
                    <span
                      key={dest}
                      className="rounded-md bg-[#FAF5E8] px-2 py-0.5 text-[11px] font-medium text-[#4A4A4A] border border-[#E5E0D0]"
                    >
                      {dest}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 mt-3.5">
                  {data.target_buyer_profiles.map((profile, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#3A3A3A]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{profile}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: Packaging & Freight Containers */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#E5E0D0] bg-white p-5 shadow-2xs">
              <div>
                <div className="flex items-center justify-between border-b border-[#EAE5D9] pb-3">
                  <h3 className="text-sm sm:text-base font-semibold text-[#0A0A0A] flex items-center gap-2">
                    <Package className="h-4 w-4 text-amber-600" />
                    Packaging &amp; Container Logistics
                  </h3>
                  <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium text-amber-900 border border-amber-200">
                    ISPM-15 Ready
                  </span>
                </div>

                <div className="mt-3.5 space-y-3 text-xs">
                  <div>
                    <span className="font-medium uppercase tracking-wider text-[#767676] text-[10px]">
                      Export Packaging Specification:
                    </span>
                    <p className="mt-1 text-xs leading-relaxed text-[#2A2A2A]">
                      {data.quality_and_compliance.packaging_options}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-3 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-medium text-[#1A1A1A]">20ft FCL Container:</span>
                      <span className="font-mono font-semibold text-emerald-800">~9 - 11 Metric Tons</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] border-t border-[#EAE5D9] pt-1.5">
                      <span className="font-medium text-[#1A1A1A]">40ft HC Container:</span>
                      <span className="font-mono font-semibold text-emerald-800">~19 - 22 Metric Tons</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-[#EAE5D9] text-[11px] text-[#767676]">
                All cartons/bales packed with multi-ply moisture barriers.
              </div>
            </div>

            {/* Card 3: Quality Control & Certifications */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#E5E0D0] bg-white p-5 shadow-2xs">
              <div>
                <div className="flex items-center justify-between border-b border-[#EAE5D9] pb-3">
                  <h3 className="text-sm sm:text-base font-semibold text-[#0A0A0A] flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    Mill QA &amp; Testing Protocol
                  </h3>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-800 border border-emerald-200">
                    Audited
                  </span>
                </div>

                <div className="mt-3.5 space-y-3 text-xs">
                  <div>
                    <span className="font-medium uppercase tracking-wider text-[#767676] text-[10px]">
                      International Compliance Supported:
                    </span>
                    <p className="mt-1 text-xs leading-relaxed text-[#2A2A2A]">
                      {data.quality_and_compliance.standard_certifications}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-3 space-y-1">
                    <div className="font-medium text-[#1A1A1A]">Pre-Shipment Inspection</div>
                    <p className="text-[11px] text-[#5A5A5A] leading-relaxed">
                      SGS, Intertek, or Bureau Veritas container loading and laboratory verification accommodated per buyer instructions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-[#EAE5D9] text-[11px] text-emerald-800 font-medium">
                Full Uster / tensile COA dispatched with every commercial lot.
              </div>
            </div>
          </div>
        </motion.section>

        {/* ================================================================= */}
        {/* 5. SOURCING PROCESS STEPS                                         */}
        {/* ================================================================= */}
        <section className="rounded-2xl border border-[#E5E0D0] bg-white p-5 sm:p-7 shadow-xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
            Standard Operating Procedure
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-[#0A0A0A]">
            How to Procure {data.category_name} via GoExports
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Submit Technical RFQ",
                desc: "Specify your required yarn count, GSM, fabric construction, compliance standards, and destination port.",
              },
              {
                step: "02",
                title: "Factory Matching & Quote",
                desc: "We route your parameters to pre-screened Indian mills to secure competitive factory-direct quotations.",
              },
              {
                step: "03",
                title: "Swatches & Lab Validation",
                desc: "Receive physical yarn cones or fabric swatches along with complete Uster/lab test certificates for approval.",
              },
              {
                step: "04",
                title: "Contracting & Container Load",
                desc: "Finalize trade contracts with L/C or T/T terms, optional third-party pre-shipment inspection, and ocean freight booking.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-4 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-semibold text-emerald-800 bg-white px-2 py-0.5 rounded border border-[#E5E0D0]">
                    Step {s.step}
                  </span>
                  <h4 className="mt-2.5 text-xs sm:text-sm font-semibold text-[#0A0A0A]">{s.title}</h4>
                  <p className="mt-1 text-xs text-[#5A5A5A] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

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
                Commercial Procurement FAQs for {data.category_name}
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
        {/* 7. RELATED TEXTILE CATEGORIES                                     */}
        {/* ================================================================= */}
        {relatedTextiles.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-[#EAE5D9]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#767676]">
                  Explore Other Categories
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-[#0A0A0A]">
                  Related Indian Textile Commodities
                </h2>
              </div>
              <Link
                href="/textiles"
                className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
              >
                All 15 Categories &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTextiles.slice(0, 3).map((item) => (
                <Link
                  key={item.slug}
                  href={`/textiles/${item.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-[#E5E0D0] bg-white p-4 transition hover:border-[#0A0A0A]/40 hover:shadow-md hover:-translate-y-0.5 no-underline"
                >
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-[#EAE5D9]">
                      <span className="font-mono text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        HS {item.hs_code}
                      </span>
                      <span className="text-[11px] text-[#767676]">
                        {item.export_forms_details.length} Forms
                      </span>
                    </div>
                    <div className="mt-2.5">
                      <h4 className="text-sm font-semibold text-[#0A0A0A] group-hover:text-emerald-800 transition">
                        {item.category_name}
                      </h4>
                      <p className="mt-1 line-clamp-2 text-xs text-[#5A5A5A] leading-relaxed">
                        {item.overview}
                      </p>
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
