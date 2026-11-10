window.SCENE=function(a){
const {k,ease,outBack,clamp,W,E,shake}=a;const K=window.KIT;const {circ,ell,rr,tri,burst,person,stamp}=K;
const tBos=W('boston'),tNine=W('nineteen',0),tRum=W('rumbles'),tThirty=W('thirty'),tFeet=W('feet'),tTw=W('twist'),tMol=W('molasses',0),tMil=W('million'),tDied=W('died'),tHund=W('hundred',0),tWild=W('wild'),tBoat=W('boat'),tHarb=W('harbour'),tAna=W('anarchists'),tCourt=W('court'),tPaid=W('paid'),tSend=W('send'),tEnd=E('boring')+0.3;
const emph=[tBos,tNine,tRum,tThirty,tFeet,tTw,tMol,tMil,tDied,tHund,tWild,tBoat,tHarb,tAna,tCourt,tPaid,tSend];
const pulse=t=>{let m=0;for(const e of emph){const d=t-e;if(d>=0&&d<0.25)m=Math.max(m,Math.pow(1-d/0.25,2));}return m*0.07;};
const cues=[{t:0.05,sfx:'pop',gain:0.7},{t:tRum-0.2,sfx:'rise',gain:0.9},{t:tRum,sfx:'thud',gain:1},{t:tThirty,sfx:'whoosh',gain:1},{t:tTw,sfx:'chime',gain:1},{t:tMil,sfx:'thud',gain:0.9},{t:tDied,sfx:'tick',gain:0.6},{t:tBoat,sfx:'whoosh',gain:0.8},{t:tAna,sfx:'click',gain:0.8},{t:tCourt,sfx:'thud',gain:1},{t:tPaid,sfx:'chime',gain:0.9},{t:tSend,sfx:'pop',gain:0.8}];
const GY=1400;
function street(c,t){const tone=clamp((t-tRum)/1.2);const g=c.createLinearGradient(0,0,0,1920);g.addColorStop(0,`rgb(${214-tone*60|0},${190-tone*70|0},${150-tone*60|0})`);g.addColorStop(1,'#a98c66');c.fillStyle=g;c.fillRect(-300,-300,1680,2520);
 [[60,300,'#8c6f55'],[330,420,'#7a5f48'],[640,360,'#8c6f55'],[900,300,'#7a5f48']].forEach(([x,h,col])=>{rr(c,x,GY-h-260,240,h+260,6,col);for(let i=0;i<3;i++)for(let j=0;j<4;j++)rr(c,x+24+i*70,GY-h-230+j*90,40,56,4,'#e9d8a6');});
 rr(c,-300,GY,1680,600,0,'#6e5a46');rr(c,-300,GY+20,1680,10,0,'#8a7560');
 // tank at left
 rr(c,-200,GY-760,330,760,12,'#9aa0a6');for(let i=0;i<5;i++)rr(c,-200,GY-700+i*140,330,10,2,'#6b7075');c.fillStyle='#4b3a22';c.font='bold 40px sans-serif';c.textAlign='left';c.fillText('PURITY',-170,GY-300);}
function wave(c,t){if(t<tRum-0.2)return;const u=clamp((t-tRum)/2.6);const x=-420+u*1500;const h=(t>=tTw?330:260)+Math.sin(t*5)*10;const body=t>=tTw?'#5a3416':'#6f6a64';const col2=t>=tTw?'#7a4a22':'#8a857e';c.save();c.beginPath();c.moveTo(x-700,GY);c.lineTo(x-700,GY-80);c.bezierCurveTo(x-420,GY-120,x-250,GY-h*0.7,x-60,GY-h);c.bezierCurveTo(x+40,GY-h-40,x+110,GY-h*0.6,x+160,GY-h*0.2);c.lineTo(x+170,GY);c.closePath();c.fillStyle=body;c.fill();c.beginPath();c.moveTo(x-300,GY-190);c.bezierCurveTo(x-200,GY-h*0.8,x-120,GY-h*0.95,x-60,GY-h+10);c.lineTo(x-40,GY-h+40);c.bezierCurveTo(x-120,GY-h*0.7,x-200,GY-160,x-300,GY-140);c.fillStyle=col2;c.fill();c.restore();
 if(t>=tTw)burst(c,'MOLASSES',x-120,GY-h-60,tTw+0.0,t,'#ffd23f',100);}
function cleanup(c,t){if(t<tWild)return;const s=outBack((t-tWild)/0.4);rr(c,-300,1500,1680,500,0,'#3b6ea5');rr(c,-300,1500,1680,70,0,'#5a3416');c.save();c.translate(560,1380);c.scale(s,s);rr(c,-210,0,420,90,24,'#c0392b');rr(c,-80,-70,160,70,10,'#e8e8e8');rr(c,100,-120,16,120,4,'#444');
 if(t>=tBoat){c.strokeStyle='#9fd8ff';c.lineWidth=14;for(let i=0;i<3;i++){c.beginPath();c.moveTo(116,-110);c.quadraticCurveTo(300,-260-i*40+Math.sin(t*9+i)*14,420,-20+i*10);c.stroke();}}c.restore();}
function card(c,txt,sub,x,y,t0,t,col){if(t<t0||t>t0+3.2)return;const s=outBack((t-t0)/0.4);c.save();c.translate(x,y);c.scale(s,s);rr(c,-360,-90,720,180,24,col);c.fillStyle='#fff';c.textAlign='center';c.font='bold 80px sans-serif';c.fillText(txt,0,16);c.font='bold 36px sans-serif';c.fillText(sub,0,64);c.restore();}
return {cues,
 fx(t){let f=0;for(const e of [tRum,tTw,tCourt,tPaid]){const d=t-e;if(d>=0&&d<0.14)f=Math.max(f,0.8*(1-d/0.14));}return{flash:f,lines:(t>tThirty&&t<tThirty+0.6)?0.5:0};},
 cam(t){const z=k(t,[[0,1.0],[tRum,1.0],[tThirty,1.12],[tTw+1.0,1.12],[tMil,1.0],[tEnd,1.0]]);const sh=(t>tRum&&t<tTw)?10:0;const [sx,sy]=shake(t,sh);return{x:540+sx,y:960+sy,z:z*(1+pulse(t))};},
 draw(c,t){street(c,t);
  const run=t>tRum+0.4&&t<tTw+1.4;
  const px=run?k(t,[[tRum+0.4,760],[tTw+1.2,900]]):760;
  person(c,t,{x:px,y:1130,skin:'#e0ac86',shirt:'#6b4a2f',hair:'#3a2a1a',cap:true,mouth:t<tRum?'smile':(t<tTw?'o':(t<tMil?'o':'flat')),look:-3,sweat:t>tRum&&t<tTw+2});
  wave(c,t);cleanup(c,t);
  stamp(c,'35 MPH',560,520,tThirty+0.1,t,'#e63946',110);
  card(c,'2.3 MILLION','US GALLONS OF MOLASSES',540,520,tMil,t,'rgba(90,52,22,.95)');
  card(c,'21 LIVES LOST','ABOUT 150 INJURED',540,520,tDied,t,'rgba(40,40,50,.95)');
  burst(c,'PLOT TWIST!',540,460,tTw+0.05,t,'#ffd23f',100);
  card(c,'$628,000','DAMAGES PAID',540,520,tPaid,t,'rgba(42,157,143,.95)');
  burst(c,'COURT SAYS NO',540,560,tCourt,t,'#b6e36a',90);
 }};
};
