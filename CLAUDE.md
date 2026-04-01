# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**IMPORTANT: Always read this file at the start of every conversation and follow all rules strictly.**

## Rules

### Naming Conventions
- Files inside `lib/` and `hooks/` directories MUST use kebab-case (`get-url.ts`, `is-dev.ts`, `use-electron.ts`). No camelCase or PascalCase.

### SOLID Principles
All code in this project MUST follow the SOLID principles:
- **Single Responsibility**: Each module/class/function does one thing. IPC handlers, protocol logic, and window management are separate files.
- **Open/Closed**: Extend behavior through new modules, not by modifying existing ones.
- **Liskov Substitution**: Subtypes must be substitutable for their base types.
- **Interface Segregation**: Keep interfaces small and specific. The preload API exposes only what the renderer needs.
- **Dependency Inversion**: Depend on abstractions, not concretions. High-level modules should not depend on low-level implementation details.

### Maintaining This File
After every significant code change (new features, architectural changes, new IPC channels, new dependencies, config changes), update this CLAUDE.md to reflect the current state. This file must always be an accurate reference of the project.

---

## Project Overview

Electron 41 + React 19 + TypeScript 6 desktop app boilerplate using Vite 8 for the renderer process and esbuild for the main process, styled with Tailwind CSS 4. Uses **bun** as the package manager and runtime.

## Commands

- `bun install` - Install dependencies
- `bun run electron:dev` - Full dev mode (Vite dev server + esbuild watch + electronmon)
- `bun run dev` - Vite renderer dev server only (no Electron)
- `bun run build` - Production build (renderer via Vite + main via esbuild)
- `bun run lint` - ESLint
- `bun run dist` - Build + package with electron-builder

## Architecture

Two separate processes with separate build pipelines and tsconfigs:

### Main Process (`main/`)
- `main/index.ts` - Thin orchestrator: protocol setup, window creation, IPC registration
- `main/preload.ts` - Context bridge exposing `window.electron` API to renderer
- `main/lib/create-window.ts` - BrowserWindow factory with fullscreen titlebar toggle
- `main/lib/register-ipc.ts` - IPC handler registration (receives `BrowserWindow` via DI)
- `main/lib/handle-protocol.ts` - Custom `app://` protocol using `protocol.handle` + `net.fetch`
- `main/lib/get-url.ts` - URL routing: `localhost:5173` in dev, `app://` in production
- `main/lib/is-dev.ts` - Dev detection via `ELECTRON_IS_DEV` env or `app.isPackaged`
- `main/lib/buttons/` - Window control handlers (minimize, maximize) — receive `BrowserWindow` as parameter
- Built by esbuild (`esbuild.config.mjs`) to CJS (`.cjs`) in `app/`
- Path alias: `@core/*` → `main/*`
- Has its own tsconfig at `main/tsconfig.json`

### Renderer Process (`src/`)
- `src/main.tsx` - React entry point
- `src/App.tsx` - Root component
- `src/electron.ts` - Type declarations for `window.electron` (the preload API)
- `src/components/` - Header, CloseButtons, ThemeToggle, Placeholder
- `src/hooks/` - Custom hooks decoupling logic from components:
  - `use-electron.ts` - Centralized access to `window.electron` API
  - `use-titlebar.ts` - Titlebar visibility via IPC listener
  - `use-theme.ts` - Dark/light mode toggle with `localStorage` persistence
  - `use-system-info.ts` - System info fetched via IPC
- `src/lib/` - Utilities (`platform-names.ts`)
- Built by Vite to `app/renderer/`
- Path alias: `@/*` → `src/*`
- Uses `tsconfig.renderer.json` and `tsconfig.vite.json` (referenced from root `tsconfig.json`)

### IPC Type Safety
The renderer types for `window.electron` are derived directly from the preload script. `src/electron.ts` imports `typeof api` from `main/preload.ts` and declares it on `Window`. This means the preload is the **single source of truth** for the IPC API — any new method added to the `api` object in `main/preload.ts` is automatically typed in the renderer. Do not duplicate IPC types manually.

### IPC Channels

| Channel | Type | Description |
|---------|------|-------------|
| `app:minimize` | send | Minimize the window |
| `app:maximize` | send | Toggle maximize/restore |
| `app:close` | send | Quit the app |
| `app:system-info` | invoke | Returns platform, arch, Electron/Chrome/Node/App versions |
| `toggle-titlebar` | main→renderer | Show/hide titlebar on fullscreen toggle |

### Tailwind (v4, CSS-first)
- No `tailwind.config.js` — configured entirely in `src/styles/index.css` using `@theme`, `@variant`, and `@utility` directives
- Dark mode via `@variant dark (&:where(.dark, .dark *));` (class-based, matches `<html class="dark">`)
- Custom colors: `main-onyx` (#0f0f0f), `main-obsidian` (#1a1a1a), `divider-dark` (#2a2a2a), `light-bg` (#f7f7f7), `light-hover` (#eaeaea), `close-red` (#ff0000dd)
- Custom utilities: `drag`, `no-drag` (Electron window drag regions)
- Uses `@tailwindcss/vite` plugin instead of PostCSS

### Build Output
- `app/` - Runtime output (main process `.cjs` + renderer build)
- `dist/` - Packaged electron-builder output
