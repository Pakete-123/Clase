/* Pedir un número, validarlo y mostrar el cuadrado de dicho número
Si no es válido se mostrará un error */
try {
    let num = Number(prompt("Introduce un número"));

    if (Number.isNaN(num)) throw new Error("El número no es válido");
    alert(`El cuadrdado del número es: ${num ** 2}`)
} catch (error) {
    alert(error.message);
    alert(console.trace("Traza completa del error"));
    console.error("Error capturado", error.message);
}