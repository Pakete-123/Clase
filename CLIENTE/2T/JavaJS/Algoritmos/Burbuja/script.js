/**
 * Función burbuja que aplica el algoritmo de la burbuja para realziar una ordenación de los números de forma eficiente
 */
function Burbuja() {
  // Definimos un array de números enteros
  var lista = [
    389, 703, 247, 563, 224, 714, 464, 953, 708, 201, 887, 550, 515, 206, 131,
  ];
  var n, i, k, aux;
  n = lista.length; // Número de elementos del array
  console.log(`${lista}`); // Mostramos, por consola, la lista desordenada

  // Algoritmo de burbuja
  for (k = 1; k < n; k++) {
    for (i = 0; i < n - k; i++) {
      if (lista[i] > lista[i + 1]) {
        aux = lista[i];
        lista[i] = lista[i + 1];
        lista[i + 1] = aux;
      }
    }
  }
  console.log(`${lista}`); // Mostramos, por consola, la lista ya ordenada
}

Burbuja();
