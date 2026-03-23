"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "./MotionWrappers";
// Adjust these imports to match the actual file paths where you saved the data
import { industries } from "@/data/industries";
import { industrySubcategories } from "@/data/newcate";
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex } from "react-icons/fa";

// Function to convert name to slug
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function Footer() {
  // Dynamically generate columns from the imported data files
  const subcategoriesColumns = industries.map((industry) => {
    const subcats = industrySubcategories[industry.name] || [];
    return {
      title: industry.title,
      slug: industry.slug,
      items: subcats.map((sub) => sub.name),
    };
  });

  return (
    <footer className="bg-[#000000] text-white/70 text-[13px]">
      <div className="max-w-[1200px] mx-auto px-6 pt-10 pb-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black font-extrabold text-sm">
                G
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                <span className="text-white">go</span>
                <span className="text-[#F5F5F5]">exports</span>
              </span>
            </div>
            <div className="text-sm">
              <span className="text-[#F5F5F5] font-semibold">Email: </span>
              <a
                href="mailto:info@goexports.co.uk"
                className="text-white/80 no-underline hover:text-white hover:underline transition-colors duration-200"
              >
                info@goexports.co.uk
              </a>
              <div className="mt-1">
                <span className="text-[#F5F5F5] font-semibold">Phone: </span>
                <a
                  href="tel:+919876543210"
                  className="text-white/80 no-underline hover:text-white hover:underline transition-colors duration-200"
                >
                  +91 98765 43210
                </a>
              </div>
              <div className="mt-1">
                <span className="text-[#F5F5F5] font-semibold">Address: </span>
                <span className="text-white/80">
                  123 Business Park, Mumbai - 400069, India
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              {[
                {
                  label: "Facebook",
                  path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
                },
                {
                  label: "Twitter",
                  path: "M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.5v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
                },
                {
                  label: "LinkedIn",
                  path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z",
                },
                {
                  label: "YouTube",
                  path: "M22.54 6.42A2.78 2.78 0 0020.6 4.5C18.88 4 12 4 12 4s-6.88 0-8.6.5a2.78 2.78 0 00-1.94 1.92A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.4 19.5C5.12 20 12 20 12 20s6.88 0 8.6-.5a2.78 2.78 0 001.94-1.92A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
                },
                {
                  label: "Instagram",
                  path: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2zm-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z",
                },
              ].map((icon, i) => (
                <a
                  key={i}
                  href={
                    icon.label === "Facebook" ? "https://facebook.com/goexports" :
                    icon.label === "Twitter" ? "https://twitter.com/goexports" :
                    icon.label === "LinkedIn" ? "https://linkedin.com/company/goexports" :
                    icon.label === "YouTube" ? "https://youtube.com/@goexports" :
                    "https://instagram.com/goexports"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-200"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d={icon.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 mb-10 border-b border-white/10 pb-6">
            {subcategoriesColumns.map((column, i) => (
              <div key={i}>
                <h3 className="text-white text-lg font-bold mb-4">
                  {column.title}
                </h3>
                <div className="w-10 h-0.5 bg-white/40 rounded mb-4" />
                <ul className="space-y-2">
                  {column.items.slice(0,4).map((item, j) => (
                    <>
                    <li key={j}>
                      <a
                        href={`/${column.slug}`}
                        className="text-white/60 text-[13px] no-underline hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                      >
                        <span className="text-white/30 text-xs">›</span>
                        {item}
                      </a>
                    </li>

                      <li>
                        <a
                          href={`/${column.slug}`}
                          className="text-white/60 text-[13px] no-underline hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                        >
                          <span className="text-white/30 text-xs">›</span>
                          100+ More...
                        </a>
                      </li>
                      </>
                   
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-white/40 text-xs">
                © 2025 GoExports. All rights reserved.
              </span>
              <div className="flex gap-3">
                {[
                  { label: "Terms of Service", href: "/tos" },
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Cookies", href: "/cookies" }
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    className="text-white/50 text-xs no-underline hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white/60 text-xs mr-3">We Accept:</span>
              <div className="flex gap-3">
                {[
                  { name: "Visa", icon: FaCcVisa },
                  { name: "Mastercard", icon: FaCcMastercard },
                  { name: "PayPal", icon: FaCcPaypal },
                  { name: "American Express", icon: FaCcAmex },
                ].map((payment, i) => {
                  const Icon = payment.icon;
                  return (
                    <div
                      key={i}
                      className="w-8 h-8 rounded flex items-center justify-center hover:bg-white/20 transition-all duration-200"
                      title={payment.name}
                    >
                      <Icon size={20} className="text-white" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}