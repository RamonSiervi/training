document.addEventListener("DOMContentLoaded", () => {
  const landing = document.getElementById("landing");
  const app = document.getElementById("app");
  const themeToggle = document.getElementById("themeToggle");

  // Swipe ou clique para entrar no app
  landing.addEventListener("click", () => {
    landing.classList.add("hidden");
    app.classList.remove("hidden");
  });

  // Toggle tema
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
  });

  // Botão de concluído
  document.querySelectorAll(".done-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.textContent = "✔️ Feito";
      btn.disabled = true;
    });
  });
});
