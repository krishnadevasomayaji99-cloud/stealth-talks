"""Emergency flagger. No secrets needed. Flags when the queue cannot cover the posting slots.
Writes data/flags.json + data/flags.md, appends to alerts/alerts.json on CRITICAL, exits 1 on CRITICAL
(a failing run emails the repo owner via GitHub). The daily loop reads data/flags.md first."""
import json, sys
from common import *
import gate
c = cfg(); n = now().astimezone(LON); today = n.date()
rows = load_ledger()["rows"]
ready = sorted(d.name for d in (ROOT/"queue").glob("*/") if not d.name.startswith("_") and not gate.check(d.name))
posted_today = [r for r in rows if r["state"] == "verified" and r.get("published_at") and dt.datetime.fromisoformat(r["published_at"]).astimezone(LON).date() == today]
slots = [s for s in c["slots_london"] if (n.replace(hour=int(s[:2]), minute=int(s[3:]), second=0, microsecond=0)) > n]
need_today = min(len(slots), max(0, c["max_per_day"] - len(posted_today)))
flags = []
def add(level, msg): flags.append({"level": level, "msg": msg})
if len(ready) < need_today: add("CRITICAL", f"{len(ready)} READY Reel(s) but {need_today} slot(s) left today: build or approve more now")
if len(ready) < need_today + 2: add("WARN", f"spares below target: {len(ready)} READY, want {need_today + 2} (slots left + 2 spares for tomorrow)")
ver = [r for r in rows if r["state"] == "verified" and r.get("published_at")]
if ver:
    h = (now() - dt.datetime.fromisoformat(max(r["published_at"] for r in ver))).total_seconds() / 3600
    if h >= 30: add("CRITICAL", f"nothing published for {h:.0f} h")
if any(r["state"] == "needs_reconcile" for r in rows): add("CRITICAL", "needs_reconcile row in ledger: run reconcile, never repost")
st = (ROOT/"data/status.md")
if st.exists() and "BLOCKER" in st.read_text(): add("WARN", "data/status.md records a BLOCKER (e.g. source fetch refused): check it")
drafts = [d.name for d in (ROOT/"queue").glob("*/") if not d.name.startswith("_") and (d/"script.txt").exists() and gate.check(d.name) and not (d/"approvals.json").exists()]
if drafts: add("INFO", "unapproved drafts: " + ", ".join(drafts))
crit = [f for f in flags if f["level"] == "CRITICAL"]
out = {"at": now().isoformat(), "london": n.strftime("%Y-%m-%d %H:%M"), "ready": ready, "slots_left": slots, "posted_today": len(posted_today), "flags": flags}
(ROOT/"data/flags.json").write_text(json.dumps(out, indent=1) + "\n")
(ROOT/"data/flags.md").write_text(f"# Flags {out['london']} London\nREADY: {', '.join(ready) or 'none'}\n" + "".join(f"- {f['level']}: {f['msg']}\n" for f in flags) + ("" if flags else "- all clear\n"))
for f in crit: alert("flagger", f["msg"])
print((ROOT/"data/flags.md").read_text()); sys.exit(1 if crit else 0)
