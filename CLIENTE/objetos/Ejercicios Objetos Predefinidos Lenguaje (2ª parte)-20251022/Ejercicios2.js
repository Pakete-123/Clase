"use strict";

function normalizarTitulo(titulo) {
    return titulo
    .trim() //quitar los espacios en blanco del principio y del final
    .replace(/\s+/g, " ") //reemplazar varios espacios en blanco en uno solo
    .split(" ") //separamos las palabras por los espacios en blanco
    .toLowerCase()
    .map(p => //map -> aplica a cada elemento del array una función
        p.charAt(0).toUpperCase() //Primera letra de p (cada elemento del array) a MAYUS
        + p.slice(1)) //el resto se quedan como está
    .join(" "); //convierto el array en un string

}