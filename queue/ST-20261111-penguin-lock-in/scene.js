window.SCENE=function(a){
const {k,ease,outBack,clamp,W,E}=a;const K=window.KIT;const {circ,rr,tri,burst,confetti,stamp}=K;
const wf=(q,n,fb)=>{try{return W(q,n)}catch(e){return fb}};
const tPov=0.3,tSnow=wf('mountain',0,6),tLock=wf('lock',0,13),tNo=wf('no',1,15),tTen=wf('ten',0,19),tTw=wf('twist',0,24),tHer=wf('Herzog',0,27),tDoc=wf('Encounters',0,31),tKeep=wf('keeps',0,38),tEnd=E('friend',0,46)+0.3;
const cues=[{t:0.05,sfx:'pop',gain:0.8},{t:tSnow,sfx:'whoosh',gain:0.8},{t:tLock,sfx:'click',gain:0.9},{t:tNo,sfx:'thud',gain:0.9},{t:tTen,sfx:'tick',gain:0.8},{t:tTw,sfx:'thud',gain:1},{t:tHer,sfx:'chime',gain:0.9},{t:tDoc,sfx:'chime',gain:1},{t:tKeep,sfx:'pop',gain:1}];
function penguin(c,x,y,s,flip,t,wob,col){c.save();c.translate(x,y);c.scale(s*flip,s);c.rotate(Math.sin(t*8)*wob);
 c.fillStyle=col||'#1b1b2a';c.beginPath();c.ellipse(0,0,60,90,0,0,7);c.fill();
 c.fillStyle='#f4ecd8';c.beginPath();c.ellipse(8,18,38,66,0,0,7);c.fill();
 circ(c,14,-46,9,'#fff');circ(c,16,-46,4,'#111');
 c.fillStyle='#ffa726';c.beginPath();c.moveTo(24,-34);c.lineTo(56,-28);c.lineTo(24,-22);c.fill();
 rr(c,-18,86,40,12,6,'#ffa726');rr(c,14,86,40,12,6,'#ffa726');c.restore();}
function mountain(c){c.fillStyle='#b8d4ea';c.beginPath();c.moveTo(380,1000);c.lineTo(760,520);c.lineTo(1150,1000);c.fill();c.fillStyle='#fff';c.beginPath();c.moveTo(680,610);c.lineTo(760,520);c.lineTo(840,610);c.lineTo(790,590);c.lineTo(740,620);c.fill();}
return {cues,
 fx(t){let f=0;for(const e of [tLock,tTw,tDoc,tKeep]){const d=t-e;if(d>=0&&d<0.14)f=Math.max(f,0.8*(1-d/0.14));}return{flash:f,lines:0};},
 cam(t){const [sx,sy]=a.shake(t,t>=tTen&&t<tTw?6+10*clamp((t-tTen)/(tTw-tTen)):0);return{x:540+sx,y:960+sy,z:1.05+0.1*clamp(t/tTw)};},
 draw(c,t){
  const g=c.createLinearGradient(0,0,0,1920);const doc=t>=tTw&&t<tKeep;g.addColorStop(0,doc?'#222':'#9ad0f5');g.addColorStop(1,doc?'#444':'#eaf6ff');c.fillStyle=g;c.fillRect(-300,-300,1680,2520);
  c.fillStyle='#f6fbff';c.fillRect(-300,1000,1680,1200);
  mountain(c);
  const flock=Math.min(1,t/3);
  for(let i=0;i<7;i++){const x=900-i*110-((t*60)%1200)*0+Math.sin(t*3+i)*6;penguin(c,x-80*flock,1250+(i%2)*70,0.55,-1,t+i,0.06);}
  const px=540+clamp((t-tSnow)/(tKeep-tSnow))*420;
  penguin(c,px,1100,0.9,1,t,0.05,'#101020');
  for(let i=0;i<60;i++){c.fillStyle='rgba(255,255,255,.8)';c.fillRect((i*97+t*(80+i%5*30))%1080,(i*173+t*140)%1920,6,6);}
  burst(c,'POV: GROUP PROJECT',540,420,tPov,t,'#ffd23f',90,1.4);
  burst(c,'LOCK IN',540,380,tLock,t,'#ff6b6b',130,1.2);
  burst(c,'NO.',540,560,tNo,t,'#fff',150,1.2);
  burst(c,'PLOT TWIST!',540,380,tTw,t,'#ffd23f',120);
  stamp(c,'REAL FOOTAGE, 2007',540,820,tHer+0.1,t,'#c0392b',70);
  burst(c,'HERZOG',540,560,tHer,t,'#fff',120,1.4);
  burst(c,'SEND THIS',540,520,tKeep+3,t,'#b6e36a',130,1.6);
  confetti(c,t,540,500,tEnd,40);
 }};
};
