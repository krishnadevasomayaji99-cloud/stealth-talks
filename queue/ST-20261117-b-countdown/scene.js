window.SCENE=function(a){const {k,ease,clamp}=a;const B=window.B3;
const WX=(q,n=0)=>{let c=0;for(const w of a.words){if(w.w.toLowerCase().replace(/[^a-z0-9']/g,'')===q){if(c===n)return w.start;c++;}}throw new Error('word not found: '+q);};
const tMia=WX('mia'),tC0=WX('jake'),tBd=WX('two'),tJake=WX('mia'),tC1=WX('one',0),tName0=WX('nineteenth'),tHeavy=WX('cheered'),tVer=WX('rockstar'),tNobody=WX('slept',1),tBake=WX('zero'),tMayor=WX('yawned'),tUmb=WX('asleep'),tEvery=WX('eye'),tFace=WX('you'),tScreen=WX('hour'),tQuick=WX('should'),tName1=WX('asleep',1),tEnd=a.words[a.words.length-1].end+0.5;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tC0,sfx:'tick',gain:0.8},{t:tBd,sfx:'boom',gain:0.8},{t:tC1,sfx:'tick',gain:0.8},{t:tName0,sfx:'boom',gain:0.9},{t:tHeavy-0.1,sfx:'rise',gain:0.8},{t:tHeavy,sfx:'whoosh',gain:0.8},{t:tVer,sfx:'ding_dong',gain:0.6},{t:tNobody,sfx:'scratch',gain:0.8},{t:tBake,sfx:'boom',gain:0.8},{t:tMayor,sfx:'pop',gain:0.7},{t:tEvery,sfx:'boom',gain:1},{t:tFace-0.3,sfx:'rise',gain:0.8},{t:tScreen,sfx:'static',gain:0.8},{t:tQuick,sfx:'tick',gain:1},{t:tName1,sfx:'boom',gain:1}];
let w,mia,jake,may,tg={};
function setup(){w=B.world({speakerZ:-60,sky:'#0d1233',ground:'#1f2d4a',road:'#2a2e3b',walk:'#3b4560',hemi:['#4a5aa8','#1b2340',0.7],sun:['#8aa0ff',0.35],lamps:true});
 mia=w.person({shirt:'#ffe14d',pants:'#2f3d73',hair:'#ff4fa3',style:'long'});mia.position.set(-3,0,5);mia.rotation.y=0.3;w.scene.add(mia);
 jake=w.person({shirt:'#2ec4b6',stripe:'#fff',pants:'#3a2f2f',hair:'#222',style:'spike'});jake.position.set(3.2,0,3);jake.rotation.y=-0.3;w.scene.add(jake);
 may=w.person({shirt:'#1d1d1d',pants:'#222',skin:'#e0ac69',hat:'#14161b',glasses:true});may.position.set(0,0,-6);may.scale.set(1.1,1.18,1.1);w.scene.add(may);
 const um=new B.THREE.Group();B.box(7,0.5,7,'#d62828',0,11.3,0,um);B.box(0.3,5,0.3,'#333',0,8.5,0,um);may.add(um);um.visible=false;tg.um=um;
 tg.ct=w.tag('DAYS 3','#1b4f9c');tg.ct.position.set(0,10.2,0);mia.add(tg.ct);
 w.houses.forEach((h,i)=>{});}
function mem(t){let n=3;if(t>=tC0)n=2;if(t>=tJake&&t>=tC1-1.5)n=1;if(t>=tBake)n=0;return n;}
function cam(t){const P=(p)=>k(t,p);
 return {p:[P([[0,0],[tMia,-2],[tC0,-1],[tJake,4],[tHeavy,0],[tVer,-6],[tBake,-5],[tMayor,1],[tEvery,0],[tFace,0],[tScreen,0],[tEnd,0]]),
  P([[0,11],[tMia,7],[tJake,7],[tHeavy,13],[tVer,16],[tBake,7],[tMayor,8],[tEvery,6.8],[tFace,6.6],[tEnd,6.6]]),
  P([[0,30],[tMia,13],[tJake,11],[tHeavy,26],[tVer,34],[tBake,12],[tMayor,6],[tEvery,2],[tFace,1.6],[tScreen,1.4],[tEnd,1.3]])],
  l:[P([[0,0],[tMia,-3],[tJake,3],[tHeavy,0],[tBake,-3],[tMayor,0],[tEnd,0]]),P([[0,6],[tMia,6.3],[tEvery,7.2],[tEnd,7.2]]),P([[0,-6],[tMia,5],[tJake,3],[tHeavy,-4],[tBake,5],[tMayor,-6],[tEnd,-6]])]};}
function hud(c,t,n){c.save();c.fillStyle='rgba(10,12,30,0.8)';c.beginPath();c.roundRect(150,80,780,110,22);c.fill();c.fillStyle='#fff';c.font='900 42px "DejaVu Sans", Arial';c.textAlign='left';c.textBaseline='middle';c.fillText('DAYS TO LAUNCH',180,135);c.fillStyle=n<=1?'#ff4d6d':'#7dffb0';c.font='900 66px "DejaVu Sans", Arial';c.textAlign='right';c.fillText(String(n),900,138);c.restore();}
return {cues,caption:'bar',capY:1580,
 draw(c,t){if(!w)setup();tg.um.visible=false;tg.ct.visible=false;
  B.pose(mia,t,{mood:t>=tJake?'shock':'ok',look:Math.sin(t*1.3)*0.3,walk:false});
  
  B.pose(jake,t,{mood:t>=tHeavy?'panic':'ok',look:Math.sin(t*1.1)*0.4});
  B.pose(may,t,{mood:t>=tUmb?'smug':'ok',look:0,wave:t>=tEvery&&t<tFace+0.8});
  const cm=cam(t);w.setCam(cm.p,cm.l);w.update(t);w.draw(c);hud(c,t,mem(t));},
 post(c,t){const v=clamp((t-tScreen)/1.0)*0.45;const g=c.createRadialGradient(540,960,300,540,960,1200);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(255,230,120,'+v+')');c.fillStyle=g;c.fillRect(0,0,1080,1920);}};};
