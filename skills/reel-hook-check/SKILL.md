---
name: reel-hook-check
description: Score and tighten the opening line of a Stealth Talks Reel (hook) before it is written into script.txt; use for every new Reel brief.
---
# Reel hook check (adapted from the public Instagram-agent skill; our own checklist, no third-party code installed)

Run on the first spoken line and first-frame text of EVERY new Reel before building. It kills weak hooks; it does not predict winners (the public version: AUC 0.83 on bad hooks, 0.56 on picking hits; only specificity separated strong from weak).

Score each hook 0-5: (1) Specificity: concrete noun/number/odd detail (most important). (2) Address: implicates the viewer ("you", "your"). (3) Stakes: something lost/counted/about to happen. (4) Front-load: strange part in the first 8 words, <=14 words total.
Dealbreakers (rewrite): greeting / "so" / "did you know" / begging for attention; gives away the reveal word; BANNED phrase (scripts/gate.py); needs the previous Reel for context.
Output: each candidate with 4 scores, total /20, weakest property and a one-line rewrite. Keep the top two, choose one, record chosen hook + scores + hook_type in brief.json.
Examples scored 16 Nov: "In this town, every time you blink, a house disappears." 19/20; "In this town, your phone battery is your lifespan." 19/20; "In this town, every tiny crime adds a wanted star above your head." 15/20 (weak front-load).
