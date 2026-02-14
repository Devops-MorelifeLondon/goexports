"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "./MotionWrappers";

const plans = [
  { name: "Starter", price: "9,999", leads: "10 Leads", features: ["Targeted Industry Leads", "International Buyers", "Dedicated Account Manager", "24/7/365 Support", "Weekly Reporting", "Monthly Reporting", "Weekly / Monthly Call"] },
  { name: "Silver", price: "19,999", leads: "25 Leads", features: ["Targeted Industry Leads", "International Buyers", "Dedicated Account Manager", "24/7/365 Support", "Weekly Reporting", "Monthly Reporting", "Weekly / Monthly Call"] },
  { name: "Gold", price: "49,999", leads: "70 Leads", popular: true, features: ["Targeted Industry Leads", "International Buyers", "Dedicated Account Manager", "24/7/365 Support", "Weekly Reporting", "Monthly Reporting", "Weekly / Monthly Call"] },
  { name: "Platinum", price: "99,999", leads: "150 Leads", features: ["Targeted Industry Leads", "International Buyers", "Dedicated Account Manager", "24/7/365 Support", "Weekly Reporting", "Monthly Reporting", "Weekly / Monthly Call"] },
];

export default function SellToUS() {
  const [activePlan, setActivePlan] = useState(2);

  return (
    <section id="pricing" className="bg-[#F5F7FA] py-16 px-6">
      <div className="max-w-[1200px] mx-auto">

        <FadeIn>
          <h2 className="text-4xl font-extrabold text-center mb-2 text-[#0F1111]">Pricing</h2>
          <p className="text-center text-[#565959] text-[15px] max-w-[520px] mx-auto mb-12">
            Choose the right plan to grow your export business with verified international buyer leads.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.12}>
          {plans.map((plan, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                onClick={() => setActivePlan(i)}
                className={`bg-white border rounded-2xl p-8 px-7 flex flex-col items-center transition-all duration-300 relative cursor-pointer
                  ${activePlan === i
                    ? "border-[#111111] bg-[#FAFAFA] shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
                    : "border-[#e0e0e0] hover:border-[#111111] hover:shadow-lg"
                  }`}
              >
                {plan.popular && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 300, damping: 15 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#111111] text-white text-[11px] font-extrabold px-4 py-1 rounded-xl uppercase tracking-wider whitespace-nowrap shadow-md shadow-black/30"
                  >
                    Most Popular
                  </motion.div>
                )}

                <div className="w-[110px] h-[110px] rounded-full bg-linear-to-br from-[#F5F5F5] to-[#E5E5E5] flex flex-col items-center justify-center mb-6 border-[3px] border-[#111111]/20">
                  <span className="text-2xl font-extrabold text-[#111111] leading-none">
                    <span className="text-sm align-top">₹</span>{plan.price}
                  </span>
                  <span className="text-xs text-[#565959] mt-0.5">/ Month</span>
                </div>

                <h3 className="text-[22px] font-bold text-[#111111] mb-5 text-center">{plan.name}</h3>

                <div className="w-full border-t border-[#e7e7e7] pt-4">
                  <div className="flex items-start gap-2.5 py-2 text-sm text-[#565959] mb-1">
                    <span className="w-[18px] h-[18px] rounded-full bg-[#111111]/10 flex items-center justify-center shrink-0 mt-px">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <span className="font-bold text-[#0F1111]">{plan.leads}</span>
                  </div>
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-2.5 py-2 text-sm text-[#565959]">
                      <span className="w-[18px] h-[18px] rounded-full bg-[#111111]/10 flex items-center justify-center shrink-0 mt-px">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href="#"
                  className={`w-full py-3 rounded-lg text-sm font-bold cursor-pointer text-center mt-6 no-underline block border-2 border-[#111111] transition-all duration-200
                    ${activePlan === i
                      ? "bg-[#111111] text-white hover:bg-[#333333] shadow-lg shadow-black/25"
                      : "bg-transparent text-[#111111] hover:bg-[#111111] hover:text-white"
                    }`}
                >
                  Get Started
                </motion.a>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}