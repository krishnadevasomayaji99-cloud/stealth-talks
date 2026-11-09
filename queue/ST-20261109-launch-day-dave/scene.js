window.SCENE=function(a){
const {k,ease,outBack,clamp,W,E}=a;const K=window.KIT;const {circ,ell,rr,tri,burst,person}=K;
const tCal=W('calendar'),tSnack=W('snacks'),tSick=W('sick'),tWinter=W('winter'),tMid=W('midnight'),tPlay=W('play'),tTwist=W('twist'),tPct=W('percent'),tStare=W('stares'),tHours=W('hours'),tOne=W('one'),tAny=W('anyway'),tRef=W('refreshes'),tUnp=W('unplugs'),tEnd=E('19th',1);
const emph=[W('rockstar'),W('launches'),W('month'),W('pushed'),tCal,tSnack,tSick,tWinter,tMid,tPlay,tTwist,tPct,tHours,tOne,tAny];
const pulse=t=>{let m=0;for(const e of emph){const d=t-e;if(d>=0&&d<0.25)m=Math.max(m,Math.pow(1-d/0.25,2));}return m*0.07;};
const cues=[{t:0.05,sfx:'pop',gain:0.7},{t:tCal,sfx:'tick',gain:0.7},{t:tSnack,sfx:'pop',gain:0.6},{t:tSick,sfx:'click',gain:0.8},{t:tMid-0.1,sfx:'rise',gain:0.7},{t:tPlay,sfx:'chime',gain:0.8},{t:tTwist-0.05,sfx:'rise',gain:0.9},{t:tTwist,sfx:'click',gain:1},{t:tPct,sfx:'thud',gain:1},{t:tOne,sfx:'chime',gain:0.6},{t:tRef,sfx:'click',gain:0.8},{t:tUnp,sfx:'thud',gain:0.7},{t:tAny,sfx:'pop',gain:0.7}];
const fxT=[tTwist,tPct];
const night=t=>k(t,[[tMid-0.5,0],[tMid,1],[tHours+0.5,1],[tOne,0.2]]);
function room(c,t){
 const g=c.createLinearGradient(0,0,0,1920);g.addColorStop(0,'#cdb8f0');g.addColorStop(1,'#a58bd6');c.fillStyle=g;c.fillRect(-300,-300,1680,2520);
 // darker at night
 c.fillStyle='rgba(20,15,60,'+(0.45*night(t))+')';c.fillRect(-300,-300,1680,2520);
 // window
 const sky=night(t);c.fillStyle=sky>0.5?'#10163a':'#9fd8ff';c.fillRect(450,230,200,210);if(sky>0.5){circ(c,560,290,26,'#fff7c2');circ(c,572,282,22,'#10163a');} c.strokeStyle='#fff';c.lineWidth=12;c.strokeRect(450,230,200,210);c.beginPath();c.moveTo(550,230);c.lineTo(550,440);c.stroke();
 // calendar
 const cs=1+0.12*Math.max(0,Math.sin(clamp((t-tCal)/0.5)*Math.PI));c.save();c.translate(220,430);c.scale(cs,cs);rr(c,-130,-130,260,260,14,'#fff');rr(c,-130,-130,260,52,14,'#e63946');c.fillStyle='#fff';c.font='900 34px "DejaVu Sans"';c.textAlign='center';c.fillText('NOV',0,-92);c.fillStyle='#444';c.font='700 17px "DejaVu Sans"';
 for(let i=0;i<28;i++){const col=i%7,row=Math.floor(i/7);const d=i+1;c.fillText(''+d,-96+col*32,-44+row*38);}
 // circled 19 (index 18 -> col4,row2)
 const ccx=-96+4*32,ccy=-44+2*38;c.strokeStyle='#e63946';c.lineWidth=5;c.beginPath();c.ellipse(ccx,ccy-8,24,22,0,0,7);c.stroke();
 if(t>tSick)for(let i=19;i<28;i++){const col=i%7,row=Math.floor(i/7);c.strokeStyle='#e63946';c.lineWidth=4;c.beginPath();c.moveTo(-96+col*32-12,-44+row*38-16);c.lineTo(-96+col*32+12,-44+row*38+4);c.stroke();}
 c.restore();
 // clock
 const cx=830,cy=330;circ(c,cx,cy,70,'#fff');c.strokeStyle='#333';c.lineWidth=8;c.beginPath();c.arc(cx,cy,70,0,7);c.stroke();
 let hrA=k(t,[[0,-0.6],[tMid-0.3,-0.6],[tMid,-Math.PI/2]]),minA=k(t,[[0,0.9],[tMid-0.3,0.9],[tMid,-Math.PI/2]]);
 if(t>tStare){const sp=(t-tStare)*9;minA=-Math.PI/2+sp;hrA=-Math.PI/2+sp/12;}
 c.lineCap='round';c.lineWidth=9;c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+Math.cos(hrA)*40,cy+Math.sin(hrA)*40);c.stroke();c.lineWidth=6;c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+Math.cos(minA)*58,cy+Math.sin(minA)*58);c.stroke();
 // TV
 rr(c,640,590,320,230,18,'#111');rr(c,656,606,288,196,8,t>tPlay?'#10243f':'#1b1b1b');
 if(t>tPlay){const p=0.04*ease((t-tPlay)/1.2);c.fillStyle='#8fb4ff';c.font='800 24px "DejaVu Sans"';c.textAlign='center';c.fillText('DOWNLOADING',800,690);rr(c,690,716,220,26,10,'#26406b');rr(c,690,716,Math.max(6,220*p*(t>tPct?1:1)),26,10,'#5ee08a');c.fillStyle='#fff';c.font='900 36px "DejaVu Sans"';c.fillText(Math.round(p*100)+'%',800,785);} else {c.fillStyle='#444';c.font='800 22px "DejaVu Sans"';c.textAlign='center';c.fillText('READY',800,705);}
 rr(c,760,820,80,26,6,'#111');
 // table + sofa
 rr(c,-300,1130,1680,60,0,'#7a4a2a');rr(c,-300,1190,1680,900,0,'#5e371d');
 // snacks
 if(t>tSnack){const s=outBack((t-tSnack)/0.3);c.save();c.translate(560,1118);c.scale(s,s);ell(c,0,0,95,28,'#fff');circ(c,-40,-26,22,'#f2b134');circ(c,0,-34,24,'#e8643c');circ(c,40,-26,22,'#f2b134');circ(c,-12,-52,20,'#f2b134');c.restore();}
 if(t>tOne-2){const n=Math.floor(clamp((t-tStare)/(tOne-tStare))*4);for(let i=0;i<n;i++)rr(c,150+i*70,1100,56,36,6,['#e8643c','#f2b134','#3aa6a6','#d65f9a'][i%4]);}
}
return {cues,
 fx(t){let f=0;for(const e of fxT){const d=t-e;if(d>=0&&d<0.14)f=Math.max(f,0.85*(1-d/0.14));}return{flash:f,lines:(t>tPlay&&t<tPlay+0.8)?0.5:0};},
 cam(t){
  const z=k(t,[[0,1.3],[tPlay-0.3,1.3],[tPlay+0.2,1.4],[tTwist+0.3,1.4],[tPct-0.1,2.0],[tStare+1.2,2.0],[tOne-0.6,1.3],[tOne,1.6],[tAny-0.3,1.6],[tAny+0.3,1.3]]);
  const x=k(t,[[0,470],[tPlay-0.3,470],[tPlay+0.2,640],[tTwist+0.3,640],[tPct-0.1,800],[tStare+1.2,800],[tOne-0.6,470],[tOne,400],[tAny-0.3,400],[tAny+0.3,470]]);
  const y=k(t,[[0,900],[tPlay-0.3,900],[tPlay+0.2,820],[tTwist+0.3,820],[tPct-0.1,720],[tStare+1.2,720],[tOne-0.6,900],[tOne,820],[tAny-0.3,820],[tAny+0.3,900]]);
  const [sx,sy]=a.shake(t,(t>tPct&&t<tPct+0.3)?16:0);return{x:x+sx,y:y+sy,z:z*(1+pulse(t)+0.012*Math.sin(t*1.3))};},
 draw(c,t){
  room(c,t);
  const age=clamp((t-tStare)/(tOne-tStare));
  const onPhone=t>tSick-0.3&&t<tWinter+0.2;
  const o={x:360,y:830,skin:'#e9b48d',shirt:'#e76f51',hair:'#2b2b2b',cap:t>tWinter?'#264653':null,
   mouth:t>tOne?'smile':(t>tPct?'o':(t>tPlay?'open':(t>tMid?'grin':(onPhone?'sad':'smile')))),
   look:t>tPlay?1:0,eyeOpen:t>tStare?1-0.4*age:1,sweat:t>tPct&&t<tOne,stubble:age,bags:age>0.3,
   handR:onPhone?[330,780]:(t>tMid&&t<tStare?[560,1060]:[455,1115]),handL:[270,1115]};
  person(c,t,o);
  burst(c,'COUGH!',230,610,tSick+0.1,t,'#c3f584',110);burst(c,'SNACKS',230,640,tSnack,t,'#ffd23f',100);
  burst(c,'PLOT TWIST!',540,640,tTwist,t,'#ffd23f',150);burst(c,'REFRESH',360,560,tRef,t,'#9ad7ff',110);burst(c,'4%?!',560,760,tPct,t,'#ff6b6b',140);burst(c,'ZEN.',360,560,tOne+0.1,t,'#9ad7ff',130);burst(c,'THE 19TH',540,700,tAny+0.2,t,'#b6e36a',130);
 }};
};
