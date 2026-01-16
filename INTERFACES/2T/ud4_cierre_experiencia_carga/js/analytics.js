// analytics.js
// Simulación de analítica: NO depende del DOM.
console.log("[analytics] cargado");

// Simula una tarea "no crítica"
const t0 = performance.now();
while (performance.now() - t0 < 40) { /* busy wait 40ms */ }

console.log("[analytics] listo (simulado)");
