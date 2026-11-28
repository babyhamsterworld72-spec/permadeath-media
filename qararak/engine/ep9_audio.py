import sys,json;sys.path.insert(0,'/home/user/permadeath-media/qararak/engine')
from audio_lib import *
TM=json.load(open('../ep09/timing.json'));Lz=TM['lines'];DUR=TM['duration'];N=int(DUR*SR)
Ls=lambda i:Lz[i]['start'];Le=lambda i:Lz[i]['end'];wd=lambda i,k:Lz[i]['words'][min(k,len(Lz[i]['words'])-1)]['s']
b=[0,Ls(1)-.05,Ls(2)-.05,Ls(3)-.05,Ls(4)-.05,Ls(5)-.05,Ls(6)-.05,DUR]
B=np.zeros(N)
sad=[[45,48,52],[41,45,48],[43,47,50],[40,43,47]];dark=[[38,41,45],[36,40,43]]
# hook
fx(B,'boom',0.02,1.0);fx(B,'riser',0.0,.25);fx(B,'stamp',wd(0,4),.7);fx(B,'boom',wd(0,8),.8);fx(B,'ding',wd(0,8)+.1,.5)
pad(B,[50,53,57],0,b[1],.05)
# brothers
fx(B,'whoosh',b[1],.4)
for i in range(4):fx(B,'pop',b[1]+.3+i*.12,.35)
pad(B,[45,48,52],b[1],b[2]-b[1],.05)
# lawyer
fx(B,'whoosh',b[2],.35);fx(B,'pop',b[2]+.35,.4);fx(B,'stamp',wd(2,4),.8);fx(B,'ding',wd(2,4)+.1,.4);pad(B,[48,52,55],b[2],b[3]-b[2],.045)
# split
fx(B,'whoosh',b[3],.35)
for i in range(3):fx(B,'stamp',b[3]+.2+i*.25,.35)
fx(B,'whoosh',wd(3,5)-.1,.4);t=b[3];k=0
while t<b[4]:pad(B,sad[k%4],t,min(2.2,b[4]-t),.055,900);t+=2;k+=1
# letter
fx(B,'riser',b[4]-.4,.3);heart(B,b[4]+.3,.5);heart(B,b[4]+1.3,.55);heart(B,b[4]+2.3,.6);fx(B,'boom',wd(4,6),1.0);fx(B,'stamp',wd(4,6),.5)
pad(B,dark[0],b[4],b[5]-b[4],.06,700)
# call
fx(B,'whoosh',b[5],.35);x=b[5]+.1
while x<wd(5,4)-.2:tick(B,x,.3);x+=.45
fx(B,'boom',wd(5,4),.9);fx(B,'stamp',wd(5,4),.7);pad(B,dark[1],b[5],b[6]-b[5],.06,700)
# outro
fx(B,'whoosh',b[6],.5);fx(B,'pop',b[6]+.4,.55);fx(B,'pop',b[6]+.75,.55);pad(B,[50,57,62],b[6],DUR-b[6],.05)
fx(B,'ding',Ls(7),.3);fx(B,'ding',Ls(8),.3);fx(B,'riser',Ls(9)-.4,.3);fx(B,'stamp',wd(9,2)+.2,.5)
master(B,'bed9.wav');print('ok',DUR,[round(v,2) for v in b])
