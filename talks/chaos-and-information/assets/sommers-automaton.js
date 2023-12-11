// All sketches in instance mode, to keep variables out of global scope
// https://p5js.org/examples/instance-mode-instantiation.html


// Self dual Clifford cellular automata
// These models are from arXiv:2210.10808
// They are
// 1. "Bare" iSWAP 
// 2. Non-fractal good scrambling (Section IV.D.1)
// 3. Fractal good scrambling (Section IV.D.2)
// 4. Self-dual kicked Ising (Section IV.D.3) 

const iSWAP = math.matrix([[0, 0, 1, 0], [1, 0, 1, 1], [1, 0, 0, 0], [1, 1, 1, 0]])

const models = {
    "iSWAP":    iSWAP,
    "NFGS":     math.multiply(iSWAP, 
                    math.matrix([[1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 1, 1], [0, 0, 0, 1]])),
    "FGS":      math.multiply(iSWAP, 
                    math.matrix([[1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 1], [0, 0, 1, 1]])),
    "SDKI":     math.multiply(iSWAP, 
                     math.matrix([[0, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 1], [0, 0, 1, 1]])),
}

const siteVectors = {
    "1": [0, 0],
    "X": [1, 0],
    "Y": [1, 1],
    "Z": [0, 1]
}

const states = {
    "[0, 0]": "1",
    "[1, 0]": "X",
    "[1, 1]": "Y",
    "[0, 1]": "Z"
}

const colors = {
    "1": "black",
    "X": "red",
    "Y": "green",
    "Z": "blue"
}


function update([s1, s2], M) {
    let twoSiteVector = siteVectors[s1].concat(siteVectors[s2])
    twoSiteVector = math.multiply(M, twoSiteVector).map(elem => elem % 2)

    const s1Vect = math.subset(twoSiteVector, math.index([0,1]))
    const s2Vect = math.subset(twoSiteVector, math.index([2,3]))
    return [states[String(s1Vect)], states[String(s2Vect)]]
}

export default function sommers(p) {

    let col, rw, gen;
    const cellSize = 2
    let cells = []; // will contain two copies of the system
    
    let view = "cell values"
    let model = "iSWAP"
    
    const states = ["1", "X", "Y", "Z"]
    
    p.setup = function() {
        p.createCanvas(p.windowWidth / 1.5, p.windowHeight / 2.5);
        p.noStroke();

        col = 2 * p.floor(p.width / (2 * cellSize)); // Number of columns must be even
        rw = p.floor(p.height / cellSize);

        const modelSelector = p.createSelect()
        .style('font-size', '20px')
        .parent("sommers")
        .position(5, 4, "absolute")
        .size(100)
        
        modelSelector.option("iSWAP")
        modelSelector.option("NFGS")
        modelSelector.option("FGS")
        modelSelector.option("SDKI")
        
        const setModel = function() {
            model = modelSelector.value();
        }

        modelSelector.changed(setModel);

        reset();

    }

    function reset() {
        // set cells to random values
        for (let i = 0; i < col; i++) {
            cells[i] = []
            cells[i][0] = (i != p.floor(col / 2)) ? "1" : states[p.floor(p.random(3) + 1)] //states[p.floor(p.random(4))];
            cells[i][1] = cells[i][0]//(i != p.floor(col / 2)) ? cells[i][0] : (cells[i][0] + 1) % 4 // Bit flip in the middle
        }
        gen = 0;
    }

    p.draw = function() {
        for (let i = 0; i < col; i++) {
            const [cell1, cell2] = cells[i];
            p.fill(colors[cell1])
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
                for (let j = 0; j < 2; j++) {
                    let left = cells[i][j]
                    let right = i < cells.length - 1 ? cells[i + 1][j] : cells[0][j];
                    const output = update([left, right], models[model])
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

