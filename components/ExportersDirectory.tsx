"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Filter,
  ShieldCheck,
  Building2,
  MapPin,
  Calendar,
  Award,
  Globe2,
  Package,
  ArrowRight,
  ExternalLink,
  Mail,
  X,
  SlidersHorizontal,
  ChevronDown,
  LayoutGrid,
  List,
  CheckCircle2,
  Loader2,
  Send,
  Sparkles,
  ArrowUpDown,
  Store
} from "lucide-react";
import { toast } from "sonner";
import { SellerProfile } from "@/lib/seller";

interface ExportersDirectoryProps {
  initialExporters: SellerProfile[];
  initialQuery?: string;
  initialCategory?: string;
  initialCountry?: string;
}

// Flag mapping helper
function getCountryFlag(country: string): string {
  const c = (country || "").trim().toLowerCase();
  if (c.includes("india")) return "🇮🇳";
  if (c.includes("vietnam")) return "🇻🇳";
  if (c.includes("emirates") || c.includes("uae") || c.includes("dubai")) return "🇦🇪";
  if (c.includes("united states") || c.includes("usa")) return "🇺🇸";
  if (c.includes("united kingdom") || c.includes("uk")) return "🇬🇧";
  if (c.includes("china")) return "🇨🇳";
  if (c.includes("singapore")) return "🇸🇬";
  if (c.includes("australia")) return "🇦🇺";
  if (c.includes("germany")) return "🇩🇪";
  if (c.includes("canada")) return "🇨🇦";
  if (c.includes("saudi")) return "🇸🇦";
  return "🌐";
}

function ExporterLogo({
  logoUrl,
  companyName,
  size = 48,
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
        className="rounded-xl flex items-center justify-center font-black text-lg text-[var(--ink)] shrink-0 shadow-2xs border border-[var(--hairline)]"
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

export default function ExportersDirectory({
  initialExporters,
  initialQuery = "",
  initialCategory = "all",
  initialCountry = "all",
}: ExportersDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [sortBy, setSortBy] = useState<"newest" | "name-asc" | "name-desc" | "products" | "established">("newest");
  const [onlyWithProducts, setOnlyWithProducts] = useState(false);
  const [onlyWithCertifications, setOnlyWithCertifications] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(12);

  // RFQ Modal State
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [selectedExporterForRfq, setSelectedExporterForRfq] = useState<SellerProfile | null>(null);
  const [isSubmittingRfq, setIsSubmittingRfq] = useState(false);
  const [rfqSubmitted, setRfqSubmitted] = useState(false);
  const [rfqForm, setRfqForm] = useState({
    buyerName: "",
    buyerEmail: "",
    buyerPhone: "",
    buyerCountry: "",
    quantity: "",
    inquiryType: "Bulk Export / Sourcing RFQ",
    message: "",
  });

  // Extract unique categories & countries from the full exporter list
  const { categoriesWithCount, countriesWithCount } = useMemo(() => {
    const catMap = new Map<string, number>();
    const countryMap = new Map<string, number>();

    initialExporters.forEach((exp) => {
      const cat = (exp.productCategory || "Other").trim();
      if (cat) {
        catMap.set(cat, (catMap.get(cat) || 0) + 1);
      }

      const country = (exp.country || "Other").trim();
      if (country) {
        countryMap.set(country, (countryMap.get(country) || 0) + 1);
      }
    });

    // Sort categories alphabetically or by frequency
    const sortedCats = Array.from(catMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));

    const sortedCountries = Array.from(countryMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));

    return {
      categoriesWithCount: sortedCats,
      countriesWithCount: sortedCountries,
    };
  }, [initialExporters]);

  // Filter & Sort Logic
  const filteredExporters = useMemo(() => {
    let list = [...initialExporters];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((exp) => {
        const nameMatch = (exp.companyName || "").toLowerCase().includes(q);
        const catMatch = (exp.productCategory || "").toLowerCase().includes(q);
        const bioMatch = (exp.companyProfile || "").toLowerCase().includes(q);
        const countryMatch = (exp.country || "").toLowerCase().includes(q);
        const marketsMatch = (exp.targetMarkets || []).some((m) => m.toLowerCase().includes(q));
        const productsMatch = (exp.products || []).some((p) =>
          (p.title || "").toLowerCase().includes(q) || (p.description || "").toLowerCase().includes(q)
        );
        return nameMatch || catMatch || bioMatch || countryMatch || marketsMatch || productsMatch;
      });
    }

    // Category filter
    if (selectedCategory !== "all") {
      list = list.filter((exp) => (exp.productCategory || "").trim() === selectedCategory);
    }

    // Country filter
    if (selectedCountry !== "all") {
      list = list.filter((exp) => (exp.country || "").trim() === selectedCountry);
    }

    // Only with products
    if (onlyWithProducts) {
      list = list.filter((exp) => exp.products && exp.products.length > 0);
    }

    // Only with certifications
    if (onlyWithCertifications) {
      list = list.filter((exp) => exp.certifications && exp.certifications.length > 0);
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === "name-asc") {
        return (a.companyName || "").localeCompare(b.companyName || "");
      }
      if (sortBy === "name-desc") {
        return (b.companyName || "").localeCompare(a.companyName || "");
      }
      if (sortBy === "products") {
        const aCount = a.products?.length || 0;
        const bCount = b.products?.length || 0;
        return bCount - aCount;
      }
      if (sortBy === "established") {
        const aYear = parseInt(a.yearEstablished || "9999", 10) || 9999;
        const bYear = parseInt(b.yearEstablished || "9999", 10) || 9999;
        return aYear - bYear;
      }
      // "newest" by default: compare createdAt or original position
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });

    return list;
  }, [
    initialExporters,
    searchQuery,
    selectedCategory,
    selectedCountry,
    onlyWithProducts,
    onlyWithCertifications,
    sortBy,
  ]);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(12);
  }, [searchQuery, selectedCategory, selectedCountry, onlyWithProducts, onlyWithCertifications, sortBy]);

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedCountry !== "all" ? 1 : 0) +
    (onlyWithProducts ? 1 : 0) +
    (onlyWithCertifications ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const resetAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedCountry("all");
    setOnlyWithProducts(false);
    setOnlyWithCertifications(false);
    setSortBy("newest");
  };

  // Open RFQ Modal
  const handleOpenRfq = (exporter: SellerProfile) => {
    setSelectedExporterForRfq(exporter);
    setRfqSubmitted(false);
    setRfqForm({
      buyerName: "",
      buyerEmail: "",
      buyerPhone: "",
      buyerCountry: "",
      quantity: "",
      inquiryType: "Bulk Export / Sourcing RFQ",
      message: `Hello ${exporter.companyName}, we are interested in sourcing ${exporter.productCategory || "your products"} for export. Please share your catalog, FOB/CIF pricing, and minimum order quantities.`,
    });
    setRfqModalOpen(true);
  };

  // Submit RFQ
  const handleRfqSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExporterForRfq) return;

    if (!rfqForm.buyerName.trim() || !rfqForm.buyerEmail.trim() || !rfqForm.message.trim()) {
      toast.error("Please fill in your name, email, and message");
      return;
    }

    setIsSubmittingRfq(true);
    try {
      const res = await fetch("/api/seller-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sellerId: selectedExporterForRfq.id,
          sellerCompanyName: selectedExporterForRfq.companyName,
          sellerEmail: selectedExporterForRfq.email,
          buyerName: rfqForm.buyerName,
          buyerEmail: rfqForm.buyerEmail,
          buyerPhone: rfqForm.buyerPhone,
          buyerCountry: rfqForm.buyerCountry,
          inquiryType: rfqForm.inquiryType,
          quantity: rfqForm.quantity,
          message: rfqForm.message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to submit RFQ");
      }

      setRfqSubmitted(true);
      toast.success(`Inquiry sent to ${selectedExporterForRfq.companyName}!`);
    } catch (err: any) {
      toast.error(err.message || "Error submitting inquiry. Please try again.");
    } finally {
      setIsSubmittingRfq(false);
    }
  };

  const paginatedExporters = filteredExporters.slice(0, visibleCount);
  const hasMore = visibleCount < filteredExporters.length;

  return (
    <div className="w-full min-h-screen bg-[var(--canvas)] pb-24">
      {/* ── Directory Hero Banner ── */}
      <section className="relative overflow-hidden pt-10 sm:pt-14 pb-10 border-b border-[var(--hairline)] bg-gradient-to-b from-[var(--surface-soft)] via-[var(--canvas)] to-[var(--canvas)]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[var(--muted)] mb-5">
            <Link href="/" className="hover:text-[var(--ink)] no-underline transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[var(--ink)] font-semibold">Verified Exporters</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-bold mb-4 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Verified Exporters & Suppliers Directory</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-[11px] font-medium text-emerald-800">
                  {initialExporters.length} Active Vetted Exporters
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--ink)] tracking-tight leading-[1.15] mb-4">
                Verified Global Exporters &amp; Manufacturers
              </h1>

              <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed font-normal">
                Directly connect with government-compliant manufacturers, direct mills, and merchant exporters. Source
                commodities, textiles, machinery, and agricultural goods with authentic export credentials and zero
                middleman markups.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 shrink-0 lg:w-80">
              <div className="p-3.5 rounded-2xl bg-[var(--surface-card)] border border-[var(--hairline)] shadow-2xs">
                <span className="block text-2xl font-black text-[var(--ink)]">
                  {initialExporters.length}+
                </span>
                <span className="block text-xs font-semibold text-[var(--muted)]">Verified Suppliers</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[var(--surface-card)] border border-[var(--hairline)] shadow-2xs">
                <span className="block text-2xl font-black text-[var(--ink)]">
                  {categoriesWithCount.length}
                </span>
                <span className="block text-xs font-semibold text-[var(--muted)]">Industry Sectors</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[var(--surface-card)] border border-[var(--hairline)] shadow-2xs">
                <span className="block text-2xl font-black text-emerald-700">100%</span>
                <span className="block text-xs font-semibold text-[var(--muted)]">Vetted Credentials</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[var(--surface-card)] border border-[var(--hairline)] shadow-2xs">
                <span className="block text-2xl font-black text-amber-700">Direct</span>
                <span className="block text-xs font-semibold text-[var(--muted)]">Mill Sourcing</span>
              </div>
            </div>
          </div>

          {/* ── Search & Filter Controls Container ── */}
          <div className="bg-[var(--surface-card)] rounded-2xl p-4 sm:p-5 border border-[var(--hairline)] shadow-sm space-y-4">
            {/* Search Input Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by company name, product (e.g. spices, steel, garments), category, or country..."
                className="w-full h-12 pl-12 pr-10 rounded-xl bg-[var(--canvas)] border border-[var(--hairline)] text-sm font-medium text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-ochre)] focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] bg-[var(--surface-soft)] hover:bg-[var(--hairline)] transition-colors border-none cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Dropdowns & View Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Category Dropdown */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    aria-label="Filter by industry"
                    className="h-10 pl-3.5 pr-8 rounded-xl bg-[var(--canvas)] border border-[var(--hairline)] text-xs font-semibold text-[var(--ink)] cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--brand-ochre)]"
                  >
                    <option value="all">All Industries ({initialExporters.length})</option>
                    {categoriesWithCount.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name} ({c.count})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--muted)] pointer-events-none" />
                </div>

                {/* Country Dropdown */}
                <div className="relative">
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    aria-label="Filter by country"
                    className="h-10 pl-3.5 pr-8 rounded-xl bg-[var(--canvas)] border border-[var(--hairline)] text-xs font-semibold text-[var(--ink)] cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--brand-ochre)]"
                  >
                    <option value="all">All Countries</option>
                    {countriesWithCount.map((c) => (
                      <option key={c.name} value={c.name}>
                        {getCountryFlag(c.name)} {c.name} ({c.count})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--muted)] pointer-events-none" />
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    aria-label="Sort exporters"
                    className="h-10 pl-3.5 pr-8 rounded-xl bg-[var(--canvas)] border border-[var(--hairline)] text-xs font-semibold text-[var(--ink)] cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--brand-ochre)]"
                  >
                    <option value="newest">Recently Registered</option>
                    <option value="name-asc">Company Name (A → Z)</option>
                    <option value="name-desc">Company Name (Z → A)</option>
                    <option value="products">Most Products Listed</option>
                    <option value="established">Year Established</option>
                  </select>
                  <ArrowUpDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--muted)] pointer-events-none" />
                </div>

                {/* Checkbox Toggles */}
                <label className="inline-flex items-center gap-1.5 h-10 px-3 rounded-xl bg-[var(--canvas)] border border-[var(--hairline)] text-xs font-medium text-[var(--ink)] cursor-pointer select-none hover:bg-[var(--surface-soft)] transition-colors">
                  <input
                    type="checkbox"
                    checked={onlyWithProducts}
                    onChange={(e) => setOnlyWithProducts(e.target.checked)}
                    className="rounded border-[var(--hairline)] text-[var(--brand-ochre)] focus:ring-[var(--brand-ochre)]"
                  />
                  <span>Has Products</span>
                </label>

                <label className="inline-flex items-center gap-1.5 h-10 px-3 rounded-xl bg-[var(--canvas)] border border-[var(--hairline)] text-xs font-medium text-[var(--ink)] cursor-pointer select-none hover:bg-[var(--surface-soft)] transition-colors">
                  <input
                    type="checkbox"
                    checked={onlyWithCertifications}
                    onChange={(e) => setOnlyWithCertifications(e.target.checked)}
                    className="rounded border-[var(--hairline)] text-[var(--brand-ochre)] focus:ring-[var(--brand-ochre)]"
                  />
                  <span>Certified</span>
                </label>
              </div>

              {/* View Mode Toggle & Reset */}
              <div className="flex items-center gap-2 ml-auto">
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetAllFilters}
                    className="h-9 px-3 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 cursor-pointer transition-colors flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reset ({activeFiltersCount})</span>
                  </button>
                )}

                <div className="flex items-center p-0.5 rounded-lg bg-[var(--canvas)] border border-[var(--hairline)]">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-md border-none cursor-pointer transition-colors ${
                      viewMode === "grid"
                        ? "bg-[var(--surface-card)] text-[var(--ink)] shadow-2xs"
                        : "bg-transparent text-[var(--muted)] hover:text-[var(--ink)]"
                    }`}
                    title="Grid View"
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-md border-none cursor-pointer transition-colors ${
                      viewMode === "list"
                        ? "bg-[var(--surface-card)] text-[var(--ink)] shadow-2xs"
                        : "bg-transparent text-[var(--muted)] hover:text-[var(--ink)]"
                    }`}
                    title="List View"
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Industry Filter Pills (Top Categories) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none text-xs">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1.5 rounded-full font-semibold shrink-0 border cursor-pointer transition-all ${
                  selectedCategory === "all"
                    ? "bg-[var(--ink)] text-white border-[var(--ink)]"
                    : "bg-[var(--canvas)] text-[var(--muted)] border-[var(--hairline)] hover:text-[var(--ink)] hover:bg-[var(--surface-soft)]"
                }`}
              >
                All Categories ({initialExporters.length})
              </button>
              {categoriesWithCount.slice(0, 6).map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedCategory(c.name)}
                  className={`px-3 py-1.5 rounded-full font-semibold shrink-0 border cursor-pointer transition-all truncate max-w-[260px] ${
                    selectedCategory === c.name
                      ? "bg-[var(--ink)] text-white border-[var(--ink)]"
                      : "bg-[var(--canvas)] text-[var(--muted)] border-[var(--hairline)] hover:text-[var(--ink)] hover:bg-[var(--surface-soft)]"
                  }`}
                  title={c.name}
                >
                  {c.name} ({c.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Exporters Directory Results ── */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Results Header Status */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[var(--ink)]">
              Showing {filteredExporters.length} Verified Exporter{filteredExporters.length === 1 ? "" : "s"}
            </span>
            {selectedCategory !== "all" && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold">
                {selectedCategory}
              </span>
            )}
            {selectedCountry !== "all" && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 font-semibold">
                {getCountryFlag(selectedCountry)} {selectedCountry}
              </span>
            )}
          </div>
          <span className="text-xs text-[var(--muted)]">Direct manufacturer listings</span>
        </div>

        {/* ── Empty State ── */}
        {filteredExporters.length === 0 && (
          <div className="text-center py-16 px-4 bg-[var(--surface-card)] rounded-3xl border border-[var(--hairline)] max-w-xl mx-auto my-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--surface-soft)] border border-[var(--hairline)] flex items-center justify-center text-[var(--muted)]">
              <Building2 className="w-8 h-8 opacity-60" />
            </div>
            <h3 className="text-xl font-bold text-[var(--ink)] mb-2">No Verified Exporters Found</h3>
            <p className="text-sm text-[var(--muted)] mb-6 max-w-md mx-auto">
              We couldn&apos;t find any exporters matching your current search or filter criteria. Try clearing some filters or searching for broader terms.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-5 py-2.5 rounded-xl font-bold text-xs text-[var(--ink)] bg-[var(--brand-ochre)] hover:opacity-90 border-none cursor-pointer transition-transform active:scale-95 shadow-sm inline-flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

        {/* ── Grid View ── */}
        {viewMode === "grid" && filteredExporters.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedExporters.map((exporter) => {
              const flag = getCountryFlag(exporter.country);
              const productCount = exporter.products?.length || 0;
              const hasCerts = exporter.certifications && exporter.certifications.length > 0;
              const targetMarketsPreview =
                exporter.targetMarkets && exporter.targetMarkets.length > 0
                  ? exporter.targetMarkets.slice(0, 2).join(", ") +
                    (exporter.targetMarkets.length > 2 ? ` +${exporter.targetMarkets.length - 2}` : "")
                  : null;

              return (
                <div
                  key={exporter.id || exporter.slug}
                  className="flex flex-col bg-[var(--surface-card)] rounded-2xl border border-[var(--hairline)] hover:border-[var(--brand-ochre)]/80 hover:shadow-[0_12px_32px_rgba(10,10,10,0.08)] transition-all duration-200 overflow-hidden group"
                >
                  {/* Card Header & Avatar */}
                  <div className="p-5 pb-4 border-b border-[var(--hairline)]/70">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Company Logo / Avatar */}
                        <ExporterLogo
                          logoUrl={exporter.logoUrl}
                          companyName={exporter.companyName}
                          size={48}
                        />

                        <div className="min-w-0">
                          <Link
                            href={`/${exporter.slug}`}
                            className="block font-bold text-base text-[var(--ink)] hover:text-amber-800 transition-colors truncate no-underline"
                            title={exporter.companyName}
                          >
                            {exporter.companyName}
                          </Link>
                          <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] mt-0.5">
                            <span>{flag}</span>
                            <span className="font-medium truncate">{exporter.country || "Global"}</span>
                            {exporter.yearEstablished && (
                              <>
                                <span>•</span>
                                <span className="text-[11px]">Est. {exporter.yearEstablished}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Verified Badge */}
                      <div
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100/90 text-emerald-800 text-[11px] font-bold shrink-0 border border-emerald-300"
                        title="Verified Exporter with government license"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Verified</span>
                      </div>
                    </div>

                    {/* Category Tag */}
                    <div className="inline-block">
                      <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-amber-900 bg-amber-100/80 px-2.5 py-0.5 rounded-lg border border-amber-300/50">
                        <Store className="w-3 h-3 text-amber-700 shrink-0" />
                        <span className="truncate max-w-[240px]">{exporter.productCategory}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    {/* Bio Snippet */}
                    <p className="text-xs text-[var(--body)] line-clamp-3 leading-relaxed m-0 font-normal">
                      {exporter.companyProfile ||
                        "Direct supplier and manufacturer specialized in high-grade export orders, bulk wholesale packaging, and competitive cross-border delivery."}
                    </p>

                    {/* Target Markets */}
                    {targetMarketsPreview && (
                      <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                        <Globe2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span className="truncate">Markets: {targetMarketsPreview}</span>
                      </div>
                    )}

                    {/* Certifications Preview */}
                    {hasCerts && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {exporter.certifications.slice(0, 3).map((cert, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 text-[10.5px] font-semibold px-2 py-0.5 rounded-md bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--ink)]"
                          >
                            <Award className="w-3 h-3 text-amber-600" />
                            <span className="truncate max-w-[120px]">{cert}</span>
                          </span>
                        ))}
                        {exporter.certifications.length > 3 && (
                          <span className="text-[10px] text-[var(--muted)] self-center font-semibold">
                            +{exporter.certifications.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Product Catalog Count */}
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-[var(--hairline)] text-[var(--muted)]">
                      <div className="flex items-center gap-1 font-medium">
                        <Package className="w-3.5 h-3.5 text-[var(--brand-ochre)]" />
                        <span>{productCount > 0 ? `${productCount} Products Listed` : "Catalog Upon Request"}</span>
                      </div>
                      {exporter.exportCapacity && (
                        <span className="text-[11px] truncate max-w-[140px] text-[var(--muted)]" title={exporter.exportCapacity}>
                          Cap: {exporter.exportCapacity}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-4 bg-[var(--surface-soft)] border-t border-[var(--hairline)] grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleOpenRfq(exporter)}
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-[var(--ink)] bg-[var(--canvas)] hover:bg-[var(--surface-card)] border border-[var(--hairline)] cursor-pointer transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-amber-700" />
                      <span>Send RFQ</span>
                    </button>

                    <Link
                      href={`/${exporter.slug}`}
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-[var(--ink)] bg-[var(--brand-ochre)] hover:opacity-95 no-underline transition-all shadow-2xs group-hover:bg-amber-400"
                    >
                      <span>Storefront</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── List View ── */}
        {viewMode === "list" && filteredExporters.length > 0 && (
          <div className="flex flex-col gap-3">
            {paginatedExporters.map((exporter) => {
              const flag = getCountryFlag(exporter.country);
              const productCount = exporter.products?.length || 0;

              return (
                <div
                  key={exporter.id || exporter.slug}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-2xl bg-[var(--surface-card)] border border-[var(--hairline)] hover:border-[var(--brand-ochre)] hover:shadow-sm transition-all gap-4"
                >
                  <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                    {/* Logo */}
                    <ExporterLogo
                      logoUrl={exporter.logoUrl}
                      companyName={exporter.companyName}
                      size={48}
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Link
                          href={`/${exporter.slug}`}
                          className="font-bold text-base text-[var(--ink)] hover:text-amber-800 transition-colors truncate no-underline"
                        >
                          {exporter.companyName}
                        </Link>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300 shrink-0">
                          <ShieldCheck className="w-3 h-3 text-emerald-700" />
                          <span>Verified</span>
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
                        <span className="font-semibold text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded text-[11px]">
                          {exporter.productCategory}
                        </span>
                        <span>•</span>
                        <span>{flag} {exporter.country}</span>
                        {exporter.yearEstablished && (
                          <>
                            <span>•</span>
                            <span>Est. {exporter.yearEstablished}</span>
                          </>
                        )}
                        {productCount > 0 && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-700 font-semibold">{productCount} Products</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleOpenRfq(exporter)}
                      className="py-2 px-3.5 rounded-xl text-xs font-bold text-[var(--ink)] bg-[var(--canvas)] hover:bg-[var(--surface-soft)] border border-[var(--hairline)] cursor-pointer transition-colors"
                    >
                      Send RFQ
                    </button>
                    <Link
                      href={`/${exporter.slug}`}
                      className="inline-flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold text-[var(--ink)] bg-[var(--brand-ochre)] hover:opacity-95 no-underline transition-all shadow-2xs"
                    >
                      <span>Storefront</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Pagination / Load More ── */}
        {hasMore && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="px-6 py-3 rounded-full font-bold text-xs text-[var(--ink)] bg-[var(--surface-card)] hover:bg-[var(--surface-strong)] border border-[var(--hairline)] cursor-pointer transition-all shadow-2xs hover:scale-[1.02] active:scale-95 inline-flex items-center gap-2"
            >
              <span>Load More Exporters ({filteredExporters.length - visibleCount} remaining)</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── Trust & Buyer Protection Box ── */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[var(--surface-card)] via-[var(--surface-soft)] to-[var(--canvas)] border border-[var(--hairline)] shadow-sm">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Goexports Verification Standard</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--ink)] mb-3">
              Why Source Through Goexports Verified Exporters?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed mb-6">
              Unlike generic directory boards, every exporter listed on Goexports undergoes verification of their legal
              business registration, tax/GST registration, Import Export Code (IEC), and production capacity.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[var(--canvas)] border border-[var(--hairline)]">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm mb-2">
                  1
                </div>
                <h3 className="text-xs font-bold text-[var(--ink)] mb-1">Direct Factory Pricing</h3>
                <p className="text-[11.5px] text-[var(--muted)] m-0 leading-relaxed">
                  Connect straight with manufacturers and processors without intermediary broker surcharges.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--canvas)] border border-[var(--hairline)]">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm mb-2">
                  2
                </div>
                <h3 className="text-xs font-bold text-[var(--ink)] mb-1">Authentic Certifications</h3>
                <p className="text-[11.5px] text-[var(--muted)] m-0 leading-relaxed">
                  Review APEDA, Spices Board, ISO, CE, and FSSAI credentials verified on record.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--canvas)] border border-[var(--hairline)]">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm mb-2">
                  3
                </div>
                <h3 className="text-xs font-bold text-[var(--ink)] mb-1">Integrated Logistics Support</h3>
                <p className="text-[11.5px] text-[var(--muted)] m-0 leading-relaxed">
                  Leverage discounted cross-border freight and door-to-door shipping via our ShipGlobal network.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Exporter CTA: List Your Company ── */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-[var(--ink)] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--brand-ochre)] block mb-1">
              Join 32+ Global Exporters
            </span>
            <h2 className="text-xl sm:text-2xl font-black mb-2">
              Are You an Exporter or Manufacturer?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed m-0">
              Create your verified public storefront, list your product catalog, and receive qualified international RFQs and domestic inquiries directly from verified buyers.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/create-export-profile"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-full font-bold text-xs text-[var(--ink)] bg-[var(--brand-ochre)] hover:opacity-95 no-underline transition-all shadow-md"
            >
              Create Business Profile Free
            </Link>
            <Link
              href="/sell-with-us"
              className="w-full sm:w-auto text-center px-5 py-3 rounded-full font-semibold text-xs text-white bg-white/10 hover:bg-white/20 border border-white/20 no-underline transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ── Quick RFQ / Inquiry Modal ── */}
      {rfqModalOpen && selectedExporterForRfq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-3xl bg-[var(--canvas)] border border-[var(--hairline)] shadow-2xl p-6 sm:p-7 overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setRfqModalOpen(false)}
              className="absolute right-5 top-5 w-8 h-8 rounded-full bg-[var(--surface-soft)] hover:bg-[var(--surface-strong)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] border-none cursor-pointer transition-colors"
              aria-label="Close RFQ modal"
            >
              <X className="w-4 h-4" />
            </button>

            {rfqSubmitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[var(--ink)] mb-2">Inquiry Successfully Sent!</h3>
                <p className="text-xs text-[var(--muted)] max-w-sm mx-auto mb-6">
                  Your request has been forwarded directly to {selectedExporterForRfq.companyName}. Their export desk will review your specifications and contact you shortly.
                </p>
                <button
                  onClick={() => setRfqModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs text-[var(--ink)] bg-[var(--brand-ochre)] hover:opacity-95 border-none cursor-pointer transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                    Direct Sourcing Request
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-[var(--ink)] mt-2 mb-1">
                    Send RFQ to {selectedExporterForRfq.companyName}
                  </h3>
                  <p className="text-xs text-[var(--muted)] m-0">
                    Submit your requirement. The exporter will respond with product specifications, FOB/CIF quotes, and sample availability.
                  </p>
                </div>

                <form onSubmit={handleRfqSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={rfqForm.buyerName}
                        onChange={(e) => setRfqForm({ ...rfqForm, buyerName: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full h-10 px-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--hairline)] text-xs text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-ochre)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={rfqForm.buyerEmail}
                        onChange={(e) => setRfqForm({ ...rfqForm, buyerEmail: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full h-10 px-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--hairline)] text-xs text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-ochre)]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="text"
                        value={rfqForm.buyerPhone}
                        onChange={(e) => setRfqForm({ ...rfqForm, buyerPhone: e.target.value })}
                        placeholder="+1 555 0192"
                        className="w-full h-10 px-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--hairline)] text-xs text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-ochre)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                        Destination Country
                      </label>
                      <input
                        type="text"
                        value={rfqForm.buyerCountry}
                        onChange={(e) => setRfqForm({ ...rfqForm, buyerCountry: e.target.value })}
                        placeholder="e.g. United Kingdom"
                        className="w-full h-10 px-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--hairline)] text-xs text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-ochre)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                      Required Quantity &amp; Units
                    </label>
                    <input
                      type="text"
                      value={rfqForm.quantity}
                      onChange={(e) => setRfqForm({ ...rfqForm, quantity: e.target.value })}
                      placeholder="e.g. 1 x 20ft FCL or 10 Metric Tons"
                      className="w-full h-10 px-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--hairline)] text-xs text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-ochre)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                      Requirement Details *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={rfqForm.message}
                      onChange={(e) => setRfqForm({ ...rfqForm, message: e.target.value })}
                      placeholder="Specify packaging type, target delivery port, certifications needed, or sample requests..."
                      className="w-full p-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--hairline)] text-xs text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-ochre)] resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setRfqModalOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-[var(--muted)] hover:text-[var(--ink)] bg-transparent border-none cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmittingRfq}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-[var(--ink)] bg-[var(--brand-ochre)] hover:opacity-95 disabled:opacity-50 border-none cursor-pointer transition-all shadow-sm"
                    >
                      {isSubmittingRfq ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending RFQ...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit RFQ</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

