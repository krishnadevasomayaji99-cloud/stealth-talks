---
name: reference-style
description: Learn a visual/pacing style from 3 reference Reels (frames + transcript) into STYLE.md, then apply it to briefs without copying. Also covers the Whisper speech check.
---
# Reference-led taste

Adapted from a guide on editing recorded footage with Remotion/HyperFrames/ffmpeg/Whisper. Most of it targets live-action footage and does not apply: our Reels are fully animated. Not adopted: Remotion (conditional licence: free only for individuals/small teams, check remotion.dev/license) and the HyperFrames skill (third-party; licence unchecked). Kept: the method.

## Method
1. Krishna supplies 3 reference Reels with the same vibe (MP4 files; Instagram links cannot be fetched by Claude). Put them in `refs/` (not committed if licensing is unclear; keep frames/notes only).
2. `ffmpeg -i ref.mp4 -vf fps=1 refs/frames/<name>-%03d.jpg`; transcribe with `scripts/speech_check.py`-style Whisper word timings.
3. Look at frames and timings (Claude views images, cannot hear) and write STYLE.md: average shot length/cut rate, caption style, zooms and punch-ins, colour and mood, graphics, SFX energy, plus a short reusable rules list.
4. Every brief reads STYLE.md. Inspired, never copied: no footage, text, music or graphics reused.
5. Keep sample size honest: 3 references = a direction, not proof. The metrics loop decides what stays.

## Speech check (objective, not listening)
`python scripts/speech_check.py final.mp4 narration.txt` transcribes the mix with faster-whisper and compares it to the intended script (approximate word error rate, missing words). Exit 1 above the limit. It tells us the words are intelligible and in order; it cannot judge voice tone, humour, or balance. Reports always say `listened: false`.
