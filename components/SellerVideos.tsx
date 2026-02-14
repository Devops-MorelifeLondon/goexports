"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "./MotionWrappers";

const buyers = [
  { date: "January 01, 2026", product: "Snack Foods", flag: "🇬🇲", country: "Gambia The", desc: "Please quote for the following wholesale product requirement - Product Name: Snack Foods: Any Brand, Qty: 938 Note: Need Samples Quantity" },
  { date: "January 01, 2026", product: "Roller Blinds", flag: "🇽🇰", country: "Kosovo", desc: "Please quote for the following wholesale product requirement - Product Name: Roller Blinds: Any Brand, Qty: 967 Note: Need Samples Quantity" },
  { date: "January 01, 2026", product: "Engraving Services", flag: "🇸🇸", country: "South Sudan", desc: "Please quote for the following wholesale product requirement - Product Name: Engraving Services: Any Brand, Qty: 449 Note: Need Samples Quantity" },
  { date: "January 01, 2026", product: "Light Crane", flag: "🇧🇻", country: "Bouvet Island", desc: "Please quote for the following wholesale product requirement - Product Name: Light Crane: Any Brand, Qty: 312 Note: Need Samples Quantity" },
  { date: "January 01, 2026", product: "Lithium Ion Battery", flag: "🌐", country: "Antarctica", desc: "Please quote for the following wholesale product requirement - Product Name: Lithium Ion Battery: Any Brand, Qty: 583 Note: Need Samples Quantity" },
  { date: "January 01, 2026", product: "Multifunction Watches", flag: "🇫🇯", country: "Fiji Islands", desc: "Please quote for the following wholesale product requirement - Product Name: Multifunction Watches: Any Brand, Qty: 276 Note: Need Samples Quantity" },
];

export default function SellerVideos() {
  return (
    <section id="buyers" className="bg-[#0A0A0A] text-white py-16 px-6">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <h2 className="text-4xl font-extrabold text-center mb-2 tracking-wide">BUYERS</h2>
          <p className="text-center text-white/60 text-[15px] max-w-[500px] mx-auto mb-9">
            Latest verified buyer requirements from around the world.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.1}>
          {buyers.map((buyer, i) => (
            <StaggerItem key={i}>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 px-6 transition-all duration-200 hover:border-white/30 hover:bg-white/[0.08] shadow-lg shadow-black/15 hover:shadow-xl hover:shadow-black/25 hover:-translate-y-1">
                <div className="flex justify-between items-center mb-3.5">
                  <span className="text-[13px] text-white/50">{buyer.date}</span>
                  <span className="inline-flex items-center gap-1 text-white text-[13px] font-semibold">
                    <span className="w-4 h-4 rounded bg-white inline-flex items-center justify-center shadow-sm shadow-white/20">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    Verified
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2.5">WANTED: {buyer.product}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{buyer.flag}</span>
                  <span className="text-sm font-semibold text-white/85">Buyer From {buyer.country}</span>
                </div>
                <p className="text-[13px] leading-relaxed text-white/50">{buyer.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.4}>
          <div className="flex justify-center mt-7 gap-2">
            <button className="w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white cursor-pointer flex items-center justify-center text-lg shadow-md hover:shadow-lg transition-all duration-200 hover:bg-white/20">
              ‹
            </button>
            <button className="w-9 h-9 rounded-full bg-white border-none text-black cursor-pointer flex items-center justify-center text-lg font-bold shadow-lg shadow-white/20 hover:shadow-xl transition-all duration-200">
              ›
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}