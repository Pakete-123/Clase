// Definicion de la clase
const stock = new Map();

// Inserción (K => V)
stock.set("Teclado", 10);
stock.set("Ratón", 25);

// Consulta
// Con .has
const existeMonitor = stock.has("Monitor");
console.log(existeMonitor);

// Con .get
const valorRetornado = stock.get("Teclado");
console.log(valorRetornado);

// Borrado
const existeRaton = stock.delete("Ratón");
console.log(existeRaton);

// Modificación. Se reasigna el valor con set
stock.set("Teclado", 12);

// Para recorrer, iteramos con el metodo entries para recoger los pares K-V
// Para cada entrada del Map (K-V), la key se asigna a k y el value a v
for (const [k, v] of stock.entries()) {
  console.log(`${k} -> ${v}`);
}

if (stock.get("Teclado") === 12) {
  stock.set("Teclado", 15);
}
for (const [k, v] of stock.entries()) {
  console.log(`${k} -> ${v}`);
}

// Ejercicio
// 1- Crea un map con 20 pares K-V donde la clave es un índice numérico, y el valor lo que consideres
console.log("1- Crea un map con 20 pares K-V donde la clave es un índice numérico, y el valor lo que consideres");
const map = new Map();

for (i = 0; i < 20; i++) {
  map.set(i, i * i);
}
for (const [k, v] of map) {
  console.log(`${k} -> ${v}`);
}

// 2- Modifica todas las claves para que el mapa resultante aumente en una unidad cada clave
console.log("2- Modifica todas las claves para que el mapa resultante aumente en una unidad cada clave");
const nuevoMap = new Map();
for (const [k ,v] of map) {
 nuevoMap.set(k + 1, v) 
}

// 3- Muestra por pantalla los pares K-V
for (const [k, v] of nuevoMap) {
  console.log(`${k} -> ${v}`);
}