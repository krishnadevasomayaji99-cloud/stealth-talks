window.SCENE=function(a){
const {k,ease,outBack,clamp,W,E}=a;const K=window.KIT;const {circ,ell,rr,tri,burst,person,confetti,stamp}=K;
const tLock=W('locking'),tDr=W('drawer'),tM=[0,1,2,3].map(i=>W('minute',i)),tWater=W('water'),tReorg=W('reorganising'),tVid=W('video'),tHour=W('hour'),tZero=W('zero'),tTwist=W('twist'),tTom=W('tomato'),tTwenty=W('twenty'),tTries=W('tries'),tAct=W('actually'),tEnd=E('locked',1)+0.3;
const emph=[tLock,tDr,...tM,tWater,tReorg,tVid,tHour,tZero,tTwist,tTom,tTwenty,tTries,tAct];
const pulse=t=>{let m=0;for(const e of emph){const d=t-e;if(d>=0&&d<0.25)m=Math.max(m,Math.pow(1-d/0.25,2));}return m*0.07;};
const cues=[{t:0.05,sfx:'pop',gain:0.7},{t:tDr,sfx:'thud',gain:0.8},...tM.map(t=>({t,sfx:'tick',gain:0.8})),{t:tWater,sfx:'pop',gain:0.7},{t:tReorg,sfx:'whoosh',gain:0.7},{t:tVid,sfx:'click',gain:0.8},{t:tHour,sfx:'thud',gain:0.9},{t:tZero,sfx:'thud',gain:1},{t:tTwist,sfx:'rise',gain:0.9},{t:tTom,sfx:'chime',gain:1},{t:tTries,sfx:'click',gain:0.8},{t:tAct,sfx:'chime',gain:1}];
const DESK=1180;
function wall(c,t){const g=c.createLinearGradient(0,0,0,1920);g.addColorStop(0,'#2b2d5b');g.addColorStop(1,'#43467d');c.fillStyle=g;c.fillRect(-300,-300,1680,2520);
 rr(c,90,260,200,260,10,'#f6d365');c.fillStyle='rgba(255,255,255,.25)';c.fillRect(100,270,180,240);
 // clock
 circ(c,900,330,90,'#fff');const h=k(t,[[0,0],[tHour-0.1,0.3],[tHour+0.5,6.5],[tEnd,6.5]]);c.strokeStyle='#222';c.lineWidth=10;c.beginPath();c.moveTo(900,330);c.lineTo(900+Math.sin(h)*60,330-Math.cos(h)*60);c.stroke();c.beginPath();c.moveTo(900,330);c.lineTo(900+Math.sin(h*12)*38,330-Math.cos(h*12)*38);c.stroke();
 rr(c,-300,DESK+70,1680,800,0,'#3a2e2a');}
function desk(c,t){rr(c,-100,DESK,1280,70,10,'#c68b59');rr(c,40,DESK+70,26,360,0,'#a86f44');rr(c,1014,DESK+70,26,360,0,'#a86f44');
 // book
 if(t<tM[3]-0.2||t>tTries-0.2){const open=clamp((t-tM[0])/0.4);const bx=540;rr(c,bx-170,DESK-34,340,34,6,'#e63946');rr(c,bx-160,DESK-48,150,20,4,'#fff');rr(c,bx+10,DESK-48,150,20,4,'#fff');
  const pg=t>tTries?Math.floor(clamp((t-tTries)/(tEnd-tTries))*4):0;c.fillStyle='#333';c.font='bold 38px sans-serif';c.textAlign='center';if(t>tTries)c.fillText('p.'+(pg+1),bx,DESK-60);}
 // water
 if(t>tWater-0.3&&t<tReorg+0.3){const s=outBack((t-tWater+0.3)/0.4);c.save();c.translate(820,DESK);c.scale(s,s);rr(c,-30,-110,60,110,8,'rgba(150,220,255,.8)');rr(c,-26,-70,52,66,4,'#6fc3ff');c.restore();}
 // reorganise: colour blocks shuffle
 if(t>tReorg-0.2&&t<tVid+0.2){for(let i=0;i<5;i++){const ph=Math.sin(t*5+i*1.7)*180;rr(c,540+ph,DESK-60-(i%2)*20,80,60,8,['#ff6b6b','#ffd23f','#6fc3ff','#9b5de5','#2ec4b6'][i]);}}
 // laptop video
 if(t>tVid-0.1&&t<tHour+0.2){rr(c,380,DESK-250,320,220,10,'#1d1d1d');rr(c,392,DESK-238,296,180,6,'#111');const pu=0.5+0.5*Math.sin(t*6);tri(c,520,DESK-190,520,DESK-130,570,DESK-160,`rgba(255,255,255,${0.6+0.4*pu})`);rr(c,320,DESK-34,440,16,8,'#2a2a2a');}
 // timetable
 if(t>tHour+0.1&&t<tTwist-0.1){const s=outBack((t-tHour-0.1)/0.4);c.save();c.translate(540,DESK-260);c.scale(s,s);rr(c,-260,-170,520,340,14,'#fff');const cols=['#ff6b6b','#ffd23f','#6fc3ff','#9b5de5','#2ec4b6','#ff9f1c'];for(let r=0;r<4;r++)for(let q=0;q<5;q++)rr(c,-235+q*95,-145+r*75,85,65,8,cols[(r*5+q)%6]);c.restore();}
 // tomato timer
 if(t>tTom-0.2){const s=outBack((t-tTom+0.2)/0.4);const wob=t>tTwenty?Math.sin(t*30)*0.05:0;c.save();c.translate(840,DESK-70);c.rotate(wob);c.scale(s,s);circ(c,0,0,70,'#e63946');tri(c,-24,-62,0,-98,24,-62,'#2a9d44');tri(c,-34,-50,-30,-78,-8,-58,'#2a9d44');tri(c,34,-50,30,-78,8,-58,'#2a9d44');c.fillStyle='#fff';c.fillRect(-4,-4,4,-36);c.font='bold 32px sans-serif';c.textAlign='center';c.fillStyle='#fff';c.fillText('25',0,12);c.restore();}
 // phone drawer
 if(t>tDr-0.3&&t<tDr+0.6){const u=clamp((t-tDr+0.3)/0.4);rr(c,950-30*u,DESK+86,160,50,6,'#8a5a3a');rr(c,960-30*u,DESK+70-60*(1-u)+0,50,90,8,'#222');}
}
return {cues,
 fx(t){let f=0;for(const e of [tTwist,tZero,tAct]){const d=t-e;if(d>=0&&d<0.14)f=Math.max(f,0.85*(1-d/0.14));}return{flash:f,lines:(t>tTwist-0.4&&t<tTwist+0.2)?0.5:0};},
 cam(t){const z=k(t,[[0,1.12],[tHour,1.12],[tHour+0.4,1.3],[tZero+0.5,1.3],[tTom-0.2,1.12],[tEnd,1.2]]);const x=k(t,[[0,540],[tEnd,540]]);const y=k(t,[[0,900],[tHour,900],[tZero,930],[tTom,900],[tEnd,880]]);
  const [sx,sy]=a.shake(t,(t>tZero&&t<tZero+0.2)?12:0);return{x:x+sx,y:y+sy,z:z*(1+pulse(t)+0.012*Math.sin(t*1.3))};},
 draw(c,t){wall(c,t);
  let mouth='flat',brow=0,sweat=false,look=0,handR=[640,DESK-10],handL=[430,DESK-10],bags=false;
  if(t<tDr)mouth='grin';
  if(t>=tM[1]&&t<tM[2]){look=2;}
  if(t>=tM[2]&&t<tVid){look=-2;}
  if(t>=tVid&&t<tHour){mouth='o';look=0;}
  if(t>=tHour&&t<tTwist){mouth='sad';sweat=true;bags=true;}
  if(t>=tTwist&&t<tTries){mouth='flat';}
  if(t>=tTries){mouth='grin';sweat=false;bags=false;}
  const bob=t>=tTries?Math.sin(t*7)*8:Math.sin(t*2)*3;
  person(c,t,{x:540,y:1000+bob,skin:'#8d5a3b',shirt:'#ff7f50',hair:'#1b1b1b',mouth,look,handR,handL,sweat,bags,cap:false});
  desk(c,t);
  burst(c,'LOCKED IN',540,520,tLock,t,'#b6e36a',100);
  stamp(c,'ZERO PAGES',540,720,tZero+0.1,t,'#e63946',95);
  burst(c,'PLOT TWIST!',540,520,tTwist,t,'#ffd23f',105);
  confetti(c,t,540,500,tAct,60);burst(c,'ACTUALLY LOCKED IN',540,560,tAct,t,'#b6e36a',80);
 }};
};
