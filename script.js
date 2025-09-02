// MFIT v17 — script.js (completo)
// - Glass dashboard com seções em cascata, colapsadas por padrão
// - Timer global com vibração forte nos últimos 5s
// - Export PDF (texto via print) e CSV
// - Upload foto + observação (Formspree)
// - Busca (desktop + overlay mobile)
// - Progresso, favoritos, tema, reset — tudo no localStorage

const FormspreeEndpoint = "https://formspree.io/f/mzzavnrq";

// ---------------- State & Storage ----------------
const store = {
  get(k, def){ try{ return JSON.parse(localStorage.getItem(k)) ?? def }catch(e){ return def } },
  set(k, v){ localStorage.setItem(k, JSON.stringify(v)) },
  del(k){ localStorage.removeItem(k) }
};

const STATE = {
  theme: store.get('theme', 'dark'),
  favorites: store.get('favorites', {}),
  progress: store.get('progress', {}), // {exerciseId: {done:true, time:sec}}
  points: store.get('points', 0),
  view: 'treinos'
};

// ---------------- Data (exercícios) ----------------
const DATA = [
  {
    key: 'quadriceps',
    title: 'Treino de Quadríceps',
    logo: 'Q',
    items: [
      { id:'qs_sumo', n:'Agachamento Sumô com Halteres', s:'3x10/10/10 (Drop – tudo conta como 1 série)', c:'0 kg', i:60, v:'https://media.musclewiki.com/media/uploads/videos/branded/female-dumbbell-sumo-squat-front.mp4' },
      { id:'qs_legpress', n:'Leg Press 45º', s:'4x15 (pés colados) + 15 (afastados)', c:'12 kg', i:40, v:'https://media.musclewiki.com/media/uploads/videos/branded/female-Machine-leg-press-front.mp4' },
      { id:'qs_aducao', n:'Adução de Quadril Máquina', s:'3x10/10/10 (Drop – 1 série)', c:'0 kg', i:60, v:'' },
      { id:'qs_cadflex', n:'Cadeira Flexora', s:'3x10/10/10 (Drop – 1 série)', c:'0 kg', i:60, v:'https://media.musclewiki.com/media/uploads/videos/branded/female-machine-seated-leg-curl-front.mp4' },
      { id:'qs_cadflex_uni', n:'Cadeira Flexora Unilateral', s:'3x10/10/10/10 (Drop – 1 série)', c:'0 kg', i:60, v:'' },
      { id:'qs_pant_step', n:'Panturrilha no Step', s:'4x15', c:'0 kg', i:30, v:'' },
      { id:'qs_canivete', n:'Abdominal Canivete', s:'4x15', c:'0 kg', i:30, v:'https://media.musclewiki.com/media/uploads/videos/branded/female-V-up-front.mp4' },
      { id:'qs_esteira', n:'Esteira Caminhada', s:'30 reps', c:'-', i:0, v:'' },
    ]
  },
  {
    key: 'posterior',
    title: 'Treino de Posterior e Glúteo',
    logo: 'P',
    items: [
      { id:'pg_agach_halt', n:'Agachamento com Halteres', s:'3x10+10+10 (Drop – 1 série)', c:'0 kg', i:60, v:'https://media.musclewiki.com/media/uploads/videos/branded/female-dumbbell-squat-front.mp4' },
      { id:'pg_abdmaq', n:'Abdução de Quadril Máquina', s:'3x10+10+10 (Drop – 1 série)', c:'0 kg', i:60, v:'' },
      { id:'pg_eliptico', n:'Elíptico', s:'25 reps', c:'0 kg', i:0, v:'' },
      { id:'pg_afundo_barra', n:'Afundo com Barra Livre', s:'3x12 3x10 2x8', c:'0 kg', i:60, v:'https://media.musclewiki.com/media/uploads/videos/branded/female-barbell-lunge-front.mp4' },
      { id:'pg_sumo_step', n:'Agachamento Sumô no Step com Halteres', s:'3x10+10+10 (Drop – 1 série)', c:'0 kg', i:60, v:'' },
      { id:'pg_cad_ext', n:'Cadeira Extensora', s:'3x10+10+10 (Drop – 1 série)', c:'0 kg', i:60, v:'https://media.musclewiki.com/media/uploads/videos/branded/female-machine-leg-extension-front.mp4' },
      { id:'pg_cad_ext_uni', n:'Cadeira Extensora Unilateral', s:'3x10+10+10 (Drop – 1 série)', c:'0 kg', i:60, v:'' },
      { id:'pg_legpress_uni', n:'Leg Press 45º Unilateral', s:'3x12 3x10 2x8', c:'0 kg', i:60, v:'' },
    ]
  },
  {
    key:'peito',
    title:'Treino de Peito, Tríceps e Bíceps',
    logo:'U',
    items:[
      { id:'pt_along_omtri', n:'Alongamento Ombros e Tríceps II', s:'3x20', c:'0 kg', i:0, v:'' },
      { id:'pt_bike', n:'Bike Spinning Sentada', s:'40 reps', c:'-', i:0, v:'' },
      { id:'pt_ab_supra', n:'Abdominal Supra Solo', s:'5x15', c:'0 kg', i:40, v:'' },
      { id:'pt_triceps_uni', n:'Tríceps Unilateral na Polia Alta (Peg. Neutra)', s:'3x15', c:'0 kg', i:30, v:'' },
      { id:'pt_along_peit', n:'Alongamento de Peitoral Espaldar', s:'3x15', c:'0 kg', i:40, v:'' },
      { id:'pt_mob_ombro', n:'Mobilidade de Ombro III', s:'3x20', c:'0 kg', i:0, v:'' },
      { id:'pt_rosca_alt', n:'Rosca Alternada com Halteres', s:'3x15', c:'0 kg', i:30, v:'https://media.musclewiki.com/media/uploads/videos/branded/female-dumbbell-alternating-bicep-curl-front.mp4' },
      { id:'pt_triceps_corda', n:'Tríceps na Polia com Corda', s:'3x15 Lento + 15 curto', c:'0 kg', i:30, v:'' },
      { id:'pt_triceps_uni2', n:'Tríceps Unilateral na Polia Alta (Peg. Neutra)', s:'3x15', c:'0 kg', i:30, v:'' },
      { id:'pt_crucifixo', n:'Crucifixo com Halteres', s:'4x12', c:'0 kg', i:30, v:'https://media.musclewiki.com/media/uploads/videos/branded/female-dumbbell-chest-fly-front.mp4' },
      { id:'pt_crucifixo_inc', n:'Crucifixo Inclinado com Halteres', s:'4x12', c:'0 kg', i:30, v:'' },
      { id:'pt_martelo', n:'Rosca Martelo com Halteres', s:'4x12', c:'0 kg', i:30, v:'https://media.musclewiki.com/media/uploads/videos/branded/female-dumbbell-hammer-curl-front.mp4' },
    ]
  },
  {
    key:'ombro',
    title:'Treino de Ombro e Costas',
    logo:'O',
    items:[
      { id:'oc_puxada_alta', n:'Puxada alta (pegada neutra)', s:'3x10/8/6 (Drop – 1 série)', c:'0 kg', i:30, v:'' },
      { id:'oc_canivete', n:'Abdominal Canivete', s:'3x12', c:'0 kg', i:30, v:'https://media.musclewiki.com/media/uploads/videos/branded/female-V-up-front.mp4' },
      { id:'oc_esteira', n:'Esteira Caminhada', s:'40 reps', c:'-', i:0, v:'' },
      { id:'oc_lat_uni', n:'Elevação Lateral Unilateral Sentado', s:'3x10/8/6 (Drop – 1 série)', c:'0 kg', i:30, v:'' },
      { id:'oc_frontal_alt', n:'Elevação Frontal Alternada', s:'3x12', c:'4 a 6 kg', i:30, v:'' },
      { id:'oc_desen_halt', n:'Desenvolvimento com Halteres (Peg. Neutra)', s:'3x10/8/6 (Drop – 1 série)', c:'0 kg', i:30, v:'https://media.musclewiki.com/media/uploads/videos/branded/female-dumbbell-shoulder-press-front.mp4' },
      { id:'oc_puxada_tri', n:'Puxada Neutra Triângulo', s:'3x10/8/6 (Drop – 1 série)', c:'0 kg', i:30, v:'' },
      { id:'oc_remada_tri', n:'Remada Baixa Triângulo', s:'3x10/8/6 (Drop – 1 série)', c:'0 kg', i:30, v:'' },
      { id:'oc_puxada_aberta', n:'Puxada Aberta Barra Reta', s:'3x10/8/6 (Drop – 1 série)', c:'0 kg', i:30, v:'' },
    ]
  }
];

// ---------------- Build UI ----------------
const contentEl = document.getElementById('content');

function el(tag, attrs={}, children=[]) {
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v])=>{
    if(k==='class') e.className = v;
    else if(k==='html') e.innerHTML = v;
    else if(k.startsWith('on')) e.addEventListener(k.slice(2), v);
    else e.setAttribute(k,v);
  });
  children.forEach(c => e.appendChild(c));
  return e;
}

function build() {
  contentEl.innerHTML = '';
  DATA.forEach(section => {
    const wrapper = el('section', {class:'section', 'data-key':section.key});
    const head = el('div', {class:'section-head'});
    const left = el('div', {class:'section-left'});
    const logo = el('div', {class:'section-logo', title:section.title}, [document.createTextNode(section.logo)]);
    const h2 = el('h2', {html: section.title});
    left.append(logo, h2);
    const toggle = el('button', {class:'toggle', title:'Expandir/Recolher', onclick:()=>{
      grid.classList.toggle('hidden');
      toggle.innerHTML = grid.classList.contains('hidden') ? '<i class="fa-solid fa-plus"></i>' : '<i class="fa-solid fa-minus"></i>';
    }}, []);
    toggle.innerHTML = '<i class="fa-solid fa-plus"></i>'; // fechado padrão
    head.append(left, toggle);
    const grid = el('div', {class:'grid hidden'});

    section.items.forEach(item => grid.appendChild(cardFor(section.key, item)));
    wrapper.append(head, grid);
    contentEl.appendChild(wrapper);
  });
  refreshSummary();
}

function cardFor(secKey, it){
  const done = !!STATE.progress[it.id]?.done;
  const card = el('div', {class:'card', 'data-id':it.id, 'data-sec':secKey});

  const head = el('div', {class:'head'});
  const titleGroup = el('div');
  const h3 = el('h3', {html: it.n});
  const meta = el('div', {class:'meta', html:`<div><strong>Séries:</strong> ${it.s}</div>
    <div><strong>Carga:</strong> ${it.c}</div>
    ${it.i?`<div><strong>Intervalo:</strong> ${it.i}s</div>`:''}`});
  titleGroup.append(h3, meta);

  const tools = el('div', {class:'tools'});
  const favBtn = el('button', {class:'btn icon fav'+(STATE.favorites[it.id]?' active':''), title:'Favoritar', onclick:()=>toggleFav(it.id)}); 
  favBtn.innerHTML = '<i class="fa-regular fa-star"></i>';
  const doneBtn = el('button', {class:'btn icon', title:'Marcar concluído', onclick:()=>toggleDone(it.id)});
  doneBtn.innerHTML = done ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-regular fa-circle"></i>';
  const playBtn = el('button', {class:'btn icon', title:'Iniciar intervalo', onclick:()=>startTimer(it.i||30)}); playBtn.innerHTML='<i class="fa-solid fa-play"></i>';
  tools.append(favBtn, doneBtn, playBtn);

  head.append(titleGroup, tools);
  card.append(head);

  if(it.v){
    const thumb = el('div', {class:'thumb'});
    const v = el('video', {controls:true, preload:'metadata', playsinline:true, src:it.v});
    thumb.appendChild(v); card.appendChild(thumb);
  }
  return card;
}

// ---------------- Favorites / Progress ----------------
function toggleFav(id){
  const isFav = !!STATE.favorites[id];
  if(isFav) delete STATE.favorites[id]; else STATE.favorites[id]=true;
  store.set('favorites', STATE.favorites);
  // update UI
  document.querySelectorAll(`.card[data-id="${id}"] .fav`).forEach(el=>el.classList.toggle('active', !!STATE.favorites[id]));
  refreshSummary();
}
function toggleDone(id){
  const entry = STATE.progress[id] || {};
  entry.done = !entry.done;
  STATE.progress[id] = entry;
  store.set('progress', STATE.progress);
  document.querySelectorAll(`.card[data-id="${id}"] .btn.icon:nth-child(2)`).forEach(el=>{
    el.innerHTML = STATE.progress[id].done ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-regular fa-circle"></i>';
  });
  refreshSummary();
}

function refreshSummary(){
  const doneCount = Object.values(STATE.progress).filter(x=>x.done).length;
  document.getElementById('badgeDone').querySelector('b').textContent = doneCount;
  document.getElementById('sumDone').textContent = `${doneCount} concl.`;
  const favCount = Object.keys(STATE.favorites).length;
  document.getElementById('sumFav').textContent = `${favCount} favs`;
  document.getElementById('badgePoints').querySelector('b').textContent = STATE.points;
}

// ---------------- Timer Global ----------------
let tLeft = 30, tTimer=null;
const tDisplay = document.getElementById('tDisplay');
function fmt(sec){ const m = String(Math.floor(sec/60)).padStart(2,'0'); const s = String(sec%60).padStart(2,'0'); return `${m}:${s}` }
function updateBadgeTime(){ document.getElementById('badgeTime').querySelector('b').textContent = fmt(tElapsed); document.getElementById('sumTime').textContent = fmt(tElapsed) }

let tElapsed = store.get('elapsed', 0);
updateBadgeTime();

function startTimer(sec){
  if(!sec) sec = 30;
  tLeft = sec;
  renderT();
  if(tTimer) clearInterval(tTimer);
  tTimer = setInterval(()=>{
    tLeft--;
    // vibração forte nos últimos 5s
    if(tLeft<=5 && tLeft>0 && navigator.vibrate){
      navigator.vibrate([60,60,60]); // pulsos curtos
    }
    if(tLeft<=0){
      clearInterval(tTimer); tTimer=null;
      doneBeep(); showDonePopup();
    }
    renderT();
  },1000);
}
function renderT(){ tDisplay.textContent = fmt(tLeft) }
function pauseTimer(){ if(tTimer){ clearInterval(tTimer); tTimer=null } }
function stopTimer(){ pauseTimer(); tLeft=30; renderT() }
function markDone(){ STATE.points += 5; tElapsed += (tLeft?0:0); store.set('points', STATE.points); store.set('elapsed', tElapsed); refreshSummary(); }

function doneBeep(){
  try{
    const ctx = new (window.AudioContext||window.webkitAudioContext)();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type='sine'; o.frequency.value=880; o.connect(g); g.connect(ctx.destination); o.start();
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    setTimeout(()=>o.stop(), 500);
  }catch(e){}
}
function showDonePopup(){
  const ok = document.createElement('div');
  ok.style.position='fixed'; ok.style.inset='0'; ok.style.display='grid'; ok.style.placeItems='center';
  ok.style.background='rgba(0,0,0,.35)'; ok.style.zIndex='50';
  ok.innerHTML = `<div class="glass" style="padding:18px 20px;border-radius:18px;text-align:center;">
    <div style="font-size:42px;margin-bottom:6px">✔️</div>
    <h3 style="margin:6px 0 10px">Intervalo concluído!</h3>
    <button class="chip success" id="okClose"><i class="fa-solid fa-check"></i> Ok</button>
  </div>`;
  document.body.appendChild(ok);
  document.getElementById('okClose').onclick = ()=> ok.remove();
  if(navigator.vibrate) navigator.vibrate([120,80,120,80,180]);
}

// Timer controls
document.getElementById('tStart').onclick = ()=> startTimer(tLeft||30);
document.getElementById('tPause').onclick = pauseTimer;
document.getElementById('tStop').onclick = stopTimer;
document.getElementById('tDone').onclick = markDone;

// ---------------- Theme ----------------
function applyTheme(){ document.body.classList.toggle('light', STATE.theme==='light') }
applyTheme();
document.getElementById('btnTheme').onclick = ()=>{ STATE.theme = STATE.theme==='light'?'dark':'light'; store.set('theme', STATE.theme); applyTheme(); };

// ---------------- Search ----------------
const filterAll = (q)=>{
  const term = q.trim().toLowerCase();
  document.querySelectorAll('.card').forEach(c=>{
    const txt = c.textContent.toLowerCase();
    c.style.display = txt.includes(term) ? '' : 'none';
  });
};

document.getElementById('searchInputDesktop')?.addEventListener('input', e=>filterAll(e.target.value));
document.getElementById('btnSearchMobile').onclick = ()=>{
  document.getElementById('searchOverlay').style.display='grid';
  document.getElementById('searchInputOverlay').focus();
};
document.getElementById('closeOverlay').onclick = ()=>{
  document.getElementById('searchOverlay').style.display='none';
  document.getElementById('searchInputOverlay').value='';
  filterAll('');
};
document.getElementById('searchInputOverlay').addEventListener('input', e=>filterAll(e.target.value));

// ---------------- Export PDF (print text-only) ----------------
document.getElementById('btnExportPDF').onclick = ()=>{
  // Monta printArea apenas com texto (sem vídeos)
  const area = document.getElementById('printArea');
  area.innerHTML = '';
  DATA.forEach(sec=>{
    const secEl = document.createElement('section');
    secEl.innerHTML = `<h2>${sec.title}</h2>`;
    sec.items.forEach(it=>{
      secEl.innerHTML += `<h3>${it.n}</h3>
      <div><strong>Séries:</strong> ${it.s}</div>
      <div><strong>Carga:</strong> ${it.c}</div>
      ${it.i?`<div><strong>Intervalo:</strong> ${it.i}s</div>`:''}
      <br/>`;
    });
    area.appendChild(secEl);
  });
  window.print();
};

// ---------------- Export CSV ----------------
document.getElementById('btnExportCSV').onclick = ()=>{
  const rows = [['Seção','Exercício','Séries','Carga','Intervalo(s)']];
  DATA.forEach(sec=>sec.items.forEach(it=>rows.push([sec.title, it.n, it.s, it.c, it.i||''])));
  const csv = rows.map(r=>r.map(x=>`"${String(x).replace(/"/g,'""')}"`).join(',')).join('\\n');
  const blob = new Blob([csv],{type:'text/csv;charset=utf-8;'});
  const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='mfit-treinos.csv'; a.click(); URL.revokeObjectURL(a.href);
};

// ---------------- Upload (Formspree) ----------------
const uploadModal = document.getElementById('uploadModal');
document.getElementById('btnUpload').onclick = ()=> uploadModal.classList.remove('hidden');
document.getElementById('closeUpload').onclick = ()=> uploadModal.classList.add('hidden');

document.getElementById('uploadForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  try{
    const r = await fetch(FormspreeEndpoint, { method:'POST', body:fd, headers:{'Accept':'application/json'} });
    if(r.ok){
      e.target.reset();
      alert('Enviado com sucesso!');
      uploadModal.classList.add('hidden');
    }else{
      alert('Falha ao enviar. Tente novamente.');
    }
  }catch(err){ alert('Erro de rede.'); }
});

// ---------------- Reset ----------------
document.getElementById('btnReset').onclick = ()=>{
  if(confirm('Resetar todo o progresso?')){
    STATE.favorites = {};
    STATE.progress = {};
    STATE.points = 0;
    store.set('favorites', STATE.favorites);
    store.set('progress', STATE.progress);
    store.set('points', STATE.points);
    build();
  }
};

// ---------------- Build app ----------------
build();
