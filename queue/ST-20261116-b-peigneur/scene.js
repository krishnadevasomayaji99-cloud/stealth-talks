window.SCENE=function(a){const {k,ease,clamp,W,E}=a;const S=window.STYLES.paper;
const tRig=W('drilling'),tSw=W('swirl'),tSwal=W('swallowed'),tCan=W('canal'),tFif=W('fifty'),tRef=W('refilled'),tMine=W('mine'),tMil=W('million'),tEnd=a.words[a.words.length-1].end+0.4;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tRig,sfx:'click',gain:0.7},{t:tSw,sfx:'whoosh',gain:0.9},{t:tSwal,sfx:'thud',gain:1},{t:tCan,sfx:'whoosh',gain:0.8},{t:tFif,sfx:'tick',gain:0.8},{t:tMine-0.5,sfx:'rise',gain:0.9},{t:tMine,sfx:'chime',gain:1}];
return {cues,caption:S.caption,capY:1600,
 cam(t){const z=k(t,[[0,1],[tSw,1],[tSwal,1.2],[tRef,1],[tMine,1.3],[tMine+1.2,1],[tEnd,1.05]]);const [sx,sy]=a.shake(t,(t>tSw&&t<tSwal+0.5)?7:0);return{x:540+sx,y:960+sy,z};},
 draw(c,t){S.bg(c,t,{px:t*2});
  const drain=t<tSw?0:clamp((t-tSw)/(tFif-tSw));const refill=t<tRef?0:clamp((t-tRef)/1.5);const lvl=1000+ (t<tRef?drain*380:380*(1-refill));
  // lake
  c.fillStyle='#2a6f97';c.fillRect(0,lvl,1080,1900-lvl);
  // whirlpool
  if(t>=tSw&&t<tRef){c.strokeStyle='#d9f0ff';c.lineWidth=8;for(let i=0;i<5;i++){c.beginPath();c.ellipse(540,lvl+80,90+i*60,28+i*14,0,t*6+i,t*6+i+4.5);c.stroke();}}
  // rig sinks
  const sink=t<tSwal?0:clamp((t-tSwal)/1.2)*500;c.fillStyle='#8a1f2b';c.fillRect(480,700+sink,120,300);c.fillRect(440,640+sink,200,60);c.strokeStyle='#111';c.lineWidth=8;c.strokeRect(480,700+sink,120,300);
  // mine layer
  if(t>=tMine-0.6){c.fillStyle='#f3f3f3';c.fillRect(0,1500,1080,400);c.font='900 100px sans-serif';c.fillStyle='#111';c.textAlign='center';c.fillText('SALT MINE',540,1720);}
  if(t>=tFif&&t<tRef){c.font='900 200px sans-serif';c.fillStyle='#fff';c.textAlign='center';c.fillText('0 DEAD',540,520);}
  if(t>=tMil){c.font='900 150px sans-serif';c.fillStyle='#ffe8a3';c.textAlign='center';c.fillText('$32M',540,500);}
  S.fig(c,t,{x:900,y:1700,s:0.7});
  if(Math.abs(t-tMine)<0.1){c.fillStyle='rgba(255,255,255,0.5)';c.fillRect(0,0,1080,1920);}
 },
 post(c,t){S.post(c,t);}};};
