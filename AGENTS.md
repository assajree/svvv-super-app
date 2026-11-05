# AGENTS.md — Development & Maintenance Guide for AI Agents

Welcome to **svvv_web** (My WebApp Hub). This document provides context, conventions, and operational workflows for AI agents working in this repository.

---

## 📌 Project Overview

- **Purpose**: A sleek, lightweight web application hub / launchpad (macOS Launchpad & Google App Grid aesthetic) to quickly navigate to self-hosted or internal web apps.
- **Tech Stack**:
  - **Framework**: Vite 8 + React 19 + TypeScript (SPA)
  - **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`, CSS Variables)
  - **Icons**: `lucide-react` (with centralized dynamic loader)
  - **E2E / Headless Testing**: Playwright (`@playwright/test` + Chromium)
  - **Platform**: Client-side static single-page app (Zero backend required)
  - **Live URL**: https://assajree.github.io/svvv-super-app/

---

## 🧭 Key Directories & Files

```text
svvv_web/
├── source/                 # 📦 Raw source code / projects to be converted into web apps (git-ignored)
├── src/
│   ├── config/
│   │   └── apps.config.ts      # ⭐️ Single Source of Truth for web apps list & portal metadata
│   ├── components/
│   │   ├── AppTile.tsx         # Launchpad app squircle tile with hover animations & badges
│   │   ├── DynamicIcon.tsx     # Centralized icon resolver (prevents bundle bloat)
│   │   ├── LaunchpadHeader.tsx # Header with real-time clock, theme toggle, and search filter
│   │   ├── LaunchpadGrid.tsx   # Responsive grid of app tiles
│   │   └── LaunchpadFooter.tsx # Footer with config link
│   ├── hooks/
│   │   └── useTheme.ts         # Dark/Light mode state synced with LocalStorage & system pref
│   ├── types/
│   │   └── index.ts            # Type definitions (WebAppItem, AppCategory)
│   ├── lib/
│   │   └── utils.ts            # Classnames merger helper (cn)
│   ├── App.tsx                 # Root UI layout
│   └── index.css               # Tailwind CSS v4 theme variables
├── tests/
│   └── launchpad.spec.ts       # Playwright E2E & headless browser regression tests
├── screenshots/                # Automated screenshot outputs (Light & Dark mode)
├── _start.bat                  # One-click dev server launcher + opens browser
├── _build.bat                  # One-click production builder
├── _test-browser.bat           # One-click headless browser test runner
└── playwright.config.ts        # Playwright test & webServer configuration
```

---

## ⚡ Essential Commands

Always prefer running these standard npm commands:

| Task | Command | Notes |
|---|---|---|
| **Start Dev Server** | `npm run dev` | Runs Vite on `http://localhost:5173` |
| **Run Headless E2E Test** | `npm run test:browser` | Launches headless Chromium, tests UI & asserts 0 console errors |
| **Debug Test with Browser UI** | `npm run test:debug` | Opens Playwright headed inspector |
| **Build for Production** | `npm run build` | Compiles TypeScript and builds optimized bundle into `dist/` |
| **Lint Code** | `npm run lint` | Runs `oxlint` |

---

## 📐 Development Guidelines & Rules for Agents

### 1. Adding or Editing Web Apps
- **Never hardcode apps directly in components**.
- All additions, edits, or removals of web applications **MUST** be made in [`src/config/apps.config.ts`](file:///d:/me/svvv_web/src/config/apps.config.ts).
- Each item must conform to `WebAppItem` in [`src/types/index.ts`](file:///d:/me/svvv_web/src/types/index.ts).

### 2. TypeScript & Imports
- `verbatimModuleSyntax` is enabled in `tsconfig.app.json`.
- **Always** use type-only imports for types:
  ```typescript
  import type { WebAppItem } from '../types' // ✅ Correct
  import { WebAppItem } from '../types'      // ❌ Error TS1484
  ```

### 3. Icon Handling
- Do not import `* as Icons from 'lucide-react'` in app components, as this bundles every Lucide icon (~1MB+).
- Use [`src/components/DynamicIcon.tsx`](file:///d:/me/svvv_web/src/components/DynamicIcon.tsx) or register new icons inside `ICON_MAP` if adding custom Lucide icons.

### 4. Styling & Dark Mode
- Tailwind CSS v4 is used with CSS variables for dark mode.
- Manual class-based dark mode (`.dark`) is enabled via `@custom-variant dark (&:where(.dark, .dark *));` in `src/index.css`.
- Ensure all new components support both Light and Dark themes (`dark:...` variants).
- Maintain the minimalist, clean macOS/iOS squircle aesthetic.

### 5. Verification Protocol
Whenever you make changes to UI or configuration:
1. Run `npm run build` to verify TypeScript types and bundle output.
2. Run `npm run test:browser` to confirm that the headless browser test passes and no console errors are introduced.

### 6. Working with `source/` (Source Code Conversion Workflow)
- **Purpose**: The `source/` directory (`D:\me\svvv_web\source`) is dedicated to storing raw source code, external tools, or legacy repositories (e.g. `Pokemon-Team-Builder-master`) that are intended to be modernized, adapted, or converted into web apps.
- **Git Excluded**: This directory is ignored in `.gitignore` (`/source`) to keep the portal repository lightweight and free from upstream vendor dependencies or large raw assets.
- **Conversion Workflow for Agents**:
  1. Inspect the source project under `source/<project-name>` to identify its tech stack, entry point, dependencies, and build requirements.
  2. Modernize/convert the project into a web-accessible application (e.g. static SPA, standalone micro-app, or hosted service).
  3. Register the new web application inside [`src/config/apps.config.ts`](file:///d:/me/svvv_web/src/config/apps.config.ts) with appropriate title, description, URL, Lucide icon, category, and badge.
  4. Run `npm run build` and `npm run test:browser` to verify the portal displays the new app tile correctly.
