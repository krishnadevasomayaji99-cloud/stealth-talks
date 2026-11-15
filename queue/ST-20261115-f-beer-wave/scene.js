window.SCENE=function(a){const {k,ease,clamp,W,E}=a;const S=window.STYLES.comic;
const tOn=W('October'),tVat=W('vat'),tWall=W('wall'),tHouse=W('collapsed'),tEight=W('Eight'),tPor=W('porter'),tJury=W('jury'),tVer=W('verdict'),tEnd=a.words[a.words.length-1].end+0.4;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tVat,sfx:'whoosh',gain:0.9},{t:tWall,sfx:'thud',gain:0.9},{t:tHouse,sfx:'thud',gain:0.8},{t:tEight,sfx:'click',gain:0.8},{t:tJury,sfx:'tick',gain:0.8},{t:tVer-0.5,sfx:'rise',gain:0.9},{t:tVer,sfx:'chime',gain:1}];
function burst(c,x,y,r,col){c.save();c.translate(x,y);c.fillStyle=col;c.strokeStyle='#111';c.lineWidth=10;c.beginPath();for(let i=0;i<24;i++){const rr=i%2?r*0.65:r;const an=i/24*Math.PI*2;c.lineTo(Math.cos(an)*rr,Math.sin(an)*rr);}c.closePath();c.fill();c.stroke();c.restore();}
return {cues,caption:S.caption,capY:1600,
 cam(t){const z=k(t,[[0,1],[tVat-0.2,1],[tVat,1.15],[tWall,1],[tVer,1.3],[tVer+1.2,1],[tEnd,1.05]]);const [sx,sy]=a.shake(t,(t>tVat&&t<tVat+0.6)?10:0);return{x:540+sx,y:960+sy,z};},
 draw(c,t){S.bg(c,t,{base:t>=tVer?'#ff6b9d':'#ffd23f'});
  c.strokeStyle='#111';c.lineWidth=10;
  const w=t<tVat?0:clamp((t-tVat)/1.2);
  // vat
  if(t<tVat+0.3){c.fillStyle='#b8793b';c.fillRect(380,520,320,520);c.strokeRect(380,520,320,520);for(let y=600;y<1040;y+=90){c.beginPath();c.moveTo(380,y);c.lineTo(700,y);c.stroke();}}
  // wave
  if(t>=tVat){c.fillStyle='#e0a030';c.beginPath();c.moveTo(0,1100);for(let x=0;x<=1080;x+=40){c.lineTo(x,1100-w*220-Math.sin(x/70+t*6)*40);}c.lineTo(1080,1400);c.lineTo(0,1400);c.closePath();c.fill();c.stroke();}
  // buildings
  c.fillStyle='#d8c9a0';c.fillRect(60,860,260,300);c.strokeRect(60,860,260,300);
  const hy=t>=tHouse?Math.min(260,(t-tHouse)*300):0;c.fillRect(760,860+hy,260,300-hy);c.strokeRect(760,860+hy,260,300-hy);
  if(t>=tWall&&t<tEight){c.font='900 100px sans-serif';c.fillStyle='#d94b4b';c.textAlign='center';c.fillText('CRASH',540,420);}
  if(t>=tEight){c.font='900 220px sans-serif';c.fillStyle='#111';c.textAlign='center';c.fillText('8',540,330);}
  if(t>=tVer){burst(c,540,820,330,'#fff');c.font='900 64px sans-serif';c.fillStyle='#e63946';c.textAlign='center';c.fillText('MISFORTUNE',540,840+Math.sin(t*30)*6);}
  S.fig(c,t,{x:900,y:1560,s:0.9,hop:t>=tVer?30:0});
  if(Math.abs(t-tVer)<0.1){c.fillStyle='rgba(255,255,255,0.5)';c.fillRect(0,0,1080,1920);}
 },
 post(c,t){S.post(c,t);}};};
