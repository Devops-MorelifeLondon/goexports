import { NextResponse } from "next/server";
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

    console.log("=== [NEW CONSULTATION / JOTFORM SUBMISSION] ===", {
      fullName,
      phone,
      email,
      company,
      country,
      productCategory,
      inquiryDate: effectiveInquiryDate,
    });

    const formId = "260778155209059";

    // 1. Submit to JotForm
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

      if (!jotformResponse.ok) {
        console.warn("JotForm submission status:", jotformResponse.status, jotformResponse.statusText);
      }
    } catch (jotError: any) {
      console.warn("JotForm error (non-blocking):", jotError.message);
    }

    // 2. Trigger automated confirmation and admin alert emails
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

    return NextResponse.json({ success: true, message: "Consultation request received successfully." });
  } catch (error: any) {
    console.error("Consultation submission error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
