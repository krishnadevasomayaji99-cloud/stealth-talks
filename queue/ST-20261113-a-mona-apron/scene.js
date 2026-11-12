window.SCENE=function(a){const {k,ease,clamp,W,E}=a;const S=window.STYLES.paper;
const tClos=W('closet'),tDawn=W('dawn'),tStair=W('stairwell'),tLock=W('locked'),tPlumb=W('plumber'),tApron=W('apron'),tName=W('Vincenzo'),tTue=W('Tuesday'),tEnd=a.words[a.words.length-1].end+0.4;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tClos,sfx:'click',gain:0.8},{t:tDawn,sfx:'rise',gain:0.8},{t:tStair,sfx:'thud',gain:0.9},{t:tLock,sfx:'thud',gain:1},{t:tPlumb,sfx:'click',gain:0.8},{t:tApron-0.4,sfx:'rise',gain:0.9},{t:tApron,sfx:'chime',gain:1},{t:tTue,sfx:'pop',gain:0.9}];
function art(c,x,y,w,h,miss){c.save();c.shadowColor='rgba(0,0,0,0.4)';c.shadowBlur=20;c.shadowOffsetY=10;c.fillStyle='#8a5a2b';c.fillRect(x-w/2-24,y-h/2-24,w+48,h+48);c.shadowColor='transparent';c.fillStyle=miss?'#d9cfb8':'#7a6a3a';c.fillRect(x-w/2,y-h/2,w,h);if(!miss){c.fillStyle='#3d3320';c.beginPath();c.arc(x,y-h*0.12,w*0.16,0,7);c.fill();c.beginPath();c.ellipse(x,y+h*0.25,w*0.3,h*0.22,0,0,7);c.fill();}c.restore();}
return {cues,caption:S.caption,capY:1600,
 cam(t){const z=k(t,[[0,1],[tStair-0.3,1],[tStair,1.15],[tLock,1.3],[tApron,1.3],[tApron+0.5,1],[tEnd,1.05]]);const [sx,sy]=a.shake(t,(t>tLock-0.1&&t<tLock+0.4)?6:0);return{x:540+sx,y:960+sy,z};},
 draw(c,t){S.bg(c,t,{px:t*0.4});
  const night=t>tClos-0.5&&t<tDawn;
  // walls
  c.fillStyle='rgba(243,233,210,0.92)';c.fillRect(0,300,1080,1000);
  if(t<tDawn||t>tPlumb+0.01&&false){}
  const painting=t<tDawn+1.2;
  art(c,540,700,360,480,!painting);
  if(!painting&&t<tTue)art(c,540,700,360,480,true);
  if(t>tStair&&t<tPlumb){c.fillStyle='rgba(60,50,70,0.5)';c.fillRect(0,300,1080,1000);}
  // closet door
  c.fillStyle='#6b4a2a';c.fillRect(80,820,200,420);c.fillStyle='#ffd23f';c.beginPath();c.arc(250,1030,10,0,7);c.fill();
  // door locked
  if(t>=tLock-0.5){c.fillStyle='#4a3a5a';c.fillRect(780,760,220,480);c.fillStyle='#ffd23f';c.beginPath();c.arc(810,1010,12,0,7);c.fill();}
  const x=t<tClos?200:(t<tDawn?170:k(t,[[tDawn,200],[tStair,520],[tLock,700],[tLock+3,720]]));
  const worried=t>=tLock&&t<tApron;
  if(t<tClos-0.3||t>=tClos+0.3)S.fig(c,t,{x,y:1260,s:1.1,mood:worried?'worried':'ok',shirt:t>=tApron-0.3?'#ffffff':'#2a6f97'});
  if(t>tPlumb&&t<tApron+1){S.fig(c,t,{x:300,y:1260,s:1.0,shirt:'#c9741b'});}
  if(t>=tStair&&t<tPlumb){c.save();c.translate(x+80,1000);c.rotate(-0.2);art(c,0,0,160,210,false);c.restore();}
  if(Math.abs(t-tClos)<0.15){c.fillStyle='rgba(20,15,40,0.55)';c.fillRect(0,0,1080,1920);}
  if(night){c.fillStyle='rgba(30,20,60,0.45)';c.fillRect(0,0,1080,1920);}
 },
 post(c,t){S.post(c,t);}};};
