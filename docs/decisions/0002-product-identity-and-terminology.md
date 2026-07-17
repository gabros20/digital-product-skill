# ADR-0002: Name the collection Digital Product Skills and separate identity from invocation syntax

## Status

Accepted; repository naming and composition terminology amended by [ADR-0003](0003-independent-skill-repositories.md)

Documentation map: [Digital Product Skills documentation](../README.md)

## Date

2026-07-16

## Decision

Use **Digital Product Skills** as the public name for the skill family. The family is not a single repository.

Give every skill an independent GitHub repository named `<skill>-skill`. For example, the `frontend` skill lives in `frontend-skill`, while the `digital-product` composition skill lives in `digital-product-skill`.

Treat every skill as a standalone capability product with its own documentation, releases, evaluations, and issue lifecycle. Prompt Builder may later provide an authoring or export integration, but the skill sources and public identity must not depend on Prompt Builder.

Use an unprefixed, lowercase, one-word identifier as the canonical name of each domain skill:

```text
product design architecture frontend backend data ai automation
quality operate marketing sales growth success
```

Use the compound identifier `digital-product` for the lifecycle composition skill because it names the complete capability clearly. `orchestrate` is a separate general multi-agent orchestration skill and is not part of the lifecycle inventory.

Treat leading symbols as presentation or client syntax:

| Form | Meaning |
|---|---|
| `design` | Canonical portable skill identifier |
| `/design` | Shorthand used in lifecycle documentation, diagrams, and catalog copy |
| `$design` | Example explicit invocation in Codex |
| `@design` or natural language | Possible invocation in other clients |

Do not encode `/` or `$` in directory names, package names, frontmatter names, versions, or cross-pack contracts.

Do encode the `-skill` suffix in GitHub repository names for clarity and searchability. Do not include that suffix in the runtime skill identifier.

Use these packaging terms consistently:

- **Skill**: the capability and workflow defined by `SKILL.md`.
- **Skill pack**: the complete self-contained runtime source directory for one skill.
- **Plugin**: an installable distribution wrapper; collection policy is one primary skill per plugin.
- **Bundle**: an optional generated release containing several pinned plugins or skills.
- **Composition skill**: `digital-product`, which creates and tracks a lifecycle pipeline from independent domain skills.
- **Multi-agent orchestration skill**: `orchestrate`, which coordinates agent work independently of the product-lifecycle model.
- **Pipeline**: a user- or `digital-product`-selected graph of independent domain-skill executions.

## Context

Earlier exploration used slash-prefixed forms as if they were universal invocation names and used “Product Lifecycle Skills” as a provisional collection label. The later product decision places this work outside Prompt Builder and requires a name that is clear enough for discovery while broad enough to cover design, engineering, operation, distribution, and improvement.

Repository, release, compatibility, and composition boundaries are defined in [ADR-0003](0003-independent-skill-repositories.md), which supersedes [ADR-0001](0001-monorepo-with-independent-skill-releases.md).

Invocation syntax varies by host. Coupling the public identity or filesystem layout to one host's syntax would reduce portability and create ambiguity between a skill, an invocation, and an installable package.

## Consequences

- The skill family has a clear public brand without implying one source repository.
- Every repository is immediately recognizable and searchable as an agent skill through the `-skill` suffix.
- Documentation can retain compact slash-prefixed diagrams without misrepresenting the runtime format.
- The same skill source can be packaged for clients with different invocation conventions.
- Plugin and bundle terminology no longer competes with “skill pack.”
- `digital-product` and `orchestrate` have distinct, non-overlapping identities.
- Prompt Builder integration, if built, remains an adapter rather than an ownership or runtime dependency.

## Revisit conditions

Revisit the public name only if trademark, domain, marketplace, or audience research reveals a material conflict. Do not change canonical skill identifiers merely to match a client-specific command syntax.
