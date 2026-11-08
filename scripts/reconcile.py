"""Resolve a ledger row stuck in needs_reconcile/uploading. Never publishes.
  show      : print the row and the account's 10 most recent media (id, permalink, time) so a human/Claude can decide
  verified  : mark the row verified with a given media id (looks up and stores the permalink)
  failed    : mark the row failed_before_upload (safe to retry only if you confirmed nothing posted)"""
import sys, argparse, requests
from common import *
ap = argparse.ArgumentParser(); ap.add_argument("key"); ap.add_argument("action", choices=["show", "verified", "failed"]); ap.add_argument("--media-id", default="")
a = ap.parse_args(); c = cfg(); tok = get_token(); L = load_ledger()
row = next((r for r in L["rows"] if r["key"] == a.key), None)
if not row: sys.exit(f"no ledger row {a.key}")
H = {"Authorization": f"Bearer {tok}"}; base = f"{graph_host()}/{c['graph_version']}"
if a.action == "show":
    print("ROW:", {k: v for k, v in row.items() if k != "err"})
    j = requests.get(f"{base}/{c['account_id']}/media", params={"fields": "id,permalink,timestamp,media_type", "limit": 10}, headers=H, timeout=60).json()
    for m in j.get("data", []): print("RECENT:", m)
elif a.action == "verified":
    if not a.media_id: sys.exit("--media-id required")
    j = requests.get(f"{base}/{a.media_id}", params={"fields": "permalink"}, headers=H, timeout=60).json()
    if "permalink" not in j: sys.exit(f"cannot confirm media: {j}")
    row.update(media_id=a.media_id, permalink=j["permalink"], state="verified", published_at=now().isoformat(), note="reconciled manually")
    save_ledger(L); print("verified", j["permalink"])
else:
    row.update(state="failed_before_upload", note="reconciled: confirmed nothing posted"); save_ledger(L); print("marked failed")
