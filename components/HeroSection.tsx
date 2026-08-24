"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GetInTouchForm from "./GetInTouchForm";

const lines = [
  { prefix: "Get ", keyword: "Buyer Leads" },
  { prefix: "Find ", keyword: "Verified Buyers" },
  { prefix: "Connect ", keyword: "Globally" },
];

export default function HeroSection() {
  const [currentLine, setCurrentLine] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<number[]>([]);
  const [phase, setPhase] = useState<"typing" | "paused" | "deleting">("typing");

  useEffect(() => {
    if (phase === "typing" && currentLine >= lines.length) {
      const timeout = setTimeout(() => {
        setPhase("deleting");
        setCurrentLine(lines.length - 1);
        setCharIndex((lines[lines.length - 1].prefix + lines[lines.length - 1].keyword + ".").length);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    if (phase === "typing") {
      const fullText = lines[currentLine].prefix + lines[currentLine].keyword + ".";
      if (charIndex < fullText.length) {
        const timeout = setTimeout(() => setCharIndex((prev) => prev + 1), 70);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCompletedLines((prev) => [...prev, currentLine]);
          setCurrentLine((prev) => prev + 1);
          setCharIndex(0);
        }, 400);
        return () => clearTimeout(timeout);
      }
    }

    if (phase === "deleting") {
      if (charIndex > 0) {
        const timeout = setTimeout(() => setCharIndex((prev) => prev - 1), 40);
        return () => clearTimeout(timeout);
      } else {
        setCompletedLines((prev) => prev.filter((l) => l !== currentLine));
        if (currentLine > 0) {
          const prevLine = currentLine - 1;
          setCurrentLine(prevLine);
          setCharIndex((lines[prevLine].prefix + lines[prevLine].keyword + ".").length);
        } else {
          const timeout = setTimeout(() => {
            setPhase("typing");
            setCurrentLine(0);
            setCharIndex(0);
            setCompletedLines([]);
          }, 500);
          return () => clearTimeout(timeout);
        }
      }
    }
  }, [charIndex, currentLine, phase]);

  const getDisplayText = (lineIndex: number) => {
    const full = lines[lineIndex].prefix + lines[lineIndex].keyword + ".";
    if (lineIndex === currentLine) return full.slice(0, charIndex);
    if (completedLines.includes(lineIndex)) return full;
    return "";
  };

  const renderLine = (lineIndex: number) => {
    const text = getDisplayText(lineIndex);
    const { prefix, keyword } = lines[lineIndex];
    const isActive = lineIndex === currentLine;
    const isComplete = completedLines.includes(lineIndex) && !isActive;
    const showCursor = isActive;

    if (!isComplete && !isActive) return <span className="block h-[1.15em]">&nbsp;</span>;
    if (text.length === 0 && !showCursor) return <span className="block h-[1.15em]">&nbsp;</span>;

    const prefixEnd = prefix.length;
    const keywordEnd = prefix.length + keyword.length;
    const typedPrefix = text.slice(0, Math.min(text.length, prefixEnd));
    const typedKeyword = text.length > prefixEnd ? text.slice(prefixEnd, Math.min(text.length, keywordEnd)) : "";
    const typedDot = text.length > keywordEnd ? "." : "";

    return (
      <span className="block">
        {typedPrefix}
        {typedKeyword && (
          <span style={{ color: isComplete ? "var(--brand-ochre)" : "var(--ink)" }}>
            {typedKeyword}
          </span>
        )}
        {typedDot}
        {showCursor && (
          <span
            className="inline-block w-[3px] h-[0.85em] ml-[2px] align-middle animate-pulse"
            style={{ backgroundColor: "var(--brand-ochre)" }}
          />
        )}
      </span>
    );
  };

  return (
    <section
      className="min-h-[calc(100vh-64px)] flex items-center"
      style={{
        backgroundColor: "var(--canvas)",
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
      }}
    >
      <div className="section-wrap w-full">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

          {/* ── Left: Headline + CTA ── */}
          <div className="flex-[1.3] text-center lg:text-left">

            {/* Highlighted Badge */}
            <div className="mb-6 flex justify-center lg:justify-start">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 text-[15px] font-semibold"
                style={{
                  color: "var(--primary)",
                  backgroundColor: "var(--surface-soft)",
                  borderRadius: "var(--r-md)",
                  border: "1px solid var(--hairline)",
                  lineHeight: 1.2,
                }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                Verified International Buyers & Global Trade Directory
              </span>
            </div>

            {/* H1 */}
            <h1
              className="mb-6 display-xl"
              style={{
                fontSize: "clamp(40px, 6vw, 72px)",
                fontWeight: 500,
                lineHeight: 1.0,
                letterSpacing: "-2.5px",
                color: "var(--ink)",
              }}
            >
              {lines.map((_, i) => (
                <span key={i} className="block">{renderLine(i)}</span>
              ))}
            </h1>
            <p
              className="mb-10 max-w-[480px] mx-auto lg:mx-0"
              style={{
                fontSize: "16px",
                fontWeight: 400,
                color: "var(--muted)",
                lineHeight: 1.6,
              }}
            >
              Get access to verified buyer leads from around the world. Accelerate your international sales.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href="#contact-form"
                className="btn-primary"
              >
                Get Buyer Leads
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <Link
                href="/create-export-profile"
                className="btn-secondary"
              >
                Create Export Profile
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>


          </div>

          {/* ── Right: Form ── */}
          <GetInTouchForm />
        </div>
      </div>
    </section>
  );
}