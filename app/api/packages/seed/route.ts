import { NextResponse } from "next/server";
import { seedPackages } from "@/lib/packages";

export async function GET() {
  try {
    const result = await seedPackages();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to seed packages", message: error.message },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET();
}
