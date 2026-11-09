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
window.KIT={clamp,ease,outBack,circ,ell,rr,tri,arm,burst,person,blink};
})();
