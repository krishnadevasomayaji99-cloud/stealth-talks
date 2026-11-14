window.SCENE=function(a){const {k,ease,clamp,W,E}=a;const S=window.STYLES.paper;
const tShip=W('ship'),tName=W('Mary'),tDeck=W('deck'),tFood=W('food'),tCargo=W('cargo'),tLife=W('lifeboat'),tLast=W('last'),tGib=W('Gibraltar'),tEnd=a.words[a.words.length-1].end+0.4;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tName,sfx:'click',gain:0.8},{t:tDeck,sfx:'whoosh',gain:0.8},{t:tFood,sfx:'click',gain:0.8},{t:tCargo,sfx:'thud',gain:0.9},{t:tLife-0.3,sfx:'rise',gain:0.8},{t:tLife,sfx:'thud',gain:0.9},{t:tLast,sfx:'tick',gain:0.8},{t:tGib-0.5,sfx:'rise',gain:0.9},{t:tGib,sfx:'chime',gain:1}];
function boat(c,t,x,y){c.save();c.translate(x,y+Math.sin(t*1.5)*10);c.rotate(Math.sin(t*1.2)*0.03);c.shadowColor='rgba(0,0,0,0.4)';c.shadowBlur=18;c.shadowOffsetY=10;c.fillStyle='#6b3a2a';c.beginPath();c.moveTo(-340,-40);c.lineTo(340,-40);c.lineTo(260,110);c.lineTo(-260,110);c.closePath();c.fill();c.shadowColor='transparent';
 c.fillStyle='#f3e9d2';for(let i=0;i<2;i++){const mx=-120+i*240;c.fillRect(mx-8,-480,16,440);c.beginPath();c.moveTo(mx+8,-460);c.lineTo(mx+150,-380);c.lineTo(mx+150,-140);c.lineTo(mx+8,-110);c.closePath();c.fill();}
 c.fillStyle=t>=tLife?'#3b2f4a':'#d98c5f';if(t<tLife){c.beginPath();c.ellipse(260,-60,70,24,0,0,7);c.fill();}c.restore();}
return {cues,caption:S.caption,capY:1600,
 cam(t){const z=k(t,[[0,1],[tDeck-0.3,1],[tDeck,1.2],[tLife,1.2],[tLife+0.5,1],[tGib,1.25],[tGib+1.5,1],[tEnd,1.05]]);const [sx,sy]=a.shake(t,0);return{x:540+sx,y:960+sy,z};},
 draw(c,t){S.bg(c,t,{px:t*0.5});
  c.fillStyle='rgba(59,47,74,0.85)';c.fillRect(-300,1380,1680,700);c.strokeStyle='rgba(243,233,210,0.5)';c.lineWidth=5;c.beginPath();for(let x=-20;x<1100;x+=22){const y=1385+Math.sin(x*0.02+t*2)*12;x===-20?c.moveTo(x,y):c.lineTo(x,y);}c.stroke();
  boat(c,t,540,1330);
  if(t>=tDeck&&t<tLife){c.font='900 70px sans-serif';c.fillStyle='#f3e9d2';c.textAlign='center';c.fillText('0 PEOPLE',540,520);}
  if(t>=tFood&&t<tCargo){c.font='900 110px sans-serif';c.fillStyle='#ffd23f';c.textAlign='center';c.fillText('6 MONTHS',540,620);c.fillText('OF FOOD',540,740);}
  if(t>=tCargo&&t<tLife){for(let i=0;i<12;i++){c.fillStyle='#8a5a2b';c.beginPath();c.arc(180+(i%6)*140,880+Math.floor(i/6)*130,52,0,7);c.fill();c.strokeStyle='#3b2f4a';c.lineWidth=5;c.stroke();}}
  if(t>=tLast&&t<tGib){c.font='900 150px sans-serif';c.fillStyle='#d98c5f';c.textAlign='center';c.fillText('9 DAYS',540,600);c.fillText('500 MILES',540,760);}
  if(t>=tGib){c.save();c.globalAlpha=clamp((t-tGib)/0.5);c.font='900 190px sans-serif';c.fillStyle='#ff5a5a';c.textAlign='center';c.fillText('?',540,700);c.restore();}
  if(Math.abs(t-tGib)<0.1){c.fillStyle='rgba(255,255,255,0.35)';c.fillRect(0,0,1080,1920);}
 },
 post(c,t){S.post(c,t);}};};
