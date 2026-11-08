"""Objective speech check: transcribe the audio of a video/audio file with faster-whisper and compare to the intended narration.
Usage: python scripts/speech_check.py MEDIA SCRIPT.txt [--model base.en] [--max-wer 0.15]
This is NOT listening: it shows whether the words came out intelligible and in the right order. It cannot judge tone, voice quality or balance."""
import argparse, json, re, sys, difflib
def norm(s): return re.findall(r"[a-z0-9']+", s.lower())
ap = argparse.ArgumentParser(); ap.add_argument("media"); ap.add_argument("script"); ap.add_argument("--model", default="base.en"); ap.add_argument("--max-wer", type=float, default=0.15)
a = ap.parse_args()
from faster_whisper import WhisperModel
m = WhisperModel(a.model, device="cpu", compute_type="int8")
segs, info = m.transcribe(a.media, word_timestamps=True, vad_filter=False, language="en")
words = []
for s in segs:
    for w in (s.words or []): words.append({"w": w.word.strip(), "start": round(w.start, 2), "end": round(w.end, 2)})
heard = norm(" ".join(w["w"] for w in words)); want = norm(open(a.script, encoding="utf-8").read())
sm = difflib.SequenceMatcher(a=want, b=heard, autojunk=False)
matched = sum(b.size for b in sm.get_matching_blocks())
wer = round(1 - matched / max(1, len(want)), 3)   # approximate word error rate (1 - matched/expected)
missing = [" ".join(want[i1:i2]) for tag, i1, i2, j1, j2 in sm.get_opcodes() if tag in ("delete", "replace")][:10]
out = {"model": a.model, "expected_words": len(want), "heard_words": len(heard), "approx_wer": wer, "missing_or_wrong": missing, "words": words, "listened": False}
print(json.dumps({k: v for k, v in out.items() if k != "words"})); json.dump(out, open("speech-check.json", "w"), indent=1)
sys.exit(0 if wer <= a.max_wer else 1)
