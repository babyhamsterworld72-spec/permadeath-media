// ===== Qararak ep03: «الكاميرا شافت كل شيء» (standalone-friendly part 2) =====
KEY=['عشرة','آلاف،','آلاف!','السارق!','سارق!','مديرك','فصلك','خمسين','ألف،','بيدك.','وعدّها.','مصدّق.','كاميرا.','التسجيل،','يده','درجه.','أخذها،','التهمة،','جوالك.','A:','B:','حرفك،','بالتسجيل.'];
const ME={ghutra:'#F7F4EE',checker:'#d23b3b'};
const BOSS={tie:C.red,glasses:true,col:'#ECE6DC'};
const GUARD={cap:'#1f3a5f',col:'#E6E0D6'};
const COW=(i)=>({col:['#cfc9bf','#bdb7ad','#d8d2c8','#c4beb4'][i%4],ghutra:i%2?'#e6e1d7':null,glasses:i===2});
const END=TIMING.duration;
const b=[0,Ls(1)-.05,Ls(3)-.05,Ls(5)-.05,Ls(6)-.05,Ls(7)-.05,Ls(9)-.05,Ls(11)-.05,END+0.01];
const rel=(i,k)=>Ls(i)-b[k];
function cash(x,cx,cy,sc,rot=0){x.save();x.translate(cx,cy);x.rotate(rot);x.scale(sc,sc);for(let i=0;i<5;i++){x.fillStyle=i%2?'#5fae6a':'#6cbb76';x.fillRect(-60,-30-i*7,120,56)}x.fillStyle='#e9d9a8';x.fillRect(-12,-62,24,60);x.fillStyle='#2e6b37';x.font='900 24px Cairo';x.textAlign='center';x.textBaseline='middle';x.fillText('10,000',0,-34);x.restore()}
function idCard(x,cx,cy,sc,rot=0){x.save();x.translate(cx,cy);x.rotate(rot);x.scale(sc,sc);pill(x,0,0,520,320,26,'#eef3f7');x.fillStyle=C.b;x.fillRect(-260,-160,520,60);x.fillStyle='#d9e2ea';x.fillRect(-230,-80,170,210);
 drawStick(x,{...BASE,...BOSS,x:-145,y:110,s:.55,face:'angry',shadow:false},0);x.font='900 40px Cairo';x.fillStyle='#1b2733';x.textAlign='right';x.direction='rtl';x.fillText('أبو فهد',220,-30);x.font='700 28px Cairo';x.fillStyle='#55606b';x.fillText('المدير العام',220,20);x.fillText('بطاقة هوية',220,-130+4);x.restore()}
function deskFront(x,cx,gy,w=520){x.fillStyle='#3a2a1c';x.fillRect(cx-w/2,gy-300,w,40);x.fillStyle='#2c2016';x.fillRect(cx-w/2+20,gy-260,w-40,260);x.fillStyle='#3d2c1e';x.fillRect(cx+w/2-200,gy-230,160,70);x.fillStyle=C.gold;x.fillRect(cx+w/2-135,gy-200,30,8)}
function whisperB(x,cx,cy,txt,k){if(k<=0)return;x.save();x.globalAlpha=ease(k);const sc=lerp(.6,1,back(k));x.translate(cx,cy);x.scale(sc,sc);pill(x,0,0,260,90,45,'rgba(244,241,236,.92)');rich(x,[[txt,C.red]],0,4,40,{});x.restore()}
function staffRow(x,t,gy,s,face,look,n=4,xs=[110,300,780,970]){for(let i=0;i<n;i++)drawStick(x,{...BASE,...COW(i),x:xs[i],y:gy-200*s/.95,ground:gy,s,face:typeof face==='function'?face(i):face,look:look(i)},t)}
function phoneBig(x,cx,cy,sc,t,play=1){x.save();x.translate(cx,cy);x.scale(sc,sc);x.shadowColor='rgba(120,220,255,.6)';x.shadowBlur=60;pill(x,0,0,420,820,60,'#11151c');x.shadowBlur=0;pill(x,0,0,380,780,46,'#0a0d12');
 x.save();x.beginPath();x.roundRect(-180,-360,360,560,30);x.clip();x.fillStyle='#0f1a12';x.fillRect(-180,-360,360,560);
 x.save();x.translate(-540*.33,-360-60);x.scale(.33,.33);drawFootage(x,1.2+t*.4,true);x.restore();x.restore();
 x.fillStyle='rgba(255,255,255,.85)';x.beginPath();x.moveTo(-26,-110);x.lineTo(34,-80);x.lineTo(-26,-50);x.closePath();if(!play)x.fill();
 x.fillStyle=C.red;x.beginPath();x.arc(-140,-320,10,0,7);x.fill();x.font='700 26px monospace';x.fillStyle='#fff';x.textAlign='left';x.fillText('REC',-122,-312);
 x.fillStyle='#2a3340';x.fillRect(-160,240,320,10);x.fillStyle=C.a;x.fillRect(-160,240,320*((t*.25)%1),10);
 rich(x,[['cam_03.mp4',C.paper]],0,300,30,{weight:700});x.restore()}
// CCTV footage of the boss slipping the bundle into his drawer (drawn in 1080x1920 space)
function drawFootage(x,lt,mini=false){x.fillStyle='#1a1712';x.fillRect(0,0,W,H);bgOffice(x,lt,'#1d1a14');
 const k=easeIO(prog(lt,.6,1.0)),k2=easeIO(prog(lt,1.6,.6));
 const p={...BASE,...BOSS,x:620,y:1300,ground:1500,s:1.15,face:'sly',look:-.8,rot:-6,head:-14,aL1:-30,aL2:-40,aR1:lerp(40,95,k)-k2*60,aR2:lerp(60,170,k)-k2*40};
 const j=drawStick(x,p,lt);deskFront(x,620,1500,560);
 const hx=lerp(j.hR[0],700,k2),hy=lerp(j.hR[1],1230,k2);cash(x,hx,hy,.8,-.2);
 // drawer slides open/closed
 const dr=Math.sin(Math.PI*clamp((lt-1.3)/1.4));x.fillStyle='#4a3626';x.fillRect(640+dr*0,1270+dr*40,240,60);return j}
const S=[
// 0 HOOK: boss screams "you're the thief"
{t0:b[0],t1:b[1],draw(x,lt){const d=b[1]-b[0];x.fillStyle='#160d0b';x.fillRect(0,0,W,H);
 const g=x.createRadialGradient(540,900,40,540,900,1000);g.addColorStop(0,'rgba(255,59,48,.35)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
 speedLines(x,540,900,lt,.28,'#ff3b30');
 const[sx,sy]=shake(lt,.05,.6,34),[sx2,sy2]=shake(lt,rel(0,0)+1.1,.5,40);x.save();x.translate(sx+sx2,sy+sy2);
 const z=lerp(1.25,1,ease(prog(lt,0,.4)));x.translate(540,960);x.scale(z,z);x.translate(-540,-960);
 drawStick(x,{...BASE,...BOSS,...P.point,aR1:80,aR2:70,x:540,y:1850,s:3.1,face:'angry',look:.15,shadow:false},lt);x.restore();
 // -10,000 slam
 popIn(x,lt,.12,null,()=>{x.save();x.translate(540,330);x.rotate(-.06);x.font='900 190px Cairo';x.textAlign='center';x.textBaseline='middle';x.lineWidth=24;x.strokeStyle=C.ink;x.lineJoin='round';x.strokeText('-10,000',0,0);x.fillStyle=C.red;x.shadowColor='rgba(255,59,48,.7)';x.shadowBlur=40;x.fillText('-10,000',0,0);x.restore()},{cy:330,from:2.2,d:.22});
 const st=Math.max(.6,rel(0,0)+1.0);if(lt>st){const sp=prog(lt,st,.16);x.save();x.translate(540,560);x.rotate(.08);x.scale(lerp(2.6,1,easeIn(sp)),lerp(2.6,1,easeIn(sp)));x.globalAlpha=clamp(sp*3);pill(x,0,0,640,190,26,null,C.red,14);rich(x,[['سارق!',C.red]],0,10,150,{});x.restore();
  if(lt<st+.2){x.fillStyle=`rgba(255,255,255,${.55*(1-prog(lt,st,.2))})`;x.fillRect(0,0,W,H)}}
 vignette(x,.8)}},
// 1 RECAP: night street find + ID, then handing it back
{t0:b[1],t1:b[2],draw(x,lt,t){const sub=rel(2,1);
 if(lt<sub){const z=1+.15*lt/sub;x.save();cam(x,{z,x:520,y:1150});bgNight(x,lt,{gy:1500});lamp(x,300,1500,lt);
  const j=drawStick(x,{...BASE,...ME,...P.holdLook,x:460,y:1300,ground:1500,s:1.2,face:lt>.9?'shock':'worried',emote:lt>.9&&lt<1.6?'!':null},lt);wallet(x,(j.hL[0]+j.hR[0])/2,j.hL[1]-10,.55,.4);x.restore();
  x.save();x.globalCompositeOperation='color';x.fillStyle='#4a6a9a';x.globalAlpha=.35;x.fillRect(0,0,W,H);x.restore();
  if(lt<.5)rewindFx(x,lt,1-lt*2);
  popIn(x,lt,.05,null,()=>{pill(x,540,330,380,100,50,'rgba(0,0,0,.65)');rich(x,[['قبل ساعة',C.paper]],540,334,54,{weight:800})},{cy:330});
  const ik=prog(lt,Math.max(.5,rel(1,1)+1.0),.35);if(ik>0){x.save();x.globalAlpha=ease(ik);idCard(x,540,820,lerp(.4,1,back(ik)),-.06);x.restore();
   popIn(x,lt,Math.max(.8,rel(1,1)+1.6),null,()=>{x.save();x.translate(540,1060);x.rotate(.05);pill(x,0,0,520,110,22,C.red);rich(x,[['اللي فصلك!',C.paper]],0,4,66,{});x.restore()},{cy:1060,from:1.8,d:.22})}
 }else{const ll=lt-sub,d=b[2]-b[1]-sub;x.save();cam(x,{z:1+.08*ll/d,x:540,y:1150});bgOffice(x,lt);
  staffRow(x,lt,1500,.75,'neutral',i=>i<2?1:-1);
  const give=ease(prog(ll,.3,.5));drawStick(x,{...BASE,...BOSS,...P.armsCross,x:700,y:1300,ground:1500,s:1.1,face:'neutral',look:-1},lt);
  const jm=drawStick(x,{...BASE,...ME,...P.holdOut,x:lerp(250,400,give),y:1300,ground:1500,s:1.1,face:'happy',look:1},lt);wallet(x,jm.hR[0]+25,jm.hR[1]-10,.45);x.restore();
  const n=Math.round(easeIO(prog(ll,.2,.9))*50000);popIn(x,ll,.15,null,()=>{x.save();x.font='900 170px Cairo';x.textAlign='center';x.textBaseline='middle';x.lineWidth=20;x.strokeStyle=C.ink;x.lineJoin='round';const tx=n.toLocaleString('en-US');x.strokeText(tx,540,560);x.fillStyle=C.gold;x.shadowColor='rgba(255,197,61,.6)';x.shadowBlur=36;x.fillText(tx,540,560);x.restore();rich(x,[['ريال… رجّعتها كاملة',C.paper]],540,700,62,{stroke:12})},{cy:560});
 }
 // returning viewers badge (text only, no voice)
 popIn(x,lt,.4,lt>(b[2]-b[1])-.3?(b[2]-b[1])-.3:null,()=>{pill(x,540,1720,560,96,48,'rgba(0,0,0,.72)',C.a,5);rich(x,[['أغلبكم اختار ',C.paper],['A',C.a],[' ✓',C.green]],540,1724,46,{weight:800})},{cy:1720});
 vignette(x,.7)}},
// 2 COUNT then SHOUT in front of staff
{t0:b[2],t1:b[3],draw(x,lt){const sub=rel(4,2),d=b[3]-b[2];
 if(lt<sub){x.save();cam(x,{z:lerp(1.1,1.35,easeIO(lt/sub)),x:620,y:1180});bgOffice(x,lt);
  const j=drawStick(x,{...BASE,...BOSS,...P.holdLook,x:620,y:1300,ground:1500,s:1.15,face:'sly',look:-.3},lt);deskFront(x,620,1500,560);
  const r=rnd(5);for(let i=0;i<8;i++){const tt=(lt*3+i/8)%1;bill(x,lerp(j.hL[0],760,tt),lerp(j.hL[1]-30,1180,tt)-Math.sin(tt*Math.PI)*120,.7,r()*2-1,1-tt*.6)}
  x.restore();
  const n=Math.min(40000,Math.floor(prog(lt,.2,sub-.4)*40)*1000);x.save();pill(x,540,420,560,170,30,'rgba(0,0,0,.7)',n>=40000&&lt>sub-.5?C.red:'#444',6);x.font='900 120px Cairo';x.textAlign='center';x.textBaseline='middle';x.fillStyle=n>=40000&&lt>sub-.5?C.red:C.gold;x.fillText(n.toLocaleString('en-US'),540,426);x.restore();
  for(let i=0;i<Math.floor(lt*6);i++){}
 }else{const ll=lt-sub;const[sx,sy]=shake(ll,0,.5,30);x.save();x.translate(sx,sy);cam(x,{z:1,x:540,y:1100});bgOffice(x,lt,'#241411');
  staffRow(x,lt,1500,.85,i=>ll>.5?'shock':'neutral',i=>i<2?1:-1);
  drawStick(x,{...BASE,...BOSS,...P.point,x:690,y:1300,ground:1500,s:1.2,face:'angry',look:-1},lt);
  drawStick(x,{...BASE,...ME,...P.shock,x:400,y:1300,ground:1500,s:1.1,face:'shock',sweat:true,look:1},lt);x.restore();
  popIn(x,ll,.05,null,()=>{x.save();x.translate(540,470);x.rotate(-.05);pill(x,0,0,820,180,26,C.red);rich(x,[['ناقصة 10,000!',C.paper]],0,6,100,{});x.restore()},{cy:470,from:2,d:.2});
  if(ll<.18){x.fillStyle=`rgba(255,59,48,${.45*(1-ll/.18)})`;x.fillRect(0,0,W,H)}}
 vignette(x,.72)}},
// 3 EVERYONE STARES
{t0:b[3],t1:b[4],draw(x,lt){const d=b[4]-b[3];x.fillStyle='#0c0d11';x.fillRect(0,0,W,H);
 const sp=x.createRadialGradient(540,1150,40,540,1150,520);sp.addColorStop(0,'rgba(255,240,210,.22)');sp.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=sp;x.fillRect(0,0,W,H);
 x.save();cam(x,{z:lerp(1,1.22,easeIO(lt/d)),x:540,y:1150});
 const xs=[120,300,780,960];for(let i=0;i<4;i++)drawStick(x,{...BASE,...COW(i),x:xs[i],y:1340,ground:1520,s:.9,face:i%2?'angry':'sly',look:i<2?1:-1,col:'#9a958d'},lt);
 drawStick(x,{...BASE,...ME,...P.sad,x:540,y:1320,ground:1520,s:1.15,face:'sad',sweat:true},lt);x.restore();
 ['حرامي…','ما توقعتها','فصلوه صح'].forEach((w,i)=>whisperB(x,[240,840,560][i],[760,860,640][i],w,prog(lt,.25+i*.45,.3)));
 vignette(x,.85)}},
// 4 REMEMBER: the office camera
{t0:b[4],t1:b[5],draw(x,lt){const d=b[5]-b[4];const half=Math.min(1.0,d*.4);
 if(lt<half){x.fillStyle='#0c0d11';x.fillRect(0,0,W,H);drawStick(x,{...BASE,...ME,x:540,y:1800,s:3.0,face:'shock',look:.4,head:-12,shadow:false,emote:'!'},lt);
  popIn(x,lt,.1,null,()=>rich(x,[['لحظة…',C.gold]],540,420,110,{stroke:18}),{cy:420});
 }else{const ll=lt-half;x.fillStyle='#0c0f16';x.fillRect(0,0,W,H);x.save();cam(x,{z:lerp(.85,1.25,easeIO(prog(ll,0,d-half))),x:540,y:1000,r:lerp(-4,2,ll/(d-half))});bigCam(x,560,1050,lt);x.restore();
  popIn(x,ll,.1,null,()=>{x.save();x.translate(540,470);x.rotate(-.05);pill(x,0,0,760,170,26,C.red);rich(x,[['المكتب فيه كاميرا!',C.paper]],0,6,82,{});x.restore()},{cy:470,from:1.8,d:.22});
  monitorFx(x,lt,'rgba(255,59,48,.05)')}
 vignette(x,.75)}},
// 5 GUARD ROOM -> FOOTAGE: the hand slides the cash into the drawer
{t0:b[5],t1:b[6],draw(x,lt){const sub=rel(8,5),d=b[6]-b[5];
 if(lt<sub){x.fillStyle='#0b0e14';x.fillRect(0,0,W,H);x.save();cam(x,{z:lerp(1,1.18,easeIO(lt/sub)),x:540,y:900});
  for(let i=0;i<6;i++){const cx=210+(i%3)*330,cy=520+Math.floor(i/3)*300;pill(x,cx,cy,300,260,14,'#132019','#2b3a33',6);x.save();x.beginPath();x.roundRect(cx-140,cy-120,280,240,10);x.clip();x.fillStyle=`rgba(60,255,120,${.08+.05*Math.sin(lt*3+i)})`;x.fillRect(cx-140,cy-120,280,240);x.font='700 22px monospace';x.fillStyle='#8fffb0';x.textAlign='left';x.fillText('CAM 0'+(i+1),cx-128,cy-96);x.restore()}
  const hi=1+(Math.floor(lt*4)%2===0?0:0);pill(x,540,820,320,270,16,null,C.red,8*ease(prog(lt,.6,.3)));
  drawStick(x,{...BASE,...GUARD,x:300,y:1450,ground:1650,s:1.0,face:'neutral',look:1,sit:true},lt);
  drawStick(x,{...BASE,...ME,...P.point,aR1:120,aR2:150,x:760,y:1450,ground:1650,s:1.05,face:'worried',look:-.4},lt);
  x.restore();popIn(x,lt,.05,null,()=>{pill(x,540,280,460,100,50,'rgba(0,0,0,.65)');rich(x,[['غرفة الحارس',C.paper]],540,284,54,{weight:800})},{cy:280});
 }else{const ll=lt-sub,dd=d-sub;const fz=Math.min(dd-.9,2.2);const lf=Math.min(ll,fz);
  const z=ll<fz?lerp(1,1.12,ll/fz):lerp(1.12,1.9,easeIO(prog(ll,fz,.5)));x.save();cam(x,{z,x:lerp(540,690,easeIO(prog(ll,fz,.5))),y:lerp(1100,1240,easeIO(prog(ll,fz,.5)))});drawFootage(x,lf);x.restore();
  monitorFx(x,lt);vhs(x,lt,'CAM 03  ● REC',C.red);x.save();x.font='700 44px monospace';x.fillStyle='#d6ffe0';x.textAlign='left';x.fillText('09:41:'+String(12+Math.floor(lf*6)).padStart(2,'0'),70,370);x.restore();
  if(ll>fz){const k=ease(prog(ll,fz+.3,.3));x.strokeStyle=`rgba(255,59,48,${k})`;x.lineWidth=10;x.beginPath();x.arc(540,1000,lerp(500,260,k),0,7);x.stroke();
   popIn(x,ll,fz+.35,null,()=>{x.save();x.translate(540,560);x.rotate(-.05);pill(x,0,0,700,150,24,C.red);rich(x,[['هو اللي أخذها!',C.paper]],0,6,86,{});x.restore()},{cy:560,from:1.8,d:.22});
   if(ll<fz+.15){x.fillStyle=`rgba(255,255,255,${.6*(1-prog(ll,fz,.15))})`;x.fillRect(0,0,W,H)}
   rich(x,[['❚❚ إيقاف',C.paper]],880,300,46,{weight:800})}}
 vignette(x,.75)}},
// 6 REVEAL: frame-up + the recording is in your phone
{t0:b[6],t1:b[7],draw(x,lt){const sub=rel(10,6),d=b[7]-b[6];
 if(lt<sub){x.fillStyle='#140c0c';x.fillRect(0,0,W,H);const[sx,sy]=shake(lt,0,.35,26);x.save();x.translate(sx,sy);speedLines(x,540,1000,lt,.3,'#ff3b30');
  const z=lerp(1,1.15,lt/sub);x.translate(540,960);x.scale(z,z);x.translate(-540,-960);drawStick(x,{...BASE,...BOSS,x:540,y:1950,s:3.0,face:'sly',look:-.3,shadow:false},lt);x.restore();
  popIn(x,lt,Math.max(.2,sub-1.6),null,()=>{x.save();x.translate(540,400);x.rotate(.04);pill(x,0,0,800,160,26,C.ink,C.red,10);rich(x,[['يبي يلبّسك التهمة',C.red]],0,6,78,{});x.restore()},{cy:400,from:1.8,d:.22});
 }else{const ll=lt-sub;x.fillStyle='#0b0e14';x.fillRect(0,0,W,H);const g=x.createRadialGradient(540,1000,40,540,1000,800);g.addColorStop(0,'rgba(34,211,238,.25)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
  const k=back(prog(ll,0,.45));x.save();x.translate(0,lerp(900,0,ease(prog(ll,0,.45))));phoneBig(x,540,1080,lerp(.7,1,k),ll);x.restore();
  popIn(x,ll,.5,null,()=>rich(x,[['الدليل… ',C.paper],['في جوالك',C.b]],540,420,92,{stroke:16}),{cy:420});
  burst(x,540,700,ll,.45,30,C.b,11,900,8)}
 vignette(x,.7)}},
// 7 OUTRO VOTE + follow hook
{t0:b[7],t1:b[8],draw(x,lt){const zz=1+.025*Math.sin(lt*1.3);x.save();x.translate(540,960);x.scale(zz,zz);x.translate(-540,-960);outroSplit(x,lt,'وش بتسوي بالتسجيل؟','تفضحه قدام الكل','تسكت… ويرجّعك لشغلك',
 (x,t,y0,h)=>{const gy=y0+h-40;const j=drawStick(x,{...BASE,...P.point,aR1:150,aR2:170,...ME,x:290,y:gy-200,ground:gy,s:.8,face:'angry'},t);phoneProp(x,j.hR[0],j.hR[1]-20,1.6,1);drawStick(x,{...BASE,...BOSS,...P.shock,x:560,y:gy-200,ground:gy,s:.78,face:'shock',sweat:true},t);for(let i=0;i<3;i++)drawStick(x,{...BASE,...COW(i),x:740+i*95,y:gy-200,ground:gy,s:.55,face:'shock',look:-1},t)},
 (x,t,y0,h)=>{const gy=y0+h-40;drawStick(x,{...BASE,...ME,...P.holdOut,x:430,y:gy-200,ground:gy,s:.82,face:'sly'},t);drawStick(x,{...BASE,...BOSS,...P.holdOut,aR1:-75,aR2:-88,x:640,y:gy-200,ground:gy,s:.82,face:'worried',sweat:true},t);x.fillStyle='#e9f2ff';x.fillRect(505,gy-215,60,80);x.fillStyle=C.b;x.fillRect(505,gy-215,60,18)});
 x.restore();
 const aS=Ls(11)+.9-b[7],aE=Ls(11)+3.4-b[7],bS=Ls(11)+3.6-b[7],bE=Ls(11)+6.5-b[7];
 const hl=(y0,col,s0,e0)=>{if(lt<s0||lt>e0+.2)return;const k=ease(prog(lt,s0,.25))*(1-prog(lt,e0,.2));const oth=y0===420?1020:420;
  x.save();x.globalAlpha=.55*k;x.fillStyle='#000';x.beginPath();x.roundRect(50,oth,980,560,40);x.fill();x.restore();
  x.save();x.globalAlpha=k*(.7+.3*Math.sin(lt*10));x.shadowColor=col;x.shadowBlur=50;x.strokeStyle=col;x.lineWidth=16;x.beginPath();x.roundRect(46,y0-4,988,568,44);x.stroke();x.restore();
  if(lt-s0<.3){const q=1-(lt-s0)/.3;x.save();x.globalAlpha=.35*q;x.fillStyle=col;x.fillRect(0,0,W,H);x.restore()}};
 hl(420,C.a,aS,aE);hl(1020,C.b,bS,bE);
 const fk=rel(12,7);if(lt>fk)popIn(x,lt,fk,null,()=>{pill(x,540,1880-30,880,84,42,C.gold);rich(x,[['تابع… وش صار بالتسجيل؟ 👀',C.ink]],540,1854,44,{weight:900})},{cy:1850})}}
];
const T=[{at:b[1],dur:.3,type:'glitch'},{at:b[2],dur:.35,type:'whip'},{at:b[3],dur:.3,type:'flash'},{at:b[4],dur:.35,type:'zoom'},{at:b[5],dur:.3,type:'glitch'},{at:b[6],dur:.3,type:'flash'},{at:b[7],dur:.5,type:'circle',col:C.a}];
boot(S,T,(x,t)=>{if(t<b[7]){if(t>b[1])hud(x,t,'قرارك');captions(x,t)}grain(x,t,.06)});
