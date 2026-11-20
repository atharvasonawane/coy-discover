"use client";

export type TabType = "home" | "discover" | "matches";

export function NavigationHeader() {
  return (
    <header className="shrink-0 z-30 w-full max-w-md mx-auto px-4 py-2.5 sm:py-3 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md border-b border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-rose-500/20">
          🔥
        </div>
        <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
          coy
        </span>
      </div>

      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>Live Feed</span>
      </div>
    </header>
  );
}

interface NavigationBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  matchCount?: number;
}

export function NavigationBar({
  activeTab,
  onTabChange,
  matchCount = 0,
}: NavigationBarProps) {
  return (
    <nav
      aria-label="Main Navigation"
      className="shrink-0 z-30 w-full max-w-md mx-auto px-6 py-2 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-200/60 dark:border-zinc-800/60 shadow-lg"
    >
      <div className="flex items-center justify-around">
        {/* Home Tab */}
        <button
          type="button"
          onClick={() => onTabChange("home")}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
            activeTab === "home"
              ? "text-rose-500 font-bold scale-105"
              : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 font-medium"
          }`}
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill={activeTab === "home" ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={activeTab === "home" ? 1.5 : 2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="text-[10px] sm:text-[11px]">Home</span>
        </button>

        {/* Discover Tab (Default) */}
        <button
          type="button"
          onClick={() => onTabChange("discover")}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
            activeTab === "discover"
              ? "text-rose-500 font-bold scale-105"
              : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 font-medium"
          }`}
        >
          <div className="relative">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill={activeTab === "discover" ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={activeTab === "discover" ? 1.5 : 2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
              />
            </svg>
            {activeTab === "discover" && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-rose-500" />
            )}
          </div>
          <span className="text-[10px] sm:text-[11px]">Discover</span>
        </button>

        {/* Matches Tab (Placeholder) */}
        <button
          type="button"
          onClick={() => onTabChange("matches")}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
            activeTab === "matches"
              ? "text-rose-500 font-bold scale-105"
              : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 font-medium"
          }`}
        >
          <div className="relative">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill={activeTab === "matches" ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={activeTab === "matches" ? 1.5 : 2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {matchCount > 0 && (
              <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500 text-white shadow-xs">
                {matchCount}
              </span>
            )}
          </div>
          <span className="text-[10px] sm:text-[11px]">Matches</span>
        </button>
      </div>
    </nav>
  );
}

// Default export wrapper for backward compatibility
export function Navigation({
  activeTab,
  onTabChange,
  matchCount = 0,
}: NavigationBarProps) {
  return (
    <>
      <NavigationHeader />
      <NavigationBar
        activeTab={activeTab}
        onTabChange={onTabChange}
        matchCount={matchCount}
      />
    </>
  );
}
