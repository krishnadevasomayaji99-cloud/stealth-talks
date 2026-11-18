window.SCENE=function(a){const {k,ease,clamp}=a;const B=window.B3;
const WX=(q,n=0)=>{let c=0;for(const w of a.words){if(w.w.toLowerCase().replace(/[^a-z0-9']/g,'')===q){if(c===n)return w.start;c++;}}throw new Error('word not found: '+q);};
const tBar=WX('bar'),tMia=WX("mia's"),tSchool=WX('school'),tWhisp=WX('whispered'),tDrop=WX('dropped'),tHome=WX('home'),tFine=WX('fine'),tSnow=WX('snow'),tRan=WX('ran',1),tSlip=WX('slipped'),tCrack=WX('cracked'),tScream=WX('screamed'),tFill=WX('filled'),tHug=WX('hugged'),tSome=WX('somebody'),tEnd=a.words[a.words.length-1].end+0.5;
const tRoomIn=tHome-0.4,tSnowIn=tSnow-0.6;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tBar,sfx:'boom',gain:0.8},{t:tMia,sfx:'tick',gain:0.8},{t:tSchool-0.3,sfx:'whoosh',gain:0.5},{t:tWhisp,sfx:'tick',gain:0.6},{t:tDrop,sfx:'thud',gain:0.9},{t:tRoomIn,sfx:'whoosh',gain:0.8},{t:tFine,sfx:'tick',gain:0.6},{t:tFine+0.5,sfx:'static',gain:0.4},{t:tSnowIn,sfx:'wind',gain:0.8},{t:tSnowIn,sfx:'whoosh',gain:0.8},{t:tRan,sfx:'rise',gain:0.7},{t:tSlip,sfx:'thud',gain:0.9},{t:tCrack,sfx:'click',gain:1},{t:tCrack+0.12,sfx:'click',gain:1},{t:tScream-0.4,sfx:'rise',gain:0.9},{t:tScream,sfx:'boom',gain:1},{t:tScream+0.05,sfx:'thud',gain:1},{t:tFill,sfx:'sparkle',gain:0.9},{t:tHug,sfx:'heartbeat',gain:0.9},{t:tHug+0.2,sfx:'music_box',gain:0.8},{t:tSome,sfx:'chime',gain:0.7}];
const vol=t=>t>=tScream?4+96*ease(clamp((t-tScream)/0.9)):t>=tFine?3:t>=tDrop?5:4;
const S={};
function mk(kind,o){const w=B.stage(kind,o);const mia=w.person({shirt:'#7b2cbf',pants:'#22315c',hair:'#1a1a1a',style:'long'});w.scene.add(mia);const tg=w.tag('VOLUME 4%','#b3121b');tg.position.set(0,10,0);tg.scale.set(2.6,0.65,1);mia.add(tg);return Object.assign(w,{mia,tg,ex:[]});}
function get(n){if(S[n])return S[n];const w=S[n]=mk(n);
 if(n==='school'){[[-5,-26,'#f4a261','spike'],[6,-40,'#2a9d8f','band'],[-2,-55,'#e76f51','long']].forEach((q,i)=>{const p=w.person({shirt:q[2],pants:'#333a5a',hair:['#5a3a1e','#c9a227','#222'][i],style:q[3]});p.position.set(q[0],0,q[1]);p.rotation.y=i%2?-0.4:0.4;const tt=w.tag('VOLUME '+(60+i*15)+'%','#1b7f3a');tt.position.set(0,10,0);tt.scale.set(2.6,0.65,1);p.add(tt);w.scene.add(p);w.ex.push(p);});}
 if(n==='room'){w.mum=w.person({shirt:'#2a9d8f',pants:'#444',hair:'#8a5a2b',style:'band',skin:'#e0ac69'});w.scene.add(w.mum);const tt=w.tag('MUM 70%','#1b7f3a');tt.position.set(0,10,0);tt.scale.set(2.2,0.65,1);w.mum.add(tt);}
 if(n==='snow'){w.rac=B.raccoon();w.scene.add(w.rac);w.mum=w.person({shirt:'#2a9d8f',pants:'#444',hair:'#8a5a2b',style:'band',skin:'#e0ac69'});w.scene.add(w.mum);}
 return w;}
function stageAt(t){return t<tRoomIn?'school':t<tSnowIn?'room':'snow';}
const col=v=>v<15?'#b3121b':v<60?'#c9861a':'#1b7f3a';
function hud(c,t){const v=Math.round(vol(t));c.save();c.fillStyle='rgba(10,10,14,0.82)';c.beginPath();c.roundRect(120,80,840,120,22);c.fill();c.fillStyle='#fff';c.font='900 40px "DejaVu Sans", Arial';c.textAlign='left';c.textBaseline='middle';c.fillText('MIA VOLUME',150,128);c.fillStyle='#2a2f3a';c.fillRect(150,152,780,26);c.fillStyle=col(v);c.fillRect(150,152,Math.max(6,780*v/100),26);c.font='900 54px "DejaVu Sans", Arial';c.textAlign='right';c.fillText(v+'%',930,124);c.restore();}
function cam(n,t){const P=p=>k(t,p);
 if(n==='school')return {p:[P([[0,5],[tMia,-3],[tWhisp,-2],[tDrop,2],[tRoomIn,4]]),6,P([[0,20],[tMia,12],[tWhisp,9],[tDrop,10],[tRoomIn,14]])],l:[0,5,P([[0,-10],[tMia,-12],[tDrop,-20]])]};
 if(n==='room')return {p:[P([[tRoomIn,-3],[tFine,2],[tSnowIn,3]]),8,P([[tRoomIn,22],[tFine,17],[tSnowIn,15]])],l:[0,5,-3]};
 const zA=P([[tSnowIn,-4],[tRan-0.3,-5],[tSlip,-12],[tCrack,-18.5],[tEnd,-18.5]]);return {p:[P([[tSnowIn,22],[tSlip,22],[tScream,17],[tHug,14],[tEnd,14]]),P([[tSnowIn,8],[tScream,6]]),zA],l:[0,4,zA]};}
return {cues,caption:'bar',capY:1580,
 draw(c,t){const n=stageAt(t),w=get(n),mia=w.mia,v=Math.round(vol(t));w.tg.userData.set('VOLUME '+v+'%',col(v));
  if(n==='school'){const r=clamp(t/(tDrop-0.2));B.pose(mia,t,{act:t<tDrop?'walk':'trip',p:clamp((t-tDrop)/0.5),mood:'panic',at:[0,-12-r*8]});mia.rotation.y=Math.PI;w.ex.forEach((p,i)=>{B.pose(p,t,{act:'walk',ph:i*2,mood:'ok',at:[p.position.x,-26-i*14]});p.rotation.y=Math.PI;});}
  else if(n==='room'){B.pose(mia,t,{act:t>=tFine?'slump':'shiver',p:clamp((t-tFine)/0.6),mood:'panic',at:[-2.5,-1]});mia.rotation.y=0.9;B.pose(w.mum,t,{act:'point',mood:'ok',at:[3.5,-2]});w.mum.rotation.y=-0.9;}
  else{const run=clamp((t-tRan+0.4)/(tSlip-tRan+0.4)),hug=clamp((t-tHug)/0.6);
   const rx=t<tSlip?-6+0*run:-5;const rr=t<tRan?-4:-18;w.rac.position.set(t<tRan?4:0,0.9,t<tRan?-8:-22);w.rac.rotation.y=t<tRan?-1.2:0;
   if(t>=tCrack){w.cracks.forEach(q=>q.visible=true);}
   let act='run',p=1,at=[-1+0,0];
   if(t<tRan-0.3){act='shiver';at=[0,-4];}else if(t<tSlip){act='run';at=[0,-4-11*clamp((t-tRan+0.3)/(tSlip-tRan+0.3))];}
   else if(t<tScream-0.5){act='trip';p=0.45*clamp((t-tSlip)/0.5);at=[0,-15];}
   else if(t<tHug){act='cheer';at=[0,-15];}
   else{act='hug';p=hug;at=[0,-15];}
   B.pose(mia,t,{act,p,mood:t>=tScream?'ok':'panic',at});mia.rotation.y=Math.PI;
   B.pose(w.mum,t,{act:t>=tHug?'hug':'run',p:hug,mood:'ok',at:[t>=tHug?1.4:8-10*clamp((t-tFill)/(tHug-tFill)),-16]});w.mum.rotation.y=-1.57;w.mum.visible=t>=tFill;}
  const cm=cam(n,t),sh=B.shake(t,tDrop,0.5,0.5),s2=B.shake(t,tScream,0.9,0.6);const p=cm.p;w.setCam([p[0]+sh[0]+s2[0],p[1]+sh[1]+s2[1],p[2]+sh[2]],cm.l);w.update(t);w.draw(c);hud(c,t);},
 post(c,t){for(const q of [tRoomIn,tSnowIn]){const d=Math.abs(t-q);if(d<0.1){c.fillStyle='rgba(255,255,255,'+(1-d/0.1)*0.8+')';c.fillRect(0,0,1080,1920);}}
  if(t>=tScream&&t<tHug){const v=Math.sin(clamp((t-tScream)/(tHug-tScream))*Math.PI)*0.35;const g=c.createRadialGradient(540,960,100,540,960,1100);g.addColorStop(0,'rgba(255,240,200,'+v+')');g.addColorStop(1,'rgba(255,240,200,0)');c.fillStyle=g;c.fillRect(0,0,1080,1920);}}};};
