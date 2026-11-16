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

def ding_dong():  # PA announcement chime: two bell tones, falling third
    out = np.zeros(int(SR*1.1))
    for i, (f, off) in enumerate(((783.99, 0.0), (622.25, 0.42))):
        x = t(.65); y = (np.sin(2*np.pi*f*x) + .4*np.sin(2*np.pi*2*f*x) + .2*np.sin(2*np.pi*3.01*f*x))*np.exp(-x*6)*env(len(x), .003, .1)
        o = int(off*SR); out[o:o+len(y)] += y
    return out
def boom():  # meme-style sub boom: pitch-dropping sine + short noise crack + long tail
    x = t(1.0); f = 140*np.exp(-x*4.5)+38; y = np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-x*3.2)
    y += .5*lowpass(rng.standard_normal(len(x)), 20)*np.exp(-x*28); return y*env(len(x), .001, .25)
def scratch():  # record scratch: gritty saw with a fast down-up pitch bend through a band
    x = t(.42); f = 900*np.exp(-x*5)*(1+.5*np.sin(2*np.pi*9*x)) + 120
    saw = 2*((np.cumsum(f)/SR) % 1) - 1; n = rng.standard_normal(len(x))*.25
    y = lowpass(saw+n, 3) - lowpass(saw+n, 40); return y*np.sin(np.pi*x/.42)**.5
def static():  # PA crackle/hiss
    x = t(.55); n = rng.standard_normal(len(x)); cr = (rng.random(len(x)) > .985)*rng.standard_normal(len(x))*3
    return (lowpass(n, 2)*.35 + cr)*env(len(x), .01, .15)
def honk():  # silly two-tone horn
    x = t(.38); f = np.where(x < .17, 330, 262); y = np.sign(np.sin(2*np.pi*np.cumsum(f)/SR))*.5 + np.sin(2*np.pi*np.cumsum(f)/SR)*.5
    return lowpass(y, 3)*env(len(x), .005, .08)
def write(p, y):
    y = (np.clip(norm(y), -1, 1)*32767).astype("<i2")
    with wave.open(str(p), "wb") as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(y.tobytes())
if __name__ == "__main__":
    out = Path(sys.argv[1] if len(sys.argv) > 1 else "assets/sfx"); out.mkdir(parents=True, exist_ok=True)
    for n, f in dict(pop=pop, click=click, whoosh=whoosh, thud=thud, chime=chime, rise=rise, tick=tick, ding_dong=ding_dong, boom=boom, scratch=scratch, static=static, honk=honk).items(): write(out/f"{n}.wav", f()); print("wrote", out/f"{n}.wav")
