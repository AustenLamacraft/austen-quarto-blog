// All sketches in instance mode, to keep variables out of global scope
// https://p5js.org/examples/instance-mode-instantiation.html


// Floquet–East model

export default function fe(p) {

    let col, rw, gen;
    const cellSize = 1
    let cells = []; 
    let prob = 0.1
    
    const inputs = ["00", "01", "10", "11"]  
    const feOutputs = ["00", "11", "10", "01"] 
    
    p.setup = function() {
        p.createCanvas(p.windowWidth / 1.5, p.windowHeight / 2.5);
        p.noStroke();

        col = p.floor(p.width / cellSize) - 1;
        rw = p.floor(p.height / cellSize);

        const inp = p.createInput(String(prob));
        inp.style('font-size', '20px')
        inp.parent("fe")
        inp.position(5, 5, 'absolute');
        inp.size(50);

        const setRule = function() {
            prob = Number(this.elt.value)
        }

        inp.input(setRule);

        reset();

        

    }

    function reset() {
        // set cell to random val
        for (let i = 0; i < col; i++) {
            cells[i] = p.floor(p.random(2));
        }

        gen = 0;
    }

    p.draw = function() {
        for (let i = 0; i < col; i++) {
            p.fill(255, cells[i] * 255, cells[i] * 255);        
            p.rect(i * cellSize, gen * cellSize, cellSize, cellSize );
        }
        gen++;

        // if the screen is not filled
        if (gen < rw) {
            let newcells = [];
            
            for (let i = (gen % 2); i < col; i = i + 2) {
                // These are the cells that will be updated
                newcells[i] = []
                newcells[(i < col - 1) ? i + 1 : 0] = []
               
 
                // Update the two copies

                let left = cells[i]
                let right = i < cells.length - 1 ? cells[i + 1] : cells[0];
                
                const output = feOutputs[parseInt(String(left) + String(right), 2)].split("")
                newcells[i] = p.random() < prob ? 0 : output[0]
                newcells[(i < col - 1) ? i + 1 : 0] = p.random() < prob ? 0 : output[1]

            }
            cells = newcells;
        } else {
            reset();
        }
    }

}
