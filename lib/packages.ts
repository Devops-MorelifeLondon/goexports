import { PackageModel, connectToDatabase } from "./mongodb";
import { BUYER_PLANS } from "@/data/plans";

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

/**
 * Seed initial Find International Buyers Plans into MongoDB
 */
export async function seedPackages(): Promise<{ success: boolean; count: number; packages: PackageDbModel[] }> {
  await connectToDatabase();

  const initialPackages: PackageDbModel[] = BUYER_PLANS.map((plan, index) => ({
    id: plan.id,
    slug: plan.id,
    name: plan.name,
    tagline: plan.tagline,
    price: parseFloat(plan.price) || 0,
    priceDisplay: plan.price,
    currency: plan.currency,
    period: plan.period,
    leads: parseInt(plan.leads, 10) || 0,
    leadsLabel: plan.leadsLabel,
    featured: plan.featured,
    badge: plan.badge,
    features: plan.features,
    isActive: true,
    sortOrder: index + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  for (const pkg of initialPackages) {
    await PackageModel.updateOne(
      { id: pkg.id },
      {
        $set: {
          ...pkg,
          updatedAt: new Date().toISOString(),
        },
        $setOnInsert: {
          createdAt: new Date().toISOString(),
        },
      },
      { upsert: true }
    );
  }

  return {
    success: true,
    count: initialPackages.length,
    packages: initialPackages,
  };
}

/**
 * Retrieve all active packages from MongoDB (with static fallback)
 */
export async function getAllPackages(): Promise<PackageDbModel[]> {
  try {
    await connectToDatabase();
    const docs = await PackageModel.find({ isActive: { $ne: false } })
      .sort({ sortOrder: 1 })
      .lean();

    if (docs && docs.length > 0) {
      return docs.map((doc: any) => ({
        id: doc.id || doc._id.toString(),
        slug: doc.slug || doc.id,
        name: doc.name,
        tagline: doc.tagline,
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
    console.warn("Could not query packages from MongoDB, using fallback:", err.message);
  }

  // Fallback to static BUYER_PLANS if database is unreachable or empty
  return BUYER_PLANS.map((plan, index) => ({
    id: plan.id,
    slug: plan.id,
    name: plan.name,
    tagline: plan.tagline,
    price: parseFloat(plan.price) || 0,
    priceDisplay: plan.price,
    currency: plan.currency,
    period: plan.period,
    leads: parseInt(plan.leads, 10) || 0,
    leadsLabel: plan.leadsLabel,
    featured: plan.featured,
    badge: plan.badge,
    features: plan.features,
    isActive: true,
    sortOrder: index + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

/**
 * Retrieve a single package by id/slug
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
        tagline: doc.tagline,
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
    console.warn("Could not query package from MongoDB:", err.message);
  }

  const staticPlan = BUYER_PLANS.find(
    (p) => p.id === cleanId || p.name.toLowerCase() === cleanId
  );
  if (!staticPlan) return null;

  return {
    id: staticPlan.id,
    slug: staticPlan.id,
    name: staticPlan.name,
    tagline: staticPlan.tagline,
    price: parseFloat(staticPlan.price) || 0,
    priceDisplay: staticPlan.price,
    currency: staticPlan.currency,
    period: staticPlan.period,
    leads: parseInt(staticPlan.leads, 10) || 0,
    leadsLabel: staticPlan.leadsLabel,
    featured: staticPlan.featured,
    badge: staticPlan.badge,
    features: staticPlan.features,
    isActive: true,
    sortOrder: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
