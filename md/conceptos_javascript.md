Te explico cada concepto con ejemplos prácticos en JavaScript:

---

## 1. Uso de objetos predefinidos del lenguaje

Son objetos que JavaScript ya trae incorporados, no los tienes que crear tú.

```javascript
// Math - operaciones matemáticas
Math.random();        // número aleatorio entre 0 y 1
Math.max(3, 7, 2);   // → 7

// Date - fechas
const hoy = new Date();
hoy.getFullYear();    // → 2026

// String
const texto = "hola mundo";
texto.toUpperCase();  // → "HOLA MUNDO"
texto.split(" ");     // → ["hola", "mundo"]

// Array (también es predefinido)
const nums = [3, 1, 2];
nums.sort();          // → [1, 2, 3]
```

---

## 2. Arrays, funciones y objetos definidos por el usuario

Aquí **tú** los defines según tu programa.

```javascript
// Array definido por el usuario
const frutas = ["manzana", "pera", "uva"];
frutas.push("naranja");
frutas.forEach(f => console.log(f));

// Función definida por el usuario
function saludar(nombre) {
  return `Hola, ${nombre}!`;
}
saludar("Ana"); // → "Hola, Ana!"

// Objeto definido por el usuario
const persona = {
  nombre: "Carlos",
  edad: 25,
  hablar() {
    return `Me llamo ${this.nombre}`;
  }
};
persona.hablar(); // → "Me llamo Carlos"
```

---

## 3. Gestión de eventos y manipulación del DOM

**DOM** es la representación del HTML como objetos que JS puede modificar. Los **eventos** son acciones del usuario (click, tecla, etc.).

```html
<button id="btn">Haz click</button>
<p id="mensaje"></p>
```

```javascript
// Seleccionar elementos del DOM
const boton = document.getElementById("btn");
const parrafo = document.getElementById("mensaje");

// Escuchar un evento y manipular el DOM
boton.addEventListener("click", function() {
  parrafo.textContent = "¡Me hiciste click!";
  parrafo.style.color = "red";
});
```

Cuando el usuario hace click, JS **modifica** el HTML en tiempo real.

---

## 4. Patrones de diseño

Son soluciones reutilizables a problemas comunes de programación. Algunos ejemplos:

```javascript
// Singleton - que solo exista UNA instancia de algo
const Configuracion = (function() {
  let instancia;
  function crear() { return { tema: "oscuro", idioma: "es" }; }
  return {
    obtener() {
      if (!instancia) instancia = crear();
      return instancia;
    }
  };
})();

// Module - encapsular código privado
const Contador = (function() {
  let count = 0; // privado, nadie puede tocarlo directamente
  return {
    incrementar() { count++; },
    obtener() { return count; }
  };
})();

Contador.incrementar();
Contador.obtener(); // → 1
```

---

## 5. Interacción con formularios

Leer, validar y procesar lo que el usuario escribe en un formulario.

```html
<form id="miForm">
  <input type="text" id="nombre" placeholder="Tu nombre">
  <button type="submit">Enviar</button>
</form>
```

```javascript
const form = document.getElementById("miForm");

form.addEventListener("submit", function(e) {
  e.preventDefault(); // evita que la página se recargue

  const nombre = document.getElementById("nombre").value;

  if (nombre === "") {
    alert("El nombre no puede estar vacío");
  } else {
    console.log("Nombre enviado:", nombre);
  }
});
```

---

## 6. Almacenamiento en el navegador

Guardar datos en el navegador del usuario sin necesidad de un servidor.

```javascript
// localStorage - persiste aunque cierres el navegador
localStorage.setItem("usuario", "Ana");
localStorage.getItem("usuario"); // → "Ana"
localStorage.removeItem("usuario");

// sessionStorage - se borra al cerrar la pestaña
sessionStorage.setItem("carrito", JSON.stringify([{id:1, producto:"zapatos"}]));
const carrito = JSON.parse(sessionStorage.getItem("carrito"));

// Cookies - más antiguo, se pueden configurar con fecha de expiración
document.cookie = "color=azul; expires=Fri, 31 Dec 2026 23:59:59 GMT";
```

---

## 7. Comprensión del modelo de objetos del documento (DOM)

El DOM es el **árbol de objetos** que representa tu HTML. Entenderlo significa saber cómo está estructurado y cómo navegarlo.

```html
<div id="contenedor">
  <h1>Título</h1>
  <p class="texto">Párrafo</p>
</div>
```

```javascript
const contenedor = document.getElementById("contenedor");

// Navegar el árbol
contenedor.children;        // → [h1, p]
contenedor.firstElementChild;  // → <h1>
contenedor.parentElement;   // → <body>

// Crear y agregar elementos dinámicamente
const nuevoParrafo = document.createElement("p");
nuevoParrafo.textContent = "Párrafo nuevo";
contenedor.appendChild(nuevoParrafo);

// Eliminar un elemento
const h1 = document.querySelector("h1");
h1.remove();
```

---

**En resumen**, la relación entre todos es: el DOM es la estructura que manipulas, los eventos detectan acciones del usuario, los formularios capturan datos, el almacenamiento los guarda, y todo lo programas usando arrays, funciones, objetos y patrones de diseño junto con los objetos predefinidos del lenguaje.
