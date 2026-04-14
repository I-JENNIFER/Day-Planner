export type ActivityCategory = 'exercise' | 'study' | 'work' | 'chores' | 'entertainment' | 'sleep' | 'other' | 'commute';

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface RoutineItem {
  id: string;
  title: string;
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  category: ActivityCategory;
  isCompleted?: boolean;
  days: DayOfWeek[];
}

export interface DayRoutine {
  type: 'weekday' | 'weekend';
  items: RoutineItem[];
}

export interface UserSettings {
  userName: string;
  wakeUpTime: string;
  sleepTime: string;
}
