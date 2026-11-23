import sys,json;sys.path.insert(0,'/home/user/permadeath-media/qararak/engine')
from audio_lib import *
TM=json.load(open('timing.json'));Lz=TM['lines'];DUR=TM['duration'];N=int(DUR*SR)
Ls=lambda i:Lz[i]['start']
b=[0,Ls(1)-.05,Ls(3)-.05,Ls(5)-.05,Ls(6)-.05,Ls(7)-.05,Ls(9)-.05,Ls(11)-.05,DUR]
B=np.zeros(N)
ch=[[50,53,57],[46,50,53],[48,51,55],[45,49,52]]
# S0 hook: hit + shout stamp
fx(B,'boom',0.05,1.0);fx(B,'stamp',0.12,.8);glitch(B,.0,.25,.4);crowd(B,.3,2.5,.22)
fx(B,'stamp',Ls(0)+1.0,.95);fx(B,'boom',Ls(0)+1.02,.7)
# music bed from recap on
t=b[1];k=0
while t<b[7]:
    if not (b[3]<=t<b[4]) and not (b[5]<=t<b[6]):pad(B,ch[k%4],t,min(3.2,b[7]-t),.05)
    t+=3;k+=1
x=b[1]
while x<b[7]:
    if not (b[3]<=x<b[6]):put(B,kick(),x,.38)
    x+=.6
# S1 recap: rewind + id + money count
glitch(B,b[1]-.15,.3,.45);rewind(B,b[1],.5,.35);tape_stop(B,b[1]+.5,.25,.25)
fx(B,'riser',Ls(1)+.6,.3);fx(B,'stamp',Ls(1)+1.6,.7)
fx(B,'whoosh',Ls(2)-.05,.45)
for i in range(10):tick(B,Ls(2)+.15+i*.09,.2)
fx(B,'ding',Ls(2)+1.1,.35);notif(B,b[1]+.4,.3)
# S2 counting + shout
fx(B,'whoosh',b[2],.45)
for i in range(16):fx(B,'flutter',b[2]+.2+i*.17,.12) if i%3==0 else tick(B,b[2]+.2+i*.17,.15)
fx(B,'boom',Ls(4)-.05,.9);fx(B,'stamp',Ls(4),.9);crowd(B,Ls(4)+.3,2.0,.3)
# S3 stares: drone + heartbeat
put(B,S.norm(S.drone(b[4]-b[3])),b[3],.4);x=b[3]+.2
while x<b[4]-.2:heart(B,x,.7);x+=.8
for i in range(3):put(B,S.bp(rng.standard_normal(int(.5*SR)),800,3000)*env(int(.5*SR),.1,.2),b[3]+.3+i*.45,.12)
# S4 remember: camera
fx(B,'riser',b[4]-.3,.35);fx(B,'glint',b[4]+.2,.5);fx(B,'stamp',b[4]+1.0,.7)
for i in range(6):put(B,tone(nf(96),.08),b[4]+1.1+i*.35,.18)
# S5 guard room + footage: tension, freeze
glitch(B,b[5]-.15,.3,.5);put(B,S.norm(S.drone(b[6]-b[5])),b[5],.35)
for i in range(int((b[6]-b[5])/.5)):tick(B,b[5]+.2+i*.5,.22)
x=Ls(8)
while x<b[6]-.3:heart(B,x,.6);x+=.7
fx(B,'boom',b[6]-.9,.9);fx(B,'stamp',b[6]-.85,.8);put(B,tone(nf(88),.4),b[6]-.85,.2)
# S6 reveal + phone
fx(B,'whoosh',b[6],.5);fx(B,'riser',Ls(10)-.6,.4);notif(B,Ls(10)+.1,.5);fx(B,'ding',Ls(10)+.5,.35)
# outro
fx(B,'whoosh',b[7],.5);fx(B,'pop',b[7]+.4,.55);fx(B,'pop',b[7]+.75,.55);fx(B,'ding',b[7]+1.3,.3);pad(B,[50,57,62],b[7],DUR-b[7],.05)
fx(B,'riser',Ls(12)-.4,.3)
master(B,'bed.wav');print('ok',DUR,[round(v,2) for v in b])
