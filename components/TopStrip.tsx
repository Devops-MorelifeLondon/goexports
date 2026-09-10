"use client";

import Link from "next/link";
import { Mail, ShieldCheck } from "lucide-react";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com/goexports",
    icon: FaFacebookF,
  },
  {
    name: "X (Twitter)",
    href: "https://twitter.com/goexports",
    icon: FaXTwitter,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/goexports",
    icon: FaLinkedinIn,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/goexports",
    icon: FaInstagram,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@goexports",
    icon: FaYoutube,
  },
];

export default function TopStrip() {
  return (
    <aside
      aria-label="Top Contact & Social Bar"
      className="w-full bg-[#0a0a0a] text-white text-xs border-b border-[#222222] relative z-40 transition-colors"
    >
      <div className="section-wrap flex items-center justify-between h-[34px] sm:h-[36px] px-3.5 sm:px-6">
        {/* Left Side: Email & Contact */}
        <div className="flex items-center gap-3 sm:gap-5 min-w-0">
          <a
            href="mailto:info@goexports.co.uk"
            className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-[var(--brand-ochre)] transition-colors no-underline font-medium text-[11.5px] sm:text-[12.5px] group truncate"
            title="Email GoExports Support"
          >
            <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--brand-ochre)]/20 transition-colors">
              <Mail className="w-3 h-3 text-zinc-300 group-hover:text-[var(--brand-ochre)] transition-colors" />
            </span>
            <span className="truncate">info@goexports.co.uk</span>
          </a>

          {/* Optional Verified Tagline - Visible on larger screens */}
          <div className="hidden md:flex items-center gap-1.5 text-zinc-400 text-[11.5px] border-l border-zinc-800 pl-3.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-zinc-300">Verified Global Trade Network</span>
          </div>
        </div>

        {/* Right Side: Social Icons & Quick CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="flex items-center gap-1 sm:gap-1.5">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  title={social.name}
                  className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all duration-200 transform hover:scale-110 active:scale-95 no-underline"
                >
                  <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </a>
              );
            })}
          </div>

          <div className="hidden sm:block h-3 w-px bg-zinc-800" />

          {/* Quick link */}
          <Link
            href="/create-export-profile"
            className="hidden sm:inline-flex items-center text-[11.5px] font-semibold text-[var(--brand-ochre)] hover:underline no-underline transition-colors"
          >
            Join as Exporter →
          </Link>
        </div>
      </div>
    </aside>
  );
}
