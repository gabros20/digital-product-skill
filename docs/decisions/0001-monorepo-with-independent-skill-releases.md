# ADR-0001: Manage the skill collection in one monorepo and release packs independently

## Status

Superseded by [ADR-0003: Use independent skill repositories with a lifecycle composition skill](0003-independent-skill-repositories.md)

This document is retained as decision history. It is not the current repository architecture.

> Historical decision only: do not implement the repository structure, release workflow, or coordinator model described below. Use [ADR-0003](0003-independent-skill-repositories.md).

Documentation map: [Digital Product Skills documentation](../README.md)

## Date

2026-07-16

## Decision summary

Maintain the complete **Digital Product Skills** collection in one source repository named `digital-product-skills`. Treat each skill pack as an independently versioned and installable release unit.

```text
Author together
Version separately
Publish separately
Document together
Install selectively
Compose dynamically
```

Use one shared documentation site and marketplace for the collection. Do not create a separate repository, README, documentation site, issue tracker, and release pipeline for every skill unless a pack later develops a genuinely independent owner or operational boundary.

## Context

Authoring and context-efficiency rules are defined in the [High-Signal Skill Authoring Standard](../high-signal-skill-authoring-standard.md).

Project identity, independence from Prompt Builder, and invocation terminology are defined in [ADR-0002](0002-product-identity-and-terminology.md).

The proposed collection contains independent packs such as:

```text
/product
/design
/architecture
/frontend
/backend
/data
/ai
/automation
/quality
/operate
/marketing
/sales
/growth
/success
/orchestrate
```

Each pack must work alone, but the collection also shares:

- A handoff protocol.
- Artifact vocabulary.
- Routing and reference conventions.
- Catalog metadata.
- Cross-pack ownership boundaries.
- Trigger, traversal, and pipeline evaluations.
- Validation and publishing tools.
- Documentation and marketplace presentation.
- `/orchestrate` integration.

The repository boundary and release boundary do not need to be identical. Keeping source together makes coordinated changes reviewable and testable, while independent package versions prevent unrelated skills from being released in lockstep.

OpenAI describes skills as the workflow-authoring format and plugins as an installable distribution format. A plugin can contain one or more skills, while a marketplace can expose many plugins, including plugins stored in Git subdirectories. This supports a monorepo containing multiple independently installable plugin packages. See [Build skills](https://learn.chatgpt.com/docs/build-skills) and [Build plugins](https://learn.chatgpt.com/docs/build-plugins).

## Decision

### 1. Use one monorepo as the source of truth

Use a repository shaped approximately like this:

```text
digital-product-skills/
├── README.md
├── LICENSE
│
├── skills/
│   ├── product/
│   ├── design/
│   ├── architecture/
│   ├── frontend/
│   ├── backend/
│   ├── data/
│   ├── ai/
│   ├── automation/
│   ├── quality/
│   ├── operate/
│   ├── marketing/
│   ├── sales/
│   ├── growth/
│   ├── success/
│   └── orchestrate/
│
├── contracts/
│   ├── handoff/
│   │   ├── v1.schema.json
│   │   └── examples/
│   └── artifacts/
│
├── catalog/
│   ├── skills.yaml
│   ├── bundles.yaml
│   └── aliases.yaml
│
├── evals/
│   ├── activation/
│   ├── traversal/
│   ├── cross-pack/
│   └── fixtures/
│
├── plugins/
├── docs/
├── site/
├── scripts/
└── dist/
```

This is a conceptual target structure. Only create directories when their contents are needed.

### 2. Keep each source skill self-contained

Each canonical skill lives under `skills/<name>/`:

```text
skills/design/
├── SKILL.md
├── agents/
│   └── openai.yaml
├── references/
├── scripts/
└── assets/
```

Only `SKILL.md` is required. Add reference, script, and asset directories when they directly support the skill.

For this collection, keep `SKILL.md` frontmatter to the portable baseline fields `name` and `description`. Store versions, lifecycle categories, aliases, compatibility, and release metadata in the catalog or generated package metadata.

Runtime skill folders must not contain repository-level documentation such as a public README, contribution guide, release notes, or changelog. Those belong in the root repository or documentation site. This keeps the agent-facing package focused and avoids loading or exposing irrelevant maintenance material.

### 3. Version every skill independently

Maintain a separate semantic version for each skill pack:

```yaml
skills:
  product:
    version: 1.2.0
  design:
    version: 1.5.1
  frontend:
    version: 2.0.0
  growth:
    version: 0.4.0
  orchestrate:
    version: 1.3.0
```

Store release versions in catalog and generated plugin metadata rather than adding unsupported fields to `SKILL.md` frontmatter.

Use semantic-versioning intent:

| Change | Version impact |
|---|---|
| Correct wording, links, routing, or references without changing the contract | Patch |
| Add a backward-compatible workflow, variant, reference, asset, script, or optional output | Minor |
| Change ownership, required inputs, output contracts, handoff behavior, or remove supported behavior | Major |

Suggested Git tags:

```text
product-v1.2.0
design-v1.5.1
frontend-v2.0.0
orchestrate-v1.3.0
```

Do not create meaningless releases for unaffected packs.

### 4. Version shared contracts independently

Give shared interfaces their own versions:

```text
contracts/handoff/v1.schema.json
contracts/handoff/v2.schema.json
```

The catalog should declare which contract versions a skill produces and consumes:

```yaml
skills:
  design:
    version: 1.5.1
    handoff:
      produces: [v1]
      consumes: [v1]
  frontend:
    version: 2.0.0
    handoff:
      produces: [v1]
      consumes: [v1]
```

Do not make installed skills reference `../../contracts/` outside their own package. A release build must copy or compile the necessary contract instructions or schemas into the standalone artifact. Every installed pack remains usable without the monorepo.

### 5. Publish one independently installable plugin per primary skill

Use one primary skill per plugin so users can install only what they need:

```text
plugins/design/
├── .codex-plugin/
│   └── plugin.json
└── skills/
    └── design/
        ├── SKILL.md
        ├── agents/
        ├── references/
        ├── scripts/
        └── assets/
```

Example generated manifest:

```json
{
  "name": "design",
  "version": "1.5.1",
  "description": "Experience-design workflows for digital products.",
  "skills": "./skills/",
  "repository": "https://github.com/example/digital-product-skills"
}
```

Generate plugin directories into a build or distribution area when practical. Avoid manually maintaining a second copy of each skill under both `skills/` and `plugins/`.

### 6. Publish the collection through one marketplace

Use a single marketplace to expose the independently installable plugins:

```text
Digital Product Skills
├── Product
├── Design
├── Architecture
├── Frontend
├── Backend
├── Data
├── AI
├── Automation
├── Quality
├── Operate
├── Marketing
├── Sales
├── Growth
├── Success
└── Orchestrate
```

The marketplace owns collection-level discovery, ordering, categories, installation policy, and package sources. Current Codex marketplace entries can point to Git-backed subdirectories or pinned refs and SHAs. [OpenAI marketplace guidance](https://learn.chatgpt.com/docs/build-plugins)

### 7. Offer optional bundles only as generated release products

Possible bundles include:

```text
product-core
├── product
├── design
└── architecture

application-build
├── frontend
├── backend
├── data
├── quality
└── operate

intelligent-systems
├── ai
├── automation
├── data
└── quality

go-to-market
├── marketing
├── sales
├── growth
└── success

full-lifecycle
└── all packs
```

Do not make bundles the canonical source. Each bundle must:

- Pin the included pack versions.
- Be generated from canonical skill sources.
- Have its own version.
- Pass compatibility and cross-pack tests.
- Warn about duplicate installation if a user already has an included individual plugin.
- Define predictable upgrade and removal behavior.

Begin with individual plugins. Add bundles only after installation demand and duplicate-handling behavior are understood.

### 8. Use one documentation system

Maintain:

- One root repository README.
- One documentation site.
- One page per skill.
- Shared architecture and composition guides.
- Per-skill release histories or filtered release notes.
- One issue tracker with skill labels or components.

Suggested site paths:

```text
/skills/product
/skills/design
/skills/frontend
/skills/growth
/contracts/handoff
/guides/composing-pipelines
/releases/design
```

Do not create a separate site for each skill. Separate sites would fragment search, navigation, branding, analytics, issue reporting, and maintenance without improving runtime independence.

### 9. Keep clear sources of truth

| Location | Owns |
|---|---|
| `skills/<name>/SKILL.md` | Agent workflow, routing, invariants, and completion behavior |
| `skills/<name>/references/` | Conditional domain and variant knowledge |
| `contracts/` | Shared machine-readable interfaces and examples |
| `catalog/skills.yaml` | Version, category, aliases, compatibility, inputs, outputs, and public metadata |
| `evals/` | Activation, traversal, output-quality, and cross-pack validation |
| `docs/` | Human-facing architecture, decisions, and guides |
| `site/` | Generated public presentation |
| `plugins/` and `dist/` | Generated or packaged install artifacts |

Avoid manually repeating descriptions and version numbers across these surfaces. Generate plugin manifests, marketplace entries, and website cards from canonical metadata, then validate that they remain aligned with `SKILL.md`.

## Release workflow

A release should operate on changed packs rather than the entire repository:

1. Detect changed skills and shared contracts.
2. Validate each changed skill structurally.
3. Run activation and traversal tests for changed descriptions or routers.
4. Run output evaluations for changed workflows, references, scripts, or assets.
5. Run cross-pack tests when a contract or ownership boundary changes.
6. Determine the required version increment for each affected pack.
7. Update canonical catalog versions.
8. Generate self-contained plugin artifacts.
9. Validate that artifacts contain no paths escaping the package.
10. Publish per-skill releases and Git tags.
11. Update the marketplace and documentation site.

A shared-contract change may affect several pack releases, but they remain individually versioned.

## Alternatives considered

### Separate repository per skill

Advantages:

- Completely independent ownership and permissions.
- Isolated issue trackers and release histories.
- Small individual checkouts.
- Natural separation for unrelated communities or licenses.

Disadvantages:

- Cross-pack changes require coordinated pull requests across repositories.
- Handoff and routing conventions drift more easily.
- Repeated CI, documentation, release, and marketplace setup.
- Harder collection-wide trigger and compatibility testing.
- Fragmented website, discovery, contribution, and issue-reporting experience.
- Greater maintenance overhead for an initially unified product family.

Rejected for the initial collection because the packs share governance, contracts, testing, catalog presentation, and orchestration.

### One monorepo with one lockstep collection version

Advantages:

- Very simple release numbering.
- Every published combination is known to have shipped together.

Disadvantages:

- Unchanged packs receive meaningless releases.
- Users cannot understand which capability changed from a version alone.
- Independent installation and compatibility become less clear.
- A fast-moving pack forces releases of stable packs.

Rejected because source coordination does not require synchronized package versions.

### One large plugin containing every skill

Advantages:

- One installation action.
- One plugin version.
- Easy initial packaging.

Disadvantages:

- Users install skills they do not need.
- The initial skill catalog becomes larger.
- Independent enablement, ownership, versioning, and rollback become harder.
- A change to one skill requires updating the entire bundle.
- Individual skill adoption becomes difficult to measure.

Rejected as the default distribution model. It may be offered later as an optional, generated full-lifecycle bundle.

## Consequences

### Benefits

- Atomic changes can update a contract, producers, consumers, orchestration, and tests together.
- Shared validation and publishing tools are written once.
- Users install only relevant packs.
- Stable packs do not release when unrelated packs change.
- One documentation and marketplace experience presents a coherent product family.
- Cross-pack ownership and trigger overlaps can be tested centrally.
- Repository-level search makes the entire capability graph visible to maintainers and agents.

### Costs and risks

- Release tooling must understand multiple independent versions.
- Shared-file changes need impact analysis.
- CI must avoid running every expensive evaluation for every small edit.
- Generated plugin artifacts can drift if the build is not deterministic.
- Bundle installations can conflict with individually installed skills.
- Repository permissions are shared unless additional controls are added.
- The monorepo may grow large if packs accumulate heavy assets or unrelated tooling.

### Mitigations

- Use path-aware CI and an explicit dependency graph.
- Validate generated artifacts rather than committing duplicate hand-maintained sources.
- Maintain a compatibility matrix for contract versions.
- Pin bundle contents.
- Keep large binary assets out of Git or in an appropriate artifact store.
- Use code ownership and required reviewers per skill directory.
- Add release automation before the number of published packs becomes difficult to manage manually.

## When to split a skill into its own repository

Move a pack out of the monorepo only when it develops a material organizational or operational boundary, such as:

- A different owner or external maintainer.
- Separate access controls or confidentiality requirements.
- A distinct license or legal entity.
- Independent security or compliance obligations.
- Large binaries or heavy build dependencies that harm the monorepo.
- A standalone product, brand, contributor community, or support channel.
- A release process that cannot safely coexist with the collection.
- An issue and roadmap lifecycle independent of the other packs.

Do not split solely because a pack has an independent version or install artifact. Repository boundaries should follow ownership and operations, not package boundaries by default.

## Revisit conditions

Reevaluate this decision when any of the following becomes true:

- More than one pack requires separate legal, security, or permission controls.
- CI and checkout costs remain excessive after path filtering and caching.
- External maintainers need autonomous governance that code ownership cannot provide.
- Marketplace or package tooling no longer supports Git subdirectories or independent package sources cleanly.
- Shared contracts are no longer meaningfully shared.
- Most changes affect only isolated packs and collection-wide coordination provides little value.

Until one of these conditions is demonstrated, keep the collection in one monorepo with independent releases.
