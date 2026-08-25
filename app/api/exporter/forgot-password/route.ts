import { NextResponse } from "next/server";
import crypto from "crypto";
import { ExportProfile, connectToDatabase } from "@/lib/mongodb";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Validation failed", message: "Please enter a valid work email address." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    await connectToDatabase();
    const userDoc: any = await ExportProfile.findOne({
      email: cleanEmail,
      isDeleted: { $ne: true },
      status: { $nin: ["deleted", "removed", "inactive", "archived", "disabled"] },
    });

    if (userDoc) {
      const resetToken = crypto.randomBytes(32).toString("hex");
      const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      userDoc.resetPasswordToken = resetToken;
      userDoc.resetPasswordExpires = expires;
      userDoc.updatedAt = new Date().toISOString();
      await userDoc.save();

      // Determine Base URL
      let baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.APP_URL;
      if (!baseUrl) {
        const host = req.headers.get("host") || "localhost:3000";
        const protocol = host.includes("localhost") ? "http" : "https";
        baseUrl = `${protocol}://${host}`;
      }

      const resetUrl = `${baseUrl}/exporter/reset-password?token=${resetToken}&email=${encodeURIComponent(cleanEmail)}`;

      await sendPasswordResetEmail({
        email: cleanEmail,
        fullName: userDoc.fullName || userDoc.companyName || "Exporter",
        companyName: userDoc.companyName || "Your Company",
        resetUrl,
        expiresInMinutes: 60,
      });
    }

    // Always return a success response to prevent email enumeration attacks
    return NextResponse.json(
      {
        success: true,
        message: "If an exporter account is registered with this email address, password reset instructions have been sent. Please check your inbox and spam folder.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Forgot password API error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message || "Failed to process request." },
      { status: 500 }
    );
  }
}
