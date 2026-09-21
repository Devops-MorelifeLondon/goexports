import React from "react";
import { slugifyText } from "@/lib/blogs";
import { CheckCircle2, AlertCircle, Bookmark, ExternalLink } from "lucide-react";

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  if (!content) return null;

  // Split into lines/blocks
  const rawLines = content.split("\n");
  const blocks: React.ReactNode[] = [];

  let currentList: { type: "ul" | "ol"; items: string[] } | null = null;
  let blockKey = 0;
  const seenIds = new Set<string>();

  const getHeadingId = (title: string): string => {
    const cleanTitle = title.replace(/\*\*/g, "").trim();
    let baseId = slugifyText(cleanTitle);
    if (!baseId) baseId = "section";
    let uniqueId = baseId;
    let counter = 1;
    while (seenIds.has(uniqueId)) {
      uniqueId = `${baseId}-${counter}`;
      counter++;
    }
    seenIds.add(uniqueId);
    return uniqueId;
  };

  const flushList = () => {
    if (!currentList) return;
    const isUl = currentList.type === "ul";
    const items = currentList.items;
    currentList = null;

    blocks.push(
      <div key={`list-${blockKey++}`} className="my-5 pl-1">
        {isUl ? (
          <ul className="space-y-2.5 list-none p-0 m-0">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-[15.5px] leading-relaxed text-[var(--body-strong)]">
                <span className="w-5 h-5 rounded-full bg-[var(--brand-ochre)]/20 text-[var(--ink)] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                </span>
                <span className="flex-1">{renderFormattedInline(item)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <ol className="space-y-3 list-none p-0 m-0">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-[15.5px] leading-relaxed text-[var(--body-strong)]">
                <span className="w-6 h-6 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-2xs mt-0.5">
                  {idx + 1}
                </span>
                <span className="flex-1">{renderFormattedInline(item)}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    );
  };

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      continue;
    }

    // Check for H2
    if (trimmed.startsWith("## ")) {
      flushList();
      const rawTitle = trimmed.replace(/^##\s+/, "");
      const cleanTitle = rawTitle.replace(/\*\*/g, "").trim();
      const id = getHeadingId(cleanTitle);

      // Check if title has "Step X:"
      const isStep = /^step\s+\d+/i.test(cleanTitle);
      const stepMatch = cleanTitle.match(/^(step\s+\d+):\s*(.*)/i);

      blocks.push(
        <div key={`h2-${blockKey++}`} id={id} className="scroll-mt-28 mt-12 mb-5 pt-4 border-t border-[var(--hairline)] first:border-t-0 first:mt-0">
          <div className="flex items-start justify-between gap-3 group">
            <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-[var(--ink)] leading-snug m-0 flex items-center flex-wrap gap-2.5">
              {isStep && stepMatch ? (
                <>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-[var(--brand-ochre)] text-[var(--ink)] shadow-2xs">
                    {stepMatch[1]}
                  </span>
                  <span>{stepMatch[2]}</span>
                </>
              ) : (
                <span>{cleanTitle}</span>
              )}
            </h2>
            <a
              href={`#${id}`}
              className="text-[var(--muted-soft)] hover:text-[var(--ink)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1"
              aria-label={`Link to ${cleanTitle}`}
            >
              #
            </a>
          </div>
        </div>
      );
      continue;
    }

    // Check for H3
    if (trimmed.startsWith("### ")) {
      flushList();
      const rawTitle = trimmed.replace(/^###\s+/, "");
      const cleanTitle = rawTitle.replace(/\*\*/g, "").trim();
      const id = getHeadingId(cleanTitle);

      blocks.push(
        <div key={`h3-${blockKey++}`} id={id} className="scroll-mt-28 mt-7 mb-3">
          <h3 className="text-[19px] sm:text-[21px] font-bold text-[var(--ink)] leading-snug m-0 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-ochre)] shrink-0"></span>
            <span>{cleanTitle}</span>
          </h3>
        </div>
      );
      continue;
    }

    // Check for Bullet List: starts with "- " or "* "
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const itemText = trimmed.replace(/^[-*]\s+/, "");
      if (!currentList || currentList.type !== "ul") {
        flushList();
        currentList = { type: "ul", items: [] };
      }
      currentList.items.push(itemText);
      continue;
    }

    // Check for Numbered List: starts with "1. ", "2. ", etc.
    const numberedMatch = trimmed.match(/^\d+\.\s+(.*)/);
    if (numberedMatch) {
      const itemText = numberedMatch[1];
      if (!currentList || currentList.type !== "ol") {
        flushList();
        currentList = { type: "ol", items: [] };
      }
      currentList.items.push(itemText);
      continue;
    }

    // If continuing an existing list item or encountering paragraph
    flushList();

    // Check if this paragraph is a special advisory/pro-tip callout
    const isCallout =
      trimmed.toLowerCase().startsWith("leadforce") ||
      trimmed.toLowerCase().startsWith("note:") ||
      trimmed.toLowerCase().startsWith("important:") ||
      trimmed.toLowerCase().startsWith("strategic advisory:") ||
      trimmed.toLowerCase().startsWith("pro tip:");

    if (isCallout) {
      blocks.push(
        <div
          key={`callout-${blockKey++}`}
          className="my-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50/80 to-[var(--surface-soft)] border border-amber-200/70 shadow-2xs"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
              <Bookmark className="w-4 h-4 text-amber-700" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-amber-800 mb-1">
                Strategic Advisory &amp; Compliance Insight
              </span>
              <p className="text-[14.5px] sm:text-[15px] leading-relaxed text-[var(--body-strong)] m-0 font-medium">
                {renderFormattedInline(trimmed)}
              </p>
            </div>
          </div>
        </div>
      );
      continue;
    }

    // Standard paragraph
    blocks.push(
      <p
        key={`p-${blockKey++}`}
        className="text-[16px] sm:text-[16.5px] leading-[1.75] text-[var(--body)] my-4 font-normal"
      >
        {renderFormattedInline(trimmed)}
      </p>
    );
  }

  flushList();

  return <div className="article-body font-sans">{blocks}</div>;
}

// Inline formatting helper for **bold** and `code`
function renderFormattedInline(text: string): React.ReactNode {
  if (!text) return "";

  // Split by bold (**text**)
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const boldContent = part.slice(2, -2);
      return (
        <strong key={index} className="font-semibold text-[var(--ink)]">
          {boldContent}
        </strong>
      );
    }
    return part;
  });
}
