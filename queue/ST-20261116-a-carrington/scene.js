window.SCENE=function(a){const {k,ease,clamp,W,E}=a;const S=window.STYLES.noir;
const tSp=W('sparking'),tShock=W('shocks'),tCuba=W('Cuba'),tFire=W('fires'),tFor=W('forehead'),tBos=W('Boston'),tOff=W('off'),tHours=W('hours'),tFl=W('flare'),tEnd=a.words[a.words.length-1].end+0.4;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tSp,sfx:'tick',gain:0.8},{t:tShock,sfx:'thud',gain:0.9},{t:tFire,sfx:'whoosh',gain:0.8},{t:tFor,sfx:'click',gain:0.9},{t:tOff,sfx:'thud',gain:1},{t:tFl-0.5,sfx:'rise',gain:0.9},{t:tFl,sfx:'chime',gain:1}];
return {cues,caption:S.caption,capY:1560,
 cam(t){const z=k(t,[[0,1],[tBos,1],[tOff,1.2],[tHours,1.05],[tFl,1.3],[tFl+1.2,1],[tEnd,1.05]]);const [sx,sy]=a.shake(t,(t>tShock&&t<tShock+0.6)?8:0);return{x:540+sx,y:960+sy,z};},
 draw(c,t){S.bg(c,t,{sweep:t>=tCuba?0.5:undefined});
  // aurora bands
  if(t>=tCuba){for(let i=0;i<4;i++){c.fillStyle='rgba('+(i%2?'255,70,90':'80,255,160')+','+0.12+')';c.beginPath();c.moveTo(0,300+i*70);for(let x=0;x<=1080;x+=60)c.lineTo(x,300+i*70+Math.sin(x/120+t*2+i)*50);c.lineTo(1080,600+i*70);c.lineTo(0,600+i*70);c.closePath();c.fill();}}
  // telegraph key + sparks
  c.fillStyle='#1a1d28';c.fillRect(300,1180,480,40);c.fillRect(480,1110,120,70);
  c.strokeStyle='#ffd25a';c.lineWidth=6;c.strokeRect(300,1180,480,40);
  if(t>=tSp&&t<tOff){for(let i=0;i<10;i++){const a2=a.R?a.R(i+Math.floor(t*20)):((Math.sin(i*12.9+Math.floor(t*20)*3.1)*43758)%1);const x=540+(a2-0.5)*400,y=1090-Math.abs(a2*180);c.fillStyle='#fff3a0';c.fillRect(x,y,8,8);}}
  // battery box
  if(t>=tBos){c.fillStyle=t>=tOff?'#333':'#c9a227';c.fillRect(100,1000,160,200);c.font='900 60px sans-serif';c.fillStyle=t>=tOff?'#ff5050':'#111';c.textAlign='center';c.fillText(t>=tOff?'OFF':'ON',180,1120);}
  if(t>=tHours&&t<tFl){c.font='700 120px "DejaVu Sans Mono",monospace';c.fillStyle='#ffd25a';c.textAlign='center';c.fillText('2 HOURS',540,520);}
  S.fig(c,t,{x:760,y:1500,s:0.9,eyes:t>=tShock?1:0,lean:t>=tShock&&t<tShock+0.6?-30:0});
  if(Math.abs(t-tFl)<0.1){c.fillStyle='rgba(255,240,200,0.6)';c.fillRect(0,0,1080,1920);}
 },
 post(c,t){S.post(c,t);}};};
