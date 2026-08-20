// Shared SVG icon components — all inline, no emoji dependencies.
// Each icon accepts optional size, color, className and style props.

type IconProps = { size?: number; color?: string; className?: string; style?: React.CSSProperties };

const s = (size = 20) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.75",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

// ── Feature card icons ──
export const IconVerified = ({ size = 20, color, className, style }: IconProps) => (
  <svg {...s(size)} color={color} className={className} style={style}>
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const IconGlobe = ({ size = 20, color, className, style }: IconProps) => (
  <svg {...s(size)} color={color} className={className} style={style}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

export const IconRocket = ({ size = 20, color, className, style }: IconProps) => (
  <svg {...s(size)} color={color} className={className} style={style}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
  </svg>
);

export const IconHandshake = ({ size = 20, color, className, style }: IconProps) => (
  <svg {...s(size)} color={color} className={className} style={style}>
    <path d="M2 12h4l3-3 4 4 3-3 4 4" />
    <path d="M14.5 6.5l-5 5" />
    <path d="M9.5 6.5l5 5" />
    <circle cx="12" cy="4" r="2" />
  </svg>
);

export const IconPackage = ({ size = 20, color, className, style }: IconProps) => (
  <svg {...s(size)} color={color} className={className} style={style}>
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

export const IconTrendingUp = ({ size = 20, color, className, style }: IconProps) => (
  <svg {...s(size)} color={color} className={className} style={style}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

// ── Pricing / trust strip icons ──
export const IconLock = ({ size = 20, color, className, style }: IconProps) => (
  <svg {...s(size)} color={color} className={className} style={style}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

export const IconFileText = ({ size = 20, color, className, style }: IconProps) => (
  <svg {...s(size)} color={color} className={className} style={style}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

export const IconRefreshCw = ({ size = 20, color, className, style }: IconProps) => (
  <svg {...s(size)} color={color} className={className} style={style}>
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
  </svg>
);

export const IconMessageCircle = ({ size = 20, color, className, style }: IconProps) => (
  <svg {...s(size)} color={color} className={className} style={style}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

// ── Pricing feature icons ──
export const IconTarget = ({ size = 20, color, className, style }: IconProps) => (
  <svg {...s(size)} color={color} className={className} style={style}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export const IconUser = ({ size = 20, color, className, style }: IconProps) => (
  <svg {...s(size)} color={color} className={className} style={style}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const IconShield = ({ size = 20, color, className, style }: IconProps) => (
  <svg {...s(size)} color={color} className={className} style={style}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export const IconBarChart2 = ({ size = 20, color, className, style }: IconProps) => (
  <svg {...s(size)} color={color} className={className} style={style}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

export const IconPhone = ({ size = 20, color, className, style }: IconProps) => (
  <svg {...s(size)} color={color} className={className} style={style}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013 12a19.79 19.79 0 01-3.07-8.67A2 2 0 011.92 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L5.91 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

export const IconSettings = ({ size = 20, color, className, style }: IconProps) => (
  <svg {...s(size)} color={color} className={className} style={style}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

export const IconZap = ({ size = 20, color, className, style }: IconProps) => (
  <svg {...s(size)} color={color} className={className} style={style}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export const IconCheck = ({ size = 20, color, className, style }: IconProps) => (
  <svg {...s(size)} color={color} className={className} style={style}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const IconSearch = ({ size = 20, color, className, style }: IconProps) => (
  <svg {...s(size)} color={color} className={className} style={style}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const IconStar = ({ size = 20, color, className, style }: IconProps) => (
  <svg {...s(size)} color={color} className={className} style={style}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// Map feature name → icon component for pricing cards
export const FeatureIconMap: Record<string, React.FC<IconProps>> = {
  "Targeted Industry Leads": IconTarget,
  "International Buyers": IconGlobe,
  "Verified Global Buyers": IconVerified,
  "Dedicated Account Manager": IconUser,
  "24/7/365 Support": IconShield,
  "Weekly Reporting": IconBarChart2,
  "Monthly Reporting": IconTrendingUp,
  "Weekly / Monthly Call": IconPhone,
  "Custom Integrations": IconSettings,
  "Priority Support": IconZap,
};

// Aliases for convenience & backwards compatibility
export const Star = IconStar;
export const Check = IconCheck;
export const Search = IconSearch;
export const Lock = IconLock;
export const Globe = IconGlobe;
export const Shield = IconShield;
export const Rocket = IconRocket;
export const Handshake = IconHandshake;
export const Package = IconPackage;
export const Zap = IconZap;
export const Phone = IconPhone;
export const User = IconUser;
export const Target = IconTarget;