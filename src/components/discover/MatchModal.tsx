"use client";

import { useEffect } from "react";
import { SafeProfile } from "@/types/api";

interface MatchModalProps {
  matchedProfile: SafeProfile | null;
  onClose: () => void;
  onViewMatches?: () => void;
}

export function MatchModal({
  matchedProfile,
  onClose,
  onViewMatches,
}: MatchModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (matchedProfile) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [matchedProfile, onClose]);

  if (!matchedProfile) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="match-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl bg-zinc-900 border border-rose-500/30 p-8 text-center shadow-2xl overflow-hidden flex flex-col items-center gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow decoration in background */}
        <div className="absolute -top-20 -left-20 w-44 h-44 bg-rose-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Heart / Sparkle Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 text-white shadow-lg shadow-rose-500/30 text-3xl">
          ❤️
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2
            id="match-modal-title"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent"
          >
            It&apos;s a Match!
          </h2>
          <p className="text-sm text-zinc-300">
            You and <span className="font-semibold text-white">{matchedProfile.name}</span> liked each other!
          </p>
        </div>

        {/* Matched Avatar with Radiant Ring */}
        <div className="relative my-2">
          <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-rose-500 via-pink-400 to-indigo-500 shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={matchedProfile.photoUrl}
              alt={matchedProfile.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="absolute -bottom-2 inset-x-0 flex justify-center">
            <span className="bg-rose-600 text-white text-xs font-bold px-3 py-0.5 rounded-full shadow-md uppercase tracking-wide">
              Mutual Match
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-2.5 pt-2">
          {onViewMatches && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onViewMatches();
              }}
              className="w-full py-3 px-4 rounded-full font-semibold text-sm bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg shadow-rose-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              View in Matches
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 px-4 rounded-full font-medium text-sm text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 transition-colors"
          >
            Keep Swiping
          </button>
        </div>
      </div>
    </div>
  );
}
