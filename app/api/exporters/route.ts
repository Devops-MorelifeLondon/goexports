import { NextResponse } from "next/server";
import { getAllApprovedExporters } from "@/lib/seller";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    const exporters = await getAllApprovedExporters();
    return NextResponse.json({
      success: true,
      count: exporters.length,
      exporters,
    });
  } catch (error) {
    console.error("API error fetching exporters:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch exporters" },
      { status: 500 }
    );
  }
}

