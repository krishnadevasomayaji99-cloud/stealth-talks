window.SCENE=function(a){const {k,ease,clamp}=a;const B=window.B3;
const WX=(q,n=0)=>{let c=0;for(const w of a.words){if(w.w.toLowerCase().replace(/[^a-z0-9']/g,'')===q){if(c===n)return w.start;c++;}}throw new Error('word not found: '+q);};
const tStone=WX('stone'),tWoke=WX('one'),tCoach=WX('coach'),tSecond=WX('second'),tMom=WX('mom'),tThird=WX('third'),tFour=WX('four'),tSand=WX('sand'),tThank=WX('thank',1),tBurst=WX('burst'),tLaugh=WX('laughed'),tSay=WX('say',1),tEnd=a.words[a.words.length-1].end+0.5;
const tHomeIn=tMom-0.9,tBeachIn=tFour-0.3;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tStone,sfx:'boom',gain:0.8},{t:tWoke,sfx:'thud',gain:0.6},{t:tSecond,sfx:'thud',gain:0.8},{t:tHomeIn,sfx:'whoosh',gain:0.8},{t:tThird,sfx:'thud',gain:0.9},{t:tBeachIn,sfx:'whoosh',gain:0.8},{t:tFour,sfx:'thud',gain:0.9},{t:tSand+0.2,sfx:'thud',gain:0.9},{t:tThank,sfx:'heartbeat',gain:0.9},{t:tBurst,sfx:'sparkle',gain:1},{t:tBurst+0.3,sfx:'boom',gain:0.6},{t:tLaugh,sfx:'music_box',gain:0.8},{t:tSay,sfx:'chime',gain:0.7}];
const MT=[tWoke,tSecond,tThird,tFour];
const cnt=t=>t>=tBurst?0:MT.filter(x=>t>=x).length;
const S={};
function mk(kind){const w=B.stage(kind);w.leo=w.person({shirt:'#2a9d8f',pants:'#22315c',hair:'#3b2a20',style:'spike'});w.scene.add(w.leo);
 w.ic=[-1.9,-0.65,0.65,1.9].map(x=>{const s=B.icon('●','#8d99ae');s.position.set(x,9.6,0);w.leo.add(s);return s;});
 w.other=w.person({shirt:'#f4a261',pants:'#3d405b',hair:'#c9a227',style:'long'});w.scene.add(w.other);return w;}
function get(n){return S[n]||(S[n]=mk(n));}
function stageAt(t){return t<tHomeIn?'forest':t<tBeachIn?'room':'beach';}
function hud(c,t){const v=cnt(t);c.save();c.fillStyle='rgba(10,10,14,0.82)';c.beginPath();c.roundRect(120,80,840,110,22);c.fill();c.fillStyle='#fff';c.font='900 42px "DejaVu Sans", Arial';c.textAlign='left';c.textBaseline='middle';c.fillText("UNSAID THANK YOUS",150,134);c.fillStyle=v?'#ffd60a':'#2ec27e';c.font='900 64px "DejaVu Sans", Arial';c.textAlign='right';c.fillText(String(v),930,130);c.restore();}
function cam(n,t){const P=p=>k(t,p);
 if(n==='forest')return {p:[P([[0,-3],[tCoach,2],[tHomeIn,0]]),6,P([[0,23],[tCoach,19],[tHomeIn,18]])],l:[0,6,-3]};
 if(n==='room')return {p:[P([[tHomeIn,-5],[tThird,3],[tBeachIn,1]]),7,P([[tHomeIn,26],[tThird,20],[tBeachIn,19]])],l:[0,6,-3]};
 return {p:[P([[tBeachIn,4],[tThank,0],[tBurst,-1],[tEnd,1]]),7,P([[tBeachIn,25],[tThank,21],[tLaugh,17],[tEnd,16]])],l:[0,6,-3]};}
return {cues,caption:'bar',capY:1580,
 draw(c,t){const n=stageAt(t),w=get(n),leo=w.leo,o=w.other;
  w.ic.forEach((s,i)=>B.iconPop(s,t,MT[i],tBurst,1.8));
  if(n==='forest'){B.pose(leo,t,{act:t<tCoach?'walk':'shrink',p:1,mood:'ok',at:[-3,-2]});leo.rotation.y=0.9;
   B.pose(o,t,{act:'cheer',p:1,mood:'happy',at:[3,-2]});o.rotation.y=-0.9;}
  else if(n==='room'){B.pose(leo,t,{act:'slump',p:clamp((t-tMom)/0.6),mood:'worried',at:[-3,-2]});leo.rotation.y=0.9;
   B.pose(o,t,{act:'point',p:1,mood:'happy',at:[3,-2]});o.rotation.y=-0.9;}
  else{const fall=clamp((t-tSand)/0.5),hug=clamp((t-tLaugh)/0.6);
   const act=t>=tLaugh?'hug':t>=tThank?'cheer':t<tSand?'trip':'slump';
   B.pose(leo,t,{act,p:t>=tLaugh?hug:t>=tThank?1:t<tSand?0.5*clamp((t-tBeachIn)/0.5):1,mood:t>=tBurst?'happy':t>=tThank?'ok':'sad',at:[-2,-2]});leo.rotation.y=0.9;
   o.visible=t>=tThank;B.pose(o,t,{act:t>=tLaugh?'hug':'cheer',p:t>=tLaugh?hug:1,mood:'happy',at:[3,-2]});o.rotation.y=-0.9;}
  const cm=cam(n,t),s1=B.shake(t,tSand+0.2,0.5,0.6),s2=B.shake(t,tBurst,0.3,0.5);const p=cm.p;w.setCam([p[0]+s1[0]+s2[0],p[1]+s1[1]+s2[1],p[2]],cm.l);w.update(t);w.draw(c);
  if(n!=='beach'||t<tBurst)B.blurEdges(c,Math.min(0.55,0.5*clamp((t-tMom)/1)),0);hud(c,t);},
 post(c,t){for(const q of [tHomeIn,tBeachIn]){const d=Math.abs(t-q);if(d<0.1){c.fillStyle='rgba(255,255,255,'+(1-d/0.1)*0.8+')';c.fillRect(0,0,1080,1920);}}if(t>=tBurst&&t<tBurst+0.3){c.fillStyle='rgba(255,230,150,'+(0.6*(1-(t-tBurst)/0.3))+')';c.fillRect(0,0,1080,1920);}}};};
