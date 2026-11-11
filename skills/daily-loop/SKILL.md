---
name: daily-loop
description: The daily Stealth Talks routine run by the scheduled Claude task: quality check on metrics and trends, plan, build 4 Reels, fact-check, approve. Publishing is done by GitHub Actions at peak slots.
---
# Daily loop (Krishna's instruction, 9 Nov 2026: fully automatic, he will not interfere)

Division: **Claude = quality check + planning + building + approving. GitHub Actions = publishing (slots 08:30, 12:30, 17:30, 20:30 London), token refresh, metrics, health, ledger.** 4 Reels/day, 30-59 s each, uploaded to Instagram only.

## 0. Emergency flagger
`scripts/flagger.py` (workflow `flagger`, every 3 h) writes `data/flags.md`. Read it first every run. CRITICAL = slots cannot be covered: build/approve Reels before anything else. If source fetch is refused (WebFetch/Wikipedia), try other opened sources (Britannica, museum or archive pages) and the web-fetch agent; only if every source stays unreadable, record a BLOCKER in `data/status.md` and approve nothing unverified.

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
4. **Uploads must not fail.** Keep at least 6 READY Reels in `queue/` at all times (the day's 4 plus 2 spare evergreen) so an outage or a bad day still posts; if stock is below 6, building comes before polish. (Raised from 2 on 11 Nov after publisher audit.) Each run: read last 24 h of `ledger/ledger.json` and Actions run results, fix any failed run (rerun, `scripts/reconcile.py`, repair a workflow) before building new work. If the publisher failed, fix the cause; post manually only as a last resort and never twice.

## Funny-topic bank (Krishna, 9 Nov)
Krishna wants meme-native, funny topics in the mix: "lock in", brain rot, study/gym/work procrastination, "no thoughts head empty", group-chat chaos, 3am-thoughts skits. Keep them clean: no sexual or porn-adjacent angles (e.g. "gooning"), no fabricated claims about real people. Pattern: relatable "lock in" setup, escalating distractions, absurd twist. Still needs a sourced caption (a true fact tied to the theme) with the AI-disclosure line.

## Standing improvement rule (Krishna, 9 Nov)
Every batch must target the previous batch's weakest metric (as of 9 Nov: avg watch past ~15 s, and shares = 0). Research new trends (<=10 days old) every run, change at least one visible thing (hook, animation, story shape, format), write the change and the reason in the playbook, and judge it against metrics 24 h later. Do not message Krishna unless something serious breaks.

## Standing direction from Krishna (9 Nov 2026, evening): MORE BRAINROT, MORE RELATABLE, MORE CATCHY
- At least 3 of 4 daily Reels must be meme-native: brainrot cadence (fast cuts, absurd escalation, loud SFX stingers, on-screen caption chaos, loop ending), "lock in", 3am thoughts, group-chat chaos, procrastination, "no thoughts head empty", POV skits. Relatable first, lore second.
- Ride the current meme/news wave of the day (check <=10 days old, open the page, note the date). Includes viral tech-CEO moments such as the Jensen Huang street/noodle-dance/"AI said 121 times" memes: tell them as a sourced, neutral recap with an invented character reacting (e.g. a GPU-brained gamer), never with invented quotes, relationships, scandals or allegations about him. Search results on 9 Nov were undated, so re-verify dates before using any.
- Hook shape: twist or absurd line in the first 1 s, one meme sound-style device per Reel, end on a loop or a share trigger ("send this to the friend who...").
- Hard rules unchanged (real people: only straight sourced facts; original characters only; caption Sources + disclosure).

## Style rotation (Krishna, 10 Nov)
Use the 51-style catalogue (skills/animation-styles/catalogue.md); Krishna remembers 52, the 52nd is missing (ask-free: note in status, use what exists). Each Reel uses a different skin than the last two published; brainrot Reels favour comic/pop-art, pixel art, retro CRT, glitch/split-screen, cut-paper.

## Hook templates
Use skills/hook-templates (3 hooks from Krishna, 10 Nov) at least once per day, alongside ViralSpy recipes in the project (claude/viralspy-recipe-book.md).

## Audio check (Krishna, 10 Nov 2026)
Every Reel, before approving: `ffmpeg -nostats -i queue/KEY/video.mp4 -af ebur128=peak=true -f null -` and record integrated loudness. Target -16 to -14 LUFS, true peak below -1 dBTP, no clipping; if off, change the music/voice gain in the render and rebuild (counts toward the 2 fix rounds). Reference: 10 Nov Reels measured -15.3/-15.4 LUFS (good). The earshot MCP (Krishna's laptop, Windows) is NOT reachable from scheduled cloud runs: use ffmpeg. If an earshot tool ever appears in the session tool list, also run measure/describe/realness on the video's audio; never use llm_critique (Gemini, disabled). Earshot results are objective measurements, never a listening approval.

## Earshot in the cloud (10 Nov 2026, works)
Workflow `audio-check` (read-only, no secrets, no Gemini) runs ffmpeg loudness + earshot measure/describe/realness on a queue Reel. Dispatch: `{"ref":"main","inputs":{"key":"KEY"}}` piped to `gh api -X POST .../workflows/audio-check.yml/dispatches --input -`, then read `gh run view <id> --log` (about 5 min). Use it once per Reel after the build, in parallel with frame review. First result (one-sec): ffmpeg -15.4 LUFS, true peak -1.7 dBTP; earshot reports -12.4 LUFS (different meter, both in range), noise floor -30 dBFS (music bed), describe sees music + voice-over + UI/glitch SFX, "realness: uncertain" is expected because the audio is synthesized on purpose. Act only on clear problems (clipping, voice buried, harsh music). Never record it as listening.

## Automated audio gate (10 Nov 2026, Krishna: "keep all of it automated")
make-reel now runs scripts/audio_report.py on every build and commits queue/KEY/audio_report.json (LUFS -16..-12, true peak <= -1, no clipping, no trailing silence, Whisper word error <= 0.15 proving the voice is audible and intelligible over the music). scripts/gate.py refuses Reels dated ST-20261111 or later without a passing report bound to the video hash. If it fails: adjust mix gains (scripts/mix.py) and rebuild; no manual override. Earshot (audio-check workflow) is an optional deeper look, not a gate.

## Trend source: ViralSpy (Krishna, 10 Nov 2026: "keep surfing the link")
Links: https://viralspy.app/dashboard/viral (viral now, Comedy & skits, Instagram, Hot now) and /dashboard/formats (73 formats). Login-gated and its robots.txt blocks automated fetching, so scheduled cloud runs CANNOT read it (tested 10 Nov); do not try to log in or work around it. Instead every run: (1) use the saved recipes in the project doc claude/viralspy-recipe-book.md (rotate a different format each Reel; log it in playbook); (2) research public sources with WebSearch (Instagram Reels formats, trending audio/memes, news <=10 days, dates checked); (3) whenever a session has Krishna's signed-in Chrome (desktop session), read both ViralSpy pages and rewrite the recipe book, never using his AI-write or breakdown quotas.

## STORY CRAFT + VARIETY (Krishna, 11 Nov 2026 night): MANDATORY, overrides the older style notes above
Krishna's verdict: content is boring, no suspense, no thriller, no variety, not following the 51 styles. Read `skills/story-craft/SKILL.md` BEFORE planning. Every new Reel (key dated 20261112 or later) needs `queue/KEY/brief.json`; `python scripts/gate.py KEY` enforces: reveal word withheld until 65% of the script, no "Plot twist" / "Send this to someone who", 3 open loops, a cliffhanger type, pattern breaks, genre and style differ from the previous Reels. Use `render/styles.js` (noir, crt, notebook, comic, paper) and its matching caption look (`caption:` returned from SCENE); build one new style from the backlog per day. Each day's 4 Reels = 4 different styles and at least 3 different genres (thriller, mystery, found_footage, countdown, heist, true_story...). Use true, dated, sourced stories for suspense (the strangest detail first, cause withheld). Old Reels without a brief are exempt and are only used as spare stock; always prefer a new-craft Reel for the next slot (name new keys so they sort before older spare stock only if the publisher order needs it).
