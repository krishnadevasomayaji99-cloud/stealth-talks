window.SCENE=function(a){const {k,ease,clamp}=a;const B=window.B3;
const WX=(q,n=0)=>{let c=0;for(const w of a.words){if(w.w.toLowerCase().replace(/[^a-z0-9']/g,'')===q){if(c===n)return w.start;c++;}}throw new Error('word not found: '+q);};
const tCoat=WX('coat'),tCold=WX('cold'),tBus=WX('bus'),tHes=WX('hesitated'),tHand=WX('handed'),tWarm=WX('warm'),tRan=WX('ran'),tBaker=WX('baker'),tScarf=WX('scarf'),tSmiled=WX('smiled'),tHome=WX('home'),tKnock=WX('knocked'),tHug=WX('hugged'),tSome=WX('somebody'),tEnd=a.words[a.words.length-1].end+0.5;
const tRoofIn=tRan-0.4,tRoomIn=tHome-0.3;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tCoat,sfx:'boom',gain:0.8},{t:tCold,sfx:'wind',gain:0.6},{t:tBus,sfx:'tick',gain:0.7},{t:tHand,sfx:'whoosh',gain:0.7},{t:tWarm,sfx:'sparkle',gain:1},{t:tWarm+0.2,sfx:'tick',gain:0.8},{t:tRoofIn,sfx:'whoosh',gain:0.8},{t:tScarf,sfx:'chime',gain:0.8},{t:tScarf+0.1,sfx:'tick',gain:0.8},{t:tSmiled,sfx:'sparkle',gain:0.8},{t:tRoomIn,sfx:'whoosh',gain:0.8},{t:tRoomIn+0.3,sfx:'wind',gain:0.5},{t:tKnock,sfx:'knock',gain:0.9},{t:tKnock+0.9,sfx:'tick',gain:0.8},{t:tHug,sfx:'heartbeat',gain:0.9},{t:tHug+0.2,sfx:'music_box',gain:0.8},{t:tSome,sfx:'chime',gain:0.7}];
const cnt=t=>t>=tKnock+0.9?3:t>=tScarf?2:t>=tWarm?1:0;
const S={};
function mk(kind,o){const w=B.stage(kind,o);w.mia=w.person({shirt:'#e63946',pants:'#22315c',hair:'#5b3a29',style:'long'});w.scene.add(w.mia);w.mt=w.tag('WARMTH 0','#2a6fdb');w.mt.position.set(0,10,0);w.mt.scale.set(2.6,0.65,1);w.mia.add(w.mt);return w;}
function get(n){if(S[n])return S[n];const w=S[n]=mk(n,n==='roof'?{dawn:true}:undefined);
 if(n==='snow'){w.boy=w.person({shirt:'#f4a261',pants:'#3d405b',hair:'#222',style:'spike'});w.scene.add(w.boy);}
 if(n==='roof'){w.baker=w.person({shirt:'#ffffff',pants:'#777',hair:'#d9d9d9',style:'band',skin:'#e0ac69'});w.scene.add(w.baker);}
 if(n==='room'){w.boy=w.person({shirt:'#f4a261',pants:'#3d405b',hair:'#222',style:'spike'});w.scene.add(w.boy);}
 return w;}
function stageAt(t){return t<tRoofIn?'snow':t<tRoomIn?'roof':'room';}
function hud(c,t){const v=cnt(t);c.save();c.fillStyle='rgba(10,10,14,0.82)';c.beginPath();c.roundRect(120,80,840,110,22);c.fill();c.fillStyle='#fff';c.font='900 42px "DejaVu Sans", Arial';c.textAlign='left';c.textBaseline='middle';c.fillText("THINGS MIA GAVE AWAY",150,134);c.fillStyle=v?'#2ec27e':'#ff4d5e';c.font='900 64px "DejaVu Sans", Arial';c.textAlign='right';c.fillText(String(v),930,130);c.restore();}
function cam(n,t){const P=p=>k(t,p);
 if(n==='snow')return {p:[P([[0,-3],[tBus,3],[tHand,0],[tRoofIn,2]]),7,P([[0,18],[tBus,22],[tHand,16],[tRoofIn,17]])],l:[0,6,-3]};
 if(n==='roof')return {p:[P([[tRoofIn,-2],[tScarf,1],[tRoomIn,0]]),8,P([[tRoofIn,26],[tScarf,22],[tRoomIn,22]])],l:[0,6,-3]};
 return {p:[P([[tRoomIn,-6],[tKnock,4],[tHug,0],[tEnd,1]]),8,P([[tRoomIn,22],[tKnock,21],[tHug,16],[tEnd,15]])],l:[0,6,-3]};}
return {cues,caption:'bar',capY:1580,
 draw(c,t){const n=stageAt(t),w=get(n),mia=w.mia;w.mt.userData.set('WARMTH '+cnt(t),cnt(t)?'#e8590c':'#2a6fdb');
  if(n==='snow'){const give=clamp((t-tHand)/0.6),boy=w.boy;
   B.pose(mia,t,{act:t<tHes?'shiver':t<tHand?'shrink':'point',p:t<tHand?1:give,mood:t<tHes?'panic':'ok',at:[-2.5,-2]});mia.rotation.y=0.9;
   B.pose(boy,t,{act:t<tWarm?'shiver':'cheer',p:1,mood:t<tWarm?'panic':'ok',at:[2.5,-2]});boy.rotation.y=-0.9;}
  else if(n==='roof'){const run=clamp((t-tRoofIn)/(tScarf-tRoofIn));
   B.pose(mia,t,{act:t<tScarf-0.3?'run':'point',p:1,mood:'ok',at:[-6+9*run,-3]});mia.rotation.y=-1.57;
   B.pose(w.baker,t,{act:t<tScarf?'sit':'cheer',p:1,mood:t<tScarf?'neutral':'ok',at:[5,-3]});w.baker.rotation.y=1.57;}
  else{const boy=w.boy,hug=clamp((t-tHug)/0.6),run=clamp((t-tKnock)/(tHug-tKnock));
   B.pose(mia,t,{act:t>=tHug?'hug':t<tKnock?'shiver':'cheer',p:t>=tHug?hug:1,mood:t>=tHug?'ok':'panic',at:[-2,-2]});mia.rotation.y=0.9;
   boy.visible=t>=tKnock;B.pose(boy,t,{act:t>=tHug?'hug':'run',p:hug,mood:'ok',at:[7-5*run,-2]});boy.rotation.y=t>=tHug?-0.9:-1.57;}
  const cm=cam(n,t),s1=B.shake(t,tHand,0.4,0.5),s2=B.shake(t,tKnock,0.4,0.5);const p=cm.p;w.setCam([p[0]+s1[0]+s2[0],p[1]+s1[1]+s2[1],p[2]],cm.l);w.update(t);w.draw(c);hud(c,t);},
 post(c,t){for(const q of [tRoofIn,tRoomIn]){const d=Math.abs(t-q);if(d<0.1){c.fillStyle='rgba(255,255,255,'+(1-d/0.1)*0.8+')';c.fillRect(0,0,1080,1920);}}}};};
