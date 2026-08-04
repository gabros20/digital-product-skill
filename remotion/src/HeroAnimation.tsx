import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { themes, MONO, SANS, COND, type ThemeName, type Theme } from "./theme";

// Hero: the through-line of `digital-product` — requests routing through the composer into the
// right specialists along one lifecycle. The composer has exactly two behaviours, and the video
// shows both. First, route and stop: a request that belongs to one skill is answered by naming
// that skill, with no stage plan, because composing a plan around a one-skill job is pure overhead
// and every pack in this family works standalone. Second, sequence with subtraction: a request
// that spans the lifecycle draws a path along the eight-stage spine, lighting only the skills the
// product actually needs while a thin ledger line appends per completed stage — and then names
// every skill it did NOT run, with a reason, because a silent skip reads as coverage that never
// happened. Subtraction is the family's honesty move, so it gets its own scene rather than a
// footnote. ~49s, loops (opens/closes empty).
//
// Colour carries one meaning throughout, the same as on the page: accent = routed, neutral =
// installed and available but not routed, amber dashed = deliberately skipped. The identity
// indigo appears as an ambient field only, never on type and never as a gradient.
//
// Pacing model (reader-first): every scene animates its content IN, then HOLDS fully still for a
// reading beat (~2.6-4.1s) before the container fades OUT. The fade-out begins at dur - fade,
// after every element has landed.
//
// Scene map (30fps):
//   S1 route        0-340      one request, one skill, no plan
//   S2 sequence     340-870    the path draws along the spine; the ledger appends per stage
//   S3 subtract     870-1240   the six skills it did not run, each with its reason
//   S4 close        1240-1480  the lockup and the install line

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

function envelope(frame: number, dur: number, fade = 24) {
  const opIn = interpolate(frame, [0, fade], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const opOut = interpolate(frame, [dur - fade, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const y = interpolate(frame, [0, fade], [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  return { opacity: Math.min(opIn, opOut), y };
}

const step = (frame: number, a: number, b: number, ease = false) =>
  interpolate(frame, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease ? EASE : undefined });

// -- the family, as it actually is: eight stages, fourteen skills, Build carrying five ---------
const STAGES: { name: string; skills: string[] }[] = [
  { name: "Define", skills: ["product"] },
  { name: "Design", skills: ["design"] },
  { name: "Shape", skills: ["architecture"] },
  { name: "Build", skills: ["frontend", "backend", "data", "ai", "automation"] },
  { name: "Assure", skills: ["quality"] },
  { name: "Run", skills: ["operate"] },
  { name: "Improve", skills: ["growth", "success"] },
  { name: "Distribute", skills: ["marketing", "sales"] },
];

type Levels = Record<string, number>;

const SceneTitle: React.FC<{ t: Theme; kicker: string; title: string; appear: number }> = ({ t, kicker, title, appear }) => (
  <div style={{ textAlign: "center", marginBottom: 26, opacity: appear }}>
    <div style={{ fontFamily: COND, textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 600, fontSize: 16, color: t.muted, marginBottom: 11 }}>
      {kicker}
    </div>
    <div style={{ fontFamily: MONO, fontSize: 34, color: t.ink, letterSpacing: "-0.02em" }}>{title}</div>
  </div>
);

const Typed: React.FC<{ t: Theme; text: string; frame: number; from: number; to: number }> = ({ t, text, frame, from, to }) => {
  const chars = Math.floor(interpolate(frame, [from, to], [0, text.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const caretOn = Math.floor(frame / 8) % 2 === 0 && chars < text.length && frame > from;
  return (
    <div
      style={{
        opacity: step(frame, from - 6, from + 6),
        fontFamily: MONO,
        fontSize: 20,
        color: t.ink,
        background: t.codeBg,
        border: `1px solid ${t.line}`,
        borderRadius: 9,
        padding: "12px 20px",
        whiteSpace: "pre",
      }}
    >
      <span style={{ color: t.accent, fontWeight: 600 }}>/digital-product </span>
      {text.slice(0, chars)}
      <span style={{ opacity: caretOn ? 1 : 0, color: t.accent }}>▋</span>
    </div>
  );
};

// -- the map, shared by S1-S3 -------------------------------------------------------------------
const Node: React.FC<{ t: Theme; label: string; lit: number; skip: number }> = ({ t, label, lit, skip }) => {
  const isSkip = skip > 0.02;
  const bg = isSkip ? "transparent" : lit > 0.02 ? `color-mix(in srgb, ${t.accent} ${Math.round(lit * 100)}%, ${t.panel})` : t.panel;
  const border = isSkip ? t.amber : lit > 0.5 ? t.accent : t.line;
  const color = isSkip ? t.amber : lit > 0.5 ? t.accentInk : t.muted;
  return (
    <div
      style={{
        fontFamily: MONO,
        fontSize: 11.5,
        fontWeight: lit > 0.5 || isSkip ? 700 : 400,
        textAlign: "center",
        padding: "6px 3px",
        borderRadius: 7,
        background: bg,
        border: `1px ${isSkip ? "dashed" : "solid"} ${border}`,
        color,
        textDecoration: isSkip ? "line-through" : "none",
        opacity: isSkip ? 0.45 + 0.55 * skip : 1,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {label}
    </div>
  );
};

const FamilyMap: React.FC<{ t: Theme; lit: Levels; skip: Levels; spine: number; appear: number }> = ({ t, lit, skip, spine, appear }) => (
  <div style={{ display: "flex", width: 1140, opacity: appear, alignItems: "flex-start" }}>
    {STAGES.map((s, si) => {
      const railOn = spine > si + 0.5;
      return (
        <div key={s.name} style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              fontFamily: COND,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: 600,
              fontSize: 13,
              color: railOn ? t.ink : t.muted,
              marginBottom: 8,
              whiteSpace: "nowrap",
            }}
          >
            {s.name}
          </div>
          <div style={{ display: "flex", alignItems: "center", width: "100%", height: 10, marginBottom: 11 }}>
            <div style={{ flex: 1, height: 2, background: si === 0 ? "transparent" : railOn ? t.accent : t.line }} />
            <div style={{ width: 9, height: 9, borderRadius: "50%", flex: "none", background: railOn ? t.accent : t.line }} />
            <div style={{ flex: 1, height: 2, background: si === 7 ? "transparent" : spine > si + 1.5 ? t.accent : t.line }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", padding: "0 5px" }}>
            {s.skills.map((k) => (
              <Node key={k} t={t} label={k} lit={lit[k] ?? 0} skip={skip[k] ?? 0} />
            ))}
          </div>
        </div>
      );
    })}
  </div>
);

// -- S1 . route, and stop -----------------------------------------------------------------------
const SceneRoute: React.FC<{ t: Theme; dur: number }> = ({ t, dur }) => {
  const frame = useCurrentFrame();
  const { opacity, y } = envelope(frame, dur);
  const map = step(frame, 60, 88, true);
  const lit: Levels = { backend: step(frame, 120, 150, true) };
  const cap = step(frame, 150, 178, true);
  const sub = step(frame, 185, 212, true);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ translate: `0 ${y}px`, display: "flex", flexDirection: "column", alignItems: "center", width: 1140 }}>
        <div style={{ fontFamily: COND, textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 600, fontSize: 16, color: t.muted, marginBottom: 18, opacity: step(frame, 6, 30) }}>
          ask in ordinary words — no flags, no fixed pipeline
        </div>
        <Typed t={t} text="add checkout to my app" frame={frame} from={20} to={90} />
        <div style={{ marginTop: 30 }}>
          <FamilyMap t={t} lit={lit} skip={{}} spine={-1} appear={map} />
        </div>
        <div style={{ marginTop: 26, opacity: cap, fontFamily: MONO, fontSize: 21, color: t.ink, textAlign: "center" }}>
          → <span style={{ color: t.accent, fontWeight: 700 }}>backend</span> — the one skill that owns it
        </div>
        <div style={{ marginTop: 12, opacity: sub, fontFamily: SANS, fontSize: 14.5, color: t.muted, textAlign: "center", maxWidth: 800, lineHeight: 1.5 }}>
          No stage plan. No ledger ceremony. No other pack loaded. Composing around a one-skill job is
          pure overhead — and every skill here works standalone.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// -- S2 . sequence, with the ledger appending ---------------------------------------------------
const LEDGER: [string, string][] = [
  ["digital-product/product/prd.md", "agreed"],
  ["digital-product/design/handoff.yaml", "agreed"],
  ["digital-product/architecture/contracts.md", "agreed"],
  ["digital-product/frontend/build-plan.md", "agreed"],
  ["digital-product/backend/build-plan.md", "agreed"],
  ["digital-product/quality/gate-decision.md", "agreed"],
  ["digital-product/operate/rollout-record.md", "draft"],
];

const ScenePath: React.FC<{ t: Theme; dur: number }> = ({ t, dur }) => {
  const frame = useCurrentFrame();
  const { opacity, y } = envelope(frame, dur);
  const map = step(frame, 60, 88, true);
  const lit: Levels = {
    product: step(frame, 110, 136, true),
    design: step(frame, 150, 176, true),
    architecture: step(frame, 190, 216, true),
    frontend: step(frame, 230, 256, true),
    backend: step(frame, 252, 278, true),
    quality: step(frame, 292, 318, true),
    operate: step(frame, 332, 358, true),
  };
  // the path ends at Run — Improve and Distribute stay unlit, which is the whole point of the
  // next scene. Capping at 6.4 leaves the Run→Improve rail segment grey.
  const spine = interpolate(frame, [100, 345], [0.6, 6.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const led = step(frame, 100, 124, true);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ translate: `0 ${y}px`, display: "flex", flexDirection: "column", alignItems: "center", width: 1140 }}>
        <div style={{ fontFamily: COND, textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 600, fontSize: 16, color: t.muted, marginBottom: 18, opacity: step(frame, 8, 34) }}>
          a request that spans the lifecycle
        </div>
        <Typed t={t} text="take my idea to launch" frame={frame} from={30} to={98} />
        <div style={{ marginTop: 20 }}>
          <FamilyMap t={t} lit={lit} skip={{}} spine={spine} appear={map} />
        </div>
        <div
          style={{
            marginTop: 20,
            opacity: led,
            width: 860,
            background: t.codeBg,
            borderLeft: `2px solid ${t.accent}`,
            borderRadius: "0 9px 9px 0",
            padding: "11px 16px",
            fontFamily: MONO,
            fontSize: 12,
            lineHeight: 1.6,
            color: t.muted,
          }}
        >
          <div style={{ color: t.ink, fontWeight: 700 }}>digital-product/LEDGER.md</div>
          <div>
            <span style={{ color: t.accent }}>Entry:</span> Define — an idea, nothing built.
          </div>
          {LEDGER.map(([path, status], i) => {
            const op = step(frame, 124 + i * 40, 148 + i * 40, true);
            return (
              <div key={path} style={{ opacity: op, whiteSpace: "pre" }}>
                {"  "}
                <span style={{ color: t.ink }}>{path}</span>
                {" — "}
                <span style={{ color: status === "draft" ? t.amber : t.good }}>{status}</span>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 14, opacity: step(frame, 350, 378, true), fontFamily: SANS, fontSize: 14.5, color: t.muted, textAlign: "center", maxWidth: 960, lineHeight: 1.5, whiteSpace: "nowrap" }}>
          One line per stage, appended before moving on — <span style={{ color: t.ink, fontWeight: 600 }}>the ledger is the memory</span>, not the conversation.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// -- S3 . what it did not run, and why ----------------------------------------------------------
const SKIPS: [string, string][] = [
  ["data", "no analytical data plane at this scale"],
  ["ai", "nothing model-powered in the product"],
  ["automation", "no cross-system process to run yet"],
  ["growth", "no users to measure — its feasibility gate would decline"],
  ["success", "no accounts to keep yet"],
  ["sales", "its existence gate returns self-serve-only here"],
];

const SceneSubtract: React.FC<{ t: Theme; dur: number }> = ({ t, dur }) => {
  const frame = useCurrentFrame();
  const { opacity, y } = envelope(frame, dur);
  const map = step(frame, 30, 58, true);
  const lit: Levels = { product: 1, design: 1, architecture: 1, frontend: 1, backend: 1, quality: 1, operate: 1 };
  const skip: Levels = {};
  SKIPS.forEach(([k], i) => {
    skip[k] = step(frame, 70 + i * 20, 94 + i * 20, true);
  });
  const cap = step(frame, 215, 242, true);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ translate: `0 ${y}px`, display: "flex", flexDirection: "column", alignItems: "center", width: 1140 }}>
        <SceneTitle t={t} kicker="most products don't need all fourteen" title="six skipped — each one said out loud" appear={step(frame, 8, 34, true)} />
        <FamilyMap t={t} lit={lit} skip={skip} spine={6.4} appear={map} />
        <div style={{ marginTop: 26, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "9px 26px", width: 1000 }}>
          {SKIPS.map(([k, why], i) => {
            const op = step(frame, 80 + i * 20, 104 + i * 20, true);
            return (
              <div key={k} style={{ opacity: op, display: "flex", gap: 11, alignItems: "baseline" }}>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 12,
                    fontWeight: 700,
                    color: t.amber,
                    border: `1px dashed ${t.amber}`,
                    borderRadius: 6,
                    padding: "2px 9px",
                    textDecoration: "line-through",
                    flex: "none",
                    minWidth: 108,
                    textAlign: "center",
                  }}
                >
                  {k}
                </span>
                <span style={{ fontFamily: SANS, fontSize: 13.5, color: t.muted, lineHeight: 1.4 }}>{why}</span>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 24, opacity: cap, fontFamily: MONO, fontSize: 17, color: t.ink, textAlign: "center", maxWidth: 900, lineHeight: 1.5 }}>
          A silent skip reads as <span style={{ color: t.amber, fontWeight: 700 }}>coverage that never happened</span>.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// -- S4 . the close ------------------------------------------------------------------------------
const SceneClose: React.FC<{ t: Theme; dur: number }> = ({ t, dur }) => {
  const frame = useCurrentFrame();
  const { opacity, y } = envelope(frame, dur);
  const big = step(frame, 14, 50, true);
  const sub = step(frame, 60, 92, true);
  const cmd = step(frame, 105, 138, true);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ translate: `0 ${y}px`, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ opacity: big, fontFamily: MONO, fontSize: 62, fontWeight: 500, color: t.ink, letterSpacing: "-0.025em", textAlign: "center" }}>
          <span style={{ color: t.accent }}>/</span>digital-product
        </div>
        <div style={{ marginTop: 20, opacity: sub, fontFamily: COND, textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600, fontSize: 24, color: t.muted, textAlign: "center" }}>
          fifteen skills · one lifecycle · only the stages you need
        </div>
        <div
          style={{
            marginTop: 34,
            opacity: cmd,
            fontFamily: MONO,
            fontSize: 17,
            color: t.ink,
            background: t.codeBg,
            border: `1px solid ${t.line}`,
            borderRadius: 9,
            padding: "12px 22px",
          }}
        >
          npx skills add gabros20/digital-product-skill
        </div>
      </div>
    </AbsoluteFill>
  );
};

// -- persistent chrome + master timeline ---------------------------------------------------------
const BOUNDS = [340, 870, 1240, 1480];
const LABELS = ["route", "sequence", "subtract", "start"];

const PhaseBar: React.FC<{ t: Theme; frame: number }> = ({ t, frame }) => {
  const idx = BOUNDS.findIndex((b) => frame < b);
  const active = idx === -1 ? BOUNDS.length - 1 : idx;
  return (
    <div style={{ position: "absolute", bottom: 32, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 16 }}>
      {LABELS.map((l, i) => (
        <div key={l} style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: i === active ? t.accent : t.line, scale: String(i === active ? 1.3 : 1) }} />
          <div style={{ fontFamily: COND, textTransform: "uppercase", letterSpacing: "0.09em", fontSize: 12.5, fontWeight: 600, color: i === active ? t.ink : t.muted, opacity: i === active ? 1 : 0.55 }}>
            {l}
          </div>
        </div>
      ))}
    </div>
  );
};

export const HeroAnimation: React.FC<{ theme: ThemeName }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = themes[theme];

  const intro = step(frame, 0, 14);
  const outro = interpolate(frame, [durationInFrames - 16, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const master = Math.min(intro, outro);
  const drift = interpolate(Math.sin(frame / 95), [-1, 1], [0.55, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: t.bg, fontFamily: SANS }}>
      {/* one ambient plane, the identity indigo — never on type, never a gradient across text */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 80% 10%, color-mix(in srgb, ${t.brand} 15%, transparent), transparent 48%), radial-gradient(circle at 8% 94%, color-mix(in srgb, ${t.brand} 8%, transparent), transparent 46%)`,
          opacity: drift,
        }}
      />
      <AbsoluteFill style={{ opacity: master }}>
        <Sequence durationInFrames={340}>
          <SceneRoute t={t} dur={340} />
        </Sequence>
        <Sequence from={340} durationInFrames={530}>
          <ScenePath t={t} dur={530} />
        </Sequence>
        <Sequence from={870} durationInFrames={370}>
          <SceneSubtract t={t} dur={370} />
        </Sequence>
        <Sequence from={1240} durationInFrames={240}>
          <SceneClose t={t} dur={240} />
        </Sequence>
        <PhaseBar t={t} frame={frame} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
