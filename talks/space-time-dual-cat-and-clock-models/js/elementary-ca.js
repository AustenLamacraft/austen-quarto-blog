// Based on https://editor.p5js.org/lemonsquares/sketches/XtLvUvgAF
// All sketches in instance mode, to keep variables out of global scope
// https://p5js.org/examples/instance-mode-instantiation.html

export function elementary(p) {
    let col, rw, gen;
    const cellSize = 4
    let cells = [];
    
    let ruleNumber = 110
    let initial = "single 1"
    
    p.setup = function() {
        p.createCanvas(p.windowWidth / 2.5 , p.windowHeight / 2.5);
        p.noStroke();

        col = p.floor(p.width / cellSize);
        rw = p.floor(p.height / cellSize);

        const inp = p.createInput(String(ruleNumber))
            .parent("elementary-ca-demo")
            .style('font-size', '20px')
            .position(5, 5, 'absolute')
            .size(50)

        const setRule = function() {
            ruleNumber = Number(this.elt.value)
        }

        inp.input(setRule);

        const initialCondition = p.createSelect()
            .parent("elementary-ca-demo")
            .style('font-size', '20px')
            .position(5, 50, 'absolute')
            .size(100)
            
        initialCondition.option('single 1')
        initialCondition.option('random')
        
        const setInitial = function() {
            initial = initialCondition.value();
        }

        initialCondition.changed(setInitial);
        reset();

        

    }

    function reset() {
        // set cell to random val
        for (let i = 0; i < col; i++) {
            (initial == "single 1")
                ? cells[i] = (i != p.floor(col / 2)) ? "0" : "1"
                : cells[i] = p.floor(p.random(2));
        }

        gen = 0;
    }

    p.draw = function() {
        for (let i = 0; i < col; i++) {
            let cell = cells[i];
            p.fill(cell * 255, cell * 150, 255);
            p.rect(i * cellSize, gen * cellSize, cellSize, cellSize );
        }
        gen++;

        // if the screen is not filled
        if (gen < rw) {
            let newcells = [];
            // convert rule to rule set 
            const rule = ruleNumber.toString(2).padStart(8, '0').split("").reverse()
            for (let i = 0; i < col; i++) {
                let left = i > 0 ? cells[i - 1] : cells[cells.length - 1]
                let centre = cells[i];
                let right = i < cells.length - 1 ? cells[i + 1] : cells[0]
                
                newcells[i] = rule[parseInt(String(left) + String(centre) + String(right), 2)];
            }
            
            cells = newcells;
        } else {
            reset();
        }
    }

}

