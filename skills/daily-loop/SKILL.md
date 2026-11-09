---
name: daily-loop
description: The daily Stealth Talks routine run by the scheduled Claude task: quality check on metrics and trends, plan, build 4 Reels, fact-check, approve. Publishing is done by GitHub Actions at peak slots.
---
# Daily loop (Krishna's instruction, 9 Nov 2026: fully automatic, he will not interfere)

Division: **Claude = quality check + planning + building + approving. GitHub Actions = publishing (slots 08:30, 12:30, 17:30, 20:30 London), token refresh, metrics, health, ledger.** 4 Reels/day, 30-59 s each, uploaded to Instagram only.

## 1. Quality check (before planning anything)
1. `git pull`; read `playbook.md`, `STYLE.md`, `skills/*`, `alerts/alerts.json`, `data/metrics.json`, `ledger/ledger.json`. If alerts exist, fix what you can (see `scripts/reconcile.py`) or record them in `data/status.md`.
2. Dispatch `metrics` workflow first if data is older than a day. For every live Reel compare views, reach, likes, shares, saves, comments, average watch time against the others. Sample sizes are tiny: say so, never call a trend from 1-3 Reels. Note which hook shape, topic, length and twist each used.
3. Research trends online (WebSearch extended): current Instagram Reels formats, news and cultural moments (e.g. game launches), what top Reels in the niche do. Open the pages; label anything unverified.
4. If Krishna added reference Reels (`refs/`), study frames and timings per `skills/reference-style` and update `STYLE.md`.
5. Write dated learnings to `playbook.md` "Learned" with evidence and confidence. Keep it short.

## 2. Plan (4 Reels)
Mix per day (adapt from metrics): (A) catchy twist skit; (B) real current event told straight with original characters and a neutral sourced caption; (C) trend or launch moment (original characters only, no copyrighted characters or logos); (D) absurd skit with a sourced dark-history caption. Rules: never fabricate allegations or scandals about real people, companies or governments; never attribute invented quotes; no reposts; each caption opening is new; follow `skills/hook-writing`, `skills/reels-algorithm`, `skills/sound-design`, `skills/animation-styles`.

## 3. Build
For each Reel: `queue/ST-<date>-<slug>/{script.txt,scene.js,caption.txt}`; dispatch `make-reel` (inputs key, voice am_liam, speed 1.08, lang en-us, music true); read the run's `review/<key>/` frames and the audio/speech checks; fix and rebuild (max 2 rounds). Improve the engine and scene library every day; reuse what worked.

## 4. Fact-check and approve
Open every source and verify each caption claim; cut what you cannot support. Then `python scripts/approve.py KEY story_check|visual_qa|caption_facts PASS "evidence"` (notes say frames viewed, not full playback; listening is waived by Krishna and never recorded by a model). `python scripts/gate.py KEY` must print READY. The publisher posts it at the next slot. Never post manually unless the publisher failed, and never repost a verified Reel.

## 5. Report
Overwrite `data/status.md`: what was checked, learned, planned, built, queued, problems. Commit as the bot. Never write tokens or secrets anywhere.

## Autonomy (Krishna, 9 Nov 2026)
In scheduled runs you have the freedom to move and open anything you need (repo, workflows, web, browsers, connectors in the session) and Krishna must NOT be disturbed: do not ask him questions; decide, act, and record in `data/status.md`. The hard rules still apply: no spending, never expose tokens or secrets, no fabricated allegations about real people, no reposts, no model-recorded listening approvals.
