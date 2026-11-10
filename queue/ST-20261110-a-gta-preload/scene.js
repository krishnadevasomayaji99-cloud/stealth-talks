window.SCENE=function(a){
const {k,ease,outBack,clamp,W,E,shake}=a;const K=window.KIT;const {circ,ell,rr,tri,burst,person,stamp}=K;
const tPre=W('preload'),tTw=W('twelve'),tFifty=W('fifty'),tS=[0,1,2,3].map(i=>W('step',i)),tG=[W('gone',0),W('gone',1),W('gone',2),W('space')],tSweat=W('sweating'),tTear=W('tear'),tReady=W('ready'),tPress=W('presses'),tTwist=W('twist'),tEta=W('estimated'),tNine=W('nine',0),tLaunch=W('launch'),tSend=W('send'),tEnd=E('things')+0.3;
const emph=[tPre,tTw,tFifty,...tS,...tG,tSweat,tTear,tReady,tPress,tTwist,tEta,tNine,tLaunch,tSend];
const pulse=t=>{let m=0;for(const e of emph){const d=t-e;if(d>=0&&d<0.25)m=Math.max(m,Math.pow(1-d/0.25,2));}return m*0.07;};
const cues=[{t:0.05,sfx:'pop',gain:0.7},{t:tTw,sfx:'thud',gain:0.9},...tS.map(t=>({t,sfx:'whoosh',gain:0.7})),...tG.map(t=>({t,sfx:'thud',gain:0.8})),{t:tTear,sfx:'chime',gain:0.6},{t:tPress,sfx:'click',gain:0.9},{t:tTwist-0.5,sfx:'rise',gain:0.8},{t:tTwist,sfx:'thud',gain:1},{t:tNine,sfx:'thud',gain:1},{t:tSend,sfx:'pop',gain:0.8}];
const items=[['DEMOS','#6fc3ff'],['OLD GAMES','#ffd23f'],['SCREENSHOTS','#c77dff'],['FINISHED GAME','#ff6b6b']];
function freeGB(t){let f=50;tG.forEach((g,i)=>{f+=[30,45,40,50][i]*ease(clamp((t-g)/0.5));});return f;}
function bg(c){const g=c.createLinearGradient(0,0,0,1920);g.addColorStop(0,'#1d1b3a');g.addColorStop(1,'#3a2f63');c.fillStyle=g;c.fillRect(-300,-300,1680,2520);}
function tv(c,t){rr(c,110,260,860,560,28,'#0d0d12');rr(c,130,280,820,520,16,'#1b2a5c');rr(c,490,820,100,80,6,'#0d0d12');rr(c,380,890,320,26,10,'#0d0d12');
 c.fillStyle='#fff';c.font='bold 44px sans-serif';c.textAlign='left';c.fillText('STORAGE',170,345);
 items.forEach((it,i)=>{const g=tG[i];const u=ease(clamp((t-g)/0.45));const x=170+u*760,al=1-u;if(al<=0.01)return;c.globalAlpha=al;rr(c,x,380+i*62,680,48,10,it[1]);c.fillStyle='#111';c.font='bold 30px sans-serif';c.fillText(it[0],x+18,414+i*62);c.globalAlpha=1;});
 const free=freeGB(t);const fill=clamp(free/212);rr(c,170,660,700,44,12,'#10142a');rr(c,170,660,700*fill,44,12,fill>=1?'#4cd964':'#ff6b6b');c.strokeStyle='#fff';c.lineWidth=4;c.strokeRect(170,660,700,44);
 c.fillStyle='#fff';c.font='bold 38px sans-serif';c.fillText(`FREE ${Math.round(free)} GB / NEEDS 212`,170,745);
 if(t>=tReady){const on=t<tTwist;c.fillStyle='rgba(13,13,18,.92)';c.fillRect(130,280,820,520);c.fillStyle='#fff';c.textAlign='center';c.font='bold 54px sans-serif';c.fillText(t<tPress?'READY TO PRELOAD':'PRELOADING 0%',540,470);
  if(t>=tTwist){c.fillStyle='#ff4d4d';c.font='bold 84px sans-serif';c.fillText('ETA: 9 DAYS',540,640);}c.textAlign='left';}}
function couch(c){rr(c,60,1180,960,380,60,'#7a3b5e');rr(c,60,1400,960,170,40,'#92486f');}
return {cues,
 fx(t){let f=0;for(const e of [tTw,tTwist,tNine]){const d=t-e;if(d>=0&&d<0.14)f=Math.max(f,0.85*(1-d/0.14));}return{flash:f,lines:(t>tTwist-0.4&&t<tTwist+0.2)?0.5:0};},
 cam(t){const z=k(t,[[0,1.0],[tTw-0.3,1.0],[tTw,1.12],[tFifty+0.8,1.12],[tS[0],1.0],[tTwist-0.6,1.0],[tTwist-0.1,1.2],[tNine+0.9,1.2],[tLaunch,1.0],[tEnd,1.0]]);const y=k(t,[[0,960],[tTw,820],[tFifty+0.8,820],[tS[0],960],[tTwist-0.6,960],[tTwist-0.1,640],[tNine+0.9,640],[tLaunch,960],[tEnd,960]]);
  const [sx,sy]=shake(t,(t>tTwist&&t<tTwist+0.25)?14:0);return{x:540+sx,y:y+sy,z:z*(1+pulse(t))};},
 draw(c,t){bg(c);tv(c,t);couch(c);
  let mouth='flat',sweat=false,look=-1,bags=false;
  if(t<tS[0])mouth='o';
  if(t>=tS[0]&&t<tSweat)mouth='flat';
  if(t>=tSweat&&t<tTear){mouth='sad';sweat=true;}
  if(t>=tTear&&t<tReady){mouth='sad';sweat=true;bags=true;}
  if(t>=tReady&&t<tTwist)mouth='grin';
  if(t>=tTwist){mouth='o';sweat=true;}
  if(t>=tLaunch){mouth='sad';sweat=false;bags=true;}
  const bob=Math.sin(t*3)*3;
  person(c,t,{x:540,y:1230+bob,skin:'#e0ac86',shirt:'#3fa7d6',hair:'#2b1b12',mouth,look,sweat,bags,handR:[610,1450],handL:[470,1450]});
  rr(c,500,1440,80,34,10,'#222');circ(c,515,1457,8,'#e63946');circ(c,565,1457,8,'#4cd964');
  burst(c,'212 GB!',700,1000,tTw,t,'#ff6b6b',120);
  tG.forEach((g,i)=>stamp(c,'GONE',540,1010,g+0.05,t,'#e63946',90));
  burst(c,'PLOT TWIST!',540,1000,tTwist,t,'#ffd23f',120);
  burst(c,'NINE DAYS',540,1000,tNine,t,'#ffb3d1',110);
 }};
};
