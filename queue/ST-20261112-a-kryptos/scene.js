window.SCENE=function(a){const {k,ease,outBack,clamp,W,E}=a;const S=window.STYLES.noir;const K=window.KIT;
const tCIA0=W('cia'),tFour=W('four'),tNSA=W('cracked'),tAn=W('analyst'),tPub=W('gillogly'),tHold=W('fourth'),tBer=W('berlin'),tClk=W('clock'),tKry=W('kryptos'),tEnd=E('decades')+0.3;
const cues=[{t:tEnd-0.2,sfx:'thud',gain:0.8},{t:tEnd+0.5,sfx:'chime',gain:0.7},{t:tEnd+1.1,sfx:'tick',gain:0.6},{t:0.05,sfx:'pop',gain:0.6},{t:tFour,sfx:'tick',gain:0.7},{t:tNSA,sfx:'whoosh',gain:0.9},{t:tAn,sfx:'click',gain:0.8},{t:tPub,sfx:'chime',gain:0.7},{t:tHold-0.35,sfx:'rise',gain:0.9},{t:tHold,sfx:'thud',gain:1},{t:tBer,sfx:'thud',gain:0.9},{t:tClk,sfx:'tick',gain:0.9},{t:tKry,sfx:'chime',gain:1}];
const solved=t=>[tNSA,tAn,tPub].map(x=>clamp((t-x)/0.8));
function sculpture(c,t){const sv=solved(t);const px=170,py=470,w=740,h=860;
 c.save();c.shadowColor='rgba(255,200,90,0.5)';c.shadowBlur=40;c.fillStyle='#14313a';c.beginPath();c.moveTo(px,py+30);c.quadraticCurveTo(px+w/2,py-50,px+w,py+30);c.lineTo(px+w,py+h-30);c.quadraticCurveTo(px+w/2,py+h+50,px,py+h-30);c.closePath();c.fill();c.restore();
 c.save();c.beginPath();c.moveTo(px,py+30);c.quadraticCurveTo(px+w/2,py-50,px+w,py+30);c.lineTo(px+w,py+h-30);c.quadraticCurveTo(px+w/2,py+h+50,px,py+h-30);c.closePath();c.clip();
 const L='ABCDEFGHIJKLMNOPQRSTUVWXYZ';c.font='700 46px "DejaVu Sans Mono", monospace';c.textAlign='center';
 for(let r=0;r<16;r++){const band=Math.min(3,Math.floor(r/4));const ok=band<3?sv[band]:0;for(let q=0;q<14;q++){const i=r*14+q;const fl=Math.floor(t*(band===3?9:3));const ch=L[Math.floor(((Math.sin(i*91.7+fl*(band===3?7.3:0.2))*43758.5)%1+1)%1*26)];
  const bright=band<3?(0.35+0.65*ok):(0.25+0.25*Math.sin(t*6+i));c.fillStyle=band<3?`rgba(${255*ok+60*(1-ok)|0},${210*ok+150*(1-ok)|0},${100*ok+170*(1-ok)|0},${bright})`:`rgba(255,80,80,${bright})`;c.fillText(ch,px+40+q*50,py+80+r*48);}}
 c.restore();
 ['K1','K2','K3','K4'].forEach((n,i)=>{const on=i<3?sv[i]:0;c.font='900 40px "DejaVu Sans Mono", monospace';c.textAlign='left';c.fillStyle=i<3?(on>0.5?'#ffd27a':'#7b8794'):'#ff5a5a';c.fillText(n+(i<3?(on>0.5?'  SOLVED':'  ?'):'  ??????'),px+10+(i%2)*380,py+h+70+Math.floor(i/2)*56);});}
return {cues,caption:S.caption,capY:1560,
 cam(t){const z=k(t,[[0,1.0],[tHold,1.14],[tBer-0.1,1.14],[tBer,1.0],[tEnd,1.06]]);const pun=(t>tAn&&t<tAn+0.25)?0.08:0;const sh=(t>tFour&&t<tFour+0.6)?4:0;const [sx,sy]=a.shake(t,sh);return{x:540+sx,y:900+sy,z:z+pun};},
 fx(t){let f=0;for(const [e,s] of [[tNSA,0.7],[tBer,0.8]]){const d=t-e;if(d>=0&&d<0.16)f=Math.max(f,s*(1-d/0.16));}return{flash:f,lines:0};},
 draw(c,t){S.bg(c,t,{sweep:Math.sin(t*0.5)*0.35,lx:900});
  sculpture(c,t);
  const near=clamp((t-tCIA0)/1.2);S.fig(c,t,{x:200,y:1480,s:0.9,walk:t<1.6,lean:t>tHold?-10:0,eyes:t>tHold?1:0});
  if(t>tBer&&t<tBer+1.6){c.save();c.globalAlpha=clamp(1-(t-tBer)/1.6)*1;c.fillStyle='rgba(255,60,60,'+0.9+')';c.font='900 150px "DejaVu Sans Mono", monospace';c.textAlign='center';c.fillText('BERLIN',540,330);c.restore();}
  if(t>tClk&&t<tClk+1.6){const d=t-tClk;c.save();c.translate(540,330);c.globalAlpha=clamp(1-d/1.6);c.strokeStyle='#ffd27a';c.lineWidth=10;c.beginPath();c.arc(0,0,90,0,7);c.stroke();c.beginPath();c.moveTo(0,0);c.lineTo(0,-60);c.moveTo(0,0);c.lineTo(Math.cos(d*6)*45,Math.sin(d*6)*45);c.stroke();c.restore();}
  if(t>tKry){const d=t-tKry;c.save();c.globalAlpha=clamp(d/0.5);c.fillStyle='#ffd27a';c.font='900 120px "DejaVu Sans Mono", monospace';c.textAlign='center';c.fillText('KRYPTOS',540,300);c.font='700 40px "DejaVu Sans Mono", monospace';c.fillText('CIA, LANGLEY - 1990',540,360);c.restore();}
 },
 post(c,t){S.post(c,t);}};};
