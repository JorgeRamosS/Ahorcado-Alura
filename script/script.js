var palabras = ["burro", "caballo", "perro", "gato", "vaca", "toro", "zorro"];

let respuesta = '';
let maxFallos = 6;
let fallos = 0;
let letraAdivinada = [];
let estadoPalabra = null;

function botonAgregar() {
    document.getElementById("container")
    document.getElementById("botones")
    document.getElementById("nuevaPalabra")
    container.style.display = "none";
    botones.style.display = "none";
    nuevaPalabra.style.display = "block";
    
}

function botonJugar() {
    document.getElementById("container")
    document.getElementById("botones")
    document.getElementById("nuevaPalabra")
    container.style.display = "block";
    botones.style.display = "none";
    nuevaPalabra.style.display = "none";
    
}

function agregarPalabra() {
    let palabraNueva = document.getElementById("agregar").value;
    palabraNueva = palabraNueva.toLowerCase();
    if (palabraNueva !== "") {
        palabras.push(palabraNueva);
    }

    botonJugar();
}


function palabraAleatorea() {
    respuesta = palabras[Math.floor(Math.random() * palabras.length)];    
}

function generarTeclado() {
    let teclas = "abcdefghijklmnñopqrstuvwxyz".split('').map(letra =>
        `
            <button
                class="btnt"
                id="` + letra + `"
                onclick="handleGuess('` + letra + `')"
            >
               ` + letra + `
            </button>
        `).join('');

    document.getElementById("teclado").innerHTML = teclas;
}

function handleGuess(letraElegida) {
    letraAdivinada.indexOf(letraElegida) === -1 ? letraAdivinada.push(letraElegida) : null;
    document.getElementById(letraElegida).setAttribute("disabled", true);

    if(respuesta.indexOf(letraElegida) >= 0) {
        palabraAdivinada();
        verificarVic();
    } else if (respuesta.indexOf(letraElegida) === -1) {
        fallos++;
        actualizarFallos();
        verificarDer();
        cambiarAhorcado();
    }
}

function cambiarAhorcado() {
    document.getElementById("ahorcadoImg").src = "./images/a" + fallos + ".png";
}

function verificarVic() {
    if (estadoPalabra === respuesta) {
        document.getElementById("teclado").innerHTML = "Ganaste!"
    }
}

function verificarDer() {
    if (fallos === maxFallos) {
        document.getElementById("wordSpotlight").innerHTML = "La respuesta era " + respuesta;
        document.getElementById("teclado").innerHTML = "Perdiste!"
    }
}

function palabraAdivinada() {
    estadoPalabra = respuesta.split('').map(letra => (letraAdivinada.indexOf(letra) >= 0 ? letra : " __ ")).join('');

    document.getElementById("wordSpotlight").innerHTML = estadoPalabra
}

function actualizarFallos() {
    document.getElementById("fallos").innerHTML = fallos;
}

function reset() {
    document.getElementById("container")
    document.getElementById("botones")
    botones.style.display = "none";
    container.style.display = "block";
    fallos = 0;
    letraAdivinada = [];
    document.getElementById("ahorcadoImg").src = "./images/a_base.png";

    palabraAleatorea();
    palabraAdivinada();
    actualizarFallos();
    generarTeclado();
}

document.getElementById("maxFallos").innerHTML = maxFallos;

palabraAleatorea();
generarTeclado();
palabraAdivinada();
