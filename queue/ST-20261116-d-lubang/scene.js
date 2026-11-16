window.SCENE=function(a){const {k,ease,clamp,W,E}=a;const S=window.STYLES.crt;
const tThirty=W('thirty'),tHid=W('hid'),tLeaf=W('Leaflets'),tSearch=W('Search'),tOne=W('One'),tTrav=W('traveller'),tOrd=W('orders'),tBook=W('bookseller'),tSur=W('surrender'),tEnd=a.words[a.words.length-1].end+0.4;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tHid,sfx:'click',gain:0.8},{t:tLeaf,sfx:'whoosh',gain:0.8},{t:tSearch,sfx:'tick',gain:0.8},{t:tTrav,sfx:'thud',gain:0.9},{t:tBook-0.5,sfx:'rise',gain:0.9},{t:tBook,sfx:'chime',gain:1}];
const g='rgba(190,255,215,0.95)';
return {cues,caption:S.caption,capY:1560,
 cam(t){const z=k(t,[[0,1],[tHid,1.1],[tTrav,1],[tBook,1.3],[tBook+1.2,1],[tEnd,1.05]]);const [sx,sy]=a.shake(t,(t>tSearch&&t<tOne)?3:0);return{x:540+sx,y:960+sy,z};},
 draw(c,t){S.bg(c,t,{vx:t<tTrav?-120:0});
  const yrs=Math.min(29,Math.round(29*clamp((t-tThirty)/(tTrav-tThirty))));
  c.font='700 110px "DejaVu Sans Mono",monospace';c.textAlign='center';c.fillStyle=t>=tBook?'#ff5050':g;c.fillText(t>=tBook?'ORDERS RECEIVED':'DAY COUNT '+Math.round(yrs*365),540,380);
  // trees
  c.strokeStyle=g;c.lineWidth=6;for(let i=0;i<7;i++){const x=80+i*150;c.beginPath();c.moveTo(x,1250);c.lineTo(x,900-(i%3)*60);c.stroke();c.beginPath();c.arc(x,860-(i%3)*60,60,0,7);c.stroke();}
  // leaflets falling
  if(t>=tLeaf&&t<tSearch){for(let i=0;i<14;i++){const x=(i*83)%1000+40,y=((t-tLeaf)*400+i*140)%1300+200;c.fillStyle='rgba(235,255,240,0.8)';c.fillRect(x,y,40,56);}}
  if(t>=tLeaf&&t<tOne){c.font='900 120px sans-serif';c.fillStyle='#ff5050';c.fillText('TRICK',540,620);}
  const n=Math.max(1,4-Math.floor(clamp((t-tOne)/(tTrav-tOne))*3));
  for(let i=0;i<(t>=tHid?n:1);i++)S.fig(c,t,{x:300+i*140,y:1240,s:0.32,glitch:(t>tSearch&&t<tOne)?1:0});
  if(t>=tOrd&&t<tBook){c.font='900 100px sans-serif';c.fillStyle=g;c.fillText('WAITING FOR ORDERS',540,620);}
  if(Math.abs(t-tBook)<0.1){c.fillStyle='rgba(255,255,255,0.4)';c.fillRect(0,0,1080,1920);}
 },
 post(c,t){S.post(c,t,{tc0:1944,cam:'LUBANG',glitch:(Math.abs(t-tSearch)<0.2||Math.abs(t-tBook)<0.2)?1:0});}};};
