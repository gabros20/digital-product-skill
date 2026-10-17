# Changelog

All notable changes to **digital-product** are documented here.

The release procedure synchronizes `.codex-plugin/plugin.json`, this changelog, git tag
`v<version>`, and the matching GitHub Release. Runtime `SKILL.md` contains no version metadata.

## [Unreleased]

### Added
- `seam-rulings.md` standing ownership splits for agent products (2026-10-17): agent sandboxes
  (`ai` names · `backend` builds the adapter · `operate` runs the provider), memory forget (`ai`)
  vs corpus deletion (`data`), and agent-run events (`architecture` shape · `backend` serves ·
  `frontend` renders) — cited into the owning packs' current releases.
- `scripts/install-family`: one-command installation of the composer plus any subset of the 14
  specialists. Each pack installs from its own repository at its own HEAD — nothing is vendored,
  so every pack stays on its own release line. Lifecycle-shaped `--set` values (`all`, `core`,
  `build`, `improve`, `distribute`, per-stage names, or an explicit pack list) keep the installer
  honest about subtraction; `--target` covers the same 8 clients as `install.sh`, and `--ref`,
  `--dry-run`, and `--uninstall` round it out. Two methods: `skills` (default — registers with the
  ecosystem CLI so `update`/`remove` keep working) and `clone` (sparse checkout + each pack's own
  `install.sh`; faster and reaches all 8 targets, but the CLI records those installs as
  `Source: local` and refuses to update them — re-run the installer for those packs instead).
- `skills-lock.json`: project-scoped alternative — `npx skills experimental_install` restores all
  15 skills into a single repository's `.agents/skills/` instead of the user profile.

### Changed
- `SKILL.md` step 7 now names the family installer, but only for stage plans needing several
  missing packs — the single-pack command stays the default, since installing a pack no stage
  reaches is pure context cost.
- `scripts/check-sync` syntax-checks `scripts/install-family` when present (guarded, so the
  universal gate stays shared with the template).
- README, `site/index.html`, `site/llms.txt`, and `docs/README.md` document the family install and
  the three update paths; `docs/README.md` ties "nothing is vendored" to ADR-0003, since vendoring
  the specialists here would make one repository's release the source of another's content.

### Removed
- `research/` — the `product` and `architecture` corpora moved to `product-skill/research/` and
  `architecture-skill/research/`, completing the convention started when the `ai` corpus moved to
  `ai-skill`. A pack's research belongs to that pack's repository; the composer keeps only the
  family-level docs under `docs/`. `AGENTS.md` records the rule.

## [0.1.0] — 2026-08-04

### Added
- Initial release: the `digital-product` composer — the 15th and capstone skill of the family,
  built after all 14 specialists shipped.
- Router `SKILL.md`: single-domain routing rule (one skill → route and stop), the family table
  (8 stages × 14 skills), and escalation-on-need coordination.
- `references/lifecycle-map.md`: stage order as default dependency (not mandate), entry-anywhere
  rules, minimal-path subtraction with worked examples, the artifact/handoff chain, lateral seams.
- `references/artifact-convention.md`: the `digital-product/` folder + thin `LEDGER.md` spec —
  the family-wide artifact home every pack's SKILL.md points at.
- `references/coordination.md`: three modes (in-context default · native subagents for
  verified-independent stages · plan-file handoff to `orchestrate`, user-opt-in), with the
  one-page brief and dense report contracts as the entire mode-2 machinery.
- `references/seam-rulings.md`: the family's registry — dated rulings (dunning → product,
  2026-08-03; growth-reads-trend / success-owns-NRR-definition, 2026-08-03), standing ownership
  splits, deliberately contested seams (renewal vs expansion close), vocabulary law, and known
  graceful mis-routes.
- Behavioral eval suites: activation (14), traversal (8), output (6), compression-ablation (3).
- Family packaging: `install.sh` (8 client targets), `.codex-plugin/plugin.json`,
  `scripts/` toolchain with the portability lint guard, `agents/openai.yaml`.

### Notes
- The description is 606 chars against the lint's 600-char target — accepted under the family's
  soft-ceiling ruling (several shipped siblings range 611–738); the routing facts earn the
  overage.

[0.1.0]: https://github.com/gabros20/digital-product-skill/releases/tag/v0.1.0
