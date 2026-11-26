const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
const jobs=[['intro',0],['frame',0],['frame',1],['frame',2],['frame',3],['frame',4],['bridge',0],['bridge',1],['bridge',2],['bridge',3],['final',0],['frame7',0],['outro',0]];
for(const [m,i] of jobs){await p.goto('file://'+__dirname+`/card.html?m=${m}&i=${i}`);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);await p.screenshot({path:__dirname+`/${m}${i}.png`});}
await b.close()})()
