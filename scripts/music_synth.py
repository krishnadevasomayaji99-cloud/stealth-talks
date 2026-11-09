"""Original synthesized music bed (no samples, no licensing). Usage: python scripts/music_synth.py OUT.wav SECONDS [--bpm 118] [--seed 1]
Chord loop Am-F-C-G: sub bass, kick on beats, offbeat hats, soft plucks. Deterministic."""
import sys, numpy as np, soundfile as sf
out=sys.argv[1];dur=float(sys.argv[2]);bpm=float(sys.argv[sys.argv.index("--bpm")+1]) if "--bpm" in sys.argv else 118.0
sr=44100;n=int(dur*sr);y=np.zeros(n,dtype=np.float64);beat=60.0/bpm
def add(sig,t0):
    i=int(t0*sr)
    if i>=n:return
    j=min(n,i+len(sig));y[i:j]+=sig[:j-i]
def env(L,a=0.005,d=3.0):
    t=np.arange(L)/sr;return np.minimum(1,t/a)*np.exp(-t*d)
def kick():
    L=int(0.28*sr);t=np.arange(L)/sr;f=110*np.exp(-t*18)+45;return np.sin(2*np.pi*np.cumsum(f)/sr)*env(L,0.002,9)
def hat():
    L=int(0.07*sr);rng=np.random.default_rng(3);return rng.standard_normal(L)*env(L,0.001,60)*0.25
def note(f,L,wave="sine",d=4.0):
    t=np.arange(int(L*sr))/sr
    s=np.sin(2*np.pi*f*t) if wave=="sine" else (np.sign(np.sin(2*np.pi*f*t))*0.5+np.sin(2*np.pi*f*2*t)*0.3)
    return s*env(len(t),0.004,d)
roots=[110.0,87.31,130.81,98.0]   # A2 F2 C3 G2
chords=[[220,261.63,329.63],[174.61,220,261.63],[261.63,329.63,392],[196,246.94,293.66]]
nb=int(dur/beat)+2
for b in range(nb):
    t0=b*beat;bar=(b//4)%4
    if b%1==0:add(kick()*0.9,t0)
    add(hat(),t0+beat/2)
    add(note(roots[bar],beat*0.9,"sine",3.0)*0.55,t0)
    ch=chords[bar]
    add(note(ch[(b*2)%3]*2,beat/2,"tri",9.0)*0.16,t0+beat/2)
    add(note(ch[(b*2+1)%3]*2,beat/2,"tri",9.0)*0.12,t0)
y/=max(1e-6,np.abs(y).max());sf.write(out,(y*0.8).astype(np.float32),sr);print("bed",out,round(dur,1),"s",bpm,"bpm")
