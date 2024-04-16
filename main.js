

/*localStorage.setItem('jugadores', JSON.stringify(jugadores));
console.log(localStorage.getItem('jugadores'));*/

fetch('jugadores.json')
    .then(response => response.json())
    .then((datos) => render_jugadores(datos))

function render_jugadores(datos) {
    console.log(datos)                                
}

let guardados = (localStorage.getItem('jugadores'));
console.log(guardados)

const preguntas = [
    {
        pregunta: "¿Cual es la capital de Francia?",
        respuestas: [
            { text: "Londres", correct: false },
            { text: "Paris", correct: true },
            { text: "Roma", correct: false },
            { text: "Berlin", correct: false },
        ]
    },
    {
        pregunta: "¿Quien pinto la Mona Lisa?",
        respuestas: [
            { text: "Rembrant", correct: false },
            { text: "Leonardo Da Vinci", correct: true },
            { text: "Miguel Angel", correct: false },
            { text: "Monet", correct: false },
        ]
    },
    {
        pregunta: "¿Quien es el autor del Martin Fierro?",
        respuestas: [
            { text: "Jose Hernandez", correct: true },
            { text: "Ernesto Sabato", correct: false },
            { text: "Jorge Luis Borges", correct: false },
            { text: "Juan Jose Jimenez", correct: false },
        ]
    },
    {
        pregunta: "¿Cual de las siguientes frutas es un citrico?",
        respuestas: [
            { text: "Uva", correct: false },
            { text: "Banana", correct: false },
            { text: "Manzana", correct: false },
            { text: "Pomelo", correct: true },
        ]
    },
    {
        pregunta: "¿Ali Baba y los 40....?",
        respuestas: [
            { text: "Valientes", correct: false },
            { text: "Ladrones", correct: true },
            { text: "Guereros", correct: false },
            { text: "Piratas", correct: false },
        ]
    },
    {
        pregunta: "¿Planeta mas lejano del Sol?",
        respuestas: [
            { text: "Urano", correct: false },
            { text: "Neptuno", correct: true },
            { text: "Pluton", correct: false },
            { text: "Saturno", correct: false },
        ]
    },
    {
        pregunta: "¿Que isla no es de la Polinesia?",
        respuestas: [
            { text: "Guinea", correct: false },
            { text: "Samoa", correct: false },
            { text: "Java", correct: false },
            { text: "Creta", correct: true },
        ]
    },
    {
        pregunta: "¿Cual es la capital de Colombia?",
        respuestas: [
            { text: "Bogota", correct: true },
            { text: "Lima", correct: false },
            { text: "Quito", correct: false },
            { text: "La Paz", correct: false },
        ]
    },
    {
        pregunta: "¿Que rio es de America?",
        respuestas: [
            { text: "Nilo", correct: false },
            { text: "Volga", correct: false },
            { text: "Rin", correct: false },
            { text: "Amazonas", correct: true },
        ]
    },
    {
        pregunta: "¿Que cordillera es de Europa?",
        respuestas: [
            { text: "Himalaya", correct: false },
            { text: "Alpes", correct: true },
            { text: "Andes", correct: false },
            { text: "Caucaso", correct: false },
        ]
    }
];

const preguntaElement = document.getElementById("pregunta");
const botonRespuesta = document.getElementById("boton-respuesta");
const siguienteBoton = document.getElementById("next-btn");
const botonLista = document.getElementById('btn-lista');
botonLista.style.display = "none";
let indicePreguntaActual = 0;
let puntuacion = 0;

comenzar();

function comenzar() {
    Swal.fire({
        width:"50%",
        background: "burlywood",
        position: "center",
        text:"¿listo para jugar?",
        title: "Bienvenido",
        showConfirmButton: true, 
        confirmButtonText:"Comenzar", 
        confirmButtonColor:"red",                          
        timer: 5000
});
    setTimeout(() => {
        indicePreguntaActual = 0;
        puntuacion = 0;
        siguienteBoton.innerHTML = "jugar de nuevo";
        mostrarPregunta();
    }, 5000)
}

function mostrarPregunta() {
    setTimeout(() => {
        usarProximoBoton();
        Toastify({
            text: "Quedan 5 segundos",
            duration: 5000,
            gravity: "top",
            position: "center",
            style: {
                background: "red"
            }
        }).showToast();
    }, 5000)
    resetear();
    let preguntaActual = preguntas[indicePreguntaActual];
    let preguntaNumero = indicePreguntaActual + 1;
    preguntaElement.innerHTML = preguntaNumero + ". " + preguntaActual.pregunta;
    preguntaActual.respuestas.forEach(respuesta => {
        const button = document.createElement("button");
        button.innerHTML = respuesta.text;
        button.classList.add("btn");
        botonRespuesta.appendChild(button);
        if (respuesta.correct) {
            button.dataset.correct = respuesta.correct;
        }
        button.addEventListener("click", seleccionarRespuesta);
    });
}

function resetear() {
    siguienteBoton.style.display = "none";
    while (botonRespuesta.firstChild) {
        botonRespuesta.removeChild(botonRespuesta.firstChild);
    }
}

function seleccionarRespuesta(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        puntuacion++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(botonRespuesta.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
}

function mostrarPuntos() {
    resetear();
    preguntaElement.innerHTML = `Tu puntuacion  : ${puntuacion} de ${preguntas.length}`;
    siguienteBoton.innerHTML = "jugar de nuevo";
    siguienteBoton.style.display = "block";
}

function usarProximoBoton() {
    setTimeout(() => {
        indicePreguntaActual++;
        if (indicePreguntaActual < preguntas.length) {
            mostrarPregunta();
        } else {
            mostrarPuntos();
            botonLista.style.display = "block"
            botonLista.addEventListener("click", () => {
                alert(guardados)                          // ver mejorar posicion del alert y personalizar
                botonLista.style.display = "none";
            })
        }
    }, 5000)
}

siguienteBoton.addEventListener("click", () => {
    if (indicePreguntaActual < preguntas.length) {
        usarProximoBoton();
    } else {
        comenzar();
        botonLista.style.display = "none";
    }
});
































