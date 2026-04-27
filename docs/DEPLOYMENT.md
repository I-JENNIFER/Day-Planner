# Deployment Guide

How to deploy DayFlow to production. This guide covers Vercel (recommended), Netlify, and manual static hosting.

---

## Prerequisites

- Node.js 18+ installed
- npm 9+ installed
- A GitHub account (for CI/CD integrations)

---

## Environment Variables

See `.env.example` for the full list.

| Variable        | Required | Description                                        |
| --------------- | -------- | -------------------------------------------------- |
| `GEMINI_API_KEY` | No*     | API key for Gemini AI features (AI Studio injects this automatically) |
| `APP_URL`        | No*     | The URL where the app is hosted (auto-injected by AI Studio)           |

> *These variables are used by AI Studio at runtime. For standard deployments, DayFlow works entirely client-side with no API keys required.

---

## Build

```bash
# Install dependencies
npm install

# Run the production build
npm run build

# Preview the build locally
npm run preview
```

The build output is written to `dist/`. This is a static site — it can be served from any static file host.

---

## Option 1: Vercel (Recommended)

DayFlow is currently deployed on Vercel at [day-planner-olive.vercel.app](https://day-planner-olive.vercel.app).

### Steps

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"Add New Project"** → Import the `Day-Planner` repo
4. Vercel auto-detects Vite. Verify these settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**

### Automatic Deployments
- Every push to `main` triggers a production deployment
- Pull requests get preview deployments with unique URLs

---

## Option 2: Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your GitHub repo
4. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Deploy

---

## Option 3: GitHub Pages

1. Install the GitHub Pages plugin:
   ```bash
   npm install -D vite-plugin-gh-pages
   ```
2. Update `vite.config.ts` to set the base path:
   ```ts
   export default defineConfig({
     base: '/Day-Planner/',
     // ... rest of config
   })
   ```
3. Add a deploy script to `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && npx gh-pages -d dist"
   }
   ```
4. Run `npm run deploy`

---

## Option 4: Manual / Self-Hosted

Since DayFlow is a static site, you can host the `dist/` folder on any web server:

```bash
# Build
npm run build

# Serve with any static server
npx serve dist
# or
python3 -m http.server -d dist 8080
# or copy dist/ to your Nginx/Apache web root
```

---

## PWA Considerations

- The service worker is generated at build time by `vite-plugin-pwa`
- For HTTPS: The PWA install prompt and service worker require HTTPS in production
- For custom domains: Update the `scope` and `start_url` in `vite.config.ts` if needed

---

## Useful Scripts

| Script           | Description                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Start dev server on port 3000       |
| `npm run build`  | Build for production                |
| `npm run preview`| Preview the production build locally|
| `npm run clean`  | Remove the `dist/` directory        |
| `npm run lint`   | Run TypeScript type checking        |
