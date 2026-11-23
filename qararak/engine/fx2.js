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
