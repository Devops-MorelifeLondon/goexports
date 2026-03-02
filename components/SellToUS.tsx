"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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

const featureIcons: Record<string, string> = {
  "Targeted Industry Leads": "🎯",
  "International Buyers": "🌍",
  "Dedicated Account Manager": "👤",
  "24/7/365 Support": "🛡️",
  "Weekly Reporting": "📊",
  "Monthly Reporting": "📈",
  "Weekly / Monthly Call": "📞",
  "Custom Integrations": "⚙️",
  "Priority Support": "⚡",
};

const plans = [
  {
    name: "Starter",
    tagline: "Perfect for new exporters",
    price: "25,000",
    leads: "20",
    leadsLabel: "Qualified Leads / Month",
    color: "from-[#f0f0f0] to-[#e0e0e0]",
    ringColor: "ring-[#ccc]",
    features: ["Targeted Industry Leads", "International Buyers", "Dedicated Account Manager", "24/7/365 Support", "Weekly Reporting", "Monthly Reporting", "Weekly / Monthly Call"],
  },
  {
    name: "Growth",
    tagline: "Most popular for scaling",
    price: "50,000",
    leads: "50",
    leadsLabel: "Qualified Leads / Month",
    popular: true,
    color: "from-[#111111] to-[#333333]",
    ringColor: "ring-[#111111]",
    features: ["Targeted Industry Leads", "International Buyers", "Dedicated Account Manager", "24/7/365 Support", "Weekly Reporting", "Monthly Reporting", "Weekly / Monthly Call"],
  },
  {
    name: "Enterprise",
    tagline: "For established businesses",
    price: "1,00,000",
    leads: "120",
    leadsLabel: "Qualified Leads / Month",
    color: "from-[#1a1a2e] to-[#16213e]",
    ringColor: "ring-[#1a1a2e]",
    features: ["Targeted Industry Leads", "International Buyers", "Dedicated Account Manager", "24/7/365 Support", "Weekly Reporting", "Monthly Reporting", "Weekly / Monthly Call"],
  },
  {
    name: "Custom",
    tagline: "Tailored to your needs",
    price: null,
    leads: "∞",
    leadsLabel: "Unlimited Leads / Month",
    color: "from-[#0F1111] to-[#0F1111]",
    ringColor: "ring-[#0F1111]",
    features: ["Targeted Industry Leads", "International Buyers", "Dedicated Account Manager", "24/7/365 Support", "Weekly Reporting", "Monthly Reporting", "Weekly / Monthly Call", "Custom Integrations", "Priority Support"],
  },
];

export default function SellToUS() {
  const [activePlan, setActivePlan] = useState(1);

  return (
    <section id="pricing" className="bg-[#F5F7FA] py-20 px-6">
      <div className="max-w-[1200px] mx-auto">

        <FadeIn>
          <div className="text-center mb-14">
            <span className="inline-block bg-[#111111] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Pricing Plans
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F1111] mb-3">
              Invest in Your Growth
            </h2>
            <p className="text-[#565959] text-base max-w-[520px] mx-auto leading-relaxed">
              Choose the right plan to grow your export business with verified international buyer leads.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan, i) => {
            const isActive = activePlan === i;
            const isDark = plan.popular || plan.name === "Enterprise" || plan.name === "Custom";

            return (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  onClick={() => setActivePlan(i)}
                  className={`rounded-2xl p-8 flex flex-col transition-all duration-300 relative cursor-pointer h-full overflow-hidden
                    ${isActive
                      ? isDark
                        ? "bg-[#0F1111] text-white shadow-[0_16px_48px_rgba(0,0,0,0.25)]"
                        : "bg-white border-2 border-[#111111] shadow-[0_16px_48px_rgba(0,0,0,0.12)]"
                      : "bg-white border border-[#e0e0e0] hover:border-[#111111] hover:shadow-lg"
                    }`}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 15 }}
                      className={`absolute -top-0 right-6 px-4 py-2 rounded-b-xl text-[11px] font-extrabold uppercase tracking-wider shadow-md
                        ${isActive ? "bg-white text-[#0F1111]" : "bg-[#111111] text-white shadow-black/30"}`}
                    >
                      ⭐ Most Popular
                    </motion.div>
                  )}

                  {/* Decorative corner gradient */}
                  {isActive && isDark && (
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-white/[0.06] to-transparent rounded-bl-full pointer-events-none" />
                  )}

                  {/* Plan header */}
                  <div className="flex items-center gap-6 mb-7">
                    {/* Big price circle */}
                    <div className={`w-[120px] h-[120px] rounded-full bg-gradient-to-br ${plan.color} flex flex-col items-center justify-center shrink-0 ring-4 ${plan.ringColor} ring-offset-2 ${isActive && isDark ? "ring-offset-[#0F1111]" : "ring-offset-white"} shadow-lg`}>
                      {plan.price ? (
                        <>
                          <span className={`text-[11px] font-semibold ${isDark ? "text-white/60" : "text-[#999]"} -mb-0.5`}>₹</span>
                          <span className={`text-[22px] font-extrabold leading-none ${isDark ? "text-white" : "text-[#111111]"}`}>{plan.price}</span>
                          <span className={`text-[10px] mt-1 ${isDark ? "text-white/50" : "text-[#999]"}`}>per month</span>
                        </>
                      ) : (
                        <>
                          <span className="text-3xl font-extrabold text-white leading-none">∞</span>
                          <span className="text-[10px] text-white/60 mt-1">Let&apos;s Talk</span>
                        </>
                      )}
                    </div>

                    <div>
                      <h3 className={`text-2xl font-extrabold mb-1 ${isActive && isDark ? "text-white" : "text-[#111111]"}`}>
                        {plan.name}
                      </h3>
                      <p className={`text-sm mb-2 ${isActive && isDark ? "text-white/50" : "text-[#999]"}`}>
                        {plan.tagline}
                      </p>
                      <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold
                        ${isActive && isDark
                          ? "bg-white/10 text-white/80"
                          : "bg-[#F5F5F5] text-[#0F1111]"
                        }`}>
                        <span className="text-lg leading-none">{plan.leads}</span>
                        <span className="font-medium opacity-70">{plan.leadsLabel}</span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className={`h-px mb-6 ${isActive && isDark ? "bg-white/10" : "bg-[#e7e7e7]"}`} />

                  {/* Features */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-7">
                    {plan.features.map((feature, j) => (
                      <div key={j} className={`flex items-center gap-2.5 text-sm ${isActive && isDark ? "text-white/70" : "text-[#565959]"}`}>
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-[13px] shrink-0
                          ${isActive && isDark ? "bg-white/10" : "bg-[#F5F5F5]"}`}>
                          {featureIcons[feature] || "✓"}
                        </span>
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    href="#"
                    className={`w-full py-3.5 rounded-xl text-sm font-bold cursor-pointer text-center no-underline block transition-all duration-200
                      ${isActive && isDark
                        ? "bg-white text-[#0F1111] hover:bg-gray-100 shadow-lg shadow-white/20"
                        : isActive
                          ? "bg-[#111111] text-white hover:bg-[#333333] shadow-lg shadow-black/25"
                          : "bg-[#111111] text-white hover:bg-[#333333] border-0"
                      }`}
                  >
                    {plan.price ? "Get Started →" : "Contact Sales →"}
                  </motion.a>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>

        {/* Bottom trust strip */}
        <FadeIn delay={0.5}>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-[#999]">
            {[
              { icon: "🔒", text: "Secure Payments" },
              { icon: "📋", text: "No Hidden Fees" },
              { icon: "🔄", text: "Cancel Anytime" },
              { icon: "💬", text: "Free Consultation" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-base">{item.icon}</span>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}