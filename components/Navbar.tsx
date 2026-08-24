"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCheck,
  Building2,
  Edit3,
  Globe,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  ShieldCheck
} from "lucide-react";
import { toast } from "sonner";

const navItems = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Benefits", href: "#benefits" },
  { label: "Industries", href: "#industries" },
  { label: "Pricing", href: "#pricing" },
  { label: "Presence", href: "#presence" },
];

export default function Navbar() {
  const router = useRouter();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [exporterUser, setExporterUser] = useState<any>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync auth state
  const syncAuthState = () => {
    try {
      const stored = localStorage.getItem("exporter_user");
      if (stored) {
        setExporterUser(JSON.parse(stored));
      } else {
        setExporterUser(null);
      }
    } catch {
      setExporterUser(null);
    }
  };

  useEffect(() => {
    syncAuthState();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    const handleAuthChange = () => {
      syncAuthState();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("exporter_auth_change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("exporter_auth_change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/exporter/logout", { method: "POST" });
      localStorage.removeItem("exporter_user");
      localStorage.removeItem("exporter_token");
      setExporterUser(null);
      setUserDropdownOpen(false);
      window.dispatchEvent(new Event("exporter_auth_change"));
      toast.success("Logged out successfully");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Logout failed");
    }
  };

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
          {/* Exporter Authenticated User Menu */}
          {exporterUser ? (
            <div className="relative hidden sm:block" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[12.5px] font-bold text-[var(--ink)] bg-[var(--surface-card)] border border-[var(--hairline)] rounded-full cursor-pointer hover:bg-[var(--surface-soft)] transition-colors shadow-2xs"
                style={{ height: "38px" }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold text-[var(--ink)]"
                  style={{ backgroundColor: "var(--brand-ochre)" }}
                >
                  {exporterUser.companyName ? exporterUser.companyName.slice(0, 1).toUpperCase() : "E"}
                </div>
                <span className="max-w-[130px] truncate">{exporterUser.companyName || "My Portal"}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[var(--muted)] transition-transform duration-200 ${userDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-[44px] w-56 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-card)] shadow-[0_12px_36px_rgba(10,10,10,0.12)] p-2 z-50 space-y-1"
                  >
                    <div className="px-3 py-2 border-b border-[var(--hairline)] mb-1">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Signed in as</span>
                      <span className="block text-xs font-bold text-[var(--ink)] truncate">{exporterUser.companyName}</span>
                    </div>

                    <Link
                      href="/exporter/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[var(--ink)] hover:bg-[var(--canvas)] no-underline transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[var(--brand-ochre)]" />
                      <span>Exporter Dashboard</span>
                    </Link>

                    <Link
                      href="/exporter/profile?tab=edit"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[var(--ink)] hover:bg-[var(--canvas)] no-underline transition-colors"
                    >
                      <Edit3 className="w-4 h-4 text-sky-600" />
                      <span>Edit My Profile</span>
                    </Link>

                    <Link
                      href={`/${exporterUser.slug || exporterUser.id}`}
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[var(--ink)] hover:bg-[var(--canvas)] no-underline transition-colors"
                    >
                      <Globe className="w-4 h-4 text-emerald-600" />
                      <span>Public Storefront</span>
                    </Link>

                    <div className="border-t border-[var(--hairline)] my-1" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border-none bg-transparent cursor-pointer transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/exporter/login"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[12.5px] font-semibold text-[var(--ink)] bg-[var(--canvas)] border border-[var(--hairline)] rounded-full no-underline cursor-pointer transition-all duration-200 hover:bg-[var(--surface-card)]"
              style={{ height: "38px" }}
            >
              <UserCheck className="w-3.5 h-3.5 text-[var(--muted)]" />
              <span>Exporter Login</span>
            </Link>
          )}

          <button
            onClick={() => scrollTo("#contact-form")}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-[var(--ink)] bg-[var(--surface-soft)] border border-[var(--hairline)] rounded-full cursor-pointer transition-all duration-200 hover:bg-[var(--surface-card)] active:scale-[0.98]"
            style={{ height: "38px" }}
          >
            Contact Sales
          </button>

          <Link
            href={exporterUser ? "/exporter/profile" : "/create-export-profile"}
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 text-[13px] sm:text-[13.5px] font-semibold text-[var(--ink)] border-none rounded-full no-underline cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-sm"
            style={{ backgroundColor: "var(--brand-ochre)", height: "38px" }}
          >
            <span>{exporterUser ? "My Exporter Hub" : "Create Export Profile"}</span>
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
              {exporterUser && (
                <div className="p-3 rounded-2xl bg-[var(--surface-soft)] border border-[var(--hairline)] mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[var(--ink)]"
                      style={{ backgroundColor: "var(--brand-ochre)" }}
                    >
                      {exporterUser.companyName ? exporterUser.companyName.slice(0, 1).toUpperCase() : "E"}
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-[var(--ink)] truncate max-w-[180px]">{exporterUser.companyName}</span>
                      <span className="block text-[10px] text-[var(--muted)]">Verified Exporter</span>
                    </div>
                  </div>
                  <Link
                    href="/exporter/profile"
                    onClick={() => setMobileMenu(false)}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-[var(--ink)] bg-[var(--brand-ochre)] no-underline"
                  >
                    Portal →
                  </Link>
                </div>
              )}

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
                {exporterUser ? (
                  <>
                    <Link
                      href="/exporter/profile?tab=edit"
                      onClick={() => setMobileMenu(false)}
                      className="w-full text-center py-3 rounded-xl border-none text-[14px] font-semibold text-[var(--ink)] no-underline flex items-center justify-center gap-2"
                      style={{ backgroundColor: "var(--brand-ochre)" }}
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit My Profile</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-center py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-[13.5px] font-semibold text-rose-700 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                )}

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