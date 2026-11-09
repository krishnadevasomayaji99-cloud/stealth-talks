window.SCENE=function(a){
const {k,ease,outBack,clamp,W,E}=a;const K=window.KIT;const {circ,ell,rr,tri,burst,person,cat,confetti,stamp}=K;
const tA=[0,1,2,3,4].map(i=>W('attempt',i)),tYes=W('yes'),tTin=W('opens'),tTwist=W('twist'),tRai=W('raisins'),tDown=W('downstairs'),tReal=W('real'),tHad=W('had'),tAgain=W('again'),tEnd=E('again')+0.2;
const emph=[W('goal'),W('shelf',0),...tA,tYes,tTin,tTwist,tRai,tDown,tReal,tHad,tAgain];
const pulse=t=>{let m=0;for(const e of emph){const d=t-e;if(d>=0&&d<0.25)m=Math.max(m,Math.pow(1-d/0.25,2));}return m*0.07;};
const nT=i=>(i<4?tA[i+1]:tYes)-0.5; // end of attempt i
const cues=[{t:0.05,sfx:'pop',gain:0.7},...tA.map(t=>({t,sfx:'whoosh',gain:0.7})),...[0,1,2,3].map(i=>({t:nT(i)+0.1,sfx:'thud',gain:0.9})),{t:tYes-0.6,sfx:'rise',gain:0.8},{t:tYes,sfx:'chime',gain:1},{t:tTin,sfx:'click',gain:0.9},{t:tTwist,sfx:'click',gain:1},{t:tRai,sfx:'thud',gain:1},{t:tDown,sfx:'whoosh',gain:0.6},{t:tEnd-0.6,sfx:'pop',gain:0.7}];
const FLOOR=1350,BX=700,HY=990,SH=560;
function pos(t){ // cat head position and pose
 let x=BX,y=HY,rot=0,sx=1,sy=1,mood='focus',look=-4;
 const a0=tA[0],e0=nT(0),a1=tA[1],e1=nT(1),a2=tA[2],e2=nT(2),a3=tA[3],e3=nT(3),a4=tA[4];
 if(t>=a0&&t<e0+0.5){const u=clamp((t-a0)/(e0-a0));y=HY-170*Math.sin(Math.PI*u);if(u>=1)mood='dizzy';}
 else if(t>=a1&&t<e1+0.6){const ju=clamp((t-a1-0.4)/0.5);const chairY=890;y=chairY-(ju<1?190*Math.sin(Math.PI*ju/1.0*0.5)*1:190);
  if(t>=a1+0.9){const v=clamp((t-a1-0.9)/(e1+0.5-a1-0.9));y=700+190*ease(v);sy=0.88;mood='dizzy';}
  else if(t<a1+0.4)y=chairY;}
 else if(t>=a2&&t<e2+0.6){const topY=670;const ang=k(t,[[a2,0],[a2+1.6,0],[a2+2.2,1.35]]);
  const dx=Math.sin(ang)*(FLOOR-topY),dy=(FLOOR-topY)*(1-Math.cos(ang));x=BX+dx;y=topY+dy+(ang>0.6?(ang-0.6)*160:0);rot=ang;mood=ang>0.2?'horror':'focus';if(t>a2+2.2){x=BX+dx;y=Math.min(HY,y);}}
 else if(t>=a3&&t<e3+0.7){const u=clamp((t-a3-0.6)/0.9);x=200+560*ease(u);y=HY-Math.abs(Math.sin(u*14))*40;if(u>=1){sx=0.6;sy=1.1;mood='dizzy';x=760-30*clamp((t-a3-1.5)/0.6);}}
 else if(t>=a4&&t<tYes-0.5){const w=Math.sin((t-a4)*18);const wig=clamp((t-a4-0.8)/0.3);rot=0.07*w*wig;sy=1-0.04*Math.abs(w)*wig;mood='focus';}
 else if(t>=tYes-0.5&&t<tYes+0.25){const u=clamp((t-tYes+0.5)/0.75);x=BX+90*ease(u);y=HY+(200-HY)*ease(u)-260*Math.sin(Math.PI*u);mood='focus';}
 else if(t>=tYes+0.25){x=BX+90;y=200;mood=t>=tRai?'horror':(t>tYes+1.2?'happy':'smug');if(t>=tHad)mood='horror';}
 return {x,y,rot,sx,sy,mood,look};
}
function room(c,t,sh){
 const g=c.createLinearGradient(0,0,0,1920);g.addColorStop(0,'#d8f0e0');g.addColorStop(1,'#b9dcc8');c.fillStyle=g;c.fillRect(-300,-300,1680,2520);
 // window
 rr(c,120,300,230,260,10,'#bfe6f5');c.strokeStyle='#fff';c.lineWidth=12;c.strokeRect(120,300,230,260);c.beginPath();c.moveTo(235,300);c.lineTo(235,560);c.stroke();
 // cupboard (target of the running start)
 rr(c,850,820,260,520,10,'#c7a27c');rr(c,870,850,220,230,8,'#d9b890');rr(c,870,1100,220,220,8,'#d9b890');
 if(t>tA[3]+1.3&&t<tA[3]+2.2){const rt=Math.sin(t*60)*4;for(let i=0;i<3;i++)ell(c,930+i*55,1000+rt*(i%2?1:-1),24,6,'#fff');}
 // floor
 rr(c,-300,FLOOR,1680,700,0,'#c9965f');c.fillStyle='rgba(0,0,0,0.08)';c.fillRect(-300,FLOOR,1680,18);
 // shelf + tin
 rr(c,560,SH,430,26,6,'#8f5a2e');tri(c,600,SH+26,600,SH+110,690,SH+26,'#7a4a24');tri(c,950,SH+26,950,SH+110,860,SH+26,'#7a4a24');
}
function tin(c,t){const x=930,y=SH;const open=clamp((t-tTin)/0.4);rr(c,x-62,y-92,124,92,10,'#d94a4a');rr(c,x-62,y-70,124,16,0,'#fff3c4');
 if(t>=tTin){c.save();c.translate(x-62,y-92);c.rotate(-1.2*ease(open));rr(c,0,-14,124,18,8,'#b83a3a');c.restore();
  if(open>0.5){for(let i=0;i<9;i++)circ(c,x-46+i*11,y-100+(i%2)*6,8,'#5b3a6a');}}
 else rr(c,x-68,y-106,136,18,8,'#b83a3a');}
function chair(c,t){const a=tA[1];if(t<a-0.3||t>nT(1)+0.8)return;const s=outBack((t-(a-0.3))/0.3);c.save();c.translate(BX,FLOOR);c.scale(s,s);rr(c,-120,-100,240,26,6,'#8a5a3a');rr(c,-110,-74,14,74,4,'#6e4529');rr(c,96,-74,14,74,4,'#6e4529');rr(c,70,-330,24,240,6,'#6e4529');c.restore();}
function tower(c,t){const a=tA[2];if(t<a-0.3||t>nT(2)+0.9)return;const s=outBack((t-(a-0.3))/0.3);const ang=k(t,[[a,0],[a+1.6,0],[a+2.2,1.35]]);c.save();c.translate(BX,FLOOR);c.rotate(ang);c.scale(s,s);['#e76f51','#2a9d8f','#e9c46a','#9b5de5'].forEach((col,i)=>{rr(c,-90,-80*(i+1),180,74,10,col);c.fillStyle='rgba(255,255,255,.35)';c.fillRect(-70,-80*(i+1)+14,140,10);});c.restore();}
return {cues,
 fx(t){let f=0;for(const e of [tYes,tTwist,tRai]){const d=t-e;if(d>=0&&d<0.14)f=Math.max(f,0.85*(1-d/0.14));}return{flash:f,lines:(t>tYes-0.5&&t<tYes+0.3)?0.5:0};},
 cam(t){
  const z=k(t,[[0,1.15],[tA[0]-0.2,1.15],[tYes-0.7,1.15],[tYes-0.2,1.25],[tTin-0.3,1.25],[tTin,1.6],[tRai+1.0,1.6],[tDown-0.2,1.15],[tEnd,1.15]]);
  const x=k(t,[[0,640],[tYes-0.7,700],[tTin-0.3,780],[tRai+1.0,860],[tDown,420],[tEnd,420]]);
  const y=k(t,[[0,860],[tYes-0.7,860],[tYes-0.2,560],[tTin-0.3,420],[tRai+1.0,380],[tDown-0.2,380],[tDown+0.5,1020],[tEnd,1020]]);
  const [sx,sy]=a.shake(t,((t>tA[3]+1.3&&t<tA[3]+1.6)||(t>nT(1)+0.0&&t<nT(1)+0.2))?14:0);return{x:x+sx,y:y+sy,z:z*(1+pulse(t)+0.012*Math.sin(t*1.3))};},
 draw(c,t){
  room(c,t);chair(c,t);tower(c,t);tin(c,t);
  const p=pos(t);const wag=Math.sin(t*(t>tYes?6:3))*0.3;
  cat(c,t,{x:p.x,y:p.y,rot:p.rot,sx:p.sx,sy:p.sy,mood:p.mood,wag,look:p.look,pawL:[p.x-60,p.y+300],pawR:[p.x+60,p.y+300]});
  // Maya downstairs eats a real biscuit
  if(t>=tDown-0.2){const s=outBack((t-tDown+0.2)/0.4);c.save();c.translate(260,0);c.scale(s,s);c.translate(-260,0);person(c,t,{x:260,y:1000,skin:'#f2c19b',shirt:'#2a9d8f',hair:'#4a2c1a',bun:true,mouth:Math.sin(t*9)>0?'grin':'smile',look:1,handR:[300,1090],handL:[150,1270]});circ(c,310,1085,34,'#d9a75a');[[300,1078],[318,1092],[304,1096]].forEach(q=>circ(c,q[0],q[1],6,'#3b2314'));c.restore();}
  stamp(c,'NO',BX,700,nT(0)+0.05,t,'#e63946',120);stamp(c,'ALSO NO',BX,700,nT(1)+0.05,t,'#e63946',90);stamp(c,'VERY NO',BX,700,nT(2)+0.05,t,'#e63946',90);stamp(c,'LESS NO',BX,700,nT(3)+0.05,t,'#e8851f',90);
  confetti(c,t,780,300,tYes,60);burst(c,'YES!',560,380,tYes,t,'#b6e36a',130);burst(c,'PLOT TWIST!',900,560,tTwist,t,'#ffd23f',105);burst(c,'RAISINS?!',720,380,tRai,t,'#d6a8ff',120);burst(c,'AGAIN?',420,820,tEnd-0.7,t,'#ffb3d1',120,1.4);
 }};
};
