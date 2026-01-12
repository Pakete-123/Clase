// Solución Reto 3

const verMas = document.getElementById("btnMore");
const texto = document.getElementById("moreInfo");
let contador = 0;
const textoContador = document.createElement("p");
verMas.addEventListener("click", () => {
  // textoContador.innerText = `Veces clicado el botón 'Ver Más': ${contador++}`;

  texto.classList.toggle("ocultar");
  if (texto.classList.contains("ocultar")) {
    verMas.innerText = "Ver Más";
  } else {
    verMas.innerText = "Ocultar";
  }
});
