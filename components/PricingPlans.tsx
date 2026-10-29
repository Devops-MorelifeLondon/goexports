"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Check,
  Zap,
  Globe,
  Building2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Headphones,
  CheckCircle2
} from "lucide-react";
import { FadeIn } from "./MotionWrappers";

export interface PricingPlanItem {
  id: string;
  name: string;
  tagline: string;
  price: number;
  priceDisplay: string;
  currency: string;
  period: string;
  leads: number;
  leadsLabel: string;
  featured: boolean;
  badge?: string;
  planType: "export" | "domestic";
  features: string[];
}

const DEFAULT_EXPORT_PLANS: PricingPlanItem[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Essential international buyer leads for emerging exporters",
    price: 249,
    priceDisplay: "249",
    currency: "£",
    period: "/ month",
    leads: 20,
    leadsLabel: "Qualified Export Leads / Month",
    featured: false,
    planType: "export",
    features: [
      "20 Verified International Buyer Leads / mo",
      "Direct Foreign Importer & Buyer Contacts",
      "Targeted Industry & Category Matching",
      "Verified Exporter Storefront Listing",
      "Standard Product Catalog Showcase",
      "Dedicated Account Manager",
      "Monthly Lead Delivery & Analytics Report",
      "0% Deal Commission on Export Sales",
      "24/7/365 Dedicated Support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Most popular for scaling exports across North America, Europe & Middle East",
    price: 499,
    priceDisplay: "499",
    currency: "£",
    period: "/ month",
    leads: 50,
    leadsLabel: "Qualified Export Leads / Month",
    featured: true,
    badge: "⭐ Most Popular",
    planType: "export",
    features: [
      "50 Verified International Buyer Leads / mo",
      "High-Intent Importers & Distributors Contacts",
      "Priority Buyer Introductions & Matching",
      "Targeted Industry & Multi-Region Access",
      "Enhanced Storefront with Trust Badges",
      "Unlimited Product Listings & Catalogs",
      "Dedicated Senior Account Manager",
      "Weekly Strategy Call & Market Guidance",
      "Weekly Lead Delivery & Pipeline Report",
      "0% Deal Commission on Export Sales",
      "24/7/365 Priority Support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Maximum global volume for established manufacturers & high-capacity suppliers",
    price: 999,
    priceDisplay: "999",
    currency: "£",
    period: "/ month",
    leads: 120,
    leadsLabel: "Qualified Export Leads / Month",
    featured: false,
    badge: "🚀 Enterprise Global",
    planType: "export",
    features: [
      "120 Verified International Buyer Leads / mo",
      "Direct Global Supply Chain & Corporate RFQs",
      "First Priority Importer Matching & Intro",
      "Bespoke Market Expansion Strategy",
      "Direct CRM / Lead Webhook Integration",
      "Dedicated Trade Director & Account Team",
      "Weekly Strategy Review & Trade Consulting",
      "Comprehensive Export Performance Reports",
      "0% Deal Commission on Export Sales",
      "24/7 VIP Dedicated Support",
    ],
  },
];

export default function PricingPlans() {
  const [plans, setPlans] = useState<PricingPlanItem[]>(DEFAULT_EXPORT_PLANS);

  // Sync with live database packages if available
  useEffect(() => {
    let isMounted = true;
    async function fetchLivePackages() {
      try {
        const res = await fetch("/api/packages", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.packages) && data.packages.length > 0) {
            if (!isMounted) return;

            const isDom = (p: any) =>
              p.planType === "domestic" ||
              (p.name && p.name.toLowerCase().includes("domestic")) ||
              (p.id && p.id.toLowerCase().includes("domestic")) ||
              (p.currency === "₹" && Number(String(p.price).replace(/,/g, "")) >= 10000);

            const fetchedExport: PricingPlanItem[] = data.packages
              .filter((p: any) => !isDom(p) && p.id !== "free" && p.price > 0)
              .map((p: any) => ({
                id: p.id,
                name: p.name,
                tagline: p.tagline || "Qualified international buyers for your products",
                price: Number(p.price) || 0,
                priceDisplay: p.priceDisplay || String(p.price),
                currency: p.currency || "£",
                period: p.period || "/ month",
                leads: Number(p.leads) || 0,
                leadsLabel: p.leadsLabel || "Qualified Export Leads / Month",
                featured: Boolean(p.featured),
                badge: p.badge,
                planType: "export",
                features: Array.isArray(p.features) && p.features.length > 0 ? p.features : [],
              }));

            if (fetchedExport.length > 0) setPlans(fetchedExport);
          }
        }
      } catch {
        // Fallback to initial constants seamlessly
      }
    }
    fetchLivePackages();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="pricing"
      style={{
        backgroundColor: "var(--canvas)",
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
      }}
      className="relative overflow-hidden border-t border-[var(--hairline)]"
    >
      <div className="section-wrap relative z-10">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span
              className="inline-flex items-center gap-1.5 mb-4 caption-upper"
              style={{
                color: "var(--ink)",
                backgroundColor: "var(--surface-card)",
                padding: "6px 18px",
                borderRadius: "var(--r-pill)",
                border: "1px solid var(--hairline)",
              }}
            >
              <Globe className="w-3.5 h-3.5 text-sky-500" />
              🌍 International Export Plans (£ GBP)
            </span>
            <h2
              className="mb-4"
              style={{
                fontSize: "clamp(32px, 4.2vw, 56px)",
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: "-1.5px",
                color: "var(--ink)",
              }}
            >
              Find International Buyers with Guaranteed Export Leads
            </h2>
            <p
              className="mx-auto"
              style={{
                fontSize: "16px",
                color: "var(--muted)",
                maxWidth: "620px",
                lineHeight: 1.6,
              }}
            >
              Connect directly with verified importers across the US, UK, Europe, Middle East and 50+ countries.
              Guaranteed monthly leads, zero commission on your contracts, and full export advisory.
            </p>

            {/* Quick Link to Domestic Plans */}
            <div className="mt-5">
              <a
                href="#domestic-plans"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors no-underline"
              >
                <Building2 className="w-3.5 h-3.5 text-amber-600" />
                <span>Looking for Indian domestic trade? <strong>View Domestic India Plans (₹ INR)</strong></span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </FadeIn>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const isFeatured = plan.featured;
            return (
              <FadeIn key={plan.id} delay={index * 0.08} className="flex flex-col">
                <div
                  className={`relative flex flex-col h-full rounded-3xl p-6 sm:p-8 transition-all duration-300 ${
                    isFeatured
                      ? "bg-[var(--surface-card)] border-2 border-[var(--brand-ochre)] shadow-xl ring-4 ring-[var(--brand-ochre)]/10 -translate-y-1 sm:-translate-y-2"
                      : "bg-[var(--surface-card)] border border-[var(--hairline)] hover:border-[var(--muted)]/40 shadow-xs hover:shadow-md"
                  }`}
                >
                  {/* Featured / Popular Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span
                        className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm"
                        style={{
                          backgroundColor: isFeatured ? "var(--brand-ochre)" : "var(--ink)",
                          color: isFeatured ? "var(--ink)" : "#ffffff",
                        }}
                      >
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="mb-6 pt-1">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)] tracking-tight">
                        {plan.name}
                      </h3>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-sky-100 text-sky-900 border border-sky-200 shrink-0">
                        🌍 Export
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--muted)] line-clamp-2 min-h-[40px] leading-relaxed">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price Box */}
                  <div className="pb-6 mb-6 border-b border-[var(--hairline)]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
                        {plan.currency}
                      </span>
                      <span className="text-4xl sm:text-5xl font-black text-[var(--ink)] tracking-tight">
                        {plan.priceDisplay}
                      </span>
                      <span className="text-sm font-medium text-[var(--muted)]">
                        {plan.period}
                      </span>
                    </div>

                    {/* Leads Quota Highlight Badge */}
                    <div className="mt-4 p-3 rounded-2xl bg-[var(--surface-soft)] border border-[var(--hairline)] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0"
                          style={{
                            backgroundColor: isFeatured ? "var(--brand-ochre)" : "var(--ink)",
                            color: isFeatured ? "var(--ink)" : "#ffffff",
                          }}
                        >
                          <Zap className="w-4 h-4 fill-current" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[var(--ink)]">
                            {plan.leads} Guaranteed Leads
                          </div>
                          <div className="text-[11px] text-[var(--muted)]">
                            Verified Global Importers / mo
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        100% Vetted
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="flex-1 mb-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-3">
                      What&apos;s Included:
                    </div>
                    <ul className="space-y-3 p-0 m-0 list-none text-xs sm:text-sm text-[var(--body)]">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                            style={{
                              backgroundColor: isFeatured ? "rgba(229, 168, 36, 0.2)" : "rgba(16, 185, 129, 0.15)",
                              color: isFeatured ? "var(--ink)" : "#059669",
                            }}
                          >
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </div>
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto pt-2">
                    <Link
                      href={`/create-export-profile?plan=${encodeURIComponent(plan.id)}`}
                      className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-center transition-all flex items-center justify-center gap-2 group cursor-pointer no-underline ${
                        isFeatured
                          ? "bg-[var(--ink)] text-white hover:bg-black shadow-md hover:shadow-lg active:scale-[0.98]"
                          : "bg-[var(--canvas)] text-[var(--ink)] border border-[var(--hairline)] hover:border-[var(--ink)] hover:bg-[var(--surface-soft)] active:scale-[0.98]"
                      }`}
                    >
                      <span>Choose {plan.name}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <p className="text-[11px] text-center text-[var(--muted)] mt-2">
                      0% Commission on Deals · Cancel anytime
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Free Storefront Banner */}
        <FadeIn delay={0.25}>
          <div className="mt-10 sm:mt-12 p-6 sm:p-7 rounded-3xl bg-[var(--surface-card)] border border-[var(--hairline)] flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto shadow-xs">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-[var(--brand-ochre)] flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-[var(--brand-ochre)]" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[var(--ink)] mb-0.5">
                  Looking for a basic business listing first?
                </h4>
                <p className="text-xs sm:text-sm text-[var(--muted)] m-0 leading-relaxed">
                  Register for our <strong>Free Storefront Profile (£0 / mo)</strong> to list your products, showcase your company certifications, and receive organic inquiries from our verified buyer directory.
                </p>
              </div>
            </div>
            <Link
              href="/create-export-profile?plan=free"
              className="shrink-0 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold border border-[var(--hairline)] hover:border-[var(--ink)] text-[var(--ink)] bg-[var(--canvas)] hover:bg-[var(--surface-soft)] transition-all flex items-center gap-2 no-underline"
            >
              <span>Create Free Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </FadeIn>

        {/* Trust & Guarantee Banner */}
        <FadeIn delay={0.3}>
          <div className="mt-12 pt-10 border-t border-[var(--hairline)] grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-[var(--ink)] mb-0.5">0% Deal Commission</h5>
                <p className="text-[11px] sm:text-xs text-[var(--muted)] m-0 leading-normal">
                  Transact directly with buyers. We never take any cut of your contracts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-[var(--ink)] mb-0.5">Vetted Buyer RFQs</h5>
                <p className="text-[11px] sm:text-xs text-[var(--muted)] m-0 leading-normal">
                  Every trade lead is verified for genuine purchasing intent and contact accuracy.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Headphones className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-[var(--ink)] mb-0.5">Dedicated Manager</h5>
                <p className="text-[11px] sm:text-xs text-[var(--muted)] m-0 leading-normal">
                  1-on-1 human support helping you match, introduce, and follow up with leads.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-[var(--ink)] mb-0.5">Flexible Terms</h5>
                <p className="text-[11px] sm:text-xs text-[var(--muted)] m-0 leading-normal">
                  Transparent monthly subscription. Upgrade, switch currency or cancel anytime.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
