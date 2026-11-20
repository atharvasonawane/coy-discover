"use client";

import { MatchesScreen } from "./MatchesScreen";

interface MatchesPlaceholderProps {
  matchCount?: number;
  onGoToDiscover: () => void;
  onRefreshMatches?: () => void;
}

export function MatchesPlaceholder({
  onGoToDiscover,
}: MatchesPlaceholderProps) {
  return <MatchesScreen onGoToDiscover={onGoToDiscover} />;
}
