# Digital Product

`digital-product` will be the lifecycle composition skill for the Digital Product Skills family. It will connect independently installable domain skills into end-to-end product workflows, define their order and feedback loops, and maintain durable progress without absorbing their specialist knowledge.

## Current status

This repository is in the research and architecture phase. It currently contains the canonical lifecycle model, navigation research, authoring standard, operating-model note, and architecture decisions. It does not yet contain an installable `digital-product` runtime skill.

Start with the [documentation map](docs/README.md), which explains document ownership, authority, and the accepted architecture.

## Accepted direction

- Each domain skill lives in its own `<skill>-skill` repository and releases independently.
- Runtime skill identifiers remain short and omit the repository suffix.
- `digital-product` composes domain skills, tracks lifecycle state, and manages handoffs and stage gates.
- `orchestrate` remains a separate multi-agent coordination skill and is not the product-lifecycle composer.
- The repository will not claim installability until its runtime skill, contracts, evaluations, and validation gates exist.

## Documentation

| Document | Purpose |
|---|---|
| [Documentation map](docs/README.md) | Canonical index, terminology, authority, and repository model |
| [Lifecycle exploration](docs/product-lifecycle-skill-packs-exploration.md) | End-to-end capability model and domain-skill boundaries |
| [Navigation research](docs/skill-pack-navigation-and-steering-research.md) | Agent activation, routing, traversal, and progressive disclosure |
| [Authoring standard](docs/high-signal-skill-authoring-standard.md) | High-signal, low-noise instruction and evaluation rules |
| [Solo-founder operating model](docs/solo-founder-agent-operating-model.md) | Future autonomous product-building and operating model |
| [Architecture decisions](docs/decisions/) | Accepted decisions and superseded proposals |

## Repository name and skill name

- GitHub repository: `digital-product-skill`
- Future runtime skill identifier: `digital-product`

The `-skill` suffix makes the repository discoverable as an agent skill without becoming part of the runtime invocation name.
