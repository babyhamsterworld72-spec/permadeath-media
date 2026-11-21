const ME={ghutra:'#F7F4EE',checker:'#d23b3b'};const BOSS={tie:C.red,glasses:true,col:'#ECE6DC'};
function sparkle(x,cx,cy,t,s=1){const k=(Math.sin(t*9)+1)/2;x.save();x.translate(cx,cy);x.rotate(t*2);x.fillStyle=`rgba(255,240,180,${.5+.5*k})`;for(let i=0;i<4;i++){x.rotate(Math.PI/2);x.beginPath();x.moveTo(0,0);x.lineTo(8*s,8*s);x.lineTo(0,60*s*(.6+.4*k));x.lineTo(-8*s,8*s);x.fill()}x.restore()}
const END=TIMING.duration;
const b=[0,Ls(0)+1.9,Ls(1),Ls(3),Ls(5),Ls(6),Ls(7),Ls(8),Ls(9),END+0.01];
const S=[
// 1 street find
{t0:b[0],t1:b[1],draw(x,lt){const d=b[1]-b[0];const z=1+.3*easeIO(prog(lt,d-.9,.9)),cx=lerp(540,420,easeIO(prog(lt,d-.9,.9))),cy=lerp(960,1250,easeIO(prog(lt,d-.9,.9)));
 x.save();cam(x,{z,x:cx,y:cy});bgNight(x,lt,{gy:1500});lamp(x,300,1500,lt);
 const stop=.95;wallet(x,380,1485,.55);sparkle(x,380,1470,lt,1);
 const wx=lerp(1000,580,clamp(lt/stop));
 const p=anim(lt,[[0,ph=>walkPose(ph*9,-1),0],[stop,P.stand,.2],[stop+.1,{face:'shock',emote:'!',look:-1,head:-10},.12],[stop+.45,{...P.crouch,rot:-25,head:-25,aL1:-55,aL2:-75,aR1:-35,aR2:-45,lL1:18,lL2:-18,lR1:-55,lR2:8,face:'shock',look:-1,emote:null},.3]],{x:wx,y:1300,ground:1500,s:1.25,...ME});
 drawStick(x,p,lt);x.restore();vignette(x,.7)}},
// 2 wallet open + money
{t0:b[1],t1:b[2],draw(x,lt){x.fillStyle='#120e0b';x.fillRect(0,0,W,H);const g=x.createRadialGradient(540,1000,50,540,1000,900);g.addColorStop(0,'rgba(255,170,80,.35)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
 speedLines(x,540,1050,lt,lt<.5?.35*(1-lt*2):0);const [sx,sy]=shake(lt,.35,.3,18);x.save();x.translate(sx,sy);
 for(let i=0;i<5;i++){const k=easeIO(prog(lt,.1+i*.06,.5));bill(x,540+(i-2)*60*k,1080-k*(260+Math.abs(i-2)*-30),3.2,(i-2)*.22*k)}wallet(x,540,1150,3.4,0);x.restore();
 burst(x,540,950,lt,.35,40,C.gold,7,1100,10);moneyRain(x,lt,.3,30,5,4);
 const n=Math.round(easeIO(prog(lt,.3,1.0))*50000);
 popIn(x,lt,.25,null,()=>{x.save();x.font='900 220px Cairo';x.textAlign='center';x.textBaseline='middle';x.lineWidth=22;x.strokeStyle=C.ink;x.lineJoin='round';const tx=n.toLocaleString('en-US');x.strokeText(tx,540,560);x.fillStyle=C.gold;x.shadowColor='rgba(255,197,61,.6)';x.shadowBlur=40;x.fillText(tx,540,560);x.restore();rich(x,[['ريال',C.paper]],540,740,90,{stroke:14})},{cy:560});
 vignette(x,.6)}},
// 3 ID card reveal
{t0:b[2],t1:b[3],draw(x,lt){const d=b[3]-b[2],rv=Ls(2)-b[2]+.35;x.fillStyle='#14161d';x.fillRect(0,0,W,H);
 const z=lt<rv?1+.04*lt:lerp(1,2.0,easeIO(prog(lt,rv,.45)));x.save();cam(x,{z,x:lerp(540,410,easeIO(prog(lt,rv,.45))),y:lerp(1000,980,easeIO(prog(lt,rv,.45)))});
 const ci=back(prog(lt,.05,.5));x.save();x.translate(lerp(1500,540,ci),1000);x.rotate(lerp(.5,-.06,ci));
 pill(x,0,0,820,500,36,'#F4F1EC');x.fillStyle=C.b;x.beginPath();x.roundRect(-410,-250,820,90,[36,36,0,0]);x.fill();
 x.font='800 44px Cairo';x.fillStyle=C.ink;x.textAlign='center';x.textBaseline='middle';x.direction='rtl';x.fillText('بطاقة هوية',0,-205);
 pill(x,-200,40,260,300,20,'#dfe7ee');x.save();x.beginPath();x.roundRect(-330,-110,260,300,20);x.clip();drawStick(x,{...BASE,...BOSS,x:-200,y:340,s:1.6,face:lt>rv?'angry':'neutral',col:'#F4F1EC'},lt);x.restore();
 x.textAlign='right';x.font='900 58px Cairo';x.fillStyle=C.ink;x.fillText(lt>rv-.3?'أبو فهد':'••••••',330,-40);x.font='600 40px Cairo';x.fillStyle='#555';x.fillText('المدير العام',330,30);x.fillText('شركة النخبة',330,90);
 x.restore();x.restore();
 if(lt>rv&&lt<rv+.3){x.fillStyle=`rgba(255,59,48,${.5*(1-prog(lt,rv,.3))})`;x.fillRect(0,0,W,H)}
 if(lt>rv)popIn(x,lt,rv,null,()=>rich(x,[['!!',C.red]],540,420,170,{stroke:20}),{cy:420,from:2});
 vignette(x,.6)}},
// 4 flashback fired
{t0:b[3],t1:b[4],draw(x,lt){const d=b[4]-b[3],sl=Ls(4)-b[3];x.save();bgOffice(x,lt);
 const boss=anim(lt,[[0,{...P.armsCross,face:'angry'},0],[sl,{...P.pointL,face:'angry',aL1:-100,aL2:-90},.15]],{x:760,y:1300,ground:1500,s:1.15,...BOSS});
 const meX=lerp(430,110,easeIO(prog(lt,sl+.3,d-sl-.3)));
 const me=anim(lt,[[0,{...P.carry,face:'sad',head:12},0],[sl+.3,ph=>({...walkPose(ph*7,-1,.6),aL1:-40,aL2:-100,aR1:40,aR2:100,face:'sad',head:12}),.2]],{x:meX,y:1300,ground:1500,s:1.05,...ME});
 // coworkers watching
 for(let i=0;i<2;i++)drawStick(x,{...BASE,col:'#d9d3c9',x:150+i*120,y:1300,ground:1500,s:.7,face:'shock',look:.8,ghutra:'#e9e4da'},lt);
 drawStick(x,boss,lt);const j=drawStick(x,me,lt);box(x,(j.hL[0]+j.hR[0])/2,j.hL[1]+10,.8);
 popIn(x,lt,sl,null,()=>{pill(x,690,860,620,150,40,C.paper);x.fillStyle=C.paper;x.beginPath();x.moveTo(720,930);x.lineTo(770,1000);x.lineTo(780,925);x.fill();rich(x,[['ما عندنا مكان للي مثلك!',C.red]],690,865,52,{})},{cx:690,cy:860});
 x.restore();x.save();x.globalCompositeOperation='color';x.fillStyle='#b08a5a';x.globalAlpha=.55;x.fillRect(0,0,W,H);x.restore();
 x.fillStyle='rgba(0,0,0,.18)';for(let y=(lt*80)%8;y<H;y+=8)x.fillRect(0,y,W,3);
 popIn(x,lt,.05,null,()=>{pill(x,540,330,320,100,50,'rgba(0,0,0,.6)');rich(x,[['قبل شهر',C.paper]],540,334,56,{weight:800})},{cy:330});
 const st=.9;if(lt>st){const sp=prog(lt,st,.16),[sx,sy]=shake(lt,st+.12,.4,30);x.save();x.translate(540+sx,600+sy);x.rotate(-.07);x.scale(lerp(2.6,1,easeIn(sp)),lerp(2.6,1,easeIn(sp)));x.globalAlpha=clamp(sp*3)*(1-prog(lt,sl-.1,.3)*.0);
  pill(x,0,0,700,160,24,'rgba(255,59,48,.14)',C.red,12);rich(x,[['مفصول',C.red]],0,4,110,{});x.restore();if(lt<st+.35){x.fillStyle=`rgba(255,255,255,${.6*(1-prog(lt,st+.12,.25))})`;x.fillRect(0,0,W,H)}}
 vignette(x,.75)}},
// 5 alone, nobody saw
{t0:b[4],t1:b[5],draw(x,lt){const d=b[5]-b[4];const z=1.35+.15*lt/d;x.save();cam(x,{z,x:560,y:1150});bgNight(x,lt+3,{gy:1500});lamp(x,300,1500,lt,.85);
 const p=anim(lt,[[0,{...P.holdLook,face:'worried',look:0},0],[.4,{head:-14,look:-1},.15],[.9,{head:14,look:1},.15],[1.5,{head:8,look:0,face:'sly'},.2]],{x:560,y:1300,ground:1500,...ME,sweat:true});
 const j=drawStick(x,p,lt);wallet(x,(j.hL[0]+j.hR[0])/2,j.hL[1]-5,.5);x.restore();
 const hb=Math.max(0,Math.sin(lt*7))**8;x.fillStyle=`rgba(255,40,40,${.16*hb})`;x.fillRect(0,0,W,H);vignette(x,.85)}},
// 6 debts
{t0:b[5],t1:b[6],draw(x,lt){x.fillStyle='#111319';x.fillRect(0,0,W,H);
 const items=[['القسط',' 2,400'],['الإيجار',' 3,500'],['البطاقة',' 11,800'],['سلفة سعد',' 6,000']];
 items.forEach(([n,v],i)=>popIn(x,lt,.1+i*.28,null,()=>{const y=560+i*170;x.save();x.translate(540,y);x.rotate((i%2?.02:-.02));pill(x,0,0,820,140,24,'#F4F1EC');x.fillStyle=C.red;x.fillRect(-410,-70,18,140);rich(x,[[n,C.ink]],180,0,58,{});x.font='900 60px Cairo';x.fillStyle=C.red;x.textAlign='left';x.textBaseline='middle';x.fillText(v,-370,0);x.restore()},{cy:560+i*170}));
 // stamp paid at end
 const st=Math.min(b[6]-b[5]-.6,1.6);if(lt>st){const sp=prog(lt,st,.15);x.save();x.translate(540,820);x.rotate(-.12);x.scale(lerp(2.4,1,easeIn(sp)),lerp(2.4,1,easeIn(sp)));x.globalAlpha=clamp(sp*3);pill(x,0,0,640,200,24,'rgba(61,220,132,.15)',C.green,12);rich(x,[['مسدّدة',C.green]],0,6,120,{});x.restore()}
 drawStick(x,{...BASE,...ME,...(lt>st?P.celebrate:P.facepalm),x:540,y:1450,ground:1640,s:.9,face:lt>st?'money':'sad'},lt);
 vignette(x,.6)}},
// 7 imagine A: return, no thanks
{t0:b[6],t1:b[7],draw(x,lt){const d=b[7]-b[6];bgOffice(x,lt,'#22160f');
 const give=.5,leave=1.3;const bx=lerp(720,1150,easeIn(prog(lt,leave,d-leave)));
 const me=anim(lt,[[0,{...P.holdOut,face:'happy',squint:true},0],[leave,{...P.shrug,face:'sad'},.3]],{x:360,y:1300,ground:1500,s:1.1,...ME});const j=drawStick(x,me,lt);
 const boss=anim(lt,[[0,{...P.armsCross,face:'neutral'},0],[give,{...P.holdOut,aR1:-75,aR2:-88,face:'neutral'},.25],[leave,ph=>({...walkPose(ph*7,1,.7),face:'neutral'}),.2]],{x:bx,y:1300,ground:1500,s:1.15,...BOSS,look:-1});const jb=drawStick(x,boss,lt);
 if(lt<give+.25)wallet(x,j.hR[0]+20,j.hR[1]-10,.45);else wallet(x,jb.hR[0],jb.hR[1]-10,.45);
 popIn(x,lt,leave+.2,null,()=>{pill(x,360,830,200,120,40,C.paper);rich(x,[['...',C.ink]],360,820,70,{})},{cx:360,cy:830});
 x.save();x.globalCompositeOperation='color';x.fillStyle=C.a;x.globalAlpha=.25;x.fillRect(0,0,W,H);x.restore();
 popIn(x,lt,.05,null,()=>{pill(x,540,330,240,110,30,C.a);rich(x,[['A',C.ink]],540,336,80,{})},{cy:330});vignette(x,.7)}},
// 8 imagine B: keep + CCTV twist
{t0:b[7],t1:b[8],draw(x,lt){const d=b[8]-b[7];x.save();const z=1.2+.1*lt/d;cam(x,{z,x:560,y:1150});bgNight(x,lt+6,{gy:1500});lamp(x,300,1500,lt,.85);
 const p=anim(lt,[[0,{...P.sly,face:'sly',look:-.8},0]],{x:560,y:1300,ground:1500,...ME});const j=drawStick(x,p,lt);wallet(x,j.hR[0],j.hR[1]-10,.42);
 // CCTV camera on building
 const cv=d-1.0;x.save();x.translate(870,720);x.fillStyle='#2a2f3a';x.fillRect(-10,-60,20,60);x.save();x.rotate(.35);x.fillStyle='#3a404d';x.fillRect(-70,-20,130,48);x.fillStyle='#111';x.beginPath();x.arc(-70,4,18,0,7);x.fill();x.restore();
 const blink=Math.sin(lt*10)>0;x.fillStyle=blink?C.red:'#400';x.beginPath();x.arc(40,-8,9,0,7);x.fill();x.restore();
 if(lt>cv){const k=ease(prog(lt,cv,.4));x.strokeStyle=`rgba(255,59,48,${.9*k})`;x.lineWidth=10;x.setLineDash([24,16]);x.beginPath();x.arc(870,730,120,0,7);x.stroke();x.setLineDash([])}
 x.restore();
 x.save();x.globalCompositeOperation='color';x.fillStyle=C.b;x.globalAlpha=.22;x.fillRect(0,0,W,H);x.restore();
 popIn(x,lt,.05,null,()=>{pill(x,540,330,240,110,30,C.b);rich(x,[['B',C.ink]],540,336,80,{})},{cy:330});
 if(lt>cv+.1)popIn(x,lt,cv+.1,null,()=>{x.save();x.translate(0,0);x.font='800 40px Cairo';x.fillStyle=C.red;x.textAlign='left';x.fillText('● REC',60,460);x.restore()},{cx:150,cy:460});
 vignette(x,.8)}},
// 9 outro vote
{t0:b[8],t1:b[9],draw(x,lt){outroSplit(x,lt,'وش بتسوي؟','ترجعها له','تحتفظ فيها',
 (x,t,y0,h)=>{const gy=y0+h-40;drawStick(x,{...BASE,...P.holdOut,...ME,x:380,y:gy-200,ground:gy,s:.85,face:'happy',squint:true},t);drawStick(x,{...BASE,...BOSS,...P.shock,x:720,y:gy-200,ground:gy,s:.85,face:'shock'},t);wallet(x,520+Math.sin(t*4)*6,gy-250,.4)},
 (x,t,y0,h)=>{const gy=y0+h-40;const j=drawStick(x,{...BASE,...P.sly,...ME,x:540,y:gy-200,ground:gy,s:.85,face:'money',look:-.8},t);wallet(x,j.hR[0],j.hR[1]-10+Math.sin(t*6)*4,.38);for(let i=0;i<4;i++)bill(x,[190,330,750,890][i],y0+h-110+Math.sin(t*3+i)*20,.8,Math.sin(t*2+i)*.4)})}}
];
const T=[{at:b[1],dur:.4,type:'zoom'},{at:b[2],dur:.35,type:'whip'},{at:b[3],dur:.3,type:'glitch'},{at:b[4],dur:.3,type:'flash'},{at:b[5],dur:.35,type:'slideUp'},{at:b[6],dur:.35,type:'whip'},{at:b[7],dur:.35,type:'whipL'},{at:b[8],dur:.5,type:'circle',col:C.a}];
boot(S,T,(x,t)=>{if(t<b[8]){hud(x,t,'قرارك · الجزء ١');captions(x,t)}else{x.save();x.globalAlpha=.0;x.restore()}grain(x,t,.06)});
