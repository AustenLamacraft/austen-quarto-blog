// https://editor.p5js.org/techty/sketches/h7qwatZRb
let pieceCount = 2;
let grid;

function setup() {
  const canvas = createCanvas(300, 300);
  canvas.parent('jigsaw');
  rectMode(CENTER);
  createGrid();
  showGrid();
}

function mousePressed() {
  pieceCount++;
  createGrid();
  showGrid();
}

function createGrid() {
  grid = [];
  let pieceSize = width / pieceCount;
  for (let row = 0; row < pieceCount; row++) {
    grid[row] = [];
    for (let col = 0; col < pieceCount; col++) {
      let x = col * pieceSize + pieceSize * 0.5;
      let y = row * pieceSize + pieceSize * 0.5;

      grid[row][col] = new Piece(x, y, pieceSize, row + col < pieceCount);
    }
  }
  setBorder();
}

function setBorder() {
  for (let row = 0; row < pieceCount; row++) {
    for (let col = 0; col < pieceCount; col++) {
        if (row === 0) {
            grid[row][col].border[0] = 0;
          }
          if (col === 0) {
            grid[row][col].border[3] = 0;
          }
        if (col === (pieceCount - 1)) {
            grid[row][col].border[1] = 0;
            }
            if (row === (pieceCount - 1)) {
            grid[row][col].border[2] = 0;
            }

        if (row !== 0) {
            grid[row][col].border[0] = -(grid[row - 1][col].border[2]);
        }
        if (col !== 0) {
            grid[row][col].border[3] = -(grid[row][col - 1].border[1]);
        }
    }
  }
}

function showGrid() {
  background(255, 0, 100);
  for (let row = 0; row < pieceCount; row++) {
    for (let col = 0; col < pieceCount; col++) {
      grid[row][col].show();
    }
  }
}

class Piece {
  constructor(x, y, scl, fill) {
    this.x = x;
    this.y = y;
    this.scl = scl;
    this.fill = fill;

    // border[0] -> top
    // border[1] -> right
    // border[2] -> bottom
    // border[3] -> left
    // 1 = bulge out
    // -1 = bulge in
    // 0 = flat
    this.border = [];
    for (let i = 0; i < 4; i++) {
      this.border[i] = random([1, -1]);
    }
  }

  drawBorder(theta, out) {
    let startPoint = createVector(-0.5 * this.scl, -0.5 * this.scl);
    let endPoint = createVector(0.5 * this.scl, -0.5 * this.scl);
    let offsetX = this.scl * 0.35;
    let offsetY = -this.scl * 0.2;

    push();
    translate(this.x, this.y);
    rotate(theta);
    beginShape();
    curveVertex(startPoint.x, startPoint.y);
    curveVertex(startPoint.x, startPoint.y);
    curveVertex(startPoint.x + offsetX, startPoint.y);
    curveVertex(startPoint.x + offsetX, startPoint.y + out * offsetY);
    curveVertex(endPoint.x - offsetX, endPoint.y + out * offsetY);
    curveVertex(endPoint.x - offsetX, endPoint.y);
    curveVertex(endPoint.x, endPoint.y);
    curveVertex(endPoint.x, endPoint.y);
    endShape();
    pop();
  }

  show() {    
    noFill()
    stroke(255);
    strokeWeight(2)
    if (this.fill) {
        for (let i = 0; i < this.border.length; i++) {
            let theta = i * PI / 2;
            this.drawBorder(theta, this.border[i]);
        }
    }

  }
}