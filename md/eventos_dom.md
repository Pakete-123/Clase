# Gestión de Eventos y Manipulación del DOM

El DOM es el HTML convertido en objetos que JavaScript puede leer y modificar. Los eventos son las acciones del usuario a las que puedes reaccionar.

---

## 🌳 El DOM: cómo está estructurado

Cuando el navegador carga tu HTML, lo convierte en un árbol de nodos:

```html
<html>
  <body>
    <div id="contenedor">
      <h1 class="titulo">Hola</h1>
      <p>Párrafo</p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    </div>
  </body>
</html>
```

```
document
└── html
    └── body
        └── div#contenedor
            ├── h1.titulo  →  "Hola"
            ├── p          →  "Párrafo"
            └── ul
                ├── li     →  "Item 1"
                └── li     →  "Item 2"
```

Todo lo que ves en el HTML es un **nodo** que puedes seleccionar, modificar, crear o eliminar con JavaScript.

---

## 🔍 Seleccionar elementos

Antes de hacer cualquier cosa, tienes que seleccionar el elemento.

```javascript
// Por ID (devuelve UN elemento)
const titulo = document.getElementById("contenedor");

// Por clase (devuelve HTMLCollection, todos los que tengan esa clase)
const items = document.getElementsByClassName("titulo");

// Por etiqueta (devuelve HTMLCollection)
const parrafos = document.getElementsByTagName("p");

// querySelector: selector CSS, devuelve EL PRIMERO que encuentre
const primero = document.querySelector(".titulo");
const boton   = document.querySelector("#btn");
const li      = document.querySelector("ul li");       // primer li dentro de ul
const input   = document.querySelector("input[type='text']");

// querySelectorAll: selector CSS, devuelve TODOS (NodeList)
const todosLi   = document.querySelectorAll("li");
const botones   = document.querySelectorAll(".btn");
const inputs    = document.querySelectorAll("input");

// Iterar el resultado de querySelectorAll
todosLi.forEach(li => console.log(li.textContent));
```

### Navegar por el árbol (desde un elemento)

```javascript
const div = document.getElementById("contenedor");

// Hijos
div.children;           // → HTMLCollection con h1, p, ul
div.firstElementChild;  // → h1
div.lastElementChild;   // → ul
div.childElementCount;  // → 3

// Padre
div.parentElement;      // → body

// Hermanos
const h1 = div.firstElementChild;
h1.nextElementSibling;      // → p
h1.previousElementSibling;  // → null (no hay nada antes)
```

---

## ✏️ Modificar elementos

Una vez seleccionado el elemento, puedes cambiar todo de él.

### Contenido

```javascript
const titulo = document.querySelector("h1");

// Texto plano (más seguro, no interpreta HTML)
titulo.textContent = "Nuevo título";
titulo.textContent; // lee el texto actual

// HTML interno (interpreta etiquetas, cuidado con seguridad)
titulo.innerHTML = "Título <span>especial</span>";
titulo.innerHTML; // lee el HTML interno

// Valor de inputs
const input = document.querySelector("input");
input.value = "texto por defecto";
input.value; // leer lo que escribió el usuario
```

### Estilos

```javascript
const caja = document.querySelector(".caja");

// Estilos inline directamente
caja.style.color           = "red";
caja.style.backgroundColor = "blue";  // camelCase, no background-color
caja.style.fontSize        = "24px";
caja.style.display         = "none";  // ocultar
caja.style.display         = "block"; // mostrar

// Mejor práctica: usar clases CSS en vez de estilos inline
caja.classList.add("activo");        // añadir clase
caja.classList.remove("activo");     // quitar clase
caja.classList.toggle("activo");     // si tiene la quita, si no la pone
caja.classList.contains("activo");   // → true/false
caja.classList.replace("viejo", "nuevo"); // reemplazar una clase
```

### Atributos

```javascript
const imagen = document.querySelector("img");

// Leer y escribir atributos
imagen.getAttribute("src");          // → "foto.jpg"
imagen.setAttribute("src", "nueva.jpg");
imagen.setAttribute("alt", "descripción");
imagen.removeAttribute("alt");
imagen.hasAttribute("src");          // → true

// Algunos atributos son propiedades directas
imagen.src;   // equivale a getAttribute("src")
imagen.id;
imagen.href;  // en enlaces
const link = document.querySelector("a");
link.href = "https://ejemplo.com";
```

---

## 🏗️ Crear y eliminar elementos

```javascript
// Crear un elemento nuevo
const nuevoParrafo = document.createElement("p");
nuevoParrafo.textContent = "Soy un párrafo nuevo";
nuevoParrafo.classList.add("destacado");

// Insertar en el DOM
const contenedor = document.getElementById("contenedor");
contenedor.appendChild(nuevoParrafo);          // al final
contenedor.prepend(nuevoParrafo);              // al principio

// Insertar en posición específica
const referencia = document.querySelector("h1");
contenedor.insertBefore(nuevoParrafo, referencia); // antes del h1

// insertAdjacentElement: más control
referencia.insertAdjacentElement("beforebegin", nuevoParrafo); // antes del elemento
referencia.insertAdjacentElement("afterbegin",  nuevoParrafo); // primer hijo
referencia.insertAdjacentElement("beforeend",   nuevoParrafo); // último hijo
referencia.insertAdjacentElement("afterend",    nuevoParrafo); // después del elemento

// Insertar HTML directamente (más rápido para estructuras complejas)
contenedor.insertAdjacentHTML("beforeend", `
  <div class="tarjeta">
    <h2>Título</h2>
    <p>Descripción</p>
  </div>
`);

// Eliminar elementos
const parrafo = document.querySelector("p");
parrafo.remove(); // elimina el elemento directamente

// Vaciar un contenedor
contenedor.innerHTML = "";
```

### Ejemplo: crear una lista dinámicamente

```javascript
const frutas = ["Manzana", "Pera", "Uva", "Naranja"];

const lista = document.createElement("ul");

frutas.forEach(fruta => {
  const item = document.createElement("li");
  item.textContent = fruta;
  lista.appendChild(item);
});

document.body.appendChild(lista);

// Resultado en el HTML:
// <ul>
//   <li>Manzana</li>
//   <li>Pera</li>
//   <li>Uva</li>
//   <li>Naranja</li>
// </ul>
```

---

## 🎯 Eventos

Un evento es cualquier cosa que ocurre en la página: click, tecla pulsada, ratón moviéndose, página cargada...

### Añadir y quitar eventos

```javascript
const boton = document.querySelector("#btn");

// Añadir evento
function handleClick() {
  console.log("Me hicieron click");
}
boton.addEventListener("click", handleClick);

// Quitar evento (necesitas la misma referencia de función)
boton.removeEventListener("click", handleClick);

// Evento que solo se ejecuta UNA vez
boton.addEventListener("click", () => {
  console.log("Solo ocurre una vez");
}, { once: true });
```

### El objeto Event

Cuando ocurre un evento, JavaScript te pasa un objeto con información sobre lo que pasó.

```javascript
boton.addEventListener("click", function(event) {
  console.log(event.type);          // → "click"
  console.log(event.target);        // → el elemento que recibió el click
  console.log(event.currentTarget); // → el elemento donde pusiste el listener
  console.log(event.timeStamp);     // → momento en que ocurrió

  // Posición del ratón
  console.log(event.clientX, event.clientY); // relativo a la ventana
  console.log(event.pageX,   event.pageY);   // relativo a la página

  // Prevenir comportamiento por defecto (muy usado en formularios y enlaces)
  event.preventDefault();

  // Detener propagación (ver más abajo)
  event.stopPropagation();
});
```

### Tipos de eventos más importantes

#### Ratón

```javascript
const caja = document.querySelector(".caja");

caja.addEventListener("click",      e => console.log("click simple"));
caja.addEventListener("dblclick",   e => console.log("doble click"));
caja.addEventListener("mouseenter", e => console.log("ratón entró"));
caja.addEventListener("mouseleave", e => console.log("ratón salió"));
caja.addEventListener("mousemove",  e => {
  console.log(`Ratón en: ${e.clientX}, ${e.clientY}`);
});
caja.addEventListener("mousedown",  e => console.log("botón presionado"));
caja.addEventListener("mouseup",    e => console.log("botón soltado"));
caja.addEventListener("contextmenu",e => {
  e.preventDefault(); // evita el menú contextual del navegador
  console.log("click derecho");
});
```

#### Teclado

```javascript
document.addEventListener("keydown", e => {
  console.log(e.key);     // → "a", "Enter", "ArrowUp", "Escape"...
  console.log(e.code);    // → "KeyA", "Enter", "ArrowUp"...
  console.log(e.ctrlKey); // → true si se pulsó Ctrl a la vez
  console.log(e.shiftKey);
  console.log(e.altKey);

  // Detectar combinaciones
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault(); // evita que el navegador abra "Guardar como"
    console.log("Guardando...");
  }

  if (e.key === "Escape") {
    cerrarModal();
  }
});

document.addEventListener("keyup", e => console.log("tecla soltada"));
```

#### Input y formularios

```javascript
const input = document.querySelector("input");

input.addEventListener("input",  e => {
  console.log("Valor actual:", e.target.value); // se dispara en cada tecla
});

input.addEventListener("change", e => {
  console.log("Valor final:", e.target.value); // se dispara al perder el foco
});

input.addEventListener("focus",  e => console.log("input seleccionado"));
input.addEventListener("blur",   e => console.log("input abandonado"));
```

#### Ventana y documento

```javascript
// La página ha terminado de cargar
window.addEventListener("load", () => {
  console.log("Todo cargado (imágenes, estilos...)");
});

// El HTML está listo (sin esperar imágenes)
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM listo, puedo manipularlo");
});

// Scroll
window.addEventListener("scroll", () => {
  console.log("Scroll Y:", window.scrollY);
  if (window.scrollY > 300) {
    document.querySelector(".navbar").classList.add("fija");
  }
});

// Redimensionar ventana
window.addEventListener("resize", () => {
  console.log("Ancho:", window.innerWidth);
});

// Antes de cerrar la página
window.addEventListener("beforeunload", e => {
  e.preventDefault();
  // Muestra diálogo "¿Seguro que quieres salir?"
});
```

---

## 🫧 Propagación de eventos (Bubbling)

Cuando haces click en un elemento, el evento "sube" por el árbol del DOM.

```html
<div id="abuelo">
  <div id="padre">
    <button id="hijo">Click</button>
  </div>
</div>
```

```javascript
document.getElementById("abuelo").addEventListener("click", () => {
  console.log("1. Abuelo");
});
document.getElementById("padre").addEventListener("click", () => {
  console.log("2. Padre");
});
document.getElementById("hijo").addEventListener("click", () => {
  console.log("3. Hijo");
});

// Al hacer click en el botón, se disparan LOS TRES:
// → "3. Hijo"
// → "2. Padre"
// → "1. Abuelo"

// Para detener la propagación:
document.getElementById("hijo").addEventListener("click", (e) => {
  e.stopPropagation(); // el evento no sube más
  console.log("Solo hijo");
});
```

---

## 🧠 Delegación de eventos

En vez de poner un listener en cada elemento, pones uno solo en el padre. Esto es especialmente útil cuando los elementos se crean dinámicamente.

```html
<ul id="lista">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

```javascript
// ❌ Mal: un listener por cada li
document.querySelectorAll("li").forEach(li => {
  li.addEventListener("click", e => console.log(e.target.textContent));
});
// Si añades un li nuevo dinámicamente, NO tendrá el evento

// ✅ Bien: un listener en el padre
document.getElementById("lista").addEventListener("click", e => {
  if (e.target.tagName === "LI") {
    console.log("Clickaste:", e.target.textContent);
    e.target.classList.toggle("seleccionado");
  }
});
// Funciona para los li actuales Y para los que añadas después
```

---

## 💡 Ejemplos reales completos

### Menú desplegable

```javascript
const menuBtn   = document.querySelector(".menu-btn");
const menuItems = document.querySelector(".menu-items");

menuBtn.addEventListener("click", e => {
  e.stopPropagation();
  menuItems.classList.toggle("visible");
});

// Cerrar al hacer click fuera
document.addEventListener("click", () => {
  menuItems.classList.remove("visible");
});
```

### Tabs (pestañas)

```html
<div class="tabs">
  <button class="tab activa" data-tab="inicio">Inicio</button>
  <button class="tab" data-tab="about">About</button>
  <button class="tab" data-tab="contacto">Contacto</button>
</div>
<div id="inicio"   class="panel">Contenido inicio</div>
<div id="about"    class="panel oculto">Contenido about</div>
<div id="contacto" class="panel oculto">Contenido contacto</div>
```

```javascript
document.querySelector(".tabs").addEventListener("click", e => {
  if (!e.target.classList.contains("tab")) return;

  // Desactivar todo
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("activa"));
  document.querySelectorAll(".panel").forEach(p => p.classList.add("oculto"));

  // Activar el clickado
  e.target.classList.add("activa");
  const tabId = e.target.dataset.tab; // lee el atributo data-tab
  document.getElementById(tabId).classList.remove("oculto");
});
```

### Lista de tareas completa

```javascript
const input    = document.querySelector("#nueva-tarea");
const lista    = document.querySelector("#lista-tareas");
const contador = document.querySelector("#contador");

function actualizarContador() {
  const pendientes = lista.querySelectorAll("li:not(.hecha)").length;
  contador.textContent = `${pendientes} pendientes`;
}

function agregarTarea(texto) {
  if (!texto.trim()) return;

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${texto}</span>
    <button class="btn-borrar">✕</button>
  `;

  li.addEventListener("click", e => {
    if (e.target.classList.contains("btn-borrar")) {
      li.remove();
    } else {
      li.classList.toggle("hecha");
    }
    actualizarContador();
  });

  lista.appendChild(li);
  actualizarContador();
  input.value = "";
}

// Añadir con Enter
input.addEventListener("keydown", e => {
  if (e.key === "Enter") agregarTarea(input.value);
});

// Añadir con botón
document.querySelector("#btn-agregar").addEventListener("click", () => {
  agregarTarea(input.value);
});
```

### Tooltip personalizado

```javascript
const tooltip = document.createElement("div");
tooltip.classList.add("tooltip");
document.body.appendChild(tooltip);

document.querySelectorAll("[data-tooltip]").forEach(el => {
  el.addEventListener("mouseenter", e => {
    tooltip.textContent = e.target.dataset.tooltip;
    tooltip.style.display = "block";
  });

  el.addEventListener("mousemove", e => {
    tooltip.style.left = `${e.pageX + 10}px`;
    tooltip.style.top  = `${e.pageY + 10}px`;
  });

  el.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });
});
```

---

## En resumen

| Concepto | Para qué sirve |
|---|---|
| `querySelector` / `getElementById` | Seleccionar elementos del HTML |
| `textContent` / `innerHTML` | Leer y cambiar el contenido |
| `classList` | Añadir, quitar y alternar clases CSS |
| `createElement` / `appendChild` | Crear elementos nuevos dinámicamente |
| `remove()` | Eliminar elementos del DOM |
| `addEventListener` | Reaccionar a acciones del usuario |
| `event.preventDefault()` | Evitar el comportamiento por defecto |
| `event.stopPropagation()` | Detener la propagación del evento |
| `event.target` | El elemento que disparó el evento |
| Delegación de eventos | Un listener en el padre para todos los hijos |
