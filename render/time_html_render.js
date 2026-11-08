// Frame-capture timing test: same method as the laptop renderer (headless Chromium screenshot -> ffmpeg), on a sample of frames.
const {chromium}=require('playwright');const {spawn}=require('child_process');const path=require('path');
(async()=>{const N=+process.argv[2]||90;const b=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
await p.goto('file://'+path.resolve('render/html/index.html'));await p.waitForFunction(()=>window.ready);
const ff=spawn('ffmpeg',['-y','-v','error','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p','/tmp/html-test.mp4'],{stdio:['pipe','inherit','inherit']});
const t0=Date.now();
for(let i=0;i<N;i++){await p.evaluate(t=>window.renderAt(t),i/30);const f=await p.screenshot({type:'jpeg',quality:95});if(!ff.stdin.write(f))await new Promise(r=>ff.stdin.once('drain',r));}
ff.stdin.end();await new Promise(r=>ff.on('close',r));const s=(Date.now()-t0)/1000;await b.close();
console.log(`HTML RENDER: ${N} frames in ${s.toFixed(1)} s = ${(s/N).toFixed(3)} s/frame; ESTIMATED 45s (1350 frames): ${(s/N*1350/60).toFixed(1)} min`);})();
