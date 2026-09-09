import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Globe, Package } from "lucide-react";
import { getAllSpices } from "@/lib/spices";
import SpiceLeadGenForm from "@/components/SpiceLeadGenForm";

export const metadata: Metadata = {
  title: "Indian Spices Export Directory | Specifications & Exporter Sourcing",
  description:
    "Explore Indian spice export categories. View technical specifications, standard testing methods, export forms, container capacities, and connect with Indian spice exporters.",
  keywords: [
    "Indian spices export directory",
    "spices exporter India",
    "wholesale turmeric red chilli pepper cumin coriander",
    "Indian spices specifications",
    "B2B spice sourcing"
  ]
};

export default function ExportsSpicesDirectoryPage() {
  const spices = getAllSpices();

  return (
    <div className="min-h-screen bg-[var(--canvas)] font-sans text-[var(--ink)] antialiased">
      {/* Top Bar */}
      <div className="border-b border-[#EAE5D9] bg-[#FAF5E8] py-2.5 px-4 text-xs tracking-wide text-[#5A5A5A]">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#1A1A1A]">Indian Spices Export Directory</span>
            <span className="text-[#B0A898]">•</span>
            <span className="text-[#6A6A6A]">16 Commercial Categories &amp; Sourcing Specifications</span>
          </div>
          <div className="text-[#6A6A6A] hidden sm:block">
            B2B Commercial Sourcing Guide
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
        {/* Directory Hero Banner */}
        <div className="rounded-2xl border border-[#E5E0D0] bg-white p-8 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                Export Commodity Sourcing
              </div>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0A0A0A] sm:text-4xl lg:text-5xl leading-tight">
                Indian Spices Commercial Export Directory
              </h1>
              <p className="mt-4 max-w-3xl text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
                Browse technical analytical parameters, common export forms, regulatory standards, and container freight capacities for key Indian spice varieties. Connect directly with Indian exporters to request price quotes and product details.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-[#5A5A5A]">
                <span className="inline-flex items-center gap-1.5 bg-[#FAF5E8] px-3 py-1.5 rounded-lg border border-[#E5E0D0] font-medium text-[#1A1A1A]">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Standard ISO / BRCGS Facilities
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#FAF5E8] px-3 py-1.5 rounded-lg border border-[#E5E0D0] font-medium text-[#1A1A1A]">
                  <Globe className="h-4 w-4 text-blue-600" />
                  US FDA &amp; EU MRL Compliant
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#FAF5E8] px-3 py-1.5 rounded-lg border border-[#E5E0D0] font-medium text-[#1A1A1A]">
                  <Package className="h-4 w-4 text-amber-600" />
                  FCL &amp; Custom Mesh Packaging
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:block">
              <div className="relative h-52 w-full overflow-hidden rounded-2xl border border-[#E5E0D0] shadow-sm">
                <Image
                  src="https://images.pexels.com/photos/277253/pexels-photo-277253.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Assorted Indian Spices in Bulk"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white text-xs font-semibold">
                  16 Commercial Export Grades
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spices.map((spice) => (
            <Link
              key={spice.slug}
              href={`/exports/spices/${spice.slug}`}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E5E0D0] bg-white transition-all duration-200 hover:border-[#0A0A0A]/40 hover:shadow-md hover:-translate-y-1"
            >
              {/* Spice Card Thumbnail Image */}
              <div className="relative h-48 w-full overflow-hidden bg-[#FAF5E8]">
                <Image
                  src={spice.image}
                  alt={`${spice.category_name} commercial export grade`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />

                {/* Floating Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="font-mono text-[11px] font-semibold text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20">
                    HS {spice.hs_code}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-200 bg-emerald-950/70 backdrop-blur-xs px-2.5 py-1 rounded-md border border-emerald-500/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Origin: India
                  </span>
                </div>

                <div className="absolute bottom-2.5 left-3 right-3 text-white text-xs flex items-center justify-between">
                  <span className="font-semibold drop-shadow-sm">
                    {spice.technical_specifications.length} Technical Specs
                  </span>
                  <span className="text-[11px] text-white/80 bg-black/40 px-2 py-0.5 rounded border border-white/10">
                    Steam Sterilized / Natural
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#0A0A0A] group-hover:text-[#8B6008] transition">
                    {spice.category_name}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#5A5A5A]">
                    {spice.overview}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {spice.export_forms_available.slice(0, 3).map((form, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-[#FAF5E8] px-2 py-0.5 text-[11px] text-[#3A3A3A] border border-[#E5E0D0]"
                      >
                        {form.form}
                      </span>
                    ))}
                    {spice.export_forms_available.length > 3 && (
                      <span className="rounded-md bg-[#FAF5E8] px-1.5 py-0.5 text-[10px] text-[#767676] border border-[#E5E0D0]">
                        +{spice.export_forms_available.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#EAE5D9] pt-4 text-xs">
                  <span className="text-[#767676]">Typical MOQ: 1x 20ft FCL</span>
                  <span className="font-semibold text-[#8B6008] group-hover:translate-x-1 transition flex items-center gap-1">
                    View Specifications &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Fast General Lead Gen Form */}
        <section className="rounded-2xl border border-[#E5E0D0] bg-white p-6 sm:p-10 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">
                Custom Spices Sourcing
              </div>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#0A0A0A] sm:text-3xl">
                Can&apos;t find your exact spice specification?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#4A4A4A] sm:text-base">
                Submit your customized procurement requirement (organic certified, custom blend ratio, mesh sieving, private labeling, or target Incoterms).
              </p>
              <div className="mt-6 space-y-2 text-xs text-[#5A5A5A]">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                  Whole, ground, crushed, and custom blended spices
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                  Direct communication with Indian spice exporters
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                  Flexible packaging: bulk craft bags, PP bags, or consumer packs
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <SpiceLeadGenForm
                spiceCategory="Custom Bulk Spices & Agro"
                buttonText="Request Custom Spice Quote"
                className="w-full shadow-sm"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
