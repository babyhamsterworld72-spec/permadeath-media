// ===== Qararak ep04: «القضية» (public part 3, standalone-friendly) =====
KEY=['فضحته','قضية!','عشرة','آلاف…','كاميرا','درجه.','اعرضه','الكبيرة.','كلها.','الباب.','مفصول.','يومين…','تشهير…','محامي…','صح.','طريقين.','A:','B:','ريال،','القاضي.'];
const ME={ghutra:'#F7F4EE',checker:'#d23b3b'};
const BOSS={tie:C.red,glasses:true,col:'#ECE6DC'};
const LAW={tie:C.b,glasses:true,col:'#DDE3EA'};
const COW=(i)=>({col:['#cfc9bf','#bdb7ad','#d8d2c8','#c4beb4','#cbc5bb'][i%5],ghutra:i%2?'#e6e1d7':null,glasses:i===2});
function bishtProp(x,j,p){const s=p.s;x.save();x.fillStyle='#2b1d12';x.strokeStyle=C.gold;x.lineWidth=6*s;
 x.beginPath();x.moveTo(j.sh[0]-34*s,j.sh[1]);x.lineTo(j.sh[0]+34*s,j.sh[1]);x.lineTo(j.hip[0]+70*s,j.hip[1]+70*s);x.lineTo(j.hip[0]-70*s,j.hip[1]+70*s);x.closePath();x.fill();
 x.beginPath();x.moveTo(j.sh[0]-30*s,j.sh[1]);x.lineTo(j.hip[0]-62*s,j.hip[1]+66*s);x.moveTo(j.sh[0]+30*s,j.sh[1]);x.lineTo(j.hip[0]+62*s,j.hip[1]+66*s);x.stroke();x.restore()}
const OWN={ghutra:'#F7F4EE',col:'#EFE6D2',prop:bishtProp,propBack:true};
const END=TIMING.duration;
const b=[0,Ls(1)-.05,Ls(3)-.05,Ls(4)-.05,Ls(6)-.05,Ls(8)-.05,Ls(9)-.05,Ls(11)-.05,Ls(13)-.05,END+0.01];
const rel=(i,k)=>Ls(i)-b[k];
const wd=(i,k)=>TIMING.lines[i].words[k].s;
// ---------- props ----------
function cash(x,cx,cy,sc,rot=0,label='10,000'){x.save();x.translate(cx,cy);x.rotate(rot);x.scale(sc,sc);for(let i=0;i<5;i++){x.fillStyle=i%2?'#5fae6a':'#6cbb76';x.fillRect(-60,-30-i*7,120,56)}x.fillStyle='#e9d9a8';x.fillRect(-12,-62,24,60);x.fillStyle='#2e6b37';x.font='900 24px Cairo';x.textAlign='center';x.textBaseline='middle';x.fillText(label,0,-34);x.restore()}
function deskFront(x,cx,gy,w=520){x.fillStyle='#3a2a1c';x.fillRect(cx-w/2,gy-300,w,40);x.fillStyle='#2c2016';x.fillRect(cx-w/2+20,gy-260,w-40,260);x.fillStyle='#3d2c1e';x.fillRect(cx+w/2-200,gy-230,160,70);x.fillStyle=C.gold;x.fillRect(cx+w/2-135,gy-200,30,8)}
function drawFootage(x,lt){x.fillStyle='#1a1712';x.fillRect(0,0,W,H);bgOffice(x,lt,'#1d1a14');
 const k=easeIO(prog(lt,.4,.9)),k2=easeIO(prog(lt,1.4,.6));
 const p={...BASE,...BOSS,x:620,y:1300,ground:1500,s:1.15,face:'sly',look:-.8,rot:-6,head:-14,aL1:-30,aL2:-40,aR1:lerp(40,95,k)-k2*60,aR2:lerp(60,170,k)-k2*40};
 const j=drawStick(x,p,lt);deskFront(x,620,1500,560);cash(x,lerp(j.hR[0],700,k2),lerp(j.hR[1],1230,k2),.8,-.2);return j}
function gavel(x,cx,cy,sc,ang){x.save();x.translate(cx,cy);x.scale(sc,sc);x.fillStyle='#3a2414';x.beginPath();x.ellipse(0,150,170,34,0,0,7);x.fill();x.fillStyle='#5a3a20';x.fillRect(-150,110,300,40);
 x.save();x.translate(150,60);x.rotate(ang);x.fillStyle='#7a4f2b';x.fillRect(-14,-20,28,-230);x.fillStyle='#8f5f34';x.beginPath();x.roundRect(-95,-290,190,90,22);x.fill();x.fillStyle=C.gold;x.fillRect(-60,-290,14,90);x.fillRect(46,-290,14,90);x.restore();x.restore()}
function scales(x,cx,cy,sc,t){x.save();x.translate(cx,cy);x.scale(sc,sc);x.strokeStyle=C.gold;x.fillStyle=C.gold;x.lineWidth=10;x.lineCap='round';const a=Math.sin(t*2)*.12;
 x.beginPath();x.moveTo(0,-120);x.lineTo(0,120);x.moveTo(-70,120);x.lineTo(70,120);x.stroke();x.save();x.translate(0,-110);x.rotate(a);x.beginPath();x.moveTo(-130,0);x.lineTo(130,0);x.stroke();
 [-130,130].forEach((px,i)=>{x.save();x.translate(px,0);x.rotate(-a);x.beginPath();x.moveTo(0,0);x.lineTo(-45,90);x.moveTo(0,0);x.lineTo(45,90);x.stroke();x.beginPath();x.ellipse(0,92,58,14,0,0,Math.PI);x.fill();x.restore()});x.restore();
 x.beginPath();x.arc(0,-120,14,0,7);x.fill();x.restore()}
function legalDoc(x,cx,cy,sc,rot,stampK){x.save();x.translate(cx,cy);x.rotate(rot);x.scale(sc,sc);x.shadowColor='rgba(0,0,0,.5)';x.shadowBlur=40;x.fillStyle='#f3efe6';x.fillRect(-300,-400,600,800);x.shadowBlur=0;
 x.fillStyle='#1d4f3a';x.fillRect(-300,-400,600,110);rich(x,[['بلاغ رسمي',C.paper]],0,-345,54,{});scales(x,-210,-345,.28,0);
 rich(x,[['المدّعي: أبو فهد',C.ink]],0,-220,40,{weight:800});rich(x,[['المدّعى عليه: أنت',C.ink]],0,-150,40,{weight:800});
 x.fillStyle='#c9c2b4';for(let i=0;i<6;i++)x.fillRect(-240,-80+i*50,480-(i%3)*70,14);
 rich(x,[['نوع القضية: تشهير',C.red]],0,260,50,{});
 if(stampK>0){x.save();x.translate(120,120);x.rotate(-.25);const s=lerp(2.4,1,easeIn(stampK));x.scale(s,s);x.globalAlpha=clamp(stampK*3);x.strokeStyle=C.red;x.lineWidth=12;x.beginPath();x.roundRect(-170,-70,340,140,16);x.stroke();rich(x,[['قضية',C.red]],0,4,90,{});x.restore()}
 x.restore()}
// IG-style comment row
function commentRow(x,cy,txt,likes,k,hl){if(k<=0)return;x.save();x.globalAlpha=ease(k);x.translate(lerp(300,0,ease(k)),0);
 pill(x,540,cy,920,120,30,hl?'rgba(255,90,31,.18)':'rgba(255,255,255,.07)',hl?C.a:null,5);x.fillStyle=['#8a6','#a68','#68a','#a86'][Math.abs(Math.round(cy))%4];x.beginPath();x.arc(925,cy,36,0,7);x.fill();
 rich(x,[[txt,C.paper]],620,cy,52,{weight:800,maxW:560});x.save();x.fillStyle=C.red;x.font='900 40px Cairo';x.textAlign='left';x.textBaseline='middle';x.fillText('♥',120,cy-4);x.fillStyle='#ddd';x.font='700 34px Cairo';x.fillText(likes,170,cy);x.restore();x.restore()}
function projector(x,cx,cy,w,h,t,fn){x.save();x.fillStyle='#0a0b0f';x.fillRect(cx-w/2-16,cy-h/2-16,w+32,h+32);x.beginPath();x.rect(cx-w/2,cy-h/2,w,h);x.clip();x.translate(cx-w/2,cy-h/2);x.scale(w/W,h/H*0+w/W);fn(x);x.restore();
 const g=x.createLinearGradient(0,cy-h/2,0,cy+h/2+600);g.addColorStop(0,'rgba(120,255,160,.10)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(cx-w/2,cy+h/2,w,600)}
function seatedRow(x,t,gy,s,face,look,xs){xs.forEach((px,i)=>{drawStick(x,{...BASE,...COW(i),...P.sit,x:px,y:gy-150*s,ground:gy,s,face:typeof face==='function'?face(i):face,look:look(i),shadow:false},t)});x.fillStyle='#2a1f16';x.fillRect(-100,gy-40,W+200,60)}
const S=[
// 0 HOOK: the lawsuit lands
{t0:b[0],t1:b[1],draw(x,lt){x.fillStyle='#140b0a';x.fillRect(0,0,W,H);const g=x.createRadialGradient(540,950,40,540,950,1000);g.addColorStop(0,'rgba(255,59,48,.32)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
 const ts=wd(0,8);speedLines(x,540,950,lt,.25,'#ff3b30');
 const[sx,sy]=shake(lt,ts,.5,40);x.save();x.translate(sx,sy);
 const z=lerp(1.2,1,ease(prog(lt,0,.5)));x.translate(540,960);x.scale(z,z);x.translate(-540,-960);
 const sw=lt<ts-.25?lerp(-.2,-1.1,ease(prog(lt,0,ts-.25))):lerp(-1.1,.15,easeIn(prog(lt,ts-.25,.25)));gavel(x,560,1180,1.35,sw);
 drawStick(x,{...BASE,...ME,...P.shock,x:230,y:1560,ground:1700,s:1.0,face:'shock',sweat:true,look:.5,shadow:false},lt);x.restore();
 popIn(x,lt,.05,null,()=>{rich(x,[['فضحته…',C.paper]],540,300,120,{stroke:20})},{cy:300});
 if(lt>ts){const sp=prog(lt,ts,.16);x.save();x.translate(540,520);x.rotate(-.06);x.scale(lerp(2.6,1,easeIn(sp)),lerp(2.6,1,easeIn(sp)));x.globalAlpha=clamp(sp*3);pill(x,0,0,820,190,26,C.red);rich(x,[['ورفع عليك قضية!',C.paper]],0,8,96,{});x.restore();
  if(lt<ts+.2){x.fillStyle=`rgba(255,255,255,${.6*(1-prog(lt,ts,.2))})`;x.fillRect(0,0,W,H)}}
 vignette(x,.8)}},
// 1 RECAP: accused -> CCTV
{t0:b[1],t1:b[2],draw(x,lt){const sub=rel(2,1);
 if(lt<sub){const[sx,sy]=shake(lt,.1,.4,22);x.save();x.translate(sx,sy);cam(x,{z:1+.1*lt/sub,x:540,y:1120});bgOffice(x,lt,'#241411');
  for(let i=0;i<4;i++)drawStick(x,{...BASE,...COW(i),x:[110,250,830,970][i],y:1340,ground:1500,s:.8,face:'shock',look:i<2?1:-1},lt);
  drawStick(x,{...BASE,...BOSS,...P.point,x:690,y:1300,ground:1500,s:1.15,face:'angry',look:-1},lt);
  drawStick(x,{...BASE,...ME,...P.shock,x:410,y:1300,ground:1500,s:1.08,face:'shock',sweat:true,look:1},lt);x.restore();
  if(lt<.45)rewindFx(x,lt,1-lt/.45);
  popIn(x,lt,.05,null,()=>{pill(x,540,300,380,96,48,'rgba(0,0,0,.65)');rich(x,[['قبل أسبوع',C.paper]],540,304,52,{weight:800})},{cy:300});
  popIn(x,lt,.35,null,()=>{x.save();x.translate(540,520);x.rotate(-.05);pill(x,0,0,640,170,26,C.red);rich(x,[['سارق! -10,000',C.paper]],0,6,84,{});x.restore()},{cy:520,from:2,d:.2});
 }else{const ll=lt-sub,d=b[2]-b[1]-sub;x.save();cam(x,{z:lerp(1,1.35,easeIO(ll/d)),x:lerp(540,680,easeIO(ll/d)),y:lerp(1100,1230,easeIO(ll/d))});drawFootage(x,ll);x.restore();
  monitorFx(x,lt);vhs(x,lt,'CAM 03  ● REC',C.red);
  popIn(x,ll,Math.max(.3,d-1.6),null,()=>{x.save();x.translate(540,560);x.rotate(-.05);pill(x,0,0,700,150,24,C.red);rich(x,[['هو اللي أخذها!',C.paper]],0,6,86,{});x.restore()},{cy:560,from:1.8,d:.22})}
 vignette(x,.72)}},
// 2 YOUR VOTE: comments flood "افضحه"
{t0:b[2],t1:b[3],draw(x,lt){x.fillStyle=C.ink;x.fillRect(0,0,W,H);const g=x.createRadialGradient(540,800,40,540,800,900);g.addColorStop(0,'rgba(255,90,31,.25)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
 const cs=[['افضحه قدام الكل 🔥','',1],['A','',0],['اعرضه بالاجتماع 👏','',0],['A A A','',0],['لا تسكت أبد','',0],['A 💯','',0]];
 cs.forEach(([t,l,h],i)=>commentRow(x,480+i*150,t,l,prog(lt,.08+i*.16,.3),h));
 popIn(x,lt,.05,null,()=>{rich(x,[['تعليقاتكم',C.muted]],540,250,56,{weight:800});rich(x,[['88% ',C.a],['قالوا: افضحه',C.paper]],540,350,86,{stroke:14})},{cy:300});
 popIn(x,lt,.9,null,()=>{pill(x,540,1420,560,110,55,C.a);rich(x,[['A ✓  ونفّذنا',C.ink]],540,1424,58,{})},{cy:1420});
 vignette(x,.7)}},
// 3 MEETING: plug phone -> his face on the big screen
{t0:b[3],t1:b[4],draw(x,lt){const sub=rel(5,3),d=b[4]-b[3];x.fillStyle='#101219';x.fillRect(0,0,W,H);
 const z=lt<sub?lerp(1,1.05,lt/sub):lerp(1.05,1.25,easeIO(prog(lt,sub,d-sub)));x.save();cam(x,{z,x:540,y:lt<sub?960:820});
 // wall screen
 const on=ease(prog(lt,Math.max(.4,rel(4,3)+1.4),.3));x.fillStyle='#0a0b0f';x.fillRect(150,330,780,470);
 if(on>0){x.save();x.globalAlpha=on;projector(x,540,565,760,450,lt,(c)=>{c.save();c.translate(0,-760);drawFootage(c,1.6+((lt*.5)%1.2));c.restore();monitorFx(c,lt)});x.restore();
  if(lt>sub){const k=ease(prog(lt,sub+.3,.3));x.strokeStyle=`rgba(255,59,48,${k})`;x.lineWidth=8;x.beginPath();x.arc(560,560,lerp(320,170,k),0,7);x.stroke()}}
 x.fillStyle='#1b1712';x.fillRect(-300,1180,W+600,800);
 seatedRow(x,lt,1420,.62,i=>lt>sub+.3?'shock':'neutral',i=>i<3?.3:-.3,[120,300,780,960]);
 const plug=ease(prog(lt,rel(4,3)+1.0,.5));const j=drawStick(x,{...BASE,...ME,...P.holdOut,aR1:lerp(60,100,plug),aR2:lerp(80,40,plug),x:470,y:1250,ground:1420,s:.95,face:lt>sub?'sly':'neutral',look:1},lt);phoneProp(x,j.hR[0],j.hR[1]-10,1.4,on);
 const bk=lt>sub;drawStick(x,{...BASE,...BOSS,...(bk?P.shock:P.armsCross),x:680,y:1250,ground:1420,s:.95,face:bk?'shock':'sly',sweat:bk,look:-1},lt);x.restore();
 popIn(x,lt,.05,null,()=>{pill(x,540,265,460,96,48,'rgba(0,0,0,.65)');rich(x,[['اجتماع الصباح',C.paper]],540,269,50,{weight:800})},{cy:265});
 if(lt>sub)popIn(x,lt,sub+.2,null,()=>{x.save();x.translate(540,1000);x.rotate(.04);pill(x,0,0,760,150,24,C.red);rich(x,[['قدام الشركة كلها',C.paper]],0,6,78,{});x.restore()},{cy:1000,from:1.8,d:.22});
 vignette(x,.75)}},
// 4 SILENCE -> DOOR OPENS -> OWNER
{t0:b[4],t1:b[5],draw(x,lt){const sub=wd(6,2)-b[4],d=b[5]-b[4];x.fillStyle='#0c0d11';x.fillRect(0,0,W,H);
 if(lt<sub){x.save();cam(x,{z:lerp(1.1,1.2,lt/sub),x:540,y:1150});for(let i=0;i<4;i++)drawStick(x,{...BASE,...COW(i),x:[150,330,750,930][i],y:1340,ground:1520,s:.9,face:'shock',look:0,col:'#8f8a82'},lt);
  drawStick(x,{...BASE,...BOSS,...P.sad,x:540,y:1320,ground:1520,s:1.1,face:'worried',sweat:true},lt);x.restore();
  popIn(x,lt,.1,null,()=>rich(x,[['…',C.muted]],540,500,160,{}),{cy:500});
  const hb=Math.sin(lt*8)*.5+.5;x.fillStyle=`rgba(255,59,48,${.05*hb})`;x.fillRect(0,0,W,H);
 }else{const ll=lt-sub,dd=d-sub;const op=ease(prog(ll,0,.6));x.save();cam(x,{z:lerp(1.25,1,easeIO(prog(ll,0,dd))),x:540,y:1050});door(x,540,1600,op,lt);
  const ow=ease(prog(ll,.4,.7));drawStick(x,{...BASE,...OWN,x:540,y:1350,ground:1600,s:1.25,face:'angry',look:0,glow:'rgba(255,200,120,.4)',col:lerp(0,1,ow)>.5?'#EFE6D2':'#c9bfa9'},lt);x.restore();
  popIn(x,ll,.5,null,()=>{x.save();x.translate(540,330);pill(x,0,0,640,130,24,C.gold);rich(x,[['صاحب الشركة',C.ink]],0,6,74,{});x.restore()},{cy:330,from:1.8,d:.22});
  if(ll>rel(7,4)-sub+1.4)popIn(x,ll,rel(7,4)-sub+1.4,null,()=>rich(x,[['شاف كل شي 👁️',C.paper]],540,480,70,{stroke:14}),{cy:480})}
 vignette(x,.8)}},
// 5 "YOU'RE FIRED" — karma
{t0:b[5],t1:b[6],draw(x,lt){const d=b[6]-b[5];const ts=wd(8,4)-b[5];x.fillStyle='#16100c';x.fillRect(0,0,W,H);
 const[sx,sy]=shake(lt,ts,.5,36);x.save();x.translate(sx,sy);cam(x,{z:lerp(1,1.12,lt/d),x:540,y:1150});bgOffice(x,lt,'#1c1610');
 drawStick(x,{...BASE,...OWN,...P.point,x:330,y:1290,ground:1500,s:1.2,face:'angry',look:1},lt);
 const fall=ease(prog(lt,ts,.6));drawStick(x,{...BASE,...BOSS,...mix(P.shock,P.crouch,fall),x:760,y:1300,ground:1500,s:1.1,face:fall>.5?'sad':'shock',sweat:true,look:-1},lt);x.restore();
 if(lt>ts){const sp=prog(lt,ts,.16);x.save();x.translate(540,470);x.rotate(-.05);x.scale(lerp(2.6,1,easeIn(sp)),lerp(2.6,1,easeIn(sp)));x.globalAlpha=clamp(sp*3);pill(x,0,0,700,190,26,C.red);rich(x,[['أنت مفصول!',C.paper]],0,8,110,{});x.restore();
  if(lt<ts+.2){x.fillStyle=`rgba(255,255,255,${.55*(1-prog(lt,ts,.2))})`;x.fillRect(0,0,W,H)}
  popIn(x,lt,ts+.7,null,()=>{pill(x,540,660,760,92,46,'rgba(0,0,0,.72)',C.gold,5);rich(x,[['نفس الكلمة اللي قالها لك 😶',C.gold]],540,664,44,{weight:800})},{cy:660})}
 vignette(x,.75)}},
// 6 TWO DAYS LATER: the lawsuit letter
{t0:b[6],t1:b[7],draw(x,lt){const sub=rel(10,6),d=b[7]-b[6];
 if(lt<sub){x.save();bgRoom(x,lt);const j=drawStick(x,{...BASE,...ME,...P.phone,x:540,y:1340,ground:1520,s:1.2,face:lt>sub*.6?'shock':'neutral'},lt);phoneProp(x,j.hR[0],j.hR[1]-18,1.6,1);x.restore();
  popIn(x,lt,.05,null,()=>{pill(x,540,300,420,100,50,'rgba(0,0,0,.65)');rich(x,[['بعد يومين',C.paper]],540,304,54,{weight:800})},{cy:300});
  popIn(x,lt,sub*.45,null,()=>{pill(x,540,560,820,140,30,'#1f2c34');rich(x,[['📩 إشعار: قضية جديدة باسمك',C.paper]],540,560,46,{weight:800})},{cy:560,from:.8});
 }else{const ll=lt-sub,dd=d-sub;x.fillStyle='#0e1014';x.fillRect(0,0,W,H);const g=x.createRadialGradient(540,900,40,540,900,900);g.addColorStop(0,'rgba(255,59,48,.18)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
  const k=ease(prog(ll,0,.4));const sk=prog(ll,wd(10,5)-b[6]-sub,.18);const[sx,sy]=shake(ll,wd(10,5)-b[6]-sub+.12,.4,24);
  legalDoc(x,540+sx,lerp(1400,900,k)+sy,lerp(.7,1.15,k),lerp(.2,-.04,k),sk);
  drawStick(x,{...BASE,...BOSS,...P.armsCross,x:900,y:1560,ground:1700,s:.9,face:'sly',look:-1,shadow:false},lt)}
 vignette(x,.72)}},
// 7 THE LAWYER (shout-out to the top comment)
{t0:b[7],t1:b[8],draw(x,lt){const sub=rel(12,7),d=b[8]-b[7];x.fillStyle=C.ink;x.fillRect(0,0,W,H);
 if(lt<sub){commentRow(x,620,'محامي… وقضية ⚖️','128',prog(lt,.05,.3),1);
  popIn(x,lt,.05,null,()=>rich(x,[['أعلى تعليق عندكم',C.muted]],540,430,54,{weight:800}),{cy:430});
  popIn(x,lt,Math.max(.6,sub-1.3),null,()=>{x.save();x.translate(540,860);x.rotate(-.04);pill(x,0,0,560,140,24,C.green);rich(x,[['كنتم صح ✓',C.ink]],0,6,84,{});x.restore()},{cy:860,from:2,d:.22});
  scales(x,540,1240,1.3,lt);
 }else{const ll=lt-sub;x.save();cam(x,{z:lerp(1,1.12,ll/(d-sub)),x:540,y:1150});bgOffice(x,lt,'#13161c');scales(x,840,640,.7,lt);
  const j=drawStick(x,{...BASE,...LAW,...P.point,aR1:150,aR2:178,x:620,y:1300,ground:1500,s:1.2,face:'talk',look:-1},lt);
  x.save();x.fillStyle=C.paper;x.font='900 70px Cairo';x.textAlign='center';x.fillText('✌',j.hR[0],j.hR[1]-10);x.restore();
  drawStick(x,{...BASE,...ME,...P.think,x:330,y:1300,ground:1500,s:1.1,face:'worried',look:1},lt);x.restore();
  popIn(x,ll,.05,null,()=>{pill(x,540,300,360,96,48,'rgba(0,0,0,.65)');rich(x,[['محاميك',C.paper]],540,304,52,{weight:800})},{cy:300});
  popIn(x,ll,.6,null,()=>{x.save();x.translate(540,470);x.rotate(.04);pill(x,0,0,620,150,24,C.b);rich(x,[['عندك طريقين',C.ink]],0,6,80,{});x.restore()},{cy:470,from:1.8,d:.22})}
 vignette(x,.72)}},
// 8 OUTRO VOTE
{t0:b[8],t1:b[9],draw(x,lt){const zz=1+.02*Math.sin(lt*1.3);x.save();x.translate(540,960);x.scale(zz,zz);x.translate(-540,-960);
 outroSplit(x,lt,'وش بتسوي؟','المحكمة… وتعويض كامل','100,000 ريال… وتتنازل',
 (x,t,y0,h)=>{const gy=y0+h-40;scales(x,250,y0+260,.9,t);drawStick(x,{...BASE,...ME,...P.point,x:520,y:gy-200,ground:gy,s:.8,face:'angry',look:1},t);drawStick(x,{...BASE,...BOSS,...P.sad,x:760,y:gy-200,ground:gy,s:.78,face:'worried',sweat:true,look:-1},t);gavel(x,880,gy-120,.45,-.3+Math.max(0,Math.sin(t*3))*.3)},
 (x,t,y0,h)=>{const gy=y0+h-40;for(let i=0;i<5;i++)cash(x,180+i*55,gy-60-i*28,1.1,(i%2-.5)*.2,'100K');drawStick(x,{...BASE,...ME,...P.holdOut,x:520,y:gy-200,ground:gy,s:.82,face:'sly',look:1},t);drawStick(x,{...BASE,...BOSS,...P.holdOut,aR1:-75,aR2:-88,x:730,y:gy-200,ground:gy,s:.82,face:'sly',look:-1},t)});
 x.restore();
 const aS=Ls(14)-b[8],aE=Le(14)-b[8],bS=Ls(15)-b[8],bE=Le(15)-b[8];
 const hl=(y0,col,s0,e0)=>{if(lt<s0||lt>e0+.2)return;const k=ease(prog(lt,s0,.25))*(1-prog(lt,e0,.2));const oth=y0===420?1020:420;
  x.save();x.globalAlpha=.55*k;x.fillStyle='#000';x.beginPath();x.roundRect(50,oth,980,560,40);x.fill();x.restore();
  x.save();x.globalAlpha=k*(.7+.3*Math.sin(lt*10));x.shadowColor=col;x.shadowBlur=50;x.strokeStyle=col;x.lineWidth=16;x.beginPath();x.roundRect(46,y0-4,988,568,44);x.stroke();x.restore();
  if(lt-s0<.3){const q=1-(lt-s0)/.3;x.save();x.globalAlpha=.35*q;x.fillStyle=col;x.fillRect(0,0,W,H);x.restore()}};
 hl(420,C.a,aS,aE);hl(1020,C.b,bS,bE);
 const fk=rel(16,8);if(lt>fk)popIn(x,lt,fk,null,()=>{pill(x,540,1850,880,84,42,C.gold);rich(x,[['تابع… وش حكم القاضي؟ ⚖️',C.ink]],540,1854,44,{weight:900})},{cy:1850})}}
];
const T=[{at:b[1],dur:.3,type:'glitch'},{at:b[2],dur:.35,type:'whip'},{at:b[3],dur:.35,type:'zoom'},{at:b[4],dur:.3,type:'flash'},{at:b[5],dur:.3,type:'whip'},{at:b[6],dur:.3,type:'glitch'},{at:b[7],dur:.35,type:'zoom'},{at:b[8],dur:.5,type:'circle',col:C.a}];
boot(S,T,(x,t)=>{if(t<b[8]){if(t>b[1])hud(x,t,'قرارك');captions(x,t)}grain(x,t,.06)});
