window.SCENE=function(a){
const {k,ease,outBack,clamp,W,E,shake}=a;const K=window.KIT;const {circ,ell,rr,tri,burst,person,stamp}=K;
const tAl=W('alarm'),tPro=W('professional'),tL=[1,2,3,4].map(i=>W('level',i)),tPress=W('press',0),tNeg=W('negotiating'),tThrow=W('throws'),tCrawl=W('crawls'),tCeil=W('ceiling'),tTw=W('twist'),tGear=W('gears'),tDeep=W('deep'),tHears=W('hears'),tPresses=W('presses'),tSend=W('send'),tEnd=E('snoozes')+0.3;
const emph=[tAl,tPro,...tL,tPress,tNeg,tThrow,tCrawl,tCeil,tTw,tGear,tDeep,tHears,tPresses,tSend];
const pulse=t=>{let m=0;for(const e of emph){const d=t-e;if(d>=0&&d<0.25)m=Math.max(m,Math.pow(1-d/0.25,2));}return m*0.07;};
const cues=[{t:0.05,sfx:'pop',gain:0.7},{t:tAl,sfx:'tick',gain:1},{t:tAl+0.4,sfx:'tick',gain:0.8},...tL.map(t=>({t,sfx:'whoosh',gain:0.7})),{t:tPress,sfx:'click',gain:0.9},{t:tThrow,sfx:'whoosh',gain:1},{t:tThrow+0.6,sfx:'thud',gain:0.9},{t:tTw-0.5,sfx:'rise',gain:0.8},{t:tTw,sfx:'chime',gain:1},{t:tGear,sfx:'tick',gain:0.8},{t:tPresses,sfx:'click',gain:1},{t:tSend,sfx:'pop',gain:0.8}];
function gear(c,x,y,r,teeth,rot,col){c.save();c.translate(x,y);c.rotate(rot);for(let i=0;i<teeth;i++){c.save();c.rotate(i*2*Math.PI/teeth);rr(c,-r*0.16,-r*1.18,r*0.32,r*0.4,4,col);c.restore();}circ(c,0,0,r,col);circ(c,0,0,r*0.35,'#222');c.restore();}
function timeStr(t){const m=t<tL[0]?0:t<tL[1]?9:t<tL[2]?18:t<tL[3]?27:t<tHears?36:45;return '6:'+(m<10?'0'+m:m);}
function room(c,t){const lit=clamp((t-tL[3])/8);const g=c.createLinearGradient(0,0,0,1920);g.addColorStop(0,`rgb(${60+lit*150|0},${55+lit*140|0},${110+lit*80|0})`);g.addColorStop(1,'#5a4a7a');c.fillStyle=g;c.fillRect(-300,-300,1680,2520);
 rr(c,640,260,300,360,14,'#1a1030');circ(c,790,430,60,lit>0.5?'#ffd23f':'#e8e8ff');
 rr(c,-300,1180,1680,740,0,'#3b2a52');}
function clock(c,t){const ring=(t>tAl&&t<tL[0])||((t>tL[0]&&t<tL[0]+9)&&false);const sh=(t<tL[0]&&t>tAl)?Math.sin(t*50)*5:0;c.save();c.translate(830+sh,1050);rr(c,-150,-80,300,160,20,'#111');c.fillStyle='#ff3b3b';c.font='bold 100px monospace';c.textAlign='center';c.fillText(timeStr(t),0,34);
 if(t<tL[0]&&t>tAl){circ(c,-130,-95,18,'#ffd23f');circ(c,130,-95,18,'#ffd23f');}c.restore();rr(c,680,1120,300,70,10,'#6b4a2f');rr(c,700,1190,40,300,6,'#6b4a2f');rr(c,920,1190,40,300,6,'#6b4a2f');}
function bed(c){rr(c,-100,1240,760,70,10,'#7a5a3a');rr(c,-100,1300,60,220,6,'#5e452e');rr(c,560,1300,60,220,6,'#5e452e');}
function blanket(c){rr(c,-80,1240,720,200,40,'#6fa8dc');rr(c,-80,1240,720,50,20,'#8ec0ee');}
return {cues,
 fx(t){let f=0;for(const e of [tTw,tPresses]){const d=t-e;if(d>=0&&d<0.14)f=Math.max(f,0.85*(1-d/0.14));}return{flash:f,lines:(t>tThrow&&t<tThrow+0.5)?0.5:0};},
 cam(t){const z=k(t,[[0,1.05],[tTw-0.4,1.05],[tTw,1.2],[tDeep+1.2,1.2],[tHears,1.05],[tEnd,1.05]]);const x=k(t,[[0,540],[tTw-0.4,540],[tTw,760],[tDeep+1.2,760],[tHears,540],[tEnd,540]]);const y=k(t,[[0,980],[tTw,980],[tTw+0.4,880],[tDeep+1.2,880],[tHears,980]]);
  const [sx,sy]=shake(t,(t>tThrow+0.55&&t<tThrow+0.75)?14:0);return{x:x+sx,y:y+sy,z:z*(1+pulse(t))};},
 draw(c,t){room(c,t);bed(c);
  let mouth='o',sweat=false,bags=false,look=0,py=1060;
  if(t>=tPro)mouth='smile';
  if(t>=tL[1]&&t<tL[2])mouth='flat';
  if(t>=tL[2]&&t<tL[3]){mouth='o';sweat=true;}
  if(t>=tL[3]&&t<tTw){mouth='flat';bags=true;look=-3;}
  if(t>=tTw&&t<tHears){mouth='o';bags=true;}
  if(t>=tHears){mouth='grin';bags=true;}
  const px=k(t,[[0,330],[tCrawl-0.1,330],[tCrawl+0.6,110],[tCrawl+1.3,330]]);
  person(c,t,{x:px,y:py+Math.sin(t*2)*3,skin:'#e0ac86',shirt:'#f4d35e',hair:'#2b1b12',mouth,look,sweat,bags,handR:[px+80,1240],handL:[px-80,1240]});
  blanket(c);clock(c,t);
  if(t>=tThrow&&t<tThrow+0.7){const u=clamp((t-tThrow)/0.6);const x=430-560*u,y=1100-Math.sin(Math.PI*u)*300;c.save();c.translate(x,y);c.rotate(u*12);rr(c,-30,-55,60,110,10,'#222');rr(c,-24,-48,48,80,6,'#4cc9f0');c.restore();}
  if(t>=tTw){const u=outBack((t-tTw)/0.4);c.save();c.translate(540,640);c.scale(u,u);rr(c,-340,-230,680,460,30,'rgba(20,16,40,.92)');const r=t*1.2;gear(c,-130,-20,110,12,r,'#ffd23f');gear(c,100,-70,70,8,-r*1.57,'#6fc3ff');gear(c,190,70,50,6,r*2.2,'#ff6b6b');c.fillStyle='#fff';c.font='bold 64px sans-serif';c.textAlign='center';c.fillText('9 MIN',0,190);c.restore();}
  stamp(c,'LEVEL 1',540,520,tL[0]+0.05,t,'#4cc9f0',100);stamp(c,'LEVEL 2',540,520,tL[1]+0.05,t,'#ffd23f',100);stamp(c,'LEVEL 3',540,520,tL[2]+0.05,t,'#ff9f1c',100);stamp(c,'LEVEL 4',540,520,tL[3]+0.05,t,'#e63946',100);
  burst(c,'BRRRING!',320,600,tAl,t,'#ffd23f',120);burst(c,'WHOOSH',380,700,tThrow,t,'#6fc3ff',100);burst(c,'PLOT TWIST!',540,500,tTw,t,'#ffd23f',110);burst(c,'SNOOZE',540,600,tPresses,t,'#b6e36a',130);
 }};
};
