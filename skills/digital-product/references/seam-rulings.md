# Seam Rulings

Purpose: The family's registry of cross-skill boundary decisions — dated rulings, standing
ownership splits, deliberately contested seams, vocabulary law, and known graceful mis-routes — so
boundary questions are answered from the record, not re-litigated per conversation.

Read when:
- A request could plausibly belong to two packs and the descriptions alone don't settle it.
- Two packs' content appears to conflict, or a user asks "who owns X".
- Writing or editing any family pack where a seam is touched (the ruling constrains the edit).

Skip when:
- The routing is unambiguous from the family table → route; the registry is for disputes.
- The question is stage *order*, not ownership → [lifecycle-map](lifecycle-map.md).

Inputs: the boundary question; the two (or more) candidate packs.

Produces: the ruling with its citation and date — or an honest "contested" carrying both
positions.

Citations are by pack and file (section names where needed). Line numbers are deliberately absent
— they drift; quotes and section names survive. Verify against the live pack before quoting
onward.

## Contents

- Dated rulings
- Standing ownership splits
- Deliberately contested seams
- Hedged but not contested
- Vocabulary law
- Known graceful mis-routes
- Validation
- Failure modes

## Dated rulings

- **Dunning and billing-failure recovery → `product`** (2026-08-03). Product claims the mechanism
  in its own voice — retry schedule, grace period, churn cut-over, the voluntary/involuntary
  split as a modeling decision: `product/references/business-model.md` §3. Corroborated (and
  historically first asserted) by `marketing`'s email-compliance checklist, `success`'s
  retention-execution, and `sales`'s handoff. Recovery emails still pass marketing's compliance
  checklist; success owns high-touch human outreach after the mechanism runs; the remaining
  mechanism-level carve-outs (including native mobile IAP) are product's §3's to state — cite
  them there rather than restating them here.
- **Retention reading split: `growth` reads the trend, `success` owns the figure** (2026-08-03).
  "Is retention improving?" — trend/cohort diagnosis at any unit of analysis, including
  account-level logo/NRR reads — is `growth`'s
  (`growth/references/funnel-and-cohort-diagnosis.md`, `surface-b2b-sales-assisted.md`). The
  reported NRR/GRR *figure* keeps `success`'s definitional discipline — four audited definitions
  that are not one metric, no comparison across them — and the renewal motion itself is
  `success`'s to operate (`success/references/renewals-and-expansion.md`).

## Standing ownership splits

- **`marketing` → `sales`, unhedged**: cold outbound/prospecting, sales enablement (battlecards,
  objection handling, pricing-negotiation guidance), and revenue operations are sales's —
  marketing's own cession, with no hedge (`marketing/references/surface-b2b-sales-assisted.md`).
  Marketing keeps the qualified-demand definition and the assets sales pulls from; **ICP is
  defined by marketing and inherited by sales, never redefined**
  (`sales/references/icp-and-qualification.md`).
- **`data` certifies validity, `growth` designs and interprets**: SRM, CUPED, peek-safe method
  selection live in `data/references/experiment-measurement-foundations.md`; growth never
  re-teaches their *mechanics* and cites data by name (growth does teach where CUPED fails for
  its own design decisions — that is interpretation, not mechanics).
- **Rollout-as-experiment**: `operate` owns the flag's lifecycle and debt; `growth` owns the
  readout — operate hands the evidence-class scope, not a verdict on the experiment
  (`operate/references/handoff.md`, lateral-consumer note).
- **`quality` writes no tests**: tests belong to the Build pack that owns the code; quality plans
  verification, judges evidence, and issues the ship decision.
- **The AARRR split**: Acquisition is `marketing`'s; Activation, Referral, and Retention
  *experimentation* are `growth`'s; retention *execution* is `success`'s — a job slot growth's
  handoff reserves for success by name. Growth's missing "acquisition" and "retention-execution"
  jobs are the seam, not an oversight (`growth/references/handoff.md`).
- **NPS**: `design` owns the definition and survey method (`design/references/research.md`);
  `success` owns interpretation (`success/references/voice-of-customer.md`); growth's rule: NPS
  never stands alone as a retention experiment's primary metric
  (`growth/references/retention-and-resurrection.md`).
- **Onboarding, three ways**: the in-product onboarding *flow* is `design`'s
  (`design/references/journeys.md`); the onboarding *program* (education, artifacts outside the
  product, adoption over time) is `success`'s; marketing's lifecycle job stops at acquisition
  (`marketing/references/handoff.md`).
- **Decommissioning outreach**: `operate` owns the technical sunset; customer-facing outreach
  routes to `product`/`success` (`operate/references/decommissioning.md` and its handoff row).
- **Incident comms**: `operate` states fact, impact, and timing; the customer relationship —
  copy and per-account outreach — is `product`/`success`'s
  (`operate/references/incident-response.md`).
- **Business rules already written down**: when a rule exists in writing owned by `product`,
  `marketing`, `sales`, or `success`, `automation` cites the owner and does not recapture it
  (`automation/references/process-capture.md`).
- **Voluntary/involuntary churn**: the split is defined by `product` (it owns the involuntary
  mechanism); `success` requires the split before drawing any retention conclusion; `growth`
  reads trends on top of it.
- **Agent sandboxes**: `ai` names which tools need isolated execution
  (`ai/references/handoff.md` "What `ai` hands downstream"); `backend` builds the environment
  adapter and its controls — per-run identity, egress allowlist, scoped credentials, artifacts out
  before teardown (`backend/references/surface-agentic.md` "Run control: approvals, version pins,
  budgets, linked lifecycles"); `operate` picks the provider, sizes capacity, monitors teardown, and
  pins the template digest (`operate/references/surface-ai-system.md` "Agent sandboxes in
  production").
- **Memory forget vs corpus deletion**: the memory record and its forget path are `ai`'s
  (`ai/references/memory.md` "Governed memory — applies to all four philosophies"); a source
  document's deletion and revocation through the corpus and its index are `data`'s
  (`data/references/surface-ai-data-plane.md` "RAG corpus as governed ETL"). `quality`'s deletion
  drill names both owners (`quality/references/surface-ai-system.md` "Recovery and side-effect
  evidence").
- **Agent-run events**: the event contract's shape is `architecture`'s
  (`architecture/references/contracts.md` "Contract-first design"); `backend` serves the replayable
  log (`backend/references/surface-realtime.md` "Replayable run events — when the stream reports a
  run that outlives the connection"); `frontend` renders and resumes it
  (`frontend/references/state-and-data.md` "Agent-run streaming client").

## Deliberately contested seams

Present both positions; neither the composer nor either pack adjudicates.

- **Renewal workflow vs expansion-sale close (`success` ↔ `sales`)**: sales closes the expansion
  sale in a sales-assisted motion, **and** success carries the complexity-gated CS-native
  position (a CSM renews by default; only genuinely complex renewals route out). Contested is a
  *checked invariant* in success's own validation sections — flattening it in either direction
  breaks a shipped pack (`success/references/renewals-and-expansion.md` "The sales seam —
  contested, not settled"; `sales/references/handoff.md` success row).

## Hedged but not contested

- **Growth's hedge on the funnel/deal line (`growth` ↔ `sales`)**: not a contest — deal
  mechanics are **unconditionally** sales's on both packs' record; what growth marks provisional
  is only *where* the funnel/deal line sits. Both packs list collapsing the two hedges into one
  as a failure mode; keep the unconditional clause unconditional inside the provisional row
  (`growth/references/handoff.md` sales row; `sales/references/handoff.md`).

## Vocabulary law

- **"Discovery call"** is sales's term, always with "call" — bare **"discovery"** belongs to
  `product`.
- **"Expansion"** has three adjacent senses — product's pricing lever, success's metric (NRR
  component), sales's closed event — disambiguate on first use.
- **CRM**: *structure* (stages, fields, exit criteria) is `sales`'s; *sync and write-path
  mechanics* are `automation`'s.
- **"Deploy / release / launch"** are three events `operate` refuses to merge
  (`operate/references/release-and-rollout.md` and its handoff schema) — never one word for all
  three.

## Known graceful mis-routes

Recorded, deliberately not fixed — the fix would manufacture the inverse collision:

- **Deal-stage conversion diagnosis** ("why do deals die between stage 2 and 3?") tends to route
  to `growth` (funnel diagnosis) rather than `sales` (pipeline hygiene). Growth's own seam
  language hands deal mechanics back to sales, so the landing is graceful; tightening either
  description would misroute the adjacent prompt instead.

## Validation

- Every ruling cited onward carries its pack/file citation (and date, where dated).
- Contested seams are relayed with both positions; no answer quietly picks a side.
- Any citation quoted into new work was re-verified against the live pack first.

## Failure modes

- **Resolving a contested seam to give the user a cleaner answer** — the contest *is* the
  answer; both shipped packs check it as an invariant.
- **Citing this registry as the source** — the registry points; the packs own their rulings.
  Quote the pack, dated by the registry.
- **Treating a graceful mis-route as a defect to fix** — check the record here before "fixing"
  routing that was left asymmetric on purpose.
