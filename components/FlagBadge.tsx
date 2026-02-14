"use client";

import React from "react";

const FLAG_EMOJIS: Record<string, string> = {
  US: "🇺🇸", CA: "🇨🇦", MX: "🇲🇽", BR: "🇧🇷", UK: "🇬🇧", FR: "🇫🇷", BE: "🇧🇪",
  ES: "🇪🇸", DE: "🇩🇪", IT: "🇮🇹", NL: "🇳🇱", PL: "🇵🇱", SE: "🇸🇪", TR: "🇹🇷",
  JP: "🇯🇵", IN: "🇮🇳", AU: "🇦🇺", SG: "🇸🇬", AE: "🇦🇪", SA: "🇸🇦", EG: "🇪🇬",
};

interface FlagBadgeProps {
  code: string;
  name: string;
  href?: string;
}

export default function FlagBadge({ code, name, href = "#" }: FlagBadgeProps): React.JSX.Element {
  return (
    <>
      <style>{`
        .flag-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid #d5d9d9;
          text-decoration: none;
          color: #0F1111;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s;
          background: white;
        }
        .flag-badge:hover {
          border-color: #007185;
          background: #f0fbfc;
          color: #0F1111;
          text-decoration: none;
        }
      `}</style>
      <a href={href} className="flag-badge">
        <span style={{ fontSize: 18 }}>{FLAG_EMOJIS[code]}</span> {name}
      </a>
    </>
  );
}