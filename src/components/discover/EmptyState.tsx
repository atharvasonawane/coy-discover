"use client";

import { useState } from "react";

interface EmptyStateProps {
  onRefresh: () => Promise<void>;
  isRefreshing?: boolean;
}

export function EmptyState({ onRefresh, isRefreshing = false }: EmptyStateProps) {
  const [lastChecked, setLastChecked] = useState<string | null>(null);
  const [checkedCount, setCheckedCount] = useState(0);

  const handleCheck = async () => {
    await onRefresh();
    const now = new Date();
    setLastChecked(
      now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", second: "2-digit" })
    );
    setCheckedCount((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center p-6 sm:p-8 max-w-sm sm:max-w-md w-full flex-1 max-h-[500px] aspect-[3/4.2] rounded-3xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-4 my-auto">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center text-2xl sm:text-3xl shadow-inner animate-bounce">
        ✨
      </div>

      <div className="space-y-2">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          You&apos;re All Caught Up!
        </h3>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed">
          You&apos;ve reviewed all candidate profiles currently in the feed.
        </p>
      </div>

      {/* Honest, friendly feedback after checking */}
      {lastChecked && (
        <div className="w-full max-w-xs p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 text-xs text-zinc-600 dark:text-zinc-300 animate-in fade-in space-y-1">
          <div className="flex items-center justify-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Checked at {lastChecked}</span>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            No new profiles yet. You have seen all profiles in the database. New profiles will show up here as more campus members join.
          </p>
        </div>
      )}

      <div className="pt-2 w-full max-w-xs">
        <button
          type="button"
          onClick={handleCheck}
          disabled={isRefreshing}
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 px-5 rounded-full font-semibold text-xs sm:text-sm bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md hover:shadow-lg hover:from-rose-600 hover:to-pink-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span>
            {isRefreshing
              ? "Checking Server..."
              : checkedCount > 0
              ? "Check Again"
              : "Check for New Profiles"}
          </span>
        </button>
      </div>
    </div>
  );
}
