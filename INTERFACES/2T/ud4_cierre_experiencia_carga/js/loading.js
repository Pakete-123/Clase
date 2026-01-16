// loading.js
console.log("[loading] cargado");

const overlay = document.getElementById("loadingOverlay");
const statusText = document.getElementById("statusText");

const btnMENU = document.getElementById("btnMenu");
const btnTheme = document.getElementById("btnTheme");
const btnMore = document.getElementById("btnMore");

function simulateBoot() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("boot ok"), 600);
  });
}

simulateBoot().then(() => {
  btnMENU.disabled = false;
  btnTheme.disabled = false;
  btnMore.disabled = false;

  if (statusText) statusText.textContent = "Estado: listo ✅";

  overlay.style.display = "none";
  console.log("[loading] interfaz lista");
});
