"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "./MotionWrappers";
import { industries } from "@/data/industries";
import { industrySubcategories } from "@/data/newcate";

export default function WhySellGlobally() {
  const [search, setSearch] = useState("");

  const filtered = search.trim()
    ? industries.filter((ind) =>
        ind.name.toLowerCase().includes(search.toLowerCase()) ||
        ind.desc.toLowerCase().includes(search.toLowerCase())
      )
    : industries;

  return (
    <section id="industries" className="bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <FadeIn>
          <div className="text-center mb-8 sm:mb-10 md:mb-14">
            <p className="text-xs sm:text-[13px] font-semibold tracking-[0.2em] uppercase text-red-600 mb-2 sm:mb-3">
              Explore Industries
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[52px] font-extrabold text-gray-900 leading-[1.1] mb-3 sm:mb-4">
              55+ Industries.<br />Unlimited Global Trade Opportunities.
            </h2>
            <p className="text-gray-600 text-sm sm:text-[15px] max-w-[520px] mx-auto leading-relaxed px-2">
              Find international buyers and connect with verified global buyers across 190+ countries. Your trusted import export business platform.
            </p>
          </div>
        </FadeIn>

        {/* Search */}
        <FadeIn delay={0.1}>
          <div className="max-w-[440px] mx-auto mb-8 sm:mb-11 md:mb-14 px-2">
            <div className="relative">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search industries..."
                className="w-full pl-11 pr-10 py-3 rounded-full border border-gray-300 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-[10px] cursor-pointer hover:bg-gray-300 transition-colors border-none">✕</button>
              )}
            </div>
          </div>
        </FadeIn>

        {/* Industries */}
        <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-16 px-2">
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
                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 mb-3 sm:mb-4 tracking-tight">
                  {ind.title}
                </h3>

                <div className="flex flex-col lg:flex-row rounded-xl overflow-hidden shadow-lg border border-gray-200">

                  {/* ── LEFT: Image with CTA overlay ── */}
                  <Link
                    href={`/${ind.slug}`}
                    className="w-full lg:w-[320px] xl:w-[360px] shrink-0 relative block overflow-hidden group no-underline h-48 sm:h-56 md:h-64 lg:h-auto lg:self-stretch"
                  >
                    {/* Full image — the hero */}
                    <img
                      src={ind.image}
                      alt={ind.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Subtle bottom gradient only */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* CTA at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5">
                      <span className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white text-xs sm:text-[14px] font-bold rounded-full shadow-lg shadow-red-800/30 group-hover:bg-red-700 transition-all duration-300">
                        Find Buyers
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                      </span>
                    </div>
                  </Link>

                  {/* ── RIGHT: Subcategories ── */}
                  <div className="flex-1 min-w-0 bg-white">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gridTemplateRows: "auto" }} className="h-full lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                      {subcats.slice(0, 6).map((sub, j) => {
                        return (
                          <div
                            key={j}
                            className="px-4 sm:px-5 py-3 sm:py-4 flex flex-col group/cell transition-colors duration-200 border-b border-gray-100 sm:border-r sm:border-b-0 last:border-b-0 sm:last:border-r-0 sm:odd:border-r hover:bg-red-50"
                          >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-2 sm:mb-3 gap-2">
                              <Link
                                href={`/${ind.slug}`}
                                className="text-sm sm:text-[15px] font-bold text-gray-800 no-underline hover:text-red-600 transition-colors leading-snug flex-1 mr-1"
                              >
                                {sub.name}
                              </Link>
                              <Link
                                href={`/${ind.slug}`}
                                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-gray-300 flex items-center justify-center shrink-0 no-underline group-hover/cell:border-red-600 group-hover/cell:bg-red-600 transition-all duration-200"
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover/cell:text-white transition-colors"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                              </Link>
                            </div>

                            {/* Links */}
                            <div className="flex flex-col gap-1 sm:gap-[5px]">
                              {sub.items.map((item, k) => (
                                <Link
                                  key={k}
                                  href={`/${ind.slug}`}
                                  className="text-xs sm:text-[14px] text-gray-600 no-underline hover:text-red-600 transition-colors leading-relaxed"
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
          <div className="text-center py-12 sm:py-16 md:py-20 px-4">
            <span className="text-4xl sm:text-5xl block mb-3 sm:mb-4">🔍</span>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">No industries found</h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">No results for &ldquo;{search}&rdquo;</p>
            <button onClick={() => setSearch("")} className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gray-800 text-white font-bold text-xs sm:text-sm rounded-full cursor-pointer hover:bg-gray-700 transition-all border-none">Clear Search</button>
          </div>
        )}

        {/* Bottom CTA */}
        <FadeIn delay={0.2}>
          <div className="mt-12 sm:mt-16 md:mt-20 text-center px-4">
            <div className="inline-block bg-gray-100 border border-gray-200 rounded-xl sm:rounded-2xl px-6 sm:px-8 md:px-12 py-7 sm:py-8 md:py-10 max-w-full sm:max-w-none">
              <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 mb-1 sm:mb-2">Can&apos;t find your industry?</h3>
              <p className="text-xs sm:text-[14px] text-gray-600 mb-4 sm:mb-6 max-w-[400px] mx-auto px-2">We cover 55+ industries and are always expanding. Tell us your category.</p>
              <a href="#" className="inline-flex items-center gap-2 px-6 sm:px-8 py-2 sm:py-3 bg-red-600 text-white font-bold text-xs sm:text-sm rounded-lg no-underline hover:bg-red-700 transition-all shadow-md shadow-red-900/20">
                Request Custom Industry
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
