import os, sys, requests
from common import *
c = cfg(); bad = []
tok = get_token(); print("TOKEN SHAPE:", token_shape())
def msg(r):
    try: e = r.json().get("error", {}); return f"{r.status_code} code={e.get('code')} sub={e.get('error_subcode')} type={e.get('type')} msg={str(e.get('message'))[:160]}"
    except Exception: return str(r.status_code)
base = f"https://graph.instagram.com/{c['graph_version']}"
r = requests.get(f"{base}/me", params={"fields": "user_id,username", "access_token": tok}, timeout=60)
print("ME ->", msg(r) if r.status_code != 200 else {k: v for k, v in r.json().items() if k == "username"})
if r.status_code != 200: bad.append("token check (/me) failed: " + msg(r))
else:
    uid = r.json().get("user_id") or r.json().get("id")
    print("configured account_id matches /me user_id:", str(uid) == str(c["account_id"]))
    r2 = requests.get(f"{base}/{c['account_id']}", params={"fields": "username", "access_token": tok}, timeout=60)
    if r2.status_code != 200: bad.append("configured account_id lookup failed: " + msg(r2) + f" (token's own user_id is {uid})")
rows = load_ledger()["rows"]
if any(x["state"] == "needs_reconcile" for x in rows): bad.append("unreconciled publish")
ready = [d.name for d in (ROOT/"queue").glob("*/") if not d.name.startswith("_") and (d/"approvals.json").exists() and not __import__("gate").check(d.name)]
ver = [x for x in rows if x["state"] == "verified" and x.get("published_at")]
if ver and (now() - dt.datetime.fromisoformat(max(x["published_at"] for x in ver))).days >= 2 and not ready: bad.append("nothing published for 2+ days and nothing queued")
for b in bad: alert("health", b)
print("HEALTH", "OK" if not bad else bad); sys.exit(1 if bad else 0)
