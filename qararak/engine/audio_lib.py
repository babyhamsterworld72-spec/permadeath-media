# Procedural music + SFX helpers for Qararak episodes (uses the shorts-motion-editor sfx.py)
import sys,glob,numpy as np
sys.path.insert(0,glob.glob('/root/.claude/skills/synced/*/shorts-motion-editor/scripts')[0])
import sfx as S
from scipy.io import wavfile
SR=S.SR;rng=np.random.default_rng(5)
def nf(m):return 440*2**((m-69)/12)
def tt(d):return np.arange(int(d*SR))/SR
def env(n,a=.01,r=.3):
    e=np.ones(n);ka=min(n,max(1,int(a*SR)));kr=min(n,max(1,int(r*SR)));e[:ka]=np.linspace(0,1,ka);e[-kr:]*=np.linspace(1,0,kr);return e
def tone(f,d,kind='sine',a=.01,r=.3):
    t=tt(d)
    if kind=='saw':x=sum(np.sin(2*np.pi*f*k*t)/k for k in range(1,9))*.6
    elif kind=='pluck':x=np.sin(2*np.pi*f*t)*np.exp(-t*6)+.4*np.sin(4*np.pi*f*t)*np.exp(-t*9)
    else:x=np.sin(2*np.pi*f*t)
    return x*env(len(t),a,r)
def put(b,x,t,g=1.):
    i=int(t*SR)
    if i<0:x=x[-i:];i=0
    x=x[:max(0,len(b)-i)];b[i:i+len(x)]+=g*x
def pad(b,notes,t0,d,g=.06,cut=1400):
    if d<=0.05:return
    for m in notes:put(b,S.lp(tone(nf(m),d,'saw',a=min(.6,d/3),r=min(1.0,d/2)),cut),t0,g)
def kick(f0=55):t=tt(.5);return np.sin(2*np.pi*np.cumsum(f0+120*np.exp(-t*30))/SR)*np.exp(-t*7)
def heart(b,t,g=.8):put(b,kick(48),t,g);put(b,kick(44),t+.22,g*.7)
def fx(b,n,t,g=.6):x=S.norm(S.LIB[n]());put(b,x,t-S.LEAD.get(n,0),g)
def tick(b,t,g=.3):put(b,S.norm(S.tick()),t,g)
def step(b,t,g=.35):x=S.lp(rng.standard_normal(int(.09*SR)),900)*np.exp(-tt(.09)*45);put(b,S.norm(x),t,g)
def knock(b,t,g=.8,n=3):
    for i in range(n):x=S.lp(rng.standard_normal(int(.12*SR)),500)*np.exp(-tt(.12)*40)+np.sin(2*np.pi*110*tt(.12))*np.exp(-tt(.12)*30);put(b,S.norm(x),t+i*.2,g)
def glitch(b,t,d=.3,g=.5):
    n=int(d*SR);x=np.sign(np.sin(2*np.pi*np.cumsum(200+1800*(rng.random(n)*6).astype(int)*300/1800)/SR))*.6+rng.standard_normal(n)*.3
    x*=np.repeat(rng.random(n//800+1)>.4,800)[:n];put(b,S.bp(x,300,6000),t,g)
def rewind(b,t,d=1.0,g=.4):
    n=int(d*SR);tm=np.arange(n)/SR;f=300+2500*(tm/d)**1.5;x=np.sign(np.sin(2*np.pi*np.cumsum(f)/SR))*.3+S.bp(rng.standard_normal(n),2000,7000)*.5;put(b,x*env(n,.05,.1),t,g)
def tape_stop(b,t,d=.6,g=.4):
    n=int(d*SR);tm=np.arange(n)/SR;f=220*(1-tm/d)+20;x=np.sin(2*np.pi*np.cumsum(f)/SR);put(b,S.lp(x,800)*env(n,.01,.2),t,g)
def notif(b,t,g=.4):put(b,tone(nf(84),.18,'pluck'),t,g);put(b,tone(nf(91),.3,'pluck'),t+.09,g)
def crowd(b,t,d=1.5,g=.25):n=int(d*SR);x=S.bp(rng.standard_normal(n),300,2500)*(1+.5*np.sin(2*np.pi*3*np.arange(n)/SR));put(b,x*env(n,.3,.4),t,g)
def master(b,name):
    b=np.tanh(b*1.15);b/=np.max(np.abs(b))*1.1;wavfile.write(name,SR,(np.stack([b,b],1)*32767).astype(np.int16))
