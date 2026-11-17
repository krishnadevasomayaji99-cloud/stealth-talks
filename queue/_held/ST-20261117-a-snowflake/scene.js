window.SCENE=function(a){const {k,ease,clamp}=a;const B=window.B3;
const WX=(q,n=0)=>{let c=0;for(const w of a.words){if(w.w.toLowerCase().replace(/[^a-z0-9']/g,'')===q){if(c===n)return w.start;c++;}}throw new Error('word not found: '+q);};
const tMia=WX('mia'),tC0=WX('caught',0),tBd=WX('birthday'),tJake=WX('jake'),tC1=WX('caught',1),tName0=WX('name',0),tHeavy=WX('heavier'),tVer=WX('vermont'),tNobody=WX('nobody'),tBake=WX('bakery',0),tMayor=WX('mayor'),tUmb=WX('umbrella'),tEvery=WX('everything'),tFace=WX('face'),tScreen=WX('screen'),tQuick=WX('quick'),tName1=WX('name',1),tEnd=a.words[a.words.length-1].end+0.5;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tC0,sfx:'tick',gain:0.8},{t:tBd,sfx:'boom',gain:0.8},{t:tC1,sfx:'tick',gain:0.8},{t:tName0,sfx:'boom',gain:0.9},{t:tHeavy-0.1,sfx:'rise',gain:0.8},{t:tHeavy,sfx:'whoosh',gain:0.8},{t:tVer,sfx:'ding_dong',gain:0.6},{t:tNobody,sfx:'scratch',gain:0.8},{t:tBake,sfx:'boom',gain:0.8},{t:tMayor,sfx:'pop',gain:0.7},{t:tEvery,sfx:'boom',gain:1},{t:tFace-0.3,sfx:'rise',gain:0.8},{t:tScreen,sfx:'static',gain:0.8},{t:tQuick,sfx:'tick',gain:1},{t:tName1,sfx:'boom',gain:1}];
let w,mia,jake,may,tg={};
function setup(){w=B.world({speakerZ:-60,sky:'#7d8fb8',ground:'#eef3fa',road:'#5b6475',walk:'#d7dfe9',hemi:['#b8c8ff','#c9d3e6',0.85],sun:['#c9d8ff',0.55],snow:true,lamps:true});
 mia=w.person({shirt:'#ff7a45',pants:'#2f3d73',hair:'#f2f2f2',style:'band'});mia.position.set(-3,0,5);mia.rotation.y=0.3;w.scene.add(mia);
 jake=w.person({shirt:'#2ec4b6',stripe:'#fff',pants:'#3a2f2f',hair:'#222',style:'spike'});jake.position.set(3.2,0,3);jake.rotation.y=-0.3;w.scene.add(jake);
 may=w.person({shirt:'#6a1b9a',pants:'#222',skin:'#e0ac69',hat:'#14161b',glasses:true});may.position.set(0,0,-6);may.scale.set(1.1,1.18,1.1);w.scene.add(may);
 const um=new B.THREE.Group();B.box(7,0.5,7,'#d62828',0,11.3,0,um);B.box(0.3,5,0.3,'#333',0,8.5,0,um);may.add(um);um.visible=false;tg.um=um;
 tg.ct=w.tag('MEMORIES 10','#1b4f9c');tg.ct.position.set(0,10.2,0);mia.add(tg.ct);
 w.houses.forEach((h,i)=>{});}
function mem(t){let n=10;if(t>=tC0)n=9;if(t>=tC1)n=7;if(t>=tHeavy){n=Math.max(1,7-Math.floor((t-tHeavy)/0.9));}if(t>=tScreen)n=0;return n;}
function cam(t){const P=(p)=>k(t,p);
 return {p:[P([[0,0],[tMia,-2],[tC0,-1],[tJake,4],[tHeavy,0],[tVer,-6],[tBake,-5],[tMayor,1],[tEvery,0],[tFace,0],[tScreen,0],[tEnd,0]]),
  P([[0,11],[tMia,7],[tJake,7],[tHeavy,13],[tVer,16],[tBake,7],[tMayor,8],[tEvery,6.8],[tFace,6.6],[tEnd,6.6]]),
  P([[0,30],[tMia,13],[tJake,11],[tHeavy,26],[tVer,34],[tBake,12],[tMayor,6],[tEvery,2],[tFace,1.6],[tScreen,1.4],[tEnd,1.3]])],
  l:[P([[0,0],[tMia,-3],[tJake,3],[tHeavy,0],[tBake,-3],[tMayor,0],[tEnd,0]]),P([[0,6],[tMia,6.3],[tEvery,7.2],[tEnd,7.2]]),P([[0,-6],[tMia,5],[tJake,3],[tHeavy,-4],[tBake,5],[tMayor,-6],[tEnd,-6]])]};}
function hud(c,t,n){c.save();c.fillStyle='rgba(10,12,30,0.8)';c.beginPath();c.roundRect(150,80,780,110,22);c.fill();c.fillStyle='#fff';c.font='900 42px "DejaVu Sans", Arial';c.textAlign='left';c.textBaseline='middle';c.fillText('MEMORIES LEFT',180,135);c.fillStyle=n<=2?'#ff4d6d':'#9fd3ff';c.font='900 66px "DejaVu Sans", Arial';c.textAlign='right';c.fillText(String(n),900,138);c.restore();}
return {cues,caption:'bar',capY:1580,
 draw(c,t){if(!w)setup();tg.um.visible=t>=tUmb-0.2;tg.ct.visible=false;
  B.pose(mia,t,{mood:t>=tBd?'shock':'ok',look:Math.sin(t*1.3)*0.3,walk:t>=tBake&&t<tBake+1.2,ph:0});
  if(t>=tBake){mia.position.set(-3+Math.min(1,(t-tBake)/1.2)*-14,0,5);}
  B.pose(jake,t,{mood:t>=tName0?'panic':'ok',look:Math.sin(t*1.1)*0.4});
  B.pose(may,t,{mood:t>=tFace?'smug':'ok',look:0,wave:t>=tFace&&t<tFace+0.8});
  const cm=cam(t);w.setCam(cm.p,cm.l);w.update(t);w.draw(c);hud(c,t,mem(t));},
 post(c,t){const v=clamp((t-tScreen)/1.0)*0.45;const g=c.createRadialGradient(540,960,300,540,960,1200);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(235,245,255,'+v+')');c.fillStyle=g;c.fillRect(0,0,1080,1920);}};};
