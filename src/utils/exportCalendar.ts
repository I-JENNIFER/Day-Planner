import { createEvents, EventAttributes } from 'ics';

/**
 * Converts a `HH:mm` time string into an ICS-compatible date-time tuple.
 *
 * @param dateObj - The base date to extract year/month/day from.
 * @param timeStr - Time in `HH:mm` format.
 * @returns A 5-element tuple `[year, month, day, hour, minute]` used by the `ics` library.
 */
function timeToArray(dateObj: Date, timeStr: string): [number, number, number, number, number] {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return [
    dateObj.getFullYear(),
    dateObj.getMonth() + 1,
    dateObj.getDate(),
    hours,
    minutes,
  ];
}

/**
 * Exports a list of activities as an `.ics` calendar file and triggers a browser download.
 *
 * Uses the {@link https://www.npmjs.com/package/ics | ics} library to generate
 * iCalendar-compliant event data. The resulting file (`dayflow-schedule.ics`) can be
 * imported into Google Calendar, Apple Calendar, Outlook, and other calendar apps.
 *
 * @param activities - Array of activities to export. Each must have `title`,
 *   `startTime` (HH:mm), `endTime` (HH:mm), and `category`.
 *
 * @example
 * ```ts
 * exportToICS([
 *   { title: 'Morning Exercise', startTime: '06:00', endTime: '07:00', category: 'exercise' }
 * ]);
 * ```
 */
export function exportToICS(activities: { title: string; startTime: string; endTime: string; category: string }[]) {
  const today = new Date();

  const events: EventAttributes[] = activities.map((activity) => ({
    title: activity.title,
    start: timeToArray(today, activity.startTime),
    end: timeToArray(today, activity.endTime),
    description: `Category: ${activity.category}`,
    categories: [activity.category],
  }));

  createEvents(events, (error, value) => {
    if (error) {
      console.error('Export failed:', error);
      return;
    }
    const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dayflow-schedule.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
}