import sys,json;sys.path.insert(0,'/home/user/permadeath-media/qararak/engine')
from audio_lib import *
TM=json.load(open('../ep07/timing.json'));Lz=TM['lines'];DUR=TM['duration'];N=int(DUR*SR)
Ls=lambda i:Lz[i]['start'];Le=lambda i:Lz[i]['end'];wd=lambda i,k:Lz[i]['words'][k]['s']
b=[0,Ls(1)-.05,Ls(2)-.05,Ls(3)-.05,Ls(5)-.05,Ls(6)-.05,Ls(8)-.05,DUR]
B=np.zeros(N)
ch=[[50,53,57],[46,50,53],[48,51,55],[45,49,52]];sad=[[45,48,52],[41,45,48],[43,47,50],[40,43,47]]
# 0 hook: notification, cash
notif(B,.1,.45);notif(B,wd(0,2)-.1,.5);fx(B,'riser',wd(0,4)-.7,.3);fx(B,'boom',wd(0,4),.9);fx(B,'ding',wd(0,4),.5);fx(B,'stamp',wd(0,4)+.6,.8)
# 1 confused
fx(B,'whoosh',b[1],.4);[fx(B,'pop',b[1]+.3+i*.2,.35) for i in range(3)];pad(B,[52,55,59],b[1],b[2]-b[1],.045)
# 2 one hour later + ringing
tape_stop(B,b[2]-.2,.3,.3);[tick(B,b[2]+.1+i*.25,.35) for i in range(3)]
r0=wd(2,2)-.05
x=r0
while x<b[3]:put(B,tone(nf(88),.12,'pluck'),x,.3);put(B,tone(nf(84),.12,'pluck'),x+.12,.3);x+=.8
fx(B,'stamp',r0+.05,.6)
# 3 crying caller: sad pad + heartbeat
t=b[3];k=0
while t<b[4]:
    pad(B,sad[k%4],t,min(3.2,b[4]-t),.055,900);t+=3;k+=1
fx(B,'whoosh',b[3],.35);heart(B,Ls(4),.6);fx(B,'stamp',Ls(4)+.05,.6)
# 4 friend
fx(B,'whoosh',b[4],.35);x=b[4]+.6
while x<wd(5,5)-.2:step(B,x,.35);x+=.3
fx(B,'riser',wd(5,5)-.6,.3);fx(B,'boom',wd(5,5)-.05,1.0);fx(B,'stamp',wd(5,5)-.05,.9)
# 5 scam: tense pulse
t=b[5];k=0
while t<b[6]:
    pad(B,ch[k%4],t,min(3.2,b[6]-t),.05);t+=3;k+=1
x=b[5]
while x<b[6]-.3:put(B,kick(),x,.32);x+=.5
glitch(B,b[5]-.1,.3,.45);fx(B,'pop',b[5]+.35,.45);fx(B,'pop',wd(6,2),.45);fx(B,'pop',wd(6,4),.45);fx(B,'pop',Ls(7)+.3,.45)
fx(B,'boom',wd(7,4),.9);fx(B,'stamp',wd(7,4),.9);knock(B,wd(7,4),.6,2)
# 6 outro
fx(B,'whoosh',b[6],.5);fx(B,'pop',b[6]+.4,.55);fx(B,'pop',b[6]+.75,.55);pad(B,[50,57,62],b[6],DUR-b[6],.05)
fx(B,'ding',Ls(9),.3);fx(B,'ding',Ls(10),.3);fx(B,'riser',Ls(11)-.4,.3);fx(B,'stamp',wd(11,3)+.2,.5)
master(B,'bed7.wav');print('ok',DUR,[round(v,2) for v in b])
