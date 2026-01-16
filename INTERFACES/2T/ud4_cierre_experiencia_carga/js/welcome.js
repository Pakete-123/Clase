// welcome.js
console.log("[welcome] cargado");

const box = document.getElementById("welcomeBox");
const title = document.getElementById("welcomeTitle");
const text = document.getElementById("welcomeText");
const btnMORE = document.getElementById("btnMore");
const moreInfo = document.getElementById("moreInfo");

box.hidden = false;
title.textContent = "¡Bienvenido/a!";
text.textContent =
  "Tu tarea: optimizar la experiencia de carga con async/defer y justificarlo.";

btnMORE.addEventListener("click", () => {
  const willShow = moreInfo.hidden;
  moreInfo.hidden = !willShow;
  btnMORE.textContent = willShow ? "Ocultar" : "Ver más";
  console.log("[welcome] moreInfo:", willShow ? "mostrado" : "oculto");
});
