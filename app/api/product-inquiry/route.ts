import { NextResponse } from "next/server";
import { connectToDatabase, ExportProfile, ProductInquiry, SellerInquiry } from "@/lib/mongodb";
import {
  sendSellerInquiryAlertToExporter,
  sendAdminSellerInquiryNotification,
  sendBuyerInquiryConfirmation,
} from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let {
      productId,
      productTitle,
      sellerId,
      sellerCompanyName,
      sellerEmail,
      fullName,
      phone,
      country,
      quantity,
      unit,
      email,
      message,
    } = body;

    if (!fullName || !fullName.trim()) {
      return NextResponse.json(
        { error: "Validation Error", message: "Full Name is required." },
        { status: 400 }
      );
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json(
        { error: "Validation Error", message: "Phone / WhatsApp Number is required." },
        { status: 400 }
      );
    }

    if (!quantity || !quantity.trim()) {
      return NextResponse.json(
        { error: "Validation Error", message: "Quantity is required." },
        { status: 400 }
      );
    }

    if (!unit || !unit.trim()) {
      return NextResponse.json(
        { error: "Validation Error", message: "Search unit is required." },
        { status: 400 }
      );
    }

    if (!productTitle || !productTitle.trim()) {
      return NextResponse.json(
        { error: "Validation Error", message: "Product Title is required." },
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
        console.warn("Seller lookup fallback notice in product-inquiry:", err.message);
      }
    }

    const cleanSellerEmail = (sellerEmail || "").trim().toLowerCase();
    const cleanBuyerEmail = (email || "").trim().toLowerCase();
    const formattedQuantity = `${quantity.trim()} ${unit.trim()}`;
    const formattedMessage = message && message.trim()
      ? message.trim()
      : `Inquiry for product "${productTitle.trim()}" (${formattedQuantity})`;

    // 1. Create ProductInquiry document in dedicated collection
    const newProductInquiry = await ProductInquiry.create({
      productId: productId || "",
      productTitle: productTitle.trim(),
      sellerId: sellerId || "",
      sellerCompanyName: sellerCompanyName || "",
      sellerEmail: cleanSellerEmail,
      fullName: fullName.trim(),
      phone: phone.trim(),
      country: country ? country.trim() : "",
      quantity: quantity.trim(),
      unit: unit.trim(),
      email: cleanBuyerEmail, // Optional
      message: formattedMessage,
      receivedAt: new Date(),
    });

    // 2. Also log in seller_inquiries so exporter dashboard displays it smoothly
    await SellerInquiry.create({
      sellerId: sellerId || "",
      sellerCompanyName: sellerCompanyName || "",
      sellerEmail: cleanSellerEmail,
      buyerName: fullName.trim(),
      buyerEmail: cleanBuyerEmail || `${phone.trim().replace(/[^0-9]/g, "")}@inquiry.goexports`,
      buyerPhone: phone.trim(),
      buyerCountry: country ? country.trim() : "",
      inquiryType: `Product RFQ: ${productTitle.trim()}`,
      quantity: formattedQuantity,
      message: formattedMessage,
      receivedAt: new Date(),
    });

    // 3. Dispatch emails to both Seller and Admin (+ Buyer confirmation if email provided)
    const rfqEmailData = {
      sellerId: sellerId || "",
      sellerCompanyName: sellerCompanyName || "Goexports Exporter",
      sellerEmail: cleanSellerEmail,
      buyerName: fullName.trim(),
      buyerEmail: cleanBuyerEmail,
      buyerPhone: phone.trim(),
      buyerCountry: country ? country.trim() : "",
      inquiryType: `Product RFQ: ${productTitle.trim()}`,
      quantity: formattedQuantity,
      message: formattedMessage,
      createdAt: new Date().toISOString(),
    };

    try {
      const emailResults = await Promise.allSettled([
        sendSellerInquiryAlertToExporter(rfqEmailData),
        sendAdminSellerInquiryNotification(rfqEmailData),
        sendBuyerInquiryConfirmation(rfqEmailData),
      ]);
      console.log("=== [PRODUCT RFQ EMAILS DISPATCHED TO ADMIN & SELLER] ===", {
        toSeller: cleanSellerEmail,
        toAdmin: process.env.ADMIN_EMAIL || process.env.ADMIN_NOTIFY_EMAIL || "info@goexports.co.uk",
        toBuyer: cleanBuyerEmail || "N/A (no email provided)",
        statuses: emailResults.map((r) => r.status),
      });
    } catch (emailErr: any) {
      console.warn("Product RFQ email dispatch notice:", emailErr.message);
    }

    return NextResponse.json({
      success: true,
      inquiryId: newProductInquiry._id.toString(),
      message: "Product inquiry submitted successfully!",
    });
  } catch (error: any) {
    console.error("Product inquiry error:", error);
    return NextResponse.json(
      {
        error: "Server Error",
        message: error.message || "Failed to submit product inquiry. Please try again.",
      },
      { status: 500 }
    );
  }
}
