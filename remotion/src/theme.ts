// Palettes mirror site/index.html :root tokens exactly — the video must sit on the page as if
// drawn by the page's own CSS. Two variants render to two files; the page swaps them with the
// OS/user theme.
//
// `brand` is the fixed family identity indigo (plugin.json brandColor). It appears only as an
// ambient field, never as text and never as a gradient on type. `accent` is the AA-passing pair
// derived from it and carries every functional use. The neutral ramp is achromatic on purpose:
// indigo on blue-slate is the templated pairing, and a pure-gray ramp lets the one accent carry
// all the routing meaning — accent = routed, line/muted = available but not routed, amber =
// deliberately skipped.
export const themes = {
  light: {
    bg: "#f5f5f6",
    panel: "#ffffff",
    ink: "#17171a",
    muted: "#5c5c66",
    line: "#dedee3",
    accent: "#5250df",
    accentInk: "#ffffff",
    amber: "#8a5f0d",
    amberBg: "#fbf4e6",
    good: "#1e7f4f",
    codeBg: "#ececef",
    glyph: "#8a8a95",
    brand: "#6366f1",
    sunk: "#eeeef1",
  },
  dark: {
    bg: "#131316",
    panel: "#1c1c21",
    ink: "#e8e8ee",
    muted: "#9494a0",
    line: "#2e2e36",
    accent: "#9698f9",
    accentInk: "#131316",
    amber: "#d9a72e",
    amberBg: "#241d0c",
    good: "#4cc38a",
    codeBg: "#17171b",
    glyph: "#64646f",
    brand: "#6366f1",
    sunk: "#101013",
  },
} as const;

export type ThemeName = keyof typeof themes;
export type Theme = (typeof themes)[ThemeName];

export const MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';
export const SANS = 'system-ui, -apple-system, "Segoe UI", sans-serif';
export const COND = '"Avenir Next Condensed", "Arial Narrow", system-ui, sans-serif';
