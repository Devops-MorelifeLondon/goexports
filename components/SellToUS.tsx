"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FeatureIconMap,
  IconLock,
  IconFileText,
  IconRefreshCw,
  IconMessageCircle,
} from "./Icons";

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
  const [activePlan, setActivePlan] = useState<number>(2);

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
              // Set active plan to featured one if available
              const featuredIndex = data.packages.findIndex((p: PackagePlan) => p.featured);
              if (featuredIndex !== -1) {
                setActivePlan(featuredIndex);
              }
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

  return (
    <section
      id="pricing"
      style={{
        backgroundColor: "var(--canvas)",
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
      }}
    >
      <div className="section-wrap">
        <FadeIn>
          <div className="text-center mb-14">
            <span
              className="inline-block mb-4 caption-upper"
              style={{
                color: "var(--muted)",
                backgroundColor: "var(--surface-card)",
                padding: "6px 16px",
                borderRadius: "var(--r-pill)",
              }}
            >
              Pricing Plans
            </span>
            <h2
              className="mb-4"
              style={{
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 500,
                lineHeight: 1.05,
                letterSpacing: "-2px",
                color: "var(--ink)",
              }}
            >
              Find International Buyers Plans
            </h2>
            <p
              className="mx-auto"
              style={{
                fontSize: "16px",
                color: "var(--muted)",
                maxWidth: "520px",
                lineHeight: 1.6,
              }}
            >
              Choose the right plan to connect with verified global buyers and grow your import export business with international trade leads.
            </p>
          </div>
        </FadeIn>

        {loading && plans.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="animate-pulse flex flex-col h-80 rounded-2xl"
                style={{
                  backgroundColor: "var(--surface-card)",
                  border: "1px solid var(--hairline)",
                  padding: "var(--space-xl)",
                }}
              >
                <div className="h-6 w-32 bg-gray-200 dark:bg-zinc-800 rounded mb-3" />
                <div className="h-4 w-48 bg-gray-200 dark:bg-zinc-800 rounded mb-6" />
                <div className="h-10 w-24 bg-gray-200 dark:bg-zinc-800 rounded mb-8" />
                <div className="space-y-2 flex-1">
                  <div className="h-3 w-full bg-gray-200 dark:bg-zinc-800 rounded" />
                  <div className="h-3 w-4/5 bg-gray-200 dark:bg-zinc-800 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {plans.map((plan, i) => {
              const isActive = activePlan === i;
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
                <FadeIn key={plan.id || i} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    onClick={() => setActivePlan(i)}
                    className="relative flex flex-col h-full cursor-pointer"
                    style={{
                      backgroundColor: isFeatured ? "var(--brand-teal)" : "var(--canvas)",
                      border: isFeatured
                        ? "none"
                        : isActive
                        ? "2px solid var(--primary)"
                        : "1px solid var(--hairline)",
                      borderRadius: "var(--r-lg)",
                      padding: "var(--space-xl)",
                      transition: "box-shadow 0.2s, border-color 0.2s",
                      boxShadow:
                        isActive && !isFeatured
                          ? "0 12px 40px rgba(10,10,10,0.10)"
                          : isFeatured
                          ? "0 20px 60px rgba(26,58,58,0.30)"
                          : "none",
                    }}
                  >
                    {/* Featured badge */}
                    {isFeatured && (
                      <div
                        className="absolute -top-px right-6 px-4 py-1.5"
                        style={{
                          backgroundColor: "var(--brand-ochre)",
                          color: "var(--ink)",
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          borderRadius: "0 0 var(--r-sm) var(--r-sm)",
                        }}
                      >
                        {plan.badge || "⭐ Most Popular"}
                      </div>
                    )}

                    {/* Plan header */}
                    <div className="mb-6">
                      <h3
                        className="mb-1"
                        style={{
                          fontSize: "24px",
                          fontWeight: 600,
                          letterSpacing: "-0.3px",
                          color: isFeatured ? "#ffffff" : "var(--ink)",
                        }}
                      >
                        {plan.name}
                      </h3>
                      <p
                        style={{
                          fontSize: "13px",
                          color: isFeatured ? "rgba(255,255,255,0.6)" : "var(--muted)",
                        }}
                      >
                        {plan.tagline}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      {!isLetTalk ? (
                        <div className="flex items-baseline gap-1">
                          <span
                            style={{
                              fontSize: "20px",
                              fontWeight: 500,
                              color: isFeatured ? "rgba(255,255,255,0.7)" : "var(--muted)",
                            }}
                          >
                            {plan.currency || "£"}
                          </span>
                          <span
                            style={{
                              fontSize: "clamp(28px, 4vw, 40px)",
                              fontWeight: 500,
                              letterSpacing: "-1px",
                              color: isFeatured ? "#ffffff" : "var(--ink)",
                            }}
                          >
                            {displayPrice}
                          </span>
                          <span
                            style={{
                              fontSize: "13px",
                              color: isFeatured ? "rgba(255,255,255,0.5)" : "var(--muted-soft)",
                            }}
                          >
                            {plan.period || "/ month"}
                          </span>
                        </div>
                      ) : (
                        <div
                          style={{
                            fontSize: "clamp(28px, 4vw, 40px)",
                            fontWeight: 500,
                            letterSpacing: "-1px",
                            color: "var(--ink)",
                          }}
                        >
                          Let&apos;s Talk
                        </div>
                      )}

                      {/* Leads badge */}
                      <div
                        className="inline-flex items-center gap-1.5 mt-3"
                        style={{
                          backgroundColor: isFeatured
                            ? "rgba(255,255,255,0.12)"
                            : "var(--surface-card)",
                          color: isFeatured ? "#ffffff" : "var(--body-strong)",
                          padding: "5px 12px",
                          borderRadius: "var(--r-pill)",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        <span style={{ fontSize: "16px", fontWeight: 700 }}>{plan.leads}</span>
                        <span style={{ opacity: 0.7 }}>
                          {plan.leadsLabel || "Qualified Leads / Month"}
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div
                      className="mb-6"
                      style={{
                        height: "1px",
                        backgroundColor: isFeatured
                          ? "rgba(255,255,255,0.15)"
                          : "var(--hairline)",
                      }}
                    />

                    {/* Features */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 mb-8">
                      {(plan.features || []).map((feature, j) => (
                        <div
                          key={j}
                          className="flex items-center gap-2.5"
                          style={{
                            fontSize: "13px",
                            color: isFeatured ? "rgba(255,255,255,0.75)" : "var(--body)",
                          }}
                        >
                          <span
                            className="w-6 h-6 flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: isFeatured
                                ? "rgba(255,255,255,0.12)"
                                : "var(--surface-card)",
                              borderRadius: "var(--r-xs)",
                              color: isFeatured ? "rgba(255,255,255,0.85)" : "var(--muted)",
                            }}
                          >
                            {(() => {
                              const IC = FeatureIconMap[feature];
                              return IC ? <IC size={13} /> : <IconLock size={13} />;
                            })()}
                          </span>
                          <span style={{ fontWeight: 500 }}>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <a
                      href="#contact-form"
                      className="block text-center no-underline font-semibold transition-opacity duration-200 hover:opacity-85"
                      style={{
                        padding: "12px 20px",
                        height: "44px",
                        lineHeight: "20px",
                        backgroundColor: isFeatured ? "#ffffff" : "var(--primary)",
                        color: isFeatured ? "var(--ink)" : "var(--on-primary)",
                        fontSize: "14px",
                        fontWeight: 600,
                        borderRadius: "var(--r-md)",
                      }}
                    >
                      {!isLetTalk ? "Get Started →" : "Contact Sales →"}
                    </a>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        )}

        {/* Trust strip */}
        <FadeIn delay={0.5}>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
            {trustItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2"
                style={{ fontSize: "13px", color: "var(--muted)", fontWeight: 500 }}
              >
                <item.Icon size={14} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}