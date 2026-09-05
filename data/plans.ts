export interface BuyerPlan {
  id: string;
  name: string;
  tagline: string;
  price: string | number;
  currency: string;
  period: string;
  leads: string | number;
  leadsLabel: string;
  featured: boolean;
  badge?: string;
  features: string[];
}

export interface PlanMeta {
  id: string;
  name: string;
  displayName: string;
  tagline: string;
  price: string;
  priceNumber: number;
  currency: string;
  period: string;
  priceDisplay: string;
  leads: string;
  leadsCount: number;
  leadsLabel: string;
  featured: boolean;
  badge?: string;
  features: string[];
  type: "free" | "starter" | "growth" | "enterprise" | "custom";
  badgeBg: string;
  dotBg: string;
  pillBg: string;
  borderColor: string;
  accentColor: string;
}

/**
 * Dynamically extract and style plan metadata from either a database PackageDbModel object
 * or a package name/id string.
 */
export function getPlanMeta(pkgNameOrId?: string, customPkg?: any): PlanMeta {
  const raw = (customPkg?.name || pkgNameOrId || "Growth").trim();
  const lower = raw.toLowerCase();

  const priceVal = customPkg?.priceDisplay ?? (customPkg?.price !== undefined ? String(customPkg.price) : "");
  const priceNum = typeof customPkg?.price === "number" ? customPkg.price : parseFloat(String(customPkg?.price || "0")) || 0;
  const leadsVal = customPkg?.leads !== undefined ? String(customPkg.leads) : "";
  const leadsNum = typeof customPkg?.leads === "number" ? customPkg.leads : parseInt(String(customPkg?.leads || "0"), 10) || 0;
  const currency = customPkg?.currency || "£";
  const period = customPkg?.period || "/ month";
  const features = Array.isArray(customPkg?.features) ? customPkg.features : [];
  const tagline = customPkg?.tagline || "";
  const badge = customPkg?.badge;
  const featured = Boolean(customPkg?.featured);

  if (lower.includes("enterprise") || lower === "999" || priceNum >= 900) {
    return {
      id: customPkg?.id || "enterprise",
      name: customPkg?.name || "Enterprise",
      displayName: !["enterprise", "free", "starter", "growth"].includes(lower) ? raw : "Enterprise Tier",
      tagline: tagline || "For established global export businesses",
      price: priceVal || "999",
      priceNumber: priceNum || 999,
      currency,
      period,
      priceDisplay: `${currency}${priceVal || "999"}${period === "/ month" ? "/mo" : period}`,
      leads: leadsVal || "120",
      leadsCount: leadsNum || 120,
      leadsLabel: customPkg?.leadsLabel || "Qualified Leads / Month",
      featured,
      badge: badge || "🚀 Enterprise Tier",
      features: features.length > 0 ? features : [
        "Targeted Industry Leads",
        "International Buyers",
        "Verified Global Buyers",
        "Dedicated Account Manager",
        "24/7/365 Support",
        "Weekly Reporting",
        "Monthly Reporting",
        "Weekly / Monthly Call",
      ],
      type: "enterprise",
      badgeBg: "bg-purple-50 text-purple-900 border-purple-200",
      dotBg: "bg-purple-500",
      pillBg: "bg-purple-100 text-purple-800 border-purple-200",
      borderColor: "border-purple-300",
      accentColor: "#9333ea",
    };
  }

  if (
    lower.includes("growth") ||
    lower.includes("premium") ||
    lower.includes("pro") ||
    lower.includes("verified growth pro") ||
    lower === "499" ||
    (priceNum >= 400 && priceNum < 900)
  ) {
    return {
      id: customPkg?.id || "growth",
      name: customPkg?.name || "Growth",
      displayName: !["enterprise", "free", "starter", "growth"].includes(lower) ? raw : "Growth Tier",
      tagline: tagline || "Most popular for scaling export manufacturers",
      price: priceVal || "499",
      priceNumber: priceNum || 499,
      currency,
      period,
      priceDisplay: `${currency}${priceVal || "499"}${period === "/ month" ? "/mo" : period}`,
      leads: leadsVal || "50",
      leadsCount: leadsNum || 50,
      leadsLabel: customPkg?.leadsLabel || "Qualified Leads / Month",
      featured: customPkg?.featured !== undefined ? featured : true,
      badge: badge || "⭐ Growth Tier",
      features: features.length > 0 ? features : [
        "Targeted Industry Leads",
        "International Buyers",
        "Verified Global Buyers",
        "Dedicated Account Manager",
        "24/7/365 Support",
        "Weekly Reporting",
        "Monthly Reporting",
        "Weekly / Monthly Call",
      ],
      type: "growth",
      badgeBg: "bg-amber-50 text-amber-900 border-amber-300",
      dotBg: "bg-amber-500",
      pillBg: "bg-amber-100 text-amber-900 border-amber-300",
      borderColor: "border-amber-400",
      accentColor: "var(--brand-ochre)",
    };
  }

  if (lower.includes("starter") || lower === "249" || (priceNum > 0 && priceNum < 400)) {
    return {
      id: customPkg?.id || "starter",
      name: customPkg?.name || "Starter",
      displayName: !["enterprise", "free", "starter", "growth"].includes(lower) ? raw : "Starter Tier",
      tagline: tagline || "Perfect for new exporters entering international trade",
      price: priceVal || "249",
      priceNumber: priceNum || 249,
      currency,
      period,
      priceDisplay: `${currency}${priceVal || "249"}${period === "/ month" ? "/mo" : period}`,
      leads: leadsVal || "20",
      leadsCount: leadsNum || 20,
      leadsLabel: customPkg?.leadsLabel || "Qualified Leads / Month",
      featured,
      badge: badge || "📦 Starter Tier",
      features: features.length > 0 ? features : [
        "Targeted Industry Leads",
        "International Buyers",
        "Verified Global Buyers",
        "Dedicated Account Manager",
        "24/7/365 Support",
        "Weekly Reporting",
        "Monthly Reporting",
        "Weekly / Monthly Call",
      ],
      type: "starter",
      badgeBg: "bg-blue-50 text-blue-800 border-blue-200",
      dotBg: "bg-blue-500",
      pillBg: "bg-blue-100 text-blue-800 border-blue-200",
      borderColor: "border-blue-300",
      accentColor: "#2563eb",
    };
  }

  // Free / Custom
  return {
    id: customPkg?.id || "free",
    name: customPkg?.name || "Free",
    displayName: !["enterprise", "free", "starter", "growth"].includes(lower) ? raw : "Free Tier",
    tagline: tagline || "Start exploring international markets",
    price: priceVal || "0",
    priceNumber: priceNum || 0,
    currency,
    period,
    priceDisplay: `${currency}${priceVal || "0"}${period === "/ month" ? "/mo" : period}`,
    leads: leadsVal || "2",
    leadsCount: leadsNum || 2,
    leadsLabel: customPkg?.leadsLabel || "Qualified Leads / Month",
    featured: false,
    badge: badge || "🌱 Free Tier",
    features: features.length > 0 ? features : [
      "Targeted Industry Leads",
      "International Buyers",
      "Verified Global Buyers",
      "24/7/365 Support",
    ],
    type: "free",
    badgeBg: "bg-slate-100 text-slate-700 border-slate-300",
    dotBg: "bg-slate-400",
    pillBg: "bg-slate-100 text-slate-800 border-slate-200",
    borderColor: "border-slate-300",
    accentColor: "#64748b",
  };
}
