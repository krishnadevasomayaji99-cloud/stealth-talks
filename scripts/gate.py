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
    text = cap.read_text()
    if c["ai_disclosure_line"] not in text: fails.append("missing AI disclosure line")
    if "Sources" not in text: fails.append("caption has no Sources list")
    a = json.loads(ap.read_text()); vh, ch = sha256(v), sha256(cap)
    for g in REQ:
        e = a.get(g)
        if not e or e.get("verdict") != "PASS": fails.append(f"{g} not PASS")
        elif e.get("sha256") != (ch if g == "caption_facts" else vh): fails.append(f"{g} stale (file changed)")
    for r in load_ledger()["rows"]:
        if r["sha256"] == vh and r["state"] != "failed_before_upload": fails.append(f"duplicate of {r['key']} ({r['state']})")
    return fails
if __name__ == "__main__":
    f = check(sys.argv[1]); print("READY" if not f else "NOT READY: " + "; ".join(f)); sys.exit(1 if f else 0)
