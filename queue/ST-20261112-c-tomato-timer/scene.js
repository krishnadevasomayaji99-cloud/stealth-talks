window.SCENE=function(a){const {k,ease,clamp,W,E}=a;const S=window.STYLES.notebook;
const tTick=W('ticking'),tNote=W('notebook'),tWord=W('word'),tUnder=W('under'),tSmile=W('smiling'),tBell=W('bell'),tTom=W('tomato'),tPom=W('pomodoro'),tBrk=W('break'),tEnd=E('again')+0.4;
const cues=[{t:0.05,sfx:'pop',gain:0.6}];
for(let x=0.4;x<tBell;x+=(x<tWord?0.9:0.55))cues.push({t:x,sfx:'tick',gain:Math.min(1,0.4+x/tBell*0.7)});
cues.push({t:tUnder-0.4,sfx:'rise',gain:0.9},{t:tUnder,sfx:'thud',gain:1},{t:tBell,sfx:'chime',gain:1},{t:tTom,sfx:'pop',gain:1},{t:tBrk,sfx:'click',gain:0.8});
for(let x=E('again')-1.0;x<tEnd;x+=0.5)cues.push({t:x,sfx:'tick',gain:0.8});
const INK='#1d2a4a',RED='#c0392b';
function tomato(c,x,y,r,t,face){c.save();c.translate(x,y);c.fillStyle='#d83a2e';c.strokeStyle=INK;c.lineWidth=8;c.beginPath();c.arc(0,0,r,0,7);c.fill();c.stroke();c.fillStyle='#3f8f3a';c.beginPath();for(let i=0;i<6;i++){const a2=i*1.047;c.lineTo(Math.cos(a2)*r*0.42,-r*0.92+Math.sin(a2)*r*0.16);c.lineTo(Math.cos(a2+0.52)*r*0.2,-r*0.98);}c.closePath();c.fill();c.stroke();
 if(face){c.fillStyle='#fff';[-1,1].forEach(s=>{c.beginPath();c.arc(s*r*0.33,-r*0.1,r*0.17,0,7);c.fill();c.stroke();c.fillStyle=INK;c.beginPath();c.arc(s*r*0.33+Math.sin(t*3)*3,-r*0.08,r*0.07,0,7);c.fill();c.fillStyle='#fff';});c.strokeStyle=INK;c.lineWidth=8;c.beginPath();c.arc(0,r*0.12,r*0.42,0.15,3);c.stroke();}
 c.restore();}
return {cues,caption:S.caption,capY:1600,
 cam(t){const z=k(t,[[0,1],[tUnder-0.3,1],[tUnder,1.25],[tBell,1.25],[tBell+0.4,1],[tEnd,1.04]]);const y=k(t,[[tUnder-0.3,960],[tUnder,1100],[tBell,1100],[tBell+0.4,960]]);const [sx,sy]=a.shake(t,(t>tWord&&t<tBell)?3:0);return{x:540+sx,y:y+sy,z};},
 draw(c,t){S.bg(c,t);
  // timer countdown doodle
  const fr=clamp(t/tBell);const sec=Math.round(1500*(1-fr));const mm=String(Math.floor(sec/60)).padStart(2,'0'),ss=String(sec%60).padStart(2,'0');
  c.font='700 120px sans-serif';c.textAlign='center';c.fillStyle=sec<300?RED:INK;if(t<tBell+0.6)c.fillText(mm+':'+ss,540,300+Math.sin(t*20)*(sec<60?4:0));
  // desk
  c.strokeStyle=INK;c.lineWidth=9;c.beginPath();c.moveTo(120,1180);c.lineTo(960,1180);c.moveTo(160,1180);c.lineTo(160,1560);c.moveTo(920,1180);c.lineTo(920,1560);c.stroke();
  // notebook on desk
  c.fillStyle='#fff';c.fillRect(470,1120,220,60);c.strokeRect(470,1120,220,60);if(t>tWord){c.font='700 40px sans-serif';c.fillStyle=INK;c.fillText('...',580,1165);}
  const mood=t<tNote?'ok':(t<tBell?'panic':(t<tTom?'smug':'ok'));
  S.fig(c,t,{x:300,y:1180,s:1.15,mood,arms:t>tNote?[90,-80,120,-40]:[-70,-110,70,-110]});
  // what is under the desk
  if(t>tUnder-0.2&&t<tTom){const al=clamp((t-tUnder)/0.6);c.save();c.globalAlpha=al;tomato(c,700,1440,t<tSmile?55:85,t,t>=tSmile);c.restore();if(t<tSmile){c.fillStyle=INK;[0,1].forEach(i=>{c.beginPath();c.arc(670+i*60,1430,10,0,7);c.fill();});}}
  if(t>=tTom&&t<tBrk-0.2){const d=a.outBack((t-tTom)/0.5);tomato(c,540,900,260*d,t,true);}
  if(t>tEnd-1.6){tomato(c,820,1440,70,t,true);}
  // palette flash at the reveal of the thing
  if(Math.abs(t-tUnder)<0.15){c.fillStyle='rgba(200,40,40,0.35)';c.fillRect(0,0,1080,1920);}
 },
 post(c,t){S.post(c,t);}};};
