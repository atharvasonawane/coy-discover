"use client";

interface ActionButtonsProps {
  onSwipe: (direction: "LIKE" | "PASS") => void;
  disabled?: boolean;
}

export function ActionButtons({ onSwipe, disabled = false }: ActionButtonsProps) {
  return (
    <div className="shrink-0 flex items-center justify-center gap-6 sm:gap-8 pt-2 sm:pt-3 pb-1 sm:pb-2">
      {/* Pass / Dislike Button */}
      <button
        type="button"
        onClick={() => onSwipe("PASS")}
        disabled={disabled}
        aria-label="Pass profile (Left Arrow)"
        title="Pass (Left Arrow)"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white dark:bg-zinc-900 border-2 border-rose-200 dark:border-rose-900/60 shadow-lg hover:shadow-xl hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-500 active:scale-90 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:border-rose-200"
      >
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 transition-transform group-hover:scale-110"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Like / Heart Button */}
      <button
        type="button"
        onClick={() => onSwipe("LIKE")}
        disabled={disabled}
        aria-label="Like profile (Right Arrow)"
        title="Like (Right Arrow)"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white dark:bg-zinc-900 border-2 border-emerald-200 dark:border-emerald-900/60 shadow-lg hover:shadow-xl hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-500 active:scale-90 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:border-emerald-200"
      >
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 transition-transform group-hover:scale-110"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
    </div>
  );
}
