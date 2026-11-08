"""Deterministic synthesized sound effects (no licences, no downloads). Usage: python scripts/sfx_synth.py [outdir]
Writes 44.1 kHz mono 16-bit WAVs: pop, click, whoosh, thud, chime, rise, tick."""
import sys, wave
from pathlib import Path
import numpy as np
SR = 44100
rng = np.random.default_rng(7)
def t(d): return np.arange(int(SR*d)) / SR
def env(n, a=0.003, r=0.08):
    e = np.ones(n); na, nr = max(1, int(a*SR)), max(1, int(r*SR))
    e[:na] = np.linspace(0, 1, na); e[-nr:] *= np.linspace(1, 0, nr); return e
def lowpass(x, k): return np.convolve(x, np.ones(k)/k, mode="same")
def norm(x, peak=0.8): return x / (np.max(np.abs(x)) + 1e-9) * peak
def pop():
    x = t(.12); f = 900*np.exp(-x*28)+180; y = np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-x*30); return y*env(len(x), .001, .03)
def click():
    x = t(.04); return (rng.standard_normal(len(x))*np.exp(-x*160) + .5*np.sin(2*np.pi*2200*x)*np.exp(-x*220))*env(len(x), .0005, .01)
def whoosh():
    x = t(.5); n = rng.standard_normal(len(x)); y = lowpass(n, 6) - lowpass(n, 60); w = np.sin(np.pi*x/.5)**2; return y*w
def thud():
    x = t(.35); f = 120*np.exp(-x*9)+45; return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-x*9)*env(len(x), .002, .1)
def chime():
    x = t(.9); y = sum(a*np.sin(2*np.pi*f*x) for f, a in ((880, 1), (1318.5, .55), (1760, .3))); return y*np.exp(-x*5)*env(len(x), .004, .2)
def rise():
    x = t(.7); f = 300+900*(x/.7)**2; return np.sin(2*np.pi*np.cumsum(f)/SR)*(x/.7)*env(len(x), .02, .05)
def tick():
    x = t(.03); return np.sin(2*np.pi*1500*x)*np.exp(-x*200)*env(len(x), .0005, .008)
def write(p, y):
    y = (np.clip(norm(y), -1, 1)*32767).astype("<i2")
    with wave.open(str(p), "wb") as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(y.tobytes())
if __name__ == "__main__":
    out = Path(sys.argv[1] if len(sys.argv) > 1 else "assets/sfx"); out.mkdir(parents=True, exist_ok=True)
    for n, f in dict(pop=pop, click=click, whoosh=whoosh, thud=thud, chime=chime, rise=rise, tick=tick).items(): write(out/f"{n}.wav", f()); print("wrote", out/f"{n}.wav")
