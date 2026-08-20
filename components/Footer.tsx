"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "./MotionWrappers";
import { industries } from "@/data/industries";
import { industrySubcategories } from "@/data/newcate";
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com/goexports",
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
    href: "https://instagram.com/goexports",
    path: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2zm-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z",
  },
];

export default function Footer() {
  const subcategoriesColumns = industries.map((industry) => {
    const subcats = industrySubcategories[industry.name] || [];
    return {
      title: industry.title,
      slug: industry.slug,
      items: subcats.map((sub) => sub.name),
    };
  });

  return (
    <footer style={{ backgroundColor: "var(--surface-soft)", borderTop: "1px solid var(--hairline)" }}>
      {/* Pre-footer CTA band */}
      <div
        style={{
          backgroundColor: "var(--surface-strong)",
          borderBottom: "1px solid var(--hairline)",
          padding: "80px 0",
        }}
      >
        <div className="section-wrap text-center">
          <span
            className="inline-block mb-5 caption-upper"
            style={{
              color: "var(--muted)",
              backgroundColor: "var(--surface-card)",
              padding: "6px 16px",
              borderRadius: "var(--r-pill)",
            }}
          >
            Get Started Today
          </span>
          <h2
            className="mb-5 mx-auto"
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 500,
              letterSpacing: "-1px",
              color: "var(--ink)",
              maxWidth: "580px",
            }}
          >
            Turn your global trade ideas into reality today
          </h2>
          <p
            className="mb-8 mx-auto"
            style={{
              fontSize: "16px",
              color: "var(--muted)",
              maxWidth: "460px",
              lineHeight: 1.6,
            }}
          >
            Connect with verified international buyers and grow your export business across 190+ countries.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#contact-form" className="btn-primary">
              Get Buyer Leads
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
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Footer body */}
      <div className="section-wrap py-16">
        <FadeIn>
          {/* Top row: logo + contact + social */}
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-12 pb-10" style={{ borderBottom: "1px solid var(--hairline)" }}>
            {/* Logo + tagline */}
            <div className="flex flex-col gap-4 max-w-[260px]">
              <Link href="/" className="no-underline">
                <Image src="/logo/logo.png" alt="Goexports Logo" width={140} height={36} />
              </Link>
              <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
                Your global sourcing platform for connecting exporters with verified international buyers across 190+ countries.
              </p>
              {/* Social icons */}
              <div className="flex gap-2 mt-1">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center transition-colors duration-200"
                    style={{
                      border: "1px solid var(--hairline)",
                      borderRadius: "50%",
                      color: "var(--muted)",
                    }}
                    title={social.label}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-3">
              <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>Contact</p>
              <div style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.8 }}>
                <div>
                  <span style={{ fontWeight: 600, color: "var(--body-strong)" }}>Email: </span>
                  <a
                    href="mailto:info@goexports.co.uk"
                    className="no-underline transition-colors"
                    style={{ color: "var(--muted)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                  >
                    info@goexports.co.uk
                  </a>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="flex flex-col gap-3">
              <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>Quick Links</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Industries", href: "#industries" },
                  { label: "Pricing", href: "#pricing" },
                  { label: "Contact", href: "#contact-form" },
                  { label: "Terms of Service", href: "/tos" },
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Cookies", href: "/cookies" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="no-underline transition-colors"
                    style={{ fontSize: "13px", color: "var(--muted)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Industry columns */}
        <FadeIn delay={0.15}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 mb-12 pb-10" style={{ borderBottom: "1px solid var(--hairline)" }}>
            {subcategoriesColumns.map((column, i) => (
              <div key={i}>
                <h3
                  className="mb-4"
                  style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink)" }}
                >
                  {column.title}
                </h3>
                <div className="w-8 h-0.5 rounded mb-4" style={{ backgroundColor: "var(--hairline)" }} />
                <ul className="space-y-2 list-none p-0 m-0">
                  {column.items.slice(0, 4).map((item, j) => (
                    <>
                      <li key={j}>
                        <a
                          href={`/${column.slug}`}
                          className="no-underline transition-colors flex items-center gap-1.5"
                          style={{ fontSize: "13px", color: "var(--muted)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                        >
                          <span style={{ color: "var(--muted-soft)" }}>›</span>
                          {item}
                        </a>
                      </li>
                      <li>
                        <a
                          href={`/${column.slug}`}
                          className="no-underline transition-colors flex items-center gap-1.5"
                          style={{ fontSize: "13px", color: "var(--muted-soft)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-soft)")}
                        >
                          <span>›</span>
                          100+ More...
                        </a>
                      </li>
                    </>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Bottom bar */}
        <FadeIn delay={0.3}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span style={{ fontSize: "12px", color: "var(--muted-soft)" }}>
              © 2025 GoExports. All rights reserved.
            </span>
            <div className="flex items-center gap-4">
              <span style={{ fontSize: "12px", color: "var(--muted-soft)", marginRight: "4px" }}>We Accept:</span>
              {[
                { name: "Visa", icon: FaCcVisa },
                { name: "Mastercard", icon: FaCcMastercard },
                { name: "PayPal", icon: FaCcPaypal },
                { name: "American Express", icon: FaCcAmex },
              ].map((payment, i) => {
                const Icon = payment.icon;
                return (
                  <div key={i} title={payment.name}>
                    <Icon size={20} style={{ color: "var(--muted)" }} />
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}