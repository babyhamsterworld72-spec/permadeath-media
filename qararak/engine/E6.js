// ===== Qararak ep06: «العدالة… والولد» (public part 5, closes the wallet story) =====
KEY=['وأخذه!','حكم','سجن…','ريال.','ارتحت.','ولده.','لحاله…','المطر.','ياخذه.','أبوي…','يرجع؟','A:','B:','بالقصة.'];
const END=TIMING.duration;
const b=[0,Ls(1)-.05,Ls(3)-.05,Ls(4)-.05,Ls(7)-.05,Ls(8)-.05,END+0.01];
const rel=(i,k)=>Ls(i)-b[k];
const wd=(i,k)=>TIMING.lines[i].words[k].s;
function umbrella(x,cx,cy,s,col=C.a){x.save();x.translate(cx,cy);x.scale(s,s);x.fillStyle=col;x.beginPath();x.moveTo(-170,0);x.quadraticCurveTo(0,-190,170,0);x.closePath();x.fill();
 x.fillStyle='rgba(0,0,0,.18)';for(let i=-2;i<=2;i++){x.beginPath();x.moveTo(i*68-34,0);x.quadraticCurveTo(i*68,-22,i*68+34,0);x.fill()}x.strokeStyle='#ddd';x.lineWidth=8;x.beginPath();x.moveTo(0,-60);x.lineTo(0,190);x.arc(-18,190,18,0,Math.PI);x.stroke();x.restore()}
function kidAlone(x,t,cx,gy,s,opt={}){return drawStick(x,{...BASE,...KID,...(opt.p||P.sad),head:opt.kh??22,x:cx,y:gy-110*s,ground:gy,s:s*.52,face:opt.kf||'sad',look:opt.kl??0},t)}
function rainTint(x,a=.5){x.save();x.globalCompositeOperation='multiply';x.fillStyle=`rgba(120,140,190,${a})`;x.fillRect(0,0,W,H);x.restore()}
const S=[
// 0 HOOK: your vote -> he got it
{t0:b[0],t1:b[1],draw(x,lt){const hit=wd(0,5)-.03;x.fillStyle=C.ink;x.fillRect(0,0,W,H);
 const g=x.createRadialGradient(540,820,40,540,820,900);g.addColorStop(0,'rgba(34,211,238,.22)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
 popIn(x,lt,.02,null,()=>{rich(x,[['تصويتكم بالجزء اللي فات',C.muted]],540,300,50,{weight:800})},{cy:300});
 commentRow(x,560,'BBB… وتحط أجرك فيه 🔥','117',prog(lt,.1,.28),1);
 popIn(x,lt,.6,null,()=>{pill(x,300,760,440,120,30,'rgba(34,211,238,.18)',C.b,5);rich(x,[['إنستغرام: B 🔥',C.b]],300,764,50,{weight:900})},{cy:0,cx:0});
 popIn(x,lt,.85,null,()=>{pill(x,780,760,440,120,30,'rgba(255,90,31,.14)',C.a,5);rich(x,[['يوتيوب: A 🤍',C.a]],780,764,50,{weight:900})},{cy:0,cx:0});
 popIn(x,lt,1.3,null,()=>{rich(x,[['الأغلبية: ',C.paper],['ياخذ جزاه',C.b]],540,960,70,{stroke:12})},{cy:960});
 if(lt>hit){const[sx,sy]=shake(lt,hit,.45,36);x.save();x.translate(sx,sy);bars(x,540,1330,640,560,ease(prog(lt,hit,.18)));
  drawStick(x,{...BASE,...FIRED,...P.sad,x:540,y:1380,ground:1560,s:.9,face:'sad',sweat:true,look:0,shadow:false},lt);bars(x,540,1330,640,560,ease(prog(lt,hit,.18)));x.restore();
if(lt<hit+.18){x.fillStyle=`rgba(255,255,255,${.5*(1-prog(lt,hit,.18))})`;x.fillRect(0,0,W,H)}}
 vignette(x,.7)}},
// 1 COURT: verdict on Abu Fahd
{t0:b[1],t1:b[2],draw(x,lt){const d=b[2]-b[1],gs=wd(1,3)-b[1],s2=rel(2,1),mr=wd(2,2)-b[1];const[sx,sy]=shake(lt,gs,.5,34);x.save();x.translate(sx,sy);
 cam(x,{z:lerp(1.05,1.2,easeIO(lt/d)),x:540,y:lerp(1000,900,easeIO(lt/d))});courtBg(x,lt);
 drawStick(x,{...BASE,...JUDGE,...(lt>gs-.4?P.point:P.stand),aR1:lt>gs-.4?120:12,aR2:lt>gs-.4?150:6,x:540,y:660,ground:840,s:1.1,face:'talk',look:0,shadow:false},lt);bench(x,lt,1180);
 gavel(x,830,1010,.5,lt<gs?lerp(-.2,-1.1,ease(prog(lt,0,gs))):.15);
 drawStick(x,{...BASE,...ME,...P.armsCross,x:230,y:1430,ground:1620,s:.95,face:'neutral',look:.6},lt);drawStick(x,{...BASE,...LAW,x:90,y:1450,ground:1620,s:.85,look:.6},lt);
 drawStick(x,{...BASE,...FIRED,...P.sad,x:830,y:1430,ground:1620,s:.95,face:lt>gs?'shock':'worried',sweat:true,look:-.6},lt);if(lt>s2)bars(x,830,1420,330,420,ease(prog(lt,s2,.25)));x.restore();
 popIn(x,lt,.05,null,()=>{pill(x,540,260,420,96,48,'rgba(0,0,0,.65)');rich(x,[['الحكم الأخير',C.paper]],540,264,50,{weight:800})},{cy:260});
 if(lt>gs&&lt<gs+.2){x.fillStyle=`rgba(255,255,255,${.5*(1-prog(lt,gs,.2))})`;x.fillRect(0,0,W,H)}
 popIn(x,lt,s2,null,()=>{x.save();x.translate(540,430);x.rotate(-.04);pill(x,0,0,620,150,28,C.red);rich(x,[['سنة سجن 🔒',C.paper]],0,6,76,{});x.restore()},{cy:430,from:2,d:.2});
 if(lt>mr){moneyRain(x,lt,mr,22,6,2.5);const ck=prog(lt,mr,.25);x.save();x.translate(540,1780);x.scale(lerp(.5,1,back(ck)),lerp(.5,1,back(ck)));x.globalAlpha=clamp(ck*2);pill(x,0,0,720,130,30,C.gold);rich(x,[['+ يرجّع كل ريال 💰',C.ink]],0,6,60,{});x.restore()}
 vignette(x,.75)}},
// 2 RELIEF: outside, case closed
{t0:b[2],t1:b[3],draw(x,lt){const d=b[3]-b[2],rk=wd(3,3)-b[2];x.save();cam(x,{z:lerp(1.2,1.08,ease(lt/d)),x:540,y:1150});streetBg(x,lt);
 const pose=lt<rk?P.stand:mix(P.stand,{aL1:-60,aL2:-130,aR1:60,aR2:130,head:-18,rot:-2},ease(prog(lt,rk,.4)));
 drawStick(x,{...BASE,...ME,...pose,x:540,y:1380,ground:1560,s:1.15,face:lt>rk?'closed':'neutral',look:0},lt);x.restore();
 rainTint(x,.35);
 stamp(x,540,420,prog(lt,.1,.16),'القضية انقفلت ✓',C.green,-.05,760);
 popIn(x,lt,rk,null,()=>{pill(x,540,640,560,110,55,'rgba(0,0,0,.7)',C.gold,5);rich(x,[['وأخيراً… ارتحت 😮‍💨',C.gold]],540,644,56,{weight:900})},{cy:640});
 vignette(x,.75)}},
// 3 SEE THE KID alone in the rain
{t0:b[3],t1:b[4],draw(x,lt){const d=b[4]-b[3],see=wd(4,3)-b[3],s5=rel(5,3),s6=rel(6,3);x.save();
 if(lt<see){const wx=lerp(200,420,ease(prog(lt,0,see)));cam(x,{z:1.05,x:540,y:1150});streetBg(x,lt);drawStick(x,{...BASE,...ME,...walkPose(lt*9,1),x:wx,y:1340,ground:1520,s:1.1,face:'neutral',look:1},lt);
  x.save();x.globalAlpha=.35;x.filter='brightness(0.3)';kidAlone(x,lt,880,1540,1.1);x.restore();x.restore();rainTint(x,.5);rain(x,lt,.28);
 }else{const ll=lt-see;cam(x,{z:lerp(1.1,1.4,easeIO(prog(ll,0,d-see))),x:lerp(600,660,easeIO(prog(ll,0,d-see))),y:lerp(1250,1380,easeIO(prog(ll,0,d-see)))});streetBg(x,lt);
  drawStick(x,{...BASE,...ME,...P.shock,x:420,y:1340,ground:1520,s:1.1,face:'shock',look:1,emote:'!'},lt);kidAlone(x,lt,820,1540,1.2,{kl:-.3});x.restore();rainTint(x,.55);rain(x,lt,.32);
  if(ll<.14){x.fillStyle='#fff';x.globalAlpha=.6*(1-ll/.14);x.fillRect(0,0,W,H);x.globalAlpha=1}
  popIn(x,ll,.08,null,()=>{x.save();x.translate(540,360);x.rotate(-.04);pill(x,0,0,420,140,26,C.red);rich(x,[['ولده',C.paper]],0,6,80,{});x.restore()},{cy:360,from:1.8,d:.22});
  popIn(x,lt,s5,null,()=>{pill(x,540,540,640,100,50,'rgba(0,0,0,.72)',C.b,5);rich(x,[['لحاله… تحت المطر 🌧️',C.b]],540,544,52,{weight:800})},{cy:540});
  popIn(x,lt,s6,null,()=>{pill(x,540,1790,620,100,50,'rgba(0,0,0,.78)');rich(x,[['ماحد جا ياخذه…',C.paper]],540,1794,52,{weight:800})},{cy:1790})}
 vignette(x,.85)}},
// 4 THE QUESTION: «أبوي… متى يرجع؟»
{t0:b[4],t1:b[5],draw(x,lt){const d=b[5]-b[4],q=wd(7,3)-b[4];x.fillStyle='#0c0d12';x.fillRect(0,0,W,H);x.save();
 cam(x,{z:lerp(2.0,2.5,lt/d),x:lerp(700,760,lt/d),y:1380});streetBg(x,lt);drawStick(x,{...BASE,...ME,...P.stand,x:520,y:1340,ground:1520,s:1.1,face:'sad',look:1},lt);
 const k=kidAlone(x,lt,lerp(820,720,ease(prog(lt,0,.8))),1540,1.2,{p:{...P.stand,aL1:-40,aL2:-60},kh:lt>q?-24:10,kf:'sad',kl:-1});x.restore();
 rainTint(x,.55);rain(x,lt,.22);if(lt>q)tear(x,700,1000,lt-q,2.4);
 const hb=Math.sin(lt*8)*.5+.5;x.fillStyle=`rgba(255,59,48,${.05*hb})`;x.fillRect(0,0,W,H);
 popIn(x,lt,q-.1,null,()=>{pill(x,540,340,820,160,30,'rgba(0,0,0,.8)',C.gold,6);rich(x,[['«أبوي… ',C.paper],['متى يرجع؟',C.gold],['»',C.paper]],540,344,66,{weight:900,maxW:760})},{cy:340});
 vignette(x,.9)}},
// 5 OUTRO VOTE
{t0:b[5],t1:b[6],draw(x,lt){const zz=1+.02*Math.sin(lt*1.3);x.save();x.translate(540,960);x.scale(zz,zz);x.translate(-540,-960);
 outroSplit(x,lt,'وش بتسوي؟','تتكفّل فيه… لين يطلع أبوه','تمشي… مو مسؤوليتك',
 (x,t,y0,h)=>{const gy=y0+h-40;const me=drawStick(x,{...BASE,...ME,...P.holdOut,aR1:30,aR2:20,aL1:-40,aL2:-150,x:430,y:gy-200,ground:gy,s:.8,face:'happy',look:1},t);const k=kidAlone(x,t,620,gy,.8,{p:{...P.stand,aL1:-150,aL2:-160},kh:-14,kf:'happy',kl:-.6});holdHand(x,me.hR,k.hL);umbrella(x,me.hL[0]+20,me.hL[1]-150,.62,C.a)},
 (x,t,y0,h)=>{const gy=y0+h-40;x.save();x.beginPath();x.rect(50,y0,980,h);x.clip();rain(x,t,.25,50);x.restore();drawStick(x,{...BASE,...ME,...walkPose(t*8,-1),x:260,y:gy-200,ground:gy,s:.8,face:'neutral',look:-1},t);kidAlone(x,t,760,gy,.85,{kf:'sad',kl:-.8,kh:24});tear(x,760,gy-170,t,1)});
 x.restore();
 const aS=Ls(9)-b[5],aE=Le(9)-b[5],bS=Ls(10)-b[5],bE=Le(10)-b[5];
 const hl=(y0,col,s0,e0)=>{if(lt<s0||lt>e0+.2)return;const k=ease(prog(lt,s0,.25))*(1-prog(lt,e0,.2));const oth=y0===420?1020:420;
  x.save();x.globalAlpha=.55*k;x.fillStyle='#000';x.beginPath();x.roundRect(50,oth,980,560,40);x.fill();x.restore();
  x.save();x.globalAlpha=k*(.7+.3*Math.sin(lt*10));x.shadowColor=col;x.shadowBlur=50;x.strokeStyle=col;x.lineWidth=16;x.beginPath();x.roundRect(46,y0-4,988,568,44);x.stroke();x.restore();
  if(lt-s0<.3){const q=1-(lt-s0)/.3;x.save();x.globalAlpha=.35*q;x.fillStyle=col;x.fillRect(0,0,W,H);x.restore()}};
 hl(420,C.a,aS,aE);hl(1020,C.b,bS,bE);
 const fk=rel(11,5);if(lt>fk)popIn(x,lt,fk,null,()=>{pill(x,540,1850,880,84,42,C.gold);rich(x,[['آخر قرار بالقصة… اكتب حرفك 🔒',C.ink]],540,1854,42,{weight:900})},{cy:1850})}}
];
const T=[{at:b[1],dur:.35,type:'zoom'},{at:b[2],dur:.35,type:'flash'},{at:b[3],dur:.3,type:'whipL'},{at:b[4],dur:.35,type:'zoom'},{at:b[5],dur:.5,type:'circle',col:C.a}];
boot(S,T,(x,t)=>{if(t<b[5]){if(t>b[1])hud(x,t,'قرارك');captions(x,t)}grain(x,t,.06)});
