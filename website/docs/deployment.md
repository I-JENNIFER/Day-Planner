---
sidebar_position: 5
---

# Deployment

How to deploy DayFlow to production.

---

## Prerequisites

- Node.js 18+
- npm 9+
- A GitHub account (for CI/CD integrations)

---

## Environment Variables

See `.env.example` for the full list.

| Variable         | Required | Description                                                    |
| ---------------- | -------- | -------------------------------------------------------------- |
| `GEMINI_API_KEY`  | No*     | API key for Gemini AI features (AI Studio injects automatically)|
| `APP_URL`         | No*     | The URL where the app is hosted (auto-injected by AI Studio)    |

> *These variables are used by AI Studio at runtime. For standard deployments, DayFlow works entirely client-side with no API keys required.

---

## Build

```bash
npm install
npm run build
npm run preview  # Optional: preview locally
```

Output is written to `dist/` — a static site that can be served from any host.

---

## Vercel (Recommended)

DayFlow is currently deployed at [day-planner-olive.vercel.app](https://day-planner-olive.vercel.app).

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → sign in with GitHub
3. **Add New Project** → Import `Day-Planner`
4. Verify settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **Deploy**

Every push to `main` triggers a production deployment. PRs get preview URLs.

---

## Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. **Add new site** → **Import an existing project**
3. Connect your GitHub repo
4. Set build command: `npm run build`, publish directory: `dist`
5. Deploy

---

## GitHub Pages

1. Update `vite.config.ts`:
   ```ts
   export default defineConfig({
     base: '/Day-Planner/',
     // ... rest of config
   })
   ```
2. Add a deploy script:
   ```json
   "deploy": "npm run build && npx gh-pages -d dist"
   ```
3. Run `npm run deploy`

---

## Manual / Self-Hosted

```bash
npm run build
npx serve dist
# or copy dist/ to your web server root
```

---

## PWA Notes

- Service worker is generated at build time by `vite-plugin-pwa`
- HTTPS is required for PWA install prompt in production
- Update `scope` and `start_url` in `vite.config.ts` for custom domains
