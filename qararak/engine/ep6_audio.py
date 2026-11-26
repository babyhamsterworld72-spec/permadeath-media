import sys,json;sys.path.insert(0,'/home/user/permadeath-media/qararak/engine')
from audio_lib import *
TM=json.load(open('../ep06/timing.json'));Lz=TM['lines'];DUR=TM['duration'];N=int(DUR*SR)
Ls=lambda i:Lz[i]['start'];Le=lambda i:Lz[i]['end'];wd=lambda i,k:Lz[i]['words'][k]['s']
b=[0,Ls(1)-.05,Ls(3)-.05,Ls(4)-.05,Ls(7)-.05,Ls(8)-.05,DUR]
B=np.zeros(N)
ch=[[50,53,57],[46,50,53],[48,51,55],[45,49,52]];sad=[[45,48,52],[41,45,48],[43,47,50],[40,43,47]]
# 0 hook: comments, badges, bars slam
fx(B,'whoosh',.05,.4);notif(B,.12,.3);fx(B,'pop',.62,.45);fx(B,'pop',.87,.45);fx(B,'ding',1.32,.3)
fx(B,'riser',wd(0,5)-.7,.3);fx(B,'boom',wd(0,5),1.0);fx(B,'stamp',wd(0,5),.9);knock(B,wd(0,5)+.02,.6,1)
# 1 court
t=b[1];k=0
while t<b[2]:
    pad(B,ch[k%4],t,min(3.2,b[2]-t),.05);t+=3;k+=1
x=b[1]
while x<b[2]-.3:put(B,kick(),x,.32);x+=.6
fx(B,'whoosh',b[1],.4);fx(B,'riser',wd(1,3)-.8,.25);fx(B,'boom',wd(1,3),1.0);fx(B,'stamp',wd(1,3),.9);knock(B,wd(1,3),.7,1)
fx(B,'stamp',Ls(2),.7);fx(B,'ding',wd(2,2),.45);fx(B,'pop',wd(2,2),.5);crowd(B,wd(2,2)+.1,1.0,.2)
# 2 relief: soft major chord
fx(B,'whoosh',b[2],.35);fx(B,'stamp',b[2]+.12,.5);pad(B,[55,59,62],b[2],b[3]-b[2]+.3,.05,1800);put(B,tone(nf(79),1.4,'pluck'),wd(3,3),.25)
# 3..: rain + sad pads
rn=S.bp(rng.standard_normal(N),1500,9000)*.08;put(B,rn[:int((DUR-b[3])*SR)]*env(int((DUR-b[3])*SR),.8,1.0),b[3],1.0)
t=b[3];k=0
while t<b[5]:
    pad(B,sad[k%4],t,min(3.4,b[5]-t),.055,900);t+=3.2;k+=1
x=b[3]+.15
while x<wd(4,3)-.1:step(B,x,.4);x+=.33
heart(B,wd(4,3),.8);fx(B,'boom',wd(4,3)+.05,.5);fx(B,'glint',Ls(5),.3)
# 4 plea: heartbeat + pluck on question
x=b[4]+.1
while x<b[5]-.2:heart(B,x,.6);x+=.8
put(B,tone(nf(76),1.6,'pluck'),wd(7,3),.25);put(B,tone(nf(72),1.8,'pluck'),wd(7,5),.22)
# 5 outro
fx(B,'whoosh',b[5],.5);fx(B,'pop',b[5]+.4,.55);fx(B,'pop',b[5]+.75,.55);pad(B,[50,57,62],b[5],DUR-b[5],.05)
fx(B,'ding',Ls(9),.3);fx(B,'ding',Ls(10),.3);fx(B,'riser',Ls(11)-.4,.3);fx(B,'stamp',wd(11,3)+.2,.5)
master(B,'bed6.wav');print('ok',DUR,[round(v,2) for v in b])
