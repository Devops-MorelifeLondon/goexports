"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Building2,
  ArrowRight,
  Store,
  ExternalLink,
  Award,
  Globe2,
  CheckCircle2,
  Package
} from "lucide-react";
import { SellerProfile } from "@/lib/seller";

interface FeaturedExportersSectionProps {
  exporters: SellerProfile[];
  totalCount: number;
}

function getFlag(country: string): string {
  const c = (country || "").trim().toLowerCase();
  if (c.includes("india")) return "🇮🇳";
  if (c.includes("vietnam")) return "🇻🇳";
  if (c.includes("emirates") || c.includes("uae") || c.includes("dubai")) return "🇦🇪";
  if (c.includes("united states") || c.includes("usa")) return "🇺🇸";
  if (c.includes("united kingdom") || c.includes("uk")) return "🇬🇧";
  return "🌐";
}

function ExporterLogo({
  logoUrl,
  companyName,
  size = 44,
}: {
  logoUrl?: string;
  companyName: string;
  size?: number;
}) {
  const [imgError, setImgError] = useState(false);
  const initial = (companyName || "E").slice(0, 1).toUpperCase();

  if (!logoUrl || imgError) {
    return (
      <div
        className="rounded-xl flex items-center justify-center font-black text-base text-[var(--ink)] shrink-0 shadow-2xs border border-[var(--hairline)]"
        style={{
          width: size,
          height: size,
          background: "linear-gradient(135deg, var(--brand-ochre) 0%, #ffd470 100%)",
        }}
      >
        {initial}
      </div>
    );
  }

  return (
    <div
      className="relative rounded-xl border border-[var(--hairline)] overflow-hidden bg-white shrink-0 shadow-2xs"
      style={{ width: size, height: size }}
    >
      <Image
        src={logoUrl}
        alt={companyName}
        fill
        unoptimized
        sizes={`${size}px`}
        className="object-contain p-1"
        onError={() => setImgError(true)}
      />
    </div>
  );
}

export default function FeaturedExportersSection({
  exporters,
  totalCount,
}: FeaturedExportersSectionProps) {
  if (!exporters || exporters.length === 0) return null;

  return (
    <section className="w-full py-16 sm:py-20 border-b border-[var(--hairline)] bg-[var(--surface-soft)]/60">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3 border border-emerald-300/80">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Public Directory</span>
              <span className="w-1 h-1 rounded-full bg-emerald-600" />
              <span>{totalCount}+ Verified Exporters</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--ink)] tracking-tight">
              Verified Exporters &amp; Manufacturers
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted)] mt-2 max-w-2xl font-normal leading-relaxed">
              Explore leading vetted suppliers across 14+ product categories. Direct mill pricing, authentic
              export credentials, and verified production capacity.
            </p>
          </div>

          <Link
            href="/exporters"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-[var(--ink)] bg-[var(--brand-ochre)] hover:opacity-95 no-underline transition-all shadow-2xs shrink-0 self-start md:self-auto group"
          >
            <span>View All {totalCount}+ Exporters</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Featured Exporter Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {exporters.map((exporter) => {
            const flag = getFlag(exporter.country);
            const productCount = exporter.products?.length || 0;

            return (
              <div
                key={exporter.id || exporter.slug}
                className="flex flex-col justify-between p-5 rounded-2xl bg-[var(--surface-card)] border border-[var(--hairline)] hover:border-[var(--brand-ochre)]/80 hover:shadow-[0_8px_24px_rgba(10,10,10,0.06)] transition-all duration-200 group"
              >
                <div>
                  {/* Top Bar: Avatar & Verified Badge */}
                  <div className="flex items-start justify-between gap-2 mb-3.5">
                    <ExporterLogo
                      logoUrl={exporter.logoUrl}
                      companyName={exporter.companyName}
                      size={44}
                    />

                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10.5px] font-bold border border-emerald-300 shrink-0">
                      <ShieldCheck className="w-3 h-3 text-emerald-700" />
                      <span>Verified</span>
                    </span>
                  </div>

                  {/* Company Title */}
                  <Link
                    href={`/${exporter.slug}`}
                    className="block font-bold text-sm text-[var(--ink)] hover:text-amber-800 transition-colors truncate no-underline mb-1"
                    title={exporter.companyName}
                  >
                    {exporter.companyName}
                  </Link>

                  {/* Country & Est */}
                  <div className="flex items-center gap-1 text-[11px] text-[var(--muted)] mb-3">
                    <span>{flag}</span>
                    <span className="truncate">{exporter.country}</span>
                    {exporter.yearEstablished && (
                      <>
                        <span>•</span>
                        <span>Est. {exporter.yearEstablished}</span>
                      </>
                    )}
                  </div>

                  {/* Category Pill */}
                  <div className="mb-3">
                    <span className="inline-block text-[11px] font-semibold text-amber-900 bg-amber-100/70 px-2.5 py-0.5 rounded-md truncate max-w-full">
                      {exporter.productCategory}
                    </span>
                  </div>

                  {/* Bio clamp */}
                  <p className="text-xs text-[var(--body)] line-clamp-2 leading-relaxed mb-4 font-normal">
                    {exporter.companyProfile ||
                      "Verified export supplier with certified manufacturing capacity and international compliance."}
                  </p>
                </div>

                {/* Footer action */}
                <div className="pt-3 border-t border-[var(--hairline)] flex items-center justify-between text-xs">
                  <span className="text-[11px] font-medium text-[var(--muted)] flex items-center gap-1">
                    <Package className="w-3.5 h-3.5 text-[var(--brand-ochre)]" />
                    <span>{productCount > 0 ? `${productCount} Products` : "Verified Supplier"}</span>
                  </span>

                  <Link
                    href={`/${exporter.slug}`}
                    className="font-bold text-amber-900 hover:text-amber-950 no-underline inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Storefront</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Directory Footer Banner */}
        <div className="mt-8 p-4 rounded-2xl bg-[var(--surface-card)] border border-[var(--hairline)] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--brand-ochre)]/20 text-amber-900 flex items-center justify-center shrink-0">
              <Store className="w-4 h-4 text-amber-800" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[var(--ink)]">
              Looking for specific suppliers or custom OEM manufacturing?
            </span>
          </div>
          <Link
            href="/exporters"
            className="px-4 py-2 rounded-xl text-xs font-bold text-[var(--ink)] bg-[var(--canvas)] hover:bg-[var(--surface-soft)] border border-[var(--hairline)] no-underline transition-colors shrink-0"
          >
            Search All Categories →
          </Link>
        </div>
      </div>
    </section>
  );
}

