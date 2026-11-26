const {chromium}=require('playwright');const path=require('path');
(async()=>{const [html,pre,list]=process.argv.slice(2);const ts=list.split(',');const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1080,height:1920}});
const errs=[];pg.on('pageerror',e=>errs.push(e.message));pg.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await pg.goto('file://'+path.resolve(html));await pg.evaluate(()=>window.__ready);
for(const t of ts){try{await pg.evaluate(t=>window.seek(+t),t)}catch(e){errs.push(t+': '+e.message)}await pg.screenshot({path:'/tmp/claude-0/-home-user/62c1ae28-3600-5e7e-bf83-3ed8de8d42f7/scratchpad/'+pre+'_'+t+'.jpg',type:'jpeg',quality:60})}
console.log(errs.join('\n')||'no errors');await b.close()})();
