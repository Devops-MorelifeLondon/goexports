"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Check,
  Building2,
  ArrowRight,
  Globe
} from "lucide-react";
import { FadeIn } from "./MotionWrappers";

export interface DomesticPlanItem {
  id: string;
  name: string;
  tagline?: string;
  price: number;
  priceDisplay: string;
  currency: string;
  period: string;
  leads: number;
  leadsLabel: string;
  featured: boolean;
  badge?: string;
  features: string[];
}

const DEFAULT_DOMESTIC_PLANS: DomesticPlanItem[] = [
  {
    id: "domestic-starter",
    name: "Domestic Starter",
    price: 24999,
    priceDisplay: "24,999",
    currency: "₹",
    period: "/ month",
    leads: 50,
    leadsLabel: "Qualified Domestic Leads / Month",
    featured: false,
    badge: "Domestic Starter",
    features: [
      "50 Leads",
    ],
  },
  {
    id: "domestic-growth",
    name: "Domestic Growth",
    price: 49999,
    priceDisplay: "49,999",
    currency: "₹",
    period: "/ month",
    leads: 100,
    leadsLabel: "Qualified Domestic Leads / Month",
    featured: true,
    badge: "⭐ Most Popular",
    features: [
      "100 Leads",
    ],
  },
  {
    id: "domestic-enterprise",
    name: "Domestic Enterprise",
    price: 99999,
    priceDisplay: "99,999",
    currency: "₹",
    period: "/ month",
    leads: 200,
    leadsLabel: "Qualified Domestic Leads / Month",
    featured: false,
    badge: "Enterprise",
    features: [
      "200 Leads",
    ],
  },
];

export default function DomesticPlans() {
  const [plans, setPlans] = useState<DomesticPlanItem[]>(DEFAULT_DOMESTIC_PLANS);

  // Sync with MongoDB active packages if available
  useEffect(() => {
    let isMounted = true;
    async function fetchDomesticPackages() {
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

            const domPackages = data.packages.filter(isDom);
            if (domPackages.length > 0) {
              setPlans(
                domPackages.map((p: any) => ({
                  id: p.id,
                  name: p.name,
                  tagline: p.tagline,
                  price: Number(p.price) || 0,
                  priceDisplay: p.priceDisplay || String(p.price),
                  currency: p.currency || "₹",
                  period: p.period || "/ month",
                  leads: Number(p.leads) || 0,
                  leadsLabel: p.leadsLabel || "Qualified Domestic Leads / Month",
                  featured: Boolean(p.featured),
                  badge: p.badge,
                  features: Array.isArray(p.features) && p.features.length > 0 ? p.features : [`${p.leads || 0} Leads`],
                }))
              );
            }
          }
        }
      } catch {
        // Fallback safely to seeded constants
      }
    }
    fetchDomesticPackages();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="domestic-plans"
      style={{
        backgroundColor: "var(--surface-soft)",
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
              className="inline-flex items-center gap-2 mb-4 caption-upper"
              style={{
                color: "#92400e",
                backgroundColor: "#fef3c7",
                padding: "6px 18px",
                borderRadius: "var(--r-pill)",
                border: "1px solid #fde68a",
              }}
            >
              <Building2 className="w-3.5 h-3.5 text-amber-600" />
              <span>🇮🇳 Domestic India Plans (₹ INR)</span>
            </span>

            <h2
              className="mb-4"
              style={{
                fontSize: "clamp(30px, 4vw, 52px)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-1.5px",
                color: "var(--ink)",
              }}
            >
              Domestic Plans
            </h2>

            <p
              className="mx-auto"
              style={{
                fontSize: "16px",
                color: "var(--muted)",
                maxWidth: "600px",
                lineHeight: 1.6,
              }}
            >
              Priced in <strong>Indian Rupees (₹)</strong> with dedicated domestic leads.
            </p>

            {/* Link to International Plans */}
            <div className="mt-4">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[var(--surface-card)] text-[var(--ink)] border border-[var(--hairline)] hover:border-[var(--ink)] transition-colors no-underline"
              >
                <Globe className="w-3.5 h-3.5 text-sky-500" />
                <span>Looking for overseas export buyers? <strong>View Global Export Plans (£ GBP)</strong></span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </FadeIn>

        {/* 3 Domestic Cards Grid */}
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
                  {/* Floating Badge */}
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
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200 shrink-0">
                        🇮🇳 Domestic
                      </span>
                    </div>
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
                  </div>

                  {/* Features List */}
                  <div className="flex-1 mb-8">
                    <ul className="space-y-3 p-0 m-0 list-none text-sm text-[var(--body)] font-medium">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2.5">
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: isFeatured ? "rgba(229, 168, 36, 0.2)" : "rgba(16, 185, 129, 0.15)",
                              color: isFeatured ? "var(--ink)" : "#059669",
                            }}
                          >
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </div>
                          <span className="text-sm font-semibold text-[var(--ink)]">{feature}</span>
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
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
