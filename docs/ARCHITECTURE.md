# Architecture Overview

This document describes the high-level architecture of DayFlow, including the component tree, data flow, and localStorage persistence model.

---

## Tech Stack

| Layer        | Technology                                |
| ------------ | ----------------------------------------- |
| Framework    | React 19 + TypeScript                     |
| Build Tool   | Vite 6                                    |
| Styling      | Tailwind CSS 4 + shadcn/ui components     |
| Animations   | Motion (Framer Motion)                    |
| Charts       | Recharts                                  |
| Date Helpers | date-fns                                  |
| Calendar     | ics (iCalendar export)                    |
| PWA          | vite-plugin-pwa                           |

---

## Project Structure

```
Day-Planner/
├── public/                  # Static assets (PWA icons)
│   ├── pwa-192x192.png
│   └── pwa-512x512.png
├── src/
│   ├── components/ui/       # Reusable shadcn/ui components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── popover.tsx
│   │   ├── scroll-area.tsx
│   │   ├── separator.tsx
│   │   ├── switch.tsx
│   │   └── tabs.tsx
│   ├── lib/
│   │   └── utils.ts         # Tailwind class merge utility (cn)
│   ├── utils/
│   │   └── exportCalendar.ts # ICS calendar export logic
│   ├── App.tsx              # Root component — state, routing, UI
│   ├── Analytics.tsx        # Weekly analytics dashboard
│   ├── SettingsPanel.tsx    # Settings dialog with reset actions
│   ├── types.ts             # Shared TypeScript types & interfaces
│   ├── index.css            # Tailwind + shadcn theme variables
│   └── main.tsx             # React entry point
├── .env.example             # Environment variable template
├── components.json          # shadcn/ui configuration
├── index.html               # HTML entry point
├── metadata.json            # App metadata
├── package.json             # Dependencies & scripts
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite + PWA + Tailwind config
```

---

## Component Tree

```
main.tsx
└── <App />                          # Root — manages all state
    ├── <SettingsPanel />            # Header settings dialog
    └── <Tabs>
        ├── Dashboard Tab
        │   ├── Current Activity Card
        │   ├── Progress Bar
        │   └── Today's Schedule List
        │       └── Activity Cards (with toggle/complete)
        ├── Planner Tab
        │   ├── Day Selector (Mon–Sun)
        │   ├── Add Activity Dialog
        │   └── Routine Item List (with delete)
        └── Analytics Tab
            └── <Analytics />        # Bar chart + stats
```

---

## Data Flow

### State Management

DayFlow uses React's built-in `useState` and `useMemo` hooks — no external state library.

```
┌─────────────────────────────────────────────┐
│                   App.tsx                    │
│                                             │
│  State:                                     │
│  ├── routine: RoutineItem[]                 │
│  ├── completedIds: string[]                 │
│  ├── currentTime: Date                      │
│  ├── plannerDay: DayOfWeek                  │
│  └── isAddingActivity: boolean              │
│                                             │
│  Derived (useMemo):                         │
│  ├── todaysRoutine  (filtered by day)       │
│  ├── currentActivity (by time)              │
│  ├── nextActivity   (by time)               │
│  └── progress       (completion %)          │
│                                             │
│  Props down:                                │
│  ├── Analytics  ← routine                   │
│  └── Settings   ← resetProgress,            │
│                    resetRoutine,             │
│                    clearHistory              │
└─────────────────────────────────────────────┘
```

### localStorage Persistence

All data is stored client-side. No backend or database is involved.

| Key                          | Format                                    | Description                              |
| ---------------------------- | ----------------------------------------- | ---------------------------------------- |
| `dayflow_routine_v2`         | `RoutineItem[]` (JSON)                    | The full routine schedule                |
| `dayflow_completed_v2`       | `{ date: string, ids: string[] }` (JSON)  | Today's completed activity IDs           |
| `dayflow_history_YYYY-MM-DD` | `string[]` (JSON)                         | Historical completion IDs for a past day |

**Write flow:**
1. On every `routine` state change → save to `dayflow_routine_v2`
2. On every `completedIds` change → save to `dayflow_completed_v2` AND `dayflow_history_<today>`
3. On page load → read `dayflow_routine_v2` (or use `DEFAULT_ROUTINE`) and `dayflow_completed_v2` (reset if date mismatch)

---

## Routine Model

Activities are classified into three day types based on default arrays:

| Day Type | Days                       |
| -------- | -------------------------- |
| Office   | Monday, Tuesday, Thursday  |
| Remote   | Wednesday, Friday          |
| Weekend  | Saturday, Sunday           |

Each `RoutineItem` stores which days it applies to in its `days` array, allowing an activity to span multiple day types.

---

## Path Aliases

The project uses `@/` as a path alias mapped to `./src/` (configured in both `vite.config.ts` and `tsconfig.json`).

```ts
import { Button } from "@/components/ui/button";
```
