# Arrays, Funciones y Objetos Definidos por el Usuario

Aquí **tú** construyes las herramientas según lo que necesita tu programa. Es el núcleo de la programación en JavaScript.

---

## 📋 Arrays

Un array es una lista ordenada de elementos. Pueden ser números, strings, objetos, otros arrays... lo que sea.

### Crear arrays

```javascript
// Forma normal
const frutas = ["manzana", "pera", "uva"];

// Array vacío y luego rellenar
const numeros = [];
numeros.push(1, 2, 3);

// Array con elementos mixtos (JavaScript lo permite)
const mezcla = [42, "hola", true, null, { nombre: "Ana" }];

// Array de arrays (matriz)
const tablero = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
tablero[1][2]; // → 6 (fila 1, columna 2)
```

### Recorrer arrays

```javascript
const colores = ["rojo", "verde", "azul"];

// for clásico (útil cuando necesitas el índice)
for (let i = 0; i < colores.length; i++) {
  console.log(i, colores[i]);
}
// → 0 "rojo"
// → 1 "verde"
// → 2 "azul"

// for...of (más limpio, cuando no necesitas el índice)
for (const color of colores) {
  console.log(color);
}

// forEach (con función)
colores.forEach((color, indice) => {
  console.log(`${indice}: ${color}`);
});
```

### Transformar arrays (los más importantes)

```javascript
const precios = [100, 200, 300, 400, 500];

// map → transforma cada elemento, devuelve nuevo array
const conDescuento = precios.map(p => p * 0.9);
// → [90, 180, 270, 360, 450]

// filter → filtra elementos según condición
const caros = precios.filter(p => p > 250);
// → [300, 400, 500]

// reduce → reduce el array a un solo valor
const total = precios.reduce((acumulado, precio) => acumulado + precio, 0);
// → 1500

// Encadenar operaciones (muy común en proyectos reales)
const resultado = precios
  .filter(p => p > 100)       // quita el 100
  .map(p => p * 0.9)          // aplica descuento
  .reduce((acc, p) => acc + p, 0); // suma todo
// → (200+300+400+500) * 0.9 = 1260
```

### Ejemplo real: gestionar una lista de tareas

```javascript
let tareas = [
  { id: 1, texto: "Comprar leche", hecha: false },
  { id: 2, texto: "Estudiar JS",   hecha: true  },
  { id: 3, texto: "Hacer ejercicio", hecha: false }
];

// Obtener solo las pendientes
const pendientes = tareas.filter(t => !t.hecha);
// → [{id:1,...}, {id:3,...}]

// Marcar una tarea como hecha
tareas = tareas.map(t => t.id === 1 ? { ...t, hecha: true } : t);

// Eliminar una tarea
tareas = tareas.filter(t => t.id !== 2);

// Contar cuántas están hechas
const hechas = tareas.filter(t => t.hecha).length; // → 1
```

---

## ⚙️ Funciones

Una función es un bloque de código reutilizable que puedes ejecutar cuando quieras.

### Formas de declarar funciones

```javascript
// 1. Declaración de función (function declaration)
// Se puede usar ANTES de declararla (hoisting)
saludar("Ana"); // funciona aunque esté abajo

function saludar(nombre) {
  return `Hola, ${nombre}!`;
}

// 2. Expresión de función (function expression)
// NO se puede usar antes de declararla
const despedir = function(nombre) {
  return `Adiós, ${nombre}!`;
};

// 3. Arrow function (la más moderna y usada hoy en día)
const sumar = (a, b) => a + b;

// Si el cuerpo tiene varias líneas, necesita llaves y return
const multiplicar = (a, b) => {
  const resultado = a * b;
  return resultado;
};

// Con un solo parámetro, no necesita paréntesis
const doble = n => n * 2;

// Sin parámetros, paréntesis vacíos
const saludarMundo = () => "Hola mundo";
```

### Parámetros avanzados

```javascript
// Parámetros por defecto
function saludar(nombre = "desconocido", saludo = "Hola") {
  return `${saludo}, ${nombre}!`;
}
saludar();              // → "Hola, desconocido!"
saludar("Carlos");      // → "Hola, Carlos!"
saludar("Ana", "Hey");  // → "Hey, Ana!"


// Rest parameters: recibir número indefinido de argumentos
function sumarTodo(...numeros) {
  return numeros.reduce((acc, n) => acc + n, 0);
}
sumarTodo(1, 2, 3);        // → 6
sumarTodo(1, 2, 3, 4, 5);  // → 15


// Destructuring en parámetros (muy usado con objetos)
function mostrarUsuario({ nombre, edad, ciudad = "desconocida" }) {
  return `${nombre}, ${edad} años, de ${ciudad}`;
}
mostrarUsuario({ nombre: "Ana", edad: 28, ciudad: "Madrid" });
// → "Ana, 28 años, de Madrid"
```

### Funciones que devuelven funciones (closures)

Esto es una de las cosas más poderosas de JavaScript. Una función "recuerda" el entorno donde fue creada.

```javascript
function crearContador(inicio = 0) {
  let cuenta = inicio; // esta variable queda "atrapada"

  return {
    incrementar() { cuenta++; },
    decrementar() { cuenta--; },
    valor() { return cuenta; }
  };
}

const contador1 = crearContador(0);
const contador2 = crearContador(100);

contador1.incrementar();
contador1.incrementar();
contador1.valor(); // → 2

contador2.decrementar();
contador2.valor(); // → 99

// Cada contador tiene su propia variable "cuenta" independiente
```

### Funciones como argumentos (callbacks)

En JavaScript las funciones son "ciudadanos de primera clase": se pueden pasar como argumentos.

```javascript
function ejecutarDosVeces(fn) {
  fn();
  fn();
}

ejecutarDosVeces(() => console.log("Hola")); 
// → "Hola"
// → "Hola"


// Ejemplo más útil: función de ordenación personalizada
const personas = [
  { nombre: "Carlos", edad: 35 },
  { nombre: "Ana",    edad: 28 },
  { nombre: "Luis",   edad: 42 }
];

// Ordenar por edad
personas.sort((a, b) => a.edad - b.edad);
// → [Ana(28), Carlos(35), Luis(42)]

// Ordenar por nombre alfabéticamente
personas.sort((a, b) => a.nombre.localeCompare(b.nombre));
// → [Ana, Carlos, Luis]
```

### Funciones recursivas

Una función que se llama a sí misma.

```javascript
// Factorial: 5! = 5 × 4 × 3 × 2 × 1
function factorial(n) {
  if (n <= 1) return 1;        // caso base (para de llamarse)
  return n * factorial(n - 1); // se llama a sí misma
}
factorial(5); // → 120


// Recorrer una estructura anidada (árbol de carpetas por ejemplo)
function contarArchivos(carpeta) {
  let total = carpeta.archivos.length;
  for (const sub of carpeta.subcarpetas) {
    total += contarArchivos(sub); // entra en cada subcarpeta
  }
  return total;
}
```

---

## 🧱 Objetos Definidos por el Usuario

Un objeto agrupa datos (propiedades) y comportamiento (métodos) relacionados.

### Crear objetos

```javascript
// Objeto literal (la forma más simple)
const coche = {
  marca: "Toyota",
  modelo: "Corolla",
  año: 2022,
  encendido: false,

  arrancar() {
    this.encendido = true;
    return `${this.marca} ${this.modelo} arrancado`;
  },

  apagar() {
    this.encendido = false;
    return "Motor apagado";
  },

  info() {
    return `${this.marca} ${this.modelo} (${this.año})`;
  }
};

coche.arrancar(); // → "Toyota Corolla arrancado"
coche.encendido;  // → true
coche.info();     // → "Toyota Corolla (2022)"
```

### Clases (la forma moderna de crear objetos)

Cuando necesitas crear muchos objetos del mismo tipo, usas una clase como plantilla.

```javascript
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad   = edad;
  }

  saludar() {
    return `Hola, soy ${this.nombre} y tengo ${this.edad} años`;
  }

  cumpleaños() {
    this.edad++;
    return `${this.nombre} ahora tiene ${this.edad} años`;
  }

  esMayorDeEdad() {
    return this.edad >= 18;
  }
}

const ana   = new Persona("Ana", 28);
const pedro = new Persona("Pedro", 15);

ana.saludar();         // → "Hola, soy Ana y tengo 28 años"
pedro.esMayorDeEdad(); // → false
ana.cumpleaños();      // → "Ana ahora tiene 29 años"
```

### Herencia: una clase que extiende otra

```javascript
class Animal {
  constructor(nombre, sonido) {
    this.nombre  = nombre;
    this.sonido  = sonido;
    this.hambre  = 50;
  }

  hablar() {
    return `${this.nombre} dice: ${this.sonido}`;
  }

  comer(comida) {
    this.hambre -= 20;
    return `${this.nombre} come ${comida}. Hambre: ${this.hambre}`;
  }
}

class Perro extends Animal {
  constructor(nombre, raza) {
    super(nombre, "Guau");
    this.raza = raza;
  }

  buscarPalo() {
    return `${this.nombre} (${this.raza}) ha encontrado el palo!`;
  }

  hablar() {
    return `${super.hablar()} ${super.hablar()} ¡¡${this.nombre} está emocionado!!`;
  }
}

class Gato extends Animal {
  constructor(nombre) {
    super(nombre, "Miau");
    this.vidas = 7;
  }

  ronronear() {
    return `${this.nombre} ronronea... purrrr`;
  }
}

const rex   = new Perro("Rex", "Labrador");
const michi = new Gato("Michi");

rex.hablar();           // → "Rex dice: Guau Guau !!Rex está emocionado!!"
rex.buscarPalo();       // → "Rex (Labrador) ha encontrado el palo!"
rex.comer("croquetas"); // → "Rex come croquetas. Hambre: 30"

michi.hablar();    // → "Michi dice: Miau"
michi.ronronear(); // → "Michi ronronea... purrrr"
```

### Propiedades y métodos estáticos

Son de la **clase**, no de cada objeto creado.

```javascript
class Calculadora {
  static sumar(a, b)  { return a + b; }
  static restar(a, b) { return a - b; }
  static PI = 3.14159;
}

// Se usa directamente en la clase, sin crear objeto
Calculadora.sumar(5, 3);  // → 8
Calculadora.PI;            // → 3.14159

// Esto daría error:
// const calc = new Calculadora();
// calc.sumar(5, 3); // ❌ no existe en la instancia
```

### Getters y Setters

Controlan cómo se leen y escriben las propiedades.

```javascript
class Temperatura {
  constructor(celsius) {
    this._celsius = celsius;
  }

  get fahrenheit() {
    return this._celsius * 9/5 + 32;
  }

  get celsius() {
    return this._celsius;
  }

  set celsius(valor) {
    if (valor < -273.15) {
      throw new Error("Temperatura por debajo del cero absoluto");
    }
    this._celsius = valor;
  }
}

const temp = new Temperatura(100);
temp.fahrenheit; // → 212
temp.celsius;    // → 100

temp.celsius = 25;
temp.fahrenheit; // → 77

temp.celsius = -300; // → Error: Temperatura por debajo del cero absoluto
```

### Ejemplo real completo: carrito de la compra

```javascript
class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }

  toString() {
    return `${this.nombre} (${this.precio}€)`;
  }
}

class Carrito {
  constructor() {
    this.items = [];
  }

  agregar(producto, cantidad = 1) {
    const existente = this.items.find(i => i.producto.nombre === producto.nombre);
    if (existente) {
      existente.cantidad += cantidad;
    } else {
      this.items.push({ producto, cantidad });
    }
  }

  eliminar(nombreProducto) {
    this.items = this.items.filter(i => i.producto.nombre !== nombreProducto);
  }

  get total() {
    return this.items.reduce((acc, i) => acc + i.producto.precio * i.cantidad, 0);
  }

  get resumen() {
    return this.items.map(i => `${i.producto.nombre} x${i.cantidad}`).join(", ");
  }
}

// Uso
const manzana = new Producto("Manzana", 1.5);
const leche   = new Producto("Leche",   0.9);
const pan     = new Producto("Pan",     1.2);

const carrito = new Carrito();
carrito.agregar(manzana, 3);
carrito.agregar(leche);
carrito.agregar(pan, 2);
carrito.agregar(manzana, 2); // suma a las que ya había

carrito.resumen; // → "Manzana x5, Leche x1, Pan x2"
carrito.total;   // → 5*1.5 + 1*0.9 + 2*1.2 = 10.8
```

---

## En resumen

| Concepto | Para qué sirve |
|---|---|
| **Array** | Listas de datos, transformarlos con map/filter/reduce |
| **Función** | Reutilizar código, recibir y devolver valores |
| **Arrow function** | Forma compacta y moderna de escribir funciones |
| **Callback** | Pasar funciones como argumentos |
| **Closure** | Funciones que recuerdan su entorno de creación |
| **Recursión** | Funciones que se llaman a sí mismas |
| **Objeto literal** | Agrupar datos y comportamiento relacionados |
| **Clase** | Plantilla para crear muchos objetos del mismo tipo |
| **Herencia** | Una clase que extiende otra y reutiliza su código |
| **Getter/Setter** | Controlar cómo se leen y escriben propiedades |
