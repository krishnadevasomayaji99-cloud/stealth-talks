window.SCENE=function(a){const {k,ease,clamp}=a;const B=window.B3;
const WX=(q,n=0)=>{let c=0;for(const w of a.words){if(w.w.toLowerCase().replace(/[^a-z0-9']/g,'')===q){if(c===n)return w.start;c++;}}throw new Error('word not found: '+q);};
const tFlower=WX('flower'),tLeo=WX("leo's"),tNobody=WX('nobody'),tSam=WX('sam'),tForest=WX('forest'),tMud=WX('mud'),tBeach=WX('beach'),tThank=WX('thank',1),tPop=WX('popped'),tRace=WX('raced'),tPetals=WX('petals'),tHug=WX('hugged'),tSome=WX('somebody'),tEnd=a.words[a.words.length-1].end+0.5;
const tForestIn=tForest-0.5,tBeachIn=tBeach-0.5,tRoomIn=tRace-0.2;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tFlower,sfx:'boom',gain:0.8},{t:tLeo,sfx:'tick',gain:0.7},{t:tNobody,sfx:'static',gain:0.4},{t:tSam,sfx:'tick',gain:0.7},{t:tForestIn,sfx:'whoosh',gain:0.8},{t:tForestIn,sfx:'wind',gain:0.6},{t:tMud,sfx:'thud',gain:0.9},{t:tBeachIn,sfx:'whoosh',gain:0.8},{t:tThank,sfx:'chime',gain:0.9},{t:tPop,sfx:'sparkle',gain:1},{t:tPop+0.3,sfx:'pop',gain:0.8},{t:tPop+0.5,sfx:'pop',gain:0.8},{t:tRoomIn,sfx:'whoosh',gain:0.8},{t:tPetals,sfx:'sparkle',gain:0.9},{t:tHug,sfx:'heartbeat',gain:0.9},{t:tHug+0.2,sfx:'music_box',gain:0.8},{t:tSome,sfx:'chime',gain:0.7}];
const cnt=t=>t>=tPop+0.6?11:t>=tPop?1:0;
const S={};
function mk(kind,o){const w=B.stage(kind,o);w.sam=w.person({shirt:'#2a9d8f',pants:'#22315c',hair:'#3b2a1a',style:'spike'});w.scene.add(w.sam);return w;}
function get(n){if(S[n])return S[n];const w=S[n]=mk(n);
 if(n==='room'){w.leo=w.person({shirt:'#8a8f98',pants:'#5a4a3a',hair:'#d9d9d9',style:'band',skin:'#e0ac69'});w.scene.add(w.leo);w.lt=w.tag('THANKS 0','#b3121b');w.lt.position.set(0,10,0);w.lt.scale.set(2.6,0.65,1);w.leo.add(w.lt);
  w.pet=[];for(let i=0;i<40;i++){const b=w.box(0.45,0.45,0.1,['#ff7aa8','#ffd166','#ffffff','#ff9f1c'][i%4],0,0,0,w.scene);b.userData.s=[(B.rnd(i)-0.5)*14,B.rnd(i+3)*4+4,B.rnd(i+5)-0.5];w.pet.push(b);}}
 if(n==='beach'){w.girl=w.person({shirt:'#e76f51',pants:'#264653',hair:'#c9a227',style:'long'});w.scene.add(w.girl);}
 return w;}
function stageAt(t){return t<tForestIn?'room':t<tBeachIn?'forest':t<tRoomIn?'beach':'room';}
function hud(c,t){const v=cnt(t);c.save();c.fillStyle='rgba(10,10,14,0.82)';c.beginPath();c.roundRect(120,80,840,110,22);c.fill();c.fillStyle='#fff';c.font='900 42px "DejaVu Sans", Arial';c.textAlign='left';c.textBaseline='middle';c.fillText("LEO'S THANK-YOU FLOWERS",150,134);c.fillStyle=v?'#2ec27e':'#ff4d5e';c.font='900 64px "DejaVu Sans", Arial';c.textAlign='right';c.fillText(String(v),930,130);c.restore();}
function cam(n,t){const P=p=>k(t,p);
 if(n==='room')return t<tForestIn?{p:[P([[0,-3],[tLeo,2],[tSam,4],[tForestIn,0]]),7,P([[0,22],[tLeo,15],[tSam,12],[tForestIn,13]])],l:[0,5,-3]}:{p:[P([[tRoomIn,-6],[tHug,0],[tEnd,1]]),7,P([[tRoomIn,18],[tHug,12],[tEnd,11]])],l:[0,5,-3]};
 if(n==='forest')return {p:[P([[tForestIn,-3],[tMud,3],[tBeachIn,4]]),5,P([[tForestIn,14],[tMud,2],[tBeachIn,-8]])],l:[0,4,P([[tForestIn,-12],[tBeachIn,-40]])]};
 return {p:[P([[tBeachIn,5],[tThank,2],[tRoomIn,-2]]),6,P([[tBeachIn,18],[tThank,12],[tRoomIn,10]])],l:[0,4,-5]};}
return {cues,caption:'bar',capY:1580,
 draw(c,t){const n=stageAt(t),w=get(n),sam=w.sam;
  if(n==='room'){const leo=w.leo;w.lt.userData.set('THANKS '+cnt(t),cnt(t)?'#1b7f3a':'#b3121b');
   if(t<tForestIn){B.pose(leo,t,{act:'slump',p:clamp((t-tNobody)/0.6),mood:'panic',at:[-2.5,-1]});leo.rotation.y=0.9;B.pose(sam,t,{act:t<tSam?'sit':'point',mood:'ok',at:[3,-2]});sam.rotation.y=-0.9;sam.visible=true;w.pet.forEach(b=>b.visible=false);}
   else{const hug=clamp((t-tHug)/0.6),run=clamp((t-tRoomIn)/(tHug-tRoomIn));B.pose(sam,t,{act:t>=tHug?'hug':'run',p:hug,mood:'ok',at:[7-6*run,-2]});sam.rotation.y=t>=tHug?0.9:-1.57;
    B.pose(leo,t,{act:t>=tHug?'hug':'cheer',p:hug,mood:'ok',at:[-0.4,-2]});leo.rotation.y=-0.9;
    w.pet.forEach(b=>{b.visible=t>=tPetals;const q=b.userData.s,u=((t-tPetals)*0.8+B.rnd(q[2]*9+3))%1;b.position.set(q[0],q[1]*(1-u)+0.5,-2+q[2]*4);b.rotation.z=t*2+q[0];});}}
  else if(n==='forest'){const run=clamp((t-tForestIn)/(tMud-tForestIn)),fall=clamp((t-tMud)/0.5);let act=t<tMud?'run':t<tMud+0.9?'trip':'run';B.pose(sam,t,{act,p:t<tMud+0.9?0.5*fall:1,mood:'panic',at:[0,-4-run*14-(t>tMud?(t-tMud)*10:0)]});sam.rotation.y=Math.PI;}
  else{w.girl.visible=true;B.pose(w.girl,t,{act:t>=tThank?'cheer':'sit',mood:t>=tThank?'ok':'neutral',at:[3,-10]});w.girl.rotation.y=2.3;
   B.pose(sam,t,{act:t<tThank-0.5?'walk':'point',mood:'ok',at:[-2,-4-6*clamp((t-tBeachIn)/(tThank-tBeachIn))]});sam.rotation.y=Math.PI*0.8;}
  const cm=cam(n,t),s1=B.shake(t,tMud,0.5,0.6);const p=cm.p;w.setCam([p[0]+s1[0],p[1]+s1[1],p[2]],cm.l);w.update(t);w.draw(c);hud(c,t);},
 post(c,t){for(const q of [tForestIn,tBeachIn,tRoomIn]){const d=Math.abs(t-q);if(d<0.1){c.fillStyle='rgba(255,255,255,'+(1-d/0.1)*0.8+')';c.fillRect(0,0,1080,1920);}}}};};
