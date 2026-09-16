"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Globe,
  Package,
  Search,
  CheckCircle2,
  Zap,
  Building,
  Layers3,
  FileCheck,
  Cpu,
} from "lucide-react";
import type { TextileCategoryData } from "@/lib/textiles";

interface Props {
  textiles: TextileCategoryData[];
}

export default function TextilesDirectoryClient({ textiles }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredTextiles = useMemo(() => {
    return textiles.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.category_name.toLowerCase().includes(q) ||
        item.overview.toLowerCase().includes(q) ||
        String(item.hs_code).includes(q) ||
        item.export_forms_details.some((f) =>
          f.form.toLowerCase().includes(q) || f.best_use_case.toLowerCase().includes(q)
        );

      if (!matchesSearch) return false;

      if (selectedFilter === "yarn") {
        return item.slug.includes("yarn");
      }
      if (selectedFilter === "fabric") {
        return item.slug.includes("fabric") || item.slug.includes("knitted") || item.slug.includes("linen");
      }
      if (selectedFilter === "home") {
        return item.slug.includes("linen") || item.slug.includes("towel") || item.slug.includes("bed");
      }
      if (selectedFilter === "apparel") {
        return item.slug.includes("rmg") || item.slug.includes("denim");
      }

      return true;
    });
  }, [textiles, searchQuery, selectedFilter]);

  return (
    <div className="space-y-8">
      {/* ================================================================= */}
      {/* 1. HERO BANNER                                                    */}
      {/* ================================================================= */}
      <div className="relative overflow-hidden rounded-2xl border border-[#E5E0D0] bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-900">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              Direct Mill Export Procurement
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#0A0A0A] leading-tight">
              Indian Textiles Commercial Export Directory
            </h1>
            <p className="mt-3 max-w-3xl text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
              Procure commercial yarn counts, apparel fabrics, home textiles, and technical non-wovens directly from audited Indian manufacturing hubs. View comprehensive analytical specifications, regulatory compliance, and container capacities.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs text-[#5A5A5A]">
              <span className="inline-flex items-center gap-1.5 bg-[#FAF5E8] px-3 py-1.5 rounded-lg border border-[#E5E0D0] font-medium text-[#1A1A1A]">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                OEKO-TEX &amp; GOTS Certified
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#FAF5E8] px-3 py-1.5 rounded-lg border border-[#E5E0D0] font-medium text-[#1A1A1A]">
                <Globe className="h-3.5 w-3.5 text-blue-600" />
                EU REACH &amp; US CPSC Compliant
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#FAF5E8] px-3 py-1.5 rounded-lg border border-[#E5E0D0] font-medium text-[#1A1A1A]">
                <Package className="h-3.5 w-3.5 text-amber-600" />
                FCL Bales, Rolls &amp; ISPM-15 Pallets
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:block">
            <div className="rounded-2xl border border-[#E5E0D0] bg-[#FAF7F0] p-5 space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#767676]">
                Directory Sourcing Metrics
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-xl bg-white p-3 border border-[#E5E0D0]">
                  <div className="text-xl font-semibold text-[#0A0A0A]">15</div>
                  <div className="text-[11px] text-[#6A6A6A]">Export Categories</div>
                </div>
                <div className="rounded-xl bg-white p-3 border border-[#E5E0D0]">
                  <div className="text-xl font-semibold text-[#0A0A0A]">33+</div>
                  <div className="text-[11px] text-[#6A6A6A]">Mill Varieties</div>
                </div>
                <div className="rounded-xl bg-white p-3 border border-[#E5E0D0]">
                  <div className="text-xl font-semibold text-[#0A0A0A]">50-63</div>
                  <div className="text-[11px] text-[#6A6A6A]">HS Chapters</div>
                </div>
                <div className="rounded-xl bg-white p-3 border border-[#E5E0D0]">
                  <div className="text-xl font-semibold text-emerald-800">100%</div>
                  <div className="text-[11px] text-[#6A6A6A]">Lot Lab COA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 2. SEARCH & QUICK FILTER BAR                                      */}
      {/* ================================================================= */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-[#E5E0D0] bg-white p-3.5 shadow-xs">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-[#8A8A8A]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search textile categories, yarn count, fabric type, HS code..."
            className="w-full rounded-xl border border-[#E5E0D0] bg-[#FAF7F0] py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#0A0A0A] placeholder:text-[#8A8A8A] focus:border-[#0A0A0A] focus:bg-white focus:outline-none transition"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "all", label: "All Categories" },
            { id: "yarn", label: "Yarns & Fibers" },
            { id: "fabric", label: "Fabrics & Knits" },
            { id: "home", label: "Home Textiles" },
            { id: "apparel", label: "Apparel & RMG" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedFilter(tab.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                selectedFilter === tab.id
                  ? "bg-[#0A0A0A] text-white shadow-xs"
                  : "bg-[#FAF7F0] text-[#5A5A5A] hover:bg-[#F5EFE0] hover:text-[#0A0A0A] border border-[#E5E0D0]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ================================================================= */}
      {/* 3. DIRECTORY COMMODITY GRID (CLEAN DATA-FIRST CARDS)               */}
      {/* ================================================================= */}
      <div>
        <div className="mb-4 flex items-center justify-between text-xs text-[#767676]">
          <span>
            Showing <strong className="text-[#0A0A0A] font-semibold">{filteredTextiles.length}</strong> of {textiles.length} categories
          </span>
          <span className="hidden sm:inline">Direct Mill Pricing &bull; Batch COA &bull; FCL Logistics</span>
        </div>

        {filteredTextiles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#E5E0D0] bg-white p-12 text-center">
            <Layers3 className="mx-auto h-10 w-10 text-[#A09888]" />
            <h3 className="mt-3 text-base font-semibold text-[#0A0A0A]">No categories matched your search</h3>
            <p className="mt-1 text-xs text-[#6A6A6A]">
              Try clearing your filters or searching for terms like &quot;cotton&quot;, &quot;silk&quot;, &quot;denim&quot;, or &quot;yarn&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedFilter("all");
              }}
              className="mt-4 rounded-xl bg-[#0A0A0A] px-4 py-2 text-xs font-semibold text-white cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTextiles.map((textile) => (
              <Link
                key={textile.slug}
                href={`/textiles/${textile.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-[#E5E0D0] bg-white p-5 transition-all duration-200 hover:border-[#0A0A0A]/40 hover:shadow-md hover:-translate-y-0.5 no-underline"
              >
                <div>
                  {/* Top Metadata Strip */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#EAE5D9]">
                    <span className="font-mono text-xs font-semibold text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                      HS {textile.hs_code}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-[#FAF5E8] px-2 py-0.5 rounded border border-[#E5E0D0]">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Origin: India
                    </span>
                  </div>

                  {/* Title & Overview */}
                  <div className="mt-3.5">
                    <h2 className="text-base sm:text-lg font-semibold text-[#0A0A0A] group-hover:text-emerald-800 transition">
                      {textile.category_name}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#5A5A5A]">
                      {textile.overview}
                    </p>
                  </div>

                  {/* Forms Available */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {textile.export_forms_details.slice(0, 3).map((form, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-[#FAF7F0] px-2 py-0.5 text-[11px] font-medium text-[#4A4A4A] border border-[#EAE5D9]"
                      >
                        {form.form}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-5 flex items-center justify-between border-t border-[#EAE5D9] pt-3 text-xs">
                  <span className="text-[#767676] text-[11px]">MOQ: 1x 20ft FCL</span>
                  <span className="font-semibold text-emerald-800 group-hover:translate-x-1 transition flex items-center gap-1 text-xs">
                    View Specifications &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ================================================================= */}
      {/* 4. ENTERPRISE MILL PROCUREMENT CTA                                */}
      {/* ================================================================= */}
      <div className="rounded-2xl border border-[#E5E0D0] bg-[#FAF7F0] p-6 sm:p-8 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-[#1A1A1A] border border-[#E5E0D0] shadow-2xs mb-3">
            <Zap className="h-3.5 w-3.5 text-amber-600" />
            Custom Industrial Specifications
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-[#0A0A0A]">
            Need Custom Weaving, Spinning or Large Container Contracts?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#5A5A5A] leading-relaxed">
            Our trade desk works directly with tier-1 Indian spinning mills, composite weaving units, and dyeing facilities across Gujarat, Tamil Nadu, Maharashtra, and Punjab. Submit custom yarn counts, blends, or GSM specifications.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-[#0A0A0A] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-[#2A2A2A] shadow-xs cursor-pointer no-underline"
            >
              Speak with Textile Trade Specialist
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
