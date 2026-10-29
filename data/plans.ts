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
  planType?: "export" | "domestic";
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
  type: "free" | "starter" | "growth" | "enterprise" | "domestic-starter" | "domestic-growth" | "domestic-enterprise" | "domestic" | "custom";
  planType?: "export" | "domestic";
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
export function getPlanMeta(pkgNameOrId?: string, customPkg?: any, defaultCurrency?: string): PlanMeta {
  const raw = (customPkg?.name || pkgNameOrId || "Growth").trim();
  const lower = raw.toLowerCase();

  const priceVal = customPkg?.priceDisplay ?? (customPkg?.price !== undefined ? String(customPkg.price) : "");
  const priceNum = typeof customPkg?.price === "number" ? customPkg.price : parseFloat(String(customPkg?.price || "0").replace(/,/g, "")) || 0;
  const leadsVal = customPkg?.leads !== undefined ? String(customPkg.leads) : "";
  const leadsNum = typeof customPkg?.leads === "number" ? customPkg.leads : parseInt(String(customPkg?.leads || "0"), 10) || 0;
  const currency = customPkg?.currency || defaultCurrency || (lower.includes("domestic") ? "₹" : "£");
  const period = customPkg?.period || "/ month";
  const features = Array.isArray(customPkg?.features) ? customPkg.features : [];
  const tagline = customPkg?.tagline || "";
  const badge = customPkg?.badge;
  const featured = Boolean(customPkg?.featured);

  if (customPkg?.isCustom || lower.includes("custom")) {
    return {
      id: customPkg?.id || "custom",
      name: customPkg?.name || "Custom Plan",
      displayName: raw || "Custom Plan",
      tagline: tagline || "Bespoke export subscription tier",
      price: priceVal || "0",
      priceNumber: priceNum || 0,
      currency,
      period,
      priceDisplay: `${currency}${priceVal || "0"}${period === "/ month" ? "/mo" : period}`,
      leads: leadsVal || "Custom",
      leadsCount: leadsNum || 0,
      leadsLabel: customPkg?.leadsLabel || "Custom Qualified Leads / Month",
      featured,
      badge: badge || "⚡ Custom Tier",
      features: features.length > 0 ? features : [
        "Tailored Target Industry Leads",
        "Direct International Buyer Matching",
        "Dedicated Account Management",
        "Custom Lead Delivery & Quota",
        "24/7 Priority Support",
      ],
      type: "custom",
      planType: customPkg?.planType || "export",
      badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-300",
      dotBg: "bg-emerald-500",
      pillBg: "bg-emerald-100 text-emerald-900 border-emerald-300",
      borderColor: "border-emerald-400",
      accentColor: "#059669",
    };
  }

  // ── DOMESTIC PLANS CHECK (₹24,999 - 50 leads, ₹49,999 - 100 leads, ₹99,999 - 200 leads) ──
  const isDomestic =
    customPkg?.planType === "domestic" ||
    lower.includes("domestic") ||
    lower.includes("24999") ||
    lower.includes("49999") ||
    lower.includes("99999") ||
    (currency === "₹" && (priceNum === 24999 || priceNum === 49999 || priceNum === 99999 || priceNum >= 10000));

  if (isDomestic) {
    if (lower.includes("enterprise") || lower.includes("99999") || priceNum >= 75000 || lower.includes("200")) {
      return {
        id: customPkg?.id || "domestic-enterprise",
        name: customPkg?.name || "Domestic Enterprise",
        displayName: !["domestic-enterprise", "domestic-growth", "domestic-starter"].includes(lower) ? raw : "Domestic Enterprise Tier",
        tagline: tagline || "200 Leads",
        price: priceVal || "99,999",
        priceNumber: priceNum || 99999,
        currency: "₹",
        period,
        priceDisplay: `₹${priceVal || "99,999"}${period === "/ month" ? "/mo" : period}`,
        leads: leadsVal || "200",
        leadsCount: leadsNum || 200,
        leadsLabel: customPkg?.leadsLabel || "Qualified Domestic Leads / Month",
        featured,
        badge: badge || "🚀 Enterprise Volume",
        features: features.length > 0 ? features : [
          "200 Leads",
        ],
        type: "domestic-enterprise",
        planType: "domestic",
        badgeBg: "bg-indigo-50 text-indigo-900 border-indigo-200",
        dotBg: "bg-indigo-600",
        pillBg: "bg-indigo-100 text-indigo-800 border-indigo-200",
        borderColor: "border-indigo-400",
        accentColor: "#4f46e5",
      };
    }

    if (
      lower.includes("growth") ||
      lower.includes("49999") ||
      (priceNum >= 35000 && priceNum < 75000) ||
      lower.includes("100")
    ) {
      return {
        id: customPkg?.id || "domestic-growth",
        name: customPkg?.name || "Domestic Growth",
        displayName: !["domestic-enterprise", "domestic-growth", "domestic-starter"].includes(lower) ? raw : "Domestic Growth Tier",
        tagline: tagline || "100 Leads",
        price: priceVal || "49,999",
        priceNumber: priceNum || 49999,
        currency: "₹",
        period,
        priceDisplay: `₹${priceVal || "49,999"}${period === "/ month" ? "/mo" : period}`,
        leads: leadsVal || "100",
        leadsCount: leadsNum || 100,
        leadsLabel: customPkg?.leadsLabel || "Qualified Domestic Leads / Month",
        featured: customPkg?.featured !== undefined ? featured : true,
        badge: badge || "⭐ Most Popular",
        features: features.length > 0 ? features : [
          "100 Leads",
        ],
        type: "domestic-growth",
        planType: "domestic",
        badgeBg: "bg-amber-50 text-amber-900 border-amber-300",
        dotBg: "bg-amber-500",
        pillBg: "bg-amber-100 text-amber-900 border-amber-300",
        borderColor: "border-amber-400",
        accentColor: "#d97706",
      };
    }

    // Default Domestic Plan: Domestic Starter (₹24,999 - 50 leads)
    return {
      id: customPkg?.id || "domestic-starter",
      name: customPkg?.name || "Domestic Starter",
      displayName: !["domestic-enterprise", "domestic-growth", "domestic-starter"].includes(lower) ? raw : "Domestic Starter Tier",
      tagline: tagline || "50 Leads",
      price: priceVal || "24,999",
      priceNumber: priceNum || 24999,
      currency: "₹",
      period,
      priceDisplay: `₹${priceVal || "24,999"}${period === "/ month" ? "/mo" : period}`,
      leads: leadsVal || "50",
      leadsCount: leadsNum || 50,
      leadsLabel: customPkg?.leadsLabel || "Qualified Domestic Leads / Month",
      featured,
      badge: badge || "📦 Domestic Starter",
      features: features.length > 0 ? features : [
        "50 Leads",
      ],
      type: "domestic-starter",
      planType: "domestic",
      badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-300",
      dotBg: "bg-emerald-500",
      pillBg: "bg-emerald-100 text-emerald-900 border-emerald-300",
      borderColor: "border-emerald-400",
      accentColor: "#059669",
    };
  }

  // ── INTERNATIONAL EXPORT PLANS ──
  if (lower.includes("enterprise") || lower === "999" || (priceNum >= 900 && priceNum < 10000)) {
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
      planType: "export",
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
      planType: "export",
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
      planType: "export",
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
    leads: leadsVal && leadsVal !== "2" ? leadsVal : "0",
    leadsCount: leadsNum && leadsNum !== 2 ? leadsNum : 0,
    leadsLabel: customPkg?.leadsLabel && customPkg.leadsLabel !== "Qualified Leads / Month" ? customPkg.leadsLabel : "Free Profile Creation",
    featured: false,
    badge: badge || "🌱 Free Tier",
    features: features.length > 0 ? features : [
      "Free Profile Creation",
      "Public Storefront",
      "Product Catalog Listing",
      "24/7/365 Support",
    ],
    type: "free",
    planType: "export",
    badgeBg: "bg-slate-100 text-slate-700 border-slate-300",
    dotBg: "bg-slate-400",
    pillBg: "bg-slate-100 text-slate-800 border-slate-200",
    borderColor: "border-slate-300",
    accentColor: "#64748b",
  };
}
