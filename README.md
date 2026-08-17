# MultiMichel — multimichel.com

Personal site for Michel Ferreira. Static HTML, CSS and vanilla JS — no build step,
no dependencies. Open `index.html` or serve the folder.

```bash
python3 -m http.server 8080
```

## Structure

| File | What it is |
|---|---|
| `tokens.css` | **The only place visual values live.** Colour, type, spacing, grid. Loaded first, once. |
| `multimichel.css` | Page styles. References tokens, defines nothing itself. |
| `case-study.css` | Dark theme for the two case-study pages. |
| `grid-overlay.css/.js` | Spec overlay — **press `G`**. Dev tool: hidden until summoned, and nothing renders for a visitor who never presses the key. |
| `content.js` | Content graph (`window.MM`): experience + every item. Writing, Speaking and Around-the-internet all render from it. |

Pages: `index.html`, `about.html`, `contact.html`, `work-atlassian.html`,
`work-booking.html`, `archive.html`.

## Design rules

Governed by `DESIGN_SYSTEM.md`. The short version:

- **Never hardcode a visual value.** It goes in `tokens.css` or it doesn't exist.
- **8pt grid** — 8 / 16 / 32 / 48 / 72. The overlay audits this live and flags
  anything off-scale.
- **The rail is real.** The page ground is white; the paper canvas is inset by
  `--rail-width` on both sides. Orange blocks sit *in* the white.
- **One column.** Masthead, hero, section labels and row titles all start at
  `--content-start`. Markers are absolutely positioned so they never push text.
- **One orange** — `#FF6C00`.
- Mobile is authored, not shrunk: the frame tightens, the hero does not.

## Deploying

Static — any host works. `vercel.json` is set up for Vercel (clean URLs, cache
headers for `fonts/`, `img/`, `video/`):

```bash
npx vercel --prod
```

## Known TODOs

- **Contact form has no backend.** `ENDPOINT` in `contact.html` is empty, so the
  form falls back to opening a mail client. Paste a Formspree URL to go live.
- **Two Speaking rows have no link** — UXCamp (YouTube) and AIxDesign (Conffab).
- **The homepage quote's "Watch the talk" link** points at the *Fast ≠ Good*
  Medium essay, not the talk recording.
- **1997 vs 1998** — the Figma frame says 1997; `content.js` and the meta
  descriptions say 1998.
