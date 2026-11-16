// Blocky 3D style (Roblox-like low-poly town). window.B3. Needs THREE (render/vendor/three.min.js, r149).
// Deterministic: everything is a pure function of t. Scene supplies timings; B3 builds the world, characters, camera and draws into the 2D canvas.
(function(){
const T=THREE,RW=720,RH=1280;
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x)};
const outBack=x=>{x=clamp(x);const c=1.70158;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)};
const rnd=i=>{const s=Math.sin(i*12.9898+78.233)*43758.5453;return s-Math.floor(s)};
let R=null,cvs=null;const mats={};
function mat(c){return mats[c]||(mats[c]=new T.MeshLambertMaterial({color:c}));}
function box(w,h,d,c,x,y,z,p){const m=new T.Mesh(new T.BoxGeometry(w,h,d),mat(c));m.castShadow=true;m.receiveShadow=true;m.position.set(x,y,z);if(p)p.add(m);return m;}
function faceTex(skin,mood){const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');g.fillStyle=skin;g.fillRect(0,0,128,128);g.fillStyle='#1b1b1b';
  if(mood==='shock'){g.fillRect(30,38,20,34);g.fillRect(78,38,20,34);g.beginPath();g.ellipse(64,98,14,18,0,0,7);g.fill();}
  else if(mood==='panic'){g.fillRect(28,34,24,30);g.fillRect(76,34,24,30);g.fillStyle='#fff';g.fillRect(36,40,8,8);g.fillRect(84,40,8,8);g.fillStyle='#1b1b1b';g.fillRect(36,92,56,10);g.fillRect(30,24,34,6);g.fillRect(70,24,34,6);}
  else if(mood==='smug'){g.fillRect(30,50,22,8);g.fillRect(78,50,22,8);g.lineWidth=8;g.strokeStyle='#1b1b1b';g.beginPath();g.arc(64,78,26,0.15*Math.PI,0.85*Math.PI);g.stroke();}
  else{g.fillRect(32,44,16,24);g.fillRect(80,44,16,24);g.lineWidth=8;g.strokeStyle='#1b1b1b';g.beginPath();g.arc(64,86,18,0.1*Math.PI,0.9*Math.PI);g.stroke();}
  const t=new T.CanvasTexture(c);t.encoding=T.sRGBEncoding;return new T.MeshLambertMaterial({map:t});}
function person(o){const g=new T.Group(),skin=o.skin||'#f1c27d';
  const side=mat(skin),faces={};['ok','shock','panic','smug'].forEach(m=>faces[m]=faceTex(skin,m));
  const head=new T.Mesh(new T.BoxGeometry(1.7,1.7,1.7),[side,side,side,side,faces.ok,side]);head.position.set(0,5.7,0);g.add(head);
  if(o.hair){box(1.85,0.65,1.85,o.hair,0,6.7,-0.05,g);box(1.85,1.5,0.5,o.hair,0,5.9,-0.8,g);if(o.style==='long'){box(0.4,2.2,1.4,o.hair,-0.95,5.2,-0.1,g);box(0.4,2.2,1.4,o.hair,0.95,5.2,-0.1,g);}if(o.style==='spike'){for(let i=-1;i<=1;i++)box(0.5,0.7,0.5,o.hair,i*0.6,7.3,0,g);}if(o.style==='band'){box(1.9,0.25,1.9,'#222',0,6.45,0,g);}}
  if(o.glasses){box(0.55,0.4,0.1,'#111',-0.45,5.75,0.86,g);box(0.55,0.4,0.1,'#111',0.45,5.75,0.86,g);}
  if(o.hat){box(1.9,0.3,1.9,o.hat,0,6.65,0,g);box(1.2,0.9,1.2,o.hat,0,7.2,0,g);}
  box(2.2,2.5,1.1,o.shirt||'#e5484d',0,3.55,0,g);if(o.stripe){box(2.24,0.35,1.14,o.stripe,0,3.9,0,g);box(2.24,0.35,1.14,o.stripe,0,3.0,0,g);}
  const lim=(w,h,d,c,x,y)=>{const p=new T.Group();p.position.set(x,y,0);box(w,h,d,c,0,-h/2,0,p);g.add(p);return p;};
  const armL=lim(0.9,2.4,0.9,o.sleeve||o.shirt||'#e5484d',-1.55,4.7),armR=lim(0.9,2.4,0.9,o.sleeve||o.shirt||'#e5484d',1.55,4.7);
  box(0.92,0.7,0.92,skin,0,-2.05,0,armL);box(0.92,0.7,0.92,skin,0,-2.05,0,armR);
  const legL=lim(1,2.4,1,o.pants||'#2f4b8f',-0.55,2.3),legR=lim(1,2.4,1,o.pants||'#2f4b8f',0.55,2.3);
  g.userData={head,faces,armL,armR,legL,legR,skin};return g;}
function pose(g,t,o){o=o||{};const u=g.userData,w=o.walk?Math.sin(t*7+(o.ph||0))*0.7:0,bob=o.walk?Math.abs(Math.sin(t*7+(o.ph||0)))*0.15:0;
  u.legL.rotation.x=w;u.legR.rotation.x=-w;u.armL.rotation.x=o.up?-2.6:-w;u.armR.rotation.x=o.up2?-2.6+Math.sin(t*14)*0.4:w;
  if(o.wave)u.armR.rotation.x=-2.7+Math.sin(t*12)*0.45;
  g.position.y=(o.y||0)+bob;if(o.mood){u.head.material[4]=u.faces[o.mood];}
  u.head.rotation.y=o.look||0;}
function tag(text,bg){const c=document.createElement('canvas');c.width=320;c.height=84;const g=c.getContext('2d');let cur=null,fg='#fff';
  const t=new T.CanvasTexture(c);t.encoding=T.sRGBEncoding;const s=new T.Sprite(new T.SpriteMaterial({map:t,depthTest:false,transparent:true}));s.scale.set(3.0,0.8,1);s.renderOrder=10;
  s.userData.set=(txt,col,fgc)=>{const k=txt+'|'+col+'|'+fgc;if(k===cur)return;cur=k;g.fillStyle=col||bg||'#111';g.fillRect(0,0,320,84);g.strokeStyle='#fff';g.lineWidth=6;g.strokeRect(3,3,314,78);g.fillStyle=fgc||fg;g.font='900 46px "DejaVu Sans", Arial';g.textAlign='center';g.textBaseline='middle';g.fillText(txt,160,44);t.needsUpdate=true;};
  s.userData.set(text,bg);return s;}
const bricks={};function brickMat(c){if(bricks[c])return bricks[c];const k=document.createElement('canvas');k.width=k.height=128;const g=k.getContext('2d');g.fillStyle=c;g.fillRect(0,0,128,128);g.fillStyle='rgba(0,0,0,0.16)';for(let r=0;r<8;r++){g.fillRect(0,r*16,128,2);for(let q=0;q<4;q++)g.fillRect(((q*32)+(r%2?16:0))%128,r*16,2,16);}const t=new T.CanvasTexture(k);t.encoding=T.sRGBEncoding;t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(2,2);return bricks[c]=new T.MeshLambertMaterial({map:t});}
function house(p,x,z,col,roof,faceX){const wl=box(8,7,8,col,x,3.5,z,p);wl.material=brickMat(col);const r=new T.Mesh(new T.ConeGeometry(7.2,4,4),mat(roof));r.rotation.y=Math.PI/4;r.position.set(x,9,z);p.add(r);
  box(0.3,4,1.8,'#6b3f1d',x+faceX*4.1,2,z,p);box(0.3,1.8,1.8,'#bfe6ff',x+faceX*4.1,4.6,z+2.4,p);box(0.3,1.8,1.8,'#bfe6ff',x+faceX*4.1,4.6,z-2.4,p);}
function tree(p,x,z,s){box(0.9*s,3*s,0.9*s,'#7a4a21',x,1.5*s,z,p);box(3.4*s,3.2*s,3.4*s,'#3aa655',x,4.6*s,z,p);box(2.2*s,2*s,2.2*s,'#46bd63',x,6.7*s,z,p);}
function raccoon(){const g=new T.Group();box(1.7,1.5,1.5,'#8d9097',0,0,0,g);box(1.8,0.5,0.1,'#1b1b1b',0,0.15,0.78,g);box(0.7,0.5,0.4,'#f3f3f3',0,-0.35,0.8,g);box(0.3,0.25,0.2,'#111',0,-0.2,1.0,g);box(0.45,0.5,0.4,'#8d9097',-0.65,0.95,0,g);box(0.45,0.5,0.4,'#8d9097',0.65,0.95,0,g);
  box(0.25,0.25,0.12,'#fff',-0.42,0.3,0.84,g);box(0.25,0.25,0.12,'#fff',0.42,0.3,0.84,g);return g;}
function world(o){o=o||{};
  if(!R){cvs=document.createElement('canvas');R=new T.WebGLRenderer({canvas:cvs,antialias:true,preserveDrawingBuffer:true});R.setPixelRatio(1);R.shadowMap.enabled=true;R.shadowMap.type=T.PCFSoftShadowMap;R.setSize(RW,RH,false);R.outputEncoding=T.sRGBEncoding;}
  const scene=new T.Scene(),cam=new T.PerspectiveCamera(48,RW/RH,0.5,400);
  scene.background=new T.Color(o.sky||'#8fd3ff');scene.fog=new T.Fog(o.sky||'#8fd3ff',55,150);
  scene.add(new T.HemisphereLight('#ffffff','#7ea46a',0.95));const sun=new T.DirectionalLight('#fff4d6',0.85);sun.position.set(-20,40,30);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);const sc=sun.shadow.camera;sc.left=-50;sc.right=50;sc.top=60;sc.bottom=-60;sc.near=1;sc.far=140;sun.shadow.bias=-0.0006;scene.add(sun);
  box(300,0.4,300,'#7fcf6a',0,-0.2,-60,scene);box(13,0.5,300,'#4a4f57',0,0,-60,scene);
  for(let z=30;z>-130;z-=8)box(0.5,0.1,3.4,'#f2f2f2',0,0.3,z,scene);
  box(5,0.7,300,'#c9c9c9',-9,0.15,-60,scene);box(5,0.7,300,'#c9c9c9',9,0.15,-60,scene);
  const cols=['#ffd6a5','#fdffb6','#caffbf','#9bf6ff','#ffc6ff','#bdb2ff'],roofs=['#c0392b','#8e44ad','#d35400','#2c82c9'];
  for(let i=0;i<12;i++){const z=18-i*14;house(scene,-19,z,cols[i%6],roofs[i%4],1);house(scene,19,z-7,cols[(i+3)%6],roofs[(i+1)%4],-1);}
  for(let i=0;i<14;i++){tree(scene,-12.5,12-i*10,1+rnd(i)*0.4);tree(scene,12.5,6-i*10,1+rnd(i+9)*0.4);}
  for(let i=0;i<7;i++)box(10+rnd(i)*8,2,5,'#ffffff',-60+i*22,38+rnd(i+4)*10,-90-rnd(i+2)*40,scene);
  // loudspeaker tower
  const zS=o.speakerZ==null?-26:o.speakerZ,tower=new T.Group();tower.position.set(0,0,zS);scene.add(tower);
  box(1,17,1,'#555a63',0,8.5,0,tower);box(8,3.4,3.4,'#2a2d33',0,17.8,0,tower);
  [-2,2].forEach(x=>{const c=new T.Mesh(new T.CylinderGeometry(1.35,1.35,0.5,18),mat('#d9dde3'));c.rotation.x=Math.PI/2;c.position.set(x,17.8,1.8);tower.add(c);
    const c2=new T.Mesh(new T.CylinderGeometry(0.6,0.6,0.6,14),mat('#1b1d21'));c2.rotation.x=Math.PI/2;c2.position.set(x,17.8,1.9);tower.add(c2);});
  const rings=[];for(let i=0;i<4;i++){const m=new T.Mesh(new T.TorusGeometry(1.6,0.22,6,28),new T.MeshBasicMaterial({color:'#fff36b',transparent:true,opacity:0}));m.position.set(0,17.8,2.2);tower.add(m);rings.push(m);}
  const w={scene,cam,tower,rings,events:[],person,pose,tag,raccoon,box,mat,ease,outBack,clamp,rnd,
    setCam(p,l){cam.position.set(p[0],p[1],p[2]);cam.lookAt(l[0],l[1],l[2]);},
    pulse(t){let v=0;for(const e of w.events){const d=t-e;if(d>=0&&d<0.9)v=Math.max(v,1-d/0.9);}return v;},
    update(t){rings.forEach((m,i)=>{let op=0,sc=1;for(const e of w.events){const d=t-e-i*0.11;if(d>=0&&d<0.8){op=Math.max(op,1-d/0.8);sc=1+d*7;}}m.material.opacity=op*0.9;m.scale.set(sc,sc,sc);});},
    draw(ctx){R.render(scene,cam);ctx.drawImage(cvs,0,0,1080,1920);}};
  return w;}
window.B3={world,person,pose,tag,raccoon,box,mat,clamp,ease,outBack,rnd,THREE:T};
})();
