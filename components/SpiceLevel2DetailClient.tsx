"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  Camera,
  Layers3,
  Bookmark,
} from "lucide-react";
import type { SpiceLevel2Data, SpiceCategoryData } from "@/lib/spices";
import SpiceLeadGenForm from "@/components/SpiceLeadGenForm";
import SpiceFAQAccordion from "@/components/SpiceFAQAccordion";

interface Props {
  data: SpiceLevel2Data;
  siblingVarieties: SpiceLevel2Data[];
  relatedCategories: SpiceCategoryData[];
}

export default function SpiceLevel2DetailClient({
  data,
  siblingVarieties,
  relatedCategories,
}: Props) {
  const [tableSearch, setTableSearch] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<string>(data.image);

  const filteredSpecs = data.technical_specifications.filter((spec) => {
    if (tableSearch) {
      const q = tableSearch.toLowerCase();
      return (
        spec.parameter.toLowerCase().includes(q) ||
        spec.standard_value.toLowerCase().includes(q) ||
        spec.testing_method.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const parentSlug = data.parentCategory?.slug || data.categorySlug;
  const parentName = data.parentCategory?.category_name || data.category;
  const parentHsCode = data.parentCategory?.hs_code || "0904.00.00";

  return (
    <div className="space-y-12">
      {/* ================================================================= */}
      {/* 1. HERO SECTION WITH FAST LEAD GEN FORM                           */}
      {/* ================================================================= */}
      <section className="relative overflow-hidden rounded-2xl border border-[#E5E0D0] bg-white p-6 sm:p-10 shadow-sm">
        {/* Subtle Ambient Radial Glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-6"
          >
            {/* Live Indicator Badge Strip */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Link
                href={`/spices/${parentSlug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900 transition hover:bg-amber-100"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                Category: {parentName}
              </Link>
              <span className="inline-flex items-center gap-1 rounded-full border border-[#E5E0D0] bg-[#FAF5E8] px-3 py-1 text-xs font-mono font-medium text-[#1A1A1A]">
                <span className="text-[#767676]">HS Code:</span> {parentHsCode}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Origin: India
              </span>
            </div>

            {/* Variety Title & Subtitle */}
            <h1 className="text-3xl font-extrabold tracking-tight text-[#0A0A0A] sm:text-4xl lg:text-5xl leading-tight">
              {data.variety}
            </h1>

            <p className="mt-2 text-base font-semibold text-[#8B6008] sm:text-lg">
              Export Grade Sourcing, Technical Specifications &amp; Direct Quotations
            </p>

            {/* Featured Variety Image Showcase */}
            <div className="mt-5 space-y-2.5">
              <div className="relative h-56 sm:h-64 w-full overflow-hidden rounded-2xl border border-[#E5E0D0] bg-[#FAF7F0] shadow-inner group">
                <Image
                  src={selectedPhoto || data.image}
                  alt={`${data.variety} commercial export grade`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-white border border-white/20">
                    <Camera className="h-3 w-3 text-amber-300" />
                    Commercial Variety
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950/70 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-emerald-200 border border-emerald-500/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Verified Indian Exporters
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="font-semibold drop-shadow-sm truncate">
                    {data.variety} &bull; {parentName}
                  </span>
                  <span className="text-[11px] text-white/90 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-white/10 hidden sm:inline-block">
                    COA &amp; Phytosanitary Ready
                  </span>
                </div>
              </div>

              {/* Photo View Switcher */}
              {data.secondaryImage && data.secondaryImage !== data.image && (
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#767676]">
                    Format Views:
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedPhoto(data.image)}
                    className={`flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-medium transition cursor-pointer ${
                      selectedPhoto === data.image
                        ? "border-[#0A0A0A] bg-[#0A0A0A] text-white shadow-2xs"
                        : "border-[#E5E0D0] bg-[#FAF5E8] text-[#3A3A3A] hover:bg-[#F5EFE0]"
                    }`}
                  >
                    <span>Whole / Primary Cut</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPhoto(data.secondaryImage!)}
                    className={`flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-medium transition cursor-pointer ${
                      selectedPhoto === data.secondaryImage
                        ? "border-[#0A0A0A] bg-[#0A0A0A] text-white shadow-2xs"
                        : "border-[#E5E0D0] bg-[#FAF5E8] text-[#3A3A3A] hover:bg-[#F5EFE0]"
                    }`}
                  >
                    <span>Processed / Bulk Format</span>
                  </button>
                </div>
              )}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[#3A3A3A] sm:text-base">
              {data.overview}
            </p>

            {/* Commercial Metrics Strip */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-3 border-t border-[#EAE5D9] pt-5">
              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-3 transition"
              >
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#767676]">Category</div>
                <div className="mt-1 text-xs sm:text-sm font-bold text-[#0A0A0A] truncate">{parentName}</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-3 transition"
              >
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#767676]">Treatment</div>
                <div className="mt-1 text-xs sm:text-sm font-bold text-[#0A0A0A]">Steam / ETO-Free</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-3 transition"
              >
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#767676]">Export MOQ</div>
                <div className="mt-1 text-xs sm:text-sm font-bold text-[#0A0A0A]">1x 20ft FCL (or LCL)</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-3 transition"
              >
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#767676]">Pre-Ship Samples</div>
                <div className="mt-1 text-xs sm:text-sm font-bold text-[#0A0A0A]">Couriers on Request</div>
              </motion.div>
            </div>

            {/* Quick Sourcing Guidance Box */}
            <div className="mt-5 rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-4 text-xs text-[#5A5A5A] space-y-1.5">
              <div className="font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-[#8B6008]" />
                Direct Exporter Matching
              </div>
              <p>
                Configure your grade and volume parameters on the right to receive competitive proforma quotations and batch COAs directly from verified Indian processors for {data.variety}.
              </p>
            </div>
          </motion.div>

          {/* Quick Lead Gen Form (Hero Right) */}
          <div className="lg:col-span-6 flex justify-center">
            <SpiceLeadGenForm
              spiceCategory={`${data.variety} (${parentName})`}
              hsCode={parentHsCode}
              buttonText={`Request ${data.variety} Quotation`}
              className="w-full shadow-md"
            />
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. SPECIFICATIONS TABLE WITH SEARCH & HOVER MICRO-ANIMATION       */}
      {/* ================================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#EAE5D9] pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#8B6008] flex items-center gap-1.5">
              <FileSpreadsheet className="h-4 w-4" />
              Quality Assurance Benchmarks
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#0A0A0A] sm:text-3xl">
              {data.variety} Technical Specifications
            </h2>
          </div>

          {/* Quick Table Search */}
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-[#8A8A8A]" />
            <input
              type="text"
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              placeholder="Search parameters..."
              className="w-full rounded-xl border border-[#E5E0D0] bg-white py-2 pl-9 pr-3 text-xs text-[#0A0A0A] placeholder:text-[#9A9A9A] focus:border-[#0A0A0A] focus:outline-none transition"
            />
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-[#E5E0D0] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#3A3A3A]">
              <thead className="border-b border-[#EAE5D9] bg-[#FAF5E8] text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                <tr>
                  <th scope="col" className="py-4 px-6">
                    Parameter / Quality Characteristic
                  </th>
                  <th scope="col" className="py-4 px-6">
                    Standard Commercial Value
                  </th>
                  <th scope="col" className="py-4 px-6">
                    Testing Method &amp; Protocol Reference
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE5D9]">
                {filteredSpecs.map((spec, index) => (
                  <motion.tr
                    key={index}
                    whileHover={{ backgroundColor: "#FAF7F0" }}
                    transition={{ duration: 0.15 }}
                  >
                    <td className="py-4 px-6 font-semibold text-[#0A0A0A]">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        {spec.parameter}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[#1A1A1A]">
                      <span className="inline-block font-mono text-xs font-semibold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                        {spec.standard_value}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-[#5A5A5A]">
                      <span className="font-mono bg-[#FAF5E8] text-[#1A1A1A] px-2.5 py-1 rounded-md border border-[#E5E0D0]">
                        {spec.testing_method}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-[#EAE5D9] bg-[#FAF5E8] px-6 py-3 text-xs text-[#767676] flex flex-wrap items-center justify-between gap-2">
            <span>* Specifications represent standard export parameters. Inquire for custom batch sorting, particle sizing, or ASTA calibration.</span>
            <span className="text-[#8B6008] font-semibold">ISO 17025 Accredited Lab COAs Provided</span>
          </div>
        </div>
      </motion.section>

      {/* ================================================================= */}
      {/* 3. COMPLIANCE & LOGISTICS GRID                                    */}
      {/* ================================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="border-b border-[#EAE5D9] pb-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#8B6008] flex items-center gap-1.5">
            <Globe className="h-4 w-4" />
            International Trade Intelligence
          </div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#0A0A0A] sm:text-3xl">
            Regulatory Compliance, Packaging &amp; Ocean Freight
          </h2>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Target Market Relevance */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col justify-between rounded-2xl border border-[#E5E0D0] bg-white p-6 shadow-sm hover:shadow-md overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#EAE5D9] pb-3">
                <h3 className="text-base font-bold text-[#0A0A0A] flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  Target Markets &amp; Quality
                </h3>
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-800 border border-blue-200">
                  Global Standard
                </span>
              </div>

              <div className="relative h-28 w-full overflow-hidden rounded-xl mt-4 mb-3 border border-[#EAE5D9] group">
                <Image
                  src="https://images.pexels.com/photos/906023/pexels-photo-906023.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Global Export Destinations"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px]">
                  <span className="font-semibold">{parentName} Variety</span>
                  <span className="text-white/90 font-mono text-[10px] bg-black/50 px-2 py-0.5 rounded border border-white/20">USA &bull; EU &bull; GCC &bull; APAC</span>
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="font-semibold uppercase tracking-wider text-[#767676]">Commercial Cultivar:</span>
                  <p className="mt-1 text-sm font-semibold text-[#1A1A1A]">
                    {data.variety}
                  </p>
                </div>

                <div className="rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-3.5">
                  <span className="font-semibold uppercase tracking-wider text-[#8B6008]">Regulatory Baseline:</span>
                  <p className="mt-1 text-xs leading-relaxed text-[#3A3A3A]">
                    Meets EU Regulation (EC) 396/2005 for pesticide MRLs, US FDA FSVP requirements, and Spices Board of India export mandates.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-3 text-[11px] text-[#767676]">
              Third-party pre-shipment inspections (SGS, Eurofins, Intertek) available prior to maritime loading.
            </div>
          </motion.div>

          {/* Standard Industry Certifications */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col justify-between rounded-2xl border border-[#E5E0D0] bg-white p-6 shadow-sm hover:shadow-md overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#EAE5D9] pb-3">
                <h3 className="text-base font-bold text-[#0A0A0A] flex items-center gap-2">
                  <Award className="h-5 w-5 text-emerald-600" />
                  Facility Accreditations
                </h3>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 border border-emerald-200">
                  Certified Exporters
                </span>
              </div>

              <div className="relative h-28 w-full overflow-hidden rounded-xl mt-4 mb-3 border border-[#EAE5D9] group">
                <Image
                  src="https://images.pexels.com/photos/3735777/pexels-photo-3735777.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Analytical Laboratory Quality Assurance"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px]">
                  <span className="font-semibold">ISO / BRCGS Facilities</span>
                  <span className="text-white/90 font-mono text-[10px] bg-black/50 px-2 py-0.5 rounded border border-white/20">Lot Traceability</span>
                </div>
              </div>

              <p className="text-xs text-[#767676]">
                Certifications held by verified processors for {data.variety}:
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {data.regulatory_certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-[#FAF7F0] px-3 py-1.5 text-xs font-medium text-[#1A1A1A]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-3 text-[11px] text-[#767676]">
              Request specific Halal, Kosher, or Organic certificates alongside your quotation submission.
            </div>
          </motion.div>

          {/* Shipping & Container Logistics */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col justify-between rounded-2xl border border-[#E5E0D0] bg-white p-6 shadow-sm hover:shadow-md overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#EAE5D9] pb-3">
                <h3 className="text-base font-bold text-[#0A0A0A] flex items-center gap-2">
                  <Truck className="h-5 w-5 text-amber-600" />
                  Container Freight Logistics
                </h3>
                <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-900 border border-amber-200">
                  FCL / LCL
                </span>
              </div>

              <div className="relative h-28 w-full overflow-hidden rounded-xl mt-4 mb-3 border border-[#EAE5D9] group">
                <Image
                  src="https://images.pexels.com/photos/2226458/pexels-photo-2226458.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Ocean Container Freight"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px]">
                  <span className="font-semibold">Ocean Shipping</span>
                  <span className="text-white/90 font-mono text-[10px] bg-black/50 px-2 py-0.5 rounded border border-white/20">FOB / CIF / CFR</span>
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="font-semibold uppercase tracking-wider text-[#767676]">Packaging Options:</span>
                  <p className="mt-1 text-xs leading-relaxed text-[#3A3A3A]">
                    {data.shipping_logistics.packaging_options}
                  </p>
                </div>

                <div className="rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-3.5 space-y-2.5">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-[#1A1A1A]">
                      <span>20ft FCL Capacity</span>
                      <span className="text-[#8B6008] font-mono">Standard Container</span>
                    </div>
                    <p className="mt-0.5 text-xs text-[#3A3A3A]">
                      {data.shipping_logistics.fcl_20ft_capacity}
                    </p>
                  </div>

                  <div className="border-t border-[#EAE5D9] pt-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-[#1A1A1A]">
                      <span>40ft HC Capacity</span>
                      <span className="text-[#8B6008] font-mono">High Cube Container</span>
                    </div>
                    <p className="mt-0.5 text-xs text-[#3A3A3A]">
                      {data.shipping_logistics.fcl_40ft_capacity}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[11px] text-[#767676]">
              <Anchor className="h-4 w-4 text-blue-600 flex-shrink-0" />
              Primary Load Ports: Mundra, Nhava Sheva (JNPT), Chennai &amp; Cochin.
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ================================================================= */}
      {/* 4. INDUSTRIAL APPLICATIONS                                        */}
      {/* ================================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="border-b border-[#EAE5D9] pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#8B6008] flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4" />
            Downstream Utilization
          </div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#0A0A0A] sm:text-3xl">
            {data.variety} Industrial Applications
          </h2>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.industrial_applications.map((appItem, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -3 }}
              className="rounded-2xl border border-[#E5E0D0] bg-white p-5 transition hover:border-[#1A1A1A]/30 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#FAF5E8] text-xs text-[#8B6008] font-mono border border-[#E5E0D0]">
                    {index + 1}
                  </span>
                  <span className="text-[10px] font-medium text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                    Industrial
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-bold text-[#0A0A0A]">
                  {appItem.industry}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#5A5A5A]">
                  {appItem.usage_notes}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ================================================================= */}
      {/* 5. SIBLING VARIETIES IN THE SAME CATEGORY                         */}
      {/* ================================================================= */}
      {siblingVarieties.length > 0 && (
        <section className="border-t border-[#EAE5D9] pt-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#8B6008] flex items-center gap-1.5">
                <Layers3 className="h-4 w-4" />
                Variety Catalog
              </div>
              <h2 className="mt-1 text-xl font-bold tracking-tight text-[#0A0A0A] sm:text-2xl">
                Other {parentName} Varieties Available
              </h2>
            </div>
            <Link
              href={`/spices/${parentSlug}`}
              className="text-xs font-semibold text-[#8B6008] hover:text-[#0A0A0A] transition"
            >
              View Full {parentName} Specifications &rarr;
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {siblingVarieties.map((sibling) => (
              <Link
                key={sibling.varietySlug}
                href={sibling.slug}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E5E0D0] bg-white transition hover:border-[#0A0A0A]/40 hover:shadow-md hover:-translate-y-1"
              >
                <div className="relative h-36 w-full overflow-hidden bg-[#FAF5E8]">
                  <Image
                    src={sibling.image}
                    alt={sibling.variety}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[10px] font-mono font-medium text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-white/20">
                      {parentName}
                    </span>
                  </div>
                  <div className="absolute bottom-2 left-2.5 text-[11px] font-medium text-white drop-shadow-sm">
                    {sibling.technical_specifications.length} Technical Specs
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#0A0A0A] group-hover:text-[#8B6008] transition">
                      {sibling.variety}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#5A5A5A]">
                      {sibling.overview}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-[#EAE5D9] pt-2 text-xs">
                    <span className="text-[11px] text-[#767676]">MOQ: 1x 20ft FCL</span>
                    <span className="font-semibold text-[#8B6008] group-hover:translate-x-0.5 transition flex items-center gap-1">
                      View Specs &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* 6. ANIMATED FAQ SECTION                                           */}
      {/* ================================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="border-b border-[#EAE5D9] pb-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#8B6008] flex items-center gap-1.5">
            <HelpCircle className="h-4 w-4" />
            Procurement Guidance
          </div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#0A0A0A] sm:text-3xl">
            {data.variety} Sourcing FAQs
          </h2>
          <p className="mt-1 text-xs text-[#767676]">
            Key answers regarding minimum orders, mycotoxin controls, analytical verification, and ocean transit parameters.
          </p>
        </div>

        <div className="mt-6">
          <SpiceFAQAccordion faqs={data.b2b_faqs} />
        </div>
      </motion.section>

      {/* ================================================================= */}
      {/* 7. OTHER SPICE CATEGORIES DIRECTORY EXPLORER                      */}
      {/* ================================================================= */}
      {relatedCategories.length > 0 && (
        <section className="border-t border-[#EAE5D9] pt-10">
          <div className="flex items-center justify-between pb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#8B6008]">
                Commodity Catalog
              </div>
              <h2 className="mt-1 text-xl font-bold tracking-tight text-[#0A0A0A] sm:text-2xl">
                Explore Other Indian Spice Categories
              </h2>
            </div>
            <Link
              href="/spices"
              className="text-xs font-semibold text-[#8B6008] hover:text-[#0A0A0A] transition"
            >
              All 16 Categories &rarr;
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {relatedCategories.slice(0, 6).map((cat) => (
              <Link
                key={cat.slug}
                href={`/spices/${cat.slug}`}
                className="group flex flex-col rounded-xl border border-[#E5E0D0] bg-white p-3 transition hover:border-[#0A0A0A]/40 hover:shadow-xs"
              >
                <div className="relative h-20 w-full overflow-hidden rounded-lg bg-[#FAF5E8]">
                  <Image
                    src={cat.image}
                    alt={cat.category_name}
                    fill
                    sizes="(max-width: 768px) 50vw, 16vw"
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="mt-2 text-xs font-bold text-[#0A0A0A] group-hover:text-[#8B6008] transition truncate">
                  {cat.category_name}
                </div>
                <div className="text-[10px] font-mono text-[#767676]">
                  HS {cat.hs_code}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* 8. BOTTOM CONVERSION BANNER WITH FAST LEAD GEN                    */}
      {/* ================================================================= */}
      <motion.section
        id="rfq-inquiry"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-[#E5E0D0] bg-white p-6 sm:p-10 shadow-sm"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">
              <Zap className="h-3.5 w-3.5 text-amber-600" />
              Direct Commercial Sourcing Requisition
            </div>

            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#0A0A0A] sm:text-3xl lg:text-4xl">
              Source Bulk {data.variety}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-[#4A4A4A] sm:text-base">
              Specify your target mesh size, sterilization criteria (ETO-free steam sterilization or natural), ASTA/SHU ranges, and destination port. Connect directly with audited Indian spice exporters.
            </p>

            <div className="mt-6 space-y-2.5 text-xs text-[#5A5A5A]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>Pre-shipment batch COAs from ISO 17025 accredited laboratories</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>Custom packaging: 25kg Kraft bags, PP woven, or Big Bags (FIBC)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>Full container load (FCL) &amp; consolidated multi-spice trial shipments</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/spices/${parentSlug}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E5E0D0] bg-[#FAF5E8] px-5 py-3 text-center text-xs font-semibold text-[#1A1A1A] transition hover:bg-[#F5F0E0]"
              >
                &larr; Return to {parentName}
              </Link>
              <Link
                href="/spices"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E5E0D0] bg-white px-5 py-3 text-center text-xs font-semibold text-[#1A1A1A] transition hover:bg-[#FAF7F0]"
              >
                Browse All 16 Categories
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <SpiceLeadGenForm
              spiceCategory={`${data.variety} (${parentName})`}
              hsCode={parentHsCode}
              buttonText="Submit Sourcing Requisition"
              className="shadow-sm"
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
