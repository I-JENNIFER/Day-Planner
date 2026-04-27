/**
 * Supported activity categories for routine items.
 * Each category has an associated icon and color scheme defined in `App.tsx`.
 */
export type ActivityCategory = 'exercise' | 'study' | 'work' | 'chores' | 'entertainment' | 'sleep' | 'other' | 'commute';

/**
 * Days of the week used for scheduling routine items.
 */
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

/**
 * Represents a single scheduled activity in a user's routine.
 *
 * Routine items are persisted in `localStorage` under the key `dayflow_routine_v2`.
 */
export interface RoutineItem {
  /** Unique identifier, generated via `Math.random().toString(36)`. */
  id: string;
  /** Display name of the activity. */
  title: string;
  /** Start time in 24-hour `HH:mm` format. */
  startTime: string;
  /** End time in 24-hour `HH:mm` format. May be earlier than `startTime` for overnight activities. */
  endTime: string;
  /** The category this activity belongs to. */
  category: ActivityCategory;
  /** Whether the activity has been marked complete for the current day. */
  isCompleted?: boolean;
  /** Which days of the week this activity is scheduled on. */
  days: DayOfWeek[];
}

/**
 * Groups routine items by day type (weekday or weekend).
 */
export interface DayRoutine {
  /** Whether this routine applies to weekdays or weekends. */
  type: 'weekday' | 'weekend';
  /** The list of activities in this routine group. */
  items: RoutineItem[];
}

/**
 * User preferences stored in localStorage.
 */
export interface UserSettings {
  /** The user's display name. */
  userName: string;
  /** Preferred wake-up time in `HH:mm` format. */
  wakeUpTime: string;
  /** Preferred sleep time in `HH:mm` format. */
  sleepTime: string;
}
