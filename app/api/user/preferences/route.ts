import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const user = await isAuthenticated();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    let preferences = await prisma.userPreferences.findUnique({
      where: { clerkUserId: user.id },
    });

    // Create default preferences if not found
    if (!preferences) {
      preferences = await prisma.userPreferences.create({
        data: {
          clerkUserId: user.id,
          skipRepeats: true, // Default to true
        },
      });
    }

    return NextResponse.json(preferences);
  } catch (error) {
    console.error("Error fetching preferences:", error);
    return NextResponse.json(
      { error: "Failed to fetch preferences" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const user = await isAuthenticated();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { skipRepeats } = body;

    if (typeof skipRepeats !== "boolean") {
      return NextResponse.json(
        { error: "skipRepeats must be a boolean" },
        { status: 400 },
      );
    }

    const preferences = await prisma.userPreferences.upsert({
      where: { clerkUserId: user.id },
      update: { skipRepeats },
      create: {
        clerkUserId: user.id,
        skipRepeats,
      },
    });

    return NextResponse.json(preferences);
  } catch (error) {
    console.error("Error updating preferences:", error);
    return NextResponse.json(
      { error: "Failed to update preferences" },
      { status: 500 },
    );
  }
}
