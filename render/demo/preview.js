// usage: node render/demo/preview.js <outdir>   (renders 3 frames per style to PNG)
const {chromium}=require('playwright');const path=require('path'),fs=require('fs');
const words="It was empty. Then the thing started to run. Nobody had told him about it.".split(' ').map((w,i)=>({w,start:0.4+i*0.5,end:0.4+i*0.5+0.42}));
(async()=>{const out=process.argv[2];fs.mkdirSync(out,{recursive:true});const b=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
for(const st of ['noir','crt','notebook','comic','paper']){const p=await b.newPage({viewport:{width:1080,height:1920}});p.on('pageerror',e=>console.error('PAGEERR',st,e.message));
 await p.goto('file://'+path.resolve('render/engine.html'));await p.addScriptTag({path:path.resolve('render/kit.js')});await p.addScriptTag({path:path.resolve('render/styles.js')});
 await p.evaluate(s=>{window.__DEMO=s},st);await p.addScriptTag({path:path.resolve('render/demo/demo_scene.js')});
 // find word-time for 'thing'/'run'
 await p.evaluate(w=>window.init({words:w}),words);
 for(const t of [1.0,3.2,4.6]){await p.evaluate(t=>window.renderAt(t),t);await p.screenshot({path:`${out}/${st}_${t}.png`});}
 await p.close();}
await b.close();console.log('done');})();
