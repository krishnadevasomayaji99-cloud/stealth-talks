window.SCENE=function(a){const {k,ease,clamp}=a;const B=window.B3;
const WX=(q,n=0)=>{let c=0;for(const w of a.words){if(w.w.toLowerCase().replace(/[^a-z0-9']/g,'')===q){if(c===n)return w.start;c++;}}throw new Error('word not found: '+q);};
const tTwo=WX('two',0),tThu=WX('thursday'),tPS=WX('playstation'),tPre=WX('preload'),tRum=WX('rumour'),tReal=WX('really'),tNYT=WX('times'),tPlay=WX('playthrough'),tOff=WX('official'),tWander=WX('wander'),tSrc=WX('source'),tEnd=a.words[a.words.length-1].end+0.5;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tTwo,sfx:'boom',gain:0.8},{t:tThu,sfx:'chime',gain:0.8},{t:tThu+0.1,sfx:'tick',gain:1},{t:tPS,sfx:'chime',gain:0.8},{t:tPS+0.1,sfx:'tick',gain:1},{t:tPre,sfx:'chime',gain:0.8},{t:tPre+0.1,sfx:'tick',gain:1},{t:tRum-0.3,sfx:'scratch',gain:0.8},{t:tRum,sfx:'static',gain:0.7},{t:tReal-0.2,sfx:'whoosh',gain:0.8},{t:tNYT,sfx:'ding_dong',gain:0.6},{t:tPlay,sfx:'tick',gain:0.8},{t:tOff-0.25,sfx:'rise',gain:0.8},{t:tOff,sfx:'boom',gain:1},{t:tOff+0.05,sfx:'thud',gain:1},{t:tWander,sfx:'whoosh',gain:0.6},{t:tSrc,sfx:'chime',gain:0.7}];
let w,host,tg,dec=[];
function setup(){w=B.world({speakerZ:-80,sky:'#9fdcff',hemi:['#ffffff','#7ea46a',1],sun:['#fff6dd',0.95]});
 host=w.person({shirt:'#1f8a4c',stripe:'#d9f7e3',pants:'#2b2d3a',hair:'#222',glasses:true,style:'band'});host.position.set(0,0,4);w.scene.add(host);
 tg=w.tag('CONFIRMED 0','#1f6b3a');tg.position.set(0,10,0);host.add(tg);
 [[-8,-2],[8.5,-6],[-9,-14]].forEach((p,i)=>{const q=w.person({shirt:['#f4a261','#6c63ff','#e76f51'][i],pants:'#333a5a',hair:['#5a3a1e','#c9a227','#222'][i],style:['long','spike','band'][i]});q.position.set(p[0],0,p[1]);q.rotation.y=p[0]<0?0.6:-0.6;w.scene.add(q);dec.push(q);});}
const conf=t=>t>=tPre?3:t>=tPS?2:t>=tThu?1:0;
function cam(t){const P=(p)=>k(t,p);
 return {p:[P([[0,6],[tThu,-5],[tPre,5],[tRum,0],[tNYT,-6],[tOff-0.2,-6],[tOff,0],[tEnd,0]]),P([[0,9],[tThu,6.5],[tRum,7.5],[tNYT,6],[tOff,6.2],[tEnd,6.4]]),P([[0,22],[tThu,13],[tPre,12],[tRum,10],[tNYT,11],[tOff-0.2,10],[tOff,7],[tEnd,6]])],l:[P([[0,0],[tEnd,0]]),P([[0,6],[tEnd,6.2]]),P([[0,4],[tEnd,4]])]};}
function hud(c,t){c.save();c.fillStyle='rgba(10,20,30,0.78)';c.beginPath();c.roundRect(120,80,840,110,22);c.fill();c.fillStyle='#fff';c.font='900 40px "DejaVu Sans", Arial';c.textAlign='left';c.textBaseline='middle';c.fillText('DAYS TO LAUNCH',150,135);c.fillStyle='#7dffb0';c.font='900 68px "DejaVu Sans", Arial';c.textAlign='right';c.fillText('2',930,138);c.restore();}
return {cues,caption:'bar',capY:1580,
 draw(c,t){if(!w)setup();const n=conf(t);const rum=t>=tRum&&t<tOff;
  tg.userData.set(t>=tOff?'NOT OFFICIAL':(rum?'RUMOUR':'CONFIRMED '+n),t>=tOff?'#8a1020':(rum?'#a8641a':'#1f6b3a'));
  B.pose(host,t,{mood:rum?'shock':(t>=tOff?'smug':'ok'),look:Math.sin(t*1.2)*0.3,wave:t>=tTwo&&t<tTwo+1.2});
  dec.forEach((q,i)=>B.pose(q,t,{mood:rum?'shock':'ok',look:Math.sin(t*1.1+i)*0.4,up:rum&&i===1}));
  const cm=cam(t);w.setCam(cm.p,cm.l);w.update(t);w.draw(c);hud(c,t);},
 post(c,t){if(t>=tOff){const d=t-tOff,s=1+1.2*Math.max(0,1-d/0.18),a2=clamp(d/0.08);c.save();c.globalAlpha=a2;c.translate(540,1150);c.rotate(-0.12);c.scale(s,s);c.fillStyle='rgba(138,16,32,0.92)';c.strokeStyle='#fff';c.lineWidth=10;c.beginPath();c.roundRect(-380,-100,760,200,26);c.fill();c.stroke();c.fillStyle='#fff';c.font='900 96px "DejaVu Sans", Arial';c.textAlign='center';c.textBaseline='middle';c.fillText('NOT OFFICIAL',0,6);c.restore();}
  if(t>=tOff&&t<tOff+0.25){c.fillStyle='rgba(255,255,255,'+(0.5*(1-(t-tOff)/0.25))+')';c.fillRect(0,0,1080,1920);}}};};
