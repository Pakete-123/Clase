//Pido números hasta que se introduzca 0. En ese caso, salir del bucle y mostrar la suma de los números anteriores
let suma = 0, num;

do {

    num = Number(prompt("Ingresa un número, 0 para salir"));
    suma += num;

} while (num !== 0);

alert("El total de la suma es " + suma);