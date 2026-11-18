window.SCENE=function(a){const {k,ease,clamp}=a;const B=window.B3;
const WX=(q,n=0)=>{let c=0;for(const w of a.words){if(w.w.toLowerCase().replace(/[^a-z0-9']/g,'')===q){if(c===n)return w.start;c++;}}throw new Error('word not found: '+q);};
const tTw=WX('twenty'),tGirl=WX('girl',0),tSix0=WX('six',0),tHiker=WX('hiker',0),tEi0=WX('eight',0),tWoman=WX('woman',0),tRoof=WX('rooftop'),tEi1=WX('eight',1),tLeft=WX('left'),tBeach=WX('beach'),tSun=WX('sun'),tHour=WX('hour',0),tRun=WX('running'),tOne=WX('one',0),tHug=WX('hugged'),tSix1=WX('six',1),tGlow=WX('glowing'),tBack=WX('back'),tWho=WX('who'),tEnd=a.words[a.words.length-1].end+0.5;
const tForest=tHiker-0.5,tRoofIn=tRoof-0.6,tBeachIn=tBeach-0.4;
const ev=[[tSix0,-6],[tEi0,-8],[tEi1,-8],[tHour,1],[tOne,1],[tSix1,6]];
const hrs=t=>{let h=24;for(const e of ev)if(t>=e[0])h+=e[1];return h;};
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tTw,sfx:'boom',gain:0.8},{t:tGirl-0.3,sfx:'whoosh',gain:0.5},{t:tSix0,sfx:'tick',gain:0.9},{t:tSix0+0.1,sfx:'chime',gain:0.6},{t:tForest-0.1,sfx:'whoosh',gain:0.8},{t:tForest,sfx:'wind',gain:0.8},{t:tEi0,sfx:'tick',gain:0.9},{t:tEi0+0.1,sfx:'chime',gain:0.6},{t:tRoofIn,sfx:'whoosh',gain:0.8},{t:tEi1,sfx:'tick',gain:0.9},{t:tLeft,sfx:'rise',gain:0.7},{t:tLeft+0.1,sfx:'heartbeat',gain:0.8},{t:tBeachIn,sfx:'whoosh',gain:0.8},{t:tSun,sfx:'music_box',gain:0.8},{t:tHour,sfx:'sparkle',gain:0.8},{t:tOne,sfx:'sparkle',gain:0.8},{t:tHug,sfx:'heartbeat',gain:0.9},{t:tSix1,sfx:'sparkle',gain:1},{t:tGlow,sfx:'chime',gain:0.9},{t:tBack-0.3,sfx:'rise',gain:0.9},{t:tBack,sfx:'boom',gain:1},{t:tBack+0.05,sfx:'thud',gain:0.9},{t:tWho,sfx:'chime',gain:0.7}];
const S={};
const defs={school:['school',null],forest:['forest',{wall:0}],roof:['roof',0],beach:['beach',0]};
function mk(kind){const w=B.stage(kind,{});const noah=w.person({shirt:'#ff9f1c',pants:'#2b4570',hair:'#222',style:'spike'});w.scene.add(noah);const tg=w.tag('HOURS 24','#1b7f3a');tg.position.set(0,10,0);tg.scale.set(2.6,0.65,1);noah.add(tg);
 const girl=w.person({shirt:'#ff7eb6',pants:'#3a3f9e',hair:'#4a2c1a',style:'long'});const hiker=w.person({shirt:'#2f7d4f',pants:'#4a3b2a',hair:'#14161b',hat:'#c0392b',skin:'#e0ac69',glasses:true});const woman=w.person({shirt:'#c77dff',pants:'#222',hair:'#c9a227',style:'band',skin:'#e0ac69'});
 [girl,hiker,woman].forEach(p=>{p.visible=false;w.scene.add(p);});return Object.assign(w,{noah,tg,girl,hiker,woman});}
function get(n){return S[n]||(S[n]=mk(n));}
function stageAt(t){return t<tForest?'school':t<tRoofIn?'forest':t<tBeachIn?'roof':'beach';}
const colr=v=>v<=4?'#b3121b':v<=12?'#c9861a':'#1b7f3a';
function hud(c,t){const n=hrs(t);c.save();c.fillStyle='rgba(10,10,14,0.82)';c.beginPath();c.roundRect(150,80,780,110,22);c.fill();c.fillStyle='#fff';c.font='900 42px "DejaVu Sans", Arial';c.textAlign='left';c.textBaseline='middle';c.fillText('NOAH HOURS',180,135);c.fillStyle=colr(n);c.font='900 66px "DejaVu Sans", Arial';c.textAlign='right';c.fillText(String(n),900,138);c.restore();}
function cam(n,t){const P=p=>k(t,p);
 if(n==='school'){const z=P([[0,-14],[tGirl,-14],[tSix0+0.5,-30],[tForest,-38]]);return {p:[0,8,z+20],l:[0,5,z-8]};}
 if(n==='forest'){const z=P([[tForest,-6],[tEi0,-14],[tRoofIn,-20]]);return {p:[P([[tForest,3],[tEi0,2],[tRoofIn,0]]),8.5,z+19],l:[0,5,z-12]};}
 if(n==='roof')return {p:[P([[tRoofIn,-8],[tEi1,-2],[tBeachIn,0]]),7,P([[tRoofIn,24],[tEi1,17],[tLeft,15],[tBeachIn,15]])],l:[0,4,-1]};
 return {p:[P([[tBeachIn,0],[tHug,-4],[tGlow,0],[tEnd,0]]),P([[tBeachIn,6],[tSun,8],[tHug,8],[tEnd,9]]),P([[tBeachIn,26],[tSun,22],[tHug,18],[tGlow,17],[tEnd,21]])],l:[0,4,-2]};}
return {cues,caption:'bar',capY:1580,
 draw(c,t){const n=stageAt(t),w=get(n),N=w.noah,h=hrs(t);w.tg.userData.set('HOURS '+h,colr(h));[w.girl,w.hiker,w.woman].forEach(p=>p.visible=false);
  if(n==='school'){const r=clamp(t/(tSix0+0.5));const z=-14-r*18;B.pose(N,t,{act:t<tGirl-0.5?'walk':'run',mood:t<tGirl?'ok':'panic',at:[1.8,z]});N.rotation.y=Math.PI;w.girl.visible=t>=tGirl-0.8;B.pose(w.girl,t,{act:'run',ph:1.3,mood:'panic',at:[-1.8,t<tGirl-0.8?-14:z-0.3]});w.girl.rotation.y=Math.PI;
   if(t<tGirl-0.8){B.pose(N,t,{act:'walk',mood:'ok',at:[0,-14-t*1.5]});}}
  else if(n==='forest'){const z=-6-clamp((t-tForest)/(tEi0+1.2-tForest))*14;w.hiker.visible=true;const gave=t>=tEi0;B.pose(w.hiker,t,{act:gave?'cheer':'shiver',mood:gave?'ok':'panic',at:[4,-22]});w.hiker.rotation.y=0.15;B.pose(N,t,{act:t<tEi0+0.9?'run':'point',mood:'ok',at:[-1.5,Math.max(z,-18)]});N.rotation.y=Math.PI;}
  else if(n==='roof'){w.woman.visible=true;B.pose(w.woman,t,{act:'slump',p:1,mood:'panic',at:[1.6,-1]});w.woman.rotation.y=-1.4;const sit=clamp((t-tRoofIn)/(tEi1-tRoofIn));B.pose(N,t,{act:t<tEi1-0.6?'walk':'sit',mood:'ok',at:[t<tEi1-0.6?-14+12.4*ease(clamp((t-tRoofIn)/(tEi1-0.6-tRoofIn))):-1.0,-1]});N.rotation.y=1.4;}
  else{const arr=(t0)=>clamp((t-t0)/1.4);w.girl.visible=t>=tSun;w.hiker.visible=t>=tRun-0.6;w.woman.visible=t>=tHug-1.2;const hu=clamp((t-tHug)/0.6);
   B.pose(N,t,{act:t<tSun?'sit':(t>=tGlow?'cheer':(t>=tHug?'hug':'sit')),p:hu,mood:t>=tGlow?'ok':'panic',at:[0,-1]});N.rotation.y=t>=tHug&&t<tGlow?1.0:0;
   B.pose(w.girl,t,{act:t>=tGlow?'cheer':'walk',ph:1,mood:'ok',at:[-9+6.5*ease(arr(tSun)),-1.5]});w.girl.rotation.y=1.2;
   B.pose(w.hiker,t,{act:t>=tGlow?'cheer':'run',mood:'ok',at:[10-7.4*ease(arr(tRun-0.6)),-1.5]});w.hiker.rotation.y=-1.2;
   B.pose(w.woman,t,{act:t>=tHug?'hug':'walk',p:hu,mood:'ok',at:[t>=tHug?1.3:-12+11*ease(arr(tHug-1.2)),0.6]});w.woman.rotation.y=-0.5;}
  const cm=cam(n,t),sh=B.shake(t,tEi0,0.4,0.4),s2=B.shake(t,tBack,0.8,0.5);const p=cm.p;w.setCam([p[0]+sh[0]+s2[0],p[1]+sh[1]+s2[1],p[2]+sh[2]],cm.l);w.update(t);w.draw(c);hud(c,t);},
 post(c,t){for(const q of [tForest,tRoofIn,tBeachIn]){const d=Math.abs(t-q);if(d<0.1){c.fillStyle='rgba(255,255,255,'+(1-d/0.1)*0.8+')';c.fillRect(0,0,1080,1920);}}
  if(t>=tGlow&&t<tWho){const v=Math.sin(clamp((t-tGlow)/(tWho-tGlow))*Math.PI)*0.4;const g=c.createRadialGradient(540,960,100,540,960,1100);g.addColorStop(0,'rgba(255,240,200,'+v+')');g.addColorStop(1,'rgba(255,240,200,0)');c.fillStyle=g;c.fillRect(0,0,1080,1920);}}};};
