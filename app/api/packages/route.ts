import { NextResponse } from "next/server";
import { getAllPackages, seedPackages } from "@/lib/packages";

export async function GET() {
  try {
    const packages = await getAllPackages();
    return NextResponse.json({ success: true, count: packages.length, packages });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch packages", message: error.message },
      { status: 500 }
    );
  }
}

export async function POST() {
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
