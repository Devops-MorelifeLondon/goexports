import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getExportProfilesCollection } from "@/lib/mongodb";
import { getExporterSessionFromRequest } from "@/lib/exporter-auth";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const session = await getExporterSessionFromRequest(req);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Please log in to change your password." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Validation error", message: "Please provide both current and new passwords." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Validation error", message: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const collection = await getExportProfilesCollection();
    let userDoc: any = null;

    if (session.id) {
      userDoc = await collection.findOne({ id: session.id });
      if (!userDoc && ObjectId.isValid(session.id)) {
        userDoc = await collection.findOne({ _id: new ObjectId(session.id) });
      }
    }
    if (!userDoc && session.email) {
      userDoc = await collection.findOne({ email: session.email.toLowerCase() });
    }

    if (!userDoc) {
      return NextResponse.json(
        { error: "Account not found", message: "Exporter account not found." },
        { status: 404 }
      );
    }

    // Verify current password
    let isCurrentValid = false;
    if (userDoc.password) {
      if (userDoc.password.startsWith("$2a$") || userDoc.password.startsWith("$2b$") || userDoc.password.startsWith("$2y$")) {
        isCurrentValid = await bcrypt.compare(currentPassword, userDoc.password);
      } else {
        isCurrentValid = userDoc.password === currentPassword;
      }
    }

    if (!isCurrentValid) {
      return NextResponse.json(
        { error: "Invalid current password", message: "The current password you entered is incorrect." },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await collection.updateOne(
      { _id: userDoc._id },
      {
        $set: {
          password: hashedNewPassword,
          passwordUpdatedAt: new Date().toISOString(),
        },
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Your account password has been changed successfully.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message || "Failed to change password." },
      { status: 500 }
    );
  }
}
