import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ExportProfile, connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, email, password } = body;

    if (!token || !email || !password) {
      return NextResponse.json(
        { error: "Validation failed", message: "Missing required parameters (token, email, or password)." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (cleanPassword.length < 6) {
      return NextResponse.json(
        { error: "Weak password", message: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const userDoc: any = await ExportProfile.findOne({
      email: cleanEmail,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
      isDeleted: { $ne: true },
    });

    if (!userDoc) {
      return NextResponse.json(
        {
          error: "Invalid or expired link",
          message: "This password reset link is invalid or has expired. Please request a new password reset link.",
        },
        { status: 400 }
      );
    }

    // Hash new password using bcrypt
    const hashedPassword = await bcrypt.hash(cleanPassword, 10);

    userDoc.password = hashedPassword;
    userDoc.resetPasswordToken = null;
    userDoc.resetPasswordExpires = null;
    userDoc.updatedAt = new Date().toISOString();
    await userDoc.save();

    return NextResponse.json(
      {
        success: true,
        message: "Your password has been successfully reset! Redirecting to login...",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Reset password API error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message || "Failed to reset password." },
      { status: 500 }
    );
  }
}
