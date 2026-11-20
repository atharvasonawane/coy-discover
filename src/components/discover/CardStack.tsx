"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { SafeProfile } from "@/types/api";
import { ProfileCard } from "./ProfileCard";
import { ActionButtons } from "./ActionButtons";

interface CardStackProps {
  profiles: SafeProfile[];
  onSwipe: (profileId: string, direction: "LIKE" | "PASS") => Promise<boolean>;
  isSubmitting: boolean;
}

const SWIPE_THRESHOLD = 90;

export function CardStack({
  profiles,
  onSwipe,
  isSubmitting,
}: CardStackProps) {
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [flyOutDirection, setFlyOutDirection] = useState<"LIKE" | "PASS" | null>(null);

  const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const activePointerId = useRef<number | null>(null);

  const topProfile = profiles[0] || null;
  const nextProfile = profiles[1] || null;

  // Execute swipe logic
  const handleTriggerSwipe = useCallback(
    async (direction: "LIKE" | "PASS") => {
      if (!topProfile || isSubmitting || flyOutDirection) return;

      // Animate card off-screen
      setFlyOutDirection(direction);
      const exitDistance = typeof window !== "undefined" ? window.innerWidth + 300 : 800;
      setOffset({
        x: direction === "LIKE" ? exitDistance : -exitDistance,
        y: 20,
      });

      // Call API
      const success = await onSwipe(topProfile.id, direction);

      if (success) {
        // Reset transform state for next top card
        setOffset({ x: 0, y: 0 });
        setFlyOutDirection(null);
      } else {
        // If API failed, snap card back
        setFlyOutDirection(null);
        setOffset({ x: 0, y: 0 });
      }
    },
    [topProfile, isSubmitting, flyOutDirection, onSwipe]
  );

  // Keyboard navigation (ArrowLeft = PASS, ArrowRight = LIKE)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isSubmitting || flyOutDirection) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleTriggerSwipe("LIKE");
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleTriggerSwipe("PASS");
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleTriggerSwipe, isSubmitting, flyOutDirection]);

  // Pointer event handlers for touch & mouse drag
  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (isSubmitting || flyOutDirection) return;

    // Only respond to primary mouse button or touch
    if (e.button !== 0 && e.pointerType === "mouse") return;

    activePointerId.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);

    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging || activePointerId.current !== e.pointerId) return;

    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;

    setOffset({ x: deltaX, y: deltaY });
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging || activePointerId.current !== e.pointerId) return;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Element might be detached or pointer released
    }

    setIsDragging(false);
    activePointerId.current = null;

    if (offset.x > SWIPE_THRESHOLD) {
      handleTriggerSwipe("LIKE");
    } else if (offset.x < -SWIPE_THRESHOLD) {
      handleTriggerSwipe("PASS");
    } else {
      // Snap back to center
      setOffset({ x: 0, y: 0 });
    }
  }

  function handlePointerCancel(e: React.PointerEvent<HTMLDivElement>) {
    if (activePointerId.current === e.pointerId) {
      setIsDragging(false);
      activePointerId.current = null;
      setOffset({ x: 0, y: 0 });
    }
  }

  if (!topProfile) return null;

  // Visual calculations based on current drag offset
  const rotation = offset.x / 18;
  const likeOpacity = Math.min(1, Math.max(0, offset.x / 80));
  const nopeOpacity = Math.min(1, Math.max(0, -offset.x / 80));

  // Background card scale interpolation
  const dragProgress = Math.min(1, Math.abs(offset.x) / 150);
  const bgScale = 0.95 + dragProgress * 0.05;
  const bgOpacity = 0.65 + dragProgress * 0.35;
  const bgTranslateY = 8 - dragProgress * 8;

  const topCardTransform = `translate3d(${offset.x}px, ${offset.y * 0.4}px, 0) rotate(${rotation}deg)`;
  const transitionStyle = isDragging
    ? "none"
    : flyOutDirection
      ? "transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.2), opacity 0.35s ease-out"
      : "transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)";

  return (
    <div className="flex flex-col items-center justify-between w-full h-full max-w-sm sm:max-w-md mx-auto min-h-0">
      {/* Cards Container */}
      <div className="relative w-full flex-1 min-h-0 aspect-[3/4.2] max-h-[min(510px,calc(100%-68px))] mx-auto">
        {/* Next Card in Deck (Behind top card) */}
        {nextProfile && (
          <div
            style={{
              transform: `scale(${bgScale}) translateY(${bgTranslateY}px)`,
              opacity: bgOpacity,
              transition: isDragging ? "none" : "all 0.25s ease-out",
            }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <ProfileCard profile={nextProfile} isTopCard={false} />
          </div>
        )}

        {/* Top Interactive Card */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          style={{
            transform: topCardTransform,
            transition: transitionStyle,
            opacity: flyOutDirection ? 0 : 1,
            touchAction: "none",
          }}
          className="absolute inset-0 z-10 will-change-transform"
        >
          <ProfileCard
            profile={topProfile}
            likeOpacity={likeOpacity}
            nopeOpacity={nopeOpacity}
            isTopCard={true}
          />
        </div>
      </div>

      {/* Action Buttons (Pass & Like) */}
      <ActionButtons
        onSwipe={(direction) => handleTriggerSwipe(direction)}
        disabled={isSubmitting || !!flyOutDirection}
      />
    </div>
  );
}
