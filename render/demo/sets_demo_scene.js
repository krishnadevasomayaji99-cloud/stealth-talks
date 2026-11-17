window.SCENE=function(a){const {k,ease,clamp}=a;const B=window.B3;const S={};
const defs={room:{cam:[[0,9,20],[0,6,-4]],acts:[['sit',-2,-4.8],['hug',3,-1]]},snow:{cam:[[0,8,22],[0,5,-10]],acts:[['shiver',-4,0],['fall',4,-6]]},roof:{cam:[[0,9,22],[0,6,-6]],acts:[['slump',0,0],['point',5,-2]]},forest:{cam:[[0,8,20],[0,5,-10]],acts:[['run',0,-4],['cheer',5,0]]},beach:{cam:[[0,8,22],[0,5,-10]],acts:[['float',0,-2],['walk',-5,0]]}};
const order=['room','snow','roof','forest','beach'];
function get(n){if(S[n])return S[n];const w=B.stage(n);const d=defs[n];w.ps=d.acts.map((q,i)=>{const p=w.person({shirt:['#ff5d8f','#4db6ff'][i],pants:'#334',hair:'#4a2c1a',style:i?'spike':'long'});w.scene.add(p);return p;});return S[n]=w;}
return {cues:[],caption:'bar',capY:1580,draw(c,t){const i=Math.min(4,Math.floor(t/2)),n=order[i],w=get(n),d=defs[n],lt=t-i*2;
 w.ps.forEach((p,j)=>{const q=d.acts[j];B.pose(p,t,{act:q[0],p:clamp(lt/1.2),mood:'ok',at:[q[1]+(q[0]==='run'?lt*2:0),q[2]],ph:j});p.rotation.y=j?-0.3:0.3;});
 w.setCam(d.cam[0],d.cam[1]);w.update(t);w.draw(c);}};};
