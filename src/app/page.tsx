"use client";

import { useState, useEffect, useCallback } from "react";
import { SafeProfile, SwipeResponse } from "@/types/api";
import {
  NavigationHeader,
  NavigationBar,
  TabType,
} from "@/components/Navigation";
import { CardStack } from "@/components/discover/CardStack";
import { SkeletonCard } from "@/components/discover/SkeletonCard";
import { EmptyState } from "@/components/discover/EmptyState";
import { MatchModal } from "@/components/discover/MatchModal";
import { HomePlaceholder } from "@/components/home/HomePlaceholder";
import { MatchesPlaceholder } from "@/components/matches/MatchesPlaceholder";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("discover");
  const [profiles, setProfiles] = useState<SafeProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<SafeProfile | null>(null);
  const [matchCount, setMatchCount] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch match count from real API
  const refreshMatchCount = useCallback(async () => {
    try {
      const res = await fetch("/api/matches");
      if (res.ok) {
        const matches = await res.json();
        setMatchCount(Array.isArray(matches) ? matches.length : 0);
      }
    } catch {
      // Non-critical, ignore
    }
  }, []);

  // Initial data loading effect
  useEffect(() => {
    let ignore = false;

    async function loadInitialData() {
      try {
        setError(null);
        const [feedRes, matchesRes] = await Promise.all([
          fetch("/api/feed"),
          fetch("/api/matches"),
        ]);

        if (!ignore && feedRes.ok) {
          const feedData: SafeProfile[] = await feedRes.json();
          setProfiles(feedData);
        } else if (!ignore && !feedRes.ok) {
          throw new Error(`Failed to load feed (${feedRes.status})`);
        }

        if (!ignore && matchesRes.ok) {
          const matchData = await matchesRes.json();
          setMatchCount(Array.isArray(matchData) ? matchData.length : 0);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Initial load error:", err);
          setError(err instanceof Error ? err.message : "Failed to load feed");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadInitialData();

    return () => {
      ignore = true;
    };
  }, []);

  // Switch tab and sync match count if opening matches tab
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === "matches") {
      refreshMatchCount();
    }
  };

  // Meaningful manual refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      const res = await fetch("/api/feed");
      if (!res.ok) {
        throw new Error(`Failed to load feed (${res.status})`);
      }
      const data: SafeProfile[] = await res.json();
      setProfiles(data);
      await refreshMatchCount();
    } catch (err) {
      console.error("Error refreshing feed:", err);
      setError(err instanceof Error ? err.message : "Failed to refresh feed");
    } finally {
      setIsRefreshing(false);
    }
  };

  // Handle Swipe (only advances card when API confirms save)
  const handleSwipe = async (
    profileId: string,
    direction: "LIKE" | "PASS"
  ): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/swipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profileId, direction }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Swipe failed (${res.status})`);
      }

      const result: SwipeResponse = await res.json();

      // Advance deck ONLY after confirmation from API
      setProfiles((prev) => prev.filter((p) => p.id !== profileId));

      // Handle mutual match
      if (result.matched && result.match?.profile) {
        setMatchedProfile(result.match.profile);
        setMatchCount((count) => count + 1);
      }

      return true;
    } catch (err) {
      console.error("Swipe submission failed:", err);
      setError(err instanceof Error ? err.message : "Failed to save swipe");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] h-dvh bg-zinc-100 dark:bg-black font-sans text-zinc-900 dark:text-zinc-50 select-none overflow-hidden">
      {/* Top Header */}
      <NavigationHeader />

      {/* Main View Area - Exactly fills space between header and footer navigation */}
      <main className="flex-1 min-h-0 flex flex-col items-center justify-center p-3 sm:p-4 w-full max-w-md mx-auto overflow-hidden">
        {/* Error Notification Banner */}
        {error && (
          <div className="w-full shrink-0 mb-2 p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs text-center flex items-center justify-between gap-2 shadow-xs animate-in fade-in">
            <span>{error}</span>
            <button
              type="button"
              onClick={handleRefresh}
              className="text-xs font-bold underline hover:no-underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Tab 1: Home Placeholder */}
        {activeTab === "home" && (
          <HomePlaceholder onGoToDiscover={() => handleTabChange("discover")} />
        )}

        {/* Tab 2: Discover Feed (Core Milestone 3 Experience) */}
        {activeTab === "discover" && (
          <div className="w-full h-full flex flex-col items-center justify-center flex-1 min-h-0 overflow-hidden">
            {loading ? (
              <SkeletonCard />
            ) : profiles.length > 0 ? (
              <CardStack
                profiles={profiles}
                onSwipe={handleSwipe}
                isSubmitting={isSubmitting}
              />
            ) : (
              <EmptyState onRefresh={handleRefresh} isRefreshing={isRefreshing} />
            )}
          </div>
        )}

        {/* Tab 3: Matches Placeholder */}
        {activeTab === "matches" && (
          <MatchesPlaceholder
            matchCount={matchCount}
            onGoToDiscover={() => handleTabChange("discover")}
          />
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <NavigationBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        matchCount={matchCount}
      />

      {/* Mutual Match Celebration Modal */}
      <MatchModal
        matchedProfile={matchedProfile}
        onClose={() => setMatchedProfile(null)}
        onViewMatches={() => {
          setMatchedProfile(null);
          handleTabChange("matches");
        }}
      />
    </div>
  );
}
