"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Search,
  Home,
  ArrowRight,
  UserCheck,
  Package,
  Globe,
  Mail,
  Sparkles,
  TrendingUp,
  RotateCcw,
  Layers,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { industries } from "@/data/industries";

const popularSectors = [
  {
    name: "Food & Beverages",
    slug: "food-and-beverages",
    icon: "🍔",
    desc: "Agricultural goods, packaged food & spices",
    bg: "rgba(255, 176, 132, 0.15)",
    border: "rgba(255, 176, 132, 0.4)",
    tag: "High Demand",
  },
  {
    name: "Apparel & Garments",
    slug: "apparel-and-garments",
    icon: "👕",
    desc: "Fashion wear, fabrics & wholesale garments",
    bg: "rgba(184, 164, 237, 0.15)",
    border: "rgba(184, 164, 237, 0.4)",
    tag: "Trending",
  },
  {
    name: "Industrial Machinery",
    slug: "industrial-plants-and-machinery",
    icon: "⚙️",
    desc: "Heavy equipment, parts & factory plants",
    bg: "rgba(164, 212, 197, 0.15)",
    border: "rgba(164, 212, 197, 0.4)",
    tag: "High Value",
  },
  {
    name: "Health & Pharma",
    slug: "health-products-drug-and-medicine",
    icon: "💊",
    desc: "Medical instruments, drugs & diagnosis tools",
    bg: "rgba(255, 77, 139, 0.12)",
    border: "rgba(255, 77, 139, 0.35)",
    tag: "Global Reach",
  },
  {
    name: "Agriculture & Farming",
    slug: "agriculture-and-farming",
    icon: "🌾",
    desc: "Crops, fertilizers, organic seeds & grain",
    bg: "rgba(232, 185, 74, 0.15)",
    border: "rgba(232, 185, 74, 0.4)",
    tag: "Top Volume",
  },
  {
    name: "Handicrafts & Decor",
    slug: "handicrafts-and-decoratives",
    icon: "🎁",
    desc: "Artisan crafts, home decor & giftware",
    bg: "rgba(255, 107, 90, 0.12)",
    border: "rgba(255, 107, 90, 0.35)",
    tag: "Artisan",
  },
];

export default function NotFoundClient() {
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return industries
      .filter(
        (ind) =>
          ind.title.toLowerCase().includes(q) ||
          ind.desc.toLowerCase().includes(q) ||
          ind.slug.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [searchQuery]);

  return (
    <div className="min-h-[85vh] flex flex-col justify-center py-12 md:py-20 overflow-hidden relative">
      {/* Background Decorative Gradients & Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, var(--brand-ochre) 0%, transparent 70%)", opacity: 0.25 }}
        />
        <div
          className="absolute top-1/3 -right-40 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, var(--brand-lavender) 0%, transparent 70%)", opacity: 0.25 }}
        />
        <div
          className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, var(--brand-mint) 0%, transparent 70%)", opacity: 0.25 }}
        />
      </div>

      <div className="section-wrap relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated 404 Badge & Status Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-xs"
              style={{
                backgroundColor: "var(--surface-strong)",
                color: "var(--brand-teal)",
                border: "1px solid var(--hairline)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[var(--brand-coral)] animate-ping inline-block" />
              Route 404 • Destination Uncharted
            </span>
          </motion.div>

          {/* Central Hero Illustration & Big 404 Numbers */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="relative inline-block mb-6 select-none"
          >
            <div className="relative flex items-center justify-center">
              <span
                className="text-[100px] sm:text-[140px] md:text-[180px] font-black tracking-tight leading-none"
                style={{
                  color: "var(--ink)",
                  textShadow: "0 8px 30px rgba(10, 10, 10, 0.06)",
                  fontFamily: "inherit",
                }}
              >
                404
              </span>

              {/* Floating Orbit Radar Element inside the 0 */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border border-dashed border-[var(--brand-ochre)]/60 flex items-center justify-center opacity-80"
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    className="w-3 h-3 rounded-full bg-[var(--brand-ochre)] absolute -top-1.5 shadow-[0_0_12px_var(--brand-ochre)]"
                  />
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[var(--canvas)]/80 backdrop-blur-xs border border-[var(--hairline)] flex items-center justify-center shadow-inner">
                    <Compass className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--brand-teal)] animate-pulse" />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Floating Trade Badges */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-3 -left-4 sm:-left-12 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--surface-card)] border border-[var(--hairline)] shadow-sm text-xs font-medium text-[var(--ink)]"
            >
              <Package className="w-3.5 h-3.5 text-[var(--brand-coral)]" />
              <span>Shipment Lost</span>
            </motion.div>

            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="absolute -bottom-2 -right-4 sm:-right-12 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--surface-card)] border border-[var(--hairline)] shadow-sm text-xs font-medium text-[var(--ink)]"
            >
              <Globe className="w-3.5 h-3.5 text-[var(--brand-mint)]" />
              <span>Global Port: 404</span>
            </motion.div>
          </motion.div>

          {/* Heading & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3 mb-8"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--ink)]">
              This Trade Route Couldn&apos;t Be Found
            </h1>
            <p className="text-sm sm:text-base text-[var(--muted)] max-w-xl mx-auto leading-relaxed">
              The page, exporter catalog, or trade link you requested might have been moved, updated, or does not exist in our global registry.
            </p>
          </motion.div>

          {/* Instant Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-md mx-auto mb-8 relative"
          >
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-[var(--muted)] absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 30+ export industries or categories..."
                className="w-full pl-11 pr-10 py-3 rounded-full bg-[var(--surface-card)] border border-[var(--hairline)] text-sm text-[var(--ink)] placeholder-[var(--muted-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-ochre)] focus:border-transparent transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 text-xs text-[var(--muted)] hover:text-[var(--ink)] p-1 rounded-full hover:bg-[var(--surface-strong)] transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Instant Search Dropdown */}
            <AnimatePresence>
              {searchQuery.trim() && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-[var(--canvas)] border border-[var(--hairline)] rounded-2xl shadow-xl overflow-hidden z-30 text-left"
                >
                  <div className="p-2 border-b border-[var(--hairline)] bg-[var(--surface-soft)] text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)] flex items-center justify-between">
                    <span>Industry Matches ({searchResults.length})</span>
                    <Sparkles className="w-3 h-3 text-[var(--brand-ochre)]" />
                  </div>
                  {searchResults.length > 0 ? (
                    <div className="max-h-60 overflow-y-auto divide-y divide-[var(--hairline)]">
                      {searchResults.map((ind) => (
                        <Link
                          key={ind.slug}
                          href={`/${ind.slug}`}
                          className="flex items-center justify-between p-3 hover:bg-[var(--surface-card)] transition-colors group no-underline"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{ind.icon}</span>
                            <div>
                              <div className="text-sm font-semibold text-[var(--ink)] group-hover:text-[var(--primary)]">
                                {ind.title}
                              </div>
                              <div className="text-xs text-[var(--muted)] line-clamp-1">
                                {ind.desc}
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[var(--muted-soft)] group-hover:text-[var(--ink)] group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs text-[var(--muted)]">
                      No matching export categories found for &quot;{searchQuery}&quot;. Try &quot;Apparel&quot;, &quot;Food&quot;, or &quot;Chemicals&quot;.
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
          >
            <Link
              href="/"
              className="btn-primary gap-2 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </Link>

            <Link
              href="/create-export-profile"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[var(--r-md)] text-sm font-semibold text-[var(--ink)] no-underline hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
              style={{ backgroundColor: "var(--brand-ochre)" }}
            >
              <span>Create Export Profile</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/exporter/login"
              className="btn-secondary gap-2 hover:bg-[var(--surface-card)] active:scale-[0.98] transition-all"
            >
              <UserCheck className="w-4 h-4 text-[var(--muted)]" />
              <span>Exporter Portal</span>
            </Link>
          </motion.div>

          {/* Popular Trading Sectors Grid */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-left"
          >
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-[var(--hairline)]">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[var(--brand-coral)]" />
                <h2 className="text-base sm:text-lg font-semibold text-[var(--ink)]">
                  Explore Active Global Trade Sectors
                </h2>
              </div>
              <span className="text-xs text-[var(--muted)] hidden sm:inline">
                Verified buyer leads updated daily
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {popularSectors.map((sector) => (
                <Link
                  key={sector.slug}
                  href={`/${sector.slug}`}
                  className="group relative p-4 rounded-2xl border bg-[var(--surface-card)] transition-all duration-200 hover:-translate-y-1 hover:shadow-md no-underline flex flex-col justify-between"
                  style={{ borderColor: "var(--hairline)" }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl p-1.5 rounded-xl bg-[var(--canvas)] border border-[var(--hairline)] inline-block">
                        {sector.icon}
                      </span>
                      <span
                        className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: sector.bg, color: "var(--ink)", border: `1px solid ${sector.border}` }}
                      >
                        {sector.tag}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--ink)] group-hover:text-[var(--brand-teal)] transition-colors mb-1">
                      {sector.name}
                    </h3>
                    <p className="text-xs text-[var(--muted)] leading-relaxed line-clamp-2">
                      {sector.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-[var(--hairline)] flex items-center justify-between text-xs font-semibold text-[var(--ink)]">
                    <span className="text-[var(--muted)] group-hover:text-[var(--ink)] transition-colors">
                      View Exporters & Leads
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[var(--ink)] group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Trade Support & Assistance Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 p-6 sm:p-8 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-soft)] text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--brand-teal)] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-[var(--ink)]">
                  Need Help Finding a Verified Buyer or Exporter?
                </h4>
                <p className="text-xs sm:text-sm text-[var(--muted)] mt-0.5">
                  Our international trade support desk can help locate the right catalog or buyer leads for your industry.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="mailto:info@goexports.co.uk"
                className="btn-secondary text-xs sm:text-sm px-4 py-2"
              >
                info@goexports.co.uk
              </a>
              <Link
                href="/#contact-form"
                className="btn-primary text-xs sm:text-sm px-4 py-2"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
