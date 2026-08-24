import { getExportProfilesCollection } from "./mongodb";
import { ObjectId } from "mongodb";

export interface SellerProfile {
  id: string;
  slug: string;
  fullName: string;
  phone: string;
  email: string;
  companyName: string;
  country: string;
  productCategory: string;
  website?: string;
  postCode: string;
  companyProfile: string;
  targetMarkets: string[];
  yearEstablished?: string;
  exportCapacity?: string;
  certifications: string[];
  createdAt?: string;
  status?: string;
  selectedPackage?: string;
}

export function slugifyCompanyName(name: string): string {
  return (name || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Fetch seller profile strictly from MongoDB `export_profiles` collection.
 * Matches by slug, custom id (EXP-...), MongoDB _id, or company name.
 * By default, only approved or verified profiles are returned for public viewing.
 */
export async function getSellerProfile(identifier: string, allowPending: boolean = false): Promise<SellerProfile | null> {
  if (!identifier) return null;
  const cleanId = decodeURIComponent(identifier).trim().toLowerCase();

  try {
    const collection = await getExportProfilesCollection();
    let doc: any = null;

    // 1. Match by slug
    doc = await collection.findOne({ slug: cleanId });

    // 2. Match by custom ID (e.g. EXP-xxxx)
    if (!doc) {
      doc = await collection.findOne({ id: new RegExp(`^${cleanId}$`, "i") });
    }

    // 3. Match by 24-hex ObjectId
    if (!doc && ObjectId.isValid(cleanId)) {
      doc = await collection.findOne({ _id: new ObjectId(cleanId) });
    }

    // 4. Match by case-insensitive company name
    if (!doc) {
      const nameWithSpaces = cleanId.replace(/-/g, " ");
      doc = await collection.findOne({
        $or: [
          { companyName: new RegExp(`^${nameWithSpaces}$`, "i") },
          { companyName: new RegExp(`^${cleanId}$`, "i") },
        ],
      });
    }

    if (!doc) {
      return null;
    }

    // Only approved/verified seller profiles are publicly live unless explicitly allowed for the authenticated owner
    const status = (doc.status || "pending").toLowerCase();
    if (!allowPending && status !== "approved" && status !== "verified") {
      return null;
    }

    return {
      id: doc.id || doc._id.toString(),
      slug: doc.slug || slugifyCompanyName(doc.companyName || "exporter"),
      fullName: doc.fullName || "",
      phone: doc.phone || "",
      email: doc.email || "",
      companyName: doc.companyName || "",
      country: doc.country || "",
      productCategory: doc.productCategory || "",
      website: doc.website || "",
      postCode: doc.postCode || "",
      companyProfile: doc.companyProfile || "",
      targetMarkets: Array.isArray(doc.targetMarkets) ? doc.targetMarkets : [],
      yearEstablished: doc.yearEstablished || "",
      exportCapacity: doc.exportCapacity || "",
      certifications: Array.isArray(doc.certifications) ? doc.certifications : [],
      createdAt: doc.createdAt || "",
      status: doc.status || "pending",
      selectedPackage: doc.selectedPackage || doc.package || "Verified Growth Pro",
    };
  } catch {
    return null;
  }
}
