---
sidebar_position: 2
---

# Components

Documentation for DayFlow's main application components.

---

## App

**File:** `src/App.tsx`

The root component that manages all top-level state and renders the three-tab layout.

### State

| State              | Type             | Description                            |
| ------------------ | ---------------- | -------------------------------------- |
| `routine`          | `RoutineItem[]`  | Full routine schedule                  |
| `completedIds`     | `string[]`       | IDs of activities completed today      |
| `currentTime`      | `Date`           | Current time, updates every 60 seconds |
| `plannerDay`       | `DayOfWeek`      | Selected day in the Planner tab        |
| `isAddingActivity` | `boolean`        | Add Activity dialog open state         |

### Key Functions

| Function          | Description                                           |
| ----------------- | ----------------------------------------------------- |
| `toggleComplete`  | Toggles an activity's completion status for today      |
| `addActivity`     | Creates a new `RoutineItem` and adds it to the routine |
| `deleteActivity`  | Removes an activity from the routine by ID             |
| `resetProgress`   | Clears all completion checkmarks for today             |
| `resetRoutine`    | Resets the routine to `DEFAULT_ROUTINE`                |
| `clearHistory`    | Removes all `dayflow_history_*` keys from localStorage |

### Constants

| Constant          | Description                                         |
| ----------------- | --------------------------------------------------- |
| `CATEGORY_ICONS`  | Maps each `ActivityCategory` to a Lucide icon       |
| `CATEGORY_COLORS` | Maps each `ActivityCategory` to Tailwind CSS classes|
| `DAYS`            | Array of all 7 days of the week                     |
| `OFFICE_DAYS`     | Default office days: Mon, Tue, Thu                   |
| `REMOTE_DAYS`     | Default remote days: Wed, Fri                        |
| `WEEKEND_DAYS`    | Weekend days: Sat, Sun                               |
| `DEFAULT_ROUTINE` | The built-in routine with Office/Remote/Weekend schedules |

---

## Analytics

**File:** `src/Analytics.tsx`

Displays a 7-day analytics dashboard with completion statistics and charts.

### Props

| Prop      | Type            | Description                                              |
| --------- | --------------- | -------------------------------------------------------- |
| `routine` | `RoutineItem[]` | The full routine array, used to calculate scheduled counts |

### What It Renders

- **3 summary cards**: 7-day average, today's completion, best day
- **Bar chart** (Recharts): daily completion rates with color-coded bars
- **Daily breakdown**: list with progress bars and completion counts

### Data Source

Reads from `localStorage`:
- `dayflow_completed_v2` for today's data
- `dayflow_history_<YYYY-MM-DD>` for past days

---

## SettingsPanel

**File:** `src/SettingsPanel.tsx`

A dialog-based settings panel accessible from the header gear icon.

### Props

| Prop              | Type         | Description                                        |
| ----------------- | ------------ | -------------------------------------------------- |
| `onResetProgress` | `() => void` | Callback to clear today's completion checkmarks     |
| `onResetRoutine`  | `() => void` | Callback to reset routine to defaults               |
| `onClearHistory`  | `() => void` | Callback to remove historical completion data       |

### Actions

| Button                   | Effect                                            |
| ------------------------ | ------------------------------------------------- |
| Reset Today's Progress   | Calls `onResetProgress`, closes dialog             |
| Reset Routine to Default | Calls `onResetRoutine`, closes dialog              |

---

## UI Components (shadcn/ui)

Located in `src/components/ui/`, these are reusable primitives from the [shadcn/ui](https://ui.shadcn.com/) library:

| Component    | File             | Usage                                  |
| ------------ | ---------------- | -------------------------------------- |
| `Badge`      | `badge.tsx`      | Category labels, day tags              |
| `Button`     | `button.tsx`     | Actions, toggles, navigation           |
| `Calendar`   | `calendar.tsx`   | Date picker (available for future use) |
| `Card`       | `card.tsx`       | Activity cards, stat cards             |
| `Checkbox`   | `checkbox.tsx`   | Multi-select inputs                    |
| `Dialog`     | `dialog.tsx`     | Add Activity, Settings modals          |
| `Input`      | `input.tsx`      | Text and time inputs                   |
| `Label`      | `label.tsx`      | Form field labels                      |
| `Popover`    | `popover.tsx`    | Dropdown overlays                      |
| `ScrollArea` | `scroll-area.tsx`| Scrollable planner list                |
| `Separator`  | `separator.tsx`  | Visual dividers in settings            |
| `Switch`     | `switch.tsx`     | Toggle switches                        |
| `Tabs`       | `tabs.tsx`       | Dashboard / Planner / Analytics tabs   |
