// usage: node render/render.js <story_dir> <words.json> <out_silent.mp4> [tail_seconds] [max_frames]
const {chromium}=require('playwright');const {spawn}=require('child_process');const fs=require('fs'),path=require('path');
(async()=>{const [dir,wj,out,tail='1.2',maxf]=process.argv.slice(2);const words=JSON.parse(fs.readFileSync(wj));
const dur=words[words.length-1].end+parseFloat(tail);const FPS=30;let N=Math.ceil(dur*FPS);if(maxf)N=Math.min(N,+maxf);
const b=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});p.on('pageerror',e=>{console.error('PAGEERR',e.message);process.exit(2)});p.on('console',m=>{if(m.type()==='error')console.error('CONSOLE',m.text())});
await p.goto('file://'+path.resolve('render/engine.html'));await p.addScriptTag({path:path.resolve('render/kit.js')});await p.addScriptTag({path:path.resolve('render/styles.js')});await p.addScriptTag({path:path.join(dir,'scene.js')});
const cues=await p.evaluate(w=>window.init({words:w}),words);fs.writeFileSync(path.join(path.dirname(out),'cues.json'),JSON.stringify(cues));
const ff=spawn('ffmpeg',['-y','-v','error','-f','image2pipe','-framerate',''+FPS,'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','17','-pix_fmt','yuv420p','-r',''+FPS,out],{stdio:['pipe','inherit','inherit']});
const t0=Date.now();for(let i=0;i<N;i++){await p.evaluate(t=>window.renderAt(t),i/FPS);const f=await p.screenshot({type:'jpeg',quality:95});if(!ff.stdin.write(f))await new Promise(r=>ff.stdin.once('drain',r));}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log(`rendered ${N} frames (${(N/FPS).toFixed(1)}s) in ${((Date.now()-t0)/1000).toFixed(0)}s`);})();
