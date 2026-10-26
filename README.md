# Blockchain UNN website

A responsive implementation of the Home, About, Community, and Events pages in [Blockchain UNN UI on Figma](https://www.figma.com/design/zs2LmP0VuyKC3rkuGc7TER/Blockchain-UNN-UI). The frontend uses plain HTML, CSS, and JavaScript. Small Node handlers serve the event forms and Excel exports, and can run on Vercel or on the VPS.

## Run

```sh
npm run dev
```

Open `http://localhost:3000`. You can choose another port with `PORT=3001 npm run dev`.

```sh
npm run check
npm run build
```

`dist/` contains the static site. Vercel builds with `npm run build` and publishes `dist/`; the root `api/` folder can also be deployed as Vercel Functions. The local development server serves the same API routes. `npm run api` starts only the API on `127.0.0.1:8001`.

Copy `.env.example` to `.env` for local development. `DATABASE_URL` enables Postgres; without it, the handlers fall back to Vercel Blob (when configured) or ignored `.local-data/` files.

## Conference forms and Excel export

- `/register` collects conference attendance. Choosing hackathon participation reveals the track, team (maximum three people), and project idea fields. Virtual-only attendees cannot choose the in-person hackathon.
- `/submit-project` collects final team, project, and link details.
- `/admin` (also `/admin/export`) is the organiser view. It asks for the organiser key, lists registrations and project submissions, and downloads one `.xlsx` file with **Registrations** and **Final submissions** sheets. It is not linked publicly.

Responses are stored in **PostgreSQL** in the `registrations` and `submissions` tables (`db/schema.sql`). Export reads those rows and generates one workbook. If `DATABASE_URL` is absent, the handlers fall back to a private Vercel Blob store when `BLOB_READ_WRITE_TOKEN` or `BLOB_STORE_ID` is set, and to ignored `.local-data/` files for local development.

### Database

```sh
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f db/schema.sql
```

The application role only needs `SELECT`, `INSERT`, and `UPDATE` on the two tables. Keep the database on a private interface when the API runs on the same host.

### VPS deployment

The v5 API runs as the PM2 process `blockathon-api` from `/root/website-v5`, listening on `127.0.0.1:8001`. Nginx serves it over HTTPS at `https://v5-api.blockchainunn.org`. The main site on Vercel proxies `/api/*` to that host through `vercel.json`, so the frontend keeps its own domain. The legacy v3 backend stays on port 8000.

```sh
cd /root/website-v5
git pull
npm ci --omit=dev
pm2 restart blockathon-api
```

Keep production values in `/root/website-v5/.env` (mode 600), never in git:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string |
| `DATABASE_POOL_MAX` | Pool size per process (default `3`) |
| `ALLOWED_ORIGINS` | Comma-separated browser origins allowed to call the API |
| `FORM_EXPORT_KEY` | Required for `/api/export`; generate with `openssl rand -hex 32` |
| `RESEND_API_KEY` | Optional registration confirmation emails |
| `CONFERENCE_FROM_EMAIL` | Verified sender address for Resend |
| `IP_HASH_SALT` | Optional salt for hashing client IPs; leave empty to skip |

The public endpoints validate inputs, use a hidden honeypot field, and reject cross-origin browser submissions. Add rate limiting or a challenge before promoting the forms for a large public campaign. Back up the database and exported workbook regularly, and decide who may access or retain attendee contact details.

## Assets

Original Figma assets are stored in `public/images/figma/`, with their paths and export dimensions in `src/design-assets.js`. Photos are optimized as WebP; logos, artwork and SVG icons retain their exported formats. No temporary Figma asset URLs are needed at runtime. The build copies all image formats used by the pages, including SVG.

The About hero uses the original Figma photo collage in duplicated sequences to loop continuously. The animation pauses for visitors who prefer reduced motion. The Community Hall of Fame includes all six design variants, with scroll, next-card and dot navigation.

Figma exports supply the section icons. Navigation controls also use vendored [Lucide](https://lucide.dev/) SVGs; the team social marks come from [Simple Icons](https://simpleicons.org/). Team LinkedIn and X links currently lead to the platform homepages as requested placeholders; replace the two destinations in `src/main.js` with verified member profiles before launch.

Reference frames: Home desktop `1:3`, Home mobile `170:2`, About `213:183`, Community `440:583`, and Events `899:678`. The other pages adapt their desktop references to smaller screens. Repeated team portraits, partner logos, and event cards follow the repeated content in the design.

The site uses a requested 80% visual scale, controlled by `--site-scale` in `src/style.css`. The Home event flyer uses the Figma crop with narrower side gutters. Partner logos use Figma's 221 × 116 image slots and staggered rows; the square source needs `object-fit: fill` to reproduce the design's proportions.

## Links pending from the team

Project URLs and the contact address are still pending; their buttons currently explain this in a dialog. The Join Community buttons open the community Google Form. Conference registration and project submission have dedicated forms, but production collection requires the private Blob store above. Newsletter submission does not store an email until a mailing service is connected. The current Conference 5.0 poster asset still says **October**, while the supplied registration details say **13–14 November**; replace that poster before public launch. Verify the visible statistics, names, event location, bounty terms, and partner status before publication.
