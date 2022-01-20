const grid = document.getElementById("board");
const game = document.querySelector(".game");
const startMenu = document.querySelector(".start-screen");
const resetButton = document.getElementById("reset");
const startButton = document.getElementById("start");

class Square {
  constructor(width, height, spacing) {
    this.width = `calc(${width}% - 10px)`;
    this.height = `${height}px`;
    this.spacing = `${spacing}px`;
  }

  render() {
    const square = document.createElement("div");
    square.className = "square untouched";
    square.style.width = this.width;
    square.style.height = this.height;
    square.style.margin = this.spacing;
    grid.appendChild(square);
  }
}

class Board {
  constructor() {
    this.rows = 5;
    this.columns = 6;
    this.total = this.rows * this.columns;
    this.letters = [];
    this.prevWords = [];
    this.loaded = false;
  }

  init() {
    if (this.loaded) return false;
    startMenu.classList.remove("open");
    game.classList.add("open");
    this.renderAllSquares();
    this.loaded = true;
  }

  renderAllSquares() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const square = new Square(20, 65, 5);
        square.render();
      }
    }
  }

  reset() {
    const squares = this.getSquares();
    [...squares].forEach((square) => {
      square.innerHTML = null;
    });
    this.letters = [];
    this.loaded = false;
  }

  getSquares() {
    const squares = document.querySelectorAll(".untouched");
    return squares;
  }

  addLetter(letter) {
    const squares = this.getSquares();
    if (!letter || squares.length < 1) return false;
    if (this.letters.length === 5) return false;

    this.letters.push(letter);

    for (let i = 0; i < this.total; i++) {
      if (!squares[i].hasChildNodes()) {
        const p = document.createElement("p");
        p.innerText = letter.toUpperCase();
        squares[i].appendChild(p);
        return;
      }
    }
  }

  checkLetters() {
    if (this.letters.length !== 5) return false;

    const squares = this.getSquares();
    for (let i = 0; i < this.letters.length; i++) {
      squares[i].classList.add("correct");
      squares[i].classList.remove("untouched");
    }
    const word = this.letters.join("");
    console.log(word);
    this.letters = [];
  }

  removeLetter() {
    if (this.letters.length < 1) return false;
    const squares = this.getSquares();
    squares[this.letters.length - 1].innerHTML = null;
    this.letters.pop();
  }

  end() {
    game.classList.remove("open");
    startMenu.classList.add("open");
    this.reset();
    setTimeout(function () {
      grid.innerHTML = null;
    }, 500);
  }
}

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
