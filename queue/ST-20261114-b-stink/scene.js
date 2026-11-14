window.SCENE=function(a){const {k,ease,clamp,W,E}=a;const S=window.STYLES.comic;
const tHot=W('hot'),tTemp=W('thirty'),tCur=W('Curtains'),tChol=W('Cholera'),tBill=W('bill'),tEight=W('eighteen'),tBaz=W('Joseph'),tEnd=a.words[a.words.length-1].end+0.4;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tTemp,sfx:'thud',gain:0.9},{t:tCur,sfx:'whoosh',gain:0.8},{t:tChol,sfx:'click',gain:0.9},{t:tBill,sfx:'tick',gain:0.8},{t:tEight-0.5,sfx:'rise',gain:0.9},{t:tEight,sfx:'chime',gain:1},{t:tBaz,sfx:'pop',gain:0.8}];
function burst(c,x,y,r,col){c.save();c.translate(x,y);c.fillStyle=col;c.strokeStyle='#111';c.lineWidth=10;c.beginPath();for(let i=0;i<24;i++){const rr=i%2?r*0.65:r;const an=i/24*Math.PI*2;c.lineTo(Math.cos(an)*rr,Math.sin(an)*rr);}c.closePath();c.fill();c.stroke();c.restore();}
return {cues,caption:S.caption,capY:1600,
 cam(t){const z=k(t,[[0,1],[tTemp-0.2,1],[tTemp,1.15],[tCur,1],[tEight,1.25],[tEight+1.2,1],[tEnd,1.05]]);const [sx,sy]=a.shake(t,(t>tTemp&&t<tTemp+0.4)?6:0);return{x:540+sx,y:960+sy,z};},
 draw(c,t){const lime=t>=tCur&&t<tBill;S.bg(c,t,{base:lime?'#9be564':'#ffd23f'});
  c.fillStyle='#fff';c.strokeStyle='#111';c.lineWidth=10;c.fillRect(80,420,920,700);c.strokeRect(80,420,920,700);
  // river
  c.fillStyle='#5b8c5a';c.fillRect(90,930,900,180);c.strokeStyle='rgba(40,70,40,0.8)';c.lineWidth=6;c.beginPath();for(let x=90;x<990;x+=18){const y=1000+Math.sin(x*0.03+t*3)*10;x===90?c.moveTo(x,y):c.lineTo(x,y);}c.stroke();
  // parliament block
  c.fillStyle='#d8c9a0';c.strokeStyle='#111';c.lineWidth=8;c.fillRect(200,640,520,290);c.strokeRect(200,640,520,290);c.fillRect(620,520,90,130);c.strokeRect(620,520,90,130);
  for(let i=0;i<5;i++){c.fillStyle=t>=tCur?'#e8e0b8':'#66c';c.fillRect(240+i*95,700,50,110);c.strokeRect(240+i*95,700,50,110);}
  if(t>=tHot){c.font='900 110px sans-serif';c.textAlign='center';c.fillStyle='#e63946';c.strokeStyle='#111';c.lineWidth=8;const n=Math.min(3,1+Math.floor((t-tHot)/1.5));for(let i=0;i<n;i++){c.strokeText('~ ~ ~',540,490-i*0);c.fillText('~ ~ ~',540,490);}}
  if(t>=tTemp&&t<tCur){burst(c,820,330,170,'#ff6b35');c.font='900 120px sans-serif';c.fillStyle='#111';c.textAlign='center';c.fillText('30',820,365);}
  if(t>=tChol&&t<tBill){burst(c,300,330,150,'#7bd88f');c.font='900 60px sans-serif';c.fillStyle='#111';c.textAlign='center';c.fillText('SICK',300,345);}
  if(t>=tEight){const d=clamp((t-tEight)/0.5);c.save();c.globalAlpha=d;c.font='900 330px sans-serif';c.textAlign='center';c.fillStyle='#e63946';c.strokeStyle='#111';c.lineWidth=16;c.strokeText('18',540,1480);c.fillText('18',540,1480);c.font='900 90px sans-serif';c.fillStyle='#111';c.fillText('DAYS',540,1570);c.restore();}
  S.fig(c,t,{x:880,y:1300,s:0.8,hop:t>=tEight?20:0});
 },
 post(c,t){S.post(c,t);}};};
