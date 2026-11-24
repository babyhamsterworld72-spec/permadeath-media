import sys,json;sys.path.insert(0,'/home/user/permadeath-media/qararak/engine')
from audio_lib import *
TM=json.load(open('timing.json'));Lz=TM['lines'];DUR=TM['duration'];N=int(DUR*SR)
Ls=lambda i:Lz[i]['start'];Le=lambda i:Lz[i]['end'];wd=lambda i,k:Lz[i]['words'][k]['s']
b=[0,Ls(1)-.05,Ls(3)-.05,Ls(4)-.05,Ls(6)-.05,Ls(8)-.05,Ls(9)-.05,Ls(11)-.05,Ls(13)-.05,DUR]
B=np.zeros(N)
ch=[[50,53,57],[46,50,53],[48,51,55],[45,49,52]]
# 0 hook: gavel slam on "قضية!"
fx(B,'whoosh',.0,.4);put(B,S.norm(S.drone(b[1])),0,.3);fx(B,'riser',wd(0,8)-1.0,.35)
fx(B,'boom',wd(0,8),1.0);fx(B,'stamp',wd(0,8),.95);knock(B,wd(0,8)+.02,.7,1)
# music bed
t=b[1];k=0
while t<b[8]:
    if not (b[4]<=t<b[5]):pad(B,ch[k%4],t,min(3.2,b[8]-t),.05)
    t+=3;k+=1
x=b[1]
while x<b[8]:
    if not (b[4]<=x<b[5]+.2):put(B,kick(),x,.36)
    x+=.6
# 1 recap
glitch(B,b[1]-.15,.3,.45);rewind(B,b[1],.45,.35);fx(B,'stamp',b[1]+.35,.75);crowd(B,b[1]+.4,1.6,.22)
glitch(B,Ls(2)-.1,.25,.4);put(B,S.norm(S.drone(b[2]-Ls(2))),Ls(2),.25);fx(B,'stamp',b[2]-1.55,.6)
# 2 comments flood
fx(B,'whoosh',b[2],.45)
for i in range(6):notif(B,b[2]+.1+i*.16,.25)
fx(B,'pop',b[2]+.9,.5);fx(B,'ding',b[2]+1.0,.35)
# 3 meeting: plug in + reveal
fx(B,'whoosh',b[3],.4);fx(B,'glint',Ls(4)+1.0,.4);notif(B,Ls(4)+1.4,.4)
fx(B,'boom',Ls(5)+.2,.8);fx(B,'stamp',Ls(5)+.2,.7);crowd(B,Ls(5)+.3,1.8,.3)
# 4 silence -> door
put(B,S.norm(S.drone(b[5]-b[4])),b[4],.35);x=b[4]+.2
while x<wd(6,2)-.1:heart(B,x,.7);x+=.75
knock(B,wd(6,2)-.1,.4,1);fx(B,'riser',wd(6,2),.35);fx(B,'glint',wd(6,2)+.5,.4);fx(B,'ding',Ls(7)+1.5,.25)
# 5 fired
fx(B,'riser',b[5],.3);fx(B,'boom',wd(8,4),1.0);fx(B,'stamp',wd(8,4),.9);crowd(B,wd(8,4)+.2,1.5,.28);fx(B,'pop',wd(8,4)+.7,.4)
# 6 two days later + letter
tape_stop(B,b[6]-.2,.4,.3);notif(B,b[6]+.8,.5);notif(B,b[6]+1.2,.4)
fx(B,'whoosh',Ls(10),.45);fx(B,'stamp',wd(10,5),.9);fx(B,'boom',wd(10,5),.7)
# 7 lawyer shout-out
fx(B,'whoosh',b[7],.4);notif(B,b[7]+.1,.4);fx(B,'ding',Ls(11)+1.5,.45);fx(B,'pop',Ls(11)+1.5,.5)
fx(B,'whoosh',Ls(12),.4);fx(B,'stamp',Ls(12)+.6,.6)
# 8 outro
fx(B,'whoosh',b[8],.5);fx(B,'pop',b[8]+.4,.55);fx(B,'pop',b[8]+.75,.55);pad(B,[50,57,62],b[8],DUR-b[8],.05)
fx(B,'ding',Ls(14),.3);fx(B,'ding',Ls(15),.3);fx(B,'riser',Ls(16)-.4,.3)
master(B,'bed.wav');print('ok',DUR,[round(v,2) for v in b])
