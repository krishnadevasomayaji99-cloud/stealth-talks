window.SCENE=function(a){
const {k,ease,outBack,clamp,W,E}=a;const K=window.KIT;const {circ,rr,tri,burst,person,confetti,stamp}=K;
const wf=(q,n,fb)=>{try{return W(q,n)}catch(e){return fb}};
const tOne=0.3,tTen=wf('ten',0,4),tSk=wf('skibidi',0,5),tSig=wf('sigma',0,6),tRizz=wf('rizz',0,6.6),tSix=wf('sixty',0,10),tTabs=wf('tabs',0,11.5),tRac=wf('raccoon',0,14),tNin=wf('ninety',0,17),tBuf=wf('buffering',0,19),tTw=wf('twist',0,23),tEig=wf('eighteen',0,24.5),tOx=wf('oxford',0,29),tYear=wf('year',0,32),tDown=wf('down',0,36),tAgain=wf('again',0,38),tEnd=E('friend',0,45)+0.3;
const emph=[tTen,tSk,tSig,tRizz,tSix,tTabs,tRac,tNin,tBuf,tTw,tEig,tOx,tDown,tAgain];
const pulse=t=>{let m=0;for(const e of emph){const d=t-e;if(d>=0&&d<0.22)m=Math.max(m,Math.pow(1-d/0.22,2));}return m*0.08;};
const cues=[{t:0.05,sfx:'pop',gain:0.8},{t:tTen,sfx:'whoosh',gain:0.8},{t:tSk,sfx:'click',gain:0.8},{t:tSig,sfx:'click',gain:0.8},{t:tRizz,sfx:'click',gain:0.8},{t:tSix,sfx:'thud',gain:0.9},{t:tTabs,sfx:'pop',gain:0.8},{t:tRac,sfx:'pop',gain:0.8},{t:tNin,sfx:'tick',gain:0.8},{t:tBuf,sfx:'rise',gain:0.9},{t:tTw,sfx:'thud',gain:1},{t:tEig,sfx:'chime',gain:0.9},{t:tOx,sfx:'chime',gain:1},{t:tDown,sfx:'thud',gain:0.9},{t:tAgain,sfx:'pop',gain:1}];
const slang=[['SKIBIDI',tSk,'#ff6b6b'],['SIGMA',tSig,'#6bd6ff'],['RIZZ',tRizz,'#ffd23f'],['6 7',tRizz+0.5,'#b6e36a'],['NPC',tSix-0.6,'#d6a8ff']];
function bg(c,t){const mad=clamp((t-tTen)/(tNin-tTen)),calm=t>=tDown?0:1;const h=(t*(30+260*mad))%360;const g=c.createLinearGradient(0,0,0,1920);g.addColorStop(0,`hsl(${h},70%,${t<tTen||t>=tTw?60:45}%)`);g.addColorStop(1,`hsl(${(h+80)%360},70%,35%)`);c.fillStyle=g;c.fillRect(-300,-300,1680,2520);
 if(t>=tTw&&t<tDown){c.fillStyle='#f4ecd8';c.fillRect(-300,-300,1680,2520);}
}
function tabs(c,t){if(t<tSix||t>=tTw)return;const n=Math.floor(clamp((t-tSix)/(tNin-tSix))*40);for(let i=0;i<n;i++){const x=70+(i%5)*190+Math.sin(t*3+i)*8,y=250+Math.floor(i/5)*95;rr(c,x,y,170,70,12,['#ff6b6b','#ffd23f','#6bd6ff','#b6e36a','#d6a8ff'][i%5]);rr(c,x+10,y+26,100,10,5,'rgba(0,0,0,.35)');}
 const m=Math.floor(clamp((t-tTabs)/(tNin-tTabs))*9);for(let i=0;i<m;i++){const s=outBack((t-tTabs-i*0.35)*3);if(s<=0)continue;const x=120+(i%3)*300,y=1560+Math.floor(i/3)*0;c.save();c.translate(x+60,y);c.scale(s,s);circ(c,0,0,46,'#ff3b30');c.fillStyle='#fff';c.font='900 52px sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText(String(i+1),0,3);c.restore();}}
function phone(c,t,x,y,rot){c.save();c.translate(x,y);c.rotate(rot);rr(c,-110,-200,220,400,34,'#111');const on=t<tDown||t>=tAgain;const mad=clamp((t-tTen)/(tNin-tTen));c.fillStyle=on?`hsl(${(t*200)%360},80%,60%)`:'#222';c.beginPath();c.roundRect(-96,-180,192,360,24);c.fill();
 if(on){for(let i=0;i<4;i++){rr(c,-80,-150+((t*(80+300*mad)+i*95)%380)-40,160,60,10,'rgba(255,255,255,.55)');}}c.restore();}
function slangDraw(c,t){for(const [w,t0,col] of slang){const d=t-t0;if(d<0||d>1.4)continue;const s=outBack(d/0.15)*(d>1.1?1-(d-1.1)/0.3:1);c.save();c.translate(540+Math.sin(t0*7)*220,520+((t0*131)%260));c.rotate(Math.sin(t0*5)*0.3+Math.sin(t*20)*0.03);c.scale(s*1.1,s*1.1);c.fillStyle='#111';c.font='900 130px "DejaVu Sans", Arial';c.textAlign='center';c.textBaseline='middle';c.lineWidth=26;c.lineJoin='round';c.strokeStyle='#111';c.strokeText(w,0,0);c.fillStyle=col;c.fillText(w,0,0);c.restore();}}
function book(c,t){if(t<tTw||t>=tDown)return;const d=t-tTw;const s=outBack(d/0.3);c.save();c.translate(540,700);c.scale(s,s);rr(c,-230,-170,460,340,16,'#2a6f4f');rr(c,-210,-150,420,300,10,'#f4ecd8');c.fillStyle='#2a6f4f';c.font='900 70px "DejaVu Sans", Arial';c.textAlign='center';c.textBaseline='middle';c.fillText('WALDEN',0,-50);c.font='900 90px "DejaVu Sans", Arial';c.fillStyle='#c0392b';c.fillText('1854',0,60);c.restore();}
return {cues,
 fx(t){let f=0;for(const e of [tTen,tSix,tTw,tOx,tAgain]){const d=t-e;if(d>=0&&d<0.14)f=Math.max(f,0.85*(1-d/0.14));}return{flash:f,lines:(t>tBuf-0.5&&t<tTw)?0.45:0};},
 cam(t){const mad=clamp((t-tTen)/(tNin-tTen));const z=1.1+0.15*mad*(t<tTw?1:0)+(t>=tTw&&t<tDown?-0.05:0);const [sx,sy]=a.shake(t,t>=tTen&&t<tTw?4+16*mad:(t>=tTw&&t<tTw+0.25?14:0));return{x:540+sx,y:960+sy,z:z*(1+pulse(t))};},
 draw(c,t){bg(c,t);
  let mouth='grin',look=0,sweat=false,bags=false,brow=0;
  if(t>=tTen){mouth='o';look=Math.sin(t*9)*2;}
  if(t>=tSix){mouth='open';sweat=true;look=Math.sin(t*14)*2.5;}
  if(t>=tNin){mouth='flat';bags=true;look=Math.sin(t*3)*2;}
  if(t>=tTw){mouth='smile';bags=false;sweat=false;look=0;}
  if(t>=tDown){mouth='flat';}
  if(t>=tAgain){mouth='grin';}
  const bob=Math.sin(t*(t<tTen?2:10))*(t<tTen?3:6);
  const up=t<tDown||t>=tAgain;const hand=up?[640+Math.sin(t*20)*(t>=tTen&&t<tTw?6:0),1100]:[560,1500];
  person(c,t,{x:540,y:1020+bob,skin:'#8d5a3b',shirt:'#6bd6ff',hair:'#1b1b1b',mouth,look,handR:hand,handL:[440,1380],sweat,bags});
  phone(c,t,hand[0]+10,hand[1]-120+(up?0:420),up?0.12:1.4);
  tabs(c,t);slangDraw(c,t);book(c,t);
  burst(c,'ONE SEC',540,600,tOne,t,'#ffd23f',130,1.4);
  burst(c,'BRAIN ROT',540,520,tNin+0.2,t,'#ff6b6b',120,1.3);
  burst(c,'PLOT TWIST!',540,430,tTw,t,'#ffd23f',120);
  stamp(c,'WORD OF 2024',540,980,tOx+0.1,t,'#c0392b',70);
  burst(c,'ONE SEC...',540,560,tAgain,t,'#b6e36a',130,1.6);
  confetti(c,t,540,500,tAgain+0.1,50);
 }};
};
