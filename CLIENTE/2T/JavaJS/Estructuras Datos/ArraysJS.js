/**
 * Ejemplos de uso de arrays en JS
 */

console.log("Ejemplo de operaciones con estructuras de datos en JS.");
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

// Método concat retorna un nuevo array.
console.log("Con el método concat consigo que no sea mutable.");
const nuevoArray = alumnos.concat("Pedro", "Lucía");
console.log(
  "Número de elementos tras las inserciones del array alumnos " + alumnos.length
);
console.log("Array alumnos: " + alumnos);
console.log("Nuevo Array: " + nuevoArray);

// Consultar elementos de un array: acceso por índice
console.log("Consulta de elementos por índice");
const primero = alumnos[0];
console.log(primero);

// Modificar elementos: asignación directa a través del índice
console.log("Modificar elementos a través de su índice");
alumnos[1] = "Federico";
console.log(alumnos);

// Comprobar existencia de elementos en el array
console.log("Comprobar existencia de elementos en un array");
const exist = alumnos.includes("Ana"); // Devuelve un booleano (True/False)
console.log(exist);

// Recorrer un array
console.log("Recorremos un array");
for (const ele of alumnos) {
  console.log(ele);
}

// Método splice
// Borra, sustituye, inserta, vacía parte del array y permite índices negativos
// Modifica el array original (es mutable)
// Cuando hablamos de sustituir lo puede hacer en cualquier posición
// Retorna un nuevo array con los elementos eliminados si se borran
// Este array puede estar vacío
console.log("Splice");
console.log("Borrar elementos");
const deleted = alumnos.splice(2, 1); // Borra 1 elemento desde el índice 2
console.log(deleted); // Imprime en pantalla los elementos borrados
console.log(alumnos);

console.log("Insertar elementos");
const b = ["a", "d"];
b.splice(1, 0, "b", "c");
console.log(b);

console.log("Sustituir elementos");
const c = ["a", "b", "c", "e"];
c.splice(1, 2, "x", "y");
console.log(c);

// Insertar en una posición intermedia
// Insertar texto en el índice 1 sin borrar nada
console.log("Insertar texto en el índice 1 sin borrar nada");
c.splice(1, 0, "Bea");
console.log(c);

// Vaciar parte de un array
console.log("Vaciar parte de un array");
const d = ["a", "b", "c", "d", "e"];
console.log(d);
d.splice(1, 3);
console.log(" ==> " + d);

// Usar índices negativos
console.log("1. Usar índices negativos");
const e = [1, 2, 3, 4, 5];
e.splice(-2, 1, 99);
console.log(e);

// Start: max (length + start, 0)
// Si length + start < 0, empieza por el principio
// Si start > length, empieza por el final
// length = 5, start = -2, 5 + (-2) = 3. -> max(3, 0)
// cual es el indice 3? el 4. Sustituye 4 por 99

console.log("2. Usar índices negativos");
e.splice(-10, 1);

// 5 + (-10) -> max(-5, 0) = 0. Empieza por el principio
console.log(e); // Elimina el primer elemento


// Ejercicio planteado
// Usando el método push, implementa una pila (LIFO) usando push.
// ¿Qué método de una pila elimina un elemento?
console.log("\nPila LIFO");
const pila = [];
pila.push("E1");
console.log(`Push 1 -> ${pila}`);
pila.push("E2");
console.log(`Push 2 -> ${pila}`);
pila.pop();
console.log(`Pop 1 -> ${pila}`);
pila.pop();
console.log(`Pop 2 -> ${pila}`);

/**
 * Entonces, ¿cuándo utilizo push y splice?
 * 
 * Añadir al final -> push. Tiene O(1), siendo más eficiente y simple que splice, que tiene 0(n), siendo mejor splice para operaciones intermedias
 * Añadir posición intermedia -> splice.
 * Eliminar posición intermedia -> splice.
 * Eliminar posición final -> pop.
 * Cuando hay que añadir muchos elementos en la última posición -> push en bucle o concat (si no quiero mutar).
 * 
 * Cuando tengo que insertar o borrar en cualquier índice, interesa splice.
 * Cuando es al final, me interesa push y pop, como en estructuras de pilas LIFO.
 */
console.log("\n\nEjercicios:");
// Ejercicios:
// 1. Define una matriz de 2x2
console.log("1. Define una matriz de 2x2");
const matriz = [];
console.log(matriz);
// 2. Inserta elementos en cada una de las posiciones
console.log("2. Inserta elementos en cada una de las posiciones");
matriz.push(
  [1, 2], 
  [3, 4]);
console.log(matriz);
// 3. Modifica un elemento de la matriz
console.log("3. Modifica un elemento de la matriz");
matriz[1].splice(1, 1, 99);
console.log(matriz);
// 4. Borra un elemento de la matriz
console.log("4. Borra un elemento de la matriz");
matriz[0].splice(0, 1, null); // Se pone a null para no romper la matriz
console.log(matriz);
// 5. Recorre y muestra en consola todos los elementos de la matriz
console.log("5. Recorre y muestra en consola todos los elementos de la matriz");
for (let i = 0; i < matriz.length; i++) {
  console.log(`Fila ${i + 1}`);
  for (let j = 0; j < matriz[i].length; j++) {
    console.log(`Columna ${j + 1}`);
    console.log(matriz[i][j]);
  }
}

// Ejercicio propuesto: 
// 1. Crea una matriz de 30x30
console.log("1. Crea una matriz de 30x30");
const matriz2 = [];
// 2. Inicializa automáticamente los elementos de la matriz
console.log("2. Inicializa automáticamente los elementos de la matriz")
for (let i = 0; i < 30; i++) {
  matriz2[i] = [];
  for (let j = 0; j < 30; j++) {
    matriz2[i][j] = i + j;
  }
}
// 3. Muestra todos los elementos de la matriz 
console.log("3. Muestra todos los elementos de la matriz");
for (let i = 0; i < matriz2.length; i++) {
  console.log(`Fila ${i + 1}`);
  for (let j = 0; j < matriz2[i].length; j++) {
    console.log(`Columna ${j + 1}`);
    console.log(matriz2[i][j]);
  }
}
// 4. Modifica las dimensiones para que quede en 3x3