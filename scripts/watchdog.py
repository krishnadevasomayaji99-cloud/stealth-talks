"""Self-heal + alert: if posts today < slots already due, dispatch publish. If 2+ slots behind (or a publish run failed), exit 1 so GitHub emails the owner."""
import json,os,subprocess,datetime as dt,sys
sys.path.insert(0,'scripts')
from common import *
c=cfg();L=load_ledger()
t=now().astimezone(LON);hm=t.strftime("%H:%M")
lo,hi=c["window_hours_london"]
if not lo<=t.hour<hi: print("outside window");sys.exit(0)
due=sum(1 for s in c["slots_london"] if s<=hm)
today=[r for r in L["rows"] if r["state"] in("verified","needs_reconcile","uploading") and r.get("started_at","")[:10]==t.date().isoformat()]
n=len(today);behind=due-n
ready=[d for d in sorted(os.listdir(ROOT/"queue")) if d.startswith("ST-") and (ROOT/"queue"/d/"video.mp4").exists()]
print(f"london {hm} due={due} posted_today={n} behind={behind}")
if behind<=0: sys.exit(0)
# last post age; if a post is merely waiting on min gap, don't nag
if today and (now()-dt.datetime.fromisoformat(max(r["started_at"] for r in today))).total_seconds()<c["min_gap_minutes"]*60: print("min gap, waiting");sys.exit(0)
repo=os.environ["GITHUB_REPOSITORY"]
runs=json.loads(subprocess.run(["gh","run","list","--workflow","publish.yml","--limit","3","--json","status,conclusion,createdAt"],capture_output=True,text=True).stdout or "[]")
if any(r["status"]!="completed" for r in runs): print("publish running");sys.exit(0)
print("behind schedule: dispatching publish")
subprocess.run(["gh","api","-X","POST",f"repos/{repo}/actions/workflows/publish.yml/dispatches","-f","ref=main","-f","inputs[dry_run]=false"],check=False)
if behind>=2: print(f"ALERT: {behind} slots behind schedule (GitHub cron skipped?)");sys.exit(1)
