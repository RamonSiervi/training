// MFIT v21 - script.js COMPLETO
// Tema inicial claro, busca minimal, timer por exercício (intervalo), PDF textual, upload Formspree,
// marcação de concluídos com reset, seções colapsáveis e performance cuidadosa.

// -------------------- Dados --------------------
const TREINOS = [
  {
    secao: "Treino de Quadríceps",
    accent: "quad",
    exercicios: [
      { nome: "Agachamento Sumô com Halteres", series: "3x10/10/10 (Drop – conta 1 série)", carga: "0 kg", intervalo: "60s" },
      { nome: "Leg Press 45º", series: "4x15 (pés colados) + 15 (afastados)", carga: "12 kg", intervalo: "40s" },
      { nome: "Adução de Quadril Máquina", series: "3x10/10/10 (Drop – conta 1 série)", carga: "0 kg", intervalo: "60s" },
      { nome: "Cadeira Flexora", series: "3x10/10/10 (Drop – conta 1 série)", carga: "0 kg", intervalo: "60s" },
      { nome: "Cadeira Flexora Unilateral", series: "3x10/10/10/10 (Drop – conta 1 série)", carga: "0 kg", intervalo: "60s" },
      { nome: "Panturrilha no Step", series: "4x15", carga: "0 kg", intervalo: "30s" },
      { nome: "Abdominal Canivete", series: "4x15", carga: "0 kg", intervalo: "30s" },
      { nome: "Esteira Caminhada", series: "30 reps", carga: "–", intervalo: "–" }
    ]
  },
  {
    secao: "Treino de Posterior e Glúteo",
    accent: "post",
    exercicios: [
      { nome: "Agachamento com Halteres", series: "3x10+10+10 (Drop – conta 1 série)", carga: "0 kg", intervalo: "60s" },
      { nome: "Abdução de Quadril Máquina", series: "3x10+10+10 (Drop – conta 1 série)", carga: "0 kg", intervalo: "60s" },
      { nome: "Elíptico", series: "25 reps", carga: "0 kg", intervalo: "–" },
      { nome: "Afundo com Barra Livre", series: "3x12, 3x10, 2x8", carga: "0 kg", intervalo: "60s" },
      { nome: "Agachamento Sumô no Step com Halteres", series: "3x10+10+10 (Drop – conta 1 série)", carga: "0 kg", intervalo: "60s" },
      { nome: "Abdução de Quadril Máquina", series: "3x10+10+10 (Drop – conta 1 série)", carga: "0 kg", intervalo: "60s" },
      { nome: "Cadeira Extensora", series: "3x10+10+10 (Drop – conta 1 série)", carga: "0 kg", intervalo: "60s" },
      { nome: "Cadeira Extensora Unilateral", series: "3x10+10+10 (Drop – conta 1 série)", carga: "0 kg", intervalo: "60s" },
      { nome: "Leg Press 45 Unilateral", series: "3x12, 3x10, 2x8", carga: "0 kg", intervalo: "60s" }
    ]
  },
  {
    secao: "Treino de Peito, Tríceps e Bíceps",
    accent: "peito",
    exercicios: [
      { nome: "Alongamento de Ombros e Tríceps II", series: "3x20", carga: "0 kg", intervalo: "–" },
      { nome: "Bike Spinning Sentada", series: "40 reps", carga: "–", intervalo: "–" },
      { nome: "Abdominal Supra Solo", series: "5x15", carga: "0 kg", intervalo: "40s" },
      { nome: "Tríceps Unilateral na Polia Alta (Pegada Neutra)", series: "3x15", carga: "0 kg", intervalo: "30s" },
      { nome: "Alongamento de Peitoral Espaldar", series: "3x15", carga: "0 kg", intervalo: "40s" },
      { nome: "Mobilidade de Ombro III", series: "3x20", carga: "0 kg", intervalo: "–" },
      { nome: "Rosca Alternada com Halteres", series: "3x15", carga: "0 kg", intervalo: "30s" },
      { nome: "Tríceps na Polia com Corda", series: "3x15 lento + 15 curto", carga: "0 kg", intervalo: "30s" },
      { nome: "Crucifixo com Halteres", series: "4x12", carga: "0 kg", intervalo: "30s" },
      { nome: "Crucifixo Inclinado com Halteres", series: "4x12", carga: "0 kg", intervalo: "30s" },
      { nome: "Rosca Martelo com Halteres", series: "4x12", carga: "0 kg", intervalo: "30s" }
    ]
  },
  {
    secao: "Treino de Ombro e Costas",
    accent: "ombro",
    exercicios: [
      { nome: "Puxada Alta (pegada neutra)", series: "3x10/8/6 (Drop – conta 1 série)", carga: "0 kg", intervalo: "30s" },
      { nome: "Abdominal Canivete", series: "3x12", carga: "0 kg", intervalo: "30s" },
      { nome: "Esteira Caminhada", series: "40 reps", carga: "–", intervalo: "–" },
      { nome: "Elevação Lateral Unilateral Sentado com Halteres", series: "3x10/8/6 (Drop – conta 1 série)", carga: "0 kg", intervalo: "30s" },
      { nome: "Elevação Frontal Alternada", series: "3x12", carga: "4–6 kg", intervalo: "30s" },
      { nome: "Desenvolvimento com Halteres (Pegada Neutra)", series: "3x10/8/6 (Drop – conta 1 série)", carga: "0 kg", intervalo: "30s" },
      { nome: "Puxada Neutra Triângulo", series: "3x10/8/6 (Drop – conta 1 série)", carga: "0 kg", intervalo: "30s" },
      { nome: "Remada Baixa Triângulo", series: "3x10/8/6 (Drop – conta 1 série)", carga: "0 kg", intervalo: "30s" },
      { nome: "Puxada Aberta Barra Reta", series: "3x10/8/6 (Drop – conta 1 série)", carga: "0 kg", intervalo: "30s" }
    ]
  }
];

// -------------------- Estado / Persistência --------------------
const LS_DONE_KEY = "mfit_done_v21";
const LS_THEME_KEY = "mfit_theme_v21";
const doneMap = new Map(Object.entries(JSON.parse(localStorage.getItem(LS_DONE_KEY) || "{}")));

const THEMES = {
  light: {},
  pastel: { "--bg-grad-1":"#fdfbfb","--bg-grad-2":"#ebedee" },
  dark:  { "--bg-grad-1":"#0f172a","--bg-grad-2":"#111827","--text":"#f8fafc","--glass":"rgba(17,24,39,.45)","--glass-strong":"rgba(17,24,39,.7)","--card":"rgba(17,24,39,.5)" }
};
let currentTheme = localStorage.getItem(LS_THEME_KEY) || "light";

function applyTheme(name){
  currentTheme = name;
  const vars = THEMES[name] || {};
  for (const [k,v] of Object.entries(vars)){
    document.documentElement.style.setProperty(k,v);
  }
  localStorage.setItem(LS_THEME_KEY, name);
}

// -------------------- Helpers --------------------
const $ = s => document.querySelector(s);
function secExKey(secao, idx){ return `${secao}__${idx}`; }
function numericSeconds(str){
  if(!str) return 60;
  const m = String(str).match(/(\d+)/);
  return m ? parseInt(m[1],10) : 60;
}

// -------------------- Render --------------------
const container = $("#treinosContainer");

function render(){
  container.innerHTML = "";
  TREINOS.forEach((sec, sIndex)=>{
    const wrap = document.createElement("section");
    wrap.className = "secao";
    wrap.dataset.accent = sec.accent || "";

    // header
    const hdr = document.createElement("div");
    hdr.className = "secao-header";
    hdr.innerHTML = `
      <span class="chip"><i class="fa-solid fa-layer-group"></i></span>
      <div class="title">${sec.secao}</div>
      <div class="mini"><i class="fa-solid fa-plus"></i></div>
    `;
    wrap.appendChild(hdr);

    // content
    const content = document.createElement("div");
    content.className = "secao-content";
    const inner = document.createElement("div");
    inner.className = "secao-content-inner";

    sec.exercicios.forEach((ex, eIndex)=>{
      const key = secExKey(sec.secao, eIndex);
      const done = !!doneMap.get(key);

      const card = document.createElement("article");
      card.className = "card"+(done?" done":"");
      card.innerHTML = `
        <h3><i class="fa-solid fa-bolt"></i> ${ex.nome}</h3>
        <div class="meta">
          <div><strong>Séries:</strong> ${ex.series}</div>
          <div><strong>Carga:</strong> ${ex.carga}</div>
          <div><strong>Intervalo:</strong> ${ex.intervalo}</div>
        </div>
        <div class="tools">
          <button class="btn primary btn-timer" aria-label="Iniciar intervalo"><i class="fa-solid fa-hourglass-half"></i> Intervalo</button>
          <div class="timer-slot"></div>
          <button class="btn btn-done" aria-label="Marcar concluído"><i class="fa-regular fa-square-check"></i> Concluir</button>
        </div>
      `;

      // Timer
      const btnTimer = card.querySelector(".btn-timer");
      const slot = card.querySelector(".timer-slot");
      const secs = numericSeconds(ex.intervalo);
      btnTimer.addEventListener("click", ()=> startTimer(slot, secs));

      // Done
      const btnDone = card.querySelector(".btn-done");
      btnDone.addEventListener("click", ()=>{
        const now = !card.classList.contains("done");
        card.classList.toggle("done", now);
        doneMap.set(key, now);
        localStorage.setItem(LS_DONE_KEY, JSON.stringify(Object.fromEntries(doneMap)));
      });

      inner.appendChild(card);
    });

    content.appendChild(inner);
    // collapsed por padrão (apenas título visível)
    content.style.maxHeight = "0px";

    hdr.addEventListener("click", ()=>{
      const open = content.style.maxHeight && content.style.maxHeight !== "0px";
      if(open){
        content.style.maxHeight = "0px";
        hdr.querySelector(".mini").innerHTML = `<i class="fa-solid fa-plus"></i>`;
      }else{
        content.style.maxHeight = inner.scrollHeight + 8 + "px";
        hdr.querySelector(".mini").innerHTML = `<i class="fa-solid fa-minus"></i>`;
      }
    });

    // abrir ao buscar (controlado na busca)
    wrap.appendChild(content);
    container.appendChild(wrap);
  });
}

// -------------------- Timer --------------------
function startTimer(slot, seconds){
  slot.innerHTML = "";
  const balloon = document.createElement("div");
  balloon.className = "timer-balloon";
  balloon.textContent = seconds;
  slot.appendChild(balloon);

  let t = seconds;
  const iv = setInterval(()=>{
    t--;
    balloon.textContent = t;
    if (t <= 5 && t > 0){
      balloon.style.transform = "scale(1.12)";
      setTimeout(()=> balloon.style.transform = "scale(1)", 140);
      if (navigator.vibrate) navigator.vibrate([250, 120, 250]); // vibração mais forte nos últimos 5s
    }
    if (t <= 0){
      clearInterval(iv);
      balloon.textContent = "✅";
      if (navigator.vibrate) navigator.vibrate([400,150,400,150,400]);
      setTimeout(()=> slot.innerHTML = "", 2000);
    }
  },1000);
}

// -------------------- PDF (texto) --------------------
function exportPDF(){
  // Gera uma página simples para impressão em PDF (texto apenas)
  let txt = "MFIT – Treinos\\n\\n";
  TREINOS.forEach(sec=>{
    txt += `== ${sec.secao} ==\\n`;
    sec.exercicios.forEach(ex=>{
      txt += `• ${ex.nome}\\n   Séries: ${ex.series}\\n   Carga: ${ex.carga}\\n   Intervalo: ${ex.intervalo}\\n\\n`;
    });
  });
  const w = window.open("", "_blank");
  w.document.write(`<pre style="font:14px/1.5 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; white-space:pre-wrap;">${txt}</pre>`);
  w.document.close();
  w.focus();
  w.print();
}

// -------------------- Busca --------------------
function setupSearch(){
  const overlay = $("#searchOverlay");
  const input = $("#searchInput");
  const btn = $("#btnSearch");
  const close = $("#closeSearch");

  function open(){
    overlay.style.display = "flex";
    input.focus();
  }
  function hide(){
    overlay.style.display = "none";
    input.value = "";
    filter("");
  }
  btn.addEventListener("click", open);
  close.addEventListener("click", hide);
  document.addEventListener("keydown",(e)=>{
    if(e.key==="Escape") hide();
    if((e.ctrlKey || e.metaKey) && e.key.toLowerCase()==="k"){ e.preventDefault(); open(); }
  });

  input.addEventListener("input", (e)=> filter(e.target.value.trim().toLowerCase()));
}

function filter(q){
  const sections = [...document.querySelectorAll(".secao")];
  sections.forEach(sec=>{
    const cards = [...sec.querySelectorAll(".card")];
    let matchCount = 0;
    cards.forEach(c=>{
      const name = c.querySelector("h3").innerText.toLowerCase();
      const ok = !q || name.includes(q);
      c.style.display = ok ? "" : "none";
      if(ok) matchCount++;
    });
    // expand if has match; collapse otherwise (but keep header visible)
    const content = sec.querySelector(".secao-content");
    if(matchCount>0){
      const inner = sec.querySelector(".secao-content-inner");
      content.style.maxHeight = inner.scrollHeight + 8 + "px";
      sec.querySelector(".mini").innerHTML = `<i class="fa-solid fa-minus"></i>`;
    }else{
      content.style.maxHeight = "0px";
      sec.querySelector(".mini").innerHTML = `<i class="fa-solid fa-plus"></i>`;
    }
  });
}

// -------------------- Upload Modal --------------------
function setupUpload(){
  const modal = $("#uploadModal");
  $("#btnUpload").addEventListener("click", ()=> modal.setAttribute("aria-hidden","false"));
  $("#closeUpload").addEventListener("click", ()=> modal.setAttribute("aria-hidden","true"));
  modal.addEventListener("click",(e)=>{ if(e.target===modal) modal.setAttribute("aria-hidden","true"); });
}

// -------------------- Reset concluídos --------------------
function resetDone(){
  doneMap.clear();
  localStorage.setItem(LS_DONE_KEY, "{}");
  document.querySelectorAll(".card.done").forEach(c=> c.classList.remove("done"));
}

// -------------------- Tema --------------------
function setupTheme(){
  applyTheme(currentTheme);
  $("#btnTheme").addEventListener("click", ()=>{
    const order = ["light","pastel","dark"];
    const idx = order.indexOf(currentTheme);
    applyTheme(order[(idx+1)%order.length]);
  });
}

// -------------------- Ações principais --------------------
function setupActions(){
  $("#btnPDF").addEventListener("click", exportPDF);
  $("#btnReset").addEventListener("click", resetDone);
  $("#btnHome").addEventListener("click", ()=> window.scrollTo({top:0,behavior:"smooth"}));
}

// -------------------- Init --------------------
document.addEventListener("DOMContentLoaded", ()=>{
  setupTheme();
  render();
  setupSearch();
  setupUpload();
  setupActions();
});