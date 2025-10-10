console.log("Hola, soy Pablo");

//Definiciones de variables y constantes

//Nos definimos una variable con let y le asignamos un valor
let edad = 20;

//Nos definimos una constante con const y le asignamos un valor
const pais = "España";

//Asignación de valores a las variables
edad = 21; //Se puede, es una variable

//pais = "Nepal"; //No se puede, es una constante

//Creacion de funciones
/*Creamos una función llamada tipoDe que tendrá un parámetro y retornará el resultado de typeOf aplicado al parámetro de entrada*/
function tipoDe(x) {
    return typeof x;
}

console.log(tipoDe(42));
console.log(tipoDe("42"));
console.log(tipoDe(true));
console.log(tipoDe(null));
console.log(tipoDe(undefined));
console.log(tipoDe({}));
console.log(tipoDe(function(){}));

//Sumas y conversiones
//Implementamos una función suma, con dos parámetros, que convertirá ambos parámetros a un número y luego sumará los dos parámetros 
function esNum(x) {
    const num = Number(x);
    return Number.isNaN(num) ? null : num;
    //Si n no es un numero, devolverá null, si lo es devolverá n
}

/**
 * Si alguno es algo que no sea un Integer, devuelve null
 * @param {*} x 
 * @param {*} y 
 * @returns x + y ó null
 */

function suma(x, y) {
    const n = esNum(x), m = esNum(y);
    return (n === null || m === null) ? null : n + m;
}

console.log(suma("2", "3"));
console.log(suma("hola", 3));
console.log(suma(2, 3));

//Crear una funcion que identifique par o impar
/**
 * Funcion que identifica si un dato es par o impar
 * Compara x si es un numero o no, si no lo es lo es devuelve "dato inválido"
 * @param {*} x 
 */
function parImpar(x) {
    const n = Number(x);
    if (Number.isNaN(n)) {
        return "Dato inválido";
    } else if (n % 2 === 0) {
        return "El número es par";
    }
    return "El número es impar";
}

console.log(parImpar("5"));
console.log(parImpar("26"));
console.log(parImpar("QWERTY"));

//Crea una funcion que obtenga el máximo de dos números
function max(x, y) {

    const n = Number(x), m = Number(y);

    if (Number.isNaN(n) || Number.isNaN(m)) {
        return "Dato inválido";
    }

    if (n == m) {
        return "Los dos son iguales";
    } else if (n > m) {
        return n + " es el mayor";
    } else {
        return m + " es el mayor";
    }

}

console.log(max("1", "hola"));
console.log(max("1", "5"));
console.log(max("1", "0"));
console.log(max("1", "1"));

//Uso del switch
//Crea una función que acepte una letra y devuelva ul mensaje para esa letra
//Si se introduce "A", el mensaje es "Excelente"
//Si se introduce "B", el mensaje es "Notable"
//Si se introduce "C", el mensaje es "Bien"
//Si se introduce "D", el mensaje es "Suficiente"
//Si se introduce "E", el mensaje es "Insuficiente"
//Si se introduce otra cosa, el mensaje es "opción inválida"

/**
 * Funcion que devuelve una nota en funcion de la letra introducida
 * @param {*} x 
 * @returns 
 */
function mensajeNota(x) {
    switch (x) {
        case "A":
            return "Excelente";
        case "B":
            return "Notable";
        case "C":
            return "Bien";
        case "D":
            return "Suficiente";
         case "E":
            return "Insuficiente";
        default:
            return "Opción inválida"
    }
}

console.log(mensajeNota("A"));
console.log(mensajeNota("m"));

//Bucles
//Implementar una funcion llamada sumaHasta(x) que sume todos los numeros hasta x
//Si no es valido devuelve null

function sumaHasta(x) {
    const n = Number(x);
    let sum = 0;
    
    if (!Number.isInteger(n) || n <= 0) return "Dato no válido";

    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

console.log(sumaHasta(10));