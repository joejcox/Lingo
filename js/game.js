import Square from "./square.js"
const grid = document.getElementById("board")
const game = document.querySelector(".game")
const startMenu = document.querySelector(".start-screen")

export default class Board {
  constructor() {
    this.rows = 5
    this.columns = 6
    this.total = this.rows * this.columns
    this.letters = []
    this.prevWords = []
    this.loaded = false
  }

  init() {
    if (this.loaded) return false
    startMenu.classList.remove("open")
    game.classList.add("open")
    this.renderAllSquares()
    this.loaded = true
  }

  renderAllSquares() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const square = new Square(20, 65, 5)
        square.render()
      }
    }
  }

  reset() {
    const squares = this.getSquares()
    squares.forEach((square) => {
      square.innerHTML = null
    })
    this.letters = []
    this.loaded = false
  }

  getSquares() {
    const squares = document.querySelectorAll(".untouched")
    return [...squares]
  }

  addLetter(letter) {
    const squares = this.getSquares()
    if (!letter || squares.length < 1 || this.letters.length === 5) return false

    this.letters.push(letter)

    const emptySquare = squares.find((square) => !square.hasChildNodes())

    const p = document.createElement("p")
    p.innerText = letter.toUpperCase()
    emptySquare.appendChild(p)
  }

  checkLetters() {
    if (this.letters.length !== 5) return false

    const squares = this.getSquares()
    squares.forEach((square) => {
      if (squares.indexOf(square) < 5) {
        square.classList.add("correct")
        square.classList.remove("untouched")
      }
    })

    this.letters.join("")
    this.letters = []
  }

  removeLetter() {
    if (this.letters.length < 1) return false
    const squares = this.getSquares()
    squares[this.letters.length - 1].innerHTML = null
    this.letters.pop()
  }

  end() {
    game.classList.remove("open")
    startMenu.classList.add("open")
    this.reset()
    setTimeout(function () {
      grid.innerHTML = null
    }, 500)
  }
}
