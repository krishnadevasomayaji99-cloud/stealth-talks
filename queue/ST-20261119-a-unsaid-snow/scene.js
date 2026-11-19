window.SCENE=function(a){const {k,ease,clamp}=a;const B=window.B3;
const WX=(q,n=0)=>{let c=0;for(const w of a.words){if(w.w.toLowerCase().replace(/[^a-z0-9']/g,'')===q){if(c===n)return w.start;c++;}}throw new Error('word not found: '+q);};
const tNever=WX('never'),tMon=WX('monday'),tFri=WX('friday'),tWin=WX('windows'),tIn=WX('inside'),tPhone=WX('phone'),tKnock=WX('knocked'),tDoor=WX('door'),tPour=WX('poured'),tProud=WX('proud'),tStop=WX('stopped'),tGold=WX('gold'),tMelt=WX('melted'),tSay=WX('say'),tEnd=a.words[a.words.length-1].end+0.6;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tMon,sfx:'tick',gain:0.6},{t:tFri,sfx:'tick',gain:0.7},{t:tWin,sfx:'rise',gain:0.8},{t:tIn-0.25,sfx:'whoosh',gain:0.7},{t:tKnock,sfx:'boom',gain:0.9},{t:tKnock-0.3,sfx:'whoosh',gain:0.6},{t:tPour,sfx:'static',gain:0.5},{t:tProud,sfx:'chime',gain:0.9},{t:tStop-0.2,sfx:'whoosh',gain:0.7},{t:tGold,sfx:'chime',gain:0.8},{t:tSay,sfx:'pop',gain:0.6}];
const depth=t=>Math.round(t<tMon?10*clamp(t/tMon):t<tFri?10+60*clamp((t-tMon)/(tFri-tMon)):t<tProud?70+95*clamp((t-tFri)/(tPour-tFri)):165*(1-ease(clamp((t-tProud)/2.2))));
const S={};
function mk(kind,o){const w=B.stage(kind,o);const walt=w.person({shirt:'#8a6f4e',pants:'#4a4a52',hair:'#ececec',glasses:true,style:'band',skin:'#e6b98a'});walt.scale.set(0.95,0.95,0.95);const son=w.person({shirt:'#3a7bd5',pants:'#2b2f45',hair:'#2a1b12',style:'spike'});w.scene.add(walt);w.scene.add(son);return Object.assign(w,{walt,son});}
const get=n=>S[n]||(S[n]=mk(n));
function stageAt(t){return t<tIn-0.25?'aerial':t<tKnock-0.3?'room':t<tStop-0.2?'yard':'beach';}
const names={aerial:'snow',room:'room',yard:'snow',beach:'beach'};
function hud(c,t){const d=depth(t),col=d>120?'#b3121b':d>50?'#c9861a':d>0?'#c9d9ea':'#1b7f3a';c.save();c.fillStyle='rgba(10,10,14,0.78)';c.beginPath();c.roundRect(150,80,780,110,22);c.fill();c.fillStyle='#fff';c.font='900 40px "DejaVu Sans", Arial';c.textAlign='left';c.textBaseline='middle';c.fillText('UNSAID = SNOW',180,135);c.fillStyle=col;c.font='900 62px "DejaVu Sans", Arial';c.textAlign='right';c.fillText(d+' cm',900,138);c.restore();}
function cam(n,t){const P=p=>k(t,p);
 if(n==='aerial')return {p:[P([[0,-14],[tWin,-26]]),P([[0,52],[tNever,40],[tMon,24],[tWin,13]]),P([[0,12],[tNever,6],[tWin,-6]])],l:[-28,3,-30]};
 if(n==='room')return {p:[P([[tIn-0.25,5],[tPhone,3],[tKnock,3]]),9,P([[tIn-0.25,22],[tPhone,14],[tKnock,12]])],l:[3,5.2,-4.5]};
 if(n==='yard')return {p:[P([[tKnock-0.3,0],[tPour,0],[tProud,0]]),7,P([[tKnock-0.3,24],[tPour,21],[tProud,17],[tStop,17]])],l:[0,5.2,-2]};
 return {p:[P([[tStop-0.2,-5],[tMelt,0],[tEnd,3]]),8,P([[tStop-0.2,22],[tMelt,18],[tEnd,17]])],l:[0,5,-2]};}
const marks=[tIn-0.25,tKnock-0.3,tStop-0.2];
return {cues,caption:'bar',capY:1580,
 draw(c,t){const n=stageAt(t),w=get(names[n]);const walt=w.walt,son=w.son;
  if(n==='yard'&&!w._k){w._k=1;w.kick(tKnock,0.5,[-3,-2],'#c9d9ea');}
  walt.visible=n!=='aerial';son.visible=n==='yard'||n==='beach';
  if(n==='room'){B.pose(walt,t,{act:'sit',mood:t>tPhone?'cry':'sad',at:[3,-4.4]});walt.rotation.y=0.2;}
  else if(n==='yard'){const hp=clamp((t-tProud)/0.7);B.pose(son,t,{act:hp>0?'hug':'walk',p:hp,mood:hp>0?'cry':'sad',at:[hp>0?-1.2:-8+8*ease(clamp((t-tKnock+0.3)/0.9)),-2]});son.rotation.y=1.4;
   B.pose(walt,t,{act:hp>0?'hug':(t>tPour?'slump':'point'),p:hp>0?hp:clamp((t-tDoor)/0.6),mood:hp>0?'cry':'shock',at:[1.2,-2]});walt.rotation.y=-1.4;}
  else if(n==='beach'){B.pose(son,t,{act:'cheer',mood:'happy',at:[-2.5,-2],ph:0});son.rotation.y=0.4;B.pose(walt,t,{act:'cheer',mood:'happy',at:[2.5,-2],ph:1.5});walt.rotation.y=-0.4;}
  const cm=cam(n,t);w.setCam(cm.p,cm.l);w.update(t);
  let wh=0;for(const m of marks){const d=Math.abs(t-m);if(d<0.18)wh=Math.max(wh,1-d/0.18);}
  w.draw(c,wh*0.8);hud(c,t);}};};
