let unitarity = new p5(( sketch ) => {

  let x = 100;
  let y = 100;

  sketch.setup = () => {
    sketch.createCanvas(200, 200);
    reset();
  };

  sketch.draw = () => {
    sketch.background(0);
    sketch.fill(255);
    sketch.stroke('red');
    sketch.strokeWeight(4);
    sketch.rect(x,y,50,50,10);
  };
}, "unitarity");


let box = new p5(( sketch ) => {

  let x = 100;
  let y = 100;

  sketch.setup = () => {
    sketch.createCanvas(200, 200);
  };

  sketch.draw = () => {
    sketch.background(0);
    sketch.fill(255);
    sketch.rect(x,y,50,150);
  };
}, "box");
