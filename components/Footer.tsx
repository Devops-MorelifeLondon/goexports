"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "./MotionWrappers";

export default function Footer() {
  const navLinks = ["Our Services", "Buy Global Leads", "Sell Products Globally", "Connect With Global Buyers", "Post Buy Requirements"];

  const columns = [
    {
      sections: [
        { heading: "Agriculture & Farming", subgroups: [
          { title: "Bird Food, Poultry & Animal Food", links: ["Animal Feed", "Animal Feed Enzymes", "Animal Feed Supplement", "Bird Food", "Broiler Feed"] },
          { title: "Coir and Agro Products", links: ["Agro Waste", "Coco Peat Products", "Coconut Shell Products", "Coir Products", "Natural Gum"] },
        ]},
      ],
    },
    {
      sections: [
        { heading: null, subgroups: [
          { title: null, links: ["Academic Apparel", "Chef Uniform", "Commercial Uniforms", "Corporate Uniform", "Dance Dresses"] },
          { title: "Cotton, Khadi, Other Fabric Clothing", links: ["Cashmere Clothing", "Cashmere Shawl", "Cotton Clothing", "Denim Clothing", "Khadi Garments"] },
          { title: "Cotton, Wool Textiles & Fabrics", links: ["Apparel & Clothing Fabric"] },
        ]},
      ],
    },
    {
      sections: [
        { heading: "Automobile, Parts & Spares", subgroups: [
          { title: "Air Intakes, Exhaust Systems & Parts", links: ["Air Intake System & Parts", "Automobile Silencers", "Automotive Filters", "Exhaust System & System Components"] },
          { title: "Air Springs & Compression Springs", links: ["Automotive Shock Absorber", "Compression Springs", "Extension Springs", "Furniture Springs"] },
        ]},
      ],
    },
    {
      sections: [
        { heading: null, subgroups: [
          { title: null, links: ["Baby Care Products", "Baby Cradle and Bassinet", "Baby Creams & Lotion", "Baby Foods", "Baby Furniture"] },
          { title: "Cotton, Jute & Canvas Bags", links: ["Canvas Bags", "Cotton Bags", "Environmental Bags", "Fabric Bag", "Jute Bags"] },
          { title: "Fashion & Designer Bags", links: ["Beaded Bags"] },
        ]},
      ],
    },
  ];

  return (
    <footer className="bg-[#000000] text-white/70 text-[13px]">
      <div className="max-w-[1200px] mx-auto px-6 pt-10 pb-8">

        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black font-extrabold text-sm">G</div>
              <span className="text-xl font-extrabold tracking-tight">
                <span className="text-white">go</span>
                <span className="text-[#F5F5F5]">exports</span>
              </span>
            </div>
            <div className="text-sm">
              <span className="text-[#F5F5F5] font-semibold">Email: </span>
              <a href="mailto:info@goexports.co.uk" className="text-white/80 no-underline hover:text-white hover:underline transition-colors duration-200">info@goexports.co.uk</a>
            </div>
            <div className="flex gap-3">
              {[
                { label: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                { label: "Twitter", path: "M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.5v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
                { label: "LinkedIn", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z" },
                { label: "YouTube", path: "M22.54 6.42A2.78 2.78 0 0020.6 4.5C18.88 4 12 4 12 4s-6.88 0-8.6.5a2.78 2.78 0 00-1.94 1.92A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.4 19.5C5.12 20 12 20 12 20s6.88 0 8.6-.5a2.78 2.78 0 001.94-1.92A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" },
                { label: "Instagram", path: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2zm-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" },
              ].map((icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-200">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d={icon.path} /></svg>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="flex flex-wrap gap-x-8 gap-y-2 mb-10 border-b border-white/10 pb-6">
            {navLinks.map((link, i) => (
              <a key={i} href="#" className="text-sm text-white/70 no-underline hover:text-white transition-colors duration-200 font-medium">
                {link}
              </a>
            ))}
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8" stagger={0.1}>
          {columns.map((col, i) => (
            <StaggerItem key={i}>
              <div>
                {col.sections.map((section, si) => (
                  <div key={si}>
                    {section.heading && (
                      <div className="mb-4">
                        <h3 className="text-white text-lg font-bold mb-1">{section.heading}</h3>
                        <div className="w-10 h-0.5 bg-white/40 rounded" />
                      </div>
                    )}
                    {section.subgroups.map((group, gi) => (
                      <div key={gi} className="mb-5">
                        {group.title && (
                          <h4 className="text-white text-sm font-bold mb-2">{group.title}</h4>
                        )}
                        {group.links.map((link, li) => (
                          <a key={li} href="#" className="flex items-center gap-1.5 text-white/60 text-[13px] py-[3px] no-underline hover:text-white transition-colors duration-200">
                            <span className="text-white/30 text-xs">›</span>
                            {link}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.5}>
          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-white/40 text-xs">© 2025 GoExports. All rights reserved.</span>
            <div className="flex gap-5">
              {["Terms of Service", "Privacy Policy", "Cookies"].map((t, i) => (
                <a key={i} href="#" className="text-white/50 text-xs no-underline hover:text-white transition-colors duration-200">
                  {t}
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}