window.SCENE=function(a){const {k,ease,clamp}=a;const B=window.B3;
const WX=(q,n=0)=>{let c=0;for(const w of a.words){if(w.w.toLowerCase().replace(/[^a-z0-9']/g,'')===q){if(c===n)return w.start;c++;}}throw new Error('word not found: '+q);};
const tMia=WX('mia'),tScroll=WX('scrolled'),tTwelve=WX('twelve'),tShake=WX('shake'),tSnow=WX('snow'),tLake=WX('lake'),tGrand=WX('grandpa'),tThree=WX('three'),tYears=WX('years'),tPlug=WX('plugged'),tFell=WX('fell'),tClimb=WX('climbed'),tHug=WX('hugged'),tForest=WX('forest'),tGlow=WX('glowed'),tYou=WX('you'),tSixty=WX('sixty'),tWho=WX('who'),tEnd=a.words[a.words.length-1].end+0.6;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tTwelve-0.1,sfx:'rise',gain:0.8},{t:tTwelve+0.3,sfx:'tick',gain:0.8},{t:tSnow-0.3,sfx:'whoosh',gain:0.8},{t:tThree,sfx:'pop',gain:0.7},{t:tPlug,sfx:'ding_dong',gain:0.6},{t:tFell,sfx:'tick',gain:0.7},{t:tClimb,sfx:'rise',gain:0.7},{t:tHug,sfx:'chime',gain:0.8},{t:tGlow,sfx:'chime',gain:0.9},{t:tYou,sfx:'boom',gain:0.8},{t:tSixty,sfx:'tick',gain:0.8}];
const S={};
function mk(kind,o){const w=B.stage(kind,o);const mia=w.person({shirt:'#ff5d8f',pants:'#3a3f9e',hair:'#4a2c1a',style:'long'});const gr=w.person({shirt:'#7a8f5a',pants:'#55555e',hair:'#e8e8e8',glasses:true,style:'band',skin:'#e6b98a'});gr.scale.set(0.95,0.95,0.95);
 w.scene.add(mia);w.scene.add(gr);const tm=w.tag('MIA 100%','#1b7f3a'),tg=w.tag('GRANDPA 3%','#b3121b');tm.position.set(0,10,0);tg.position.set(0,10,0);tm.scale.set(2.4,0.65,1);tg.scale.set(2.4,0.65,1);mia.add(tm);gr.add(tg);return Object.assign(w,{mia,gr,tm,tg});}
const get=n=>S[n]||(S[n]=mk(n));
const bM=t=>t<tTwelve?100-88*clamp((t-tMia)/(tTwelve-tMia)):t<tFell?12:12-6*clamp((t-tFell)/0.8);
const bG=t=>t<tClimb?3:3+55*ease(clamp((t-tClimb)/1.6));
const col=v=>v<=15?'#b3121b':v<50?'#c9861a':'#1b7f3a';
function stageAt(t){return t<tSnow-0.2?'room':t<tPlug-0.2?'snow':t<tYou-0.1?'forest':'roof';}
function hud(c,t){const m=Math.round(bM(t)),g=Math.round(bG(t));c.save();c.fillStyle='rgba(10,10,14,0.8)';c.beginPath();c.roundRect(150,80,780,t>=tSnow?190:110,22);c.fill();c.font='900 42px "DejaVu Sans", Arial';c.textBaseline='middle';c.textAlign='left';c.fillStyle='#fff';c.fillText('MIA',180,135);c.textAlign='right';c.fillStyle=col(m);c.font='900 62px "DejaVu Sans", Arial';c.fillText(m+'%',900,138);
 if(t>=tSnow){c.textAlign='left';c.fillStyle='#fff';c.font='900 42px "DejaVu Sans", Arial';c.fillText('GRANDPA',180,215);c.textAlign='right';c.fillStyle=col(g);c.font='900 62px "DejaVu Sans", Arial';c.fillText(g+'%',900,218);}c.restore();}
function cam(n,t){const P=p=>k(t,p);
 if(n==='room')return {p:[P([[0,3],[tMia,2],[tScroll,4],[tTwelve-0.3,3],[tTwelve+0.2,2.2],[tSnow,2.2]]),P([[0,8],[tMia,6.5],[tTwelve,5.6],[tSnow,5.8]]),P([[0,19],[tMia,15],[tScroll,13],[tTwelve,10],[tShake,9],[tSnow,9]])],l:[3,P([[0,5],[tTwelve,4.6],[tSnow,4.6]]),-5]};
 if(n==='snow')return {p:[P([[tSnow-0.2,-4],[tLake,-2],[tGrand,3],[tThree,4],[tYears,7],[tPlug,7]]),P([[tSnow-0.2,6],[tLake,8],[tGrand,6.5],[tThree,5.6],[tPlug,6]]),P([[tSnow-0.2,16],[tLake,14],[tGrand,8],[tThree,6],[tYears,5],[tPlug,5]])],l:[P([[tSnow,-5],[tLake,0],[tGrand,6],[tPlug,5]]),4.5,P([[tSnow,-6],[tLake,-10],[tGrand,-12],[tPlug,-12]])]};
 if(n==='forest')return {p:[P([[tPlug-0.2,-6],[tFell,0],[tHug,0],[tGlow,0],[tYou,0]]),P([[tPlug-0.2,7],[tFell,8],[tHug,8],[tYou,7]]),P([[tPlug-0.2,12],[tClimb,14],[tHug,17],[tGlow,13],[tYou,11]])],l:[0,5.2,-4]};
 return {p:[0,P([[tYou,7],[tSixty,7.5],[tEnd,7.2]]),P([[tYou,20],[tSixty,12],[tEnd,10.5]])],l:[0,6.2,-2]};}
return {cues,caption:'bar',capY:1580,
 draw(c,t){const n=stageAt(t),w=get(n);const m=Math.round(bM(t)),g=Math.round(bG(t));
  w.tm.userData.set(n==='roof'?'YOUR PHONE 61%':'MIA '+m+'%',n==='roof'?'#1b7f3a':col(m));w.tg.userData.set(n==='roof'?'YOU 61%':'GRANDPA '+g+'%',n==='roof'?'#1b7f3a':col(g));
  const mia=w.mia,gr=w.gr;gr.visible=n!=='room';
  if(n==='room'){B.pose(mia,t,{act:'sit',mood:t>=tTwelve?'panic':'ok',at:[3,-4.4],look:Math.sin(t*2)*0.15,nod:t<tTwelve?0.25:0});mia.rotation.y=0.15;if(t>=tShake)B.pose(mia,t,{act:'shiver',mood:'panic',at:[3,-4.4]});}
  else if(n==='snow'){const r=clamp((t-tSnow+0.2)/(tLake-tSnow+0.2));B.pose(mia,t,{act:r<1?'run':'shiver',mood:'panic',at:[-14+14*ease(r),10-18*ease(r)]});mia.rotation.y=-0.35;
   B.pose(gr,t,{act:'sit',mood:t>=tGrand?'smug':'ok',at:[6,-13]});gr.rotation.y=-0.4;w.cracks.forEach((cr,i)=>cr.visible=t>tGrand+i*0.4);}
  else if(n==='forest'){const hp=clamp((t-tFell-0.8)/0.7);B.pose(mia,t,{act:hp>0?'hug':'slump',p:hp,mood:'ok',at:[-1.3-0.4*(1-hp)*1,-4]});mia.rotation.y=1.4;B.pose(gr,t,{act:hp>0?'hug':'cheer',p:hp,mood:'smug',at:[1.3,-4]});gr.rotation.y=-1.4;if(hp<=0)B.pose(gr,t,{act:'walk',at:[1.3,-4]});}
  else {B.pose(mia,t,{act:'point',mood:'ok',at:[0,-2],look:0});mia.rotation.y=0;gr.visible=false;}
  const cm=cam(n,t);w.setCam(cm.p,cm.l);w.update(t);w.draw(c);hud(c,t);},
 post(c,t){if(t>=tGlow&&t<tYou){const v=Math.sin(clamp((t-tGlow)/(tYou-tGlow))*Math.PI)*0.35;const g=c.createRadialGradient(540,960,100,540,960,1100);g.addColorStop(0,'rgba(255,255,255,'+v+')');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.fillRect(0,0,1080,1920);}
  if(t>=tSnow-0.35&&t<tSnow-0.1){c.fillStyle='rgba(255,255,255,'+(1-Math.abs((t-(tSnow-0.22))/0.13))+')';c.fillRect(0,0,1080,1920);}}};};
