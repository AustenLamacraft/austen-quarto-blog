// All sketches in instance mode, to keep variables out of global scope
// https://p5js.org/examples/instance-mode-instantiation.html


// Block cellular automaton with permutation blocks
// Take two copies of a CA and introduce a bit flip at the center of the initial condition


export default function threeComponent(p) {

    let col, rw, gen;
    const cellSize = 4
    let cells = []; // will contain two copies of the system
    
    let view = "cell values"
    let model = "C1"

    // This are models from Borsi and Pozgay Phys. Rev. B 106, 014302
    let models = [] 
    models["C1"] = ["21", "11", "02", "12", "22", "01", "10", "20", "00"]
    models["C2"] = ["02", "12", "22", "20", "01", "11", "21", "10", "00"]
    models["I1"] = ["00", "20", "10", "01", "12", "22", "02", "11", "21"]
    models["I2"] = ["00", "10", "20", "01", "21", "11", "02", "12", "22"]
    models["E1"] = ["21", "11", "02", "20", "10", "01", "12", "22", "00"]
    models["E2"] = ["00", "21", "10", "22", "02", "12", "01", "20", "11"]
    models["Linear"] = ["00", "12", "21", "11", "20", "02", "22", "01", "10"]
    
    const colors = ["red", "green", "blue"]
    
    p.setup = function() {
        p.createCanvas(p.windowWidth / 1.5, p.windowHeight / 2.5);
        p.noStroke();

        col = 2 * p.floor(p.width / (2 * cellSize)); // Number of columns must be even
        rw = p.floor(p.height / cellSize);

        const viewSelector = p.createSelect()
            .style('font-size', '20px')
            .parent("three-component")
            .position(5, 5, "absolute")
            .size(120)
            
        viewSelector.option("cell values")
        viewSelector.option('differences')
        
        const setView = function() {
            view = viewSelector.value();
        }

        viewSelector.changed(setView);

        const modelSelector = p.createSelect()
        .style('font-size', '20px')
        .parent("three-component")
        .position(5, 50, "absolute")
        .size(80)
        
        modelSelector.option("C1")
        modelSelector.option("C2")
        modelSelector.option("I1")
        modelSelector.option("I2")
        modelSelector.option("E1")
        modelSelector.option("E2")
        modelSelector.option("Linear")
        
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
            cells[i][0] = p.floor(p.random(3));
            cells[i][1] = (i != p.floor(col / 2)) ? cells[i][0] : (cells[i][0] + 1) % 3 // Bit flip in the middle
        }
        gen = 0;
    }

    p.draw = function() {
        for (let i = 0; i < col; i++) {
            const [cell1, cell2] = cells[i];
            if (view == 'cell values') {
                p.fill(colors[cell1])
            }
            else {
                // See https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
                p.fill(colors[(((cell1 - cell2) % 3) + 3) % 3])
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
                
                const block = models[model]
 
                // Update the two copies
                for (let j = 0; j < 2; j++) {
                    let left = cells[i][j]
                    let right = i < cells.length - 1 ? cells[i + 1][j] : cells[0][j];
                    
                    const output = block[parseInt(String(left) + String(right), 3)].split("")
                    newcells[i][j] = Number(output[0])
                    newcells[(i < col - 1) ? i + 1 : 0][j] = Number(output[1])
                    
                }    
            }
            
            cells = newcells;
        } else {
            reset();
        }
    }

}
