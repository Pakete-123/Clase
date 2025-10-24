const out = document.getElementById('output');
const log = (m) => { console.log(m); out.textContent += "\n" + m; };

const obj = {};
Object.defineProperty(obj, 'PI', { value: 3.14, writable: false, configurable: false });

function noStrict() {
  out.textContent = '';
  try {
    obj.PI = 3.14159; // Falla en silencio en no estricto
    log('SIN estricto: obj.PI → ' + obj.PI);
  } catch (e) {
    log('Error (sin estricto): ' + e.message);
  }
}

function strict() {
  out.textContent = '';
  try {
    (function() {
      "use strict";
      obj.PI = 3.14159; // TypeError en estricto
    })();
  } catch (e) {
    log('CON estricto: ' + e.name + ' · ' + e.message);
    log('obj.PI sigue siendo → ' + obj.PI);
  }
}

document.getElementById('btn-no-strict').addEventListener('click', noStrict);
document.getElementById('btn-strict').addEventListener('click', strict);
