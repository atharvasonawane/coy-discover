import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MatchRecord, parseInterests } from "@/types/api";

export async function GET() {
  try {
    const matches = await prisma.match.findMany({
      orderBy: {
        matchedAt: "desc",
      },
      include: {
        profile: {
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
            // Explicitly exclude likedCurrentUser
          },
        },
      },
    });

    const sanitizedMatches: MatchRecord[] = matches.map((m) => ({
      id: m.id,
      profileId: m.profileId,
      matchedAt: m.matchedAt,
      profile: {
        id: m.profile.id,
        name: m.profile.name,
        age: m.profile.age,
        photoUrl: m.profile.photoUrl,
        bio: m.profile.bio,
        city: m.profile.city,
        college: m.profile.college,
        interests: parseInterests(m.profile.interests),
        createdAt: m.profile.createdAt,
      },
    }));

    return NextResponse.json(sanitizedMatches, { status: 200 });
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
