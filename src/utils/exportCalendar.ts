import { createEvents, EventAttributes } from 'ics';

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