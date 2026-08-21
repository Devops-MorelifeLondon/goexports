"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";


const navItems = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Benefits", href: "#benefits" },
  { label: "Industries", href: "#industries", badge: "55+" },
  { label: "Pricing", href: "#pricing" },
  { label: "Presence", href: "#presence" },
];

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenu(false);
  }, []);

  return (
    <header
      className={`sticky top-0 z-[1000] transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--canvas)]/85 backdrop-blur-md shadow-[0_4px_24px_rgba(10,10,10,0.05)] border-b border-[var(--hairline)]"
          : "bg-[var(--canvas)] border-b border-transparent"
      }`}
      style={{ height: "68px" }}
    >
      <div className="section-wrap flex items-center h-full justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="flex items-center gap-2 cursor-pointer no-underline group transition-transform duration-200 hover:scale-[1.02]"
          >
            <Image
              src="/logo/logo.png"
              alt="Goexports Logo"
              width={140}
              height={36}
              priority
              className="object-contain"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-[var(--surface-soft)] border border-[var(--hairline)]">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="relative px-4 py-1.5 rounded-full border-none bg-transparent cursor-pointer text-[13.5px] font-medium text-[var(--muted)] transition-all duration-200 hover:text-[var(--ink)] hover:bg-[var(--surface-card)] flex items-center gap-1.5"
              >
                {item.label}
                {item.badge && (
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "var(--brand-ochre)",
                      color: "var(--ink)",
                      lineHeight: "1",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo("#contact-form")}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-[13.5px] font-semibold text-[var(--on-primary)] border-none rounded-full cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: "var(--primary)", height: "38px" }}
          >
            Contact Sales
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-70 transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            className="flex lg:hidden items-center justify-center w-10 h-10 rounded-full border border-[var(--hairline)] cursor-pointer transition-colors duration-200"
            style={{
              backgroundColor: mobileMenu ? "var(--ink)" : "var(--surface-card)",
              color: mobileMenu ? "#ffffff" : "var(--ink)",
            }}
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle menu"
          >
            {mobileMenu ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Animated Drawer */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden absolute top-[68px] left-0 right-0 z-50 bg-[var(--canvas)] border-b border-[var(--hairline)] shadow-[0_16px_36px_rgba(10,10,10,0.08)]"
          >
            <div className="section-wrap py-5 flex flex-col gap-1.5">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className="text-left px-4 py-3 rounded-xl border-none bg-transparent cursor-pointer transition-all duration-200 hover:bg-[var(--surface-card)] flex items-center justify-between text-[14.5px] font-semibold text-[var(--ink)]"
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: "var(--brand-ochre)",
                        color: "var(--ink)",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}

              <div
                className="mt-3 pt-4 flex flex-col gap-3"
                style={{ borderTop: "1px solid var(--hairline)" }}
              >
                <button
                  onClick={() => scrollTo("#contact-form")}
                  className="w-full text-center py-3 rounded-xl border-none text-[14px] font-semibold text-[var(--on-primary)] cursor-pointer"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}