---
name: animation-styles
description: Catalogue of 18+ visual styles and the shared build/QA rules for Stealth Talks HTML-canvas Reels. Use when writing a brief or building a scene.
---
# Animation styles (own-words catalogue, built for our own renderer; no third-party repos installed)

Source: a public "51 Claude Animation Styles" list (Applied AI). Its referenced repos (lemo-opuscar, ClaudeAnimationBase, pixelfx, HyperFrames, three.js, Rapier, Blender MCP) are NOT vendored here: licenses unchecked, and this repo is public. Re-create looks with our own code; check a license before ever copying code or assets.

## Shared build rules (apply to every style)
- One `renderAt(t)` function; all motion derived from time `t`, never wall-clock; seeded randomness only. Same frames every render.
- 1080x1920, 30 fps, 30-59 s. H.264/yuv420p, AAC. Render by headless-Chromium frame capture -> ffmpeg (about 0.13 s/frame measured on a simple scene).
- Safe zones: keep key content >=90 px from sides and >=220 px from top and bottom (bottom 300 px clear for the platform UI). Body labels >=40 px. No flashing.
- Each style needs: a visible action in the first 2 s, an escalation, a payoff readable with sound off. A style is a skin, not a story.
- QA: inspect rendered frames at hook (0.5 s), each beat, payoff and last frame for clipped text, overlaps and unreadable labels. Report only what was actually inspected; never claim a render or a listen that did not happen.
- Data/maths content: only real, sourced figures; otherwise label ILLUSTRATIVE. AI-disclosure line removed from captions at Krishna's request (9 Nov); config ai_disclosure_line is empty.

## A. Story / comedy skins (primary for Stealth Talks)
| Style | Look cues | Motion cues |
|---|---|---|
| Cut-paper | layered flat shapes, soft drop shadows between layers, paper grain | parallax slides, layers pop in back to front |
| Comic / pop-art | thick black outlines, halftone dots, burst shapes with SFX words, panel borders | snap poses, shake on impact, caption boxes |
| Claymation | lumpy shapes, fingerprint texture | animate on twos (12 fps steps) for stop-motion feel |
| Stickman notebook | lined paper, red margin, doodle line that re-jitters | wobble redraw a few times a second |
| 90s anime cel | flat colour, ink outlines, speed lines, film grain | frame-to-frame shake, held poses |
| Flat vector | flat shapes only, no gradients, rounded clouds, limited palette | slow drifts, simple eases |
| Pixel art | draw small (e.g. 270x480), scale with nearest-neighbour, dithering, pixel font | 2-4 frame cycles, crisp steps |
| Chalkboard | dark green board, chalk dust, sketchy strokes | draw-on stroke by stroke |
| Glow sketch | black ground, dotted/gold glow lines, soft halo | dots crawl along lines |
| Watercolour | translucent washes, paper texture, bleeding edges | overlapping washes bloom in, slow push-in |
| Brick/toy | studded blocks, baseplate, simple minifig shapes | build up piece by piece |
| Soft 3D pastel | rounded forms, pastel haze | gentle camera push |

## B. Explainer / data skins (use only for a true explainer beat)
Isometric infographic (labelled stages, travelling packet) · line-art maths diagram (step captions, one accent colour) · chalkboard diagram · blueprint (pale-cyan lines on dark grid, "illustrative" dimensions) · hologram HUD (cyan wireframe, orbiting arcs, "simulated" labels) · coin-stack bar chart (elliptical tops, falling layers; fictional demo data must say so) · retro CRT terminal (amber, scanlines, typed text) · neon wireframe flight (projected grid, periodic motion so it can loop) · travel-poster (layered mountains, muted teal/ochre/cream) · ink wash (misty strokes, one red accent) · physics sims (dominoes, Galton board: fixed timestep, seeded drops) · pixel weather effects.

Full list of 51 with fit ratings and a scene-brief template: see catalogue.md.

## Picking a style for a Reel
1. Write hook / problem / escalation / payoff in one sentence each first.
2. Choose a skin that suits the story's mood; do not reuse the skin of the last two published Reels (check ledger/playbook).
3. Record the skin and what the metrics say about it in playbook.md; the loop keeps what retains viewers and drops what does not.

## Related skills
hook-writing (first 2 seconds), sound-design (cue sheet, synthesized SFX, mix, objective audio checks).
