---
name: story-craft
description: MANDATORY for every Reel from 12 Nov 2026. Suspense/thriller story structure, open loops, variety rules and the brief.json that scripts/gate.py enforces. Krishna's verdict (11 Nov): the content was boring, same look, no suspense, no variety, and did not follow the 51-style catalogue. Read this before writing any script.
---
# Story craft (why the first 14 Reels were boring, and the rules that fix it)

## Audit of the 14 published Reels (11 Nov 2026, evidence)
- **One look.** Every Reel used the same flat-vector dialect and the same round-head character, same 1390px bottom caption. The "51 styles" existed only as a catalogue; `render/kit.js` had one character kit. Fixed: `render/styles.js` now has 5 dialects (noir, crt, notebook, comic, paper) with their own caption looks. More must be added from catalogue.md (see "Style backlog").
- **No suspense: the answer is in line 1.** "Dev locked in for one hour and read zero pages", "In November 1932 Australia sent soldiers to fight emus. This is real", "Eiffel Tower is growing... Plot twist: it's just iron". The viewer knows the ending in 3 s, so there is nothing to wait for.
- **One template.** 8 of 8 sampled scripts use the label "Plot twist." and a linear attempt-1,2,3... escalation; 5 of 8 end "Send this to someone who...". Announcing a twist kills it; the viewer sees the same shape every time.
- **No thriller grammar.** No ticking clock, no withheld information, no threat, no silence before the reveal, no cliffhanger/loop ending, one tone for every story.
- Metrics (10 Nov, n tiny): avg watch 9-16 s on 30-59 s Reels, shares ~0: viewers leave before the payoff because nothing promises one.

## Research (read 11 Nov 2026; vendor blogs, numbers are hypotheses to test on our own retention curves)
- CapCut "Story arc in 60 s" (12 Jun 2026): the turn by the halfway point; 3-7-21 pacing (attention 3 s, plot by 7 s, twist by 21 s); opening frame must already show subject/tension/result; write the payoff first.
- Socialync "Open loops" (4 Mar 2026): stack loops: #1 at 1-2 s, #2 at 5-8 s, #3 at 15-20 s; start closing at 25-30 s newest-first, close the hook loop LAST in the final 20%; 2-3 loops under 30 s, 3-4 under 60 s; rotate loop types.
- GoFaceless (14 Jun 2026, upd 11 Oct): a pattern break every 8-12 s (2-3 after the hook in 30 s, 4-6 in 60 s), rotate visual/audio/question breaks; silence or a slower caption right before the payoff; never put an unrelated gag right before the answer.
- Postiz hook framework (20 Apr 2026): name the mystery, never the answer ("This coffee should not taste good", not "This is the Kopi Luwak"); frame 1 must tell a stranger what kind of video it is.
- DEV/ZipX cliffhangers (10 Jun 2026): one cliffhanger type per Reel, never stacked: imminent threat (clock + stake), information gap (false resolution + a lingering object), emotional reversal (a costly quiet choice). Unresolved consequence beat surprise in their single test (n=1).
- Frameloop (17 May 2026): 60-80 words for a 30 s story, 5-8 scenes each with ONE job (establish, conflict, escalate, turn, resolve), last line calls back to the opening image so it loops.

## The rules (enforced by scripts/gate.py for keys dated 20261112 or later)
1. **Name the mystery, withhold the answer.** Line 1 is a question/threat/oddity of at most 14 words. The reveal word (`reveal_word` in brief.json) must NOT appear in the first two sentences and must first appear after 65% of the script.
2. **No "Plot twist." label, no "Send this to someone who..." closer.** Show the twist; end with a callback/loop line or an open consequence. Never reuse a closer from the last 5 Reels.
3. **3 open loops** stacked (1-2 s, 5-8 s, 15-20 s), closed newest-first, hook loop last in the final 20%. List them in brief.json `open_loops` with the second each opens.
4. **One cliffhanger type** per Reel: `threat`, `info_gap` or `reversal`. 
5. **A pattern break every 8-12 s:** change camera (push-in, whip, dutch tilt), cut to a new set, flip the palette, SFX stinger, or drop the music to silence. Log which in the brief `breaks` list.
6. **Silence before the payoff:** cut the music bed 0.6-1.0 s before the reveal word, caption slows to word-by-word.
7. **Genre rotation.** Each Reel declares a `genre`: `thriller`, `mystery`, `horror_comedy`, `countdown`, `found_footage`, `heist`, `documentary`, `absurd_skit`, `true_story`. No genre twice in a row.
8. **Style rotation.** `style` in brief.json must differ from the previous TWO Reels' styles (legacy Reels without a brief count as `flat`). Pick `style_id` from catalogue.md. Rotate caption variants with the style.
9. Hard rules unchanged: original characters, sourced caption with Sources list, no allegations about real people, real stories told straight and dated.

## Brief file (queue/KEY/brief.json), fields required by the gate
```json
{"style":"noir","style_id":35,"genre":"thriller","hook_type":"tension","cliffhanger":"threat",
 "reveal_word":"molasses","open_loops":[{"t":1.5,"q":"what is rushing down the street"},{"t":7,"q":"why do they not run"},{"t":16,"q":"who pays"}],
 "breaks":["push-in 8s","palette flip 14s","music silence 24s"],"closer":"callback to the opening image"}
```
styles available now: noir, crt, notebook, comic, paper, flat (legacy). Add more in render/styles.js (see backlog) and list them in scripts/gate.py STYLES.

## Script templates (pick one, vary weekly)
- **Countdown thriller (30-40 s):** "At 3:07 something is in the hallway." ... clock jumps, each time-stamp gets closer, silence, the reveal is mundane/absurd, last line callbacks "3:07" so it loops.
- **Found footage (30-45 s, crt):** timecode on screen, camera shake, glitch cuts, a figure moves a little closer each cut; reveal after 65%.
- **Mystery true story (45-59 s, noir/paper):** open with the strangest detail, withhold the cause, 3 clues in order of weirdness, flip at 65-75% with the dated, sourced explanation, end on the unresolved consequence (e.g. "and nobody ever found the second one").
- **Heist/absurd skit (30 s, comic):** a plan with a numbered checklist, step 4 goes wrong in an escalating way, the reveal is that the target was never what we thought.
- **Horror-comedy (notebook):** deadpan narration of a doodle that is quietly getting worse; the last panel shows the threat was always on page 1.

## Style backlog (catalogue ids not yet in render/styles.js, build one per day and log it)
2 paper-cut (done), 11/15/34/47 pixel art, 16 ink wash, 24 travel poster, 27 watercolour, 37 flat (legacy kit), 43 90s anime cel, 45 claymation, 18/23 blueprint, 25 hologram HUD, 26/39/49 chalkboard. Catalogue says Krishna remembers 52; the 52nd is missing (note it, do not block).

## Daily checks before approving
`python scripts/gate.py KEY` must print READY (it now fails a missing/invalid brief, a leaked reveal word, banned phrases, a repeated style or genre). Then view frames at 0.5 s, each loop-open second, the reveal, and the last frame: is the look clearly different from the previous two Reels? If you cannot tell them apart in a contact sheet, change the style.
