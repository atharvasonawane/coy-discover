"use client";

import { useState, useEffect } from "react";
import { MatchRecord } from "@/types/api";
import { MatchCard } from "./MatchCard";
import { MatchDetailModal } from "./MatchDetailModal";
import { MatchesEmptyState } from "./MatchesEmptyState";
import { MatchesSkeleton } from "./MatchesSkeleton";

interface MatchesScreenProps {
  onGoToDiscover: () => void;
  onMatchCountChange?: (count: number) => void;
}

export function MatchesScreen({
  onGoToDiscover,
  onMatchCountChange,
}: MatchesScreenProps) {
  const [matches, setMatches] = useState<MatchRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<MatchRecord | null>(null);
  const [devMockEmpty, setDevMockEmpty] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadMatches() {
      try {
        setError(null);
        const res = await fetch("/api/matches");
        if (!res.ok) {
          throw new Error(`Failed to load matches (${res.status})`);
        }
        const data: MatchRecord[] = await res.json();
        if (!ignore) {
          setMatches(data);
          if (onMatchCountChange) {
            onMatchCountChange(data.length);
          }
        }
      } catch (err) {
        if (!ignore) {
          console.error("Error fetching matches:", err);
          setError(
            err instanceof Error ? err.message : "Failed to load matches"
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
          setIsRefreshing(false);
        }
      }
    }

    loadMatches();

    return () => {
      ignore = true;
    };
  }, [onMatchCountChange]);

  const fetchMatchesData = async (mockEmpty = devMockEmpty) => {
    setIsRefreshing(true);
    setError(null);
    try {
      const url = mockEmpty ? "/api/matches?mock=empty" : "/api/matches";
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to load matches (${res.status})`);
      }
      const data: MatchRecord[] = await res.json();
      setMatches(data);
      if (onMatchCountChange) {
        onMatchCountChange(data.length);
      }
    } catch (err) {
      console.error("Error fetching matches:", err);
      setError(err instanceof Error ? err.message : "Failed to load matches");
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full max-w-sm sm:max-w-md mx-auto min-h-0 overflow-hidden">
      {/* Header bar within matches view */}
      <div className="shrink-0 flex items-center justify-between pb-2 mb-1 border-b border-zinc-200/40 dark:border-zinc-800/60">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span>Matches</span>
            {matches.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-500 border border-rose-500/20">
                {matches.length}
              </span>
            )}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {matches.length > 0
              ? "People who liked you back"
              : "Mutual connections will appear here"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Preview toggle to test empty state without modifying the database */}
          <button
            type="button"
            onClick={() => {
              const nextState = !devMockEmpty;
              setDevMockEmpty(nextState);
              fetchMatchesData(nextState);
            }}
            title="Toggle empty state preview without altering database"
            className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-800 text-zinc-400 hover:text-rose-400 border border-zinc-700/60 transition-colors"
          >
            {devMockEmpty ? "⚡ Show Real" : "⚡ Test Empty"}
          </button>

          {matches.length > 0 && (
            <button
              type="button"
              onClick={() => fetchMatchesData(devMockEmpty)}
              disabled={isRefreshing}
              aria-label="Refresh matches"
              className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 transition-colors disabled:opacity-50"
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
            </button>
          )}
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="shrink-0 mb-2 p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs text-center flex items-center justify-between gap-2 shadow-xs">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => fetchMatchesData(devMockEmpty)}
            className="text-xs font-bold underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Main Content Area */}
      {loading ? (
        <MatchesSkeleton />
      ) : matches.length === 0 ? (
        <MatchesEmptyState
          onGoToDiscover={onGoToDiscover}
          onRefresh={() => fetchMatchesData(devMockEmpty)}
          isRefreshing={isRefreshing}
        />
      ) : (
        <div className="flex-1 min-h-0 overflow-y-auto px-0.5 py-1">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 pb-4">
            {matches.map((m) => (
              <MatchCard
                key={m.id}
                match={m}
                onSelect={(selected) => setSelectedMatch(selected)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Match Detail Modal */}
      <MatchDetailModal
        profile={selectedMatch?.profile || null}
        matchedAt={selectedMatch?.matchedAt || null}
        onClose={() => setSelectedMatch(null)}
      />
    </div>
  );
}
