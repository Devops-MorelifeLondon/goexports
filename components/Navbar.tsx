"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const WhatsAppIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

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
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-[13.5px] font-semibold text-[var(--body-strong)] border-none bg-transparent rounded-full cursor-pointer transition-all duration-200 hover:text-[var(--ink)] hover:bg-[var(--surface-card)]"
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

          {/* WhatsApp CTA with Pulse */}
          <a
            href="https://api.whatsapp.com/send/?phone=917042059572&text=I+would+like+to+consult+with+Goexports(FinacBooks))&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 no-underline transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-sm shadow-emerald-600/20"
            style={{
              padding: "9px 16px",
              height: "38px",
              backgroundColor: "#25D366",
              color: "#ffffff",
              fontSize: "13.5px",
              fontWeight: 600,
              borderRadius: "var(--r-pill)",
            }}
          >
            <WhatsAppIcon />
            <span>Chat Online</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </a>

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
                  className="w-full text-center py-3 rounded-xl border border-[var(--hairline)] bg-[var(--surface-card)] text-[14px] font-semibold text-[var(--ink)] cursor-pointer"
                >
                  Contact Sales
                </button>
                <a
                  href="https://api.whatsapp.com/send/?phone=917042059572&text=I+would+like+to+consult+with+Goexports(FinacBooks))&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-[14px]"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <WhatsAppIcon />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}