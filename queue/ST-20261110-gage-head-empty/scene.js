window.SCENE=function(a){
const {k,ease,outBack,clamp,W,E,shake}=a;const K=window.KIT;const {circ,ell,rr,tri,burst,person,stamp}=K;
const tRail=W('railroad'),tEig=W('eighteen'),tMetal=W('metal'),tThree=W('three'),tExp=W('explodes'),tGoes=W('goes'),tSits=W('sits'),tMin=W('minutes'),tTw=W('twist',0),tEl=W('eleven'),tInt=W('internet'),tDiff=W('different'),tTw2=W('twist',1),tExag=W('exaggerated'),tMoral=W('moral'),tEmpty=W('empty'),tSend=W('send'),tEnd=E('thoughts')+0.3;
const emph=[tRail,tEig,tMetal,tThree,tExp,tGoes,tSits,tMin,tTw,tEl,tInt,tDiff,tTw2,tExag,tMoral,tEmpty,tSend];
const pulse=t=>{let m=0;for(const e of emph){const d=t-e;if(d>=0&&d<0.25)m=Math.max(m,Math.pow(1-d/0.25,2));}return m*0.07;};
const cues=[{t:0.05,sfx:'pop',gain:0.7},{t:tEig,sfx:'click',gain:0.8},{t:tMetal,sfx:'tick',gain:0.8},{t:tExp-0.3,sfx:'rise',gain:0.8},{t:tExp,sfx:'thud',gain:1},{t:tGoes,sfx:'whoosh',gain:1},{t:tSits,sfx:'pop',gain:0.8},{t:tTw,sfx:'chime',gain:1},{t:tEl,sfx:'thud',gain:0.9},{t:tInt,sfx:'click',gain:0.8},{t:tTw2,sfx:'chime',gain:1},{t:tExag,sfx:'thud',gain:1},{t:tMoral,sfx:'tick',gain:0.8},{t:tEmpty,sfx:'pop',gain:0.8},{t:tSend,sfx:'pop',gain:0.8}];
const GY=1380;
function bg(c,t){const g=c.createLinearGradient(0,0,0,1920);g.addColorStop(0,'#bfe3ff');g.addColorStop(1,'#e9f6ff');c.fillStyle=g;c.fillRect(-300,-300,1680,2520);
 circ(c,880,300,110,'#ffe27a');tri(c,-100,GY,300,760,700,GY,'#8fb88b');tri(c,300,GY,760,640,1300,GY,'#79a579');
 rr(c,-300,GY,1680,700,0,'#8a6a4a');for(let i=0;i<9;i++)rr(c,-200+i*190,GY+40,120,26,4,'#5e452e');rr(c,-300,GY+20,1680,14,0,'#9aa0a6');rr(c,-300,GY+90,1680,14,0,'#9aa0a6');}
function sign(c,t){if(t<tEig-0.2||t>tExp)return;const s=outBack((t-tEig+0.2)/0.4);c.save();c.translate(190,GY-380);c.scale(s,s);rr(c,-10,0,20,380,4,'#6b4a2f');rr(c,-140,-40,280,110,12,'#f4d35e');c.fillStyle='#222';c.font='bold 52px sans-serif';c.textAlign='center';c.fillText('1848',0,34);c.font='bold 30px sans-serif';c.fillText('VERMONT',0,66);c.restore();}
function rod(c,t){ // metal rod
 let x,y,rot,show=true;
 if(t<tMetal-0.2)show=false;
 else if(t<tGoes){const u=clamp((t-tMetal+0.2)/0.4);x=760;y=1140;rot=-0.35+Math.sin(t*3)*0.03;c.save();c.translate(x,y);c.rotate(rot);c.scale(outBack(u),outBack(u));}
 else{const u=clamp((t-tGoes)/0.55);if(u>=1)show=false;else{x=360+u*700;y=1000-u*980;rot=-1.2;c.save();c.translate(x,y);c.rotate(rot);}}
 if(!show)return;rr(c,-190,-12,380,24,10,'#8d99ae');tri(c,190,-12,250,0,190,12,'#8d99ae');rr(c,-190,-12,380,8,4,'rgba(255,255,255,.4)');c.restore();}
function bubble(c,txt,x,y,w,col,t0,t,tx='#111'){if(t<t0)return;const s=outBack((t-t0)/0.35);c.save();c.translate(x,y);c.scale(s,s);rr(c,-w/2,-60,w,120,26,col);tri(c,-30,58,0,100,20,58,col);c.fillStyle=tx;c.font='bold 44px sans-serif';c.textAlign='center';c.fillText(txt,0,16);c.restore();}
return {cues,
 fx(t){let f=0;for(const e of [tExp,tTw,tTw2,tExag]){const d=t-e;if(d>=0&&d<0.14)f=Math.max(f,0.85*(1-d/0.14));}return{flash:f,lines:(t>tExp-0.3&&t<tGoes+0.3)?0.5:0};},
 cam(t){const z=k(t,[[0,1.05],[tExp-0.5,1.05],[tExp,1.18],[tGoes+0.6,1.18],[tSits,1.05],[tEnd,1.08]]);const y=k(t,[[0,1000],[tExp,900],[tGoes+0.6,900],[tSits,1000],[tEnd,980]]);
  const [sx,sy]=shake(t,(t>tExp&&t<tExp+0.3)?16:0);return{x:540+sx,y:y+sy,z:z*(1+pulse(t))};},
 draw(c,t){bg(c,t);sign(c,t);
  let mouth='smile',look=0,sweat=false,dizzy=false;
  if(t>=tExp-0.3&&t<tGoes+0.2)mouth='o';
  if(t>=tGoes+0.2&&t<tSits)mouth='o';
  if(t>=tSits&&t<tInt)mouth='grin';
  if(t>=tInt&&t<tTw2)mouth='flat';
  if(t>=tTw2)mouth='smile';
  if(t>=tMoral)mouth='flat';
  const hop=t>=tSits&&t<tTw?Math.abs(Math.sin((t-tSits)*8))*18:0;
  person(c,t,{x:540,y:1090-hop,skin:'#e8b894',shirt:'#8d6e63',hair:'#3b2a1d',cap:true,mouth,look,sweat:t>=tExp&&t<tSits,handR:[650,1260-(t>tSits&&t<tEl?90:0)],handL:[430,1260]});
  rod(c,t);
  if(t>=tGoes&&t<tSits){for(let i=0;i<5;i++){const a2=t*5+i*1.26;circ(c,540+Math.cos(a2)*120,860+Math.sin(a2)*30,10,'#ffd23f');}}
  burst(c,'BOOM!',540,640,tExp,t,'#ff6b6b',140);
  burst(c,'WHOOSH',420,520,tGoes,t,'#6fc3ff',110);
  burst(c,'PLOT TWIST!',540,620,tTw,t,'#ffd23f',120);
  stamp(c,'11 YEARS',540,780,tEl+0.05,t,'#2a9d8f',100);
  if(t>=tInt&&t<tTw2+0.8)bubble(c,'"HE BECAME A DIFFERENT MAN"',540,520,900,'#fff',tInt,t);
  burst(c,'PLOT TWIST 2!',540,620,tTw2,t,'#ffd23f',100);
  stamp(c,'EXAGGERATED',540,780,tExag+0.05,t,'#e63946',80);
  if(t>=tMoral){bubble(c,'...',700,540,260,'#fff',tEmpty,t);}
  if(t>=tEmpty)burst(c,'NOT EMPTY',540,640,tEmpty,t,'#b6e36a',110);
 }};
};
