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

The 13 images in the homepage community grid and the driving momentum photo are the user-supplied originals from `public/images/`. Optimized WebP versions are committed for fast page loads. The JPG source files remain in the workspace and are ignored by Git so the repository does not store about 180 MB of duplicate image data.

Other photos remain temporary placeholders until their original images are available. The linked Figma file is viewable in the browser, but the Figma plugin's design context and asset download tools reported that the connected account needs editor access, so this implementation follows the user-supplied screenshots.

## Links pending from the team

Community invite, project URLs, conference registration, hackathon login, and contact address are pending. Their buttons currently explain this in a dialog. Newsletter submission does not store an email until a mailing service is connected. Verify the visible statistics, dates, names, and partner status before publication.
