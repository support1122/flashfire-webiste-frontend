# Copilot Instructions for FlashFire Frontend

## Project Overview
This is a Vite + React + TypeScript web application for FlashFire. The frontend is structured for modularity and rapid feature development, with a focus on clear separation of UI components, utility logic, and server integration.

## Architecture & Key Patterns
- **Entry Points:**
  - `src/main.tsx` bootstraps the app and mounts `App.tsx`.
  - Routing is managed in `src/components/Router.tsx`.
- **Component Structure:**
  - All major UI components are in `src/components/`. Each file is a self-contained React component, often using props for data flow.
  - Example: `Hero.tsx` is a top-level landing section; `Blog.tsx` and `IndividualBlog.tsx` handle blog rendering.
- **Data & Utilities:**
  - Static data (e.g., blog posts) is in `src/BLogsData.ts`.
  - Utility functions (e.g., analytics, popups) are in `src/utils/`.
- **Styling:**
  - Uses Tailwind CSS (`tailwind.config.js`, `postcss.config.js`). Global styles in `src/index.css`.
- **Backend Integration:**
  - Any server communication is handled via REST endpoints defined in `server/server.js`.
  - No API client abstraction layer; fetch directly in components as needed.

## Developer Workflows
- **Build & Run:**
  - Use Vite for local development: `npm run dev` (see `package.json`).
  - Production build: `npm run build`.
- **Linting:**
  - ESLint config in `eslint.config.js`. Run with `npm run lint`.
- **No formal test suite** is present; manual testing is typical.

## Conventions & Patterns
- **Component Naming:**
  - PascalCase for React components; file name matches exported component.
- **Props & State:**
  - Props are typed with TypeScript interfaces.
  - State is managed locally in components; no global state management.
- **Routing:**
  - Custom router logic in `Router.tsx` (not using React Router).
- **Modals & Popups:**
  - Modal logic is handled in dedicated components (e.g., `SignupModal.tsx`, `CalendlyModal.tsx`).
- **Analytics:**
  - Google Tag logic in `utils/GTagUTM.ts`.

## External Dependencies
- **Tailwind CSS** for styling.
- **Vite** for build tooling.
- **No Redux, MobX, or other state libraries.**

## Example Patterns
- To add a new page, create a component in `src/components/`, then update `Router.tsx` to include the route.
- For new popups, use the pattern in `utils/PopupNotifications.ts` and connect to a modal component.

## Key Files
- `src/App.tsx`, `src/main.tsx`, `src/components/Router.tsx`, `src/BLogsData.ts`, `src/utils/PopupNotifications.ts`, `server/server.js`

---
_If any conventions or workflows are unclear, please ask for clarification or provide examples from the codebase to improve these instructions._
