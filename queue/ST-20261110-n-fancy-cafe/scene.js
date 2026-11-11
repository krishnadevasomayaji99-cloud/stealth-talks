window.SCENE=function(a){
const {k,ease,outBack,clamp,W,E,shake}=a;const K=window.KIT;const {circ,ell,rr,tri,burst,person,stamp}=K;
const tCafe=W('cafe'),tOwns=W('owns'),tL=[0,1,2].map(i=>W('level',i)),tCross=W('crosses'),tOrders=W('orders'),tWifi=W('wifi'),tTw=W('twist'),tChair=W('chair'),tTable=W('table'),tFact=W('fact'),tCoffee=W('coffeehouse'),tPenny=W('penny'),tGets=W('gets'),tMenu=W('menu'),tSend=W('send'),tEnd=E('does')+0.3;
const emph=[tCafe,tOwns,...tL,tCross,tOrders,tWifi,tTw,tChair,tTable,tFact,tPenny,tGets,tMenu,tSend];
const pulse=t=>{let m=0;for(const e of emph){const d=t-e;if(d>=0&&d<0.25)m=Math.max(m,Math.pow(1-d/0.25,2));}return m*0.07;};
const cues=[{t:0.05,sfx:'pop',gain:0.7},{t:tOwns,sfx:'chime',gain:0.8},...tL.map(t=>({t,sfx:'whoosh',gain:0.7})),{t:tCross,sfx:'click',gain:0.8},{t:tWifi,sfx:'tick',gain:0.8},{t:tTw-0.5,sfx:'rise',gain:0.8},{t:tTw,sfx:'thud',gain:1},{t:tTable,sfx:'chime',gain:1},{t:tFact,sfx:'pop',gain:0.8},{t:tMenu,sfx:'click',gain:1},{t:tSend,sfx:'pop',gain:0.8}];
function cafe(c,t){const g=c.createLinearGradient(0,0,0,1920);g.addColorStop(0,'#f3e6d3');g.addColorStop(1,'#d9c3a5');c.fillStyle=g;c.fillRect(-300,-300,1680,2520);
 for(const x of [180,540,900]){rr(c,x-6,200,12,340,4,'#6b4a2f');circ(c,x,560,70,'#ffd98a');}
 rr(c,-300,1480,1680,600,0,'#8a6a4a');for(let i=0;i<8;i++)rr(c,-300+i*220,1480,8,600,0,'rgba(0,0,0,.12)');
 rr(c,60,300,420,300,16,'#3b2a1a');c.fillStyle='#f3e6d3';c.font='bold 70px sans-serif';c.textAlign='center';c.fillText('FANCY',270,420);c.fillText('CAFE',270,510);}
function chair(c,x,y){rr(c,x-90,y,180,40,10,'#2f2f2f');rr(c,x-90,y-170,30,170,8,'#2f2f2f');rr(c,x-80,y+40,24,230,6,'#2f2f2f');rr(c,x+56,y+40,24,230,6,'#2f2f2f');}
function block(c){rr(c,120,1290,440,300,14,'#fdfdfd');rr(c,120,1290,440,36,14,'#e4e4ea');rr(c,120,1560,440,30,8,'#cfcfd8');}
function cup(c,x,y){rr(c,x-34,y-60,68,60,10,'#fff');circ(c,x+40,y-30,18,'rgba(255,255,255,0)');c.strokeStyle='#fff';c.lineWidth=8;c.beginPath();c.arc(x+38,y-32,18,-1.2,1.2);c.stroke();rr(c,x-26,y-52,52,10,4,'#6b3f1d');}
return {cues,
 fx(t){let f=0;for(const e of [tTw,tTable,tMenu]){const d=t-e;if(d>=0&&d<0.14)f=Math.max(f,0.8*(1-d/0.14));}return{flash:f,lines:0};},
 cam(t){const z=k(t,[[0,1.05],[tTw-0.4,1.05],[tTw,1.18],[tFact-0.2,1.18],[tFact+0.4,1.05],[tEnd,1.05]]);const x=k(t,[[0,540],[tTw,540],[tTw+0.6,640],[tFact,640],[tFact+0.4,540]]);const y=k(t,[[0,980],[tEnd,980]]);
  const [sx,sy]=shake(t,(t>tTw&&t<tTw+0.25)?12:0);return{x:x+sx,y:y+sy,z:z*(1+pulse(t))};},
 draw(c,t){cafe(c,t);
  const mx=k(t,[[0,-200],[tOwns-0.3,340],[tGets,340],[tGets+0.7,860],[tMenu,860]]);
  const sitting=t<tGets;
  chair(c,860,1390);
  let mouth='smile',look=0,brow=0,sweat=false;
  if(t>=tL[1]&&t<tWifi)mouth='grin';
  if(t>=tWifi&&t<tTw)mouth='smile';
  if(t>=tTable&&t<tGets){mouth='o';sweat=true;brow=2;look=-3;}
  if(t>=tGets)mouth='grin';
  const my=sitting?k(t,[[0,900],[tOwns-0.3,900],[tOwns,990],[tGets,990]]):1000;
  if(t<tGets&&t>=tOwns)block(c);
  person(c,t,{x:mx,y:my+Math.sin(t*2)*3,skin:'#e0ac86',shirt:'#e76f51',hair:'#2b1b12',mouth,look,brow,sweat,handR:[mx+80,1240],handL:[mx-80,1240]});
  if(t<tGets&&t>=tOwns){rr(c,120,1290,440,36,14,'#e4e4ea');}
  if(t>=tGets){block(c);cup(c,420,1290);}
  if(t>=tTw){const wx=k(t,[[tTw,1400],[tTw+0.6,860]]);person(c,t,{x:wx,y:1010,skin:'#c68642',shirt:'#6a4c93',hair:'#1b1b1b',bun:true,mouth:'smile',handR:[wx+80,1300],handL:[wx-80,1300]});}
  if(t>=tMenu){const u=outBack(clamp((t-tMenu)/0.3));c.save();c.translate(860,1260);c.scale(u,u);rr(c,-70,-120,140,200,10,'#fff6e0');c.fillStyle='#8a3b2b';c.font='bold 36px sans-serif';c.textAlign='center';c.fillText('MENU',0,0);c.restore();}
  if(t>=tTable&&t<tGets){c.save();c.translate(340,1230);const u=outBack(clamp((t-tTable)/0.25));c.scale(u,u);c.fillStyle='#e63946';c.font='900 90px "DejaVu Sans", Arial';c.textAlign='center';c.fillText('TABLE',0,0);c.restore();}
  stamp(c,'LEVEL 1',540,620,tL[0]+0.05,t,'#4cc9f0',100);stamp(c,'LEVEL 2',540,620,tL[1]+0.05,t,'#ffd23f',100);stamp(c,'LEVEL 3',540,620,tL[2]+0.05,t,'#e63946',100);
  burst(c,'FANCY!',300,780,tCafe,t,'#ffd23f',110);burst(c,'PLOT TWIST!',540,520,tTw,t,'#ffd23f',100);burst(c,'1652',540,640,tCoffee,t,'#b6e36a',120,1.4);burst(c,'1 PENNY',540,640,tPenny,t,'#6fc3ff',110);burst(c,'SIT!',540,700,tMenu,t,'#ff9f1c',120);
 }};
};
