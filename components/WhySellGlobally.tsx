"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "./MotionWrappers";

const industries = [
  {
    name: "Agriculture & Farming", icon: "🌾", title: "Agriculture & Farming",
    desc: "Reach global buyers for agricultural products, farming equipment, seeds, fertilizers, and organic produce. Amazon connects you with customers seeking quality farm-to-table products worldwide.",
    highlights: ["Organic & natural product demand growing 12% yearly", "Direct access to health-conscious consumers globally", "Streamlined logistics for perishable goods"],
  },
  {
    name: "Apparel & Garments", icon: "👔", title: "Apparel & Garments",
    desc: "Showcase your clothing line, textiles, and fashion accessories to millions of style-conscious shoppers. From traditional wear to modern fashion, expand your apparel brand internationally.",
    highlights: ["Fashion is one of Amazon's top-selling categories", "Access to Amazon's virtual try-on and size tools", "Seasonal demand across different hemispheres"],
  },
  {
    name: "Architecture & Interiors", icon: "🏛️", title: "Architecture & Interiors",
    desc: "Sell architectural hardware, interior décor, furniture, lighting, and design materials to homeowners and professionals around the world seeking quality products for their spaces.",
    highlights: ["Home improvement market valued at $600B+ globally", "Growing demand for sustainable building materials", "B2B opportunities with Amazon Business"],
  },
  {
    name: "Automobile Parts & Spares", icon: "🔧", title: "Automobile Parts & Spares",
    desc: "List auto parts, accessories, tools, and vehicle maintenance products for car enthusiasts and professional mechanics. Tap into the massive global automotive aftermarket industry.",
    highlights: ["Global automotive aftermarket worth $400B+", "High repeat purchase rates for consumable parts", "FBA ensures fast delivery for urgent replacements"],
  },
  {
    name: "Bags, Belts & Wallets", icon: "👜", title: "Bags, Belts & Wallets",
    desc: "Bring your leather goods, handbags, travel accessories, and fashion essentials to a worldwide audience. From handcrafted artisan pieces to everyday carry items, grow your accessories brand.",
    highlights: ["Accessories market growing steadily at 8% CAGR", "High margins on branded leather goods", "Gift-friendly category with year-round demand"],
  },
];

export default function WhySellGlobally() {
  const [activeTab, setActiveTab] = useState(0);
  const active = industries[activeTab];

  return (
    <section id="industries" className="bg-[#FAFAFA] py-16 px-6">
      <div className="max-w-[1200px] mx-auto">

        <FadeIn>
          <h2 className="text-4xl font-extrabold text-center mb-2">Industries</h2>
          <p className="text-center text-[#565959] text-base max-w-[600px] mx-auto mb-10">
            Explore how sellers from different industries are growing their business globally with Amazon.
          </p>
        </FadeIn>

        <StaggerContainer className="flex gap-2.5 justify-center mb-10 flex-wrap" stagger={0.08}>
          {industries.map((ind, i) => (
            <StaggerItem key={i}>
              <button
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold cursor-pointer whitespace-nowrap transition-all duration-200
                  ${activeTab === i
                    ? "bg-[#111111] text-white border border-[#111111] shadow-lg shadow-black/25"
                    : "bg-white text-[#565959] border border-[#e7e7e7] shadow-sm hover:border-[#111111] hover:text-[#0F1111] hover:shadow-md"
                  }`}
              >
                <span className="text-xl">{ind.icon}</span>
                {ind.name}
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="flex flex-col lg:flex-row gap-8">

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="flex-1 bg-white rounded-xl border border-[#e7e7e7] p-9 flex flex-col justify-center shadow-lg shadow-black/5"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5F5F5] to-[#E5E5E5] flex items-center justify-center text-[32px] mb-5 shadow-md shadow-black/10">
                {active.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 leading-snug">{active.title}</h3>
              <p className="text-[15px] leading-relaxed text-[#565959] mb-6">{active.desc}</p>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#"
                className="self-start inline-flex items-center gap-2 px-6 py-2.5 bg-[#111111] text-white font-bold text-sm rounded-full no-underline transition-all duration-200 hover:bg-[#333333] shadow-md shadow-black/25 hover:shadow-lg hover:shadow-black/30"
              >
                Start selling in {active.name}
              </motion.a>
            </motion.div>
          </AnimatePresence>

          <div className="flex-1 flex flex-col gap-3 justify-center">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#333333] mb-1">
              Why this industry?
            </h4>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-3"
              >
                {active.highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.12, duration: 0.4 }}
                    className="flex items-start gap-2.5 p-3 px-4 bg-white rounded-lg border border-[#e7e7e7] text-sm leading-normal text-[#0F1111] transition-all duration-200 hover:border-[#111111] shadow-sm hover:shadow-md"
                  >
                    <span className="w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center font-extrabold text-[13px] shrink-0 shadow-md">
                      {i + 1}
                    </span>
                    {h}
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="mt-3 p-4 px-5 bg-gradient-to-br from-[#FAFAFA] to-[#F0F0F0] rounded-xl border border-[#E5E5E5] shadow-md shadow-black/5"
                >
                  <p className="text-[13px] text-[#565959] leading-relaxed">
                    <strong className="text-[#0F1111]">💡 Did you know?</strong> Sellers who list products in
                    the {active.name} category and use FBA see an average of 25% higher conversion rates.
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}