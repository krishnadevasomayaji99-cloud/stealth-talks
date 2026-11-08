"""Pull per-Reel insights for verified rows into data/metrics.json. Needs instagram_business_manage_insights."""
import os, sys, json, requests
from common import *
tok = get_token(); c = cfg(); out = {}
for r in load_ledger()["rows"]:
    if r["state"] != "verified" or not r.get("media_id") or r.get("live") is False: continue
    x = requests.get(f"{graph_host()}/{c['graph_version']}/{r['media_id']}/insights", params={"metric": "views,reach,likes,comments,shares,saved,ig_reels_avg_watch_time", "access_token": tok}, timeout=60)
    j = x.json() if x.content else {}
    if x.status_code != 200: out[r["key"]] = {"error": str(j)[:200]}; continue
    out[r["key"]] = {m["name"]: m["values"][0]["value"] for m in j.get("data", [])}
p = ROOT/"data/metrics.json"; p.write_text(json.dumps({"at": now().isoformat(), "reels": out}, indent=1) + "\n")
errs = [k for k, v in out.items() if "error" in v]
if errs: alert("metrics", f"insights failed for {len(errs)} reels (permission?)")
