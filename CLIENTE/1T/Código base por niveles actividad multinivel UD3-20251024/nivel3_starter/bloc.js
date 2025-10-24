// Bloc (Starter) — Autosave en localStorage/sessionStorage y envío a la ventana principal con postMessage
const KEY = 'bloc_autosave';
const selModo = document.getElementById('modo');
const area = document.getElementById('txt');

function getStore(){
  // TODO: devolver sessionStorage si modo === 'session', si no localStorage
}

function cargar(){
  // TODO: cargar el valor de KEY del almacenamiento actual y ponerlo en el textarea
}

function guardar(){
  // TODO: guardar area.value en KEY (manejar posibles errores con try/catch)
}

document.getElementById('enviar').addEventListener('click', () => {
  // TODO: comprobar window.opener y usar window.opener.postMessage({type:'bloc:texto', payload: area.value}, location.origin)
});

document.getElementById('limpiar').addEventListener('click', () => {
  // TODO: limpiar el textarea y guardar()
});

area.addEventListener('input', guardar);
selModo.addEventListener('change', () => {
  // TODO: al cambiar de modo, decide si migrar o recargar desde el nuevo storage
});

window.addEventListener('DOMContentLoaded', () => {
  selModo.value = 'local';
  // TODO: cargar();
});
