## What's My ATS?

Personal playground for building an AI-assisted resume scoring assistant that tailors feedback to each target company.

### Tech Stack

- Next.js 14 App Router with TypeScript and React Server Components
- Tailwind CSS with the new `@tailwindcss/postcss` plugin pipeline
- Geist font pairings via `next/font`
- Planned backend: FastAPI + spaCy + sentence-transformers, queued behind Redis/BullMQ

### Getting Started

```bash
npm install
npm run dev
```

The app runs on <http://localhost:3000>. Edit `src/app/page.tsx` for the landing UI or add routes under `src/app`.

### Project Direction

1. Wire a temporary scoring API (mocked) so the upload card can return example scores.
2. Build a dedicated workspace view with resume history and JD comparison.
3. Extract shared UI into `src/components` and compose with shadcn/ui primitives.
4. Split the scoring service into a FastAPI project once heuristics are ready for production.

### Learning Notes

- The home page shows how to combine data-driven Tailwind components with React Server Components.
- Metadata lives in `src/app/layout.tsx`; update it once you add new routes.
- Tailwind classes are available globally because `@import "tailwindcss";` is declared in `globals.css`.
- Landing page mock data lives in `src/database/landing.ts`, making it easy to swap in real API responses later.
- Styling is consolidated in `src/styles/Home.module.css` to keep the JSX free from long utility strings.
