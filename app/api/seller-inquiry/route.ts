import { NextResponse } from "next/server";
import {
  sendSellerInquiryAlertToExporter,
  sendBuyerInquiryConfirmation,
  sendAdminSellerInquiryNotification,
} from "@/lib/email";
import { getDb } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
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

    const inquiryData = {
      sellerId: sellerId || "UNKNOWN",
      sellerCompanyName: sellerCompanyName || "Goexports Exporter",
      sellerEmail: sellerEmail || "",
      buyerName: buyerName.trim(),
      buyerEmail: buyerEmail.trim().toLowerCase(),
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

    // 1. Optionally persist inquiry in MongoDB
    try {
      const db = await getDb();
      await db.collection("seller_inquiries").insertOne({
        ...inquiryData,
        receivedAt: new Date(),
        ipAddress: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
      });
    } catch (dbErr: any) {
      console.warn("MongoDB inquiry save notice (non-blocking):", dbErr.message);
    }

    // 2. Trigger Emails via Brevo API:
    // a) To Exporter (RFQ lead)
    // b) To Buyer (Confirmation copy)
    // c) To Admin (Ops desk notification)
    try {
      await Promise.allSettled([
        sendSellerInquiryAlertToExporter(inquiryData),
        sendBuyerInquiryConfirmation(inquiryData),
        sendAdminSellerInquiryNotification(inquiryData),
      ]);
      console.log("=== [RFQ EMAILS DISPATCHED] ===", {
        toExporter: inquiryData.sellerEmail,
        toBuyer: inquiryData.buyerEmail,
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
