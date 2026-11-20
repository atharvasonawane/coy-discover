# Coy — Campus Discovery & Mutual Matching App

A modern, mobile-first social discovery web application built for college campuses. Coy features an intuitive swipe card deck, touch gesture physics, real-time mutual match detection, and a confirmed matches gallery.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Architecture & Structure](#project-architecture--structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Database Setup & Seeding](#database-setup--seeding)
- [Available Scripts](#available-scripts)
- [API Documentation](#api-documentation)
  - [1. GET /api/feed](#1-get-apifeed)
  - [2. POST /api/swipe](#2-post-apiswipe)
  - [3. GET /api/matches](#3-get-apimatches)
- [Security & Data Privacy](#security--data-privacy)
- [Testing & Quality Verification](#testing--quality-verification)

---

## Overview

Coy provides college students with a delightful, privacy-centric way to discover campus peers. Users can review profiles one at a time, swipe right to like or left to pass using touch gestures, mouse dragging, or keyboard arrows. When two users mutually like each other, Coy celebrates the connection with an animated "It's a Match!" modal and adds the profile to the confirmed Matches tab.

---

## Key Features

- **Mobile-First Discover Interface:**
  - Card deck with smooth touch swipe and mouse drag gesture physics.
  - Dynamic LIKE / PASS visual stamp badges with proportional opacity.
  - Full keyboard accessibility: <kbd>ArrowRight</kbd> to like, <kbd>ArrowLeft</kbd> to pass, <kbd>Esc</kbd> to close modals.
  - High-resolution photos, verified campus tags, bio, city, and interest chips.
  - Graceful fallback for broken image URLs with stylized gradient avatars.
  - Floating action buttons (✖ Pass / ♥ Like) with active state animations.
  - Non-overlapping layout optimized for viewports from small mobile screens (375x648, 390x844) to desktop monitors.

- **Instant Mutual Match Celebration:**
  - Real-time mutual match detection evaluated atomically in SQLite.
  - Radiant celebration modal featuring the matched person's avatar and actions to either keep swiping or view confirmed matches.

- **Confirmed Matches Gallery:**
  - Dedicated Matches tab displaying all confirmed mutual connections in a responsive 2-column grid.
  - Relative match date tags ("Today", "Yesterday", "3d ago").
  - Detailed modal view displaying full portrait photo, location, college, bio, and interest tags.
  - Dynamic unread match badge count on the bottom navigation bar synchronized with live API state.
  - Friendly empty state with a direct shortcut to Discover when no matches exist.
  - Built-in developer preview toggle (`⚡ Test Empty` / `⚡ Show Real`) for non-destructive empty state testing.

- **Robust Backend & Data Layer:**
  - SQLite database managed via Prisma ORM 6.19.3.
  - Transaction-safe swipe persistence guarding against double-swipes and race conditions.
  - 32 diverse, realistic student mock profiles seeded across multiple universities and majors.

---

## Technology Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Framework** | Next.js (App Router + Turbopack) | 16.4.6 | Full-stack server and client routing |
| **Language** | TypeScript | ^5.0.0 | Static typing and interfaces |
| **UI Library** | React | 19.3.0 | Component hierarchy and reactivity |
| **Styling** | Tailwind CSS | 4.3.3 | Utility-first styling with dark mode theme |
| **ORM** | Prisma | 6.19.3 | Schema management, migrations, and queries |
| **Database** | SQLite | 3.x | Lightweight, zero-config local relational database |
| **Linting & Formatting** | ESLint & Prettier | ^9.0 / ^3.10 | Code standards and automated formatting |

---

## Project Architecture & Structure

```
coy/
├── prisma/
│   ├── dev.db                 # Local SQLite database (gitignored)
│   ├── schema.prisma          # Database models (Profile, Swipe, Match)
│   └── seed.ts                # Idempotent seed script with 32 mock profiles
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── feed/route.ts       # GET /api/feed (unswiped candidates)
│   │   │   ├── swipe/route.ts      # POST /api/swipe (atomic swipe + match)
│   │   │   └── matches/route.ts    # GET /api/matches (confirmed connections)
│   │   ├── favicon.ico
│   │   ├── globals.css        # Tailwind v4 theme and global styles
│   │   ├── layout.tsx         # Root layout with viewport configuration
│   │   └── page.tsx           # Discover page coordinator & tab router
│   ├── components/
│   │   ├── Navigation.tsx     # Header bar & bottom tab navigation
│   │   ├── discover/
│   │   │   ├── ActionButtons.tsx   # Like/Pass circular buttons
│   │   │   ├── CardStack.tsx       # Touch/mouse swipe gesture physics
│   │   │   ├── EmptyState.tsx      # All-caught-up view with honest refresh
│   │   │   ├── MatchModal.tsx      # Mutual match celebration popup
│   │   │   ├── ProfileCard.tsx     # Visual profile card & stamp badges
│   │   │   └── SkeletonCard.tsx    # Feed loading placeholder
│   │   ├── home/
│   │   │   └── HomePlaceholder.tsx # Welcome home screen
│   │   └── matches/
│   │       ├── MatchCard.tsx       # Grid match card with relative date
│   │       ├── MatchDetailModal.tsx # Full profile inspection dialog
│   │       ├── MatchesEmptyState.tsx # No matches view with Discover CTA
│   │       ├── MatchesPlaceholder.tsx # Backward-compatible adapter
│   │       ├── MatchesScreen.tsx   # Matches tab controller
│   │       └── MatchesSkeleton.tsx # Matches loading shimmer
│   ├── generated/
│   │   └── prisma/            # Generated Prisma Client artifacts (gitignored)
│   ├── lib/
│   │   └── prisma.ts          # PrismaClient singleton with path resolution
│   └── types/
│       └── api.ts             # TypeScript interfaces and JSON parsing utilities
├── .env.example               # Safe environment variable template
├── .gitignore                 # Excludes secrets, databases, and build artifacts
├── IMPLEMENTATION_GUIDE.md    # Detailed architecture and milestone documentation
├── package.json               # Scripts and dependency declarations
├── prisma.config.ts           # Prisma 6 configuration
└── tsconfig.json              # TypeScript compilation configuration
```

---

## Getting Started

### Prerequisites

- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **npm**: `v10.x` or higher (bundled with Node.js)

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd coy
npm install
```

### Environment Setup

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Ensure your `.env` contains the SQLite database path:

```env
DATABASE_URL="file:./dev.db"
```

### Database Setup & Seeding

1. Generate the Prisma Client:
   ```bash
   npx prisma generate
   ```

2. Run database migrations to apply the schema:
   ```bash
   npx prisma migrate dev --name init
   ```

3. Seed the database with 32 realistic mock student profiles:
   ```bash
   npm run db:seed
   ```
   *(Note: The seed script is idempotent; running it multiple times safely updates or creates missing profiles without creating duplicates).*

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the Next.js development server with Turbopack on `http://localhost:3000` |
| `npm run build` | Builds an optimized production bundle (`next build`) |
| `npm run start` | Runs the compiled production server (`next start`) |
| `npm run lint` | Runs ESLint 9 to verify code standards |
| `npm run format` | Formats all files using Prettier and Tailwind plugin |
| `npm run format:check` | Verifies formatting compliance without writing changes |
| `npm run db:seed` | Seeds the SQLite database with 32 mock candidate profiles |

---

## API Documentation

### 1. GET `/api/feed`

Retrieves candidate profiles that the current user has not yet swiped on.

- **Method:** `GET`
- **URL:** `/api/feed`
- **Query Parameters:** None
- **Response Headers:** `Content-Type: application/json`

#### Success Response (`200 OK`)
```json
[
  {
    "id": "prof_001",
    "name": "Maya Lin",
    "age": 21,
    "photoUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    "bio": "Architecture junior @ UC Berkeley. Espresso enthusiast, film photography addict, and weekend hiker.",
    "city": "Berkeley, CA",
    "college": "UC Berkeley",
    "interests": ["Architecture", "Photography", "Hiking", "Coffee"],
    "createdAt": "2026-11-20T10:00:00.000Z"
  }
]
```

#### Security Guarantee
- Profiles with an existing `Swipe` record are strictly excluded.
- The internal flag `likedCurrentUser` is **never** included in the response.

---

### 2. POST `/api/swipe`

Records a user's swipe action (`LIKE` or `PASS`) on a candidate profile. Evaluates mutual matches atomically within a database transaction.

- **Method:** `POST`
- **URL:** `/api/swipe`
- **Request Headers:** `Content-Type: application/json`

#### Request Payload
```json
{
  "profileId": "prof_001",
  "direction": "LIKE"
}
```

#### Field Validation
- `profileId`: Required non-empty string.
- `direction`: Must be `"LIKE"` or `"PASS"`.

#### Responses

- **Mutual Match Created (`201 Created`):**
  Returned when the user likes a profile that has `likedCurrentUser: true`.
  ```json
  {
    "success": true,
    "matched": true,
    "match": {
      "id": "match_uuid",
      "profileId": "prof_001",
      "matchedAt": "2026-11-20T15:00:00.000Z",
      "profile": {
        "id": "prof_001",
        "name": "Maya Lin",
        "age": 21,
        "photoUrl": "https://images.unsplash.com/...",
        "bio": "Architecture junior...",
        "city": "Berkeley, CA",
        "college": "UC Berkeley",
        "interests": ["Architecture", "Photography"],
        "createdAt": "2026-11-20T10:00:00.000Z"
      }
    }
  }
  ```

- **Swipe Recorded, No Match (`200 OK`):**
  Returned on `PASS` or when liking a profile where `likedCurrentUser: false`.
  ```json
  {
    "success": true,
    "matched": false
  }
  ```

- **Invalid Request Payload (`400 Bad Request`):**
  ```json
  { "error": "direction must be 'LIKE' or 'PASS'" }
  ```

- **Candidate Profile Not Found (`404 Not Found`):**
  ```json
  { "error": "Profile not found" }
  ```

- **Duplicate Swipe Attempt (`409 Conflict`):**
  Guarded by both application transaction check and SQLite unique constraint (`profileId`).
  ```json
  { "error": "Profile has already been swiped" }
  ```

---

### 3. GET `/api/matches`

Returns confirmed mutual matches ordered chronologically by match date (`matchedAt DESC`).

- **Method:** `GET`
- **URL:** `/api/matches`
- **Query Parameters:**
  - `mock=empty` *(optional, development/testing)*: Returns `[]` to test empty state without modifying the database.

#### Success Response (`200 OK`)
```json
[
  {
    "id": "match_uuid",
    "profileId": "prof_001",
    "matchedAt": "2026-11-20T15:00:00.000Z",
    "profile": {
      "id": "prof_001",
      "name": "Maya Lin",
      "age": 21,
      "photoUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      "bio": "Architecture junior @ UC Berkeley...",
      "city": "Berkeley, CA",
      "college": "UC Berkeley",
      "interests": ["Architecture", "Photography", "Hiking", "Coffee"],
      "createdAt": "2026-11-20T10:00:00.000Z"
    }
  }
]
```

#### Security Guarantee
- Only profiles with a confirmed `Match` record are returned.
- One-sided likes are **never** returned.
- `likedCurrentUser` is completely stripped from the response payload.

---

## Security & Data Privacy

1. **Zero Incoming-Like Leakage:**
   The backend route handlers explicitly omit the internal `likedCurrentUser` database field from all API responses (`/api/feed`, `/api/swipe`, `/api/matches`). Client-side state never has access to incoming like statuses.
2. **Transaction Isolation:**
   Swipes are persisted using `prisma.$transaction`. Simultaneous concurrent swipe attempts are protected via both explicit existence checks and unique index constraints (`@unique`), preventing double matches or duplicate swipes.
3. **No Direct Client Database Access:**
   All client components communicate strictly via Next.js REST API route handlers. The Prisma client is never imported into client-side code.
4. **Environment Isolation:**
   Local SQLite databases (`*.db`, `*.db-journal`, `*.db-wal`) and `.env` files are strictly excluded from version control via `.gitignore`. A safe `.env.example` template is provided for onboarding.

---

## Testing & Quality Verification

All components and endpoints have been thoroughly verified against production build conditions:

```bash
# 1. TypeScript Static Typecheck
npx tsc --noEmit
# Result: 0 errors

# 2. ESLint Validation
npm run lint
# Result: 0 warnings, 0 errors

# 3. Production Build Compilation
npm run build
# Result: Successful compilation, static pages generated cleanly
```
