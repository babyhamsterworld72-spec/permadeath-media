// ===== Qararak ep05: «الحكم… والولد» (public part 4, standalone-friendly) =====
KEY=['القضية…','ولده!','بالسرقة…','تشهير.','كمّل.','حقيقة…','مرفوضة…','تعويض','الكاميرا','وقفت.','الصغير','السجن…','غيري.','A:','B:','القصة.'];
const ME={ghutra:'#F7F4EE',checker:'#d23b3b'};
const BOSS={tie:C.red,glasses:true,col:'#ECE6DC'};
const LAW={tie:C.b,glasses:true,col:'#DDE3EA'};
const COW=(i)=>({col:['#cfc9bf','#bdb7ad','#d8d2c8','#c4beb4','#cbc5bb'][i%5],ghutra:i%2?'#e6e1d7':null,glasses:i===2});
function bishtProp(x,j,p){const s=p.s;x.save();x.fillStyle='#2b1d12';x.strokeStyle=C.gold;x.lineWidth=6*s;
 x.beginPath();x.moveTo(j.sh[0]-34*s,j.sh[1]);x.lineTo(j.sh[0]+34*s,j.sh[1]);x.lineTo(j.hip[0]+70*s,j.hip[1]+70*s);x.lineTo(j.hip[0]-70*s,j.hip[1]+70*s);x.closePath();x.fill();
 x.beginPath();x.moveTo(j.sh[0]-30*s,j.sh[1]);x.lineTo(j.hip[0]-62*s,j.hip[1]+66*s);x.moveTo(j.sh[0]+30*s,j.sh[1]);x.lineTo(j.hip[0]+62*s,j.hip[1]+66*s);x.stroke();x.restore()}
const OWN={ghutra:'#F7F4EE',col:'#EFE6D2',prop:bishtProp,propBack:true};
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
const END=TIMING.duration;
const b=[0,Ls(1)-.05,Ls(2)-.05,Ls(3)-.05,Ls(5)-.05,Ls(6)-.05,Ls(8)-.05,Ls(10)-.05,END+0.01];
const rel=(i,k)=>Ls(i)-b[k];
const wd=(i,k)=>TIMING.lines[i].words[k].s;
const FIRED={...BOSS,tie:null,col:'#d9d2c5'};
const KID={col:'#efe9dd'};
const JUDGE={ghutra:'#F7F4EE',col:'#EFE6D2',prop:(x,j,p)=>{const s=p.s;x.save();x.fillStyle='#111';x.strokeStyle=C.gold;x.lineWidth=6*s;
 x.beginPath();x.moveTo(j.sh[0]-34*s,j.sh[1]);x.lineTo(j.sh[0]+34*s,j.sh[1]);x.lineTo(j.hip[0]+70*s,j.hip[1]+70*s);x.lineTo(j.hip[0]-70*s,j.hip[1]+70*s);x.closePath();x.fill();
 x.beginPath();x.moveTo(j.sh[0]-30*s,j.sh[1]);x.lineTo(j.hip[0]-62*s,j.hip[1]+66*s);x.moveTo(j.sh[0]+30*s,j.sh[1]);x.lineTo(j.hip[0]+62*s,j.hip[1]+66*s);x.stroke();x.restore()},propBack:true};
// ---------- new props ----------
function stamp(x,cx,cy,k,txt,col,rot=-.18,w=560){if(k<=0)return;x.save();x.translate(cx,cy);x.rotate(rot);const s=lerp(2.6,1,easeIn(k));x.scale(s,s);x.globalAlpha=clamp(k*3);x.strokeStyle=col;x.lineWidth=14;x.beginPath();x.roundRect(-w/2,-80,w,160,18);x.stroke();rich(x,[[txt,col]],0,6,96,{});x.restore()}
function verdictDoc(x,cx,cy,sc,rot,k1){x.save();x.translate(cx,cy);x.rotate(rot);x.scale(sc,sc);x.shadowColor='rgba(0,0,0,.5)';x.shadowBlur=40;x.fillStyle='#f3efe6';x.fillRect(-300,-400,600,800);x.shadowBlur=0;
 x.fillStyle='#1d4f3a';x.fillRect(-300,-400,600,110);rich(x,[['صك الحكم',C.paper]],0,-345,58,{});scales(x,-210,-345,.28,0);
 rich(x,[['دعوى التشهير ضدك',C.ink]],0,-220,44,{weight:800});x.fillStyle='#c9c2b4';for(let i=0;i<5;i++)x.fillRect(-240,-140+i*50,480-(i%3)*70,14);
 stamp(x,0,180,k1,'مرفوضة',C.red,-.2,420);x.restore()}
function bench(x,t,gy){x.fillStyle='#2a1c12';x.fillRect(140,gy-430,800,430);x.fillStyle='#3b2819';x.fillRect(120,gy-460,840,50);x.strokeStyle='#4d3522';x.lineWidth=8;for(let i=0;i<3;i++)x.strokeRect(190+i*250,gy-380,200,330);scales(x,540,gy-250,.75,t)}
function courtBg(x,t){x.fillStyle='#17120d';x.fillRect(-600,-600,W+1200,H+1200);x.fillStyle='#21190f';for(let i=0;i<6;i++)x.fillRect(-60+i*220,200,120,1300);
 x.fillStyle='#120e0a';x.fillRect(-600,1500,W+1200,900);const g=x.createRadialGradient(540,500,40,540,500,900);g.addColorStop(0,'rgba(255,197,61,.16)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
 x.save();x.globalAlpha=.25;rich(x,[['﴿ وإذا حكمتم بين الناس أن تحكموا بالعدل ﴾',C.gold]],540,300,40,{weight:700,maxW:900});x.restore()}
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
function tear(x,cx,cy,t,s=1){const k=(t*.8)%1;x.save();x.fillStyle=C.b;x.globalAlpha=1-k*.6;const y=cy+k*60*s;x.beginPath();x.moveTo(cx,y-16*s);x.quadraticCurveTo(cx+11*s,y,cx,y+7*s);x.quadraticCurveTo(cx-11*s,y,cx,y-16*s);x.fill();x.restore()}
const S=[
// 0 HOOK: verdict won -> cut to him waiting with his son
{t0:b[0],t1:b[1],draw(x,lt){const ts=wd(0,1),cut=wd(0,2)-.05;
 if(lt<cut){x.fillStyle='#0f1410';x.fillRect(0,0,W,H);const g=x.createRadialGradient(540,950,40,540,950,1000);g.addColorStop(0,'rgba(61,220,132,.28)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);speedLines(x,540,950,lt,.22,C.green);
  const[sx,sy]=shake(lt,ts,.5,40);x.save();x.translate(sx,sy);const z=lerp(1.25,1,ease(prog(lt,0,.5)));x.translate(540,960);x.scale(z,z);x.translate(-540,-960);
  const sw=lt<ts-.22?lerp(-.2,-1.1,ease(prog(lt,0,ts-.22))):lerp(-1.1,.15,easeIn(prog(lt,ts-.22,.22)));gavel(x,560,1180,1.35,sw);
  drawStick(x,{...BASE,...ME,...(lt>ts?P.celebrate:P.stand),x:230,y:1560,ground:1700,s:1,face:lt>ts?'happy':'worried',look:.5,shadow:false},lt);x.restore();
  if(lt<ts)popIn(x,lt,.02,null,()=>rich(x,[['الحكم صدر…',C.paper]],540,330,100,{stroke:18}),{cy:330});
  if(lt>ts){stamp(x,540,480,prog(lt,ts,.16),'كسبت القضية ✓',C.green,-.06,820);if(lt<ts+.2){x.fillStyle=`rgba(255,255,255,${.6*(1-prog(lt,ts,.2))})`;x.fillRect(0,0,W,H)}}
 }else{const ll=lt-cut;x.save();cam(x,{z:lerp(1.35,1.1,ease(prog(ll,0,1.4))),x:540,y:1250});streetBg(x,lt);kidPair(x,lt,560,1560,1.15,{kl:-.8});x.restore();
  x.save();x.globalCompositeOperation='multiply';x.fillStyle='rgba(120,140,190,.55)';x.fillRect(0,0,W,H);x.restore();rain(x,lt,.3);
  if(ll<.12){x.fillStyle='#fff';x.globalAlpha=1-ll/.12;x.fillRect(0,0,W,H);x.globalAlpha=1}
  popIn(x,lt,cut+.05,null,()=>rich(x,[['بس برّا المحكمة…',C.paper]],540,330,88,{stroke:16}),{cy:330});
  const wk=wd(0,TIMING.lines[0].words.length-1)-.05;if(lt>wk){x.save();x.translate(540,520);x.rotate(-.05);const sp=prog(lt,wk,.16);x.scale(lerp(2.4,1,easeIn(sp)),lerp(2.4,1,easeIn(sp)));x.globalAlpha=clamp(sp*3);pill(x,0,0,640,170,26,C.red);rich(x,[['ومعه ولده!',C.paper]],0,6,92,{});x.restore()}}
 vignette(x,.8)}},
// 1 RECAP (one line): accused -> sued
{t0:b[1],t1:b[2],draw(x,lt){const sub=wd(1,4)-b[1];
 if(lt<sub){const[sx,sy]=shake(lt,.1,.4,22);x.save();x.translate(sx,sy);cam(x,{z:1+.08*lt/sub,x:540,y:1120});bgOffice(x,lt,'#241411');
  for(let i=0;i<4;i++)drawStick(x,{...BASE,...COW(i),x:[110,250,830,970][i],y:1340,ground:1500,s:.8,face:'shock',look:i<2?1:-1},lt);
  drawStick(x,{...BASE,...BOSS,...P.point,x:690,y:1300,ground:1500,s:1.15,face:'angry',look:-1},lt);
  drawStick(x,{...BASE,...ME,...P.shock,x:410,y:1300,ground:1500,s:1.08,face:'shock',sweat:true,look:1},lt);x.restore();
  if(lt<.4)rewindFx(x,lt,1-lt/.4);
  popIn(x,lt,.05,null,()=>{pill(x,540,300,480,96,48,'rgba(0,0,0,.65)');rich(x,[['اللي فاتك',C.paper]],540,304,52,{weight:800})},{cy:300});
  popIn(x,lt,.3,null,()=>{x.save();x.translate(540,520);x.rotate(-.05);pill(x,0,0,520,160,26,C.red);rich(x,[['سارق!',C.paper]],0,6,90,{});x.restore()},{cy:520,from:2,d:.2});
 }else{const ll=lt-sub,d=b[2]-b[1]-sub;x.fillStyle='#0e1014';x.fillRect(0,0,W,H);const g=x.createRadialGradient(540,900,40,540,900,900);g.addColorStop(0,'rgba(255,59,48,.2)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
  const k=ease(prog(ll,0,.35)),sk=prog(ll,Math.max(.3,d-.9),.18);const[sx,sy]=shake(ll,Math.max(.3,d-.9)+.12,.4,24);legalDoc(x,540+sx,lerp(1400,960,k)+sy,lerp(.7,1.1,k),lerp(.2,-.04,k),sk);
  if(ll<.1){x.fillStyle='#fff';x.globalAlpha=1-ll/.1;x.fillRect(0,0,W,H);x.globalAlpha=1}}
 vignette(x,.72)}},
// 2 YOUR VOTE: court
{t0:b[2],t1:b[3],draw(x,lt){x.fillStyle=C.ink;x.fillRect(0,0,W,H);const g=x.createRadialGradient(540,800,40,540,800,900);g.addColorStop(0,'rgba(255,90,31,.25)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
 commentRow(x,620,'كمل محكمة… لأنه اتهمك ظلم','268',prog(lt,.05,.28),1);
 [['A تعويض كامل','',0],['كن مع الحق 🤍','',0],['A A A','',0]].forEach(([t],i)=>commentRow(x,790+i*150,t,'',prog(lt,.25+i*.12,.28),0));
 popIn(x,lt,.02,null,()=>{rich(x,[['أعلى تعليق عندكم',C.muted]],540,330,54,{weight:800});rich(x,[['⚖️ ',C.gold],['المحكمة',C.a]],540,440,96,{stroke:14})},{cy:400});
 popIn(x,lt,.7,null,()=>{pill(x,540,1420,560,110,55,C.a);rich(x,[['A ✓  ودخلنا',C.ink]],540,1424,58,{})},{cy:1420});vignette(x,.7)}},
// 3 COURTROOM: judge speaks -> dismissed + compensation
{t0:b[3],t1:b[4],draw(x,lt){const d=b[4]-b[3],s4=rel(4,3),gs=wd(4,1)-b[3];x.fillStyle='#000';x.fillRect(0,0,W,H);
 const[sx,sy]=shake(lt,gs,.5,34);x.save();x.translate(sx,sy);
 if(lt<s4){cam(x,{z:lerp(1,1.15,easeIO(lt/s4)),x:540,y:lerp(1000,820,easeIO(lt/s4))});courtBg(x,lt);drawStick(x,{...BASE,...JUDGE,...(lt>.3?P.point:P.stand),aR1:lt>.3?150:12,aR2:lt>.3?170:6,x:540,y:660,ground:840,s:1.1,face:'talk',look:0,shadow:false},lt);bench(x,lt,1180);
  drawStick(x,{...BASE,...ME,x:250,y:1430,ground:1620,s:.95,face:'worried',look:.6},lt);drawStick(x,{...BASE,...LAW,x:110,y:1450,ground:1620,s:.85,look:.6},lt);
  drawStick(x,{...BASE,...FIRED,...P.armsCross,x:820,y:1430,ground:1620,s:.95,face:'sly',look:-.6},lt);drawStick(x,{...BASE,...COW(2),tie:'#444',x:970,y:1450,ground:1620,s:.85,look:-.6},lt);x.restore();
  popIn(x,lt,.05,null,()=>{pill(x,540,260,420,96,48,'rgba(0,0,0,.65)');rich(x,[['قاعة المحكمة',C.paper]],540,264,50,{weight:800})},{cy:260});
  const q=wd(3,3)-b[3]-.05;popIn(x,lt,q,null,()=>{pill(x,540,1760,900,120,30,'rgba(0,0,0,.78)',C.gold,5);rich(x,[['«اللي عرضه ',C.paper],['حقيقة',C.gold],['…',C.paper],[' مو تشهير»',C.paper]],540,1764,58,{weight:900,maxW:860})},{cy:1760});
 }else{const ll=lt-s4,dd=d-s4;x.fillStyle='#0f1410';x.fillRect(0,0,W,H);const g=x.createRadialGradient(540,900,40,540,900,900);g.addColorStop(0,'rgba(255,197,61,.22)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
  const k=ease(prog(ll,0,.3));verdictDoc(x,540,lerp(1300,860,k),lerp(.7,1.05,k),lerp(.15,-.03,k),prog(lt,gs,.18));
  const cs=wd(4,3)-b[3];if(lt>cs){moneyRain(x,lt,cs,26,4,3);const ck=prog(lt,cs,.25);x.save();x.translate(540,1420);x.scale(lerp(.5,1,back(ck)),lerp(.5,1,back(ck)));x.globalAlpha=clamp(ck*2);pill(x,0,0,780,150,30,C.gold);rich(x,[['+ تعويض عن فصلك 💰',C.ink]],0,6,66,{});x.restore()}
  if(lt>gs&&lt<gs+.2){x.fillStyle=`rgba(255,255,255,${.5*(1-prog(lt,gs,.2))})`;x.fillRect(0,0,W,H)}x.restore()}
 vignette(x,.75)}},
// 4 THE WARNING: camera — nod to commenters
{t0:b[4],t1:b[5],draw(x,lt){const d=b[5]-b[4];x.save();cam(x,{z:lerp(1.15,1.3,lt/d),x:540,y:900});courtBg(x,lt);drawStick(x,{...BASE,...JUDGE,...P.point,aR1:95,aR2:95,x:540,y:660,ground:840,s:1.1,face:'angry',look:0,shadow:false},lt);bench(x,lt,1180);x.restore();
 x.fillStyle='rgba(0,0,0,.35)';x.fillRect(0,0,W,H);
 popIn(x,lt,.05,null,()=>{x.save();x.translate(820,340);x.scale(.6,.6);cctvCam(x,0,0,2.2,lt);x.strokeStyle=C.red;x.lineWidth=22;x.lineCap='round';const k=ease(prog(lt,.35,.25));x.beginPath();x.moveTo(-170,-150);x.lineTo(lerp(-170,170,k),lerp(-150,150,k));x.stroke();x.beginPath();x.moveTo(170,-150);x.lineTo(lerp(170,-170,k),lerp(-150,150,k));x.stroke();x.restore()},{cy:520});
 popIn(x,lt,Math.min(1.0,d*.45),null,()=>{pill(x,540,1150,940,210,34,'rgba(31,44,52,.95)',C.green,6);rich(x,[['اللي قالوا: الكاميرا نقطة ضعفك',C.paper]],540,1110,48,{weight:800,maxW:860});rich(x,[['كنتم صح ✓',C.green]],540,1195,58,{weight:900})},{cy:1150,from:.7});
 vignette(x,.75)}},
// 5 WALK OUT -> STOP -> HIM AND HIS SON
{t0:b[5],t1:b[6],draw(x,lt){const d=b[6]-b[5],stop=wd(6,2)-b[5],rev=rel(7,5);x.save();
 if(lt<rev){const wx=lerp(160,460,ease(prog(lt,0,stop)));cam(x,{z:1.05,x:540,y:1150});streetBg(x,lt);
  const wp=lt<stop?walkPose(lt*9,1):P.shock;drawStick(x,{...BASE,...ME,...wp,x:wx,y:1340,ground:1520,s:1.1,face:lt<stop?'neutral':'shock',look:1,emote:lt>stop?'!':null},lt);
  // silhouette hint on the right
  x.save();x.globalAlpha=lt>stop?ease(prog(lt,stop,.5))*.9:.0;x.filter='brightness(0.25)';kidPair(x,lt,880,1520,1.05);x.restore();
  x.restore();x.save();x.globalCompositeOperation='multiply';x.fillStyle='rgba(120,140,190,.5)';x.fillRect(0,0,W,H);x.restore();rain(x,lt,.28);
  popIn(x,lt,.05,null,()=>{pill(x,540,280,440,96,48,'rgba(0,0,0,.65)');rich(x,[['بعد الجلسة',C.paper]],540,284,50,{weight:800})},{cy:280});
 }else{const ll=lt-rev,dd=d-rev;cam(x,{z:lerp(1.05,1.45,easeIO(prog(ll,0,dd))),x:lerp(560,640,easeIO(prog(ll,0,dd))),y:lerp(1250,1300,easeIO(prog(ll,0,dd)))});streetBg(x,lt);const r=kidPair(x,lt,600,1560,1.15,{kl:-.9,kh:-20});x.restore();
  x.save();x.globalCompositeOperation='multiply';x.fillStyle='rgba(120,140,190,.5)';x.fillRect(0,0,W,H);x.restore();rain(x,lt,.28);
  if(ll<.15){x.fillStyle='#fff';x.globalAlpha=.7*(1-ll/.15);x.fillRect(0,0,W,H);x.globalAlpha=1}
  popIn(x,ll,.15,null,()=>{x.save();x.translate(540,360);x.rotate(-.04);pill(x,0,0,520,140,26,C.red);rich(x,[['أبو فهد',C.paper]],0,6,80,{});x.restore()},{cy:360,from:1.8,d:.22});
  const wk=wd(7,3)-b[5]-rev;popIn(x,ll,Math.max(.6,wk),null,()=>{pill(x,540,520,560,96,48,'rgba(0,0,0,.72)',C.gold,5);rich(x,[['وولده الصغير 🤍',C.gold]],540,524,52,{weight:800})},{cy:520})}
 vignette(x,.85)}},
// 6 THE PLEA: close-up, heartbeat, kid looks at you
{t0:b[6],t1:b[7],draw(x,lt){const d=b[7]-b[6],s9=rel(9,6);x.fillStyle='#0c0d12';x.fillRect(0,0,W,H);
 if(lt<s9){x.save();cam(x,{z:lerp(1.9,2.1,lt/s9),x:470,y:1120});streetBg(x,lt);const r=kidPair(x,lt,600,1560,1.15,{bp:{rot:7,head:14,aL1:-62,aL2:-112},bf:'sad',sw:true,bl:.6,kl:-.9,kh:-20});x.restore();
  x.save();x.globalCompositeOperation='multiply';x.fillStyle='rgba(110,120,170,.55)';x.fillRect(0,0,W,H);x.restore();rain(x,lt,.22);
  const hb=Math.sin(lt*8)*.5+.5;x.fillStyle=`rgba(255,59,48,${.06*hb})`;x.fillRect(0,0,W,H);
  popIn(x,lt,.2,null,()=>{pill(x,540,330,900,150,30,'rgba(0,0,0,.78)',C.red,6);rich(x,[['«قضية السرقة… ',C.paper],['بتدخّلني السجن',C.red],['»',C.paper]],540,334,56,{weight:900,maxW:840})},{cy:330});
  bars(x,540,1000,620,560,.12+.08*hb);
 }else{const ll=lt-s9,dd=d-s9;x.save();cam(x,{z:lerp(2.4,2.8,ll/dd),x:690,y:1360});streetBg(x,lt);const r=kidPair(x,lt,600,1560,1.15,{bp:P.sad,kl:-1,kh:-26,kf:'sad'});x.restore();
  x.save();x.globalCompositeOperation='multiply';x.fillStyle='rgba(110,120,170,.55)';x.fillRect(0,0,W,H);x.restore();rain(x,lt,.22);
  tear(x,600,1000,ll,2.2);
  popIn(x,ll,.1,null,()=>{pill(x,540,330,820,150,30,'rgba(0,0,0,.78)',C.gold,6);rich(x,[['«ولدي… ',C.paper],['ماله أحد غيري',C.gold],['»',C.paper]],540,334,60,{weight:900,maxW:760})},{cy:330});
  popIn(x,ll,.9,null,()=>{pill(x,540,520,520,90,45,'rgba(0,0,0,.6)');rich(x,[['…ويطالعك 👀',C.paper]],540,524,46,{weight:800})},{cy:520})}
 vignette(x,.9)}},
// 7 OUTRO VOTE
{t0:b[7],t1:b[8],draw(x,lt){const zz=1+.02*Math.sin(lt*1.3);x.save();x.translate(540,960);x.scale(zz,zz);x.translate(-540,-960);
 outroSplit(x,lt,'وش بتسوي؟','تسامحه… وتتنازل','تكمّل… وياخذ جزاه',
 (x,t,y0,h)=>{const gy=y0+h-40;drawStick(x,{...BASE,...ME,...P.holdOut,aR1:70,aR2:60,x:330,y:gy-200,ground:gy,s:.8,face:'happy',look:1},t);kidPair(x,t,640,gy,.78,{bp:P.stand,bf:'happy',kf:'happy',kl:-.6});x.save();x.fillStyle=C.red;x.font='900 70px Cairo';x.textAlign='center';x.fillText('🤍',520,y0+250+Math.sin(t*4)*10);x.restore()},
 (x,t,y0,h)=>{const gy=y0+h-40;drawStick(x,{...BASE,...ME,...P.armsCross,x:300,y:gy-200,ground:gy,s:.8,face:'angry',look:1},t);drawStick(x,{...BASE,...FIRED,...P.sad,x:680,y:gy-200,ground:gy,s:.8,face:'sad',sweat:true,look:-1},t);bars(x,680,gy-170,300,340,1);gavel(x,900,gy-110,.4,-.3+Math.max(0,Math.sin(t*3))*.3)});
 x.restore();
 const aS=Ls(11)-b[7],aE=Le(11)-b[7],bS=Ls(12)-b[7],bE=Le(12)-b[7];
 const hl=(y0,col,s0,e0)=>{if(lt<s0||lt>e0+.2)return;const k=ease(prog(lt,s0,.25))*(1-prog(lt,e0,.2));const oth=y0===420?1020:420;
  x.save();x.globalAlpha=.55*k;x.fillStyle='#000';x.beginPath();x.roundRect(50,oth,980,560,40);x.fill();x.restore();
  x.save();x.globalAlpha=k*(.7+.3*Math.sin(lt*10));x.shadowColor=col;x.shadowBlur=50;x.strokeStyle=col;x.lineWidth=16;x.beginPath();x.roundRect(46,y0-4,988,568,44);x.stroke();x.restore();
  if(lt-s0<.3){const q=1-(lt-s0)/.3;x.save();x.globalAlpha=.35*q;x.fillStyle=col;x.fillRect(0,0,W,H);x.restore()}};
 hl(420,C.a,aS,aE);hl(1020,C.b,bS,bE);
 const fk=rel(13,7);if(lt>fk)popIn(x,lt,fk,null,()=>{pill(x,540,1850,880,84,42,C.gold);rich(x,[['قرارك… هو اللي بيقفل القصة 🔒',C.ink]],540,1854,44,{weight:900})},{cy:1850})}}
];
const T=[{at:b[1],dur:.3,type:'glitch'},{at:b[2],dur:.35,type:'whip'},{at:b[3],dur:.35,type:'zoom'},{at:b[4],dur:.3,type:'whipL'},{at:b[5],dur:.35,type:'flash'},{at:b[6],dur:.35,type:'zoom'},{at:b[7],dur:.5,type:'circle',col:C.a}];
boot(S,T,(x,t)=>{if(t<b[7]){if(t>b[1])hud(x,t,'قرارك');captions(x,t)}grain(x,t,.06)});
