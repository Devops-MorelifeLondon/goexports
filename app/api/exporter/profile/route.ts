import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { ExportProfile, SellerInquiry, connectToDatabase } from "@/lib/mongodb";
import { getExporterSessionFromRequest, createExporterToken, SESSION_COOKIE_NAME } from "@/lib/exporter-auth";
import { slugifyCompanyName } from "@/lib/seller";

export async function GET(req: Request) {
  try {
    const session = await getExporterSessionFromRequest(req);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Please log in to view your exporter profile." },
        { status: 401 }
      );
    }

    await connectToDatabase();
    let userDoc: any = null;

    const activeFilter = {
      isDeleted: { $ne: true },
      status: { $nin: ["deleted", "removed", "inactive", "archived", "disabled"] },
    };

    // Search by custom id, email, or ObjectId
    if (session.id) {
      userDoc = await ExportProfile.findOne({ id: session.id, ...activeFilter }).lean();
      if (!userDoc && mongoose.isValidObjectId(session.id)) {
        userDoc = await ExportProfile.findOne({ _id: new mongoose.Types.ObjectId(session.id), ...activeFilter }).lean();
      }
    }
    if (!userDoc && session.email) {
      userDoc = await ExportProfile.findOne({ email: session.email.toLowerCase(), ...activeFilter }).lean();
    }

    if (!userDoc) {
      return NextResponse.json(
        { error: "Profile not found", message: "Could not locate your exporter profile." },
        { status: 404 }
      );
    }

    const { password: _, ...safeUser } = userDoc;
    safeUser.id = userDoc.id || userDoc._id.toString();

    // Fetch received buyer inquiries and assigned leads for this exporter
    let inquiries: any[] = [];
    try {
      const queryOr: any[] = [
        { sellerEmail: userDoc.email.toLowerCase() },
        { sellerId: userDoc.id },
        { sellerId: userDoc._id.toString() },
        { assignedTo: userDoc.id },
        { assignedTo: userDoc._id.toString() },
      ];
      if (userDoc.companyName) {
        queryOr.push({ assignedCompany: userDoc.companyName });
        queryOr.push({ sellerCompanyName: userDoc.companyName });
      }

      const rawInquiries = await SellerInquiry.find({ $or: queryOr })
        .sort({ receivedAt: -1, createdAt: -1 })
        .limit(100)
        .lean();

      inquiries = rawInquiries.map((inq: any) => {
        const isAssigned =
          (inq.assignedTo && (inq.assignedTo === userDoc.id || inq.assignedTo === userDoc._id?.toString())) ||
          (inq.assignedCompany && userDoc.companyName && inq.assignedCompany.toLowerCase() === userDoc.companyName.toLowerCase());

        return {
          id: inq._id.toString(),
          buyerName: inq.buyerName,
          buyerEmail: inq.buyerEmail,
          buyerPhone: inq.buyerPhone || "",
          buyerCountry: inq.buyerCountry || "",
          inquiryType: inq.inquiryType || "Bulk Order / RFQ",
          quantity: inq.quantity || "",
          engagementMode: inq.engagementMode || "",
          status: inq.status || "To be Called",
          callingDate: inq.callingDate || "",
          callingPerson: inq.callingPerson || "",
          assignedTo: inq.assignedTo || "",
          assignedCompany: inq.assignedCompany || "",
          message: inq.message || "",
          createdAt: inq.createdAt || inq.receivedAt || new Date().toISOString(),
          isAssigned: !!isAssigned,
        };
      });
    } catch (inqErr: any) {
      console.warn("Could not fetch seller inquiries:", inqErr.message);
    }

    return NextResponse.json(
      {
        success: true,
        seller: safeUser,
        inquiries,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Fetch exporter profile error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message || "Failed to load profile." },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getExporterSessionFromRequest(req);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Please log in to edit your exporter profile." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      fullName,
      phone,
      companyName,
      country,
      productCategory,
      website,
      postCode,
      companyProfile,
      targetMarkets,
      yearEstablished,
      exportCapacity,
      certifications,
      logoUrl,
      logoKey,
    } = body;

    // Validate required fields
    const missingFields: string[] = [];
    if (!fullName || typeof fullName !== "string" || !fullName.trim()) missingFields.push("Full Name");
    if (!phone || typeof phone !== "string" || !phone.trim()) missingFields.push("Phone Number");
    if (!companyName || typeof companyName !== "string" || !companyName.trim()) missingFields.push("Business Name");
    if (!country || typeof country !== "string" || !country.trim()) missingFields.push("Country of Origin");
    if (!productCategory || typeof productCategory !== "string" || !productCategory.trim()) missingFields.push("Product Category");
    if (!postCode || typeof postCode !== "string" || !postCode.trim()) missingFields.push("Postal / ZIP Code");
    if (!companyProfile || typeof companyProfile !== "string" || !companyProfile.trim()) missingFields.push("Company Bio / Description");

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: "Validation failed",
          message: `Please complete all required fields: ${missingFields.join(", ")}`,
          missingFields,
        },
        { status: 400 }
      );
    }

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

    if (!userDoc) {
      return NextResponse.json(
        { error: "Account not found", message: "Could not find profile to update." },
        { status: 404 }
      );
    }

    // Check slug: if company name changed, generate or retain slug
    let updatedSlug = userDoc.slug;
    const cleanCompanyName = companyName.trim();
    if (!updatedSlug || cleanCompanyName !== userDoc.companyName) {
      const baseSlug = slugifyCompanyName(cleanCompanyName) || `exporter-${Date.now().toString(36)}`;
      const existing = await ExportProfile.findOne({
        slug: baseSlug,
        _id: { $ne: userDoc._id },
      }).lean();
      if (existing) {
        updatedSlug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
      } else {
        updatedSlug = baseSlug;
      }
    }

    const updatedData = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      companyName: cleanCompanyName,
      slug: updatedSlug,
      country: country.trim(),
      productCategory: productCategory.trim(),
      website: website ? website.trim() : "",
      postCode: postCode.trim(),
      companyProfile: companyProfile.trim(),
      targetMarkets: Array.isArray(targetMarkets) ? targetMarkets : [],
      yearEstablished: yearEstablished ? String(yearEstablished).trim() : "",
      exportCapacity: exportCapacity ? exportCapacity.trim() : "",
      certifications: Array.isArray(certifications) ? certifications : [],
      logoUrl: typeof logoUrl === "string" ? logoUrl.trim() : userDoc.logoUrl || "",
      logoKey: typeof logoKey === "string" ? logoKey.trim() : userDoc.logoKey || "",
      updatedAt: new Date().toISOString(),
    };

    await ExportProfile.updateOne({ _id: userDoc._id }, { $set: updatedData });

    const updatedDoc: any = await ExportProfile.findOne({ _id: userDoc._id }).lean();
    if (!updatedDoc) {
      return NextResponse.json(
        { error: "Error retrieving updated profile", message: "Failed to retrieve updated profile." },
        { status: 500 }
      );
    }
    const { password: _, ...safeUser } = updatedDoc;
    safeUser.id = updatedDoc.id || updatedDoc._id.toString();

    // Create updated token if companyName or slug changed
    const newToken = createExporterToken({
      id: safeUser.id,
      email: safeUser.email,
      slug: safeUser.slug,
      companyName: safeUser.companyName,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Your exporter profile has been updated successfully!",
        slug: safeUser.slug,
        profileUrl: `/${safeUser.slug}`,
        seller: safeUser,
      },
      { status: 200 }
    );

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: newToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (error: any) {
    console.error("Exporter profile update error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message || "Failed to update profile." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getExporterSessionFromRequest(req);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Please log in to delete your exporter profile." },
        { status: 401 }
      );
    }

    await connectToDatabase();
    let userDoc: any = null;

    if (session.id) {
      userDoc = await ExportProfile.findOne({ id: session.id }).lean();
      if (!userDoc && mongoose.isValidObjectId(session.id)) {
        userDoc = await ExportProfile.findOne({ _id: new mongoose.Types.ObjectId(session.id) }).lean();
      }
    }
    if (!userDoc && session.email) {
      userDoc = await ExportProfile.findOne({ email: session.email.toLowerCase() }).lean();
    }

    if (!userDoc) {
      return NextResponse.json(
        { error: "Account not found", message: "Could not find profile to delete." },
        { status: 404 }
      );
    }

    // Delete profile permanently or mark as deleted
    await ExportProfile.deleteOne({ _id: userDoc._id });

    const response = NextResponse.json(
      {
        success: true,
        message: "Your exporter profile has been deleted permanently.",
      },
      { status: 200 }
    );

    // Clear session cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error: any) {
    console.error("Delete exporter profile error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message || "Failed to delete profile." },
      { status: 500 }
    );
  }
}
