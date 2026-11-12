window.SCENE=function(a){const {k,ease,clamp,W,E}=a;const S=window.STYLES.comic;
const tWom=W('woman'),tMove=W('moving'),tDay=W('day'),tHund=W('hundreds'),tDoc=W('doctors'),tHot=W('overheated'),tCity=W('city'),tGuild=W('guildhalls'),tMus=W('musicians'),tStras=W('strasbourg'),tEnd=E('ago')+0.4;
const cues=[{t:0.05,sfx:'pop',gain:0.7},{t:tMove,sfx:'whoosh',gain:0.7},{t:tHund-0.3,sfx:'rise',gain:0.9},{t:tHund,sfx:'thud',gain:1},{t:tDoc,sfx:'click',gain:0.9},{t:tHot,sfx:'thud',gain:0.9},{t:tGuild,sfx:'thud',gain:1},{t:tMus-0.3,sfx:'rise',gain:0.9},{t:tMus,sfx:'chime',gain:1},{t:tStras,sfx:'click',gain:0.7}];
for(let x=tMove;x<tHund;x+=0.6)cues.push({t:x,sfx:'tick',gain:0.5});
const cols=['#e63946','#2a9d8f','#9b5de5','#f4a261','#1d70d8','#06d6a0','#ef476f','#118ab2'];
function stage(c,y,h){c.save();c.fillStyle='#8b5a2b';c.strokeStyle='#111';c.lineWidth=12;c.fillRect(120,y,840,h);c.strokeRect(120,y,840,h);c.beginPath();for(let i=1;i<6;i++){c.moveTo(120+i*140,y);c.lineTo(120+i*140,y+h);}c.lineWidth=6;c.stroke();c.restore();}
return {cues,caption:S.caption,capY:1620,
 cam(t){const z=k(t,[[0,1],[tHund-0.1,1],[tHund,1.12],[tHund+0.6,1],[tGuild,1],[tGuild+0.15,1.1],[tGuild+0.5,1],[tEnd,1.05]]);const [sx,sy]=a.shake(t,(t>tGuild&&t<tGuild+0.5)?6:0);return{x:540+sx,y:960+sy,z};},
 draw(c,t){const red=t>=tDoc&&t<tCity;const base=t<tDoc?'#ffd23f':(red?'#e63946':(t<tMus?'#9b5de5':'#ff7b00'));
  S.bg(c,t,{base,dots:0.15,rush:(t>tHund&&t<tHund+0.8)?1:(t>=tMus?0.8:0)});
  // crowd grows
  const n=t<tMove?0:Math.min(8,Math.floor(clamp((t-tDay)/(tHund-tDay))*8)+(t>=tHund?0:0));
  for(let i=0;i<n;i++){const x=150+(i%4)*260+(i>3?100:0),y=(i<4?1320:1500);S.fig(c,t+i*0.2,{x:x,y:y,s:0.55,shirt:cols[i%8],hop:46,mood:'ok',look:Math.sin(t+i)*6});}
  // the woman, always dancing
  S.fig(c,t,{x:t<tHund?540:700,y:t<tHund?1500:1000,s:t<tHund?1:0.7,shirt:'#ff4fa3',hop:t<tWom?0:60,mood:'ok'});
  // doctors
  if(t>=tDoc&&t<tCity){S.fig(c,t,{x:180,y:900,s:0.8,shirt:'#ffffff',mood:'shock',look:8});}
  // stage
  if(t>=tCity){const d=clamp((t-tGuild)/0.4);if(t>=tGuild)stage(c,1300+(1-d)*300,90);}
  // musicians appear
  if(t>=tMus){const d=a.outBack((t-tMus)/0.4);c.save();c.translate(0,(1-d)*300);[0,1,2].forEach(i=>S.fig(c,t+i*0.3,{x:300+i*240,y:1230,s:0.6,shirt:cols[(i*3+1)%8],hop:28,mood:'ok'}));c.restore();}
 },
 post(c,t){S.post(c,t);}};};
