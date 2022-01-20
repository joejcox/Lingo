const grid = document.getElementById("board")

export default class Square {
  constructor(width, height, spacing) {
    this.width = `calc(${width}% - 10px)`
    this.height = `${height}px`
    this.spacing = `${spacing}px`
  }

  render() {
    const square = document.createElement("div")
    square.className = "square untouched"
    square.style.width = this.width
    square.style.height = this.height
    square.style.margin = this.spacing
    grid.appendChild(square)
  }
}
