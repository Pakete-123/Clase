// UD3 · Nivel 1 (Starter)
// Objetivo: implementar los manejadores para usar Date, Math, document.title, window.open y localStorage.
// RAs: RA2 (verificación en navegador), RA3 (objetos predefinidos).

const panel = document.getElementById('panel');

/**
 * TODO 1: Implementa la función log(mensaje) que cree un <p> y lo añada a #panel
 */
function log(mensaje){
  // TODO: crear elemento <p>, asignar textContent con 'mensaje' y añadirlo a panel
  const P = document.createElement("p");
  P.textContent = mensaje;
  panel.appendChild(P);
  console.log(P);
}

// TODO 2: Botón "Mostrar hora" → usar new Date() y toLocaleTimeString()
document.getElementById('btnHora').addEventListener('click', () => {
  // TODO
  const HORA = new Date().toLocaleTimeString();
  log("Hora actual: " + HORA);
});

// TODO 3: Botón "Número aleatorio" → usar Math.random() en rango 1..100 (entero)
document.getElementById('btnAleatorio').addEventListener('click', () => {
  // TODO
  const rng = (Math.random() * 99999 - 1 + 1);
  log(rng);
});

// TODO 4: Botón "Cambiar título" → pedir nuevo título con prompt y asignar a document.title
document.getElementById('btnTitulo').addEventListener('click', () => {
  // TODO
});

// TODO 5: Botón "Abrir ayuda" → window.open('about:blank','ayuda','width=400,height=300')
document.getElementById('btnAbrir').addEventListener('click', () => {
  // TODO (recuerda que puede estar bloqueado; compruébalo)
});

// TODO 6: Guardar y recuperar nombre en localStorage (clave 'nombre')
const iNombre = document.getElementById('nombre');
document.getElementById('btnGuardar').addEventListener('click', () => {
  // TODO: localStorage.setItem('nombre', iNombre.value)
  // TODO: log de confirmación
});
document.getElementById('btnRecuperar').addEventListener('click', () => {
  // TODO: leer localStorage.getItem('nombre') y mostrar con log
});
