"use client";

import { useState, useEffect } from "react";
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

  // Pure React Typing Effect Engine
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
          <span
            className={isComplete ? "text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-white" : ""}
          >
            {typedKeyword}
          </span>
        )}
        {typedDot}
        {showCursor && (
          <span className="inline-block w-[3px] h-[0.85em] bg-white ml-[2px] align-middle animate-pulse" />
        )}
      </span>
    );
  };

  return (
    // Fits EXACTLY in the remaining height under the 64px navbar.
    <section className="h-[calc(100vh-64px)] min-h-[580px] text-white relative flex items-center">
      <div className="max-w-[1200px] mx-auto w-full px-6 py-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          
          <div className="flex-[1.2] text-center lg:text-left">
            <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-0.5 text-[12px] font-semibold text-white mb-3">
               Buyer Lead Generation
            </div>

            <h1 className="text-[32px] lg:text-[44px] font-extrabold leading-[1.1] tracking-tight mb-3 text-white">
              {lines.map((_, i) => (
                <span key={i} className="block">{renderLine(i)}</span>
              ))}
            </h1>

            <p className="text-base lg:text-lg leading-snug text-white/80 max-w-[520px] mb-2 mx-auto lg:mx-0">
       Verified Global Buyers from 190+ Countries
            </p>

            <p className="text-base lg:text-lg leading-snug text-white/80 max-w-[520px] mb-6 mx-auto lg:mx-0">
               Get access to verified buyer leads from around the world. Accelerate your international sales.
            </p>

            <div>
              <a
                href="https://api.whatsapp.com/send/?phone=917042059572&text=I+would+like+to+consult+with+Goexports(FinacBooks))&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold text-[14px] rounded-full no-underline transition-transform duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-[#25D366]/30"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat with us
              </a>
            </div>
          </div>

          <GetInTouchForm />
        </div>
      </div>
    </section>
  );
}