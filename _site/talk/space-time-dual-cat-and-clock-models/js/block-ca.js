// All sketches in instance mode, to keep variables out of global scope
// https://p5js.org/examples/instance-mode-instantiation.html


// Block cellular automaton with permutation blocks
// Take two copies of a CA and introduce a bit flip at the center of the initial condition


export function block(p) {

    let col, rw, gen;
    const cellSize = 2
    let cells = []; // will contain two copies of the system
    
    let blockNumber = 2 // From 0 to 23. 2 is SWAP
    let architecture = "single block"
    let view = "cell values"
    
    // https://stackoverflow.com/questions/9960908/permutations-in-javascript
    const permutator = (inputArr) => {
        let result = [];
    
        const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }
    permute(inputArr)
    return result;
    }

    const inputs = ["00", "01", "10", "11"]  
    const allBlocks = permutator(inputs)
    
    p.setup = function() {
        p.createCanvas(p.floor(p.windowWidth / 1.5), p.windowHeight / 2.5);
        p.noStroke();

        col = p.floor(p.width / cellSize) - 1;
        rw = p.floor(p.height / cellSize);

        const inp = p.createInput(String(blockNumber))
            .style('font-size', '20px')
            .parent("block")
            .position(5, 5, 'absolute')
        
        inp.size(50);

        const setRule = function() {
            blockNumber = Number(this.elt.value)
        }

        inp.input(setRule);

        const architectureSelector = p.createSelect()
            .style('font-size', '20px')
            .parent("block")
            .position(5, 50, "absolute")
            .size(170)

            
        architectureSelector.option('single block')
        architectureSelector.option('random')
        architectureSelector.option('random self-dual')
            
        const setArchitecture = function() {
            architecture = architectureSelector.value();
        }

        architectureSelector.changed(setArchitecture);

        const viewSelector = p.createSelect()
            .style('font-size', '20px')
            .parent("block")
            .position(5, 95, "absolute")
            .size(170)
            
        viewSelector.option("cell values")
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
            cells[i][1] = (i != p.floor(col / 2)) ? cells[i][0] : Number(!cells[i][0]) // Bit flip in the middle
        }

        gen = 0;
    }

    p.draw = function() {
        for (let i = 0; i < col; i++) {
            const [cell1, cell2] = cells[i];
            // const cell1 = cells[i][0]
            // const cell2 = cells[i][1]
            if (view == 'cell values') {
                (cell1 == cell2) ? p.fill(cell1 * 255, cell1 * 150, 255) : p.fill(255, cell1 * 255, cell1 * 255);
            }
            else {
                (cell1 == cell2) ? p.fill(255, 0, 255) : p.fill(0, 255, 255);
            }
    
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
                // blockNumber outside range gives random block
                const block = (blockNumber >= 0 && blockNumber < 24 && architecture == "single block") 
                    ? allBlocks[blockNumber]
                    : (architecture == "random") 
                        ? allBlocks[p.floor(p.random(24))]
                        : allBlocks[p.random([2,4,3,11,10,8,15,13,12,21,20,19])]
 
                // Update the two copies
                for (let j = 0; j < 2; j++) {
                    let left = cells[i][j]
                    let right = i < cells.length - 1 ? cells[i + 1][j] : cells[0][j];
                    
                    const output = block[parseInt(String(left) + String(right), 2)].split("")
                    newcells[i][j] = output[0]
                    newcells[(i < col - 1) ? i + 1 : 0][j] = output[1]
                }    
            }
            cells = newcells;
        } else {
            reset();
        }
    }

}
