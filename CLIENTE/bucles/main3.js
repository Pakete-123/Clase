//Tabla de multiplicar de n
let n = Number(prompt("Introduzca el número del que quiera su tabla de multiplicar")), res = "", i = 1;

while (i <= 10) {
    res += `${n} x ${i} = ${n * i}\n`;
    i++;
}
console.log(res);