"""Publish ONE ready Reel. Never retries an uncertain publish: marks needs_reconcile + alert."""
import os, sys, time, json, argparse, requests
from common import *
import gate
def window_ok(c, rows):
    t = now().astimezone(LON)
    if not c["window_hours_london"][0] <= t.hour < c["window_hours_london"][1]: return "outside window"
    today = [r for r in rows if r["state"] in ("verified","needs_reconcile","uploading") and r.get("started_at","")[:10] == t.date().isoformat()]
    if len(today) >= c["max_per_day"]: return "daily cap reached"
    if today and (now()-dt.datetime.fromisoformat(max(r["started_at"] for r in today))).total_seconds() < c["min_gap_minutes"]*60: return "min gap"
    manual = os.environ.get("MANUAL") == "1"
    if not manual and c.get("slots_london"):
        hm = t.strftime("%H:%M"); due = sum(1 for s in c["slots_london"] if s <= hm)
        if len(today) >= due: return "waiting for next peak slot"
    return None
def api(method, url, tok, **kw):
    r = requests.request(method, url, params={**kw.pop("params", {}), "access_token": tok}, timeout=120, **kw)
    return r.status_code, r.json() if r.content else {}
def publish(key, tok, dry):
    c = cfg(); v = ROOT/"queue"/key/"video.mp4"; cap = (ROOT/"queue"/key/"caption.txt").read_text()
    L = load_ledger(); row = {"key": key, "sha256": sha256(v), "state": "uploading", "started_at": now().isoformat()}
    if dry: print("DRY-RUN would publish", key); return True
    L["rows"].append(row); save_ledger(L)            # row written BEFORE upload = the lock
    commit_ledger(f"ledger: start {key}")
    try:
        s, j = api("POST", f"{graph_host()}/{c['graph_version']}/{c['account_id']}/media", tok, data={"media_type":"REELS","upload_type":"resumable","caption":cap,"share_to_feed":"true"})
        if s != 200 or "id" not in j: row["state"] = "failed_before_upload"; row["err"] = str(j)[:300]; raise RuntimeError(f"container create failed: {j}")
        cid = j["id"]; row["container"] = cid
        size = v.stat().st_size
        with open(v, "rb") as f:
            r = requests.post(f"https://rupload.facebook.com/ig-api-upload/{c['graph_version']}/{cid}", headers={"Authorization": f"OAuth {tok}", "offset": "0", "file_size": str(size)}, data=f, timeout=600)
        if r.status_code != 200: row["state"] = "failed_before_upload"; raise RuntimeError(f"upload failed {r.status_code} {r.text[:300]}")
        for _ in range(60):
            s, j = api("GET", f"{graph_host()}/{c['graph_version']}/{cid}", tok, params={"fields": "status_code"})
            if j.get("status_code") == "FINISHED": break
            if j.get("status_code") in ("ERROR", "EXPIRED"): row["state"] = "failed_before_upload"; raise RuntimeError(f"processing {j}")
            time.sleep(10)
        else: row["state"] = "failed_before_upload"; raise RuntimeError("processing timeout")
        row["state"] = "needs_reconcile"; save_ledger(L)   # from here on, never retry blindly
        s, j = api("POST", f"{graph_host()}/{c['graph_version']}/{c['account_id']}/media_publish", tok, data={"creation_id": cid})
        if s != 200 or "id" not in j: raise RuntimeError(f"publish uncertain: {s} {j}")
        row["media_id"] = j["id"]
        s, j = api("GET", f"{graph_host()}/{c['graph_version']}/{row['media_id']}", tok, params={"fields": "permalink"})
        if "permalink" not in j: raise RuntimeError("no permalink returned")
        row["permalink"] = j["permalink"]; row["state"] = "verified"; row["published_at"] = now().isoformat()
        save_ledger(L); commit_ledger(f"ledger: verified {key}"); print("PUBLISHED", row["permalink"]); return True
    except Exception as e:
        save_ledger(L); alert(key, f"{row['state']}: {e}"); commit_ledger(f"ledger: {row['state']} {key}"); return False
def commit_ledger(msg):
    if not os.environ.get("GITHUB_ACTIONS"): return
    subprocess.run(["git","config","user.name","stealth-talks-bot"]); subprocess.run(["git","config","user.email","bot@users.noreply.github.com"])
    subprocess.run(["git","add","ledger","alerts"]); subprocess.run(["git","commit","-m",msg]); subprocess.run(["git","pull","--rebase"]); subprocess.run(["git","push"])
if __name__ == "__main__":
    ap = argparse.ArgumentParser(); ap.add_argument("--dry-run", action="store_true"); a = ap.parse_args()
    c = cfg()
    if not c["enabled"]: print("kill switch: disabled"); sys.exit(0)
    L = load_ledger()
    if any(r["state"] in ("needs_reconcile", "uploading") for r in L["rows"]): alert("ledger", "unreconciled row: publishing halted"); sys.exit(1)
    why = window_ok(c, L["rows"])
    if why: print("skip:", why); sys.exit(0)
    tok = get_token()
    if not tok and not a.dry_run: alert("token", "IG_TOKEN secret missing"); sys.exit(1)
    for d in sorted((ROOT/"queue").glob("*/")):
        if d.name.startswith("_") or not (d/"approvals.json").exists(): continue
        f = gate.check(d.name)
        if f: print("not ready", d.name, f); continue
        sys.exit(0 if publish(d.name, tok, a.dry_run) else 1)
    print("nothing ready")
