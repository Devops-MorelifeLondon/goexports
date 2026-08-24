import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getExportProfilesCollection } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Validation failed", message: "Please provide both email and password." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Check MongoDB
    const collection = await getExportProfilesCollection();
    const userDoc = await collection.findOne({
      email: cleanEmail,
    });

    if (!userDoc) {
      return NextResponse.json(
        {
          error: "Account not found",
          message: "No registered exporter account found with this email address. Please register your profile first.",
        },
        { status: 404 }
      );
    }

    let isPasswordValid = false;

    if (userDoc.password) {
      if (userDoc.password.startsWith("$2a$") || userDoc.password.startsWith("$2b$") || userDoc.password.startsWith("$2y$")) {
        // Bcrypt hashed password comparison
        isPasswordValid = await bcrypt.compare(cleanPassword, userDoc.password);
      } else {
        // Plain text fallback (for previous test accounts)
        isPasswordValid = userDoc.password === cleanPassword;
      }
    }

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials", message: "Incorrect password. Please try again." },
        { status: 401 }
      );
    }

    const slug = userDoc.slug || userDoc.id || "exporter";
    const { password: _, ...safeUser } = userDoc;

    return NextResponse.json(
      {
        success: true,
        message: "Login successful! Redirecting to your exporter profile...",
        slug,
        profileUrl: `/${slug}`,
        seller: safeUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Exporter login error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message || "Failed to process login." },
      { status: 500 }
    );
  }
}
