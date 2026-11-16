window.SCENE=function(a){const {k,ease,clamp,W,E}=a;const B=window.B3;const WX=(q,n=0)=>{let c=0;for(const w of a.words){if(w.w.toLowerCase().replace(/[^a-z0-9']/g,'')===q){if(c===n)return w.start;c++;}}throw new Error('word not found: '+q);};
const tMia=W('Mia'),tHate=W('hate'),tSaid=W('said'),tNod=W('nodded'),tMay=W('mayor'),tSaid2=W('said',1),tFroze=W('froze'),tPan=W('panicked'),tSec=W('secret'),tSec2=W('secret',1),tLoud=WX('loud'),tAnn=W('announced'),tRac=W('raccoons'),tWave=W('waved'),tKnew=W('knew'),tWh=W('whispered'),tEnd=a.words[a.words.length-1].end+0.4;
const ev=[tSaid,tSaid2,tSec,tLoud,tAnn,tRac,tWh];
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tSaid-0.05,sfx:'ding_dong',gain:0.8},{t:tNod,sfx:'tick',gain:0.7},{t:tSaid2-0.05,sfx:'ding_dong',gain:0.8},{t:tFroze,sfx:'boom',gain:0.8},{t:tPan,sfx:'whoosh',gain:0.7},{t:tSec,sfx:'static',gain:0.6},{t:tLoud-0.2,sfx:'rise',gain:0.8},{t:tLoud+0.1,sfx:'boom',gain:0.9},{t:tAnn-0.35,sfx:'scratch',gain:0.8},{t:tRac,sfx:'boom',gain:1},{t:tRac+0.05,sfx:'ding_dong',gain:0.7},{t:tWave,sfx:'honk',gain:0.7},{t:tKnew,sfx:'pop',gain:0.6},{t:tWh-0.1,sfx:'static',gain:0.7},{t:tWh+0.3,sfx:'chime',gain:0.5}];
let w=null,mia,may,crowd=[],rac=[],tagMia,tagMay;
function setup(){w=B.world({});w.events=ev;
 mia=w.person({shirt:'#ff5d8f',pants:'#3a3f9e',hair:'#4a2c1a'});mia.position.set(-2.8,0,2);w.scene.add(mia);
 may=w.person({shirt:'#22262e',pants:'#22262e',skin:'#e0ac69',hat:'#14161b'});may.position.set(3.4,0,-8);may.scale.set(1.1,1.18,1.1);w.scene.add(may);
 for(let i=0;i<3;i++){const r=w.raccoon();r.visible=false;r.position.set(0,6.5+i*1.55,0);may.add(r);rac.push(r);}
 const pal=[['#f4a261','#264653'],['#2a9d8f','#6d597a'],['#e9c46a','#355070'],['#b5838d','#2b2d42'],['#90be6d','#43aa8b'],['#f94144','#577590'],['#4d908e','#f9c74f'],['#9d4edd','#1d3557']];
 const pos=[[-8,6],[7,8],[-6.5,-4],[8,-2],[-8.5,-12],[8.8,-11],[-5,-17],[5.5,-18]];
 pal.forEach((c,i)=>{const p=w.person({shirt:c[0],pants:c[1],hair:i%2?'#222':'#8b5a2b'});p.position.set(pos[i][0],0,pos[i][1]);p.rotation.y=pos[i][0]<0?0.35:-0.35;w.scene.add(p);crowd.push(p);});
 tagMia=w.tag('MIA','#c2185b');tagMia.position.set(0,9.6,0);mia.add(tagMia);tagMay=w.tag('MAYOR','#222831');tagMay.position.set(0,9.6,0);may.add(tagMay);}
function cam(t){
 const P=(pts)=>k(t,pts);
 const px=P([[0,0],[tMia,0],[tHate,-1],[tSaid-0.2,-1],[tSaid+0.25,0],[tMay-0.2,0],[tMay+0.3,2.2],[tFroze,3],[tPan,3],[tSec-0.3,0],[tSec+0.3,0],[tLoud-0.5,0],[tLoud+0.4,0],[tAnn,2.4],[tRac,3.6],[tWave,3.6],[tWave+0.9,0],[tKnew,-1.2],[tWh-0.4,0],[tWh+0.5,0],[tEnd,0]]);
 const py=P([[0,10],[tMia,8],[tHate,7.2],[tSaid-0.2,7],[tSaid+0.25,14],[tSaid+1.4,14],[tMay-0.2,9],[tMay+0.3,6.8],[tFroze,6.4],[tPan,7],[tSec-0.3,9],[tSec+0.3,12],[tLoud-0.5,12],[tLoud+0.4,16],[tAnn,9],[tRac,8],[tWave+0.8,10],[tKnew,6.8],[tWh-0.4,12],[tWh+0.5,18],[tEnd,18]]);
 const pz=P([[0,26],[tMia,20],[tHate,17],[tSaid-0.2,17],[tSaid+0.25,-3],[tSaid+1.4,-3],[tMay-0.2,16],[tMay+0.3,8],[tFroze,6],[tPan,9],[tSec-0.3,18],[tSec+0.3,-3],[tLoud-0.5,-3],[tLoud+0.4,-8],[tAnn,12],[tRac,6],[tWave+0.8,18],[tKnew,14],[tWh-0.4,10],[tWh+0.5,-8],[tEnd,-9]]);
 const lx=P([[0,0],[tHate,-2.5],[tSaid+0.25,0],[tMay+0.3,3.2],[tSec,0],[tAnn,3.4],[tWave,3.4],[tKnew-0.3,-2.8],[tWh,0],[tEnd,0]]);
 const ly=P([[0,8],[tHate,6],[tSaid+0.25,17],[tSaid+1.4,17],[tMay+0.3,6.2],[tSec+0.3,14],[tLoud+0.4,17],[tAnn,7],[tRac,8.5],[tWave,8.5],[tKnew-0.3,6],[tWh,16],[tEnd,17.5]]);
 const lz=P([[0,-14],[tHate,2],[tSaid-0.2,0],[tSaid+0.25,-26],[tSaid+1.4,-26],[tMay-0.2,-4],[tMay+0.3,-8],[tSec-0.3,-6],[tSec+0.3,-26],[tLoud+0.4,-26],[tAnn,-8],[tRac,-8],[tWave,-8],[tKnew-0.3,2],[tWh,-26],[tEnd,-26]]);
 let sh=0;for(const e of [tLoud,tAnn,tRac]){const d=t-e;if(d>=0&&d<0.5)sh=Math.max(sh,(1-d/0.5)*0.45);}
 return {p:[px+Math.sin(t*61)*sh,py+Math.cos(t*53)*sh,pz],l:[lx,ly,lz]};}
function overlay(c,t,pul){
 c.save();c.fillStyle='rgba(10,10,14,0.78)';c.beginPath();c.roundRect(120,80,840,110,22);c.fill();
 const on=pul>0.05||Math.floor(t*3)%2===0;c.fillStyle=on?'#ff3b3b':'#5a1717';c.beginPath();c.arc(180,135,20,0,7);c.fill();
 c.fillStyle='#fff';c.font='900 44px "DejaVu Sans", Arial';c.textAlign='left';c.textBaseline='middle';c.fillText('TOWN LOUDSPEAKER',226,135);
 for(let i=0;i<5;i++){const h=10+(pul*70)*(0.4+0.6*Math.abs(Math.sin(t*20+i*1.7)));c.fillStyle='#ffe14d';c.fillRect(870+i*17,165-h,11,h);}
 const n=ev.filter(e=>t>=e).length;c.fillStyle='rgba(10,10,14,0.78)';c.beginPath();c.roundRect(300,205,480,74,18);c.fill();c.fillStyle='#7dffb0';c.font='900 40px "DejaVu Sans", Arial';c.textAlign='center';c.fillText('THOUGHTS HEARD: '+n,540,243);
 c.restore();}
return {cues,caption:'bar',capY:1580,
 draw(c,t){if(!w)setup();
  const pul=w.pulse(t);
  // Mia: looks around, nods on broadcast, shocked at froze, smug at knew
  const nod=t>=tNod&&t<tNod+1.2?Math.abs(Math.sin((t-tNod)*9))*0.5:0;
  B.pose(mia,t,{mood:t>=tKnew?'smug':(t>=tFroze&&t<tKnew?'shock':'ok'),y:nod,look:Math.sin(t*1.5)*0.3,wave:false,up:t>=tHate&&t<tSaid+0.3});
  // mayor: calm, frozen+panic, then raccoons
  const rv=t>=tRac;may.userData.head.visible=!rv;
  B.pose(may,t,{mood:t>=tPan?'panic':'ok',walk:t<tFroze&&t>tMay,ph:1,y:rv?Math.abs(Math.sin((t-tRac)*10))*0.25:0,up2:t>=tWave&&t<tKnew-0.2});
  rac.forEach((r,i)=>{r.visible=rv;const d=t-tRac-i*0.12;const s=rv?B.outBack(d/0.35):0;r.scale.set(s,s,s);r.rotation.z=rv?Math.sin(t*9+i)*0.12:0;});
  tagMay.visible=!rv||true;
  crowd.forEach((p,i)=>{const hear=ev.some(e=>t>=e&&t<e+0.9);const j=hear?Math.abs(Math.sin(t*11+i))*pul*1.2:0;
   const face=t>=tSec?(i%2?'panic':'shock'):(hear?'shock':'ok');
   B.pose(p,t,{mood:face,y:j,walk:t<tSaid-0.5&&i%3===0,ph:i,look:t>=tSec&&t<tRac?(p.position.x<0?-0.7:0.7):Math.sin(t*1.2+i)*0.4});});
  const cm=cam(t);w.setCam(cm.p,cm.l);w.update(t);w.draw(c);
  overlay(c,t,pul);
 },
 post(c,t){const e=Math.min(1,Math.abs(t-tRac)<0.08?0.5:0);if(e>0){c.fillStyle='rgba(255,255,255,'+e+')';c.fillRect(0,0,1080,1920);}}};};
