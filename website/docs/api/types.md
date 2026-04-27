---
sidebar_position: 1
---

# Types & Interfaces

All shared TypeScript types are defined in `src/types.ts`.

---

## ActivityCategory

```ts
type ActivityCategory =
  | 'exercise'
  | 'study'
  | 'work'
  | 'chores'
  | 'entertainment'
  | 'sleep'
  | 'other'
  | 'commute';
```

Supported activity categories. Each has an associated icon (`CATEGORY_ICONS`) and color scheme (`CATEGORY_COLORS`) defined in `App.tsx`.

---

## DayOfWeek

```ts
type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';
```

Days of the week used for scheduling routine items.

---

## RoutineItem

```ts
interface RoutineItem {
  id: string;
  title: string;
  startTime: string;  // HH:mm format
  endTime: string;    // HH:mm format
  category: ActivityCategory;
  isCompleted?: boolean;
  days: DayOfWeek[];
}
```

Represents a single scheduled activity in a user's routine.

| Field         | Type               | Description                                                     |
| ------------- | ------------------ | --------------------------------------------------------------- |
| `id`          | `string`           | Unique ID generated via `Math.random().toString(36).substr(2,9)` |
| `title`       | `string`           | Display name of the activity                                     |
| `startTime`   | `string`           | Start time in 24-hour `HH:mm` format                            |
| `endTime`     | `string`           | End time in `HH:mm` format (may be < startTime for overnight)   |
| `category`    | `ActivityCategory` | The category this activity belongs to                            |
| `isCompleted` | `boolean?`         | Whether the activity is marked complete for today                |
| `days`        | `DayOfWeek[]`      | Which days of the week this activity is scheduled on             |

Routine items are persisted in `localStorage` under the key `dayflow_routine_v2`.

---

## DayRoutine

```ts
interface DayRoutine {
  type: 'weekday' | 'weekend';
  items: RoutineItem[];
}
```

Groups routine items by day type.

---

## UserSettings

```ts
interface UserSettings {
  userName: string;
  wakeUpTime: string;  // HH:mm
  sleepTime: string;   // HH:mm
}
```

User preferences (reserved for future use).
