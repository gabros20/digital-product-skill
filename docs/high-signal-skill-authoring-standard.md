# High-Signal Skill Authoring Standard

Status: canonical authoring standard
Date: 2026-07-16
Audience: skill authors, reviewers, tooling engineers, and evaluation designers

Documentation map: [Digital Product Skills documentation](README.md)

Related documents:

- [Composable Skill Packs for the Digital Product Lifecycle](product-lifecycle-skill-packs-exploration.md)
- [Skill-Pack Navigation and Steering Research](skill-pack-navigation-and-steering-research.md)
- [ADR-0003: Independent skill repositories](decisions/0003-independent-skill-repositories.md)
- [ADR-0002: Product identity and terminology](decisions/0002-product-identity-and-terminology.md)

Names rendered as `/design` are documentation shorthand for the canonical identifier `design`; client invocation syntax is not part of the authoring format.

## Executive conclusion

Write skills in **clear compressed prose**, not “caveman speech.”

High signal means every loaded instruction earns its context cost by doing at least one of these jobs:

1. Route the request.
2. Preserve a non-obvious domain fact.
3. Constrain a consequential decision.
4. Define an execution step or tool rule.
5. Specify an artifact or handoff contract.
6. Require validation or safe failure behavior.

Everything else should be removed, moved to a conditional reference, turned into a reusable asset, or encoded in a deterministic script.

Use this loading model:

```text
description       = activate precisely
SKILL.md          = route + universal workflow
references/       = conditional domain depth
scripts/          = deterministic repeated work
assets/           = reusable output material
artifact          = full-fidelity result
handoff/receipt   = compressed machine- and agent-readable summary
```

The important distinction is:

```text
Instruction compression ≠ broken grammar
Output compression      ≠ knowledge compression
Token reduction         ≠ quality improvement
```

The skill should be as short as possible **after** it is complete, unambiguous, and testable—not before.

## 1. Research findings

### 1.1 Official skill guidance favors progressive disclosure

The Agent Skills specification defines three levels of loading:

1. Name and description at discovery time.
2. The complete `SKILL.md` after activation.
3. Supporting resources only when required.

It recommends keeping the main file below 500 lines and 5,000 tokens, using focused references, and avoiding deep reference chains. [Agent Skills specification](https://agentskills.io/specification)

OpenAI documents the same progressive-disclosure model for Codex. Codex initially includes skill names, descriptions, and paths in a limited catalog budget. When many skills are installed, descriptions may be shortened or skills may be omitted, so key trigger terms and boundaries must be front-loaded. [OpenAI: Build skills](https://learn.chatgpt.com/docs/build-skills)

This means token optimization has three separate targets:

| Footprint | Paid when | Primary optimization |
|---|---|---|
| Catalog footprint | Every session where the skill is discoverable | Short, discriminative description |
| Activation footprint | Every invocation of the skill | Lean universal workflow in `SKILL.md` |
| Branch footprint | Only when a route loads supporting material | Focused conditional references |

### 1.2 Moderate detail outperforms encyclopedic instruction

Agent Skills best practices warn that overly comprehensive skills make it harder for the agent to identify relevant instructions and may trigger paths that do not apply. They recommend adding what the agent lacks, keeping coherent units, selecting defaults, and telling the agent precisely when to load a reference. [Agent Skills best practices](https://agentskills.io/skill-creation/best-practices)

The practical consequence is not “always write less.” It is:

> Put only frequently applicable procedural guidance in the always-loaded body; move conditional expertise to directly routed leaves.

### 1.3 More context can reduce performance

Long-context capacity does not imply reliable use of every supplied token. “Lost in the Middle” found that retrieval performance can change with the position of relevant information and can degrade as distractor context grows. [Lost in the Middle](https://arxiv.org/abs/2307.03172)

For skill design, this supports:

- Put mission, routing, and critical constraints early.
- Avoid burying essential rules between long explanations.
- Load the smallest sufficient reference set.
- Do not equate a larger knowledge pack with a more useful active prompt.

### 1.4 Skill utility is specialized and context-dependent

A 2026 work-in-progress benchmark of 49 software-engineering skills reported only modest average improvement, substantial variation, and cases where version-mismatched guidance reduced performance. The strongest gains came from specialized procedural knowledge rather than generic advice. [SWE-Skills-Bench preprint](https://arxiv.org/abs/2603.15401)

SkillsBench reports larger aggregate improvements across a broader suite, but likewise emphasizes that which skill, when it is used, and how it is designed matter more than simply installing skills. [SkillsBench introduction](https://www.skillsbench.ai/blogs/introducing-skillsbench)

The studies use different tasks and methodologies, so their numerical results should not be compared directly. Their shared implication is more important:

> A skill should encode evidence-backed procedural advantage that the base agent would otherwise miss. Generic restatements add context without reliably adding capability.

### 1.5 Public skills frequently fail at routing and packaging

A 2026 Agent Skills workshop study analyzing roughly 138,000 public `SKILL.md` files reported widespread detected defects. Its most common issues included missing trigger guidance, redundant body content, and excessive inline examples. In its description-only routing stress test, defect-free metadata retrieved more reliably than defective metadata. [What Keeps Agent Skills from Being Reusable?](https://openreview.net/pdf/3a0ffc73b487443feb8f2abdacbf3200299cf797.pdf)

This is observational and detector-based research, not proof that every flagged pattern causes task failure. It nevertheless reinforces the need for:

- Explicit trigger descriptions.
- Lean main files.
- Progressive disclosure.
- Portability checks.
- Evaluation beyond static formatting.

### 1.6 Precise contracts improve agent behavior

Anthropic's tool-design research recommends distinct capabilities, semantically meaningful names, focused results, controllable response detail, explicit inputs and outputs, and evaluation of actual agent trajectories. It demonstrates that concise tool responses can use roughly one third of the tokens of detailed responses in one example, but also warns that the optimal format depends on the task and model. [Writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents)

These tool-design lessons transfer directly to skills:

- Give each instruction or route one clear purpose.
- Use meaningful terminology rather than cryptic abbreviations.
- Bound intermediate outputs.
- Specify exact handoff fields.
- Offer detail only where the next action needs it.
- Test the contract with the target agents.

## 2. What Caveman and Cavecrew teach

### 2.1 Caveman is primarily output compression

The community [Caveman skill](https://github.com/JuliusBrussee/caveman) asks agents to remove filler, pleasantries, narration, hedging, and repeated facts while preserving code, commands, API names, identifiers, and exact errors. It includes an “auto-clarity” exception for security warnings, destructive confirmations, and sequences where fragments would create ambiguity.

Its core insight is valid:

- Conversational wrapper consumes output tokens.
- Those outputs become input context on later turns.
- Repeated narration compounds in long sessions.
- Exact technical tokens must survive compression.

Its own documentation distinguishes output-token savings from unchanged reasoning and acknowledges that the economics differ between long cached sessions and one-shot use. A third-party analysis likewise notes that a compression skill may add more initial input than it saves for a one-off task. [Better Stack analysis](https://betterstack.com/community/guides/ai/caveman-llm/)

Therefore, Caveman does **not** establish that Agent Skills should themselves be written in fragmentary grammar.

### 2.2 Cavecrew is constrained-interface compression

[Cavecrew](https://github.com/JuliusBrussee/caveman/tree/main/skills/cavecrew) applies the compression idea to subagent handoffs:

- An investigator returns path- and line-first findings.
- A builder accepts only one or two files and returns a small edit receipt.
- A reviewer returns one line per severity-tagged finding.
- Each role has explicit refusal states.
- The builder lacks shell access, limiting its operational scope.

This pattern is more transferable to the product-lifecycle collection than stylized prose. It saves context through:

- Narrow responsibilities.
- Bounded scope.
- Restricted tools.
- Stable output schemas.
- Terminal failure codes.
- No play-by-play narration.
- Separation between compact machine/agent handoff and richer human explanation.

The project's release notes claim substantially smaller subagent handoffs; treat that number as project-reported rather than independently verified. [Caveman releases](https://github.com/JuliusBrussee/caveman/releases)

### 2.3 Adopt the principle, not the dialect

Adopt:

- No greetings or self-congratulation in skill instructions.
- No explanation of obvious concepts.
- No tool-call narration unless a decision needs transparency.
- One fact in one canonical place.
- Exact code, identifiers, commands, and errors.
- Compact structured receipts for agent-to-agent work.
- Normal language for safety, ambiguity, irreversible action, and human-facing deliverables.

Do not adopt globally:

- Dropped articles and conjunctions.
- Invented abbreviations.
- Fragmentary sequences whose order is unclear.
- Compressed safety warnings.
- Dense symbol systems that require decoding.
- A universal terse style applied to public documentation, research, UX copy, proposals, or customer artifacts.

## 3. Optimize structure before wording

Compression should happen in this order:

### Pass 1: remove irrelevant knowledge

Delete information the base model already knows unless the skill changes the default.

Weak:

```markdown
Accessibility is the practice of making products usable by people with disabilities. It is important because many users rely on assistive technology.
```

Strong:

```markdown
For custom controls, specify keyboard behavior, focus order, accessible name, role, state, error association, and screen-reader announcement.
```

The second version adds procedural detail the model may otherwise omit.

### Pass 2: remove duplication

Every rule should have one canonical home:

```text
description = activation
SKILL.md     = invariant and route
reference    = conditional procedure
asset        = reusable output material
script       = deterministic operation
```

Do not repeat a complete reference summary in `SKILL.md`.

### Pass 3: split mutually exclusive branches

If iOS and Android guidance rarely apply together, keep them in sibling references selected by a surface route.

```text
SKILL.md
├── references/surface-ios.md
└── references/surface-android.md
```

Do not make every `/design` invocation pay for both.

### Pass 4: replace prose with a contract where appropriate

Weak:

```markdown
After you finish, you should provide information about what you changed, any assumptions you made, things that could go wrong, and what the next person should probably do.
```

Strong:

```yaml
handoff:
  artifacts: []
  decisions: []
  assumptions: []
  risks: []
  unresolved: []
  recommended_next: []
```

Use schemas for repeated fields, not for nuanced reasoning that benefits from prose.

### Pass 5: convert repeated mechanics into code

If every run recreates the same validator, parser, renderer, scoring function, or export transformation, bundle and test a script. A script can execute without loading all its source into context.

### Pass 6: compress sentences

Only after the architecture is correct should wording be tightened:

- Replace nominalizations with verbs.
- Remove throat-clearing.
- Remove duplicate adjectives.
- Prefer one precise term over several synonyms.
- Use imperative steps.
- Keep conditions, causality, exceptions, and sequence words.
- Preserve domain terms and exact syntax.

Structural pruning usually saves more tokens with less ambiguity than deleting grammatical glue.

## 4. The six functions of a high-signal instruction

Every sentence or table row in an agent-loaded file should perform at least one function.

### 4.1 Route

```markdown
Read `references/prototyping.md` when the request asks for a clickable concept, coded design exploration, or other pre-production learning artifact.
```

### 4.2 Supply non-obvious knowledge

```markdown
On iOS, treat the interactive pop gesture as part of navigation behavior; do not replace it with a custom back interaction without explicit justification.
```

### 4.3 Constrain a consequential choice

```markdown
Classify prototype code as disposable, design reference, or production candidate. Never imply production readiness without engineering and quality validation.
```

### 4.4 Sequence execution

```markdown
1. Read the existing token source.
2. Change the canonical token.
3. Regenerate derived platform files.
4. Validate that generated files contain no manual drift.
```

### 4.5 Define an artifact contract

```markdown
Produce a flow containing actors, entry conditions, steps, decision points, failure recovery, exit conditions, and unresolved assumptions.
```

### 4.6 Require validation or safe failure

```markdown
If the approved design omits an error or permission state required by the implementation, stop the handoff and report the missing state instead of inventing production behavior silently.
```

If a line serves none of these functions, challenge its presence.

## 5. Recommended information budgets

The Agent Skills specification provides the formal recommendation of fewer than 5,000 tokens and 500 lines for the main file. The tighter numbers below are initial engineering targets for this collection, not platform limits.

| Surface | Target | Review threshold | Reason |
|---|---:|---:|---|
| Description | 250–600 characters | 800 characters | Catalog cost and possible truncation |
| Description opening | Primary intent in first 120–180 characters | Missing primary intent | Preserve activation signal if shortened |
| `SKILL.md` | 800–2,500 tokens | 3,500 tokens | Enough for routing, workflow, and validation without becoming a manual |
| Reference leaf | 300–1,500 tokens | 2,500 tokens | Readable as one selected module |
| Canonical inline examples | 1–3 per failure-prone pattern | More than 5 for one pattern | Examples are powerful but expensive |
| Agent handoff | 100–400 tokens plus artifact links | 700 tokens | Preserve decisions without replaying the work |
| Progress receipt | 1–5 lines | Repeated narrative paragraphs | Keep long-running context clean |

Do not meet a budget by removing required knowledge. If a coherent workflow genuinely needs more content, use progressive disclosure and validate the actual token-quality trade-off.

## 6. Description standard

### 6.1 Required content

Write the description in this order:

1. Primary user outcome.
2. Major artifacts or subdomains.
3. Indirect trigger vocabulary.
4. Close-neighbor exclusions.

Example:

```yaml
description: Design digital-product experiences across websites, web apps, iOS, and Android. Use for UX research, information architecture, user journeys, task flows, wireframes, UI, content design, design systems, prototypes, usability testing, or frontend handoff. Do not use for production client implementation, backend architecture, or marketing strategy unless the request also requires experience design.
```

### 6.2 Remove from descriptions

- “This powerful skill helps…”
- Internal folder structure.
- Installation instructions.
- General philosophy.
- Long lists of technologies that do not affect activation.
- Duplicate synonyms added only for SEO.
- Capabilities owned by neighboring packs.

### 6.3 Evaluate rather than guess

Maintain realistic should-trigger and should-not-trigger prompts, including close neighbors. Run each multiple times and record activation rates. Official Agent Skills guidance suggests about 20 positive and negative queries and three runs as a starting point. [Optimizing skill descriptions](https://agentskills.io/skill-creation/optimizing-descriptions)

## 7. `SKILL.md` standard

Use this order:

```text
frontmatter
mission and ownership boundary
route before acting
universal invariants
core workflow
artifact/output contract
validation and completion
compact resource map
```

### 7.1 Mission and boundary

Use two or three sentences. State what the pack owns and the most important adjacent work it does not own.

### 7.2 Route before acting

Use conditional rows:

| User intent | Read or run | Expected contribution |
|---|---|---|
| Prototype an experience | `references/prototyping.md` | Prototype classification, artifact, test plan |
| Apply iOS-specific interaction rules | `references/surface-ios.md` | Native behavior constraints |
| Prepare production implementation | `references/handoff.md` | Frontend-ready state and behavior specification |

Do not provide a bare list of filenames.

### 7.3 Universal invariants

Include only rules that apply to nearly every invocation. Put rare conditions in their reference branch.

### 7.4 Core workflow

Keep it short and outcome-oriented:

```markdown
1. Inspect the request, evidence, and existing artifacts.
2. Select the smallest sufficient route.
3. Record material assumptions.
4. Produce the requested artifact.
5. Validate it against constraints and acceptance criteria.
6. Emit a compact handoff when downstream work is expected.
```

### 7.5 Artifact contract

Specify required content, not decorative formatting. If exact formatting is mechanically important, provide a template or schema.

### 7.6 Completion

Define what evidence permits the agent to stop. A vague instruction such as “ensure quality” adds little signal.

Strong:

```markdown
Before completion:
- Confirm every requested artifact exists.
- Verify applicable acceptance criteria.
- Record unresolved decisions and their owners.
- Distinguish validation performed from validation remaining.
```

## 8. Reference standard

Begin every reference with a primacy block:

```markdown
# Prototyping

Purpose: Choose and build the cheapest artifact that can answer the current experience question.

Read when:
- The request asks for a prototype, clickable concept, or coded design exploration.
- The team needs evidence before production implementation.

Skip when:
- The task is production frontend implementation.
- The uncertainty is technical feasibility; route to `/architecture`.

Inputs:
- Hypothesis or decision to inform.
- Audience, surface, and constraints.

Produces:
- Prototype classification.
- Prototype artifact.
- Test plan and findings.
- Production-readiness caveats.
```

Then include:

- Domain procedure.
- Decision defaults and exceptions.
- One or two canonical examples when necessary.
- Validation.
- Failure modes and handoff.

For a reference longer than roughly 100 lines, add a compact TOC. Split it only if the resulting files are selected independently. Keep required references directly reachable from `SKILL.md`.

## 9. Examples: expensive versus high-signal

### 9.1 Generic philosophy

Expensive:

```markdown
User experience is a critical aspect of any successful product. It is important to think carefully about users and make sure the interface is intuitive, delightful, accessible, responsive, and easy to use across different devices.
```

High signal:

```markdown
For every critical flow, specify entry conditions, primary path, alternate paths, loading, empty, error, permission, recovery, and completion states.
```

### 9.2 Vague validation

Expensive:

```markdown
Make sure to test everything carefully and follow all relevant best practices before finishing.
```

High signal:

```markdown
Validate keyboard-only completion, visible focus, screen-reader naming, 200% zoom reflow, reduced motion, and error recovery for each custom interaction.
```

### 9.3 Repeated prohibition

Expensive:

```markdown
Do not assume the prototype is production ready. Remember that prototype code is not production code. Never tell the user it is ready for production unless it has been reviewed.
```

High signal:

```markdown
Label prototype code `disposable`, `design-reference`, or `production-candidate`. Only the last may enter engineering review; none is production-ready before implementation and quality validation.
```

### 9.4 Menu of equal options

Expensive:

```markdown
You can make a paper prototype, low-fidelity wireframe, high-fidelity mockup, HTML prototype, React prototype, SwiftUI prototype, Compose prototype, or use another prototyping tool depending on the situation.
```

High signal:

```markdown
Default to the lowest fidelity that tests the uncertainty. Use coded interaction only when behavior, responsiveness, motion, device input, or technical integration affects the answer.
```

### 9.5 Over-compressed ambiguity

Unsafe:

```markdown
Migration drop old column backup first verify then ship.
```

Clear and still compact:

```markdown
Before dropping the old column: create a backup, verify restore, migrate readers, confirm zero old-column reads, then remove the column.
```

Grammar that preserves order and conditions is signal, not noise.

## 10. Dual-channel output standard

Do not force the same verbosity on every output.

### 10.1 Full-fidelity artifact

The primary deliverable may require substantial detail:

- Product strategy.
- Research synthesis.
- Architecture decision.
- Design specification.
- Source code.
- Security report.
- Marketing plan.
- Sales playbook.

Optimize its structure and eliminate repetition, but do not compress away evidence, reasoning, alternatives, accessibility requirements, risk, or implementation detail.

### 10.2 Compact agent handoff

The downstream agent usually needs a small index into the artifact:

```yaml
handoff_version: 1
skill: design
status: complete
objective: "Design an iOS onboarding experience"
inputs_used:
  - path: artifacts/product-brief.md
    type: product-brief
    owner: product
artifacts_created:
  - path: artifacts/onboarding-prototype/
    type: prototype
    owner: design
decisions:
  - "Use progressive disclosure for optional profile fields"
assumptions: []
constraints:
  - "Native iOS navigation and Dynamic Type required"
risks:
  - "Offline recovery not validated"
unresolved:
  - owner: product
    question: "Can users skip account personalization?"
validation:
  performed:
    - "Prototype walkthrough completed"
  remaining:
    - "Usability test with target users"
recommended_next:
  - skill: frontend
    reason: "Implement approved states"
```

Do not repeat the full artifact inside the handoff.

### 10.3 Compact execution receipt

For bounded implementation:

```text
src/onboarding/Flow.swift:42-88 — added recoverable permission-denied state.
Tests/OnboardingFlowTests.swift:31-64 — covered retry and skip paths.
verified: targeted tests pass.
```

This adopts Cavecrew's location-first receipt principle without forcing cryptic language.

### 10.4 Normal-language exception

Use complete plain language for:

- Security warnings.
- Irreversible or destructive actions.
- Legal, privacy, financial, or medical risk.
- Complex ordering.
- Ambiguity that needs a user decision.
- Human-facing executive or customer communication.
- Any case where compression increases misinterpretation risk.

## 11. Tool and script output rules

Agent tools and scripts should return the smallest sufficient result:

- Filter before returning.
- Paginate large results.
- Support range or field selection.
- Truncate with a clear continuation method.
- Resolve opaque identifiers to meaningful names where possible.
- Put the decisive error first.
- Return exact paths, lines, symbols, and validation status.
- Offer `concise` and `detailed` modes only when both have real consumers.

Do not dump:

- Entire logs when one error line and context window suffice.
- All database rows when an aggregate answers the question.
- Full files when a targeted range is enough.
- Tool implementation narration.
- Redundant success messages.

## 12. Prompt caching is not a license to bloat

OpenAI prompt caching can reduce latency and billed input cost when requests share an exact prefix. Static instructions and examples should appear before variable content to maximize cache reuse. [OpenAI prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)

Caching does not remove:

- The context-window footprint.
- Competition between relevant and irrelevant instructions.
- The possibility of stale or conflicting guidance.
- The need for clear routing.
- First-use input cost.
- Costs in clients or models with different caching behavior.

Therefore, optimize skills for semantic efficiency first and caching second.

## 13. Canonical examples, not example libraries

Examples are valuable when they demonstrate behavior more efficiently than prose. OpenAI recommends diverse few-shot examples when a pattern must be learned, while Anthropic recommends a small curated set rather than a laundry list of edge cases. [OpenAI prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering), [Anthropic context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

Include an example when it teaches:

- An exact output schema.
- A subtle decision boundary.
- A failure or refusal format.
- A non-obvious tool invocation.
- A common ambiguity that prose has not resolved.

Avoid examples that merely repeat the rule with different nouns.

Prefer:

```text
one normal case
one boundary case
one refusal or failure case
```

Move larger example sets into evaluation fixtures rather than runtime references.

## 14. High-signal authoring workflow

### Step 1: establish the capability delta

Write down what a capable base agent gets wrong without the skill:

- Missing domain constraint.
- Incorrect workflow order.
- Fragile command.
- Unknown schema.
- Inconsistent output.
- Wrong tool choice.
- Incomplete validation.

If no meaningful gap exists, do not create the skill.

### Step 2: extract from real work

Capture:

- Steps that produced success.
- Corrections supplied by a human.
- Non-obvious decisions.
- Inputs and outputs.
- Failure modes.
- Repeated scripts or templates.

### Step 3: classify every candidate instruction

Tag it:

```text
A = activation
U = universal
R = route-specific
D = deterministic operation
O = output asset
E = evaluation only
```

Place it accordingly:

| Tag | Destination |
|---|---|
| A | Description |
| U | `SKILL.md` |
| R | `references/` |
| D | `scripts/` |
| O | `assets/` |
| E | `evals/` outside runtime context |

### Step 4: write the smallest complete router

Define mission, boundary, route conditions, invariants, workflow, artifact contract, and completion.

### Step 5: add conditional depth

Add only references that real tasks require. Every reference must have an observable loading condition.

### Step 6: compress without damaging semantics

Run the structural and sentence passes from Section 3.

### Step 7: validate and benchmark

Compare:

- No skill.
- Current skill.
- Compressed candidate.

Measure activation, traversal, outcome, tokens, time, ambiguity, and human usability.

## 15. Evaluation framework

### 15.1 Measure four layers independently

| Layer | Question | Metrics |
|---|---|---|
| Activation | Did the correct skill load? | Precision, recall, near-miss errors |
| Traversal | Did it load the right modules? | Required reads, irrelevant reads, dead ends |
| Execution | Did the workflow improve the result? | Acceptance-criteria pass rate, tool errors, rework |
| Efficiency | What did the improvement cost? | Input, cached input, output, tool-result tokens, latency |

### 15.2 Add a compression ablation

Test at least three variants:

```text
V0: no skill
V1: full skill
V2: high-signal compressed skill
```

Do not accept V2 merely because it is shorter. It must preserve or improve:

- Task success.
- Safety.
- Required-reference recall.
- Artifact completeness.
- Human comprehension.

### 15.3 Test instruction retention

Include tasks that exercise rules placed near the beginning, middle, and end of selected references. If middle rules are frequently missed, restructure the file rather than adding repeated reminders.

### 15.4 Test adversarial near misses

Examples:

- `/design` versus `/frontend` for coded prototypes.
- `/marketing` versus `/growth` for landing-page experiments.
- `/ai` versus `/automation` for an AI-assisted deterministic workflow.
- `/architecture` versus `/quality` for security requirements and verification.

### 15.5 Inspect trajectories

Look for:

- Re-reading the same files.
- Loading every reference.
- Tool narration.
- Repeated summaries.
- Ignored output contracts.
- Generic advice that does not affect the work.
- Conflicts with repository evidence or current versions.
- Premature completion.

Token counts alone cannot reveal these failures.

## 16. Review rubric

Score each dimension from 0 to 2.

| Dimension | 0 | 1 | 2 |
|---|---|---|---|
| Activation signal | Vague or missing | Usable but broad | Front-loaded intent and tested boundaries |
| Capability delta | Generic knowledge | Some specialization | Clear non-obvious procedural advantage |
| Routing | Bare files or none | Partial conditions | Minimal sufficient conditional routes |
| Workflow | Philosophy or loose advice | Mostly actionable | Ordered, bounded, and artifact-driven |
| Domain precision | Generic “best practices” | Some concrete rules | Exact domain facts, defaults, and exceptions |
| Output contract | Unspecified | Described loosely | Testable artifact or schema |
| Validation | “Ensure quality” | Partial checks | Evidence-based completion and safe failure |
| Progressive disclosure | Monolithic | Some references | Universal core plus focused direct leaves |
| Token efficiency | Repetitive | Generally concise | Every line serves a defined function |
| Clarity | Cryptic or ambiguous | Understandable | Compact with conditions and order preserved |
| Portability | Host-specific assumptions | Documented coupling | Standard paths and explicit dependencies |
| Evaluation | None | Happy-path test | Activation, traversal, output, and ablation evals |

Recommended release threshold:

```text
No dimension scores 0.
Activation, workflow, validation, clarity, and portability score 2.
Total score ≥20/24.
```

Treat this as a review aid, not a substitute for task evaluations.

## 17. Static lint rules

Warn on:

- Description lacks “use when” intent or equivalent trigger language.
- Description begins with marketing language rather than the primary outcome.
- Name is repeated as an explanatory heading with no additional information.
- Main body exceeds the agreed token threshold.
- Generic phrases such as “follow best practices,” “ensure quality,” or “handle errors appropriately” lack concrete behavior.
- Required references are not linked directly from `SKILL.md`.
- A route lists a file without a loading condition.
- The same paragraph or checklist appears in multiple files.
- More than five inline examples teach the same pattern.
- Invented abbreviations are undefined.
- Uppercase `ALWAYS` or `NEVER` appears without a reason, safety rule, or tested necessity.
- Version-specific guidance lacks a compatibility condition or verification step.
- Platform-specific absolute paths appear in portable instructions.
- A script is described but missing, interactive, or untested.
- An exported skill contains unresolved wiki links.
- A handoff duplicates a complete artifact.
- Safety or destructive-action guidance is compressed into ambiguous fragments.

Fail the build on:

- Invalid frontmatter.
- Broken required paths.
- Unresolved required references.
- Package paths escaping the skill root.
- Missing deterministic validator required by the workflow.
- Contract schema incompatibility.
- Trigger regression beyond the accepted threshold.
- Outcome regression in critical evaluation cases.

## 18. Collection-wide writing rules

Apply these rules to `/product`, `/design`, `/architecture`, `/frontend`, `/backend`, `/data`, `/ai`, `/automation`, `/quality`, `/operate`, `/marketing`, `/sales`, `/growth`, `/success`, and `/digital-product`. The same authoring principles may be used by `/orchestrate`, but that skill remains outside the digital-product lifecycle family.

### Keep

- Plain, precise technical language.
- Imperative steps.
- Observable route conditions.
- Explicit defaults and escape conditions.
- Exact domain terminology.
- Artifact-oriented outputs.
- Evidence-based completion.
- Short structured handoffs.
- Normal prose when ambiguity or risk warrants it.

### Remove

- Greetings and filler.
- Motivational prose.
- Definitions the model already knows.
- Duplicate rationale.
- Exhaustive option menus.
- Unrouted reference catalogs.
- Tool-call play-by-play.
- Decorative output requirements without functional value.
- Repeated conclusions.

### Move

- Conditional domain depth to references.
- Reusable formatting to assets.
- Mechanical operations to scripts.
- Large example collections to eval fixtures.
- Human marketing, installation, and contribution documentation outside runtime skill folders.

## 19. Repository-local enforcement artifacts

Every `<skill>-skill` repository should enforce this standard locally. Do not depend on a sibling repository checkout and do not create divergent Markdown copies of the standard. Reusable CI actions may be pinned and shared, but each repository owns its evaluation data and release result.

```text
scripts/
├── lint-skill
├── count-skill-tokens
├── test-triggering
├── test-traversal
└── compare-skill-variants

evals/
├── activation/
├── traversal/
├── output/
└── compression-ablation/
```

`digital-product-skill` additionally owns the lifecycle integration artifacts:

```text
contracts/
└── handoff/
    └── v1.schema.json

compatibility/
└── skills.yaml

evals/
├── composition/
├── feedback/
├── resume/
└── compatibility/
```

The release build must include every runtime-required contract or validator inside the installable skill artifact. Repository-root source paths and sibling checkouts are not runtime dependencies.

Each repository's public documentation may be detailed. The agent-loaded skill pack should contain only what execution requires.

## 20. Final standard

Use this editorial test for every sentence:

```text
Does agent need this to choose, decide, act, produce, validate, or fail safely?
```

If no:

```text
delete it
move it
turn it into data
turn it into code
or keep it only in human documentation
```

The target style is:

```text
Dense enough to save context.
Clear enough to execute once.
Specific enough to change behavior.
Modular enough to load selectively.
Complete enough to validate.
Safe enough to refuse ambiguity.
```

Use Caveman principles for eliminating wrapper and Cavecrew principles for constrained handoffs. Do not use caveman grammar as the default authoring language. The best optimization is not the fewest words; it is the fewest tokens that preserve correct routing, expert behavior, artifact quality, and safe completion.
