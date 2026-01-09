const alumno = {
  nombre: "Ana",
  nota: 7,
  esApto() {
    return this.nota >= 5;
  },
};

// invocacion del obj alumno
console.log(
  `Creacion de objetos\n${alumno.nombre}\n${alumno.nota}\n${alumno.esApto()}`
);

alumno.centro = "IES Lázaro Cárdenas";
console.log(`${alumno.centro}`);

delete alumno.centro;

for (const atrib in alumno) {
  console.log(`${atrib}: ${alumno[atrib]}`);
}

/**
 * 1. Crea un objeto que represente un libro que tenga un título, autor, año y un método que retorne una descripción del libro que influya en el resultado de uno de sus atributos
 * 2. Añade dinámicamente un atributo al libro y bórralo posteriormente
 * 3. Itera sobre las propiedades imprimiendo cada dato del libro
 */
const libro = {
  titulo: "Los Mitos de Cthulhu",
  autor: "H.P. Lovecraft",
  año: 1935,
  desc() {
    return `El libro de ${this.titulo} está escrito por ${this.autor} y escrito entre los años de 1921 y ${this.año}`;
  },
};

libro.genero = "Terror";
console.log(`${libro.genero}`);
delete libro.genero;

for (const at in libro) {
  console.log(`${at}: ${libro[at]}`);
}

class Alumno {
  constructor(alumno, centro) {
    this.alumno = alumno;
    this.centro = centro;
  }
}

const pablo = new Alumno("Pablo", "IES Lázaro Cárdenas");

console.log(`--------------Ejercicio: Crear un objeto persona----------------`);
const PERSONA = {
  nombre: "Ana",
  edad: "20",
};
console.log(`${PERSONA.nombre} ${PERSONA.edad}`);

// Modificamos el valor de un atributo
console.log(`Modificamos el atributo edad a 19`);
PERSONA.edad = 19;
console.log(`${PERSONA.edad}`);

// Creamos un objeto vacío y le añadimos propiedades
const emptyObject = {};

console.log(`Creamos los atributos atri1 y atri2 asignando valores`);
emptyObject.atri1 = "Hola";
emptyObject.atri2 = 29;
console.log(`${emptyObject.atri1} ${emptyObject.atri2}`);

/**
 * Ejercicios propuestos:
 * 1.- Crea un objeto cuenta que modele una cuenta bancaria con los siguientes atributos: titular, saldo y moneda
 * Añade dos métodos:
 *    ingresar(cantidad) -> suma al saldo si cantidad > 0
 *    retirar(cantidad) -> resta al saldo si cantidad > 0 y cantidad < saldo
 *
 * Muestra por consola el estado inicial (titular, saldo y moneda)
 * Realiza un ingreso y una retirada y vuelve a mostrar el saldo
 * Recorre todas las propiedades del objeto con un bucle for...in
 *    Si la propiedad (atributo) es una función imprime -> <clave>: [funcion]
 *    Si la propiedad es un dato, imprime <clave>:<valor>
 *
 * 2.- Crea tres objetos producto (por ejemplo: p1, p2, p3) con los siguientes atributos:
 *    nombre, precio, iva (en porcentaje)
 *  Cada objeto debe incluir una función:
 *    precioConIva() -> devuelve precio * (1 + IVA/100). Redondeando a 2 decimales.
 *
 * Guarda los tres objetos en un array llamado catálogo
 * Recorre el array con un bucle for clásico (a través de índices) para mostrar nombre y el precioConIva() para cada producto
 * Calcula el importe total (suma de precioConIva()) de todos los objetos usando un bucle for y mostrándolo en consola
 */

console.log(
  `1.- Crea un objeto cuenta que modele una cuenta bancaria con los siguientes atributos: titular, saldo y moneda`
);
const cuenta = {
  titular: "Pablo",
  saldo: 50,
  moneda: "€",
  ingresar(cantidad) {
    if (typeof cantidad === "number" && cantidad > 0) {
      return `${(this.saldo += cantidad)}${this.moneda}`;
    } else {
      return "Error: introduce una cantidad válida";
    }
  },
  retirar(cantidad) {
    if (typeof cantidad === "number" && cantidad > 0 && cantidad < this.saldo) {
      return `${(this.saldo -= cantidad)}${this.moneda}`;
    } else {
      return "Error: introduce una cantidad válida";
    }
  },
};
console.log(`---- Estado inicial ----
  Titular: ${cuenta.titular}
  Saldo: ${cuenta.saldo}
  Moneda: ${cuenta.moneda}`);

console.log(`Ingreso de 20€ Total: ${cuenta.ingresar(20)}`);
console.log(`Retiro 10€ Total: ${cuenta.retirar(10)}`);

for (const key in cuenta) {
  if (typeof cuenta[key] != "function") {
    console.log(`<${key}>:<${cuenta[key]}>`);
  } else {
    console.log(`<${key}>: [${cuenta[key]}]`);
  }
}

console.log(
  `\n\n\n2.- Crea tres objetos producto (por ejemplo: p1, p2, p3) con los siguientes atributos: nombre, precio, iva (en porcentaje)`
);

class Producto {
  constructor(nombre, precio, iva) {
    this.nombre = nombre;
    this.precio = precio;
    this.iva = iva;
  }

  precioConIva() {
    return Math.round(this.precio * (1 + this.iva / 100), 2);
  }
}

const p1 = new Producto("Sony PSP", 100, 10);
const p2 = new Producto("AMD Ryzen 7", 150, 21);
const p3 = new Producto("AMD Radeon rx 9070", 495, 21);

const catalogo = [p1, p2, p3];

console.log(`Nombre y precio con iva de cada producto`);
for (let i = 0; i < catalogo.length; i++) {
  console.log(`${catalogo[i].nombre}: ${catalogo[i].precioConIva()}€`);
}

let total = 0;
for (let i = 0; i < catalogo.length; i++) {
  total += catalogo[i].precioConIva();
}
console.log(`Total de los productos del catálogo: ${total}€`);
