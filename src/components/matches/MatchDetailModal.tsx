"use client";

import { useEffect } from "react";
import { SafeProfile } from "@/types/api";

interface MatchDetailModalProps {
  profile: SafeProfile | null;
  matchedAt: Date | string | null;
  onClose: () => void;
}

function formatMatchDate(dateString: Date | string | null): string {
  if (!dateString) return "Recently";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Recently";
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Matched today";
    if (diffDays === 1) return "Matched yesterday";
    if (diffDays < 7) return `Matched ${diffDays} days ago`;
    return `Matched on ${date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}`;
  } catch {
    return "Recently";
  }
}

export function MatchDetailModal({
  profile,
  matchedAt,
  onClose,
}: MatchDetailModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (profile) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [profile, onClose]);

  if (!profile) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="match-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm sm:max-w-[370px] rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[85dvh] sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close profile details"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white flex items-center justify-center text-lg shadow-md transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* Scrollable Card Body (Unified scrolling, hidden scrollbar across browsers) */}
        <div
          className="overflow-y-auto flex-1 overscroll-contain no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Photo Container */}
          <div className="relative w-full aspect-[4/3.5] sm:aspect-[4/5] sm:max-h-[420px] bg-zinc-800 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.photoUrl}
              alt={profile.name}
              className="w-full h-full object-cover sm:object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/30" />

            {/* Matched date badge */}
            <div className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/90 text-white backdrop-blur-xs shadow-md">
              <span>❤️</span>
              <span>{formatMatchDate(matchedAt)}</span>
            </div>
          </div>

          {/* Details area */}
          <div className="p-4 sm:p-5 space-y-3 sm:space-y-3.5 text-zinc-100">
            {/* Name and Age */}
            <div className="flex items-baseline gap-2">
              <h2
                id="match-detail-title"
                className="text-xl sm:text-2xl font-bold tracking-tight text-white"
              >
                {profile.name}
              </h2>
              <span className="text-xl sm:text-2xl font-light text-zinc-400">
                {profile.age}
              </span>
            </div>

            {/* Location & College */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-300">
              {profile.city && (
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-rose-400 shrink-0"
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
                    className="w-4 h-4 text-indigo-400 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                  <span className="truncate">{profile.college}</span>
                </div>
              )}
            </div>

            {/* Bio */}
            {profile.bio && (
              <div className="space-y-1 pt-0.5 sm:pt-1">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  About
                </h3>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                  {profile.bio}
                </p>
              </div>
            )}

            {/* Interests */}
            {profile.interests && profile.interests.length > 0 && (
              <div className="space-y-1.5 pt-0.5 sm:pt-1">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Interests
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {profile.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-200 border border-zinc-700/60"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Action footer - Sticky Done button */}
        <div className="p-3.5 sm:p-4 bg-zinc-950/80 backdrop-blur-md border-t border-zinc-800 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-full font-semibold text-xs sm:text-sm bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md hover:from-rose-600 hover:to-pink-600 active:scale-95 transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
