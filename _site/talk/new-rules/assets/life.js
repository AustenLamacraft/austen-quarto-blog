// https://p5js.org/examples/simulate-game-of-life.html
// All sketches in instance mode, to keep variables out of global scope
// https://p5js.org/examples/instance-mode-instantiation.html
const life = function(p) {

  let w;
  let columns;
  let rows;
  let board;
  let next;

  p.setup = function() {
    p.createCanvas(p.windowWidth / 2.5, p.windowHeight / 2.5);
    w = 20;
    // Calculate columns and rows
    columns = p.floor(p.width / w);
    rows = p.floor(p.height / w);
    // Wacky way to make a 2D array is JS
    board = new Array(columns);
    for (let i = 0; i < columns; i++) {
      board[i] = new Array(rows);
    }
    // Going to use multiple 2D arrays and swap them
    next = new Array(columns);
    for (i = 0; i < columns; i++) {
      next[i] = new Array(rows);
    }
    fillBoard();
  }

  p.draw = function() {
    p.background(255);
    generate();
    for ( let i = 0; i < columns;i++) {
      for ( let j = 0; j < rows;j++) {
        if ((board[i][j] == 1)) p.fill(0);
        else p.fill(255);
        p.stroke(0);
        p.rect(i * w, j * w, w-1, w-1);
      }
    }

  }

  // reset board when mouse is pressed
  p.mousePressed = function() {
    fillBoard();
  }

  // Fill board randomly
  function fillBoard() {
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        // Lining the edges with 0s
        if (i == 0 || j == 0 || i == columns-1 || j == rows-1) board[i][j] = 0;
        // Filling the rest randomly
        else board[i][j] = p.floor(p.random(2));
        next[i][j] = 0;
      }
    }
  }

  // The process of creating the new generation
  function generate() {

    // Loop through every spot in our 2D array and check spots neighbors
    for (let x = 1; x < columns - 1; x++) {
      for (let y = 1; y < rows - 1; y++) {
        // Add up all the states in a 3x3 surrounding grid
        let neighbors = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            neighbors += board[x+i][y+j];
          }
        }

        // A little trick to subtract the current cell's state since
        // we added it in the above loop
        neighbors -= board[x][y];
        // Rules of Life
        if      ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = 0;           // Loneliness
        else if ((board[x][y] == 1) && (neighbors >  3)) next[x][y] = 0;           // Overpopulation
        else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;           // Reproduction
        else                                             next[x][y] = board[x][y]; // Stasis
      }
    }

    // Swap!
    let temp = board;
    board = next;
    next = temp;
  }

}

new p5(life, "life");
