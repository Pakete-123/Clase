const out = document.getElementById('output');

function log(msg) {
  console.log(msg);
  out.textContent += "\n" + msg;
}

// 🚫 SIN estricto: crea una global accidental
function runWithoutStrict() {
  out.textContent = '';
  try {
    // No hay "use strict" aquí
    x = 10; // ← ¡NO declarada!
    log('SIN estricto: x = ' + x);
    log('¿x está en window? ' + ('x' in window));
  } catch (e) {
    log('Error (sin estricto): ' + e.message);
  }
}

// ✅ CON estricto: lanza error y evita la global
function runWithStrict() {
  out.textContent = '';
  try {
    (function() {
      "use strict";
      x = 20; // ← Error: x no está definida
    })();
  } catch (e) {
    log('CON estricto: ' + e.name + ' · ' + e.message);
    log('¿x existe en window? ' + ('x' in window));
  }
}

document.getElementById('btn-no-strict').addEventListener('click', runWithoutStrict);
document.getElementById('btn-strict').addEventListener('click', runWithStrict);
