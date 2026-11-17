window.SCENE=function(a){const {k,ease,clamp}=a;const B=window.B3;
const WX=(q,n=0)=>{let c=0;for(const w of a.words){if(w.w.toLowerCase().replace(/[^a-z0-9']/g,'')===q){if(c===n)return w.start;c++;}}throw new Error('word not found: '+q);};
const tTen=WX('ten'),tAngry=WX('angry'),tShut=WX('shut'),tUp=WX('up',1),tLeave=WX('leave'),tMe=WX('me'),tAlone=WX('alone'),tBoss=WX('boss'),tNot=WX('not'),tMy=WX('my'),tProb=WX('problem'),tTwo=WX('two'),tRoof=WX('roof'),tCry=WX('crying'),tNoon=WX('noon'),tSat=WX('sat'),tHug=WX('hugged'),tIm=WX('i\'m'),tHere=WX('here'),tZero=WX('zero'),tSmile=WX('smiled'),tCount=WX('count'),tKind=WX('kind'),tEnd=a.words[a.words.length-1].end+0.6;
const spends=[tShut,tUp,tLeave,tMe,tAlone,tNot,tMy,tProb,tIm,tHere];
const cues=[{t:0.05,sfx:'pop',gain:0.6}].concat(spends.map(t=>({t:t,sfx:'tick',gain:0.7}))).concat([{t:tAngry-0.2,sfx:'whoosh',gain:0.7},{t:tBoss-0.25,sfx:'whoosh',gain:0.7},{t:tTwo,sfx:'rise',gain:0.8},{t:tRoof-0.25,sfx:'whoosh',gain:0.7},{t:tHug,sfx:'chime',gain:0.9},{t:tZero,sfx:'boom',gain:0.8},{t:tSmile,sfx:'chime',gain:0.7},{t:tCount,sfx:'pop',gain:0.7}]);
const left=t=>10-spends.filter(s=>t>=s).length;
const S={};
function mk(kind,o,other){const w=B.stage(kind,o);const leo=w.person({shirt:'#ff9f1c',pants:'#2b4570',hair:'#222',style:'spike'});const ot=w.person(other);w.scene.add(leo);w.scene.add(ot);const tl=w.tag('WORDS 10','#1b7f3a');tl.position.set(0,10,0);tl.scale.set(2.4,0.65,1);leo.add(tl);const to=w.tag(other.name,'#333');to.position.set(0,10,0);to.scale.set(2.4,0.65,1);ot.add(to);return Object.assign(w,{leo,ot,tl,to});}
const defs={beach:[ 'beach',{name:'',shirt:'#fff',hair:'#222'}],room:['room',{name:'DAD',shirt:'#6b4a2f',pants:'#444',hair:'#9a9a9a',glasses:true,style:'band',skin:'#e0ac69'}],forest:['forest',{name:'BOSS',shirt:'#22262e',pants:'#22262e',hair:'#14161b',hat:'#14161b',glasses:true,skin:'#e0ac69'}],roof:['roof',{name:'SISTER 0',shirt:'#c77dff',pants:'#3a3f9e',hair:'#4a2c1a',style:'long'}]};
const get=n=>S[n]||(S[n]=mk(defs[n][0],null,defs[n][1]));
function stageAt(t){return t<tAngry-0.2?'beach':t<tBoss-0.25?'room':t<tRoof-0.25?'forest':'roof';}
const colr=v=>v<=2?'#b3121b':v<=5?'#c9861a':'#1b7f3a';
function hud(c,t){const n=left(t);c.save();c.fillStyle='rgba(10,10,14,0.8)';c.beginPath();c.roundRect(150,80,780,110,22);c.fill();c.fillStyle='#fff';c.font='900 42px "DejaVu Sans", Arial';c.textAlign='left';c.textBaseline='middle';c.fillText('WORDS LEFT',180,135);c.fillStyle=colr(n);c.font='900 66px "DejaVu Sans", Arial';c.textAlign='right';c.fillText(String(n),900,138);c.restore();}
function cam(n,t){const P=p=>k(t,p);
 if(n==='beach')return {p:[P([[0,6],[tAngry-0.2,0]]),7,P([[0,22],[tTen,16],[tAngry,13]])],l:[0,5,-4]};
 if(n==='room')return {p:[P([[tAngry-0.2,-3],[tShut,0],[tAlone,0.5],[tBoss,0.5]]),9,P([[tAngry-0.2,24],[tShut,21],[tAlone,19]])],l:[0,5,-3]};
 if(n==='forest')return {p:[P([[tBoss-0.25,6],[tProb,0],[tTwo,0]]),7,P([[tBoss-0.25,24],[tNot,21],[tTwo,18],[tRoof,18]])],l:[0,5.2,-2]};
 return {p:[P([[tRoof-0.25,-4],[tHug,0],[tEnd,0]]),P([[tRoof-0.25,10],[tHug,9],[tCount,8]]),P([[tRoof-0.25,24],[tCry,20],[tHug,18],[tZero,16],[tCount,18],[tEnd,17]])],l:[0,5,-1]};}
return {cues,caption:'bar',capY:1580,
 draw(c,t){const n=stageAt(t),w=get(n);const L=left(t);const leo=w.leo,ot=w.ot;
  w.tl.userData.set('WORDS '+L,colr(L));w.tl.visible=false;w.to.visible=n==='roof';ot.visible=n!=='beach';
  if(n==='beach'){B.pose(leo,t,{act:t<tAngry-0.7?'walk':'slump',p:clamp((t-tAngry+0.7)/0.5),mood:t<tTen+1?'ok':'panic',at:[0,-2]});leo.rotation.y=0;}
  else if(n==='room'){B.pose(leo,t,{act:t>=tShut-0.1?'point':'shiver',mood:'panic',at:[-3,-1]});leo.rotation.y=0.9;B.pose(ot,t,{act:t>=tShut?'slump':'point',p:clamp((t-tShut)/0.6),mood:t>=tShut?'shock':'smug',at:[4,-2]});ot.rotation.y=-0.9;w.to.userData.set('DAD','#333');}
  else if(n==='forest'){B.pose(leo,t,{act:t>=tNot-0.1?'point':'walk',mood:'panic',at:[-3.5,-2]});leo.rotation.y=1.0;B.pose(ot,t,{act:t>=tProb?'shrink':'point',p:clamp((t-tProb)/0.5),mood:'smug',at:[3.5,-2]});ot.rotation.y=-1.0;}
  else {const r=clamp((t-tRoof+0.2)/(tSat-tRoof+0.2)),hp=clamp((t-tHug)/0.6);
   B.pose(ot,t,{act:t>=tHug?'hug':'sit',p:hp,mood:t>=tSmile?'ok':'shock',at:[1.6,-1]});ot.rotation.y=-1.4;w.to.userData.set(t>=tSmile?'SISTER SMILES':'SISTER 0',t>=tSmile?'#1b7f3a':'#b3121b');
   B.pose(leo,t,{act:hp>0?'hug':'walk',p:hp,mood:t>=tSmile?'ok':'panic',at:[hp>0?-1.1:-16+14.9*ease(r),-1]});leo.rotation.y=1.4;}
  const cm=cam(n,t);w.setCam(cm.p,cm.l);w.update(t);w.draw(c);hud(c,t);},
 post(c,t){for(const q of [tAngry-0.2,tBoss-0.25,tRoof-0.25]){const d=Math.abs(t-q);if(d<0.1){c.fillStyle='rgba(255,255,255,'+(1-d/0.1)*0.8+')';c.fillRect(0,0,1080,1920);}}
  if(t>=tZero&&t<tCount){const v=Math.sin(clamp((t-tZero)/(tCount-tZero))*Math.PI)*0.3;const g=c.createRadialGradient(540,960,100,540,960,1100);g.addColorStop(0,'rgba(255,240,200,'+v+')');g.addColorStop(1,'rgba(255,240,200,0)');c.fillStyle=g;c.fillRect(0,0,1080,1920);}}};};
