window.SCENE=function(a){const {k,ease,clamp}=a;const B=window.B3;
const WX=(q,n=0)=>{let c=0;for(const w of a.words){if(w.w.toLowerCase().replace(/[^a-z0-9']/g,'')===q){if(c===n)return w.start;c++;}}throw new Error('word not found: '+q);};
const tSix=WX('sixteen'),tGame=WX('game'),tNight=WX('night'),tMid=WX('midnight'),tPace=WX('paced'),tRoof=WX('roof'),tSis=WX('sister'),tHand=WX('over'),tScore=WX('nine'),tSmile=WX('smile'),tShare=WX('share'),tEnd=a.words[a.words.length-1].end+0.5;
const tRoofIn=tRoof-0.9,tBeachIn=tSis-0.4;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tSix,sfx:'boom',gain:0.8},{t:tNight,sfx:'tick',gain:0.6},{t:tMid,sfx:'tick',gain:0.7},{t:tPace,sfx:'static',gain:0.4},{t:tRoofIn,sfx:'whoosh',gain:0.8},{t:tBeachIn,sfx:'whoosh',gain:0.8},{t:tHand,sfx:'chime',gain:0.8},{t:tScore,sfx:'sparkle',gain:0.9},{t:tSmile,sfx:'music_box',gain:0.8},{t:tShare,sfx:'chime',gain:0.7}];
const S={};
function mk(kind){const w=kind==='roof'?B.stage('roof',{dawn:true}):B.stage(kind);w.jay=w.person({shirt:'#222',pants:'#333a55',hair:'#2b1b12',style:'band'});w.scene.add(w.jay);
 w.sis=w.person({shirt:'#ff7eb6',pants:'#4361ee',hair:'#e9c46a',style:'long',scale:0.8});w.scene.add(w.sis);return w;}
function get(n){return S[n]||(S[n]=mk(n));}
function stageAt(t){return t<tRoofIn?'room':t<tBeachIn?'roof':'beach';}
function mil(t){return Math.round(16*ease(clamp(t/(tNight+1))));}
function hud(c,t){const v=mil(t);c.save();c.fillStyle='rgba(10,10,14,0.82)';c.beginPath();c.roundRect(120,80,840,110,22);c.fill();c.fillStyle='#fff';c.font='900 42px "DejaVu Sans", Arial';c.textAlign='left';c.textBaseline='middle';c.fillText("PRE-ORDERED (MILLIONS)",150,134);c.fillStyle='#ffd60a';c.font='900 64px "DejaVu Sans", Arial';c.textAlign='right';c.fillText(String(v),930,130);c.restore();}
function cam(n,t){const P=p=>k(t,p);
 if(n==='room')return {p:[P([[0,-3],[tMid,2],[tRoofIn,0]]),6,P([[0,23],[tMid,19],[tRoofIn,18]])],l:[0,6,-3]};
 if(n==='roof')return {p:[P([[tRoofIn,-4],[tBeachIn,2]]),7,P([[tRoofIn,26],[tBeachIn,19]])],l:[0,6,-3]};
 return {p:[P([[tBeachIn,4],[tHand,0],[tEnd,1]]),7,P([[tBeachIn,25],[tHand,18],[tEnd,16]])],l:[0,6,-3]};}
return {cues,caption:'bar',capY:1580,
 draw(c,t){const n=stageAt(t),w=get(n),j=w.jay,s=w.sis;
  if(n==='room'){B.pose(j,t,{act:t<tMid?'sit':'run',p:1,mood:t<tMid?'worried':'panic',at:[-3,-2]});j.rotation.y=0.9;s.visible=false;}
  else if(n==='roof'){B.pose(j,t,{act:'slump',p:1,mood:'sad',at:[-3,-2]});j.rotation.y=0.9;s.visible=false;}
  else{const h=clamp((t-tHand)/0.6);B.pose(j,t,{act:t>=tHand?'cheer':'shrink',p:1,mood:t>=tHand?'happy':'worried',at:[-2.5,-2]});j.rotation.y=0.9;
   s.visible=true;B.pose(s,t,{act:t>=tHand?'cheer':'point',p:1,mood:'happy',at:[3,-2]});s.rotation.y=-0.9;}
  const cm=cam(n,t),s1=B.shake(t,tHand,0.4,0.5);const p=cm.p;w.setCam([p[0]+s1[0],p[1]+s1[1],p[2]],cm.l);w.update(t);w.draw(c);
  hud(c,t);},
 post(c,t){for(const q of [tRoofIn,tBeachIn]){const d=Math.abs(t-q);if(d<0.1){c.fillStyle='rgba(255,255,255,'+(1-d/0.1)*0.8+')';c.fillRect(0,0,1080,1920);}}}};};
