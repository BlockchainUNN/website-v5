# Blockchain UNN

A responsive, dependency-free community website built from the supplied Home, About, Community, and Events design references, with refined typography and lightweight interactions.

## Run

Requires Node.js 20 or newer. No package installation needed.

```sh
npm run dev
```

Open http://localhost:3000. `PORT` overrides the default port.

```sh
npm run check
npm run build
```

Deploy `dist/` to a static host with all extensionless routes rewritten to `index.html` (Netlify configuration included). `server.js` is a local preview server, not a production application server.

## Routes and interactions

- `/`: introduction, projects, upcoming event, partner area, newsletter preview.
- `/about`: story, mission, vision, values, and team directory holding area.
- `/community`: guilds, project details, and membership journey.
- `/events`: upcoming conference and client-side archive filters.
- Native accessible dialogs, focus return, Escape dismissal, mobile navigation, keyboard focus indicators, reduced-motion support, and one-time scroll reveals.

## Before launch

The linked GitHub repository was empty. The Figma connector denied file access; implementation uses the user-supplied screenshots and authorized design improvements.

Images are remote Unsplash placeholders, not actual Blockchain UNN photographs. Replace them in `src/main.js` with approved local assets in `public/`. Google Fonts currently requires network access; self-host approved fonts for offline use.

Replace the temporary geometric brand mark with the official logo. Verify community statistics, GIDA partnership, project descriptions, and event archive details. The team directory deliberately has no invented identities. Community invites, project demos, event registration, and contact email must be supplied before enabling their external actions. Newsletter currently validates email and explicitly explains that it does not store or submit it; connect a mailing service before launch.

History was initially stored in `.git-history` because the workspace provided an empty read-only `.git` directory. If the regular Git metadata cannot be installed, inspect commits with `git --git-dir=.git-history --work-tree=. log`.
