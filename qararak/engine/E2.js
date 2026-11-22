KEY=['A…','B…','بتفضحكم.','أبو','فهد…','ابتسم.','صدفة…','رميتها.','والكاميرا؟','ظلمتك…','كذب','سعد.','بستة','آلاف.','سعد','بيدك.','A:','B:','الكل…','انفضحت.','تسامحه','حرفك…','الثالث'];
const ME={ghutra:'#F7F4EE',checker:'#d23b3b'};
const BOSS={tie:C.red,glasses:true,col:'#ECE6DC'};
const SAAD={ghutra:'#F7F4EE',checker:'#1c1d22',col:'#EDE7DD'};

const END=TIMING.duration;
const b=[0,Ls(1)-.05,Ls(2)-.05,Ls(4)-.05,Ls(7)-.05,Ls(10)-.05,Ls(11)-.05,END+0.01];
function door(x,cx,gy,open,t){x.fillStyle='#1b1712';x.fillRect(cx-260,gy-760,520,760);x.fillStyle='#2b2318';x.fillRect(cx-230,gy-720,460,720);
 // light from inside
 if(open>0){const w=420*open;const g=x.createLinearGradient(cx-210,0,cx-210+w,0);g.addColorStop(0,'rgba(255,200,130,.85)');g.addColorStop(1,'rgba(255,170,90,.5)');x.fillStyle=g;x.fillRect(cx-210,gy-700,w,700)}
 x.save();x.translate(cx+210,gy-700);x.scale(1-open*.85,1);x.fillStyle='#5a3d22';x.fillRect(-420,0,420,700);x.strokeStyle='#3a2614';x.lineWidth=10;x.strokeRect(-390,30,360,280);x.strokeRect(-390,370,360,300);x.fillStyle=C.gold;x.beginPath();x.arc(-370,380,14,0,7);x.fill();x.restore();
 x.fillStyle='#d9c9a8';x.beginPath();x.arc(cx+300,gy-560,10,0,7);x.fill();
 const lg=x.createRadialGradient(cx,gy-800,10,cx,gy-800,420);lg.addColorStop(0,'rgba(255,200,120,.35)');lg.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=lg;x.fillRect(cx-500,gy-1200,1000,800);x.fillStyle='#ffe0a8';x.fillRect(cx-40,gy-820,80,20)}
function cctvCam(x,cx,cy,s,t,on=1){x.save();x.translate(cx,cy);x.scale(s,s);x.fillStyle='#2a2f3a';x.fillRect(-10,-60,20,60);x.save();x.rotate(.35);x.fillStyle='#3a404d';x.fillRect(-70,-20,130,48);x.fillStyle='#111';x.beginPath();x.arc(-70,4,18,0,7);x.fill();x.restore();x.fillStyle=on&&Math.sin(t*10)>0?C.red:'#400';x.beginPath();x.arc(40,-8,9,0,7);x.fill();x.restore()}
function monitorFx(x,t,tint='rgba(60,255,120,.18)'){x.save();x.globalCompositeOperation='color';x.fillStyle='#3cff78';x.globalAlpha=.45;x.fillRect(0,0,W,H);x.restore();x.fillStyle=tint;x.fillRect(0,0,W,H);
 x.fillStyle='rgba(0,0,0,.22)';for(let y=(t*120)%6;y<H;y+=6)x.fillRect(0,y,W,2);const r=rnd(Math.floor(t*20));x.fillStyle='rgba(255,255,255,.05)';x.fillRect(0,r()*H,W,40+r()*60)}
function bigCam(x,cx,cy,t){x.save();x.translate(cx,cy);
 x.fillStyle='#262a33';x.fillRect(-30,-520,60,300);x.beginPath();x.roundRect(-120,-260,240,60,14);x.fill();
 x.rotate(.12);const bg=x.createLinearGradient(0,-170,0,170);bg.addColorStop(0,'#5b6272');bg.addColorStop(1,'#2b303b');x.fillStyle=bg;x.beginPath();x.roundRect(-330,-170,560,340,60);x.fill();
 x.fillStyle='#1d2028';x.beginPath();x.roundRect(-380,-190,90,380,30);x.fill();
 x.fillStyle='#0b0c10';x.beginPath();x.arc(-330,0,165,0,7);x.fill();const lg=x.createRadialGradient(-360,-40,10,-330,0,150);lg.addColorStop(0,'#5fd3ff');lg.addColorStop(.35,'#16324a');lg.addColorStop(1,'#05070a');x.fillStyle=lg;x.beginPath();x.arc(-330,0,130,0,7);x.fill();
 x.fillStyle='rgba(255,255,255,.55)';x.beginPath();x.ellipse(-380,-55,38,20,-.6,0,7);x.fill();
 const on=Math.sin(t*8)>0;x.fillStyle=on?C.red:'#3a0a08';x.shadowColor=C.red;x.shadowBlur=on?40:0;x.beginPath();x.arc(130,-90,22,0,7);x.fill();x.shadowBlur=0;
 x.font='800 44px monospace';x.fillStyle='#c9ced8';x.textAlign='left';x.fillText('REC',100,30);x.restore()}
function vhs(x,t,label,col='#fff'){x.save();x.font='700 54px monospace';x.fillStyle=col;x.textAlign='left';x.shadowColor='rgba(0,0,0,.8)';x.shadowBlur=8;x.fillText(label,70,300);x.restore()}
function rewindFx(x,t,k){const r=rnd(Math.floor(t*40));x.save();for(let i=0;i<10;i++){const y=r()*H;x.fillStyle=`rgba(255,255,255,${.08+.12*k})`;x.fillRect(0,y,W,4+r()*14)}
 x.globalCompositeOperation='screen';x.fillStyle=`rgba(34,211,238,${.12*k})`;x.fillRect(-8,0,W,H);x.fillStyle=`rgba(255,90,31,${.10*k})`;x.fillRect(8,0,W,H);x.restore()}
function tag(x,cx,cy,txt,col){pill(x,cx,cy,x.measureText?220:220,74,37,col);rich(x,[[txt,C.ink]],cx,cy+2,42,{})}
const S=[
// 0: vote recap
{t0:b[0],t1:b[1],draw(x,lt){x.fillStyle=C.ink;x.fillRect(0,0,W,H);
 const g=x.createRadialGradient(540,1000,40,540,1000,900);g.addColorStop(0,'rgba(255,90,31,.25)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
 const r=rnd(21);for(let i=0;i<46;i++){const isA=r()<.63;const t0=r()*1.6;if(lt<t0)continue;const k=ease(prog(lt,t0,.35));const px=80+r()*920,py=lerp(2000,420+r()*1100,k)-(lt-t0)*40;
  x.save();x.globalAlpha=.85*k;x.translate(px,py);x.rotate((r()-.5)*.3);pill(x,0,0,110,90,26,isA?C.a:C.b);rich(x,[[isA?'A':'B',C.ink]],0,4,60,{});x.restore()}
 popIn(x,lt,.05,null,()=>{pill(x,540,330,560,110,55,'rgba(0,0,0,.65)');rich(x,[['+2,000 تعليق',C.gold]],540,336,62,{})},{cy:330});
 if(lt>1.2){const sp=prog(lt,1.15,.18),[sx,sy]=shake(lt,1.3,.35,26);x.save();x.translate(540+sx,960+sy);x.rotate(-.08);x.scale(lerp(2.6,1,easeIn(sp)),lerp(2.6,1,easeIn(sp)));x.globalAlpha=clamp(sp*3);
  pill(x,0,0,560,560,80,C.a);rich(x,[['A',C.ink]],0,-40,300,{});rich(x,[['فاز',C.ink]],0,170,96,{});x.restore();
  if(lt<1.55){x.fillStyle=`rgba(255,255,255,${.6*(1-prog(lt,1.3,.25))})`;x.fillRect(0,0,W,H)}}
 drawStick(x,{...BASE,...ME,...P.celebrate,x:540,y:1560,ground:1760,s:.8,face:'happy',squint:true},lt);
 vignette(x,.6)}},
// 1: CCTV monitor wink to B voters
{t0:b[1],t1:b[2],draw(x,lt){const d=b[2]-b[1];x.save();const z=1+.12*lt/d;cam(x,{z,x:540,y:1100});bgNight(x,lt+2,{gy:1500});lamp(x,300,1500,lt,.8);
 const j=drawStick(x,{...BASE,...P.sly,...ME,x:560,y:1300,ground:1500,s:1.2,face:'sly',look:-.8},lt);wallet(x,j.hR[0],j.hR[1]-10,.45);x.restore();
 monitorFx(x,lt);
 // reticle on the stickman
 const rk=ease(prog(lt,1.0,.4));x.strokeStyle=`rgba(255,59,48,${rk})`;x.lineWidth=8;const rs=lerp(420,230,rk);x.strokeRect(570-rs/2,1060-rs*.75,rs,rs*1.5);
 vhs(x,lt,'CAM 03  ● REC',C.red);x.save();x.font='700 44px monospace';x.fillStyle='#d6ffe0';x.textAlign='left';x.fillText('02:17:'+String(10+Math.floor(lt*7)).padStart(2,'0'),70,370);x.restore();
 const fz=Ls(1)+1.0-b[1];if(lt>fz){popIn(x,lt,fz,null,()=>{x.save();x.translate(540,700);x.rotate(-.05);pill(x,0,0,700,140,24,C.red);rich(x,[['تم التصوير!',C.paper]],0,4,86,{});x.restore()},{cy:700,from:1.8,d:.25})}
 vignette(x,.7)}},
// 2: knock, door opens, Abu Fahd smiles
{t0:b[2],t1:b[3],draw(x,lt){const d=b[3]-b[2];x.fillStyle='#0b0d13';x.fillRect(0,0,W,H);
 const z=lerp(1.05,1.25,easeIO(lt/d));x.save();cam(x,{z,x:540,y:1150});
 x.fillStyle='#141822';x.fillRect(-600,-600,W+1200,H+1200);x.fillStyle='#10131b';x.fillRect(-600,1500,W+1200,900);
 const op=easeIO(prog(lt,1.35,.6));door(x,640,1500,op,lt);
 if(op>.3){const sm=lt>Ls(3)+1.6-b[2];drawStick(x,{...BASE,...BOSS,ghutra:'#F7F4EE',x:640,y:1300,ground:1500,s:1.2,face:sm?'happy':'shock',squint:sm,look:-.6,glow:sm?null:null},lt)}
 const j=drawStick(x,{...BASE,...P.holdOut,...ME,x:250,y:1300,ground:1500,s:1.15,face:'worried',aR1:lt<1.3?-40:75,aR2:lt<1.3?-150:88,rot:lt<1.3?-3:4},lt);
 if(lt>=1.3)wallet(x,j.hR[0]+25,j.hR[1]-10,.45);
 x.restore();
 if(lt>.2&&lt<.9){popIn(x,lt,.2,.9,()=>{x.save();x.translate(760,620);x.rotate(.08);rich(x,[['طق طق',C.paper]],0,0,86,{stroke:14});x.restore()},{cx:760,cy:620,from:1.6,d:.2})}
 const sm=Ls(3)+1.6-b[2];if(lt>sm)popIn(x,lt,sm,null,()=>{x.save();x.translate(820,700);rich(x,[['…!؟',C.gold]],0,0,110,{stroke:14});x.restore()},{cx:820,cy:700});
 vignette(x,.7)}},
// 3: test reveal + rewind + camera
{t0:b[3],t1:b[4],draw(x,lt){const d=b[4]-b[3];const rw0=Ls(5)-b[3],rw1=rw0+1.0,cm=Ls(6)-b[3]-.05;
 if(lt<rw0){ // close-up boss smiling
  x.fillStyle='#1e1710';x.fillRect(0,0,W,H);const g=x.createRadialGradient(540,800,40,540,800,800);g.addColorStop(0,'rgba(255,190,110,.28)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
  drawStick(x,{...BASE,...BOSS,ghutra:'#F7F4EE',x:540,y:1900,s:3.0,face:'happy',squint:true,look:-.2,shadow:false},lt);
  popIn(x,lt,.3,null,()=>rich(x,[['«كنت عارف»',C.gold]],540,380,96,{stroke:16}),{cy:380});
 }else if(lt<cm){ // rewind into street: boss dropping wallet on purpose
  const rk=1-prog(lt,rw1,.5);const ll=lt-rw0;
  x.save();bgNight(x,lt,{gy:1500});lamp(x,300,1500,lt,.9);
  const bx=lerp(820,700,ease(prog(ll,.2,.6)));const jb=drawStick(x,{...BASE,...BOSS,ghutra:'#F7F4EE',...P.holdOut,aR1:60,aR2:20,x:bx,y:1300,ground:1500,s:1.35,face:'sly',look:-1},lt);
  const wy=lerp(jb.hR[1],1485,easeIn(prog(ll,.9,.35)));wallet(x,lerp(jb.hR[0],520,easeIn(prog(ll,.9,.35))),wy,.75);if(ll>1.25)sparkle2(x,520,1470,lt);
  cctvCam(x,880,700,1.2,lt);x.restore();
  x.save();x.globalCompositeOperation='color';x.fillStyle='#4a6a9a';x.globalAlpha=.5;x.fillRect(0,0,W,H);x.restore();
  rewindFx(x,lt,Math.max(rk,.25));vhs(x,lt,lt<rw1?'◀◀ REWIND':'▶ قبل ساعة',lt<rw1?C.b:C.paper);
  popIn(x,lt,rw1+.2,null,()=>{x.save();x.translate(540,520);x.rotate(-.06);pill(x,0,0,820,170,26,C.a);rich(x,[['المحفظة كانت فخ!',C.ink]],0,6,92,{});x.restore()},{cy:520,from:1.8,d:.25});
 }else{ // camera close-up "with my own eyes"
  const ll=lt-cm;x.fillStyle='#0c0f16';x.fillRect(0,0,W,H);const z=lerp(1,1.35,easeIO(prog(ll,0,2.6)));x.save();cam(x,{z,x:540,y:1000});bigCam(x,540,1000,lt);x.restore();
  const eyeK=ease(prog(ll,.75,.4));x.save();x.globalAlpha=eyeK;pill(x,540,560,620,130,65,'rgba(0,0,0,.7)');rich(x,[['«عشان أشوفك بعيني»',C.paper]],540,566,62,{});x.restore();
  monitorFx(x,lt,'rgba(255,59,48,.06)');
 }
 vignette(x,.75)}},
// 4: framed by Saad
{t0:b[4],t1:b[5],draw(x,lt){const d=b[5]-b[4];const rv=Ls(8)+1.1-b[4],debt=Ls(9)-b[4];
 if(lt<rv){x.save();bgOffice(x,lt);
  const sa=drawStick(x,{...BASE,...SAAD,...P.point,aR1:60,aR2:-30,x:520,y:1300,ground:1500,s:1.1,face:'talk',look:.7,rot:6,head:10},lt);
  drawStick(x,{...BASE,...BOSS,...P.armsCross,x:770,y:1300,ground:1500,s:1.15,face:lt>1.2?'angry':'neutral',look:-.8},lt);
  popIn(x,lt,.3,null,()=>{pill(x,450,860,440,130,40,C.paper);x.fillStyle=C.paper;x.beginPath();x.moveTo(480,920);x.lineTo(520,990);x.lineTo(540,915);x.fill();rich(x,[['هو اللي سرق…',C.red]],450,866,50,{})},{cx:450,cy:860});
  // face hidden until reveal
  const hideK=1-ease(prog(lt,rv-.6,.4));if(hideK>0){x.fillStyle=`rgba(10,10,12,${.95*hideK})`;x.beginPath();x.arc(sa.head[0],sa.head[1],sa.R*1.7,0,7);x.fill();rich(x,[['؟',C.paper]],sa.head[0],sa.head[1]+6,90,{})}
  x.restore();x.save();x.globalCompositeOperation='color';x.fillStyle='#b08a5a';x.globalAlpha=.5;x.fillRect(0,0,W,H);x.restore();
  popIn(x,lt,.05,null,()=>{pill(x,540,330,360,100,50,'rgba(0,0,0,.6)');rich(x,[['قبل شهرين',C.paper]],540,334,54,{weight:800})},{cy:330});
 }else if(lt<debt){ // reveal freeze on Saad
  const ll=lt-rv;x.fillStyle='#120c0c';x.fillRect(0,0,W,H);const[sx,sy]=shake(ll,0,.4,30);x.save();x.translate(sx,sy);
  speedLines(x,540,1000,lt,.35,'#ff3b30');drawStick(x,{...BASE,...SAAD,x:540,y:1900,s:3.0,face:'sly',look:.2,shadow:false},lt);x.restore();
  x.save();x.translate(540,430);x.rotate(-.05);x.scale(lerp(2,1,easeIn(prog(ll,0,.15))),lerp(2,1,easeIn(prog(ll,0,.15))));pill(x,0,0,520,170,26,C.red);rich(x,[['سعد',C.paper]],0,8,120,{});x.restore();
  if(ll<.25){x.fillStyle=`rgba(255,255,255,${.7*(1-ll/.25)})`;x.fillRect(0,0,W,H)}
 }else{ // debt callback
  const ll=lt-debt;x.fillStyle='#111319';x.fillRect(0,0,W,H);
  [['القسط','2,400'],['الإيجار','3,500'],['البطاقة','11,800'],['سلفة سعد','6,000']].forEach(([n,v],i)=>{const y=560+i*170,hi=i===3;x.save();x.translate(540,y);
   if(hi){const k=ease(prog(ll,.3,.3));x.scale(1+.12*k,1+.12*k);x.translate((Math.random()-.5)*12*k*(ll<1.2?1:0),0)}
   pill(x,0,0,820,140,24,hi&&ll>.3?'#3a0f0d':'#F4F1EC',hi&&ll>.3?C.red:null,8);x.fillStyle=C.red;x.fillRect(-410,-70,18,140);rich(x,[[n,hi&&ll>.3?C.paper:C.ink]],180,0,58,{});x.font='900 60px Cairo';x.fillStyle=C.red;x.textAlign='left';x.textBaseline='middle';x.fillText(v,-370,0);x.restore()});
  drawStick(x,{...BASE,...ME,...P.shock,x:540,y:1450,ground:1640,s:.9,face:'shock',emote:'!'},lt);
 }
 vignette(x,.7)}},
// 5: next morning office, badge back, stare at Saad
{t0:b[5],t1:b[6],draw(x,lt){const d=b[6]-b[5];x.save();const z=1+.1*lt/d;cam(x,{z,x:540,y:1150});bgOffice(x,lt,'#1d2530');
 const sun=x.createLinearGradient(0,0,0,H);sun.addColorStop(0,'rgba(255,230,170,.18)');sun.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=sun;x.fillRect(-600,-600,W+1200,H+1200);
 const give=.5;const jb=drawStick(x,{...BASE,...BOSS,...P.holdOut,aR1:-75,aR2:-88,x:330,y:1300,ground:1500,s:1.1,face:'happy',squint:true,look:1},lt);
 const jm=drawStick(x,{...BASE,...ME,...(lt<give+.3?P.holdOut:P.armsCross),x:560,y:1300,ground:1500,s:1.1,face:lt>1.6?'angry':'neutral',look:lt>1.6?1:-1},lt);
 const hb=lt<give+.3?[jb.hR[0]+(jm.hR[0]-jb.hR[0])*ease(prog(lt,give,.3)),jb.hR[1]]:null;if(hb){x.fillStyle='#e9f2ff';x.fillRect(hb[0]-30,hb[1]-40,60,80);x.fillStyle=C.b;x.fillRect(hb[0]-30,hb[1]-40,60,18)}
 drawStick(x,{...BASE,...SAAD,x:880,y:1300,ground:1500,s:1.05,face:'worried',sweat:true,look:-1},lt);
 if(lt>1.6){x.strokeStyle='rgba(255,59,48,.75)';x.lineWidth=6;x.setLineDash([20,14]);x.lineDashOffset=-lt*80;x.beginPath();x.moveTo(600,960);x.lineTo(850,960);x.stroke();x.setLineDash([])}
 x.restore();popIn(x,lt,.05,null,()=>{pill(x,540,330,300,100,50,'rgba(0,0,0,.6)');rich(x,[['الصبح',C.paper]],540,334,54,{weight:800})},{cy:330});
 vignette(x,.6)}},
// 6: outro vote
{t0:b[6],t1:b[7],draw(x,lt){outroSplit(x,lt,'وش بتسوي في سعد؟','تفضحه قدام الكل','تسامحه وتسكت',
 (x,t,y0,h)=>{const gy=y0+h-40;drawStick(x,{...BASE,...P.point,...ME,x:290,y:gy-200,ground:gy,s:.8,face:'angry'},t);drawStick(x,{...BASE,...SAAD,...P.shock,x:560,y:gy-200,ground:gy,s:.78,face:'shock',sweat:true},t);for(let i=0;i<3;i++)drawStick(x,{...BASE,col:'#d9d3c9',ghutra:'#e9e4da',x:740+i*95,y:gy-200,ground:gy,s:.55,face:'shock',look:-1},t)},
 (x,t,y0,h)=>{const gy=y0+h-40;drawStick(x,{...BASE,...ME,aR1:60,aR2:40,x:450,y:gy-200,ground:gy,s:.82,face:'zip'},t);drawStick(x,{...BASE,...SAAD,x:640,y:gy-200,ground:gy,s:.82,face:'happy',squint:true},t)})}}
];
const T=[{at:b[1],dur:.3,type:'glitch'},{at:b[2],dur:.35,type:'whip'},{at:b[3],dur:.35,type:'zoom'},{at:b[4],dur:.3,type:'glitch'},{at:b[5],dur:.35,type:'flash'},{at:b[6],dur:.5,type:'circle',col:C.a}];
boot(S,T,(x,t)=>{if(t<b[6]){if(t>b[1])hud(x,t,'قرارك · الجزء ٢');captions(x,t)}grain(x,t,.06)});
function sparkle2(x,cx,cy,t){const k=(Math.sin(t*9)+1)/2;x.save();x.translate(cx,cy);x.rotate(t*2);x.fillStyle=`rgba(255,240,180,${.5+.5*k})`;for(let i=0;i<4;i++){x.rotate(Math.PI/2);x.beginPath();x.moveTo(0,0);x.lineTo(8,8);x.lineTo(0,60*(.6+.4*k));x.lineTo(-8,8);x.fill()}x.restore()}
