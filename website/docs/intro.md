---
sidebar_position: 1
slug: /intro
---

# Getting Started

Welcome to the **DayFlow** documentation! DayFlow is a modern, minimal daily planner that helps you build consistent routines and track your productivity over time.

**Live Demo** → [day-planner-olive.vercel.app](https://day-planner-olive.vercel.app)

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/I-JENNIFER/Day-Planner.git

# Navigate into the project
cd Day-Planner

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Tech Stack

| Layer        | Technology                     |
| ------------ | ------------------------------ |
| Framework    | React 19 + TypeScript          |
| Build Tool   | Vite 6                         |
| Styling      | Tailwind CSS 4 + shadcn/ui    |
| Animations   | Motion (Framer Motion)         |
| Charts       | Recharts                       |
| Date Helpers | date-fns                       |
| Calendar     | ics (iCalendar export)         |
| PWA          | vite-plugin-pwa                |

---

## Available Scripts

| Script           | Description                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Start dev server on port 3000       |
| `npm run build`  | Build for production                |
| `npm run preview`| Preview the production build locally|
| `npm run clean`  | Remove the `dist/` directory        |
| `npm run lint`   | Run TypeScript type checking        |

---

## Next Steps

- **[Architecture](./architecture)** — Understand the component tree and data flow
- **[Features](./features)** — Detailed guide to every feature
- **[API Reference](./api/types)** — TypeScript types and component docs
- **[Deployment](./deployment)** — Deploy to Vercel, Netlify, or GitHub Pages
- **[Contributing](./contributing)** — How to contribute to DayFlow
