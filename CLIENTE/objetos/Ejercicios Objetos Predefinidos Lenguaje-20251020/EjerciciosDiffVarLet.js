/*

var -> tiene vida dentro del ámbito de una función o bien global (si no está dentro de una función)

let -> tiene vida dentro del ámbito de bloque (dentro de las llaves más cercanas)


*/

if (true) {
    var a = 1;
    let b = 2;
}
console.log(a); //Escribe 1
//console.log(b); //Reference error: b is not defined

//Definición de variables dentro de un bucle
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var: ", i), 0);
}

for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log("let: ", i), 0);
}
/**
 * 
 * 
 * 
 * ¿Qué está pasando en el código de los bucles?
 * ¿Por qué escribe 3, 3, 3 en el bucle con var?
 * 
 * Cada iteración con un bucle for con let crea una variable nueva, mientras que cuando defino el for con var la reutilizo. Esto es, la misma variable
 * 
 * Buenas prácticas: 
 * - Por defecto utilizar const y si hay que reasignar usar let
 * - Evitar la definición de var
 */
