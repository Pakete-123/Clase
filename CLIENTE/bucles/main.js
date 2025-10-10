//1.- for
for (let i = 0; i <= 10; i++) {
    console.log(i);    
}

//2.- Usando prompt (ventana emergente con campo de datos)
let num = Number(prompt("Ingresa un número: ")), res = "";

for (let i = 1; i <= num; i++) {
    res += i + "\n";
}
//Mostramos con alert (ventana emergente)
alert(res);