window.SCENE=function(a){const {k,ease,clamp,W,E}=a;const S=window.STYLES.notebook;
const tEng=W('Both'),tGl=W('gliders'),tFo=W('first'),tFar=W('nearest'),tGlide=W('glided'),tDrag=W('drag'),tNobody=W('Nobody'),tPo=W('pounds'),tEnd=a.words[a.words.length-1].end+0.4;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tGl,sfx:'click',gain:0.8},{t:tFar,sfx:'tick',gain:0.8},{t:tGlide,sfx:'whoosh',gain:0.9},{t:tDrag,sfx:'thud',gain:0.9},{t:tNobody,sfx:'click',gain:0.8},{t:tPo-0.5,sfx:'rise',gain:0.9},{t:tPo,sfx:'chime',gain:1}];
const ink='#1d2a4a';
function plane(c,x,y,rot){c.save();c.translate(x,y);c.rotate(rot);c.strokeStyle=ink;c.lineWidth=9;c.fillStyle='#fff';c.beginPath();c.ellipse(0,0,230,45,0,0,7);c.fill();c.stroke();c.beginPath();c.moveTo(-30,0);c.lineTo(-120,-150);c.lineTo(-60,-150);c.lineTo(40,0);c.moveTo(-30,0);c.lineTo(-120,150);c.lineTo(-60,150);c.lineTo(40,0);c.stroke();c.restore();}
return {cues,caption:S.caption,capY:1560,
 cam(t){const z=k(t,[[0,1],[tFar,1],[tGlide,1.15],[tDrag,1],[tPo,1.3],[tPo+1.2,1],[tEnd,1.05]]);const [sx,sy]=a.shake(t,(t>tDrag&&t<tDrag+0.4)?8:0);return{x:540+sx,y:960+sy,z};},
 draw(c,t){S.bg(c,t,{});
  const alt=t<tGlide?500:500+Math.min(1,(t-tGlide)/(tDrag-tGlide))*600;
  const x=t<tGlide?540:300+clamp((t-tGlide)/(tDrag-tGlide))*500;
  plane(c,x,t<tNobody?alt:1100,t<tGlide?0:0.12);
  c.strokeStyle=ink;c.lineWidth=9;c.beginPath();c.moveTo(0,1250);c.lineTo(1080,1250);c.stroke();
  if(t>=tDrag){c.fillStyle='#555';c.fillRect(200,1235,700,30);c.font='900 90px sans-serif';c.fillStyle='#d94b4b';c.textAlign='center';c.fillText('DRAG STRIP',540,1420);}
  if(t>=tEng&&t<tFar){c.font='900 140px sans-serif';c.fillStyle='#d94b4b';c.textAlign='center';c.fillText('0 ENGINES',540,300);}
  if(t>=tPo){c.font='900 150px sans-serif';c.fillStyle='#d94b4b';c.textAlign='center';c.fillText('LB != KG',540,320);}
  S.fig(c,t,{x:200,y:1700,s:0.6,walk:false});
  if(Math.abs(t-tPo)<0.1){c.fillStyle='rgba(255,255,255,0.4)';c.fillRect(0,0,1080,1920);}
 },
 post(c,t){S.post(c,t);}};};
