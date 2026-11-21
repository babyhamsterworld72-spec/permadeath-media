// node render.js page.html out.mp4 dur   |  node render.js page.html --shots t1,t2,...
const {chromium}=require('playwright');const {spawn}=require('child_process');const path=require('path');
(async()=>{const [html,out,dur]=process.argv.slice(2);
 const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1080,height:1920}});
 await pg.goto('file://'+path.resolve(html));await pg.waitForLoadState('networkidle');await pg.evaluate(()=>window.__ready||document.fonts.ready);
 if(out==='--shots'){const ts=dur.split(',');for(const t of ts){await pg.evaluate(t=>window.seek(+t),t);await pg.screenshot({path:`${html}.${t}.png`})}await b.close();return}
 const fps=30,n=Math.round(+dur*fps);
 const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate',''+fps,'-vcodec','mjpeg','-i','-','-c:v','libx264','-crf','17','-preset','fast','-pix_fmt','yuv420p',out],{stdio:['pipe','inherit','inherit']});
 for(let i=0;i<n;i++){await pg.evaluate(t=>window.seek(t),i/fps);const buf=await pg.screenshot({type:'jpeg',quality:95});
  if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r))}
 ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log('wrote',out,n)})();
