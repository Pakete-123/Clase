// Definimos un array
const nums = [10, 2, 1, 20];
console.log(nums);

// Ordenar el array
nums.sort((a, b) => a-b);
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
  {nombre: "Ana", nota: 4},
  {nombre: "Luis", nota: 7},
  {nombre: "Marta", nota: 9},
  {nombre: "Ivan", nota: 5},
  {nombre: "Sofia", nota: 3},
];
console.log(JSON.stringify(notas));

// Queremos filtrar para quedarnos con los alumnos que están aprobados
// Array con los aprobados

const aprobados = notas.filter(alumno => alumno.nota >= 5);
console.log(JSON.stringify(aprobados));

// Creo otro array con un tercer atributo

const alumnos = [
  {nombre: "Ana", grupo: "A", nota: 4},
  {nombre: "Luis", grupo: "B", nota: 7},
  {nombre: "Marta", grupo: "A", nota: 9},
  {nombre: "Ivan", grupo: "C", nota: 5},
  {nombre: "Sofia", grupo: "B", nota: 3},
]

// Agrupamientos
const grupoUnico = new Set(alumnos.map(alum => alum.grupo));
console.log("Grupos únicos", grupoUnico);