import os, sys, requests
from common import *
c = cfg(); bad = []
tok = os.environ.get("IG_TOKEN", "")
r = requests.get(f"https://graph.instagram.com/{c['graph_version']}/{c['account_id']}", params={"fields": "username", "access_token": tok}, timeout=60)
if r.status_code != 200: bad.append(f"account check failed {r.status_code}")
rows = load_ledger()["rows"]
if any(x["state"] == "needs_reconcile" for x in rows): bad.append("unreconciled publish")
ready = [d.name for d in (ROOT/"queue").glob("*/") if not d.name.startswith("_") and (d/"approvals.json").exists() and not __import__("gate").check(d.name)]
ver = [x for x in rows if x["state"] == "verified" and x.get("published_at")]
if ver and (now() - dt.datetime.fromisoformat(max(x["published_at"] for x in ver))).days >= 2 and not ready: bad.append("nothing published for 2+ days and nothing queued")
for b in bad: alert("health", b)
print("HEALTH", "OK" if not bad else bad); sys.exit(1 if bad else 0)
