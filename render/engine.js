// Stealth Talks scene engine: deterministic canvas renderer. renderAt(t) draws frame at time t (seconds).
// A story supplies window.SCENE = (api) => ({cues:[{t,sfx,gain}], cam(t)->{x,y,z}, draw(ctx,t)}). Captions are added by the engine from word timings.
(function(){
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x)};
const outBack=x=>{x=clamp(x);const c=1.70158;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)};
function k(t,pts){if(t<=pts[0][0])return pts[0][1];for(let i=1;i<pts.length;i++){if(t<=pts[i][0]){const[t0,v0]=pts[i-1],[t1,v1]=pts[i];return v0+(v1-v0)*ease((t-t0)/(t1-t0));}}return pts[pts.length-1][1];}
const norm=s=>s.toLowerCase().replace(/[^a-z0-9']/g,'');
let S=null,words=[],chunks=[];
function buildChunks(){chunks=[];let cur=[];words.forEach((w,i)=>{cur.push(i);const end=/[.!?,;:]$/.test(w.w)||cur.length>=3||cur.map(i=>words[i].w).join(' ').length>=14;if(end){chunks.push(cur);cur=[];}});if(cur.length)chunks.push(cur);}
window.init=function(cfg){
  words=cfg.words;buildChunks();
  const api={clamp,ease,outBack,k,words,
    W(q,n=0){q=norm(q);let c=0;for(const w of words){const x=norm(w.w);if(x===q||x.startsWith(q)){if(c===n)return w.start;c++;}}throw new Error('word not found: '+q+' #'+n+' in '+words.map(w=>norm(w.w)).join(' '));},
    E(q,n=0){q=norm(q);let c=0;for(const w of words){const x=norm(w.w);if(x===q||x.startsWith(q)){if(c===n)return w.end;c++;}}throw new Error('word not found: '+q);},
    shake(t,a){return[Math.sin(t*91.7)*a,Math.cos(t*77.3)*a];}};
  S=window.SCENE(api);window.__cues=S.cues||[];window.ready=true;return window.__cues;
};
function drawCaptions(ctx,t){
  let ch=null;for(const c of chunks){const a=words[c[0]].start-0.05,b=words[c[c.length-1]].end+0.25;if(t>=a&&t<=b)ch=c;}
  if(!ch)return;
  const V=(S&&S.caption)||'bar',capY=(S&&S.capY)||1390;
  const txt=ch.map(i=>words[i].w.replace(/^[\s]+|[\s]+$/g,'').toUpperCase());
  ctx.save();ctx.textBaseline='middle';ctx.lineJoin='round';
  const font={bar:'900 92px "DejaVu Sans", Arial, sans-serif',typewriter:'700 64px "DejaVu Sans Mono", monospace',crt:'700 66px "DejaVu Sans Mono", monospace',scribble:'italic 900 88px "DejaVu Sans", Arial, sans-serif',comic:'900 84px "DejaVu Sans", Arial, sans-serif'}[V]||'900 92px "DejaVu Sans", Arial, sans-serif';
  ctx.font=font;
  const sp=ctx.measureText(' ').width;const ws=txt.map(s=>ctx.measureText(s).width);
  const total=ws.reduce((a,b)=>a+b,0)+sp*(txt.length-1);let sc=Math.min(1,900/total);
  const age=t-words[ch[0]].start;const pop=V==='bar'||V==='comic'?0.92+0.08*outBack(age/0.12):1;
  ctx.translate(540,capY);
  if(V==='typewriter'){ // suspense: lower-third, letterspaced, reveals word by word, thin gold underline
    ctx.scale(sc,sc);let x=-total/2;ctx.fillStyle='rgba(0,0,0,0.55)';ctx.fillRect(-total/2-24,-46,total+48,92);ctx.fillStyle='#ffd27a';ctx.fillRect(-total/2-24,46,total+48,4);
    txt.forEach((s,j)=>{const w=words[ch[j]];if(t>=w.start-0.02){ctx.fillStyle=(t<w.end+0.05)?'#fff3cf':'#d9c79a';ctx.fillText(s,x,0);}x+=ws[j]+sp;});
  }else if(V==='crt'){ // green phosphor on black bar, blinking cursor
    ctx.scale(sc,sc);let x=-total/2;ctx.fillStyle='rgba(0,8,3,0.78)';ctx.fillRect(-total/2-26,-48,total+52,96);
    txt.forEach((s,j)=>{const w=words[ch[j]];if(t>=w.start-0.02){ctx.fillStyle='#7dffb0';ctx.shadowColor='#3dff8a';ctx.shadowBlur=14;ctx.fillText(s,x,0);ctx.shadowBlur=0;}x+=ws[j]+sp;});
    if(Math.floor(t*3)%2===0){ctx.fillStyle='#7dffb0';ctx.fillRect(total/2+4,-26,18,52);}
  }else if(V==='scribble'){ // marker highlight behind handwritten-feel words, slight tilt
    ctx.rotate(-0.03);ctx.scale(sc,sc);let x=-total/2;
    txt.forEach((s,j)=>{const w=words[ch[j]];const on=t>=w.start&&t<w.end+0.05;if(on){ctx.fillStyle='rgba(255,226,60,0.85)';ctx.fillRect(x-8,-44,ws[j]+16,88);}ctx.fillStyle='#1d2a4a';ctx.fillText(s,x,0);x+=ws[j]+sp;});
  }else if(V==='comic'){ // white speech box, thick black border, red accent on active word
    ctx.scale(sc*pop,sc*pop);let x=-total/2;ctx.fillStyle='#fff';ctx.strokeStyle='#111';ctx.lineWidth=10;ctx.beginPath();ctx.roundRect(-total/2-30,-60,total+60,120,18);ctx.fill();ctx.stroke();
    txt.forEach((s,j)=>{const w=words[ch[j]];const on=t>=w.start&&t<w.end+0.05;ctx.fillStyle=on?'#e63946':'#111';ctx.fillText(s,x,0);x+=ws[j]+sp;});
  }else{ // default (original look)
    ctx.scale(sc*pop,sc*pop);let x=-total/2;
    txt.forEach((s,j)=>{const w=words[ch[j]];const on=t>=w.start&&t<w.end+0.05;ctx.lineWidth=22;ctx.strokeStyle='#111';ctx.strokeText(s,x,0);ctx.fillStyle=on?'#ffd23f':'#fff';ctx.fillText(s,x,0);x+=ws[j]+sp;});
  }
  ctx.restore();
}
window.renderAt=function(t){
  const c=document.getElementById('c'),ctx=c.getContext('2d');
  ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,1080,1920);
  const cam=S.cam?S.cam(t):{x:540,y:960,z:1};
  ctx.save();ctx.translate(540,960);ctx.scale(cam.z,cam.z);ctx.translate(-cam.x,-cam.y);
  S.draw(ctx,t);ctx.restore();
  drawCaptions(ctx,t);
  if(S.fx){const f=S.fx(t);if(f.lines>0){ctx.save();ctx.translate(540,960);ctx.strokeStyle='rgba(255,255,255,'+(0.55*f.lines)+')';ctx.lineWidth=5;for(let i=0;i<46;i++){const an=i*0.1366+t*0.5,r0=520+((i*37)%90),r1=1500;ctx.beginPath();ctx.moveTo(Math.cos(an)*r0,Math.sin(an)*r0*1.5);ctx.lineTo(Math.cos(an)*r1,Math.sin(an)*r1*1.5);ctx.stroke();}ctx.restore();}if(f.flash>0){ctx.fillStyle='rgba(255,255,255,'+f.flash+')';ctx.fillRect(0,0,1080,1920);}}
  if(S.post){ctx.save();S.post(ctx,t);ctx.restore();}
  // gentle vignette
  const g=ctx.createRadialGradient(540,960,700,540,960,1250);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,0.28)');ctx.fillStyle=g;ctx.fillRect(0,0,1080,1920);
};
})();
