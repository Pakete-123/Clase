//Imprimimos una traza de inicio de ejecución de JS
console.log("Aplicación cargada...");

/*Accedemos al árbol DOM seleccionando algunos nodos
Definimos una constante (una sola asignación)
Con const definimos constantes*/
const titulo = document.getElementById("titulo");
const contador = document.getElementById("contador");
const btn = document.getElementById("btn");

//Recuperamos del árbol DOM el nodo asociado al id btnTema
const btnTema = document.getElementById("btnTema");

//Clave con la que almacenamos en el LocalStorage el valor del tema
const THEME_KEY = "tema";

//Recuperamos todo el body del HTML
const body = document.body;

//Ahora vamos a preguntar al LocalStorage si hay guardado algún valor para la clave tema
const temaGuardado = localStorage.getItem(THEME_KEY);

if (temaGuardado == "alto") {

    body.classList.add("alto-contraste");
    btnTema.setAttribute("aria-pressed", "true");

}

//Función para alternar el tema
function alternarTema() {

    //True si está activado
    const activado = body.classList.toggle("alto-contraste");
    btnTema.setAttribute("aria-pressed", String(activado));
    localStorage.setItem(THEME_KEY, activado ? "alto" : "normal")

}

//Registramos el evento del botón de cambiar tema
btnTema.addEventListener("click", alternarTema);

//Estado inicial de la aplicación (let es para definir variables)
let clicks = 0;

//Actualizar la UI en funcion del numero de clicks que se hayan pulsado
function actualizarVista() {

    if (clicks == 0) {

        titulo.textContent = "Hola desde JS";

    }else if (clicks == 1) {

        titulo.textContent = "Has hecho 1 click";

    }else if (clicks < 5) {

        titulo.textContent = "¡Seguimos haciendo click!";

    }else {

        titulo.textContent = "Ya son " + clicks + " clicks";

    }

    contador.textContent = "Has pulsado " + clicks + " veces el botón";

}

//Función para aumentar el contador de clicks
function incrementar() {

    clicks += 1;
    actualizarVista();
    console.log("Numero de clicks: " + clicks + "");

}

/*Hacemos el evento de pulsar el botón
Como primer parámetro se indica el evento que lanzará la función
Como segundo parámetro, el nombre de la función qie se ejecuta cuando se lanza el evento*/
btn.addEventListener("click", incrementar);
