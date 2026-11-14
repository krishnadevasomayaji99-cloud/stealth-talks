window.SCENE=function(a){const {k,ease,clamp,W,E}=a;const S=window.STYLES.crt;
const tJuly=W('July'),tSev=W('seventh'),tTwist=W('twist'),tDrv=W('driver'),tBrk=W('broke'),tTub=W('Tubby'),tEnd=a.words[a.words.length-1].end+0.4;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tSev,sfx:'click',gain:0.8},{t:tTwist,sfx:'whoosh',gain:0.9},{t:tDrv,sfx:'click',gain:0.8},{t:tBrk-0.4,sfx:'rise',gain:0.9},{t:tBrk,sfx:'thud',gain:1},{t:tTub,sfx:'chime',gain:1}];
const g='rgba(190,255,215,0.95)';
return {cues,caption:S.caption,capY:1560,
 cam(t){const z=k(t,[[0,1],[tTwist,1],[tBrk,1.2],[tTub,1.3],[tTub+1,1],[tEnd,1.05]]);const [sx,sy]=a.shake(t,(t>tTwist&&t<tBrk)?4:0);return{x:540+sx,y:960+sy,z};},
 draw(c,t){S.bg(c,t,{vx:0});
  const sec=Math.max(0,Math.round(8*(1-clamp((t-tSev)/(tBrk-tSev)))));
  c.font='700 130px "DejaVu Sans Mono",monospace';c.textAlign='center';c.fillStyle=t>=tSev?'#ff5050':g;c.fillText(t>=tSev?'11:0'+Math.min(9,sec):'JULY',540,420);
  // towers + deck
  c.strokeStyle=g;c.lineWidth=12;c.beginPath();c.moveTo(220,1100);c.lineTo(220,640);c.moveTo(860,1100);c.lineTo(860,640);c.stroke();
  const amp=t<tSev?4:(t<tBrk?10+60*clamp((t-tSev)/(tBrk-tSev)):0);
  if(t<tBrk){c.beginPath();for(let i=0;i<=20;i++){const x=100+i*44,ph=Math.sin(i*0.4+t*6)*amp;const y=860+ph;i?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();
    c.beginPath();c.moveTo(220,640);c.quadraticCurveTo(540,900+amp,860,640);c.stroke();
    if(t>=tDrv){c.fillStyle='#ffd23f';c.fillRect(480+Math.sin(t*6)*20,800+Math.sin(t*6)*amp*0.5,90,40);}
  } else {const f=(t-tBrk)*500;c.beginPath();c.moveTo(100,860);c.lineTo(440,860+f*0.2);c.stroke();c.beginPath();c.moveTo(640,860+f*0.9);c.lineTo(980,860);c.stroke();c.fillStyle='rgba(60,140,220,0.5)';c.fillRect(0,1150,1080,500);}
  c.fillStyle='rgba(60,140,220,0.35)';c.fillRect(0,1100,1080,500);
  if(t>=tTub){c.font='900 120px sans-serif';c.fillStyle='#ff5050';c.fillText('TUBBY',540,300);}
  if(Math.abs(t-tBrk)<0.1){c.fillStyle='rgba(255,255,255,0.4)';c.fillRect(0,0,1080,1920);}
 },
 post(c,t){S.post(c,t,{tc0:1100,cam:'TACOMA - ARCHIVE',glitch:(Math.abs(t-tBrk)<0.2)?1:0});}};};
