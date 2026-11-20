"use client";

interface HomePlaceholderProps {
  onGoToDiscover: () => void;
}

export function HomePlaceholder({ onGoToDiscover }: HomePlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 max-w-sm sm:max-w-md w-full aspect-[3/4.2] rounded-3xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-5">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 text-white flex items-center justify-center text-3xl shadow-lg shadow-rose-500/20">
        👋
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Welcome to Coy
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed">
          Your campus community discovery app. Jump into the Discover tab to explore student profiles and find mutual connections!
        </p>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onGoToDiscover}
          className="inline-flex items-center gap-2 py-3 px-6 rounded-full font-semibold text-sm bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md hover:shadow-lg hover:from-rose-600 hover:to-pink-600 active:scale-95 transition-all cursor-pointer"
        >
          <span>Start Swiping</span>
          <span>🔥</span>
        </button>
      </div>
    </div>
  );
}
