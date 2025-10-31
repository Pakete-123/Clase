// UD3 · Nivel 3 (Starter)
// Objetivo: implementar comunicación entre ventanas (postMessage), logger y persistencia seleccionable en el Bloc.
// RAs: RA3–RA4.

let popup = window.open("bloc.html", "bloc", "width=520, height=400");
const PANEL = document.getElementById('panel');
const LOGEL = document.getElementById('log');

function log(msg){
  // TODO: añadir línea con timestamp al #log
  const P = document.createElement("p");
  const T = new Date().toUTCString();
  P.textContent = T + ": " + msg;
  LOGEL.appendChild(P);
}

function inyectarContenido(texto){
  // TODO: crear <p> con fecha/hora + texto y añadir a #panel
  const P = document.createElement("p");
  const FH = new Date().toUTCString();
  P.textContent = FH + ": " + texto;
  PANEL.appendChild(P);
}

document.getElementById('abrirBloc').addEventListener('click', () => {
  // TODO: window.open('bloc.html', 'bloc', 'width=520,height=400'); comprobar bloqueo
  if (popup === null) {
    alert("La ventana no pudo abrirse. Desactive el bloqueador de ventanas emergentes");
  } else if (popup == window.close) {
    alert("La ventana se abrió y se cerró instantáneamente. Desactive el bloqueador de ventanas emergentes");
  } else {
    alert("El popup ya está abierto");
  }
});

document.getElementById('limpiar').addEventListener('click', () => {
  // TODO: vaciar #panel y registrar en logger
  PANEL.textContent = "";
  log("Se ha vaciado el panel");
});

// TODO: Escuchar 'message' y validar event.origin === location.origin
window.addEventListener('message', (event) => {
  // if (event.origin !== location.origin) { log('Mensaje bloqueado'); return; }
  // if (event.data?.type === 'bloc:texto') { inyectarContenido(event.data.payload); log('Texto recibido'); }
  if (event.origin !== location.origin) { 
    log('Mensaje bloqueado'); 
    return; 
  }
  if (event.data?.type === 'bloc:texto') { 
    inyectarContenido(event.data.payload); 
    log('Texto recibido'); 
  }
});
