"use client";

import { motion } from "framer-motion";
import { FadeIn } from "./MotionWrappers";
import {
  IconVerified, IconGlobe, IconRocket, IconHandshake,
  IconPackage, IconTrendingUp,
} from "./Icons";

const benefits = [
  {
    Icon: IconVerified,
    title: "Verified International Buyer Leads",
    description: "Connect with pre-verified buyers who are actively looking for your products. No more time wasted on unqualified leads.",
    highlight: "Verified Buyers",
    cardColor: "var(--brand-pink)",
    dark: true,
  },
  {
    Icon: IconGlobe,
    title: "Global Trade Opportunities",
    description: "Access buyers across all industries and regions worldwide. Expand your export business to new international markets.",
    highlight: "190+ Countries",
    cardColor: "var(--brand-teal)",
    dark: true,
  },
  {
    Icon: IconRocket,
    title: "Faster Market Expansion",
    description: "Our platform helps you find qualified buyers and start exporting sooner — without the delays of traditional lead generation.",
    highlight: "Quick Onboarding",
    cardColor: "var(--brand-lavender)",
    dark: false,
  },
  {
    Icon: IconHandshake,
    title: "Connect with Trusted Importers",
    description: "Build relationships with reliable importers and distributors who have been vetted for credibility and payment reliability.",
    highlight: "Trusted Partners",
    cardColor: "var(--brand-peach)",
    dark: false,
  },
  {
    Icon: IconPackage,
    title: "Access to Worldwide Distributors",
    description: "Reach global distribution networks that can scale your business — from regional retailers to multinational supply chains.",
    highlight: "Global Distribution",
    cardColor: "var(--brand-ochre)",
    dark: false,
  },
  {
    Icon: IconTrendingUp,
    title: "Increased Revenue Potential",
    description: "Tapping into international markets opens new revenue streams for your business beyond your existing domestic footprint.",
    highlight: "New Revenue Streams",
    cardColor: "var(--surface-card)",
    dark: false,
  },
];


export default function BenefitsForExporters() {
  return (
    <section
      id="benefits"
      style={{
        backgroundColor: "var(--surface-soft)",
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
      }}
    >
      <div className="section-wrap">
        <FadeIn>
          <div className="text-center mb-16">
            <span
              className="inline-block mb-4 caption-upper"
              style={{
                color: "var(--muted)",
                backgroundColor: "var(--surface-card)",
                padding: "6px 16px",
                borderRadius: "var(--r-pill)",
              }}
            >
              Why Choose GoExports
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
              Benefits for Exporters
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
              Discover why thousands of exporters choose GoExports to grow their international trade business and connect with verified global buyers.
            </p>
          </div>
        </FadeIn>

        {/* 6 saturated feature cards cycling through brand palette */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <FadeIn key={index} delay={index * 0.08}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="flex flex-col h-full"
                style={{
                  backgroundColor: benefit.cardColor,
                  borderRadius: "var(--r-xl)",
                  padding: "var(--space-xl)",
                }}
              >
                {/* Icon */}
                <div
                  className="mb-5 flex items-center justify-center w-11 h-11 rounded-xl"
                  style={{
                    backgroundColor: benefit.dark ? "rgba(255,255,255,0.15)" : "var(--canvas)",
                    color: benefit.dark ? "#ffffff" : "var(--ink)",
                  }}
                >
                  <benefit.Icon size={22} />
                </div>

                {/* Title */}
                <h3
                  className="mb-3"
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: benefit.dark ? "var(--on-primary)" : "var(--ink)",
                    lineHeight: 1.4,
                  }}
                >
                  {benefit.title}
                </h3>

                {/* Body */}
                <p
                  className="flex-1 mb-6"
                  style={{
                    fontSize: "14px",
                    color: benefit.dark ? "rgba(255,255,255,0.75)" : "var(--body)",
                    lineHeight: 1.6,
                  }}
                >
                  {benefit.description}
                </p>

                {/* Highlight badge */}
                <div
                  className="inline-flex items-center gap-2 self-start"
                  style={{
                    backgroundColor: benefit.dark ? "rgba(255,255,255,0.15)" : "var(--canvas)",
                    color: benefit.dark ? "var(--on-primary)" : "var(--ink)",
                    padding: "6px 14px",
                    borderRadius: "var(--r-pill)",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                  }}
                >
                  {benefit.highlight}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Pre-footer CTA band */}
        <FadeIn delay={0.4}>
          <div
            className="mt-16 text-center"
            style={{
              backgroundColor: "var(--surface-strong)",
              borderRadius: "var(--r-xl)",
              padding: "64px var(--space-xl)",
            }}
          >
            <h3
              className="mb-4"
              style={{
                fontSize: "clamp(28px, 3.5vw, 40px)",
                fontWeight: 500,
                letterSpacing: "-1px",
                color: "var(--ink)",
              }}
            >
              Ready to Grow Your Export Business?
            </h3>
            <p
              className="mb-8 mx-auto"
              style={{
                fontSize: "16px",
                color: "var(--muted)",
                maxWidth: "520px",
                lineHeight: 1.6,
              }}
            >
              Join thousands of successful exporters who are already connecting with verified international buyers through GoExports.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#contact-form" className="btn-primary">
                Start Free Trial
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=917042059572&text=I+would+like+to+consult+with+Goexports(FinacBooks))&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Schedule Demo
              </a>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
