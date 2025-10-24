// UD3 · Nivel 2 (Starter)
// Objetivo: mostrar info de location/screen, gestionar history, alternar tema persistente y abrir ayuda con query string.
// RAs: RA2–RA3.

const info = document.getElementById('info');
const KEY_TEMA = 'tema';

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
}

/**
 * TODO 2: Gestión de tema
 * - leerTema(): devuelve 'light' o 'dark' (desde localStorage o por defecto 'light')
 * - aplicarTema(tema): aplica clase al <body>
 * - al pulsar bTema: alterna y persiste
 */
function leerTema(){
  // TODO
}
function aplicarTema(tema){
  // TODO
}

// TODO 3: history.back() y history.forward()
document.getElementById('bAtras').addEventListener('click', () => {
  // TODO
});
document.getElementById('bAdelante').addEventListener('click', () => {
  // TODO
});

// TODO 4: Abrir ayuda con query ?autor=... (pedir con prompt y usar encodeURIComponent)
document.getElementById('bAyuda').addEventListener('click', () => {
  // TODO
});

// Inicialización
// TODO: aplicarTema(leerTema()); y pintarInfo()
