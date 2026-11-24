const ME={ghutra:'#F7F4EE',checker:'#d23b3b'};const BOSS={tie:C.red,glasses:true,col:'#ECE6DC'};
function gavel(x,cx,cy,sc,ang){x.save();x.translate(cx,cy);x.scale(sc,sc);x.fillStyle='#3a2414';x.beginPath();x.ellipse(0,150,170,34,0,0,7);x.fill();x.fillStyle='#5a3a20';x.fillRect(-150,110,300,40);
 x.save();x.translate(150,60);x.rotate(ang);x.fillStyle='#7a4f2b';x.fillRect(-14,-20,28,-230);x.fillStyle='#8f5f34';x.beginPath();x.roundRect(-95,-290,190,90,22);x.fill();x.fillStyle=C.gold;x.fillRect(-60,-290,14,90);x.fillRect(46,-290,14,90);x.restore();x.restore()}
function scales(x,cx,cy,sc,t){x.save();x.translate(cx,cy);x.scale(sc,sc);x.strokeStyle=C.gold;x.fillStyle=C.gold;x.lineWidth=10;x.lineCap='round';const a=Math.sin(t*2)*.12;
 x.beginPath();x.moveTo(0,-120);x.lineTo(0,120);x.moveTo(-70,120);x.lineTo(70,120);x.stroke();x.save();x.translate(0,-110);x.rotate(a);x.beginPath();x.moveTo(-130,0);x.lineTo(130,0);x.stroke();
 [-130,130].forEach((px,i)=>{x.save();x.translate(px,0);x.rotate(-a);x.beginPath();x.moveTo(0,0);x.lineTo(-45,90);x.moveTo(0,0);x.lineTo(45,90);x.stroke();x.beginPath();x.ellipse(0,92,58,14,0,0,Math.PI);x.fill();x.restore()});x.restore();
 x.beginPath();x.arc(0,-120,14,0,7);x.fill();x.restore()}
window.__ready=document.fonts.load('900 80px Cairo').then(()=>document.fonts.load('800 80px Cairo')).then(()=>{const x=document.getElementById('c').getContext('2d');
 x.fillStyle='#140b0a';x.fillRect(0,0,W,H);const g=x.createRadialGradient(540,1050,40,540,1050,1000);g.addColorStop(0,'rgba(255,59,48,.38)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
 speedLines(x,540,1100,0.4,.2,'#ff3b30');
 drawStick(x,{...BASE,...BOSS,...P.holdOut,aR1:-80,aR2:-92,x:800,y:1350,ground:1560,s:1.35,face:'sly',look:-1},.3);
 const j=drawStick(x,{...BASE,...ME,...P.shock,x:260,y:1350,ground:1560,s:1.3,face:'shock',sweat:true,look:1},.3);
 x.save();x.translate(560,1150);x.rotate(-.08);x.fillStyle='#f3efe6';x.fillRect(-120,-160,240,320);x.fillStyle='#1d4f3a';x.fillRect(-120,-160,240,50);x.strokeStyle=C.red;x.lineWidth=8;x.strokeRect(-90,30,180,80);rich(x,[['قضية',C.red]],0,72,54,{});x.restore();
 rich(x,[['فضحته قدام الكل…',C.paper]],540,300,92,{stroke:18});
 x.save();x.translate(540,500);x.rotate(-.05);pill(x,0,0,900,200,28,C.red);rich(x,[['ورفع عليّ قضية!',C.paper]],0,8,118,{});x.restore();
 rich(x,[['⚖️ المحكمة ',C.a],['ولا ',C.paper],['100,000 ريال؟',C.gold]],540,700,64,{stroke:14});
 pill(x,540,1800,620,100,50,'rgba(0,0,0,.7)');rich(x,[['وش بتسوي؟ ',C.paper],['A',C.a],[' أو ',C.paper],['B',C.b]],540,1804,52,{weight:900});logo(x,880,1800,60);
 vignette(x,.55);return 1});
