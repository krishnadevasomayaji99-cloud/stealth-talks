// QA demo: one tiny scene per style (not a published Reel). window.__DEMO selects the style.
window.SCENE=function(a){const {k,ease,clamp,W}=a;const S=window.STYLES[window.__DEMO];const tEyes=W('thing'),tRun=W('run');
 const cam=t=>({x:540,y:960,z:1+0.06*clamp(t/6)});
 return {caption:S.caption,cues:[],cam,
  draw(c,t){
   if(window.__DEMO==='noir'){S.bg(c,t,{sweep:Math.sin(t*0.8)*0.4});S.fig(c,t,{x:540,y:1500,s:1.3,walk:t<tEyes,eyes:t>tEyes?1:0,lean:t>tEyes?-14:0});S.eyes(c,t,{x:820,y:900,s:1.3,t0:tEyes});}
   if(window.__DEMO==='crt'){S.bg(c,t,{vx:Math.sin(t)*20});S.fig(c,t,{x:540,y:1000+clamp((t-tEyes)/2)*180,s:0.5+clamp((t-tEyes)/2)*0.9,glitch:t>tEyes?1:0});}
   if(window.__DEMO==='notebook'){S.bg(c,t);S.fig(c,t,{x:380,y:1500,s:1.7,mood:t>tEyes?'panic':'ok',walk:t<tEyes,arms:t>tEyes?[-90,-210,90,-210]:undefined});S.fig(c,t,{x:760,y:1500,s:1.7,mood:'smug'});}
   if(window.__DEMO==='comic'){S.bg(c,t,{rush:t>tRun?1:0});S.fig(c,t,{x:540,y:1500,s:1.5,mood:t>tEyes?'shock':'ok',hop:t>tEyes?30:0,look:6});}
   if(window.__DEMO==='paper'){S.bg(c,t,{px:t*2});S.fig(c,t,{x:540,y:1520,s:1.5,mood:t>tEyes?'worried':'ok'});}
  },post(c,t){S.post(c,t,{tc0:3412,cam:'CAM 03 - HALLWAY',glitch:t>tEyes?1:0});}};};
