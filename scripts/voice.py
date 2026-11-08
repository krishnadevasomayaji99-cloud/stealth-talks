"""Narration: Kokoro-onnx TTS per script line -> voice.wav, then Whisper word timings aligned to the SCRIPT words -> words.json.
Usage: python scripts/voice.py script.txt outdir [--voice bm_george] [--speed 1.0]"""
import argparse, json, re, subprocess, sys, difflib, os
import numpy as np, soundfile as sf
ap=argparse.ArgumentParser();ap.add_argument("script");ap.add_argument("out");ap.add_argument("--voice",default="bm_george");ap.add_argument("--speed",type=float,default=1.0);ap.add_argument("--gap",type=float,default=0.38)
a=ap.parse_args();os.makedirs(a.out,exist_ok=True)
from kokoro_onnx import Kokoro
k=Kokoro("kokoro-v1.0.onnx","voices-v1.0.bin")
lines=[l.strip() for l in open(a.script,encoding="utf-8") if l.strip()]
parts=[];sr=24000
for i,l in enumerate(lines):
    s,sr=k.create(l,voice=a.voice,speed=a.speed,lang="en-gb");parts.append(np.asarray(s,dtype=np.float32))
    if i<len(lines)-1: parts.append(np.zeros(int(sr*a.gap),dtype=np.float32))
audio=np.concatenate([np.zeros(int(sr*0.25),dtype=np.float32)]+parts)
wav=os.path.join(a.out,"voice.wav");sf.write(wav,audio,sr)
raw=subprocess.run(["ffmpeg","-v","error","-i",wav,"-ac","1","-ar","16000","-f","s16le","-"],capture_output=True,check=True).stdout
x=np.frombuffer(raw,dtype=np.int16).astype(np.float32)/32768.0
from faster_whisper import WhisperModel
m=WhisperModel("base.en",device="cpu",compute_type="int8")
segs,_=m.transcribe(x,word_timestamps=True,language="en")
heard=[(w.word.strip(),w.start,w.end) for s in segs for w in (s.words or [])]
norm=lambda s:re.sub(r"[^a-z0-9']","",s.lower())
script_words=" ".join(lines).split()
sm=difflib.SequenceMatcher(a=[norm(w) for w in script_words],b=[norm(h[0]) for h in heard],autojunk=False)
res=[None]*len(script_words)
for blk in sm.get_matching_blocks():
    for d in range(blk.size): res[blk.a+d]={"w":script_words[blk.a+d],"start":round(heard[blk.b+d][1],3),"end":round(heard[blk.b+d][2],3)}
# interpolate unmatched words between neighbours
dur=len(audio)/sr
for i,r in enumerate(res):
    if r is None:
        j=i
        while j<len(res) and res[j] is None: j+=1
        p=res[i-1]["end"] if i>0 and res[i-1] else 0.25
        q=res[j]["start"] if j<len(res) else dur
        n=j-i;idx=sum(1 for t in range(i) if res[t] is None and t>=i-0)  # position handled below
        span=(q-p)/max(1,(j-i))
        res[i]={"w":script_words[i],"start":round(p,3),"end":round(p+span*0.95,3)}
        # chain: next unmatched starts after this one
        res[i]["_chain"]=True
# fix chained interpolation: recompute runs
i=0
while i<len(res):
    if res[i].get("_chain"):
        j=i
        while j<len(res) and res[j].get("_chain"): j+=1
        p=res[i-1]["end"] if i>0 else 0.25;q=res[j]["start"] if j<len(res) else dur
        span=(q-p)/(j-i)
        for t in range(i,j): res[t]={"w":script_words[t],"start":round(p+span*(t-i),3),"end":round(p+span*(t-i)+span*0.95,3)}
        i=j
    else: i+=1
json.dump(res,open(os.path.join(a.out,"words.json"),"w"),indent=1)
print(json.dumps({"voice_seconds":round(dur,2),"script_words":len(script_words),"whisper_words":len(heard),"matched":sum(b.size for b in sm.get_matching_blocks())}))
