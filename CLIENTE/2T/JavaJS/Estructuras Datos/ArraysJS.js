/**
 * Ejemplos de uso de arrays en JS
 */

console.log("Ejemplo de operaciones con estructuras de datos en JS.")
console.log("Definición de un array vacío.");

const alumnos = []; // Array vacío dinámico

// Inserción: utilizamos el método push, que inserta al final del array.
// Devuelve el nuevo tamaño del array
console.log("Inserción de elementos con push: ");
alumnos.push("Ana");
alumnos.push("Luis");
const copiaAlumnos = alumnos.push("Marta");
console.log(alumnos);
console.log(copiaAlumnos);