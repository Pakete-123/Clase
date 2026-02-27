// Definimos un array
const nums = [10, 2, 1, 20];
console.log(nums);

// Ordenar el array
nums.sort((a, b) => a - b);
/**
 * a - b es la funcion de comparacion (comparador)
 *
 * Si a-b < 0 -> a debe ir antes que b
 * Si a-b > 0 -> a debe ir despues que b
 * Si a-b = 0 -> mantiene el orden
 *
 * Estamos usando una resta como atajo numérico
 */
console.log(nums);

// Filtrado notas
const notas = [
  { nombre: "Ana", nota: 4 },
  { nombre: "Luis", nota: 7 },
  { nombre: "Marta", nota: 9 },
  { nombre: "Ivan", nota: 5 },
  { nombre: "Sofia", nota: 3 },
];
console.log(JSON.stringify(notas));

// Queremos filtrar para quedarnos con los alumnos que están aprobados
// Array con los aprobados

const aprobados = notas.filter((alumno) => alumno.nota >= 5);
console.log(JSON.stringify(aprobados));

// Creo otro array con un tercer atributo

const alumnos = [
  { nombre: "Ana", grupo: "A", nota: 4 },
  { nombre: "Luis", grupo: "B", nota: 7 },
  { nombre: "Marta", grupo: "A", nota: 9 },
  { nombre: "Ivan", grupo: "C", nota: 5 },
  { nombre: "Sofia", grupo: "B", nota: 3 },
];

// Agrupamientos
const grupoUnico = new Set(alumnos.map((alum) => alum.grupo));
console.log("Grupos únicos", grupoUnico);

// Conversiones: de Set a Array y de Map a Object
const grArray = Array.from(grupoUnico);

const nombreANota = new Map();
nombreANota.set("Nombre", 7);
nombreANota.set("Nombre", 6);
const objDesdeMap = Object.fromEntries(nombreANota.entries()); // Utilizando el fromEntries, pasando un Map.entries

console.log("Grupos Array: " + JSON.stringify(grArray));
console.log("Objeto desde Map: " + objDesdeMap);

/**
 * Ejercicios:
 * 1. Dado un array de números, crea un Set con los números únicos
 * 2. Dado un array de objetos con los atributos id, valor, crea un map donde K = id y V = valor
 */

console.log("1. Dado un array de números, crea un Set con los números únicos");
const num2 = [1, 2, 3, 4, 3, 2, 1];
const numSet = new Set(num2);
console.log(`Array ${num2}`);
console.log(`Set ${numSet}`);

console.log(
  "2. Dado un array de objetos con los atributos id, valor, crea un map donde K = id y V = valor",
);
const objArray = [
  { id: 1, valor: "Hola" },
  { id: 2, valor: "Que" },
  { id: 3, valor: "Tal" },
  { id: 4, valor: "Estás" },
];
const objMap = new Map(objArray.map((obj) => [obj.id, obj.valor]));
console.log(`Array de Objetos ${objArray}`);
console.log(`Map de Objetos ${objMap}`);
