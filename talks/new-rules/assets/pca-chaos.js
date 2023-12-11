// Based on https://editor.p5js.org/lemonsquares/sketches/XtLvUvgAF
// All sketches in instance mode, to keep variables out of global scope
// https://p5js.org/examples/instance-mode-instantiation.html

// Take two copies of a CA and introduce a bit flip at the center of the initial condition
// We use PCA in 1d with K=4 in order to see transition following Derrida and Stauffer
// Note Derrida and Stauffer don't include the center site

const pca = function(p) {

    let col, rw, gen;
    const cellSize = 2
    let cells = []; // will contain two copies of the system

    let prob = 0.5
    let initialCondition = 'site'
    let view = 'cell values'
    
    p.setup = function() {
        p.createCanvas(p.windowWidth / 1.5, p.windowHeight / 2.5);
        p.noStroke();

        col = p.floor(p.width / cellSize);
        rw = p.floor(p.height / cellSize);

        const inp = p.createInput(prob);
        inp.style('font-size', '20px')
        inp.parent("pca-chaos")
        inp.position(5, 5, 'absolute');
        inp.size(50);

        const setRule = function() {
            prob = Number(this.elt.value)
        }

        inp.input(setRule);

        const sel = p.createSelect()
            .style('font-size', '20px')
            .parent("pca-chaos")
            .position(5, 50, "absolute")
            .size(80)
            
        
        sel.option('site')
        sel.option('row')
            
        const setInitialConditions = function() {
            initialCondition = sel.value();
        }

        sel.changed(setInitialConditions);

        const viewSelector = p.createSelect()
            .style('font-size', '20px')
            .parent("pca-chaos")
            .position(5, 95, 'absolute')
            .size(125)
            
        viewSelector.option('cell values')
        viewSelector.option('differences')
        
        const setView = function() {
            view = viewSelector.value();
        }

        viewSelector.changed(setView);


        reset();
    }

    function reset() {
        // set cell to random val
        for (let i = 0; i < col; i++) {
            cells[i] = []
            cells[i][0] = p.floor(p.random(2));
            (initialCondition == "row") 
                ?  cells[i][1] = p.floor(p.random(2))
                :  cells[i][1] = (i != p.floor(col / 2)) ? cells[i][0] : Number(!cells[i][0]) // Bit flip in the middle
        }

        gen = 0;
    }

    p.draw = function() {
        for (let i = 0; i < col; i++) {
            const [cell1, cell2] = cells[i];
            if (view == 'cell values') {
                (cell1 == cell2) ? p.fill(cell1 * 255, cell1 * 150, 255) : p.fill(255, cell1 * 255, cell1 * 255);
            }
            else {
                (cell1 == cell2) ? p.fill(255, 0, 255) : p.fill(0, 255, 255);
            }
            // (cell1 == cell2) ? p.fill(255, 0, 255) : p.fill(0, 255, 255);
            p.rect(i * cellSize, gen * cellSize, cellSize, cellSize );
        }
        gen++;

        // if the screen is not filled
        if (gen < rw) {
            let newcells = [];
            
            for (let i = 0; i < col; i++) {
                newcells[i] = []
                const rule = Array(16).fill(undefined).map(() => (p.random() > prob ? '0' :'1'))
                for (let j = 0; j < 2; j++) {
                    let farLeft = i > 1 ? cells[i - 2][j] : cells[cells.length - 1 - i][j]
                    let left = i > 0 ? cells[i - 1][j] : cells[cells.length - 1][j]
                    // let centre = cells[i][j];
                    let right = i < cells.length - 1 ? cells[i + 1][j] : cells[0][j]
                    let farRight = i < cells.length - 2 ? cells[i + 2][j] : cells[cells.length - i - 1][j]
                    newcells[i][j] = rule[parseInt(String(farLeft) + String(left) + String(right) + String(farRight), 2)];
                }    
            }
            
            cells = newcells;
        } else {
            reset();
        }
    }

}

new p5(pca, "pca-chaos");
