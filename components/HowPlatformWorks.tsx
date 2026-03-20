"use client";

import { motion } from "framer-motion";
import { FadeIn } from "./MotionWrappers";

const steps = [
  {
    number: "01",
    title: "Submit your product details",
    description: "Tell us about your products, industry, and export requirements. Our platform makes it simple to get started.",
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
];

export default function HowPlatformWorks() {
  return (
    <section className="bg-white text-[#0F1111] py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block bg-[#111111] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">
              How Our Platform Works
            </h2>
            <p className="text-center text-[#565959] text-base max-w-[560px] mx-auto leading-relaxed">
              Start exporting internationally in 4 simple steps. Connect with verified global buyers and grow your import export business.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
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
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#111111] to-transparent" 
                       style={{ width: 'calc(100% - 4rem)', left: '4rem' }} />
                )}
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.5}>
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.open("https://api.whatsapp.com/send/?phone=917042059572&text=I+would+like+to+consult+with+Goexports(FinacBooks))&type=phone_number&app_absent=0", "_blank")}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111111] text-white font-bold text-sm rounded-full cursor-pointer transition-all duration-200 hover:bg-[#333333] shadow-lg shadow-black/15"
            >
              Start Exporting Today
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.button>
            <p className="text-xs text-[#999] mt-3">
              Join 10,000+ exporters already using GoExports
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
