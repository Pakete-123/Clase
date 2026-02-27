# Comprensión del Modelo de Objetos del Documento (DOM)

El DOM no es solo "el HTML". Es una **representación viva en memoria** de tu página, organizada como un árbol de objetos que JavaScript puede leer, modificar y escuchar. Entenderlo a fondo es lo que separa a alguien que "toca el DOM" de alguien que realmente lo comprende.

---

## 🌳 Qué es exactamente el DOM

Cuando el navegador carga un archivo HTML, no lo muestra directamente. Primero lo **parsea** (lo lee y lo interpreta) y construye en memoria un árbol de objetos. Ese árbol es el DOM.

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <title>Mi página</title>
  </head>
  <body>
    <div id="app">
      <h1 class="titulo">Hola</h1>
      <p>Bienvenido</p>
    </div>
  </body>
</html>
```

El navegador convierte eso en esta estructura en memoria:

```
Document
├── DOCTYPE
└── html  (HTMLHtmlElement)
    ├── head  (HTMLHeadElement)
    │   └── title  (HTMLTitleElement)
    │       └── "Mi página"  ← TextNode
    └── body  (HTMLBodyElement)
        └── div#app  (HTMLDivElement)
            ├── h1.titulo  (HTMLHeadingElement)
            │   └── "Hola"  ← TextNode
            └── p  (HTMLParagraphElement)
                └── "Bienvenido"  ← TextNode
```

Cada caja de ese árbol es un **objeto JavaScript** con propiedades y métodos. Cuando haces `document.getElementById("app")`, obtienes ese objeto, no el texto HTML.

---

## 🔢 Tipos de nodos

No todo en el DOM es un elemento HTML. Hay varios tipos de nodos:

```javascript
// Los más importantes
Node.ELEMENT_NODE;           // → 1  (div, p, h1, span...)
Node.TEXT_NODE;              // → 3  (el texto dentro de un elemento)
Node.COMMENT_NODE;           // → 8  (<!-- comentarios -->)
Node.DOCUMENT_NODE;          // → 9  (el propio document)
Node.DOCUMENT_TYPE_NODE;     // → 10 (<!DOCTYPE html>)
Node.DOCUMENT_FRAGMENT_NODE; // → 11 (fragmento, lo veremos)

// Comprobar el tipo de un nodo
const div = document.getElementById("app");
div.nodeType;  // → 1 (ELEMENT_NODE)
div.nodeName;  // → "DIV"
div.nodeValue; // → null (los elementos no tienen valor directo)

// El texto dentro de un elemento es un nodo de texto
const h1    = document.querySelector("h1");
const texto = h1.firstChild;       // el TextNode "Hola"
texto.nodeType;  // → 3 (TEXT_NODE)
texto.nodeName;  // → "#text"
texto.nodeValue; // → "Hola"  ← aquí sí hay valor
```

---

## 🔗 La jerarquía de clases

Cada elemento del DOM es una instancia de una clase específica que hereda de otras. Esto explica por qué tienen diferentes propiedades.

```
EventTarget
└── Node
    ├── Text
    ├── Comment
    └── Element
        └── HTMLElement
            ├── HTMLDivElement       → <div>
            ├── HTMLParagraphElement → <p>
            ├── HTMLHeadingElement   → <h1>...<h6>
            ├── HTMLInputElement     → <input>
            ├── HTMLFormElement      → <form>
            ├── HTMLAnchorElement    → <a>
            ├── HTMLImageElement     → <img>
            ├── HTMLButtonElement    → <button>
            └── HTMLSelectElement    → <select>
```

```javascript
const input = document.querySelector("input");

// Propiedades de HTMLInputElement específicamente
input.value;
input.checked;
input.type;
input.placeholder;

// Propiedades de HTMLElement (heredadas)
input.style;
input.classList;
input.dataset;
input.hidden;
input.tabIndex;

// Propiedades de Element (heredadas)
input.id;
input.className;
input.attributes;
input.innerHTML;
input.outerHTML;

// Propiedades de Node (heredadas)
input.nodeType;
input.parentNode;
input.childNodes;
input.textContent;

// Propiedades de EventTarget (heredadas)
input.addEventListener;
input.removeEventListener;
input.dispatchEvent;

// Comprobar la herencia
input instanceof HTMLInputElement; // → true
input instanceof HTMLElement;      // → true
input instanceof Element;          // → true
input instanceof Node;             // → true
input instanceof EventTarget;      // → true
```

---

## 🧭 Navegar por el árbol en profundidad

Hay dos formas de navegar: con métodos que incluyen **todos los nodos** (incluyendo texto y comentarios) y con métodos que solo incluyen **elementos**.

```javascript
const div = document.getElementById("app");

// ── NAVEGAR CON TODOS LOS NODOS (incluyendo TextNodes) ──

div.childNodes;      // NodeList con TODOS los hijos (elementos + texto + comentarios)
div.firstChild;      // primer hijo (puede ser un TextNode de espacios/saltos)
div.lastChild;       // último hijo
div.parentNode;      // padre (puede ser Document)
div.previousSibling; // hermano anterior (puede ser TextNode)
div.nextSibling;     // hermano siguiente

// ── NAVEGAR SOLO CON ELEMENTOS (lo que usarás el 99% del tiempo) ──

div.children;               // HTMLCollection solo con elementos hijos
div.firstElementChild;      // primer hijo que es elemento
div.lastElementChild;       // último hijo que es elemento
div.parentElement;          // padre elemento (null si el padre es Document)
div.previousElementSibling; // hermano elemento anterior
div.nextElementSibling;     // hermano elemento siguiente
div.childElementCount;      // número de hijos elementos

// ── POR QUÉ IMPORTA LA DIFERENCIA ──

// Dado este HTML:
// <div id="app">
//   <h1>Hola</h1>
//   <p>Mundo</p>
// </div>

div.childNodes;        // → [TextNode("\n  "), h1, TextNode("\n  "), p, TextNode("\n")]
div.children;          // → [h1, p]  ← solo elementos, más limpio

div.firstChild;        // → TextNode("\n  ")  ← el salto de línea!
div.firstElementChild; // → h1  ← lo que realmente quieres
```

### Búsqueda avanzada en el árbol

```javascript
// Buscar un ancestro específico (sube por el árbol)
const boton = document.querySelector(".btn-borrar");
boton.closest(".tarjeta");   // sube hasta encontrar .tarjeta
boton.closest("form");       // sube hasta encontrar un form
boton.closest("[data-id]");  // sube hasta encontrar el atributo data-id

// Comprobar si un elemento contiene a otro
const contenedor = document.getElementById("app");
const parrafo    = document.querySelector("p");
contenedor.contains(parrafo); // → true

// Comprobar si un elemento coincide con un selector
parrafo.matches(".destacado"); // → false
parrafo.matches("p");          // → true
parrafo.matches("#app p");     // → true

// Comparar posición de dos nodos en el árbol
const h1 = document.querySelector("h1");
const p  = document.querySelector("p");

const posicion = h1.compareDocumentPosition(p);
// Si p viene DESPUÉS de h1: → 4 (DOCUMENT_POSITION_FOLLOWING)
// Si p viene ANTES de h1:  → 2 (DOCUMENT_POSITION_PRECEDING)
// Si p está DENTRO de h1:  → 20 (contiene CONTAINED_BY)
```

---

## 📐 Geometría y posición de elementos

Una parte esencial del DOM es poder saber dónde está un elemento en la pantalla y cuánto mide.

```javascript
const caja = document.getElementById("caja");

// getBoundingClientRect: posición RELATIVA A LA VENTANA
const rect = caja.getBoundingClientRect();
rect.top;    // distancia desde el borde superior de la ventana
rect.bottom; // distancia desde el borde superior hasta el borde inferior
rect.left;   // distancia desde el borde izquierdo de la ventana
rect.right;  // distancia desde el borde izquierdo hasta el borde derecho
rect.width;  // ancho del elemento (incluyendo padding)
rect.height; // alto del elemento

// ── DIMENSIONES ──

// offsetWidth/Height: ancho/alto con padding y borde (sin margen)
caja.offsetWidth;  // → 320
caja.offsetHeight; // → 150

// clientWidth/Height: ancho/alto con padding (sin borde ni margen)
caja.clientWidth;  // → 300
caja.clientHeight; // → 130

// scrollWidth/Height: ancho/alto total incluyendo contenido oculto por scroll
caja.scrollWidth;
caja.scrollHeight;

// ── POSICIÓN ──

// offsetTop/Left: distancia al offsetParent
caja.offsetTop;    // → 200
caja.offsetLeft;   // → 50
caja.offsetParent; // → el elemento padre con position relativa/absoluta

// scrollTop/Left: cuánto se ha hecho scroll dentro del elemento
caja.scrollTop;
caja.scrollLeft;

// ── SCROLL DE LA VENTANA ──

window.scrollY;    // cuánto se ha scrolleado verticalmente
window.scrollX;    // cuánto se ha scrolleado horizontalmente

window.innerWidth;  // ancho de la ventana (sin barras de scroll)
window.innerHeight; // alto de la ventana
document.documentElement.scrollHeight; // altura total del documento
```

### Ejemplo real: saber si un elemento es visible

```javascript
function esVisible(elemento) {
  const rect = elemento.getBoundingClientRect();
  return (
    rect.top    >= 0 &&
    rect.left   >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right  <= window.innerWidth
  );
}

// Más moderno y eficiente: Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      entry.target.style.opacity = "1";
    } else {
      entry.target.classList.remove("visible");
    }
  });
}, {
  threshold: 0.5  // 0 = cualquier pixel, 1 = completamente visible
});

document.querySelectorAll(".animar-al-scroll").forEach(el => {
  observer.observe(el);
});

observer.disconnect(); // dejar de observar
```

---

## ⚡ Rendimiento: el problema del Reflow y Repaint

Cada vez que modificas el DOM, el navegador puede tener que recalcular posiciones y repintar la pantalla. Esto es caro en términos de rendimiento.

```javascript
// ❌ Muy lento: cada cambio fuerza un reflow
const lista = document.getElementById("lista");
for (let i = 0; i < 1000; i++) {
  const li = document.createElement("li");
  li.textContent = `Item ${i}`;
  lista.appendChild(li);  // reflow en cada iteración
}

// ✅ Mucho más rápido: DocumentFragment
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
  const li = document.createElement("li");
  li.textContent = `Item ${i}`;
  fragment.appendChild(li); // sin reflow, está en memoria
}

lista.appendChild(fragment); // UN solo reflow al final

// ❌ Otro problema: leer y escribir alternados
for (const caja of cajas) {
  caja.style.width = caja.offsetWidth + 10 + "px"; // lee y escribe en cada iteración
}

// ✅ Separar lecturas de escrituras (batch)
const anchos = Array.from(cajas).map(c => c.offsetWidth); // primero leer todo
cajas.forEach((caja, i) => {
  caja.style.width = anchos[i] + 10 + "px"; // luego escribir todo
});
```

### Usar clases en vez de estilos inline

```javascript
// ❌ Tres cambios de estilo = potencialmente tres reflows
elemento.style.width      = "200px";
elemento.style.height     = "100px";
elemento.style.background = "red";

// ✅ Un solo cambio de clase = un solo reflow
// (En el CSS tienes: .caja-activa { width: 200px; height: 100px; background: red; })
elemento.classList.add("caja-activa");
```

---

## 🧩 DocumentFragment

Es un "DOM virtual" ligero donde puedes construir estructuras sin tocar el DOM real.

```javascript
function crearTabla(datos) {
  const fragment = document.createDocumentFragment();
  const tabla    = document.createElement("table");
  const thead    = document.createElement("thead");
  const tbody    = document.createElement("tbody");

  // Cabecera
  const trHead = document.createElement("tr");
  ["Nombre", "Email", "Edad"].forEach(texto => {
    const th = document.createElement("th");
    th.textContent = texto;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);

  // Filas
  datos.forEach(usuario => {
    const tr = document.createElement("tr");
    [usuario.nombre, usuario.email, usuario.edad].forEach(valor => {
      const td = document.createElement("td");
      td.textContent = valor;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  tabla.appendChild(thead);
  tabla.appendChild(tbody);
  fragment.appendChild(tabla);

  return fragment;
}

// Un solo reflow al insertar todo
document.getElementById("contenedor").appendChild(
  crearTabla([
    { nombre: "Ana",    email: "ana@mail.com",    edad: 28 },
    { nombre: "Carlos", email: "carlos@mail.com", edad: 35 },
  ])
);
```

---

## 🖇️ Clonado de nodos

```javascript
const tarjeta = document.querySelector(".tarjeta");

// cloneNode(false): clona solo el elemento, sin sus hijos
const clon1 = tarjeta.cloneNode(false);

// cloneNode(true): clona el elemento Y todos sus hijos (deep clone)
const clon2 = tarjeta.cloneNode(true);

clon2.id = "tarjeta-2";
document.getElementById("contenedor").appendChild(clon2);

// OJO: si el original tenía event listeners, el clon NO los hereda
// Hay que añadirlos manualmente al clon
```

---

## 🏷️ Atributos data-* (dataset)

Los atributos `data-*` son una forma de guardar datos personalizados directamente en el HTML, accesibles desde JavaScript.

```html
<div id="producto"
  data-id="42"
  data-nombre="Camiseta"
  data-precio="29.99"
  data-categoria="ropa"
  data-en-stock="true">
</div>
```

```javascript
const el = document.getElementById("producto");

// Leer con dataset (convierte kebab-case a camelCase automáticamente)
el.dataset.id;        // → "42"  (siempre string)
el.dataset.nombre;    // → "Camiseta"
el.dataset.precio;    // → "29.99"
el.dataset.categoria; // → "ropa"
el.dataset.enStock;   // → "true"  (data-en-stock → enStock)

// Escribir
el.dataset.precio          = "24.99";
el.dataset.nuevoAtributo   = "valor"; // crea data-nuevo-atributo en el HTML

// Eliminar
delete el.dataset.categoria;

// Leer como objeto
const datos = { ...el.dataset };
// → { id: "42", nombre: "Camiseta", precio: "24.99", enStock: "true" }

// Convertir tipos cuando se necesite
Number(el.dataset.id);         // → 42
parseFloat(el.dataset.precio); // → 24.99
el.dataset.enStock === "true"; // → true (comparar strings)
```

### Ejemplo real: usar dataset para manejar listas

```javascript
function crearTarjetaProducto(producto) {
  const div = document.createElement("div");
  div.classList.add("tarjeta");
  div.dataset.id     = producto.id;
  div.dataset.precio = producto.precio;

  div.innerHTML = `
    <h3>${producto.nombre}</h3>
    <p>${producto.precio}€</p>
    <button class="btn-agregar">Añadir al carrito</button>
    <button class="btn-detalle">Ver detalle</button>
  `;

  return div;
}

// Delegación de eventos usando dataset
document.getElementById("catalogo").addEventListener("click", e => {
  const tarjeta = e.target.closest(".tarjeta");
  if (!tarjeta) return;

  const id     = Number(tarjeta.dataset.id);
  const precio = parseFloat(tarjeta.dataset.precio);

  if (e.target.classList.contains("btn-agregar")) carrito.agregar({ id, precio });
  if (e.target.classList.contains("btn-detalle")) mostrarDetalle(id);
});
```

---

## 🔄 MutationObserver: observar cambios en el DOM

Permite ejecutar código cuando el DOM cambia, sin usar polling (setInterval).

```javascript
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    console.log("Tipo de mutación:", mutation.type);

    if (mutation.type === "childList") {
      mutation.addedNodes.forEach(nodo => {
        if (nodo.nodeType === 1) console.log("Nodo añadido:", nodo);
      });
      mutation.removedNodes.forEach(nodo => {
        console.log("Nodo eliminado:", nodo);
      });
    }

    if (mutation.type === "attributes") {
      console.log(`Atributo cambiado: ${mutation.attributeName}`);
      console.log(`Valor anterior: ${mutation.oldValue}`);
      console.log(`Valor nuevo: ${mutation.target.getAttribute(mutation.attributeName)}`);
    }

    if (mutation.type === "characterData") {
      console.log("Texto cambiado:", mutation.target.nodeValue);
    }
  });
});

const contenedor = document.getElementById("app");

observer.observe(contenedor, {
  childList:             true,  // observar añadir/quitar hijos
  subtree:               true,  // observar también los descendientes
  attributes:            true,  // observar cambios en atributos
  attributeOldValue:     true,
  characterData:         true,  // observar cambios en texto
  characterDataOldValue: true,
});

observer.disconnect(); // dejar de observar
```

### Ejemplo real: notificaciones automáticas para accesibilidad

```javascript
const bodyObserver = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(nodo => {
      if (nodo.nodeType !== 1) return;

      if (nodo.classList?.contains("error") || nodo.querySelector?.(".error")) {
        const anuncio = document.getElementById("anuncio-accesible");
        anuncio.textContent = nodo.textContent;
      }
    });
  });
});

bodyObserver.observe(document.body, { childList: true, subtree: true });
```

---

## 🎭 El objeto window y document

`window` y `document` son los objetos raíz del DOM. Entenderlos bien es fundamental.

```javascript
// window: el objeto global del navegador
var miVariable = "hola";
window.miVariable; // → "hola"

// Las funciones globales son métodos de window
window.setTimeout === setTimeout; // → true
window.fetch      === fetch;      // → true

// Información del navegador y la pantalla
window.innerWidth;          // → ancho de la ventana
window.innerHeight;         // → alto de la ventana
window.screen.width;        // → resolución de la pantalla
window.devicePixelRatio;    // → 2 en pantallas Retina
window.navigator.userAgent; // → info del navegador
window.navigator.language;  // → "es-ES"
window.navigator.onLine;    // → true si hay conexión a internet
window.location.href;       // → URL actual
window.location.pathname;   // → "/ruta/actual"
window.location.search;     // → "?query=valor"
window.location.hash;       // → "#seccion"
window.history.back();      // → ir atrás
window.history.forward();   // → ir adelante
window.history.pushState({}, "", "/nueva-url"); // cambiar URL sin recargar

// document: el nodo raíz del DOM
document.documentElement; // → <html>
document.head;            // → <head>
document.body;            // → <body>
document.title;           // → título de la página
document.title = "Nuevo título"; // cambia el título de la pestaña
document.URL;             // → URL actual
document.readyState;      // → "loading" | "interactive" | "complete"
document.activeElement;   // → el elemento que tiene el foco ahora mismo
document.hidden;          // → true si la pestaña no está visible
```

### Ejemplo real: reaccionar a cambios de visibilidad de la pestaña

```javascript
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    pausarVideo();
    guardarProgreso();
  } else {
    reanudarVideo();
  }
});

// Cambiar el título cuando el usuario se va
let tituloOriginal = document.title;

document.addEventListener("visibilitychange", () => {
  document.title = document.hidden ? "👋 ¡Vuelve pronto!" : tituloOriginal;
});
```

---

## 🔍 Ejemplo completo: inspector del DOM

```javascript
const inspector = document.createElement("div");
inspector.id = "dom-inspector";
inspector.style.cssText = `
  position: fixed; bottom: 10px; left: 10px;
  background: #1a1a2e; color: #eee;
  padding: 12px; border-radius: 8px;
  font-family: monospace; font-size: 12px;
  max-width: 350px; z-index: 9999;
  border: 1px solid #444; display: none;
`;
document.body.appendChild(inspector);

document.addEventListener("mouseover", e => {
  if (e.target === inspector) return;

  const el   = e.target;
  const rect = el.getBoundingClientRect();

  inspector.style.display = "block";
  inspector.innerHTML = `
    <strong style="color:#7ec8e3">Elemento</strong><br>
    Tag: <span style="color:#f9ca24">${el.tagName.toLowerCase()}</span><br>
    ID: ${el.id || "(ninguno)"}<br>
    Clases: ${el.className || "(ninguna)"}<br>
    <br>
    <strong style="color:#7ec8e3">Dimensiones</strong><br>
    Ancho: ${Math.round(rect.width)}px | Alto: ${Math.round(rect.height)}px<br>
    Top: ${Math.round(rect.top)}px | Left: ${Math.round(rect.left)}px<br>
    <br>
    <strong style="color:#7ec8e3">En el árbol</strong><br>
    Padre: ${el.parentElement?.tagName.toLowerCase() || "ninguno"}<br>
    Hijos: ${el.childElementCount}<br>
    Hermanos: ${el.parentElement?.childElementCount - 1 || 0}<br>
    <br>
    <strong style="color:#7ec8e3">Texto</strong><br>
    "${el.textContent.trim().slice(0, 50)}${el.textContent.trim().length > 50 ? "..." : ""}"
  `;
});

document.addEventListener("mouseout", e => {
  if (e.target === inspector) return;
  inspector.style.display = "none";
});
```

---

## En resumen

| Concepto | Para qué sirve |
|---|---|
| **Árbol de nodos** | Estructura en memoria que representa el HTML |
| **Tipos de nodos** | Elemento, texto, comentario, documento |
| **Jerarquía de clases** | Por qué cada elemento tiene propiedades distintas |
| **Navegación con Element** | `children`, `firstElementChild`, `closest()` |
| **Navegación con Node** | `childNodes`, `firstChild` (incluye TextNodes) |
| **getBoundingClientRect** | Posición y dimensiones de un elemento en pantalla |
| **Reflow y Repaint** | Por qué modificar el DOM tiene coste de rendimiento |
| **DocumentFragment** | Construir estructuras en memoria antes de insertar |
| **dataset** | Guardar datos en el HTML accesibles desde JS |
| **MutationObserver** | Detectar cambios en el DOM automáticamente |
| **IntersectionObserver** | Detectar cuándo un elemento entra en pantalla |
| **window y document** | Los objetos raíz desde los que todo cuelga |

Entender el DOM a este nivel te permite escribir código más eficiente, depurar problemas difíciles y comprender por qué frameworks como React o Vue funcionan como funcionan: en esencia, todos son capas de abstracción sobre estos mismos conceptos.
