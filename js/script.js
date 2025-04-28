console.log("script.js cargado");

const botones = document.querySelectorAll(".choice");
const textoGanador = document.getElementById("winner");
const resetBtn = document.getElementById("reset-btn");
const gameContainer = document.querySelector(".game");

let juegoIniciado = false;
let ganadas = 0;
let perdidas = 0;
let empates = 0;
const LIMITE = 3;

function desactivarBotones() {
  botones.forEach((b) => (b.disabled = true));
}

function activarBotones() {
  botones.forEach((b) => (b.disabled = false));
}

function verificarFinDePartida() {
  if (ganadas === LIMITE || perdidas === LIMITE) {
    const mensajeFinal = document.getElementById("mensaje-final");
    const finPartida = document.getElementById("fin-partida");

    // Limpiar clases anteriores
    textoGanador.classList.remove("winner", "looser", "draws", "neutral");

    if (ganadas === LIMITE) {
      textoGanador.textContent = "¡Ganaste la partida!";
      textoGanador.classList.add("winner");
      mensajeFinal.textContent = "¡Eres imparable! Ganaste la partida.";

      anime({
        targets: "#winner",
        scale: [0, 2.2, 1],
        rotate: [0, 360],
        opacity: [0, 1],
        duration: 1000,
        easing: "easeOutElastic(1, .7)",
      });
    } else {
      textoGanador.textContent = "¡La máquina ganó la partida!";
      textoGanador.classList.add("looser");
      mensajeFinal.textContent =
        "¡La máquina te venció... pero puedes volver a intentarlo!";

      anime({
        targets: "#winner",
        rotate: [-15, 15, -10, 10, 0],
        scale: [0.8, 1.5, 1],
        duration: 900,
        easing: "easeInOutBack",
      });
    }

    finPartida.classList.remove("oculto");
    finPartida.classList.add("visible");

    resetBtn.innerHTML = `<img src="assets/icons/restart.png" alt="Reiniciar" class="restart-icon" />`;

    anime({
      targets: "#reset-btn",
      scale: [1, 1.1, 1],
      duration: 1000,
      loop: true,
      easing: "easeInOutQuad",
    });

    return true;
  }

  return false;
}

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    if (!juegoIniciado || ganadas === LIMITE || perdidas === LIMITE) return;

    desactivarBotones();

    const eleccionJugador = boton.dataset.choice;
    document.getElementById(
      "user-choice"
    ).textContent = `Jugador: ${eleccionJugador}`;

    setTimeout(() => {
      const opciones = ["piedra", "papel", "tijera"];
      const eleccionMaquina =
        opciones[Math.floor(Math.random() * opciones.length)];
      document.getElementById(
        "computer-choice"
      ).textContent = `Máquina: ${eleccionMaquina}`;

      // Limpiar clases anteriores
      textoGanador.classList.remove("winner", "looser", "draws", "neutral");

      if (eleccionJugador === eleccionMaquina) {
        textoGanador.textContent = "¡Empate!";
        textoGanador.classList.add("draws");

        anime({
          targets: "#winner",
          translateX: [-10, 10, -6, 6, 0],
          duration: 400,
          easing: "easeInOutQuad",
        });

        empates++;
      } else if (
        (eleccionJugador === "piedra" && eleccionMaquina === "tijera") ||
        (eleccionJugador === "papel" && eleccionMaquina === "piedra") ||
        (eleccionJugador === "tijera" && eleccionMaquina === "papel")
      ) {
        textoGanador.textContent = "¡Ganaste!";
        textoGanador.classList.add("winner");

        anime({
          targets: "#winner",
          scale: [0.8, 1.3, 1],
          duration: 600,
          easing: "easeOutBounce",
        });

        ganadas++;
      } else {
        textoGanador.textContent = "¡Ganó la máquina!";
        textoGanador.classList.add("looser");

        anime({
          targets: "#winner",
          rotate: [0, -5, 5, -3, 3, 0],
          duration: 600,
          easing: "easeInOutSine",
        });

        perdidas++;
      }

      // Actualizar marcador
      document.getElementById("wins").textContent = ganadas;
      document.getElementById("looses").textContent = perdidas;
      document.getElementById("draws").textContent = empates;

      // Verificar fin de juego o seguir
      if (!verificarFinDePartida()) {
        activarBotones();
      }
    }, 900);
  });
});


function reiniciarJuegoCompleto() {
  ganadas = 0;
  perdidas = 0;
  empates = 0;

  document.getElementById("wins").textContent = 0;
  document.getElementById("looses").textContent = 0;
  document.getElementById("draws").textContent = 0;
  document.getElementById("user-choice").textContent = "Jugador : ";
  document.getElementById("computer-choice").textContent = "Máquina : ";
  textoGanador.textContent = "¿Quién gana?";
  textoGanador.classList.remove("winner", "looser", "draws");
  textoGanador.classList.add("neutral");

  const finPartida = document.getElementById("fin-partida");
  if (finPartida) {
    finPartida.classList.remove("visible");
    finPartida.classList.add("oculto");
  }

  const mensajeInicio = document.getElementById("mensaje-inicio");
  mensajeInicio.textContent = "Presiona jugar para comenzar...";
  mensajeInicio.classList.remove("visible");

  resetBtn.innerHTML = `<img src="assets/icons/play.png" alt="Jugar" class="restart-icon" />`;

  anime({
    targets: "#reset-btn",
    scale: [1, 1.1, 1],
    duration: 1000,
    loop: true,
    easing: "easeInOutQuad",
  });

  activarBotones();
}

resetBtn.addEventListener("click", () => {
  const partidaTerminada = ganadas === LIMITE || perdidas === LIMITE;

  if (!juegoIniciado) {
    // Primera vez que se inicia el juego
    juegoIniciado = true;
    gameContainer.classList.remove("oculto");

    resetBtn.innerHTML = `<img src="assets/icons/restart.png" alt="Reiniciar" class="restart-icon" />`;
    resetBtn.classList.remove("palpitar");

    const mensajeInicio = document.getElementById("mensaje-inicio");
    mensajeInicio.textContent = "El juego ha comenzado, elige una opción...";
    mensajeInicio.classList.add("visible");

    anime({
      targets: ".choices",
      opacity: [0, 1],
      translateY: [30, 0],
      scale: [0.3, 1],
      duration: 1000,
      easing: "easeOutElastic(1, .9)",
    });

    return;
  }

  // Si ya terminó la partida → directamente reiniciamos y seguimos jugando
  if (partidaTerminada) {
    reiniciarJuegoCompleto();
    juegoIniciado = true;
    gameContainer.classList.remove("oculto");

    resetBtn.innerHTML = `<img src="assets/icons/restart.png" alt="Reiniciar" class="restart-icon" />`;
    resetBtn.classList.remove("palpitar");

    const mensajeInicio = document.getElementById("mensaje-inicio");
    mensajeInicio.textContent = "¡Nueva partida! Elige una opción...";
    mensajeInicio.classList.add("visible");

    anime({
      targets: ".choices",
      opacity: [0, 1],
      translateY: [30, 0],
      scale: [0.3, 1],
      duration: 1000,
      easing: "easeOutElastic(1, .9)",
    });

    return;
  }

  // Si la partida no terminó → confirmamos reinicio completo
  const confirmar = confirm(
    "Aún no has terminado la partida. ¿Querés volver al inicio?"
  );
  if (!confirmar) return;

  // Volver al inicio (botón play + animación)
  juegoIniciado = false;
  gameContainer.classList.add("oculto");

  reiniciarJuegoCompleto();
});

window.addEventListener("DOMContentLoaded", () => {
  anime({
    targets: ".logo-img",
    rotate: "1turn",
    scale: [1, 1.3, 1],
    duration: 8000,
    easing: "linear",
    loop: true,
  });

  anime({
    targets: "#reset-btn",
    scale: [1, 1.1, 1],
    duration: 1000,
    loop: true,
    easing: "easeInOutQuad",
  });
});
