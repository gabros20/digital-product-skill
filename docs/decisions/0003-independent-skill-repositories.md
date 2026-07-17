# ADR-0003: Use independent skill repositories with a lifecycle composition skill

## Status

Accepted

Supersedes [ADR-0001: Manage the skill collection in one monorepo and release packs independently](0001-monorepo-with-independent-skill-releases.md). Amends the repository naming and composition portions of [ADR-0002](0002-product-identity-and-terminology.md).

Documentation map: [Digital Product Skills documentation](../README.md)

## Date

2026-07-16

## Context

The domain skills are intended to become strong general-purpose capabilities. `frontend`, `backend`, `design`, `marketing`, and the other skills must remain useful to people who do not install or use the full digital-product lifecycle.

A monorepo would permit independent package versions, but it would still give the skills one source boundary, one issue space, and one repository identity. That optimizes coordinated authoring while weakening the desired product-level independence and GitHub discoverability of each skill.

The lifecycle still needs one capability that knows how to turn an end-to-end product objective into a dependency graph, select domain skills, track progress, enforce gates, preserve decisions, and route feedback. That capability is the `digital-product` skill.

The existing `orchestrate` skill solves a different problem: coordinating work across multiple agents. It must not be repurposed as the digital-product lifecycle coordinator.

## Decision

### 1. Give every skill its own repository

Use one source repository for each skill. Name every repository `<skill>-skill` while preserving the shorter runtime identifier.

| Skill | Repository |
|---|---|
| `product` | `product-skill` |
| `design` | `design-skill` |
| `architecture` | `architecture-skill` |
| `frontend` | `frontend-skill` |
| `backend` | `backend-skill` |
| `data` | `data-skill` |
| `ai` | `ai-skill` |
| `automation` | `automation-skill` |
| `quality` | `quality-skill` |
| `operate` | `operate-skill` |
| `marketing` | `marketing-skill` |
| `sales` | `sales-skill` |
| `growth` | `growth-skill` |
| `success` | `success-skill` |
| `digital-product` | `digital-product-skill` |

Keep `orchestrate` in `orchestrate-skill` as a separate general-purpose skill outside the lifecycle inventory.

### 2. Make every domain repository independently complete

Each domain repository owns:

- Its canonical `SKILL.md`, references, scripts, assets, and optional client metadata.
- Its README as the primary GitHub storefront.
- Domain documentation, examples, architecture decisions, and optional documentation site.
- Its own semantic version, Git tags, changelog, and releases.
- Activation, traversal, output, safety, and regression evaluations.
- Its own issues, roadmap, maintainers, and contribution rules.
- Its installable plugin or package containing one primary skill.
- Its declared compatibility with optional integration contracts.

The standard shape is:

```text
frontend-skill/
├── .codex-plugin/
│   └── plugin.json
├── skills/
│   └── frontend/
│       ├── SKILL.md
│       ├── agents/
│       │   └── openai.yaml
│       ├── references/
│       ├── scripts/
│       └── assets/
├── docs/
├── evals/
├── scripts/
├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
└── LICENSE
```

Only `skills/<name>/SKILL.md` is required at runtime. Add optional directories when the skill actually needs them. Repository-level documentation must not be placed inside the runtime skill directory.

### 3. Use independent versions and releases

Each repository uses ordinary semantic versions and repository-local tags:

```text
frontend-skill  v2.1.0
backend-skill   v1.8.3
design-skill    v1.5.1
```

No collection version forces unrelated releases. Each repository determines its own patch, minor, and major changes from its public behavior and artifact contracts.

### 4. Make `digital-product` the lifecycle composition skill

The `digital-product-skill` repository owns the system-level lifecycle behavior. Its skill:

- Converts a broad product objective into an explicit lifecycle plan.
- Determines which domain skills are required and which are unnecessary.
- Inspects skill availability and compatible versions.
- Builds a dependency graph rather than forcing a fixed waterfall.
- Defines stage gates, acceptance criteria, approvals, and completion conditions.
- Runs or activates the required installed domain skills through supported client mechanisms.
- Tracks lifecycle state, artifacts, decisions, risks, owners, progress, and next actions.
- Parallelizes work when artifact dependencies allow it.
- Validates handoffs before advancing.
- Routes failed validation or invalidated assumptions back to the correct domain owner.
- Resumes an interrupted lifecycle from durable state.
- Completes only when the end-to-end objective is satisfied.

Invoking a domain skill alone does not authorize hidden chaining. Invoking `digital-product` explicitly requests composition, so it may select and run domain skills after declaring the plan and dependencies.

`digital-product` must not copy the complete knowledge of its domain dependencies. The domain repositories remain authoritative for how specialist work is performed.

### 5. Keep `orchestrate` separate

`orchestrate` coordinates agents. `digital-product` coordinates lifecycle capabilities and artifacts.

```text
digital-product = what product work is needed, in what dependency order, with which gates
orchestrate      = how work is assigned and coordinated across multiple agents
```

`digital-product` must work in a single-agent execution model. It may optionally use `orchestrate` when parallel or delegated multi-agent work is beneficial. Neither is a required runtime dependency of the other.

### 6. Let `digital-product-skill` own integration contracts

Store the canonical lifecycle handoff schema, lifecycle-state format, compatibility declarations, and composition evaluations in `digital-product-skill`:

```text
digital-product-skill/
├── contracts/
│   └── handoff/
│       ├── v1.schema.json
│       └── examples/
├── compatibility/
│   └── skills.yaml
└── evals/
    ├── composition/
    ├── feedback/
    ├── resume/
    └── compatibility/
```

The handoff contract has an independent version. A domain repository declares the contract versions it produces or consumes and tests its own conformance. Supporting the contract is optional for standalone use; it is required only for a version advertised as compatible with `digital-product` composition.

Release artifacts must not depend on relative paths into another checkout or on repository-root files omitted from the package. The `digital-product-skill` build copies its required pinned schema and instructions into the self-contained runtime artifact. A compatible domain repository packages the small contract instructions it needs or retrieves a pinned, verified contract artifact during development and release.

### 7. Test compatibility without a monorepo

Use both sides of the integration boundary:

- Each domain repository runs contract and fixture tests for the handoffs it claims to support.
- `digital-product-skill` runs full-chain tests against declared compatible releases.
- The compatibility matrix records supported version ranges.
- Reproducible evaluation runs record exact repository versions or commit SHAs.
- Contract changes are additive within a major version or receive a new major version.
- A domain skill may release independently without waiting for the composition skill when its integration contract remains compatible.

Cross-repository automation may open coordinated pull requests when a contract change affects several skills. Coordination cost is accepted in exchange for genuine repository independence.

### 8. Give every repository its own storefront

Every repository README should explain:

- The skill's outcome and activation boundary.
- Typical inputs and outputs.
- Installation and supported clients.
- Standalone examples.
- Optional `digital-product` compatibility.
- Documentation, evaluations, releases, and contribution links.
- An optional repository-owned documentation site when the README is no longer sufficient.

`digital-product-skill` provides the portfolio-level lifecycle overview and links to compatible domain repositories. An aggregate website or GitHub profile may be generated later from repository manifests, but it is a discovery surface rather than a source repository or authority over domain behavior.

### 9. Do not create source bundles

Installation recipes may recommend a compatible set of skill releases, but they must not copy the canonical source of several skills into a new repository. If a platform later requires a bundle artifact, generate it from pinned releases and treat it only as a distribution view.

## Alternatives considered

### One monorepo with independent package versions

Advantages:

- Atomic cross-skill changes.
- Simple shared tooling and integration tests.
- One checkout and issue tracker.

Rejected because the desired skills are standalone capability products. Separate repositories better support independent identity, discovery, documentation, roadmaps, ownership, and reuse outside the lifecycle system.

### One repository containing only a large `digital-product` skill

Rejected because it would duplicate domain knowledge, make every user install the entire lifecycle, and prevent `frontend`, `backend`, and other capabilities from evolving independently.

### Use `orchestrate` as the lifecycle composer

Rejected because multi-agent execution and digital-product lifecycle composition are separate concerns. Conflating them would make both skills less general and less precise.

### A dedicated repository for shared contracts

Deferred. The lifecycle handoff currently exists to serve `digital-product`, so that repository owns it. Extract a neutral contract repository only if several unrelated composition systems adopt the protocol and require independent governance.

## Consequences

### Benefits

- Each skill has a clear living space and GitHub identity.
- Repository search and browsing immediately distinguish agent skills through the `-skill` suffix.
- Skills release, document, and evolve independently.
- Domain skills remain reusable outside the Digital Product Skills lifecycle.
- `digital-product` provides a convenient full-system entry point without hard-coupling the sources.
- `orchestrate` remains a clean general multi-agent capability.
- Failure, rollback, and ownership boundaries are easier to isolate per skill.

### Costs and risks

- Contract changes can require coordinated work across repositories.
- Shared linting and CI workflows may drift.
- Compatibility testing requires fetching or installing external releases.
- Issues and documentation are distributed.
- Discoverability across the complete family needs deliberate linking and consistent metadata.

### Mitigations

- Publish reusable lint and evaluation workflows without centralizing domain sources.
- Use a versioned handoff contract and explicit compatibility matrix.
- Maintain consistent repository templates and required checks.
- Link related repositories from every README.
- Run pinned cross-skill evaluations in `digital-product-skill`.
- Automate coordinated update pull requests when contracts change.

## Revisit conditions

Reconsider only if repository coordination becomes a demonstrated bottleneck that cannot be handled by shared automation, or if the skills cease to have independent audiences and roadmaps. Do not return to a monorepo merely because one cross-skill change is less convenient.
