"use client";

import { motion } from "framer-motion";
import { FadeIn } from "./MotionWrappers";

const steps = [
  {
    number: "01",
    title: "Submit your product details",
    description: "Tell us about your products, industry, and export requirements. Our platform makes it simple to get started.",
  },
  {
    number: "02",
    title: "We find verified global buyers",
    description: "Our AI-powered system matches you with pre-verified international buyers actively looking for your products.",
  },
  {
    number: "03",
    title: "Receive qualified buyer leads",
    description: "Get direct access to verified buyer contacts, complete with product requirements and purchasing details.",
  },
  {
    number: "04",
    title: "Start exporting internationally",
    description: "Connect directly with buyers, negotiate deals, and expand your export business to new global markets.",
  },
];

export default function HowPlatformWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        backgroundColor: "var(--canvas)",
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
      }}
    >
      <div className="section-wrap">
        <FadeIn>
          <div className="text-center mb-16">
            {/* Section label */}
            <span
              className="inline-block mb-4 caption-upper"
              style={{
                color: "var(--muted)",
                backgroundColor: "var(--surface-card)",
                padding: "6px 16px",
                borderRadius: "var(--r-pill)",
              }}
            >
              Simple Process
            </span>
            <h2
              className="mb-4 mx-auto"
              style={{
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 500,
                lineHeight: 1.05,
                letterSpacing: "-2px",
                color: "var(--ink)",
                maxWidth: "640px",
              }}
            >
              How Our Platform Works
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
              Start exporting internationally in 4 simple steps. Connect with verified global buyers and grow your import export business.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative"
              >
                {/* Step circle */}
                <div className="mb-6">
                  <div
                    className="w-14 h-14 flex items-center justify-center"
                    style={{
                      backgroundColor: "var(--primary)",
                      color: "var(--on-primary)",
                      borderRadius: "var(--r-pill)",
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <h3
                  className="mb-3"
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "var(--ink)",
                    lineHeight: 1.4,
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.6 }}>
                  {step.description}
                </p>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-7 pointer-events-none"
                    style={{
                      left: "60px",
                      right: "-32px",
                      height: "1px",
                      backgroundColor: "var(--hairline)",
                    }}
                  />
                )}
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.5}>
          <div className="text-center mt-16">
            <a
              href="#contact-form"
              className="btn-primary inline-flex"
            >
              Start Exporting Today
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
