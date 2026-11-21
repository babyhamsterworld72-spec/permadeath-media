function splitBg(x,w,h,ang=0){x.fillStyle=C.a;x.fillRect(0,0,w,h);x.fillStyle=C.b;x.beginPath();x.moveTo(w*.62,0);x.lineTo(w,0);x.lineTo(w,h);x.lineTo(w*.38,h);x.closePath();x.fill();}
const ME={ghutra:'#F7F4EE',checker:'#d23b3b'};
const STILLS={
 pfp_logo:[1080,1080,(x)=>{x.fillStyle=C.ink;x.fillRect(0,0,1080,1080);const g=x.createRadialGradient(540,540,50,540,540,560);g.addColorStop(0,'rgba(255,90,31,.22)');g.addColorStop(.6,'rgba(34,211,238,.08)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,1080,1080);logo(x,540,560,640)}],
 pfp_mascot:[1080,1080,(x)=>{splitBg(x,1080,1080);x.fillStyle='rgba(14,15,18,.18)';x.fillRect(0,0,1080,1080);
  drawStick(x,{...BASE,...ME,x:540,y:1390,s:4.2,face:'sly',look:.2,shadow:false},0.3);
  x.save();x.lineWidth=10;x.strokeStyle=C.ink;x.font='900 150px Cairo';x.textAlign='center';x.textBaseline='middle';x.fillStyle=C.ink;x.fillText('A',250,330);x.fillText('B',830,330);x.restore()}],
 pfp_mascot_dark:[1080,1080,(x)=>{x.fillStyle=C.ink;x.fillRect(0,0,1080,1080);const g=x.createRadialGradient(540,600,50,540,600,600);g.addColorStop(0,'rgba(255,90,31,.35)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,1080,1080);
  drawStick(x,{...BASE,...ME,x:540,y:1390,s:4.2,face:'sly',look:.2,shadow:false},0.3);logo(x,810,330,170)}],
 yt_banner:[2560,1440,(x)=>{x.fillStyle=C.ink;x.fillRect(0,0,2560,1440);x.save();x.globalAlpha=.08;x.strokeStyle=C.b;for(let i=0;i<40;i++){x.beginPath();x.moveTo(i*70,0);x.lineTo(i*70,1440);x.stroke()}x.restore();
  const g1=x.createRadialGradient(900,720,40,900,720,700);g1.addColorStop(0,'rgba(255,90,31,.3)');g1.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g1;x.fillRect(0,0,2560,1440);
  const g2=x.createRadialGradient(1660,720,40,1660,720,700);g2.addColorStop(0,'rgba(34,211,238,.25)');g2.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g2;x.fillRect(0,0,2560,1440);
  logo(x,1640,640,150);rich(x,[['قرارك',C.paper]],1280,640,190,{weight:900});
  rich(x,[['قصص تنتهي عند ',C.paper],['A',C.a],[' أو ',C.paper],['B',C.b],['… والقرار لك',C.paper]],1280,800,62,{weight:700});
  drawStick(x,{...BASE,...ME,...P.shrug,x:640,y:760,ground:930,s:.75,face:'worried'},.3);drawStick(x,{...BASE,...ME,...P.pointL,x:1920,y:760,ground:930,s:.75,face:'sly'},.3)}],
 cover_ep1:[1080,1920,(x)=>{x.save();bgNight(x,1,{gy:1500});lamp(x,300,1500,1);x.restore();x.fillStyle='rgba(0,0,0,.35)';x.fillRect(0,0,1080,1920);
  const j=drawStick(x,{...BASE,...ME,...P.holdOut,aR1:110,aR2:150,x:470,y:1180,ground:1500,s:1.6,face:'shock',emote:'!'},.3);wallet(x,j.hR[0]+20,j.hR[1]-30,.9,.5,-.2);
  for(let i=0;i<7;i++)bill(x,140+i*140,1620+(i%2)*60,1.2,(i%3-1)*.3);
  rich(x,[['لقيت',C.paper]],540,330,130,{stroke:20});rich(x,[['50,000 ريال',C.gold]],540,490,150,{stroke:22});
  x.save();x.translate(540,660);x.rotate(-.05);pill(x,0,0,760,130,22,C.red);rich(x,[['…لمديري اللي فصلني',C.paper]],0,4,66,{});x.restore();
  pill(x,540,1820,520,100,50,'rgba(0,0,0,.7)');rich(x,[['الجزء ١ · أنت تقرر',C.paper]],540,1824,48,{weight:800});logo(x,820,1820,60)}],
 yt_thumb_long:[1280,720,(x)=>{x.save();x.scale(1280/1080,720/1920);x.restore();bgNight(x,1,{gy:640});x.fillStyle='rgba(0,0,0,.3)';x.fillRect(0,0,1280,720);
  const j=drawStick(x,{...BASE,...ME,...P.holdLook,x:330,y:420,ground:640,s:.9,face:'shock'},.3);wallet(x,(j.hL[0]+j.hR[0])/2,j.hL[1]-8,.5,.3);
  rich(x,[['50,000',C.gold]],860,230,150,{stroke:18});rich(x,[['لمين ترجع؟',C.paper]],860,390,96,{stroke:16});x.save();pill(x,760,540,150,110,24,C.a);rich(x,[['A',C.ink]],760,546,90,{});pill(x,960,540,150,110,24,C.b);rich(x,[['B',C.ink]],960,546,90,{});x.restore()}]
};
const k=new URLSearchParams(location.search).get('k');const [w,h,fn]=STILLS[k];const cv=document.getElementById('c');cv.width=w;cv.height=h;document.body.style.width=w+'px';document.body.style.height=h+'px';
window.__ready=document.fonts.load('900 80px Cairo').then(()=>document.fonts.load('700 80px Cairo')).then(()=>document.fonts.load('800 80px Cairo')).then(()=>{fn(cv.getContext('2d'));return 1});
