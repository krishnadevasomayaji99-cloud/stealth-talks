window.SCENE=function(a){const {k,ease,clamp}=a;const B=window.B3;
const WX=(q,n=0)=>{let c=0;for(const w of a.words){if(w.w.toLowerCase().replace(/[^a-z0-9']/g,'')===q){if(c===n)return w.start;c++;}}throw new Error('word not found: '+q);};
const tDay=WX('day'),tMax=WX('max'),tThree=WX('three'),tRan=WX('ran'),tSlip=WX('slipped'),tRoof=WX('roof'),tLight=WX('light'),tJump=WX('jumped'),tCheck=WX('check'),tEnd=a.words[a.words.length-1].end+0.5;
const tSnowIn=tRan-0.5,tRoofIn=tRoof-0.6;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tDay,sfx:'boom',gain:0.8},{t:tMax,sfx:'tick',gain:0.7},{t:tThree,sfx:'static',gain:0.4},{t:tSnowIn,sfx:'whoosh',gain:0.8},{t:tSnowIn,sfx:'wind',gain:0.7},{t:tSlip,sfx:'thud',gain:0.9},{t:tRoofIn,sfx:'whoosh',gain:0.8},{t:tLight-0.4,sfx:'rise',gain:0.8},{t:tLight,sfx:'sparkle',gain:1},{t:tJump,sfx:'boom',gain:0.9},{t:tCheck,sfx:'chime',gain:0.7}];
const pat=t=>t>=tLight?100:t>=tRan?3:t>=tThree?6:t>=tMax?12:100;
const S={};
function get(n){if(S[n])return S[n];const w=S[n]=B.stage(n,n==='roof'?{dawn:true}:undefined);w.max=w.person({shirt:'#d62828',pants:'#22315c',hair:'#1a1a1a',style:'spike'});w.scene.add(w.max);return w;}
function stageAt(t){return t<tSnowIn?'room':t<tRoofIn?'snow':'roof';}
const col=v=>v<15?'#b3121b':v<60?'#c9861a':'#1b7f3a';
function hud(c,t){const v=pat(t),lbl=t>=tLight?'LAUNCH DAY!':'MAX PATIENCE';c.save();c.fillStyle='rgba(10,10,14,0.82)';c.beginPath();c.roundRect(120,80,840,120,22);c.fill();c.fillStyle='#fff';c.font='900 40px "DejaVu Sans", Arial';c.textAlign='left';c.textBaseline='middle';c.fillText(lbl,150,128);c.fillStyle='#2a2f3a';c.fillRect(150,152,780,26);c.fillStyle=col(v);c.fillRect(150,152,Math.max(6,780*v/100),26);c.font='900 54px "DejaVu Sans", Arial';c.textAlign='right';c.fillText(v+'%',930,124);c.restore();}
function cam(n,t){const P=p=>k(t,p);
 if(n==='room')return {p:[P([[0,-3],[tMax,2],[tThree,3],[tSnowIn,0]]),7,P([[0,22],[tMax,15],[tThree,11],[tSnowIn,12]])],l:[0,5,-3]};
 if(n==='snow'){const zA=P([[tSnowIn,-4],[tSlip,-12],[tRoofIn,-18]]);return {p:[P([[tSnowIn,20],[tSlip,20],[tRoofIn,14]]),P([[tSnowIn,8],[tRoofIn,6]]),zA],l:[0,4,zA]};}
 return {p:[P([[tRoofIn,-5],[tLight,0],[tEnd,3]]),P([[tRoofIn,4],[tLight,3],[tEnd,6]]),P([[tRoofIn,14],[tLight,9],[tEnd,10]])],l:[0,5,-4]};}
return {cues,caption:'bar',capY:1580,
 draw(c,t){const n=stageAt(t),w=get(n),m=w.max;
  if(n==='room'){B.pose(m,t,{act:t>=tThree?'slump':t>=tMax?'shiver':'cheer',p:clamp((t-tThree)/0.6),mood:t>=tThree?'panic':'ok',at:[-1,-1]});m.rotation.y=0.6;}
  else if(n==='snow'){let act='run',p=1,z=-4-11*clamp((t-tSnowIn)/(tSlip-tSnowIn));if(t>=tSlip){act='trip';p=0.5*clamp((t-tSlip)/0.5);z=-15-(t-tSlip)*6;if(t>tSlip+1.0){act='run';p=1;}}B.pose(m,t,{act,p,mood:'panic',at:[0,z]});m.rotation.y=Math.PI;}
  else{B.pose(m,t,{act:t>=tJump?'cheer':t>=tLight?'point':'walk',mood:t>=tLight?'ok':'neutral',at:[0,-3]});m.rotation.y=Math.PI;}
  const cm=cam(n,t),sh=B.shake(t,tSlip,0.5,0.6),s2=B.shake(t,tJump,0.6,0.5);const p=cm.p;w.setCam([p[0]+sh[0]+s2[0],p[1]+sh[1]+s2[1],p[2]],cm.l);w.update(t);w.draw(c);hud(c,t);},
 post(c,t){for(const q of [tSnowIn,tRoofIn]){const d=Math.abs(t-q);if(d<0.1){c.fillStyle='rgba(255,255,255,'+(1-d/0.1)*0.8+')';c.fillRect(0,0,1080,1920);}}
  if(t>=tLight&&t<tJump+1){const v=0.3*Math.sin(clamp((t-tLight)/(tJump+1-tLight))*Math.PI);const g=c.createRadialGradient(540,960,100,540,960,1100);g.addColorStop(0,'rgba(255,230,150,'+v+')');g.addColorStop(1,'rgba(255,230,150,0)');c.fillStyle=g;c.fillRect(0,0,1080,1920);}}};};
