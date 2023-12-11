// Based on https://editor.p5js.org/lemonsquares/sketches/XtLvUvgAF
// All sketches in instance mode, to keep variables out of global scope
// https://p5js.org/examples/instance-mode-instantiation.html

// Take two copies of a CA and introduce a bit flip at the center of the initial condition

export default function difference(p) { 
    let col, rw, gen;
    const cellSize = 4
    let cells = []; // will contain two copies of the system
    
    let ruleNumber = 30
    
    p.setup = function() {
        p.createCanvas(p.windowWidth / 2.5, p.windowHeight / 2.5);
        p.noStroke();

        col = p.floor(p.width / cellSize);
        rw = p.floor(p.height / cellSize);

        const inp = p.createInput(String(ruleNumber))
            .parent("difference")
            .style('font-size', '20px')
            .position(5, 5, 'absolute')
            .size(50)
            

        const setRule = function() {
            ruleNumber = Number(this.elt.value)
        }

        inp.input(setRule);
        reset();

        

    }

    function reset() {
        // set cell to random val
        for (let i = 0; i < col; i++) {
            cells[i] = []
            cells[i][0] = p.floor(p.random(2));
            cells[i][1] = (i != p.floor(col / 2)) ? cells[i][0] : Number(!cells[i][0]) // Bit flip in the middle
        }

        gen = 0;
    }

    p.draw = function() {
        for (let i = 0; i < col; i++) {
            const [cell1, cell2] = cells[i];
            (cell1 == cell2) ? p.fill(cell1 * 255, cell1 * 150, 255) : p.fill(255, cell1 * 255, cell1 * 255);
            p.rect(i * cellSize, gen * cellSize, cellSize, cellSize );
        }
        gen++;

        // if the screen is not filled
        if (gen < rw) {
            let newcells = [];
            
            for (let i = 0; i < col; i++) {
                newcells[i] = []
                // convert rule to rule set
                // -1 gives Kaufmann PCA
                const rule = (ruleNumber != -1) 
                    ? ruleNumber.toString(2).padStart(8, '0').split("").reverse()
                    : Array(8).fill(undefined).map(() => p.random(['0', '1']))
                for (let j = 0; j < 2; j++) {
                    let left = i > 0 ? cells[i - 1][j] : cells[cells.length - 1][j]
                    let centre = cells[i][j];
                    let right = i < cells.length - 1 ? cells[i + 1][j] : cells[0][j]
                    newcells[i][j] = rule[parseInt(String(left) + String(centre) + String(right), 2)];
                }    
            }
            
            cells = newcells;
        } else {
            reset();
        }
    }

}
