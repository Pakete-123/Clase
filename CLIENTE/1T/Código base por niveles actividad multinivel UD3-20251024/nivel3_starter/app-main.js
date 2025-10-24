// UD3 · Nivel 3 (Starter)
// Objetivo: implementar comunicación entre ventanas (postMessage), logger y persistencia seleccionable en el Bloc.
// RAs: RA3–RA4.

let popup = null;
const panel = document.getElementById('panel');
const logEl = document.getElementById('log');

function log(msg){
  // TODO: añadir línea con timestamp al #log
}

function inyectarContenido(texto){
  // TODO: crear <p> con fecha/hora + texto y añadir a #panel
}

document.getElementById('abrirBloc').addEventListener('click', () => {
  // TODO: window.open('bloc.html', 'bloc', 'width=520,height=400'); comprobar bloqueo
});

document.getElementById('limpiar').addEventListener('click', () => {
  // TODO: vaciar #panel y registrar en logger
});

// TODO: Escuchar 'message' y validar event.origin === location.origin
window.addEventListener('message', (event) => {
  // if (event.origin !== location.origin) { log('Mensaje bloqueado'); return; }
  // if (event.data?.type === 'bloc:texto') { inyectarContenido(event.data.payload); log('Texto recibido'); }
});
