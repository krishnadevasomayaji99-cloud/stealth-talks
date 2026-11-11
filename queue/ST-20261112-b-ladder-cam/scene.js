window.SCENE=function(a){const {k,ease,clamp,W,E}=a;const S=window.STYLES.crt;
const tMon=W('monday'),tTue=W('tuesday'),tWed=W('wednesday'),tCam=W('camera'),tShake=W('footage'),tShape=W('shape'),tLook=W('lens'),tGoat=W('goat'),tFact=W('ruminant'),tThu=W('thursday'),tEnd=E('roof',1)+0.4;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tMon,sfx:'click',gain:0.8},{t:tTue,sfx:'click',gain:0.8},{t:tWed,sfx:'thud',gain:1},{t:tShake-0.2,sfx:'rise',gain:0.9},{t:tShape,sfx:'thud',gain:0.9},{t:tGoat-0.3,sfx:'rise',gain:0.8},{t:tGoat,sfx:'chime',gain:1},{t:tThu,sfx:'thud',gain:1}];
function ladder(c,x,y,h,rot){c.save();c.translate(x,y);c.rotate(rot||0);c.strokeStyle='rgba(180,255,210,0.95)';c.lineWidth=12;c.beginPath();c.moveTo(-40,0);c.lineTo(-40,-h);c.moveTo(40,0);c.lineTo(40,-h);c.stroke();c.lineWidth=8;for(let i=1;i<h/55;i++){c.beginPath();c.moveTo(-40,-i*55);c.lineTo(40,-i*55);c.stroke();}c.restore();}
function barn(c,roofY){c.fillStyle='rgba(120,255,180,0.10)';c.fillRect(200,900,680,640);c.strokeStyle='rgba(150,255,200,0.6)';c.lineWidth=6;c.strokeRect(200,900,680,640);c.beginPath();c.moveTo(170,900);c.lineTo(540,roofY);c.lineTo(910,900);c.stroke();c.strokeRect(430,1180,220,360);}
function goat(c,t,x,y,s,look){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle='rgba(190,255,215,0.95)';c.beginPath();c.ellipse(0,-120,110,70,0,0,7);c.fill();[-70,-30,40,80].forEach(lx=>c.fillRect(lx-9,-80,18,80));c.beginPath();c.ellipse(120,-175,48,38,0.3,0,7);c.fill();c.strokeStyle='rgba(190,255,215,0.95)';c.lineWidth=11;c.beginPath();c.moveTo(105,-205);c.quadraticCurveTo(80,-270,125,-290);c.moveTo(135,-210);c.quadraticCurveTo(150,-275,185,-285);c.stroke();c.fillStyle='#04120a';c.beginPath();c.ellipse(130,-185,8,12,0,0,7);c.fill();c.restore();}
return {cues,caption:S.caption,capY:1560,
 cam(t){const sh=(t>tShake&&t<tLook)?7:0;const [sx,sy]=a.shake(t,sh);const z=t>tLook&&t<tGoat+1.2?k(t,[[tLook,1],[tGoat+0.6,1.35]]):1;return{x:540+sx,y:960+sy,z};},
 draw(c,t){const gl=((t>tTue-0.05&&t<tTue+0.12)||(t>tWed-0.05&&t<tWed+0.12)||(t>tThu-0.05&&t<tThu+0.14))?1:0;
  S.bg(c,t,{vx:0});
  const day=t<tTue?0:(t<tWed?1:(t<tThu?2:3));
  const roofY=640;barn(c,roofY);
  if(t>tMon-0.3){ if(day===0)ladder(c,300,1540,300,0);else if(day===1)ladder(c,205,1540,520,0.04);else ladder(c,540,roofY+90,520,0.0);} else ladder(c,300,1540,300,0);
  if(t>tShape&&t<tGoat){const d=t-tShape;goat(c,t,k(t,[[tShape,1100],[tShape+3,640]]),1530,0.9);}
  if(t>=tGoat&&t<tThu){const d=clamp((t-tGoat)/1.0);c.save();c.globalAlpha=d;goat(c,t,540+30,1250,1.6);c.restore();}
  if(t>=tThu){c.fillStyle='rgba(190,255,215,0.95)';c.fillRect(500,roofY+30,80,56);c.beginPath();c.arc(540,roofY+58,14,0,7);c.fillStyle='#04120a';c.fill();goat(c,t,720,roofY+95,0.55);}
 },
 post(c,t){S.post(c,t,{tc0:10980,cam:t>tThu?'CAM 03 - ROOF':'CAM 03 - BARN',glitch:(t>tShape&&t<tShape+2.5||Math.abs(t-tMon)<0.12||Math.abs(t-tTue)<0.12||Math.abs(t-tWed)<0.12||t>tGoat-0.1&&t<tGoat+0.2||Math.abs(t-tThu)<0.15)?1:0});}};};
