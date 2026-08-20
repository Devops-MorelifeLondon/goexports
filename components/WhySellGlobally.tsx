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
    ? industries.filter(
        (ind) =>
          ind.name.toLowerCase().includes(search.toLowerCase()) ||
          ind.desc.toLowerCase().includes(search.toLowerCase())
      )
    : industries;

  return (
    <section
      id="industries"
      style={{
        backgroundColor: "var(--canvas)",
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
      }}
    >
      <div className="section-wrap">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <span
              className="inline-block mb-4 caption-upper"
              style={{
                color: "var(--muted)",
                backgroundColor: "var(--surface-card)",
                padding: "6px 16px",
                borderRadius: "var(--r-pill)",
              }}
            >
              Explore Industries
            </span>
            <h2
              className="mb-4"
              style={{
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 500,
                lineHeight: 1.05,
                letterSpacing: "-2px",
                color: "var(--ink)",
              }}
            >
              55+ Industries.<br />Unlimited Global Trade Opportunities.
            </h2>
            <p
              className="mx-auto"
              style={{
                fontSize: "16px",
                color: "var(--muted)",
                maxWidth: "520px",
                lineHeight: 1.6,
              }}
            >
              Find international buyers and connect with verified global buyers across 190+ countries. Your trusted import export business platform.
            </p>
          </div>
        </FadeIn>

        {/* Search */}
        <FadeIn delay={0.1}>
          <div className="max-w-[440px] mx-auto mb-12">
            <div className="relative">
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="var(--muted-soft)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search industries..."
                style={{
                  width: "100%",
                  height: "44px",
                  paddingLeft: "44px",
                  paddingRight: "44px",
                  backgroundColor: "var(--canvas)",
                  color: "var(--ink)",
                  fontSize: "14px",
                  border: "1px solid var(--hairline)",
                  borderRadius: "var(--r-md)",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--ink)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--hairline)")}
                className="placeholder:text-[var(--muted-soft)]"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center border-none cursor-pointer"
                  style={{ backgroundColor: "var(--surface-strong)", color: "var(--muted)", fontSize: "10px" }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </FadeIn>

        {/* Industries list */}
        <div className="flex flex-col gap-10">
          {filtered.map((ind) => {
            const subcats = industrySubcategories[ind.name] || [];
            return (
              <motion.div
                key={ind.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: 0.05 }}
              >
                <h3
                  className="mb-4"
                  style={{ fontSize: "22px", fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.3px" }}
                >
                  {ind.title}
                </h3>

                <div
                  className="flex flex-col lg:flex-row overflow-hidden"
                  style={{
                    border: "1px solid var(--hairline)",
                    borderRadius: "var(--r-lg)",
                  }}
                >
                  {/* Left: Image with CTA */}
                  <Link
                    href={`/${ind.slug}`}
                    className="w-full lg:w-[300px] xl:w-[340px] shrink-0 relative block overflow-hidden group no-underline h-48 sm:h-56 lg:h-auto lg:self-stretch"
                  >
                    <img
                      src={ind.image}
                      alt={ind.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span
                        className="inline-flex items-center gap-2"
                        style={{
                          padding: "8px 18px",
                          backgroundColor: "var(--primary)",
                          color: "var(--on-primary)",
                          fontSize: "13px",
                          fontWeight: 600,
                          borderRadius: "var(--r-md)",
                        }}
                      >
                        Find Buyers
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </Link>

                  {/* Right: Subcategories */}
                  <div
                    className="flex-1 min-w-0"
                    style={{ backgroundColor: "var(--canvas)" }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                      }}
                      className="h-full"
                    >
                      {subcats.slice(0, 6).map((sub, j) => (
                        <div
                          key={j}
                          className="px-5 py-4 flex flex-col group/cell transition-colors duration-200"
                          style={{
                            borderBottom: "1px solid var(--hairline)",
                            borderRight: "1px solid var(--hairline)",
                          }}
                        >
                          <div className="flex items-center justify-between mb-2 gap-2">
                            <Link
                              href={`/${ind.slug}`}
                              className="text-sm font-semibold no-underline transition-colors leading-snug flex-1 mr-1"
                              style={{ color: "var(--ink)", fontSize: "14px", fontWeight: 600 }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand-teal)")}
                              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink)")}
                            >
                              {sub.name}
                            </Link>
                            <Link
                              href={`/${ind.slug}`}
                              className="w-6 h-6 flex items-center justify-center shrink-0 no-underline transition-all duration-200"
                              style={{
                                border: "1px solid var(--hairline)",
                                borderRadius: "var(--r-pill)",
                              }}
                            >
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                              </svg>
                            </Link>
                          </div>

                          <div className="flex flex-col gap-1">
                            {sub.items.map((item, k) => (
                              <Link
                                key={k}
                                href={`/${ind.slug}`}
                                className="text-xs no-underline transition-colors leading-relaxed"
                                style={{ color: "var(--muted)", fontSize: "13px" }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                              >
                                {item}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <span className="text-5xl block mb-4">🔍</span>
            <h3 style={{ fontSize: "20px", fontWeight: 600, color: "var(--ink)", marginBottom: "8px" }}>
              No industries found
            </h3>
            <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "24px" }}>
              No results for &ldquo;{search}&rdquo;
            </p>
            <button
              onClick={() => setSearch("")}
              className="btn-primary"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <FadeIn delay={0.2}>
          <div className="mt-16 text-center">
            <div
              style={{
                display: "inline-block",
                backgroundColor: "var(--surface-card)",
                border: "1px solid var(--hairline)",
                borderRadius: "var(--r-xl)",
                padding: "48px 64px",
              }}
            >
              <h3
                className="mb-2"
                style={{ fontSize: "24px", fontWeight: 500, letterSpacing: "-0.3px", color: "var(--ink)" }}
              >
                Can&apos;t find your industry?
              </h3>
              <p
                className="mb-6 mx-auto"
                style={{ fontSize: "14px", color: "var(--muted)", maxWidth: "380px", lineHeight: 1.6 }}
              >
                We cover 55+ industries and are always expanding. Tell us your category.
              </p>
              <a href="#contact-form" className="btn-primary">
                Request Custom Industry
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
