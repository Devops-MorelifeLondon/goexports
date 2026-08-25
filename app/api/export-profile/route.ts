import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getExportProfilesCollection } from "@/lib/mongodb";
import { slugifyCompanyName } from "@/lib/seller";
import { sendExporterWelcomeEmail, sendAdminNewExporterNotification } from "@/lib/email";
import { createExporterToken, SESSION_COOKIE_NAME } from "@/lib/exporter-auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      phone,
      email,
      password,
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
      selectedPackage,
    } = body;

    // Server-side validation for required fields
    const missingFields: string[] = [];
    if (!fullName || typeof fullName !== "string" || !fullName.trim()) missingFields.push("Full Name");
    if (!phone || typeof phone !== "string" || !phone.trim()) missingFields.push("Phone Number");
    if (!email || typeof email !== "string" || !email.trim()) missingFields.push("Email Address");
    if (!password || typeof password !== "string" || password.trim().length < 6) missingFields.push("Account Password (min 6 chars)");
    if (!companyName || typeof companyName !== "string" || !companyName.trim()) missingFields.push("Business Name");
    if (!country || typeof country !== "string" || !country.trim()) missingFields.push("Country of Origin");
    if (!productCategory || typeof productCategory !== "string" || !productCategory.trim()) missingFields.push("Primary Product Category");
    if (!postCode || typeof postCode !== "string" || !postCode.trim()) missingFields.push("ZIP Code");
    if (!companyProfile || typeof companyProfile !== "string" || !companyProfile.trim()) missingFields.push("Company Profile");

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: "Validation failed",
          message: `Please fill in all required fields: ${missingFields.join(", ")}`,
          missingFields,
        },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          error: "Invalid email",
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    // Generate unique slug
    let baseSlug = slugifyCompanyName(companyName);
    if (!baseSlug) {
      baseSlug = `exporter-${Date.now().toString(36)}`;
    }

    let finalSlug = baseSlug;

    // Check if slug exists in DB and disambiguate if needed
    try {
      const collection = await getExportProfilesCollection();
      const existing = await collection.findOne({ slug: baseSlug });
      if (existing) {
        finalSlug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
      }
    } catch {
      // Non-blocking
    }

    const submissionData = {
      id: `EXP-${Date.now().toString(36).toUpperCase()}`,
      slug: finalSlug,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      companyName: companyName.trim(),
      country: country.trim(),
      productCategory: productCategory.trim(),
      website: website ? website.trim() : "",
      postCode: postCode.trim(),
      companyProfile: companyProfile.trim(),
      targetMarkets: Array.isArray(targetMarkets) ? targetMarkets : targetMarkets ? [targetMarkets] : [],
      yearEstablished: yearEstablished ? String(yearEstablished).trim() : "",
      exportCapacity: exportCapacity ? exportCapacity.trim() : "",
      certifications: Array.isArray(certifications) ? certifications : certifications ? [certifications] : [],
      selectedPackage: selectedPackage ? String(selectedPackage).trim() : "Verified Growth Pro",
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    console.log("=== [NEW EXPORT PROFILE SUBMITTED] ===", {
      id: submissionData.id,
      slug: submissionData.slug,
      companyName: submissionData.companyName,
      email: submissionData.email,
    });

    // ── 1. Store in MongoDB Database ──
    let dbSaved = false;
    let mongoId: string | null = null;
    try {
      const collection = await getExportProfilesCollection();
      const insertResult = await collection.insertOne({
        ...submissionData,
        syncedToJotform: false,
        ipAddress: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
        userAgent: req.headers.get("user-agent") || "unknown",
        receivedAt: new Date(),
      });
      mongoId = insertResult.insertedId.toString();
      dbSaved = true;
      console.log("=== [SAVED TO MONGODB] ===", { profileId: submissionData.id, slug: finalSlug, mongoId });
    } catch (mongoError: any) {
      console.warn("MongoDB storage notice:", mongoError.message);
    }

    // ── 2. Send Automated Confirmation & Admin Notification Emails (Brevo API) ──
    try {
      await Promise.allSettled([
        sendExporterWelcomeEmail(submissionData),
        sendAdminNewExporterNotification(submissionData),
      ]);
      console.log("=== [EMAILS DISPATCHED] ===", { toExporter: submissionData.email });
    } catch (emailErr: any) {
      console.warn("Email dispatch notice (non-blocking):", emailErr.message);
    }

    // ── 3. Submit to JotForm (Form ID: 262334223121038) ──
    const formId = process.env.JOTFORM_EXPORT_PROFILE_ID || "262334223121038";

    const params = new URLSearchParams();
    params.append("q3_fullName", submissionData.fullName);
    params.append("q4_typeA4", submissionData.phone);
    params.append("q5_typeA5", submissionData.email);
    params.append("q6_typeA6", submissionData.companyName);
    params.append("q7_typeA7", submissionData.country);
    params.append("q8_typeA8", submissionData.postCode);
    params.append("q9_typeA9", submissionData.website || "");
    params.append("q10_typeA10", submissionData.yearEstablished || "");
    params.append("q11_typeA11", submissionData.productCategory);
    params.append("q12_typeA12", submissionData.exportCapacity || "");
    params.append("q13_typeA13", Array.isArray(submissionData.targetMarkets) ? submissionData.targetMarkets.join(", ") : submissionData.targetMarkets || "");
    params.append("q14_typeA14", submissionData.companyProfile);
    params.append("q15_typeA15", Array.isArray(submissionData.certifications) ? submissionData.certifications.join(", ") : submissionData.certifications || "");
    params.append("q16_plan", submissionData.selectedPackage || "");
    params.append("formID", formId);
    params.append("simple_spc", `${formId}-${formId}`);

    try {
      const jotformResponse = await fetch(
        `https://submit.jotform.com/submit/${formId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Referer: process.env.APP_URL || "https://goexports.co.uk",
          },
          body: params.toString(),
        }
      );

      if (!jotformResponse.ok) {
        console.warn("JotForm responded with status:", jotformResponse.status, jotformResponse.statusText);
      }
    } catch (err: any) {
      console.error("JotForm dispatch error (non-blocking):", err.message);
    }

    // Strip password from response for security
    const { password: _, ...safeData } = submissionData;

    // Generate signed session token for automatic login
    const token = createExporterToken({
      id: submissionData.id,
      email: submissionData.email,
      slug: submissionData.slug,
      companyName: submissionData.companyName,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Your export profile has been created successfully! Your public storefront is now live.",
        profileId: submissionData.id,
        slug: submissionData.slug,
        profileUrl: `/${submissionData.slug}`,
        dashboardUrl: "/exporter/profile",
        token,
        dbSaved,
        mongoId,
        data: safeData,
      },
      { status: 200 }
    );

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error: any) {
    console.error("Export profile submission error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error.message || "An unexpected error occurred while saving your export profile.",
      },
      { status: 500 }
    );
  }
}
