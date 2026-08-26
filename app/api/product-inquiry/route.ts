import { NextResponse } from "next/server";
import { connectToDatabase, ProductInquiry, SellerInquiry } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
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

    // 1. Create ProductInquiry document in dedicated collection
    const newProductInquiry = await ProductInquiry.create({
      productId: productId || "",
      productTitle: productTitle.trim(),
      sellerId: sellerId || "",
      sellerCompanyName: sellerCompanyName || "",
      sellerEmail: (sellerEmail || "").toLowerCase(),
      fullName: fullName.trim(),
      phone: phone.trim(),
      country: country ? country.trim() : "",
      quantity: quantity.trim(),
      unit: unit.trim(),
      email: (email || "").trim().toLowerCase(), // Optional
      message: message ? message.trim() : `Inquiry for product "${productTitle.trim()}" (${quantity.trim()} ${unit.trim()})`,
      receivedAt: new Date(),
    });

    // 2. Also log in seller_inquiries so exporter dashboard displays it smoothly
    await SellerInquiry.create({
      sellerId: sellerId || "",
      sellerCompanyName: sellerCompanyName || "",
      sellerEmail: (sellerEmail || "").toLowerCase(),
      buyerName: fullName.trim(),
      buyerEmail: (email || "").trim().toLowerCase() || `${phone.trim().replace(/[^0-9]/g, "")}@inquiry.goexports`,
      buyerPhone: phone.trim(),
      buyerCountry: country ? country.trim() : "",
      inquiryType: `Product RFQ: ${productTitle.trim()}`,
      quantity: `${quantity.trim()} ${unit.trim()}`,
      message: message ? message.trim() : `Product Inquiry for ${productTitle.trim()}`,
      receivedAt: new Date(),
    });

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
