window.SCENE=function(a){const {k,ease,clamp,W,E}=a;const S=window.STYLES.crt;
const tSum=W('Summer'),tHer=W('Troffea'),tMore=W('join'),tFour=W('four'),tNob=W('Nobody'),tAuth=W('authorities'),tStage=W('stage'),tMus=W('musicians'),tNot=W('not'),tEnd=a.words[a.words.length-1].end+0.4;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tHer,sfx:'click',gain:0.8},{t:tMore,sfx:'tick',gain:0.8},{t:tFour,sfx:'whoosh',gain:0.9},{t:tAuth,sfx:'click',gain:0.8},{t:tStage,sfx:'thud',gain:0.9},{t:tMus-0.5,sfx:'rise',gain:0.9},{t:tMus,sfx:'chime',gain:1}];
const g='rgba(190,255,215,0.95)';
return {cues,caption:S.caption,capY:1560,
 cam(t){const z=k(t,[[0,1],[tMore,1],[tFour,1.12],[tStage,1],[tMus,1.3],[tMus+1.2,1],[tEnd,1.05]]);const [sx,sy]=a.shake(t,(t>tFour&&t<tStage)?3:0);return{x:540+sx,y:960+sy,z};},
 draw(c,t){S.bg(c,t,{vx:0});
  const n=t<tHer?1:t<tMore?1:t<tFour?Math.round(2+34*clamp((t-tMore)/(tFour-tMore))):Math.round(36+364*clamp((t-tFour)/1.5));
  c.font='700 120px "DejaVu Sans Mono",monospace';c.textAlign='center';c.fillStyle=t>=tFour?'#ff5050':g;c.fillText(n+' DANCERS',540,420);
  c.strokeStyle=g;c.lineWidth=8;c.beginPath();c.moveTo(0,1250);c.lineTo(1080,1250);c.stroke();
  if(t>=tStage){c.fillStyle='rgba(190,255,215,0.35)';c.fillRect(200,1100,680,150);c.strokeRect(200,1100,680,150);c.font='900 70px sans-serif';c.fillStyle=g;c.fillText('STAGE',540,1190);}
  const m=Math.min(n,40);
  for(let i=0;i<m;i++){const x=i===0?540:60+(i*97%960),y=1230-(i%3)*10;const ph=t*9+i;S.fig(c,t,{x:x,y:y-Math.abs(Math.sin(ph))*40,s:i===0?0.7:0.28,glitch:(t>tFour&&t<tStage)?1:0});}
  if(t>=tMus){c.font='900 110px sans-serif';c.fillStyle='#ff5050';c.fillText('BAND HIRED',540,300);}
  if(Math.abs(t-tMus)<0.1){c.fillStyle='rgba(255,255,255,0.4)';c.fillRect(0,0,1080,1920);}
 },
 post(c,t){S.post(c,t,{tc0:518,cam:'STRASBOURG 1518',glitch:(Math.abs(t-tStage)<0.2||Math.abs(t-tMus)<0.2)?1:0});}};};
