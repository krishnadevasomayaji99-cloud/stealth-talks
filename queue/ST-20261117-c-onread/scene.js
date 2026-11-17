window.SCENE=function(a){const {k,ease,clamp}=a;const B=window.B3;
const WX=(q,n=0)=>{let c=0;for(const w of a.words){if(w.w.toLowerCase().replace(/[^a-z0-9']/g,'')===q){if(c===n)return w.start;c++;}}throw new Error('word not found: '+q);};
const tMia=WX('mia',0),tOne=WX('one',0),tTwo=WX('two',0),tNine=WX('nine',0),tMayor=WX('mayor',0),tToo=WX('too'),tBack=WX('typed'),tFade=WX('faded'),tTurn=WX('turned'),tPorch=WX('porch',1),tPhone=WX('phone'),tTw=WX('twenty'),tEnd=a.words[a.words.length-1].end+0.5;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tOne,sfx:'sparkle',gain:0.7},{t:tOne+0.05,sfx:'tick',gain:0.9},{t:tTwo,sfx:'sparkle',gain:0.7},{t:tTwo+0.4,sfx:'tick',gain:0.9},{t:tNine-0.25,sfx:'whoosh',gain:0.8},{t:tMayor-0.2,sfx:'whoosh',gain:0.7},{t:tToo,sfx:'ding_dong',gain:0.6},{t:tToo+0.5,sfx:'tick',gain:0.9},{t:tBack,sfx:'heartbeat',gain:0.8},{t:tFade-0.1,sfx:'music_box',gain:0.9},{t:tFade+0.2,sfx:'sparkle',gain:0.6},{t:tTurn-0.35,sfx:'scratch',gain:0.8},{t:tTurn,sfx:'boom',gain:1},{t:tPorch,sfx:'heartbeat',gain:0.9},{t:tPhone,sfx:'boom',gain:1},{t:tPhone-0.3,sfx:'rise',gain:0.8},{t:tTw,sfx:'static',gain:0.7}];
for(let i=0;i<9;i++)cues.push({t:tNine+0.1+i*0.16,sfx:'tick',gain:0.8});
for(let i=0;i<11;i++)cues.push({t:tTw+0.05+i*0.1,sfx:'tick',gain:0.85});
let w,mia,jake,may,gh=[],tgM,tgJ;
function setup(){w=B.world({speakerZ:-80,sky:'#ff9d66',ground:'#9aa86a',road:'#4a4750',walk:'#d9c3a0',hemi:['#ffd9a8','#7a6a58',0.9],sun:['#ffb070',0.95],sunDisc:['#fff0b8',0,26,-135,9]});
 mia=w.person({shirt:'#f4f1ff',stripe:'#6c63ff',pants:'#3b3f66',hair:'#3a78ff',style:'long'});mia.position.set(-3,0,5);mia.rotation.y=0.35;w.scene.add(mia);
 jake=w.person({shirt:'#3fae6a',pants:'#4a3b30',hair:'#d9731a',style:'spike'});jake.position.set(6,0,-4);jake.rotation.y=-0.45;w.scene.add(jake);
 may=w.person({shirt:'#8a8f98',pants:'#3a3d44',skin:'#e0ac69',hat:'#2a2c33',glasses:true});may.position.set(-1,0,-12);may.scale.set(1.1,1.18,1.1);w.scene.add(may);
 const gp=[];[[-5.2,7.5],[-6.4,5.2],[-4.6,3.2]].forEach(p=>gp.push(p));for(let i=0;i<9;i++)gp.push([3.5+(i%3)*2.3,-1.5-Math.floor(i/3)*2.6]);gp.push([-3,-12]);
 for(let i=0;i<11;i++){const side=i%2?1:-1;gp.push([side*(4+(i%4)*1.8),-8-i*3.4]);}
 for(let i=0;i<gp.length;i++){const g=w.ghost({});g.position.set(gp[i][0],0,gp[i][1]);g.userData.y0=0;g.userData.home=gp[i];g.scale.set(1.5,1.5,1.5);g.visible=false;w.scene.add(g);gh.push(g);}
 tgM=w.tag('GHOSTS 0','#3a3f9c');tgM.position.set(0,10,0);mia.add(tgM);tgJ=w.tag('GHOSTS 0','#3a3f9c');tgJ.position.set(0,10,0);jake.add(tgJ);}
function count(t){let n=0;if(t>=tOne)n=1;if(t>=tTwo+0.35)n=3;if(t>=tNine){n=3+Math.min(9,Math.floor((t-tNine-0.1)/0.16)+1);if(n<3)n=3;}if(t>=tToo)n=13;if(t>=tFade)n=12;if(t>=tTw)n=12+Math.min(11,Math.floor((t-tTw)/0.1)+1);return n;}
function cam(t){const P=(p)=>k(t,p);
 return {p:[P([[0,0],[tMia,-5],[tTwo,-5],[tNine-0.2,7],[tMayor,2],[tBack,-2],[tFade,-2],[tTurn,0],[tPhone,0],[tEnd,0]]),
  P([[0,9],[tMia,6.2],[tNine,7],[tMayor,9],[tBack,6.5],[tTurn,8],[tPhone,6.4],[tEnd,6.3]]),
  P([[0,26],[tMia,14],[tTwo,13],[tNine,7],[tMayor,3],[tBack,12],[tFade,11],[tTurn,17],[tPhone,5],[tEnd,3.2]])],
  l:[P([[0,0],[tMia,-3.5],[tNine,5],[tMayor,0],[tBack,-3],[tTurn,0],[tEnd,0]]),P([[0,6],[tMia,5.5],[tTurn,6],[tEnd,6.4]]),P([[0,5],[tMia,5],[tNine,-4],[tMayor,-14],[tBack,5],[tTurn,-12],[tEnd,-6]])]};}
function hud(c,n,t){c.save();c.fillStyle='rgba(20,12,30,0.78)';c.beginPath();c.roundRect(110,80,860,110,22);c.fill();c.fillStyle='#fff';c.font='900 40px "DejaVu Sans", Arial';c.textAlign='left';c.textBaseline='middle';c.fillText('LEFT ON READ',140,135);
 const s=1+0.25*Math.max(0,1-((t-lastChange(t))/0.15));c.translate(900,138);c.scale(s,s);c.fillStyle=n>=12?'#ff6b8b':'#9fd8ff';c.font='900 68px "DejaVu Sans", Arial';c.textAlign='right';c.fillText(String(n),0,0);c.restore();}
let lastN=-1,lastT=0;function lastChange(t){return lastT;}
return {cues,caption:'bar',capY:1580,
 draw(c,t){if(!w)setup();const n=count(t);if(n!==lastN){lastN=n;lastT=t;}
  gh.forEach((g,i)=>{const show=i<n;g.visible=show;if(show){g.userData.bob(t,i);const h=g.userData.home;const faded=(t>=tFade&&t<tTw&&i===0);if(faded){g.visible=t<tFade+0.8;g.position.y+=B.ease((t-tFade)/0.8)*4;}
    g.rotation.y=t>=tTurn?0:Math.atan2(-(h[0]>0?-1:1),1)*0.6*(i%2?1:-1);}});
  const mg=Math.min(n,3),jg=n>=12?(t>=tTw?9:9):Math.max(0,Math.min(9,n-3));
  tgM.userData.set('GHOSTS '+(t>=tFade?(t>=tTw?mg-1:mg-1):mg),t>=tFade?'#2f7a4f':'#3a3f9c');tgJ.userData.set('GHOSTS '+(t>=tNine?Math.max(0,Math.min(9,count(t)-3)):0),'#3a3f9c');tgJ.visible=t>=tNine-0.1;tgM.visible=t>=tOne;
  B.pose(mia,t,{mood:t>=tFade?'ok':(t>=tOne?'shock':'ok'),look:Math.sin(t*1.2)*0.3,y:0});
  B.pose(jake,t,{mood:t>=tNine?'panic':'ok',look:Math.sin(t*1.5)*0.4});
  B.pose(may,t,{mood:t>=tToo?'shock':'smug',look:0,wave:t>=tMayor&&t<tToo});
  const cm=cam(t);w.setCam(cm.p,cm.l);w.update(t);w.draw(c);hud(c,n,t);},
 post(c,t){let v=0;if(t>=tTurn&&t<tPhone)v=0.18*clamp((t-tTurn)/1.2);if(t>=tPhone)v=0.18+0.5*clamp((t-tPhone)/1.0);
  const g=c.createRadialGradient(540,960,260,540,960,1250);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(10,6,40,'+v+')');c.fillStyle=g;c.fillRect(0,0,1080,1920);
  if(t>=tTw){const f=0.5+0.5*Math.sin(t*30);c.fillStyle='rgba(255,255,255,'+(0.08*f)+')';c.fillRect(0,0,1080,1920);}}};};
