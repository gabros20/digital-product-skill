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

Just the composer — it routes, and names the install command for any pack you don't have yet:

```bash
npx skills add gabros20/digital-product-skill -g -y

# or, from a clone — installs into any of 8 client targets (claude, codex, …):
./install.sh claude
```

### The whole family at once

`scripts/install-family` installs the composer plus any subset of the 14 specialists, each from
its own repository at its own HEAD — nothing is vendored here, so every pack stays on its own
release line.

```bash
curl -fsSL https://raw.githubusercontent.com/gabros20/digital-product-skill/main/scripts/install-family | bash -s -- --set all

# or from a clone:
./scripts/install-family --set all
```

Sets follow the lifecycle, because most products don't need all 14 — installing everything adds
roughly 2.4k tokens of always-on skill descriptions to every session:

| `--set` | Installs (always with the composer) |
|---|---|
| `all` | all 14 specialists |
| `core` | product, design, architecture, quality |
| `define` · `design` · `shape` | product · design · architecture |
| `build` | frontend, backend, data, ai, automation |
| `assure` · `run` | quality · operate |
| `improve` | growth, success |
| `distribute` | marketing, sales |

A comma-separated list works too and installs exactly what it names:
`--set product,design`.

Other flags: `--target <client>` (the same 8 clients `install.sh` supports), `--ref <branch|tag>`,
`--method skills|clone`, `--dry-run`, and `--uninstall`. The default `skills` method registers
each pack with the ecosystem CLI so `skills update` and `skills remove` keep working; `--method
clone` is faster and reaches all 8 targets, but the CLI records those installs as `Source: local`
and refuses to update them — see below.

### Updating

Packs installed the default way update by name, so you can take just the ones that moved:

```bash
npx skills update quality operate -g -y   # only these two
npx skills update -g -y                   # every global skill
```

Packs installed with `--method clone` are **not** updatable that way — `skills update` reports
`No installed skills found matching: <pack>`. Re-run the installer for those packs instead; each
pack's `install.sh` replaces in place, restoring the previous copy if anything fails:

```bash
./scripts/install-family --set quality,operate --method clone
```

For a project-scoped install, re-running `npx skills experimental_install` restores every entry
in `skills-lock.json` at its current HEAD.

### Project-scoped

To pin the family into one repository instead of your user profile, drop in the lockfile and
restore it — this installs all 15 into the project's `.agents/skills/`:

```bash
curl -fsSL https://raw.githubusercontent.com/gabros20/digital-product-skill/main/skills-lock.json -o skills-lock.json
npx skills experimental_install
```

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
scripts/install-family    the composer + any subset, each pack from its own repository
skills-lock.json          project-scoped install of all 15 via experimental_install
evals/                    behavioral eval suites (repository-only, not installed)
site/                     the family hub site (digital-product-skill.vercel.app)
remotion/                 hero-animation source for the site
docs/                     the family's canonical architecture, decisions, and research
```

Each pack's own multi-channel research corpus lives in that pack's repository
(`<pack>-skill/research/`), not here — the composer holds the family-level docs only.

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
