import Board from "./game.js";
const resetButton = document.getElementById("reset");
const startButton = document.getElementById("start");

const Game = new Board();

function handleInput(e) {
  if (!Game.loaded) return false;

  if (e.keyCode === 13) {
    Game.checkLetters();
  }

  if (e.keyCode === 8) {
    Game.removeLetter();
  }

  if (e.keyCode < 65 || e.keyCode > 90) return false;

  Game.addLetter(e.key);
}

requestAnimationFrame(handleInput);

document.addEventListener("keydown", handleInput);

startButton.addEventListener("click", function () {
  Game.init();
});

resetButton.addEventListener("click", function () {
  Game.end();
});
