window.SCENE=function(a){
const {k,ease,outBack,clamp,W,E}=a;
const tBis=W('biscuit'),tSplit=W('split'),tNothing=W('nothing'),tPlan=W('planning'),tBroke=W('broke'),tHuge=W('huge'),tCrumb=W('crumb',0),
 tGrab=W('grabbed'),tTook=W('took'),tDead=W('dead'),tChew=W('chewed'),tBreak=W('breakfast');
const cues=[{t:0.05,sfx:'pop',gain:0.7},{t:tBis,sfx:'tick',gain:0.6},{t:tBroke-0.02,sfx:'click',gain:1},{t:tGrab-0.05,sfx:'whoosh',gain:0.7},{t:tTook-0.05,sfx:'whoosh',gain:0.5},{t:tDead,sfx:'rise',gain:0.6},{t:tChew+0.1,sfx:'thud',gain:0.5},{t:tBreak,sfx:'chime',gain:0.8}];
const BX=540,BY=1062;
function tri(c,x1,y1,x2,y2,x3,y3,f){c.fillStyle=f;c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.lineTo(x3,y3);c.closePath();c.fill();}
function circ(c,x,y,r,f){c.fillStyle=f;c.beginPath();c.arc(x,y,r,0,7);c.fill();}
function arm(c,x1,y1,x2,y2,w,col){c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';c.beginPath();c.moveTo(x1,y1);c.quadraticCurveTo((x1+x2)/2,Math.max(y1,y2)+40,x2,y2);c.stroke();}
const blink=t=>{const p=t%3.4;return p>3.25?0.1:1;};
// biscuit pieces
function bigPiece(c){c.save();c.beginPath();c.rect(-90,-90,90+30,180);c.clip();circ(c,0,0,70,'#d9a75a');c.lineWidth=7;c.strokeStyle='#b9823a';c.beginPath();c.arc(0,0,66,0,7);c.stroke();c.restore();}
function crumbPiece(c,withBite){c.save();c.beginPath();c.rect(30,-90,90,180);c.clip();circ(c,0,0,70,'#d9a75a');c.lineWidth=7;c.strokeStyle='#b9823a';c.beginPath();c.arc(0,0,66,0,7);c.stroke();
 [[44,-30],[52,2],[42,34],[58,-52],[60,40],[38,-6]].forEach(p=>circ(c,p[0],p[1],8,'#3b2314'));c.restore();}
function hands(t){ // positions of Maya right hand and Pepper paw
 const tg=tGrab,gx=k(t,[[tg-0.4,430],[tg+0.1,BX-30],[tg+0.7,330]]),gy=k(t,[[tg-0.4,1120],[tg+0.1,BY+10],[tg+0.7,900]]);
 const pt=tTook,px=k(t,[[pt-0.5,790],[pt+0.1,BX+60],[pt+0.8,800]]),py=k(t,[[pt-0.5,1150],[pt+0.1,BY+10],[pt+0.8,930]]);
 return {mx:t<tg-0.4?430:gx,my:t<tg-0.4?1120:gy,px:t<pt-0.5?790:px,py:t<pt-0.5?1150:py};
}
function maya(c,t,h){
 const bob=Math.sin(t*2)*3;const x=290,y=780+bob;
 const chew=t>tChew?Math.abs(Math.sin((t-tChew)*7)):0;
 // body
 c.fillStyle='#2a9d8f';c.beginPath();c.roundRect(x-125,y+120,250,330,60);c.fill();
 arm(c,x-95,y+190,x-40,1115,46,'#2a9d8f');circ(c,x-40,1115,30,'#f2c19b');
 arm(c,x+95,y+190,h.mx,h.my,46,'#2a9d8f');circ(c,h.mx,h.my,30,'#f2c19b');
 // head
 circ(c,x,y-150,52,'#4a2c1a');circ(c,x,y,128,'#f2c19b');
 c.fillStyle='#4a2c1a';c.beginPath();c.arc(x,y-15,130,Math.PI*1.02,Math.PI*1.98);c.quadraticCurveTo(x,y-70,x-128,y-30);c.fill();
 // eyes look at biscuit then at cat
 const look=k(t,[[tDead-0.3,-1],[tDead,1]]);const droop=t>tChew?k(t,[[tChew,0],[tChew+0.8,1]]):0;
 [-1,1].forEach(s=>{const ex=x+s*46,ey=y+10;c.fillStyle='#fff';c.beginPath();c.ellipse(ex,ey,26,32*blink(t)*(1-0.45*droop),0,0,7);c.fill();circ(c,ex+look*7,ey+4,12,'#222');c.strokeStyle='#4a2c1a';c.lineWidth=7;c.lineCap='round';c.beginPath();c.moveTo(ex-22,ey-40+droop*14);c.lineTo(ex+22,ey-44-(droop?-6:0));c.stroke();});
 circ(c,x-78,y+55,17,'rgba(240,120,120,0.45)');circ(c,x+78,y+55,17,'rgba(240,120,120,0.45)');
 // mouth
 c.strokeStyle='#8a3b2b';c.lineWidth=8;c.lineCap='round';c.beginPath();
 if(t>tChew){c.fillStyle='#8a3b2b';c.ellipse(x,y+85,22+chew*6,6+chew*14,0,0,7);c.fill();}
 else if(t>tGrab&&t<tChew){c.arc(x,y+60,26,0.1*Math.PI,0.9*Math.PI);c.stroke();}
 else if(t>tBroke){c.arc(x,y+78,22,1.15*Math.PI,1.85*Math.PI);c.stroke();}
 else{c.arc(x,y+62,30,0.1*Math.PI,0.9*Math.PI);c.stroke();}
}
function pepper(c,t,h){
 const x=810,y=840+Math.sin(t*1.7)*3;
 const wag=Math.sin(t*(t>tPlan?5:2))*0.25;
 // tail
 c.strokeStyle='#e8851f';c.lineWidth=40;c.lineCap='round';c.beginPath();c.moveTo(x+110,1020);c.bezierCurveTo(x+210,1000,x+210+wag*120,880,x+150+wag*160,800);c.stroke();
 // body
 c.fillStyle='#f0922b';c.beginPath();c.ellipse(x,1030,130,170,0,0,7);c.fill();
 arm(c,x-70,1000,x-60,1135,44,'#f0922b');circ(c,x-60,1135,32,'#f0922b');
 arm(c,x-40,1010,h.px,h.py,44,'#f0922b');circ(c,h.px,h.py,32,'#f6a54a');
 // ears + head
 tri(c,x-100,y-60,x-70,y-185,x-20,y-95,'#f0922b');tri(c,x+100,y-60,x+70,y-185,x+20,y-95,'#f0922b');
 tri(c,x-85,y-85,x-68,y-150,x-40,y-100,'#f7b7b0');tri(c,x+85,y-85,x+68,y-150,x+40,y-100,'#f7b7b0');
 c.fillStyle='#f0922b';c.beginPath();c.ellipse(x,y,118,102,0,0,7);c.fill();
 c.strokeStyle='#d9741a';c.lineWidth=9;[-28,0,28].forEach(d=>{c.beginPath();c.moveTo(x+d,y-100);c.lineTo(x+d*0.8,y-62);c.stroke();});
 // eyes
 const narrow=k(t,[[tPlan-0.3,0],[tPlan+0.5,0.55]])*(t<tDead?1:0)+(t>=tDead?0.35:0);
 const lx=k(t,[[tDead-0.4,-3],[tDead,-16]]);
 [-1,1].forEach(s=>{const ex=x+s*46,ey=y-8;c.fillStyle='#b6e36a';c.beginPath();c.ellipse(ex,ey,30,(34-narrow*18)*blink(t+1),0,0,7);c.fill();
  c.fillStyle='#111';c.beginPath();c.ellipse(ex+lx,ey,t>=tDead?5:9,(30-narrow*16)*blink(t+1),0,0,7);c.fill();
  c.strokeStyle='#8a4a10';c.lineWidth=9;c.lineCap='round';c.beginPath();c.moveTo(ex-28,ey-44+narrow*26*(s));c.lineTo(ex+28,ey-44-narrow*26*(s));c.stroke();});
 tri(c,x-12,y+22,x+12,y+22,x,y+38,'#e05a6b');
 c.strokeStyle='#5a2d0c';c.lineWidth=5;c.beginPath();c.moveTo(x,y+38);c.quadraticCurveTo(x-16,y+62,x-34,y+50);c.moveTo(x,y+38);c.quadraticCurveTo(x+16,y+62,x+34,y+50);c.stroke();
 c.strokeStyle='rgba(60,30,10,.7)';c.lineWidth=4;[-1,1].forEach(s=>{[0,14,28].forEach(d=>{c.beginPath();c.moveTo(x+s*50,y+36+d*0.4);c.lineTo(x+s*130,y+26+d);c.stroke();});});
 if(t>tBreak){circ(c,x+84,y+52,7,'#3b2314');}
}
function biscuit(c,t,h){
 const appear=outBack((t-0.05)/0.45);const bounce=1+0.12*Math.max(0,Math.sin(clamp((t-tBis)/0.4)*Math.PI));
 const split=ease((t-tBroke)/0.35);
 c.save();c.translate(BX,BY);c.scale(appear*bounce,appear*bounce);
 if(t<tBroke){ // whole biscuit: chips only on the right rim
  circ(c,0,0,70,'#d9a75a');c.lineWidth=7;c.strokeStyle='#b9823a';c.beginPath();c.arc(0,0,66,0,7);c.stroke();[[44,-30],[52,2],[42,34],[58,-52],[60,40],[38,-6]].forEach(p=>circ(c,p[0],p[1],8,'#3b2314'));
 } else {
  // big half
  c.save();let bx=-30*split,by=0,rot=-0.12*split;
  if(t>tGrab-0.4){bx=h.mx-BX;by=h.my-BY;rot=-0.1;}
  if(t>tChew-0.2){c.globalAlpha=1-clamp((t-tChew+0.2)/0.4);}
  c.translate(bx,by);c.rotate(rot);bigPiece(c);c.restore();
  // crumb
  c.save();let cx=40*split,cy=-10*split,r2=0.18*split;
  if(t>tTook-0.4){cx=h.px-BX;cy=h.py-BY;r2=0.1;}
  if(t>tDead+0.3){c.globalAlpha=1-clamp((t-tDead-0.3)/0.5);}
  c.translate(cx,cy);c.rotate(r2);crumbPiece(c);c.restore();
 }
 c.restore();
 // crack sparks
 const sp=clamp((t-tBroke)/0.5);if(sp>0&&sp<1){c.save();c.translate(BX,BY);for(let i=0;i<8;i++){const an=i*0.785,r=40+sp*70;circ(c,Math.cos(an)*r,Math.sin(an)*r,6*(1-sp),'#ffe08a');}c.restore();}
}
function room(c,t){
 const g=c.createLinearGradient(0,0,0,1920);g.addColorStop(0,'#f6e3c4');g.addColorStop(0.6,'#f0d3a6');g.addColorStop(1,'#d9b27c');c.fillStyle=g;c.fillRect(-300,-300,1680,2520);
 c.fillStyle='#e9c995';c.fillRect(-300,1000,1680,40); // wall trim
 // window
 c.fillStyle='#bfe6f5';c.fillRect(380,230,320,360);c.strokeStyle='#fff';c.lineWidth=14;c.strokeRect(380,230,320,360);c.beginPath();c.moveTo(540,230);c.lineTo(540,590);c.moveTo(380,410);c.lineTo(700,410);c.stroke();
 // table
 c.fillStyle='#b9743c';c.fillRect(-300,1100,1680,60);c.fillStyle='#8f5428';c.fillRect(-300,1160,1680,900);
 c.fillStyle='rgba(255,255,255,.55)';c.beginPath();c.ellipse(BX,1095,120,18,0,0,7);c.fill();
}
return {cues,
 cam(t){ // wide -> push to biscuit on split -> cat on 'dead' -> wide for payoff
  const z=1.3*k(t,[[0,1],[tBroke-0.6,1],[tBroke,1.35],[tGrab-0.2,1.35],[tGrab+0.3,1.05],[tDead-0.5,1.05],[tDead+0.1,1.7],[tDead+1.4,1.7],[tChew-0.3,1.0],[tChew+0.5,1.0]]);
  const x=k(t,[[0,540],[tBroke-0.6,540],[tBroke,540],[tGrab+0.3,540],[tDead-0.5,540],[tDead+0.1,790],[tDead+1.4,790],[tChew-0.3,540]]);
  const y=k(t,[[0,900],[tBroke-0.6,900],[tBroke,990],[tGrab-0.2,990],[tGrab+0.3,900],[tDead-0.5,900],[tDead+0.1,830],[tDead+1.4,830],[tChew-0.3,900]]);
  const [sx,sy]=a.shake(t,(t>tBroke&&t<tBroke+0.25)?14:0);return {x:x+sx,y:y+sy,z};},
 draw(c,t){const h=hands(t);room(c,t);maya(c,t,h);pepper(c,t,h);biscuit(c,t,h);} };
};
