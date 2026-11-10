---
name: daily-loop
description: The daily Stealth Talks routine run by the scheduled Claude task: quality check on metrics and trends, plan, build 4 Reels, fact-check, approve. Publishing is done by GitHub Actions at peak slots.
---
# Daily loop (Krishna's instruction, 9 Nov 2026: fully automatic, he will not interfere)

Division: **Claude = quality check + planning + building + approving. GitHub Actions = publishing (slots 08:30, 12:30, 17:30, 20:30 London), token refresh, metrics, health, ledger.** 4 Reels/day, 30-59 s each, uploaded to Instagram only.

## 1. Quality check (before planning anything)
1. `git pull`; read `skills/daily-loop/KRISHNA-FEEDBACK.md` FIRST, then `playbook.md`, `STYLE.md`, `skills/*`, `alerts/alerts.json`, `data/metrics.json`, `ledger/ledger.json`. If alerts exist, fix what you can (see `scripts/reconcile.py`) or record them in `data/status.md`.
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

## Standing priorities from Krishna (9 Nov 2026, 11:02) — these outrank convenience
1. **Follow and get ahead of trends; content must stay fire.** Every day check what is trending NOW (Reels formats, sounds/styles, news and culture moments). Topical Reels use only material **published within the last 10 days**: check each article/page date, drop anything older, and write the date next to the claim in your notes. Evergreen dark-history Reels are the only exception (their sources are historical), but their hook/format must still be new.
2. **Keep improving every single day.** Change at least one thing per day and log it in `playbook.md` (new animation device, camera move, transition, character skin, hook shape, voice/pacing, sound), then note from metrics whether it helped. Use the 51-style catalogue; extend `render/kit.js` and the engine; retire what underperforms. More catchy, more twists.
3. **Never need Krishna.** Decide independently. You may open websites, use browsers, search for and use connectors that need no new sign-in or payment, change workflows and the pipeline. Boundaries that do not move: no spending, no creating accounts or entering passwords/payment details, never expose tokens, no fabricated allegations about real people, no reposts, no model-recorded listening approvals. If a connector needs his sign-in, note it in `data/status.md` and work around it.
4. **Uploads must not fail.** Keep at least 2 spare READY evergreen Reels in `queue/` beyond the day's 4 so a bad day still posts. Each run: read last 24 h of `ledger/ledger.json` and Actions run results, fix any failed run (rerun, `scripts/reconcile.py`, repair a workflow) before building new work. If the publisher failed, fix the cause; post manually only as a last resort and never twice.

## Funny-topic bank (Krishna, 9 Nov)
Krishna wants meme-native, funny topics in the mix: "lock in", brain rot, study/gym/work procrastination, "no thoughts head empty", group-chat chaos, 3am-thoughts skits. Keep them clean: no sexual or porn-adjacent angles (e.g. "gooning"), no fabricated claims about real people. Pattern: relatable "lock in" setup, escalating distractions, absurd twist. Still needs a sourced caption (a true fact tied to the theme) with the AI-disclosure line.

## Standing improvement rule (Krishna, 9 Nov)
Every batch must target the previous batch's weakest metric (as of 9 Nov: avg watch past ~15 s, and shares = 0). Research new trends (<=10 days old) every run, change at least one visible thing (hook, animation, story shape, format), write the change and the reason in the playbook, and judge it against metrics 24 h later. Do not message Krishna unless something serious breaks.

## Standing direction from Krishna (9 Nov 2026, evening): MORE BRAINROT, MORE RELATABLE, MORE CATCHY
- At least 3 of 4 daily Reels must be meme-native: brainrot cadence (fast cuts, absurd escalation, loud SFX stingers, on-screen caption chaos, loop ending), "lock in", 3am thoughts, group-chat chaos, procrastination, "no thoughts head empty", POV skits. Relatable first, lore second.
- Ride the current meme/news wave of the day (check <=10 days old, open the page, note the date). Includes viral tech-CEO moments such as the Jensen Huang street/noodle-dance/"AI said 121 times" memes: tell them as a sourced, neutral recap with an invented character reacting (e.g. a GPU-brained gamer), never with invented quotes, relationships, scandals or allegations about him. Search results on 9 Nov were undated, so re-verify dates before using any.
- Hook shape: twist or absurd line in the first 1 s, one meme sound-style device per Reel, end on a loop or a share trigger ("send this to the friend who...").
- Hard rules unchanged (real people: only straight sourced facts; original characters only; caption Sources + disclosure).
