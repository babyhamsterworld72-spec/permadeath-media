import sys,json;sys.path.insert(0,'/home/user/permadeath-media/qararak/engine')
from audio_lib import *
TM=json.load(open('../ep08/timing.json'));Lz=TM['lines'];DUR=TM['duration'];N=int(DUR*SR)
Ls=lambda i:Lz[i]['start'];Le=lambda i:Lz[i]['end'];wd=lambda i,k:Lz[i]['words'][k]['s']
b=[0,Ls(1)-.05,Ls(2)-.05,Ls(3)-.05,Ls(5)-.05,Ls(6)-.05,DUR]
B=np.zeros(N)
ch=[[50,53,57],[46,50,53],[48,51,55],[45,49,52]];sad=[[45,48,52],[41,45,48],[43,47,50],[40,43,47]]
fx(B,'boom',0.02,1.0);fx(B,'stamp',0.02,.8);fx(B,'ding',.1,.5);fx(B,'ding',wd(0,5),.4)
fx(B,'whoosh',b[1],.4);x=b[1]+.2
while x<b[2]-.2:step(B,x,.3);x+=.3
fx(B,'stamp',wd(1,4),.6);pad(B,[52,55,59],b[1],b[2]-b[1],.045)
fx(B,'whoosh',b[2],.35);tn=wd(2,5);fx(B,'riser',tn-.5,.3);fx(B,'boom',tn,.9);fx(B,'stamp',tn+.25,.8)
x=tn+.3
while x<b[3]:tick(B,x,.35);x+=.5
t=b[3];k=0
while t<b[4]:
    pad(B,sad[k%4],t,min(3.2,b[4]-t),.055,900);t+=3;k+=1
heart(B,b[3]+.2,.6);fx(B,'stamp',wd(3,3),.6);fx(B,'boom',wd(4,4),.9);fx(B,'stamp',wd(4,4),.8)
fx(B,'whoosh',b[4],.35);fx(B,'pop',wd(5,3),.5);pad(B,ch[0],b[4],b[5]-b[4],.05)
fx(B,'whoosh',b[5],.5);fx(B,'pop',b[5]+.4,.55);fx(B,'pop',b[5]+.75,.55);pad(B,[50,57,62],b[5],DUR-b[5],.05)
fx(B,'ding',Ls(7),.3);fx(B,'ding',Ls(8),.3);fx(B,'riser',Ls(9)-.4,.3);fx(B,'stamp',wd(9,2)+.2,.5)
master(B,'bed8.wav');print('ok',DUR,[round(v,2) for v in b])
