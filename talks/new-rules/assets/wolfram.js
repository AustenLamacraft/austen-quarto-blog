// https://editor.p5js.org/lemonsquares/sketches/XtLvUvgAF
// All sketches in instance mode, to keep variables out of global scope
// https://p5js.org/examples/instance-mode-instantiation.html
const wolfram = function(p) {

    var col, rw, gen;
    var cells = [];
    var cells2 = [];


    p.setup = function() {
        p.createCanvas(500, 300);
        p.noStroke();

        col = p.floor(p.windowWidth);
        rw = p.floor(p.windowHeight);

        reset();
    }

    function reset() {
        // set cell to random val
        for (let i = 0; i < col; i++) {
            cells[i] = p.floor(p.random(2));
        }
        cells2 = 0;
        gen = 0;
    }

    p.draw = function() {
        for (let i = 0; i < col; i++) {
            let cell = cells[i];
            p.fill(cell * 255, cell * 150, 255);
            p.rect(i, gen, 1, 1);
        }
        gen++;

        // if the screen is not filled
        if (gen < rw) {
            let newcells = [];
            for (let i = 0; i < col; i++) {
            let left = cells[i - 1];
            let centre = cells[i];
            let right = cells[i + 1];
            let lfsk = cells2[i - 1];
            let ctrsk = cells2[i];
            let rgtsk = cells2[i + 1];

            newcells[i] = rule(left, centre, right, lfsk, ctrsk, rgtsk);
            }
            cells2 = cells;
            cells = newcells;
        } else {
            reset();
        }
    }

    function rule(left, centre, right, lfsk, ctrsk, rgtsk) {
        if (left == undefined) {
            return centre;
        } else if (right == undefined) {
            return centre;
        } else if (lfsk == undefined) {
            return centre;
        } else if (ctrsk == undefined) {
            return centre;
        } else if (rgtsk == undefined) {
            return centre;

        } else if ((lfsk + ctrsk + rgtsk) > (left + centre + right)) {
            return 0;
        } else if (lfsk == rgtsk) {
            return 0;
        } else if (left == 1 || centre == 1 || right == 1) {
            return 1;
        } else if (lfsk == 1 && ctrsk == 1 && rgtsk == 1) {
            return 0;
        } else if (lfsk == 1 && ctrsk == 1 && rgtsk == 0) {
            return 1;
        } else if (lfsk == 1 && ctrsk == 0 && rgtsk == 1) {
            return right;
        } else if (lfsk == 1 && ctrsk == 0 || rgtsk == 0) {
            return 1;
        } else if (lfsk == 0 && ctrsk == 1 && rgtsk == 1) {
            return centre;
        } else if (lfsk == 0 && ctrsk == 1 && rgtsk == 0) {
            return 0;
        } else if (lfsk == 0 && ctrsk == 0 && rgtsk == 1) {
            return 1;
        } else if (lfsk == 0 && ctrsk == 0 && rgtsk == 0) {
            return 0;
        } else return 0;
    }
}

new p5(wolfram, "wolfram");
