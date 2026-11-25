import sys,json;sys.path.insert(0,'/home/user/permadeath-media/qararak/engine')
from audio_lib import *
TM=json.load(open('timing.json'));Lz=TM['lines'];DUR=TM['duration'];N=int(DUR*SR)
Ls=lambda i:Lz[i]['start'];Le=lambda i:Lz[i]['end'];wd=lambda i,k:Lz[i]['words'][k]['s']
b=[0,Ls(1)-.05,Ls(2)-.05,Ls(3)-.05,Ls(5)-.05,Ls(6)-.05,Ls(8)-.05,Ls(10)-.05,DUR]
B=np.zeros(N)
ch=[[50,53,57],[46,50,53],[48,51,55],[45,49,52]]
sad=[[45,48,52],[41,45,48],[43,47,50],[40,43,47]]
# 0 hook: gavel win, then cold cut to rain
fx(B,'riser',wd(0,1)-.8,.3);fx(B,'boom',wd(0,1),1.0);fx(B,'stamp',wd(0,1),.95);knock(B,wd(0,1)+.02,.7,1);crowd(B,wd(0,1)+.2,1.0,.3)
tape_stop(B,wd(0,2)-.25,.35,.35);fx(B,'whoosh',wd(0,2)-.1,.4)
rn=S.bp(rng.standard_normal(N),1500,9000)*.08
put(B,S.norm(S.drone(wd(0,9)-wd(0,2)+.6)),wd(0,2),.3);fx(B,'stamp',wd(0,9)-.05,.7);heart(B,wd(0,9)+.2,.6)
# music bed (tense) through court
t=b[1];k=0
while t<b[5]:
    pad(B,ch[k%4],t,min(3.2,b[5]-t),.05);t+=3;k+=1
x=b[1]
while x<b[5]-.3:
    put(B,kick(),x,.34);x+=.6
# 1 recap
glitch(B,b[1]-.15,.3,.45);rewind(B,b[1],.4,.3);fx(B,'stamp',b[1]+.35,.6);fx(B,'whoosh',wd(1,4)-.1,.35);fx(B,'stamp',b[2]-.9+.12,.7)
# 2 comments
fx(B,'whoosh',b[2],.45)
for i in range(4):notif(B,b[2]+.08+i*.13,.25)
fx(B,'pop',b[2]+.75,.5);fx(B,'ding',b[2]+.8,.3)
# 3 court
fx(B,'whoosh',b[3],.4);fx(B,'riser',wd(3,3)-1.0,.25);fx(B,'glint',wd(3,4),.35)
fx(B,'whoosh',Ls(4)-.05,.35);fx(B,'boom',wd(4,1),1.0);fx(B,'stamp',wd(4,1),.95);knock(B,wd(4,1),.7,1)
fx(B,'ding',wd(4,3),.45);fx(B,'pop',wd(4,3),.5);crowd(B,wd(4,3)+.1,1.2,.25)
# 4 warning
fx(B,'whoosh',b[4],.4);glitch(B,b[4]+.35,.2,.35);fx(B,'stamp',b[4]+.4,.5);fx(B,'ding',b[4]+1.1,.4);fx(B,'pop',b[4]+1.1,.4)
# 5 outside: rain + sad pad, steps, stop
put(B,rn[:int((DUR-b[5])*SR)]*env(int((DUR-b[5])*SR),.6,1.0),b[5],1.0)
t=b[5];k=0
while t<b[7]:
    pad(B,sad[k%4],t,min(3.4,b[7]-t),.055,900);t+=3.2;k+=1
x=b[5]+.15
while x<wd(6,2)-.1:step(B,x,.4);x+=.33
fx(B,'riser',wd(6,2)-.6,.2);heart(B,wd(6,2),.8);fx(B,'boom',Ls(7)+.1,.6);fx(B,'glint',wd(7,1),.35)
# 6 plea: heartbeat
x=b[6]+.1
while x<b[7]-.2:heart(B,x,.6);x+=.8
fx(B,'stamp',wd(8,4),.5);tone_=tone(nf(76),1.6,'pluck');put(B,tone_,wd(9,1),.25);put(B,tone(nf(72),1.6,'pluck'),wd(9,3),.22)
# 7 outro
fx(B,'whoosh',b[7],.5);fx(B,'pop',b[7]+.4,.55);fx(B,'pop',b[7]+.75,.55);pad(B,[50,57,62],b[7],DUR-b[7],.05)
fx(B,'ding',Ls(11),.3);fx(B,'ding',Ls(12),.3);fx(B,'riser',Ls(13)-.4,.3);fx(B,'stamp',wd(13,3)+.2,.5)
master(B,'bed.wav');print('ok',DUR,[round(v,2) for v in b])
