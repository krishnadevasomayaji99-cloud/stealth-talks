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
if "--style" in sys.argv and sys.argv[sys.argv.index("--style")+1]=="backrooms":
    # suspense "backrooms" bed: detuned drone, fluorescent hum, tritone pad, sparse detuned music-box, sub pulses
    t=np.arange(n)/sr;rng=np.random.default_rng(7)
    lfo=0.5+0.5*np.sin(2*np.pi*0.07*t)
    y+=np.sin(2*np.pi*55*t)*0.5+np.sin(2*np.pi*58.3*t)*0.35*lfo            # beating minor-second drone
    hum=np.sin(2*np.pi*120*t)+0.6*np.sin(2*np.pi*240*t+1)+0.3*np.sin(2*np.pi*360*t)
    y+=hum*0.05*(0.7+0.3*np.sin(2*np.pi*0.9*t))                            # fluorescent light hum
    y+=(np.sin(2*np.pi*311.1*t)+np.sin(2*np.pi*440*t*1.003))*0.06*(0.3+0.7*np.sin(2*np.pi*0.05*t)**2)  # tritone pad swell
    hiss=np.convolve(rng.standard_normal(n),np.ones(40)/40,mode="same");y+=hiss*0.25*(0.4+0.6*lfo)  # room air
    mb=[329.63,311.13,293.66,277.18,246.94]                                  # slow falling detuned music-box line
    k=0;tt=1.2
    while tt<dur-0.5:
        f=mb[k%len(mb)]*(1.0+0.012*rng.standard_normal());L=int(1.6*sr);tn=np.arange(L)/sr
        sig=(np.sin(2*np.pi*f*tn)+0.4*np.sin(2*np.pi*f*2.01*tn))*np.exp(-tn*2.2)*0.12
        add(sig,tt);add(sig*0.45,tt+0.37);k+=1;tt+=beatgap if (beatgap:=2.1+0.8*rng.random()) else 0
    for tp in np.arange(4.0,dur,6.5):                                        # slow sub pulse, heartbeat of the place
        L=int(0.9*sr);tn=np.arange(L)/sr;add(np.sin(2*np.pi*(48*np.exp(-tn*2)+34)*tn)*np.exp(-tn*3.5)*0.7,tp)
    y/=max(1e-6,np.abs(y).max());sf.write(out,(y*0.8).astype(np.float32),sr);print("bed backrooms",out,round(dur,1),"s");sys.exit(0)
_m=sys.argv[sys.argv.index("--style")+1] if "--style" in sys.argv else ""
if _m in ("sad","quirky","bright"):
    # mood beds: seeded key/progression/melody so no two Reels share a loop
    rng=np.random.default_rng(int(sys.argv[sys.argv.index("--seed")+1]) if "--seed" in sys.argv else 1)
    t=np.arange(n)/sr
    root=float(rng.choice([196.0,220.0,246.94,261.63,293.66]))
    mid=lambda semis:root*2**(semis/12)
    if _m=="sad":
        bpmv=float(rng.choice([66,72,78]));scale=[0,2,3,5,7,8,10];progs=[[0,-4,-2,-5],[0,-2,-4,-5],[0,3,-2,-4]]
    elif _m=="quirky":
        bpmv=float(rng.choice([96,104,112]));scale=[0,2,4,7,9];progs=[[0,5,7,5],[0,7,9,5],[0,4,7,2]]
    else:
        bpmv=float(rng.choice([108,116,124]));scale=[0,2,4,5,7,9,11];progs=[[0,5,9,7],[0,7,9,5],[0,9,5,7]]
    pr=progs[int(rng.integers(len(progs)))];bt=60.0/bpmv
    def bell(f,L,d):
        tn=np.arange(int(L*sr))/sr;return (np.sin(2*np.pi*f*tn)+0.35*np.sin(2*np.pi*f*2.76*tn)+0.15*np.sin(2*np.pi*f*5.4*tn))*np.exp(-tn*d)
    def pad(f,L):
        tn=np.arange(int(L*sr))/sr;e=np.minimum(1,tn/0.6)*np.minimum(1,(L-tn)/0.6)
        return (np.sin(2*np.pi*f*tn)+np.sin(2*np.pi*f*1.004*tn)+0.5*np.sin(2*np.pi*f*2*tn))*e*0.5
    nbar=int(dur/(bt*4))+2;mel_i=int(rng.integers(len(scale)))
    for bar in range(nbar):
        t0=bar*bt*4;r=pr[bar%4]
        add(pad(mid(r-12),bt*4)*0.16,t0);add(pad(mid(r-12+(3 if _m=="sad" else 4)),bt*4)*0.10,t0);add(pad(mid(r-12+7),bt*4)*0.10,t0)
        add(note(mid(r-24),bt*1.8,"sine",2.2)*0.5,t0)
        if _m!="sad":
            add(note(mid(r-24),bt*0.8,"sine",3.0)*0.45,t0+bt*2.5)
            for b in range(4):add(kick()*(0.55 if _m=="quirky" else 0.75),t0+b*bt) if (_m=="bright" or b%2==0) else None
            for b in range(8):add(hat()*(0.8 if b%2 else 0.4),t0+b*bt/2)
        step=bt/2 if _m!="sad" else bt
        for k in range(int(4*bt/step)):
            if rng.random()<(0.75 if _m!="sad" else 0.6):
                mel_i=int(np.clip(mel_i+rng.choice([-2,-1,-1,0,1,1,2]),0,len(scale)*2-1))
                semis=scale[mel_i%len(scale)]+12*(mel_i//len(scale))
                add(bell(mid(r+semis+12),1.2,2.6 if _m=="sad" else 4.5)*(0.12 if _m=="sad" else 0.10),t0+k*step)
    y/=max(1e-6,np.abs(y).max());sf.write(out,(y*0.8).astype(np.float32),sr);print("bed",_m,out,round(dur,1),"s",bpmv,"bpm");sys.exit(0)
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
