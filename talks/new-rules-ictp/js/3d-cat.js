// Based on https://p5js.org/examples/simulate-game-of-life.html
// Modifed for cat map dynamics, so the state of a site is an array of length 2
// All sketches in instance mode, to keep variables out of global scope
// https://p5js.org/examples/instance-mode-instantiation.html
export function threeDCat(p) {

    let w;
    let columns;
    let rows;
    let board;
    let next;
  
    const alpha = 1
    const delta = 0
    const modulus = 2 // Local Hilbert space dimension

    function mod(n) {
        return ((n % modulus) + modulus) % modulus;
    }

    p.setup = function() {
      p.createCanvas(p.windowWidth / 2.5, p.windowHeight / 2.5);
      w = 10;
      // Calculate columns and rows
      columns = p.floor(p.width / w);
      rows = p.floor(p.height / w);
      // Wacky way to make a 2D array in JS
      board = new Array(columns);
      for (let i = 0; i < columns; i++) {
        board[i] = new Array(rows);
      }
      // Going to use multiple 2D arrays and swap them
      next = new Array(columns);
      for (let i = 0; i < columns; i++) {
        next[i] = new Array(rows);
      }
      fillBoard();
    }
  
    p.draw = function() {
        p.frameRate(2)
      p.background(255);
      generate();
      for ( let i = 0; i < columns;i++) {
        for ( let j = 0; j < rows;j++) {
            // Plot the a's
          if (board[i][j][0] == 1) {
            p.fill(0);
          } 
          else {
            p.fill(255);
          }
          p.stroke(0);
          p.rect(i * w, j * w, w-1, w-1);
        }
      }
  
    }
  
    // reset board when mouse is pressed
    p.mousePressed = function() {
      fillBoard();
    }
  
    // start with a single [0, 1]
    function fillBoard() {
      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          // Lining the edges with 0s
        //   if (i == 0 || j == 0 || i == columns-1 || j == rows-1) {
        //     board[i][j] = [0, 0];
        //   }
          // Filling the rest randomly
        //   else {
        //     board[i][j] = [p.random([0, 1]), p.random([0, 1])];
        //   }
            // if ((i === p.floor(columns / 2)) && (j === p.floor(rows / 2))) {
            if ((i === p.floor(columns / 2)) && (j === p.floor(rows / 2))) {
                board[i][j] = [0, 1];
            }
            else {
                board[i][j] = [0, 0];
            }
            next[i][j] = [0, 0];
        }
      }
    }
  
    // The process of creating the new generation
    function generate() {

      for (let x = 1; x < columns - 1; x++) {
        for (let y = 1; y < rows - 1; y++) {
            // Cat model dynamics
            next[x][y][0] = mod(alpha * (board[x][y][0] - board[x][y + 1][1] - board[x][y - 1][1] - board[x + 1][y][1]- board[x - 1][y][1]) + (alpha * delta - 1) * board[x][y][1])
            next[x][y][1] = mod(board[x][y][0] - board[x][y + 1][1] - board[x][y - 1][1] - board[x + 1][y][1]- board[x - 1][y][1] + delta * board[x][y][1])        
        }
      }

      // Swap!
      let temp = board;
      board = next;
      next = temp;
    }
  
}

  