"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { Industry } from "@/data/industries";
import { industrySubcategories } from "@/data/newcate";
import industryContent from "@/data/industry-content-2.json";
import GetInTouchForm from "@/components/GetInTouchForm";
import SellToUS from "@/components/SellToUS";
import {
  IconVerified,
  IconGlobe,
  IconRocket,
  IconHandshake,
  IconPackage,
  IconTrendingUp,
} from "@/components/Icons";
import { ShieldCheck, CheckCircle2, MessageSquare, ArrowRight, Layers, HelpCircle, FileText } from "lucide-react";

/* ─── Animation helper ─── */
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Props ─── */
interface Props {
  industry: Industry;
  related: Industry[];
  slug: string;
}

/* ─── Main Component ─── */
export default function IndustryClient({ industry, related, slug }: Props) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Get content for this industry from JSON
  const industryData = industryContent.industries.find((item) => item.slug === slug);

  // Get subcategories for this industry
  const subcategories = industrySubcategories[industry.name] || [];
  const activeSubcategory = subcategories[activeCategory];

  // Use content from JSON if available, otherwise fallback to industry data
  const heroData = industryData?.hero || {
    h1: industry.title,
    description: industry.desc,
  };

  const whyChooseUsData = industryData?.whychooseus || {
    title: `Why Choose ${industry.title}`,
    description: `Discover the advantages of partnering with us for your ${industry.title.toLowerCase()} business.`,
    points: industry.benefits.map((benefit, i) => ({
      title: `Benefit ${i + 1}`,
      description: benefit,
    })),
  };

  const faqsData = industryData?.faqs || [];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F1111] antialiased">
      {/* ═══ HERO SECTION ═══ */}
      <section id="hero" className="relative bg-white border-b border-[#e7e7e7] overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #111 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <FadeIn>
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs sm:text-sm text-[#767676]">
                <li>
                  <Link href="/" className="hover:text-[#0F1111] transition-colors no-underline">
                    Home
                  </Link>
                </li>
                <li className="text-[#ccc]">/</li>
                <li className="text-[#0F1111] font-semibold">{industry.title}</li>
              </ol>
            </nav>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <FadeIn delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verified B2B Export Hub</span>
                </div>
              </FadeIn>

              <FadeIn delay={0.15}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.12] text-[#0F1111] tracking-tight">
                  {heroData.h1}
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-base sm:text-lg text-[#565959] leading-relaxed">
                  {heroData.description}
                </p>
              </FadeIn>

              <FadeIn delay={0.25}>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/917042059572?text=Hi%20GoExports,%20I'm%20interested%20in%20exporting%20${encodeURIComponent(
                      industry.title
                    )}%20products`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#111111] text-white font-bold text-sm rounded-full no-underline transition-all duration-200 hover:bg-[#333333] shadow-md hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Contact Us Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  {subcategories.length > 0 && (
                    <button
                      onClick={() =>
                        document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white border border-[#111111] text-[#0F1111] font-bold text-sm rounded-full transition-all duration-200 hover:bg-[#111111] hover:text-white cursor-pointer shadow-sm"
                    >
                      <Layers className="w-4 h-4" />
                      <span>Browse Categories</span>
                    </button>
                  )}
                </div>
              </FadeIn>

              {/* Trust Badges Chips */}
              <FadeIn delay={0.3}>
                <div className="pt-2">
                  <p className="text-xs font-semibold text-[#767676] mb-2.5 uppercase tracking-wider">
                    Industry Highlights & Badges
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {industry.highlights.slice(0, 5).map((highlight, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 bg-[#F5F5F5] border border-[#e7e7e7] rounded-full px-3.5 py-1.5 text-xs font-medium text-[#0F1111]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{highlight}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Hero Form */}
            <div className="lg:col-span-5 w-full">
              <FadeIn delay={0.2}>
                <div className="bg-white rounded-2xl border border-[#e7e7e7] shadow-xl p-2">
                  <GetInTouchForm />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW PLATFORM WORKS ═══ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white border-b border-[#e7e7e7]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <span className="inline-block bg-[#111111] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                Simple Process
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F1111] tracking-tight">
                How Our Platform Works
              </h2>
              <p className="text-[#565959] text-sm sm:text-base leading-relaxed">
                Start exporting {industry.title.toLowerCase()} products in 4 simple steps. Connect with verified global buyers and grow your export business.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                number: "01",
                title: "Submit Product Specs",
                description: `Share your ${industry.title.toLowerCase()} product list, specifications, and export capacities.`,
              },
              {
                number: "02",
                title: "AI Buyer Matching",
                description: "Our platform matches your offerings with pre-verified international importers actively sourcing.",
              },
              {
                number: "03",
                title: "Receive Verified RFQs",
                description: "Get direct access to genuine buyer inquiries with complete quantity and target pricing details.",
              },
              {
                number: "04",
                title: "Scale Global Exports",
                description: "Negotiate terms directly with international buyers and ship bulk orders across global markets.",
              },
            ].map((step, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="h-full bg-[#FAFAFA] border border-[#e7e7e7] rounded-2xl p-6 relative hover:border-[#111111] hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-[#111111] text-white rounded-xl flex items-center justify-center text-lg font-bold mb-4 shadow-sm">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-[#0F1111] mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[#565959] text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ALL CATEGORIES GRID ═══ */}
      {subcategories.length > 0 && (
        <section id="categories" className="py-12 sm:py-16 px-4 sm:px-6 scroll-mt-8 bg-[#FAFAFA] border-b border-[#e7e7e7]">
          <div className="max-w-[1200px] mx-auto">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
                <span className="inline-block bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                  Category Directory
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F1111] tracking-tight">
                  Buyer Leads by Product Category
                </h2>
                <p className="text-[#565959] text-sm sm:text-base leading-relaxed">
                  Browse verified buyer RFQs for {industry.title.toLowerCase()} across {subcategories.length} specialized export categories.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subcategories.map((cat, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <button
                    onClick={() => {
                      setActiveCategory(i);
                      document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between h-full ${
                      activeCategory === i
                        ? "bg-[#111111] text-white border-[#111111] shadow-lg"
                        : "bg-white text-[#0F1111] border-[#e7e7e7] hover:border-[#111111] hover:shadow-md"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className={`text-base font-bold ${activeCategory === i ? "text-white" : "text-[#0F1111]"}`}>
                          {cat.name}
                        </h4>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase shrink-0 ${
                          activeCategory === i ? "bg-white/20 text-white" : "bg-[#F5F5F5] text-[#565959]"
                        }`}>
                          {cat.items.length} Items
                        </span>
                      </div>
                      <p className={`text-xs leading-relaxed line-clamp-2 ${
                        activeCategory === i ? "text-white/70" : "text-[#565959]"
                      }`}>
                        {cat.items.join(" • ")}
                      </p>
                    </div>

                    <div className="pt-4 flex items-center justify-between text-xs font-semibold mt-2 border-t border-current/10">
                      <span>View Buyer Leads</span>
                      <span>→</span>
                    </div>
                  </button>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ BROWSE CATEGORY DETAIL ═══ */}
      {subcategories.length > 0 && activeSubcategory && (
        <section id="browse" className="py-12 sm:py-16 px-4 sm:px-6 bg-white scroll-mt-8 border-b border-[#e7e7e7]">
          <div className="max-w-[1200px] mx-auto">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1111] tracking-tight">
                  Active Buyer Requirements: {activeSubcategory.name}
                </h2>
                <p className="text-[#565959] text-sm leading-relaxed">
                  Select any category tab to view direct buyer sourcing demands and item breakdown.
                </p>
              </div>
            </FadeIn>

            {/* Category Tabs Pill Bar */}
            <FadeIn delay={0.05}>
              <div className="flex gap-2 justify-center mb-8 flex-wrap">
                {subcategories.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCategory(i)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all duration-200 border ${
                      activeCategory === i
                        ? "bg-[#111111] text-white border-[#111111] shadow-md"
                        : "bg-[#FAFAFA] text-[#565959] border-[#e7e7e7] hover:border-[#111111] hover:text-[#0F1111]"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </FadeIn>

            {/* Active Subcategory Details Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-[#FAFAFA] border border-[#e7e7e7] rounded-3xl p-6 sm:p-8 shadow-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Subcategory Info */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#111111] text-white text-xs font-bold">
                      <span>{industry.title}</span>
                      <span>•</span>
                      <span>Category Detail</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F1111]">
                      {activeSubcategory.name}
                    </h3>

                    <p className="text-sm text-[#565959] leading-relaxed">
                      Access pre-verified global buyer leads for <strong>{activeSubcategory.name.toLowerCase()}</strong>. International importers and distributors are actively seeking verified exporters for bulk contracts.
                    </p>

                    <div className="p-4 rounded-2xl bg-white border border-[#e7e7e7] space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#565959] font-medium">Matching Buyer RFQs:</span>
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          Active & Verified
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#565959] font-medium">Target Regions:</span>
                        <span className="font-bold text-[#0F1111]">Global (EU, US, UAE, Asia)</span>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/917042059572?text=Hi%20GoExports,%20I'm%20interested%20in%20buyer%20leads%20for%20${encodeURIComponent(
                        activeSubcategory.name
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#111111] text-white font-bold text-xs rounded-xl no-underline hover:bg-[#333333] transition-colors shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Inquire About {activeSubcategory.name} Leads</span>
                    </a>
                  </div>

                  {/* Right Column: Items Grid */}
                  <div className="lg:col-span-7 space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#767676] mb-3">
                      Sub-Products & Sourcing Requirements
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeSubcategory.items.map((item, i) => (
                        <div
                          key={i}
                          className="p-4 bg-white rounded-2xl border border-[#e7e7e7] hover:border-[#111111] transition-colors shadow-xs space-y-1.5"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                            <h5 className="text-sm font-bold text-[#0F1111] truncate">{item}</h5>
                          </div>
                          <p className="text-xs text-[#565959] leading-relaxed">
                            Verified importer RFQs active for bulk {item.toLowerCase()} export orders.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* ═══ WHY CHOOSE US ═══ */}
      <section id="why-choose-us" className="py-12 sm:py-16 px-4 sm:px-6 bg-[#FAFAFA] border-b border-[#e7e7e7] scroll-mt-8">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F1111] tracking-tight">
                {whyChooseUsData.title}
              </h2>
              <p className="text-[#565959] text-sm sm:text-base leading-relaxed">
                {whyChooseUsData.description}
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUsData.points.map((point, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="bg-white border border-[#e7e7e7] rounded-2xl p-6 hover:border-[#111111] hover:shadow-lg transition-all duration-200 h-full flex flex-col justify-between space-y-4">
                  <div>
                    <div className="w-10 h-10 bg-[#111111] text-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0F1111] mb-2">{point.title}</h3>
                    <p className="text-sm text-[#565959] leading-relaxed">{point.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BENEFITS FOR EXPORTERS ═══ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white border-b border-[#e7e7e7]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <span className="inline-block bg-[#111111] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                Why Choose GoExports
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F1111] tracking-tight">
                Benefits for {industry.title} Exporters
              </h2>
              <p className="text-[#565959] text-sm sm:text-base leading-relaxed">
                Discover why thousands of {industry.title.toLowerCase()} exporters choose GoExports to grow their international trade business.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                Icon: IconVerified,
                title: "Verified Buyer Leads",
                description: `Connect with pre-verified buyers actively looking for ${industry.title.toLowerCase()} products.`,
                highlight: "Verified Buyers",
              },
              {
                Icon: IconGlobe,
                title: "Global Trade Reach",
                description: `Access buyers across all regions worldwide for your ${industry.title.toLowerCase()} products.`,
                highlight: "Global Reach",
              },
              {
                Icon: IconRocket,
                title: "Faster Onboarding",
                description: `Our platform helps you list products and start receiving qualified buyer leads quickly.`,
                highlight: "Quick Setup",
              },
              {
                Icon: IconHandshake,
                title: "Trusted Importers",
                description: `Build relationships with reliable ${industry.title.toLowerCase()} importers vetted for credibility.`,
                highlight: "Trusted Partners",
              },
              {
                Icon: IconPackage,
                title: "Worldwide Distributors",
                description: `Reach international wholesale and retail distribution networks seamlessly.`,
                highlight: "Global Distribution",
              },
              {
                Icon: IconTrendingUp,
                title: "Increased Export Revenue",
                description: `Expand into high-margin foreign markets to diversify and increase your annual export sales.`,
                highlight: "Growth Potential",
              },
            ].map((benefit, index) => (
              <FadeIn key={index} delay={index * 0.08}>
                <div className="bg-[#FAFAFA] border border-[#e7e7e7] rounded-2xl p-6 hover:shadow-lg hover:border-[#111111] transition-all duration-300 h-full flex flex-col justify-between space-y-4">
                  <div>
                    <div className="w-10 h-10 bg-white border border-[#e7e7e7] rounded-xl flex items-center justify-center text-[#0F1111] mb-4 shadow-xs">
                      <benefit.Icon size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-[#0F1111] mb-2">{benefit.title}</h3>
                    <p className="text-sm text-[#565959] leading-relaxed">{benefit.description}</p>
                  </div>
                  <div>
                    <span className="inline-block bg-[#111111] text-white rounded-full px-3 py-1 text-xs font-semibold">
                      {benefit.highlight}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* CTA Band */}
          <FadeIn delay={0.3}>
            <div className="mt-12 bg-gradient-to-r from-[#111111] to-[#2b2b2b] rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl space-y-6">
              <h3 className="text-2xl sm:text-3xl font-extrabold max-w-xl mx-auto leading-tight">
                Ready to Grow Your {industry.title} Export Business?
              </h3>
              <p className="text-white/80 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                Join thousands of verified {industry.title.toLowerCase()} exporters connecting with international buyers worldwide on GoExports.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={() =>
                    window.open(
                      `https://wa.me/917042059572?text=Hi%20GoExports,%20I'm%20interested%20in%20${encodeURIComponent(
                        industry.title
                      )}%20export%20business`,
                      "_blank"
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#111111] font-bold text-sm rounded-full cursor-pointer hover:bg-gray-100 transition-all shadow-md"
                >
                  <span>Connect with Buyers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ ABOUT INDUSTRY (FULL WIDTH 2-COLUMN) ═══ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#FAFAFA] border-b border-[#e7e7e7]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Description Column */}
            <div className="lg:col-span-7 space-y-4">
              <FadeIn>
                <span className="inline-block bg-white border border-[#e7e7e7] text-[#0F1111] text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                  Industry Overview
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F1111] tracking-tight mt-2">
                  About {industry.title} Exports
                </h2>
                <p className="text-sm sm:text-base text-[#565959] leading-relaxed pt-2">
                  {industry.longDesc}
                </p>
              </FadeIn>
            </div>

            {/* Right Industry Highlights Box Column */}
            <div className="lg:col-span-5">
              <FadeIn delay={0.2}>
                <div className="bg-white border border-[#e7e7e7] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                  <h3 className="text-base font-bold text-[#0F1111] border-b border-[#e7e7e7] pb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>{industry.title} Key Statistics</span>
                  </h3>
                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#e7e7e7] flex items-center justify-between">
                      <span className="text-[#565959] font-medium">Buyer Verification:</span>
                      <span className="font-bold text-emerald-700">100% Vetted Importers</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#e7e7e7] flex items-center justify-between">
                      <span className="text-[#565959] font-medium">Export Compliance:</span>
                      <span className="font-bold text-[#0F1111]">Global Standards</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#e7e7e7] flex items-center justify-between">
                      <span className="text-[#565959] font-medium">Average Order Size:</span>
                      <span className="font-bold text-[#0F1111]">Bulk / FCL Container</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ SECTION (FULL WIDTH 2-COLUMN) ═══ */}
      {faqsData.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white border-b border-[#e7e7e7]">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* FAQ Left Header & Contact Card */}
              <div className="lg:col-span-4 space-y-6">
                <FadeIn>
                  <div className="space-y-3">
                    <span className="inline-block bg-[#111111] text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                      Got Questions?
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F1111] tracking-tight">
                      Frequently Asked Questions
                    </h2>
                    <p className="text-sm text-[#565959] leading-relaxed">
                      Everything you need to know about getting buyer leads for {industry.title.toLowerCase()}.
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-[#FAFAFA] border border-[#e7e7e7] space-y-3 mt-6">
                    <h4 className="text-sm font-bold text-[#0F1111] flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-emerald-600" />
                      <span>Have More Questions?</span>
                    </h4>
                    <p className="text-xs text-[#565959] leading-relaxed">
                      Our export trade specialists are available to guide you on verified buyer leads.
                    </p>
                    <a
                      href={`https://wa.me/917042059572?text=Hi%20GoExports,%20I've%20a%20question%20about%20${encodeURIComponent(
                        industry.title
                      )}%20buyer%20leads`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#111111] text-white font-bold text-xs rounded-xl no-underline hover:bg-[#333333] transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat with Export Specialist</span>
                    </a>
                  </div>
                </FadeIn>
              </div>

              {/* FAQ Right Accordion List */}
              <div className="lg:col-span-8 space-y-3">
                {faqsData.map((faq, i) => (
                  <FadeIn key={i} delay={i * 0.05}>
                    <div className="bg-[#FAFAFA] border border-[#e7e7e7] rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-white transition-colors cursor-pointer"
                      >
                        <span className="text-sm font-bold text-[#0F1111]">{faq.question}</span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`text-[#565959] shrink-0 transition-transform duration-200 ${
                            openFaq === i ? "rotate-180 text-[#0F1111]" : ""
                          }`}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden bg-white border-t border-[#e7e7e7]"
                          >
                            <div className="p-6">
                              <p className="text-sm text-[#565959] leading-relaxed">{faq.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ SELL TO US COMPONENT ═══ */}
      <SellToUS />

      {/* ═══ RELATED INDUSTRIES (FULL WIDTH 1200PX) ═══ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#FAFAFA]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-[#0F1111]">Explore Related Export Industries</h2>
                <p className="text-xs sm:text-sm text-[#565959] mt-1">Discover buyer demand in complementary global trade sectors.</p>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {related.map((ind, i) => (
              <FadeIn key={ind.slug} delay={i * 0.1}>
                <Link
                  href={`/${ind.slug}`}
                  className="block bg-white border border-[#e7e7e7] rounded-2xl p-6 no-underline transition-all duration-200 hover:border-[#111111] hover:shadow-lg group h-full flex flex-col justify-between space-y-4"
                >
                  <div>
                    <span className="text-4xl block mb-3">{ind.icon}</span>
                    <h3 className="text-lg font-bold text-[#0F1111] mb-2 group-hover:underline">{ind.title}</h3>
                    <p className="text-xs sm:text-sm text-[#565959] leading-relaxed line-clamp-2">{ind.desc}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#111111] pt-2 border-t border-[#e7e7e7]">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
