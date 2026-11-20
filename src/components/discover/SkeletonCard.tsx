export function SkeletonCard() {
  return (
    <div className="relative w-full flex-1 min-h-0 aspect-[3/4.2] max-h-[min(510px,calc(100%-68px))] max-w-sm sm:max-w-md rounded-3xl bg-zinc-200 dark:bg-zinc-800 animate-pulse overflow-hidden shadow-xl border border-zinc-200/60 dark:border-zinc-700/60 flex flex-col justify-end p-5 sm:p-6 mx-auto my-auto">
      <div className="space-y-2.5">
        <div className="h-7 w-40 bg-zinc-300 dark:bg-zinc-700 rounded-lg" />
        <div className="h-3.5 w-28 bg-zinc-300 dark:bg-zinc-700 rounded-md" />
        <div className="h-3.5 w-48 bg-zinc-300 dark:bg-zinc-700 rounded-md" />
        <div className="h-10 w-full bg-zinc-300/80 dark:bg-zinc-700/80 rounded-lg mt-1" />
        <div className="flex gap-2 pt-1">
          <div className="h-5 w-14 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
          <div className="h-5 w-16 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
          <div className="h-5 w-12 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
        </div>
      </div>
    </div>
  );
}
