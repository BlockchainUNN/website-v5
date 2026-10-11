# Blockchain UNN website

A responsive implementation of the supplied Home, About, Community, and Events design screenshots. The project uses plain HTML, CSS, and JavaScript, with no runtime dependencies.

## Run

```sh
npm run dev
```

Open `http://localhost:3000`. You can choose another port with `PORT=3001 npm run dev`.

```sh
npm run check
npm run build
```

`dist/` is ready for a static host. Netlify route rewrites are included.

## Assets

Homepage images live in `public/images/home/`; the About page group photo lives in `public/images/about/`. Optimized WebP versions of the supplied JPGs are committed for fast page loads. The full-size JPG sources remain in the workspace and are ignored by Git to avoid storing duplicate image data. The supplied PNG logo, hero background, and partner mark are used directly.

The About hero reads every AVIF, JPG, JPEG, PNG, and WebP file in `public/images/about_hero/`, sorted by filename. Add or remove images there, then refresh the development page or run `npm run build` for a new static deployment. The animation uses duplicated image sequences to loop continuously and pauses for visitors who prefer reduced motion. The About group photo remains as a fallback if the manifest cannot load.

Interface icons use vendored [Lucide](https://lucide.dev/) SVGs; the team social marks come from [Simple Icons](https://simpleicons.org/). Team LinkedIn and X links currently lead to the platform homepages as requested placeholders; replace the two destinations in `src/main.js` with verified member profiles before launch.

Photos without supplied assets on the Community, Events, and team sections remain temporary placeholders. The linked Figma file is viewable in the browser, but the Figma plugin's design context and asset download tools reported that the connected account needs editor access, so this implementation follows the user-supplied screenshots.

## Links pending from the team

Community invite, project URLs, conference registration, hackathon login, and contact address are pending. Their buttons currently explain this in a dialog. Newsletter submission does not store an email until a mailing service is connected. Verify the visible statistics, dates, names, and partner status before publication.
