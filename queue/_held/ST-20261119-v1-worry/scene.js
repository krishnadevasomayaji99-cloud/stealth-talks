window.SCENE=function(a){const {k,ease,clamp}=a;const B=window.B3;
const WX=(q,n=0)=>{let c=0;for(const w of a.words){if(w.w.toLowerCase().replace(/[^a-z0-9']/g,'')===q){if(c===n)return w.start;c++;}}throw new Error('word not found: '+q);};
const tQ=WX('question'),tOne=WX('one'),tTeach=WX('teacher'),tFine=WX('fine'),tDad=WX('dad'),tThird=WX('third'),tOut=WX('outside'),tFriend=WX('friend'),tMark=WX('mark'),tNot=WX('not'),tBurst=WX('burst'),tHug=WX('hugged'),tSome=WX('someone',1),tEnd=a.words[a.words.length-1].end+0.5;
const tHomeIn=tDad-0.9,tSnowIn=tOut-0.4;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tQ,sfx:'boom',gain:0.8},{t:tOne,sfx:'question',gain:0.8},{t:tTeach,sfx:'tick',gain:0.7},{t:tFine,sfx:'static',gain:0.4},{t:tHomeIn,sfx:'whoosh',gain:0.8},{t:tDad,sfx:'question',gain:0.9},{t:tThird,sfx:'question',gain:0.9},{t:tSnowIn,sfx:'whoosh',gain:0.8},{t:tSnowIn,sfx:'wind',gain:0.6},{t:tOut+0.9,sfx:'thud',gain:0.9},{t:tMark,sfx:'question',gain:0.9},{t:tNot,sfx:'heartbeat',gain:0.9},{t:tBurst,sfx:'sparkle',gain:1},{t:tBurst+0.3,sfx:'boom',gain:0.6},{t:tHug,sfx:'music_box',gain:0.8},{t:tSome,sfx:'chime',gain:0.7}];
const MT=[tOne,tDad+0.6,tThird,tMark];
const cnt=t=>t>=tBurst?0:MT.filter(x=>t>=x).length;
const S={};
function mk(kind){const w=B.stage(kind);w.mia=w.person({shirt:'#e63946',pants:'#22315c',hair:'#5b3a29',style:'long'});w.scene.add(w.mia);
 w.ic=[-1.9,-0.65,0.65,1.9].map(x=>{const s=B.icon('?','#ffd60a');s.position.set(x,9.6,0);w.mia.add(s);return s;});return w;}
function get(n){if(S[n])return S[n];const w=S[n]=mk(n);
 if(n==='school'){w.other=w.person({shirt:'#6c757d',pants:'#333',hair:'#d9d9d9',style:'band',skin:'#e0ac69'});}
 if(n==='room'){w.other=w.person({shirt:'#2a9d8f',pants:'#3a3a4a',hair:'#222',style:'spike',skin:'#e0ac69'});}
 if(n==='snow'){w.other=w.person({shirt:'#f4a261',pants:'#3d405b',hair:'#c9a227',style:'long'});}
 w.scene.add(w.other);return w;}
function stageAt(t){return t<tHomeIn?'school':t<tSnowIn?'room':'snow';}
function hud(c,t){const v=cnt(t);c.save();c.fillStyle='rgba(10,10,14,0.82)';c.beginPath();c.roundRect(120,80,840,110,22);c.fill();c.fillStyle='#fff';c.font='900 42px "DejaVu Sans", Arial';c.textAlign='left';c.textBaseline='middle';c.fillText("PEOPLE WORRIED ABOUT MIA",150,134);c.fillStyle=v?'#ffd60a':'#2ec27e';c.font='900 64px "DejaVu Sans", Arial';c.textAlign='right';c.fillText(String(v),930,130);c.restore();}
function cam(n,t){const P=p=>k(t,p);
 if(n==='school')return {p:[P([[0,-3],[tTeach,2],[tHomeIn,0]]),6,P([[0,23],[tTeach,19],[tHomeIn,18]])],l:[0,6,-3]};
 if(n==='room')return {p:[P([[tHomeIn,-5],[tThird,3],[tSnowIn,1]]),7,P([[tHomeIn,26],[tThird,20],[tSnowIn,19]])],l:[0,6,-3]};
 return {p:[P([[tSnowIn,4],[tMark,0],[tBurst,-1],[tEnd,1]]),7,P([[tSnowIn,25],[tMark,21],[tHug,17],[tEnd,16]])],l:[0,6,-3]};}
return {cues,caption:'bar',capY:1580,
 draw(c,t){const n=stageAt(t),w=get(n),mia=w.mia,o=w.other;
  w.ic.forEach((s,i)=>B.iconPop(s,t,MT[i],tBurst,1.8));
  if(n==='school'){B.pose(mia,t,{act:t<tTeach?'walk':'shrink',p:1,mood:t<tFine?'worried':'ok',at:[-3,-2]});mia.rotation.y=0.9;
   B.pose(o,t,{act:t<tTeach?'sit':'point',p:1,mood:'worried',at:[3,-2]});o.rotation.y=-0.9;}
  else if(n==='room'){B.pose(mia,t,{act:'slump',p:clamp((t-tDad)/0.6),mood:'worried',at:[-3,-2]});mia.rotation.y=0.9;
   B.pose(o,t,{act:t<tThird?'point':'shrink',p:1,mood:'worried',at:[3,-2]});o.rotation.y=-0.9;}
  else{const run=clamp((t-tSnowIn)/(tFriend-tSnowIn)),hug=clamp((t-tHug)/0.6),fall=clamp((t-tOut-0.9)/0.5);
   const act=t>=tHug?'hug':t>=tNot?'cheer':t<tOut+0.9?'run':t<tOut+1.8?'trip':'slump';
   B.pose(mia,t,{act,p:t>=tHug?hug:t<tOut+0.9?1:t<tOut+1.8?0.5*fall:1,mood:t>=tBurst?'ok':'sad',at:[t>=tNot?-2:-5+5*run,-2]});mia.rotation.y=t>=tNot?0.9:-1.57;
   o.visible=t>=tFriend-1.0;B.pose(o,t,{act:t>=tHug?'hug':'shiver',p:t>=tHug?hug:1,mood:t>=tBurst?'ok':'worried',at:[3,-2]});o.rotation.y=-0.9;}
  const cm=cam(n,t),s1=B.shake(t,tOut+0.9,0.5,0.6),s2=B.shake(t,tBurst,0.3,0.5);const p=cm.p;w.setCam([p[0]+s1[0]+s2[0],p[1]+s1[1]+s2[1],p[2]],cm.l);w.update(t);w.draw(c);
  if(n!=='snow'||t<tBurst)B.blurEdges(c,Math.min(0.55,0.5*clamp((t-tDad)/1)),0);hud(c,t);},
 post(c,t){for(const q of [tHomeIn,tSnowIn]){const d=Math.abs(t-q);if(d<0.1){c.fillStyle='rgba(255,255,255,'+(1-d/0.1)*0.8+')';c.fillRect(0,0,1080,1920);}}if(t>=tBurst&&t<tBurst+0.3){c.fillStyle='rgba(255,230,150,'+(0.6*(1-(t-tBurst)/0.3))+')';c.fillRect(0,0,1080,1920);}}};};
