# StreetTrust Frontend

A polished React + Vite frontend prototype for the StreetTrust inspection and verification platform.

## Run locally

Requirements: Node.js 18+.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Demo

The login is intentionally mock-only for this frontend phase:
- Inspector: any non-empty credentials
- Vendor: any non-empty credentials
- Public user: no login required

The main inspector flow is wired:
Dashboard → Vendors → Vendor Profile → New Inspection → Checklist → Evidence → AI Analysis → Report

The public flow is wired:
Public Verification → Vendor verification page

## Architecture

- `src/main.jsx` — app, routes, reusable components, mock state/data
- `src/styles.css` — design system and responsive UI
- Mock data is centralized near the top of `main.jsx` for this first prototype.

Next step: split the current prototype into folders (`components`, `pages`, `services`, `data`, `types`) and replace mock services with API calls once the backend is ready.
