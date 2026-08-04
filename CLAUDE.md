# Claude Code repository guide

This is the released `digital-product-skill` (runtime skill `digital-product`, under
`skills/digital-product/`) — the composer for the 14-skill Digital Product family. Read
[AGENTS.md](AGENTS.md) for the ownership boundary and non-negotiable invariants — especially:
route to one skill when one suffices, subtract stages honestly, answer seams from the dated
registry (contested stays contested), keep `digital-product/LEDGER.md` as the memory, and never
re-implement `orchestrate` (plan-file handoff only, user-opt-in). This skill owns no domain: PRDs
are `product`'s, designs `design`'s, code the Build packs', verdicts `quality`'s, operations
`operate`'s, experiments `growth`'s, customers `success`'s, demand `marketing`'s, deals `sales`'s.

Run `scripts/check-sync` before any release. Keep `SKILL.md` the router; keep versions out of it.
