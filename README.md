# digital-product — Digital Product

**Visual guide:** [digital-product-skill.vercel.app](https://digital-product-skill.vercel.app)

The composer for the **Digital Product Skills family**: 14 independently installable specialist
skills covering the full product lifecycle, and this skill — the 15th — that ties them together.
`digital-product` routes any product request to the right specialist, sequences multi-stage work
with honest subtraction (most products don't need all 14), keeps every deliverable in one
committed `digital-product/` folder with a thin `LEDGER.md`, and holds the family's dated seam
rulings — including the ones deliberately left contested.

It owns the seams and the sequence — none of the domains. Every specialist works standalone; the
composer's first duty is knowing when it is not needed.

## Install

```bash
npx skills add gabros20/digital-product-skill -g -y

# or, from a clone — installs into any of 8 client targets (claude, codex, …):
./install.sh claude
```

Install the specialists you need the same way (`npx skills add gabros20/<pack>-skill -g -y`); the
composer detects what's installed and names the command for anything missing.

## The family

| Stage | Skill | Repository | Site |
|---|---|---|---|
| Define | `product` | [product-skill](https://github.com/gabros20/product-skill) | [product-skill.vercel.app](https://product-skill.vercel.app) |
| Design | `design` | [design-skill](https://github.com/gabros20/design-skill) | [designskill.vercel.app](https://designskill.vercel.app) |
| Shape | `architecture` | [architecture-skill](https://github.com/gabros20/architecture-skill) | [architecture-skill.vercel.app](https://architecture-skill.vercel.app) |
| Build | `frontend` | [frontend-skill](https://github.com/gabros20/frontend-skill) | [frontendengskill.vercel.app](https://frontendengskill.vercel.app) |
| Build | `backend` | [backend-skill](https://github.com/gabros20/backend-skill) | [backendengskill.vercel.app](https://backendengskill.vercel.app) |
| Build | `data` | [data-skill](https://github.com/gabros20/data-skill) | [data-skill.vercel.app](https://data-skill.vercel.app) |
| Build | `ai` | [ai-skill](https://github.com/gabros20/ai-skill) | [aiengskill.vercel.app](https://aiengskill.vercel.app) |
| Build | `automation` | [automation-skill](https://github.com/gabros20/automation-skill) | [automation-skill.vercel.app](https://automation-skill.vercel.app) |
| Assure | `quality` | [quality-skill](https://github.com/gabros20/quality-skill) | [quality-skill.vercel.app](https://quality-skill.vercel.app) |
| Run | `operate` | [operate-skill](https://github.com/gabros20/operate-skill) | [operate-skill.vercel.app](https://operate-skill.vercel.app) |
| Improve | `growth` | [growth-skill](https://github.com/gabros20/growth-skill) | [growthskill.vercel.app](https://growthskill.vercel.app) |
| Improve | `success` | [success-skill](https://github.com/gabros20/success-skill) | [success-skill.vercel.app](https://success-skill.vercel.app) |
| Distribute | `marketing` | [marketing-skill](https://github.com/gabros20/marketing-skill) | [marketing-skill.vercel.app](https://marketing-skill.vercel.app) |
| Distribute | `sales` | [sales-skill](https://github.com/gabros20/sales-skill) | [salesskill.vercel.app](https://salesskill.vercel.app) |

## What the composer does

- **Routes** — single-domain requests go to one named skill in one line; no plan, no ceremony.
- **Sequences** — multi-stage work gets an entry stage (work can enter anywhere), a minimal path,
  and named skipped stages with reasons ([lifecycle-map](skills/digital-product/references/lifecycle-map.md)).
- **Keeps the artifact home** — all family deliverables land in `digital-product/` at the working
  repo's root, with state in a thin `LEDGER.md`
  ([artifact-convention](skills/digital-product/references/artifact-convention.md)).
- **Holds the seams** — dated cross-skill rulings, deliberately contested boundaries, vocabulary
  law, and known graceful mis-routes
  ([seam-rulings](skills/digital-product/references/seam-rulings.md)).
- **Coordinates at the lowest cost that fits** — in-context by default, native subagents for
  independent stages, and a plan-file handoff to the separate `orchestrate` skill when explicit
  multi-agent execution is wanted
  ([coordination](skills/digital-product/references/coordination.md)).

## Repository layout

```text
skills/digital-product/   runtime skill (SKILL.md + 4 references)
evals/                    behavioral eval suites (repository-only, not installed)
site/                     the family hub site (digital-product-skill.vercel.app)
remotion/                 hero-animation source for the site
docs/                     the family's canonical research, architecture, and decisions
research/                 multi-channel research corpora from the family's build phase
```

## Documentation & releases

- [SOURCES.md](SOURCES.md) — what this pack sources from the 14 specialists, and what it claims
  for itself
- [CHANGELOG.md](CHANGELOG.md) · [releases](https://github.com/gabros20/digital-product-skill/releases)
- [Documentation map](docs/README.md) — the family's research-phase corpus: lifecycle exploration,
  navigation research, authoring standard, operating model, architecture decisions
- [AGENTS.md](AGENTS.md) — ownership boundary and non-negotiable invariants for agents editing
  this repo

## License

[MIT](LICENSE)
