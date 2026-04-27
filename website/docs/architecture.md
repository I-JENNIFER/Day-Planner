---
sidebar_position: 2
---

# Architecture

This document describes the high-level architecture of DayFlow, including the component tree, data flow, and localStorage persistence model.

---

## Project Structure

```
Day-Planner/
├── public/                  # Static assets (PWA icons)
├── src/
│   ├── components/ui/       # Reusable shadcn/ui components
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
├── docs/                    # Markdown documentation
├── website/                 # This Docusaurus docs site
├── .env.example             # Environment variable template
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

## State Management

DayFlow uses React's built-in `useState` and `useMemo` hooks — no external state library.

### State in `App.tsx`

| State              | Type             | Description                           |
| ------------------ | ---------------- | ------------------------------------- |
| `routine`          | `RoutineItem[]`  | Full routine schedule                 |
| `completedIds`     | `string[]`       | IDs of activities completed today     |
| `currentTime`      | `Date`           | Current time (updates every minute)   |
| `plannerDay`       | `DayOfWeek`      | Selected day in the Planner tab       |
| `isAddingActivity` | `boolean`        | Whether the Add Activity dialog is open|

### Derived Values (useMemo)

| Value             | Computed From            | Description                          |
| ----------------- | ----------------------- | ------------------------------------ |
| `todaysRoutine`   | `routine`, `currentDay` | Filtered & sorted activities for today|
| `currentActivity` | `todaysRoutine`, `time` | Activity happening right now          |
| `nextActivity`    | `todaysRoutine`, `time` | Next scheduled activity               |
| `progress`        | `todaysRoutine`, `completedIds` | Completion percentage        |

---

## Data Persistence

All data is stored client-side using `localStorage`. No backend or database is involved.

### localStorage Keys

| Key                          | Format                                    | Description                              |
| ---------------------------- | ----------------------------------------- | ---------------------------------------- |
| `dayflow_routine_v2`         | `RoutineItem[]` (JSON)                    | The full routine schedule                |
| `dayflow_completed_v2`       | `{ date: string, ids: string[] }` (JSON)  | Today's completed activity IDs           |
| `dayflow_history_YYYY-MM-DD` | `string[]` (JSON)                         | Historical completion IDs for a past day |

### Write Flow

1. On every `routine` state change → save to `dayflow_routine_v2`
2. On every `completedIds` change → save to `dayflow_completed_v2` AND `dayflow_history_<today>`
3. On page load → read `dayflow_routine_v2` (or use `DEFAULT_ROUTINE`) and `dayflow_completed_v2` (reset if date mismatch)

---

## Routine Model

Activities are classified into three day types:

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
