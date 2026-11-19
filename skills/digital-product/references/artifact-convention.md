# Artifact Convention

Purpose: Define the one place family deliverables live in a working repository — the
`digital-product/` folder and its `LEDGER.md` — so every pack, solo or composed, writes to the
same, committed, discoverable location.

Read when:
- Starting family work in a repository that has no `digital-product/` folder yet.
- Deciding where a deliverable, research file, or handoff companion should be written.
- Resuming work and needing to reconstruct state from disk.
- A pack is about to ask the user for context: the ledger's Context block may already hold it.

Skip when:
- The question is which stage runs next → [lifecycle-map](lifecycle-map.md).
- The question is how agents coordinate → [coordination](coordination.md).

Inputs: the working repository's root, and which pack is about to produce something.

Produces: the folder and ledger (its Context block holding the shared facts and assumptions),
created on first use; every subsequent deliverable landing in a predictable path.

## Contents

- The layout
- LEDGER.md
- Portability
- Validation
- Failure modes

## The layout

```text
<working-repo>/
  digital-product/          # all family output — visible, committed
    LEDGER.md               # lifecycle state: stage, decisions, artifacts, next
    research/               # cross-cutting research (market, users, competitors)
    product/                # PRD, risk register, metric tree, business model
    design/                 # DESIGN.md, handoff.yaml, journeys, critique records
    architecture/           # ADRs, contracts, NFR budgets, threat model
    frontend/ backend/      # build-stage plans, migration notes, verification loops
    data/ ai/ automation/   # (only the subfolders actually used are created)
    quality/                # verification dossier, residual-risk register, gate decision
    operate/                # deploy records, handoff.yaml, volatile facts, runbooks
    growth/ success/        # experiment designs/readouts; support and retention artifacts
    marketing/ sales/       # positioning, launch plans; pipeline structure, forecasts
  .orchestrate/             # ONLY if /orchestrate ran — execution state, not deliverables
```

Rules:

- **Visible and committed.** These are deliverables, not scratch. The folder is not dot-prefixed;
  it travels with the repo and is readable by humans and agents alike.
- **Created on first use.** No pack creates empty subfolders speculatively; `LEDGER.md` plus the
  subfolder being written to is the minimum footprint.
- **Source code never lives here.** Build packs write code into the codebase proper; what lands in
  `digital-product/<pack>/` is their *plans, records, and handoffs* — the documents about the
  work, not the work.
- **`.orchestrate/` is out of bounds for deliverables.** It belongs to an orchestration run's
  execution machinery (briefs, worker reports, progress) and may be absent, gitignored, or deleted
  at any time. Nothing a future reader needs may live only there.
- **Pack-internal conventions are preserved.** Where a pack names its own artifact (a
  `handoff.yaml` schema, a rule card, a dossier format), that pack's definition wins; this
  convention only fixes the *directory*.

## LEDGER.md

The ledger is deliberately thin — state, not narrative. Format:

```markdown
# Ledger — <product/project name>

Stage: <current stage or "between <a> and <b>">
Updated: <date>

## Context
- Product: <one line: what it is> (<source>, <confirmed | assumed>)
- Audience: <who it is for, what they must believe before acting> (…)
- Primary action / success: <the one thing a user should do; the metric that says it worked> (…)
- Stage: <idea | building | live | growing> (…)
- Constraints: <deadline, budget, team, platforms, languages, brand, legal, accessibility> (…)
- Assets on hand: <logo, colours, type, copy, photos, screenshots, data, an existing product> (…)
- Stack and hosting: <what exists or is given; who maintains it> (…)
- Design source: <handoff, Figma file, comp, existing site, or none> (…)
- References: <one to three liked, one to avoid> (…)
- <pack>: <an answer only that pack needs> (…)
- Assumption: <what was assumed> — basis <why>; owner <pack>; cost to reverse <low | medium | high>

## Plan
Entry: <stage> — <why>. Path: <stage → stage → …>.
Skipped: <stage> — <reason>. (one line per skipped stage)

## Decisions
- <date> — <decision, one line> (owner: <pack>)

## Artifacts
- <path> — <one-line status: draft | agreed | superseded by <path>>

## Next
- <single concrete next action> (<pack>)
```

Discipline:

- **Context comes first, and is read before anyone asks.** Every pack, composed or standalone,
  reads the Context block before questioning the user: a fact recorded there is never re-asked.
  Each line names its source (the user, a repo path, a pack) and whether it is `confirmed` or
  `assumed`. A pack adds only lines it learned; a user's answer promotes an assumption to
  `confirmed`; a pack that needs a confirmed fact changed records the conflict under Decisions and
  asks, never overwrites. A standalone pack that creates the ledger may leave Plan and Next empty.
  The fields mirror the shared questions of every pack's "Standalone context check"; the Context
  questions themselves are the packs', asked once per run per
  [coordination](coordination.md) "One merged intake".
- **Append at every stage transition, decision, and produced artifact — before moving on.** The
  composer's SKILL.md calls this ledger-before-memory: on resume, the ledger and the disk are
  trusted over any recollection of the conversation.
- **One line per entry.** The artifact carries the content; the ledger carries the pointer. A
  ledger that needs scrolling to answer "where are we?" has failed.
- **Decisions record the owner pack**, so a later boundary question starts from who decided, not
  from re-litigating.
- **Supersede, don't delete.** When an artifact is replaced, its ledger line gains
  `superseded by <path>`; the history of what was believed and when is part of the record.

## Portability

Paths written into ledgers, handoffs, and research artifacts are **repo-relative**
(`digital-product/product/prd.md`), never absolute from one machine's home directory — an
absolute path breaks on every machine but the author's, and the family's lint guards enforce this
for runtime skill content.

## Validation

- `digital-product/LEDGER.md` exists before any other family artifact is written.
- No Context line is asked of the user twice; every `assumed` line names its owner pack and cost to
  reverse.
- Every artifact the ledger names exists at the named path; every artifact on disk under
  `digital-product/` is named in the ledger.
- No deliverable lives under `.orchestrate/`.
- All recorded paths are repo-relative.

## Failure modes

- **Artifacts scattered at root or in ad-hoc folders** — move them under `digital-product/` and
  record the move in the ledger; do not maintain two conventions in one repo.
- **The ledger becomes a diary** — narrative belongs in the artifacts; trim ledger entries back to
  pointers and single-line decisions.
- **Context scattered into briefs or pack notes** — a fact the user gave lives once, in the
  Context block; briefs and pack artifacts point at it rather than copying it, so a correction
  lands everywhere.
- **A pack invents a parallel state file** — the ledger is the one cross-pack state; pack-internal
  records live inside that pack's subfolder and are pointed to, not duplicated.
