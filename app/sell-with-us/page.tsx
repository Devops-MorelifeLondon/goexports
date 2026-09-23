import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SellWithUsForm from "./SellWithUsForm";
import {
  ShieldCheck,
  TrendingUp,
  Globe2,
  Users2,
  Building2,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sell With Us | Goexports - Become a Verified Supplier",
  description:
    "Partner with Goexports to sell your products to verified international buyers and bulk domestic procurement teams. Zero commission, direct buyer RFQs.",
  keywords: [
    "sell with us",
    "become a supplier",
    "b2b supplier onboarding",
    "export products from india",
    "wholesale bulk suppliers",
    "manufacturer directory",
  ],
};

export default function SellWithUsPage() {
  return (
    <main className="min-h-screen pt-8 pb-20 bg-[var(--canvas)]">
      <div className="section-wrap">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[var(--muted)] mb-6">
          <Link href="/" className="hover:text-[var(--ink)] transition-colors no-underline text-[var(--muted)]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[var(--ink)] font-medium">Sell With Us</span>
        </nav>

        {/* Hero section */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-[var(--hairline)] bg-[var(--surface-card)] text-[var(--ink)]">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-ochre)] animate-pulse" />
            Supplier Partnership Program
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--ink)] mb-4">
            Sell With <span style={{ color: "var(--brand-ochre)" }}>Goexports</span> & Reach Buyers Worldwide
          </h1>
          <p className="text-[var(--muted)] text-base sm:text-lg leading-relaxed max-w-2xl">
            Are you a manufacturer, mill owner, farmer producer, or direct exporter? List your products with Goexports to receive pre-qualified bulk inquiries from international and domestic buyers.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Form */}
          <div className="lg:col-span-8">
            <SellWithUsForm />
          </div>

          {/* Right: Partner Benefits */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-card)]">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[var(--brand-ochre)]" />
                <h3 className="text-base font-bold text-[var(--ink)]">
                  Why Sell on Goexports?
                </h3>
              </div>
              <ul className="space-y-4 text-xs sm:text-sm text-[var(--body)] p-0 m-0 list-none">
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Verified Commercial Leads:</strong> Connect with authentic import houses and enterprise food processors ready to place volume orders.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Globe2 className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Dual Market Exposure:</strong> Expand your distribution both across domestic wholesale markets and high-margin overseas ports.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <TrendingUp className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>0% Transaction Fees:</strong> You negotiate and close contracts directly with buyers. We never clip your ticket.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Users2 className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Dedicated Account Matchmaking:</strong> Our trade experts match your supply capacity directly with relevant open purchase RFQs.
                  </span>
                </li>
              </ul>
            </div>

            {/* Steps Card */}
            <div className="p-6 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-soft)]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3">
                How It Works
              </h4>
              <div className="space-y-3 text-xs text-[var(--body)]">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[var(--ink)] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    1
                  </span>
                  <div>
                    <span className="font-bold text-[var(--ink)]">Submit Your Products:</span> Tell us what you supply, MOQ, and certifications.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[var(--brand-ochre)] text-[var(--ink)] text-[10px] font-bold flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div>
                    <span className="font-bold text-[var(--ink)]">Catalog Onboarding:</span> Our category manager reviews and indexes your items.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    3
                  </span>
                  <div>
                    <span className="font-bold text-[var(--ink)]">Receive Inquiries:</span> Get matched with verified purchase orders and container requests.
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Help */}
            <div className="p-5 rounded-2xl border border-dashed border-[var(--hairline)] bg-[var(--canvas)] text-center">
              <p className="text-xs text-[var(--muted)] m-0">
                Prefer to talk with our supplier acquisition team directly?
              </p>
              <a
                href="mailto:info@goexports.co.uk"
                className="inline-block mt-2 text-xs font-bold text-[var(--ink)] hover:text-amber-700 underline"
              >
                info@goexports.co.uk
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
