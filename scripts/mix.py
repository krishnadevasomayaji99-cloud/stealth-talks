"""Mix voice + SFX cues + (optional) bed into final audio, loudness-normalise, mux with silent video.
Usage: python scripts/mix.py voice.wav cues.json silent.mp4 out.mp4"""
import json, subprocess, sys, os
voice,cues,vid,out=sys.argv[1:5];bed=sys.argv[5] if len(sys.argv)>5 else None
cues=json.load(open(cues));sfx="assets/sfx/"
cmd=["ffmpeg","-y","-v","error","-i",voice]
for c in cues: cmd+=["-i",f"{sfx}{c['sfx']}.wav"]
fc=["[0:a]aresample=48000,volume=1.0,asplit=2[v][vsc]"];labels=["[v]"]
for i,c in enumerate(cues,1):
    ms=int(max(0,c["t"])*1000);g=c.get("gain",0.6)*0.45
    fc.append(f"[{i}:a]aresample=48000,volume={g},adelay={ms}|{ms}[s{i}]");labels.append(f"[s{i}]")
if bed:
    cmd+=["-i",bed];bi=len(cues)+1
    fc.append(f"[{bi}:a]aresample=48000,volume=0.30[bd];[bd][vsc]sidechaincompress=threshold=0.03:ratio=10:attack=8:release=300[bdd]");labels.append("[bdd]")
else:
    fc[0]=fc[0].replace(",asplit=2[v][vsc]","[v]")
fc.append("".join(labels)+f"amix=inputs={len(labels)}:normalize=0:duration=longest,loudnorm=I=-14:TP=-2:LRA=11[a]")
cmd+=["-filter_complex",";".join(fc),"-map","[a]","-ar","48000","/tmp/mix.wav"]
r=subprocess.run(cmd,capture_output=True,text=True)
if r.returncode: print(r.stderr[-600:]); sys.exit(1)
subprocess.run(["ffmpeg","-y","-v","error","-i",vid,"-i","/tmp/mix.wav","-map","0:v","-map","1:a","-c:v","copy","-af","apad","-c:a","aac","-b:a","192k","-shortest","-movflags","+faststart",out],check=True)
print("muxed",out)
