const ME={ghutra:'#F7F4EE',checker:'#d23b3b'};
function bigPhone(x,cx,cy,s,rot,screen){x.save();x.translate(cx,cy);x.rotate(rot);x.scale(s,s);x.shadowColor='rgba(255,197,61,.6)';x.shadowBlur=80;x.fillStyle='#0b0d12';x.beginPath();x.roundRect(-230,-460,460,920,60);x.fill();x.shadowBlur=0;
 x.fillStyle='#141821';x.beginPath();x.roundRect(-208,-436,416,872,44);x.fill();x.save();x.beginPath();x.roundRect(-208,-436,416,872,44);x.clip();screen(x);x.restore();x.restore()}
window.__ready=document.fonts.load('900 80px Cairo').then(()=>document.fonts.load('800 80px Cairo')).then(()=>{const x=document.getElementById('c').getContext('2d');
 x.fillStyle='#0a0d14';x.fillRect(0,0,W,H);const g=x.createRadialGradient(540,1050,40,540,1050,1000);g.addColorStop(0,'rgba(255,197,61,.3)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
 speedLines(x,540,1050,.5,.18,C.gold);moneyRain(x,1.2,0,30,9,5);
 bigPhone(x,690,1250,.95,.08,(x)=>{x.fillStyle='#0f1620';x.fillRect(-208,-436,416,872);pill(x,0,-200,380,250,30,'#1d2733',C.green,4);rich(x,[['🏦 البنك',C.muted]],60,-275,28,{weight:800});rich(x,[['تم إيداع مبلغ',C.paper]],0,-225,34,{weight:800});rich(x,[['80,000 ريال',C.gold]],0,-160,54,{weight:900});rich(x,[['من: حساب غير معروف',C.muted]],0,-110,24,{weight:700});
  pill(x,0,80,380,170,30,'#1b3a2c',C.red,4);rich(x,[['📞 رقم غريب',C.paper]],0,50,34,{weight:900});rich(x,[['مكالمة واردة…',C.muted]],0,110,26,{weight:700})});
 drawStick(x,{...BASE,...ME,...P.shock,x:250,y:1430,ground:1640,s:1.15,face:'shock',sweat:true,look:1},.3);
 rich(x,[['وصلتني بالغلط!',C.paper]],540,250,100,{stroke:18});
 x.save();x.translate(540,450);x.rotate(-.05);pill(x,0,0,820,200,28,C.gold);rich(x,[['80,000 ريال',C.ink]],0,8,110,{});x.restore();
 rich(x,[['ترجّعها؟ ',C.a],['ولا نصّاب؟',C.b]],540,660,74,{stroke:14});
 pill(x,540,1820,620,100,50,'rgba(0,0,0,.7)');rich(x,[['وش بتسوي؟ ',C.paper],['A',C.a],[' أو ',C.paper],['B',C.b]],540,1824,52,{weight:900});logo(x,880,1820,60);
 vignette(x,.55);return 1});
