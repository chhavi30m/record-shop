const SH=window.SHOP||{crates:[],records:[],ambient:""};
const esc=x=>String(x==null?"":x).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const hex=(x,d)=>/^#[0-9a-fA-F]{3,8}$/.test(x||"")?x:d;
const PATS=["rays","rings","stripes","checks","dots"];
const R=SH.records.map(r=>({id:esc(r.id),crate:r.crate,title:esc(r.title),stat:esc(r.headline),sub:esc(r.subtitle),
 c1:hex(r.color1,"#2D4FD6"),c2:hex(r.color2,"#F3A5BF"),pat:PATS.includes(r.pattern)?r.pattern:"rays",
 a:esc(r.description),t:(r.tracks||[]).map(esc),s:(r.tags||[]).map(esc),audio:r.audio||""}));
const C=SH.crates.map(c=>({id:c.id,name:esc(c.name),note:esc(c.note)}));
const art=r=>({
 rays:`repeating-conic-gradient(from 0deg at 72% 70%,${r.c1} 0 9deg,${r.c2} 9deg 18deg)`,
 rings:`repeating-radial-gradient(circle at 72% 70%,${r.c1} 0 14px,${r.c2} 14px 26px)`,
 stripes:`repeating-linear-gradient(-35deg,${r.c1} 0 18px,${r.c2} 18px 30px)`,
 checks:`conic-gradient(${r.c1} 25%,${r.c2} 0 50%,${r.c1} 0 75%,${r.c2} 0) 0 0/44px 44px`,
 dots:`radial-gradient(${r.c2} 28%,transparent 30%) 0 0/30px 30px,${r.c1}`
})[r.pat];
const P=["#F3A5BF","#1F8A7A","#F2B632","#2D4FD6","#E4503A","#7B4BC4","#F7F2E2"];
const pick=a=>a[Math.floor(Math.random()*a.length)];
function vinyl(){
  const a=pick(P),b=pick(P.filter(x=>x!==a)),lbl=pick(P.filter(x=>x!==a&&x!==b)),s=pick(["solid","swirl","splatter"]);
  let bg=a;
  if(s==="swirl")bg=`conic-gradient(${a} 0 50%,${b} 0)`;
  if(s==="splatter")bg=Array.from({length:8},()=>`radial-gradient(circle at ${(Math.random()*90+5)|0}% ${(Math.random()*90+5)|0}%,${b} 0 ${(Math.random()*6+3)|0}%,transparent 0)`).join(",")+","+a;
  return{bg,lbl};
}
const $=s=>document.querySelector(s), panel=$("#panel");
/* Sound comes from shop.js. Records without an audio path stay silent. */
const AUDIO={ambient:SH.ambient||"",rec:Object.fromEntries(R.filter(r=>r.audio).map(r=>[r.id,r.audio]))};
let ctx,bed,amb,rec,muted=false;
const gate=$("#gate"),snd=$("#snd");
document.querySelector("main").inert=true;
$("#openBtn").focus();
function crackle(){
  ctx=new (window.AudioContext||window.webkitAudioContext)();
  const n=ctx.sampleRate*3,b=ctx.createBuffer(1,n,ctx.sampleRate),d=b.getChannelData(0);
  for(let i=0;i<n;i++)d[i]=Math.random()<.0007?(Math.random()*2-1)*.6:(Math.random()*2-1)*.012;
  const s=ctx.createBufferSource(),f=ctx.createBiquadFilter();
  s.buffer=b;s.loop=true;f.type="highpass";f.frequency.value=900;
  bed=ctx.createGain();s.connect(f);f.connect(bed);bed.connect(ctx.destination);s.start();
}
function levels(){
  const d=!!(rec&&!rec.paused);
  if(amb){amb.muted=muted;amb.volume=d?.12:.6}
  if(bed)bed.gain.value=muted?0:(d?.05:.35);
  if(rec)rec.muted=muted;
}
function stopRec(){
  if(rec){rec.pause();rec=null}
  document.querySelectorAll(".disc.on").forEach(x=>x.classList.remove("on"));
  levels();
}
function bindDisc(r){
  const u=AUDIO.rec[r.id],d=panel.querySelector(".disc");
  if(!u)return;
  d.classList.add("has");d.setAttribute("role","button");d.tabIndex=0;d.setAttribute("aria-label","Play "+r.title);
  d.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();d.click()}};
  d.onclick=()=>{
    if(rec&&!rec.paused){rec.pause();d.classList.remove("on");d.setAttribute("aria-label","Play "+r.title);levels();return}
    if(!rec){rec=new Audio(u);rec.onended=()=>{d.classList.remove("on");d.setAttribute("aria-label","Play "+r.title);levels()}}
    const np=panel.querySelector(".np"),fail=e=>{d.classList.remove("on");const c=rec&&rec.error?rec.error.code:0;rec=null;levels();const why=(e&&e.name)?e.name:"";const hint=c===4||why==="NotSupportedError"?"The file was not found at that address, or the browser cannot read it as audio.":c===3?"The file is damaged or not valid audio.":why==="NotAllowedError"?"The browser blocked playback. Click the vinyl again.":"Unknown problem.";if(np)np.textContent="Could not play "+u+" ("+(why||"media error "+c)+"). "+hint;console.error("Audio failed",u,e,c)};
    rec.onerror=()=>fail();rec.play().then(()=>{d.classList.add("on");d.setAttribute("aria-label","Pause "+r.title);if(np)np.textContent="Click the vinyl to pause/play.";levels()}).catch(fail);
  };
  d.onclick();
}
$("#openBtn").onclick=()=>{
  if(AUDIO.ambient){amb=new Audio(AUDIO.ambient);amb.loop=true;amb.play().catch(()=>{})}
  else{try{crackle()}catch(e){}}
  levels();snd.hidden=false;
  document.querySelector("main").inert=false;
  const rm=matchMedia("(prefers-reduced-motion: reduce)").matches;
  gate.classList.add("up");
  setTimeout(()=>{gate.hidden=true},rm?0:1300);
};
snd.onclick=()=>{muted=!muted;snd.textContent=muted?"Sound off":"Sound on";snd.setAttribute("aria-pressed",String(muted));levels()};
$("#cnt").textContent=C.length+" crates, "+R.length+" records.";
let idx=0;
C.forEach(c=>{
  const sec=document.createElement("section");sec.className="crate-sec";sec.id="sec-"+c.id;
  sec.innerHTML=`<h2>${c.name} crate</h2><p class="note">${c.note}</p><div class="crate"><div class="row"></div><div class="lip" aria-hidden="true"><span>${c.name}</span></div><button class="arr l" type="button" aria-label="Scroll ${c.name} crate left">‹</button><button class="arr r" type="button" aria-label="Scroll ${c.name} crate right">›</button></div>`;
  const row=sec.querySelector(".row");
  const rm=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;
  sec.querySelector(".l").onclick=()=>row.scrollBy({left:-340,behavior:rm()?"auto":"smooth"});
  sec.querySelector(".r").onclick=()=>row.scrollBy({left:340,behavior:rm()?"auto":"smooth"});
  row.addEventListener("wheel",e=>{const max=row.scrollWidth-row.clientWidth;if(Math.abs(e.deltaY)>Math.abs(e.deltaX)&&max>0&&((e.deltaY>0&&row.scrollLeft<max)||(e.deltaY<0&&row.scrollLeft>0))){e.preventDefault();row.scrollLeft+=e.deltaY;}},{passive:false});
  let dx=0,sx=0,sl=0,drag=false;
  row.addEventListener("pointerdown",e=>{if(e.pointerType!=="mouse")return;drag=true;dx=0;sx=e.clientX;sl=row.scrollLeft;});
  row.addEventListener("pointermove",e=>{if(!drag)return;dx=e.clientX-sx;if(Math.abs(dx)>5)row.scrollLeft=sl-dx;});
  addEventListener("pointerup",()=>{drag=false;});
  row.addEventListener("click",e=>{if(Math.abs(dx)>5){e.stopPropagation();e.preventDefault();dx=0;}},true);
  R.filter(r=>r.crate===c.id).forEach(r=>{
    const b=document.createElement("button");
    b.className="sleeve drop";b.style.setProperty("--i",idx++);b.style.background=art(r);b.dataset.id=r.id;
    b.setAttribute("aria-pressed","false");b.setAttribute("aria-label",r.title+", "+r.sub);
    b.innerHTML=`<span class="chip"><b>${r.title}</b><i>${r.stat}</i></span>`;
    b.onclick=()=>open(r.id);row.appendChild(b);
  });
  $("#crates").appendChild(sec);
});
function open(id){
  const r=R.find(x=>x.id===id),v=vinyl();stopRec();
  document.querySelectorAll(".sleeve").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.id===id)));
  panel.innerHTML=`<div class="stage"><div class="big" style="background:${art(r)}"><span class="chip"><b>${r.title}</b><i>${r.stat}</i></span></div><div class="disc" style="--lbl:${v.lbl};--vbg:${v.bg}"></div></div>
  <div class="notes"><h3>${r.title}</h3><p class="sub">${r.sub}</p>${AUDIO.rec[r.id]?'<p class="np">Click the vinyl to pause/play.</p>':''}
  <h4>Side A</h4><p>${r.a}</p>
  <h4>Track list</h4><ol>${r.t.map(x=>`<li>${x}</li>`).join("")}</ol>
  <ul class="tags">${r.s.map(x=>`<li>${x}</li>`).join("")}</ul>
  <button class="close" type="button">Back to the crate</button></div>`;
  panel.hidden=false;bindDisc(r);
  $("#sec-"+r.crate).after(panel);
  panel.querySelector(".close").onclick=()=>{stopRec();panel.hidden=true;document.querySelectorAll(".sleeve").forEach(b=>b.setAttribute("aria-pressed","false"));const s=document.querySelector(`.sleeve[data-id="${id}"]`);s.focus();};
  const rm=matchMedia("(prefers-reduced-motion: reduce)").matches;
  panel.focus({preventScroll:true});
  panel.scrollIntoView({behavior:rm?"auto":"smooth",block:"nearest"});
}