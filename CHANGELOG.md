# Changelog

All notable changes to **digital-product** are documented here.

The release procedure synchronizes `.codex-plugin/plugin.json`, this changelog, git tag
`v<version>`, and the matching GitHub Release. Runtime `SKILL.md` contains no version metadata.

## [Unreleased]

### Added
- Queue unreleased changes here.

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
