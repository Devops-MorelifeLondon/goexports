"use client";

import { useEffect, useState } from "react";
import { ListOrdered, ChevronRight } from "lucide-react";
import { BlogTableOfContentsItem } from "@/lib/blogs";

interface BlogTableOfContentsProps {
  items: BlogTableOfContentsItem[];
}

export default function BlogTableOfContents({ items }: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [readingProgress, setReadingProgress] = useState<number>(0);

  useEffect(() => {
    if (!items.length) return;

    // Scroll progress handler
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(Math.round(progress));
      }

      // Check which heading is currently active
      const headingElements = items
        .map((item) => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null);

      const scrollPos = window.scrollY + 140;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el.offsetTop <= scrollPos) {
          setActiveId(el.id);
          return;
        }
      }

      if (headingElements.length > 0) {
        setActiveId(headingElements[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  if (!items || items.length === 0) return null;

  // Filter mainly to level 2 (H2) for a crisp, scannable table of contents
  const visibleItems = items.filter((item) => item.level === 2);
  const displayItems = visibleItems.length > 0 ? visibleItems : items;

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface-soft)] p-4 sm:p-5 shadow-2xs">
      {/* Header & Reading Progress */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--hairline)] mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[var(--brand-ochre)]/20 text-[var(--ink)] flex items-center justify-center text-xs">
            <ListOrdered className="w-3.5 h-3.5 text-amber-800" />
          </div>
          <span className="text-[13px] font-bold text-[var(--ink)] uppercase tracking-wider">
            In This Guide
          </span>
        </div>
        <span className="text-[11px] font-bold text-[var(--muted)]">
          {readingProgress}% read
        </span>
      </div>

      {/* Mini Progress Bar */}
      <div className="w-full bg-[var(--hairline)] h-1 rounded-full overflow-hidden mb-3.5">
        <div
          className="bg-[var(--brand-ochre)] h-full transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Headings List */}
      <nav aria-label="Table of contents" className="max-h-[380px] overflow-y-auto pr-1 space-y-1 text-xs">
        {displayItems.map((item, idx) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={`w-full text-left px-2.5 py-1.5 rounded-xl border-none bg-transparent cursor-pointer transition-all duration-150 flex items-start gap-2 group ${
                isActive
                  ? "bg-[var(--surface-card)] text-[var(--ink)] font-bold shadow-2xs"
                  : "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-card)]/50"
              }`}
            >
              <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                isActive ? "bg-[var(--primary)] text-white" : "text-[var(--muted-soft)]"
              }`}>
                {idx + 1}
              </span>
              <span className="flex-1 leading-snug line-clamp-2">
                {item.title}
              </span>
              {isActive && (
                <ChevronRight className="w-3.5 h-3.5 text-[var(--brand-ochre)] shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
