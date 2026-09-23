"use client";

import { FadeIn } from "./MotionWrappers";
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex } from "react-icons/fa";
import { 
  Flame, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  Mail, 
  Globe2, 
  ArrowRight,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61555427933881",
    path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
  },
  {
    label: "Twitter",
    href: "https://twitter.com/goexports",
    path: "M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.5v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/goexports",
    path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@goexports",
    path: "M22.54 6.42A2.78 2.78 0 0020.6 4.5C18.88 4 12 4 12 4s-6.88 0-8.6.5a2.78 2.78 0 00-1.94 1.92A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.4 19.5C5.12 20 12 20 12 20s6.88 0 8.6-.5a2.78 2.78 0 001.94-1.92A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/goexportsuk",
    path: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2zm-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z",
  },
];

const spiceCategories = [
  { label: "Spices Directory Overview", href: "/spices", badge: "Directory" },
  { label: "Red Chilli (Guntur & Byadagi)", href: "/spices/red-chilli" },
  { label: "Turmeric (Curcumin Rich)", href: "/spices/turmeric" },
  { label: "Cumin Seeds (Jeera)", href: "/spices/cumin" },
  { label: "Black Pepper (Malabar / Tellicherry)", href: "/spices/black-pepper" },
  { label: "Green Cardamom (Alleppey)", href: "/spices/green-cardamom" },
  { label: "Dry Ginger (Cochin)", href: "/spices/dry-ginger" },
  { label: "Coriander Seeds (Dhania)", href: "/spices/coriander-seeds" },
  { label: "Fennel Seeds (Saunf)", href: "/spices/fennel-seeds" },
  { label: "Fenugreek Seeds (Methi)", href: "/spices/fenugreek-seeds" },
  { label: "Cloves & Whole Spices", href: "/spices/cloves" },
];

const featuredVarieties = [
  { label: "Guntur Teja S17 Chilli", href: "/spices/red-chilli/guntur-teja-s17" },
  { label: "Byadagi 5531 Wrinkled Chilli", href: "/spices/red-chilli/byadagi" },
  { label: "Salem Turmeric Fingers", href: "/spices/turmeric/salem-fingers" },
  { label: "Nizamabad Turmeric Fingers", href: "/spices/turmeric/nizamabad-fingers" },
  { label: "Tellicherry TGSEB Black Pepper", href: "/spices/black-pepper/tellicherry-tgseb" },
  { label: "Malabar MG1 Black Pepper", href: "/spices/black-pepper/malabar-mg1" },
  { label: "Alleppey Extra Bold Cardamom", href: "/spices/green-cardamom/ageb" },
  { label: "Cochin Bleached Dry Ginger", href: "/spices/dry-ginger/cochin-bleached" },
  { label: "Eagle Quality Coriander Seeds", href: "/spices/coriander/eagle-quality" },
  { label: "Singapore Quality Cumin Seeds", href: "/spices/cumin/singapore-quality" },
];

const exportIndustries = [
  { label: "Food & Beverages", href: "/food-and-beverages" },
  { label: "Agriculture & Farming", href: "/agriculture-and-farming" },
  { label: "Chemicals, Dyes & Solvents", href: "/chemicals-dyes-and-solvents" },
  { label: "Health Products & Medicine", href: "/health-products-drug-and-medicine" },
  { label: "Packaging Machines & Goods", href: "/packaging-machines-and-goods" },
  { label: "Industrial Plants & Machinery", href: "/industrial-plants-and-machinery" },
  { label: "Building & Construction", href: "/building-and-construction" },
  { label: "Consumer Electronics", href: "/consumer-electronics" },
  { label: "Textiles, Yarn & Fabrics", href: "/textiles-yarn-and-fabrics" },
  { label: "Automobile Parts & Spares", href: "/automobile-parts-and-spares" },
];

const platformLinks = [
  { label: "Trade Intelligence & Blog", href: "/blog" },
  { label: "Create Export Profile", href: "/create-export-profile" },
  { label: "Exporter Portal Login", href: "/exporter/login" },
  { label: "How GoExports Works", href: "#how-it-works" },
  { label: "Verified Exporter Benefits", href: "#benefits" },
  { label: "Global Presence & Hubs", href: "#presence" },
  { label: "Pricing & Membership", href: "#pricing" },
  { label: "Trade Inquiries & Support", href: "#contact-form" },
];

const legalAndCompliance = [
  { label: "Terms of Service", href: "/tos" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "APEDA & FSSAI Standards", href: "/spices" },
  { label: "US FDA / FSMA Compliance", href: "/spices" },
  { label: "EU Food Safety & MRLs", href: "/spices" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--surface-soft)", borderTop: "1px solid var(--hairline)" }}>
      {/* Pre-footer CTA band */}
      <div
        style={{
          backgroundColor: "var(--surface-strong)",
          borderBottom: "1px solid var(--hairline)",
          padding: "72px 0",
        }}
      >
        <div className="section-wrap text-center px-4">
          <span
            className="inline-flex items-center gap-1.5 mb-5 caption-upper"
            style={{
              color: "var(--brand-ochre)",
              backgroundColor: "rgba(232, 185, 74, 0.1)",
              border: "1px solid rgba(232, 185, 74, 0.25)",
              padding: "6px 18px",
              borderRadius: "var(--r-pill)",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Global B2B Sourcing Platform
          </span>
          <h2
            className="mb-4 mx-auto"
            style={{
              fontSize: "clamp(26px, 3.8vw, 38px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              maxWidth: "640px",
              lineHeight: 1.25,
            }}
          >
            Turn your global trade ideas into reality today
          </h2>
          <p
            className="mb-8 mx-auto"
            style={{
              fontSize: "15.5px",
              color: "var(--muted)",
              maxWidth: "520px",
              lineHeight: 1.6,
            }}
          >
            Connect directly with verified international buyers, access certified export leads, and procure premium bulk commodities worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a 
              href="#contact-form" 
              className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold no-underline shadow-sm transition-transform active:scale-[0.98]"
              style={{ backgroundColor: "var(--brand-ochre)", color: "var(--ink)" }}
            >
              <span>Get Buyer Leads</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/spices"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-[var(--hairline)] bg-[var(--surface-card)] text-[var(--ink)] no-underline hover:bg-[var(--surface-soft)] transition-colors shadow-2xs"
            >
              <Flame className="w-4 h-4 text-amber-600" />
              <span>Explore Spices Directory</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer body */}
      <div className="section-wrap py-14 px-4 sm:px-6">
        <FadeIn>
          {/* Top row: logo + contact + social */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-10 mb-10 border-b border-[var(--hairline)]">
            <div className="flex flex-col gap-3 max-w-[340px]">
              <Link href="/" className="no-underline block">
                <Image src="/logo/logo.png" alt="Goexports Logo" width={140} height={36} className="object-contain" />
              </Link>
              <p className="text-xs text-[var(--muted)] leading-relaxed m-0">
                Your premier global sourcing platform for connecting verified exporters with active international buyers across 190+ countries.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[var(--surface-card)] border border-[var(--hairline)] text-xs text-[var(--ink)] shadow-2xs">
                <Mail className="w-4 h-4 text-[var(--brand-ochre)] shrink-0" />
                <span>Trade Desk:</span>
                <a
                  href="mailto:info@goexports.co.uk"
                  className="font-semibold text-[var(--ink)] hover:underline no-underline"
                >
                  info@goexports.co.uk
                </a>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-1.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[var(--surface-card)] border border-[var(--hairline)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--muted-soft)] transition-all shadow-2xs"
                    title={social.label}
                    aria-label={social.label}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 5-Column Navigation Grid */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-12 border-b border-[var(--hairline)] text-xs">
            {/* Column 1: Spices Directory */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-bold text-[var(--ink)] text-[13.5px] pb-1 border-b border-[var(--hairline)]">
                <Flame className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Spices Directory</span>
              </div>
              <ul className="space-y-2 list-none p-0 m-0">
                {spiceCategories.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors no-underline flex items-center justify-between group py-0.5"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 border border-amber-500/20">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Commercial Varieties (L2) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-bold text-[var(--ink)] text-[13.5px] pb-1 border-b border-[var(--hairline)]">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Spice Cultivars</span>
              </div>
              <ul className="space-y-2 list-none p-0 m-0">
                {featuredVarieties.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors no-underline block py-0.5 group"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform block truncate">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Export Industries */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-bold text-[var(--ink)] text-[13.5px] pb-1 border-b border-[var(--hairline)]">
                <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Export Sectors</span>
              </div>
              <ul className="space-y-2 list-none p-0 m-0">
                {exportIndustries.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors no-underline block py-0.5 group"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform block truncate">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Platform & Exporter Hub */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-bold text-[var(--ink)] text-[13.5px] pb-1 border-b border-[var(--hairline)]">
                <Globe2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Platform Links</span>
              </div>
              <ul className="space-y-2 list-none p-0 m-0">
                {platformLinks.map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith("#") ? (
                      <a
                        href={item.href}
                        className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors no-underline block py-0.5 group"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform block">{item.label}</span>
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors no-underline block py-0.5 group"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform block">{item.label}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: Compliance & Legal */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-bold text-[var(--ink)] text-[13.5px] pb-1 border-b border-[var(--hairline)]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Trust & Legal</span>
              </div>
              <ul className="space-y-2 list-none p-0 m-0">
                {legalAndCompliance.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors no-underline block py-0.5 group"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform block">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>

        {/* Bottom bar: Copyright & Payment Security */}
        <FadeIn delay={0.2}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs text-[var(--muted)]">
            <div className="flex items-center gap-2">
              <span>© 2026 GoExports. All rights reserved.</span>
              <span className="text-[var(--hairline)]">|</span>
              <span className="text-[var(--muted-soft)]">Empowering Verified Global Trade</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[11px] text-[var(--muted-soft)]">Accepted Trade Channels:</span>
              <div className="flex items-center gap-2.5 text-[var(--muted)]">
                <div title="Visa"><FaCcVisa size={22} className="hover:text-[var(--ink)] transition-colors" /></div>
                <div title="Mastercard"><FaCcMastercard size={22} className="hover:text-[var(--ink)] transition-colors" /></div>
                <div title="PayPal"><FaCcPaypal size={20} className="hover:text-[var(--ink)] transition-colors" /></div>
                <div title="American Express"><FaCcAmex size={22} className="hover:text-[var(--ink)] transition-colors" /></div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}