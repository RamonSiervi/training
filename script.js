/* =========================================================
   MFIT - v15: Glass Dashboard com Resumo, Gamificação,
   Calendário básico, PIP nos vídeos. Export DOCX removido.
   Mantém: progresso, favoritos, busca, PDF/CSV, reset, dark/compact.
   ========================================================= */

// ===== Config =====
const ENDPOINT_URL = "https://formspree.io/f/mzzavnrq"; // Troque pelo seu endpoint do Formspree
const KCAL_PER_MIN = 5;     // estimativa simples
const POINTS_PER_DONE = 10; // gamificação
const STORAGE_KEYS = {
  done: 'mfit_done',
  fav: 'mfit_fav',
  prefsDark: 'prefers-dark',
  prefsCompact: 'prefers-compact',
  daily: 'mfit_daily' // { 'YYYY-MM-DD': {done:int, seconds:int, points:int} }
};

// ===== Dados dos treinos =====
window.__TRAINING__ = [
  {
    key: "resumo",
    icon: "fa-solid fa-chart-pie",
    title: "Resumo",
    custom: true
  },
  {
    key: "calendario",
    icon: "fa-solid fa-calendar-days",
    title: "Calendário",
    custom: true
  },
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
const btnTheme = document.getElementById('btnTheme');
const btnCompact = document.getElementById('btnCompact');
const btnExportPDF = document.getElementById('btnExportPDF');
const btnExportCSV = document.getElementById('btnExportCSV');
const btnUpload = document.getElementById('btnUpload');
const btnReset = document.getElementById('btnReset');

const store = {
  get done(){ try{return JSON.parse(localStorage.getItem(STORAGE_KEYS.done)||'{}')}catch(_){return{}} },
  set done(v){ localStorage.setItem(STORAGE_KEYS.done, JSON.stringify(v)) },
  get fav(){ try{return JSON.parse(localStorage.getItem(STORAGE_KEYS.fav)||'{}')}catch(_){return{}} },
  set fav(v){ localStorage.setItem(STORAGE_KEYS.fav, JSON.stringify(v)) },
  get daily(){ try{return JSON.parse(localStorage.getItem(STORAGE_KEYS.daily)||'{}')}catch(_){return{}} },
  set daily(v){ localStorage.setItem(STORAGE_KEYS.daily, JSON.stringify(v)) },
};
function todayKey(){ const d=new Date(); return d.toISOString().slice(0,10); }
function slugify(str){ return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }
function exId(sectionKey, name){ return `${sectionKey}__${slugify(name)}`; }
function parseSeconds(txt){
  if(!txt) return 60;
  const m = (txt+'').match(/(\d+)\s*s/);
  if(m) return parseInt(m[1],10);
  const m2 = (txt+'').match(/(\d+)\s*$/);
  return m2 ? parseInt(m2[1],10) : 60;
}

// ===== Render =====
function render(){
  app.innerHTML = "";
  let total = 0;

  // Seção Resumo (custom, fechada por padrão)
  app.appendChild(renderResumoSection());

  // Seção Calendário (custom, fechada por padrão)
  app.appendChild(renderCalendarioSection());

  // Seção de Favoritos
  const favItems = [];
  const favMap = store.fav;
  window.__TRAINING__.forEach(section => {
    if(section.custom) return;
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
    if(section.custom) return;
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

  footerInfo.textContent = `Total de seções: ${window.__TRAINING__.filter(s=>!s.custom).length} • Total de exercícios: ${total}`;
}

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
    const map = store.done;
    const now = !map[id];
    map[id] = now;
    store.done = map;
    card.classList.toggle('done', now);
    updateAllProgress();
    if(now){ addPointsAndDaily(POINTS_PER_DONE, 0, 1); }
    renderResumoBody(); // atualizar card de resumo se aberto
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
    startTimer(card, secs, e.currentTarget.querySelector('.tlabel'));
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
    : `Total de seções: ${window.__TRAINING__.filter(s=>!s.custom).length} • Total de exercícios: ${Array.from(document.querySelectorAll('.card')).length}`;
}

searchInput.addEventListener('input', e=> applySearch(e.target.value));
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape'){ searchInput.value=''; applySearch(''); } });

// ===== Timer + daily seconds =====
let timerHandle = null;
function startTimer(card, seconds, labelEl){
  if(card.dataset.ticking === '1'){
    card.dataset.ticking = '0';
    clearInterval(timerHandle);
    labelEl.textContent = `${seconds}s`;
    return;
  }
  let remain = seconds;
  labelEl.textContent = `${remain}s`;
  card.dataset.ticking = '1';
  timerHandle = setInterval(()=>{
    remain--;
    labelEl.textContent = `${remain}s`;
    addPointsAndDaily(0,1,0); // adiciona 1s ao total diário
    if(remain <= 0){
      clearInterval(timerHandle);
      card.dataset.ticking = '0';
      flash(card);
      try{ if(navigator.vibrate) navigator.vibrate([120,60,120]); }catch(_){}
      try{
        const ctx = new (window.AudioContext||window.webkitAudioContext)();
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.frequency.value = 880; g.gain.value=.1; o.start();
        setTimeout(()=>{o.stop();ctx.close();}, 300);
      }catch(_){}
      labelEl.textContent = `${seconds}s`;
    }
  },1000);
  renderResumoBody();
}
function flash(card){
  card.style.boxShadow = "0 0 0 9999px rgba(34,197,94,.12) inset, 0 8px 24px rgba(2,6,23,.18)";
  setTimeout(()=> card.style.boxShadow = "", 400);
}

function addPointsAndDaily(points, seconds, doneInc){
  const key = todayKey();
  const daily = store.daily;
  if(!daily[key]) daily[key] = { done:0, seconds:0, points:0 };
  daily[key].done += (doneInc||0);
  daily[key].seconds += (seconds||0);
  daily[key].points += (points||0);
  store.daily = daily;
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
  window.__TRAINING__.forEach(s=> {
    if(s.custom) return;
    s.items.forEach(ex=> rows.push([s.title, ex.name, ex.series||"", ex.carga||"", ex.intervalo||""]));
  });
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
    if(section.custom) return;
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
const modal = document.getElementById('uploadModal');
const closeModal = document.getElementById('closeModal');
const uploadForm = document.getElementById('uploadForm');
const statusBox = document.getElementById('uploadStatus');

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
      statusBox.innerHTML = '<div class="success">✅ Enviado com sucesso!</div>';
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
const resetModal = document.getElementById('resetModal');
const cancelReset = document.getElementById('cancelReset');
const confirmReset = document.getElementById('confirmReset');
const toast = document.getElementById('toast');

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

// ===== Seção Resumo (custom) =====
function renderResumoSection(){
  const sec = document.createElement('section');
  sec.className = "section resumo";
  sec.innerHTML = `
    <div class="section-header glass">
      <div class="section-title"><i class="fa-solid fa-chart-pie"></i><strong>Resumo</strong></div>
      <div class="section-toggle" data-open="0" title="Expandir/Fechar"><div class="pm">＋</div></div>
    </div>
    <div class="section-body"></div>
  `;
  setupToggle(sec);
  return sec;
}
function renderResumoBody(){
  const sec = document.querySelector('.section.resumo');
  if(!sec) return;
  const body = sec.querySelector('.section-body');
  if(sec.querySelector('.section-toggle').dataset.open !== '1'){ return; }
  const d = store.daily[todayKey()] || {done:0, seconds:0, points:0};
  const kcal = Math.round((d.seconds/60)*KCAL_PER_MIN);
  const pct = Math.min(100, Math.round( (d.done / totalExercises()) * 100 ));
  body.innerHTML = `
    <div class="card">
      <div class="info">
        <h3>Hoje</h3>
        <div class="meta">
          <div><strong>Concluídos:</strong> ${d.done}</div>
          <div><strong>Tempo:</strong> ${fmtTime(d.seconds)}</div>
          <div><strong>Calorias:</strong> ~${kcal} kcal</div>
          <div><strong>Pontos:</strong> ${d.points}</div>
        </div>
        <div class="actions">
          <span class="pill"><i class="fa-solid fa-trophy"></i><span>${achievementText(d)}</span></span>
        </div>
      </div>
      <div class="thumb">
        <svg viewBox="0 0 42 42" width="120" height="120">
          <circle cx="21" cy="21" r="18" fill="none" stroke="rgba(148,163,184,.35)" stroke-width="4"/>
          <circle cx="21" cy="21" r="18" fill="none" stroke="currentColor" stroke-width="4"
            stroke-dasharray="${pct*1.13} 999" transform="rotate(-90 21 21)"/>
          Sorry, your browser does not support inline SVG.
        </svg>
        <div style="position:absolute;inset:0;display:grid;place-items:center;font-weight:800">${pct}%</div>
      </div>
    </div>
  `;
}
function fmtTime(sec){
  const m=Math.floor(sec/60), s=sec%60;
  return `${m}m ${s}s`;
}
function totalExercises(){
  let t=0; window.__TRAINING__.forEach(s=>{ if(!s.custom) t+=s.items.length; }); return t||1;
}
function achievementText(d){
  if(d.done>=10) return "Meta 10 concluídos 🎖️";
  if(d.done>=5) return "Em alta: 5 concluídos 🏅";
  if(d.done>=1) return "Primeiro passo 👟";
  return "Comece hoje!";
}

// Atualiza resumo quando expandido
document.addEventListener('click', (e)=>{
  const tog = e.target.closest('.section.resumo .section-toggle');
  if(tog){
    setTimeout(()=> renderResumoBody(), 350);
  }
});

// ===== Seção Calendário (custom) =====
function renderCalendarioSection(){
  const sec = document.createElement('section');
  sec.className = "section calendario";
  sec.innerHTML = `
    <div class="section-header glass">
      <div class="section-title"><i class="fa-solid fa-calendar-days"></i><strong>Calendário</strong></div>
      <div class="section-toggle" data-open="0" title="Expandir/Fechar"><div class="pm">＋</div></div>
    </div>
    <div class="section-body"></div>
  `;
  setupToggle(sec);
  // Render conteúdo quando abrir
  sec.querySelector('.section-toggle').addEventListener('click', ()=>{
    setTimeout(()=> renderCalendarBody(), 350);
  });
  return sec;
}
function renderCalendarBody(){
  const sec = document.querySelector('.section.calendario');
  if(!sec) return;
  const body = sec.querySelector('.section-body');
  if(sec.querySelector('.section-toggle').dataset.open !== '1'){ return; }

  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth(); // 0..11
  const first = new Date(y, m, 1);
  const startDay = (first.getDay()+6)%7; // segunda=0
  const daysInMonth = new Date(y, m+1, 0).getDate();

  const grid = document.createElement('div');
  grid.className = 'calendar';

  for(let i=0;i<startDay;i++){
    const empty = document.createElement('div');
    grid.appendChild(empty);
  }
  const daily = store.daily;
  for(let d=1; d<=daysInMonth; d++){
    const cell = document.createElement('div');
    cell.className = 'day';
    const key = `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const stats = daily[key];
    if(stats && (stats.done>0 || stats.seconds>0)) cell.classList.add('marked');
    cell.textContent = d;
    cell.addEventListener('click', (ev)=>{
      const p = document.createElement('div');
      p.className = 'popup';
      const st = daily[key] || {done:0,seconds:0,points:0};
      p.innerHTML = `<h4>${key}</h4>
        <div>✔️ Concluídos: <strong>${st.done}</strong></div>
        <div>⏱️ Tempo: <strong>${fmtTime(st.seconds)}</strong></div>
        <div>🏅 Pontos: <strong>${st.points}</strong></div>`;
      document.querySelectorAll('.popup').forEach(x=>x.remove());
      cell.style.position='relative';
      cell.appendChild(p);
      setTimeout(()=>{
        document.addEventListener('click', function out(e){
          if(!p.contains(e.target)){ p.remove(); document.removeEventListener('click', out); }
        });
      },0);
    });
    grid.appendChild(cell);
  }

  body.innerHTML = "";
  const card = document.createElement('div');
  card.className = 'card';
  card.appendChild(grid);
  body.appendChild(card);
}

// ===== Inicialização =====
function init(){
  if(localStorage.getItem(STORAGE_KEYS.prefsDark) === '1') document.documentElement.classList.add('dark');
  if(localStorage.getItem(STORAGE_KEYS.prefsCompact) === '1') document.body.classList.add('compact');
  render();
}
function updateAllMaxHeights(){
  document.querySelectorAll('.section-body.open').forEach(b=> b.style.maxHeight = b.scrollHeight + 'px');
}
window.addEventListener('resize', updateAllMaxHeights);
init();
