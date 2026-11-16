window.SCENE=function(a){const {k,ease,clamp,W,E}=a;const B=window.B3;
const WX=(q,n=0)=>{let c=0;for(const w of a.words){if(w.w.toLowerCase().replace(/[^a-z0-9']/g,'')===q){if(c===n)return w.start;c++;}}throw new Error('word not found: '+q);};
const tMia=WX('mia'),tB0=WX('blinked',0),tVan=WX('vanished'),tFroze=WX('froze'),tEyes=WX('eyes'),tDared=WX('dared'),tJake=WX('jake'),tSneeze=WX('sneezed'),tB1=WX('blinked',1),tGone=WX('gone'),tTwenty=WX('twenty'),tMayor=WX('mayor'),tLids=WX('eyelids'),tSmiled=WX('smiled'),tWhis=WX('whispered'),tTurn=WX('turn'),tB3=WX('blinked',3),tLast=WX('last'),tYours=WX('yours'),tEnd=a.words[a.words.length-1].end+0.5;
const vanishAt={0:tB0+0.2,1:tEyes+0.55,3:tDared+0.4,4:tB1+0.2}; // house index -> time
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tB0,sfx:'tick',gain:0.7},{t:vanishAt[0],sfx:'boom',gain:0.9},{t:tFroze-0.1,sfx:'static',gain:0.7},{t:vanishAt[1],sfx:'boom',gain:0.8},{t:vanishAt[3],sfx:'boom',gain:0.8},{t:tSneeze,sfx:'pop',gain:0.7},{t:vanishAt[4],sfx:'boom',gain:0.9},{t:tTwenty,sfx:'ding_dong',gain:0.6},{t:tMayor-0.2,sfx:'scratch',gain:0.8},{t:tLids,sfx:'boom',gain:1},{t:tWhis-0.4,sfx:'rise',gain:0.9},{t:tWhis,sfx:'static',gain:0.7},{t:tB3-0.05,sfx:'tick',gain:1},{t:tB3+0.1,sfx:'boom',gain:1},{t:tB3+0.3,sfx:'whoosh',gain:0.9},{t:tYours,sfx:'chime',gain:0.6},{t:tYours+0.1,sfx:'boom',gain:1}];
let w=null,mia,jake,may,crowd=[],tg={},yours;
const mood=(t,t0,m,base)=>t>=t0-0.05&&t<t0+0.3?'blink':base;
function setup(){w=B.world({speakerZ:-60});w.events=[];
 mia=w.person({shirt:'#ff5d8f',pants:'#3a3f9e',hair:'#4a2c1a',style:'long'});mia.position.set(-3,0,5);mia.rotation.y=0.25;w.scene.add(mia);
 jake=w.person({shirt:'#f5f5f5',stripe:'#e63946',pants:'#2b4570',hair:'#d9731a',style:'spike'});jake.position.set(3.2,0,3);jake.rotation.y=-0.25;w.scene.add(jake);
 may=w.person({shirt:'#22262e',pants:'#22262e',skin:'#e0ac69',hat:'#14161b',glasses:true});may.position.set(0,0,-6);may.scale.set(1.1,1.18,1.1);w.scene.add(may);
 const pal=[['#f4a261','#264653','long','#5a3a1e'],['#2a9d8f','#6d597a','band','#222'],['#e9c46a','#355070','spike','#8b5a2b'],['#b5838d','#2b2d42','long','#c9a227'],['#90be6d','#43aa8b','band','#4a2c1a'],['#f94144','#577590','spike','#222']];
 const pos=[[-8,-1],[8,-2],[-7.5,-10],[8.2,-11],[-5,-16],[5.5,-17]];
 pal.forEach((c,i)=>{const p=w.person({shirt:c[0],pants:c[1],style:c[2],hair:c[3]});p.position.set(pos[i][0],0,pos[i][1]);p.rotation.y=pos[i][0]<0?0.5:-0.5;w.scene.add(p);crowd.push(p);});
 const mk=(o,txt,bg,y)=>{const x=w.tag(txt,bg);x.position.set(0,y||9.6,0);o.add(x);return x;};
 tg.mia=mk(mia,'OPEN','#1b7f3a');tg.jake=mk(jake,'OPEN','#1b7f3a');tg.may=mk(may,'NO LIDS','#222831',10.4);
 yours=w.houses[2];const yt=w.tag('YOURS','#b3121b');yt.scale.set(7,1.8,1);yt.position.set(-19,15,4);yt.visible=false;w.scene.add(yt);tg.yours=yt;}
function housesLeft(t){let n=24;for(const i in vanishAt)if(t>=vanishAt[i])n--;if(t>=tB3){const d=t-tB3;let gone=Math.min(19,Math.floor(d/0.07)+1);n=Math.max(1,20-gone);}return n;}
function cam(t){const P=(pts)=>k(t,pts);
 const px=P([[0,0],[tMia-0.2,0],[tMia+0.3,-1.5],[tB0,-1.5],[tVan,-6],[tFroze,0],[tEyes,0],[tDared+0.3,-4],[tJake,2],[tB1+0.3,5],[tGone,5],[tTwenty,0],[tMayor,0],[tLids,0.5],[tSmiled+0.3,0],[tWhis,0],[tTurn+0.2,0],[tB3-0.1,0],[tB3+0.4,-4],[tYours,-12],[tEnd,-12]]);
 const py=P([[0,10],[tMia,6.8],[tVan,9],[tFroze,12],[tDared,8],[tJake,7],[tGone,10],[tTwenty,14],[tMayor,8],[tLids,6.8],[tWhis,6.6],[tTurn+0.2,6.6],[tB3,6.6],[tB3+0.5,14],[tYours,12],[tEnd,12]]);
 const pz=P([[0,30],[tMia,13],[tVan,24],[tFroze,26],[tDared,16],[tJake,10],[tGone,24],[tTwenty,30],[tMayor,6],[tLids,2],[tSmiled,3],[tWhis,1.5],[tTurn+0.2,1.5],[tB3,1.5],[tB3+0.5,26],[tYours,22],[tEnd,22]]);
 const lx=P([[0,0],[tMia,-3],[tVan,-19],[tFroze,0],[tDared,-6],[tJake,3],[tGone,19],[tTwenty,0],[tMayor,0],[tTurn+0.2,0],[tB3+0.4,-10],[tYours,-19],[tEnd,-19]]);
 const ly=P([[0,6],[tMia,6.3],[tVan,6],[tFroze,5],[tJake,6.3],[tMayor,7.4],[tWhis,7.4],[tB3+0.4,6],[tYours,6],[tEnd,6]]);
 const lz=P([[0,-6],[tMia,5],[tVan,16],[tFroze,-4],[tJake,3],[tGone,-3],[tTwenty,-6],[tMayor,-6],[tTurn+0.2,-6],[tB3+0.4,4],[tYours,4],[tEnd,4]]);
 let sh=0;for(const e of [vanishAt[0],vanishAt[1],vanishAt[3],vanishAt[4],tLids,tB3+0.1,tYours+0.1]){const d=t-e;if(d>=0&&d<0.45)sh=Math.max(sh,(1-d/0.45)*0.5);}
 return {p:[px+Math.sin(t*61)*sh,py+Math.cos(t*53)*sh,pz],l:[lx,ly,lz]};}
function hud(c,t,n){c.save();c.fillStyle='rgba(10,10,14,0.8)';c.beginPath();c.roundRect(150,80,780,110,22);c.fill();c.fillStyle='#fff';c.font='900 42px "DejaVu Sans", Arial';c.textAlign='left';c.textBaseline='middle';c.fillText('HOUSES LEFT',180,135);c.fillStyle=n<=1?'#ff3b3b':'#7dffb0';c.font='900 66px "DejaVu Sans", Arial';c.textAlign='right';c.fillText(String(n),900,138);c.restore();}
return {cues,caption:'bar',capY:1580,
 draw(c,t){if(!w)setup();
  // houses vanish (shrink+spin), then the backrooms void
  w.houses.forEach((h,i)=>{let tv=vanishAt[i];if(i!==2&&t>=tB3&&tv===undefined){tv=tB3+0.07*(i<2?i:i-1)+0.05;}
   if(tv!==undefined&&t>=tv){const d=clamp((t-tv)/0.35);const s=1-ease(d);h.scale.set(s,s,s);h.rotation.y=d*3;h.position.set((h.userData.c[0])*(1-s),d*3,(h.userData.c[1])*(1-s));h.visible=d<1;}else{h.scale.set(1,1,1);h.visible=true;h.position.set(0,0,0);h.rotation.y=0;}});
  const void_=clamp((t-tB3)/0.5);const col=new B.THREE.Color().setRGB(0.55+0.4*void_*0+0.0,0.8,1).lerp(new B.THREE.Color('#d8c765'),void_);w.scene.background=col;w.scene.fog=new B.THREE.Fog(col,55-40*void_,150-100*void_);
  tg.yours.visible=t>=tLast;w.trees.visible=t<tB3+0.3;[mia,jake,may].concat(crowd).forEach(o=>{o.visible=t<tB3+0.3||false;});
  const bM=t>=tB0-0.05&&t<tB0+0.3,bJ=t>=tB1-0.05&&t<tB1+0.3;
  tg.mia.userData.set(bM?'BLINK':'OPEN',bM?'#b3121b':'#1b7f3a');tg.jake.userData.set(bJ?'BLINK':'OPEN',bJ?'#b3121b':'#1b7f3a');
  const sneeze=t>=tSneeze&&t<tSneeze+0.35?Math.abs(Math.sin((t-tSneeze)*9))*0.5:0;
  B.pose(mia,t,{mood:bM?'blink':(t>=tVan?'shock':'ok'),look:Math.sin(t*1.3)*0.3});
  B.pose(jake,t,{mood:bJ?'blink':(t>=tFroze?'panic':'ok'),y:sneeze,look:Math.sin(t*1.1)*0.3});
  B.pose(may,t,{mood:t>=tSmiled?'smug':'shock',look:0,wave:t>=tWhis&&t<tTurn+0.4});
  const tw=[tEyes+0.4,tDared+0.2];
  crowd.forEach((p,i)=>{const bl=(i===0&&t>=tw[0]&&t<tw[0]+0.3)||(i===1&&t>=tw[1]&&t<tw[1]+0.3);
   B.pose(p,t,{mood:bl?'blink':(t>=tFroze?'panic':'ok'),y:0,look:t>=tFroze?(p.position.x<0?-0.5:0.5):Math.sin(t*1.2+i)*0.4});});
  const cm=cam(t);w.setCam(cm.p,cm.l);w.update(t);w.draw(c);hud(c,t,housesLeft(t));
 },
 post(c,t){if(t>=tB3&&t<tB3+0.25){c.fillStyle='rgba(0,0,0,'+(1-(t-tB3)/0.25)+')';c.fillRect(0,0,1080,1920);}
  if(t>=tB3){const v=clamp((t-tB3)/1.2)*0.35;const g=c.createRadialGradient(540,960,300,540,960,1200);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(20,15,0,'+v*2+')');c.fillStyle=g;c.fillRect(0,0,1080,1920);}}};};
