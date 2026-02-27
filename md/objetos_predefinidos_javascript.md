# Objetos Predefinidos de JavaScript

JavaScript viene con una "caja de herramientas" ya lista. No necesitas instalar nada ni crearlos tú. Vamos uno por uno:

---

## 📐 Math

Sirve para operaciones matemáticas. No se instancia con `new`, se usa directamente.

```javascript
// Redondear
Math.round(4.6);   // → 5  (redondea al más cercano)
Math.ceil(4.1);    // → 5  (siempre hacia arriba)
Math.floor(4.9);   // → 4  (siempre hacia abajo)

// Valor absoluto (quitar el negativo)
Math.abs(-15);     // → 15

// Potencia y raíz
Math.pow(2, 10);   // → 1024  (2 elevado a 10)
Math.sqrt(144);    // → 12    (raíz cuadrada)

// Máximo y mínimo
Math.max(3, 9, 1, 7);  // → 9
Math.min(3, 9, 1, 7);  // → 1

// Número aleatorio entre 0 y 1
Math.random();          // → 0.6571... (cambia cada vez)

// Número aleatorio entre 1 y 100 (muy usado)
Math.floor(Math.random() * 100) + 1;  // → por ejemplo 42

// PI
Math.PI;  // → 3.141592653589793
```

**Ejemplo real:** simular un dado

```javascript
function tirarDado() {
  return Math.floor(Math.random() * 6) + 1;
}
tirarDado(); // → 1, 2, 3, 4, 5 o 6
```

---

## 📅 Date

Para trabajar con fechas y horas.

```javascript
const ahora = new Date();  // fecha y hora actuales

// Obtener partes de la fecha
ahora.getFullYear();   // → 2026
ahora.getMonth();      // → 1  (OJO: enero=0, febrero=1... diciembre=11)
ahora.getDate();       // → 27 (día del mes)
ahora.getDay();        // → 5  (día de la semana: 0=domingo, 5=viernes)
ahora.getHours();      // → 14 (hora)
ahora.getMinutes();    // → 30
ahora.getSeconds();    // → 45

// Crear una fecha específica
const navidad = new Date(2026, 11, 25);  // mes 11 = diciembre
const cumple   = new Date("1995-06-15"); // también acepta string

// Comparar fechas (internamente son milisegundos desde 1970)
const hoy  = new Date();
const ayer = new Date();
ayer.setDate(ayer.getDate() - 1);

hoy > ayer;  // → true
```

**Ejemplo real:** calcular la edad de una persona

```javascript
function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const nac = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nac.getFullYear();
  
  // Comprobar si ya cumplió este año
  const yaCumplió = hoy.getMonth() > nac.getMonth() ||
    (hoy.getMonth() === nac.getMonth() && hoy.getDate() >= nac.getDate());
  
  if (!yaCumplió) edad--;
  return edad;
}

calcularEdad("1995-06-15"); // → 30
```

---

## 🔤 String

Las cadenas de texto tienen muchísimos métodos útiles.

```javascript
const frase = "  Hola Mundo en JavaScript  ";

// Longitud
frase.length;  // → 28

// Quitar espacios al inicio y al final
frase.trim();         // → "Hola Mundo en JavaScript"
frase.trimStart();    // → "Hola Mundo en JavaScript  "
frase.trimEnd();      // → "  Hola Mundo en JavaScript"

// Mayúsculas y minúsculas
frase.toUpperCase();  // → "  HOLA MUNDO EN JAVASCRIPT  "
frase.toLowerCase();  // → "  hola mundo en javascript  "

// Buscar texto dentro del string
frase.includes("Mundo");    // → true
frase.startsWith("  Hola"); // → true
frase.endsWith("ipt  ");    // → true
frase.indexOf("Mundo");     // → 7 (posición donde empieza)

// Extraer partes
frase.slice(2, 6);     // → "Hola"
frase.slice(-5);       // → "ipt  " (desde el final)
frase.substring(2, 6); // → "Hola"

// Reemplazar texto
frase.replace("Mundo", "España");   // → "  Hola España en JavaScript  "
frase.replaceAll("a", "@");         // → "  Hol@ Mundo en J@v@Script  "

// Dividir en array
"manzana,pera,uva".split(",");  // → ["manzana", "pera", "uva"]
"Hola".split("");               // → ["H", "o", "l", "a"]

// Repetir y rellenar
"ja".repeat(3);              // → "jajaja"
"5".padStart(3, "0");        // → "005"  (útil para horas: 09:05)
"5".padEnd(3, "0");          // → "500"

// Acceder a un carácter
frase[2];           // → "H"  (acceso por índice)
frase.charAt(2);    // → "H"
frase.charCodeAt(2);// → 72  (código ASCII)
```

**Ejemplo real:** formatear una hora siempre con dos dígitos

```javascript
function formatearHora(h, m) {
  const hora    = String(h).padStart(2, "0");
  const minutos = String(m).padStart(2, "0");
  return `${hora}:${minutos}`;
}

formatearHora(9, 5);   // → "09:05"
formatearHora(14, 30); // → "14:30"
```

---

## 🔢 Number

```javascript
const n = 3.14159;

// Redondear a decimales (devuelve string)
n.toFixed(2);        // → "3.14"
n.toFixed(0);        // → "3"

// Notación científica
(123456).toExponential(2); // → "1.23e+5"

// Convertir string a número
Number("42");        // → 42
Number("3.14");      // → 3.14
Number("hola");      // → NaN (Not a Number)
parseInt("42px");    // → 42  (ignora letras al final)
parseFloat("3.14em");// → 3.14

// Comprobar si es un número válido
isNaN(Number("hola")); // → true
isFinite(1/0);         // → false (infinito no es finito)

// Límites
Number.MAX_SAFE_INTEGER; // → 9007199254740991
Number.MIN_SAFE_INTEGER; // → -9007199254740991
Number.isInteger(4.0);   // → true
Number.isInteger(4.5);   // → false
```

---

## 📦 Array

Arrays también son objetos predefinidos con muchísimos métodos:

```javascript
const nums = [3, 1, 4, 1, 5, 9, 2, 6];

// Añadir y eliminar
nums.push(7);      // añade al final → [3,1,4,1,5,9,2,6,7]
nums.pop();        // elimina el último → devuelve 7
nums.unshift(0);   // añade al principio
nums.shift();      // elimina el primero

// Ordenar
nums.sort((a, b) => a - b);  // → [1,1,2,3,4,5,6,9] (ascendente)
nums.sort((a, b) => b - a);  // → [9,6,5,4,3,2,1,1] (descendente)
nums.reverse();               // invierte el orden

// Buscar
nums.includes(5);     // → true
nums.indexOf(1);      // → 0 (primera ocurrencia)
nums.find(n => n > 4);     // → 5 (primer elemento que cumple)
nums.findIndex(n => n > 4);// → 4 (índice del primero que cumple)

// Transformar (muy importantes)
nums.map(n => n * 2);          // → nuevo array con cada elemento x2
nums.filter(n => n > 3);       // → nuevo array solo con los > 3
nums.reduce((acc, n) => acc + n, 0); // → suma total

// Iterar
nums.forEach(n => console.log(n));

// Unir y dividir
nums.slice(1, 4);         // → elementos del índice 1 al 3
nums.splice(2, 1);        // elimina 1 elemento en índice 2 (modifica el original)
[1,2].concat([3,4]);      // → [1,2,3,4]
[1,[2,[3]]].flat(Infinity);// → [1,2,3] (aplana arrays anidados)

// Comprobar condiciones
nums.every(n => n > 0);   // → true si TODOS cumplen
nums.some(n => n > 8);    // → true si ALGUNO cumple

// Convertir a string
nums.join(" - ");  // → "1 - 1 - 2 - 3..."
```

**Ejemplo real:** obtener los 3 números más altos

```javascript
const notas = [6, 9, 4, 10, 7, 8, 5];

const top3 = notas
  .sort((a, b) => b - a)
  .slice(0, 3);

// → [10, 9, 8]
```

---

## 🔮 JSON

Para convertir entre objetos JavaScript y texto (fundamental para APIs).

```javascript
const persona = { nombre: "Ana", edad: 28, hobbies: ["leer", "correr"] };

// Objeto → String (para enviar a un servidor o guardar)
const texto = JSON.stringify(persona);
// → '{"nombre":"Ana","edad":28,"hobbies":["leer","correr"]}'

// Con formato legible
JSON.stringify(persona, null, 2);
// →
// {
//   "nombre": "Ana",
//   "edad": 28,
//   "hobbies": ["leer", "correr"]
// }

// String → Objeto (para usar los datos que llegan de un servidor)
const obj = JSON.parse(texto);
obj.nombre; // → "Ana"
```

---

## 🔁 Promise

Para manejar operaciones asíncronas (peticiones a servidores, etc).

```javascript
// Crear una promesa
const miPromesa = new Promise((resolve, reject) => {
  const exito = true;
  if (exito) resolve("¡Funcionó!");
  else reject("Algo falló");
});

miPromesa
  .then(resultado => console.log(resultado))  // → "¡Funcionó!"
  .catch(error => console.log(error));

// Forma moderna con async/await (mucho más limpio)
async function obtenerDatos() {
  try {
    const respuesta = await fetch("https://api.ejemplo.com/datos");
    const datos = await respuesta.json();
    console.log(datos);
  } catch (error) {
    console.log("Error:", error);
  }
}
```

---

## 🗺️ Map y Set

Alternativas más potentes a objetos y arrays normales.

```javascript
// Set: array SIN duplicados
const conjunto = new Set([1, 2, 2, 3, 3, 3]);
// → {1, 2, 3}  (los duplicados desaparecen)

conjunto.add(4);
conjunto.has(2);    // → true
conjunto.delete(1);
conjunto.size;      // → 3

// Truco: eliminar duplicados de un array
const sinDuplicados = [...new Set([1,2,2,3,3])]; // → [1,2,3]


// Map: como un objeto pero las claves pueden ser CUALQUIER cosa
const mapa = new Map();

mapa.set("nombre", "Carlos");
mapa.set(42, "la respuesta");
mapa.set(true, "verdadero");

mapa.get("nombre");  // → "Carlos"
mapa.get(42);        // → "la respuesta"
mapa.has(true);      // → true
mapa.size;           // → 3

// Iterar un Map
mapa.forEach((valor, clave) => {
  console.log(`${clave}: ${valor}`);
});
```

---

## En resumen

| Objeto | Para qué sirve |
|---|---|
| `Math` | Operaciones matemáticas |
| `Date` | Fechas y horas |
| `String` | Manipular texto |
| `Number` | Convertir y validar números |
| `Array` | Listas y colecciones de datos |
| `JSON` | Convertir datos para enviar/recibir |
| `Promise` | Operaciones asíncronas |
| `Set` | Colecciones sin duplicados |
| `Map` | Diccionarios clave-valor avanzados |

Todos estos los tienes disponibles en cualquier proyecto JavaScript sin instalar nada.
