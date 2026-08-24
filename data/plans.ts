export interface BuyerPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  currency: string;
  period: string;
  leads: string;
  leadsLabel: string;
  featured: boolean;
  badge?: string;
  features: string[];
}

export const BUYER_PLANS: BuyerPlan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Start exploring international markets",
    price: "0",
    currency: "£",
    period: "/ month",
    leads: "5",
    leadsLabel: "Qualified Leads / Month",
    featured: false,
    features: [
      "Targeted Industry Leads",
      "International Buyers",
      "Verified Global Buyers",
      "24/7/365 Support",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    tagline: "Perfect for new exporters",
    price: "249",
    currency: "£",
    period: "/ month",
    leads: "20",
    leadsLabel: "Qualified Leads / Month",
    featured: false,
    features: [
      "Targeted Industry Leads",
      "International Buyers",
      "Verified Global Buyers",
      "Dedicated Account Manager",
      "24/7/365 Support",
      "Weekly Reporting",
      "Monthly Reporting",
      "Weekly / Monthly Call",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Most popular for scaling",
    price: "499",
    currency: "£",
    period: "/ month",
    leads: "50",
    leadsLabel: "Qualified Leads / Month",
    featured: true,
    badge: "⭐ Most Popular",
    features: [
      "Targeted Industry Leads",
      "International Buyers",
      "Verified Global Buyers",
      "Dedicated Account Manager",
      "24/7/365 Support",
      "Weekly Reporting",
      "Monthly Reporting",
      "Weekly / Monthly Call",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For established businesses",
    price: "999",
    currency: "£",
    period: "/ month",
    leads: "120",
    leadsLabel: "Qualified Leads / Month",
    featured: false,
    features: [
      "Targeted Industry Leads",
      "International Buyers",
      "Verified Global Buyers",
      "Dedicated Account Manager",
      "24/7/365 Support",
      "Weekly Reporting",
      "Monthly Reporting",
      "Weekly / Monthly Call",
    ],
  },
];

export function getPlanById(id: string): BuyerPlan | undefined {
  return BUYER_PLANS.find((p) => p.id === id.toLowerCase() || p.name.toLowerCase() === id.toLowerCase());
}
