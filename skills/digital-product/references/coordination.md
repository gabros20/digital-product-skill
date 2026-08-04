# Coordination

Purpose: Run multi-skill work at the lowest coordination cost that fits — in one context by
default, with native subagents when stages are genuinely independent, and by handing a plan to
`orchestrate` when explicit multi-agent execution is wanted and installed.

Read when:
- A stage plan from [lifecycle-map](lifecycle-map.md) is about to execute and needs a mode.
- Independent stages could run concurrently and the host supports subagents.
- The user explicitly asks for multi-agent execution, or `orchestrate` is already in play.

Skip when:
- The work is a single skill's job → no coordination exists to select; just do it.
- The question is where artifacts land → [artifact-convention](artifact-convention.md).
- The question is orchestration strategy internals (staged vs parallel vs hierarchical, review
  gates, model routing) → that is `orchestrate`'s own reference library, not this file.

Inputs: the stage plan, the host's capabilities (can it spawn subagents at all), and whether
`orchestrate` is installed.

Produces: a mode decision recorded in the ledger, and — in mode 2 — briefs and reports that
follow the contracts below; in mode 3 — a plan file `orchestrate` can consume.

## Contents

- Mode selection
- Mode 1: in-context (default)
- Mode 2: native subagents
- Mode 3: hand the plan to orchestrate
- The two contracts
- Validation
- Failure modes

## Mode selection

Escalate only on demonstrated need, never on ceremony:

| Mode | Use when | Cost |
|---|---|---|
| 1. In-context | Default. Stages are sequential, or the whole job fits one session | Zero — reading packs in sequence |
| 2. Native subagents | ≥2 stages are independent (no shared files, no ordering), and the host has a subagent primitive | One brief + one report per stage |
| 3. `orchestrate` | The user explicitly asked for multi-agent execution, review gates, or parallel isolation — and `orchestrate` is installed | Its own; budgeted there |

Two hard rules: mode 3 is **opt-in by the user**, never inferred from task size; and this skill
never re-implements what mode 3 provides — no strategy presets, no review gates, no model routing,
no worktree isolation, no monitoring loops. If those are needed and `orchestrate` is absent, say
so and continue in mode 1 or 2.

## Mode 1: in-context (default)

The composer reads the family table (already in its SKILL.md), picks the stage, loads that one
pack's SKILL.md, does the stage's work in that pack's voice, lands artifacts per the convention,
appends the ledger, and moves to the next stage. Nothing else. This is the whole mechanism, and
for sequential lifecycle work it is strictly better than agents: full shared context, zero
handoff loss, zero dispatch overhead.

Context discipline is the only skill mode 1 requires: load one pack at a time, unload by simply
not re-reading, and lean on the ledger — not conversation memory — as state between stages.

## Mode 2: native subagents

For genuinely independent stages (the common case: Build peers after Shape has drawn the
contracts — `frontend` and `backend` against an agreed API contract; or post-release `marketing`
content and `operate` hardening). Dispatch each as one subagent with a **brief**, receive a
**report**, append the ledger. The contracts are below; they are the *only* machinery this mode
has, borrowed deliberately small from `orchestrate`'s practice:

- artifacts on disk are the interface — a subagent's report points at files, it does not carry
  the content;
- ledger-before-memory — the dispatching context appends the ledger as each report lands, so a
  dead session loses nothing.

Independence is the gate: if two stages share files or one consumes the other's decisions, they
were not independent — run them sequentially in mode 1 rather than inventing synchronization.

Two dispatch rules, borrowed with the contracts: **pin a model on every dispatch** (the brief's
Model line is not optional), and **never spawn a duplicate of a running stage-agent** — an agent
that looks stalled or finishes without reporting gets its disk output checked first, then one
nudge; a second agent on the same brief doubles the cost and races the first one's writes.

## Mode 3: hand the plan to orchestrate

When the user wants explicit multi-agent execution and `orchestrate` is installed, the composer's
entire job is to produce a good plan and get out of the way:

1. Write the plan as a file (in `digital-product/`, pointed from the ledger): the stages, per-stage
   briefs (contract below), artifact destinations, and any ordering constraints.
2. Invoke `orchestrate` with that plan file. A plan file is exactly its input grammar; strategy
   selection, review gates, and budgets are its decisions, configured by the user.
3. State split, permanently: `.orchestrate/` holds execution state (briefs-in-flight, worker
   reports, progress); `digital-product/` holds deliverables and the ledger. Orchestrate's workers
   land artifacts per the [artifact-convention](artifact-convention.md) — their briefs say so.
4. When the run completes, the composer reconciles: ledger updated from what is actually on disk
   (not from the run's summary), skipped/failed stages recorded honestly.

## The two contracts

**The brief** (one page, always):

```markdown
# Brief — <stage>: <one-line objective>
Pack: <skill to load and obey>
Model: <explicitly pinned model/effort tier for this dispatch — an omitted model inherits an
unintended (often expensive) default; pin the cheapest tier the stage's difficulty honestly needs>
Inputs: <repo-relative paths + the specific upstream decisions that bind you>
Deliverables: <repo-relative paths to produce under digital-product/<pack>/ (and/or code paths)>
Constraints: <budgets, contracts, decisions you may not override>
Out of scope: <the adjacent work you must not absorb>
Report: dense, ≤1 page, contract below.
```

**The report** (dense, ≤1 page):

```markdown
# Report — <stage>
Outcome: <done | partial | blocked> — one sentence.
Artifacts: <path — one-line status> (one per line)
Decisions made: <one line each, flagged if any bent a constraint>
Open: <what remains, what surprised, what the next stage must know>
```

No status theater between the two — a subagent works silently and reports once; the dispatcher
does not poll for narrative.

## Validation

- The chosen mode is recorded in the ledger with its one-line justification.
- Mode 2 dispatches only stages verified independent; shared-file stages run sequentially.
- Mode 3 was explicitly requested by the user, and the plan file names artifact destinations
  under `digital-product/`.
- After any mode's completion, the ledger matches the disk.

## Failure modes

- **Mode escalation by default** — reaching for subagents or orchestrate because the task feels
  big, not because stages are independent or the user asked. Mode 1 handles more than it appears
  to.
- **Re-implementing orchestrate small** — adding review gates, retries, or monitoring to mode 2
  turns this file into a worse copy of a skill that already exists; the ceiling of mode 2 is
  brief → report → ledger.
- **Reconciling from summaries** — after a mode-2 or mode-3 run, updating the ledger from reports
  without checking the disk records artifacts that may not exist. The disk is the truth.
- **Briefs that inline upstream content** — a brief points at artifacts; pasting the PRD into
  every brief spends context and drifts from the source.
