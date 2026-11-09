// Shared drawing kit for scenes. window.KIT
(function(){
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x)};
const outBack=x=>{x=clamp(x);const c=1.70158;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)};
function circ(c,x,y,r,f){c.fillStyle=f;c.beginPath();c.arc(x,y,r,0,7);c.fill();}
function ell(c,x,y,rx,ry,f,rot){c.fillStyle=f;c.beginPath();c.ellipse(x,y,rx,ry,rot||0,0,7);c.fill();}
function rr(c,x,y,w,h,r,f){c.fillStyle=f;c.beginPath();c.roundRect(x,y,w,h,r);c.fill();}
function tri(c,x1,y1,x2,y2,x3,y3,f){c.fillStyle=f;c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.lineTo(x3,y3);c.closePath();c.fill();}
function arm(c,x1,y1,x2,y2,w,col){c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';c.beginPath();c.moveTo(x1,y1);c.quadraticCurveTo((x1+x2)/2,Math.max(y1,y2)+40,x2,y2);c.stroke();}
function burst(c,txt,x,y,t0,t,col,sz,dur){dur=dur||1.1;const d=t-t0;if(d<0||d>dur)return;const sc=outBack(d/0.18)*(d>dur-0.3?1-(d-(dur-0.3))/0.3:1);c.save();c.translate(x,y);c.rotate(Math.sin(t*30)*0.03-0.08);c.scale(sc,sc);c.fillStyle='#111';c.beginPath();for(let i=0;i<24;i++){const r=i%2?sz*0.62:sz;c.lineTo(Math.cos(i*Math.PI/12)*r*1.5,Math.sin(i*Math.PI/12)*r);}c.fill();c.fillStyle=col;c.beginPath();for(let i=0;i<24;i++){const r=i%2?sz*0.55:sz*0.92;c.lineTo(Math.cos(i*Math.PI/12)*r*1.5,Math.sin(i*Math.PI/12)*r);}c.fill();c.fillStyle='#111';c.font='900 '+Math.round(sz*0.62)+'px "DejaVu Sans", Arial';c.textAlign='center';c.textBaseline='middle';c.fillText(txt,0,4);c.restore();}
const blink=t=>((t%3.4)>3.25?0.1:1);
// person: o={x,y(head centre),skin,shirt,hair,bun,mouth,look,brow,handR:[x,y],handL:[x,y],sweat,stubble,bags,cap}
function person(c,t,o){
 const x=o.x,y=o.y+(o.bob===false?0:Math.sin(t*2)*3),skin=o.skin||'#f2c19b',shirt=o.shirt||'#2a9d8f',hair=o.hair||'#4a2c1a';
 const hr=o.handR||[x+95,y+300],hl=o.handL||[x-95,y+300];
 rr(c,x-125,y+120,250,330,60,shirt);
 arm(c,x-95,y+190,hl[0],hl[1],46,shirt);circ(c,hl[0],hl[1],30,skin);
 arm(c,x+95,y+190,hr[0],hr[1],46,shirt);circ(c,hr[0],hr[1],30,skin);
 if(o.bun)circ(c,x,y-150,52,hair);
 circ(c,x,y,128,skin);
 c.fillStyle=hair;c.beginPath();c.arc(x,y-15,130,Math.PI*1.02,Math.PI*1.98);c.quadraticCurveTo(x,y-70,x-128,y-30);c.fill();
 if(o.cap){c.fillStyle=o.cap;c.beginPath();c.arc(x,y-20,132,Math.PI,2*Math.PI);c.fill();c.fillRect(x-30,y-28,170,16);}
 const look=o.look||0,op=o.eyeOpen==null?1:o.eyeOpen,br=o.brow||0;
 [-1,1].forEach(s=>{const ex=x+s*46,ey=y+10;c.fillStyle='#fff';c.beginPath();c.ellipse(ex,ey,26,32*blink(t)*op,0,0,7);c.fill();circ(c,ex+look*7,ey+4,12,'#222');
  c.strokeStyle=hair;c.lineWidth=8;c.lineCap='round';c.beginPath();c.moveTo(ex-22,ey-40-br*8*(s>0?1:-1)*0-br*6);c.lineTo(ex+22,ey-44+br*10*s*0-br*6*0+(-br*2));c.stroke();});
 if(o.bags){c.strokeStyle='rgba(90,60,90,.6)';c.lineWidth=7;[-1,1].forEach(s=>{c.beginPath();c.arc(x+s*46,y+36,26,0.15*Math.PI,0.85*Math.PI);c.stroke();});}
 if(o.stubble){c.fillStyle='rgba(60,40,30,'+clamp(o.stubble)*0.55+')';for(let i=0;i<46;i++){const a=(i*2.399)%6.283,r=60+((i*37)%50);const px=x+Math.cos(a)*r*0.9,py=y+60+Math.abs(Math.sin(a))*r*0.55;c.fillRect(px,py,4,4);}}
 circ(c,x-78,y+55,17,'rgba(240,120,120,0.45)');circ(c,x+78,y+55,17,'rgba(240,120,120,0.45)');
 c.strokeStyle='#8a3b2b';c.lineWidth=8;c.lineCap='round';c.beginPath();
 const m=o.mouth||'smile';
 if(m==='smile')c.arc(x,y+62,30,0.1*Math.PI,0.9*Math.PI);
 else if(m==='grin'){c.arc(x,y+55,40,0.05*Math.PI,0.95*Math.PI);}
 else if(m==='sad')c.arc(x,y+88,24,1.15*Math.PI,1.85*Math.PI);
 else if(m==='flat'){c.moveTo(x-24,y+80);c.lineTo(x+24,y+80);}
 else if(m==='o'||m==='open'){c.fillStyle='#8a3b2b';c.ellipse(x,y+85,22,m==='open'?22:14,0,0,7);c.fill();}
 c.stroke();
 if(o.sweat){for(let i=0;i<3;i++){const ph=(t*1.4+i*0.33)%1;c.fillStyle='rgba(120,190,255,'+(1-ph)+')';c.beginPath();c.ellipse(x+(i-1)*70+(i===1?40:0),y-60+ph*110,9,14,0,0,7);c.fill();}}
}

// cat: o={x,y(head centre),mood:'focus|horror|smug|dizzy|happy',wag,rot,sx,sy,pawR:[x,y],pawL:[x,y],noBody}
function cat(c,t,o){
 const x=o.x,y=o.y,wag=o.wag==null?Math.sin(t*3)*0.25:o.wag;
 c.save();c.translate(x,y);c.rotate(o.rot||0);c.scale(o.sx||1,o.sy||1);c.translate(-x,-y);
 if(!o.noBody){c.strokeStyle='#e8851f';c.lineWidth=40;c.lineCap='round';c.beginPath();c.moveTo(x+110,y+190);c.bezierCurveTo(x+170,y+170,x+170+wag*60,y+70,x+120+wag*80,y-10);c.stroke();
  c.fillStyle='#f0922b';c.beginPath();c.ellipse(x,y+190,130,170,0,0,7);c.fill();
  const pl=o.pawL||[x-60,y+295],pr=o.pawR||[x+60,y+295];
  arm(c,x-70,y+170,pl[0],pl[1],44,'#f0922b');circ(c,pl[0],pl[1],32,'#f6a54a');arm(c,x+70,y+170,pr[0],pr[1],44,'#f0922b');circ(c,pr[0],pr[1],32,'#f6a54a');}
 tri(c,x-100,y-60,x-70,y-185,x-20,y-95,'#f0922b');tri(c,x+100,y-60,x+70,y-185,x+20,y-95,'#f0922b');
 tri(c,x-85,y-85,x-68,y-150,x-40,y-100,'#f7b7b0');tri(c,x+85,y-85,x+68,y-150,x+40,y-100,'#f7b7b0');
 ell(c,x,y,118,102,'#f0922b');
 c.strokeStyle='#d9741a';c.lineWidth=9;[-28,0,28].forEach(d=>{c.beginPath();c.moveTo(x+d,y-100);c.lineTo(x+d*0.8,y-62);c.stroke();});
 const m=o.mood||'focus';const hv=m==='horror',nar=m==='focus'?0.35:(m==='smug'?0.55:0),dz=m==='dizzy';
 [-1,1].forEach(sd=>{const ex=x+sd*46,ey=y-8;const ry=(hv?44:34-nar*18)*blink(t+1);
  c.fillStyle='#b6e36a';c.beginPath();c.ellipse(ex,ey,30,ry,0,0,7);c.fill();
  if(dz){c.strokeStyle='#111';c.lineWidth=5;c.beginPath();for(let a=0;a<12;a+=0.3)c.lineTo(ex+Math.cos(a+t*8)*a*1.6,ey+Math.sin(a+t*8)*a*1.6);c.stroke();}
  else{c.fillStyle='#111';c.beginPath();c.ellipse(ex+(o.look||0),ey,hv?4:9,Math.max(4,ry-4),0,0,7);c.fill();}
  c.strokeStyle='#8a4a10';c.lineWidth=9;c.lineCap='round';c.beginPath();c.moveTo(ex-28,ey-44+(m==='focus'?sd*8:0));c.lineTo(ex+28,ey-44-(m==='focus'?sd*8:0));c.stroke();});
 tri(c,x-12,y+22,x+12,y+22,x,y+38,'#e05a6b');
 c.strokeStyle='#5a2d0c';c.lineWidth=5;c.beginPath();if(m==='happy'||m==='smug'){c.moveTo(x,y+38);c.quadraticCurveTo(x-18,y+70,x-38,y+48);c.moveTo(x,y+38);c.quadraticCurveTo(x+18,y+70,x+38,y+48);}else if(hv){c.fillStyle='#7a2d2d';c.ellipse(x,y+62,14,20,0,0,7);c.fill();}else{c.moveTo(x,y+38);c.quadraticCurveTo(x-16,y+58,x-34,y+50);c.moveTo(x,y+38);c.quadraticCurveTo(x+16,y+58,x+34,y+50);}c.stroke();
 c.strokeStyle='rgba(60,30,10,.7)';c.lineWidth=4;[-1,1].forEach(sd=>{[0,14,28].forEach(d=>{c.beginPath();c.moveTo(x+sd*50,y+36+d*0.4);c.lineTo(x+sd*130,y+26+d);c.stroke();});});
 c.restore();}
function confetti(c,t,x,y,t0,n){const d=t-t0;if(d<0||d>2.2)return;for(let i=0;i<(n||40);i++){const an=(i*2.399)%6.283,sp=300+((i*53)%300);const px=x+Math.cos(an)*sp*d*0.7,py=y+Math.sin(an)*sp*d*0.7*0.6-250*d+520*d*d;c.save();c.translate(px,py);c.rotate(d*8+i);c.globalAlpha=1-d/2.2;c.fillStyle=['#ff6b6b','#ffd23f','#6bd6ff','#b6e36a','#d6a8ff'][i%5];c.fillRect(-9,-5,18,10);c.restore();}}
function stamp(c,txt,x,y,t0,t,col,sz){const d=t-t0;if(d<0||d>1.0)return;const sc=d<0.1?1.9-9*d:1;const a=d>0.75?1-(d-0.75)/0.25:1;c.save();c.translate(x,y);c.rotate(-0.18);c.scale(sc,sc);c.globalAlpha=a;c.strokeStyle=col;c.lineWidth=14;c.strokeRect(-sz*1.3,-sz*0.75,sz*2.6,sz*1.5);c.fillStyle=col;c.font='900 '+sz+'px "DejaVu Sans", Arial';c.textAlign='center';c.textBaseline='middle';c.fillText(txt,0,6);c.restore();}

window.KIT={cat,confetti,stamp,clamp,ease,outBack,circ,ell,rr,tri,arm,burst,person,blink};
})();
