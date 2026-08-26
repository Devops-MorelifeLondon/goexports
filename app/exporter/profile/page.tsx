import { Suspense } from "react";
import { Metadata } from "next";
import mongoose from "mongoose";
import { getExporterSessionFromRequest } from "@/lib/exporter-auth";
import { ExportProfile, SellerInquiry, connectToDatabase } from "@/lib/mongodb";
import ExporterProfileDashboard from "@/components/ExporterProfileDashboard";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Exporter Profile & Storefront Portal | Goexports",
  description: "Manage your global exporter profile, update product catalog, and respond to direct international buyer inquiries.",
  robots: {
    index: false,
    follow: false,
  },
};

function DashboardFallback() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
      style={{ backgroundColor: "var(--canvas)" }}
    >
      <Loader2 className="w-8 h-8 text-[var(--brand-ochre)] animate-spin mb-3" />
      <h2 className="text-xl font-bold text-[var(--ink)]">Loading Your Exporter Portal...</h2>
      <p className="text-xs text-[var(--muted)] mt-1">Retrieving profile data and buyer inquiries</p>
    </div>
  );
}

export default async function ExporterProfilePage() {
  let initialProfile: any = null;
  let initialInquiries: any[] = [];

  try {
    const session = await getExporterSessionFromRequest();
    if (session) {
      await connectToDatabase();
      let userDoc: any = null;

      const activeFilter = {
        isDeleted: { $ne: true },
        status: { $nin: ["deleted", "removed", "inactive", "archived", "disabled"] },
      };

      if (session.id) {
        userDoc = await ExportProfile.findOne({ id: session.id, ...activeFilter }).lean();
        if (!userDoc && mongoose.isValidObjectId(session.id)) {
          userDoc = await ExportProfile.findOne({ _id: new mongoose.Types.ObjectId(session.id), ...activeFilter }).lean();
        }
      }
      if (!userDoc && session.email) {
        userDoc = await ExportProfile.findOne({ email: session.email.toLowerCase(), ...activeFilter }).lean();
      }

      if (userDoc) {
        const { password: _, ...safeUser } = userDoc;
        safeUser.id = userDoc.id || userDoc._id.toString();
        initialProfile = JSON.parse(JSON.stringify(safeUser));

        const rawInquiries = await SellerInquiry.find({
          $or: [
            { sellerEmail: userDoc.email.toLowerCase() },
            { sellerId: userDoc.id },
            { sellerId: userDoc._id.toString() },
          ],
        })
          .sort({ receivedAt: -1, createdAt: -1 })
          .limit(50)
          .lean();

        initialInquiries = rawInquiries.map((inq: any) => ({
          id: inq._id.toString(),
          buyerName: inq.buyerName,
          buyerEmail: inq.buyerEmail,
          buyerPhone: inq.buyerPhone || "",
          buyerCountry: inq.buyerCountry || "",
          inquiryType: inq.inquiryType || "Bulk Order / RFQ",
          quantity: inq.quantity || "",
          message: inq.message || "",
          createdAt: inq.createdAt || inq.receivedAt || new Date().toISOString(),
        }));
      }
    }
  } catch (err: any) {
    console.warn("Exporter profile server prefetch notice:", err.message);
  }

  return (
    <Suspense fallback={<DashboardFallback />}>
      <ExporterProfileDashboard
        initialProfile={initialProfile}
        initialInquiries={initialInquiries}
      />
    </Suspense>
  );
}
