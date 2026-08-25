import { ExportProfile, connectToDatabase } from "./mongodb";
import mongoose from "mongoose";

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
 * Fetch seller profile strictly from MongoDB `export_profiles` collection via Mongoose.
 * Matches by slug, custom id (EXP-...), MongoDB _id, or company name.
 * By default, only approved or verified profiles are returned for public viewing.
 */
export async function getSellerProfile(identifier: string, allowPending: boolean = false): Promise<SellerProfile | null> {
  if (!identifier) return null;
  const cleanId = decodeURIComponent(identifier).trim().toLowerCase();

  try {
    await connectToDatabase();
    let doc: any = null;

    const activeFilter = {
      isDeleted: { $ne: true },
      status: { $nin: ["deleted", "removed", "inactive", "archived", "disabled"] },
    };

    // 1. Match by slug
    doc = await ExportProfile.findOne({ slug: cleanId, ...activeFilter }).lean();

    // 2. Match by custom ID (e.g. EXP-xxxx)
    if (!doc) {
      doc = await ExportProfile.findOne({ id: new RegExp(`^${cleanId}$`, "i"), ...activeFilter }).lean();
    }

    // 3. Match by 24-hex ObjectId
    if (!doc && mongoose.isValidObjectId(cleanId)) {
      doc = await ExportProfile.findOne({ _id: new mongoose.Types.ObjectId(cleanId), ...activeFilter }).lean();
    }

    // 4. Match by case-insensitive company name
    if (!doc) {
      const nameWithSpaces = cleanId.replace(/-/g, " ");
      doc = await ExportProfile.findOne({
        $and: [
          activeFilter,
          {
            $or: [
              { companyName: new RegExp(`^${nameWithSpaces}$`, "i") },
              { companyName: new RegExp(`^${cleanId}$`, "i") },
            ],
          },
        ],
      }).lean();
    }

    if (!doc) {
      return null;
    }

    // Check deleted or inactive status
    const status = (doc.status || "pending").toLowerCase();
    const isDeleted = doc.isDeleted === true || ["deleted", "removed", "inactive", "archived", "disabled"].includes(status);
    if (isDeleted) {
      return null;
    }

    // Only approved/verified seller profiles are publicly live unless explicitly allowed for the authenticated owner (pending status only)
    if (!allowPending && status !== "approved" && status !== "verified") {
      return null;
    }

    if (allowPending && status !== "approved" && status !== "verified" && status !== "pending") {
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
