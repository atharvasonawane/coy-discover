export interface SafeProfile {
  id: string;
  name: string;
  age: number;
  photoUrl: string;
  bio: string;
  city: string;
  college: string;
  interests: string[];
  createdAt: Date | string;
}

export interface SwipeRequestBody {
  profileId: string;
  direction: "LIKE" | "PASS";
}

export interface SwipeResponse {
  success: boolean;
  matched: boolean;
  match?: {
    id: string;
    profileId: string;
    matchedAt: Date | string;
    profile: SafeProfile;
  };
}

export interface MatchRecord {
  id: string;
  profileId: string;
  matchedAt: Date | string;
  profile: SafeProfile;
}

export function parseInterests(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
