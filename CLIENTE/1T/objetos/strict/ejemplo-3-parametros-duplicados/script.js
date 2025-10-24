const out = document.getElementById('output');
const log = (m) => { console.log(m); out.textContent += "\n" + m; };

function noStrict() {
  out.textContent = '';
  try {
    // Función con parámetros duplicados sin strict
    const f = new Function('a', 'a', 'return a;');
    log('SIN estricto: función creada con parámetros duplicados. f(1,2) → ' + f(1,2));
  } catch (e) {
    log('Error (sin estricto): ' + e.message);
  }
}

function withStrict() {
  out.textContent = '';
  try {
    // Activamos estricto DENTRO del cuerpo creado dinámicamente
    const f = new Function('"use strict"; return function(a, a) { return a; };');
    f(); // ← nunca llega: SyntaxError
  } catch (e) {
    log('CON estricto: ' + e.name + ' · ' + e.message);
  }
}

document.getElementById('btn-no-strict').addEventListener('click', noStrict);
document.getElementById('btn-strict').addEventListener('click', withStrict);
