// SONIDOS
const sonidoCorrecto = new Audio("audio/correcto.mp3");
const sonidoIncorrecto = new Audio("audio/incorrecto.mp3");
const sonidoGanador = new Audio("audio/ganador.mp3");
const mensajeRespuesta = document.getElementById("mensajeRespuesta");
const tituloMensaje = document.getElementById("tituloMensaje");
const textoMensaje = document.getElementById("textoMensaje");
const barraProgreso = document.getElementById("barraProgreso");
const inicio = document.getElementById("inicio");
const juego = document.getElementById("juego");
const final = document.getElementById("final");

const btnIniciar = document.getElementById("btnIniciar");
const btnSiguiente = document.getElementById("btnSiguiente");
const btnReiniciar = document.getElementById("btnReiniciar");

const preguntaElemento = document.getElementById("pregunta");
const opcionesElemento = document.getElementById("opciones");
const puntajeElemento = document.getElementById("puntaje");
const nivelElemento = document.getElementById("nivel");
const resultadoFinal = document.getElementById("resultadoFinal");
const nombreJugador = document.getElementById("nombreJugador");
const nombreFinal = document.getElementById("nombreFinal");

let indicePregunta = 0;
let puntaje = 0;
let preguntasJuego = [];

btnIniciar.addEventListener("click", iniciarJuego);
btnSiguiente.addEventListener("click", siguientePregunta);
btnReiniciar.addEventListener("click", iniciarJuego);

function iniciarJuego() {

    const nombre = document.getElementById("nombre").value.trim();
    const dni = document.getElementById("dni").value.trim();
    const area = document.getElementById("area").value.trim();
nombreJugador.textContent = nombre;

    if(nombre==="" || dni==="" || area===""){
        alert("Complete todos los datos para iniciar.");
        return;
    }

    preguntasJuego = [...preguntas];

    mezclar(preguntasJuego);

    indicePregunta = 0;
    puntaje = 0;

    inicio.classList.add("oculto");
    final.classList.add("oculto");
    juego.classList.remove("oculto");

    actualizarMarcador();

    mostrarPregunta();

}

function mostrarPregunta() {

nivelElemento.textContent = `Pregunta ${indicePregunta + 1} de ${preguntasJuego.length}`;

barraProgreso.style.width =
    ((indicePregunta + 1) / preguntasJuego.length) * 100 + "%";

    opcionesElemento.innerHTML = "";

    btnSiguiente.style.display = "none";

    const actual = preguntasJuego[indicePregunta];

    preguntaElemento.textContent = actual.pregunta;

    actual.opciones.forEach((opcion, indice) => {

        const boton = document.createElement("button");

        boton.textContent = opcion;

        boton.onclick = () => responder(indice);

        opcionesElemento.appendChild(boton);

    });

}

function responder(indiceSeleccionado){

    const actual = preguntasJuego[indicePregunta];

    const botones = opcionesElemento.querySelectorAll("button");

    botones.forEach((boton, indice)=>{

        boton.disabled=true;

        if(indice===actual.correcta){
            boton.classList.add("correcta");
        }

        if(indice===indiceSeleccionado && indice!==actual.correcta){
            boton.classList.add("incorrecta");
        }

    });

mensajeRespuesta.classList.remove("oculto");
mensajeRespuesta.classList.remove("correctoMensaje");
mensajeRespuesta.classList.remove("incorrectoMensaje");

if(indiceSeleccionado===actual.correcta){

    puntaje += 10;

    // 🔊 Sonido de respuesta correcta
    sonidoCorrecto.currentTime = 0;
    sonidoCorrecto.play();

    mensajeRespuesta.classList.add("correctoMensaje");
    tituloMensaje.textContent = "✅ " + actual.mensajeCorrecto.titulo;
    textoMensaje.textContent = actual.mensajeCorrecto.texto;

}else{

    // 🔊 Sonido de respuesta incorrecta
    sonidoIncorrecto.currentTime = 0;
    sonidoIncorrecto.play();

    mensajeRespuesta.classList.add("incorrectoMensaje");
    tituloMensaje.textContent = "❌ " + actual.mensajeIncorrecto.titulo;
    textoMensaje.textContent = actual.mensajeIncorrecto.texto;

}

actualizarMarcador();

btnSiguiente.style.display = "inline-block";

} // <-- Cierra la función responder()

function siguientePregunta() {

    indicePregunta++;

    if (indicePregunta >= preguntasJuego.length) {

        terminarJuego();

    } else {

        mensajeRespuesta.classList.add("oculto");
        mostrarPregunta();

    }

}

function actualizarMarcador() {

    puntajeElemento.textContent = "Puntaje: " + puntaje;

    nivelElemento.textContent =
        "Pregunta " + (indicePregunta + 1) + " de " + preguntasJuego.length;

}

function terminarJuego(){

sonidoGanador.currentTime = 0;
sonidoGanador.play();

    juego.classList.add("oculto");

    final.classList.remove("oculto");

    let correctas = puntaje / 10;

    let porcentaje = (correctas / preguntasJuego.length) * 100;

    let mensaje = "";

    if (porcentaje == 100) {

    mensaje = "🥇 ¡Excelente! Has demostrado un compromiso sobresaliente con la campaña 'Yo Escucho a la Prevención'.";

}
else if (porcentaje >= 80) {

    mensaje = "🥈 ¡Muy buen trabajo! Tus decisiones reflejan una actitud preventiva.";

}
else if (porcentaje >= 60) {

    mensaje = "🥉 Buen desempeño. Continúa fortaleciendo la cultura preventiva.";

}
else {

    mensaje = "📚 La prevención se fortalece cada día. Sigue aprendiendo y participando.";

}

   nombreFinal.textContent = nombreJugador.textContent;

let estrellas = "";

if (porcentaje == 100) {
    estrellas = "⭐⭐⭐⭐⭐";
} else if (porcentaje >= 80) {
    estrellas = "⭐⭐⭐⭐";
} else if (porcentaje >= 60) {
    estrellas = "⭐⭐⭐";
} else if (porcentaje >= 40) {
    estrellas = "⭐⭐";
} else {
    estrellas = "⭐";
}

resultadoFinal.innerHTML = `
<div style="font-size:60px;margin-bottom:15px;">
🏆
</div>

<h2>${estrellas}</h2>

<h1 style="color:#ef6c00;font-size:65px;">
${porcentaje}%
</h1>

<h3>
${correctas} de ${preguntasJuego.length} respuestas correctas
</h3>

<br>

<p style="font-size:22px;line-height:1.8;">
${mensaje}
</p>

<hr style="margin:30px 0">

<h3>
🛡️ YO ESCUCHO A LA PREVENCIÓN
</h3>

<p>
Gracias por contribuir a una cultura de prevención.
<br><br>
Cada decisión segura protege una vida.
</p>
`;
} // <-- Cierra la función terminarJuego


function mezclar(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];

    }

}