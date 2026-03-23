"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { Industry } from "@/data/industries";
import { industrySubcategories } from "@/data/newcate";
import industryContent from "@/data/industry-content-2.json";
import GetInTouchForm from "@/components/GetInTouchForm";
import SellToUS from "@/components/SellToUS";

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
      <section id="hero" className="relative bg-white text-[#0F1111] overflow-hidden">
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
                    href={`https://wa.me/917042059572?text=Hi%20GoExports,%20I'm%20interested%20in%20exporting%20${encodeURIComponent(industry.title)}%20products`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111111] text-white font-bold text-sm rounded-full no-underline transition-all duration-200 hover:bg-[#333333] shadow-lg shadow-black/15 hover:scale-[1.03] active:scale-[0.97]"
                  >
                    Contact Us Now →
                  </a>
                  <a
                    onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border border-[#111111] text-[#0F1111] font-bold text-sm rounded-full no-underline transition-all duration-200 hover:bg-[#111111] hover:text-white cursor-pointer"
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
              <GetInTouchForm />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ HOW PLATFORM WORKS ═══ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block bg-[#111111] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
                Simple Process
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">
                How Our Platform Works
              </h2>
              <p className="text-center text-[#565959] text-base max-w-[560px] mx-auto leading-relaxed">
                Start exporting {industry.title.toLowerCase()} products in 4 simple steps. Connect with verified global buyers and grow your import export business.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "01",
                title: "Submit your product details",
                description: `Tell us about your ${industry.title.toLowerCase()} products, industry, and export requirements.`,
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
            ].map((step, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative"
                >
                  {/* Step Number */}
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-[#111111] text-white rounded-full flex items-center justify-center text-xl font-bold">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#0F1111] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#565959] text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Connection Line */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#111111] to-transparent" 
                         style={{ width: 'calc(100% - 4rem)', left: '4rem' }} />
                  )}
                </motion.div>
              </FadeIn>
            ))}
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

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-16 px-6 bg-[#FAFAFA]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block bg-[#111111] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
                Success Stories
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">
                {industry.title} Exporters Growing Globally
              </h2>
              <p className="text-center text-[#565959] text-base max-w-[560px] mx-auto leading-relaxed">
                Join successful {industry.title.toLowerCase()} exporters who found verified international buyers through our global sourcing platform.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                company: "Premium Exports Ltd",
                country: "India",
                image: "👔",
                content: `GoExports transformed our ${industry.title.toLowerCase()} export business. Within 3 months, we connected with 15 verified buyers across Europe and Middle East.`,
                rating: 5,
                results: "200% Revenue Growth"
              },
              {
                name: "Maria Rodriguez",
                company: "Global Trade Co",
                country: "Brazil", 
                image: "👩‍💼",
                content: `The quality of buyer leads on GoExports is exceptional. We found distributors in 8 countries for our ${industry.title.toLowerCase()} products.`,
                rating: 5,
                results: "8 New Markets"
              },
              {
                name: "Chen Wei",
                company: "International Manufacturing",
                country: "China",
                image: "👨‍💻",
                content: `As a {industry.title.toLowerCase()} manufacturer, finding reliable international buyers was challenging. GoExports made it simple.`,
                rating: 5,
                results: "Consistent Orders"
              }
            ].map((testimonial, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white border border-[#e7e7e7] rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Rating */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" strokeWidth="1">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-[#565959] text-sm leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#111111] rounded-full flex items-center justify-center text-2xl">
                      {testimonial.image}
                    </div>
                    <div>
                      <div className="font-bold text-[#0F1111]">{testimonial.name}</div>
                      <div className="text-xs text-[#565959]">{testimonial.company}</div>
                      <div className="text-xs text-[#999]">{testimonial.country}</div>
                    </div>
                  </div>

                  {/* Results Badge */}
                  <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1 text-xs font-semibold text-green-700">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {testimonial.results}
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BENEFITS FOR EXPORTERS ═══ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block bg-[#111111] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
                Why Choose GoExports
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">
                Benefits for {industry.title} Exporters
              </h2>
              <p className="text-center text-[#565959] text-base max-w-[560px] mx-auto leading-relaxed">
                Discover why thousands of {industry.title.toLowerCase()} exporters choose GoExports to grow their international trade business and connect with verified global buyers.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "✅",
                title: "Verified International Buyer Leads",
                description: `Connect with pre-verified buyers actively looking for ${industry.title.toLowerCase()} products. No more time wasted on unqualified leads.`,
                highlight: "100% Verified Buyers"
              },
              {
                icon: "🌍",
                title: "Global Trade Opportunities",
                description: `Access buyers from 200+ countries for your ${industry.title.toLowerCase()} products. Expand your export business to new international markets.`,
                highlight: "200+ Countries"
              },
              {
                icon: "🚀",
                title: "Faster Market Expansion",
                description: `Reduce your ${industry.title.toLowerCase()} market entry time by 80%. Our platform helps you find buyers and start exporting within weeks.`,
                highlight: "80% Faster Entry"
              },
              {
                icon: "🤝",
                title: "Connect with Trusted Importers",
                description: `Build relationships with reliable ${industry.title.toLowerCase()} importers and distributors who have been thoroughly vetted for credibility.`,
                highlight: "Trusted Partners"
              },
              {
                icon: "📦",
                title: "Access to Worldwide Distributors",
                description: `Reach global distribution networks for your ${industry.title.toLowerCase()} products. From local retailers to multinational chains.`,
                highlight: "Global Distribution"
              },
              {
                icon: "💰",
                title: "Increased Revenue Potential",
                description: `Tap into international markets for your ${industry.title.toLowerCase()} products and increase revenue by up to 300% in the first year.`,
                highlight: "300% Revenue Growth"
              }
            ].map((benefit, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-[#FAFAFA] border border-[#e7e7e7] rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  {/* Icon */}
                  <div className="text-4xl mb-4">{benefit.icon}</div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#0F1111] mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-[#565959] text-sm leading-relaxed mb-4">
                    {benefit.description}
                  </p>

                  {/* Highlight Badge */}
                  <div className="inline-flex items-center gap-1.5 bg-[#111111] text-white rounded-full px-3 py-1 text-xs font-semibold">
                    {benefit.highlight}
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          {/* CTA Section */}
          <FadeIn delay={0.5}>
            <div className="mt-16 bg-gradient-to-r from-[#111111] to-[#333333] rounded-2xl p-8 text-center text-white">
              <h3 className="text-2xl md:text-3xl font-extrabold mb-4">
                Ready to Grow Your {industry.title} Export Business?
              </h3>
              <p className="text-white/80 mb-6 max-w-[600px] mx-auto">
                Join thousands of successful {industry.title.toLowerCase()} exporters who are already connecting with verified international buyers through GoExports.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => window.open(`https://wa.me/917042059572?text=Hi%20GoExports,%20I'm%20interested%20in%20${encodeURIComponent(industry.title)}%20export%20business`, '_blank')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#111111] font-bold text-sm rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-100 shadow-lg"
                >
                  Start Free Trial
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
         onClick={() => window.open(`https://wa.me/917042059572?text=Hi%20GoExports,%20I'm%20interested%20in%20${encodeURIComponent(industry.title)}%20export%20business`, '_blank')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent text-white font-bold text-sm rounded-full cursor-pointer transition-all duration-200 border-2 border-white hover:bg-white hover:text-[#111111]"
                >
                  Schedule Demo
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12h18m-9-9v18" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </motion.button>
              </div>
              <p className="text-xs text-white/60 mt-4">
                No credit card required • Free setup • Start connecting with {industry.title.toLowerCase()} buyers today
              </p>
            </div>
          </FadeIn>
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

       <SellToUS />

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
