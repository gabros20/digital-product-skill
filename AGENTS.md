# Agent guide — `digital-product` (Digital Product)

This repository is the released `digital-product-skill`: the composer for the Digital Product
Skills family. The runtime skill lives under `skills/digital-product/`; the repository and Codex
plugin use the `-skill` suffix. The repository also carries the family's canonical research and
architecture docs under `docs/`. Each pack's own multi-channel research corpus belongs in that
pack's repository (`<pack>-skill/research/`), never here. Read this before editing.

## Ownership boundary (non-negotiable)

`digital-product` owns the seams and the sequence — **none of the domains**. It decides which of
the 14 specialist skills a request belongs to, in what order multi-stage work runs, where
deliverables land (`digital-product/` + `LEDGER.md` in the working repo), and what the family has
ruled about contested boundaries. It produces routing decisions, stage plans, ledger entries, and
handoff glue. It does **not** own:

- any domain artifact — PRDs (`product`), designs (`design`), ADRs (`architecture`), production
  code (`frontend`/`backend`/`data`/`ai`), processes (`automation`), verification verdicts
  (`quality`), operations (`operate`), experiments (`growth`), customer programs (`success`),
  demand (`marketing`), or deals (`sales`)
- multi-agent topology — strategies, review gates, model routing, isolation, monitoring →
  **orchestrate** (a separate, non-family skill; the composer hands it a plan file when the user
  opts in, and never re-implements it)

Every family pack works standalone; the composer's first duty is knowing when it is not needed. A
single-domain request routes to its pack in one line — no stage plan, no ceremony.

## Non-negotiable invariants

1. **Route to one skill when one skill suffices.** Composition is overhead.
2. **The ledger is the memory.** `digital-product/LEDGER.md` is appended before moving on — at
   every stage transition, decision, and produced artifact; on resume, the ledger and the disk
   outrank recollection.
3. **Seams are answered from the registry** (`references/seam-rulings.md`), dated, with citations
   into the owning packs. Contested seams are relayed as contested — the composer never quietly
   adjudicates a fight two packs deliberately left open, and never "fixes" a recorded graceful
   mis-route.
4. **Plans subtract.** A stage plan names the minimal path and every skipped stage with its
   reason; most products do not need all 14 skills.
5. **Artifacts on disk are the interface.** Stages hand paths (and each pack's own
   `handoff.yaml` where defined), never summaries that replace artifacts; after any coordinated
   run, the ledger is reconciled against the disk, not against reports.
6. **Coordination escalates only on need.** In-context by default; native subagents only for
   verified-independent stages (brief → dense report → ledger, nothing more); `orchestrate` only
   when the user explicitly asks and it is installed.
7. **Never absorb a specialist's knowledge.** The composer's tables exist to route; doing a
   stage's work means loading that pack and working in its voice.
8. **Repo-relative paths everywhere** — in ledgers, briefs, and research artifacts; the lint's
   portability guard enforces this for runtime content.

## Required behavior

1. Run `scripts/check-sync` (and `scripts/lint-skill`) before any release; never replace the
   generic gate with domain-only checks.
2. Keep runtime frontmatter to `name` and `description`. Versions/metadata live in
   `.codex-plugin/plugin.json`, `CHANGELOG.md`, tags, and releases — never in `SKILL.md`.
3. Keep `SKILL.md` the direct router; the four references are flat, directly linked,
   self-describing, loaded only when their conditions apply.
4. Every reference begins with `Purpose / Read when / Skip when / Inputs / Produces`; add a
   `## Contents` when it exceeds ~100 lines.
5. Keep repository docs, eval fixtures, research, and family archives outside
   `skills/digital-product/`.
6. When a family pack changes a seam, update `references/seam-rulings.md` in the same breath —
   the registry points at the packs, and a stale pointer is worse than none.
7. Release through matching plugin version, changelog entry, tag, and GitHub Release.

Do not mark the repository complete because structural lint passes. Activation, traversal, and
output evaluations must show the composer routes, subtracts, and holds seams usefully.
