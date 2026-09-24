"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FeatureIconMap,
  IconLock,
  IconFileText,
  IconRefreshCw,
  IconMessageCircle,
} from "./Icons";

function ClearCheckIcon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

export interface PackagePlan {
  id: string;
  slug?: string;
  name: string;
  tagline: string;
  price: number | string;
  priceDisplay?: string;
  currency: string;
  period: string;
  leads: number | string;
  leadsLabel: string;
  featured: boolean;
  badge?: string;
  features: string[];
  isActive?: boolean;
  sortOrder?: number;
}

const trustItems = [
  { Icon: IconLock, text: "Secure Payments" },
  { Icon: IconFileText, text: "No Hidden Fees" },
  { Icon: IconRefreshCw, text: "Cancel Anytime" },
  { Icon: IconMessageCircle, text: "Free Consultation" },
];

interface SellToUSProps {
  initialPlans?: PackagePlan[];
}

export default function SellToUS({ initialPlans }: SellToUSProps) {
  const [plans, setPlans] = useState<PackagePlan[]>(initialPlans || []);
  const [loading, setLoading] = useState(!initialPlans || initialPlans.length === 0);
  const [selectedMobilePlan, setSelectedMobilePlan] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;

    async function fetchDatabasePlans() {
      try {
        const response = await fetch("/api/packages", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && Array.isArray(data.packages) && data.packages.length > 0) {
            if (isMounted) {
              setPlans(data.packages);
              const featuredIndex = data.packages.findIndex((p: PackagePlan) => p.featured);
              setSelectedMobilePlan(featuredIndex !== -1 ? featuredIndex : 0);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching packages from database:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchDatabasePlans();

    return () => {
      isMounted = false;
    };
  }, []);

  // Dynamically extract all unique features directly from the database packages
  const dynamicFeatures = useMemo(() => {
    const set = new Set<string>();
    const list: string[] = [];

    plans.forEach((plan) => {
      (plan.features || []).forEach((feat) => {
        const trimmed = typeof feat === "string" ? feat.trim() : "";
        if (trimmed && !set.has(trimmed)) {
          set.add(trimmed);
          list.push(trimmed);
        }
      });
    });

    return list;
  }, [plans]);

  return (
    <section
      id="pricing"
      style={{
        backgroundColor: "var(--canvas)",
        paddingTop: "clamp(48px, 6vw, 72px)",
        paddingBottom: "clamp(48px, 6vw, 72px)",
      }}
    >
      <div className="section-wrap">
        {/* Heading Header */}
        <FadeIn>
          <div className="text-center mb-8 md:mb-10">
            <span
              className="inline-block mb-3 caption-upper"
              style={{
                color: "var(--muted)",
                backgroundColor: "var(--surface-card)",
                padding: "4px 14px",
                borderRadius: "var(--r-pill)",
                fontSize: "11px",
              }}
            >
              Plan Comparison
            </span>
            <h2
              className="mb-3"
              style={{
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-1.5px",
                color: "var(--ink)",
              }}
            >
              Find International Buyers Plans
            </h2>
            <p
              className="mx-auto"
              style={{
                fontSize: "14px",
                color: "var(--muted)",
                maxWidth: "540px",
                lineHeight: 1.5,
              }}
            >
              Compare our plans to find verified global buyers, guaranteed trade inquiries, and dedicated account management for your export business.
            </p>
          </div>
        </FadeIn>

        {loading && plans.length === 0 ? (
          /* Loading Skeleton Table */
          <div
            className="rounded-2xl p-5 overflow-hidden animate-pulse"
            style={{
              backgroundColor: "var(--surface-card)",
              border: "1px solid var(--hairline)",
            }}
          >
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-24 bg-gray-200 dark:bg-zinc-800 rounded-xl" />
              ))}
            </div>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-8 bg-gray-200 dark:bg-zinc-800 rounded-md" />
              ))}
            </div>
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-12 text-muted">No packages currently available.</div>
        ) : (
          <>
            {/* Mobile Plan Selector Tabs */}
            <div className="block lg:hidden mb-5">
              <div
                className="flex items-center gap-1.5 p-1 rounded-xl overflow-x-auto no-scrollbar"
                style={{
                  backgroundColor: "var(--surface-card)",
                  border: "1px solid var(--hairline)",
                }}
              >
                {plans.map((plan, idx) => {
                  const isSelected = selectedMobilePlan === idx;
                  return (
                    <button
                      key={plan.id || idx}
                      onClick={() => setSelectedMobilePlan(idx)}
                      className="flex-1 min-w-[85px] py-1.5 px-2.5 text-center rounded-lg text-xs font-semibold transition-all duration-200"
                      style={{
                        backgroundColor: isSelected
                          ? plan.featured
                            ? "var(--brand-teal)"
                            : "var(--primary)"
                          : "transparent",
                        color: isSelected ? "#ffffff" : "var(--ink)",
                        boxShadow: isSelected ? "0 2px 6px rgba(0,0,0,0.1)" : "none",
                      }}
                    >
                      <span className="block truncate">{plan.name}</span>
                      {plan.featured && (
                        <span className="block text-[9px] opacity-80">Popular</span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="text-center text-[11px] text-muted mt-1.5">
                💡 Switch tab above or scroll table sideways to compare all plans
              </div>
            </div>

            {/* Dynamic Comparison Table */}
            <FadeIn delay={0.1}>
              <div
                className="relative rounded-2xl overflow-hidden shadow-xs"
                style={{
                  backgroundColor: "var(--canvas)",
                  border: "1px solid var(--hairline)",
                }}
              >
                <div className="overflow-x-auto">
                  <table
                    className="w-full text-left border-collapse"
                    style={{
                      minWidth: "720px",
                      tableLayout: "fixed",
                    }}
                  >
                    {/* Column Sizing */}
                    <colgroup>
                      <col style={{ width: "26%" }} />
                      {plans.map((plan, idx) => (
                        <col
                          key={plan.id || idx}
                          style={{
                            width: `${74 / plans.length}%`,
                          }}
                        />
                      ))}
                    </colgroup>

                    {/* Table Header: Plan Summaries */}
                    <thead>
                      <tr
                        style={{
                          borderBottom: "1.5px solid var(--hairline)",
                          backgroundColor: "var(--surface-soft)",
                        }}
                      >
                        {/* Top-left cell */}
                        <th
                          scope="col"
                          className="p-4 sm:p-5 align-bottom"
                          style={{
                            borderRight: "1px solid var(--hairline)",
                          }}
                        >
                          <div className="space-y-0.5">
                            <span
                              className="caption-upper"
                              style={{ color: "var(--muted)", fontSize: "10px" }}
                            >
                              Features & Plans
                            </span>
                            <div
                              style={{
                                fontSize: "17px",
                                fontWeight: 600,
                                color: "var(--ink)",
                              }}
                            >
                              Plan Comparison
                            </div>
                            <p style={{ fontSize: "11px", color: "var(--muted)", lineHeight: 1.3 }}>
                              Compare benefits & verified buyer leads across packages.
                            </p>
                          </div>
                        </th>

                        {/* Plan Header Columns */}
                        {plans.map((plan, idx) => {
                          const isFeatured = Boolean(plan.featured);
                          const displayPrice =
                            plan.priceDisplay !== undefined && plan.priceDisplay !== null
                              ? String(plan.priceDisplay)
                              : String(plan.price || "0");
                          const isLetTalk =
                            !displayPrice ||
                            displayPrice.toLowerCase().includes("talk") ||
                            displayPrice.toLowerCase().includes("contact");

                          return (
                            <th
                              key={plan.id || idx}
                              scope="col"
                              className="relative p-3.5 sm:p-4.5 align-top text-center transition-colors"
                              style={{
                                backgroundColor: isFeatured
                                  ? "rgba(26,58,58,0.06)"
                                  : "transparent",
                                borderRight:
                                  idx !== plans.length - 1
                                    ? "1px solid var(--hairline)"
                                    : "none",
                              }}
                            >
                              {/* Featured Badge */}
                              {isFeatured && (
                                <div
                                  className="absolute top-0 left-1/2 -translate-x-1/2 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-b-md"
                                  style={{
                                    backgroundColor: "var(--brand-ochre)",
                                    color: "var(--ink)",
                                  }}
                                >
                                  {plan.badge || "⭐ Most Popular"}
                                </div>
                              )}

                              <div className={isFeatured ? "pt-2.5" : ""}>
                                {/* Plan Name */}
                                <h3
                                  className="text-base sm:text-lg font-bold tracking-tight mb-0.5"
                                  style={{ color: "var(--ink)" }}
                                >
                                  {plan.name}
                                </h3>
                                <p
                                  className="text-[11px] mb-2 truncate"
                                  style={{ color: "var(--muted)" }}
                                  title={plan.tagline}
                                >
                                  {plan.tagline}
                                </p>

                                {/* Price */}
                                <div className="mb-2">
                                  {!isLetTalk ? (
                                    <div className="flex items-baseline justify-center gap-0.5">
                                      <span
                                        style={{
                                          fontSize: "14px",
                                          fontWeight: 600,
                                          color: "var(--muted)",
                                        }}
                                      >
                                        {plan.currency || "£"}
                                      </span>
                                      <span
                                        style={{
                                          fontSize: "clamp(22px, 2.5vw, 28px)",
                                          fontWeight: 700,
                                          letterSpacing: "-0.5px",
                                          color: "var(--ink)",
                                        }}
                                      >
                                        {displayPrice}
                                      </span>
                                      <span
                                        style={{
                                          fontSize: "11px",
                                          color: "var(--muted-soft)",
                                          fontWeight: 500,
                                        }}
                                      >
                                        {plan.period || "/mo"}
                                      </span>
                                    </div>
                                  ) : (
                                    <div
                                      style={{
                                        fontSize: "18px",
                                        fontWeight: 700,
                                        color: "var(--ink)",
                                      }}
                                    >
                                      Let&apos;s Talk
                                    </div>
                                  )}
                                </div>

                                {/* Lead Badge */}
                                <div className="mb-3">
                                  <span
                                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1 text-xs sm:text-[13px] font-semibold rounded-full"
                                    style={{
                                      backgroundColor: isFeatured
                                        ? "var(--brand-teal)"
                                        : "var(--surface-card)",
                                      color: isFeatured ? "#ffffff" : "var(--body-strong)",
                                      border: isFeatured
                                        ? "none"
                                        : "1px solid var(--hairline)",
                                    }}
                                  >
                                    {Number(plan.leads) > 0 ? (
                                      <>
                                        <span className="text-sm sm:text-base font-extrabold">{plan.leads}</span>
                                        <span className="text-[11px] sm:text-xs">Leads / mo</span>
                                      </>
                                    ) : (
                                      <span>{plan.leadsLabel || "Free Profile"}</span>
                                    )}
                                  </span>
                                </div>

                                {/* Header CTA Button */}
                                <a
                                  href="#contact-form"
                                  className="w-full inline-flex items-center justify-center font-semibold text-xs h-8.5 py-1.5 px-2.5 rounded-lg transition-all duration-200 no-underline hover:opacity-90"
                                  style={{
                                    backgroundColor: isFeatured
                                      ? "var(--brand-teal)"
                                      : "var(--primary)",
                                    color: "#ffffff",
                                    boxShadow: isFeatured
                                      ? "0 2px 10px rgba(26,58,58,0.22)"
                                      : "none",
                                  }}
                                >
                                  {!isLetTalk ? "Choose Plan" : "Contact Us"}
                                </a>
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>

                    {/* Table Body: Compact Dynamic Rows */}
                    <tbody>
                      {/* 1. Monthly Leads Quota Row */}
                      <tr
                        className="transition-colors hover:bg-black/[0.02]"
                        style={{
                          backgroundColor: "transparent",
                          borderBottom: "1px solid var(--hairline)",
                        }}
                      >
                        <th
                          scope="row"
                          className="py-2.5 sm:py-3 px-3.5 sm:px-4.5 font-normal align-middle"
                          style={{
                            borderRight: "1px solid var(--hairline)",
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="w-5 h-5 rounded flex items-center justify-center shrink-0"
                              style={{
                                backgroundColor: "var(--surface-card)",
                                color: "var(--brand-teal)",
                                border: "1px solid var(--hairline)",
                              }}
                            >
                              <ClearCheckIcon size={11} />
                            </span>
                            <div className="font-semibold text-xs sm:text-[13px]" style={{ color: "var(--ink)" }}>
                              Monthly Qualified Leads
                            </div>
                          </div>
                        </th>

                        {plans.map((plan, planIdx) => {
                          const isFeatured = Boolean(plan.featured);
                          const leadsNum = Number(plan.leads);

                          return (
                            <td
                              key={plan.id || planIdx}
                              className="py-2.5 sm:py-3 px-2 text-center align-middle"
                              style={{
                                backgroundColor: isFeatured
                                  ? "rgba(26,58,58,0.04)"
                                  : "transparent",
                                borderRight:
                                  planIdx !== plans.length - 1
                                    ? "1px solid var(--hairline)"
                                    : "none",
                              }}
                            >
                              <span
                                className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-[13px] font-semibold px-3 py-1 rounded-lg"
                                style={{
                                  backgroundColor: isFeatured
                                    ? "rgba(26,58,58,0.12)"
                                    : "var(--surface-card)",
                                  color: isFeatured ? "var(--brand-teal)" : "var(--ink)",
                                  border: "1px solid var(--hairline)",
                                }}
                              >
                                {leadsNum > 0 ? (
                                  <>
                                    <span className="text-sm sm:text-base font-extrabold">{leadsNum}</span>
                                    <span className="text-[11px] sm:text-xs">Leads / mo</span>
                                  </>
                                ) : (
                                  <span>{plan.leadsLabel || "Free Profile"}</span>
                                )}
                              </span>
                            </td>
                          );
                        })}
                      </tr>

                      {/* 2. All Database Features Rows */}
                      {dynamicFeatures.map((featureName, featureIdx) => {
                        const isEven = featureIdx % 2 === 1;

                        return (
                          <tr
                            key={featureName}
                            className="transition-colors hover:bg-black/[0.02]"
                            style={{
                              backgroundColor: isEven ? "transparent" : "var(--surface-soft)",
                              borderBottom: "1px solid var(--hairline)",
                            }}
                          >
                            {/* Feature Name */}
                            <th
                              scope="row"
                              className="py-2.5 sm:py-3 px-3.5 sm:px-4.5 font-normal align-middle"
                              style={{
                                borderRight: "1px solid var(--hairline)",
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-5 h-5 rounded flex items-center justify-center shrink-0"
                                  style={{
                                    backgroundColor: "var(--surface-card)",
                                    color: "var(--brand-teal)",
                                    border: "1px solid var(--hairline)",
                                  }}
                                >
                                  {(() => {
                                    const IC = FeatureIconMap[featureName];
                                    return IC ? <IC size={12} /> : <ClearCheckIcon size={12} />;
                                  })()}
                                </span>
                                <div
                                  className="font-medium text-xs sm:text-[13px]"
                                  style={{ color: "var(--ink)" }}
                                >
                                  {featureName}
                                </div>
                              </div>
                            </th>

                            {/* Plan Inclusion Check */}
                            {plans.map((plan, planIdx) => {
                              const isFeatured = Boolean(plan.featured);
                              const isIncluded = Array.isArray(plan.features) && plan.features.includes(featureName);

                              return (
                                <td
                                  key={plan.id || planIdx}
                                  className="py-2.5 sm:py-3 px-2 text-center align-middle"
                                  style={{
                                    backgroundColor: isFeatured
                                      ? "rgba(26,58,58,0.04)"
                                      : "transparent",
                                    borderRight:
                                      planIdx !== plans.length - 1
                                        ? "1px solid var(--hairline)"
                                        : "none",
                                  }}
                                >
                                  {isIncluded ? (
                                    <div className="inline-flex items-center justify-center w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-emerald-600 text-white shadow-2xs ring-2 ring-emerald-600/20">
                                      <ClearCheckIcon size={12} />
                                    </div>
                                  ) : (
                                    <span
                                      className="inline-block text-sm font-bold select-none text-stone-300 dark:text-stone-600"
                                    >
                                      —
                                    </span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>

                    {/* Table Footer: Action Row */}
                    <tfoot>
                      <tr
                        style={{
                          borderTop: "1.5px solid var(--hairline)",
                          backgroundColor: "var(--surface-soft)",
                        }}
                      >
                        <td
                          className="py-3 px-3.5 sm:px-4.5 text-xs font-medium"
                          style={{
                            color: "var(--muted)",
                            borderRight: "1px solid var(--hairline)",
                          }}
                        >
                          <div className="font-semibold text-xs sm:text-sm" style={{ color: "var(--ink)" }}>
                            Ready to scale?
                          </div>
                          <div className="text-[11px]">Select a plan to start exporting.</div>
                        </td>

                        {plans.map((plan, idx) => {
                          const isFeatured = Boolean(plan.featured);
                          const displayPrice =
                            plan.priceDisplay !== undefined && plan.priceDisplay !== null
                              ? String(plan.priceDisplay)
                              : String(plan.price || "0");
                          const isLetTalk =
                            !displayPrice ||
                            displayPrice.toLowerCase().includes("talk") ||
                            displayPrice.toLowerCase().includes("contact");

                          return (
                            <td
                              key={plan.id || idx}
                              className="py-3 px-3 text-center align-middle"
                              style={{
                                backgroundColor: isFeatured
                                  ? "rgba(26,58,58,0.06)"
                                  : "transparent",
                                borderRight:
                                  idx !== plans.length - 1
                                    ? "1px solid var(--hairline)"
                                    : "none",
                              }}
                            >
                              <a
                                href="#contact-form"
                                className="w-full inline-flex items-center justify-center font-semibold text-xs h-8.5 py-1.5 px-2.5 rounded-lg transition-all duration-200 no-underline hover:opacity-90"
                                style={{
                                  backgroundColor: isFeatured
                                    ? "var(--brand-teal)"
                                    : "var(--primary)",
                                  color: "#ffffff",
                                  boxShadow: isFeatured
                                    ? "0 2px 10px rgba(26,58,58,0.22)"
                                    : "none",
                                }}
                              >
                                {!isLetTalk ? `Get ${plan.name}` : "Contact Us"}
                              </a>
                            </td>
                          );
                        })}
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </FadeIn>
          </>
        )}

        {/* Trust Strip */}
        <FadeIn delay={0.3}>
          <div
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-6 p-3.5 sm:p-4 rounded-xl"
            style={{
              backgroundColor: "var(--surface-card)",
              border: "1px solid var(--hairline)",
            }}
          >
            {trustItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2"
                style={{ fontSize: "12px", color: "var(--body)", fontWeight: 500 }}
              >
                <span style={{ color: "var(--brand-teal)" }}>
                  <item.Icon size={15} />
                </span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}