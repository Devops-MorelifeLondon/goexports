import { PackageModel, connectToDatabase } from "./mongodb";

export interface PackageDbModel {
  id: string; // "free" | "starter" | "growth" | "enterprise"
  slug: string;
  name: string;
  tagline: string;
  price: number;
  priceDisplay: string;
  currency: string;
  period: string;
  leads: number;
  leadsLabel: string;
  featured: boolean;
  badge?: string;
  features: string[];
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

const DEFAULT_SEEDED_PACKAGES: Omit<PackageDbModel, "createdAt" | "updatedAt">[] = [
  {
    id: "free",
    slug: "free",
    name: "Free",
    tagline: "Start exploring international markets",
    price: 0,
    priceDisplay: "0",
    currency: "£",
    period: "/ month",
    leads: 2,
    leadsLabel: "Qualified Leads / Month",
    featured: false,
    badge: undefined,
    features: [
      "Targeted Industry Leads",
      "International Buyers",
      "Verified Global Buyers",
      "24/7/365 Support",
    ],
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "starter",
    slug: "starter",
    name: "Starter",
    tagline: "Perfect for new exporters",
    price: 249,
    priceDisplay: "249",
    currency: "£",
    period: "/ month",
    leads: 20,
    leadsLabel: "Qualified Leads / Month",
    featured: false,
    badge: undefined,
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
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "growth",
    slug: "growth",
    name: "Growth",
    tagline: "Most popular for scaling",
    price: 499,
    priceDisplay: "499",
    currency: "£",
    period: "/ month",
    leads: 50,
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
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "enterprise",
    slug: "enterprise",
    name: "Enterprise",
    tagline: "For established businesses",
    price: 999,
    priceDisplay: "999",
    currency: "£",
    period: "/ month",
    leads: 120,
    leadsLabel: "Qualified Leads / Month",
    featured: false,
    badge: undefined,
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
    isActive: true,
    sortOrder: 4,
  },
];

/**
 * Seed initial Find International Buyers Plans into MongoDB
 */
export async function seedPackages(): Promise<{ success: boolean; count: number; packages: PackageDbModel[] }> {
  await connectToDatabase();

  const now = new Date().toISOString();
  const seededPackages: PackageDbModel[] = DEFAULT_SEEDED_PACKAGES.map((pkg) => ({
    ...pkg,
    createdAt: now,
    updatedAt: now,
  }));

  for (const pkg of seededPackages) {
    await PackageModel.updateOne(
      { id: pkg.id },
      {
        $set: {
          ...pkg,
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      { upsert: true }
    );
  }

  return {
    success: true,
    count: seededPackages.length,
    packages: seededPackages,
  };
}

/**
 * Retrieve all active packages directly from MongoDB packages collection
 */
export async function getAllPackages(): Promise<PackageDbModel[]> {
  try {
    await connectToDatabase();
    let docs = await PackageModel.find({ isActive: { $ne: false } })
      .sort({ sortOrder: 1 })
      .lean();

    if (!docs || docs.length === 0) {
      // Auto-seed if database packages collection is completely empty
      await seedPackages();
      docs = await PackageModel.find({ isActive: { $ne: false } })
        .sort({ sortOrder: 1 })
        .lean();
    }

    if (docs && docs.length > 0) {
      return docs.map((doc: any) => ({
        id: doc.id || doc._id.toString(),
        slug: doc.slug || doc.id,
        name: doc.name,
        tagline: doc.tagline || "",
        price: typeof doc.price === "number" ? doc.price : parseFloat(doc.price) || 0,
        priceDisplay: doc.priceDisplay || String(doc.price || "0"),
        currency: doc.currency || "£",
        period: doc.period || "/ month",
        leads: typeof doc.leads === "number" ? doc.leads : parseInt(doc.leads, 10) || 0,
        leadsLabel: doc.leadsLabel || "Qualified Leads / Month",
        featured: Boolean(doc.featured),
        badge: doc.badge,
        features: Array.isArray(doc.features) ? doc.features : [],
        isActive: doc.isActive !== false,
        sortOrder: doc.sortOrder || 1,
        createdAt: doc.createdAt || new Date().toISOString(),
        updatedAt: doc.updatedAt || new Date().toISOString(),
      }));
    }
  } catch (err: any) {
    console.error("Could not query packages from MongoDB:", err.message);
  }

  return [];
}

/**
 * Retrieve a single package directly from MongoDB by id/slug/name
 */
export async function getPackageById(idOrSlug: string): Promise<PackageDbModel | null> {
  const cleanId = (idOrSlug || "").trim().toLowerCase();
  if (!cleanId) return null;

  try {
    await connectToDatabase();
    const doc: any = await PackageModel.findOne({
      $or: [{ id: cleanId }, { slug: cleanId }, { name: new RegExp(`^${cleanId}$`, "i") }],
    }).lean();

    if (doc) {
      return {
        id: doc.id || doc._id.toString(),
        slug: doc.slug || doc.id,
        name: doc.name,
        tagline: doc.tagline || "",
        price: typeof doc.price === "number" ? doc.price : parseFloat(doc.price) || 0,
        priceDisplay: doc.priceDisplay || String(doc.price || "0"),
        currency: doc.currency || "£",
        period: doc.period || "/ month",
        leads: typeof doc.leads === "number" ? doc.leads : parseInt(doc.leads, 10) || 0,
        leadsLabel: doc.leadsLabel || "Qualified Leads / Month",
        featured: Boolean(doc.featured),
        badge: doc.badge,
        features: Array.isArray(doc.features) ? doc.features : [],
        isActive: doc.isActive !== false,
        sortOrder: doc.sortOrder || 1,
        createdAt: doc.createdAt || new Date().toISOString(),
        updatedAt: doc.updatedAt || new Date().toISOString(),
      };
    }
  } catch (err: any) {
    console.error("Could not query package from MongoDB:", err.message);
  }

  return null;
}
