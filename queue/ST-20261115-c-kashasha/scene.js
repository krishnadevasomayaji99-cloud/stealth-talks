window.SCENE=function(a){const {k,ease,clamp,W,E}=a;const S=window.STYLES.comic;
const tThree=W('Three'),tNine=W('ninety'),tClose=W('closed'),tHome=W('home'),tDoc=W('Doctors'),tLaugh=W('laughing'),tEnd=a.words[a.words.length-1].end+0.4;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tThree,sfx:'click',gain:0.8},{t:tNine,sfx:'tick',gain:0.9},{t:tClose,sfx:'thud',gain:0.9},{t:tHome,sfx:'whoosh',gain:0.8},{t:tDoc,sfx:'click',gain:0.9},{t:tLaugh-0.5,sfx:'rise',gain:0.9},{t:tLaugh,sfx:'chime',gain:1}];
function burst(c,x,y,r,col){c.save();c.translate(x,y);c.fillStyle=col;c.strokeStyle='#111';c.lineWidth=10;c.beginPath();for(let i=0;i<24;i++){const rr=i%2?r*0.65:r;const an=i/24*Math.PI*2;c.lineTo(Math.cos(an)*rr,Math.sin(an)*rr);}c.closePath();c.fill();c.stroke();c.restore();}
return {cues,caption:S.caption,capY:1600,
 cam(t){const z=k(t,[[0,1],[tNine-0.2,1],[tNine,1.15],[tClose,1],[tLaugh,1.3],[tLaugh+1.2,1],[tEnd,1.05]]);const [sx,sy]=a.shake(t,(t>tLaugh&&t<tLaugh+0.6)?8:0);return{x:540+sx,y:960+sy,z};},
 draw(c,t){S.bg(c,t,{base:t>=tLaugh?'#ff6b9d':'#ffd23f'});
  c.fillStyle='#fff';c.strokeStyle='#111';c.lineWidth=10;c.fillRect(80,380,920,760);c.strokeRect(80,380,920,760);
  // school
  c.fillStyle='#d8c9a0';c.fillRect(200,700,520,300);c.strokeRect(200,700,520,300);c.beginPath();c.moveTo(180,700);c.lineTo(460,560);c.lineTo(740,700);c.closePath();c.fill();c.stroke();
  const n=t<tThree?0:t<tNine?3:Math.round(95*clamp((t-tNine)/1.2));
  c.font='900 150px sans-serif';c.textAlign='center';c.fillStyle='#111';if(t>=tThree)c.fillText(String(n)+(t>=tNine?'/159':''),540,330);
  for(let i=0;i<Math.min(n,18);i++){const x=130+(i%6)*140,y=1010+Math.floor(i/6)*60;c.fillStyle='#e63946';c.beginPath();c.arc(x,y,24,0,7);c.fill();c.stroke();}
  if(t>=tClose&&t<tHome){c.save();c.translate(460,820);c.rotate(-0.15);c.font='900 110px sans-serif';c.fillStyle='#d94b4b';c.strokeStyle='#111';c.lineWidth=8;c.strokeText('CLOSED',0,0);c.fillText('CLOSED',0,0);c.restore();}
  if(t>=tDoc&&t<tLaugh){c.font='900 200px sans-serif';c.fillStyle='#111';c.fillText('???',540,1300);}
  if(t>=tLaugh){burst(c,540,850,360,'#fff');c.font='900 150px sans-serif';c.fillStyle='#e63946';c.fillText('HA HA',540,880+Math.sin(t*30)*8);}
  S.fig(c,t,{x:900,y:1560,s:0.9,hop:t>=tLaugh?30:0});
  if(Math.abs(t-tLaugh)<0.1){c.fillStyle='rgba(255,255,255,0.5)';c.fillRect(0,0,1080,1920);}
 },
 post(c,t){S.post(c,t);}};};
