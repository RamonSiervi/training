/* =========================================================
   MFIT - v16: foco mobile app-like
   - Resumo compacto em badges no topo (sem seções de Resumo/Calendário)
   - Bottom Nav (mobile), FAB + menu, Gestos (swipe), Transições
   - Quick Timer Widget com botão Concluir (popup/vibração)
   - Busca overlay no mobile
   - Mantém: favoritos, progresso, PDF/CSV, upload(Formspree), reset, dark/compact
   ========================================================= */

// ===== Config =====
const ENDPOINT_URL = "https://formspree.io/f/mzzavnrq"; // seu Formspree
const KCAL_PER_MIN = 5;     // estimativa simples (mantido para badges no futuro)
const POINTS_PER_DONE = 10; // gamificação leve
const STORAGE_KEYS = {
  done: 'mfit_done',
  fav: 'mfit_fav',
  prefsDark: 'prefers-dark',
  prefsCompact: 'prefers-compact',
  daily: 'mfit_daily' // { 'YYYY-MM-DD': {done:int, seconds:int, points:int} }
};

// ===== Dados dos treinos (do seu briefing) =====
window.__TRAINING__ = [
  {
    key: "quads",
    icon: "fa-solid fa-dumbbell",
    title: "Treino de Quadríceps",
    items: [
      { name:"Agachamento Sumô com Halteres", series:"3x10/10/10 (Drop – faz tudo e conta como 1 série)", carga:"0 kg", intervalo:"60s", video:"https://media.musclewiki.com/media/uploads/videos/branded/female-dumbbell-sumo-squat-front.mp4" },
      { name:"Leg Press 45º", series:"4x15 (pés colados) + 15 (afastados)", carga:"12 kg", intervalo:"40s", video:"https://media.musclewiki.com/media/uploads/videos/branded/female-Machine-leg-press-front.mp4" },
      { name:"Adução de Quadril Máquina", series:"3x10/10/10 (Drop – faz tudo e conta como 1 série)", carga:"0 kg", intervalo:"60s", video:null },
      { name:"Cadeira Flexorad", series:"3x10/10/10 (Drop – faz tudo e conta como 1 série)", carga:"0 kg", intervalo:"60s", video:null },
      { name:"Cadeira Flexora Unilateral", series:"3x10/10/10/10 (Drop – faz tudo e conta como 1 série)", carga:"0 kg", intervalo:"60s", video:null },
      { name:"Panturrilha no Step", series:"4x15", carga:"0 kg", intervalo:"30s", video:null },
      { name:"Abdominal Canivete", series:"4x15", carga:"0 kg", intervalo:"30s", video:null },
      { name:"Esteira Caminhada", series:"30 reps", carga:"", intervalo:"", video:null }
    ]
  },
  {
    key: "posterior",
    icon: "fa-solid fa-person-walking",
    title: "Treino de Posterior e Glúteo",
    items: [
      { name:"Agachamento com Halteres", series:"3x10+10+10 (Drop – faz tudo e conta como 1 série)", carga:"0 kg", intervalo:"60s", video:null },
      { name:"Abdução de Quadril Máquina", series:"3x10+10+10 (Drop – faz tudo e conta como 1 série)", carga:"0 kg", intervalo:"60s", video:null },
      { name:"Elíptico", series:"25 reps", carga:"0 kg", intervalo:"", video:null },
      { name:"Afundo com Barra Livre", series:"3x12 • 3x10 • 2x8", carga:"0 kg", intervalo:"60s", video:null },
      { name:"Agachamento Sumô no Step com Halteres", series:"3x10+10+10 (Drop – faz tudo e conta como 1 série)", carga:"0 kg", intervalo:"60s", video:null },
      { name:"Abdução de Quadril Máquina", series:"3x10+10+10 (Drop – faz tudo e conta como 1 série)", carga:"0 kg", intervalo:"60s", video:null },
      { name:"Cadeira Extensora", series:"3x10+10+10 (Drop – faz tudo e conta como 1 série)", carga:"0 kg", intervalo:"60s", video:null },
      { name:"Cadeira Extensora Unilateral", series:"3x10+10+10 (Drop – faz tudo e conta como 1 série)", carga:"0 kg", intervalo:"60s", video:null },
      { name:"Leg Press 45º Unilateral", series:"3x12 • 3x10 • 2x8", carga:"0 kg", intervalo:"60s", video:null }
    ]
  },
  {
    key: "peito",
    icon: "fa-solid fa-hand-fist",
    title: "Treino de Peito, Tríceps e Bíceps",
    items: [
      { name:"Alongamento de Ombros e Tríceps II", series:"3x20", carga:"0 kg", intervalo:"", video:null },
      { name:"Bike Spinning Sentada", series:"40 reps", carga:"", intervalo:"", video:null },
      { name:"Abdominal Supra Solo", series:"5x15", carga:"0 kg", intervalo:"40s", video:null },
      { name:"Tríceps Unilateral na Polia Alta (Pegada Neutra)", series:"3x15", carga:"0 kg", intervalo:"30s", video:null },
      { name:"Alongamento de Peitoral Espaldar", series:"3x15", carga:"0 kg", intervalo:"40s", video:null },
      { name:"Mobilidade de Ombro III", series:"3x20", carga:"0 kg", intervalo:"", video:null },
      { name:"Rosca Alternada com Halteres", series:"3x15", carga:"0 kg", intervalo:"30s", video:null },
      { name:"Tríceps na Polia com Corda", series:"3x15 (Lento) + 15 (Curto)", carga:"0 kg", intervalo:"30s", video:null },
      { name:"Tríceps Unilateral na Polia Alta (Pegada Neutra)", series:"3x15", carga:"0 kg", intervalo:"30s", video:null },
      { name:"Crucifixo com Halteres", series:"4x12", carga:"0 kg", intervalo:"30s", video:null },
      { name:"Crucifixo Inclinado com Halteres", series:"4x12", carga:"0 kg", intervalo:"30s", video:null },
      { name:"Rosca Martelo com Halteres", series:"4x12", carga:"0 kg", intervalo:"30s", video:null }
    ]
  },
  {
    key: "ombro",
    icon: "fa-solid fa-weight-hanging",
    title: "Treino de Ombro e Costa",
    items: [
      { name:"Puxada Alta (Pegada Neutra)", series:"3x10/8/6 (Drop – faz tudo e conta como 1 série)", carga:"0 kg", intervalo:"30s", video:null },
      { name:"Abdominal Canivete", series:"3x12", carga:"0 kg", intervalo:"30s", video:null },
      { name:"Esteira Caminhada", series:"40 reps", carga:"", intervalo:"", video:null },
      { name:"Elevação Lateral Unilateral Sentado com Halteres", series:"3x10/8/6 (Drop – faz tudo e conta como 1 série)", carga:"0 kg", intervalo:"30s", video:null },
      { name:"Elevação Frontal Alternada", series:"3x12", carga:"4 a 6 kg", intervalo:"30s", video:null },
      { name:"Desenvolvimento com Halteres (Pegada Neutra)", series:"3x10/8/6 (Drop – faz tudo e conta como 1 série)", carga:"0 kg", intervalo:"30s", video:null },
      { name:"Puxada Neutra Triângulo", series:"3x10/8/6 (Drop – faz tudo e conta como 1 série)", carga:"0 kg", intervalo:"30s", video:null },
      { name:"Remada Baixa Triângulo", series:"3x10/8/6 (Drop – faz tudo e conta como 1 série)", carga:"0 kg", intervalo:"30s", video:null },
      { name:"Puxada Aberta Barra Reta", series:"3x10/8/6 (Drop – faz tudo e conta como 1 série)", carga:"0 kg", intervalo:"30s", video:null }
    ]
  }
];

// ===== Helpers =====
const app = document.getElementById('app');
const footerInfo = document.getElementById('footerInfo');
const searchInput = document.getElementById('searchInput');
const btnOpenSearchMobile = document.getElementById('btnOpenSearchMobile');
const searchOverlay = document.getElementById('searchOverlay');
const searchInputOverlay = document.getElementById('searchInputOverlay');
const closeSearch = document.getElementById('closeSearch');

const btnTheme = document.getElementById('btnTheme');
const btnCompact = document.getElementById('btnCompact');
const btnExportPDF = document.getElementById('btnExportPDF');
const btnExportCSV = document.getElementById('btnExportCSV');
const btnUpload = document.getElementById('btnUpload');
const btnReset = document.getElementById('btnReset');

const miniDone = document.getElementById('bDone');
const miniTime = document.getElementById('bTime');
const miniPoints = document.getElementById('bPoints');

const timerWidget = document.getElementById('timerWidget');
const twName = document.getElementById('twName');
const twTime = document.getElementById('twTime');
const twPause = document.getElementById('twPause');
const twStop = document.getElementById('twStop');
const twDone = document.getElementById('twDone');

const fab = document.getElementById('fab');
const fabMenu = document.getElementById('fabMenu');
const fabFavoriteAll = document.getElementById('fabFavoriteAll');
const fabReset = document.getElementById('fabReset');
const fabNotes = document.getElementById('fabNotes');

const bottomNav = document.getElementById('bottomNav');

const modal = document.getElementById('uploadModal');
const closeModal = document.getElementById('closeModal');
const uploadForm = document.getElementById('uploadForm');
const statusBox = document.getElementById('uploadStatus');

const resetModal = document.getElementById('resetModal');
const cancelReset = document.getElementById('cancelReset');
const confirmReset = document.getElementById('confirmReset');
const donePopup = document.getElementById('donePopup');
const donePopupText = document.getElementById('donePopupText');
const toast = document.getElementById('toast');

const store = {
  get done(){ try{return JSON.parse(localStorage.getItem(STORAGE_KEYS.done)||'{}')}catch(_){return{}} },
  set done(v){ localStorage.setItem(STORAGE_KEYS.done, JSON.stringify(v)) },
  get fav(){ try{return JSON.parse(localStorage.getItem(STORAGE_KEYS.fav)||'{}')}catch(_){return{}} },
  set fav(v){ localStorage.setItem(STORAGE_KEYS.fav, JSON.stringify(v)) },
  get daily(){ try{return JSON.parse(localStorage.getItem(STORAGE_KEYS.daily)||'{}')}catch(_){return{}} },
  set daily(v){ localStorage.setItem(STORAGE_KEYS.daily, JSON.stringify(v)) },
};
function todayKey(){ return new Date().toISOString().slice(0,10); }
function slugify(str){ return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }
function exId(sectionKey, name){ return `${sectionKey}__${slugify(name)}`; }
function parseSeconds(txt){
  if(!txt) return 60;
  const m = (txt+'').match(/(\d+)\s*s/);
  if(m) return parseInt(m[1],10);
  const m2 = (txt+'').match(/(\d+)\s*$/);
  return m2 ? parseInt(m2[1],10) : 60;
}
function fmtTime(sec){ const m=Math.floor(sec/60), s=sec%60; return `${m}m ${s}s`; }
function totalExercises(){ let t=0; window.__TRAINING__.forEach(s=> t+=s.items.length); return t||1; }

// ===== Render =====
function render(){
  app.innerHTML = "";
  let total = 0;

  // Favoritos (seção aberta por padrão)
  const favItems = [];
  const favMap = store.fav;
  window.__TRAINING__.forEach(section => {
    section.items.forEach(ex => {
      const id = exId(section.key, ex.name);
      if(favMap[id]) favItems.push({section, ex, id});
    });
  });
  if(favItems.length){
    const favSec = document.createElement('section');
    favSec.className = "section favs";
    favSec.innerHTML = `
      <div class="section-header glass">
        <div class="section-title"><i class="fa-solid fa-star"></i><strong>Favoritos</strong></div>
        <div class="section-toggle" data-open="1" title="Expandir/Fechar"><div class="pm">–</div></div>
      </div>
      <div class="section-body open"></div>
    `;
    const body = favSec.querySelector('.section-body');
    body.style.maxHeight = '1000vh';
    favItems.forEach(({section,ex,id})=> body.appendChild(buildCard(section, ex, id)));
    setupToggle(favSec);
    app.appendChild(favSec);
  }

  // Demais seções (fechadas por padrão)
  window.__TRAINING__.forEach(section => {
    total += section.items.length;
    const wrap = document.createElement('section');
    wrap.className = `section ${section.key}`;
    wrap.innerHTML = `
      <div class="section-header glass">
        <div class="section-title">
          <i class="${section.icon}"></i>
          <strong>${section.title} <span class="badge" data-prog></span></strong>
        </div>
        <div class="section-toggle" data-open="0" title="Expandir/Fechar"><div class="pm">＋</div></div>
      </div>
      <div class="section-body"></div>
    `;
    const body = wrap.querySelector('.section-body');
    section.items.forEach(ex=>{
      const id = exId(section.key, ex.name);
      body.appendChild(buildCard(section, ex, id));
    });
    setupToggle(wrap);
    updateProgress(wrap);
    app.appendChild(wrap);
  });

  footerInfo.textContent = `Total de seções: ${window.__TRAINING__.length} • Total de exercícios: ${total}`;

  updateMiniSummary();
  setupGestures();
}

// ===== Cards =====
function buildCard(section, ex, id){
  const doneMap = store.done, favMap = store.fav;
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.name = ex.name.toLowerCase();
  if(doneMap[id]) card.classList.add('done');
  if(favMap[id]) card.classList.add('fav');
  const secs = parseSeconds(ex.intervalo);

  card.innerHTML = `
    <div class="info">
      <h3>${ex.name}</h3>
      <div class="meta">
        <div><strong>Séries:</strong> ${ex.series || "-"}</div>
        ${ex.carga ? `<div><strong>Carga:</strong> ${ex.carga}</div>` : ""}
        ${ex.intervalo ? `<div><strong>Intervalo:</strong> ${ex.intervalo}</div>` : ""}
      </div>
      <div class="actions">
        <button class="pill btn-done" title="Marcar como concluído"><i class="fa-solid fa-check"></i><span>Concluir</span></button>
        <button class="pill btn-fav" title="Favoritar"><i class="fa-solid fa-star"></i><span>Favorito</span></button>
        <button class="pill btn-timer" title="Iniciar intervalo"><i class="fa-solid fa-stopwatch"></i><span class="tlabel">${secs}s</span></button>
      </div>
    </div>
    ${ex.video ? `<div class="thumb">
        <video controls muted preload="metadata" playsinline src="${ex.video}"></video>
        <button class="pip-btn" title="PIP"><i class="fa-solid fa-square"></i></button>
      </div>` : ""}
  `;

  // Ações principais
  card.querySelector('.btn-done').addEventListener('click', ()=>{
    toggleDone(id, card);
  });
  card.querySelector('.btn-fav').addEventListener('click', ()=>{
    const map = store.fav;
    map[id] = !map[id];
    store.fav = map;
    card.classList.toggle('fav', !!map[id]);
    render(); // re-render para atualizar seção de favoritos
  });
  // Timer
  const tBtn = card.querySelector('.btn-timer');
  tBtn.addEventListener('click', (e)=>{
    startGlobalTimer({ id, section:section.key, name:ex.name, seconds:secs, onTickLabel:e.currentTarget.querySelector('.tlabel'), card });
  });
  // PIP
  const pip = card.querySelector('.pip-btn');
  if(pip){
    const vid = card.querySelector('video');
    pip.addEventListener('click', async ()=>{
      try{
        if(document.pictureInPictureElement){
          await document.exitPictureInPicture();
        }else if(vid && !vid.disablePictureInPicture){
          await vid.requestPictureInPicture();
        }
      }catch(_){}
    });
  }
  return card;
}

function toggleDone(id, card){
  const map = store.done;
  const now = !map[id];
  map[id] = now;
  store.done = map;
  card.classList.toggle('done', now);
  updateAllProgress();
  if(now){ addPointsAndDaily(POINTS_PER_DONE, 0, 1); showDonePopup(card.querySelector('h3')?.textContent || "Exercício"); }
  updateMiniSummary();
}

// ===== Toggle seções =====
function setupToggle(sectionEl){
  const body = sectionEl.querySelector('.section-body');
  const toggle = sectionEl.querySelector('.section-toggle');
  if(toggle.dataset.open === '1'){
    body.classList.add('open');
    body.style.maxHeight = body.scrollHeight + 'px';
  }else{
    body.classList.remove('open');
    body.style.maxHeight = '0px';
  }
  toggle.addEventListener('click', ()=>{
    const opened = toggle.dataset.open === '1';
    if(opened){
      toggle.dataset.open = '0';
      toggle.querySelector('.pm').textContent = '＋';
      toggle.classList.remove('open');
      body.style.maxHeight = '0px';
      body.style.opacity = 0;
    }else{
      toggle.dataset.open = '1';
      toggle.querySelector('.pm').textContent = '–';
      toggle.classList.add('open');
      body.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
      body.style.opacity = 1;
    }
  });
}

function updateProgress(sectionEl){
  const cards = sectionEl.querySelectorAll('.card');
  const done = Array.from(cards).filter(c=> c.classList.contains('done')).length;
  const badge = sectionEl.querySelector('[data-prog]');
  if(badge) badge.textContent = `• ${done}/${cards.length} concluídos`;
}
function updateAllProgress(){
  document.querySelectorAll('.section').forEach(updateProgress);
}

// ===== Busca =====
function applySearch(term){
  const q = term.trim().toLowerCase();
  let matches = 0;
  document.querySelectorAll('.section').forEach(sec=>{
    const body = sec.querySelector('.section-body');
    const toggle = sec.querySelector('.section-toggle');
    if(!body) return;
    let sectionHas = 0;
    body.querySelectorAll('.card').forEach(card=>{
      const ok = !q || card.dataset.name.includes(q);
      card.style.display = ok ? '' : 'none';
      if(ok) sectionHas++;
    });
    if(sectionHas>0){
      if(toggle.dataset.open !== '1'){
        toggle.dataset.open = '1';
        toggle.querySelector('.pm').textContent = '–';
        toggle.classList.add('open');
        body.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
        body.style.opacity = 1;
      }
      matches += sectionHas;
      sec.style.display = '';
    }else{
      sec.style.display = q ? 'none' : '';
      if(!q && toggle.dataset.open !== '0'){
        toggle.dataset.open = '0';
        toggle.querySelector('.pm').textContent = '＋';
        toggle.classList.remove('open');
        body.classList.remove('open');
        body.style.maxHeight = '0px';
        body.style.opacity = 0;
      }
    }
  });
  footerInfo.textContent = q
    ? `Resultados: ${matches}`
    : `Total de seções: ${window.__TRAINING__.length} • Total de exercícios: ${Array.from(document.querySelectorAll('.card')).length}`;
}

document.getElementById('searchInput').addEventListener('input', e=> applySearch(e.target.value));
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape'){ searchInput.value=''; applySearch(''); closeSearchOverlay(); } });

// Overlay de busca mobile
btnOpenSearchMobile.addEventListener('click', openSearchOverlay);
closeSearch.addEventListener('click', closeSearchOverlay);
searchInputOverlay.addEventListener('input', e=> applySearch(e.target.value));
function openSearchOverlay(){ searchOverlay.classList.remove('hidden'); searchInputOverlay.focus(); }
function closeSearchOverlay(){ searchOverlay.classList.add('hidden'); searchInputOverlay.value=''; applySearch(''); }

// ===== Timer Global (widget) =====
let gTimer = { active:false, remain:0, handle:null, paused:false, originSeconds:0, id:null, name:"", card:null, labelEl:null };

function startGlobalTimer({id, section, name, seconds, onTickLabel, card}){
  stopGlobalTimer(false);
  gTimer.active = true;
  gTimer.remain = seconds;
  gTimer.originSeconds = seconds;
  gTimer.id = id;
  gTimer.name = name;
  gTimer.card = card;
  gTimer.labelEl = onTickLabel;
  twName.textContent = name;
  twTime.textContent = fmtClock(seconds);
  timerWidget.classList.remove('hidden');
  tickLabel();
  gTimer.handle = setInterval(onTick, 1000);
}

function onTick(){
  if(gTimer.paused) return;
  gTimer.remain--;
  tickLabel();
  addPointsAndDaily(0,1,0);
  if(gTimer.remain <= 0){
    stopGlobalTimer(false);
    showDonePopup(gTimer.name + " (Timer)");
    // botão Done do widget ficará visível; auto focus pode vibrar
    try{ if(navigator.vibrate) navigator.vibrate([120,60,120]); }catch(_){}
    // som
    beep();
  }
}
function tickLabel(){
  const t = gTimer.remain;
  twTime.textContent = fmtClock(t);
  if(gTimer.labelEl) gTimer.labelEl.textContent = `${t}s`;
}
function fmtClock(sec){
  const m = String(Math.floor(sec/60)).padStart(2,'0');
  const s = String(sec%60).padStart(2,'0');
  return `${m}:${s}`;
}
function stopGlobalTimer(hide=true){
  if(gTimer.handle) clearInterval(gTimer.handle);
  gTimer.handle = null;
  gTimer.active = false;
  gTimer.paused = false;
  if(hide) timerWidget.classList.add('hidden');
}
twPause.addEventListener('click',()=>{
  if(!gTimer.active) return;
  gTimer.paused = !gTimer.paused;
  twPause.innerHTML = gTimer.paused ? '<i class="fa-solid fa-play"></i>' : '<i class="fa-solid fa-pause"></i>';
});
twStop.addEventListener('click',()=>{
  stopGlobalTimer(true);
});
twDone.addEventListener('click',()=>{
  if(!gTimer.id || !gTimer.card) return;
  // marcar concluído
  toggleDone(gTimer.id, gTimer.card);
  stopGlobalTimer(true);
});

function beep(){
  try{
    const ctx = new (window.AudioContext||window.webkitAudioContext)();
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value = 880; g.gain.value=.1; o.start();
    setTimeout(()=>{o.stop();ctx.close();}, 320);
  }catch(_){}
}

function showDonePopup(name){
  donePopupText.textContent = name;
  donePopup.classList.remove('hidden');
  donePopup.style.opacity = '1';
  donePopup.style.transform = 'translateX(-50%) translateY(0)';
  setTimeout(()=>{
    donePopup.style.opacity = '0';
    donePopup.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(()=> donePopup.classList.add('hidden'), 300);
  }, 1500);
}

// ===== Pontos e diário =====
function addPointsAndDaily(points, seconds, doneInc){
  const key = todayKey();
  const daily = store.daily;
  if(!daily[key]) daily[key] = { done:0, seconds:0, points:0 };
  daily[key].done += (doneInc||0);
  daily[key].seconds += (seconds||0);
  daily[key].points += (points||0);
  store.daily = daily;
  updateMiniSummary();
}
function updateMiniSummary(){
  const d = store.daily[todayKey()] || {done:0, seconds:0, points:0};
  miniDone.textContent = d.done;
  miniTime.textContent = fmtTime(d.seconds);
  miniPoints.textContent = d.points;
}

// ===== Tema / Compacto =====
btnTheme.addEventListener('click', ()=>{
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem(STORAGE_KEYS.prefsDark, isDark ? '1':'0');
});
if(localStorage.getItem(STORAGE_KEYS.prefsDark) === '1'){
  document.documentElement.classList.add('dark');
}
btnCompact.addEventListener('click', ()=>{
  const now = document.body.classList.toggle('compact');
  localStorage.setItem(STORAGE_KEYS.prefsCompact, now ? '1':'0');
});
if(localStorage.getItem(STORAGE_KEYS.prefsCompact) === '1'){
  document.body.classList.add('compact');
}

// ===== Exportações =====
btnExportPDF.addEventListener('click', ()=>{
  const container = buildExportContainer();
  const opt = { margin:10, filename:'treino-texto.pdf', html2canvas:{scale:2,useCORS:true},
                jsPDF:{unit:'mm',format:'a4',orientation:'portrait'} };
  html2pdf().from(container).set(opt).save();
});
btnExportCSV.addEventListener('click', ()=>{
  const rows = [["Seção","Exercício","Séries","Carga","Intervalo"]];
  window.__TRAINING__.forEach(s=> s.items.forEach(ex=> rows.push([s.title, ex.name, ex.series||"", ex.carga||"", ex.intervalo||""])));
  const csv = rows.map(r=> r.map(v=> `"${(v||'').toString().replace(/"/g,'""')}"`).join(",")).join("\n");
  const blob = new Blob([csv],{type:"text/csv;charset=utf-8"});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = "treino.csv"; a.click(); URL.revokeObjectURL(a.href);
});
function buildExportContainer(){
  const container = document.createElement('div');
  container.style.padding = '12px';
  container.style.maxWidth = '800px';
  container.innerHTML = `<h1 style="font-family:Inter,Arial;margin:0 0 8px">Plano de Treinos</h1>
                         <div style="color:#6b7280;margin-bottom:12px">Exportado em ${new Date().toLocaleString()}</div>`;
  window.__TRAINING__.forEach(section=>{
    const s = document.createElement('div');
    s.style.margin = '8px 0 12px';
    s.innerHTML = `<h2 style="font-size:16px;margin:8px 0">${section.title}</h2>`;
    section.items.forEach((ex, idx)=>{
      const item = document.createElement('div');
      item.style.margin = '0 0 8px';
      item.innerHTML = `
        <div><strong>${idx+1}. ${ex.name}</strong></div>
        <div>Séries: ${ex.series || '-'}</div>
        ${ex.carga ? `<div>Carga: ${ex.carga}</div>` : ""}
        ${ex.intervalo ? `<div>Intervalo: ${ex.intervalo}</div>` : ""}
      `;
      s.appendChild(item);
    });
    container.appendChild(s);
  });
  return container;
}

// ===== Upload (Formspree) =====
function openModal(){ modal.classList.remove('hidden'); modal.setAttribute('aria-hidden','false'); }
function hideModal(){ modal.classList.add('hidden'); modal.setAttribute('aria-hidden','true'); statusBox.textContent = ""; }
btnUpload.addEventListener('click', openModal);
closeModal.addEventListener('click', hideModal);
modal.addEventListener('click', (e)=>{ if(e.target === modal) hideModal(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && !modal.classList.contains('hidden')) hideModal(); });
uploadForm.addEventListener('submit', async (e)=>{
  e.preventDefault();
  statusBox.innerHTML = '<div class="spinner"></div><div>Enviando...</div>';
  const formData = new FormData(uploadForm);
  try{
    const resp = await fetch(ENDPOINT_URL, { method:"POST", body: formData, headers:{'Accept':'application/json'} });
    if(resp.ok){
      statusBox.innerHTML = '<div class="success">✅ Enviado para o seu e-mail com sucesso!</div>';
      uploadForm.reset();
      setTimeout(()=> hideModal(), 1500);
    }else{
      statusBox.innerHTML = '<div class="error">❌ Erro ao enviar.</div>';
    }
  }catch(err){
    statusBox.innerHTML = '<div class="error">❌ Falha de conexão.</div>';
  }
});

// ===== Reset de Progresso (global) =====
btnReset.addEventListener('click', ()=>{
  resetModal.classList.remove('hidden');
  resetModal.setAttribute('aria-hidden','false');
});
cancelReset.addEventListener('click', ()=>{
  resetModal.classList.add('hidden');
  resetModal.setAttribute('aria-hidden','true');
});
confirmReset.addEventListener('click', ()=>{
  localStorage.removeItem(STORAGE_KEYS.done);
  localStorage.removeItem(STORAGE_KEYS.fav);
  localStorage.removeItem(STORAGE_KEYS.daily);
  resetModal.classList.add('hidden');
  resetModal.setAttribute('aria-hidden','true');
  render();
  showToast("Progresso resetado com sucesso");
  updateMiniSummary();
});

function showToast(msg){
  toast.textContent = msg;
  toast.classList.remove('hidden');
  requestAnimationFrame(()=> toast.classList.add('show'));
  setTimeout(()=>{
    toast.classList.remove('show');
    setTimeout(()=> toast.classList.add('hidden'), 400);
  }, 1600);
}

// ===== Gestos (swipe) =====
let touchStartX = 0, touchStartY = 0;
function setupGestures(){
  document.addEventListener('touchstart', (e)=>{
    if(e.touches.length!==1) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, {passive:true});
  document.addEventListener('touchend', (e)=>{
    const dx = (e.changedTouches[0].clientX - touchStartX);
    const dy = (e.changedTouches[0].clientY - touchStartY);
    if(Math.abs(dx)>60 && Math.abs(dy)<40){
      if(dx<0) openNextSection();
      else openPrevSection();
    }else if(dy>80 && Math.abs(dx)<40){
      // fechar seção atual (se aberta)
      const open = document.querySelector('.section .section-toggle[data-open="1"]');
      if(open) open.click();
    }
  });
}
function openNextSection(){ switchSection(1); }
function openPrevSection(){ switchSection(-1); }
function sectionIndexList(){
  return Array.from(document.querySelectorAll('.section')).filter(s=> !s.classList.contains('favs'));
}
function switchSection(step){
  const list = sectionIndexList();
  let idx = list.findIndex(s=> s.querySelector('.section-toggle').dataset.open === '1');
  if(idx===-1) idx=0;
  let ni = (idx + step + list.length) % list.length;
  const tog = list[ni].querySelector('.section-toggle');
  if(tog.dataset.open!=='1') tog.click();
  list[ni].scrollIntoView({behavior:'smooth', block:'start'});
}

// ===== Bottom Nav =====
bottomNav.addEventListener('click', (e)=>{
  const btn = e.target.closest('button[data-tab]');
  if(!btn) return;
  bottomNav.querySelectorAll('button').forEach(b=> b.classList.remove('active'));
  btn.classList.add('active');
  const tab = btn.dataset.tab;
  if(tab==='fav'){
    document.querySelectorAll('.section').forEach(s=>{
      s.style.display = s.classList.contains('favs') ? '' : 'none';
    });
  }else if(tab==='config'){
    // apenas mostrar tudo e rolar topo (config ficam nos botões do header)
    document.querySelectorAll('.section').forEach(s=> s.style.display = '');
    window.scrollTo({top:0,behavior:'smooth'});
  }else{
    document.querySelectorAll('.section').forEach(s=> s.style.display = '');
  }
});

// ===== FAB actions =====
fab.addEventListener('click', ()=>{
  fabMenu.classList.toggle('hidden');
});
document.addEventListener('click', (e)=>{
  if(!fab.contains(e.target) && !fabMenu.contains(e.target)){
    fabMenu.classList.add('hidden');
  }
});
fabFavoriteAll.addEventListener('click', ()=>{
  const visibleCards = Array.from(document.querySelectorAll('.card')).filter(c=> c.offsetParent !== null);
  const map = store.fav;
  visibleCards.forEach(c=>{
    const name = c.querySelector('h3').textContent;
    const section = c.closest('.section').className.split(' ').find(x=> ['quads','posterior','peito','ombro'].includes(x));
    const id = exId(section, name);
    map[id] = true;
    c.classList.add('fav');
  });
  store.fav = map;
  showToast("Favoritos atualizados");
  fabMenu.classList.add('hidden');
  render();
});
fabReset.addEventListener('click', ()=>{
  fabMenu.classList.add('hidden');
  btnReset.click();
});
fabNotes.addEventListener('click', ()=>{
  fabMenu.classList.add('hidden');
  btnUpload.click();
});

// ===== Atualizações de layout =====
function updateAllMaxHeights(){
  document.querySelectorAll('.section-body.open').forEach(b=> b.style.maxHeight = b.scrollHeight + 'px');
}
window.addEventListener('resize', updateAllMaxHeights);

// ===== Inicialização =====
function init(){
  if(localStorage.getItem(STORAGE_KEYS.prefsDark) === '1') document.documentElement.classList.add('dark');
  if(localStorage.getItem(STORAGE_KEYS.prefsCompact) === '1') document.body.classList.add('compact');
  render();
}
init();
