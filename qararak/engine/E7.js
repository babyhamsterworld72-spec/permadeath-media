// ===== Qararak ep07: «الحوالة الغلط» part 1 (new story) =====
KEY=['ثمانين','ألف','ريال!','المرسل…','غريب.','يبكي:','بالغلط…','عملية','أمي…','تسويها!','نصّابين…','ثاني.','مرتين.','A:','B:','الثاني.'];
const END=TIMING.duration;
const b=[0,Ls(1)-.05,Ls(2)-.05,Ls(3)-.05,Ls(5)-.05,Ls(6)-.05,Ls(8)-.05,END+0.01];
const rel=(i,k)=>Ls(i)-b[k];
const wd=(i,k)=>TIMING.lines[i].words[k].s;
const FRIEND={col:'#d7e3ff',cap:true};
const CALLER={col:'#e8d9c9',ghutra:'#e6e1d7'};
function bigPhone(x,cx,cy,s,rot,screen,ring=0){x.save();x.translate(cx,cy);x.rotate(rot);x.scale(s,s);
 if(ring>0){x.rotate(Math.sin(ring*60)*.06)}
 x.shadowColor='rgba(34,211,238,.5)';x.shadowBlur=60;x.fillStyle='#0b0d12';x.beginPath();x.roundRect(-230,-460,460,920,60);x.fill();x.shadowBlur=0;
 x.fillStyle='#141821';x.beginPath();x.roundRect(-208,-436,416,872,44);x.fill();x.fillStyle='#000';x.beginPath();x.roundRect(-60,-422,120,30,15);x.fill();
 x.save();x.beginPath();x.roundRect(-208,-436,416,872,44);x.clip();screen(x);x.restore();x.restore()}
function bankSms(x,amt,k,sender='حساب غير معروف'){x.fillStyle='#0f1620';x.fillRect(-208,-436,416,872);
 rich(x,[['9:41',C.paper]],0,-380,26,{weight:700});
 x.save();x.globalAlpha=k;x.translate(0,lerp(-60,0,ease(k)));pill(x,0,-200,380,250,30,'#1d2733',C.green,4);
 rich(x,[['🏦 البنك',C.muted]],60,-275,28,{weight:800});rich(x,[['تم إيداع مبلغ',C.paper]],0,-225,34,{weight:800});
 rich(x,[[amt+' ريال',C.gold]],0,-160,54,{weight:900});rich(x,[['من: '+sender,C.muted]],0,-110,24,{weight:700});x.restore()}
function callScreen(x,t,name,sub){const g=x.createLinearGradient(0,-436,0,436);g.addColorStop(0,'#1b3a2c');g.addColorStop(1,'#0d1612');x.fillStyle=g;x.fillRect(-208,-436,416,872);
 rich(x,[[name,C.paper]],0,-220,40,{weight:900});rich(x,[[sub,C.muted]],0,-160,28,{weight:700});
 const pr=(t*1.4)%1;x.strokeStyle=`rgba(61,220,132,${1-pr})`;x.lineWidth=6;x.beginPath();x.arc(0,40,70+pr*90,0,7);x.stroke();x.fillStyle='#2a3a33';x.beginPath();x.arc(0,40,70,0,7);x.fill();rich(x,[['?',C.paper]],0,46,70,{});
 x.fillStyle=C.red;x.beginPath();x.arc(-110,300,52,0,7);x.fill();x.fillStyle=C.green;x.beginPath();x.arc(110,300,52,0,7);x.fill();rich(x,[['📞',C.paper]],110,306,46,{});rich(x,[['📞',C.paper]],-110,306,46,{})}
function bankBld(x,cx,gy,s){x.save();x.translate(cx,gy);x.scale(s,s);x.fillStyle='#2c3444';x.fillRect(-260,-420,520,420);x.fillStyle='#3a4458';x.beginPath();x.moveTo(-300,-420);x.lineTo(0,-560);x.lineTo(300,-420);x.closePath();x.fill();
 x.fillStyle='#46506a';for(let i=0;i<4;i++)x.fillRect(-220+i*135,-380,50,380);pill(x,0,-470,220,60,14,C.gold);rich(x,[['البنك',C.ink]],0,-466,36,{});x.restore()}
function flowBox(x,cx,cy,w,txt,col,k){if(k<=0)return;x.save();x.globalAlpha=ease(k);x.translate(cx,cy);x.scale(lerp(.6,1,back(k)),lerp(.6,1,back(k)));pill(x,0,0,w,120,26,'rgba(0,0,0,.75)',col,5);rich(x,[[txt,C.paper]],0,4,46,{weight:900,maxW:w-40});x.restore()}
function arrowDown(x,cx,y0,y1,k,col){if(k<=0)return;x.save();x.strokeStyle=col;x.fillStyle=col;x.lineWidth=12;x.lineCap='round';const y=lerp(y0,y1,ease(k));x.beginPath();x.moveTo(cx,y0);x.lineTo(cx,y);x.stroke();x.beginPath();x.moveTo(cx-24,y-20);x.lineTo(cx,y+8);x.lineTo(cx+24,y-20);x.fill();x.restore()}
function stamp(x,cx,cy,k,txt,col,rot=-.18,w=560){if(k<=0)return;x.save();x.translate(cx,cy);x.rotate(rot);const s=lerp(2.6,1,easeIn(k));x.scale(s,s);x.globalAlpha=clamp(k*3);x.strokeStyle=col;x.lineWidth=14;x.beginPath();x.roundRect(-w/2,-80,w,160,18);x.stroke();rich(x,[[txt,col]],0,6,96,{});x.restore()}
function countUp(t,t0,d,to){return Math.round(to*ease(prog(t,t0,d))).toLocaleString('en-US')}
function tear(x,cx,cy,t,s=1){const k=(t*.8)%1;x.save();x.fillStyle=C.b;x.globalAlpha=1-k*.6;const y=cy+k*60*s;x.beginPath();x.moveTo(cx,y-16*s);x.quadraticCurveTo(cx+11*s,y,cx,y+7*s);x.quadraticCurveTo(cx-11*s,y,cx,y-16*s);x.fill();x.restore()}
const ME={ghutra:'#F7F4EE',checker:'#d23b3b'};
const S=[
// 0 HOOK: deposit SMS 80,000
{t0:b[0],t1:b[1],draw(x,lt){const n0=wd(0,4)-.05;x.fillStyle='#0a0d14';x.fillRect(0,0,W,H);const g=x.createRadialGradient(540,900,40,540,900,1000);g.addColorStop(0,'rgba(255,197,61,.22)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
 if(lt>n0){speedLines(x,540,900,lt,.18,C.gold);moneyRain(x,lt,n0,30,9,3)}
 const[sx,sy]=shake(lt,n0,.5,26);const z=lerp(1.25,1,ease(prog(lt,0,.6)));
 bigPhone(x,540+sx,950+sy,z*1.15,lerp(.12,-.03,ease(prog(lt,0,.6))),(x)=>bankSms(x,lt>n0?countUp(lt,n0,.7,80000):'••••',prog(lt,wd(0,2)-.1,.3)),lt<wd(0,2)?lt:0);
 popIn(x,lt,.05,lt>n0?n0+.5:null,()=>rich(x,[['وصلتني رسالة… 📩',C.paper]],540,260,74,{stroke:14}),{cy:260});
 if(lt>n0){const k=prog(lt,n0+.6,.2);x.save();x.translate(540,250);x.rotate(-.04);x.scale(lerp(2.2,1,easeIn(k)),lerp(2.2,1,easeIn(k)));x.globalAlpha=clamp(k*3);pill(x,0,0,700,170,28,C.gold);rich(x,[['80,000 ريال!',C.ink]],0,8,96,{});x.restore()}
 vignette(x,.7)}},
// 1 UNKNOWN SENDER
{t0:b[1],t1:b[2],draw(x,lt){const d=b[2]-b[1];x.save();cam(x,{z:lerp(1.15,1.25,lt/d),x:540,y:1150});bgRoom(x,lt,0);
 drawStick(x,{...BASE,...ME,...P.phone,x:540,y:1340,ground:1520,s:1.15,face:'worried',look:.3,head:-10},lt);x.restore();
 popIn(x,lt,.1,null,()=>{pill(x,540,330,720,120,30,'rgba(0,0,0,.75)',C.b,5);rich(x,[['من: حساب غير معروف ❓',C.b]],540,334,50,{weight:900})},{cy:330});
 [['؟',300,700],['؟',780,640],['؟',840,860]].forEach(([q,px,py],i)=>popIn(x,lt,.3+i*.2,null,()=>rich(x,[[q,C.gold]],px,py+Math.sin(lt*3+i)*14,110,{stroke:10}),{cy:py}));
 popIn(x,lt,rel(1,1)+.5,null,()=>{pill(x,540,1760,640,100,50,'rgba(0,0,0,.75)');rich(x,[['وما أنتظر أي فلوس 🤔',C.paper]],540,1764,50,{weight:800})},{cy:1760});
 vignette(x,.75)}},
// 2 ONE HOUR LATER: unknown call
{t0:b[2],t1:b[3],draw(x,lt){const d=b[3]-b[2],ring=wd(2,2)-b[2]-.05;x.fillStyle='#0a0d14';x.fillRect(0,0,W,H);
 if(lt<ring){x.fillStyle='#000';x.fillRect(0,0,W,H);const k=ease(prog(lt,0,.4));rich(x,[['⏰',C.paper]],540,820,200,{});x.save();x.globalAlpha=k;rich(x,[['بعد ساعة…',C.paper]],540,1100,96,{stroke:12});x.restore()}
 else{const ll=lt-ring;const g=x.createRadialGradient(540,900,40,540,900,900);g.addColorStop(0,'rgba(61,220,132,.2)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
  bigPhone(x,540,980,1.05,0,(x)=>callScreen(x,ll,'05X XXX XXXX','رقم غير محفوظ'),ll+.01);
  if(ll<.12){x.fillStyle='#fff';x.globalAlpha=.6*(1-ll/.12);x.fillRect(0,0,W,H);x.globalAlpha=1}
  popIn(x,ll,.05,null,()=>{x.save();x.translate(540,280);x.rotate(-.04);pill(x,0,0,540,140,26,C.red);rich(x,[['رقم غريب 📞',C.paper]],0,6,72,{});x.restore()},{cy:280,from:1.8,d:.2})}
 vignette(x,.75)}},
// 3 THE CRYING CALLER
{t0:b[3],t1:b[4],draw(x,lt){const d=b[4]-b[3],s4=rel(4,3);x.save();cam(x,{z:1.0,x:540,y:960});
 x.fillStyle='#10131b';x.fillRect(0,0,W,960);x.fillStyle='#1b1316';x.fillRect(0,960,W,960);
 // top: you on phone
 x.save();x.beginPath();x.rect(0,0,W,950);x.clip();x.translate(0,-520);bgRoom(x,lt,0);drawStick(x,{...BASE,...ME,...P.phone,x:420,y:1340,ground:1520,s:1.1,face:'worried',look:.5},lt);x.restore();
 // bottom: caller crying (hospital vibe)
 x.save();x.beginPath();x.rect(0,970,W,950);x.clip();x.fillStyle='#e8eef2';x.globalAlpha=.06;for(let i=0;i<8;i++)x.fillRect(i*150,970,70,950);x.globalAlpha=1;
 x.fillStyle=C.red;x.fillRect(830,1060,120,40);x.fillRect(870,1020,40,120);
 const c=drawStick(x,{...BASE,...CALLER,...P.phone,rot:6,head:16,x:560,y:1380,ground:1560,s:1.0,face:'sad',look:-.4,sweat:true},lt);tear(x,555,1170,lt,2);x.restore();
 x.fillStyle=C.gold;x.fillRect(0,955,W,10);x.restore();
 popIn(x,lt,.1,null,()=>{pill(x,540,250,520,90,45,'rgba(0,0,0,.75)');rich(x,[['كان يبكي 😢',C.paper]],540,254,48,{weight:900})},{cy:250});
 popIn(x,lt,wd(3,2)-b[3],null,()=>{pill(x,540,800,780,120,30,'rgba(0,0,0,.8)',C.b,5);rich(x,[['«حوّلتها لك بالغلط…»',C.b]],540,804,54,{weight:900})},{cy:800});
 popIn(x,lt,s4,null,()=>{pill(x,540,1880-0,860,10,0,'rgba(0,0,0,0)');x.save();x.translate(540,1120);x.rotate(-.03);pill(x,0,0,800,140,28,C.red);rich(x,[['فلوس عملية أمي 🏥',C.paper]],0,6,64,{});x.restore()},{cy:1120,from:1.6,d:.22});
 }},
// 4 FRIEND: don't do it!
{t0:b[4],t1:b[5],draw(x,lt){const d=b[5]-b[4],st=wd(5,5)-b[4]-.05;const[sx,sy]=shake(lt,st,.45,30);x.save();x.translate(sx,sy);cam(x,{z:lerp(1.1,1.2,lt/d),x:540,y:1150});bgRoom(x,lt,0);
 drawStick(x,{...BASE,...ME,...(lt<st?P.phone:P.shock),x:380,y:1340,ground:1520,s:1.1,face:lt<st?'worried':'shock',look:1},lt);
 const fx_=lerp(1200,740,ease(prog(lt,.6,.5)));drawStick(x,{...BASE,...FRIEND,...(lt<st?walkPose(lt*9,-1):P.handsUp),x:fx_,y:1340,ground:1520,s:1.1,face:lt<st?'worried':'angry',look:-1},lt);x.restore();
 popIn(x,lt,.05,null,()=>{pill(x,540,280,560,100,50,'rgba(0,0,0,.75)');rich(x,[['وقبل أحوّل…',C.paper]],540,284,52,{weight:800})},{cy:280});
 if(lt>st){x.fillStyle=`rgba(255,59,48,${.25*(1-prog(lt,st,.4))})`;x.fillRect(0,0,W,H);stamp(x,540,520,prog(lt,st,.16),'⚠️ لا تسويها!',C.red,-.06,760)}
 vignette(x,.75)}},
// 5 THE SCAM EXPLAINED
{t0:b[5],t1:b[6],draw(x,lt){const d=b[6]-b[5],w=i=>wd(6,i)-b[5],m2=wd(7,4)-b[5];x.fillStyle='#120b0d';x.fillRect(0,0,W,H);const g=x.createRadialGradient(540,900,40,540,900,900);g.addColorStop(0,'rgba(255,59,48,.2)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
 popIn(x,lt,.02,null,()=>{rich(x,[['حيلة ',C.paper],['نصّابين',C.red],[' 🚨',C.paper]],540,260,92,{stroke:14})},{cy:260});
 flowBox(x,540,520,800,'1) يحوّل لك 80,000',C.gold,prog(lt,.35,.3));arrowDown(x,540,590,700,prog(lt,w(2),.3),C.gold);
 flowBox(x,540,780,800,'2) يطلب ترجعها لحساب ثاني',C.b,prog(lt,w(4),.3));arrowDown(x,540,850,960,prog(lt,w(4)+.3,.3),C.b);
 const s7=rel(7,5);flowBox(x,540,1040,800,'3) البنك يسحبها منك 🏦',C.red,prog(lt,s7+.3,.3));
 if(lt>m2){stamp(x,540,1390,prog(lt,m2,.16),'تدفع مرتين ×2',C.red,-.08,700);const[sx,sy]=shake(lt,m2,.4,20)}
 popIn(x,lt,s7+.6,null,()=>{pill(x,540,1190,760,96,48,'rgba(0,0,0,.75)');rich(x,[['−80,000  و  −80,000',C.red]],540,1194,50,{weight:900})},{cy:1190});
 vignette(x,.75)}},
// 6 OUTRO VOTE
{t0:b[6],t1:b[7],draw(x,lt){const zz=1+.02*Math.sin(lt*1.3);x.save();x.translate(540,960);x.scale(zz,zz);x.translate(-540,-960);
 outroSplit(x,lt,'وش بتسوي؟','ترجّعها له فوراً','عن طريق البنك بس 🏦',
 (x,t,y0,h)=>{const gy=y0+h-40;drawStick(x,{...BASE,...ME,...P.phone,x:320,y:gy-200,ground:gy,s:.8,face:'worried',look:1},t);x.save();x.strokeStyle=C.a;x.lineWidth=12;x.setLineDash([24,18]);x.lineDashOffset=-t*120;x.beginPath();x.moveTo(400,gy-260);x.quadraticCurveTo(540,gy-420,690,gy-260);x.stroke();x.restore();rich(x,[['80,000',C.gold]],545,gy-380,44,{weight:900});drawStick(x,{...BASE,...CALLER,...P.phone,x:760,y:gy-200,ground:gy,s:.8,face:'happy',look:-1},t)},
 (x,t,y0,h)=>{const gy=y0+h-40;bankBld(x,720,gy,.62);drawStick(x,{...BASE,...ME,...P.armsCross,x:330,y:gy-200,ground:gy,s:.8,face:'sly',look:1},t);x.save();x.font='900 70px Cairo';x.textAlign='center';x.fillText('🛡️',460,y0+230+Math.sin(t*4)*10);x.restore()});
 x.restore();
 const aS=Ls(9)-b[6],aE=Le(9)-b[6],bS=Ls(10)-b[6],bE=Le(10)-b[6];
 const hl=(y0,col,s0,e0)=>{if(lt<s0||lt>e0+.2)return;const k=ease(prog(lt,s0,.25))*(1-prog(lt,e0,.2));const oth=y0===420?1020:420;
  x.save();x.globalAlpha=.55*k;x.fillStyle='#000';x.beginPath();x.roundRect(50,oth,980,560,40);x.fill();x.restore();
  x.save();x.globalAlpha=k*(.7+.3*Math.sin(lt*10));x.shadowColor=col;x.shadowBlur=50;x.strokeStyle=col;x.lineWidth=16;x.beginPath();x.roundRect(46,y0-4,988,568,44);x.stroke();x.restore();
  if(lt-s0<.3){const q=1-(lt-s0)/.3;x.save();x.globalAlpha=.35*q;x.fillStyle=col;x.fillRect(0,0,W,H);x.restore()}};
 hl(420,C.a,aS,aE);hl(1020,C.b,bS,bE);
 const fk=rel(11,6);if(lt>fk)popIn(x,lt,fk,null,()=>{pill(x,540,1850,880,84,42,C.gold);rich(x,[['اكتب حرفك… والجزء الثاني بكرة 🔔',C.ink]],540,1854,42,{weight:900})},{cy:1850})}}
];
const T=[{at:b[1],dur:.3,type:'whip'},{at:b[2],dur:.3,type:'flash'},{at:b[3],dur:.35,type:'zoom'},{at:b[4],dur:.3,type:'whipL'},{at:b[5],dur:.3,type:'glitch'},{at:b[6],dur:.5,type:'circle',col:C.a}];
boot(S,T,(x,t)=>{if(t<b[6]){if(t>b[1])hud(x,t,'قرارك');captions(x,t)}grain(x,t,.06)});
