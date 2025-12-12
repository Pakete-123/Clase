const alumno = {
  nombre: "Ana",
  nota: 7,
  esApto() {
    return this.nota >= 5;
  },
};

// invocacion del obj alumno
console.log(`Creacion de objetos\n${alumno.nombre}\n${alumno.nota}\n${alumno.esApto()}`);

alumno.centro = "IES Lázaro Cárdenas";
console.log(`${alumno.centro}`);

delete (alumno.centro);

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
  }
}

libro.genero = "Terror";
console.log(`${libro.genero}`);
delete (libro.genero);

for (const at in libro) {
  console.log(`${at}: ${libro[at]}`);
}

class Alumno {
  constructor(alumno, centro) {
    this.alumno = alumno;
    this.centro = centro;
  }
}

const pablo = new Alumno("Pablo", "IES Lázaro Cárdenas")