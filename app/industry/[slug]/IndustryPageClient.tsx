"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Industry } from "@/data/industries";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function IndustryPageClient({
  industry,
  related,
}: {
  industry: Industry;
  related: Industry[];
}) {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <section className="bg-[#0F1111] text-white py-20 px-6">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <Link href="/#industries" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors no-underline">
              ← Back to all industries
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">{industry.icon}</span>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{industry.title}</h1>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-white/70 leading-relaxed max-w-[800px]">{industry.desc}</p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-6 mt-10">
              {industry.stats.map((stat, i) => (
                <div key={i} className="bg-white/10 border border-white/15 rounded-xl px-6 py-4 min-w-[160px]">
                  <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-sm text-white/50 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn><h2 className="text-3xl font-extrabold mb-6">About This Industry</h2><p className="text-[16px] leading-[1.8] text-[#565959]">{industry.longDesc}</p></FadeIn>
        </div>
      </section>

      <section className="py-12 px-6 bg-white">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn><h2 className="text-3xl font-extrabold mb-8">Key Highlights</h2></FadeIn>
          <div className="grid md:grid-cols-3 gap-5">
            {industry.highlights.map((h, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-[#FAFAFA] border border-[#e7e7e7] rounded-xl p-6 h-full hover:border-[#111111] transition-all duration-200 hover:shadow-md">
                  <span className="w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center font-extrabold text-base mb-4 shadow-md">{i + 1}</span>
                  <p className="text-[15px] text-[#0F1111] leading-relaxed">{h}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn><h2 className="text-3xl font-extrabold mb-8">Why Sell {industry.title} With Us?</h2></FadeIn>
          <div className="grid md:grid-cols-2 gap-4">
            {industry.benefits.map((b, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex items-start gap-3 bg-white border border-[#e7e7e7] rounded-xl p-5 hover:border-[#111111] transition-all duration-200 hover:shadow-md">
                  <span className="text-lg mt-0.5">✅</span>
                  <p className="text-[15px] text-[#0F1111] leading-relaxed">{b}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#0F1111] text-white">
        <div className="max-w-[700px] mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Sell {industry.title} Globally?</h2>
            <p className="text-white/60 text-base mb-8">Join thousands of sellers already growing their business on our platform.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#0F1111] font-bold text-sm rounded-full no-underline transition-all duration-200 hover:bg-gray-100 shadow-lg shadow-white/20 hover:scale-[1.03] active:scale-[0.97]">Register as a Seller →</a>
              <Link href="/#industries" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border border-white/30 text-white font-bold text-sm rounded-full no-underline transition-all duration-200 hover:border-white hover:bg-white/10">Explore Other Industries</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn><h2 className="text-2xl font-extrabold mb-8">Related Industries</h2></FadeIn>
          <div className="grid md:grid-cols-3 gap-5">
            {related.map((ind, i) => (
              <FadeIn key={ind.slug} delay={i * 0.1}>
                <Link href={`/industry/${ind.slug}`} className="block bg-[#FAFAFA] border border-[#e7e7e7] rounded-xl p-6 no-underline transition-all duration-200 hover:border-[#111111] hover:shadow-lg group">
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