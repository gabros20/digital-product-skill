---
name: digital-product
description: >-
  Compose the 14-skill digital-product family — route multi-skill or ambiguous product requests
  to the right specialist (product, design, architecture, frontend, backend, ai, data,
  automation, quality, operate, growth, success, marketing, sales), sequence work across the
  lifecycle, keep the
  shared digital-product/ artifact folder and LEDGER.md, and hold the family's cross-skill seam
  rulings. Use to start a product, decide which skill applies, run multi-stage work, or settle a
  cross-skill boundary. Not for the domain work itself (→ the named skill) or multi-agent
  topology (→ orchestrate, if installed).
---

# Digital Product

## Mission and boundary

**Own the seams and the sequence — none of the domains.** `digital-product` is the composer for a
family of 14 independently installable specialist skills. It decides which skill a request belongs
to, in what order multi-stage work should run, where every deliverable lands on disk, and what the
family has already ruled about contested boundaries. It produces routing decisions, stage plans,
ledger entries, and handoff glue — **never a PRD, a design, a line of production code, a test
verdict, a forecast, or any other domain artifact.** The moment work becomes domain work, the named
specialist skill does it.

Two things this skill is explicitly not:

- **Not a replacement for direct use of a specialist.** Every family skill works standalone. A
  request that names one domain job ("write the PRD", "design the hero", "add auth") routes
  straight to that skill; composing adds nothing and costs context.
- **Not an orchestration engine.** Multi-agent topology — strategies, review gates, model routing,
  worktree isolation, monitoring — belongs to `orchestrate` where installed. This skill's own
  coordination (see [coordination](references/coordination.md)) is deliberately minimal: read the
  right pack at the right time, keep the ledger, and hand off cleanly.

## Route before acting

1. **Single-domain request → route and stop.** If the request maps to exactly one family skill,
   name it, state why in one line, and proceed with (or recommend) that skill. Do not build a
   stage plan around a one-skill job.
2. **Multi-stage or ambiguous request → read [lifecycle-map](references/lifecycle-map.md).**
   Identify the entry stage (work can enter anywhere — a running product entering at Improve skips
   nothing that matters), the minimal set of stages actually needed, and the order.
3. **Cross-skill boundary question → read [seam-rulings](references/seam-rulings.md)** before
   answering from any single pack's perspective. Contested seams are answered as contested.
4. **Before producing anything, establish the artifact home** per
   [artifact-convention](references/artifact-convention.md): the `digital-product/` folder and
   `LEDGER.md` at the working repository's root.
5. **Pick the cheapest coordination mode that fits** per
   [coordination](references/coordination.md): in-context by default; native subagents only for
   independent stages; `orchestrate` only when explicitly requested and installed.
6. Load a specialist pack's SKILL.md only when entering its stage. Never preload the family.
7. If a needed pack is not installed, say so and name the exact command:
   `npx skills add gabros20/<pack>-skill -g -y` — then continue with what exists.

### Jobs

| User intent | Read | Contribution |
|---|---|---|
| Decide which family skill a request belongs to | The family table below | One skill named, or a contested seam surfaced from [seam-rulings](references/seam-rulings.md) |
| Start a new product from an idea | [lifecycle-map](references/lifecycle-map.md) | Entry at Define; the minimal stage path — not all 14 skills; the first ledger entry |
| Sequence or resume multi-stage work | [lifecycle-map](references/lifecycle-map.md) | Stage order, what is skippable, the handoff chain between stages; resume from LEDGER.md, not memory |
| Set up or maintain the shared artifact folder | [artifact-convention](references/artifact-convention.md) | `digital-product/` layout, LEDGER.md format, what gets committed, the `.orchestrate/` boundary |
| Settle a cross-skill boundary, collision, or ownership question | [seam-rulings](references/seam-rulings.md) | The family's dated rulings, the deliberately contested seams, and the known graceful mis-routes |
| Run coordinated work across several skills | [coordination](references/coordination.md) | Mode selection; the brief and report contracts; the ledger discipline |
| Scale up to explicit multi-agent execution | [coordination](references/coordination.md) Mode 3 | The plan-file handoff to `orchestrate`; what state lives where |

### The family

One line per pack — enough to route. Load a pack's own SKILL.md before doing its work.

| Stage | Skill | Owns |
|---|---|---|
| Define | `product` | What to build, for whom, why — discovery, strategy, PRDs, pricing/business model, dunning, metrics, risk registers |
| Design | `design` | The experience — UX research, journeys, IA, interaction, visual direction, accessibility, design systems, frontend handoff |
| Shape | `architecture` | The system's shape — boundaries, contracts, NFR budgets, threat model, ADRs |
| Build | `frontend` | Production client code — web, iOS, Android; consumes the design handoff |
| Build | `backend` | The server behind the contract — APIs, domain logic, OLTP persistence, auth, jobs |
| Build | `data` | The analytical, governed data plane — tracking, contracts, pipelines, metrics layer, experiment measurement validity |
| Build | `ai` | Model-powered behavior — routing, context, agents, RAG, evals, guardrails |
| Build | `automation` | Cross-system and human-in-the-loop processes — platforms, triggers, approvals, reconciliation |
| Assure | `quality` | Independent verification and the ship decision — writes no tests; judges evidence |
| Run | `operate` | Running what shipped — release/rollout, CI/CD, observability, incidents, cost, decommissioning |
| Improve | `growth` | Honest experimentation — feasibility gate, design, funnel/cohort diagnosis, interpretation |
| Improve | `success` | Keeping customers — onboarding programs, support, health honesty, retention execution, renewals/NRR reporting |
| Distribute | `marketing` | Creating, capturing, attributing demand — positioning, launch, SEO, content, lifecycle email, attribution |
| Distribute | `sales` | Winning business and knowing whether you are — outbound, discovery calls, pipeline, forecasting honesty, win/loss |

## Universal invariants

- **Route to one skill when one skill suffices.** Composition is overhead; the family's packs are
  built to stand alone, and the composer's first duty is knowing when it is not needed.
- **The ledger is the memory.** Every stage transition, decision, and produced artifact is appended
  to `digital-product/LEDGER.md` before moving on; on resume, trust the ledger and the disk over
  recollection.
- **Seams are answered from the registry, not re-litigated.** A ruled seam is cited with its date;
  a contested seam is presented as contested — the composer holds the rulings and never quietly
  resolves a fight two packs deliberately left open.
- **Artifacts on disk are the interface between stages.** A stage hands the next stage file paths
  (and `handoff.yaml` where the pack defines one), never a summary that replaces the artifact.
- **Never absorb a specialist's knowledge.** If an answer requires a pack's content, load that pack
  — do not paraphrase it from this skill's own tables, which exist only to route.
- **State what was skipped.** A stage plan names the stages deliberately not run and why — a
  silent skip reads as coverage that never happened.

## Core workflow

1. Classify the request: single-domain (route and stop), multi-stage (plan), boundary question
   (registry), or coordination question (mode).
2. Establish or read `digital-product/LEDGER.md`; create the folder on first use.
3. For multi-stage work: name the entry stage, the minimal path, and the coordination mode; record
   the plan in the ledger.
4. Execute stage by stage — load the pack, do the work in its voice, land artifacts in its
   subfolder, append the ledger, hand off.
5. At each seam, apply the registry; at completion, the ledger states what ran, what was skipped,
   and what remains.

## Artifact home

Deliverables this skill produces default to `digital-product/` at the working repository's root —
this skill owns the convention itself: `LEDGER.md` plus one subfolder per specialist pack, created
on first use and committed with the repo (full spec in
[artifact-convention](references/artifact-convention.md)). Never write into `.orchestrate/` — that
folder belongs to an orchestration run's execution state, not to this family's deliverables.

## Resources

Four references, loaded per the routing table above:
[lifecycle-map](references/lifecycle-map.md) ·
[artifact-convention](references/artifact-convention.md) ·
[coordination](references/coordination.md) ·
[seam-rulings](references/seam-rulings.md)

Eval suites live in the repository's `evals/` directory.

Attribution and what this pack claims for itself — `SOURCES.md` at the repository root.
