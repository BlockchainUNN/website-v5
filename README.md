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

Photos without supplied assets on the Community, Events, and team sections remain temporary placeholders. The linked Figma file is viewable in the browser, but the Figma plugin's design context and asset download tools reported that the connected account needs editor access, so this implementation follows the user-supplied screenshots.

## Links pending from the team

Community invite, project URLs, conference registration, hackathon login, and contact address are pending. Their buttons currently explain this in a dialog. Newsletter submission does not store an email until a mailing service is connected. Verify the visible statistics, dates, names, and partner status before publication.
