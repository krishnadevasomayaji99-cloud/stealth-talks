window.SCENE=function(a){const {k,ease,clamp}=a;const B=window.B3;
const WX=(q,n=0)=>{let c=0;for(const w of a.words){if(w.w.toLowerCase().replace(/[^a-z0-9']/g,'')===q){if(c===n)return w.start;c++;}}throw new Error('word not found: '+q);};
const tLamp=WX('lamp'),tDark=WX('dark'),tSchool=WX('school'),tCook=WX('cookies'),tForest=WX('sprinted'),tSlip=WX('slipped'),tBeach=WX('beach'),tWait=WX('waiting'),tHere=WX('here'),tFlare=WX('flared'),tNine=WX('nine'),tHug=WX('hugged'),tSome=WX('someone'),tEnd=a.words[a.words.length-1].end+0.5;
const tForestIn=tForest-0.4,tBeachIn=tBeach-0.4;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tLamp,sfx:'boom',gain:0.8},{t:tDark,sfx:'static',gain:0.4},{t:tSchool,sfx:'tick',gain:0.7},{t:tCook,sfx:'pop',gain:0.7},{t:tForestIn,sfx:'whoosh',gain:0.8},{t:tForestIn,sfx:'wind',gain:0.6},{t:tSlip,sfx:'thud',gain:0.9},{t:tBeachIn,sfx:'whoosh',gain:0.8},{t:tWait,sfx:'tick',gain:0.7},{t:tHere,sfx:'knock',gain:0.9},{t:tFlare,sfx:'sparkle',gain:1},{t:tFlare+0.3,sfx:'tick',gain:0.8},{t:tNine,sfx:'chime',gain:0.9},{t:tNine+0.1,sfx:'pop',gain:0.8},{t:tHug,sfx:'heartbeat',gain:0.9},{t:tHug+0.2,sfx:'music_box',gain:0.8},{t:tSome,sfx:'chime',gain:0.7}];
const cnt=t=>t>=tNine?9:t>=tHere?1:0;
const S={};
function get(n){if(S[n])return S[n];const w=S[n]=B.stage(n);w.eli=w.person({shirt:'#4cc9f0',pants:'#3a0ca3',hair:'#1b1b1b',style:'spike'});w.scene.add(w.eli);
 if(n==='beach'){w.rosa=w.person({shirt:'#b5179e',pants:'#6d597a',hair:'#eeeeee',style:'band',skin:'#e0ac69'});w.scene.add(w.rosa);w.rt=w.tag('VISITS 0','#6c757d');w.rt.position.set(0,10,0);w.rt.scale.set(2.6,0.65,1);w.rosa.add(w.rt);
  w.nb=[0,1,2].map(i=>{const p=w.person({shirt:['#f77f00','#2a9d8f','#e63946'][i],pants:'#333',hair:['#5b3a29','#c9a227','#222'][i],style:['long','spike','band'][i]});w.scene.add(p);return p;});}
 return w;}
function stageAt(t){return t<tForestIn?'school':t<tBeachIn?'forest':'beach';}
function hud(c,t){const v=cnt(t);c.save();c.fillStyle='rgba(10,10,14,0.82)';c.beginPath();c.roundRect(120,80,840,110,22);c.fill();c.fillStyle='#fff';c.font='900 42px "DejaVu Sans", Arial';c.textAlign='left';c.textBaseline='middle';c.fillText("ROSA'S VISITS TODAY",150,134);c.fillStyle=v?'#ffd166':'#ff4d5e';c.font='900 64px "DejaVu Sans", Arial';c.textAlign='right';c.fillText(String(v),930,130);c.restore();}
function cam(n,t){const P=p=>k(t,p);
 if(n==='school')return {p:[P([[0,-3],[tCook,3],[tForestIn,0]]),6,P([[0,16],[tCook,14],[tForestIn,12]])],l:[0,5,P([[0,-6],[tForestIn,-20]])]};
 if(n==='forest')return {p:[P([[tForestIn,-3],[tSlip,3],[tBeachIn,4]]),5,P([[tForestIn,14],[tSlip,2],[tBeachIn,-8]])],l:[0,4,P([[tForestIn,-12],[tBeachIn,-40]])]};
 return {p:[P([[tBeachIn,3],[tHere,0],[tEnd,1]]),8,P([[tBeachIn,24],[tHere,20],[tHug,16],[tEnd,15]])],l:[0,6,-5]};}
return {cues,caption:'bar',capY:1580,
 draw(c,t){const n=stageAt(t),w=get(n),eli=w.eli;
  if(n==='school'){const run=clamp((t-tCook)/(tForestIn-tCook));B.pose(eli,t,{act:t<tSchool?'slump':t<tCook?'point':'run',p:t<tCook?clamp((t-tDark)/0.6):1,mood:t<tSchool?'panic':'ok',at:[0,-3-run*14]});eli.rotation.y=Math.PI;}
  else if(n==='forest'){const run=clamp((t-tForestIn)/(tSlip-tForestIn)),fall=clamp((t-tSlip)/0.5);B.pose(eli,t,{act:t<tSlip?'run':t<tSlip+0.9?'trip':'run',p:t<tSlip+0.9?0.5*fall:1,mood:'panic',at:[0,-4-run*14-(t>tSlip?(t-tSlip)*10:0)]});eli.rotation.y=Math.PI;}
  else{const rosa=w.rosa,hug=clamp((t-tHug)/0.6),arr=clamp((t-tBeachIn)/(tHere-tBeachIn));w.rt.userData.set('VISITS '+cnt(t),cnt(t)?'#ffb703':'#6c757d');
   B.pose(rosa,t,{act:t>=tHug?'hug':t>=tFlare?'cheer':'sit',p:t>=tHug?hug:1,mood:t>=tFlare?'ok':'neutral',at:[3,-3]});rosa.rotation.y=1.57;
   B.pose(eli,t,{act:t>=tHug?'hug':t<tHere-0.3?'walk':'point',p:t>=tHug?hug:1,mood:'ok',at:[-9+8*arr,-3]});eli.rotation.y=1.2;
   w.nb.forEach((p,i)=>{p.visible=t>=tNine;const u=clamp((t-tNine-i*0.15)/0.8);B.pose(p,t,{act:u<1?'run':'cheer',p:1,mood:'ok',at:[-10+4*i+6*u,-7-i*1.5]});p.rotation.y=1.2;});}
  const cm=cam(n,t),s1=B.shake(t,tSlip,0.5,0.6),s2=B.shake(t,tNine,0.3,0.5);const p=cm.p;w.setCam([p[0]+s1[0]+s2[0],p[1]+s1[1]+s2[1],p[2]],cm.l);w.update(t);w.draw(c);hud(c,t);},
 post(c,t){for(const q of [tForestIn,tBeachIn]){const d=Math.abs(t-q);if(d<0.1){c.fillStyle='rgba(255,255,255,'+(1-d/0.1)*0.8+')';c.fillRect(0,0,1080,1920);}}if(t>=tFlare&&t<tFlare+0.25){c.fillStyle='rgba(255,230,150,'+(0.5*(1-(t-tFlare)/0.25))+')';c.fillRect(0,0,1080,1920);}}};};
