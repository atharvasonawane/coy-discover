import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { parseInterests, SwipeResponse } from "@/types/api";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON request body" },
      { status: 400 }
    );
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { error: "Request body must be a JSON object" },
      { status: 400 }
    );
  }

  const { profileId, direction } = body as Record<string, unknown>;

  if (typeof profileId !== "string" || profileId.trim().length === 0) {
    return NextResponse.json(
      { error: "profileId is required and must be a non-empty string" },
      { status: 400 }
    );
  }

  if (direction !== "LIKE" && direction !== "PASS") {
    return NextResponse.json(
      { error: "direction must be 'LIKE' or 'PASS'" },
      { status: 400 }
    );
  }

  const targetProfileId = profileId.trim();

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Verify that target profile exists
      const profile = await tx.profile.findUnique({
        where: { id: targetProfileId },
      });

      if (!profile) {
        return { status: 404, error: "Profile not found" };
      }

      // 2. Prevent duplicate swipe
      const existingSwipe = await tx.swipe.findUnique({
        where: { profileId: targetProfileId },
      });

      if (existingSwipe) {
        return { status: 409, error: "Profile has already been swiped" };
      }

      // 3. Persist the swipe record
      await tx.swipe.create({
        data: {
          profileId: targetProfileId,
          direction,
        },
      });

      // 4. Evaluate mutual match: only when LIKE and candidate profile likedCurrentUser is true
      if (direction === "LIKE" && profile.likedCurrentUser) {
        const match = await tx.match.create({
          data: {
            profileId: targetProfileId,
          },
        });

        const responsePayload: SwipeResponse = {
          success: true,
          matched: true,
          match: {
            id: match.id,
            profileId: match.profileId,
            matchedAt: match.matchedAt,
            profile: {
              id: profile.id,
              name: profile.name,
              age: profile.age,
              photoUrl: profile.photoUrl,
              bio: profile.bio,
              city: profile.city,
              college: profile.college,
              interests: parseInterests(profile.interests),
              createdAt: profile.createdAt,
            },
          },
        };

        return {
          status: 201,
          data: responsePayload,
        };
      }

      // Return clean response without leaking likedCurrentUser status
      const responsePayload: SwipeResponse = {
        success: true,
        matched: false,
      };

      return {
        status: 200,
        data: responsePayload,
      };
    });

    if ("error" in result) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data, { status: result.status });
  } catch (error) {
    // Handle database-level unique constraint violation (P2002) for race conditions
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Profile has already been swiped" },
        { status: 409 }
      );
    }

    console.error("Error processing swipe:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
