console.log("Iniciando calculadora");

//Declaramos variables y constantes
let n1 = document.getElementById("n1"), n2 = document.getElementById("n2"), op = document.getElementById("op"), res = document.getElementById("res"), dec = document.getElementById("dec");
const FORM = document.getElementById("form");

//Verificamos que el dato introducido sea un número, si no devuelve null
function esNum(x) {
    const NUM = Number(x);
    return Number.isNaN(NUM) ? null : NUM;
}

//Hacemos las funciones de las operaciones
function suma(x, y) {
    const N = esNum(x), M = esNum(y);
    return (N === null || M === null) ? null : N + M;
}

function resta(x, y) {
    const N = esNum(x), M = esNum(y);
    return (N === null || M === null) ? null : N - M;
}

function mult(x, y) {
    const N = esNum(x), M = esNum(y);
    return (N === null || M === null) ? null : N * M;
}

function div(x, y) {
    const N = esNum(x), M = esNum(y);
    
    if (N === 0 && M === 0) return "Indeterminación";

    return (N === null || M === null) ? null : N / M;
}

//Creamos el EventListener para que al hacer click ejecute el evento del cálculo
FORM.addEventListener("click", function (evento) {

    //Creamos constantes para añadir el valor de los datos y la variable 'resultado' para guardar el resultado de cada operacion
    const VAL1 = n1.value, VAL2 = n2.value, CALC = op.value, DEC = dec.value;
    let resultado = 0;

    //Esta línea previene que el formulario se recargue
    evento.preventDefault();
    
    //Se verifica que el número decimal sea un número positivo o igual a 0
    if (esNum(DEC) >= 0) {   

        //Dependiendo del cálculo que se desee, se llama a la función correspondiente
        switch (CALC) {
            case "+":
                resultado = suma(VAL1, VAL2).toFixed(DEC);
                console.log(resultado);
                res.textContent = resultado;
                break;
        
            case "-":
                resultado = resta(VAL1, VAL2).toFixed(DEC);
                console.log(resultado);
                res.textContent = resultado;
                break;
        
            case "*":
                resultado = mult(VAL1, VAL2).toFixed(DEC);
                console.log(resultado);
                res.textContent = resultado;
                break;
        
            case "/":
                resultado = div(VAL1, VAL2).toFixed(DEC);
                console.log(resultado);
                res.textContent = resultado;
                break;
        
            default:
                console.log("Error al leer el operador");
                break;
        }
    } else {
        resultado = "Introduce un decimal correcto";
        console.log(resultado);
        res.textContent = resultado;
    }
});