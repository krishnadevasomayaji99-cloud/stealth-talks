import json, hashlib, os, subprocess, sys, datetime as dt
from pathlib import Path
from zoneinfo import ZoneInfo
ROOT = Path(__file__).resolve().parent.parent
LON = ZoneInfo("Europe/London")
def cfg(): return json.loads((ROOT/"config/config.json").read_text())
def sha256(p):
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""): h.update(b)
    return h.hexdigest()
def now(): return dt.datetime.now(dt.timezone.utc)
def london_date(iso): return dt.datetime.fromisoformat(iso).astimezone(LON).date().isoformat()   # rows store UTC; slots/caps are London days
def ledger_path(): return ROOT/"ledger/ledger.json"
def load_ledger():
    p = ledger_path()
    return json.loads(p.read_text()) if p.exists() else {"rows": []}
def save_ledger(l): ledger_path().write_text(json.dumps(l, indent=1, sort_keys=True)+"\n")
def alert(key, msg):
    p = ROOT/"alerts/alerts.json"
    a = json.loads(p.read_text()) if p.exists() else []
    a.append({"at": now().isoformat(), "key": key, "msg": msg}); p.write_text(json.dumps(a, indent=1)+"\n")
    print("ALERT", key, msg, file=sys.stderr)
def probe(video):
    o = subprocess.run(["ffprobe","-v","error","-print_format","json","-show_streams","-show_format",str(video)],capture_output=True,text=True,check=True).stdout
    j = json.loads(o); v = next(s for s in j["streams"] if s["codec_type"]=="video")
    n, d = v["r_frame_rate"].split("/")
    return {"w": v["width"], "h": v["height"], "fps": int(n)/int(d), "dur": float(j["format"]["duration"]),
            "audio": any(s["codec_type"]=="audio" for s in j["streams"]), "vcodec": v["codec_name"]}

def get_token():
    """IG_TOKEN from env, cleaned of whitespace/newlines/quotes/'Bearer '/'access_token='."""
    raw = os.environ.get("IG_TOKEN", "")
    t = raw.strip().strip("'\"").strip()
    for p in ("Bearer ", "OAuth ", "access_token="):
        if t.startswith(p): t = t[len(p):].strip()
    return "".join(t.split())
def token_shape():
    raw = os.environ.get("IG_TOKEN", ""); t = get_token()
    return f"raw_len={len(raw)} clean_len={len(t)} starts={t[:3]!r} had_whitespace_or_quotes={raw != t}"

def graph_host():
    """EAA tokens (Facebook login) belong on graph.facebook.com; IG tokens on graph.instagram.com."""
    return "https://graph.facebook.com" if get_token().startswith("EAA") else "https://graph.instagram.com"
