# Features Guide

A detailed overview of every feature in DayFlow.

---

## Dashboard

The Dashboard is the default landing tab. It provides an at-a-glance view of your day.

### Current Activity Card
- Shows the activity you should be doing **right now** based on system time
- Displays the category icon and activity title
- If no activity is scheduled for the current time, shows "Free Time"
- Handles overnight activities (e.g., Sleep from 22:15 to 06:00)

### Next Up
- Shows the next scheduled activity and its start time
- Updates automatically every minute

### Daily Progress
- A percentage showing how many of today's activities you've checked off
- Animated progress bar fills as you complete activities

### Today's Schedule
- Lists all activities for the current day, sorted by start time
- Each card shows:
  - **Category badge** (color-coded with icon)
  - **Time range** (in `HH:mm` format)
  - **Activity title**
- The **current activity** is highlighted with an orange ring
- Completed activities are dimmed with a strikethrough
- Click the circle icon to toggle completion

### Calendar Export
- Click **"Export to Calendar"** to download a `.ics` file
- Contains all of today's activities with titles, times, and categories
- Compatible with Google Calendar, Apple Calendar, and Outlook

---

## Routine Planner

The Planner tab lets you customize your daily routines.

### Day Selector
- Horizontal scrollable row of all 7 days (Mon–Sun)
- Click a day to view/edit that day's routine
- Active day is highlighted

### Activity List
- Shows all activities scheduled for the selected day
- Each item displays: category icon, title, and time range
- Hover over an item to reveal the **delete** button

### Add Activity Dialog
- Click **"+ Add Activity"** to open the dialog
- Fields:
  - **Title** — free text
  - **Start / End time** — time picker (`HH:mm`)
  - **Days** — select one or more days (at least one required)
  - **Category** — grid of 8 category buttons with icons

---

## Analytics

The Analytics tab shows your productivity trends over the past 7 days.

### Summary Cards
| Card        | Description                                    |
| ----------- | ---------------------------------------------- |
| 7-Day Avg   | Average completion percentage over the week     |
| Today       | Current day's completion percentage             |
| Best Day    | Highest completion percentage in the past 7 days|

### Weekly Bar Chart
- Powered by Recharts
- One bar per day (Mon–Sun for the past 7 days)
- Color intensity reflects completion level:
  - **Orange** (today)
  - **Dark orange** (≥70%)
  - **Medium orange** (≥40%)
  - **Light orange** (<40%)
- Tooltip shows exact percentage and count (e.g., "3 of 8 activities")

### Daily Breakdown
- A list showing each day with:
  - Day abbreviation
  - A progress bar
  - Completion count (e.g., "5/8 done")

---

## Settings

Accessible via the gear icon in the header.

| Action                  | What It Does                                                 |
| ----------------------- | ------------------------------------------------------------ |
| Reset Today's Progress  | Unchecks all completed activities for today                  |
| Reset Routine to Default| Replaces custom routine with the built-in default schedule   |

---

## Progressive Web App (PWA)

DayFlow is a PWA, meaning it can be installed on mobile and desktop.

- **Auto-update**: Service worker updates automatically
- **Manifest**:
  - Name: "DayFlow — Smart Daily Planner"
  - Theme color: `#f97316` (orange)
  - Display: standalone (no browser chrome)
  - Icons: 192×192 and 512×512 PNG

To install: visit the app in Chrome/Edge and click "Install" in the address bar or use "Add to Home Screen" on mobile.

---

## Activity Categories

| Category      | Icon      | Color    |
| ------------- | --------- | -------- |
| Exercise      | Dumbbell  | Orange   |
| Study         | BookOpen  | Blue     |
| Work          | Briefcase | Slate    |
| Chores        | Home      | Green    |
| Entertainment | TV        | Purple   |
| Sleep         | Moon      | Indigo   |
| Commute       | Train     | Amber    |
| Other         | Coffee    | Gray     |

---

## Local Storage

All data lives in your browser. Nothing is sent to a server.

- Your routine, progress, and history are saved automatically
- Data persists across page refreshes and browser restarts
- Clearing browser data will reset everything
- Each day's completion history is saved separately for the analytics chart
