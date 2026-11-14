window.SCENE=function(a){const {k,ease,clamp,W,E}=a;const S=window.STYLES.noir;
const tSank=W('sank'),tLen=W('long'),tMin=W('minutes'),tThirty=W('Thirty'),tRoll=W('roll'),tInq=W('inquest'),tHeavy=W('heavy'),tHere=W('here'),tEnd=a.words[a.words.length-1].end+0.4;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tSank,sfx:'thud',gain:0.9},{t:tMin,sfx:'tick',gain:0.8},{t:tThirty,sfx:'thud',gain:1},{t:tRoll,sfx:'whoosh',gain:0.8},{t:tInq,sfx:'click',gain:0.8},{t:tHeavy-0.5,sfx:'rise',gain:0.9},{t:tHeavy,sfx:'chime',gain:1},{t:tHere,sfx:'tick',gain:0.7}];
function ship(c,t){const tilt=t<tRoll?Math.sin(t*1.2)*0.03:(t<tInq?Math.sin((t-tRoll)*6)*0.16:0.05+Math.sin(t*2)*0.02);const sink=t>tHeavy?clamp((t-tHeavy)/3)*0:0;
 c.save();c.translate(540,1330+sink);c.rotate(tilt);c.fillStyle='#0d1018';c.strokeStyle='rgba(255,210,120,0.8)';c.lineWidth=5;
 c.beginPath();c.moveTo(-380,-60);c.lineTo(380,-60);c.lineTo(300,110);c.lineTo(-300,110);c.closePath();c.fill();c.stroke();
 for(let i=0;i<3;i++){const mx=-200+i*200;c.beginPath();c.moveTo(mx,-60);c.lineTo(mx,-520+i*40);c.stroke();c.fillStyle='rgba(235,225,190,0.25)';c.beginPath();c.moveTo(mx,-500+i*40);c.lineTo(mx+130,-420+i*40);c.lineTo(mx+130,-200);c.lineTo(mx,-160);c.closePath();c.fill();c.stroke();}
 const top=t>=tHeavy-1?1:0;for(let i=0;i<8;i++){c.fillStyle=top?'#ff5a5a':'#ffd27a';c.fillRect(-330+i*85,-85,26,20);}
 c.restore();
 c.fillStyle='rgba(12,22,40,0.92)';c.fillRect(-300,1330,1680,700);c.strokeStyle='rgba(120,160,220,0.5)';c.lineWidth=4;c.beginPath();for(let x=-20;x<1100;x+=20){const y=1330+Math.sin(x*0.02+t*2)*10;x===-20?c.moveTo(x,y):c.lineTo(x,y);}c.stroke();}
return {cues,caption:S.caption,capY:1560,
 cam(t){const z=k(t,[[0,1],[tRoll-0.5,1],[tRoll,1.12],[tInq,1.12],[tInq+0.5,1],[tHeavy,1.25],[tHeavy+1.5,1.05],[tEnd,1.05]]);const [sx,sy]=a.shake(t,(t>tThirty&&t<tThirty+0.5)?7:0);return{x:540+sx,y:960+sy,z};},
 draw(c,t){S.bg(c,t,{sweep:0.2+Math.sin(t*0.5)*0.2,lx:200});ship(c,t);
  if(t>=tMin&&t<tThirty){const d=Math.max(0,25-Math.floor((t-tMin)/(tThirty-tMin)*25));c.font='900 150px "DejaVu Sans Mono",monospace';c.textAlign='center';c.fillStyle='#ffd27a';c.fillText(String(d).padStart(2,'0')+':00',540,420);}
  if(t>=tThirty&&t<tRoll){c.font='900 260px "DejaVu Sans Mono",monospace';c.textAlign='center';c.fillStyle='#ff5a5a';c.fillText('30',540,520);}
  if(t>=tHeavy&&t<tHeavy+2.2){c.font='900 120px "DejaVu Sans Mono",monospace';c.textAlign='center';c.fillStyle='#ff5a5a';c.fillText('TOP-HEAVY',540,420);}
  if(Math.abs(t-tHeavy)<0.1){c.fillStyle='rgba(255,255,255,0.35)';c.fillRect(0,0,1080,1920);}
  S.fig(c,t,{x:170,y:1700,s:0.7,walk:false,lean:t>tThirty?-8:0,eyes:t>tThirty?1:0});
 },
 post(c,t){S.post(c,t);}};};
