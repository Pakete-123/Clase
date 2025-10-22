const out = document.getElementById('output');
const log = (m) => { console.log(m); out.textContent += "\n" + m; };

function runWithoutStrict() {
  out.textContent = '';
  function foo() {
    // No strict: this es el objeto global (window en navegador)
    return this;
  }
  log('SIN estricto: this === window → ' + (foo() === window));
}

function runWithStrict() {
  out.textContent = '';
  function foo() {
    "use strict";
    return this;
  }
  log('CON estricto: typeof this → ' + typeof foo()); // undefined
}

document.getElementById('btn-no-strict').addEventListener('click', runWithoutStrict);
document.getElementById('btn-strict').addEventListener('click', runWithStrict);
