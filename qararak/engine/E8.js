// ===== Qararak ep08: «الحوالة الغلط» part 2 «طلع صادق!» =====
const END=TIMING.duration;
const b=[0,Ls(1)-.05,Ls(2)-.05,Ls(3)-.05,Ls(5)-.05,Ls(6)-.05,END+0.01];
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

const CLERK={tie:C.b,glasses:true,col:'#DDE3EA'};
function calendar(x,cx,cy,sc,n,k){x.save();x.translate(cx,cy);x.scale(sc*lerp(.6,1,back(k)),sc*lerp(.6,1,back(k)));x.globalAlpha=clamp(k*2);x.fillStyle='#f3efe6';x.beginPath();x.roundRect(-200,-220,400,440,30);x.fill();x.fillStyle=C.red;x.beginPath();x.roundRect(-200,-220,400,110,[30,30,0,0]);x.fill();
 rich(x,[['أيام',C.paper]],0,-165,52,{});rich(x,[[String(n),C.ink]],0,60,200,{});x.fillStyle='#555';x.fillRect(-120,-240,18,60);x.fillRect(102,-240,18,60);x.restore()}
function hospital(x,t){x.fillStyle='#0e1418';x.fillRect(0,0,W,H);x.fillStyle='#e8eef2';x.globalAlpha=.06;for(let i=0;i<8;i++)x.fillRect(i*150,0,70,H);x.globalAlpha=1;
 x.fillStyle=C.red;x.fillRect(860,380,120,40);x.fillRect(900,340,40,120);
 const p=(t*1.3)%1;x.strokeStyle=C.green;x.lineWidth=6;x.beginPath();for(let i=0;i<=40;i++){const px=100+i*16,py=560+(i%10===5?-80:i%10===6?60:0);i?x.lineTo(px,py):x.moveTo(px,py)}x.stroke();x.fillStyle='rgba(14,20,24,.85)';x.fillRect(100+p*640,480,760-p*640,160)}
const S=[
// 0 HOOK: honest! verified
{t0:b[0],t1:b[1],draw(x,lt){x.fillStyle='#07130d';x.fillRect(0,0,W,H);const g=x.createRadialGradient(540,950,40,540,950,1000);g.addColorStop(0,'rgba(61,220,132,.3)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
 speedLines(x,540,950,lt+1,.18,C.green);const[sx,sy]=shake(lt,0,.45,24);
 bigPhone(x,540+sx,1050+sy,lerp(1.1,1,ease(prog(lt,0,.5))),-.03,(x)=>{bankSms(x,'80,000',1,'أبو سلطان');x.save();x.translate(0,120);pill(x,0,0,360,90,45,C.green);rich(x,[['✅ حوالة حقيقية',C.ink]],0,4,40,{});x.restore()},0);
 x.save();x.translate(540,300);x.rotate(-.05);const k=prog(lt,0,.12);x.scale(lerp(1.4,1,ease(k)),lerp(1.4,1,ease(k)));pill(x,0,0,760,200,30,C.green);rich(x,[['طلع صادق! 😳',C.ink]],0,10,110,{});x.restore();
 drawStick(x,{...BASE,...ME,...P.shock,x:900,y:1300,ground:1480,s:.72,face:'shock',look:-1},lt);
 vignette(x,.6)}},
// 1 RECAP: you chose the bank
{t0:b[1],t1:b[2],draw(x,lt){const d=b[2]-b[1];x.save();cam(x,{z:lerp(1.05,1.15,lt/d),x:540,y:1150});bgRoom(x,lt,0);bankBld(x,700,1520,1.0);
 drawStick(x,{...BASE,...ME,...walkPose(lt*8,1),x:lerp(150,360,lt/d),y:1340,ground:1520,s:1.05,face:'neutral',look:1},lt);x.restore();
 popIn(x,lt,.05,null,()=>{pill(x,540,300,780,120,30,'rgba(0,0,0,.8)',C.gold,5);rich(x,[['80,000 وصلتني بالغلط 💸',C.gold]],540,304,54,{weight:900})},{cy:300});
 popIn(x,lt,wd(1,3)-b[1],null,()=>{x.save();x.translate(540,470);x.rotate(-.03);pill(x,0,0,700,120,28,C.b);rich(x,[['اخترتوا B: البنك 🏦',C.ink]],0,6,58,{});x.restore()},{cy:470,from:1.6,d:.22});
 vignette(x,.75)}},
// 2 CLERK: 10 days
{t0:b[2],t1:b[3],draw(x,lt){const d=b[3]-b[2],tn=wd(2,5)-b[2];x.save();cam(x,{z:lerp(1.1,1.2,lt/d),x:540,y:1100});bgOffice(x,lt,'#161a22');
 drawStick(x,{...BASE,...CLERK,...P.holdOut,x:700,y:1180,ground:1380,s:1.05,face:'neutral',look:-1},lt);deskFront(x,700,1500,520);
 drawStick(x,{...BASE,...ME,...(lt<tn?P.stand:P.shock),x:260,y:1340,ground:1520,s:1.05,face:lt<tn?'worried':'shock',look:1},lt);x.restore();
 popIn(x,lt,.05,null,()=>{pill(x,540,280,640,100,50,'rgba(0,0,0,.8)');rich(x,[['موظف البنك قال…',C.paper]],540,284,50,{weight:800})},{cy:280});
 if(lt>tn){const k=prog(lt,tn,.25);calendar(x,540,640,1,10,k);const[sx,sy]=shake(lt,tn,.35,18);stamp(x,540+sx,920+sy,prog(lt,tn+.25,.16),'⏳ 10 أيام',C.red,-.06,560)}
 vignette(x,.75)}},
// 3 CALLER: surgery tomorrow, must pay today
{t0:b[3],t1:b[4],draw(x,lt){const d=b[4]-b[3],s4=rel(4,3),pay=wd(4,4)-b[3];hospital(x,lt);
 x.save();cam(x,{z:lerp(1.0,1.1,lt/d),x:540,y:1150});const c=drawStick(x,{...BASE,...CALLER,...P.phone,rot:6,head:16,x:520,y:1360,ground:1540,s:1.1,face:'sad',look:-.4,sweat:true},lt);tear(x,515,1130,lt,2);x.restore();
 popIn(x,lt,.05,null,()=>{pill(x,540,250,560,100,50,'rgba(0,0,0,.8)');rich(x,[['اتصل يبكي 😢',C.paper]],540,254,52,{weight:900})},{cy:250});
 popIn(x,lt,wd(3,3)-b[3],null,()=>{x.save();x.translate(540,430);x.rotate(-.03);pill(x,0,0,820,130,28,C.red);rich(x,[['العملية بكرة الصبح 🏥',C.paper]],0,6,60,{});x.restore()},{cy:430,from:1.6,d:.22});
 if(lt>pay){stamp(x,540,660,prog(lt,pay,.16),'لازم يدفع اليوم!',C.gold,-.06,760);if(lt-pay<.3){x.fillStyle=`rgba(255,197,61,${.25*(1-(lt-pay)/.3)})`;x.fillRect(0,0,W,H)}}
 vignette(x,.7)}},
// 4 FRIEND: not your problem
{t0:b[4],t1:b[5],draw(x,lt){const d=b[5]-b[4];x.save();cam(x,{z:lerp(1.1,1.2,lt/d),x:540,y:1150});bgRoom(x,lt,0);
 drawStick(x,{...BASE,...ME,...P.phone,x:380,y:1340,ground:1520,s:1.1,face:'worried',look:1},lt);
 drawStick(x,{...BASE,...FRIEND,...P.shrug,x:740,y:1340,ground:1520,s:1.1,face:'sly',look:-1},lt);x.restore();
 popIn(x,lt,.05,null,()=>{pill(x,540,280,560,100,50,'rgba(0,0,0,.8)');rich(x,[['وصديقي يقول…',C.paper]],540,284,52,{weight:800})},{cy:280});
 popIn(x,lt,wd(5,3)-b[4],null,()=>{pill(x,540,500,800,130,30,'rgba(0,0,0,.8)',C.b,5);rich(x,[['«مو مسؤوليتك 🤷»',C.b]],540,504,64,{weight:900})},{cy:500});
 vignette(x,.75)}},
// 5 OUTRO VOTE
{t0:b[5],t1:b[6],draw(x,lt){const zz=1+.02*Math.sin(lt*1.3);x.save();x.translate(540,960);x.scale(zz,zz);x.translate(-540,-960);
 outroSplit(x,lt,'وش بتسوي؟','تحوّل له من جيبك الحين','تلتزم بالبنك… 10 أيام',
 (x,t,y0,h)=>{const gy=y0+h-40;drawStick(x,{...BASE,...ME,...P.phone,x:320,y:gy-200,ground:gy,s:.8,face:'worried',look:1},t);x.save();x.strokeStyle=C.a;x.lineWidth=12;x.setLineDash([24,18]);x.lineDashOffset=-t*120;x.beginPath();x.moveTo(400,gy-260);x.quadraticCurveTo(540,gy-420,690,gy-260);x.stroke();x.restore();rich(x,[['80,000',C.gold]],545,gy-380,44,{weight:900});drawStick(x,{...BASE,...CALLER,...P.phone,x:760,y:gy-200,ground:gy,s:.8,face:'sad',look:-1},t)},
 (x,t,y0,h)=>{const gy=y0+h-40;bankBld(x,720,gy,.62);drawStick(x,{...BASE,...ME,...P.armsCross,x:330,y:gy-200,ground:gy,s:.8,face:'neutral',look:1},t);x.save();x.font='900 70px Cairo';x.textAlign='center';x.fillText('⏳',460,y0+230+Math.sin(t*4)*10);x.restore()});
 x.restore();
 const aS=Ls(7)-b[5],aE=Le(7)-b[5],bS=Ls(8)-b[5],bE=Le(8)-b[5];
 const hl=(y0,col,s0,e0)=>{if(lt<s0||lt>e0+.2)return;const k=ease(prog(lt,s0,.25))*(1-prog(lt,e0,.2));const oth=y0===420?1020:420;
  x.save();x.globalAlpha=.55*k;x.fillStyle='#000';x.beginPath();x.roundRect(50,oth,980,560,40);x.fill();x.restore();
  x.save();x.globalAlpha=k*(.7+.3*Math.sin(lt*10));x.shadowColor=col;x.shadowBlur=50;x.strokeStyle=col;x.lineWidth=16;x.beginPath();x.roundRect(46,y0-4,988,568,44);x.stroke();x.restore();
  if(lt-s0<.3){const q=1-(lt-s0)/.3;x.save();x.globalAlpha=.35*q;x.fillStyle=col;x.fillRect(0,0,W,H);x.restore()}};
 hl(420,C.a,aS,aE);hl(1020,C.b,bS,bE);
 const fk=rel(9,5);if(lt>fk)popIn(x,lt,fk,null,()=>{pill(x,540,1850,900,84,42,C.gold);rich(x,[['اكتب حرفك… وأرسلها لأحد لازم يعرف 🔁',C.ink]],540,1854,40,{weight:900})},{cy:1850})}}
];
const T=[{at:b[1],dur:.3,type:'whip'},{at:b[2],dur:.3,type:'zoom'},{at:b[3],dur:.35,type:'flash'},{at:b[4],dur:.3,type:'whipL'},{at:b[5],dur:.5,type:'circle',col:C.a}];
boot(S,T,(x,t)=>{if(t<b[5]){if(t>b[1])hud(x,t,'قرارك');captions(x,t)}grain(x,t,.06)});
