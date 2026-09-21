"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCheck,
  Building2,
  Edit3,
  Globe,
  LogOut,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  ShieldCheck,
  Menu,
  X,
  Sparkles,
  TrendingUp,
  Boxes,
  CreditCard,
  MapPin,
  Mail,
  UserPlus,
  ArrowRight,
  ArrowUpRight,
  Truck,
  Flame,
  Layers,
  BookOpen
} from "lucide-react";
import { toast } from "sonner";

const navItems = [
  { label: "How It Works", href: "#how-it-works", icon: Sparkles },
  { label: "Industries", href: "#industries", icon: Boxes },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Pricing", href: "#pricing", icon: CreditCard },
  { label: "Presence", href: "#presence", icon: MapPin },
  {
    label: "Shipping",
    href: "https://shipglobal.in/partner/goexports/",
    icon: Truck,
    isExternal: true,
    badge: "Partner",
  },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [exporterUser, setExporterUser] = useState<any>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [importersDropdownOpen, setImportersDropdownOpen] = useState(false);
  const importersDropdownRef = useRef<HTMLDivElement>(null);

  // Sync auth state
  const syncAuthState = useCallback(() => {
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
  }, []);

  useEffect(() => {
    syncAuthState();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleAuthChange = () => {
      syncAuthState();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (importersDropdownRef.current && !importersDropdownRef.current.contains(e.target as Node)) {
        setImportersDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenu(false);
        setUserDropdownOpen(false);
        setImportersDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("exporter_auth_change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("exporter_auth_change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [syncAuthState]);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenu]);

  // Close menu on route changes
  useEffect(() => {
    setMobileMenu(false);
    setUserDropdownOpen(false);
    setImportersDropdownOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/exporter/logout", { method: "POST" });
      localStorage.removeItem("exporter_user");
      localStorage.removeItem("exporter_token");
      setExporterUser(null);
      setUserDropdownOpen(false);
      setMobileMenu(false);
      window.dispatchEvent(new Event("exporter_auth_change"));
      toast.success("Logged out successfully");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Logout failed");
    }
  };

  const scrollTo = useCallback((href: string) => {
    if (href.startsWith("/")) {
      router.push(href);
      setMobileMenu(false);
      return;
    }
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      window.location.href = `/${href}`;
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenu(false);
  }, [router]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenu
            ? "bg-[var(--canvas)]/92 backdrop-blur-md shadow-[0_4px_24px_rgba(10,10,10,0.06)] border-b border-[var(--hairline)]"
            : "bg-[var(--canvas)] border-b border-[var(--hairline)]/50"
        }`}
        style={{ minHeight: "64px" }}
      >
        <div className="section-wrap flex items-center justify-between h-[64px] sm:h-[68px] px-3.5 sm:px-6 gap-3 lg:gap-6">
          {/* Left: Brand Logo */}
          <Link
            href="/"
            className="flex items-center cursor-pointer no-underline group shrink-0 transition-transform duration-200 active:scale-[0.98]"
            aria-label="Goexports Home"
          >
            <div className="relative w-[115px] sm:w-[138px] h-[32px] sm:h-[36px]">
              <Image
                src="/logo/logo.png"
                alt="Goexports Logo"
                fill
                priority
                sizes="(max-width: 640px) 115px, 138px"
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-0.5 xl:gap-1 p-1 rounded-full bg-[var(--surface-soft)]/80 border border-[var(--hairline)] shadow-2xs shrink-0"
          >
            {/* For Importers Dropdown */}
            <div className="relative" ref={importersDropdownRef}>
              <button
                type="button"
                onClick={() => setImportersDropdownOpen(!importersDropdownOpen)}
                className={`relative px-3 xl:px-3.5 py-1.5 rounded-full border-none bg-transparent cursor-pointer text-[12.5px] xl:text-[13px] font-medium transition-all duration-200 hover:text-[var(--ink)] hover:bg-[var(--surface-card)] flex items-center gap-1 shrink-0 ${
                  importersDropdownOpen || pathname.startsWith("/spices")
                    ? "text-[var(--ink)] bg-[var(--surface-card)] font-bold shadow-2xs"
                    : "text-[var(--muted)]"
                }`}
                aria-expanded={importersDropdownOpen}
                aria-haspopup="true"
              >
                <span>For Importers</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${importersDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {importersDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-[40px] w-72 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-card)] shadow-[0_16px_40px_rgba(10,10,10,0.14)] p-2.5 z-50 space-y-2"
                  >
                    <div className="px-2 pt-1 pb-1 border-b border-[var(--hairline)] flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Source Direct From India</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded-full">Verified</span>
                    </div>

                    {/* Category Tabs / Cards */}
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="/spices"
                        onClick={() => setImportersDropdownOpen(false)}
                        className="flex items-center gap-2 p-2 rounded-xl bg-[var(--surface-soft)] hover:bg-[var(--canvas)] no-underline transition-colors group border border-[var(--hairline)]"
                      >
                        <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-700 flex items-center justify-center shrink-0">
                          <Flame className="w-3.5 h-3.5 text-amber-600" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-xs font-bold text-[var(--ink)] group-hover:text-amber-700 truncate">Spices Hub</span>
                          <span className="block text-[10px] text-[var(--muted)]">12+ Spices</span>
                        </div>
                      </Link>

                      <Link
                        href="/textiles"
                        onClick={() => setImportersDropdownOpen(false)}
                        className="flex items-center gap-2 p-2 rounded-xl bg-[var(--surface-soft)] hover:bg-[var(--canvas)] no-underline transition-colors group border border-[var(--hairline)]"
                      >
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-700 flex items-center justify-center shrink-0">
                          <Layers className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-xs font-bold text-[var(--ink)] group-hover:text-emerald-700 truncate">Textiles Hub</span>
                          <span className="block text-[10px] text-[var(--muted)]">15+ Categories</span>
                        </div>
                      </Link>
                    </div>

                    {/* Quick Variety Links */}
                    <div className="grid grid-cols-2 gap-1 p-1 bg-[var(--surface-soft)] rounded-xl">
                      <Link
                        href="/spices/red-chilli"
                        onClick={() => setImportersDropdownOpen(false)}
                        className="px-2 py-1.5 rounded-lg text-[11.5px] font-medium text-[var(--ink)] hover:bg-[var(--surface-card)] no-underline truncate"
                      >
                        🌶️ Red Chilli
                      </Link>
                      <Link
                        href="/spices/bulk-turmeric-suppliers-india"
                        onClick={() => setImportersDropdownOpen(false)}
                        className="px-2 py-1.5 rounded-lg text-[11.5px] font-medium text-[var(--ink)] hover:bg-[var(--surface-card)] no-underline truncate"
                      >
                        🟡 Turmeric
                      </Link>
                      <Link
                        href="/spices/wholesale-bulk-cumin-seeds-powder-india"
                        onClick={() => setImportersDropdownOpen(false)}
                        className="px-2 py-1.5 rounded-lg text-[11.5px] font-medium text-[var(--ink)] hover:bg-[var(--surface-card)] no-underline truncate"
                      >
                        🌱 Cumin Seeds
                      </Link>
                      <Link
                        href="/spices/bulk-black-pepper-wholesale-exporters-india"
                        onClick={() => setImportersDropdownOpen(false)}
                        className="px-2 py-1.5 rounded-lg text-[11.5px] font-medium text-[var(--ink)] hover:bg-[var(--surface-card)] no-underline truncate"
                      >
                        ⚫ Black Pepper
                      </Link>
                      <Link
                        href="/spices/dry-ginger-sourcing-india"
                        onClick={() => setImportersDropdownOpen(false)}
                        className="px-2 py-1.5 rounded-lg text-[11.5px] font-medium text-[var(--ink)] hover:bg-[var(--surface-card)] no-underline truncate"
                      >
                        🫚 Dry Ginger
                      </Link>
                      <Link
                        href="/spices/green-cardamom-wholesale-export"
                        onClick={() => setImportersDropdownOpen(false)}
                        className="px-2 py-1.5 rounded-lg text-[11.5px] font-medium text-[var(--ink)] hover:bg-[var(--surface-card)] no-underline truncate"
                      >
                        🌿 Cardamom
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-[var(--hairline)] flex items-center justify-between px-1">
                      <Link
                        href="/spices"
                        onClick={() => setImportersDropdownOpen(false)}
                        className="text-[11px] font-bold text-amber-700 hover:text-amber-800 no-underline inline-flex items-center gap-1"
                      >
                        <span>View All Spices</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                      <button
                        onClick={() => {
                          setImportersDropdownOpen(false);
                          scrollTo("#industries");
                        }}
                        className="text-[11px] font-medium text-[var(--muted)] hover:text-[var(--ink)] border-none bg-transparent cursor-pointer"
                      >
                        All Industries →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navItems.map((item) => {
              if (item.isExternal) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative px-3 xl:px-3.5 py-1.5 rounded-full no-underline text-[12.5px] xl:text-[13px] font-semibold text-[var(--ink)] hover:bg-[var(--surface-card)] transition-all duration-200 flex items-center gap-1.5 shrink-0 group"
                    title="International Shipping Partner - ShipGlobal"
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700 tracking-wide">
                        {item.badge}
                      </span>
                    )}
                    <ArrowUpRight className="w-3 h-3 text-[var(--muted)] group-hover:text-[var(--ink)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                );
              }

              const isInternalRoute = item.href.startsWith("/");
              const isActive = isInternalRoute && (pathname === item.href || pathname.startsWith(item.href + "/"));

              if (isInternalRoute) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative px-3 xl:px-3.5 py-1.5 rounded-full no-underline text-[12.5px] xl:text-[13px] font-medium transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
                      isActive
                        ? "text-[var(--ink)] bg-[var(--surface-card)] font-bold shadow-2xs"
                        : "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-card)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className="relative px-3 xl:px-3.5 py-1.5 rounded-full border-none bg-transparent cursor-pointer text-[12.5px] xl:text-[13px] font-medium text-[var(--muted)] transition-all duration-200 hover:text-[var(--ink)] hover:bg-[var(--surface-card)] flex items-center gap-1.5 shrink-0"
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 shrink-0">
            {/* Exporter Authenticated User Menu (Tablet & Desktop) */}
            {exporterUser ? (
              <div className="relative hidden md:block" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  aria-expanded={userDropdownOpen}
                  aria-label="Exporter Account Menu"
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-[12.5px] font-bold text-[var(--ink)] bg-[var(--surface-card)] border border-[var(--hairline)] rounded-full cursor-pointer hover:bg-[var(--surface-soft)] transition-colors shadow-2xs h-[36px] sm:h-[38px]"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold text-[var(--ink)] shrink-0"
                    style={{ backgroundColor: "var(--brand-ochre)" }}
                  >
                    {exporterUser.companyName ? exporterUser.companyName.slice(0, 1).toUpperCase() : "E"}
                  </div>
                  <span className="max-w-[100px] lg:max-w-[130px] truncate">{exporterUser.companyName || "My Portal"}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[var(--muted)] transition-transform duration-200 ${userDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-[44px] w-60 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-card)] shadow-[0_12px_36px_rgba(10,10,10,0.12)] p-2 z-50 space-y-1"
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
                        <LayoutDashboard className="w-4 h-4 text-[var(--brand-ochre)] shrink-0" />
                        <span>Exporter Dashboard</span>
                      </Link>

                      <Link
                        href="/exporter/profile?tab=edit"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[var(--ink)] hover:bg-[var(--canvas)] no-underline transition-colors"
                      >
                        <Edit3 className="w-4 h-4 text-sky-600 shrink-0" />
                        <span>Edit My Profile</span>
                      </Link>

                      <Link
                        href={`/${exporterUser.slug || exporterUser.id}`}
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[var(--ink)] hover:bg-[var(--canvas)] no-underline transition-colors"
                      >
                        <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Public Storefront</span>
                      </Link>

                      <div className="border-t border-[var(--hairline)] my-1" />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border-none bg-transparent cursor-pointer transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4 shrink-0" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/exporter/login"
                className="hidden md:inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-[12px] sm:text-[12.5px] font-semibold text-[var(--ink)] bg-[var(--canvas)] border border-[var(--hairline)] rounded-full no-underline cursor-pointer transition-all duration-200 hover:bg-[var(--surface-card)] h-[36px] sm:h-[38px]"
              >
                <UserCheck className="w-3.5 h-3.5 text-[var(--muted)]" />
                <span>Exporter Login</span>
              </Link>
            )}



            {/* Primary Action Button */}
            <Link
              href={exporterUser ? "/exporter/profile" : "/create-export-profile"}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 md:px-5 py-1.5 sm:py-2 text-[12.5px] sm:text-[13.5px] font-bold text-[var(--ink)] border-none rounded-full no-underline cursor-pointer transition-all duration-200 hover:opacity-95 active:scale-[0.97] shadow-sm shrink-0 group h-[36px] sm:h-[38px]"
              style={{ backgroundColor: "var(--brand-ochre)" }}
            >
              {exporterUser ? (
                <>
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span className="inline sm:hidden">Hub</span>
                  <span className="hidden sm:inline">My Exporter Hub</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5 sm:hidden" />
                  <span className="inline sm:hidden">Create Profile</span>
                  <span className="hidden sm:inline">Create Export Profile</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-75 transition-transform duration-200 group-hover:translate-x-0.5 hidden sm:inline" />
                </>
              )}
            </Link>

            {/* Mobile Hamburger / Close Button */}
            <button
              className="flex lg:hidden items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[var(--hairline)] cursor-pointer transition-all duration-200 shrink-0"
              style={{
                backgroundColor: mobileMenu ? "var(--ink)" : "var(--surface-card)",
                color: mobileMenu ? "#ffffff" : "var(--ink)",
              }}
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label={mobileMenu ? "Close menu" : "Open navigation menu"}
              aria-expanded={mobileMenu}
            >
              {mobileMenu ? (
                <X className="w-5 h-5 stroke-[2.5]" />
              ) : (
                <Menu className="w-5 h-5 stroke-[2.2]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer & Backdrop */}
      <AnimatePresence>
        {mobileMenu && (
          <>
            {/* Backdrop Dim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[64px] sm:top-[68px] bg-black/40 backdrop-blur-xs z-40 lg:hidden"
              onClick={() => setMobileMenu(false)}
              aria-hidden="true"
            />

            {/* Slide Down Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed top-[64px] sm:top-[68px] left-0 right-0 z-50 bg-[var(--canvas)] border-b border-[var(--hairline)] shadow-[0_20px_40px_rgba(10,10,10,0.15)] max-h-[calc(100vh-64px)] sm:max-h-[calc(100vh-68px)] overflow-y-auto overscroll-contain lg:hidden"
            >
              <div className="section-wrap px-4 py-5 flex flex-col gap-2">
                {/* Logged in Exporter Profile Card in Mobile Drawer */}
                {exporterUser ? (
                  <div className="p-3.5 rounded-2xl bg-[var(--surface-soft)] border border-[var(--hairline)] mb-1.5 flex flex-col gap-3 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-[var(--ink)] shrink-0 shadow-2xs"
                          style={{ backgroundColor: "var(--brand-ochre)" }}
                        >
                          {exporterUser.companyName ? exporterUser.companyName.slice(0, 1).toUpperCase() : "E"}
                        </div>
                        <div className="min-w-0">
                          <span className="block text-xs font-bold text-[var(--ink)] truncate max-w-[190px]">
                            {exporterUser.companyName}
                          </span>
                          <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                            <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>Verified Exporter</span>
                          </div>
                        </div>
                      </div>
                      <Link
                        href="/exporter/profile"
                        onClick={() => setMobileMenu(false)}
                        className="px-3 py-1.5 rounded-xl text-[11.5px] font-bold text-[var(--ink)] bg-[var(--brand-ochre)] no-underline shrink-0"
                      >
                        Dashboard
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[var(--hairline)]">
                      <Link
                        href="/exporter/profile?tab=edit"
                        onClick={() => setMobileMenu(false)}
                        className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-semibold text-[var(--ink)] bg-[var(--surface-card)] border border-[var(--hairline)] no-underline text-center"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-sky-600" />
                        <span>Edit Profile</span>
                      </Link>
                      <Link
                        href={`/${exporterUser.slug || exporterUser.id}`}
                        onClick={() => setMobileMenu(false)}
                        className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-semibold text-[var(--ink)] bg-[var(--surface-card)] border border-[var(--hairline)] no-underline text-center"
                      >
                        <Globe className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Storefront</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  /* Guest User Welcome Card */
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[var(--surface-soft)] to-[var(--surface-card)] border border-[var(--hairline)] mb-1 flex items-center justify-between">
                    <div>
                      <span className="block text-xs font-bold text-[var(--ink)]">Grow Global Exports</span>
                      <span className="block text-[11px] text-[var(--muted)]">Connect with international buyers worldwide</span>
                    </div>
                    <Link
                      href="/create-export-profile"
                      onClick={() => setMobileMenu(false)}
                      className="px-3 py-1.5 rounded-xl text-[11px] font-bold text-[var(--ink)] bg-[var(--brand-ochre)] no-underline shrink-0"
                    >
                      Join Free
                    </Link>
                  </div>
                )}

                {/* For Importers Section in Mobile Drawer */}
                <div className="p-3 rounded-2xl bg-[var(--surface-soft)] border border-[var(--hairline)] mb-1 flex flex-col gap-2.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--ink)]">For Global Importers</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded-full">
                      Direct Mill Sourcing
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/spices"
                      onClick={() => setMobileMenu(false)}
                      className="flex items-center gap-2 p-2 rounded-xl bg-[var(--surface-card)] border border-[var(--hairline)] no-underline"
                    >
                      <Flame className="w-4 h-4 text-amber-600 shrink-0" />
                      <div className="min-w-0">
                        <span className="block text-xs font-bold text-[var(--ink)] truncate">Spices Hub</span>
                        <span className="block text-[10px] text-[var(--muted)]">12+ Spices</span>
                      </div>
                    </Link>

                    <Link
                      href="/textiles"
                      onClick={() => setMobileMenu(false)}
                      className="flex items-center gap-2 p-2 rounded-xl bg-[var(--surface-card)] border border-[var(--hairline)] no-underline"
                    >
                      <Layers className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div className="min-w-0">
                        <span className="block text-xs font-bold text-[var(--ink)] truncate">Textiles Hub</span>
                        <span className="block text-[10px] text-[var(--muted)]">15+ Categories</span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Section Navigation Links */}
                <div className="flex flex-col gap-0.5 py-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;

                    if (item.isExternal) {
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setMobileMenu(false)}
                          className="text-left px-3.5 py-2.5 min-h-[44px] rounded-xl no-underline transition-all duration-150 flex items-center justify-between text-[14px] font-semibold bg-blue-50/60 hover:bg-blue-50 text-blue-950 group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center transition-transform group-hover:scale-105">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex items-center gap-2">
                              <span>{item.label}</span>
                              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700">
                                {item.badge || "Partner"}
                              </span>
                            </div>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-blue-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      );
                    }

                    const isInternalRoute = item.href.startsWith("/");
                    const isActive = isInternalRoute && (pathname === item.href || pathname.startsWith(item.href + "/"));

                    if (isInternalRoute) {
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileMenu(false)}
                          className={`text-left px-3.5 py-2.5 min-h-[44px] rounded-xl no-underline transition-all duration-150 flex items-center justify-between text-[14px] font-semibold group ${
                            isActive
                              ? "bg-[var(--surface-card)] text-[var(--ink)] font-bold"
                              : "bg-transparent text-[var(--ink)] hover:bg-[var(--surface-card)] active:bg-[var(--surface-soft)]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-[var(--surface-soft)] border border-[var(--hairline)] flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--ink)] transition-colors">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span>{item.label}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[var(--muted)] group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      );
                    }

                    return (
                      <button
                        key={item.label}
                        onClick={() => scrollTo(item.href)}
                        className="text-left px-3.5 py-2.5 min-h-[44px] rounded-xl border-none bg-transparent cursor-pointer transition-all duration-150 hover:bg-[var(--surface-card)] active:bg-[var(--surface-soft)] flex items-center justify-between text-[14px] font-semibold text-[var(--ink)] group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-[var(--surface-soft)] border border-[var(--hairline)] flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--ink)] transition-colors">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[var(--muted)] group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    );
                  })}
                </div>

                {/* Mobile Drawer Bottom Actions */}
                <div
                  className="mt-2 pt-3 flex flex-col gap-2.5"
                  style={{ borderTop: "1px solid var(--hairline)" }}
                >
                  {exporterUser ? (
                    <button
                      onClick={handleLogout}
                      className="w-full text-center py-2.5 min-h-[44px] rounded-xl border border-rose-200 bg-rose-50 text-[13.5px] font-semibold text-rose-700 cursor-pointer flex items-center justify-center gap-2 active:bg-rose-100 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out from Portal</span>
                    </button>
                  ) : (
                    <>
                      <Link
                        href="/create-export-profile"
                        onClick={() => setMobileMenu(false)}
                        className="w-full text-center py-3 min-h-[46px] rounded-xl border-none text-[14px] font-bold text-[var(--ink)] no-underline flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-xs"
                        style={{ backgroundColor: "var(--brand-ochre)" }}
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>Create Export Profile</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <Link
                        href="/exporter/login"
                        onClick={() => setMobileMenu(false)}
                        className="w-full text-center py-2.5 min-h-[44px] rounded-xl border border-[var(--hairline)] bg-[var(--surface-card)] text-[13.5px] font-semibold text-[var(--ink)] no-underline flex items-center justify-center gap-2 active:bg-[var(--surface-soft)] transition-colors"
                      >
                        <UserCheck className="w-4 h-4 text-[var(--muted)]" />
                        <span>Exporter Portal Login</span>
                      </Link>
                    </>
                  )}

                  <button
                    onClick={() => scrollTo("#contact-form")}
                    className="w-full text-center py-2.5 min-h-[44px] rounded-xl border border-[var(--hairline)] bg-[var(--surface-soft)] text-[13.5px] font-semibold text-[var(--ink)] cursor-pointer flex items-center justify-center gap-2 active:bg-[var(--surface-card)] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[var(--muted)]" />
                    <span>Contact Sales & Support</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}