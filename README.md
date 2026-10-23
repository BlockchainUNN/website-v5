# Blockchain UNN website

A responsive implementation of the Home, About, Community, and Events pages in [Blockchain UNN UI on Figma](https://www.figma.com/design/zs2LmP0VuyKC3rkuGc7TER/Blockchain-UNN-UI). The frontend uses plain HTML, CSS, and JavaScript. Small serverless functions handle event forms and Excel exports.

## Run

```sh
npm run dev
```

Open `http://localhost:3000`. You can choose another port with `PORT=3001 npm run dev`.

```sh
npm run check
npm run build
```

`dist/` contains the static site. Vercel builds with `npm run build`, publishes `dist/`, and deploys the root `api/` folder as Functions. The local development server serves the same API routes.

## Conference forms and Excel export

- `/register` collects conference attendance. Choosing hackathon participation reveals the track, team (maximum three people), and project idea fields. Virtual-only attendees cannot choose the in-person hackathon.
- `/submit-project` collects final team, project, and link details.
- `/admin/export` downloads one `.xlsx` file with **Registrations** and **Final submissions** sheets after the organiser enters the export key. This page is not linked publicly.

No database is used. Each response is saved as a separate immutable JSON object in a **private Vercel Blob store**. A single `.xlsx` file cannot be safely appended to by concurrent serverless requests, and files written inside a Vercel Function do not persist. Export generates the workbook from the saved objects. Local development saves test responses in ignored `.local-data/` instead.

### Production setup

1. In the linked Vercel project, create a **Private** Blob store under Storage and connect it to the Production environment. The project needs `BLOB_READ_WRITE_TOKEN` (or the supported Blob OIDC configuration). Never use a public Blob store for attendee details.
2. Generate a long random organiser key (for example, `openssl rand -hex 32`) and set it as the Vercel environment variable `FORM_EXPORT_KEY`. Give the key only to organisers. It is required for the Excel download.
3. To send automated registration confirmations, set `RESEND_API_KEY` and `CONFERENCE_FROM_EMAIL` (an address on a verified sending domain). Records still save if email is not configured or delivery fails; the success screen only claims an email was sent when the provider accepts it.
4. Redeploy, submit one test registration and one test project, then download the workbook at `/admin/export` and check both sheets. Remove test records from the private store before opening registration to the public.

The public endpoints validate inputs, use a honeypot field, and reject cross-origin browser submissions. Add a Vercel Firewall rate limit or challenge before promoting the forms for a large public campaign. Back up the exported workbook regularly and decide who may access or retain attendee contact details.

## Assets

Original Figma assets are stored in `public/images/figma/`, with their paths and export dimensions in `src/design-assets.js`. Photos are optimized as WebP; logos, artwork and SVG icons retain their exported formats. No temporary Figma asset URLs are needed at runtime. The build copies all image formats used by the pages, including SVG.

The About hero uses the original Figma photo collage in duplicated sequences to loop continuously. The animation pauses for visitors who prefer reduced motion. The Community Hall of Fame includes all six design variants, with scroll, next-card and dot navigation.

Figma exports supply the section icons. Navigation controls also use vendored [Lucide](https://lucide.dev/) SVGs; the team social marks come from [Simple Icons](https://simpleicons.org/). Team LinkedIn and X links currently lead to the platform homepages as requested placeholders; replace the two destinations in `src/main.js` with verified member profiles before launch.

Reference frames: Home desktop `1:3`, Home mobile `170:2`, About `213:183`, Community `440:583`, and Events `899:678`. The other pages adapt their desktop references to smaller screens. Repeated team portraits, partner logos, and event cards follow the repeated content in the design.

The site uses a requested 80% visual scale, controlled by `--site-scale` in `src/style.css`. The Home event flyer uses the Figma crop with narrower side gutters. Partner logos use Figma's 221 × 116 image slots and staggered rows; the square source needs `object-fit: fill` to reproduce the design's proportions.

## Links pending from the team

Community invite, project URLs, and contact address are pending. Their buttons currently explain this in a dialog. Conference registration and project submission have dedicated forms, but production collection requires the private Blob store above. Newsletter submission does not store an email until a mailing service is connected. The current Conference 5.0 poster asset still says **October**, while the supplied registration details say **13–14 November**; replace that poster before public launch. Verify the visible statistics, names, event location, bounty terms, and partner status before publication.
