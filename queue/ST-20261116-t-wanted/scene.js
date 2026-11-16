window.SCENE=function(a){const {k,ease,clamp,W,E}=a;const B=window.B3;
const WX=(q,n=0)=>{let c=0;for(const w of a.words){if(w.w.toLowerCase().replace(/[^a-z0-9']/g,'')===q){if(c===n)return w.start;c++;}}throw new Error('word not found: '+q);};
const tJake=WX('jake'),tJay=WX('jaywalked'),tOne=WX('one'),tFive=WX('five'),tTwo=WX('two'),tCook=WX('cookie'),tThree=WX('three'),tRadio=WX('radio'),tNine=WX('nineteenth'),tCheer=WX('cheered'),tSir=WX('sirens'),tRan=WX('ran'),tBush=WX('bush'),tFive2=WX('five',1),tStood=WX('stood'),tMay=WX('mayor'),tWhis=WX('whispered'),tNet=WX('internet'),tTurn=WX('turned'),tToo=WX('too'),tWatch=WX('watched'),tEnd=a.words[a.words.length-1].end+0.4;
const stars=t=>t>=tFive2?5:t>=tThree?3:t>=tTwo?2:t>=tOne?1:0; // Jake
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tOne,sfx:'tick',gain:0.8},{t:tTwo,sfx:'tick',gain:0.8},{t:tThree,sfx:'tick',gain:0.9},{t:tRadio,sfx:'static',gain:0.6},{t:tNine-0.1,sfx:'ding_dong',gain:0.8},{t:tCheer,sfx:'honk',gain:0.6},{t:tSir-0.2,sfx:'rise',gain:0.8},{t:tSir,sfx:'whoosh',gain:0.7},{t:tRan,sfx:'whoosh',gain:0.7},{t:tFive2,sfx:'tick',gain:0.9},{t:tStood-0.3,sfx:'scratch',gain:0.8},{t:tStood,sfx:'boom',gain:1},{t:tNet,sfx:'boom',gain:0.9},{t:tTurn,sfx:'whoosh',gain:0.8},{t:tToo,sfx:'tick',gain:1},{t:tToo+0.05,sfx:'chime',gain:0.6},{t:tWatch,sfx:'boom',gain:0.9}];
const ev=[tNine,tCheer];
let w=null,jake,may,bush,crowd=[],tagJ,tagM,tagC=[];
function setup(){w=B.world({speakerZ:-22});w.events=ev;
 jake=w.person({shirt:'#f5f5f5',stripe:'#e63946',pants:'#2b4570',hair:'#d9731a',style:'spike'});jake.position.set(0,0,6);w.scene.add(jake);
 may=w.person({shirt:'#22262e',pants:'#22262e',skin:'#e0ac69',hat:'#14161b',glasses:true});may.position.set(-6.5,0,-6);may.scale.set(1.1,1.18,1.1);w.scene.add(may);
 bush=new B.THREE.Group();[[0,2.6,0,4.6,5.2,4.6],[-2.2,1.8,0.4,3,3.6,3.4],[2.2,2,-0.3,3,4,3.4]].forEach(b=>B.box(b[3],b[4],b[5],'#2f9e4f',b[0],b[1],b[2],bush));B.box(1.2,1.2,0.3,'#46bd63',0.8,3.2,2.35,bush);bush.position.set(-6.5,0,-6);w.scene.add(bush);
 const pal=[['#f4a261','#264653','long','#5a3a1e'],['#2a9d8f','#6d597a','band','#222'],['#e9c46a','#355070','spike','#8b5a2b'],['#b5838d','#2b2d42','long','#c9a227'],['#90be6d','#43aa8b','band','#4a2c1a'],['#f94144','#577590','spike','#222']];
 const pos=[[-8,2],[8,0],[-8.5,-8],[8.8,-9],[-7,-16],[7.5,-17]];
 pal.forEach((c,i)=>{const p=w.person({shirt:c[0],pants:c[1],style:c[2],hair:c[3]});p.position.set(pos[i][0],0,pos[i][1]);p.rotation.y=pos[i][0]<0?0.5:-0.5;w.scene.add(p);crowd.push(p);const tg=w.tag('★0','#7a1010');tg.position.set(0,9.6,0);p.add(tg);tagC.push(tg);});
 tagJ=w.tag('WANTED ★0','#b3121b');tagJ.position.set(0,9.6,0);jake.add(tagJ);tagM=w.tag('MAYOR','#222831');tagM.position.set(0,10.4,0);may.add(tagM);}
function cam(t){const P=(pts)=>k(t,pts);
 const px=P([[0,3],[tJake,3],[tJay,-3.5],[tOne+0.4,-3.5],[tFive-0.3,3.2],[tTwo,3.2],[tCook-0.1,-3],[tThree+0.5,-3],[tRadio,7],[tNine+0.4,7],[tSir-0.2,-6],[tRan,4],[tBush,-3],[tFive2-0.1,-2.5],[tStood-0.2,-12],[tStood+0.5,-12],[tNet+0.3,-12],[tTurn-0.2,0],[tToo,0.2],[tWatch,0],[tEnd,0]]);
 const py=P([[0,8],[tJake,8],[tJay,5],[tTwo,5.5],[tCook,5],[tRadio,10],[tNine+0.4,12],[tSir,7],[tRan,6],[tBush,6],[tStood-0.2,5],[tStood+0.5,8],[tTurn-0.2,6.2],[tToo,6.4],[tEnd,6.2]]);
 const pz=P([[0,18],[tJake,15],[tJay,11],[tTwo,12],[tCook,11],[tRadio,6],[tNine+0.4,-2],[tSir,10],[tRan,0],[tBush,-1],[tFive2,0],[tStood-0.2,0],[tStood+0.5,2],[tTurn-0.2,14],[tToo,12],[tWatch,10],[tEnd,9]]);
 const lx=P([[0,0],[tJay,0],[tCook,0],[tRadio,0],[tNine+0.4,0],[tRan,-2],[tBush,-6],[tStood,-6.5],[tTurn-0.2,0],[tEnd,0]]);
 const ly=P([[0,6],[tJay,5.6],[tNine,12],[tRan,5],[tStood,6],[tTurn-0.2,6.4],[tEnd,6.2]]);
 const lz=P([[0,6],[tNine,-22],[tNine+0.6,-22],[tSir,4],[tRan,-6],[tBush,-6],[tStood,-6],[tTurn-0.2,6],[tEnd,6]]);
 let sh=0;for(const e of [tNine,tStood,tNet,tWatch]){const d=t-e;if(d>=0&&d<0.5)sh=Math.max(sh,(1-d/0.5)*0.4);}
 return {p:[px+Math.sin(t*61)*sh,py+Math.cos(t*53)*sh+0.8,pz+(t<tTurn-0.3?3.5:2)],l:[lx,ly,lz]};}
function hud(c,t,n){c.save();c.fillStyle='rgba(10,10,14,0.78)';c.beginPath();c.roundRect(120,80,840,120,22);c.fill();c.fillStyle='#fff';c.font='900 40px "DejaVu Sans", Arial';c.textAlign='left';c.textBaseline='middle';c.fillText('WANTED',150,140);
 for(let i=0;i<5;i++){const on=i<n;const s=i===n-1?1+0.35*Math.max(0,1-((t-(i===0?tOne:i===1?tTwo:i<4?tThree:tFive2))/0.3)):1;c.save();c.translate(520+i*80,140);c.scale(s,s);c.fillStyle=on?'#ffd60a':'#3b3b44';c.beginPath();for(let q=0;q<10;q++){const r=q%2?14:34,an=-Math.PI/2+q*Math.PI/5;c.lineTo(Math.cos(an)*r,Math.sin(an)*r);}c.closePath();c.fill();c.restore();}c.restore();}
return {cues,caption:'bar',capY:1580,
 draw(c,t){if(!w)setup();const pul=w.pulse(t);const n=stars(t);
  tagJ.userData.set('WANTED ★'+n,n>=5?'#7a0010':'#b3121b');
  const hear=t>=tNine&&t<tCheer+0.9;
  const run=t>=tSir&&t<tStood-0.3;
  B.pose(jake,t,{mood:t>=tTurn?'smug':(t>=tSir&&t<tStood+0.8?'panic':(t>=tOne?'shock':'ok')),walk:t<tJay+0.9||run,ph:0,y:t>=tCook&&t<tCook+0.4?Math.abs(Math.sin((t-tCook)*9))*0.4:0,look:t>=tTurn?0:Math.sin(t*1.4)*0.3,up2:t>=tToo&&t<tWatch});
  jake.rotation.y=t>=tTurn?0:(run?3.0:0);
  jake.position.set(run?B.ease((t-tSir)/(tBush-tSir+0.6))*-4:(t>=tBush?-4:0),0,run?6-B.ease((t-tSir)/(tBush-tSir+0.6))*10:(t>=tBush?-4:6));
  if(t>=tStood-0.3){jake.position.set(-3.8,0,-4);jake.rotation.y=t>=tTurn-0.1?0.0:2.4;}
  if(t>=tTurn){jake.position.set(0,0,6);jake.rotation.y=0;}
  const up=t>=tStood;bush.visible=!up;bush.position.y=up?-8:0;
  B.pose(may,t,{mood:up?'smug':'ok',y:up?Math.abs(Math.sin((t-tStood)*10))*0.25:0,wave:t>=tWhis&&t<tNet});may.visible=up;
  tagM.visible=up;
  crowd.forEach((p,i)=>{const j=hear?Math.abs(Math.sin(t*11+i))*1.0:0;const cs=t>=tFive2?1+(i%3):t>=tThree?i%3:0;tagC[i].userData.set('★'+cs,'#7a1010');
   B.pose(p,t,{mood:t>=tSir?'panic':(hear?'shock':'ok'),y:j,up:hear&&i%2===0,up2:hear&&i%2===1,look:Math.sin(t*1.2+i)*0.4});});
  const cm=cam(t);w.setCam(cm.p,cm.l);w.update(t);w.draw(c);hud(c,t,n);
 },
 post(c,t){if(t>=tToo&&t<tToo+0.5){const e=0.6*(1-(t-tToo)/0.5);c.fillStyle='rgba(255,214,10,'+e+')';c.fillRect(0,0,1080,1920);}
  if(t>=tToo){c.save();const s=1+0.15*Math.max(0,1-(t-tToo)/0.4);c.translate(540,1250);c.scale(s,s);c.fillStyle='#ffd60a';c.strokeStyle='#14141a';c.lineWidth=14;c.beginPath();for(let q=0;q<10;q++){const r=q%2?70:170,an=-Math.PI/2+q*Math.PI/5;c.lineTo(Math.cos(an)*r,Math.sin(an)*r);}c.closePath();c.stroke();c.fill();c.fillStyle='#14141a';c.font='900 64px "DejaVu Sans", Arial';c.textAlign='center';c.textBaseline='middle';c.fillText('YOU',0,18);c.restore();}}};};
