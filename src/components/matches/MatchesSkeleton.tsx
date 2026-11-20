export function MatchesSkeleton() {
  return (
    <div className="w-full flex-1 min-h-0 overflow-y-auto px-1 py-2">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex flex-col rounded-2xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 animate-pulse border border-zinc-200/40 dark:border-zinc-700/40 shadow-sm"
          >
            <div className="w-full aspect-[4/4.5] bg-zinc-300 dark:bg-zinc-700/60" />
            <div className="p-3 space-y-2">
              <div className="h-4 w-20 bg-zinc-300 dark:bg-zinc-700 rounded-sm" />
              <div className="h-3 w-28 bg-zinc-300 dark:bg-zinc-700 rounded-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
