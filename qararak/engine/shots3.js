const {chromium}=require('playwright');const path=require('path');
(async()=>{const ts=process.argv[2].split(',');const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1080,height:1920}});
const errs=[];pg.on('pageerror',e=>errs.push(e.message));pg.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await pg.goto('file://'+path.resolve('ep03.html'));await pg.evaluate(()=>window.__ready);
for(const t of ts){try{await pg.evaluate(t=>window.seek(+t),t)}catch(e){errs.push(t+': '+e.message)}await pg.screenshot({path:`/tmp/claude-0/-home-user/5c3441b9-a9be-5bd3-8343-8692f57dcc1e/scratchpad/s_${t}.jpg`,type:'jpeg',quality:70})}
console.log(errs.join('\n')||'no errors');await b.close()})();
