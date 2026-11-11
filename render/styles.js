// Style library: each style is a different visual DIALECT (background, figure, post-fx, caption look). window.STYLES
// Catalogue ids: noir=35/48 (glow sketch), crt=13/47 (retro terminal / found footage), notebook=42 (stickman notebook), comic=32/46 (comic art), paper=2 (paper-cut).
// A scene picks one: const S=STYLES.noir; draw: S.bg(c,t,o); S.fig(c,t,{x,y,s,...}); post: S.post(c,t). Caption look: return caption:'typewriter'|'crt'|'scribble'|'comic' from SCENE.
(function(){
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const R=i=>{const s=Math.sin(i*12.9898+78.233)*43758.5453;return s-Math.floor(s);}; // seeded, frame-deterministic
const ease=x=>{x=clamp(x);return x*x*(3-2*x)};
function circ(c,x,y,r,f){c.fillStyle=f;c.beginPath();c.arc(x,y,r,0,7);c.fill();}
function line(c,pts,col,w){c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';c.lineJoin='round';c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();}
const ST={};

// ---------- NOIR (thriller): black ground, gold glow lines, silhouette, searchlight, rain ----------
ST.noir={id:'35/48',caption:'typewriter',
 bg(c,t,o){o=o||{};const g=c.createLinearGradient(0,0,0,1920);g.addColorStop(0,'#05070d');g.addColorStop(1,'#10141f');c.fillStyle=g;c.fillRect(-300,-300,1680,2520);
  // skyline silhouette with a few lit windows
  c.fillStyle='#0a0d16';for(let i=0;i<9;i++){const x=i*130-40,h=300+R(i+3)*420;c.fillRect(x,1250-h,110,h+700);for(let j=0;j<6;j++)for(let k=0;k<3;k++)if(R(i*31+j*7+k)>0.72){const on=R(i+j+k+Math.floor(t*0.5))>0.15;if(on){c.fillStyle='rgba(255,200,90,0.55)';c.fillRect(x+14+k*30,1250-h+30+j*58,14,22);}c.fillStyle='#0a0d16';}}
  // searchlight cone sweeping
  const a=(o.sweep!==undefined?o.sweep:Math.sin(t*0.6)*0.5);c.save();c.translate(o.lx||200,1500);c.rotate(-1.2+a);const cg=c.createLinearGradient(0,0,0,-1700);cg.addColorStop(0,'rgba(255,230,160,0.34)');cg.addColorStop(1,'rgba(255,230,160,0)');c.fillStyle=cg;c.beginPath();c.moveTo(-26,0);c.lineTo(26,0);c.lineTo(250,-1700);c.lineTo(-250,-1700);c.closePath();c.fill();c.restore();
  // wet ground + dotted gold horizon line
  c.fillStyle='#0b0e17';c.fillRect(-300,1500,1680,600);for(let i=0;i<70;i++){const x=i*18;c.fillStyle='rgba(255,210,100,'+(0.35+0.4*Math.sin(t*3-i*0.4))+')';c.fillRect(x,1500,7,5);}
  // rain (seeded streaks)
  c.strokeStyle='rgba(170,190,230,0.30)';c.lineWidth=2;for(let i=0;i<90;i++){const x=R(i)*1200-60,y=((R(i+500)*2200+t*(1300+R(i)*500))%2200)-150;c.beginPath();c.moveTo(x,y);c.lineTo(x-12,y+46);c.stroke();}},
 // silhouette figure; o:{x,y(feet),s,face:-1..1,eyes:0..1,lean,walk,coat}
 fig(c,t,o){const s=o.s||1,x=o.x,y=o.y,w=o.walk?Math.sin(t*8)*10:0,l=o.lean||0;c.save();c.translate(x,y);c.scale(s,s);
  c.shadowColor='rgba(255,200,90,0.55)';c.shadowBlur=22;
  c.fillStyle='#07080c';c.beginPath();c.moveTo(-70,-20);c.lineTo(-52+l,-330);c.lineTo(52+l,-330);c.lineTo(70,-20);c.closePath();c.fill();           // coat
  c.fillRect(-34+w,-30,26,30);c.fillRect(8-w,-30,26,30);                                                                                          // legs
  c.beginPath();c.arc(l,-390,58,0,7);c.fill();                                                                                                    // head
  c.fillStyle='#07080c';c.beginPath();c.ellipse(l,-436,88,18,0,0,7);c.fill();c.fillRect(l-50,-470,100,40);                                         // hat
  c.shadowBlur=0;
  if(o.eyes!==undefined&&o.eyes>0){const e=o.eyes;[-1,1].forEach(sd=>{circ(c,l+sd*22+(o.face||0)*8,-392,9*e,'#fff');});}
  c.restore();},
 // generic eyes-in-the-dark creature/threat peeking: o:{x,y,s,t0}
 eyes(c,t,o){const d=t-(o.t0||0);if(d<0)return;const a=clamp(d/0.5)*(0.7+0.3*Math.sin(t*5));c.save();c.globalAlpha=a;c.shadowColor='#ff3b3b';c.shadowBlur=30;[-1,1].forEach(sd=>{c.fillStyle='#ff4040';c.beginPath();c.ellipse(o.x+sd*(o.gap||40)*(o.s||1),o.y,18*(o.s||1),9*(o.s||1),0,0,7);c.fill();});c.restore();},
 post(c,t){const g=c.createRadialGradient(540,900,300,540,960,1250);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,0.65)');c.fillStyle=g;c.fillRect(0,0,1080,1920);
  c.fillStyle='rgba(255,255,255,0.05)';for(let i=0;i<160;i++)c.fillRect(R(i+Math.floor(t*24)*3)*1080,R(i*7+Math.floor(t*24))*1920,2,2);}};

// ---------- CRT (found footage / horror / mystery): timecode, REC dot, scanlines, glitch ----------
ST.crt={id:'13/47',caption:'crt',
 bg(c,t,o){o=o||{};c.fillStyle='#0a110d';c.fillRect(-300,-300,1680,2520);
  // perspective room: floor grid converging to vanishing point
  c.strokeStyle='rgba(80,255,150,0.16)';c.lineWidth=2;const vx=540+(o.vx||0),vy=820;for(let i=-9;i<=9;i++){c.beginPath();c.moveTo(vx,vy);c.lineTo(vx+i*260,1960);c.stroke();}for(let j=0;j<12;j++){const y=vy+Math.pow(j/12,2.2)*1140;c.beginPath();c.moveTo(0,y);c.lineTo(1080,y);c.stroke();}
  c.strokeStyle='rgba(80,255,150,0.10)';c.beginPath();c.moveTo(0,0);c.lineTo(vx,vy);c.moveTo(1080,0);c.lineTo(vx,vy);c.stroke();
  // door frame at the end of the room
  c.strokeStyle='rgba(120,255,180,0.35)';c.lineWidth=5;c.strokeRect(vx-90,vy-210,180,210);},
 fig(c,t,o){const s=o.s||1,x=o.x,y=o.y;c.save();c.translate(x,y);c.scale(s,s);const j=Math.sin(t*40)*(o.glitch||0)*10;c.fillStyle='rgba(170,255,200,0.9)';c.fillRect(-55+j,-300,110,230);circ(c,j,-350,52,'rgba(170,255,200,0.9)');c.fillRect(-45,-72,34,72);c.fillRect(11,-72,34,72);
  if(o.noface!==false){c.fillStyle='#04120a';c.fillRect(-26+j,-362,14,8);c.fillRect(12+j,-362,14,8);}c.restore();},
 post(c,t,o){o=o||{};
  // scanlines + rolling bar + noise + REC + timecode
  c.fillStyle='rgba(0,0,0,0.22)';for(let y=0;y<1920;y+=6)c.fillRect(0,y,1080,2);
  const ry=((t*260)%2400)-240;const rg=c.createLinearGradient(0,ry,0,ry+240);rg.addColorStop(0,'rgba(120,255,170,0)');rg.addColorStop(0.5,'rgba(120,255,170,0.07)');rg.addColorStop(1,'rgba(120,255,170,0)');c.fillStyle=rg;c.fillRect(0,ry,1080,240);
  c.fillStyle='rgba(200,255,220,0.07)';for(let i=0;i<260;i++)c.fillRect(R(i+Math.floor(t*30)*5)*1080,R(i*3+Math.floor(t*30))*1920,3,2);
  if((o.glitch||0)>0){const gy=R(Math.floor(t*30))*1700;c.drawImage(c.canvas,0,gy,1080,60,((R(Math.floor(t*30)+9)-0.5)*70)*o.glitch,gy,1080,60);}
  c.font='700 40px "DejaVu Sans Mono", monospace';c.textAlign='left';c.fillStyle='rgba(235,255,240,0.92)';
  if(Math.floor(t*1.6)%2===0){circ(c,86,130,13,'#ff3030');}c.fillText('REC',112,144);
  const tt=(o.tc0||0)+t,hh=String(Math.floor(tt/3600)).padStart(2,'0'),mm=String(Math.floor(tt/60)%60).padStart(2,'0'),ss=String(Math.floor(tt)%60).padStart(2,'0'),ff=String(Math.floor((tt%1)*30)).padStart(2,'0');
  c.textAlign='right';c.fillText(hh+':'+mm+':'+ss+':'+ff,1000,144);c.textAlign='left';c.fillText(o.cam||'CAM 03',70,1790);
  const v=c.createRadialGradient(540,960,500,540,960,1200);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,0.6)');c.fillStyle=v;c.fillRect(0,0,1080,1920);}};

// ---------- NOTEBOOK (stickman doodle): lined paper, jittery redraw ----------
ST.notebook={id:'42',caption:'scribble',
 bg(c,t,o){c.fillStyle='#f6f0dc';c.fillRect(-300,-300,1680,2520);c.strokeStyle='rgba(70,120,200,0.45)';c.lineWidth=3;for(let y=140;y<1920;y+=86){c.beginPath();c.moveTo(0,y);c.lineTo(1080,y);c.stroke();}c.strokeStyle='rgba(220,60,60,0.6)';c.lineWidth=4;c.beginPath();c.moveTo(110,0);c.lineTo(110,1920);c.stroke();
  c.fillStyle='rgba(120,100,70,0.10)';for(let i=0;i<8;i++)circ(c,60,160+i*230,22,'rgba(120,100,70,0.12)');},
 // stickman: o:{x,y(feet),s,mood:'ok'|'panic'|'smug',arms:[ax1,ay1,ax2,ay2] relative,walk}
 fig(c,t,o){const s=o.s||1,q=Math.floor(t*8),jx=i=>(R(q*13+i)-0.5)*5;c.save();c.translate(o.x,o.y);c.scale(s,s);const col='#1d2a4a',w=9,wl=o.walk?Math.sin(t*9)*28:0;
  const pj=(a)=>a.map((p,i)=>[p[0]+jx(i),p[1]+jx(i+50)]);
  line(c,pj([[0,-170],[0,-60]]),col,w);line(c,pj([[0,-60],[-38+wl,0]]),col,w);line(c,pj([[0,-60],[38-wl,0]]),col,w);
  const A=o.arms||[-70,-110,70,-110];line(c,pj([[0,-150],[A[0],A[1]+(o.mood==='panic'?Math.sin(t*30)*14:0)]]),col,w);line(c,pj([[0,-150],[A[2],A[3]+(o.mood==='panic'?Math.cos(t*30)*14:0)]]),col,w);
  c.strokeStyle=col;c.lineWidth=w;c.fillStyle='#f6f0dc';c.beginPath();c.arc(jx(7),-225,52,0,7);c.fill();c.stroke();
  const m=o.mood||'ok';c.fillStyle=col;circ(c,-18,-232,6,col);circ(c,18,-232,6,col);
  c.beginPath();if(m==='panic'){c.ellipse(0,-200,12,16,0,0,7);c.stroke();}else if(m==='smug'){c.moveTo(-22,-204);c.quadraticCurveTo(0,-188,22,-208);c.stroke();}else{c.moveTo(-20,-204);c.lineTo(20,-204);c.stroke();}
  if(m==='panic'){c.strokeStyle='#3a6bd8';c.lineWidth=5;[[-62,-250,-50,-215],[62,-250,50,-215]].forEach(p=>{c.beginPath();c.moveTo(p[0],p[1]);c.lineTo(p[2],p[3]);c.stroke();});}
  c.restore();},
 post(c,t){c.fillStyle='rgba(90,70,40,0.05)';for(let i=0;i<120;i++)c.fillRect(R(i)*1080,R(i*5)*1920,3,3);const v=c.createRadialGradient(540,960,700,540,960,1300);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(60,40,10,0.22)');c.fillStyle=v;c.fillRect(0,0,1080,1920);}};

// ---------- COMIC (pop-art): halftone dots, thick outlines, panel borders ----------
ST.comic={id:'32/46',caption:'comic',
 bg(c,t,o){o=o||{};const base=o.base||'#ffd23f';c.fillStyle=base;c.fillRect(-300,-300,1680,2520);c.fillStyle='rgba(230,57,70,0.55)';for(let y=0;y<2100;y+=44)for(let x=((y/44)%2)*22;x<1200;x+=44){const r=clamp(1-(y/2100)+(o.dots||0.1),0.1,1)*14;c.beginPath();c.arc(x,y,r,0,7);c.fill();}
  // speed-lines burst from centre when o.rush>0
  if(o.rush>0){c.save();c.translate(540,900);c.strokeStyle='rgba(20,20,20,'+0.5*o.rush+')';c.lineWidth=6;for(let i=0;i<40;i++){const a=i*0.157+R(i)*0.1,r0=300+R(i+9)*120;c.beginPath();c.moveTo(Math.cos(a)*r0,Math.sin(a)*r0*1.4);c.lineTo(Math.cos(a)*1500,Math.sin(a)*1500*1.4);c.stroke();}c.restore();}},
 fig(c,t,o){const s=o.s||1;c.save();c.translate(o.x,o.y);c.scale(s,s);c.lineWidth=12;c.strokeStyle='#111';c.lineJoin='round';const bob=Math.sin(t*6)*(o.hop||0);c.translate(0,-Math.abs(bob));
  c.fillStyle=o.shirt||'#1d70d8';c.beginPath();c.roundRect(-85,-300,170,260,36);c.fill();c.stroke();c.fillStyle='#222';c.fillRect(-68,-44,50,44);c.fillRect(18,-44,50,44);
  c.fillStyle=o.skin||'#f2b27a';c.beginPath();c.arc(0,-400,110,0,7);c.fill();c.stroke();
  const m=o.mood||'ok';c.fillStyle='#fff';[-1,1].forEach(sd=>{c.beginPath();c.ellipse(sd*40,-410,28,(m==='shock'?42:30),0,0,7);c.fill();c.stroke();circ(c,sd*40+(o.look||0),-408,9,'#111');});
  c.strokeStyle='#111';c.lineWidth=10;c.beginPath();if(m==='shock'){c.ellipse(0,-345,26,34,0,0,7);c.fillStyle='#8a1f2b';c.fill();}else{c.moveTo(-34,-350);c.quadraticCurveTo(0,-320,34,-352);}c.stroke();
  c.beginPath();c.moveTo(-76,-455);c.lineTo(-18,-440);c.moveTo(76,-455);c.lineTo(18,-440);c.stroke();c.restore();},
 post(c,t){c.strokeStyle='#111';c.lineWidth=26;c.strokeRect(13,13,1054,1894);}};

// ---------- PAPER-CUT: layered paper with soft shadows + parallax ----------
ST.paper={id:'2',caption:'comic',
 bg(c,t,o){o=o||{};const p=o.px||0;const L=[['#f3e9d2',0,0],['#e8c07a',300,0.2],['#d98c5f',560,0.5],['#9c4f4f',820,0.8],['#3b2f4a',1080,1.2]];c.fillStyle=L[0][0];c.fillRect(-300,-300,1680,2520);
  for(let i=1;i<L.length;i++){const [col,y,par]=L[i];c.save();c.shadowColor='rgba(0,0,0,0.35)';c.shadowBlur=26;c.shadowOffsetY=-8;c.fillStyle=col;c.beginPath();c.moveTo(-300,2200);for(let x=-300;x<=1400;x+=60)c.lineTo(x,y+700-Math.sin((x+p*par*200)*0.006+i)*130-Math.sin((x-p*par*120)*0.013+i*2)*55);c.lineTo(1400,2200);c.closePath();c.fill();c.restore();}
  circ(c,820,360+Math.sin(t)*6,150,'#ffe8a3');},
 fig(c,t,o){const s=o.s||1;c.save();c.translate(o.x,o.y);c.scale(s,s);c.shadowColor='rgba(0,0,0,0.4)';c.shadowBlur=18;c.shadowOffsetY=10;c.fillStyle=o.shirt||'#2a6f97';c.beginPath();c.roundRect(-80,-290,160,250,40);c.fill();c.fillStyle='#222';c.fillRect(-60,-44,46,44);c.fillRect(14,-44,46,44);c.fillStyle=o.skin||'#e9b189';c.beginPath();c.arc(0,-370,92,0,7);c.fill();c.shadowColor='transparent';c.fillStyle='#222';circ(c,-30,-380,9,'#222');circ(c,30,-380,9,'#222');c.strokeStyle='#222';c.lineWidth=7;c.beginPath();c.moveTo(-24,-335);c.quadraticCurveTo(0,(o.mood==='worried'?-350:-318),24,-335);c.stroke();c.restore();},
 post(c,t){c.fillStyle='rgba(120,100,70,0.05)';for(let i=0;i<140;i++)c.fillRect(R(i)*1080,R(i*3)*1920,3,3);}};

window.STYLES=ST;
})();
