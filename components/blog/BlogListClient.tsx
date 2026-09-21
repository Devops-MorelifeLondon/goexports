"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Clock,
  Calendar,
  ArrowRight,
  BookOpen,
  Sparkles,
  Layers,
  FileCheck2,
  HelpCircle,
  X,
  Compass,
} from "lucide-react";
import { BlogPost, BlogCategory } from "@/lib/blogs";

interface BlogListClientProps {
  initialBlogs: BlogPost[];
  categories: BlogCategory[];
}

export default function BlogListClient({ initialBlogs, categories }: BlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filtered blogs based on category and search
  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" ||
        post.categorySlug === selectedCategory ||
        post.category.toLowerCase() === selectedCategory.toLowerCase();

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        post.title.toLowerCase().includes(q) ||
        post.introduction.toLowerCase().includes(q) ||
        post.primaryKeyword.toLowerCase().includes(q) ||
        post.secondaryKeywords.some((k) => k.toLowerCase().includes(q)) ||
        post.metaDescription.toLowerCase().includes(q)
      );
    });
  }, [initialBlogs, selectedCategory, searchQuery]);

  // Featured post: The flagship starting guide or the first post in initial list
  const featuredPost = useMemo(() => {
    const flagship = initialBlogs.find(
      (b) => b.slug === "how-to-start-an-export-business-in-india"
    );
    return flagship || initialBlogs[0];
  }, [initialBlogs]);

  // When no category or search is active, show the featured post at top and the rest below
  const showFeaturedHero = selectedCategory === "all" && !searchQuery.trim() && featuredPost;
  const gridBlogs = showFeaturedHero
    ? filteredBlogs.filter((b) => b.id !== featuredPost.id)
    : filteredBlogs;

  return (
    <div className="space-y-12">
      {/* ── Search & Filter Controls ── */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-6 border-b border-[var(--hairline)]">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-soft)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides by keyword, topic, document, HS code, Incoterm..."
            className="w-full pl-10 pr-10 py-3 rounded-full text-xs sm:text-[13.5px] bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--ink)] placeholder:text-[var(--muted-soft)] focus:outline-none focus:border-[var(--brand-ochre)] focus:bg-[var(--canvas)] transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[var(--hairline)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] border-none cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Counter */}
        <div className="text-xs font-semibold text-[var(--muted)] flex items-center gap-2">
          <span>Showing</span>
          <span className="px-2 py-0.5 rounded-full bg-[var(--surface-card)] text-[var(--ink)] font-bold">
            {filteredBlogs.length}
          </span>
          <span>of {initialBlogs.length} Guides</span>
        </div>
      </div>

      {/* ── Category Pill Tabs ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-all shrink-0 flex items-center gap-1.5 ${
            selectedCategory === "all"
              ? "bg-[var(--primary)] text-white shadow-2xs"
              : "bg-[var(--surface-soft)] hover:bg-[var(--surface-card)] text-[var(--muted)] hover:text-[var(--ink)] border border-[var(--hairline)]"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Guides</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
            selectedCategory === "all" ? "bg-white/20 text-white" : "bg-[var(--hairline)] text-[var(--ink)]"
          }`}>
            {initialBlogs.length}
          </span>
        </button>

        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-all shrink-0 flex items-center gap-1.5 ${
                isSelected
                  ? "bg-[var(--primary)] text-white shadow-2xs"
                  : "bg-[var(--surface-soft)] hover:bg-[var(--surface-card)] text-[var(--muted)] hover:text-[var(--ink)] border border-[var(--hairline)]"
              }`}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: cat.color }}
              />
              <span>{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isSelected ? "bg-white/20 text-white" : "bg-[var(--hairline)] text-[var(--ink)]"
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Spotlight / Featured Article (Shown when no filters) ── */}
      {showFeaturedHero && (
        <div className="relative rounded-3xl border border-[var(--hairline)] bg-gradient-to-br from-[var(--surface-card)] via-[var(--surface-soft)] to-[var(--canvas)] p-6 sm:p-8 md:p-10 shadow-[0_12px_40px_rgba(10,10,10,0.04)] overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--brand-ochre)]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[var(--brand-ochre)] text-[var(--ink)] shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  Featured Trade Guide
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--surface-strong)] text-[var(--ink)]">
                  {featuredPost.category}
                </span>
                <span className="text-xs text-[var(--muted)] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredPost.readTimeMinutes} min read
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--ink)] leading-[1.2]">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="text-[var(--ink)] hover:text-amber-800 no-underline transition-colors"
                >
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="text-[15px] sm:text-[16px] text-[var(--body)] leading-relaxed line-clamp-3">
                {featuredPost.introduction}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {featuredPost.secondaryKeywords.slice(0, 4).map((kw, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--muted)]"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold no-underline shadow-sm transition-transform active:scale-[0.98]"
                style={{ backgroundColor: "var(--brand-ochre)", color: "var(--ink)" }}
              >
                <span>Read Full Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex items-center gap-2 text-xs text-[var(--muted)] px-2">
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Includes 20 Expert Q&amp;As</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Articles Grid ── */}
      {gridBlogs.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-[var(--surface-soft)] border border-[var(--hairline)] space-y-4">
          <div className="w-12 h-12 rounded-full bg-[var(--surface-card)] flex items-center justify-center mx-auto text-[var(--muted)]">
            <Search className="w-6 h-6 text-[var(--muted-soft)]" />
          </div>
          <h3 className="text-lg font-bold text-[var(--ink)] m-0">
            No guides found
          </h3>
          <p className="text-xs sm:text-sm text-[var(--muted)] max-w-md mx-auto m-0">
            We couldn&apos;t find any articles matching &ldquo;{searchQuery}&rdquo;. Try another keyword or clear your filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="px-5 py-2.5 rounded-full text-xs font-bold bg-[var(--primary)] text-white border-none cursor-pointer transition-opacity hover:opacity-90"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridBlogs.map((post) => (
            <article
              key={post.id}
              className="flex flex-col justify-between rounded-2xl border border-[var(--hairline)] bg-[var(--surface-card)]/70 hover:bg-[var(--surface-card)] hover:border-[var(--brand-ochre)]/60 transition-all duration-200 hover:-translate-y-1 shadow-2xs hover:shadow-[0_12px_28px_rgba(10,10,10,0.06)] p-5 sm:p-6 group"
            >
              <div className="space-y-3.5">
                {/* Meta Top: Category & Read Time */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-[var(--surface-soft)] text-[var(--ink)] border border-[var(--hairline)]">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-[var(--muted)] font-medium">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTimeMinutes} min</span>
                  </div>
                </div>

                {/* Article Title */}
                <h3 className="text-[17.5px] sm:text-[18.5px] font-bold tracking-tight text-[var(--ink)] leading-snug m-0 group-hover:text-amber-800 transition-colors line-clamp-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[var(--ink)] group-hover:text-amber-800 no-underline"
                  >
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-[var(--muted)] m-0 line-clamp-3">
                  {post.introduction}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.secondaryKeywords.slice(0, 2).map((kw, idx) => (
                    <span
                      key={idx}
                      className="text-[10.5px] font-medium px-2 py-0.5 rounded-md bg-[var(--surface-soft)] text-[var(--muted)]"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Footer: Date & Read Link */}
              <div className="pt-4 mt-5 border-t border-[var(--hairline)]/70 flex items-center justify-between text-xs">
                <span className="text-[11px] text-[var(--muted-soft)] font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.publishedDate}
                </span>

                <Link
                  href={`/blog/${post.slug}`}
                  className="font-bold text-[var(--ink)] group-hover:text-amber-800 no-underline inline-flex items-center gap-1 text-xs"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
