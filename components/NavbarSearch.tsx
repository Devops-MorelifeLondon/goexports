"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  X,
  Store,
  ArrowRight,
  ShieldCheck,
  Flame,
  Layers,
  Building2,
  Package,
  Globe2,
  Loader2
} from "lucide-react";

interface ExporterSearchResult {
  id: string;
  slug: string;
  companyName: string;
  country: string;
  productCategory: string;
  products?: { title: string }[];
}

const STATIC_HUBS = [
  { title: "Spices Directory & Hub", href: "/spices", icon: Flame, tags: ["spices", "chilli", "turmeric", "cumin", "pepper"] },
  { title: "Textiles & Garments Hub", href: "/textiles", icon: Layers, tags: ["textiles", "cotton", "yarn", "fabrics", "silk"] },
  { title: "Red Chilli Wholesale", href: "/spices/red-chilli", icon: Flame, tags: ["chilli", "guntur", "byadagi", "spices"] },
  { title: "Turmeric Exporters", href: "/spices/turmeric", icon: Flame, tags: ["turmeric", "curcumin", "salem", "spices"] },
  { title: "Cumin Seeds Suppliers", href: "/spices/cumin", icon: Flame, tags: ["cumin", "jeera", "spices"] },
  { title: "Black Pepper Wholesale", href: "/spices/black-pepper", icon: Flame, tags: ["black pepper", "tellicherry", "spices"] },
  { title: "Cotton Yarn Exporters", href: "/textiles/cotton-yarn", icon: Layers, tags: ["cotton", "yarn", "textiles"] },
  { title: "Cotton Fabrics Suppliers", href: "/textiles/cotton-fabrics", icon: Layers, tags: ["cotton", "fabrics", "textiles"] },
  { title: "Food & Beverages", href: "/food-and-beverages", icon: Building2, tags: ["food", "beverages", "agro"] },
  { title: "Agriculture & Farming", href: "/agriculture-and-farming", icon: Building2, tags: ["agriculture", "farming", "grains"] },
  { title: "Building & Construction", href: "/building-and-construction", icon: Building2, tags: ["construction", "steel", "tiles", "hardware"] },
  { title: "Industrial Machinery", href: "/industrial-plants-and-machinery", icon: Building2, tags: ["machinery", "plants", "tools"] },
  { title: "Chemicals & Dyes", href: "/chemicals-dyes-and-solvents", icon: Building2, tags: ["chemicals", "dyes", "solvents"] },
];

function getFlag(country: string): string {
  const c = (country || "").trim().toLowerCase();
  if (c.includes("india")) return "🇮🇳";
  if (c.includes("vietnam")) return "🇻🇳";
  if (c.includes("emirates") || c.includes("uae") || c.includes("dubai")) return "🇦🇪";
  if (c.includes("united states") || c.includes("usa")) return "🇺🇸";
  if (c.includes("united kingdom") || c.includes("uk")) return "🇬🇧";
  return "🌐";
}

interface NavbarSearchProps {
  isMobile?: boolean;
  className?: string;
  onSelect?: () => void;
  placeholder?: string;
}

export default function NavbarSearch({
  isMobile = false,
  className = "",
  onSelect,
  placeholder = "Search exporters, products...",
}: NavbarSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [exporters, setExporters] = useState<ExporterSearchResult[]>([]);
  const [isLoadingExporters, setIsLoadingExporters] = useState(false);
  const [hasLoadedExporters, setHasLoadedExporters] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lazy-load exporters list once user focuses or types
  const loadExporters = useCallback(async () => {
    if (hasLoadedExporters || isLoadingExporters) return;
    setIsLoadingExporters(true);
    try {
      const res = await fetch("/api/exporters");
      if (res.ok) {
        const data = await res.json();
        if (data.exporters) {
          setExporters(
            data.exporters.map((e: any) => ({
              id: e.id,
              slug: e.slug,
              companyName: e.companyName,
              country: e.country,
              productCategory: e.productCategory,
              products: Array.isArray(e.products) ? e.products.map((p: any) => ({ title: p.title })) : [],
            }))
          );
          setHasLoadedExporters(true);
        }
      }
    } catch {
      // Ignore network errors gracefully
    } finally {
      setIsLoadingExporters(false);
    }
  }, [hasLoadedExporters, isLoadingExporters]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter exporters & hubs based on query
  const trimmed = query.trim().toLowerCase();

  const matchingExporters = trimmed
    ? exporters
        .filter((e) => {
          const nameMatch = (e.companyName || "").toLowerCase().includes(trimmed);
          const catMatch = (e.productCategory || "").toLowerCase().includes(trimmed);
          const countryMatch = (e.country || "").toLowerCase().includes(trimmed);
          const prodMatch = (e.products || []).some((p) => (p.title || "").toLowerCase().includes(trimmed));
          return nameMatch || catMatch || countryMatch || prodMatch;
        })
        .slice(0, 4)
    : [];

  const matchingHubs = trimmed
    ? STATIC_HUBS.filter(
        (h) =>
          h.title.toLowerCase().includes(trimmed) ||
          h.tags.some((tag) => tag.includes(trimmed))
      ).slice(0, 3)
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmed) return;
    setIsFocused(false);
    if (onSelect) onSelect();
    router.push(`/exporters?q=${encodeURIComponent(trimmed)}`);
  };

  const handleItemClick = () => {
    setIsFocused(false);
    setQuery("");
    if (onSelect) onSelect();
  };

  const showDropdown = isFocused && trimmed.length > 0;

  return (
    <div
      ref={containerRef}
      className={`relative ${isMobile ? "w-full" : className || "w-36 lg:w-44 xl:w-48 2xl:w-60"}`}
    >
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-3.5 h-3.5 text-[var(--muted)] pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onFocus={() => {
              setIsFocused(true);
              loadExporters();
            }}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className={`w-full h-8.5 xl:h-9 pl-8 pr-8 rounded-full bg-[var(--surface-soft)] hover:bg-[var(--surface-card)] border border-[var(--hairline)] text-xs text-[var(--ink)] placeholder:text-[var(--muted)]/80 focus:bg-[var(--canvas)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-ochre)]/80 focus:border-transparent transition-all duration-200 ${
              isMobile ? "text-sm h-10 pl-9" : ""
            }`}
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="absolute right-2.5 w-4 h-4 rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] border-none bg-transparent cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          ) : (
            <span className="hidden xl:inline-block absolute right-2.5 text-[9.5px] font-bold text-[var(--muted)]/60 bg-[var(--canvas)] border border-[var(--hairline)] px-1 rounded pointer-events-none">
              ↵
            </span>
          )}
        </div>
      </form>

      {/* ── Live Search Dropdown Popover ── */}
      {showDropdown && (
        <div
          className={`absolute ${
            isMobile ? "left-0 right-0" : "right-0"
          } top-[calc(100%+6px)] w-full sm:w-[360px] md:w-[380px] bg-[var(--surface-card)] border border-[var(--hairline)] rounded-2xl shadow-[0_16px_40px_rgba(10,10,10,0.14)] p-2 z-50 overflow-hidden ${
            isMobile ? "max-h-[380px] overflow-y-auto" : "max-h-[440px] overflow-y-auto"
          }`}
        >
          {/* Header query prompt */}
          <div className="px-2.5 py-1.5 border-b border-[var(--hairline)] flex items-center justify-between text-[11px] text-[var(--muted)]">
            <span>
              Searching for &ldquo;<strong className="text-[var(--ink)]">{query}</strong>&rdquo;
            </span>
            {isLoadingExporters && (
              <span className="inline-flex items-center gap-1 text-[10px]">
                <Loader2 className="w-3 h-3 animate-spin text-amber-700" />
                <span>Checking...</span>
              </span>
            )}
          </div>

          <div className="py-1 space-y-1">
            {/* Matching Exporters Group */}
            {matchingExporters.length > 0 && (
              <div>
                <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
                  Verified Exporters ({matchingExporters.length})
                </div>
                {matchingExporters.map((exp) => (
                  <Link
                    key={exp.id || exp.slug}
                    href={`/${exp.slug}`}
                    onClick={handleItemClick}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-[var(--surface-soft)] no-underline transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-[var(--brand-ochre)]/20 text-[var(--ink)] font-bold text-xs flex items-center justify-center shrink-0 border border-[var(--brand-ochre)]/30">
                        {(exp.companyName || "E").slice(0, 1).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-[var(--ink)] group-hover:text-amber-800 transition-colors truncate">
                            {exp.companyName}
                          </span>
                          <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                        </div>
                        <div className="flex items-center gap-1.5 text-[10.5px] text-[var(--muted)] truncate">
                          <span>{getFlag(exp.country)}</span>
                          <span className="truncate">{exp.productCategory}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[var(--ink)] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            )}

            {/* Matching Hubs & Categories Group */}
            {matchingHubs.length > 0 && (
              <div className="pt-1 border-t border-[var(--hairline)]">
                <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
                  Trade Hubs &amp; Categories
                </div>
                {matchingHubs.map((hub) => {
                  const Icon = hub.icon;
                  return (
                    <Link
                      key={hub.href}
                      href={hub.href}
                      onClick={handleItemClick}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-[var(--surface-soft)] no-underline transition-colors group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-[var(--surface-soft)] border border-[var(--hairline)] text-amber-700 flex items-center justify-center shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-semibold text-[var(--ink)] group-hover:text-amber-800 transition-colors truncate">
                          {hub.title}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[var(--ink)] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  );
                })}
              </div>
            )}

            {/* No quick matches */}
            {matchingExporters.length === 0 && matchingHubs.length === 0 && (
              <div className="px-3 py-4 text-center">
                <p className="text-xs text-[var(--muted)] mb-1">
                  No instant match for &ldquo;<span className="text-[var(--ink)] font-semibold">{query}</span>&rdquo;
                </p>
                <p className="text-[11px] text-[var(--muted)]">
                  Press enter or click below to search the complete verified exporters directory.
                </p>
              </div>
            )}
          </div>

          {/* Full Directory Search CTA Footer */}
          <div className="pt-1.5 border-t border-[var(--hairline)]">
            <Link
              href={`/exporters?q=${encodeURIComponent(trimmed)}`}
              onClick={handleItemClick}
              className="flex items-center justify-between p-2 rounded-xl bg-[var(--brand-ochre)]/15 hover:bg-[var(--brand-ochre)]/25 text-amber-950 no-underline transition-colors font-bold text-xs"
            >
              <div className="flex items-center gap-2">
                <Store className="w-3.5 h-3.5 text-amber-800" />
                <span>Search all exporters for &ldquo;{query}&rdquo;</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-amber-900" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

