import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { fullName, contactNumber, email, country, message, pageURL } =
      await req.json();
console.log( fullName, contactNumber, email, country, message, pageURL)
    const formId = '252822609352053'; // Using the formId from your provided snippet

    if (!formId) {
      return NextResponse.json(
        { error: "Missing JotForm configuration" },
        { status: 500 }
      );
    }

    const params = new URLSearchParams();

    // Map fields to your REAL JotForm field names
    params.append("q8_fullName", fullName);
    params.append("q9_contactNumber", contactNumber);
    params.append("q5_email", email);
    params.append("q10_country", country);
    params.append("q6_message", message);
    params.append("q13_websiteURL", encodeURIComponent(pageURL || "")); // Encode URI component for URL

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
