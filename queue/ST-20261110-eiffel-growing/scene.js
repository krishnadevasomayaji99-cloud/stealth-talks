window.SCENE=function(a){
const {k,ease,outBack,clamp,W,E,shake}=a;const K=window.KIT;const {circ,ell,rr,tri,burst,person,stamp}=K;
const tBr=W('breaking'),tGrow=W('growing'),tPan=W('panicking'),tFif=W('fifteen'),tBaf=W('baffled',0),tTw=W('twist'),tWarm=W('warm'),tTon=W('tonnes'),tLean=W('leans'),tNight=W('night'),tDram=W('dramatic'),tSend=W('send'),tEnd=E('headlines')+0.3;
const emph=[tBr,tGrow,tPan,tFif,tBaf,tTw,tWarm,tTon,tLean,tNight,tDram,tSend];
const pulse=t=>{let m=0;for(const e of emph){const d=t-e;if(d>=0&&d<0.25)m=Math.max(m,Math.pow(1-d/0.25,2));}return m*0.07;};
const cues=[{t:0.05,sfx:'pop',gain:0.7},{t:tBr,sfx:'rise',gain:0.8},{t:tGrow,sfx:'thud',gain:0.9},{t:tFif,sfx:'whoosh',gain:0.8},{t:tTw,sfx:'chime',gain:1},{t:tTon,sfx:'thud',gain:0.9},{t:tLean,sfx:'tick',gain:0.8},{t:tNight,sfx:'chime',gain:0.7},{t:tDram,sfx:'pop',gain:0.8},{t:tSend,sfx:'pop',gain:0.8}];
const GY=1250;
function sky(c,t){const heat=clamp((t-tFif)/2)*(t<tNight?1:1-clamp((t-tNight)/1));const night=clamp((t-tNight)/0.8)*(t<tDram?1:1-clamp((t-tDram)/0.6));
 const g=c.createLinearGradient(0,0,0,1920);g.addColorStop(0,`rgb(${110+heat*120-night*90|0},${180-heat*20-night*120|0},${235-heat*110-night*140|0})`);g.addColorStop(1,`rgb(${200+heat*40-night*150|0},${225-heat*40-night*170|0},${255-heat*120-night*150|0})`);c.fillStyle=g;c.fillRect(-300,-300,1680,2520);
 const sx=860,sy=300;circ(c,sx,sy,100,night>0.5?'#e8e8ff':'#ffe27a');if(night<0.5)for(let i=0;i<12;i++){const a2=i*Math.PI/6+t*0.5;c.strokeStyle='#ffd23f';c.lineWidth=10;c.beginPath();c.moveTo(sx+Math.cos(a2)*130,sy+Math.sin(a2)*130);c.lineTo(sx+Math.cos(a2)*(170+heat*50),sy+Math.sin(a2)*(170+heat*50));c.stroke();}
 rr(c,-300,GY,1680,700,0,'#6a8f5c');rr(c,-300,GY+40,1680,20,0,'#b8a98a');return {heat,night};}
function tower(c,t,heat){const grow=1+(t>tGrow?0.05*clamp((t-tGrow)/1.5):0)*(1-0)+(t>tFif?0.04*clamp((t-tFif)/1.5)*heat:0);const lean=t>tLean?(t<tNight?0.04*clamp((t-tLean)/1):0.04*(1-clamp((t-tNight)/0.8))):0;
 c.save();c.translate(480,GY);c.rotate(-lean);c.scale(1,grow);c.fillStyle='#5b4a3c';c.beginPath();c.moveTo(-230,0);c.lineTo(-40,-700);c.lineTo(-14,-900);c.lineTo(0,-1010);c.lineTo(14,-900);c.lineTo(40,-700);c.lineTo(230,0);c.lineTo(150,0);c.lineTo(70,-300);c.lineTo(-70,-300);c.lineTo(-150,0);c.closePath();c.fill();
 c.strokeStyle='#8c7761';c.lineWidth=8;for(let i=0;i<6;i++){const y=-120-i*120,w=Math.max(18,200-i*34);c.beginPath();c.moveTo(-w,y);c.lineTo(w,y-90);c.moveTo(w,y);c.lineTo(-w,y-90);c.stroke();}c.restore();
 // ruler
 if(t>tFif-0.2&&t<tTw){const s=outBack((t-tFif+0.2)/0.3);c.save();c.translate(800,GY-950);c.scale(s,s);rr(c,-16,0,32,320,6,'#fff');for(let i=0;i<8;i++)rr(c,-16,i*40,i%2?18:32,4,2,'#333');rr(c,-30,10+clamp((t-tFif)/1.2)*40,60,14,4,'#e63946');c.fillStyle='#fff';c.font='bold 54px sans-serif';c.textAlign='center';c.fillText('+15 CM',0,370);c.restore();}}
function banner(c,t){if(t>tTw-0.1||t<tBr-0.2)return;const s=outBack((t-tBr+0.2)/0.3);c.save();c.translate(540,230);c.scale(s,s);rr(c,-470,-70,940,140,16,'#d62828');c.fillStyle='#fff';c.font='bold 64px sans-serif';c.textAlign='center';c.fillText('BREAKING NEWS',0,22);c.restore();}
function thermo(c,t){if(t<tWarm-0.2||t>tDram)return;const s=outBack((t-tWarm+0.2)/0.3);c.save();c.translate(930,GY-520);c.scale(s,s);rr(c,-24,-180,48,300,24,'#fff');rr(c,-14,-40-clamp((t-tWarm)/1)*120,28,160+clamp((t-tWarm)/1)*120,14,'#e63946');circ(c,0,130,46,'#e63946');c.restore();}
return {cues,
 fx(t){let f=0;for(const e of [tTw,tNight]){const d=t-e;if(d>=0&&d<0.14)f=Math.max(f,0.8*(1-d/0.14));}return{flash:f,lines:(t>tBr&&t<tBr+0.4)?0.5:0};},
 cam(t){const z=k(t,[[0,1.0],[tGrow,1.0],[tGrow+0.4,1.12],[tFif+1.5,1.12],[tTw,1.0],[tTon,1.0],[tEnd,1.0]]);const y=k(t,[[0,960],[tGrow+0.4,760],[tFif+1.5,760],[tTw,960]]);const [sx,sy]=shake(t,(t>tPan&&t<tFif)?8:0);return{x:540+sx,y:y+sy,z:z*(1+pulse(t))};},
 draw(c,t){const {heat}=sky(c,t);tower(c,t,heat);thermo(c,t);banner(c,t);
  let mouth='o';if(t>=tTw)mouth='smile';if(t>=tDram)mouth='grin';
  person(c,t,{x:620,y:1450,skin:'#d9a07a',shirt:'#2b4c7e',hair:'#222',mouth,look:-2,sweat:t<tTw&&t>tPan,handR:[720,1600],handL:[520,1600]});
  burst(c,'PANIC!',320,720,tPan,t,'#ff6b6b',110);burst(c,'BAFFLED?!',300,640,tBaf,t,'#ffd23f',90);burst(c,'PLOT TWIST!',540,520,tTw,t,'#ffd23f',110);
  stamp(c,'7,300 TONNES',540,420,tTon+0.05,t,'#6fc3ff',90);
  burst(c,'LEANING',300,560,tLean,t,'#b6e36a',90);burst(c,'DRAMATIC',540,520,tDram,t,'#ffb3d1',100);
 }};
};
