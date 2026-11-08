---
name: sound-design
description: Plan, make and check sound effects and the mix for a Reel: cue sheet from the beat table, synthesized or CC0 sounds, mix rules, objective audio checks, and an honest report.
---
# Sound design for Reels

Adapted from a "sound designer" prompt that uses three tools: Real SFX (finds moments and places sounds), Openverse (free sound library) and Earshot (lets Claude listen). Reality here:
- **Claude cannot hear.** Nothing below is "listened to". Audio is checked with objective measurements (duration, loudness, clipping, silent tails); Krishna's listening waiver stays on record. Never claim to have listened.
- We make the animation, so we already know every moment and its exact timestamp. The beat table in the brief IS the cue sheet; no tool needs to "watch" the edit.
- Real SFX and Earshot are not connected to this setup (unverified availability). Openverse has a free API; use it only if synthesized sounds are not enough.

## Steps
1. **Cue sheet** from the brief's beat table: timestamp, event, sound type (pop, whoosh, click, thud, chime, rise). Only moments where a sound adds something: appear/disappear, contact, transitions, key-word emphasis. Skip anything the voice or music already covers.
2. **Make the sound.** Default: synthesize with `scripts/sfx_synth.py` (deterministic, no licence issues, stored in `assets/sfx/`). Only if a moment needs a realistic sound, search Openverse restricted to CC0/public-domain, keep the licence and source URL in the report. Never use attribution-required or unknown-licence sounds without recording them.
3. **Choose.** Vary sounds (no identical pop twice in a row), keep them short (<2 s unless the moment needs more), reject anything clipped, noisy or with a long silent tail.
4. **Place and mix** with ffmpeg: effects always quieter than the voice (target roughly 8-12 dB below it), voice is priority; if two cues are <0.5 s apart keep the stronger; leave a moment empty if it does not need a sound. Less is better than cluttered.
5. **Check** with `scripts/audio_check.py <video>`: integrated loudness and true peak, clipping, silence at the end, duration. Fix and re-run until it passes.
6. **Report** a table: timestamp, purpose, source (synth or Openverse), licence; plus moments skipped and why; plus "not listened to by Claude".

## Targets (platform loudness is my knowledge, unverified: treat as sensible defaults)
- Integrated loudness about -14 LUFS (acceptable -16 to -12), true peak at or below -1 dBTP, no clipping, no more than ~0.5 s trailing silence.
