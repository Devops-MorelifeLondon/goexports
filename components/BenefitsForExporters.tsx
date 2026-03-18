"use client";

import { motion } from "framer-motion";
import { FadeIn } from "./MotionWrappers";

const benefits = [
  {
    icon: "✅",
    title: "Verified International Buyer Leads",
    description: "Connect with pre-verified buyers who are actively looking for your products. No more time wasted on unqualified leads.",
    highlight: "100% Verified Buyers"
  },
  {
    icon: "🌍",
    title: "Global Trade Opportunities",
    description: "Access buyers from 200+ countries across all industries. Expand your export business to new international markets.",
    highlight: "200+ Countries"
  },
  {
    icon: "🚀",
    title: "Faster Market Expansion",
    description: "Reduce your market entry time by 80%. Our platform helps you find buyers and start exporting within weeks, not months.",
    highlight: "80% Faster Entry"
  },
  {
    icon: "🤝",
    title: "Connect with Trusted Importers",
    description: "Build relationships with reliable importers and distributors who have been thoroughly vetted for credibility and payment reliability.",
    highlight: "Trusted Partners"
  },
  {
    icon: "📦",
    title: "Access to Worldwide Distributors",
    description: "Reach global distribution networks that can scale your business. From local retailers to multinational chains.",
    highlight: "Global Distribution"
  },
  {
    icon: "💰",
    title: "Increased Revenue Potential",
    description: "Tap into international markets and increase your revenue by up to 300%. Our exporters see average growth of 150% in the first year.",
    highlight: "300% Revenue Growth"
  }
];

export default function BenefitsForExporters() {
  return (
    <section className="bg-white text-[#0F1111] py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block bg-[#111111] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Why Choose GoExports
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">
              Benefits for Exporters
            </h2>
            <p className="text-center text-[#565959] text-base max-w-[560px] mx-auto leading-relaxed">
              Discover why thousands of exporters choose GoExports to grow their international trade business and connect with verified global buyers.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
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
              Ready to Grow Your Export Business?
            </h3>
            <p className="text-white/80 mb-6 max-w-[600px] mx-auto">
              Join thousands of successful exporters who are already connecting with verified international buyers through GoExports.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
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
              No credit card required • Free setup • Start connecting with buyers today
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
