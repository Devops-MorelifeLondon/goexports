import { NextResponse } from "next/server";
import { connectToDatabase, SellWithUsInquiry } from "@/lib/mongodb";
import {
  sendSellWithUsApplicantConfirmation,
  sendAdminSellWithUsNotification,
  SellWithUsEmailData,
} from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      companyName,
      contactName,
      email,
      phone,
      country,
      businessType,
      productCategory,
      productsDescription,
      monthlyCapacity,
      targetAudience,
      certifications,
      website,
    } = body;

    // Validate essentials
    const missing: string[] = [];
    if (!companyName?.trim()) missing.push("Company Name");
    if (!contactName?.trim()) missing.push("Contact Person Name");
    if (!email?.trim()) missing.push("Email Address");
    if (!phone?.trim()) missing.push("Phone Number");
    if (!productCategory?.trim()) missing.push("Product Category");
    if (!productsDescription?.trim()) missing.push("Products Description");

    if (missing.length > 0) {
      return NextResponse.json(
        {
          error: "Validation failed",
          message: `Please complete required fields: ${missing.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Save to Mongo
    await connectToDatabase();
    const inquiry = await SellWithUsInquiry.create({
      companyName: companyName.trim(),
      contactName: contactName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      country: country?.trim() || "India",
      businessType: businessType || "Manufacturer",
      productCategory: productCategory.trim(),
      productsDescription: productsDescription.trim(),
      monthlyCapacity: monthlyCapacity?.trim() || "",
      targetAudience: targetAudience || "Both",
      certifications: Array.isArray(certifications) ? certifications : [],
      website: website?.trim() || "",
      status: "pending",
      ipAddress: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
      userAgent: req.headers.get("user-agent") || "unknown",
      receivedAt: new Date(),
    });

    // Send applicant confirmation email & admin notification email (non-blocking)
    const emailData: SellWithUsEmailData = {
      companyName: companyName.trim(),
      contactName: contactName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      country: country?.trim() || "India",
      businessType: businessType || "Manufacturer",
      productCategory: productCategory.trim(),
      productsDescription: productsDescription.trim(),
      monthlyCapacity: monthlyCapacity?.trim() || "",
      targetAudience: targetAudience || "Both",
      website: website?.trim() || "",
      certifications: Array.isArray(certifications) ? certifications : [],
    };

    try {
      await Promise.allSettled([
        sendSellWithUsApplicantConfirmation(emailData),
        sendAdminSellWithUsNotification(emailData),
      ]);
      console.log("=== [SELL WITH US EMAILS DISPATCHED] ===", {
        toApplicant: emailData.email,
        company: emailData.companyName,
      });
    } catch (e: any) {
      console.warn("Could not dispatch emails for Sell With Us:", e.message);
    }

    return NextResponse.json({
      success: true,
      message: "Your application has been received! Our merchant onboarding team will get in touch shortly.",
      inquiryId: inquiry._id.toString(),
    });
  } catch (error: any) {
    console.error("Sell With Us error:", error);
    return NextResponse.json(
      { error: "Server error", message: error.message || "Failed to submit application." },
      { status: 500 }
    );
  }
}
