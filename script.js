console.log("script.js cargado");

const botones = document.querySelectorAll(".choice");

let ganadas = 0;
let perdidas = 0;
let empates = 0;

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    const eleccionJugador = boton.dataset.choice;
    document.getElementById(
      "user-choice"
    ).textContent = `Tú elegiste: ${eleccionJugador}`;
    console.log("🧍 El jugador eligió:", eleccionJugador);

    setTimeout(() => {
      const opciones = ["piedra", "papel", "tijera"];
      const eleccionMaquina =
        opciones[Math.floor(Math.random() * opciones.length)];
      document.getElementById(
        "computer-choice"
      ).textContent = `La máquina eligió: ${eleccionMaquina}`;
      console.log("🤖 La máquina eligió:", eleccionMaquina);

      const textoGanador = document.getElementById("winner");

      textoGanador.classList.remove("winner", "loser", "neutral");

      if (eleccionJugador === eleccionMaquina) {
        textoGanador.textContent = "¡Empate!";
        textoGanador.classList.add("neutral");
        empates++;
      } else if (
        (eleccionJugador === "piedra" && eleccionMaquina === "tijera") ||
        (eleccionJugador === "papel" && eleccionMaquina === "piedra") ||
        (eleccionJugador === "tijera" && eleccionMaquina === "papel")
      ) {
        textoGanador.textContent = "¡Ganaste tú! 🎉";
        textoGanador.classList.add("winner");
        ganadas++;
      } else {
        textoGanador.textContent = "¡Ganó la máquina! 😈";
        textoGanador.classList.add("loser");
        perdidas++;
      }

      document.getElementById("wins").textContent = ganadas;
      document.getElementById("losses").textContent = perdidas;
      document.getElementById("draws").textContent = empates;
    }, 400);
  });
});

document.getElementById("reset-btn").addEventListener("click", () => {
  ganadas = 0;
  perdidas = 0;
  empates = 0;

  document.getElementById("wins").textContent = 0;
  document.getElementById("losses").textContent = 0;
  document.getElementById("draws").textContent = 0;

  document.getElementById("user-choice").textContent = "Tú elegiste: -";
  document.getElementById("computer-choice").textContent =
    "La máquina eligió: -";

  const textoGanador = document.getElementById("winner");
  textoGanador.textContent = "¿Quién gana?";
  textoGanador.classList.remove("winner", "loser", "neutral");
  textoGanador.classList.add("neutral");

  console.log("🔄 Marcador reiniciado");
});
