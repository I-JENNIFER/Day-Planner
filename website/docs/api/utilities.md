---
sidebar_position: 3
---

# Utilities

Documentation for utility functions in DayFlow.

---

## cn (Class Name Merger)

**File:** `src/lib/utils.ts`

```ts
function cn(...inputs: ClassValue[]): string
```

Merges Tailwind CSS class names, resolving conflicts via `tailwind-merge` and supporting conditional classes via `clsx`.

### Usage

```tsx
import { cn } from "@/lib/utils";

<div className={cn(
  "p-4 rounded-lg",
  isActive && "bg-orange-500",
  isDisabled ? "opacity-50" : "opacity-100"
)} />
```

---

## exportToICS

**File:** `src/utils/exportCalendar.ts`

```ts
function exportToICS(activities: {
  title: string;
  startTime: string;
  endTime: string;
  category: string;
}[]): void
```

Exports a list of activities as an `.ics` calendar file and triggers a browser download.

### Parameters

| Parameter    | Type     | Description                             |
| ------------ | -------- | --------------------------------------- |
| `activities` | `array`  | Array of activity objects to export     |

Each activity must have:
- `title` — Activity name
- `startTime` — Start time in `HH:mm` format
- `endTime` — End time in `HH:mm` format
- `category` — Category string (used in event description)

### How It Works

1. Converts each activity's time strings to ICS-compatible date-time tuples using today's date
2. Creates calendar events using the [`ics`](https://www.npmjs.com/package/ics) library
3. Generates a Blob from the ICS content
4. Creates a temporary download link and triggers the download
5. The file is named `dayflow-schedule.ics`

### Example

```ts
exportToICS([
  {
    title: 'Morning Exercise',
    startTime: '06:00',
    endTime: '07:00',
    category: 'exercise'
  },
  {
    title: 'Work at Office',
    startTime: '09:15',
    endTime: '18:30',
    category: 'work'
  }
]);
```

### Compatibility

The exported `.ics` file is compatible with:
- Google Calendar
- Apple Calendar (macOS / iOS)
- Microsoft Outlook
- Any iCalendar-compliant application

---

## timeToArray (internal)

**File:** `src/utils/exportCalendar.ts`

```ts
function timeToArray(
  dateObj: Date,
  timeStr: string
): [number, number, number, number, number]
```

Converts a `HH:mm` time string into an ICS-compatible 5-element date-time tuple `[year, month, day, hour, minute]`.

This is an internal helper used by `exportToICS` and is not exported.
