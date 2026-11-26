function kidAlone(x,t,cx,gy,s,opt={}){return drawStick(x,{...BASE,...KID,...(opt.p||P.sad),head:opt.kh??22,x:cx,y:gy-110*s,ground:gy,s:s*.52,face:opt.kf||'sad',look:opt.kl??0},t)}
window.__ready=document.fonts.load('900 80px Cairo').then(()=>document.fonts.load('800 80px Cairo')).then(()=>{const x=document.getElementById('c').getContext('2d');
 x.save();cam(x,{z:1.15,x:600,y:1080});streetBg(x,0);
 drawStick(x,{...BASE,...ME,...P.sad,x:330,y:1360,ground:1560,s:1.15,face:'sad',look:1},.3);
 kidAlone(x,.4,780,1560,1.4,{p:{...P.stand,aL1:-40,aL2:-60},kh:-22,kf:'sad',kl:-1});x.restore();
 x.save();x.globalCompositeOperation='multiply';x.fillStyle='rgba(120,140,190,.5)';x.fillRect(0,0,W,H);x.restore();rain(x,.37,.32);
 tear(x,722,1190,.2,1.6);
 const g=x.createRadialGradient(540,500,40,540,500,800);g.addColorStop(0,'rgba(34,211,238,.22)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
 rich(x,[['أبوه دخل السجن…',C.paper]],540,280,96,{stroke:18});
 x.save();x.translate(540,480);x.rotate(-.05);pill(x,0,0,940,200,28,C.gold);rich(x,[['«أبوي… متى يرجع؟»',C.ink]],0,8,96,{maxW:860});x.restore();
 rich(x,[['تتكفّل فيه ',C.a],['ولا ',C.paper],['تمشي؟',C.b]],540,690,72,{stroke:14});
 pill(x,540,1800,700,100,50,'rgba(0,0,0,.7)');rich(x,[['آخر قرار 🔒 ',C.paper],['A',C.a],[' أو ',C.paper],['B',C.b]],540,1804,52,{weight:900});logo(x,920,1800,60);
 vignette(x,.55);return 1});
