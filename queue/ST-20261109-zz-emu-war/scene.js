window.SCENE=function(a){
const {k,ease,outBack,clamp,W,E}=a;const K=window.KIT;const {circ,ell,rr,tri,burst,person}=K;
const tNov=W('november'),tFarm=W('farmers'),tTwenty=W('twenty',0),tMach=W('machine',1),tBull=W('bullets'),tFired=W('fired'),tFifty=W('fifty'),tHurt=W('hurt'),tStop=W('stopped'),tCalled=W('ended'),tTwist=W('twist'),tBounty=W('bounty'),tWon=W('won'),tThanks=W('thank'),tLoop=E('thank')+0.4;
const emph=[W('australia'),tNov,tFarm,tTwenty,tMach,tBull,tFired,tFifty,tHurt,tStop,tCalled,tTwist,tBounty,tWon,tThanks];
const pulse=t=>{let m=0;for(const e of emph){const d=t-e;if(d>=0&&d<0.25)m=Math.max(m,Math.pow(1-d/0.25,2));}return m*0.07;};
const cues=[{t:0.05,sfx:'pop',gain:0.7},{t:tNov,sfx:'tick',gain:0.6},{t:tTwenty,sfx:'rise',gain:0.7},{t:tMach,sfx:'click',gain:0.9},{t:tFired,sfx:'whoosh',gain:0.8},{t:tFired+0.4,sfx:'tick',gain:0.5},{t:tFired+0.8,sfx:'tick',gain:0.5},{t:tHurt,sfx:'chime',gain:0.5},{t:tCalled,sfx:'whoosh',gain:0.6},{t:tTwist-0.05,sfx:'rise',gain:0.9},{t:tTwist,sfx:'click',gain:1},{t:tBounty,sfx:'chime',gain:0.9},{t:tWon,sfx:'thud',gain:0.7},{t:tLoop,sfx:'pop',gain:0.8}];
const fxT=[tTwist,tFired];
function emu(c,x,y,s,t,o){o=o||{};const sw=Math.sin(t*(o.run?14:3)+(o.ph||0));c.save();c.translate(x,y);c.scale(o.flip?-s:s,s);
 c.strokeStyle='#6d543a';c.lineWidth=11;c.lineCap='round';[-30,20].forEach((lx,i)=>{const sg=i?sw:-sw;c.beginPath();c.moveTo(lx,60);c.lineTo(lx+sg*18,150);c.lineTo(lx+sg*18+22,152);c.stroke();});
 c.strokeStyle='#b09070';c.lineWidth=28;c.beginPath();c.moveTo(60,-30);c.quadraticCurveTo(95,-100,100+(o.tilt||0),-170);c.stroke();
 ell(c,0,0,95,68,'#8a6a4a');ell(c,-20,10,70,44,'#7a5c3e');ell(c,30,-18,50,30,'#9a7a58');
 circ(c,104+(o.tilt||0),-182,30,'#b09070');tri(c,128+(o.tilt||0),-184,160+(o.tilt||0),-176,128+(o.tilt||0),-170,'#c9a76a');
 c.fillStyle='#fff';c.beginPath();c.ellipse(112+(o.tilt||0),-190,10,9,0,0,7);c.fill();circ(c,115+(o.tilt||0)+(o.look||0),-189,5,'#111');
 c.strokeStyle='#4a3a2a';c.lineWidth=5;c.beginPath();c.moveTo(100+(o.tilt||0),-204);c.lineTo(124+(o.tilt||0),-198-(o.smug?-6:0));c.stroke();
 if(o.helmet){c.fillStyle='#6b7a3a';c.beginPath();c.arc(104+(o.tilt||0),-190,34,Math.PI,2*Math.PI);c.fill();c.fillRect(66+(o.tilt||0),-192,76,10);}
 c.restore();}
function scene(c,t){
 const g=c.createLinearGradient(0,0,0,1200);g.addColorStop(0,'#8fd0ff');g.addColorStop(1,'#ffe7b0');c.fillStyle=g;c.fillRect(-300,-300,1680,1600);
 circ(c,880,300,90,'#fff3a0');
 c.fillStyle='#e8b24a';c.fillRect(-300,980,1680,320);c.fillStyle='#d99a2b';for(let i=0;i<60;i++){const x=-250+i*26;c.fillRect(x,940+((i*37)%30),8,60);}
 rr(c,-300,1250,1680,900,0,'#c9843c');
 // fence
 c.strokeStyle='#6b4a2a';c.lineWidth=10;for(let i=0;i<12;i++){c.beginPath();c.moveTo(-250+i*150,1000);c.lineTo(-250+i*150,1100);c.stroke();}c.beginPath();c.moveTo(-300,1030);c.lineTo(1380,1030);c.moveTo(-300,1070);c.lineTo(1380,1070);c.stroke();
}
return {cues,
 fx(t){let f=0;for(const e of fxT){const d=t-e;if(d>=0&&d<0.14)f=Math.max(f,0.85*(1-d/0.14));}return{flash:f,lines:(t>tFired&&t<tFired+0.9)?0.45:0};},
 cam(t){
  const z=k(t,[[0,1.15],[tTwenty-0.2,1.15],[tTwenty+0.3,1.0],[tMach-0.3,1.0],[tMach,1.3],[tFired-0.2,1.3],[tFired+0.4,1.1],[tCalled-0.2,1.1],[tTwist,1.15],[tBounty,1.3],[tWon-0.2,1.3],[tWon+0.3,1.2],[tThanks+0.8,1.5]]);
  const x=k(t,[[0,540],[tMach-0.3,540],[tMach,300],[tFired-0.2,300],[tFired+0.4,540],[tBounty,640],[tWon+0.3,700],[tThanks+0.8,780]]);
  const y=k(t,[[0,900],[tTwenty+0.3,880],[tMach,900],[tThanks+0.8,860]]);
  const [sx,sy]=a.shake(t,(t>tFired&&t<tFired+0.4)?12:0);return{x:x+sx,y:y+sy,z:z*(1+pulse(t)+0.012*Math.sin(t*1.3))};},
 draw(c,t){
  scene(c,t);
  // background emus appear on 'twenty thousand'
  const bg=clamp((t-tTwenty)/0.6);if(bg>0){for(let i=0;i<14;i++){const ex=-120+i*105+((i*53)%40),ey=1030+((i*29)%50);emu(c,ex,ey,0.28*outBack(bg),t,{run:t>tFired&&t<tCalled,ph:i});}}
  // main big emu
  const run=t>tFired&&t<tFired+1.6;const hop=run?Math.abs(Math.sin(t*7))*40:0;
  const emuX=t>tCalled&&t<tTwist?840:(t>tWon?760:800);
  emu(c,emuX+(run?Math.sin(t*5)*70:0),1160-hop,1.35,t,{look:-6,smug:t>tStop,helmet:t>=tWon,tilt:t>tThanks?-40:0,flip:t>tThanks+0.2});
  // soldier
  const leave=clamp((t-tCalled)/0.9)*(t<tBounty?1:0);const back=clamp((t-tLoop)/0.5);
  const sx=-480*ease(clamp((t-tCalled)/1.0))*(t<tBounty?1:0);
  const present=!(t>tCalled+1.0&&t<tLoop);
  if(present){
   const o={x:300+(t>tCalled?sx:0),y:830,skin:'#e9b48d',shirt:'#6b7a3a',hair:'#3a2a1a',cap:'#556b2f',
    mouth:t>tHurt&&t<tStop?'smile':(t>tFired?'o':(t>tBull?'grin':'flat')),look:0.8,sweat:t>tFired&&t<tCalled,eyeOpen:1,
    handR:t>tMach&&t<tCalled?[430,1040]:[395,1115],handL:[205,1115]};
   person(c,t,o);
   if(t>tMach&&t<tCalled){ // toy-like machine gun
    c.save();c.translate(430,1030);c.rotate(-0.05);rr(c,-20,-18,170,36,10,'#4b4b4b');rr(c,120,-8,70,16,6,'#2c2c2c');rr(c,10,10,28,40,6,'#333');c.restore();
   }
  }
  // bullets as dashes
  if(t>tFired&&t<tFired+1.8){for(let i=0;i<12;i++){const ph=((t-tFired)*3+i*0.17)%1;c.fillStyle='#ffe44a';c.fillRect(480+ph*420,1035+((i*19)%50)-25,40,8);}}
  // ammo crate
  if(t>tBull&&t<tFired+0.2){const s=outBack((t-tBull)/0.3);c.save();c.translate(260,1180);c.scale(s,s);rr(c,-90,-45,180,90,10,'#7b5b2a');c.fillStyle='#fff';c.font='900 40px "DejaVu Sans"';c.textAlign='center';c.fillText('10,000',0,14);c.restore();}
  // bounty sign
  if(t>tBounty){const s=outBack((t-tBounty)/0.4);c.save();c.translate(420,980);c.scale(s,s);rr(c,-10,0,20,200,6,'#6b4a2a');rr(c,-150,-70,300,110,14,'#fff3c4');c.fillStyle='#b5651d';c.font='900 64px "DejaVu Sans"';c.textAlign='center';c.fillText('BOUNTY',0,-3);for(let i=0;i<3;i++)circ(c,-60+i*60,70-20,18,'#ffd23f');c.restore();}
  // soldier returns at the loop
  if(t>=tLoop){const s=outBack((t-tLoop)/0.4);c.save();c.translate(300,0);c.scale(s,1);c.translate(-300,0);person(c,t,{x:300,y:830,skin:'#e9b48d',shirt:'#6b7a3a',hair:'#3a2a1a',cap:'#556b2f',mouth:'o',look:0.8,handR:[395,1115],handL:[205,1115]});c.restore();}
  burst(c,'FACT.',540,640,0.1,t,'#ffd23f',110,1.4);burst(c,'20,000?',540,600,tTwenty,t,'#ff9a9a',120);burst(c,'MISS!',420,700,tFired+0.3,t,'#9ad7ff',110);burst(c,'MISS!',640,680,tFired+0.9,t,'#c3f584',110);burst(c,'FAIL',420,700,tStop,t,'#ff6b6b',130);
  burst(c,'PLOT TWIST!',540,640,tTwist,t,'#ffd23f',150);burst(c,'EMUS WIN',540,620,tWon+0.2,t,'#b6e36a',130);burst(c,'AGAIN?',540,700,tLoop+0.2,t,'#ffb3d1',120);
 }};
};
