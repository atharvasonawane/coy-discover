"use client";

import { useState } from "react";
import { SafeProfile } from "@/types/api";

interface ProfileCardProps {
  profile: SafeProfile;
  likeOpacity?: number; // 0 to 1
  nopeOpacity?: number; // 0 to 1
  isTopCard?: boolean;
}

export function ProfileCard({
  profile,
  likeOpacity = 0,
  nopeOpacity = 0,
  isTopCard = false,
}: ProfileCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`relative w-full h-full rounded-3xl overflow-hidden shadow-2xl select-none bg-zinc-900 border border-zinc-200/20 dark:border-zinc-800 ${
        isTopCard ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      {/* Background Image & Shimmer Placeholder */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
      )}

      {!imageError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={profile.photoUrl}
          alt={`${profile.name}, ${profile.age}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          draggable={false}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-500 to-indigo-600 text-white font-bold text-6xl">
          {profile.name[0]}
        </div>
      )}

      {/* Visual Feedback Badges (Like Stamp & Nope Stamp) */}
      {isTopCard && (
        <>
          {/* LIKE Badge (Top Left) */}
          <div
            style={{ opacity: likeOpacity }}
            className="absolute top-5 left-5 z-20 pointer-events-none transform -rotate-12 rounded-xl border-4 border-emerald-400 bg-emerald-500/20 backdrop-blur-xs px-3 sm:px-4 py-1 sm:py-1.5 shadow-lg transition-opacity duration-75"
          >
            <span className="text-2xl sm:text-3xl font-black tracking-widest text-emerald-400 uppercase drop-shadow-md">
              LIKE
            </span>
          </div>

          {/* NOPE Badge (Top Right) */}
          <div
            style={{ opacity: nopeOpacity }}
            className="absolute top-5 right-5 z-20 pointer-events-none transform rotate-12 rounded-xl border-4 border-rose-500 bg-rose-500/20 backdrop-blur-xs px-3 sm:px-4 py-1 sm:py-1.5 shadow-lg transition-opacity duration-75"
          >
            <span className="text-2xl sm:text-3xl font-black tracking-widest text-rose-500 uppercase drop-shadow-md">
              PASS
            </span>
          </div>
        </>
      )}

      {/* Gradient Dark Overlay for Readable Text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none" />

      {/* Profile Details Overlay */}
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white z-10 flex flex-col gap-1 sm:gap-1.5 pointer-events-none">
        {/* Name and Age */}
        <div className="flex items-baseline gap-2">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">
            {profile.name}
          </h2>
          <span className="text-xl sm:text-2xl font-light text-zinc-300 drop-shadow-md">
            {profile.age}
          </span>
        </div>

        {/* Location & College */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs sm:text-sm text-zinc-300">
          {profile.city && (
            <div className="flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{profile.city}</span>
            </div>
          )}

          {profile.college && (
            <div className="flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              <span className="truncate max-w-[180px] sm:max-w-[220px]">
                {profile.college}
              </span>
            </div>
          )}
        </div>

        {/* Short Bio */}
        {profile.bio && (
          <p className="text-xs sm:text-sm text-zinc-200 line-clamp-2 leading-relaxed drop-shadow-xs">
            {profile.bio}
          </p>
        )}

        {/* Interests Pills */}
        {profile.interests && profile.interests.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1 max-h-[48px] overflow-hidden">
            {profile.interests.map((interest, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-medium bg-white/20 text-white backdrop-blur-xs border border-white/20 shadow-xs"
              >
                {interest}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
