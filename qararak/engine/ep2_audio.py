import sys,json;sys.path.insert(0,'/home/user/permadeath-media/qararak/engine')
from audio_lib import *
TM=json.load(open('timing.json'));Lz=TM['lines'];DUR=TM['duration'];N=int(DUR*SR)
Ls=lambda i:Lz[i]['start']
b=[0,Ls(1)-.05,Ls(2)-.05,Ls(4)-.05,Ls(7)-.05,Ls(10)-.05,Ls(11)-.05,DUR]
B=np.zeros(N)
# music bed
ch=[[50,53,57],[46,50,53],[48,52,55],[45,49,52]]
t=0;k=0
while t<b[6]:
    if not (b[4]<=t<b[5]):pad(B,ch[k%4],t,min(3.2,b[6]-t),.05)
    t+=3;k+=1
for i in range(int(b[6]/.6)):
    x=i*.6
    if b[4]<=x<b[5]:continue
    put(B,kick(),x,.4 if x>b[1] else .3)
# tension section: drone + heartbeat
put(B,S.norm(S.drone(b[5]-b[4])),b[4],.45)
x=b[4]+.3
while x<b[5]-.3:heart(B,x,.55+.25*(x-b[4])/(b[5]-b[4]));x+=.85
# morning: brighter pad
pad(B,[57,61,64,69],b[5],b[6]-b[5],.045,2500)
# S0
r=np.random.default_rng(3)
for i in range(16):fx(B,'pop',r.random()*1.5,.25)
fx(B,'riser',1.33,.35);fx(B,'stamp',1.33,.9);fx(B,'boom',1.35,.7);crowd(B,1.4,1.6,.18)
# S1 CCTV
glitch(B,b[1]-.15,.3,.5)
for i in range(6):tick(B,b[1]+.2+i*.5,.25)
fx(B,'stamp',Ls(1)+1.0,.7);put(B,tone(nf(96),.12),Ls(1)+1.0,.25);put(B,tone(nf(96),.12),Ls(1)+1.2,.25)
# S2 door
fx(B,'whoosh',b[2],.45);knock(B,b[2]+.2,.9,3)
n=int(.7*SR);cr=S.bp(rng.standard_normal(n),400,1200)*np.sin(np.pi*np.arange(n)/n)*.6;put(B,cr,b[2]+1.35,.5)
fx(B,'glint',Ls(3)+1.6,.45)
# S3 reveal
fx(B,'whoosh',b[3],.5);fx(B,'boom',b[3]+.02,.5)
rewind(B,Ls(5),1.0,.45);tape_stop(B,Ls(5)+1.0,.3,.3);fx(B,'stamp',Ls(5)+1.2,.9);fx(B,'boom',Ls(5)+1.22,.6)
step(B,Ls(5)+1.25,.5)
fx(B,'riser',Ls(6)-.05,.3);put(B,tone(nf(88),.25,'pluck'),Ls(6),.3)
for i in range(8):tick(B,Ls(6)+.1+i*.3,.2)
# S4 framed
glitch(B,b[4]-.15,.35,.5);fx(B,'whoosh_down',b[4]+.2,.3)
fx(B,'riser',Ls(8)+1.1,.6);fx(B,'boom',Ls(8)+1.1,1.0);fx(B,'stamp',Ls(8)+1.12,.6)
glitch(B,Ls(9)+.25,.25,.45);fx(B,'stamp',Ls(9)+.3,.6)
# S5 morning
fx(B,'flutter',b[5]+.05,.3);fx(B,'ding',b[5]+.6,.35);fx(B,'whoosh',b[5]+1.6,.3)
# outro
fx(B,'whoosh',b[6],.5);fx(B,'pop',b[6]+.4,.55);fx(B,'pop',b[6]+.75,.55);fx(B,'ding',b[6]+1.3,.3);pad(B,[50,57,62],b[6],DUR-b[6],.05)
master(B,'bed.wav');print('ok',DUR,b)
