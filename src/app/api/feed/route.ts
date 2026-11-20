import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseInterests, SafeProfile } from "@/types/api";

export async function GET() {
  try {
    // Retrieve profiles that the current user has not yet swiped on
    const profiles = await prisma.profile.findMany({
      where: {
        swipe: null,
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        name: true,
        age: true,
        photoUrl: true,
        bio: true,
        city: true,
        college: true,
        interests: true,
        createdAt: true,
        // Explicitly omit likedCurrentUser to avoid leaking incoming likes to client
      },
    });

    const feed: SafeProfile[] = profiles.map((p) => ({
      id: p.id,
      name: p.name,
      age: p.age,
      photoUrl: p.photoUrl,
      bio: p.bio,
      city: p.city,
      college: p.college,
      interests: parseInterests(p.interests),
      createdAt: p.createdAt,
    }));

    return NextResponse.json(feed, { status: 200 });
  } catch (error) {
    console.error("Error fetching feed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
