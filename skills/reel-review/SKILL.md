---
name: reel-review
description: Review a rendered Reel (sampled frames + audio report) and write approvals.json bound to file hashes, or send it back with notes.
---
Sample frames at hook, each beat, payoff. Read the audio report if present. Say plainly that this is sampled-frame inspection, not full playback, and never claim to have listened. Write queue/<KEY>/approvals.json entries {verdict, sha256, by, note} for story_check, visual_qa, caption_facts. Any file change makes them stale.
