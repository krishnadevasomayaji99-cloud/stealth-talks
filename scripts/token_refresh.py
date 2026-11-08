"""Refresh long-lived Instagram token (valid ~60d, needs >=24h old). UNTESTED live. Needs PAT secret REPO_ADMIN_PAT to store the new token."""
import os, sys, json, requests, subprocess
from common import *
tok = get_token()
r = requests.get("https://graph.instagram.com/refresh_access_token", params={"grant_type": "ig_refresh_token", "access_token": tok}, timeout=60)
j = r.json() if r.content else {}
if r.status_code != 200 or "access_token" not in j:
    alert("token", f"refresh failed: {r.status_code} {str(j)[:200]}"); sys.exit(1)
new = j["access_token"]
p = subprocess.run(["gh","secret","set","IG_TOKEN","--repo",os.environ["GITHUB_REPOSITORY"]], input=new, text=True, env={**os.environ,"GH_TOKEN":os.environ.get("REPO_ADMIN_PAT","")})
if p.returncode: alert("token", "refreshed but could not store new token (REPO_ADMIN_PAT?)"); sys.exit(1)
(ROOT/"data/token-status.json").write_text(json.dumps({"refreshed_at": now().isoformat(), "expires_in_s": j.get("expires_in")}) + "\n")
print("token refreshed")
