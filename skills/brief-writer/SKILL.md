---
name: brief-writer
description: Write the next batch of Stealth Talks Reel briefs (script, shot list, narration, sourced caption) from playbook.md and metrics.
---
Read playbook.md, data/metrics.json and ledger/ledger.json only. Write briefs/<KEY>.md: 8-question creative gate, timed beats (30-59 s), contact shots, narration, caption with verified primary sources + AI disclosure line. Check the repetition list (all verified Reels) first. Max 4 briefs per run.

## Brief template + checks (adapted 16 Nov 2026 from Will Francis, "Claude Skills for Instagram: Reels, Carousels and Captions", 23 Sep 2026; ideas only)
Write each Reel's brief.json notes against these six inputs before drafting (one line each):
1. **Audience + problem**: who watches (cold feed viewers, not followers) and what they want in 2 seconds.
2. **One takeaway**: the single thing a viewer should remember or argue about.
3. **Approved facts**: only facts opened and verified this run (with source); everything else is fiction and labelled so. Mark each claim in the script/caption "verified" or "needs check". Never invent a result, quote, date, price or testimonial.
4. **Voice**: the narrator/voice and words to avoid (banned phrases live in gate.py).
5. **Action**: exactly one closing action (send / comment / follow for Part N); never several.
6. **Production limits**: what the engine can render today (styles, devices); no promising a visual we cannot draw.
Each format gets a different job: the Reel shows the idea, the caption adds context or the source and stands alone without the video (<=150 words of story + Sources), the first comment or next Part carries the question. Do not copy the same sentences between Reel and caption.
Finish every brief with a short production checklist: facts opened, first line <=14 words, reveal word after 65%, audio report pass, frames viewed, caption stands alone, hashtags only 3-5 relevant.
