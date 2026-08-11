# Digital Product Skills documentation

Status: canonical documentation map
Date: 2026-07-16

## Project identity

**Digital Product Skills** is a family of independently useful agent skills, not one source repository or one bundled runtime package.

Every skill has its own GitHub repository, release history, documentation, evaluations, and installable package. Repository names use the form `<skill>-skill`; runtime skill identifiers do not include the repository suffix.

```text
Skill identifier      Repository
product               product-skill
frontend              frontend-skill
backend               backend-skill
digital-product       digital-product-skill
orchestrate           orchestrate-skill
```

`digital-product` is the lifecycle composition skill. It connects the independent domain skills into a product-delivery pipeline, tracks progress, enforces stage gates, and routes feedback.

`orchestrate` is a separate general-purpose multi-agent orchestration skill. It does not define the digital-product lifecycle and is not the collection coordinator. `digital-product` may optionally use it when multi-agent execution is useful, but neither skill depends on the other.

Prompt Builder may later consume, author, or export these skills, but it is not their source of truth, runtime dependency, or public brand.

See [ADR-0002: Product identity and terminology](decisions/0002-product-identity-and-terminology.md) and [ADR-0003: Independent repositories with a lifecycle composition skill](decisions/0003-independent-skill-repositories.md).

## Document map and authority

| Document | Owns | Status |
|---|---|---|
| [Lifecycle skill-pack model](product-lifecycle-skill-packs-exploration.md) | Canonical domain inventory, lifecycle categories, ownership boundaries, `digital-product` composition behavior, cross-cutting concerns, prototypes, and example pipelines | Canonical model with explicitly listed validation questions |
| [Navigation and steering research](skill-pack-navigation-and-steering-research.md) | Activation, in-skill traversal, cross-skill routing by `digital-product`, progressive disclosure, structural linting, and routing evaluation | Canonical navigation architecture |
| [High-signal authoring standard](high-signal-skill-authoring-standard.md) | Writing rules, token targets, artifact-versus-handoff policy, repository-local review, lint rules, and compression evaluation | Canonical authoring standard |
| [ADR-0003](decisions/0003-independent-skill-repositories.md) | Independent repositories, `<skill>-skill` naming, per-skill ownership and releases, compatibility, integration testing, and the `digital-product` composition boundary | Accepted decision |
| [ADR-0002](decisions/0002-product-identity-and-terminology.md) | Portfolio name, invocation notation, repository suffix, and packaging vocabulary | Accepted; repository portion amended by ADR-0003 |
| [ADR-0001](decisions/0001-monorepo-with-independent-skill-releases.md) | Previous monorepo proposal retained for decision history | Superseded by ADR-0003 |
| [Solo-founder agent operating model](solo-founder-agent-operating-model.md) | Future autonomy model, system layers, recurring pipelines, founder controls, customer support, and adjacent business capabilities | Non-normative future note |

When documents overlap, use this precedence:

1. The latest accepted ADR overrides earlier proposals and superseded ADRs.
2. The lifecycle model owns which domain skills exist, which domain owns an outcome, and how `digital-product` composes them.
3. The navigation document owns how an agent enters and traverses one skill or a composed lifecycle.
4. The authoring standard owns how runtime instructions are written, budgeted, reviewed, and evaluated.
5. Examples illustrate a rule; they do not override it.

If a decision changes, update its owning document first, add or supersede the relevant ADR, and then update dependent examples and links.

## Canonical skill and repository inventory

The fourteen domain skills are independent capability products. Lifecycle categories are discovery metadata, not repository nesting or runtime dependencies.

| Lifecycle category | Skill identifier | Repository |
|---|---|---|
| Discover | `product` | `product-skill` |
| Shape | `design` | `design-skill` |
| Shape | `architecture` | `architecture-skill` |
| Build | `frontend` | `frontend-skill` |
| Build | `backend` | `backend-skill` |
| Build | `data` | `data-skill` |
| Build | `ai` | `ai-skill` |
| Build | `automation` | `automation-skill` |
| Assure | `quality` | `quality-skill` |
| Run | `operate` | `operate-skill` |
| Distribute | `marketing` | `marketing-skill` |
| Distribute | `sales` | `sales-skill` |
| Improve | `growth` | `growth-skill` |
| Improve | `success` | `success-skill` |
| Compose | `digital-product` | `digital-product-skill` |

`orchestrate` lives in `orchestrate-skill` outside this lifecycle inventory. It belongs to the broader agent-work portfolio and remains independently usable.

## Terminology

| Term | Meaning |
|---|---|
| Skill identifier | The portable runtime name, such as `frontend` or `digital-product`. |
| Repository name | The GitHub repository name formed as `<skill>-skill`, such as `frontend-skill`. The suffix is not part of the runtime identifier. |
| `/design` | Documentation, catalog, and diagram shorthand. It is not a portable runtime requirement. |
| `$design` | A client-specific explicit invocation example used by Codex. Other clients may use `@design`, slash commands, or natural-language activation. |
| Domain skill | An independently useful specialist capability such as `design`, `backend`, or `marketing`. |
| Composition skill | `digital-product`, which selects and connects domain skills for a lifecycle objective without absorbing their expertise. |
| Multi-agent orchestration skill | `orchestrate`, a separate skill for assigning and coordinating work across agents. It is not the lifecycle composer. |
| Skill pack | The self-contained runtime directory containing `SKILL.md` and only the references, scripts, assets, and optional client metadata needed by that skill. |
| Plugin | An installable distribution wrapper. Each skill repository publishes one primary skill/plugin. |
| Pipeline | A task-specific directed graph of domain-skill executions and artifact handoffs, not a mandatory waterfall. |
| Handoff | A compact, versioned `handoff.yaml` emitted in pipeline mode or when downstream work is expected. It links to, but does not duplicate, the full domain artifact. |
| Lifecycle state | The durable plan, stage status, artifact registry, decisions, risks, approvals, and next actions maintained by `digital-product`. |

## Architecture invariants

1. Every domain skill is independently installable, invocable, documented, tested, versioned, and useful outside the lifecycle composition.
2. Every skill owns one repository named `<skill>-skill`; repositories are not nested beneath a collection repository.
3. A domain skill invoked alone does not silently activate another skill. It may recommend a next skill in its handoff.
4. Invoking `digital-product` explicitly authorizes lifecycle composition. It may select and run the required installed domain skills, declare dependencies, create stage gates, and track progress.
5. `digital-product` contains composition knowledge, not copies of domain expertise. Domain behavior remains owned by each domain repository.
6. `orchestrate` is not the lifecycle composer. `digital-product` may optionally use it for multi-agent execution, but must also work with one agent or another execution mechanism.
7. Domain artifacts retain one primary owner. Composition, verification, and multi-agent execution do not transfer domain ownership.
8. Each repository releases independently with its own semantic version, changelog, CI, evaluations, issues, documentation, and optional documentation site.
9. The handoff contract has its own version. Supporting it is optional for standalone use and declared explicitly by each repository.
10. `digital-product-skill` owns the canonical lifecycle contract, compatibility matrix, composition evaluations, progress-state format, and full-cycle documentation.
11. Reproducible lifecycle runs record the exact installed skill versions even when compatibility is expressed as version ranges.
12. Every repository README is its primary GitHub storefront. An aggregate website or portfolio index may link to the repositories but does not replace their sources of truth.
13. Runtime `SKILL.md` frontmatter uses `name` and `description` for this collection. Repository, release, compatibility, and storefront metadata live outside the runtime frontmatter.
14. Runtime skill directories contain execution resources only. README, changelog, contribution guidance, public documentation, and repository-level release files stay outside them.

## Standard repository shape

Each domain repository follows the same recognizable pattern:

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

Only add optional directories when they contain material needed by that repository.

The composition repository adds lifecycle integration resources:

```text
digital-product-skill/
├── .codex-plugin/
│   └── plugin.json
├── skills/
│   └── digital-product/
│       ├── SKILL.md
│       ├── agents/
│       │   └── openai.yaml
│       ├── references/
│       ├── scripts/
│       └── assets/
├── contracts/
│   └── handoff/
│       ├── v1.schema.json
│       └── examples/
├── compatibility/
│   └── skills.yaml
├── docs/
├── evals/
│   ├── composition/
│   ├── feedback/
│   ├── resume/
│   └── compatibility/
├── scripts/
│   └── install-family
├── skills-lock.json
├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
└── LICENSE
```

`scripts/install-family` and `skills-lock.json` are composition-repository resources: they install
the composer plus any subset of the domain skills, each from its own repository at its own HEAD.
Neither vendors a domain skill into this repository — that would collapse the polyrepo boundary
[ADR-0003](decisions/0003-independent-skill-repositories.md) establishes, and would make one
repository's release the source of another's content. Subsets are lifecycle-shaped rather than
all-or-nothing, because installing a skill no stage reaches is a standing context cost.

`contracts/` is the canonical repository source. The release build must copy the required pinned schema and instructions into the self-contained `digital-product` runtime artifact; installed skills must never rely on paths into another repository or on files excluded from the package.

These lifecycle-level documents are canonical in `digital-product-skill/docs/`. Domain-specific manuals and ADRs belong only in their owning `<skill>-skill` repositories and should be linked rather than copied.

Detailed release, contract, integration, and repository ownership rules are defined by [ADR-0003](decisions/0003-independent-skill-repositories.md).

## Deliberately unresolved choices

Only the questions listed in Section 16 of the [lifecycle model](product-lifecycle-skill-packs-exploration.md) remain open. They concern rollout defaults, initial implementation depth, composition recovery, and evidence thresholds for adding new domain skills. They do not reopen the accepted polyrepo, repository-naming, skill-identity, or composition-boundary decisions.
