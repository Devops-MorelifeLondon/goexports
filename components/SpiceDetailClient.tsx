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
} from "lucide-react";
import type { SpiceCategoryData } from "@/lib/spices";
import SpiceLeadGenForm from "@/components/SpiceLeadGenForm";
import SpiceFAQAccordion from "@/components/SpiceFAQAccordion";

interface Props {
  data: SpiceCategoryData;
  relatedSpices: SpiceCategoryData[];
}

export default function SpiceDetailClient({ data, relatedSpices }: Props) {
  const [activeTab, setActiveTab] = useState<"all" | "chemical" | "physical">("all");
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
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
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
            <h1 className="text-3xl font-extrabold tracking-tight text-[#0A0A0A] sm:text-4xl lg:text-5xl leading-tight">
              {data.category_name}
            </h1>

            <p className="mt-2 text-base font-semibold text-[#8B6008] sm:text-lg">
              Technical Specifications, Quality Benchmarks &amp; Exporter Sourcing
            </p>

            {/* Featured Spice Image Showcase with Photo Switcher */}
            <div className="mt-5 space-y-2.5">
              <div className="relative h-56 sm:h-64 w-full overflow-hidden rounded-2xl border border-[#E5E0D0] bg-[#FAF7F0] shadow-inner group">
                <Image
                  src={selectedPhoto || data.image}
                  alt={`${data.category_name} commercial export grade`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-white border border-white/20">
                    <Camera className="h-3 w-3 text-amber-300" />
                    Export Commodity Grade
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950/70 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-emerald-200 border border-emerald-500/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Direct Origin: India
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="font-semibold drop-shadow-sm truncate">
                    {data.category_name} &bull; Exporter Sourcing
                  </span>
                  <span className="text-[11px] text-white/90 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-white/10 hidden sm:inline-block">
                    Phytosanitary &amp; COA on Request
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
                    <span>Primary Commodity Form</span>
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
                    <span>Secondary / Processed Format</span>
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
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#767676]">Origin</div>
                <div className="mt-1 text-xs sm:text-sm font-bold text-[#0A0A0A]">India Growing Belts</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-3 transition"
              >
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#767676]">Sterilization</div>
                <div className="mt-1 text-xs sm:text-sm font-bold text-[#0A0A0A]">Steam / Untreated</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-3 transition"
              >
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#767676]">Typical MOQ</div>
                <div className="mt-1 text-xs sm:text-sm font-bold text-[#0A0A0A]">1x 20ft FCL (or LCL)</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-3 transition"
              >
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#767676]">Lab Samples</div>
                <div className="mt-1 text-xs sm:text-sm font-bold text-[#0A0A0A]">Available on Request</div>
              </motion.div>
            </div>

            {/* Quick Sourcing Guidance Box */}
            <div className="mt-5 rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-4 text-xs text-[#5A5A5A] space-y-1.5">
              <div className="font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-[#8B6008]" />
                Fast B2B Sourcing Protocol
              </div>
              <p>
                Select your required quality grade and volume on the right to receive tailored commercial quotations and COAs directly from Indian spice exporters.
              </p>
            </div>
          </motion.div>

          {/* Quick Lead Gen Form (Hero Right) */}
          <div className="lg:col-span-6 flex justify-center">
            <SpiceLeadGenForm
              spiceCategory={data.category_name}
              hsCode={data.hs_code}
              availableForms={data.export_forms_available}
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
              Analytical QA Parameters
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#0A0A0A] sm:text-3xl">
              Technical Specifications &amp; Quality Standards
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
            <span>* Specifications represent standard commercial export averages. Inquire with exporters for lot-specific COAs.</span>
            <span className="text-[#8B6008] font-semibold">Custom parameters available upon RFQ</span>
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
            Market Standards, Certifications &amp; Freight Logistics
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
                  Target Market Relevance
                </h3>
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-800 border border-blue-200">
                  Destination Focus
                </span>
              </div>

              {/* Destination Visual Banner */}
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
                  <span className="font-semibold">Global Distribution</span>
                  <span className="text-white/90 font-mono text-[10px] bg-black/50 px-2 py-0.5 rounded border border-white/20">USA &bull; EU &bull; GCC</span>
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="font-semibold uppercase tracking-wider text-[#767676]">Primary Export Destinations:</span>
                  <p className="mt-1 text-sm font-semibold text-[#1A1A1A]">
                    {data.target_market_relevance.market}
                  </p>
                </div>

                <div className="rounded-xl border border-[#EAE5D9] bg-[#FAF7F0] p-3.5">
                  <span className="font-semibold uppercase tracking-wider text-[#8B6008]">Regulatory &amp; Compliance Notes:</span>
                  <p className="mt-1 text-xs leading-relaxed text-[#3A3A3A]">
                    {data.target_market_relevance.compliance_notes}
                  </p>
                </div>

                <div>
                  <span className="font-semibold uppercase tracking-wider text-[#767676]">Industry Demand Drivers:</span>
                  <p className="mt-1 text-xs leading-relaxed text-[#3A3A3A]">
                    {data.target_market_relevance.demand_drivers}
                  </p>
                </div>
              </div>
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
                  Common Industry Certifications
                </h3>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 border border-emerald-200">
                  Accreditations
                </span>
              </div>

              {/* Lab Testing Visual Banner */}
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
                  <span className="font-semibold">ISO 17025 Lab Standard</span>
                  <span className="text-white/90 font-mono text-[10px] bg-black/50 px-2 py-0.5 rounded border border-white/20">Batch COA</span>
                </div>
              </div>

              <p className="text-xs text-[#767676]">
                Certifications commonly held by Indian spice processors in this sector:
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
              Buyers can request specific ISO, BRCGS, or Organic certificates with their RFQ submission.
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
                  Shipping &amp; Logistics Guide
                </h3>
                <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-900 border border-amber-200">
                  FCL / LCL
                </span>
              </div>

              {/* Freight Container Shipping Visual Banner */}
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
                  <span className="font-semibold">Ocean Freight Logistics</span>
                  <span className="text-white/90 font-mono text-[10px] bg-black/50 px-2 py-0.5 rounded border border-white/20">FOB / CIF / CFR</span>
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="font-semibold uppercase tracking-wider text-[#767676]">Packaging Configurations:</span>
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
              Major Ports: Nhava Sheva (JNPT), Mundra, Chennai &amp; Cochin.
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ================================================================= */}
      {/* 4. APPLICATIONS & FORMS                                           */}
      {/* ================================================================= */}
      <section className="grid gap-8 lg:grid-cols-2">
        {/* Available Export Forms */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="border-b border-[#EAE5D9] pb-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#8B6008] flex items-center gap-1.5">
              <Package className="h-4 w-4" />
              Processing Formats
            </div>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-[#0A0A0A] sm:text-2xl">
              Common Export Forms
            </h2>
          </div>

          <div className="mt-6 space-y-3.5">
            {data.export_forms_available.map((formItem, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 3 }}
                className="rounded-2xl border border-[#E5E0D0] bg-white p-5 transition hover:border-[#1A1A1A]/30 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#0A0A0A] flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#FAF5E8] text-xs text-[#8B6008] font-mono border border-[#E5E0D0]">
                      {index + 1}
                    </span>
                    {formItem.form}
                  </h3>
                  <span className="text-[11px] font-mono text-[#767676]">Custom specifications</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#5A5A5A]">
                  <strong className="text-[#1A1A1A]">Best Suited For: </strong>
                  {formItem.best_suited_for}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Industrial Applications */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="border-b border-[#EAE5D9] pb-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#8B6008] flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4" />
              End-Use Applications
            </div>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-[#0A0A0A] sm:text-2xl">
              Industrial Applications
            </h2>
          </div>

          <div className="mt-6 space-y-3.5">
            {data.industrial_applications.map((appItem, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 3 }}
                className="rounded-2xl border border-[#E5E0D0] bg-white p-5 transition hover:border-[#1A1A1A]/30 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#0A0A0A] flex items-center gap-2">
                    <Layers className="h-4 w-4 text-blue-600" />
                    {appItem.industry}
                  </h3>
                  <span className="text-[11px] font-medium text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                    Formulation
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#5A5A5A]">
                  <strong className="text-[#1A1A1A]">Usage &amp; Notes: </strong>
                  {appItem.usage_notes}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ================================================================= */}
      {/* 5. ANIMATED FAQ SECTION                                           */}
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
            Commercial Guidance
          </div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#0A0A0A] sm:text-3xl">
            Frequently Asked Sourcing Questions
          </h2>
          <p className="mt-1 text-xs text-[#767676]">
            Answers covering MOQs, lab inspections, payment terms, and delivery schedules.
          </p>
        </div>

        <div className="mt-6">
          <SpiceFAQAccordion faqs={data.b2b_faqs} />
        </div>
      </motion.section>

      {/* ================================================================= */}
      {/* 6. RELATED SPICE CATEGORIES                                       */}
      {/* ================================================================= */}
      {relatedSpices.length > 0 && (
        <section className="border-t border-[#EAE5D9] pt-10">
          <div className="flex items-center justify-between pb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#8B6008]">
                Export Directory
              </div>
              <h2 className="mt-1 text-xl font-bold tracking-tight text-[#0A0A0A] sm:text-2xl">
                Explore Other Bulk Spices
              </h2>
            </div>
            <Link
              href="/exports/spices"
              className="text-xs font-semibold text-[#8B6008] hover:text-[#0A0A0A] transition"
            >
              View Full Catalog &rarr;
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedSpices.map((spice) => (
              <Link
                key={spice.slug}
                href={`/exports/spices/${spice.slug}`}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E5E0D0] bg-white transition hover:border-[#0A0A0A]/40 hover:shadow-md hover:-translate-y-1"
              >
                {/* Related Spice Card Image */}
                <div className="relative h-36 w-full overflow-hidden bg-[#FAF5E8]">
                  <Image
                    src={spice.image}
                    alt={spice.category_name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[10px] font-mono font-medium text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-white/20">
                      HS {spice.hs_code}
                    </span>
                  </div>
                  <div className="absolute bottom-2 left-2.5 text-[11px] font-medium text-white drop-shadow-sm">
                    Origin: India
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#0A0A0A] group-hover:text-[#8B6008] transition">
                      {spice.category_name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#5A5A5A]">
                      {spice.overview}
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
      {/* 7. BOTTOM CONVERSION BANNER WITH FAST LEAD GEN                    */}
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
              Direct Commercial Sourcing
            </div>

            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#0A0A0A] sm:text-3xl lg:text-4xl">
              Source Bulk {data.category_name}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-[#4A4A4A] sm:text-base">
              Submit your target grade (organic certified, steam sterilized, custom mesh) and container volume. Connect directly with Indian spice export processors.
            </p>

            <div className="mt-6 space-y-2.5 text-xs text-[#5A5A5A]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>Direct communication with export processors in India</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>Inquire for custom mesh, ASTA/SHU profiles &amp; private packaging</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>Standard FOB / CIF / CFR Incoterms available</span>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/exports/spices"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E5E0D0] bg-[#FAF5E8] px-5 py-3 text-center text-xs font-semibold text-[#1A1A1A] transition hover:bg-[#F5F0E0]"
              >
                &larr; Browse All 16 Spice Categories
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <SpiceLeadGenForm
              spiceCategory={data.category_name}
              hsCode={data.hs_code}
              availableForms={data.export_forms_available}
              buttonText="Submit Sourcing Requisition"
              className="shadow-sm"
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
