// Crear un set vacío
const etiquetas = new Set();

// Insertar
etiquetas.add("java");
etiquetas.add("python");
etiquetas.add("js");
etiquetas.add("php");

console.log(etiquetas);

// Consultas
const existeJava = etiquetas.has("java");
console.log(existeJava);

// Modificar. Como no tiene índice, hay que borrar y añadir el elemento
// Delete devuelve true si borra y false si no
if (etiquetas.delete("python")) {
  etiquetas.add("React.js")
}

// Borrado
console.log(etiquetas.delete("Node.js"));

// Recorrer el set
for (const tag of etiquetas) {
  console.log(tag);
}

/**
 * 1. Crear un conjunto vacío llamado nums
 * 2. Añadimos los valores 10, 20, 30, 40, 50
 * 3. Comprueba si existe el 10
 * 4. Elimina el 20
 * 5. Muestra el número de elementos del conjunto
 * 6. Muestra los elementos con for y while 
 */

console.log("1. Crear un conjunto vacío llamado nums");
const nums = new Set();

console.log("2. Añadimos los valores 10, 20, 30, 40, 50");
for (i = 1; i <= 5; i++) {
  nums.add(i * 10);
};

console.log("3. Comprueba si existe el 10");
console.log(nums.has(10));

console.log("4. Elimina el 20");
console.log(nums.delete(20));

console.log("5. Muestra el número de elementos del conjunto");
console.log(nums.size);

console.log("6. Muestra los elementos con for y while ");
console.log("Con for")
for (const tag of nums) {
  console.log(tag);
}