# KaroWork — Student Jobs & Employer Portal

KaroWork is a modern, premium job portal for students and employers. Students can discover curated roles and save jobs; employers can post jobs and manage applications from a polished dashboard.

## Tech Stack

- Vite + React + TypeScript
- React Router v6
- Tailwind CSS + shadcn/ui
- Radix UI primitives

## Getting Started

Prerequisites: Node.js 18+ and npm or bun.

```bash
pnpm i # or npm i / bun install
pnpm dev # or npm run dev / bun run dev
```

Open http://localhost:8080 in your browser.

## Scripts

- `dev` — start the dev server
- `build` — build for production
- `preview` — preview the production build locally
- `lint` — run ESLint

## Features

- Role-based experience: Student vs Employer
- Employers: Dashboard, Post Job, Manage Jobs, Applications, Interviews
- Students: Browse jobs, Save jobs, Apply with role checks
- Local session persistence using Context + localStorage

## Notes

- Authentication is mocked (role selection only) for demo purposes.
- Replace mocked persistence with a backend when ready.

## License

MIT
