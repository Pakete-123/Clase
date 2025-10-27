// UD3 · Nivel 2 (Starter)
// Objetivo: mostrar info de location/screen, gestionar history, alternar tema persistente y abrir ayuda con query string.
// RAs: RA2–RA3.

const info = document.getElementById('info');
const KEY_TEMA = 'tema';
pintarInfo();
aplicarTema(leerTema());

/**
 * TODO 1: Función pintarInfo() — crear dinámicamente una lista con:
 * - location.href
 * - location.pathname
 * - screen.width
 * - screen.height
 * Inserta la lista en #info (tip: innerHTML con una <ul>)
 */
function pintarInfo(){
  // TODO
  info.innerHTML = `<ul>
    <li>Location Href: ${location.href}</li>
    <li>Location Pathname: ${location.pathname}</li>
    <li>Screen Width: ${screen.width}</li>
    <li>Screen Height: ${screen.height}</li>
  </ul>`;
};


/**
 * TODO 2: Gestión de tema
 * - leerTema(): devuelve 'light' o 'dark' (desde localStorage o por defecto 'light')
 * - aplicarTema(tema): aplica clase al <body>
 * - al pulsar bTema: alterna y persiste
 */
function leerTema(){
  // TODO
  return localStorage.getItem(KEY_TEMA) || "light";
};
function aplicarTema(tema){
  // TODO
  document.body.className = tema;
};


document.getElementById("bTema").addEventListener("click", () => {
  const ACTUAL = leerTema();
  const NUEVO = ACTUAL === "light" ? "dark" : "light";
  aplicarTema(NUEVO);
  localStorage.setItem("tema", NUEVO);
})

// TODO 3: history.back() y history.forward()
document.getElementById('bAtras').addEventListener('click', () => {
  // TODO
  window.history.go(-1); // es equivalente a history.back();
});
document.getElementById('bAdelante').addEventListener('click', () => {
  // TODO
  window.history.go(1); // es equivalente a history.forward();
});

// TODO 4: Abrir ayuda con query ?autor=... (pedir con prompt y usar encodeURIComponent)
document.getElementById('bAyuda').addEventListener('click', () => {
  // TODO
  const AUTOR = prompt("Dame el nombre del autor");

  if (AUTOR) {
    const URL = `ayuda.html?${new URLSearchParams({autor : AUTOR})}`
    console.log(URL);
    
    window.open(URL, "_blank");
  }
});

// Inicialización
// TODO: aplicarTema(leerTema()); y pintarInfo()
