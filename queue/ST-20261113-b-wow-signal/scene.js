window.SCENE=function(a){const {k,ease,clamp,W,E}=a;const S=window.STYLES.crt;
const tListen=W('listened'),tSec=W('seventy'),tPile=W('pile'),tSix=W('six'),tStrong=W('stronger'),tCirc=W('circled'),tNone=W('Nothing'),tWow=W('Wow'),tNever=W('never'),tEnd=a.words[a.words.length-1].end+0.4;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tSec,sfx:'click',gain:0.8},{t:tSix-0.2,sfx:'rise',gain:0.9},{t:tSix,sfx:'thud',gain:0.9},{t:tCirc,sfx:'click',gain:0.8},{t:tNone,sfx:'thud',gain:1},{t:tWow-0.5,sfx:'rise',gain:0.9},{t:tWow,sfx:'chime',gain:1},{t:tNever,sfx:'click',gain:0.8}];
const CH=['6','E','Q','U','J','5'];
function dish(c,t){c.save();c.translate(540,1050);c.rotate(-0.5+Math.sin(t*0.5)*0.05);c.strokeStyle='rgba(180,255,210,0.95)';c.lineWidth=10;c.beginPath();c.ellipse(0,0,260,110,0,0,Math.PI);c.stroke();c.beginPath();c.moveTo(-260,0);c.lineTo(260,0);c.stroke();c.beginPath();c.moveTo(0,0);c.lineTo(0,-170);c.stroke();c.restore();c.strokeStyle='rgba(150,255,200,0.6)';c.lineWidth=8;c.beginPath();c.moveTo(540,1060);c.lineTo(540,1450);c.stroke();}
return {cues,caption:S.caption,capY:1560,
 cam(t){const z=k(t,[[0,1],[tSix-0.3,1],[tSix,1.2],[tNone,1.2],[tWow,1.4],[tWow+1,1],[tEnd,1.05]]);const [sx,sy]=a.shake(t,(t>tSix&&t<tCirc)?5:0);return{x:540+sx,y:960+sy,z};},
 draw(c,t){S.bg(c,t,{vx:0});
  const fr=clamp(t/tNone);const sec=Math.max(0,Math.round(72*(1-clamp((t-tSec)/(tNone-tSec)))));
  c.font='700 130px "DejaVu Sans Mono",monospace';c.textAlign='center';c.fillStyle=sec<10?'#ff5050':'rgba(190,255,215,0.95)';if(t>=tSec)c.fillText(String(sec).padStart(2,'0'),540,420);
  if(t<tSix-0.2)dish(c,t);
  if(t>=tSix-0.2){ // printout
    c.fillStyle='rgba(230,255,235,0.12)';c.fillRect(120,600,840,520);c.font='700 110px "DejaVu Sans Mono",monospace';
    const n=Math.min(6,Math.floor((t-tSix+0.2)/0.25)+1);for(let i=0;i<n;i++){c.fillStyle='rgba(190,255,215,0.95)';c.fillText(CH[i],240+i*120,900);}
    if(t>=tCirc){c.strokeStyle='#ff4040';c.lineWidth=10;c.beginPath();c.ellipse(540,860,330,100,0,0,7);c.stroke();}
    if(t>=tWow){c.font='700 160px sans-serif';c.fillStyle='#ff4040';c.fillText('Wow!',540,1180);}
  }
  if(t>=tNone&&t<tWow-0.5){c.font='700 70px "DejaVu Sans Mono",monospace';c.fillStyle='rgba(190,255,215,0.6)';c.fillText('NO SIGNAL',540,1300+Math.sin(t*9)*3);}
  if(Math.abs(t-tWow)<0.1){c.fillStyle='rgba(255,255,255,0.4)';c.fillRect(0,0,1080,1920);}
 },
 post(c,t){S.post(c,t,{tc0:2236,cam:'BIG EAR - ARCHIVE',glitch:(Math.abs(t-tSix)<0.2||Math.abs(t-tNone)<0.15||Math.abs(t-tWow)<0.2)?1:0});}};};
