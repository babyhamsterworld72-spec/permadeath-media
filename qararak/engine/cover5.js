const ME={ghutra:'#F7F4EE',checker:'#d23b3b'};
const BOSS={tie:C.red,glasses:true,col:'#ECE6DC'};
function scales(x,cx,cy,sc,t){x.save();x.translate(cx,cy);x.scale(sc,sc);x.strokeStyle=C.gold;x.fillStyle=C.gold;x.lineWidth=10;x.lineCap='round';const a=Math.sin(t*2)*.12;
 x.beginPath();x.moveTo(0,-120);x.lineTo(0,120);x.moveTo(-70,120);x.lineTo(70,120);x.stroke();x.save();x.translate(0,-110);x.rotate(a);x.beginPath();x.moveTo(-130,0);x.lineTo(130,0);x.stroke();
 [-130,130].forEach((px,i)=>{x.save();x.translate(px,0);x.rotate(-a);x.beginPath();x.moveTo(0,0);x.lineTo(-45,90);x.moveTo(0,0);x.lineTo(45,90);x.stroke();x.beginPath();x.ellipse(0,92,58,14,0,0,Math.PI);x.fill();x.restore()});x.restore();
 x.beginPath();x.arc(0,-120,14,0,7);x.fill();x.restore()}
const FIRED={...BOSS,tie:null,col:'#d9d2c5'};
const KID={col:'#efe9dd'};
function bars(x,cx,cy,w,h,k){if(k<=0)return;x.save();x.globalAlpha=k;x.strokeStyle='#9aa1ad';x.lineWidth=16;x.lineCap='round';const n=6;for(let i=0;i<n;i++){const px=cx-w/2+i*w/(n-1);x.beginPath();x.moveTo(px,cy-h/2-(1-k)*h);x.lineTo(px,cy+h/2);x.stroke()}x.lineWidth=20;x.beginPath();x.moveTo(cx-w/2-10,cy-h/2+20);x.lineTo(cx+w/2+10,cy-h/2+20);x.moveTo(cx-w/2-10,cy+h/2-20);x.lineTo(cx+w/2+10,cy+h/2-20);x.stroke();x.restore()}
function rain(x,t,al=.35,n=90){const r=rnd(7);x.save();x.strokeStyle=`rgba(180,200,230,${al})`;x.lineWidth=3;for(let i=0;i<n;i++){const sx=r()*1300-100,sp=1400+r()*900,ph=r();const y=((t*sp/H+ph)%1)*(H+200)-100;x.beginPath();x.moveTo(sx,y);x.lineTo(sx-18,y+70);x.stroke()}x.restore()}
function streetBg(x,t){const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1a2233');g.addColorStop(.6,'#2b2a35');g.addColorStop(1,'#14141a');x.fillStyle=g;x.fillRect(-600,-600,W+1200,H+1200);
 // court facade + columns
 x.fillStyle='#232631';x.fillRect(-100,300,1280,1000);x.fillStyle='#2c303d';for(let i=0;i<6;i++)x.fillRect(-40+i*230,520,90,780);x.fillStyle='#303545';x.beginPath();x.moveTo(-120,520);x.lineTo(540,250);x.lineTo(1200,520);x.closePath();x.fill();
 scales(x,540,420,.5,0);x.fillStyle='#1b1d25';for(let i=0;i<4;i++)x.fillRect(-100,1300+i*55,1280,55-6);x.fillStyle='#101116';x.fillRect(-600,1520,W+1200,800);
 x.fillStyle='rgba(255,210,150,.07)';x.beginPath();x.ellipse(540,1560,520,70,0,0,7);x.fill()}
function holdHand(x,ja,jb){x.save();x.strokeStyle=C.paper;x.lineWidth=14;x.lineCap='round';x.beginPath();x.moveTo(ja[0],ja[1]);x.quadraticCurveTo((ja[0]+jb[0])/2,Math.max(ja[1],jb[1])+16,jb[0],jb[1]);x.stroke();x.restore()}
function kidPair(x,t,cx,gy,s,opt={}){// Abu Fahd (left) holding kid (right)
 const a=drawStick(x,{...BASE,...FIRED,...(opt.bp||P.sad),aR1:28,aR2:20,x:cx-90*s,y:gy-200*s,ground:gy,s,face:opt.bf||'sad',look:opt.bl??.2,sweat:opt.sw},t);
 const k=drawStick(x,{...BASE,...KID,aL1:-150,aL2:-160,aR1:14,aR2:6,head:opt.kh??-14,rot:-3,x:cx+80*s,y:gy-110*s,ground:gy,s:s*.52,face:opt.kf||'worried',look:opt.kl??-.6},t);
 holdHand(x,a.hR,k.hL);return{a,k}}
window.__ready=document.fonts.load('900 80px Cairo').then(()=>document.fonts.load('800 80px Cairo')).then(()=>{const x=document.getElementById('c').getContext('2d');
 x.save();cam(x,{z:1.1,x:560,y:1050});streetBg(x,0);
 kidPair(x,.4,700,1560,1.2,{bp:{rot:7,head:14,aL1:-62,aL2:-112},bf:'sad',sw:true,bl:-.6,kl:-.9,kh:-20,kf:'sad'});
 drawStick(x,{...BASE,...ME,...P.shock,x:230,y:1360,ground:1560,s:1.15,face:'shock',sweat:true,look:1},.3);x.restore();
 x.save();x.globalCompositeOperation='multiply';x.fillStyle='rgba(120,140,190,.45)';x.fillRect(0,0,W,H);x.restore();rain(x,.37,.3);
 bars(x,760,1000,360,420,.22);
 const g=x.createRadialGradient(540,500,40,540,500,800);g.addColorStop(0,'rgba(255,59,48,.25)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
 rich(x,[['كسبت القضية…',C.paper]],540,280,100,{stroke:18});
 x.save();x.translate(540,480);x.rotate(-.05);pill(x,0,0,940,200,28,C.red);rich(x,[['بس جاني ومعه ولده!',C.paper]],0,8,100,{maxW:860});x.restore();
 rich(x,[['🤍 تسامحه ',C.a],['ولا ',C.paper],['يدخل السجن؟',C.b]],540,690,66,{stroke:14});
 pill(x,540,1800,620,100,50,'rgba(0,0,0,.7)');rich(x,[['وش بتسوي؟ ',C.paper],['A',C.a],[' أو ',C.paper],['B',C.b]],540,1804,52,{weight:900});logo(x,880,1800,60);
 vignette(x,.55);return 1});
