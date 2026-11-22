const ME={ghutra:'#F7F4EE',checker:'#d23b3b'};const BOSS={tie:C.red,glasses:true,col:'#ECE6DC',ghutra:'#F7F4EE'};const SAAD={ghutra:'#F7F4EE',checker:'#1c1d22',col:'#EDE7DD'};
function bigCam(x,cx,cy,t,s){x.save();x.translate(cx,cy);x.scale(s,s);x.fillStyle='#262a33';x.fillRect(-30,-520,60,300);x.rotate(.12);const bg=x.createLinearGradient(0,-170,0,170);bg.addColorStop(0,'#5b6272');bg.addColorStop(1,'#2b303b');x.fillStyle=bg;x.beginPath();x.roundRect(-330,-170,560,340,60);x.fill();x.fillStyle='#0b0c10';x.beginPath();x.arc(-330,0,165,0,7);x.fill();const lg=x.createRadialGradient(-360,-40,10,-330,0,150);lg.addColorStop(0,'#5fd3ff');lg.addColorStop(.35,'#16324a');lg.addColorStop(1,'#05070a');x.fillStyle=lg;x.beginPath();x.arc(-330,0,130,0,7);x.fill();x.fillStyle=C.red;x.shadowColor=C.red;x.shadowBlur=40;x.beginPath();x.arc(130,-90,22,0,7);x.fill();x.restore()}
window.__ready=document.fonts.load('900 80px Cairo').then(()=>document.fonts.load('800 80px Cairo')).then(()=>{const x=document.getElementById('c').getContext('2d');
 bgNight(x,1,{gy:1500});x.fillStyle='rgba(0,0,0,.45)';x.fillRect(0,0,W,H);
 bigCam(x,820,760,1,.55);
 drawStick(x,{...BASE,...BOSS,x:330,y:1320,ground:1520,s:1.35,face:'sly',look:.6,aR1:60,aR2:20},.3);
 drawStick(x,{...BASE,...SAAD,x:780,y:1320,ground:1520,s:1.25,face:'sly',look:-.6},.3);
 x.save();x.strokeStyle=C.red;x.lineWidth=12;x.setLineDash([26,16]);x.beginPath();x.arc(780,960,150,0,7);x.stroke();x.restore();
 wallet(x,330,1530,.9,.3);
 rich(x,[['المحفظة كانت',C.paper]],540,300,110,{stroke:20});rich(x,[['فخ!',C.gold]],540,450,170,{stroke:24});
 x.save();x.translate(540,620);x.rotate(-.04);pill(x,0,0,820,120,22,C.red);rich(x,[['…والخاين صاحبك',C.paper]],0,4,64,{});x.restore();
 pill(x,540,1820,520,100,50,'rgba(0,0,0,.7)');rich(x,[['الجزء ٢ · أنت تقرر',C.paper]],540,1824,48,{weight:800});logo(x,820,1820,60);return 1});
