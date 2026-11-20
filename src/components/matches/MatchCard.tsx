"use client";

import { useState } from "react";
import { MatchRecord } from "@/types/api";

interface MatchCardProps {
  match: MatchRecord;
  onSelect: (match: MatchRecord) => void;
}

function formatMatchDate(dateString: Date | string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Recently";
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "Recently";
  }
}

export function MatchCard({ match, onSelect }: MatchCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { profile, matchedAt } = match;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(match)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(match);
        }
      }}
      aria-label={`View match details for ${profile.name}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-rose-500/50 shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer active:scale-[0.98] focus:outline-hidden focus:ring-2 focus:ring-rose-500"
    >
      {/* Photo Container */}
      <div className="relative w-full aspect-[4/4.5] bg-zinc-800 overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
        )}

        {!imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.photoUrl}
            alt={`${profile.name}, ${profile.age}`}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-rose-600 to-indigo-600 text-white font-bold text-3xl">
            {profile.name[0]}
          </div>
        )}

        {/* Gradient dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Mutual Match badge */}
        <div className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/90 text-white shadow-xs">
          <span>❤️</span>
          <span>Match</span>
        </div>

        {/* Match date badge */}
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/60 text-zinc-300 backdrop-blur-xs">
          {formatMatchDate(matchedAt)}
        </div>

        {/* Bottom card info */}
        <div className="absolute bottom-0 inset-x-0 p-3 text-white pointer-events-none flex flex-col gap-0.5">
          <div className="flex items-baseline gap-1.5">
            <h3 className="text-base font-bold text-white truncate drop-shadow-md">
              {profile.name}
            </h3>
            <span className="text-sm font-light text-zinc-300 drop-shadow-md">
              {profile.age}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-zinc-300 truncate">
            {profile.city && (
              <span className="truncate">{profile.city}</span>
            )}
            {profile.city && profile.college && <span>•</span>}
            {profile.college && (
              <span className="truncate text-zinc-400">{profile.college}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
