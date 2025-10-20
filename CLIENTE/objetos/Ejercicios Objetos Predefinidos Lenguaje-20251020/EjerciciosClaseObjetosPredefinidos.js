"use strict"; //Para evitar errores

const $res = document.getElementById("resultado");

/**
 * Funcion de utilidad para evitar pintar en cada ejercicio.
 * Invocamos esta función desde cada ejercicio.
 * @param {} html HTML a pintar
*/
function setResult(html) {
    $res.innerHTML = html;
    //Sustituimos el contenido del área html donde vamos a pintar el resultado
}

/*Ejercicio 1: contarVocales(cadena): Recorre la cadena y cuenta las vocales.*/
function contarVocales(cadena = "") {

    //1. Validar la entrada
    if (typeof cadena !== "string") return 0; //typeof verifica el tipo de dato de cadena
    //El if retorna true si no es un string, false en otro caso

    //2. Pasamos a minúsculas utilizando toLowerCase
    const lower = cadena.toLowerCase();

    //3. Hacemos las operaciones
    let cuenta = 0; //Definimos una variable llamada cuenta inicializada a 0
    const vocales = ["a", "e", "i", "o", "u"]; //Definimos el array

        //3.1- Recorrer cada caracter para verificar si se encuentra en el array
        for (const ch of lower) {
            if (vocales.includes(ch)) cuenta++; //Si está en el array aumenta el contador
        }

    //4. Operamos
    return cuenta;
}


function ejercicio1() {
    //1. Recibe una cadena con prompt del usuario
    const cadena = prompt("Introduce una cadena de caracteres.");

    //2. Valida la entrada (si cancela no hacemos nada)
    if (cadena === null) return;

    //3. Hacer las operaciones y mostrar el resultado
    setResult(`<strong>Vocales:</strong> ${contarVocales(cadena)}`);

}

//Ejercicio 2: invertirCadena(cadena): Usa los métodos split(), reverse() y join() para invertir la cadena. 
/**
 * 
 * @param {} cadena 
 */
function invertirCadena(cadena = "") {
    //Aseguramos que convertimos a String
    //Aplicando split convertimos la cadena en un array de caracteres
    //Aplicando reverse le damos la vuelta al array
    //Convertimos el array en un string y lo devuelvo
    return String(cadena).split("").reverse().join("");

}

function ejercicio2() {
    //1. Pido al usuario una cadena y valido
    const cadena = prompt("Introduce una cadena de caracteres.");
    if (cadena === null) return;

    //2. Realizo la transformación y muestro el resultado
    setResult(`<strong>Cadena Invertida:</strong> ${invertirCadena(cadena)}`);
}

//Ejercicio 3: esPalindromo(cadena): Limpia la cadena (sin espacios ni caracteres especiales) y comprueba si es igual a su reverso.
function esPalindromo(cadena = "") {
    
    const limpia = String(cadena).toLowerCase().replace(/[W_]/g,""); //Quitamos los espacios en blanco usando la expresión regular. /[W_]/g quita los espacios en blanco, guiones y signos

    if (limpia === invertirCadena(limpia)) return true;

}

function ejercicio3() {
    //1. Recoger la entrada
    const cadena = prompt("Introduzca la cadena para la comprobación");

    //2. Validamos que no esté vacía
    if (cadena === null) return;

    //3. Comprobamos si es palíndroma la cadena y la mostramos
    setResult(esPalindromo(cadena) ? `<em>${cadena} es palíndroma</em>` : `<em>${cadena} no es palíndroma</em>`)
}

//Ejercicio 4: obtenerDiaSemana(fecha): Devuelve el día de la semana utilizando getDay() del objeto Date.
const dia = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
function obtenerDiaSemana(f) {

    const d = new Date(f); //Convertimos la fecha en String a Date

    if (Number.isNaN(d.getTime())) return;
    return dia[d.getDay()];
}

function ejercicio4() {
    //1. Entrada de datos
    const f = prompt("Introduce la fecha en formato YYYY-MM-DD")
    if (f === null) return;

    //2. Calculo y muestra de resultado
    const dia = obtenerDiaSemana(f);

    setResult(dia ? `<b>Día:</b> ${dia}` : `Fecha no válida`);
}

//Ejercicio 5: diferenciaDias(fecha1, fecha2): Calcula la diferencia en días usando getTime() para restar las fechas en milisegundos.