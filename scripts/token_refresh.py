"""Token upkeep. IG tokens (IG...): refresh endpoint. EAA tokens (Facebook login): exchange needs FB_APP_ID + FB_APP_SECRET secrets; page tokens from a long-lived user token do not expire. UNTESTED live."""
import os, sys, json, requests, subprocess
from common import *
tok = get_token()
if tok.startswith("EAA"):
    app, sec = os.environ.get("FB_APP_ID", ""), os.environ.get("FB_APP_SECRET", "")
    if not (app and sec):
        alert("token", "EAA token: auto-refresh needs FB_APP_ID and FB_APP_SECRET secrets (or use a never-expiring page/system-user token)"); sys.exit(1)
    r = requests.get("https://graph.facebook.com/v27.0/oauth/access_token", params={"grant_type": "fb_exchange_token", "client_id": app, "client_secret": sec, "fb_exchange_token": tok}, timeout=60)
else:
    r = requests.get("https://graph.instagram.com/refresh_access_token", params={"grant_type": "ig_refresh_token", "access_token": tok}, timeout=60)
j = r.json() if r.content else {}
if r.status_code != 200 or "access_token" not in j:
    alert("token", f"refresh failed: {r.status_code} {str(j.get('error', j))[:200]}"); sys.exit(1)
p = subprocess.run(["gh", "secret", "set", "IG_TOKEN", "--repo", os.environ["GITHUB_REPOSITORY"]], input=j["access_token"], text=True, env={**os.environ, "GH_TOKEN": os.environ.get("REPO_ADMIN_PAT", "")})
if p.returncode: alert("token", "refreshed but could not store new token (REPO_ADMIN_PAT needs secrets write)"); sys.exit(1)
(ROOT/"data/token-status.json").write_text(json.dumps({"refreshed_at": now().isoformat(), "expires_in_s": j.get("expires_in")}) + "\n")
print("token refreshed")
