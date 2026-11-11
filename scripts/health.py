import os, sys, json, requests
from common import *
c = cfg(); bad = []
tok = get_token(); print("TOKEN SHAPE:", token_shape())
def msg(r):
    try: e = r.json().get("error", {}); return f"{r.status_code} code={e.get('code')} sub={e.get('error_subcode')} type={e.get('type')} msg={str(e.get('message'))[:160]}"
    except Exception: return str(r.status_code)
base = f"{graph_host()}/{c['graph_version']}"
print("HOST:", graph_host())
r = requests.get(f"{base}/{c['account_id']}", params={"fields": "username"}, headers={"Authorization": f"Bearer {tok}"}, timeout=60)
print("ME ->", msg(r) if r.status_code != 200 else {k: v for k, v in r.json().items() if k == "username"})
if r.status_code != 200: bad.append("account check failed: " + msg(r))
else:
    print("ACCOUNT OK:", r.json().get("username"))
rows = load_ledger()["rows"]
if any(x["state"] == "needs_reconcile" for x in rows): bad.append("unreconciled publish")
ready = [d.name for d in (ROOT/"queue").glob("*/") if not d.name.startswith("_") and (d/"approvals.json").exists() and not __import__("gate").check(d.name)]
ver = [x for x in rows if x["state"] == "verified" and x.get("published_at")]
if ver and (now() - dt.datetime.fromisoformat(max(x["published_at"] for x in ver))).days >= 2 and not ready: bad.append("nothing published for 2+ days and nothing queued")
if len(ready) < 2: bad.append(f"queue low: only {len(ready)} READY Reel(s) (target 6, need >= 4 per day)")
try:
    ts = json.loads((ROOT/"data/token-status.json").read_text()); age = (now() - dt.datetime.fromisoformat(ts["refreshed_at"])).days
    if age >= 10: bad.append(f"IG token last refreshed {age} days ago (weekly refresh should run Mondays); token may expire")
except Exception as e: bad.append(f"token-status.json unreadable: {e}")
for b in bad: alert("health", b)
print("HEALTH", "OK" if not bad else bad); sys.exit(1 if bad else 0)
