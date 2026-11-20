"use client";

interface MatchesEmptyStateProps {
  onGoToDiscover: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function MatchesEmptyState({
  onGoToDiscover,
  onRefresh,
  isRefreshing = false,
}: MatchesEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 sm:p-8 max-w-sm sm:max-w-md w-full flex-1 max-h-[500px] aspect-[3/4.2] rounded-3xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-4 my-auto overflow-hidden">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center text-2xl sm:text-3xl shadow-inner animate-bounce">
        💬
      </div>

      <div className="space-y-1.5">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          No Matches Yet
        </h3>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed">
          When you and another member both like each other, your confirmed connection will appear here!
        </p>
      </div>

      <div className="pt-2 flex flex-col gap-2 w-full max-w-xs">
        <button
          type="button"
          onClick={onGoToDiscover}
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 px-5 rounded-full font-semibold text-xs sm:text-sm bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md hover:shadow-lg hover:from-rose-600 hover:to-pink-600 active:scale-95 transition-all"
        >
          <span>Discover Profiles</span>
          <span>🔥</span>
        </button>

        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 py-1 transition-colors disabled:opacity-50"
          >
            <svg
              className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
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
            <span>{isRefreshing ? "Checking..." : "Refresh Matches"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
