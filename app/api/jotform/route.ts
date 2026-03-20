import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { fullName, phone, email, company, productCategory } =
      await req.json();
console.log( fullName, phone, email, company, productCategory)
    const formId = '260778155209059'; // Updated form ID from the provided HTML

    if (!formId) {
      return NextResponse.json(
        { error: "Missing JotForm configuration" },
        { status: 500 }
      );
    }

    const params = new URLSearchParams();

    // Map fields to the new JotForm field names from HTML
    params.append("q3_fullName", fullName);
    params.append("q5_typeA5", phone);
    params.append("q4_typeA4", email);
    params.append("q6_typeA6", company);
    params.append("q7_productCategory", productCategory);

    // REQUIRED FIELD – MUST BE SENT
    params.append("formID", formId);

    const jotformResponse = await fetch(
      `https://submit.jotform.com/submit/${formId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Referer": process.env.APP_URL || "https://lead-force.io",
        },
        body: params.toString(),
      }
    );

    // Web submit returns HTML only → just check status
    if (jotformResponse.ok) {
      return NextResponse.json({ success: true });
    } else {
      console.error("JotForm submission error:", jotformResponse.status, jotformResponse.statusText);
      return NextResponse.json(
        { error: "Failed to submit form", details: "JotForm server error" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("JotForm submission error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
