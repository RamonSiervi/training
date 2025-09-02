// =======================
// Banco de Treinos
// =======================
const treinos = [
  {
    secao: "Treino de Quadríceps",
    exercicios: [
      { nome: "Agachamento Sumô com Halteres", series: "3x10/10/10 (Drop)", carga: "0kg", intervalo: "60s" },
      { nome: "Leg Press 45°", series: "4x15 (pés colados) + 15 (afastados)", carga: "12kg", intervalo: "40s" },
      { nome: "Adução de Quadril Máquina", series: "3x10/10/10 (Drop)", carga: "0kg", intervalo: "60s" },
      { nome: "Cadeira Flexora", series: "3x10/10/10 (Drop)", carga: "0kg", intervalo: "60s" },
      { nome: "Cadeira Flexora Unilateral", series: "3x10/10/10/10 (Drop)", carga: "0kg", intervalo: "60s" },
      { nome: "Panturrilha no Step", series: "4x15", carga: "0kg", intervalo: "30s" },
      { nome: "Abdominal Canivete", series: "4x15", carga: "0kg", intervalo: "30s" },
      { nome: "Esteira Caminhada", series: "30 reps", carga: "-", intervalo: "-" }
    ]
  },
  {
    secao: "Treino de Posterior e Glúteo",
    exercicios: [
      { nome: "Agachamento com Halteres", series: "3x10+10+10 (Drop)", carga: "0kg", intervalo: "60s" },
      { nome: "Abdução de Quadril Máquina", series: "3x10+10+10 (Drop)", carga: "0kg", intervalo: "60s" },
      { nome: "Elíptico", series: "25 reps", carga: "0kg", intervalo: "-" },
      { nome: "Afundo com Barra Livre", series: "3x12, 3x10, 2x8", carga: "0kg", intervalo: "60s" },
      { nome: "Agachamento Sumô no Step com Halteres", series: "3x10+10+10 (Drop)", carga: "0kg", intervalo: "60s" },
      { nome: "Abdução de Quadril Máquina", series: "3x10+10+10 (Drop)", carga: "0kg", intervalo: "60s" },
      { nome: "Cadeira Extensora", series: "3x10+10+10 (Drop)", carga: "0kg", intervalo: "60s" },
      { nome: "Cadeira Extensora Unilateral", series: "3x10+10+10 (Drop)", carga: "0kg", intervalo: "60s" },
      { nome: "Leg Press 45 Unilateral", series: "3x12, 3x10, 2x8", carga: "0kg", intervalo: "60s" }
    ]
  },
  {
    secao: "Treino de Peito, Tríceps e Bíceps",
    exercicios: [
      { nome: "Alongamento de Ombros e Tríceps II", series: "3x20", carga: "0kg", intervalo: "-" },
      { nome: "Bike Spinning Sentada", series: "40 reps", carga: "-", intervalo: "-" },
      { nome: "Abdominal Supra Solo", series: "5x15", carga: "0kg", intervalo: "40s" },
      { nome: "Tríceps Unilateral na Polia Alta (Pegada Neutra)", series: "3x15", carga: "0kg", intervalo: "30s" },
      { nome: "Alongamento de Peitoral Espaldar", series: "3x15", carga: "0kg", intervalo: "40s" },
      { nome: "Mobilidade de Ombro III", series: "3x20", carga: "0kg", intervalo: "-" },
      { nome: "Rosca Alternada com Halteres", series: "3x15", carga: "0kg", intervalo: "30s" },
      { nome: "Tríceps na Polia com Corda", series: "3x15 lento + 15 curto", carga: "0kg", intervalo: "30s" },
      { nome: "Crucifixo com Halteres", series: "4x12", carga: "0kg", intervalo: "30s" },
      { nome: "Crucifixo Inclinado com Halteres", series: "4x12", carga: "0kg", intervalo: "30s" },
      { nome: "Rosca Martelo com Halteres", series: "4x12", carga: "0kg", intervalo: "30s" }
    ]
  },
  {
    secao: "Treino de Ombro e Costas",
    exercicios: [
      { nome: "Puxada Alta (pegada neutra)", series: "3x10/8/6 (Drop)", carga: "0kg", intervalo: "30s" },
      { nome: "Abdominal Canivete", series: "3x12", carga: "0kg", intervalo: "30s" },
      { nome: "Esteira Caminhada", series: "40 reps", carga: "-", intervalo: "-" },
      { nome: "Elevação Lateral Unilateral Sentado com Halteres", series: "3x10/8/6 (Drop)", carga: "0kg", intervalo: "30s" },
      { nome: "Elevação Frontal Alternada", series: "3x12", carga: "4-6kg", intervalo: "30s" },
      { nome: "Desenvolvimento com Halteres (Pegada Neutra)", series: "3x10/8/6 (Drop)", carga: "0kg", intervalo: "30s" },
      { nome: "Puxada Neutra Triângulo", series: "3x10/8/6 (Drop)", carga: "0kg", intervalo: "30s" },
      { nome: "Remada Baixa Triângulo", series: "3x10/8/6 (Drop)", carga: "0kg", intervalo: "30s" },
      { nome: "Puxada Aberta Barra Reta", series: "3x10/8/6 (Drop)", carga: "0kg", intervalo: "30s" }
    ]
  }
];

// =======================
// Renderização dos Treinos
// =======================
const treinosContainer = document.getElementById("treinosContainer");

function renderTreinos() {
  treinosContainer.innerHTML = "";
  treinos.forEach(sec => {
    const secaoDiv = document.createElement("div");
    secaoDiv.classList.add("secao");

    const title = document.createElement("h2");
    title.textContent = sec.secao;
    secaoDiv.appendChild(title);

    sec.exercicios.forEach(ex => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h3>${ex.nome}</h3>
        <div class="meta">
          <div><strong>Séries:</strong> ${ex.series}</div>
          <div><strong>Carga:</strong> ${ex.carga}</div>
          <div><strong>Intervalo:</strong> ${ex.intervalo}</div>
        </div>
        <button class="timer-btn">⏱️ Intervalo</button>
        <div class="timer-container"></div>
        <button class="done-btn">✅ Concluir</button>
      `;

      const timerBtn = card.querySelector(".timer-btn");
      const timerContainer = card.querySelector(".timer-container");
      timerBtn.addEventListener("click", () => startTimer(timerContainer, parseInt(ex.intervalo) || 30));

      secaoDiv.appendChild(card);
    });

    treinosContainer.appendChild(secaoDiv);
  });
}

// =======================
// Timer (intervalo entre séries)
// =======================
function startTimer(container, seconds) {
  container.innerHTML = `<div class="timer-balloon">${seconds}</div>`;
  const balloon = container.querySelector(".timer-balloon");
  let time = seconds;

  const interval = setInterval(() => {
    time--;
    balloon.textContent = time;

    if (time <= 5 && time > 0) {
      balloon.style.transform = "scale(1.2)";
      setTimeout(() => (balloon.style.transform = "scale(1)"), 200);
      if (navigator.vibrate) navigator.vibrate([200]);
    }

    if (time <= 0) {
      clearInterval(interval);
      balloon.textContent = "✅";
      setTimeout(() => (container.innerHTML = ""), 2000);
      if (navigator.vibrate) navigator.vibrate([400, 200, 400]);
    }
  }, 1000);
}

// =======================
// Inicialização
// =======================
renderTreinos();
