# remotion — hero animation

The hero animation for the **digital-product** composer's site. 16:9, ~49s (1480 frames @ 30fps),
loops (opens and closes empty).

The palette in [`src/theme.ts`](src/theme.ts) mirrors `site/index.html`'s `:root` tokens
exactly, so the video reads as part of the page in both light and dark. Colour carries one meaning
throughout, the same as on the page: accent = routed, neutral = installed and available but not
routed, amber dashed = deliberately skipped. The identity indigo (`brand`) is an ambient field
only — never on type, never a gradient across text.

## The four beats

| Scene | Frames | What it shows |
|---|---|---|
| route | 0–340 | One plain request lands on one node. No stage plan — composing around a one-skill job is overhead. |
| sequence | 340–870 | A bigger request draws a path along the eight-stage spine; a thin ledger line appends per completed stage. |
| subtract | 870–1240 | The six skills the path did *not* run, each with its stated reason. |
| start | 1240–1480 | The lockup and the install line. |

The spine deliberately stops at Run — Improve and Distribute stay unlit, which is what the
`subtract` scene then explains. If you re-author, keep that cap; lighting the whole rail
contradicts the story.

## Commands

```bash
npm i                     # install (node_modules is gitignored)
npm run dev               # Remotion Studio preview
```

Render the two theme variants + poster stills into the site (paths are relative to this dir):

```bash
npx remotion render hero-light ../site/assets/hero-light.mp4 --codec=h264 --crf=23
npx remotion render hero-dark  ../site/assets/hero-dark.mp4  --codec=h264 --crf=23
npx remotion still hero-light ../site/assets/hero-light-poster.png --frame=782
npx remotion still hero-dark  ../site/assets/hero-dark-poster.png  --frame=782
```

The page (`site/index.html`) swaps `hero-{light,dark}.mp4` on theme change and falls back to
the poster PNG (and to the static CSS route-trace) when video/motion is unavailable. Frame 782
sits in the `sequence` scene's reading hold — the path drawn and the ledger fully appended, which
is the most representative single frame. Pick the poster `--frame` on a diagram beat, not frame 0.

Rendered videos are multi-megabyte binaries. If `git push` fails with HTTP 400, raise the buffer
for that push: `git -c http.postBuffer=524288000 push`.

## Pace every scene for a reader, not the author

The single most common defect in these videos is switching too fast: a scene's text finishes
animating in and the fade-out starts immediately, so a first-time viewer never gets to read it.
This is the default failure of the placeholder composition — fix it when you re-author. Build each
scene as three explicit phases:

```text
animate IN  →  HOLD fully still (a reading beat)  →  fade OUT
```

- Size the **hold** to the text: ~2.3s for a short line, up to ~4s for a dense grid or code block.
  Read the scene aloud at a natural pace; that is the floor.
- Compute duration as `dur = content-in-end + reading-hold + fade`. The fade-out must begin at
  `dur − fade`, **after** every element has finished appearing — never at or before the last element
  lands (that yields zero or negative reading time, the exact bug this note exists to prevent).
- Verify before a full render: `npx remotion still <id> <out> --frame=N` at the middle of each hold,
  and confirm the scene is complete and legible.

A whole hero typically runs ~45–60s once every scene holds long enough to read; a 15s cut of the
same content is almost always too fast. This composition's holds are 2.6–4.1s, sized to each
scene's density — the `sequence` scene carries a map and a seven-line ledger and gets the longest.

Two defects caught by exactly this still-check during the first pass, worth re-checking after any
edit: the closing caption of a dense scene colliding with the phase bar at the bottom, and the
spine rail lighting stages the path never reached.

## AI authoring skills

The official Remotion authoring skills ([remotion-dev/skills](https://github.com/remotion-dev/skills))
are not vendored in this repository. Install them when storyboarding or re-authoring the hero:

```bash
npx skills add remotion-dev/skills
```
