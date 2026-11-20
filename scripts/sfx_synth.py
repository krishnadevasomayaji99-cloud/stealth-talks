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
def heartbeat():  # lub-dub: two soft sub thumps
    out = np.zeros(int(SR*.7))
    for off, a in ((0.0, 1.0), (0.21, .7)):
        x = t(.25); f = 85*np.exp(-x*14)+38; y = np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-x*13)*env(len(x), .003, .06)*a
        o = int(off*SR); out[o:o+len(y)] += y
    return out
def music_box():  # glassy detuned music-box note cluster (falling third), the lullaby colour
    out = np.zeros(int(SR*1.7))
    for off, f in ((0.0, 1046.5), (0.32, 880.0), (0.64, 783.99)):
        x = t(.9); y = (np.sin(2*np.pi*f*x) + .35*np.sin(2*np.pi*f*2.76*x) + .15*np.sin(2*np.pi*f*5.4*x))*np.exp(-x*4.5)*env(len(x), .002, .15)
        o = int(off*SR); out[o:o+len(y)] += y*(1-off*.4)
    return out
def sparkle():  # rising glitter arpeggio for a ghost appearing / counter reset
    out = np.zeros(int(SR*.8))
    for i, f in enumerate((1318.5, 1568.0, 1975.5, 2349.3, 2637.0)):
        x = t(.3); y = np.sin(2*np.pi*f*x)*np.exp(-x*14)*env(len(x), .001, .05); o = int(i*.07*SR); out[o:o+len(y)] += y*(.5+i*.1)
    return out
def knock():  # three wooden knocks: short low-passed noise bursts + 180 Hz thump body
    out = np.zeros(int(SR*.9))
    for i in range(3):
        x = t(.12); y = (np.sin(2*np.pi*180*x)*np.exp(-x*45) + lowpass(np.random.randn(len(x)), 40)*np.exp(-x*60)*1.5)*env(len(x), .001, .03); o = int((.05+i*.26)*SR); out[o:o+len(y)] += y
    return out
def wind():  # 1.4 s swelling wind: band-limited noise with a slow rise/fall and slight whistle
    x = t(1.4); n = lowpass(np.random.randn(len(x)), 24)*np.sin(np.pi*x/1.4)**2
    return n + .12*np.sin(2*np.pi*(520+60*np.sin(x*3))*x)*np.sin(np.pi*x/1.4)**2
def question():  # "huh?" two-note rising boing for a floating ? icon: sine glide up with a small wobble, then a soft pop
    x = t(.55); f = 330 + 330*np.clip(x/.35, 0, 1)**1.6 + 18*np.sin(x*40)
    y = np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-x*3.5)*env(len(x), .004, .12)
    return y + .25*np.sin(4*np.pi*np.cumsum(f)/SR)*np.exp(-x*7)
def flutter():  # flock of wings taking off: fast amplitude-modulated noise bursts with a rising band, plus a soft whoosh tail
    x = t(1.1); n = lowpass(np.random.randn(len(x)), 6)-lowpass(np.random.randn(len(x)), 30)
    am = (0.5+0.5*np.sin(2*np.pi*(14+10*x)*x))**2
    return n*am*np.sin(np.pi*np.minimum(x/1.1, 1))**.7*np.exp(-x*1.2)
def swipe():  # thumb flick on a phone: quick band-passed noise sweep up then a soft tap, for "scrolling" gags
    x = t(.28); n = lowpass(np.random.randn(len(x)), 3)-lowpass(np.random.randn(len(x)), 18)
    sw = n*np.sin(np.pi*np.minimum(x/.2, 1))*np.exp(-x*9)
    tap = np.sin(2*np.pi*190*x)*np.exp(-x*60)*(x > .17)
    return sw + .7*tap
def bar_up():  # loading-bar step: four rising square-ish blips (C5 E5 G5 C6) like a retro progress meter
    out = np.zeros(int(SR*.5))
    for i, f in enumerate([523, 659, 784, 1046]):
        x = t(.09); y = np.sign(np.sin(2*np.pi*f*x))*.35*np.exp(-x*22)*env(len(x), .001, .03)
        o = int(i*.1*SR); out[o:o+len(y)] += y[:len(out)-o]
    return out
def write(p, y):
    y = (np.clip(norm(y), -1, 1)*32767).astype("<i2")
    with wave.open(str(p), "wb") as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(y.tobytes())
if __name__ == "__main__":
    out = Path(sys.argv[1] if len(sys.argv) > 1 else "assets/sfx"); out.mkdir(parents=True, exist_ok=True)
    for n, f in dict(pop=pop, click=click, whoosh=whoosh, thud=thud, chime=chime, rise=rise, tick=tick, ding_dong=ding_dong, boom=boom, scratch=scratch, static=static, honk=honk, heartbeat=heartbeat, music_box=music_box, sparkle=sparkle, knock=knock, wind=wind, question=question, flutter=flutter, swipe=swipe, bar_up=bar_up).items(): write(out/f"{n}.wav", f()); print("wrote", out/f"{n}.wav")
