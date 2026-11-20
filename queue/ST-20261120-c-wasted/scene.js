window.SCENE=function(a){const {k,ease,clamp}=a;const B=window.B3;
const WX=(q,n=0)=>{let c=0;for(const w of a.words){if(w.w.toLowerCase().replace(/[^a-z0-9']/g,'')===q){if(c===n)return w.start;c++;}}throw new Error('word not found: '+q+' #'+n);};
const tBar=WX('bar'),tTen=WX('ten'),tScr=WX('scrolled'),tTw=WX('twenty'),tFo=WX('forty'),tSch=WX('school'),tTeach=WX('teacher'),tSix=WX('sixty'),tRoof=WX('roof'),tEi=WX('eighty'),tSky=WX('sky'),tEmpty=WX('empty'),tPock=WX('pocket'),tBeach=WX('beach'),tWaves=WX('waves'),tNow=WX('now'),tMoved=WX('moved'),tEnd=a.words[a.words.length-1].end+0.5;
const tSchIn=tSch-0.5,tRoofIn=tRoof-0.5,tBeachIn=tBeach-0.4;
const cues=[{t:0.05,sfx:'pop',gain:0.6},{t:tBar,sfx:'boom',gain:0.8},{t:tTen,sfx:'bar_up',gain:0.8},{t:tScr,sfx:'swipe',gain:0.9},{t:tScr+0.5,sfx:'swipe',gain:0.8},{t:tTw,sfx:'bar_up',gain:0.8},{t:tFo-0.9,sfx:'swipe',gain:0.8},{t:tFo,sfx:'bar_up',gain:0.9},{t:tSchIn,sfx:'whoosh',gain:0.8},{t:tTeach,sfx:'tick',gain:0.7},{t:tSix,sfx:'bar_up',gain:0.9},{t:tSix,sfx:'thud',gain:0.7},{t:tRoofIn,sfx:'whoosh',gain:0.8},{t:tEi,sfx:'bar_up',gain:1},{t:tEi,sfx:'thud',gain:0.9},{t:tSky,sfx:'wind',gain:0.5},{t:tEmpty,sfx:'heartbeat',gain:0.8},{t:tPock,sfx:'boom',gain:0.9},{t:tPock+0.2,sfx:'sparkle',gain:0.9},{t:tBeachIn,sfx:'whoosh',gain:0.8},{t:tWaves,sfx:'chime',gain:0.7},{t:tNow,sfx:'bar_up',gain:0.7},{t:tMoved,sfx:'pop',gain:0.9}];
const pts=[[0,0],[tTen,10],[tTw,20],[tFo,40],[tSix,60],[tEi,80],[tPock,80],[tBeach-0.2,0]];
function val(t){if(t>=tMoved)return 4;if(t>=tNow)return 2;for(let i=pts.length-1;i>=0;i--){if(t>=pts[i][0]){const q=pts[i],n=pts[i+1];if(!n)return q[1];const u=clamp((t-q[0])/Math.max(0.01,n[0]-q[0]));return Math.round(q[1]+(n[1]-q[1])*(q[1]===n[1]?0:(i>=5?ease(u):Math.min(1,u*4))));}}return 0;}
const col=v=>v<30?'#2ec27e':v<60?'#ffd60a':'#ff4b4b';
const S={};const kicked={};
function mk(kind,o){const w=B.stage(kind,o);w.leo=w.person({shirt:'#f4f4f4',pants:'#2b3a67',hair:'#5b3a29',style:'spike',skin:'#e0ac69'});w.scene.add(w.leo);
 w.bt=B.tag('0%','#2ec27e');w.bt.position.set(0,9.6,0);w.leo.add(w.bt);return w;}
function get(n){if(S[n])return S[n];const w=S[n]=mk(n,n==='roof'?{dawn:true}:undefined);
 if(n==='school'){w.t1=w.person({shirt:'#6c757d',pants:'#333',hair:'#d9d9d9',style:'band',skin:'#e0ac69'});w.scene.add(w.t1);}
 return w;}
function stageAt(t){return t<tSchIn?'room':t<tRoofIn?'school':t<tBeachIn?'roof':'beach';}
function hud(c,t){const v=val(t);c.save();c.fillStyle='rgba(10,10,14,0.82)';c.beginPath();c.roundRect(110,70,860,150,22);c.fill();c.fillStyle='#fff';c.font='900 40px "DejaVu Sans", Arial';c.textAlign='left';c.textBaseline='middle';c.fillText('DAY WASTED',140,110);c.fillStyle=col(v);c.font='900 64px "DejaVu Sans", Arial';c.textAlign='right';c.fillText(v+'%',940,112);c.fillStyle='#333';c.fillRect(140,160,800,30);c.fillStyle=col(v);c.fillRect(140,160,800*v/100,30);c.restore();}
function cam(n,t,w){const P=p=>k(t,p),lp=w.leo.position;
 if(n==='room'){if(t>=tScr-0.1&&t<tTw+0.4)return B.closeCam(w.leo,11,-0.6,1.5);if(t>=tFo-1.0&&t<tSchIn-0.2)return B.closeCam(w.leo,11.5,-0.6,-1.5);return {p:[P([[0,-4],[tScr,2],[tSchIn,0]]),7,P([[0,26],[tScr,20],[tSchIn,19]])],l:[0,6,-3]};}
 if(n==='school')return {p:[P([[tSchIn,-3],[tSix,2],[tRoofIn,0]]),6,P([[tSchIn,23],[tSix,19],[tRoofIn,18]])],l:[0,6,-3]};
 if(n==='roof'){if(t>=tEmpty-0.2&&t<tPock+0.9)return B.closeCam(w.leo,13,-0.8,1);return {p:[P([[tRoofIn,4],[tEi,0],[tEmpty,-1]]),7,P([[tRoofIn,25],[tEi,20],[tEmpty,17]])],l:[0,6,-3]};}
 return {p:[P([[tBeachIn,3],[tMoved,-1],[tEnd,1]]),7,P([[tBeachIn,22],[tNow,17],[tEnd,16]])],l:[0,6,-3]};}
return {cues,caption:'bar',capY:1580,
 draw(c,t){const n=stageAt(t),w=get(n),leo=w.leo,v=val(t);
  w.bt.userData.set(v+'%',col(v));
  if(n==='room'){B.pose(leo,t,{act:t<tScr?'slump':'sit',p:1,mood:t<tScr?'blink':'ok',at:[-2,-2]});leo.rotation.y=t>=tScr-0.1&&t<tTw+0.4?0.25:0.9;}
  else if(n==='school'){B.pose(leo,t,{act:t<tTeach?'walk':'shrink',p:1,mood:t<tTeach?'ok':'worried',at:[-3,-2]});leo.rotation.y=0.9;
   B.pose(w.t1,t,{act:t<tTeach?'sit':'point',p:1,mood:'ok',at:[3,-2]});w.t1.rotation.y=-0.9;
   if(!kicked.s&&t>=tSix){kicked.s=1;w.kick(tSix,0.5,[-3,-2],'#ff4b4b');}}
  else if(n==='roof'){const run=clamp((t-tRoofIn)/(tEi-tRoofIn+0.6));const act=t<tEi+0.2?'run':t<tPock?'slump':'cheer';
   B.pose(leo,t,{act,p:t<tEi+0.2?1:t<tPock?1:clamp((t-tPock)/0.6),mood:t<tEmpty?'sad':t<tPock?'worried':'ok',at:[t<tEi+0.2?-6+6*run:0,-2]});leo.rotation.y=t<tEi+0.2?-1.57:(t>=tEmpty-0.2&&t<tPock+0.9?0.25:0.9);
   if(!kicked.r&&t>=tEi){kicked.r=1;w.kick(tEi,0.6,[0,-2],'#ff4b4b');}}
  else{B.pose(leo,t,{act:t<tNow?'walk':'cheer',p:t<tNow?1:clamp((t-tNow)/0.5),mood:'happy',at:[-4+4*clamp((t-tBeachIn)/(tNow-tBeachIn)),-2]});leo.rotation.y=t<tNow?-1.0:0.9;}
  const cm=cam(n,t,w),s1=B.shake(t,tSix,0.4,0.5),s2=B.shake(t,tEi,0.5,0.5),p=cm.p;w.setCam([p[0]+s1[0]+s2[0],p[1]+s1[1]+s2[1],p[2]],cm.l);w.update(t);w.draw(c);
  if((n==='room'&&t>=tScr-0.1&&t<tTw+0.4)||(n==='roof'&&t>=tEmpty-0.2&&t<tPock+0.9))B.blurEdges(c,0.45,0);hud(c,t);},
 post(c,t){for(const q of [tSchIn,tRoofIn,tBeachIn]){const d=Math.abs(t-q);if(d<0.1){c.fillStyle='rgba(255,255,255,'+(1-d/0.1)*0.8+')';c.fillRect(0,0,1080,1920);}}if(t>=tPock&&t<tPock+0.3){c.fillStyle='rgba(255,230,150,'+(0.6*(1-(t-tPock)/0.3))+')';c.fillRect(0,0,1080,1920);}}};};
