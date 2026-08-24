"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { UserCheck } from "lucide-react";

const navItems = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Benefits", href: "#benefits" },
  { label: "Industries", href: "#industries" },
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
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      window.location.href = `/${href}`;
      return;
    }
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
              </button>
            ))}
          </nav>
        </div>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/exporter/login"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[12.5px] font-semibold text-[var(--ink)] bg-[var(--canvas)] border border-[var(--hairline)] rounded-full no-underline cursor-pointer transition-all duration-200 hover:bg-[var(--surface-card)]"
            style={{ height: "38px" }}
          >
            <UserCheck className="w-3.5 h-3.5 text-[var(--muted)]" />
            <span>Exporter Login</span>
          </Link>

          <button
            onClick={() => scrollTo("#contact-form")}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-[var(--ink)] bg-[var(--surface-soft)] border border-[var(--hairline)] rounded-full cursor-pointer transition-all duration-200 hover:bg-[var(--surface-card)] active:scale-[0.98]"
            style={{ height: "38px" }}
          >
            Contact Sales
          </button>

          <Link
            href="/create-export-profile"
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 text-[13px] sm:text-[13.5px] font-semibold text-[var(--ink)] border-none rounded-full no-underline cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-sm"
            style={{ backgroundColor: "var(--brand-ochre)", height: "38px" }}
          >
            <span>Create Export Profile</span>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80 transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

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
                </button>
              ))}

              <div
                className="mt-3 pt-4 flex flex-col gap-3"
                style={{ borderTop: "1px solid var(--hairline)" }}
              >
                <Link
                  href="/create-export-profile"
                  onClick={() => setMobileMenu(false)}
                  className="w-full text-center py-3 rounded-xl border-none text-[14px] font-semibold text-[var(--ink)] no-underline flex items-center justify-center gap-2"
                  style={{ backgroundColor: "var(--brand-ochre)" }}
                >
                  Create Export Profile
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>

                <Link
                  href="/exporter/login"
                  onClick={() => setMobileMenu(false)}
                  className="w-full text-center py-2.5 rounded-xl border border-[var(--hairline)] bg-[var(--canvas)] text-[13.5px] font-semibold text-[var(--ink)] no-underline flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4 text-[var(--muted)]" />
                  <span>Exporter Portal Login</span>
                </Link>

                <button
                  onClick={() => scrollTo("#contact-form")}
                  className="w-full text-center py-2.5 rounded-xl border border-[var(--hairline)] bg-[var(--surface-soft)] text-[13.5px] font-semibold text-[var(--ink)] cursor-pointer"
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