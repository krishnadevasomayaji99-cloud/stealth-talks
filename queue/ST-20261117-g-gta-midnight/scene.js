window.SCENE=function(a){const {k,ease,clamp}=a;const B=window.B3;
const WX=(q,n=0)=>{let c=0;for(const w of a.words){if(w.w.toLowerCase().replace(/[^a-z0-9']/g,'')===q){if(c===n)return w.start;c++;}}throw new Error('word not found: '+q);};
const tSome=WX('some'),tMid=WX('midnight',1),tPS=WX('playstation'),tPre=WX('preload'),tCatch=WX('catch'),tForbes=WX('forbes'),tOne=WX('one'),tEast=WX('eastern'),tWest=WX('west'),tNine=WX('nine'),tCal=WX('calendar'),tRand=WX('random'),tStore=WX('store'),tEnd=a.words[a.words.length-1].end+0.5;
const tRoofIn=tEast-0.5,tBeachIn=tWest-0.5;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tSome,sfx:'boom',gain:0.8},{t:tMid,sfx:'chime',gain:0.8},{t:tMid+0.1,sfx:'tick',gain:1},{t:tPS,sfx:'chime',gain:0.8},{t:tPS+0.1,sfx:'tick',gain:1},{t:tPre,sfx:'chime',gain:0.8},{t:tPre+0.1,sfx:'tick',gain:1},{t:tCatch-0.3,sfx:'scratch',gain:0.7},{t:tForbes,sfx:'ding_dong',gain:0.6},{t:tOne,sfx:'tick',gain:0.8},{t:tRoofIn-0.1,sfx:'rise',gain:0.8},{t:tEast-0.25,sfx:'rise',gain:0.8},{t:tEast,sfx:'boom',gain:1},{t:tEast+0.05,sfx:'thud',gain:0.9},{t:tBeachIn,sfx:'whoosh',gain:0.8},{t:tNine,sfx:'chime',gain:0.9},{t:tNine+0.1,sfx:'sparkle',gain:0.8},{t:tCal,sfx:'tick',gain:0.7},{t:tRand,sfx:'static',gain:0.6},{t:tStore,sfx:'chime',gain:0.7}];
const S={};
function mk(kind){const w=B.stage(kind,{});const d=w.person({shirt:'#ff4d6d',pants:'#26324d',hair:'#222',style:'spike',glasses:true});w.scene.add(d);const tg=w.tag('PLAYER','#1b6b8a');tg.position.set(0,10,0);tg.scale.set(2.4,0.65,1);d.add(tg);return Object.assign(w,{d,tg});}
const S2={};function get(n){return S2[n]||(S2[n]=mk(n));}
function stageAt(t){return t<tRoofIn?'room':t<tBeachIn?'roof':'beach';}
function hud(c,t,n){const L=n==='room'?['LAUNCH','NOV 19, 00:00 LOCAL']:n==='roof'?['EAST COAST','12:00 AM NOV 19']:['WEST COAST','9:00 PM NOV 18'];c.save();c.fillStyle='rgba(10,10,14,0.82)';c.beginPath();c.roundRect(120,80,840,120,22);c.fill();c.fillStyle='#fff';c.font='900 30px "DejaVu Sans", Arial';c.textAlign='left';c.textBaseline='middle';c.fillText(L[0],150,128);c.fillStyle=n==='room'?'#ffd166':n==='roof'?'#7bdcff':'#7dff9a';c.font='900 40px "DejaVu Sans", Arial';c.textAlign='right';c.fillText(L[1],930,130);c.restore();
 if(n==='room'&&t>=tPre){const r=clamp((t-tPre)/1.5);c.save();c.fillStyle='rgba(10,10,14,0.82)';c.beginPath();c.roundRect(120,215,840,70,18);c.fill();c.fillStyle='#2a2f3a';c.fillRect(150,238,540,26);c.fillStyle='#2ecc71';c.fillRect(150,238,540*r,26);c.fillStyle='#fff';c.font='900 34px "DejaVu Sans", Arial';c.textAlign='right';c.fillText('PRE-LOAD '+Math.round(r*100)+'%',930,252);c.restore();}}
function cam(n,t){const P=p=>k(t,p);
 if(n==='room')return {p:[P([[0,-5],[tMid,0],[tPS,2],[tCatch,0],[tRoofIn,-2]]),P([[0,7],[tMid,8]]),P([[0,26],[tMid,28],[tCatch,22],[tRoofIn,20]])],l:[0,5,-4]};
 if(n==='roof')return {p:[P([[tRoofIn,-6],[tEast,0],[tBeachIn,0]]),7,P([[tRoofIn,24],[tEast,17],[tBeachIn,15]])],l:[0,4.5,-2]};
 return {p:[P([[tBeachIn,5],[tNine,0],[tEnd,0]]),P([[tBeachIn,7],[tNine,8],[tEnd,10]]),P([[tBeachIn,22],[tNine,18],[tEnd,20]])],l:[0,4,-2]};}
return {cues,caption:'bar',capY:1580,
 draw(c,t){const n=stageAt(t),w=get(n),d=w.d;w.tg.userData.set(n==='room'?'WAITING':n==='roof'?'EAST':'WEST',n==='room'?'#c9861a':'#1b7f3a');
  if(n==='room'){const lag=t<tCatch;B.pose(d,t,{act:t<tMid-0.6?'cheer':t<tPS?'point':t<tPre?'shiver':t<tPre+2.5?'cheer':t<tCatch?'point':'slump',p:clamp((t-tCatch)/0.6),mood:lag?'ok':'panic',at:[0,-1]});d.rotation.y=0;w.tvS.visible=true;d.rotation.y=(t>=tMid-0.6&&t<tPS)?-0.5:0;}
  else if(n==='roof'){const g=t>=tEast;B.pose(d,t,{act:g?'cheer':'walk',mood:g?'ok':'panic',at:[g?0:-14+14*ease(clamp((t-tRoofIn)/(tEast-tRoofIn))),-1]});d.rotation.y=g?0:1.2;}
  else{const g=t>=tNine;B.pose(d,t,{act:g?'cheer':'walk',mood:g?'ok':'panic',at:[g?0:12-12*ease(clamp((t-tBeachIn)/(tNine-tBeachIn))),-1]});d.rotation.y=g?0:-1.2;}
  const cm=cam(n,t),s2=B.shake(t,tEast,0.7,0.5),s3=B.shake(t,tNine,0.5,0.4),p=cm.p;w.setCam([p[0]+s2[0]+s3[0],p[1]+s2[1]+s3[1],p[2]],cm.l);w.update(t);w.draw(c);hud(c,t,n);},
 post(c,t){for(const q of [tRoofIn,tBeachIn]){const dd=Math.abs(t-q);if(dd<0.1){c.fillStyle='rgba(255,255,255,'+(1-dd/0.1)*0.8+')';c.fillRect(0,0,1080,1920);}}}};};
