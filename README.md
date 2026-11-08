# Stealth Talks pipeline
Loop: metrics -> review/research (Claude) -> briefs (Claude) -> render (Actions/laptop) -> gate -> publish -> metrics.
GitHub Actions does all deterministic work; Claude does creative/review work and commits to this repo.
- `config/config.json`: kill switch (`enabled`), 4/day, 30-59 s, 08:00-22:00 London.
- `ledger/ledger.json`: one ledger; a row is written BEFORE upload; `needs_reconcile` halts publishing until a human/Claude reconciles. Never auto-retry.
- Secrets (GitHub Secrets only, never committed): `IG_TOKEN`, `REPO_ADMIN_PAT` (to store refreshed token), `GEMINI_API_KEY` (optional audio report).
- Manual first steps: run `render-test`, then `publish` with dry_run, then one supervised live publish.
