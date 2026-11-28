// ===== Qararak ep09: «الورث» standalone =====
const END=TIMING.duration;
const b=[0,Ls(1)-.05,Ls(2)-.05,Ls(3)-.05,Ls(4)-.05,Ls(5)-.05,Ls(6)-.05,END+0.01];
const rel=(i,k)=>Ls(i)-b[k];
const wd=(i,k)=>TIMING.lines[i].words[Math.min(k,TIMING.lines[i].words.length-1)].s;
const BRO={col:'#e8d9c9',ghutra:'#e6e1d7'};
const SIS={col:'#f0c9d6'};
const LAWYER={tie:C.gold,glasses:true,col:'#DDE3EA'};
function house(x,cx,gy,s,glow=0){x.save();x.translate(cx,gy);x.scale(s,s);
 if(glow){x.shadowColor=`rgba(255,197,61,${glow})`;x.shadowBlur=80}
 x.fillStyle='#e8dcc4';x.fillRect(-300,-380,600,380);x.shadowBlur=0;
 x.fillStyle='#c9b48e';x.fillRect(-320,-400,640,30);for(let i=0;i<9;i++){x.fillRect(-310+i*76,-430,40,30)}
 x.fillStyle='#6b4a2c';x.beginPath();x.roundRect(-60,-200,120,200,[60,60,0,0]);x.fill();
 x.fillStyle='#1b2a3a';[[-220,-300],[150,-300],[-220,-170],[150,-170]].forEach(([wx,wy])=>{x.fillRect(wx,wy,70,80);x.fillStyle=`rgba(255,200,110,${.5+.2*Math.sin(wx)})`;x.fillRect(wx+6,wy+6,58,68);x.fillStyle='#1b2a3a'});
 x.fillStyle='#3c6e47';x.beginPath();x.arc(-380,-80,70,0,7);x.arc(380,-90,80,0,7);x.fill();x.fillStyle='#5a3a20';x.fillRect(-390,-30,20,30);x.fillRect(370,-30,20,30);x.restore()}
function deed(x,cx,cy,sc,rot,k,stampK){x.save();x.translate(cx,cy);x.rotate(rot);x.scale(sc,sc);x.shadowColor='rgba(0,0,0,.6)';x.shadowBlur=50;x.fillStyle='#f3efe6';x.fillRect(-300,-380,600,760);x.shadowBlur=0;
 x.strokeStyle='#1d4f3a';x.lineWidth=10;x.strokeRect(-280,-360,560,720);x.fillStyle='#1d4f3a';x.fillRect(-280,-360,560,110);rich(x,[['صك ملكية',C.paper]],0,-302,60,{});
 rich(x,[['العقار: فيلا الأسرة',C.ink]],0,-190,38,{weight:800});
 rich(x,[['المالك: ',C.ink],['أنت',C.a]],0,-120,52,{weight:900});
 x.fillStyle='#c9c2b4';for(let i=0;i<4;i++)x.fillRect(-230,-50+i*46,460-(i%2)*90,14);
 rich(x,[['القيمة',C.muted]],0,170,30,{weight:800});rich(x,[[k,C.ink]],0,235,74,{});
 if(stampK>0){x.save();x.translate(150,300);x.rotate(-.22);const s=lerp(2.4,1,easeIn(stampK));x.scale(s,s);x.globalAlpha=clamp(stampK*3);x.strokeStyle=C.green;x.lineWidth=10;x.beginPath();x.arc(0,0,90,0,7);x.stroke();rich(x,[['مُفرَغ',C.green]],0,6,44,{});x.restore()}
 x.restore()}
function bigPhone(x,cx,cy,s,rot,screen,ring=0){x.save();x.translate(cx,cy);x.rotate(rot+(ring?Math.sin(ring*60)*.05:0));x.scale(s,s);
 x.shadowColor='rgba(255,90,31,.45)';x.shadowBlur=60;x.fillStyle='#0b0d12';x.beginPath();x.roundRect(-230,-460,460,920,60);x.fill();x.shadowBlur=0;
 x.save();x.beginPath();x.roundRect(-208,-436,416,872,44);x.clip();screen(x);x.restore();x.fillStyle='#000';x.beginPath();x.roundRect(-60,-422,120,30,15);x.fill();x.restore()}
function callScreen(x,t,name,sub){const g=x.createLinearGradient(0,-436,0,436);g.addColorStop(0,'#3a1d12');g.addColorStop(1,'#120b08');x.fillStyle=g;x.fillRect(-208,-436,416,872);
 rich(x,[[name,C.paper]],0,-240,44,{weight:900});rich(x,[[sub,C.muted]],0,-180,28,{weight:700});
 const pr=(t*1.4)%1;x.strokeStyle=`rgba(255,90,31,${1-pr})`;x.lineWidth=6;x.beginPath();x.arc(0,20,70+pr*90,0,7);x.stroke();x.fillStyle='#3a2a22';x.beginPath();x.arc(0,20,70,0,7);x.fill();rich(x,[['👤',C.paper]],0,28,64,{});
 x.fillStyle=C.red;x.beginPath();x.arc(-110,300,52,0,7);x.fill();x.fillStyle=C.green;x.beginPath();x.arc(110,300,52,0,7);x.fill();rich(x,[['📞',C.paper]],110,306,46,{});rich(x,[['📞',C.paper]],-110,306,46,{})}
function countUp(t,t0,d,to){return Math.round(to*ease(prog(t,t0,d))).toLocaleString('en-US')}
function bill2(x,cx,cy,rot,txt,col,k){if(k<=0)return;x.save();x.translate(cx,cy);x.rotate(rot);x.globalAlpha=clamp(k*2);const s=lerp(.5,1,back(k));x.scale(s,s);x.fillStyle='#f3efe6';x.fillRect(-120,-80,240,160);x.fillStyle=col;x.fillRect(-120,-80,240,40);rich(x,[[txt,col]],0,30,40,{});x.restore()}
function oldPaper(x,cx,cy,sc,rot,reveal,t){x.save();x.translate(cx,cy);x.rotate(rot);x.scale(sc,sc);x.shadowColor='rgba(0,0,0,.7)';x.shadowBlur=60;
 x.fillStyle='#e9dcb8';x.beginPath();x.moveTo(-320,-260);x.lineTo(300,-280);x.lineTo(330,250);x.lineTo(-300,270);x.closePath();x.fill();x.shadowBlur=0;
 x.strokeStyle='rgba(120,90,40,.25)';x.lineWidth=3;x.beginPath();x.moveTo(-320,0);x.lineTo(330,-10);x.moveTo(0,-280);x.lineTo(10,270);x.stroke();
 rich(x,[['يا ولدي…',C.ink]],120,-170,44,{weight:700});
 const msg='لا تعلّم إخوانك';x.save();x.beginPath();x.rect(-300,-90,600*clamp(reveal),200);x.rect(300-600*clamp(reveal),-90,600*clamp(reveal),200);x.restore();
 x.save();x.beginPath();x.rect(300-620*clamp(reveal),-100,640,220);x.clip();x.save();x.rotate(-.03);rich(x,[[msg,'#7a1a12']],0,20,92,{});x.restore();x.restore();
 x.fillStyle='rgba(122,26,18,.55)';x.fillRect(-200,160,400,6);rich(x,[['أبوك',C.ink]],-170,210,40,{weight:700});x.restore()}

const S=[
// 0 HOOK: deed in my name + 3,000,000
{t0:b[0],t1:b[1],draw(x,lt){x.fillStyle='#120d06';x.fillRect(0,0,W,H);const g=x.createRadialGradient(540,900,40,540,900,1000);g.addColorStop(0,'rgba(255,197,61,.32)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
 speedLines(x,540,900,lt+1,.16,C.gold);const[sx,sy]=shake(lt,0,.45,22);
 house(x,540,1560,.9,.5);
 const mil=wd(0,8)-b[0];const val=lt<mil-.1?'3,000,000':countUp(lt,mil-.1,.6,3000000);
 deed(x,540+sx,950+sy,lerp(1.15,.95,ease(prog(lt,0,.5))),-.04,val+' ريال',prog(lt,wd(0,4)-b[0],.18));
 x.save();x.translate(540,250);x.rotate(-.05);const k=prog(lt,0,.12);x.scale(lerp(1.4,1,ease(k)),lerp(1.4,1,ease(k)));pill(x,0,0,940,190,30,C.gold);rich(x,[['البيت باسمي… بس 😳',C.ink]],0,8,76,{maxW:880});x.restore();
 drawStick(x,{...BASE,...ME,...P.shock,x:900,y:1480,ground:1660,s:.7,face:'shock',look:-1},lt);
 if(lt>mil){burst(x,540,1185,lt,mil,26,C.gold,7,800,12)}
 vignette(x,.6)}},
// 1 BROTHERS DON'T KNOW
{t0:b[1],t1:b[2],draw(x,lt){const d=b[2]-b[1];x.save();cam(x,{z:lerp(1.05,1.15,lt/d),x:540,y:1150});bgRoom(x,lt,0);
 const xs=[170,370,710,910];xs.forEach((px,i)=>{drawStick(x,{...BASE,...(i==2?SIS:BRO),...P.stand,x:px,y:1300,ground:1480,s:.8,face:'neutral',look:i<2?1:-1},lt+i);
  popIn(x,lt,.25+i*.12,null,()=>rich(x,[['؟',C.b]],px,1010,90,{}),{cy:1010})});
 drawStick(x,{...BASE,...ME,...P.facepalm,x:540,y:1380,ground:1560,s:1.05,face:'worried',look:0,sweat:true},lt);x.restore();
 popIn(x,lt,.05,null,()=>{pill(x,540,300,820,130,30,'rgba(0,0,0,.82)',C.b,5);rich(x,[['إخواني الأربعة… ما يدرون 🤫',C.paper]],540,304,56,{weight:900})},{cy:300});
 vignette(x,.75)}},
// 2 LAWYER: legal
{t0:b[2],t1:b[3],draw(x,lt){const d=b[3]-b[2],tn=wd(2,4)-b[2];x.save();cam(x,{z:lerp(1.1,1.2,lt/d),x:540,y:1100});bgOffice(x,lt,'#161a22');
 drawStick(x,{...BASE,...LAWYER,...P.point,x:720,y:1180,ground:1380,s:1.05,face:'talk',look:-1},lt);deskFront(x,720,1500,520);
 drawStick(x,{...BASE,...ME,...P.stand,x:250,y:1340,ground:1520,s:1.05,face:'worried',look:1},lt);x.restore();
 popIn(x,lt,.05,null,()=>{pill(x,540,280,600,100,50,'rgba(0,0,0,.8)');rich(x,[['المحامي قال… ⚖️',C.paper]],540,284,50,{weight:800})},{cy:280});
 popIn(x,lt,.3,null,()=>{pill(x,540,430,800,120,28,'rgba(0,0,0,.8)',C.gold,5);rich(x,[['«الصك باسمك»',C.gold]],540,434,60,{weight:900})},{cy:430});
 if(lt>tn){const[sx,sy]=shake(lt,tn,.3,16);stamp(x,540+sx,620+sy,prog(lt,tn,.16),'محد له حق ✅',C.green,-.06,640)}
 vignette(x,.75)}},
// 3 SPLIT: brother debts / sister rent
{t0:b[3],t1:b[4],draw(x,lt){const d=b[4]-b[3],sp=wd(3,5)-b[3];
 x.fillStyle='#1a0f0f';x.fillRect(0,0,W,H);
 // top: brother + debts
 x.save();x.beginPath();x.rect(0,0,W,960);x.clip();const g1=x.createLinearGradient(0,0,0,960);g1.addColorStop(0,'#2a1010');g1.addColorStop(1,'#140808');x.fillStyle=g1;x.fillRect(0,0,W,960);
 drawStick(x,{...BASE,...BRO,...P.sad,x:340,y:700,ground:880,s:.95,face:'sad',look:.5,sweat:true},lt);
 ['-120,000','-85,000','-200,000'].forEach((v,i)=>bill2(x,700+i*90,430+i*130,(i-1)*.15,v,C.red,prog(lt,.2+i*.25,.3)));
 pill(x,540,260,620,100,30,'rgba(0,0,0,.8)',C.red,5);rich(x,[['أخوي: غرقان بالديون 💸',C.paper]],540,264,46,{weight:900});x.restore();
 // bottom: sister + kids + rent
 const k2=prog(lt,sp-.1,.35);x.save();x.beginPath();x.rect(0,960,W,960);x.clip();x.translate(lerp(W,0,ease(k2)),0);const g2=x.createLinearGradient(0,960,0,H);g2.addColorStop(0,'#101a2a');g2.addColorStop(1,'#080c14');x.fillStyle=g2;x.fillRect(0,960,W,960);
 drawStick(x,{...BASE,...SIS,...P.sad,x:800,y:1520,ground:1700,s:.95,face:'sad',look:-.4},lt);
 drawStick(x,{...BASE,...KID,...P.stand,x:930,y:1600,ground:1700,s:.5,face:'worried',look:-1},lt);drawStick(x,{...BASE,...KID,...P.stand,x:1010,y:1610,ground:1700,s:.44,face:'sad',look:-1},lt+1);
 x.save();x.translate(240,1450);x.rotate(-.06);pill(x,0,0,300,130,16,'#f3efe6',C.b,6);rich(x,[['للإيجار',C.ink]],0,-12,46,{});rich(x,[['3,500 / شهر',C.red]],0,40,32,{weight:800});x.restore();
 pill(x,540,1070,700,100,30,'rgba(0,0,0,.8)',C.b,5);rich(x,[['أختي: بالإيجار مع عيالها 🏚️',C.paper]],540,1074,46,{weight:900});x.restore();
 x.fillStyle=C.gold;x.fillRect(0,955,W*ease(prog(lt,0,.4)),10);
 vignette(x,.6)}},
// 4 LETTER: father's handwriting
{t0:b[4],t1:b[5],draw(x,lt){const d=b[5]-b[4],rv=wd(4,6)-b[4];x.fillStyle='#0c0905';x.fillRect(0,0,W,H);
 const fl=.85+.15*Math.sin(lt*9)*Math.sin(lt*3.1);const g=x.createRadialGradient(540,1000,60,540,1000,900);g.addColorStop(0,`rgba(255,170,70,${.35*fl})`);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
 const[sx,sy]=lt>rv?shake(lt,rv,.4,14):[0,0];
 oldPaper(x,540+sx,1000+sy,lerp(.9,1.25,ease(lt/d)),.04,prog(lt,rv,.9),lt);
 popIn(x,lt,.05,null,()=>{pill(x,540,300,760,120,30,'rgba(0,0,0,.85)',C.gold,5);rich(x,[['لقيت ورقة بخط أبوي… ✉️',C.paper]],540,304,52,{weight:900})},{cy:300});
 if(lt>rv&&lt-rv<.3){x.fillStyle=`rgba(255,59,48,${.25*(1-(lt-rv)/.3)})`;x.fillRect(0,0,W,H)}
 vignette(x,.8)}},
// 5 CALL: brother calls tonight
{t0:b[5],t1:b[6],draw(x,lt){const d=b[6]-b[5],tq=wd(5,4)-b[5];x.save();cam(x,{z:lerp(1.0,1.12,lt/d),x:540,y:1100});bgNight(x,lt,{seed:9});x.restore();
 bigPhone(x,540,800,lerp(.8,.92,ease(lt/d)),.04,(x)=>callScreen(x,lt,'أخوي الكبير','يتصل الحين…'),lt<tq?lt:0);
 drawStick(x,{...BASE,...ME,...P.think,x:930,y:1640,ground:1790,s:.6,face:'worried',look:-1,sweat:true},lt);
 popIn(x,lt,.05,null,()=>{pill(x,540,230,600,100,50,'rgba(0,0,0,.8)');rich(x,[['والليلة… 🌙',C.paper]],540,234,52,{weight:900})},{cy:230});
 if(lt>tq){const[sx,sy]=shake(lt,tq,.35,18);x.save();x.translate(540+sx,1340+sy);x.rotate(-.03);const k=prog(lt,tq,.2);x.scale(lerp(1.6,1,ease(k)),lerp(1.6,1,ease(k)));pill(x,0,0,860,140,30,C.a);rich(x,[['«تعال نقسم الورث»',C.ink]],0,6,66,{});x.restore()}
 vignette(x,.7)}},
// 6 OUTRO VOTE
{t0:b[6],t1:b[7],draw(x,lt){const zz=1+.02*Math.sin(lt*1.3);x.save();x.translate(540,960);x.scale(zz,zz);x.translate(-540,-960);
 outroSplit(x,lt,'وش بتسوي؟','تعلّمهم وتقسم البيت','تسكت وتاخذ البيت',
 (x,t,y0,h)=>{const gy=y0+h-40;[250,400,680,830].forEach((px,i)=>drawStick(x,{...BASE,...(i==2?SIS:BRO),...P.celebrate,x:px,y:gy-150,ground:gy,s:.55,face:'happy',look:i<2?1:-1},t+i));house(x,540,gy-20,.38,0);drawStick(x,{...BASE,...ME,...P.holdOut,x:540,y:gy-170,ground:gy,s:.62,face:'happy',look:0},t)},
 (x,t,y0,h)=>{const gy=y0+h-40;house(x,700,gy,.55,.6);drawStick(x,{...BASE,...ME,...P.zipPose||P.sly,x:330,y:gy-200,ground:gy,s:.8,face:'zip',look:1},t);x.save();x.font='900 70px Cairo';x.textAlign='center';x.fillText('🤫',460,y0+230+Math.sin(t*4)*10);x.restore()});
 x.restore();
 const aS=Ls(7)-b[6],aE=Le(7)-b[6],bS=Ls(8)-b[6],bE=Le(8)-b[6];
 const hl=(y0,col,s0,e0)=>{if(lt<s0||lt>e0+.2)return;const k=ease(prog(lt,s0,.25))*(1-prog(lt,e0,.2));const oth=y0===420?1020:420;
  x.save();x.globalAlpha=.55*k;x.fillStyle='#000';x.beginPath();x.roundRect(50,oth,980,560,40);x.fill();x.restore();
  x.save();x.globalAlpha=k*(.7+.3*Math.sin(lt*10));x.shadowColor=col;x.shadowBlur=50;x.strokeStyle=col;x.lineWidth=16;x.beginPath();x.roundRect(46,y0-4,988,568,44);x.stroke();x.restore();
  if(lt-s0<.3){const q=1-(lt-s0)/.3;x.save();x.globalAlpha=.35*q;x.fillStyle=col;x.fillRect(0,0,W,H);x.restore()}};
 hl(420,C.a,aS,aE);hl(1020,C.b,bS,bE);
 const fk=rel(9,6);if(lt>fk)popIn(x,lt,fk,null,()=>{pill(x,540,1850,920,84,42,C.gold);rich(x,[['اكتب حرفك… وأرسلها لأحد عنده إخوان 🔁',C.ink]],540,1854,40,{weight:900})},{cy:1850})}}
];
const T=[{at:b[1],dur:.3,type:'whip'},{at:b[2],dur:.3,type:'zoom'},{at:b[3],dur:.3,type:'whipL'},{at:b[4],dur:.4,type:'flash'},{at:b[5],dur:.3,type:'zoom'},{at:b[6],dur:.5,type:'circle',col:C.a}];
boot(S,T,(x,t)=>{if(t<b[6]){if(t>b[1])hud(x,t,'قرارك');captions(x,t)}grain(x,t,.06)});
