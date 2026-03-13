"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { Industry } from "@/data/industries";
import { industrySubcategories } from "@/data/newcate";
import industryContent from "@/data/industry-content-2.json";

/* ─── Animation helper ─── */
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
  const industryData = industryContent.industries.find(item => item.slug === slug);
  
  // Get subcategories for this industry
  const subcategories = industrySubcategories[industry.name] || [];
  const activeSubcategory = subcategories[activeCategory];

  // Use content from JSON if available, otherwise fallback to industry data
  const heroData = industryData?.hero || {
    h1: industry.title,
    description: industry.desc
  };

  const whyChooseUsData = industryData?.whychooseus || {
    title: `Why Choose ${industry.title}`,
    description: `Discover the advantages of partnering with us for your ${industry.title.toLowerCase()} business.`,
    points: industry.benefits.map((benefit, i) => ({
      title: `Benefit ${i + 1}`,
      description: benefit
    }))
  };

  const faqsData = industryData?.faqs || [];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* ═══ HERO ═══ */}
      <section className="relative bg-white text-[#0F1111] overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #111 1px, transparent 0)", backgroundSize: "40px 40px" }} />

        <div className="relative max-w-300 mx-auto px-6 py-8">
          <FadeIn>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-[#999]">
                <li><Link href="/" className="hover:text-[#0F1111] transition-colors no-underline">Home</Link></li>
                <li className="text-[#ccc]">/</li>
                <li className="text-[#0F1111] font-medium">{industry.title}</li>
              </ol>
            </nav>
          </FadeIn>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
            <div className="flex-1 max-w-[650px]">
              

              <FadeIn delay={0.15}>
                <h1 className="text-4xl md:text-2xl lg:text-4xl font-extrabold leading-[1.1] mb-5 text-[#0F1111]">
                  {heroData.h1}
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-lg text-[#565959] leading-relaxed mb-8 max-w-[540px]">
                  {heroData.description}
                </p>
              </FadeIn>

              <FadeIn delay={0.25}>
                <div className="flex flex-wrap gap-4 mb-8">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111111] text-white font-bold text-sm rounded-full no-underline transition-all duration-200 hover:bg-[#333333] shadow-lg shadow-black/15 hover:scale-[1.03] active:scale-[0.97]"
                  >
                    Contact Us Now →
                  </a>
                  <a
                    href="#categories"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border border-[#111111] text-[#0F1111] font-bold text-sm rounded-full no-underline transition-all duration-200 hover:bg-[#111111] hover:text-white"
                  >
                    Browse Categories
                  </a>
                </div>
              </FadeIn>

              {/* Stats strip */}
              <FadeIn delay={0.3}>
                <div className="flex flex-wrap gap-6 mb-8">
                  {industry.stats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <span className="text-2xl font-extrabold text-[#0F1111]">{stat.value}</span>
                      <span className="text-xs text-[#999] leading-tight">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>

              {/* Trust badges */}
              <FadeIn delay={0.35}>
                <div className="flex flex-wrap gap-3">
                  {industry.highlights.slice(0, 4).map((highlight, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 bg-[#F5F5F5] border border-[#e7e7e7] rounded-full px-3.5 py-1.5 text-[12px] text-[#565959]"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><polyline points="20 6 9 17 4 12" /></svg>
                      {highlight}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Hero Form */}
            <FadeIn delay={0.3}>
              <div className="w-full lg:w-[400px] bg-[#FAFAFA] border border-[#e7e7e7] rounded-2xl p-7 shadow-xl shadow-black/5">
                <h3 className="text-xl font-extrabold text-[#0F1111] mb-1">Get Started Today</h3>
                <p className="text-sm text-[#565959] mb-5">Fill in your details and our team will reach out within 24 hours.</p>

                <form className="flex flex-col gap-3.5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-semibold text-[#333] mb-1">Full Name *</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-[#e0e0e0] text-sm text-[#0F1111] placeholder:text-[#aaa] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#333] mb-1">Email Address *</label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-[#e0e0e0] text-sm text-[#0F1111] placeholder:text-[#aaa] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#333] mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-[#e0e0e0] text-sm text-[#0F1111] placeholder:text-[#aaa] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#333] mb-1">Company Name</label>
                    <input
                      type="text"
                      placeholder="Your company name"
                      className="w-full px-4 py-2.5 rounded-lg border border-[#e0e0e0] text-sm text-[#0F1111] placeholder:text-[#aaa] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#333] mb-1">Product Category</label>
                    <select
                      className="w-full px-4 py-2.5 rounded-lg border border-[#e0e0e0] text-sm text-[#0F1111] bg-white focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all appearance-none cursor-pointer"
                      defaultValue=""
                    >
                      <option value="" disabled>Select a category</option>
                      {subcategories.map((sub, i) => (
                        <option key={i} value={sub.name}>{sub.name}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#111111] text-white font-bold text-sm rounded-lg mt-1 cursor-pointer transition-all duration-200 hover:bg-[#333333] shadow-lg shadow-black/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Submit Enquiry →
                  </button>
                </form>

              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ ALL CATEGORIES GRID ═══ */}
      {subcategories.length > 0 && (
        <section id="categories" className="py-16 px-6 scroll-mt-8">
          <div className="max-w-[1200px] mx-auto">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#0F1111] mb-2">
                Get Buyer Leads by Category
              </h2>
              <p className="text-center text-[#565959] text-[15px] max-w-[550px] mx-auto mb-10">
                Find verified buyer leads for {industry.title.toLowerCase()} products across {subcategories.length} specialized categories.
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subcategories.map((cat, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <button
                    onClick={() => {
                      setActiveCategory(i);
                      document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`w-full text-left flex items-start gap-4 p-5 rounded-xl border transition-all duration-200 cursor-pointer
                      ${activeCategory === i
                        ? "bg-[#111111] text-white border-[#111111] shadow-lg shadow-black/15"
                        : "bg-white text-[#0F1111] border-[#e7e7e7] hover:border-[#111111] hover:shadow-md"
                      }`}
                  >
                 
                    <div className="min-w-0">
                      <h4 className={`text-sm font-bold mb-1 ${activeCategory === i ? "text-white" : "text-[#0F1111]"}`}>
                        {cat.name}
                      </h4>
                      <p className={`text-xs leading-relaxed ${activeCategory === i ? "text-white/60" : "text-[#565959]"}`}>
                        {cat.items.slice(0, 3).join(" • ")}
                      </p>
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
        <section id="browse" className="py-16 px-6 bg-white scroll-mt-8">
          <div className="max-w-[1200px] mx-auto">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#0F1111] mb-2">
                Buyer Leads for {activeSubcategory.name}
              </h2>
              <p className="text-center text-[#565959] text-[15px] max-w-[550px] mx-auto mb-10">
                Click on a category to see detailed.
              </p>
            </FadeIn>

            {/* Tabs */}
            <FadeIn delay={0.1}>
              <div className="flex gap-2 justify-center mb-10 flex-wrap">
                {subcategories.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCategory(i)}
                    className={`px-4 py-2.5 rounded-lg text-[13px] font-semibold cursor-pointer whitespace-nowrap transition-all duration-200
                      ${activeCategory === i
                        ? "bg-[#111111] text-white shadow-lg shadow-black/20"
                        : "bg-[#FAFAFA] text-[#565959] border border-[#e7e7e7] hover:border-[#111111] hover:text-[#0F1111] hover:shadow-sm"
                      }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </FadeIn>

            {/* Active category content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="bg-[#FAFAFA] border border-[#e7e7e7] rounded-2xl overflow-hidden shadow-lg shadow-black/5"
              >
                <div className="flex flex-col md:flex-row">
                

                  {/* Content */}
                  <div className="flex-1 p-8">
                    <h3 className="text-2xl font-extrabold text-[#0F1111] mb-4">{activeSubcategory.name}</h3>
                    <p className="text-[#565959] leading-relaxed mb-6">
                      Access exclusive buyer leads for {activeSubcategory.name.toLowerCase()} in the {industry.title.toLowerCase()} industry. 
                      Connect with verified buyers looking for quality products and grow your business.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activeSubcategory.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#e7e7e7]">
                          <div className="w-2 h-2 bg-[#111111] rounded-full mt-2 shrink-0"></div>
                          <div>
                            <h4 className="text-sm font-semibold text-[#0F1111] mb-1">{item}</h4>
                            <p className="text-xs text-[#565959] leading-relaxed">Active buyer leads for {item.toLowerCase()} in international markets</p>
                          </div>
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
      <section id="why-choose-us" className="py-16 px-6 scroll-mt-8">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#0F1111] mb-2">
              {whyChooseUsData.title}
            </h2>
            <p className="text-center text-[#565959] text-[15px] max-w-[550px] mx-auto mb-10">
              {whyChooseUsData.description}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUsData.points.map((point, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="bg-white border border-[#e7e7e7] rounded-xl p-6 hover:border-[#111111] hover:shadow-lg transition-all duration-200">
                  <div className="w-12 h-12 bg-[#111111] rounded-lg flex items-center justify-center mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0F1111] mb-2">{point.title}</h3>
                  <p className="text-sm text-[#565959] leading-relaxed">{point.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      {faqsData.length > 0 && (
        <section className="py-16 px-6 bg-[#FAFAFA]">
          <div className="max-w-[800px] mx-auto">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#0F1111] mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-center text-[#565959] text-[15px] max-w-[550px] mx-auto mb-10">
                Everything you need to know about getting buyer leads for {industry.title.toLowerCase()}.
              </p>
            </FadeIn>

            <div className="space-y-4">
              {faqsData.map((faq, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="bg-white border border-[#e7e7e7] rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-[#FAFAFA] transition-colors"
                    >
                      <span className="text-sm font-semibold text-[#0F1111]">{faq.question}</span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`text-[#565959] transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
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
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4">
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
        </section>
      )}

      {/* ═══ LONG DESCRIPTION ═══ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#0F1111] mb-8">
              About {industry.title}
            </h2>
            <p className="text-lg text-[#565959] leading-relaxed">
              {industry.longDesc}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ RELATED INDUSTRIES ═══ */}
      <section className="py-16 px-6 bg-[#FAFAFA]">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn><h2 className="text-2xl font-extrabold mb-8">Related Industries</h2></FadeIn>
          <div className="grid md:grid-cols-3 gap-5">
            {related.map((ind, i) => (
              <FadeIn key={ind.slug} delay={i * 0.1}>
                <Link href={`/${ind.slug}`} className="block bg-white border border-[#e7e7e7] rounded-xl p-6 no-underline transition-all duration-200 hover:border-[#111111] hover:shadow-lg group">
                  <span className="text-4xl block mb-3">{ind.icon}</span>
                  <h3 className="text-lg font-bold text-[#0F1111] mb-2 group-hover:underline">{ind.title}</h3>
                  <p className="text-sm text-[#565959] leading-relaxed line-clamp-2">{ind.desc}</p>
                  <span className="inline-block mt-3 text-sm font-semibold text-[#111111]">Learn more →</span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
