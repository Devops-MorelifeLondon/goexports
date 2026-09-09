import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllSpices } from "@/lib/spices";

export const metadata: Metadata = {
  title: "Bulk Indian Spices Export Directory | Verified Exporters & Specifications",
  description:
    "Explore verified Indian spice export categories. View technical specifications, ASTA color, SHU pungency, EU/FDA MRL compliance, and request direct exporter quotes.",
  keywords: [
    "Indian spices directory",
    "bulk spices exporter India",
    "wholesale turmeric red chilli pepper cumin coriander",
    "Spices Board of India verified exporters",
    "B2B spice procurement"
  ]
};

export default function SpicesDirectoryPage() {
  const spices = getAllSpices();

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Bar */}
      <div className="border-b border-slate-800/80 bg-slate-900/90 py-2.5 px-4 text-xs tracking-wide text-slate-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20" />
            <span className="font-semibold text-slate-200">B2B Spice Commodity Directory</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">16 Industrial Categories with Lab-Verified Specs</span>
          </div>
          <div className="text-slate-400 hidden sm:block">
            ISO 17025 COA Validated Exporters
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-1.5 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
            Export Commodity Intelligence
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Indian Spices B2B Export Directory
          </h1>
          <p className="mt-4 max-w-3xl text-base text-slate-300">
            Directly procure commercial, industrial, and food-grade Indian spices. Browse technical analytical parameters, regulatory compliance baselines, packaging capacities, and request competitive factory quotes.
          </p>
        </div>

        {/* Directory Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spices.map((spice) => (
            <Link
              key={spice.slug}
              href={`/spices/${spice.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition duration-200 hover:border-amber-500/50 hover:bg-slate-900 shadow-lg hover:shadow-amber-500/5"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    HS {spice.hs_code}
                  </span>
                  <span className="text-slate-400">
                    {spice.technical_specifications.length} Specs Tested
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-bold text-white group-hover:text-amber-400 transition">
                  {spice.category_name}
                </h2>

                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-400">
                  {spice.overview}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {spice.export_forms_available.slice(0, 3).map((form, i) => (
                    <span
                      key={i}
                      className="rounded bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300 border border-slate-700/60"
                    >
                      {form.form}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs">
                <span className="text-slate-400">MOQ: 1x 20ft FCL</span>
                <span className="font-semibold text-amber-400 group-hover:translate-x-1 transition flex items-center gap-1">
                  View Specifications &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
