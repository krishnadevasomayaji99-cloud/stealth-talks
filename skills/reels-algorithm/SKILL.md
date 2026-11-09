---
name: reels-algorithm
description: What is known (and not) about how Instagram ranks Reels, and the retention techniques we apply in every Stealth Talks Reel. Read before writing a brief or building a scene.
---
# Instagram Reels: what we act on (researched 8 Nov 2026)

## Instagram's own stated guidance (relayed by Hootsuite from Adam Mosseri; I did not open Instagram's primary page)
- Ranking cares about watch time, likes, and shares/sends. Strong hook, captions on, audio, **original, non-watermarked** content, length 3 minutes or less. Trial Reels show a Reel only to non-followers (a way to test hooks).
- Nothing official says "50% hook rate caps reach", "completion thresholds" or ideal length. Those numbers on creator blogs are UNVERIFIED (no cited source): treat as hypotheses, never as facts.

## What we do anyway (cheap, consistent with the above; the metrics loop decides what stays)
1. **Hook in the first second.** The want and the rival visible and big in frame 1; first caption word on screen at 0 s.
2. **Constant stimulation.** A visual change every 1.5-2.5 s: camera pulse on emphasised words, a comic burst word at each beat, a cut or push-in at each story turn. Never a static shot longer than about 3 s.
3. **Captions always on**, word-by-word highlight, large, inside safe zones.
4. **Payoff readable on mute.** Last 3 s shows the joke visually.
5. **Loopable ending**: the last frame sets up the first one (a new biscuit appears), so rewatches count.
6. **Original and unwatermarked**: our own scenes, own voice engine, no reposted clips; never repost a verified Reel.
7. **Sends/shares**: the caption's history fact should be something a viewer would forward ("did you know..."). Keep it short and sourced.
8. **Measure, don't assume**: metrics.py already records views, reach, likes, comments, shares, saves, average watch time. Compare by hook shape/skin only after enough Reels; flag tiny samples.

## Sources read
- Hootsuite, "Instagram algorithm tips for 2026" (relays Mosseri; mixes author opinion): https://blog.hootsuite.com/instagram-algorithm/
- Creatorhouse benchmarks post (all numbers unsourced, unverified): https://creatorhouse.app/blog/instagram-reel-hook-rate-hold-rate-completion-rate-benchmarks

## Research 9 Nov 2026 (Krishna: "bizarre Roblox reels", "intrusive thoughts", thrilling + plot twist)
Sources: inreels.ai Roblox-videos guide; dev.to Reels strategy 2026; Buffer "trending Reels 2026".
- **Roblox/brainrot format (one source, creator-blog level):** narration over a split screen with a looping, hypnotic visual below (parkour-style gameplay), AI voiceover, big captions, a visual change every 1-3 s, strongest moment or a question in the first 3 s, 15-60 s. Stories: Reddit-style, true crime, psychology facts. We never use Roblox footage or assets (IP). We make an ORIGINAL looping visual (endless runner, falling shapes, satisfying loops) under or beside the story.
- **Ranking signals (all unsourced blog claims except Mosseri's watch time / likes / sends):** retention, replays, DM sends. Treat numbers as unverified. Design for: a hook in 1-2 s, a payoff that rewards watching to the end, a twist that makes people rewatch or send it.
- **Krishna's steer:** thrilling, stimulating, plot twist. Every Reel needs a hook, an escalation (stakes rise every beat), a twist, and a punchline or cliff-edge ending. Cliffhanger/loop endings that flow back into the opening line encourage replays.
- **Trend discovery (Buffer):** Reels feed repeats, Professional dashboard > Inspiration, Reels Trends (US only), Templates > Trending, same format across niches = real trend, TikTok Creative Center (public) for early signals. Use WebSearch/WebFetch and the Chrome browser for these in scheduled runs.
- **Intrusive-thoughts style:** search found no reliable format description. Do not guess; if a run sees real examples in a browser, record the structure here. Keep it comedic and clean (no mental-health claims or diagnoses).

## Trial Reels (Krishna, 9 Nov; tactic from Get Ripping, copied without paying)
Meta Content Publishing API accepts `trial_params={"graduation_strategy":"MANUAL"|"SS_PERFORMANCE"}` on REELS containers (Meta docs, Dec 2025). Trials go to non-followers first, stay off the grid and followers' feeds, and auto-graduate if they perform (SS_PERFORMANCE). Eligibility per Instagram Help Center via adaptlypost/flowgent: public professional account with 200+ followers. @myfloatingchicken had 4 followers on 9 Nov, so trials are OFF until it qualifies; publish.py checks followers_count each post and self-activates (every 2nd post of the day). Unverified: whether a trial Reel is visible in the media listing used for our verify step, and whether insights return for trials. First trial post: watch the run; the safe failure is needs_reconcile (never double-posts). Growing to 200 followers is the unlock; the funnel is non-follower reach, so follower growth (profile hook, consistent niche, CTA) matters.
