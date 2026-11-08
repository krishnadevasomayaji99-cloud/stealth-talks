"""Objective audio checks with ffmpeg (NOT listening). Usage: python scripts/audio_check.py video.mp4
Reports integrated loudness, true peak, clipping, trailing silence. Exit 1 if outside targets."""
import re, subprocess, sys, json
v = sys.argv[1]
def run(args): return subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", v, *args, "-f", "null", "-"], capture_output=True, text=True).stderr
e = run(["-af", "ebur128=peak=true"]); sm = e[e.rfind("Summary:"):]
I = float(re.search(r"I:\s+(-?[\d.]+)\s+LUFS", sm).group(1)); tp = float(re.search(r"Peak:\s+(-?[\d.]+)\s+dBFS", sm).group(1))
a = run(["-af", "astats=metadata=0:reset=0"]); clip = max([int(x) for x in re.findall(r"Number of clipped samples:\s*(\d+)", a)] or [0])
s = run(["-af", "silencedetect=n=-50dB:d=0.5"]); starts = re.findall(r"silence_start: ([\d.]+)", s)
dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", v], capture_output=True, text=True).stdout)
tail = (dur - float(starts[-1])) if starts and dur - float(starts[-1]) < 1.5 else 0.0
bad = []
if not -16 <= I <= -12: bad.append(f"loudness {I} LUFS outside -16..-12")
if tp > -1: bad.append(f"true peak {tp} dBTP above -1")
if clip: bad.append(f"{clip} clipped samples")
if tail > 0.5: bad.append(f"trailing silence {tail:.1f}s")
print(json.dumps({"lufs": I, "true_peak_dbtp": tp, "clipped_samples": clip, "trailing_silence_s": round(tail, 2), "duration_s": round(dur, 2), "problems": bad, "listened": False}))
sys.exit(1 if bad else 0)
