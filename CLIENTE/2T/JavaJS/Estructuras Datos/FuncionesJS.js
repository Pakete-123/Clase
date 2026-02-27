// Definición de funciones
// Función pura
function calcularIVA(base) {
  return base * 0.21;
}

// Funcion de orden superior: recibe otra función como parámetro (f) y le aplica un valor
function aplicar(f, valor) {
  return f(valor);
}

// Prueba
const base = 100;
const iva = calcularIVA(base);
console.log(iva);

const descuento = (x) => x * 0.9; // Función flecha
const conDescuento = aplicar(descuento, base);
console.log(conDescuento);

// Función flecha
// Sintaxis básica: (param1, param2, ...) => expresión
const sumar = (a, b) => a + b; // Función que suma dos números
console.log(`La suma de 3 y 5 es ${sumar(3, 5)}`);

const cuadrado = (x) => Math.pow(x, 2);
console.log(`El cuadrado de 4 es ${cuadrado(4)}`);

// Factorial de forma recursiva
const factorial = (n) => {
  if (n == 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
};
console.log(`El factorial de 4 es ${factorial(4)}`);

// Función flecha con arrays
const numeros = [1, 2, 3, 4, 5];
// Calcular el doble de cada número
const dobles = numeros.map((n) => n * 2);
console.log(
  `Numeros base del array ${numeros}\nNúmeros dobles del array ${dobles}`,
);

// Aplicando a filter -> filtrar pares
const pares = numeros.filter((n) => n % 2 == 0);
console.log(`Numeros pares del array ${pares}`);

// Array de objetos
const notas = [
  { nombre: "Ana", nota: 4 },
  { nombre: "Luis", nota: 7 },
  { nombre: "Marta", nota: 9 },
  { nombre: "Ivan", nota: 5 },
  { nombre: "Sofia", nota: 3 },
];
// Filtrar por aprobados
const aprobados = notas.filter((al) => al.nota >= 5);
console.log(`Alumnos aprobados ${JSON.stringify(aprobados)}`);

const aprobadosMasUno = aprobados.map((a) => {
  nota: Math.min(a.nota + 1, 10);
});
console.log(
  `Aprobados más 1 con máximo de 10 ${JSON.stringify(aprobadosMasUno)}`,
);

// const numeros = [1, 2, 3, 4, 5];
const m = numeros.reduce((acc, n) => acc + n, 0); // hace acc + n, siendo n el numero del array y acc la suma previa. El 0 es la variable inicial del acc
console.log(`${m}`);
