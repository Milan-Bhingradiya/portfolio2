# portfolio2 — Milan Bhingradiya

Personal portfolio built with Next.js 14 (App Router), TypeScript and Tailwind CSS.
Dark theme by default (toggle in the header). Projects filterable by AI / Web / App.

## Content: static file + MongoDB

- `data/portfolio.ts` holds the default content and is the fallback.
- If `MONGODB_URI` is set, content is read from MongoDB instead (auto-seeded
  from the static file on first use). Edits in the admin panel save there.

## Environment

Create `.env.local` (never commit it):

```bash
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/portfolio?retryWrites=true&w=majority
ADMIN_PASSWORD=<choose-a-strong-password>
```

## Admin panel

Open `/admin`, enter the admin password, edit profile / projects / experience /
skills / stats, then **Save all**. The homepage updates immediately.

The admin panel also has an **Analytics** section: total visits, unique
visitors, average time per visit, visits today, a 14-day chart, device / browser
/ page / country breakdowns, and a table of recent visits (date, time, page,
device, browser, OS, location, referrer, time spent).

## Analytics (self-hosted, free forever)

Every page view is recorded in your MongoDB (`visits` collection): page,
referrer, device, browser, OS, country/city (via free ip-api.com lookup),
and time spent (beaconed when the tab hides/closes). The footer shows a public
counter: total visits and average time per visit. No third-party service,
no 30-day limit — your data stays in your database.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 (admin at http://localhost:3000/admin).

## Build

```bash
npm run build
npm start
```

## Deploy

Push to GitHub and import into Vercel. Add `MONGODB_URI` and `ADMIN_PASSWORD`
in the Vercel project settings (Environment Variables).
