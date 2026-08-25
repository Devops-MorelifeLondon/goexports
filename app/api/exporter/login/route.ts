import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ExportProfile, connectToDatabase } from "@/lib/mongodb";
import { createExporterToken, SESSION_COOKIE_NAME } from "@/lib/exporter-auth";

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

    // Check MongoDB via Mongoose
    await connectToDatabase();
    const userDoc: any = await ExportProfile.findOne({
      email: cleanEmail,
      isDeleted: { $ne: true },
      status: { $nin: ["deleted", "removed", "inactive", "archived", "disabled"] },
    }).lean();

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
    const profileId = userDoc.id || userDoc._id.toString();
    const companyName = userDoc.companyName || "Exporter";

    // Generate signed session token
    const token = createExporterToken({
      id: profileId,
      email: userDoc.email,
      slug,
      companyName,
    });

    const { password: _, ...safeUser } = userDoc;
    safeUser.id = profileId;

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful! Redirecting to your exporter portal...",
        token,
        slug,
        profileUrl: `/${slug}`,
        dashboardUrl: "/exporter/profile",
        seller: safeUser,
      },
      { status: 200 }
    );

    // Set cookie on response for 30 days
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error: any) {
    console.error("Exporter login error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message || "Failed to process login." },
      { status: 500 }
    );
  }
}
