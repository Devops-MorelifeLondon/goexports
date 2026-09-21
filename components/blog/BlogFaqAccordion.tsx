"use client";

import { useState, useMemo } from "react";
import { ChevronDown, HelpCircle, Search, Check, Sparkles } from "lucide-react";
import { BlogFaq } from "@/lib/blogs";

interface BlogFaqAccordionProps {
  faqs: BlogFaq[];
}

export default function BlogFaqAccordion({ faqs }: BlogFaqAccordionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0]));
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFaq = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const expandAll = () => {
    setOpenIndices(new Set(faqs.map((_, i) => i)));
  };

  const collapseAll = () => {
    setOpenIndices(new Set());
  };

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) {
      return faqs.map((faq, originalIndex) => ({ ...faq, originalIndex }));
    }
    const q = searchQuery.toLowerCase().trim();
    return faqs
      .map((faq, originalIndex) => ({ ...faq, originalIndex }))
      .filter(
        (faq) =>
          faq.question.toLowerCase().includes(q) ||
          faq.answer.toLowerCase().includes(q)
      );
  }, [faqs, searchQuery]);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="mt-14 pt-8 border-t border-[var(--hairline)]" id="frequently-asked-questions">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-800 border border-amber-500/20 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>Expert Q&amp;A Hub</span>
          </div>
          <h2 className="text-[24px] sm:text-[28px] font-bold text-[var(--ink)] tracking-tight m-0">
            Frequently Asked Questions
          </h2>
          <p className="text-[14.5px] text-[var(--muted)] mt-1 m-0">
            {faqs.length} authoritative questions answered by trade compliance specialists.
          </p>
        </div>

        {/* Toggle all */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="px-3 py-1.5 text-xs font-semibold rounded-full border border-[var(--hairline)] bg-[var(--surface-soft)] hover:bg-[var(--surface-card)] text-[var(--ink)] cursor-pointer transition-colors"
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="px-3 py-1.5 text-xs font-semibold rounded-full border border-[var(--hairline)] bg-[var(--surface-soft)] hover:bg-[var(--surface-card)] text-[var(--muted)] hover:text-[var(--ink)] cursor-pointer transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Search Input for FAQs */}
      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-soft)]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search across ${faqs.length} questions (e.g. IEC, GST, CIF, payment, port)...`}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-[13.5px] bg-[var(--surface-soft)] border border-[var(--hairline)] text-[var(--ink)] placeholder:text-[var(--muted-soft)] focus:outline-none focus:border-[var(--brand-ochre)] focus:bg-[var(--canvas)] transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--muted)] hover:text-[var(--ink)] border-none bg-transparent cursor-pointer font-bold"
          >
            Clear
          </button>
        )}
      </div>

      {/* List of FAQs */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-8 rounded-2xl bg-[var(--surface-soft)] border border-[var(--hairline)]">
            <p className="text-xs sm:text-sm text-[var(--muted)] m-0">
              No questions matched &ldquo;{searchQuery}&rdquo;. Try another search term.
            </p>
          </div>
        ) : (
          filteredFaqs.map(({ question, answer, originalIndex }) => {
            const isOpen = openIndices.has(originalIndex);
            return (
              <div
                key={originalIndex}
                className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface-soft)] overflow-hidden transition-all duration-150"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(originalIndex)}
                  aria-expanded={isOpen}
                  className="w-full px-4 sm:px-5 py-3.5 sm:py-4 text-left border-none bg-transparent cursor-pointer flex items-center justify-between gap-3 hover:bg-[var(--surface-card)] transition-colors"
                >
                  <span className="text-[14.5px] sm:text-[15.5px] font-bold text-[var(--ink)] leading-snug">
                    {question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[var(--surface-card)] border border-[var(--hairline)] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[var(--brand-ochre)]/20" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 text-[var(--ink)]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 pt-1 border-t border-[var(--hairline)]/60 bg-[var(--canvas)]">
                    <p className="text-[14px] sm:text-[14.5px] leading-relaxed text-[var(--body)] m-0">
                      {answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
