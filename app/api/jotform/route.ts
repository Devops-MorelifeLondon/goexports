import { NextResponse } from "next/server";
import { connectToDatabase, GetInTouchInquiry } from "@/lib/mongodb";
import {
  sendConsultationLeadConfirmationEmail,
  sendAdminConsultationAlertEmail,
} from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, phone, email, company, country, productCategory, inquiryDate } = body;

    // Use provided inquiryDate or default to current ISO date string (YYYY-MM-DD)
    const effectiveInquiryDate = inquiryDate || new Date().toISOString().split("T")[0];

    const ipAddress =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    console.log("=== [NEW GET IN TOUCH / CONSULTATION SUBMISSION] ===", {
      fullName,
      phone,
      email,
      company,
      country,
      productCategory,
      inquiryDate: effectiveInquiryDate,
    });

    // 1. Connect to Database and Persist in MongoDB
    let savedInquiry: any = null;
    try {
      await connectToDatabase();
      savedInquiry = await GetInTouchInquiry.create({
        fullName: fullName ? fullName.trim() : "Valued Exporter",
        phone: phone ? phone.trim() : "",
        email: email ? email.trim().toLowerCase() : "",
        company: company ? company.trim() : "",
        country: country ? country.trim() : "",
        productCategory: productCategory ? productCategory.trim() : "",
        inquiryDate: effectiveInquiryDate,
        status: "pending",
        source: "Get In Touch",
        syncedToJotform: false,
        ipAddress,
        userAgent,
        receivedAt: new Date(),
        createdAt: new Date().toISOString(),
      });
      console.log("=== [GET IN TOUCH SAVED TO MONGODB] ===", { id: savedInquiry._id });
    } catch (dbError: any) {
      console.error("MongoDB GetInTouch save error (non-blocking):", dbError.message);
    }

    const formId = "260778155209059";

    // 2. Submit to JotForm
    let jotformSynced = false;
    const params = new URLSearchParams();
    params.append("q3_fullName", fullName || "");
    params.append("q5_typeA5", phone || "");
    params.append("q4_typeA4", email || "");
    params.append("q6_typeA6", company || "");
    if (country) {
      params.append("q8_country", country);
    }
    params.append("q7_productCategory", productCategory || "");
    params.append("q9_inquiryDate", effectiveInquiryDate);
    params.append("formID", formId);

    try {
      const jotformResponse = await fetch(
        `https://submit.jotform.com/submit/${formId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Referer: process.env.APP_URL || "https://www.goexports.co.uk",
          },
          body: params.toString(),
        }
      );

      if (jotformResponse.ok) {
        jotformSynced = true;
      } else {
        console.warn("JotForm submission status:", jotformResponse.status, jotformResponse.statusText);
      }
    } catch (jotError: any) {
      console.warn("JotForm error (non-blocking):", jotError.message);
    }

    // Update syncedToJotform flag in database if successfully synced
    if (savedInquiry && jotformSynced) {
      try {
        await GetInTouchInquiry.findByIdAndUpdate(savedInquiry._id, {
          syncedToJotform: true,
          updatedAt: new Date().toISOString(),
        });
      } catch (updateErr: any) {
        console.warn("JotForm sync flag update warning:", updateErr.message);
      }
    }

    // 3. Trigger automated confirmation and admin alert emails
    const leadData = {
      fullName: fullName || "Valued Exporter",
      phone: phone || "",
      email: email || "",
      company: company || "",
      country: country || "",
      productCategory: productCategory || "General Trade",
      inquiryDate: effectiveInquiryDate,
    };

    try {
      await Promise.allSettled([
        sendConsultationLeadConfirmationEmail(leadData),
        sendAdminConsultationAlertEmail(leadData),
      ]);
      console.log("=== [CONSULTATION EMAILS DISPATCHED] ===", { to: email });
    } catch (emailError: any) {
      console.warn("Consultation email dispatch notice:", emailError.message);
    }

    return NextResponse.json({
      success: true,
      inquiryId: savedInquiry ? savedInquiry._id.toString() : undefined,
      message: "Consultation request received successfully.",
    });
  } catch (error: any) {
    console.error("Consultation submission error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const inquiries = await GetInTouchInquiry.find({}).sort({ receivedAt: -1 }).limit(100).lean();
    return NextResponse.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error: any) {
    console.error("Error fetching GetInTouch inquiries:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
