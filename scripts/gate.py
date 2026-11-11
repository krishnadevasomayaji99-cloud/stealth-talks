"""Release gate. queue/<KEY>/{video.mp4,caption.txt,approvals.json}. Approvals are bound to file SHA-256."""
import json, sys
from common import *
REQ = ["story_check", "visual_qa", "caption_facts"]
def check(key):
    c, d = cfg(), ROOT/"queue"/key; fails = []
    v, cap, ap = d/"video.mp4", d/"caption.txt", d/"approvals.json"
    if not (v.exists() and cap.exists() and ap.exists()): return ["files missing"]
    m = probe(v); lo, hi = c["duration_seconds"]
    if not lo <= m["dur"] <= hi: fails.append(f"duration {m['dur']:.1f}s outside {lo}-{hi}")
    if [m["w"], m["h"]] != c["resolution"]: fails.append(f"resolution {m['w']}x{m['h']}")
    if m["fps"] < c["fps_min"]: fails.append(f"fps {m['fps']}")
    if not m["audio"] or m["vcodec"] != "h264": fails.append("need h264 + audio")
    # automated audio gate (objective, not listening) for Reels built from 11 Nov 2026
    import re as _re
    dm = _re.search(r"ST-(\d{8})", key)
    if dm and dm.group(1) >= "20261111":
        ar = d/"audio_report.json"
        if not ar.exists(): fails.append("audio_report.json missing (rebuild with make-reel)")
        else:
            r = json.loads(ar.read_text())
            if r.get("sha256") != sha256(v): fails.append("audio_report stale")
            elif not r.get("pass"): fails.append("audio check failed: " + "; ".join(r.get("problems", [])))
    text = cap.read_text()
    if c.get("ai_disclosure_line") and c["ai_disclosure_line"] not in text: fails.append("missing AI disclosure line")
    if "Sources" not in text: fails.append("caption has no Sources list")
    a = json.loads(ap.read_text()); vh, ch = sha256(v), sha256(cap)
    for g in REQ:
        e = a.get(g)
        if not e or e.get("verdict") != "PASS": fails.append(f"{g} not PASS")
        elif e.get("sha256") != (ch if g == "caption_facts" else vh): fails.append(f"{g} stale (file changed)")
    for r in load_ledger()["rows"]:
        if r["sha256"] == vh and r["state"] != "failed_before_upload": fails.append(f"duplicate of {r['key']} ({r['state']})")
    fails += craft_check(key, text)
    return fails
STYLES = {"noir", "crt", "notebook", "comic", "paper", "flat"}
GENRES = {"thriller", "mystery", "horror_comedy", "countdown", "found_footage", "heist", "documentary", "absurd_skit", "true_story"}
BANNED = ["plot twist", "send this to someone who"]
def craft_check(key, caption_text):
    """Story-craft rules (skills/story-craft) for Reels dated 20261112 or later. Older Reels are exempt."""
    import re as _re
    dm = _re.search(r"ST-(\d{8})", key)
    if not dm or dm.group(1) < "20261112": return []
    d, f = ROOT/"queue"/key, []
    sp, bp = d/"script.txt", d/"brief.json"
    if not bp.exists(): return ["brief.json missing (see skills/story-craft)"]
    try: b = json.loads(bp.read_text())
    except Exception as e: return [f"brief.json invalid: {e}"]
    script = sp.read_text() if sp.exists() else ""
    low = script.lower()
    for ph in BANNED:
        if ph in low: f.append(f"banned phrase in script: '{ph}'")
    if b.get("style") not in STYLES: f.append(f"style must be one of {sorted(STYLES)}")
    if b.get("genre") not in GENRES: f.append(f"genre must be one of {sorted(GENRES)}")
    if b.get("cliffhanger") not in ("threat", "info_gap", "reversal"): f.append("cliffhanger must be threat|info_gap|reversal")
    if len(b.get("open_loops", [])) < 3: f.append("need >=3 open_loops")
    if len(b.get("breaks", [])) < 2: f.append("need >=2 pattern breaks listed")
    sents = [x.strip() for x in _re.split(r"(?<=[.!?])\s+|\n+", script) if x.strip()]
    if sents and len(sents[0].split()) > 14: f.append("first line over 14 words")
    rw = (b.get("reveal_word") or "").lower().strip()
    if not rw: f.append("reveal_word missing")
    elif sents:
        head = " ".join(sents[:2]).lower(); pos = low.find(rw)
        if rw in head: f.append("reveal_word appears in the first two sentences (answer given away)")
        elif pos < 0: f.append("reveal_word not found in script")
        elif pos / max(1, len(low)) < 0.65: f.append(f"reveal_word first appears at {pos/len(low):.0%} of script; must be after 65%")
    # rotation vs previous two Reels (by key order); legacy reels without a brief count as flat/unknown genre
    prev = []
    for q in sorted((ROOT/"queue").glob("ST-*")):
        if q.name >= key: break
        pb = q/"brief.json"
        try: prev.append(json.loads(pb.read_text()) if pb.exists() else {"style": "flat", "genre": "legacy"})
        except Exception: prev.append({"style": "flat", "genre": "legacy"})
    for p2 in prev[-2:]:
        if p2.get("style") == b.get("style"): f.append(f"style '{b.get('style')}' repeats one of the previous two Reels")
    if prev and prev[-1].get("genre") == b.get("genre"): f.append(f"genre '{b.get('genre')}' repeats the previous Reel")
    return f
if __name__ == "__main__":
    f = check(sys.argv[1]); print("READY" if not f else "NOT READY: " + "; ".join(f)); sys.exit(1 if f else 0)
