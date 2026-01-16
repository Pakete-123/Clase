// theme.js
console.log("[theme] cargado");

const btnTHEME = document.getElementById("btnTheme");

btnTHEME.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  btnTHEME.setAttribute("aria-pressed", String(isDark));
  btnTHEME.textContent = isDark ? "☀️ Modo claro" : "🌙 Modo oscuro";
  console.log("[theme] tema:", isDark ? "oscuro" : "claro");
});
