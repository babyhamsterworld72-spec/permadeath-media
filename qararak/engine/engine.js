// ===== Qararak stickman motion engine (canvas, deterministic by t) =====
const W=1080,H=1920,D2R=Math.PI/180;
const C={ink:'#0E0F12',ink2:'#161a21',paper:'#F4F1EC',a:'#FF5A1F',b:'#22D3EE',red:'#FF3B30',gold:'#FFC53D',green:'#3DDC84',muted:'#8b8f98',cash:'#7BC47F'};
const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const ease=x=>1-Math.pow(1-clamp(x),3), easeIn=x=>Math.pow(clamp(x),3);
const easeIO=x=>{x=clamp(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
const back=x=>{x=clamp(x);const c1=1.9,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};
const elastic=x=>{x=clamp(x);return x===0||x===1?x:Math.pow(2,-10*x)*Math.sin((x*10-.75)*2*Math.PI/3)+1};
const prog=(t,a,d)=>clamp((t-a)/d), lerp=(a,b,p)=>a+(b-a)*p;
function rnd(seed){let s=(seed*2654435761)>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}
const dirv=a=>[Math.sin(a*D2R),Math.cos(a*D2R)];
// ---------- poses ----------
const BASE={x:540,y:1400,s:1,rot:0,head:0,aL1:-12,aL2:-6,aR1:12,aR2:6,lL1:-7,lL2:-3,lR1:7,lR2:3,face:'neutral',look:0,col:C.paper,ground:null,breath:1};
const P={
 stand:{rot:0,head:0,aL1:-12,aL2:-6,aR1:12,aR2:6,lL1:-7,lL2:-3,lR1:7,lR2:3},
 shock:{rot:-4,head:-6,aL1:-118,aL2:-178,aR1:118,aR2:178,lL1:-16,lL2:-10,lR1:16,lR2:10},
 handsUp:{aL1:-135,aL2:-150,aR1:135,aR2:150},
 think:{rot:3,head:8,aL1:-14,aL2:-6,aR1:40,aR2:-150,lL1:-6,lL2:-2,lR1:8,lR2:3},
 phone:{aL1:-12,aL2:-6,aR1:24,aR2:-168,head:-6},
 holdOut:{aL1:-12,aL2:-6,aR1:75,aR2:88,rot:4},
 holdLook:{aL1:-50,aL2:-120,aR1:50,aR2:120,head:14,rot:4},
 point:{aL1:-12,aL2:-6,aR1:95,aR2:95,rot:-3,head:-4},
 pointL:{aR1:12,aR2:6,aL1:-95,aL2:-95,rot:3,head:4},
 shrug:{aL1:-50,aL2:-150,aR1:50,aR2:150,head:10},
 sly:{rot:-6,head:-10,aL1:-20,aL2:30,aR1:18,aR2:-28},
 crouch:{rot:25,head:25,aL1:35,aL2:45,aR1:55,aR2:75,lL1:55,lL2:-8,lR1:-18,lR2:18},
 sad:{rot:8,head:22,aL1:-6,aL2:-2,aR1:6,aR2:2},
 armsCross:{aL1:-25,aL2:70,aR1:25,aR2:-70},
 carry:{aL1:-40,aL2:-100,aR1:40,aR2:100,rot:2},
 facepalm:{aR1:20,aR2:-175,head:12,rot:5},
 celebrate:{aL1:-150,aL2:-170,aR1:150,aR2:170,head:-8},
 sit:{rot:-4,lL1:-90,lL2:-5,lR1:-80,lR2:0}
};
function walkPose(ph,dir=-1,amp=1){const s=Math.sin(ph),c=Math.cos(ph);
 return {rot:4*dir,lL1:28*s*amp,lL2:28*s*amp-Math.max(0,-c)*34*amp,lR1:-28*s*amp,lR2:-28*s*amp-Math.max(0,c)*34*amp,
  aL1:-22*s*amp-6,aL2:-22*s*amp-20,aR1:22*s*amp+6,aR2:22*s*amp+20}}
function mix(a,b,k){const o={...a};for(const key in b){const v=b[key];if(typeof v==='number'&&typeof a[key]==='number')o[key]=lerp(a[key],v,k);else if(k>=.5||a[key]===undefined)o[key]=v}return o}
// keys: [[time, poseObj, blendSec=.3, easeFn]]; returns pose at t
function anim(t,keys,base={}){let p={...BASE,...base};for(let i=0;i<keys.length;i++){const [kt,kp,bl=.3,ef=easeIO]=keys[i];if(t<kt)break;const target={...p,...(typeof kp==='function'?kp(t-kt):kp)};p=mix(p,target,bl<=0?1:ef(prog(t,kt,bl)))}return p}
function joints(p){const s=p.s,T=150*s,UA=82*s,LA=78*s,TH=94*s,SH=94*s,R=46*s;
 let hip=[p.x,p.y];const up=[Math.sin(p.rot*D2R),-Math.cos(p.rot*D2R)];
 const limb=(o,a1,a2,l1,l2)=>{const d1=dirv(a1-p.rot),e=[o[0]+d1[0]*l1,o[1]+d1[1]*l1],d2=dirv(a2-p.rot);return[e,[e[0]+d2[0]*l2,e[1]+d2[1]*l2]]};
 let [kL,fL]=limb(hip,p.lL1+p.rot,p.lL2+p.rot,TH,SH),[kR,fR]=limb(hip,p.lR1+p.rot,p.lR2+p.rot,TH,SH); // legs stay world-ish
 if(p.ground!=null){const dy=p.ground-Math.max(fL[1],fR[1]);hip=[hip[0],hip[1]+dy];[kL,fL]=limb(hip,p.lL1+p.rot,p.lL2+p.rot,TH,SH);[kR,fR]=limb(hip,p.lR1+p.rot,p.lR2+p.rot,TH,SH)}
 const neck=[hip[0]+up[0]*T,hip[1]+up[1]*T],sh=[neck[0]-up[0]*14*s,neck[1]-up[1]*14*s];
 const ha=p.rot+p.head,head=[neck[0]+Math.sin(ha*D2R)*(R+8*s),neck[1]-Math.cos(ha*D2R)*(R+8*s)];
 const [eL,hL]=limb(sh,p.aL1,p.aL2,UA,LA),[eR,hR]=limb(sh,p.aR1,p.aR2,UA,LA);
 return{hip,neck,sh,head,R,kL,fL,kR,fR,eL,hL,eR,hR,ha}}
function line(x,pts){x.beginPath();x.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)x.lineTo(pts[i][0],pts[i][1]);x.stroke()}
function drawStick(x,p,t=0,opt={}){const j=joints(p),s=p.s;x.save();x.lineCap='round';x.lineJoin='round';
 const col=p.col;x.strokeStyle=col;x.fillStyle=col;x.lineWidth=18*s;
 if(p.glow){x.shadowColor=p.glow;x.shadowBlur=30*s}
 if(p.shadow!==false&&p.ground!=null){x.save();x.shadowBlur=0;x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.ellipse(j.hip[0],p.ground+6*s,90*s,14*s,0,0,7);x.fill();x.restore()}
 line(x,[j.hip,j.kL,j.fL]);line(x,[j.hip,j.kR,j.fR]);line(x,[j.hip,j.neck]);
 if(p.tie){x.save();x.fillStyle=p.tie;x.beginPath();const a=j.neck,b=j.hip;const m=[lerp(a[0],b[0],.12),lerp(a[1],b[1],.12)],e=[lerp(a[0],b[0],.6),lerp(a[1],b[1],.6)];x.moveTo(m[0]-10*s,m[1]);x.lineTo(m[0]+10*s,m[1]);x.lineTo(e[0]+14*s,e[1]);x.lineTo(e[0],e[1]+22*s);x.lineTo(e[0]-14*s,e[1]);x.fill();x.restore()}
 if(p.prop&&p.propBack)p.prop(x,j,p,t);
 line(x,[j.sh,j.eL,j.hL]);line(x,[j.sh,j.eR,j.hR]);
 drawHead(x,j,p,t);
 if(p.prop&&!p.propBack)p.prop(x,j,p,t);
 x.restore();return j}
function drawHead(x,j,p,t){const s=p.s,R=j.R,[hx,hy]=j.head;x.save();x.translate(hx,hy);x.rotate(j.ha*D2R*.5);
 x.shadowBlur=0;
 const cloth=(path)=>{x.save();path();x.fillStyle=p.ghutra;x.fill();if(p.checker){x.clip();x.fillStyle=p.checker;const q=R*.22;for(let i=-8;i<8;i++)for(let k=-8;k<10;k++)if((i+k)%2===0)x.fillRect(i*q,k*q,q*.55,q*.55)}x.restore();x.save();path();x.strokeStyle='rgba(20,20,26,.55)';x.lineWidth=R*.07;x.stroke();x.restore()};
 if(p.ghutra){cloth(()=>{x.beginPath();x.moveTo(-R*.95,-R*.5);x.quadraticCurveTo(-R*1.35,R*.9,-R*1.05,R*1.9);x.lineTo(-R*.45,R*1.6);x.quadraticCurveTo(-R*.75,R*.6,-R*.55,-R*.2);x.closePath()});
  cloth(()=>{x.beginPath();x.moveTo(R*.95,-R*.5);x.quadraticCurveTo(R*1.35,R*.9,R*1.05,R*1.9);x.lineTo(R*.45,R*1.6);x.quadraticCurveTo(R*.75,R*.6,R*.55,-R*.2);x.closePath()})}
 x.fillStyle=p.col;x.beginPath();x.arc(0,0,R,0,7);x.fill();
 if(p.ghutra){cloth(()=>{x.beginPath();x.moveTo(-R*1.1,-R*.12);x.bezierCurveTo(-R*1.25,-R*1.45,R*1.25,-R*1.45,R*1.1,-R*.12);x.quadraticCurveTo(0,-R*.5,-R*1.1,-R*.12);x.closePath()});
  x.strokeStyle='#121317';x.lineWidth=R*.15;x.beginPath();x.ellipse(0,-R*.78,R*.82,R*.2,0,0,7);x.stroke()}
 if(p.cap){x.fillStyle=p.cap;x.beginPath();x.arc(0,-R*.15,R*1.02,Math.PI,0);x.fill();x.fillRect(-R*1.4,-R*.25,R*1.5,R*.18);x.fillStyle=C.gold;x.beginPath();x.arc(0,-R*.65,R*.16,0,7);x.fill()}
 const lk=p.look*R*.32,ink='#15161a';x.fillStyle=ink;x.strokeStyle=ink;x.lineCap='round';x.lineWidth=R*.12;
 const ex=R*.36,ey=-R*.05;let face=p.face;const blink=(Math.sin(t*2.1+p.x*.01)>.995)&&face!=='closed'&&face!=='shock';
 const eye=(dx)=>{const cx=dx+lk,cy=ey;
  if(blink||face==='closed'||face==='happy'&&p.squint){x.beginPath();x.arc(cx,cy+R*.04,R*.12,Math.PI*1.1,Math.PI*1.9);x.stroke();return}
  if(face==='shock'){x.lineWidth=R*.07;x.beginPath();x.arc(cx,cy,R*.2,0,7);x.stroke();x.beginPath();x.arc(cx+lk*.2,cy,R*.07,0,7);x.fill();x.lineWidth=R*.12;return}
  if(face==='sly'){x.beginPath();x.moveTo(cx-R*.13,cy);x.lineTo(cx+R*.13,cy);x.stroke();return}
  if(face==='money'){x.font=`900 ${R*.42}px Cairo`;x.textAlign='center';x.textBaseline='middle';x.fillStyle='#2e9e4f';x.fillText('$',cx,cy);x.fillStyle=ink;return}
  x.beginPath();x.arc(cx,cy,R*.1,0,7);x.fill()};
 eye(-ex);eye(ex);
 // brows
 const brow=(dx,ang,dy=0)=>{x.save();x.translate(dx+lk,ey-R*.3+dy);x.rotate(ang);x.beginPath();x.moveTo(-R*.15,0);x.lineTo(R*.15,0);x.stroke();x.restore()};
 if(face==='angry'){brow(-ex,.45);brow(ex,-.45)}else if(face==='worried'||face==='sad'){brow(-ex,-.35);brow(ex,.35)}else if(face==='shock'){brow(-ex,0,-R*.12);brow(ex,0,-R*.12)}else if(face==='sly'){brow(-ex,.25);brow(ex,-.05,-R*.05)}
 // mouth
 const my=R*.42,mx=lk*.8;x.beginPath();
 if(face==='happy'||face==='money'){x.arc(mx,my-R*.2,R*.28,.2*Math.PI,.8*Math.PI);x.stroke()}
 else if(face==='shock'){x.ellipse(mx,my,R*.13,R*.18,0,0,7);x.fill()}
 else if(face==='sad'||face==='worried'){x.arc(mx,my+R*.18,R*.22,1.2*Math.PI,1.8*Math.PI);x.stroke()}
 else if(face==='angry'){x.moveTo(mx-R*.2,my);x.lineTo(mx+R*.2,my-R*.03);x.stroke()}
 else if(face==='sly'){x.moveTo(mx-R*.18,my);x.quadraticCurveTo(mx+R*.05,my+R*.08,mx+R*.22,my-R*.1);x.stroke()}
 else if(face==='talk'){const o=Math.abs(Math.sin(t*14))*R*.14+R*.03;x.ellipse(mx,my,R*.14,o,0,0,7);x.fill()}
 else if(face==='zip'){x.moveTo(mx-R*.22,my);x.lineTo(mx+R*.22,my);x.stroke();for(let i=-2;i<=2;i++){x.beginPath();x.moveTo(mx+i*R*.09,my-R*.06);x.lineTo(mx+i*R*.09,my+R*.06);x.stroke()}}
 else{x.moveTo(mx-R*.14,my);x.lineTo(mx+R*.14,my);x.stroke()}
 if(p.glasses){x.lineWidth=R*.08;x.strokeStyle=ink;x.beginPath();x.rect(-ex-R*.2+lk,ey-R*.15,R*.4,R*.3);x.rect(ex-R*.2+lk,ey-R*.15,R*.4,R*.3);x.moveTo(-ex+R*.2+lk,ey);x.lineTo(ex-R*.2+lk,ey);x.stroke()}
 if(p.sweat){const k=(t*1.3)%1;x.fillStyle=C.b;x.beginPath();const sx=R*1.0,sy=-R*.4+k*R*.6;x.moveTo(sx,sy-R*.22);x.quadraticCurveTo(sx+R*.14,sy,sx,sy+R*.08);x.quadraticCurveTo(sx-R*.14,sy,sx,sy-R*.22);x.fill()}
 x.restore();
 if(p.emote==='!'){emanata(x,hx,hy-R*1.5,s,t)}
}
function emanata(x,cx,cy,s,t){x.save();x.strokeStyle=C.gold;x.lineWidth=8*s;x.lineCap='round';for(let i=-2;i<=2;i++){const a=(-90+i*28)*D2R,r1=20*s,r2=55*s+Math.sin(t*20+i)*6*s;x.beginPath();x.moveTo(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1+40*s);x.lineTo(cx+Math.cos(a)*r2,cy+Math.sin(a)*r2+40*s);x.stroke()}x.restore()}
// ---------- props ----------
function wallet(x,cx,cy,sc=1,open=0,rot=0){x.save();x.translate(cx,cy);x.rotate(rot);x.scale(sc,sc);
 x.fillStyle='#6b3f22';x.strokeStyle='#3d2312';x.lineWidth=4;
 if(open>0){x.save();x.translate(0,-2);x.rotate(-open*1.2);x.fillStyle='#7d4a29';x.fillRect(-60,-80,120,80);x.strokeRect(-60,-80,120,80);x.restore();
  x.fillStyle=C.cash;for(let i=0;i<4;i++){x.fillRect(-50+i*8,-60-open*30-i*6,100,60)}}
 x.fillStyle='#8a5530';x.fillRect(-60,-40,120,80);x.strokeRect(-60,-40,120,80);x.fillStyle='#a8693e';x.fillRect(-60,-8,120,10);x.restore()}
function bill(x,cx,cy,sc,rot,alpha=1){x.save();x.globalAlpha=alpha;x.translate(cx,cy);x.rotate(rot);x.scale(sc,sc);x.fillStyle='#5fae6a';x.fillRect(-50,-24,100,48);x.strokeStyle='#2e6b37';x.lineWidth=3;x.strokeRect(-44,-18,88,36);x.fillStyle='#2e6b37';x.font='900 26px Cairo';x.textAlign='center';x.textBaseline='middle';x.fillText('500',0,1);x.restore()}
function phoneProp(x,cx,cy,sc=1,glow=1,rot=0){x.save();x.translate(cx,cy);x.rotate(rot);x.scale(sc,sc);if(glow){x.shadowColor='rgba(140,220,255,.9)';x.shadowBlur=40*glow}x.fillStyle='#1b2733';x.fillRect(-16,-28,32,56);x.fillStyle=`rgba(170,235,255,${.5+.5*glow})`;x.fillRect(-12,-23,24,44);x.restore()}
function box(x,cx,cy,sc=1){x.save();x.translate(cx,cy);x.scale(sc,sc);x.fillStyle='#b98a52';x.fillRect(-70,-50,140,100);x.strokeStyle='#7a5630';x.lineWidth=5;x.strokeRect(-70,-50,140,100);x.beginPath();x.moveTo(-70,-20);x.lineTo(70,-20);x.stroke();x.fillStyle='#5ea0c8';x.fillRect(-40,-80,26,34);x.fillStyle='#3a8d4c';x.beginPath();x.arc(30,-62,22,0,7);x.fill();x.restore()}
// ---------- text ----------
function rich(x,segs,cx,cy,size,opt={}){x.save();x.direction='rtl';x.textBaseline='middle';const wt=opt.weight||900;x.font=`${wt} ${size}px Cairo`;
 let ws=segs.map(([s])=>x.measureText(s).width),tot=ws.reduce((a,b)=>a+b,0);if(opt.maxW&&tot>opt.maxW){size=size*opt.maxW/tot;x.font=`${wt} ${size}px Cairo`;ws=segs.map(([s])=>x.measureText(s).width);tot=ws.reduce((a,b)=>a+b,0)}let px=cx+tot/2;x.textAlign='right';
 segs.forEach(([s,c],i)=>{const k=opt.reveal?clamp(opt.reveal*segs.length-i):1;if(k>0){x.save();x.globalAlpha*=ease(k);const sc=lerp(1.6,1,back(k));x.translate(px-ws[i]/2,cy);x.scale(sc,sc);
  if(opt.stroke){x.lineWidth=opt.stroke;x.strokeStyle=opt.strokeCol||C.ink;x.lineJoin='round';x.strokeText(s,ws[i]/2,0)}
  if(opt.shadow){x.shadowColor='rgba(0,0,0,.6)';x.shadowBlur=24}x.fillStyle=c||C.paper;x.fillText(s,ws[i]/2,0);x.restore()}px-=ws[i]});x.restore();return tot}
function popIn(x,t,a,b,fn,opt={}){if(t<a)return;let k=ease(prog(t,a,opt.d||.35)),sc=lerp(opt.from??.6,1,back(prog(t,a,opt.d||.35)));let al=k;if(b!=null&&t>b){const q=prog(t,b,.22);al*=1-q;sc*=1+q*.2}if(al<=0)return;x.save();x.globalAlpha*=al;x.translate(opt.cx??540,opt.cy??0);x.scale(sc,sc);x.translate(-(opt.cx??540),-(opt.cy??0));fn();x.restore()}
function pill(x,cx,cy,w,h,r,fill,stroke,lw=6){x.save();x.beginPath();x.roundRect(cx-w/2,cy-h/2,w,h,r);if(fill){x.fillStyle=fill;x.fill()}if(stroke){x.strokeStyle=stroke;x.lineWidth=lw;x.stroke()}x.restore()}
// ---------- fx ----------
let GRAIN;function grain(x,t,al=.06){if(!GRAIN){GRAIN=document.createElement('canvas');GRAIN.width=512;GRAIN.height=512;const g=GRAIN.getContext('2d'),d=g.createImageData(512,512),r=rnd(9);for(let i=0;i<d.data.length;i+=4){const v=r()*255;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=255}g.putImageData(d,0,0)}
 x.save();x.globalAlpha=al;x.globalCompositeOperation='overlay';const r=rnd(Math.floor(t*24));x.fillStyle=x.createPattern(GRAIN,'repeat');x.translate(-r()*512,-r()*512);x.fillRect(0,0,W+1024,H+1024);x.restore()}
function vignette(x,al=.7){const v=x.createRadialGradient(540,960,350,540,960,1250);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,`rgba(0,0,0,${al})`);x.fillStyle=v;x.fillRect(0,0,W,H)}
function speedLines(x,cx,cy,t,al=.5,col='#fff'){const r=rnd(Math.floor(t*30));x.save();x.strokeStyle=col;x.globalAlpha=al;for(let i=0;i<70;i++){const a=r()*Math.PI*2,r1=420+r()*300,r2=r1+300+r()*700;x.lineWidth=2+r()*8;x.beginPath();x.moveTo(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1);x.lineTo(cx+Math.cos(a)*r2,cy+Math.sin(a)*r2);x.stroke()}x.restore()}
function burst(x,cx,cy,t,t0,n,col,seed=1,spd=900,size=14){if(t<t0)return;const r=rnd(seed),dt=t-t0;x.save();for(let i=0;i<n;i++){const a=r()*Math.PI*2,v=spd*(.4+r()*.8),px=cx+Math.cos(a)*v*dt,py=cy+Math.sin(a)*v*dt+700*dt*dt,al=1-dt/1.1;if(al<=0)continue;x.globalAlpha=al;x.fillStyle=col;x.beginPath();x.arc(px,py,size*(.5+r()),0,7);x.fill()}x.restore()}
function moneyRain(x,t,t0,n=40,seed=3,dur=4){if(t<t0)return;const r=rnd(seed),dt=t-t0;for(let i=0;i<n;i++){const sx=r()*W,del=r()*1.5,sp=500+r()*500,yy=-100+(dt-del)*sp;if(dt<del||yy>H+100)continue;bill(x,sx+Math.sin(dt*3+i)*50,yy,.9+r()*.6,Math.sin(dt*(1+r()*2)+i)*.7,clamp((t0+dur-t)*2))}}
function cam(x,c){x.translate(W/2,H/2);x.scale(c.z||1,c.z||1);x.rotate((c.r||0)*D2R);x.translate(-(c.x??540),-(c.y??960))}
function shake(t,t0,dur=.35,amp=26){if(t<t0||t>t0+dur)return[0,0];const k=1-(t-t0)/dur,r=rnd(Math.floor(t*60));return[(r()*2-1)*amp*k,(r()*2-1)*amp*k]}
// ---------- backgrounds ----------
function bgNight(x,t,opt={}){const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,opt.top||'#0a0d16');g.addColorStop(1,opt.bot||'#151a26');x.fillStyle=g;x.fillRect(-600,-600,W+1200,H+1200);
 const r=rnd(opt.seed||4);for(let i=0;i<12;i++){const bx=-300+i*150,bh=520+r()*640;x.fillStyle=opt.bld||'#0d1018';x.fillRect(bx,(opt.gy||1500)-bh,140,bh);for(let w=0;w<18;w++)if(r()<.22){x.fillStyle=`rgba(255,${170+(r()*50|0)},90,${.28+.12*Math.sin(t*1.5+w+i)})`;x.fillRect(bx+16+(w%3)*40,(opt.gy||1500)-bh+36+Math.floor(w/3)*80,22,36)}}
 x.fillStyle=opt.floor||'#10131b';x.fillRect(-600,opt.gy||1500,W+1200,1200);x.strokeStyle='rgba(255,255,255,.06)';x.lineWidth=4;x.beginPath();x.moveTo(-600,(opt.gy||1500));x.lineTo(W+600,(opt.gy||1500));x.stroke()}
function lamp(x,lx,gy,t,fl=1){x.fillStyle='#07080b';x.fillRect(lx,gy-760,14,760);x.fillRect(lx-80,gy-760,94,12);x.fillStyle=`rgba(255,215,160,${fl})`;x.beginPath();x.ellipse(lx-64,gy-746,26,9,0,0,7);x.fill();
 const cone=x.createLinearGradient(0,gy-740,0,gy);cone.addColorStop(0,`rgba(255,175,95,${.42*fl})`);cone.addColorStop(1,`rgba(255,140,60,${.05*fl})`);x.fillStyle=cone;x.beginPath();x.moveTo(lx-84,gy-742);x.lineTo(lx-44,gy-742);x.lineTo(lx+260,gy);x.lineTo(lx-390,gy);x.closePath();x.fill();
 const pool=x.createRadialGradient(lx-64,gy,10,lx-64,gy,330);pool.addColorStop(0,`rgba(255,150,70,${.32*fl})`);pool.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=pool;x.fillRect(lx-420,gy-140,720,280)}
function bgOffice(x,t,tint){x.fillStyle=tint||'#1a1712';x.fillRect(-600,-600,W+1200,H+1200);x.fillStyle='#232017';x.fillRect(120,420,840,560);x.fillStyle='#2f2a1f';for(let i=0;i<3;i++)x.fillRect(150+i*280,450,250,500);x.fillStyle='#14120d';x.fillRect(-600,1500,W+1200,900);
 x.fillStyle='#3a2a1c';x.fillRect(560,1240,420,40);x.fillRect(600,1280,30,220);x.fillRect(910,1280,30,220)}
function bgRoom(x,t,tv=1){x.fillStyle='#14161d';x.fillRect(-600,-600,W+1200,H+1200);x.fillStyle='#0f1117';x.fillRect(-600,1520,W+1200,900);
 x.fillStyle='#1d2230';x.fillRect(130,1180,820,250);x.fillRect(110,1100,100,330);x.fillRect(870,1100,100,330);x.fillStyle='#252b3c';x.fillRect(130,1290,820,140);
 x.fillStyle='rgba(120,200,255,.05)';x.fillRect(0,0,W,H)}
// ---------- scene graph with transitions ----------
const OFF=[document.createElement('canvas'),document.createElement('canvas')];OFF.forEach(c=>{c.width=W;c.height=H});
function drawScene(ctx,sc,t){ctx.save();ctx.clearRect(0,0,W,H);sc.draw(ctx,t-sc.t0,t);ctx.restore()}
function composite(ctx,scenes,trans,t){let i=scenes.findIndex(s=>t>=s.t0&&t<s.t1);if(i<0)i=scenes.length-1;
 const tr=trans.find(q=>Math.abs(t-q.at)<q.dur/2);
 if(!tr){drawScene(ctx,scenes[i],t);return}
 const k=scenes.findIndex(s=>Math.abs(s.t0-tr.at)<1e-6),A=scenes[k-1],B=scenes[k],p=(t-(tr.at-tr.dur/2))/tr.dur;
 const [oa,ob]=OFF.map(c=>c.getContext('2d'));drawScene(oa,A,t);drawScene(ob,B,t);
 ctx.save();ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);const ty=tr.type;
 if(ty==='whip'||ty==='whipL'){const dir=ty==='whip'?-1:1,e=easeIO(p);for(let s=0;s<6;s++){const off=e+(s-3)*.03;ctx.globalAlpha=1/3.5;ctx.drawImage(OFF[0],dir*W*off*1.1,0);ctx.drawImage(OFF[1],dir*W*(off*1.1-1.1),0)}}
 else if(ty==='zoom'){const e=easeIn(clamp(p*2)),f=ease(clamp(p*2-1));if(p<.5){ctx.translate(W/2,H/2);for(let s=0;s<5;s++){ctx.save();ctx.globalAlpha=.3;const z=1+e*2.2*(1+s*.06);ctx.scale(z,z);ctx.drawImage(OFF[0],-W/2,-H/2);ctx.restore()}}else{ctx.translate(W/2,H/2);const z=lerp(.55,1,f);ctx.scale(z,z);ctx.drawImage(OFF[1],-W/2,-H/2)}ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=Math.max(0,1-Math.abs(p-.5)*4)*.85;ctx.fillStyle='#fff';ctx.fillRect(0,0,W,H)}
 else if(ty==='glitch'){const src=p<.5?OFF[0]:OFF[1],amt=1-Math.abs(p-.5)*2,r=rnd(Math.floor(t*60));ctx.drawImage(src,0,0);for(let s=0;s<14;s++){const y=r()*H,h=20+r()*140,dx=(r()*2-1)*180*amt;ctx.drawImage(src,0,y,W,h,dx,y,W,h)}ctx.globalCompositeOperation='screen';ctx.globalAlpha=.5*amt;ctx.fillStyle=C.b;ctx.fillRect(0,0,W,H);ctx.globalCompositeOperation='multiply';ctx.fillStyle=C.a;ctx.fillRect(0,(t*900)%H,W,60)}
 else if(ty==='circle'){ctx.drawImage(OFF[0],0,0);ctx.save();ctx.beginPath();ctx.arc(tr.cx??540,tr.cy??960,easeIO(p)*2300,0,7);ctx.clip();ctx.drawImage(OFF[1],0,0);ctx.restore();ctx.strokeStyle=tr.col||C.a;ctx.lineWidth=40*(1-p);ctx.beginPath();ctx.arc(tr.cx??540,tr.cy??960,easeIO(p)*2300,0,7);ctx.stroke()}
 else if(ty==='flash'){ctx.drawImage(p<.5?OFF[0]:OFF[1],0,0);ctx.globalAlpha=1-Math.abs(p-.5)*2;ctx.fillStyle='#fff';ctx.fillRect(0,0,W,H)}
 else if(ty==='slideUp'){const e=easeIO(p);ctx.drawImage(OFF[0],0,-H*e*.35);ctx.globalAlpha=1;ctx.drawImage(OFF[1],0,H*(1-e))}
 ctx.restore()}
// ---------- shared outro: split A / B ----------
function outroSplit(x,lt,q,aTxt,bTxt,drawA,drawB){x.fillStyle=C.ink;x.fillRect(0,0,W,H);
 const pa=ease(prog(lt,.15,.45)),pb=ease(prog(lt,.4,.45));
 const panel=(y0,h,col,k,dir,txt,letter,fn,lt2)=>{x.save();x.translate(dir*(1-k)*W,0);x.beginPath();x.roundRect(50,y0,980,h,40);x.fillStyle=col+'22';x.fill();x.lineWidth=8;x.strokeStyle=col;x.stroke();x.clip();fn(x,lt2,y0,h);x.restore();
  x.save();x.translate(dir*(1-k)*W,0);pill(x,945,y0+90,120,120,28,col);x.fillStyle=C.ink;x.font='900 86px Cairo';x.textAlign='center';x.textBaseline='middle';x.fillText(letter,945,y0+96);rich(x,[[txt,C.paper]],480,y0+92,66,{stroke:12,maxW:700});x.restore()};
 popIn(x,lt,0,null,()=>rich(x,[[q,C.paper]],540,300,84,{stroke:14,maxW:960}),{cy:300});
 const pulse=lt>1.4?Math.sin(lt*5)*.5+.5:0;
 panel(420,560,C.a,pa,1,aTxt,'A',drawA,lt);panel(1020,560,C.b,pb,-1,bTxt,'B',drawB,lt);
 popIn(x,lt,1.2,null,()=>{rich(x,[['اكتب حرفك في التعليقات',C.paper]],540,1660,56,{weight:800});x.save();x.strokeStyle=C.a;x.lineWidth=10;x.lineCap='round';const yy=1730+Math.sin(lt*8)*12;x.beginPath();x.moveTo(540,yy);x.lineTo(540,yy+60);x.moveTo(510,yy+32);x.lineTo(540,yy+62);x.lineTo(570,yy+32);x.stroke();x.restore()},{cy:1660});
 popIn(x,lt,.05,null,()=>{logo(x,450,150,60);rich(x,[['قرارك',C.paper]],580,150,54,{weight:700})},{cy:150})}
function logo(x,cx,cy,sz){x.save();x.translate(cx-sz/2,cy-sz/2);x.scale(sz/200,sz/200);x.lineCap='round';x.lineJoin='round';x.lineWidth=20;x.strokeStyle=C.paper;x.beginPath();x.moveTo(100,172);x.lineTo(100,112);x.stroke();x.strokeStyle=C.a;x.beginPath();x.moveTo(100,112);x.lineTo(62,62);x.stroke();x.strokeStyle=C.b;x.beginPath();x.moveTo(100,112);x.lineTo(138,62);x.stroke();x.lineWidth=10;x.fillStyle=C.a;x.strokeStyle=C.a;x.beginPath();x.moveTo(44,74);x.lineTo(52,40);x.lineTo(82,54);x.closePath();x.fill();x.stroke();x.fillStyle=C.b;x.strokeStyle=C.b;x.beginPath();x.moveTo(156,74);x.lineTo(148,40);x.lineTo(118,54);x.closePath();x.fill();x.stroke();x.restore()}
function hud(x,t,label){x.save();x.globalAlpha=.85;x.font='700 40px Cairo';const w=x.measureText(label).width;rich(x,[[label,'#c9c5bd']],510,152,40,{weight:700});logo(x,510+w/2+40,150,52);x.restore()}
// boot: main canvas + seek
function boot(scenes,trans,post){const cv=document.getElementById('c'),ctx=cv.getContext('2d');window.seek=t=>{ctx.setTransform(1,0,0,1,0,0);composite(ctx,scenes,trans,t);if(post)post(ctx,t)};
 window.__ready=document.fonts.load('900 80px Cairo').then(()=>document.fonts.load('700 80px Cairo')).then(()=>document.fonts.load('800 80px Cairo')).then(()=>document.fonts.load('700 60px "Reem Kufi"')).then(()=>{window.seek(0);return 1})}
// ---------- text wrap + chat ----------
function wrapLines(x,txt,maxW){const ws=txt.split(' '),out=[];let cur='';for(const w of ws){const tr=cur?cur+' '+w:w;if(x.measureText(tr).width>maxW&&cur){out.push(cur);cur=w}else cur=tr}if(cur)out.push(cur);return out}
function bubble(x,txt,side,y,k,opt={}){const fs=opt.fs||54;x.save();x.font=`700 ${fs}px Cairo`;x.direction='rtl';const lines=wrapLines(x,txt,opt.maxW||640);const lw=Math.max(...lines.map(l=>x.measureText(l).width));
 const bw=lw+70,bh=lines.length*fs*1.5+46,bx=side==='them'?1000-bw:80;const sc=lerp(.6,1,back(k));x.globalAlpha=ease(k);
 x.translate(side==='them'?1000:80,y+bh);x.scale(sc,sc);x.translate(-(side==='them'?1000:80),-(y+bh));
 x.beginPath();x.roundRect(bx,y,bw,bh,side==='them'?[36,8,36,36]:[8,36,36,36]);x.fillStyle=side==='them'?'#1f2c34':'#0f5c4c';x.fill();
 x.fillStyle='#e9edef';x.textAlign='right';x.textBaseline='top';lines.forEach((l,i)=>x.fillText(l,bx+bw-35,y+20+i*fs*1.5));x.restore();return bh}
function typingDots(x,t,y){x.save();pill(x,880,y+50,200,100,50,'#1f2c34');for(let k=0;k<3;k++){x.fillStyle='#8aa0ad';x.beginPath();x.arc(840+k*40,y+50-12*Math.max(0,Math.sin(t*9-k*.9)),12,0,7);x.fill()}x.restore();return 100}
// ---------- karaoke captions from TIMING ----------
var KEY=['خمسين','ألف','ريال.','أبو','فهد.','فصلك','الكل.','مثلك.','أحد','شافك.','ديونك','شكراً.','محد','بيعرف.','A:','B:','التعليقات…'];
function captions(x,t,y=1600){const L=TIMING.lines.find(l=>t>=l.start-0.05&&t<l.end+0.25);if(!L)return;
 const ws=L.words;const chunks=[];let cur=[];ws.forEach(w=>{cur.push(w);if(cur.length>=4||/[.…:؟،]$/.test(w.w)){chunks.push(cur);cur=[]}});if(cur.length)chunks.push(cur);
 let ch=chunks.find(c=>t<c[c.length-1].e+0.05)||chunks[chunks.length-1];
 x.save();x.direction='rtl';x.textBaseline='middle';const fs=84;x.font=`900 ${fs}px Cairo`;
 const clean=s=>s.replace(/[…]/g,'');const wd=ch.map(w=>x.measureText(clean(w.w)+' ').width);const tot=wd.reduce((a,b)=>a+b,0);
 let sc=Math.min(1,960/tot);let px=540+tot*sc/2;
 ch.forEach((w,i)=>{const k=prog(t,w.s-0.04,.16);const on=t>=w.s&&t<w.e+0.05;const kw=KEY.includes(w.w);
  const s=sc*(k<1?lerp(.6,1,back(k)):1)*(on?1.12:1);const cx=px-wd[i]*sc/2;px-=wd[i]*sc;if(k<=0)return;
  x.save();x.globalAlpha=ease(k);x.translate(cx,y);x.scale(s,s);x.textAlign='center';x.lineJoin='round';x.lineWidth=16;x.strokeStyle='#0b0c10';x.strokeText(clean(w.w),0,0);
  x.fillStyle=on?(kw?C.gold:C.a):(kw?C.a:C.paper);x.fillText(clean(w.w),0,0);x.restore()});x.restore()}
function Ls(i){return TIMING.lines[i].start}function Le(i){return TIMING.lines[i].end}
