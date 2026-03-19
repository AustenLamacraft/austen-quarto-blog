SVG.on(document, 'DOMContentLoaded', function() {
    let circuit = SVG('#gate')
    gate = circuit.findOne('#gate')
    
    const purple = '#9f6397ff'
    gate.findOne('#rect826').css({fill: purple})
    // Hide original 
    const gateAndContractions = circuit.findOne('#gate-and-contractions').hide()


    // The four dots
    const topLeft = circuit.findOne('#top-left')
    const topRight = circuit.findOne('#top-right')
    const bottomLeft = circuit.findOne('#bottom-left')
    const bottomRight = circuit.findOne('#bottom-right')
    
    // Two semicircles
    const semiTopLeft = circuit.findOne('#semi-top-left')
    const semiTopRight = circuit.findOne('#semi-top-right')

    const gateWidth = 20
    const gateHeight = 20

    const circuitWidth = 10
    const circuitDepth = 4

    const topContractions = [true, true, true, true, false, true, true, true, true, true]

    gate.size(gateWidth)

    let unitarityApplied = false

    // Build the circuit
    let gates = []

    const buildCircuit = function() {
        for (let y = 0; y < circuitDepth; y++) {
            let gateRow = []
            for (let x = 0; x < circuitWidth; x++) {
                if ((x + y) % 2 === 0) {
                    const newGate = {
                        gate: gate.clone().dmove(gateWidth * x, gateHeight * y).addTo(circuit),
                        topLeft: topLeft.clone().dmove(gateWidth * x, gateHeight * y).addTo(circuit).hide(),
                        topRight: topRight.clone().dmove(gateWidth * x, gateHeight * y).addTo(circuit).hide(),
                        bottomLeft: bottomLeft.clone().dmove(gateWidth * x, gateHeight * y).addTo(circuit).hide(),
                        bottomRight: bottomRight.clone().dmove(gateWidth * x, gateHeight * y).addTo(circuit).hide(),
                        // semicirles had been flipped, which is the reason for inverted y
                        semiTopRight: semiTopRight.clone().dmove(gateWidth * x, -gateHeight * y).addTo(circuit).hide(),
                        semiTopLeft: semiTopLeft.clone().dmove(gateWidth * x, -gateHeight * y).addTo(circuit).hide()
                    }
                    gateRow[x] = newGate
                }
            }
            gates.push(gateRow)
        }

            // Fix the top contractions (gates on even indices)
        gates[0].forEach((gate, idx) => {
            if (idx % 2 === 0) {
                topContractions[idx] && gate.semiTopLeft.show();
                topContractions[idx + 1] && gate.semiTopRight.show()
                
            }
        })
    }

    buildCircuit()
    
    // Propagate contractions downwards

    circuit.click(function() {
        if (!unitarityApplied) {
            gates.forEach((row, y) => {
                row.forEach((gate, x) => {
                    if ((x + y) % 2 === 0) {
                        if ((x === 0 || gate.semiTopLeft.visible()) && ((x === circuitWidth - 1) || gate.semiTopRight.visible())) {
                            gate.semiTopLeft.hide()
                            gate.semiTopRight.hide()
                            gate.gate.hide()
                            if (y < circuitDepth - 1)  {
                                x < circuitWidth - 1 && gates[y + 1][x + 1].semiTopLeft.show()
                                x > 0 && gates[y + 1][x - 1].semiTopRight.show()
                            }
                        }
                    }
                })
            })
            unitarityApplied = true
        } else {
            removeCircuit()
            buildCircuit()
            unitarityApplied = false
        }
        
    })

    const removeCircuit = function() {
        for (let y = 0; y < circuitDepth; y++) {
            for (let x = 0; x < circuitWidth; x++) {
                if ((x + y) % 2 === 0) {
                    Object.values(gates[y][x]).forEach(val => val.remove())
                }
            }
        }
        gates = []
    }

})




