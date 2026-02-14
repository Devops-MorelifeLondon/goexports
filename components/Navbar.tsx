"use client";

import { useState, useCallback } from "react";
import { MenuIcon } from "./Icons";

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const navItems = [
    { label: "Industries", href: "#industries" },
    { label: "Buyers", href: "#buyers" },
    { label: "Insights", href: "#insights" },
    { label: "Presence", href: "#presence" },
    { label: "Pricing", href: "#pricing" },
  ];

  const scrollTo = useCallback((href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenu(false);
  }, []);

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-[1000] shadow-sm">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center h-16 justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-1.5 cursor-pointer">
            <div className="w-8 h-8 bg-[#111111] rounded-lg flex items-center justify-center text-white font-extrabold text-sm shadow-md">
              G
            </div>
            <span className="text-xl font-extrabold text-[#0F1111] tracking-tight">
              go<span className="text-[#333333]">exports</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="relative text-sm font-semibold text-[#565959] bg-transparent border-none px-3.5 py-2 rounded-lg transition-all duration-200 hover:text-[#0F1111] hover:bg-gray-100 cursor-pointer group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#111111] rounded-full transition-all duration-300 group-hover:w-3/5" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollTo("#contact-form")}
            className="hidden lg:inline-flex items-center text-sm font-semibold text-[#565959] px-3.5 py-2 rounded-lg transition-all duration-200 hover:text-[#0F1111] hover:bg-gray-100 bg-transparent border-none cursor-pointer"
          >
            Contact us
          </button>
          <div className="hidden lg:block w-px h-6 bg-gray-200 mx-1" />
          <a
            href="https://wa.me/your-number-here"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 px-5 py-2 bg-[#25D366] text-white font-bold text-sm rounded-lg border-none transition-all duration-200 hover:bg-[#1EBE5D] shadow-sm hover:shadow-md cursor-pointer no-underline"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
          <button
            className="flex lg:hidden items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-all duration-200 bg-transparent border-none cursor-pointer"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {mobileMenu && (
        <div className="lg:hidden border-t border-gray-100">
          <div className="px-6 py-4 flex flex-col gap-1 bg-white">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="text-sm font-semibold text-[#565959] bg-transparent border-none px-4 py-3 rounded-lg transition-all duration-200 hover:text-[#0F1111] hover:bg-gray-50 cursor-pointer text-left"
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-gray-100 mt-2 pt-3 flex flex-col gap-1">
              <button
                onClick={() => scrollTo("#contact-form")}
                className="text-sm font-semibold text-[#565959] bg-transparent border-none px-4 py-3 rounded-lg hover:bg-gray-50 cursor-pointer text-left"
              >
                Contact us
              </button>
              <a
                href="https://wa.me/your-number-here"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-center text-white border-none px-4 py-3 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] transition-all duration-200 mt-1 cursor-pointer no-underline flex items-center justify-center gap-2"
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}