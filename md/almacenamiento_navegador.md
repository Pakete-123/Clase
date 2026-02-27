# Almacenamiento en el Navegador

Cuando cierras una página y la vuelves a abrir, JavaScript "olvida" todo. El almacenamiento en el navegador soluciona esto: guardar datos que persisten entre sesiones, sin necesidad de un servidor.

Hay cuatro mecanismos principales: **localStorage**, **sessionStorage**, **Cookies** e **IndexedDB**.

---

## 📦 localStorage

Guarda datos de forma **permanente** en el navegador. Persisten aunque cierres el navegador o apagues el ordenador. Solo se borran si el usuario limpia los datos del navegador o tú los borras con código.

### Operaciones básicas

```javascript
// Guardar (siempre en formato string)
localStorage.setItem("nombre", "Ana");
localStorage.setItem("edad",   "28");

// Leer
localStorage.getItem("nombre");   // → "Ana"
localStorage.getItem("edad");     // → "28" (string, no número)
localStorage.getItem("noExiste"); // → null

// Eliminar una clave
localStorage.removeItem("edad");

// Eliminar TODO el localStorage
localStorage.clear();

// Cuántas claves hay guardadas
localStorage.length; // → 1

// Obtener el nombre de una clave por su índice
localStorage.key(0); // → "nombre"
```

### El problema: solo guarda strings

```javascript
// ❌ Si guardas un objeto directamente, lo convierte a string inútil
localStorage.setItem("usuario", { nombre: "Ana", edad: 28 });
localStorage.getItem("usuario"); // → "[object Object]"  ❌

// ✅ Solución: convertir a JSON antes de guardar
const usuario = { nombre: "Ana", edad: 28, hobbies: ["leer", "correr"] };
localStorage.setItem("usuario", JSON.stringify(usuario));

// Y convertir de vuelta al leer
const datos = JSON.parse(localStorage.getItem("usuario"));
datos.nombre;  // → "Ana"
datos.hobbies; // → ["leer", "correr"]

// ✅ Patrón seguro para leer
function leerStorage(clave, valorPorDefecto = null) {
  try {
    const valor = localStorage.getItem(clave);
    return valor ? JSON.parse(valor) : valorPorDefecto;
  } catch (e) {
    console.error("Error al leer localStorage:", e);
    return valorPorDefecto;
  }
}

function guardarStorage(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch (e) {
    console.error("Error al guardar en localStorage:", e);
    return false;
  }
}

// Uso limpio y seguro
guardarStorage("usuario", { nombre: "Ana", edad: 28 });
const user = leerStorage("usuario", {}); // si no existe, devuelve {}
```

### Ejemplo real: guardar preferencias de usuario

```javascript
const Preferencias = {
  guardar(prefs) {
    guardarStorage("preferencias", prefs);
  },

  leer() {
    return leerStorage("preferencias", {
      tema:    "claro",
      idioma:  "es",
      fuente:  16,
      sidebar: true
    });
  },

  actualizar(clave, valor) {
    const prefs = this.leer();
    prefs[clave] = valor;
    this.guardar(prefs);
  }
};

// Guardar preferencias
Preferencias.actualizar("tema", "oscuro");
Preferencias.actualizar("fuente", 18);

// Leer al cargar la página
const prefs = Preferencias.leer();
document.body.classList.add(`tema-${prefs.tema}`);
document.body.style.fontSize = `${prefs.fuente}px`;
```

### Ejemplo real: modo oscuro persistente

```javascript
const btnTema = document.getElementById("btn-tema");
const body    = document.body;

// Al cargar: aplicar el tema guardado
const temaGuardado = localStorage.getItem("tema") || "claro";
body.classList.add(`tema-${temaGuardado}`);
btnTema.textContent = temaGuardado === "oscuro" ? "☀️" : "🌙";

// Al hacer click: cambiar y guardar
btnTema.addEventListener("click", () => {
  const esOscuro = body.classList.contains("tema-oscuro");

  body.classList.toggle("tema-oscuro");
  body.classList.toggle("tema-claro");

  const nuevoTema = esOscuro ? "claro" : "oscuro";
  localStorage.setItem("tema", nuevoTema);
  btnTema.textContent = nuevoTema === "oscuro" ? "☀️" : "🌙";
});
```

---

## ⏱️ sessionStorage

Exactamente igual que localStorage en su API, pero con una diferencia clave: **los datos se borran al cerrar la pestaña**. Cada pestaña tiene su propio sessionStorage independiente.

```javascript
// La API es idéntica a localStorage
sessionStorage.setItem("paso", "2");
sessionStorage.getItem("paso");   // → "2"
sessionStorage.removeItem("paso");
sessionStorage.clear();
```

### Cuándo usar cada uno

```
localStorage   → Preferencias de usuario, tema, idioma, token de sesión
sessionStorage → Datos temporales de un proceso de varios pasos (checkout, wizard)
```

### Ejemplo real: formulario multipaso

```javascript
// Paso 1: guardar datos del primer paso
function guardarPaso1() {
  const datos = {
    nombre:     document.getElementById("nombre").value,
    email:      document.getElementById("email").value,
    pasoActual: 1
  };
  sessionStorage.setItem("formulario", JSON.stringify(datos));
  irAPaso(2);
}

// Paso 2: añadir datos del segundo paso
function guardarPaso2() {
  const datos      = JSON.parse(sessionStorage.getItem("formulario")) || {};
  datos.direccion  = document.getElementById("direccion").value;
  datos.ciudad     = document.getElementById("ciudad").value;
  datos.pasoActual = 2;
  sessionStorage.setItem("formulario", JSON.stringify(datos));
  irAPaso(3);
}

// Paso 3: leer todos los datos y enviar
function enviarFormulario() {
  const datos = JSON.parse(sessionStorage.getItem("formulario"));

  if (!datos) {
    alert("No hay datos. Vuelve al inicio.");
    irAPaso(1);
    return;
  }

  console.log("Enviando:", datos);
  sessionStorage.removeItem("formulario");
}

// Al cargar cada paso: restaurar lo que ya se rellenó
function restaurarDatos() {
  const datos = JSON.parse(sessionStorage.getItem("formulario"));
  if (!datos) return;

  if (datos.nombre) document.getElementById("nombre").value = datos.nombre;
  if (datos.email)  document.getElementById("email").value  = datos.email;
}
```

---

## 🍪 Cookies

Las cookies son más antiguas y complejas, pero tienen ventajas únicas: se pueden configurar con **fecha de expiración** y se envían automáticamente al servidor en cada petición HTTP.

### Leer y escribir cookies

```javascript
// Escribir una cookie básica
document.cookie = "nombre=Ana";

// Con fecha de expiración
document.cookie = "nombre=Ana; expires=Fri, 31 Dec 2026 23:59:59 GMT";

// Con max-age en segundos (más fácil que expires)
document.cookie = "nombre=Ana; max-age=86400";   // 1 día
document.cookie = "nombre=Ana; max-age=604800";  // 7 días
document.cookie = "nombre=Ana; max-age=2592000"; // 30 días

// Otras opciones importantes
document.cookie = "token=abc123; max-age=86400; path=/; secure; SameSite=Strict";
//                                               ↑ en toda la web
//                                                        ↑ solo HTTPS
//                                                                 ↑ protección CSRF

// Leer TODAS las cookies (vienen como string separado por ;)
document.cookie; // → "nombre=Ana; tema=oscuro; idioma=es"

// No hay un método nativo para leer UNA cookie: hay que parsear
function getCookie(nombre) {
  const cookies = document.cookie.split("; ");
  const cookie  = cookies.find(c => c.startsWith(`${nombre}=`));
  return cookie ? cookie.split("=")[1] : null;
}

getCookie("nombre");   // → "Ana"
getCookie("tema");     // → "oscuro"
getCookie("noExiste"); // → null

// Eliminar una cookie: ponerle max-age=0
document.cookie = "nombre=; max-age=0";
```

### Clase helper para manejar cookies fácilmente

```javascript
const Cookies = {
  set(nombre, valor, dias = 7) {
    const segundos = dias * 24 * 60 * 60;
    const valorStr = typeof valor === "object" ? JSON.stringify(valor) : valor;
    document.cookie = `${nombre}=${encodeURIComponent(valorStr)}; max-age=${segundos}; path=/; SameSite=Lax`;
  },

  get(nombre) {
    const cookies = document.cookie.split("; ");
    const cookie  = cookies.find(c => c.startsWith(`${nombre}=`));
    if (!cookie) return null;

    try {
      return JSON.parse(decodeURIComponent(cookie.split("=")[1]));
    } catch {
      return decodeURIComponent(cookie.split("=")[1]);
    }
  },

  delete(nombre) {
    document.cookie = `${nombre}=; max-age=0; path=/`;
  },

  exists(nombre) {
    return this.get(nombre) !== null;
  }
};

// Uso limpio
Cookies.set("usuario", { nombre: "Ana", rol: "admin" }, 30); // 30 días
Cookies.get("usuario");    // → { nombre: "Ana", rol: "admin" }
Cookies.exists("usuario"); // → true
Cookies.delete("usuario");
```

### Ejemplo real: banner de cookies

```javascript
const banner  = document.getElementById("banner-cookies");
const btnAcep = document.getElementById("aceptar-cookies");
const btnRech = document.getElementById("rechazar-cookies");

// Mostrar solo si no se ha decidido antes
if (!Cookies.exists("cookies-aceptadas")) {
  banner.style.display = "block";
}

btnAcep.addEventListener("click", () => {
  Cookies.set("cookies-aceptadas",  true, 365);
  Cookies.set("cookies-analiticas", true, 365);
  banner.style.display = "none";
  activarAnalytics();
});

btnRech.addEventListener("click", () => {
  Cookies.set("cookies-aceptadas",  false, 365);
  Cookies.set("cookies-analiticas", false, 365);
  banner.style.display = "none";
});

function activarAnalytics() {
  if (Cookies.get("cookies-analiticas")) {
    console.log("Analytics activado");
  }
}
```

---

## 🗄️ IndexedDB

Es una base de datos completa dentro del navegador. Permite guardar grandes cantidades de datos estructurados, hacer búsquedas, índices, transacciones... Es la opción más potente pero también la más compleja.

### API nativa (para entender cómo funciona)

```javascript
// Abrir (o crear) la base de datos
const peticion = indexedDB.open("MiBaseDatos", 1); // nombre, versión

// Se ejecuta cuando se crea o actualiza la BD
peticion.onupgradeneeded = function(e) {
  const db    = e.target.result;
  const store = db.createObjectStore("productos", {
    keyPath:       "id",
    autoIncrement: true
  });

  store.createIndex("nombre",    "nombre",    { unique: false });
  store.createIndex("categoria", "categoria", { unique: false });
  store.createIndex("precio",    "precio",    { unique: false });
};

peticion.onsuccess = function(e) {
  const db = e.target.result;
  console.log("BD abierta:", db);
};

peticion.onerror = function(e) {
  console.error("Error al abrir BD:", e.target.error);
};
```

### Helper para simplificar IndexedDB

```javascript
class BaseDatos {
  constructor(nombre, version = 1) {
    this.nombre  = nombre;
    this.version = version;
    this.db      = null;
  }

  abrir(stores) {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(this.nombre, this.version);

      req.onupgradeneeded = e => {
        const db = e.target.result;
        stores.forEach(({ nombre, clave, indices = [] }) => {
          if (!db.objectStoreNames.contains(nombre)) {
            const store = db.createObjectStore(nombre, {
              keyPath: clave, autoIncrement: true
            });
            indices.forEach(idx => {
              store.createIndex(idx, idx, { unique: false });
            });
          }
        });
      };

      req.onsuccess = e => { this.db = e.target.result; resolve(this); };
      req.onerror   = e => reject(e.target.error);
    });
  }

  agregar(store, dato) {
    return new Promise((resolve, reject) => {
      const tx  = this.db.transaction(store, "readwrite");
      const req = tx.objectStore(store).add(dato);
      req.onsuccess = e => resolve(e.target.result);
      req.onerror   = e => reject(e.target.error);
    });
  }

  obtener(store, id) {
    return new Promise((resolve, reject) => {
      const tx  = this.db.transaction(store, "readonly");
      const req = tx.objectStore(store).get(id);
      req.onsuccess = e => resolve(e.target.result);
      req.onerror   = e => reject(e.target.error);
    });
  }

  obtenerTodos(store) {
    return new Promise((resolve, reject) => {
      const tx  = this.db.transaction(store, "readonly");
      const req = tx.objectStore(store).getAll();
      req.onsuccess = e => resolve(e.target.result);
      req.onerror   = e => reject(e.target.error);
    });
  }

  actualizar(store, dato) {
    return new Promise((resolve, reject) => {
      const tx  = this.db.transaction(store, "readwrite");
      const req = tx.objectStore(store).put(dato);
      req.onsuccess = e => resolve(e.target.result);
      req.onerror   = e => reject(e.target.error);
    });
  }

  eliminar(store, id) {
    return new Promise((resolve, reject) => {
      const tx  = this.db.transaction(store, "readwrite");
      const req = tx.objectStore(store).delete(id);
      req.onsuccess = () => resolve(true);
      req.onerror   = e => reject(e.target.error);
    });
  }

  buscarPorIndice(store, indice, valor) {
    return new Promise((resolve, reject) => {
      const tx  = this.db.transaction(store, "readonly");
      const idx = tx.objectStore(store).index(indice);
      const req = idx.getAll(valor);
      req.onsuccess = e => resolve(e.target.result);
      req.onerror   = e => reject(e.target.error);
    });
  }
}
```

### Ejemplo real: app de notas con IndexedDB

```javascript
const bd = new BaseDatos("NotasApp", 1);

await bd.abrir([
  { nombre: "notas", clave: "id", indices: ["titulo", "categoria", "fecha"] }
]);

// Crear una nota
const id = await bd.agregar("notas", {
  titulo:    "Lista de la compra",
  contenido: "Leche, huevos, pan",
  categoria: "personal",
  fecha:     new Date().toISOString(),
  favorita:  false
});
console.log("Nota creada con id:", id); // → 1

// Leer todas las notas
const todas = await bd.obtenerTodos("notas");

// Actualizar
const nota = await bd.obtener("notas", 1);
nota.favorita = true;
await bd.actualizar("notas", nota);

// Buscar por categoría
const personales = await bd.buscarPorIndice("notas", "categoria", "personal");

// Eliminar
await bd.eliminar("notas", 1);
```

---

## 🔍 Comparativa completa

```
┌─────────────────┬──────────────┬───────────────┬─────────────┬─────────────┐
│                 │ localStorage │sessionStorage │   Cookies   │  IndexedDB  │
├─────────────────┼──────────────┼───────────────┼─────────────┼─────────────┤
│ Capacidad       │    ~5-10MB   │    ~5-10MB    │    ~4KB     │  Sin límite │
│ Duración        │  Permanente  │  Por pestaña  │ Configurable│  Permanente │
│ Acceso desde JS │      ✅      │      ✅       │     ✅      │     ✅      │
│ Se envía al srv │      ❌      │      ❌       │     ✅      │     ❌      │
│ Tipo de datos   │   Solo str   │   Solo str    │  Solo str   │  Cualquiera │
│ Búsquedas       │      ❌      │      ❌       │     ❌      │     ✅      │
│ Complejidad     │    Fácil     │    Fácil      │    Media    │    Difícil  │
└─────────────────┴──────────────┴───────────────┴─────────────┴─────────────┘
```

---

## ⚠️ Limitaciones y buenas prácticas

### Límite de espacio

```javascript
// Comprobar cuánto espacio queda
async function comprobarEspacio() {
  if ("storage" in navigator && "estimate" in navigator.storage) {
    const { usage, quota } = await navigator.storage.estimate();
    const usadoMB = (usage / 1024 / 1024).toFixed(2);
    const totalMB = (quota / 1024 / 1024).toFixed(2);
    console.log(`Usando ${usadoMB}MB de ${totalMB}MB disponibles`);
  }
}

// Manejar el error cuando se supera el límite
try {
  localStorage.setItem("datos", JSON.stringify(datosGrandes));
} catch (e) {
  if (e.name === "QuotaExceededError") {
    console.error("Sin espacio en localStorage");
    limpiarDatosAntiguos();
  }
}
```

### No guardar datos sensibles

```javascript
// ❌ NUNCA hacer esto
localStorage.setItem("tarjeta",  "4111111111111111");
localStorage.setItem("password", "miContraseña123");

// ✅ Para datos sensibles: usar cookies HttpOnly desde el servidor
// El servidor la envía así y JS no puede acceder:
// Set-Cookie: token=abc123; HttpOnly; Secure; SameSite=Strict
```

### Sincronizar entre pestañas

```javascript
// El evento "storage" se dispara cuando otra pestaña cambia localStorage
window.addEventListener("storage", e => {
  console.log("Clave cambiada:", e.key);
  console.log("Valor anterior:", e.oldValue);
  console.log("Valor nuevo:",    e.newValue);

  if (e.key === "tema") {
    aplicarTema(e.newValue);
  }

  if (e.key === "sesion" && !e.newValue) {
    redirigirALogin(); // el usuario cerró sesión en otra pestaña
  }
});
```

---

## 💡 Ejemplo completo: carrito persistente

```javascript
const Carrito = {
  leer() {
    return leerStorage("carrito", []);
  },

  guardar(items) {
    guardarStorage("carrito", items);
    this.actualizarUI();
  },

  agregar(producto) {
    const items     = this.leer();
    const existente = items.find(i => i.id === producto.id);

    if (existente) {
      existente.cantidad++;
    } else {
      items.push({ ...producto, cantidad: 1 });
    }

    this.guardar(items);
  },

  quitar(id) {
    this.guardar(this.leer().filter(i => i.id !== id));
  },

  setCantidad(id, cantidad) {
    if (cantidad <= 0) return this.quitar(id);
    this.guardar(this.leer().map(i =>
      i.id === id ? { ...i, cantidad } : i
    ));
  },

  vaciar() {
    this.guardar([]);
  },

  get total() {
    return this.leer().reduce((acc, i) => acc + i.precio * i.cantidad, 0);
  },

  get numItems() {
    return this.leer().reduce((acc, i) => acc + i.cantidad, 0);
  },

  actualizarUI() {
    const items   = this.leer();
    const badge   = document.getElementById("carrito-badge");
    const listaEl = document.getElementById("carrito-lista");
    const totalEl = document.getElementById("carrito-total");

    if (badge)   badge.textContent   = this.numItems;
    if (totalEl) totalEl.textContent = `${this.total.toFixed(2)}€`;

    if (listaEl) {
      listaEl.innerHTML = items.length === 0
        ? "<p>El carrito está vacío</p>"
        : items.map(i => `
            <div class="item">
              <span>${i.nombre}</span>
              <span>x${i.cantidad}</span>
              <span>${(i.precio * i.cantidad).toFixed(2)}€</span>
              <button onclick="Carrito.quitar(${i.id})">✕</button>
            </div>
          `).join("");
    }
  }
};

// Al cargar la página: restaurar el carrito
document.addEventListener("DOMContentLoaded", () => {
  Carrito.actualizarUI();
});

// Botones de añadir al carrito
document.querySelectorAll(".btn-comprar").forEach(btn => {
  btn.addEventListener("click", e => {
    const producto = {
      id:     Number(e.target.dataset.id),
      nombre: e.target.dataset.nombre,
      precio: Number(e.target.dataset.precio)
    };
    Carrito.agregar(producto);
  });
});
```

---

## En resumen

| Mecanismo | Cuándo usarlo |
|---|---|
| **localStorage** | Preferencias, tema, idioma, carrito, datos que deben persistir siempre |
| **sessionStorage** | Formularios multipaso, datos temporales del proceso actual |
| **Cookies** | Sesiones de usuario, preferencias que el servidor necesita leer |
| **IndexedDB** | Grandes cantidades de datos, apps offline, búsquedas complejas |

La regla general es empezar por **localStorage** para la mayoría de casos, usar **sessionStorage** cuando los datos solo importan en esa sesión, **cookies** cuando el servidor necesita leerlos, e **IndexedDB** cuando los datos son muy grandes o necesitas hacer búsquedas.
