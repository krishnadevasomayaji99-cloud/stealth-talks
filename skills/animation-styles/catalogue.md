# Style catalogue 1-51 (own-words summaries; source = Applied AI "51 Claude Animation Styles" list)
Reference repos are named for attribution only. NOT vendored; licenses unchecked. Re-create the look in our own HTML/canvas code. "Fit" = suitability for Stealth Talks story Reels (S = story skin, E = explainer/data only, R = rare/needs heavy 3D).

| # | Style | Look and motion | Fit | Reference |
|---|---|---|---|---|
| 1 | Isometric infographic | isometric tiles, labelled route stages, glowing packet travelling; labels appear as packet arrives | E | lemo-opuscar |
| 2 | Paper-cut | layered paper, light up back to front, parallax push-in, beam sweep | S | lemo-opuscar |
| 3 | 3D bar chart | stacked objects fall into columns, value labels above, orbiting camera | E/R | three.js |
| 4 | Synthwave flight | wireframe valley, striped sun, loopable | E/R | three.js |
| 5 | 3D explainer | layered cutaway with numbered captions | R | Blender MCP |
| 6 | Maths machine | line art, step captions, one accent colour | E | opus-video-prompts |
| 7 | Hand-painted cartoon presenter | watercolour paper, character with many emotions | S | ClaudeAnimationBase |
| 8 | Domino reveal | physics chain reaction, fixed timestep | R | react-three-rapier |
| 9 | Glow atom | bloom + focus pull to one highlighted item | R | react-postprocessing |
| 10 | Glass mosaic | thousands of tiles peel and reassemble into a creature | R | awesome-opus5-5-videos |
| 11 | Pixel explainer | pixel grid, steps with pixel-font captions | E/S | pixelfx |
| 12 | CGI product spin | key + rim light, soft reflections | R | three.js |
| 13 | Retro terminal | amber CRT, scanlines, typed title | S (title cards) | lemo-opuscar |
| 14 | Galton board | physics balls into bell curve | R | react-three-rapier |
| 15 | Pixel night scene | effects combo, limited palette | S | pixelfx |
| 16 | Ink wash | bleeding strokes, mist, one red accent | S (calm/history) | lemo-opuscar |
| 17 | Data towers | buildings rise by value | R | Blender MCP |
| 18 | Line-art diagram | thin lines on navy, step captions | E | opus-video-prompts |
| 19 | Isometric power-to-house | cables + pulses | E | recreation |
| 20 | Coin-stack chart | gold discs fall into bars; must say ILLUSTRATIVE if fictional | E | recreation |
| 21 | Neon canyon flight | projected grid, ridges, distant planet | E/S | recreation |
| 22 | Sunlight cartoon | flat sun/earth, NOT TO SCALE | E | recreation |
| 23 | Blueprint | pale cyan lines on grid, dimensions marked illustrative | E | recreation |
| 24 | Travel poster | layered mountains, muted teal/ochre/cream | S | recreation |
| 25 | Hologram HUD | cyan wireframe, scan lines, callouts marked simulated | E | recreation |
| 26 | Chalkboard diagram | neural-net teaching loop, chalk strokes | E | recreation |
| 27 | Watercolour | translucent washes, curved-mask reveal | S | recreation |
| 28 | Bean-to-cup isometric | three tiles, route, steam | E | recreation |
| 29 | Revenue coin stacks | fictional values, must be labelled | E | recreation |
| 30 | Pythagoras 3-4-5 | squares on sides, area labels | E | recreation |
| 31 | Sleep-by-age bars | cartoon presenter; must say not medical guidance | E | recreation |
| 32 | Comic Art | halftone dots, thick outlines, burst + SFX word at a beat | S | HyperFrames list |
| 33 | CGI Motion | soft-shaded, golden hour, blurred reflection | R | HyperFrames list |
| 34 | Pixel Art 16-bit | render small, scale nearest-neighbour, dither | S | HyperFrames list |
| 35 | Glow Sketch | black ground, dotted gold lines, crawling dots | S | HyperFrames list |
| 36 | PS2 | low-res 3D, flat shading, chrome title | R | HyperFrames list |
| 37 | Flat Vector | flat shapes, no gradients | S | HyperFrames list |
| 38 | Minimal line art | black, thin white lines, calm | S | HyperFrames list |
| 39 | Self-drawing chalkboard | strokes draw on, labelled arrows | S/E | HyperFrames list |
| 40 | Brick-built | studs, baseplate, builds itself | R | HyperFrames list |
| 41 | Soft squishy 3D | pastel, rounded, camera push-in | R | HyperFrames list |
| 42 | Stickman notebook | lined paper, jittering redraw, figures shouting | S | HyperFrames list |
| 43 | 90s anime cel | flat colour, ink outline, shake, grain | S | HyperFrames list |
| 44 | PS2 launch | low-res 3D with game HUD | R | HyperFrames list |
| 45 | Claymation | lumpy shapes, animate on twos, fingerprint texture | S | HyperFrames list |
| 46 | Comic panels | two bordered panels, KA-CHUNK burst, speech bubble | S | HyperFrames list |
| 47 | Pixel 8-bit scene | tiny canvas, HUD, flashing banner | S | HyperFrames list |
| 48 | Glow Sketch trajectory | gold outline, curving trail, small spaced label | S | HyperFrames list |
| 49 | Chalkboard lesson | wooden frame, labelled arrows | S/E | HyperFrames list |
| 50 | Glossy kids 3D | rounded, glossy, cute character | R | HyperFrames list |
| 51 | Brick launch | self-assembling build, tumbling bricks | R | HyperFrames list |

Fit S = build first. R styles need real 3D; fake them with layered 2D parallax and shading unless a render test shows 3D is fast enough on the runner.

# Scene brief template (fill before building any scene)
- Style: <name> / Subject: <who wants what> / Length: 30-59 s, 1080x1920, 30 fps
- Hook (0-2 s): a visible action or surprise. Escalation beats with times. Reversal. Payoff readable with sound off.
- Visual design: palette, shapes, character silhouettes (stable across shots), props, text style.
- Timeline: beat table with start-end seconds and what moves. Everything driven from t.
- Layout: key content >=90 px from sides, >=220 px from top/bottom, bottom 300 px clear; labels >=40 px.
- Deliver: scene.html + renderAt(t) + brief; render by our workflow; inspect frames at 0.5 s, each beat, payoff, last frame; report only what was tested; say "not rendered" if it was not.
- Honesty: fictional data labelled ILLUSTRATIVE; never claim a render or a listen that did not happen.
