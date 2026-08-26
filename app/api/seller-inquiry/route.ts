import { NextResponse } from "next/server";
import {
  sendSellerInquiryAlertToExporter,
  sendBuyerInquiryConfirmation,
  sendAdminSellerInquiryNotification,
} from "@/lib/email";
import { ExportProfile, SellerInquiry, connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let {
      sellerId,
      sellerCompanyName,
      sellerEmail,
      buyerName,
      buyerEmail,
      buyerPhone,
      buyerCountry,
      inquiryType,
      quantity,
      message,
    } = body;

    if (!buyerName || !buyerEmail || !message) {
      return NextResponse.json(
        { error: "Validation failed", message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // If seller email or company name is missing, attempt lookup from ExportProfile
    if ((!sellerEmail || !sellerCompanyName) && sellerId) {
      try {
        const foundSeller = await ExportProfile.findOne({
          $or: [{ id: sellerId }, { slug: sellerId }],
        }).lean();
        if (foundSeller) {
          if (!sellerEmail) sellerEmail = (foundSeller as any).email;
          if (!sellerCompanyName) sellerCompanyName = (foundSeller as any).companyName;
        }
      } catch (err: any) {
        console.warn("Seller lookup fallback notice in seller-inquiry:", err.message);
      }
    }

    const cleanSellerEmail = (sellerEmail || "").trim().toLowerCase();
    const cleanBuyerEmail = buyerEmail.trim().toLowerCase();

    const inquiryData = {
      sellerId: sellerId || "UNKNOWN",
      sellerCompanyName: sellerCompanyName || "Goexports Exporter",
      sellerEmail: cleanSellerEmail,
      buyerName: buyerName.trim(),
      buyerEmail: cleanBuyerEmail,
      buyerPhone: buyerPhone ? buyerPhone.trim() : "",
      buyerCountry: buyerCountry ? buyerCountry.trim() : "",
      inquiryType: inquiryType || "Bulk Order / RFQ",
      quantity: quantity ? quantity.trim() : "Not specified",
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    console.log("=== [NEW SELLER RFQ / BUYER INQUIRY] ===", {
      seller: inquiryData.sellerCompanyName,
      sellerEmail: inquiryData.sellerEmail,
      buyer: inquiryData.buyerName,
      buyerEmail: inquiryData.buyerEmail,
    });

    // 1. Persist inquiry in MongoDB via Mongoose
    try {
      await SellerInquiry.create({
        ...inquiryData,
        receivedAt: new Date(),
        ipAddress: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
      });
    } catch (dbErr: any) {
      console.warn("MongoDB inquiry save notice (non-blocking):", dbErr.message);
    }

    // 2. Trigger Emails to BOTH Admin and Seller (+ Buyer confirmation):
    try {
      const emailResults = await Promise.allSettled([
        sendSellerInquiryAlertToExporter(inquiryData),
        sendAdminSellerInquiryNotification(inquiryData),
        sendBuyerInquiryConfirmation(inquiryData),
      ]);
      console.log("=== [RFQ EMAILS DISPATCHED TO ADMIN & SELLER] ===", {
        toSeller: inquiryData.sellerEmail,
        toAdmin: process.env.ADMIN_EMAIL || process.env.ADMIN_NOTIFY_EMAIL || "info@goexports.co.uk",
        toBuyer: inquiryData.buyerEmail,
        statuses: emailResults.map((r) => r.status),
      });
    } catch (emailErr: any) {
      console.warn("RFQ email dispatch notice:", emailErr.message);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been sent to the exporter successfully!",
        data: inquiryData,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Seller inquiry API error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message || "Failed to submit inquiry." },
      { status: 500 }
    );
  }
}
