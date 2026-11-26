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
