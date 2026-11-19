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
  else if(mood==='blink'){g.fillRect(26,56,28,7);g.fillRect(74,56,28,7);g.lineWidth=8;g.strokeStyle='#1b1b1b';g.beginPath();g.arc(64,88,16,0.1*Math.PI,0.9*Math.PI);g.stroke();}
  else if(mood==='smug'){g.fillRect(30,50,22,8);g.fillRect(78,50,22,8);g.lineWidth=8;g.strokeStyle='#1b1b1b';g.beginPath();g.arc(64,78,26,0.15*Math.PI,0.85*Math.PI);g.stroke();}
  else{g.fillRect(32,44,16,24);g.fillRect(80,44,16,24);g.lineWidth=8;g.strokeStyle='#1b1b1b';g.beginPath();g.arc(64,86,18,0.1*Math.PI,0.9*Math.PI);g.stroke();}
  const t=new T.CanvasTexture(c);t.encoding=T.sRGBEncoding;return new T.MeshLambertMaterial({map:t});}
function person(o){const g=new T.Group(),skin=o.skin||'#f1c27d';
  const side=mat(skin),faces={};['ok','shock','panic','smug','blink'].forEach(m=>faces[m]=faceTex(skin,m));
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
function pose(g,t,o){o=o||{};const u=g.userData,act=o.act||(o.walk?'walk':''),p=clamp(o.p==null?1:o.p),ph=o.ph||0;
  let lL=0,lR=0,aL=0,aR=0,y=o.y||0,rx=0,rz=0,hx=0,jx=0,jz=0,sc=1;
  if(act==='walk'){const w=Math.sin(t*7+ph)*0.7;lL=w;lR=-w;aL=-w;aR=w;y+=Math.abs(Math.sin(t*7+ph))*0.15;}
  else if(act==='run'){const w=Math.sin(t*13+ph)*1.15;lL=w;lR=-w;aL=-w*1.2;aR=w*1.2;y+=Math.abs(Math.sin(t*13+ph))*0.45;rx=0.22;}
  else if(act==='fall'){const e=ease(p);rx=-e*1.5;y+=-e*2.1;lL=e*0.5;lR=-e*0.3;aL=-2.4*e;aR=-2.0*e;hx=-0.3*e;}
  else if(act==='trip'){const e=ease(p);rx=e*1.4;y+=-e*2.4;aL=-2.6*e;aR=-2.6*e;lL=-0.4*e;lR=0.5*e;}
  else if(act==='hug'){const e=ease(p);aL=-1.45*e;aR=-1.45*e;rx=0.08*e;jz=0.5*e;}
  else if(act==='sit'){lL=-1.57;lR=-1.57;y+=-1.5;aL=-0.35;aR=-0.35;}
  else if(act==='cheer'){const b=Math.abs(Math.sin(t*9+ph));aL=-2.7+Math.sin(t*14)*0.3;aR=-2.7-Math.sin(t*14)*0.3;y+=b*1.3;}
  else if(act==='shiver'){jx=Math.sin(t*55)*0.12;aL=-1.2;aR=-1.2;lL=Math.sin(t*40)*0.1;lR=-lL;}
  else if(act==='slump'){const e=ease(p);hx=0.55*e;rx=0.12*e;y+=-0.25*e;aL=0.15;aR=0.15;}
  else if(act==='point'){aR=-1.57;aL=0.1;}
  else if(act==='shrink'){sc=1-0.45*ease(p);}
  else if(act==='float'){y+=2+Math.sin(t*2+ph)*0.6;aL=-0.6;aR=-0.6;lL=0.2;lR=-0.2;}
  if(o.up)aL=-2.6;if(o.up2)aR=-2.6+Math.sin(t*14)*0.4;if(o.wave)aR=-2.7+Math.sin(t*12)*0.45;
  u.legL.rotation.x=lL;u.legR.rotation.x=lR;u.armL.rotation.x=aL;u.armR.rotation.x=aR;
  g.rotation.x=rx;g.rotation.z=rz;g.position.y=y;g.userData.jx=jx;g.userData.jz=jz;if(sc!==1)g.scale.setScalar(sc*(o.base||1));
  if(o.mood){u.head.material[4]=u.faces[o.mood];}
  u.head.rotation.y=o.look||0;u.head.rotation.x=hx+(o.nod||0);
  if(o.at){g.position.x=o.at[0]+jx;g.position.z=o.at[1]+jz;}}
function tag(text,bg){const c=document.createElement('canvas');c.width=320;c.height=84;const g=c.getContext('2d');let cur=null,fg='#fff';
  const t=new T.CanvasTexture(c);t.encoding=T.sRGBEncoding;const s=new T.Sprite(new T.SpriteMaterial({map:t,depthTest:false,transparent:true}));s.scale.set(3.0,0.8,1);s.renderOrder=10;
  s.userData.set=(txt,col,fgc)=>{const k=txt+'|'+col+'|'+fgc;if(k===cur)return;cur=k;g.fillStyle=col||bg||'#111';g.fillRect(0,0,320,84);g.strokeStyle='#fff';g.lineWidth=6;g.strokeRect(3,3,314,78);g.fillStyle=fgc||fg;let fs=46;g.font='900 '+fs+'px "DejaVu Sans", Arial';while(g.measureText(txt).width>292&&fs>18){fs-=2;g.font='900 '+fs+'px "DejaVu Sans", Arial';}g.textAlign='center';g.textBaseline='middle';g.fillText(txt,160,44);t.needsUpdate=true;};
  s.userData.set(text,bg);return s;}
const bricks={};function brickMat(c){if(bricks[c])return bricks[c];const k=document.createElement('canvas');k.width=k.height=128;const g=k.getContext('2d');g.fillStyle=c;g.fillRect(0,0,128,128);g.fillStyle='rgba(0,0,0,0.16)';for(let r=0;r<8;r++){g.fillRect(0,r*16,128,2);for(let q=0;q<4;q++)g.fillRect(((q*32)+(r%2?16:0))%128,r*16,2,16);}const t=new T.CanvasTexture(k);t.encoding=T.sRGBEncoding;t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(2,2);return bricks[c]=new T.MeshLambertMaterial({map:t});}
function house(p,x,z,col,roof,faceX){const wl=box(8,7,8,col,x,3.5,z,p);wl.material=brickMat(col);const r=new T.Mesh(new T.ConeGeometry(7.2,4,4),mat(roof));r.rotation.y=Math.PI/4;r.position.set(x,9,z);p.add(r);
  box(0.3,4,1.8,'#6b3f1d',x+faceX*4.1,2,z,p);box(0.3,1.8,1.8,'#bfe6ff',x+faceX*4.1,4.6,z+2.4,p);box(0.3,1.8,1.8,'#bfe6ff',x+faceX*4.1,4.6,z-2.4,p);}
function tree(p,x,z,s){box(0.9*s,3*s,0.9*s,'#7a4a21',x,1.5*s,z,p);box(3.4*s,3.2*s,3.4*s,'#3aa655',x,4.6*s,z,p);box(2.2*s,2*s,2.2*s,'#46bd63',x,6.7*s,z,p);}
function raccoon(){const g=new T.Group();box(1.7,1.5,1.5,'#8d9097',0,0,0,g);box(1.8,0.5,0.1,'#1b1b1b',0,0.15,0.78,g);box(0.7,0.5,0.4,'#f3f3f3',0,-0.35,0.8,g);box(0.3,0.25,0.2,'#111',0,-0.2,1.0,g);box(0.45,0.5,0.4,'#8d9097',-0.65,0.95,0,g);box(0.45,0.5,0.4,'#8d9097',0.65,0.95,0,g);
  box(0.25,0.25,0.12,'#fff',-0.42,0.3,0.84,g);box(0.25,0.25,0.12,'#fff',0.42,0.3,0.84,g);return g;}
function ghost(o){o=o||{};const g=new T.Group(),c=o.color||'#e9f2ff',m=new T.MeshLambertMaterial({color:c,transparent:true,opacity:o.opacity||0.72,emissive:o.glow||'#7fa8ff',emissiveIntensity:0.35});
  const part=(w,h,d,x,y,z)=>{const q=new T.Mesh(new T.BoxGeometry(w,h,d),m);q.position.set(x,y,z);g.add(q);return q;};
  part(1.5,1.6,1.2,0,1.6,0);part(1.3,0.8,1.0,0,0.7,0);for(let i=-1;i<=1;i++)part(0.4,0.5,0.9,i*0.5,0.15,0);
  box(0.28,0.4,0.1,'#10131a',-0.32,1.85,0.62,g);box(0.28,0.4,0.1,'#10131a',0.32,1.85,0.62,g);box(0.4,0.22,0.1,'#10131a',0,1.3,0.62,g);
  g.userData.bob=(t,ph)=>{g.position.y=(g.userData.y0||0)+0.35+Math.sin(t*2.4+(ph||0))*0.3;};return g;}
function sunDisc(scene,c,x,y,z,s){const d=new T.Mesh(new T.SphereGeometry(s,20,16),new T.MeshBasicMaterial({color:c,fog:false}));d.position.set(x,y,z);scene.add(d);
  [1.5,2.2,3.2].forEach((k,i)=>{const h=new T.Mesh(new T.SphereGeometry(s*k,20,16),new T.MeshBasicMaterial({color:c,transparent:true,opacity:0.16/(i+1),fog:false,depthWrite:false}));h.position.set(x,y,z);scene.add(h);});return d;}
function world(o){o=o||{};
  if(!R){cvs=document.createElement('canvas');R=new T.WebGLRenderer({canvas:cvs,antialias:true,preserveDrawingBuffer:true});R.setPixelRatio(1);R.shadowMap.enabled=true;R.shadowMap.type=T.PCFSoftShadowMap;R.setSize(RW,RH,false);R.outputEncoding=T.sRGBEncoding;}
  const scene=new T.Scene(),cam=new T.PerspectiveCamera(48,RW/RH,0.5,400);
  scene.background=new T.Color(o.sky||'#8fd3ff');scene.fog=new T.Fog(o.sky||'#8fd3ff',55,150);
  const hm=o.hemi||['#ffffff','#7ea46a',0.95];scene.add(new T.HemisphereLight(hm[0],hm[1],hm[2]));const sn=o.sun||['#fff4d6',0.85];const sun=new T.DirectionalLight(sn[0],sn[1]);sun.position.set(-20,40,30);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);const sc=sun.shadow.camera;sc.left=-50;sc.right=50;sc.top=60;sc.bottom=-60;sc.near=1;sc.far=140;sun.shadow.bias=-0.0006;scene.add(sun);
  box(300,0.4,300,o.ground||'#7fcf6a',0,-0.2,-60,scene);box(13,0.5,300,o.road||'#4a4f57',0,0,-60,scene);
  for(let z=30;z>-130;z-=8)box(0.5,0.1,3.4,'#f2f2f2',0,0.3,z,scene);
  box(5,0.7,300,o.walk||'#c9c9c9',-9,0.15,-60,scene);box(5,0.7,300,o.walk||'#c9c9c9',9,0.15,-60,scene);
  const flakes=[];if(o.snow){for(let i=0;i<160;i++){const f=box(0.35,0.35,0.35,'#ffffff',(rnd(i)-0.5)*70,0,(rnd(i+3)-0.5)*90+0,scene);f.castShadow=false;f.userData.s=[rnd(i+7),rnd(i+11)];flakes.push(f);}}
  if(o.lamps){for(let z=24;z>-100;z-=16){[-6.8,6.8].forEach(x=>{box(0.4,9,0.4,'#2b2b33',x,4.5,z,scene);const b=box(1.6,1.2,1.6,'#ffd27a',x,9.4,z,scene);b.material=new T.MeshBasicMaterial({color:'#ffe29a'});b.castShadow=false;const pl=new T.PointLight('#ffcf80',0.9,26);pl.position.set(x,9,z);scene.add(pl);});}}
  if(o.sunDisc){const sd=o.sunDisc;sunDisc(scene,sd[0],sd[1],sd[2],sd[3],sd[4]);}
  const cols=['#ffd6a5','#fdffb6','#caffbf','#9bf6ff','#ffc6ff','#bdb2ff'],roofs=['#c0392b','#8e44ad','#d35400','#2c82c9'];
  const houses=[];for(let i=0;i<12;i++){const z=18-i*14;let g=new T.Group();house(g,-19,z,cols[i%6],roofs[i%4],1);scene.add(g);g.userData.c=[-19,z];houses.push(g);g=new T.Group();house(g,19,z-7,cols[(i+3)%6],roofs[(i+1)%4],-1);scene.add(g);g.userData.c=[19,z-7];houses.push(g);}
  const trees=new T.Group();scene.add(trees);for(let i=0;i<14;i++){tree(trees,-12.5,12-i*10,1+rnd(i)*0.4);tree(trees,12.5,6-i*10,1+rnd(i+9)*0.4);}
  for(let i=0;i<7;i++)box(10+rnd(i)*8,2,5,'#ffffff',-60+i*22,38+rnd(i+4)*10,-90-rnd(i+2)*40,scene);
  // loudspeaker tower
  const zS=o.speakerZ==null?-26:o.speakerZ,tower=new T.Group();tower.position.set(0,0,zS);scene.add(tower);
  box(1,17,1,'#555a63',0,8.5,0,tower);box(8,3.4,3.4,'#2a2d33',0,17.8,0,tower);
  [-2,2].forEach(x=>{const c=new T.Mesh(new T.CylinderGeometry(1.35,1.35,0.5,18),mat('#d9dde3'));c.rotation.x=Math.PI/2;c.position.set(x,17.8,1.8);tower.add(c);
    const c2=new T.Mesh(new T.CylinderGeometry(0.6,0.6,0.6,14),mat('#1b1d21'));c2.rotation.x=Math.PI/2;c2.position.set(x,17.8,1.9);tower.add(c2);});
  const rings=[];for(let i=0;i<4;i++){const m=new T.Mesh(new T.TorusGeometry(1.6,0.22,6,28),new T.MeshBasicMaterial({color:'#fff36b',transparent:true,opacity:0}));m.position.set(0,17.8,2.2);tower.add(m);rings.push(m);}
  if(o.noTower)tower.visible=false;
  const w={ghost,scene,cam,tower,rings,houses,trees,events:[],person,pose,tag,raccoon,box,mat,ease,outBack,clamp,rnd,
    setCam(p,l){cam.position.set(p[0],p[1],p[2]);cam.lookAt(l[0],l[1],l[2]);},
    pulse(t){let v=0;for(const e of w.events){const d=t-e;if(d>=0&&d<0.9)v=Math.max(v,1-d/0.9);}return v;},
    update(t){flakes.forEach(f=>{const q=f.userData.s;f.position.y=((30-(t*(4+q[0]*4)+q[1]*30))%30+30)%30;f.position.x+=0;});rings.forEach((m,i)=>{let op=0,sc=1;for(const e of w.events){const d=t-e-i*0.11;if(d>=0&&d<0.8){op=Math.max(op,1-d/0.8);sc=1+d*7;}}m.material.opacity=op*0.9;m.scale.set(sc,sc,sc);});},
    draw(ctx){R.render(scene,cam);ctx.drawImage(cvs,0,0,1080,1920);}};
  return w;}

function wrap(scene,cam,extra){extra=extra||{};const w={ghost,scene,cam,person,pose,tag,raccoon,box,mat,ease,outBack,clamp,rnd,events:[],rings:[],houses:[],trees:new T.Group(),anim:[],
  setCam(p,l){cam.position.set(p[0],p[1],p[2]);cam.lookAt(l[0],l[1],l[2]);},
  pulse(t){let v=0;for(const e of w.events){const d=t-e;if(d>=0&&d<0.9)v=Math.max(v,1-d/0.9);}return v;},
  update(t){w.anim.forEach(f=>f(t));},
  draw(ctx){R.render(scene,cam);ctx.drawImage(cvs,0,0,1080,1920);}};Object.assign(w,extra);return w;}
function lights(scene,sky,hemi,sun,sunPos){scene.add(new T.HemisphereLight(hemi[0],hemi[1],hemi[2]));const l=new T.DirectionalLight(sun[0],sun[1]);l.position.set(...(sunPos||[-20,40,30]));l.castShadow=true;l.shadow.mapSize.set(2048,2048);const c=l.shadow.camera;c.left=-45;c.right=45;c.top=50;c.bottom=-50;c.near=1;c.far=140;l.shadow.bias=-0.0006;scene.add(l);}
function emis(c,op){const m=new T.MeshBasicMaterial({color:c,transparent:op!=null,opacity:op==null?1:op});return m;}
function pine(p,x,z,s){box(0.9*s,2*s,0.9*s,'#6b4423',x,1*s,z,p);[[5,2.4,2],[4,2.2,4],[2.8,2,6]].forEach(q=>{const c=new T.Mesh(new T.ConeGeometry(q[0]*s*0.6,q[1]*s*1.5,4),mat('#2f7d4f'));c.position.set(x,q[2]*s,z);c.rotation.y=0.78;c.castShadow=true;p.add(c);const sn=new T.Mesh(new T.ConeGeometry(q[0]*s*0.38,q[1]*s*0.7,4),mat('#f5fbff'));sn.position.set(x,q[2]*s+q[1]*s*0.55,z);sn.rotation.y=0.78;p.add(sn);});}
function stage(kind,o){o=o||{};
  if(!R){cvs=document.createElement('canvas');R=new T.WebGLRenderer({canvas:cvs,antialias:true,preserveDrawingBuffer:true});R.setPixelRatio(1);R.shadowMap.enabled=true;R.shadowMap.type=T.PCFSoftShadowMap;R.setSize(RW,RH,false);R.outputEncoding=T.sRGBEncoding;}
  const scene=new T.Scene(),cam=new T.PerspectiveCamera(o.fov||48,RW/RH,0.5,400);let w;
  if(kind==='room'){const wall=o.wall||'#f2d9b8',floor=o.floor||'#b9824b';scene.background=new T.Color('#2b2433');
    lights(scene,0,['#fff1dd','#8a6a4a',0.75],['#ffe2b8',0.6],[-10,30,25]);
    box(40,0.4,40,floor,0,-0.2,0,scene);for(let i=-9;i<=9;i++)box(0.08,0.05,40,'#9a6a3a',i*2,0.03,0,scene);
    box(40,22,0.5,wall,0,11,-9,scene);box(0.5,22,40,wall,-16,11,0,scene);box(0.5,22,40,wall,16,11,0,scene);box(40,0.5,0.6,'#8a5a30',0,0.5,-8.7,scene);
    const win=box(7,8,0.2,'#bfe6ff',-7,12,-8.7,scene);win.material=emis('#bfe6ff');box(7.6,0.5,0.4,'#fff',-7,8,-8.6,scene);box(7.6,0.5,0.4,'#fff',-7,16,-8.6,scene);box(0.5,8.5,0.4,'#fff',-7,12,-8.6,scene);
    const rug=box(14,0.08,9,o.rug||'#c2504b',0,0.06,0,scene);box(12.4,0.1,7.4,'#e8b04a',0,0.08,0,scene);
    box(11,2.2,3.4,o.sofa||'#4a6fa5',3,1.1,-5.6,scene);box(11,3.4,0.9,o.sofa||'#4a6fa5',3,2.8,-7.3,scene);box(1,2.6,3.4,o.sofa||'#4a6fa5',-2.1,1.4,-5.6,scene);box(1,2.6,3.4,o.sofa||'#4a6fa5',8.1,1.4,-5.6,scene);
    box(9,5.2,0.5,'#15151a',-4,5.4,-8.5,scene).visible=false;
    const tvB=box(8.4,5,0.6,'#111',6.5,8.6,-8.6,scene);const tvS=box(7.8,4.4,0.2,'#6fb3ff',6.5,8.6,-8.25,scene);tvS.material=emis('#6fb3ff');
    box(3,5,0.4,'#bcd',-13,8,-8.6,scene).material=emis('#e8d28a');
    box(0.5,7,0.5,'#444',-12.5,3.5,-6.5,scene);const sh=box(2.6,1.8,2.6,'#ffe9a8',-12.5,7.4,-6.5,scene);sh.material=emis('#ffe9a8');const pl=new T.PointLight('#ffcf80',0.9,40);pl.position.set(-12.5,7,-6);scene.add(pl);
    box(2.4,2,2.4,'#6b4423',12.5,1,-6,scene);box(0.4,3,0.4,'#2d7a46',12.5,3.5,-6,scene);box(2.6,2.2,2.6,'#3aa655',12.5,5,-6,scene);
    box(7,0.4,3.4,'#7a4a21',3,1.9,2,scene);[-3,3].forEach(x=>box(0.4,1.9,0.4,'#5a3a1a',3+x,0.95,2,scene));
    w=wrap(scene,cam);w.anim.push(t=>{tvS.material.color.setHSL((0.55+Math.sin(t*3)*0.05),0.8,0.6+Math.sin(t*9)*0.1);});w.tvS=tvS;}
  else if(kind==='snow'){scene.background=new T.Color('#c9d9ea');scene.fog=new T.Fog('#c9d9ea',40,130);
    lights(scene,0,['#eef4ff','#9fb5cf',0.95],['#fff6e6',0.7],[-25,35,20]);
    box(300,0.4,300,'#f4f8ff',0,-0.2,-60,scene);const ice=box(46,0.3,34,'#9fd8f0',0,0.05,-18,scene);ice.material=new T.MeshLambertMaterial({color:'#9fd8f0',emissive:'#4a90b8',emissiveIntensity:0.35});
    const cr=[[-10,-14,14,0.3,0.3],[2,-22,0.3,10,0.3],[8,-10,12,0.3,0.4]];w=null;const cracks=[];cr.forEach((c,i)=>{const b=box(c[2],0.06,c[3]+0.15,'#e8f7ff',c[0],0.22,c[1],scene);b.userData.i=i;b.visible=false;cracks.push(b);});
    for(let i=0;i<26;i++){const x=(rnd(i)-0.5)*130,z=-45-rnd(i+3)*30;pine(scene,x,z,1.1+rnd(i+5)*0.9);}
    for(let i=0;i<14;i++){const side=i%2?1:-1;pine(scene,side*(28+rnd(i)*12),8-i*7,1.2+rnd(i+2)*0.8);}
    box(12,7,9,'#8a5a30',-28,3.5,-30,scene);box(13,1.2,10,'#f4f8ff',-28,7.6,-30,scene);const dw=box(1.8,3,0.2,'#ffcf6a',-28,2,-25.4,scene);dw.material=emis('#ffcf6a');
    const fl=[];for(let i=0;i<200;i++){const f=box(0.3,0.3,0.3,'#fff',(rnd(i)-0.5)*80,0,(rnd(i+3)-0.5)*80-10,scene);f.castShadow=false;f.userData.s=[rnd(i+7),rnd(i+11)];fl.push(f);}
    w=wrap(scene,cam);w.cracks=cracks;w.anim.push(t=>{fl.forEach(f=>{const q=f.userData.s;f.position.y=((30-(t*(3+q[0]*3)+q[1]*30))%30+30)%30;f.position.x+=Math.sin(t+q[1]*9)*0.01;});});}
  else if(kind==='roof'){const dw=!!o.dawn;scene.background=new T.Color(dw?'#ff9a6b':'#0f1030');scene.fog=new T.Fog(dw?'#ff9a6b':'#0f1030',60,200);
    lights(scene,0,dw?['#ffd2a8','#6a4a6a',0.95]:['#6b7cc9','#1c1c3a',0.7],dw?['#ffb36b',0.9]:['#b8c6ff',0.55],[-30,50,10]);
    box(40,1,30,'#3a3d4a',0,-0.5,0,scene);box(40,1.6,0.8,'#555a68',0,0.8,-15,scene);box(40,1.6,0.8,'#555a68',0,0.8,15,scene);box(0.8,1.6,30,'#555a68',-20,0.8,0,scene);box(0.8,1.6,30,'#555a68',20,0.8,0,scene);
    for(let i=0;i<34;i++){const x=(rnd(i)-0.5)*220,z=-40-rnd(i+4)*80,h=20+rnd(i+8)*60,wd=8+rnd(i+2)*10;box(wd,h,wd,'#1c1f3a',x,h/2-1,z,scene);for(let j=0;j<h/4;j++)for(let k=0;k<3;k++)if(rnd(i*50+j*5+k)>0.45){const wn=box(1.1,1.5,0.2,'#ffd67a',x-wd/3+k*wd/3,j*4+2,z+wd/2+0.1,scene);wn.material=emis('#ffd67a');wn.castShadow=false;}}
    for(let i=0;i<18;i++){const x=(rnd(i+20)-0.5)*160,z=-130+rnd(i+21)*60;const m=box(10,50+rnd(i)*30,10,'#161830',x,30,z,scene);}
    const moon=new T.Mesh(new T.SphereGeometry(7,20,16),new T.MeshBasicMaterial({color:dw?'#ffd36b':'#fff5d0',fog:false}));moon.position.set(dw?10:40,dw?18:70,-150);if(dw)moon.scale.setScalar(1.8);scene.add(moon);
    box(6,7,6,'#4a4f60',-12,3.5,-8,scene);box(0.4,10,0.4,'#888',14,5,-10,scene);box(3,0.3,0.3,'#888',14,9,-10,scene);
    for(let i=0;i<120;i++){const s=box(0.5,0.5,0.5,'#fff',(rnd(i+40)-0.5)*260,50+rnd(i+41)*80,-160,scene);s.material=emis('#fff');s.castShadow=false;}
    w=wrap(scene,cam);}
  else if(kind==='forest'){scene.background=new T.Color('#16301f');scene.fog=new T.Fog('#16301f',18,90);
    lights(scene,0,['#9fd6a8','#1c2a1c',0.55],['#cfeccf',0.45],[-15,40,20]);
    box(300,0.4,300,'#2c5a33',0,-0.2,-60,scene);box(7,0.1,300,'#6b5a3a',0,0.02,-60,scene);
    for(let i=0;i<70;i++){const side=i%2?1:-1,x=side*(6+rnd(i)*34),z=20-rnd(i+3)*130,s=1.1+rnd(i+5)*1.6;tree(scene,x,z,s);}
    for(let i=0;i<14;i++){const x=(rnd(i+30)-0.5)*16,z=10-i*6;const m=box(0.6,0.8,0.6,'#e8e8f0',x,0.4,z,scene);const c=box(1.6,0.7,1.6,'#d94a4a',x,1,z,scene);}
    const ff=[];for(let i=0;i<40;i++){const f=box(0.35,0.35,0.35,'#d8ff6a',0,0,0,scene);f.material=emis('#d8ff6a');f.castShadow=false;f.userData.s=i;ff.push(f);}
    w=wrap(scene,cam);w.anim.push(t=>{ff.forEach(f=>{const i=f.userData.s;f.position.set((rnd(i)-0.5)*36+Math.sin(t*0.8+i)*2,2+rnd(i+1)*9+Math.sin(t*1.3+i*2),-rnd(i+2)*60+10+Math.cos(t*0.7+i)*2);f.material.opacity=1;});});}
  else if(kind==='school'){scene.background=new T.Color('#4a6272');scene.fog=new T.Fog('#4a6272',40,130);
    lights(scene,0,['#ffffff','#9aa8b0',1.15],['#f4fbff',0.7],[-8,30,20]);
    for(let i=-10;i<=10;i++)for(let j=-12;j<=4;j++)box(2,0.1,2,(i+j)%2?'#cfd8d2':'#9fb0a6',i*2,0,j*3-6,scene);
    box(0.5,20,150,o.wall||'#7fb2a0',-14,10,-40,scene);box(0.5,20,150,o.wall||'#7fb2a0',14,10,-40,scene);box(30,0.5,150,'#e8eef0',0,20,-40,scene);
    for(let z=14;z>-90;z-=5){const lc=['#d1495b','#2e86ab','#f6ae2d','#33658a'][((z+90)/5|0)%4];box(1.2,11,3.6,lc,-13,5.5,z,scene);box(0.1,1,0.8,'#222',-12.35,6,z+0.8,scene);box(1.2,11,3.6,lc,13,5.5,z-2.5,scene);}
    for(let z=10;z>-90;z-=14){const l=box(8,0.3,2.4,'#fffbe0',0,19.6,z,scene);l.material=emis('#fffbe0');l.castShadow=false;const pl=new T.PointLight('#f4fbff',0.35,30);pl.position.set(0,17,z);scene.add(pl);}
    const dr=box(6,12,0.4,'#fff6c8',0,6,-88,scene);dr.material=emis('#fff6c8');
    const bag=box(2,2.4,1.2,'#e63946',6,1.2,-30,scene);
    w=wrap(scene,cam);w.door=dr;w.anim.push(t=>{dr.material.color.setHSL(0.13,0.9,0.78+Math.sin(t*3)*0.06);});}
  else if(kind==='beach'){scene.background=new T.Color('#9fe0ff');scene.fog=new T.Fog('#9fe0ff',60,180);
    lights(scene,0,['#ffffff','#e8d3a0',0.95],['#fff0c8',0.9],[-20,45,25]);
    box(300,0.4,120,'#f0dca0',0,-0.2,10,scene);const sea=box(300,0.3,160,'#2b8fd8',0,-0.1,-110,scene);sea.material=new T.MeshLambertMaterial({color:'#2b8fd8',emissive:'#1a6fb0',emissiveIntensity:0.3});
    const fo=box(300,0.4,2.4,'#fff',0,0.2,-30,scene);
    for(let i=0;i<2;i++){const x=-18+i*30,z=-8-i*6;box(0.9,12,0.9,'#7a5230',x,6,z,scene);for(let k=0;k<5;k++){const l=box(8,0.4,1.6,'#2fa85a',x+Math.cos(k*1.26)*3,12.2,z+Math.sin(k*1.26)*3,scene);l.rotation.y=-k*1.26;l.rotation.z=0.25;}}
    const um=new T.Mesh(new T.ConeGeometry(6,2.4,8),mat('#e63946'));um.position.set(14,9,-6);um.castShadow=true;scene.add(um);box(0.3,9,0.3,'#eee',14,4.5,-6,scene);
    sunDisc(scene,'#fff3b0',30,60,-170,12);
    w=wrap(scene,cam);w.anim.push(t=>{fo.position.z=-30+Math.sin(t*0.9)*4;sea.position.y=-0.1+Math.sin(t*1.4)*0.08;});}
  else {w=world(o);return w;}
  return w;}
function shake(t,t0,amp,dur){dur=dur||0.5;const d=t-t0;if(d<0||d>dur)return [0,0,0];const a=amp*(1-d/dur);return [Math.sin(d*90)*a,Math.cos(d*77)*a*0.7,Math.sin(d*61)*a*0.4];}
window.B3={shake,world,stage,ghost,person,pose,tag,raccoon,box,mat,clamp,ease,outBack,rnd,THREE:T};
})();