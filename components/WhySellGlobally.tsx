"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "./MotionWrappers";
import { industries } from "@/data/industries";
import { industrySubcategories } from "@/data/industrySubcategories";

export default function WhySellGlobally() {
  const [search, setSearch] = useState("");

  const filtered = search.trim()
    ? industries.filter((ind) =>
        ind.name.toLowerCase().includes(search.toLowerCase()) ||
        ind.desc.toLowerCase().includes(search.toLowerCase())
      )
    : industries;

  return (
    <section id="industries" className="bg-white py-24 px-6">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-[13px] font-semibold tracking-[0.2em] uppercase text-[#D32F2F] mb-3">
              Explore Industries
            </p>
            <h2 className="text-4xl md:text-[52px] font-extrabold text-[#0F1111] leading-[1.1] mb-4">
              55+ Industries.<br />Unlimited Opportunities.
            </h2>
            <p className="text-[#777] text-[15px] max-w-[520px] mx-auto leading-relaxed">
              Connect with verified importers, distributors, and wholesalers across 190+ countries.
            </p>
          </div>
        </FadeIn>

        {/* Search */}
        <FadeIn delay={0.1}>
          <div className="max-w-[440px] mx-auto mb-14">
            <div className="relative">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search industries..."
                className="w-full pl-11 pr-10 py-3 rounded-full border border-[#e0e0e0] bg-[#FAFAFA] text-sm text-[#0F1111] placeholder:text-[#bbb] focus:outline-none focus:border-[#333] focus:bg-white transition-all"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#ddd] flex items-center justify-center text-[#666] text-[10px] cursor-pointer hover:bg-[#ccc] transition-colors border-none">✕</button>
              )}
            </div>
          </div>
        </FadeIn>

        {/* Industries */}
        <div className="flex flex-col gap-16">
          {filtered.map((ind, idx) => {
            const subcats = industrySubcategories[ind.name] || [];
            return (
              <motion.div
                key={ind.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: 0.05 }}
              >
                {/* Title */}
                <h3 className="text-[20px] font-extrabold text-[#0F1111] mb-3 tracking-[-0.01em]">
                  {ind.title}
                </h3>

                <div className="flex flex-row rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.04)] border border-[#eee]">

                  {/* ── LEFT: Image with CTA overlay ── */}
                  <Link
                    href={`/industry/${ind.slug}`}
                    className="w-[320px] md:w-[360px] shrink-0 relative self-stretch block overflow-hidden group no-underline"
                  >
                    {/* Full image — the hero */}
                    <img
                      src={subcats[0]?.image}
                      alt={ind.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Subtle bottom gradient only */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* CTA at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-white text-[13px] font-bold rounded-lg shadow-lg shadow-black/30 group-hover:bg-[#333333] group-hover:shadow-black/50 transition-all duration-300">
                        Explore Leads
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                      </span>
                    </div>
                  </Link>

                  {/* ── RIGHT: Subcategories ── */}
                  <div className="flex-1 min-w-0 bg-white">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr" }} className="h-full">
                      {subcats.slice(0, 6).map((sub, j) => {
                        const isTopRow = j < 3;
                        const isNotLastCol = j % 3 !== 2;
                        return (
                          <div
                            key={j}
                            className={`px-5 py-4 flex flex-col group/cell hover:bg-[#FAFAFA] transition-colors duration-200
                              ${isTopRow ? "border-b border-[#f0f0f0]" : ""}
                              ${isNotLastCol ? "border-r border-[#f0f0f0]" : ""}
                            `}
                          >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-3">
                              <Link
                                href={`/industry/${ind.slug}`}
                                className="text-[14px] font-bold text-[#111] no-underline hover:text-[#D32F2F] transition-colors leading-snug flex-1 mr-2"
                              >
                                {sub.name}
                              </Link>
                              <Link
                                href={`/industry/${ind.slug}`}
                                className="w-6 h-6 rounded-full border border-[#e0e0e0] flex items-center justify-center shrink-0 no-underline group-hover/cell:border-[#D32F2F] group-hover/cell:bg-[#D32F2F] transition-all duration-200"
                              >
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#ccc] group-hover/cell:text-white transition-colors"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                              </Link>
                            </div>

                            {/* Links */}
                            <div className="flex flex-col gap-[5px]">
                              {sub.items.map((item, k) => (
                                <Link
                                  key={k}
                                  href={`/industry/${ind.slug}`}
                                  className="text-[13px] text-[#555] no-underline hover:text-[#D32F2F] transition-colors leading-relaxed"
                                >
                                  {item}
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <span className="text-5xl block mb-4">🔍</span>
            <h3 className="text-xl font-bold text-[#0F1111] mb-2">No industries found</h3>
            <p className="text-sm text-[#999] mb-6">No results for &ldquo;{search}&rdquo;</p>
            <button onClick={() => setSearch("")} className="px-6 py-2.5 bg-[#111] text-white font-bold text-sm rounded-full cursor-pointer hover:bg-[#333] transition-all border-none">Clear Search</button>
          </div>
        )}

        {/* Bottom CTA */}
        <FadeIn delay={0.2}>
          <div className="mt-20 text-center">
            <div className="inline-block bg-[#FAFAFA] border border-[#eee] rounded-2xl px-12 py-10">
              <h3 className="text-2xl font-extrabold text-[#0F1111] mb-2">Can&apos;t find your industry?</h3>
              <p className="text-[14px] text-[#888] mb-6 max-w-[400px] mx-auto">We cover 55+ industries and are always expanding. Tell us your category.</p>
              <a href="#" className="inline-flex items-center gap-2 px-8 py-3 bg-[#D32F2F] text-white font-bold text-sm rounded-lg no-underline hover:bg-[#B71C1C] transition-all shadow-md shadow-red-900/20">
                Request Custom Leads
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}