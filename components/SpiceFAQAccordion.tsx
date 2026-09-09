"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface SpiceFAQAccordionProps {
  faqs: FAQItem[];
}

export default function SpiceFAQAccordion({ faqs }: SpiceFAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`overflow-hidden rounded-2xl border transition-colors ${
              isOpen
                ? "border-[#0A0A0A]/30 bg-white shadow-xs"
                : "border-[#E5E0D0] bg-white hover:border-[#1A1A1A]/20"
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex w-full items-start justify-between gap-4 p-5 text-left text-sm sm:text-base font-bold text-[#0A0A0A] focus:outline-none"
            >
              <span className="flex items-start gap-3">
                <span
                  className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    isOpen
                      ? "bg-[#0A0A0A] text-white"
                      : "bg-[#FAF5E8] text-[#8B6008] border border-[#E5E0D0]"
                  }`}
                >
                  Q
                </span>
                <span className="pt-0.5">{faq.question}</span>
              </span>

              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-[#767676]"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="px-5 pb-5 pl-14 text-xs sm:text-sm leading-relaxed text-[#4A4A4A] border-t border-[#F0ECE1] pt-3">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
