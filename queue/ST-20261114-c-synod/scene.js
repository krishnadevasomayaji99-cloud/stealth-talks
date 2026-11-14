window.SCENE=function(a){const {k,ease,clamp,W,E}=a;const S=window.STYLES.notebook;
const tRoom=W('room'),tDug=W('dug'),tThrone=W('throne'),tDea=W('deacon'),tGuilty=W('guilty'),tVoid=W('void'),tFing=W('fingers'),tStr=W('strangled'),tTomb=W('tomb'),tEnd=a.words[a.words.length-1].end+0.4;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tDug,sfx:'thud',gain:0.9},{t:tThrone,sfx:'click',gain:0.8},{t:tDea,sfx:'click',gain:0.8},{t:tGuilty,sfx:'thud',gain:1},{t:tVoid,sfx:'whoosh',gain:0.8},{t:tFing,sfx:'tick',gain:0.9},{t:tStr-0.5,sfx:'rise',gain:0.9},{t:tStr,sfx:'chime',gain:1},{t:tTomb,sfx:'pop',gain:0.8}];
const ink='#1d2a4a';
function throne(c){c.strokeStyle=ink;c.lineWidth=9;c.fillStyle='rgba(255,210,63,0.5)';c.beginPath();c.rect(380,560,320,520);c.fill();c.stroke();c.beginPath();c.moveTo(380,560);c.lineTo(540,430);c.lineTo(700,560);c.stroke();}
function corpse(c,t,x,y){c.save();c.translate(x,y);c.strokeStyle=ink;c.lineWidth=9;c.fillStyle='#fff';c.beginPath();c.arc(0,-250,60,0,7);c.fill();c.stroke();c.fillStyle='#d94b4b';c.beginPath();c.rect(-70,-190,140,200);c.fill();c.stroke();c.beginPath();c.moveTo(-18,-262);c.lineTo(-4,-248);c.moveTo(-4,-262);c.lineTo(-18,-248);c.moveTo(18,-262);c.lineTo(32,-248);c.moveTo(32,-262);c.lineTo(18,-248);c.stroke();c.beginPath();c.moveTo(-40,-206);c.lineTo(0,-300);c.lineTo(40,-206);c.stroke();c.restore();}
return {cues,caption:S.caption,capY:1560,
 cam(t){const z=k(t,[[0,1],[tGuilty-0.3,1],[tGuilty,1.15],[tVoid+0.5,1.15],[tStr,1.3],[tStr+1.5,1],[tEnd,1.05]]);const [sx,sy]=a.shake(t,(t>tGuilty&&t<tGuilty+0.4)?6:0);return{x:540+sx,y:960+sy,z};},
 draw(c,t){S.bg(c,t,{});
  const inRiver=t>=tFing+1.5&&t<tTomb;
  if(t<tFing+1.5||t>=tTomb){throne(c);corpse(c,t,540,1000);}else{c.fillStyle='rgba(60,120,200,0.5)';c.fillRect(0,1150,1080,500);corpse(c,t,540,1200+Math.sin(t*3)*8);}
  S.fig(c,t,{x:200,y:1500,s:0.9,walk:false});
  if(t>=tDea&&t<tGuilty){c.font='700 60px sans-serif';c.fillStyle=ink;c.textAlign='center';c.fillText('"..."',540,380);}
  if(t>=tGuilty){c.save();c.translate(540,300);c.rotate(-0.12);c.font='900 150px sans-serif';c.textAlign='center';c.strokeStyle='#d94b4b';c.lineWidth=14;c.strokeText('GUILTY',0,0);c.restore();}
  if(t>=tVoid){const d=clamp((t-tVoid)/0.4);c.strokeStyle='#d94b4b';c.lineWidth=14;c.beginPath();c.moveTo(150,420);c.lineTo(150+780*d,420+100*d);c.stroke();}
  if(t>=tStr&&t<tTomb){c.font='900 130px sans-serif';c.fillStyle='#d94b4b';c.textAlign='center';c.fillText('X_X',540,1650);}
  if(Math.abs(t-tStr)<0.1){c.fillStyle='rgba(255,255,255,0.4)';c.fillRect(0,0,1080,1920);}
 },
 post(c,t){S.post(c,t);}};};
