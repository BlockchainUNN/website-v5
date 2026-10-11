# Blockchain UNN website

A responsive implementation of the Home, About, Community, and Events pages in [Blockchain UNN UI on Figma](https://www.figma.com/design/zs2LmP0VuyKC3rkuGc7TER/Blockchain-UNN-UI). The project uses plain HTML, CSS, and JavaScript, with no runtime dependencies.

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

Original Figma assets are stored in `public/images/figma/`, with their paths and export dimensions in `src/design-assets.js`. Photos are optimized as WebP; logos, artwork and SVG icons retain their exported formats. No temporary Figma asset URLs are needed at runtime. The build copies all image formats used by the pages, including SVG.

The About hero uses the original Figma photo collage in duplicated sequences to loop continuously. The animation pauses for visitors who prefer reduced motion. The Community Hall of Fame includes all six design variants, with scroll, next-card and dot navigation.

Figma exports supply the section icons. Navigation controls also use vendored [Lucide](https://lucide.dev/) SVGs; the team social marks come from [Simple Icons](https://simpleicons.org/). Team LinkedIn and X links currently lead to the platform homepages as requested placeholders; replace the two destinations in `src/main.js` with verified member profiles before launch.

Reference frames: Home desktop `1:3`, Home mobile `170:2`, About `213:183`, Community `440:583`, and Events `899:678`. The other pages adapt their desktop references to smaller screens. Repeated team portraits, partner logos, and event cards follow the repeated content in the design.

The site uses a requested 80% visual scale, controlled by `--site-scale` in `src/style.css`. The Home event flyer uses the Figma crop with narrower side gutters. Partner logos use Figma's 221 × 116 image slots and staggered rows; the square source needs `object-fit: fill` to reproduce the design's proportions.

## Links pending from the team

Community invite, project URLs, conference registration, hackathon login, and contact address are pending. Their buttons currently explain this in a dialog. Newsletter submission does not store an email until a mailing service is connected. Verify the visible statistics, dates, names, and partner status before publication.
