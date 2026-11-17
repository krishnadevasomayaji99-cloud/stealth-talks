window.SCENE=function(a){const {k,ease,clamp,W,E}=a;const S=window.STYLES.notebook;
const tPig=W('pig'),tJune=W('June'),tBrit=W('British'),tSold=W('soldiers'),tAug=W('August'),tCas=W('casualty'),tCalm=W('calm'),tTwelve=W('twelve'),tKai=W('Kaiser'),tEnd=a.words[a.words.length-1].end+0.4;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tJune,sfx:'click',gain:0.8},{t:tSold,sfx:'whoosh',gain:0.8},{t:tAug,sfx:'tick',gain:0.8},{t:tCas,sfx:'thud',gain:1},{t:tTwelve,sfx:'tick',gain:0.8},{t:tKai-0.5,sfx:'rise',gain:0.9},{t:tKai,sfx:'chime',gain:1}];
const col='#1d2a4a';
function pig(c,x,y,s,dead){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle='#f4a6b8';c.strokeStyle=col;c.lineWidth=8;c.beginPath();c.ellipse(0,-60,90,60,0,0,7);c.fill();c.stroke();c.beginPath();c.arc(90,-70,38,0,7);c.fill();c.stroke();c.fillStyle=col;c.font='900 30px sans-serif';c.fillText(dead?'x':'o',92,-62);c.restore();}
return {cues,caption:S.caption,capY:1560,
 cam(t){const z=k(t,[[0,1],[tSold,1],[tAug,1.12],[tCas,1.25],[tCas+1,1],[tKai,1.3],[tKai+1.2,1],[tEnd,1.05]]);const [sx,sy]=a.shake(t,0);return{x:540+sx,y:960+sy,z};},
 draw(c,t){S.bg(c,t,{});
  c.font='900 90px sans-serif';c.textAlign='center';c.fillStyle=col;
  const us=t<tSold?0:Math.round(64+397*clamp((t-tSold)/(tAug-tSold+1)));
  if(t>=tSold){c.fillText('US '+us,300,420);c.fillStyle='#d94b4b';c.fillText('UK ships',760,420);}
  pig(c,540,1250,1.2,t>=tCas);
  S.fig(c,t,{x:200,y:1500,s:1,mood:t>=tCas?'panic':'ok',arms:[-70,-110,70,-110]});
  S.fig(c,t,{x:880,y:1500,s:1,mood:t>=tCas?'smug':'ok',arms:[-70,-110,70,-110]});
  if(t>=tTwelve&&t<tKai){c.fillStyle=col;c.font='900 150px sans-serif';c.fillText('12 YEARS',540,700);}
  if(t>=tCas&&t<tCalm){c.fillStyle='#d94b4b';c.font='900 120px sans-serif';c.fillText('1 CASUALTY',540,700);}
  if(Math.abs(t-tKai)<0.1){c.fillStyle='rgba(255,255,255,0.5)';c.fillRect(0,0,1080,1920);}
 },
 post(c,t){S.post(c,t);}};};
