# Lifecycle Map

Purpose: Turn a product request into the minimal ordered set of family stages — where work enters,
what runs, what is deliberately skipped, and how artifacts travel between stages.

Read when:
- A request spans more than one family skill, or is ambiguous about which stage it belongs to.
- Work is starting from an idea ("build me X") and needs an entry point and a path.
- Multi-stage work is being resumed and the next stage needs choosing.

Skip when:
- The request maps to exactly one skill → route directly; a plan around a one-skill job is
  overhead (SKILL.md rule 1).
- The question is a boundary/ownership dispute between two packs → [seam-rulings](seam-rulings.md).
- The question is how to run the plan (modes, agents) → [coordination](coordination.md).

Inputs: the request, whatever exists already (a repo, a PRD, a running product, a ledger), and
which family packs are installed.

Produces: a stage plan in `digital-product/LEDGER.md` — entry stage, minimal path, skipped stages
with reasons, and the first concrete action.

## Contents

- The stages and their order
- Work enters anywhere
- The minimal path — most products don't need all 14
- How artifacts travel between stages
- Lateral seams the linear order hides
- Validation
- Failure modes

## The stages and their order

Eight stages, fourteen skills. The order below is the *default dependency* order — each stage
consumes what earlier stages produce — not a mandate to run everything:

1. **Define** — `product`. The problem, the user, the business model, the spec.
2. **Design** — `design`. The experience, ending in a frontend handoff.
3. **Shape** — `architecture`. The system's boundaries, contracts, and budgets, between Define and
   Build.
4. **Build** — `frontend`, `backend`, `data`, `ai`, `automation`. Five peers, chosen by what the
   product actually is; they can run in parallel once Shape has drawn the contracts.
5. **Assure** — `quality`. Independent verification and the ship decision. Quality writes no
   tests — tests belong to the Build skill that owns the code.
6. **Run** — `operate`. Deploy, observe, respond, pay for, and eventually decommission.
7. **Improve** — `growth` (experiments and diagnosis), `success` (keeping the customers you have).
8. **Distribute** — `marketing` (create and capture demand), `sales` (convert it).

Improve and Distribute are not "after" Run in calendar time — a live product cycles through them
continuously. The dependency claim binds **Improve only**: there must be something running before
there is something to improve. Distribute can — and often should — precede launch entirely:
`marketing` ships a zero-audience overlay built for exactly the pre-launch, no-list, no-following
reader, and plans launch as an event, not an afterthought.

## Work enters anywhere

The entry stage is set by what already exists, not by the order above:

- **Idea, nothing built** → enter at Define. Resist entering at Build; an unvalidated build is the
  most expensive way to discover the problem was wrong.
- **Spec exists, no design/system** → Design and Shape (they can run concurrently; both consume
  the PRD).
- **Running product, new feature** → Define (scoped to the feature), then only the stages the
  feature touches.
- **Running product, "why is X bad"** → the owning stage directly: conversion → Improve
  (`growth`), churn → Improve (`success`), demand → Distribute (`marketing`), reliability → Run
  (`operate`). Diagnosis questions do not restart the lifecycle.
- **Inherited codebase, no docs** → Shape first — `architecture` evolves an existing
  decomposition where one is documented, and where none is, it reads the current state as the
  state to evolve and says plainly what is undocumented rather than reverse-engineering a
  topology to defend — then whatever the actual goal is.

## The minimal path — most products don't need all 14

The composer's job is subtraction. Examples of honest minimal paths:

- **Marketing site**: Define (thin) → Design → Build (`frontend`) → Assure → Run → Distribute
  (`marketing`). No `backend`, `data`, `ai`, `sales`, `success` unless the site grows those needs.
- **Solo-founder SaaS MVP**: Define → Design → Shape (thin — one ADR may be enough) → Build
  (`frontend` + `backend`) → Assure → Run, with `marketing`'s pre-launch work (its zero-audience
  overlay) running alongside Build rather than waiting for it. Improve enters when there are
  users to measure — `growth`'s feasibility gate will correctly decline tests that can't be
  answered yet, and `sales`'s existence gate typically returns self-serve-only at MVP price
  points and buying friction (it gates on ACV and purchasing friction, not on scale — a high-ACV,
  procurement-bound product passes it on day one).
- **Adding an AI feature to an existing product**: Define (scoped) → Shape (contract + threat
  model for the new surface) → Build (`ai`, plus `backend` for serving) → Assure → Run.
- **Internal automation**: `automation` alone, with `product`/`marketing`/`sales`/`success` cited
  as rule-owners where the rule already exists in writing — per `automation`'s own
  process-capture skip rule.

Every skipped stage is named in the ledger with its reason. "Skipped: sales — no assisted motion
justified yet (its existence gate would decline)" is a plan statement; silence is not.

## How artifacts travel between stages

Artifacts on disk are the interface (SKILL.md invariant). Concretely:

- Each stage lands its deliverables in its own subfolder of `digital-product/` per
  [artifact-convention](artifact-convention.md), and the ledger records the paths.
- Where a pack defines a `handoff.yaml` companion (`product`, `design`, `architecture`, and the
  Build packs emit one; `quality` and `operate` both consume and emit), the next stage reads it as
  its input contract. The composer does not redefine those schemas — each pack's handoff reference owns its
  own.
- The chain in full: `product`'s validated problem + PRD → `design`'s DESIGN.md + handoff.yaml →
  `architecture`'s contracts + budgets → the Build packs' artifacts + their construction-side
  tests → `quality`'s gate decision + residual-risk register → `operate`'s rollout evidence,
  which feeds back to `quality`, with emergency fixes filed back to the owning Build pack.
- Downstream stages consume upstream artifacts **without silently overriding established
  decisions** — every pack states this rule for itself; the composer enforces it at the seams.

## Lateral seams the linear order hides

The order above is a spine, not the whole graph. Seams that cross it (full rulings in
[seam-rulings](seam-rulings.md)):

- `growth` ↔ `operate`: a rollout that is also an experiment — operate owns the flag's lifecycle,
  growth owns the readout.
- `growth` ↔ `data`: data certifies measurement validity (SRM/CUPED/peeking); growth designs and
  interprets on top of it.
- `success` ↔ `sales`: the renewal workflow vs the expansion-sale close — deliberately contested;
  present both positions.
- `marketing` → `sales`: qualified demand and the ICP definition flow one way; sales inherits,
  never redefines.
- `product` is upstream of everyone but also a lateral owner: pricing tiers, the commercial
  lifecycle, and dunning are product's even when the question arrives via `success`, `sales`, or
  `marketing`.

## Validation

- The plan names an entry stage justified by what exists, not by the default order.
- Every stage in the path names the pack(s) that run it; every skipped stage carries a reason.
- Artifact paths and handoff files are recorded in the ledger at each transition.
- No stage's domain content was paraphrased here instead of loading its pack.

## Failure modes

- **The plan runs everything** — a 14-skill plan for a landing page is the composer failing at
  subtraction; re-derive the minimal path.
- **Work enters at Build on an unvalidated idea** — name the risk, offer Define scoped to a day,
  and record the user's explicit choice if they decline it.
- **A diagnosis question restarts the lifecycle** — "why is churn up" is `success`'s (or
  `growth`'s) question today, not a reason to re-run Define.
- **The plan resolves a contested seam to make the sequence tidy** — the sequence must carry the
  contest; see [seam-rulings](seam-rulings.md).
