const out = document.getElementById('output');
const log = (m) => { console.log(m); out.textContent += "\n" + m; };

function runNoStrict() {
  out.textContent = '';
  try {
    const res = delete Object.prototype; // false en no estricto
    log('SIN estricto: delete Object.prototype → ' + res);
  } catch (e) {
    log('Error (sin estricto): ' + e.message);
  }
}

function runStrict() {
  out.textContent = '';
  try {
    (function() {
      "use strict";
      delete Object.prototype; // TypeError en estricto
    })();
  } catch (e) {
    log('CON estricto: ' + e.name + ' · ' + e.message);
  }
}

document.getElementById('btn-no-strict').addEventListener('click', runNoStrict);
document.getElementById('btn-strict').addEventListener('click', runStrict);
