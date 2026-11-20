window.SCENE=function(a){const {k,ease,clamp,W,E}=a;const S=window.STYLES.noir;
const tMar=W('Major'),tPock=W('pockets'),tLet=W('letters'),tEye=W('eyelash'),tHit=W('Hitler'),tInv=W('invasion'),tNever=W('never'),tGly=W('Glyndwr'),tEnd=a.words[a.words.length-1].end+0.4;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tMar,sfx:'click',gain:0.8},{t:tPock,sfx:'tick',gain:0.8},{t:tEye,sfx:'click',gain:0.9},{t:tHit,sfx:'thud',gain:0.9},{t:tInv,sfx:'whoosh',gain:0.9},{t:tGly-0.5,sfx:'rise',gain:0.9},{t:tGly,sfx:'chime',gain:1}];
return {cues,caption:S.caption,capY:1560,
 cam(t){const z=k(t,[[0,1],[tEye-0.2,1],[tEye,1.35],[tEye+1.5,1],[tGly,1.25],[tGly+1.2,1],[tEnd,1.05]]);return{x:540,y:960,z};},
 draw(c,t){S.bg(c,t,{});
  // sea + beach
  c.fillStyle='#1a2a44';c.fillRect(0,1050,1080,300);c.strokeStyle='rgba(200,220,255,0.4)';c.lineWidth=5;c.beginPath();for(let x=0;x<1080;x+=18){const y=1100+Math.sin(x*0.03+t*2)*10;x?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();
  c.fillStyle='#2c2a26';c.fillRect(0,1350,1080,570);
  // body on beach
  c.save();c.translate(540,1380);c.fillStyle='#07080c';c.fillRect(-170,-40,300,60);c.beginPath();c.arc(-200,-10,40,0,7);c.fill();c.restore();
  if(t>=tPock){c.fillStyle='#e8dcc0';c.fillRect(300,560,480,330);c.strokeStyle='#111';c.lineWidth=6;c.strokeRect(300,560,480,330);c.font='700 52px "DejaVu Sans Mono",monospace';c.fillStyle='#111';c.textAlign='center';
    c.fillText(t<tEye?'MAJOR W. MARTIN':'GREECE / SICILY?',540,640);if(t>=tLet){c.fillText('PAM  RING  BILL',540,740);}}
  if(t>=tEye&&t<tHit){c.strokeStyle='#e8dcc0';c.lineWidth=8;c.beginPath();c.moveTo(380,1000);c.quadraticCurveTo(540,930,700,1000);c.stroke();c.font='700 60px sans-serif';c.fillStyle='#ffd23f';c.textAlign='center';c.fillText('EYELASH GONE',540,880);}
  if(t>=tInv&&t<tNever){c.font='900 150px sans-serif';c.fillStyle='#d94b4b';c.textAlign='center';c.fillText('SICILY',540,420);}
  if(t>=tGly){c.fillStyle='#e8dcc0';c.fillRect(300,520,480,360);c.font='900 90px "DejaVu Sans Mono",monospace';c.fillStyle='#111';c.textAlign='center';c.fillText('GLYNDWR',540,680);c.fillText('MICHAEL',540,790);}
  if(Math.abs(t-tGly)<0.1){c.fillStyle='rgba(255,255,255,0.4)';c.fillRect(0,0,1080,1920);}
  S.fig(c,t,{x:200,y:1560,s:0.8,walk:false});
 },
 post(c,t){S.post(c,t);}};};
