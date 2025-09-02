const treinos = [
  {
    titulo: "Treino de Quadríceps",
    exercicios: [
      {
        nome: "Agachamento Sumô com Halteres",
        series: "3x10/10/10 Drop",
        carga: "0kg",
        intervalo: "60s",
        video: "https://media.musclewiki.com/media/uploads/videos/branded/female-dumbbell-sumo-squat-front.mp4"
      },
      {
        nome: "Leg Press 45º",
        series: "4x15 pés colados + 15 afastados",
        carga: "12kg",
        intervalo: "40s",
        video: "https://media.musclewiki.com/media/uploads/videos/branded/female-Machine-leg-press-front.mp4"
      }
    ]
  },
  {
    titulo: "Treino de Posterior e Glúteo",
    exercicios: [
      { nome: "Afundo com Barra Livre", series: "3x12 3x10 2x8", carga: "0kg", intervalo: "60s", video: "" },
      { nome: "Cadeira Extensora", series: "3x10+10+10 Drop", carga: "0kg", intervalo: "60s", video: "" }
    ]
  },
  {
    titulo: "Treino de Peito, Tríceps e Bíceps",
    exercicios: [
      { nome: "Crucifixo com Halteres", series: "4x12", carga: "0kg", intervalo: "30s", video: "" },
      { nome: "Rosca Martelo com Halteres", series: "4x12", carga: "0kg", intervalo: "30s", video: "" }
    ]
  },
  {
    titulo: "Treino de Ombro e Costa",
    exercicios: [
      { nome: "Puxada alta (pegada neutra)", series: "3x10/8/6 Drop", carga: "0kg", intervalo: "30s", video: "" },
      { nome: "Remada Baixa Triângulo", series: "3x10/8/6 Drop", carga: "0kg", intervalo: "30s", video: "" }
    ]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  renderTreinos();

  // busca
  document.getElementById("openSearch").addEventListener("click", () => {
    document.querySelector(".search").classList.toggle("active");
  });
  document.getElementById("searchInput").addEventListener("input", e => {
    filterTreinos(e.target.value.toLowerCase());
  });
  document.getElementById("searchClose").addEventListener("click", () => {
    document.querySelector(".search").classList.remove("active");
    document.getElementById("searchInput").value = "";
    filterTreinos("");
  });

  // reset
  document.getElementById("btnResetDone").addEventListener("click", () => {
    document.querySelectorAll(".card").forEach(c => c.classList.remove("done"));
  });
});

function renderTreinos() {
  const app = document.getElementById("app");
  app.innerHTML = "";
  treinos.forEach(secao => {
    const section = document.createElement("section");
    section.innerHTML = `<h2>${secao.titulo}</h2>`;
    secao.exercicios.forEach(ex => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${ex.nome}</h3>
        <p><strong>Séries:</strong> ${ex.series}</p>
        <p><strong>Carga:</strong> ${ex.carga}</p>
        <p><strong>Intervalo:</strong> ${ex.intervalo}</p>
        <div class="actions">
          <button onclick="markDone(this)">✅ Concluir</button>
          <button class="interval-btn" data-time="30">⏱30s</button>
          <button class="interval-btn" data-time="60">⏱60s</button>
          <button class="interval-btn" data-time="90">⏱90s</button>
        </div>
        <div class="interval-display"></div>
        ${ex.video ? `<video controls src="${ex.video}" width="100%"></video>` : ""}
      `;
      section.appendChild(card);
    });
    app.appendChild(section);
  });

  // bind intervalos
  document.querySelectorAll(".interval-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const time = parseInt(btn.getAttribute("data-time"));
      startInterval(btn.closest(".card").querySelector(".interval-display"), time);
    });
  });
}

function startInterval(display, seconds) {
  let remaining = seconds;
  display.textContent = `Intervalo: ${remaining}s`;
  const timer = setInterval(() => {
    remaining--;
    display.textContent = `Intervalo: ${remaining}s`;
    if (remaining <= 5 && remaining > 0) {
      display.style.color = "red";
    }
    if (remaining <= 0) {
      clearInterval(timer);
      display.textContent = "✅ Intervalo concluído";
      setTimeout(() => {
        display.textContent = "";
        display.style.color = "";
      }, 2000);
    }
  }, 1000);
}

function filterTreinos(query) {
  document.querySelectorAll(".card").forEach(c => {
    c.style.display = c.textContent.toLowerCase().includes(query) ? "block" : "none";
  });
}

function markDone(btn) {
  btn.closest(".card").classList.add("done");
}
