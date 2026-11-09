"""Record an approval bound to the current file hash. Usage: python scripts/approve.py KEY GATE PASS|FAIL "evidence note"
GATE: story_check | visual_qa | caption_facts. Notes must name the evidence; listening is never recorded by a model."""
import sys, json
from common import *
key, gate_, verdict, note = sys.argv[1:5]
assert gate_ in ("story_check","visual_qa","caption_facts") and verdict in ("PASS","FAIL")
d = ROOT/"queue"/key; f = d/("caption.txt" if gate_=="caption_facts" else "video.mp4")
ap = d/"approvals.json"; a = json.loads(ap.read_text()) if ap.exists() else {}
a[gate_] = {"verdict": verdict, "sha256": sha256(f), "by": "Claude (model)", "at": now().isoformat(), "note": note, "listened": False}
ap.write_text(json.dumps(a, indent=1)); print(gate_, verdict, sha256(f)[:12])
