import { Metadata } from "next";
import ExportProfileForm from "./ExportProfileForm";
import { CheckCircle2, ShieldCheck, Globe2, TrendingUp, Users2, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Export Profile | Goexports - Connect with Verified Global Buyers",
  description:
    "Create your official exporter profile on Goexports. Showcase your products, company certifications, and export capabilities to verified international buyers worldwide.",
  keywords: [
    "create export profile",
    "register export business",
    "verified exporter directory",
    "find international buyers",
    "global trade leads",
    "b2b export portal",
    "importers and exporters directory",
    "international trade profile"
  ],
  openGraph: {
    title: "Create Export Profile | Goexports - Connect with Global Buyers",
    description:
      "Register your export business on Goexports. Build your profile, showcase your products, and receive direct buyer inquiries worldwide.",
    url: "https://www.goexports.co.uk/create-export-profile",
  },
};

export default function CreateExportProfilePage() {
  return (
    <main className="min-h-screen pt-8 pb-20" style={{ backgroundColor: "var(--canvas)" }}>
      {/* Header Banner */}
      <div className="section-wrap">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[var(--muted)] mb-6">
          <Link href="/" className="hover:text-[var(--ink)] transition-colors no-underline text-[var(--muted)]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[var(--ink)] font-medium">Create Export Profile</span>
        </nav>

        {/* Hero title area */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-[var(--hairline)] bg-[var(--surface-card)] text-[var(--ink)]">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-ochre)] animate-pulse" />
            Global Exporter Registration
          </div>
          <h1
            className="display-lg text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[var(--ink)] mb-4"
            style={{ lineHeight: 1.15 }}
          >
            Create Your <span style={{ color: "var(--brand-ochre)" }}>Export Profile</span> & Connect with Global Buyers
          </h1>
          <p className="text-[var(--muted)] text-base sm:text-lg leading-relaxed max-w-2xl">
            Register your company on Goexports to get verified and showcase your products to vetted importers, distributors, and procurement managers worldwide.
          </p>
        </div>

        {/* 2-Column Layout: Form on Left/Center, Benefits on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Form Area */}
          <div className="lg:col-span-8">
            <ExportProfileForm />
          </div>

          {/* Sidebar: Trust & Benefits */}
          <div className="lg:col-span-4 space-y-6">
            {/* Value Card */}
            <div
              className="p-6 rounded-2xl border border-[var(--hairline)]"
              style={{ backgroundColor: "var(--surface-card)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[var(--brand-ochre)]" />
                <h2 className="text-base font-semibold text-[var(--ink)]">
                  Why Register on Goexports?
                </h2>
              </div>
              <ul className="space-y-3.5 text-sm text-[var(--body)] p-0 m-0 list-none">
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Verified Exporter Badge:</strong> Boost trust and buyer confidence with verified company credentials.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Globe2 className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Global Reach:</strong> Your profile is indexed and searchable by verified international procurement teams.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <TrendingUp className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>0% Commission on Deals:</strong> You transact directly with buyers. We never take a cut of your export contracts.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Users2 className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Direct Buyer Inquiries:</strong> Receive verified RFQs, inquiries, and quotation requests straight to your email & phone.
                  </span>
                </li>
              </ul>
            </div>

            {/* Quick Process Steps */}
            <div
              className="p-6 rounded-2xl border border-[var(--hairline)]"
              style={{ backgroundColor: "var(--surface-soft)" }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)] mb-4">
                What Happens Next?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--ink)]">Profile Submission</h4>
                    <p className="text-xs text-[var(--muted)] mt-0.5">
                      Submit your company, category, and export capability details.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--brand-ochre)] text-[var(--ink)] text-xs font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--ink)]">Trade Verification</h4>
                    <p className="text-xs text-[var(--muted)] mt-0.5">
                      Our verification desk reviews your business identity within 24 business hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--ink)]">Live Directory & Buyer Leads</h4>
                    <p className="text-xs text-[var(--muted)] mt-0.5">
                      Your profile goes live and verified buyers can send direct sourcing inquiries.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Callout */}
            <div
              className="p-6 rounded-2xl border border-dashed border-[var(--hairline)]"
              style={{ backgroundColor: "var(--canvas)" }}
            >
              <p className="text-xs font-medium text-[var(--muted)]">
                Need assistance with bulk catalog uploading or custom buyer sourcing?
              </p>
              <div className="mt-3 flex items-center justify-between">
                <a
                  href="mailto:info@goexports.co.uk"
                  className="text-xs font-semibold text-[var(--ink)] underline hover:text-[var(--brand-ochre)] transition-colors"
                >
                  Contact Support Desk →
                </a>
                <span className="text-[11px] text-[var(--muted-soft)]">Helpdesk</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
