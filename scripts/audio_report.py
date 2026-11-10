"""Automated objective audio report (NOT listening). Usage: python scripts/audio_report.py VIDEO SCRIPT OUT.json
Runs audio_check (loudness/peak/clipping/tail) and speech_check (Whisper words vs script, proves voice is audible and intelligible over the music), writes OUT.json bound to the video's SHA-256."""
import sys, json, subprocess, hashlib
v, script, out = sys.argv[1:4]
def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    try: return json.loads(r.stdout.strip().splitlines()[-1])
    except Exception: return {"error": (r.stdout + r.stderr)[-300:]}
here = __file__.rsplit("/", 1)[0] if "/" in __file__ else "."
au = run([sys.executable, f"{here}/audio_check.py", v]); sp = run([sys.executable, f"{here}/speech_check.py", v, script])
problems = list(au.get("problems", [])) + ([f"speech wer {sp.get('approx_wer')} > 0.15 (voice unclear or buried)"] if sp.get("approx_wer", 1) > 0.15 else [])
if "error" in au or "error" in sp: problems.append("check failed to run")
rep = {"sha256": hashlib.sha256(open(v, "rb").read()).hexdigest(), "audio": au, "speech": {k: sp.get(k) for k in ("approx_wer", "expected_words", "heard_words", "missing_or_wrong")}, "problems": problems, "pass": not problems, "listened": False}
json.dump(rep, open(out, "w"), indent=1); print(json.dumps(rep)); sys.exit(0)
