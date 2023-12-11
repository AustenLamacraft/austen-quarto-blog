

export default function faModel(p) {
  var w;
  var columns;
  var rows;
  var board;
  var next;

  p.setup = function() {
    p.createCanvas(400, 400);
    w = 4;
    // Calculate columns and rows
    columns = p.floor(p.width/w);
    rows = p.floor(p.height/w);
    // Wacky way to make a 2D array is JS
    board = new Array(columns);
    for (var i = 0; i < columns; i++) {
      board[i] = new Array(rows);
    }
    // Going to use multiple 2D arrays and swap them
    next = new Array(columns);
    for (i = 0; i < columns; i++) {
      next[i] = new Array(rows);
    }
    p.init();
  }

  p.draw = function() {
    p.background(255);
    generate();
    for ( var i = 0; i < columns;i++) {
      for ( var j = 0; j < rows;j++) {
        if ((board[i][j] == 1)) p.fill(0);
        else p.fill(255);
        p.stroke(0);
        p.rect(i*w, j*w, w, w);
      }
    }

  }

  // reset board when mouse is pressed
  p.mousePressed = function() {
    p.init();
  }

  // Board is empty excep for 1 in the middle
  p.init = function() {
    for (var i = 0; i < columns; i++) {
      for (var j = 0; j < rows; j++) {
        board[i][j] = 0
        next[i][j] = 0;
        board[p.floor(p.width/(2*w))][p.floor(p.height/(2*w))] = 1
      }
    }
  }

  // The process of creating the new generation
  function generate() {

    // Loop through every spot in our 2D array and check spots neighbors
    for (var x = 1; x < columns - 1; x++) {
      for (var y = 1; y < rows - 1; y++) {
        // Add up all the states in a 3x3 surrounding grid
        var neighbors = 0;
        for (var i = -1; i <= 1; i++) {
          for (var j = -1; j <= 1; j++) {
            neighbors += board[x+i][y+j];
          }
        }

        // A little trick to subtract the current cell's state since
        // we added it in the above loop
        neighbors -= board[x][y];

        if (neighbors >  0) next[x][y] = (Math.random() >= 0.5); // FA update
      }
    }

    // Swap!
    var temp = board;
    board = next;
    next = temp;

    if (board[1][1] == 1) {
      p.init();
    }
  }

}
