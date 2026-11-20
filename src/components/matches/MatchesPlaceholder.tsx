"use client";

import { useEffect, useState } from "react";
import { MatchRecord } from "@/types/api";

interface MatchesPlaceholderProps {
  matchCount: number;
  onGoToDiscover: () => void;
  onRefreshMatches?: () => void;
}

export function MatchesPlaceholder({
  matchCount,
  onGoToDiscover,
}: MatchesPlaceholderProps) {
  const [matches, setMatches] = useState<MatchRecord[]>([]);

  useEffect(() => {
    let ignore = false;
    async function loadMatches() {
      try {
        const res = await fetch("/api/matches");
        if (res.ok && !ignore) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setMatches(data);
          }
        }
      } catch {
        // Fallback to matchCount prop
      }
    }

    loadMatches();
    return () => {
      ignore = true;
    };
  }, []);

  const displayCount = matches.length > 0 ? matches.length : matchCount;

  return (
    <div className="flex flex-col items-center justify-center text-center p-6 sm:p-8 max-w-sm sm:max-w-md w-full flex-1 max-h-[500px] aspect-[3/4.2] rounded-3xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-4 my-auto overflow-hidden">
      <div className="relative">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-500 text-white flex items-center justify-center text-2xl sm:text-3xl shadow-lg shadow-pink-500/20">
          💬
        </div>
        {displayCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-rose-500 text-white shadow-md animate-pulse">
            {displayCount}
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Your Matches
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed">
          {displayCount > 0
            ? `You have ${displayCount} confirmed mutual match${
                displayCount === 1 ? "" : "es"
              }! Both of you liked each other.`
            : "No mutual matches yet! Head to Discover and swipe right on people you like."}
        </p>
      </div>

      {/* Preview list of matched avatars if matches exist */}
      {matches.length > 0 && (
        <div className="w-full max-h-[140px] overflow-y-auto px-1 space-y-2">
          {matches.slice(0, 3).map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-3 p-2 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 text-left"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.profile.photoUrl}
                alt={m.profile.name}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                  {m.profile.name}, {m.profile.age}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                  {m.profile.city} • {m.profile.college}
                </p>
              </div>
              <span className="text-xs text-rose-500 shrink-0">❤️</span>
            </div>
          ))}
          {matches.length > 3 && (
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              +{matches.length - 3} more match{matches.length - 3 === 1 ? "" : "es"}
            </p>
          )}
        </div>
      )}

      <div className="pt-2">
        <button
          type="button"
          onClick={onGoToDiscover}
          className="inline-flex items-center gap-2 py-2.5 sm:py-3 px-6 rounded-full font-semibold text-xs sm:text-sm bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md hover:shadow-lg hover:from-rose-600 hover:to-pink-600 active:scale-95 transition-all"
        >
          <span>Find More Matches</span>
          <span>🔥</span>
        </button>
      </div>
    </div>
  );
}
