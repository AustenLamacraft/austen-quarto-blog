SVG.on(document, 'DOMContentLoaded', function() {
    let circuit = SVG('#purple-gate')
    let gate = circuit.findOne('#gate')
    let gateBody = gate.findOne('#gate-body')
    let pair = gate.findOne('#pair')

    
    // Hide original 
    gate.hide()

    const gateWidth = 1.5
    const gateHeight = 1.5
    gateBody.size(gateWidth)
    pair.size(gateWidth)


    // circles
    const circleWidth = 0.3
    const topLeft = gate.findOne('#circle-top-left').size(circleWidth)
    const topRight = topLeft.clone().dmove(gateWidth, 0).addTo(circuit).hide()
    const bottomLeft = topLeft.clone().dmove(0, gateHeight).addTo(circuit).hide()
    const bottomRight = topLeft.clone().dmove(gateWidth, gateHeight).addTo(circuit).hide()

    
    const circuitWidth = 16
    const circuitDepth = 3

    const topContractions = [true, true, true, true, false, false, false, false, false, false, false, false, true, true, true, true]

    
    // Build the circuit
    let gates = []

    for (let y = 0; y < circuitDepth; y++) {
        let gateRow = []
        for (let x = 0; x < circuitWidth; x++) {
            if ((x + y) % 2 === 0) {
                const newGate = {
                    gate: (y != circuitDepth - 1) 
                        ? gateBody.clone().dmove(gateWidth * x, gateHeight * y).addTo(circuit)
                        : pair.clone().dmove(gateWidth * x, gateHeight * y).addTo(circuit),
                    // semicircles had been flipped, which is the reason for inverted y
                    topRight: topRight.clone().dmove(gateWidth * x, gateHeight * y).addTo(circuit).hide(),
                    topLeft: topLeft.clone().dmove(gateWidth * x, gateHeight * y).addTo(circuit).hide(),
                    bottomRight: bottomRight.clone().dmove(gateWidth * x, gateHeight * y).addTo(circuit).hide(),
                    bottomLeft: bottomLeft.clone().dmove(gateWidth * x, gateHeight * y).addTo(circuit).hide()
                }
                gateRow[x] = newGate
            }
        }
        gates.push(gateRow)
    }

    // Fix the top contractions (gates on even indices)
    gates[0].forEach((gate, idx) => {
        if (idx % 2 === 0) {
            topContractions[idx] && gate.topLeft.show();
            topContractions[idx + 1] && gate.topRight.show()
        }
    })
    
    // Propagate contractions
    let unitarityUsed = false

    circuit.click(function() {
        if (!unitarityUsed) {
            gates.forEach((row, y) => {
                row.forEach((gate, x) => {
                    if ((x === 0 || gate.topLeft.visible()) && ((x === circuitWidth - 1) || gate.topRight.visible())) {
                        gate.topLeft.hide()
                        gate.topRight.hide()
                        gate.gate.hide()
                        if (y < circuitDepth - 1)  {
                            x < circuitWidth - 1 && gates[y + 1][x + 1].topLeft.show()
                            x > 0 && gates[y + 1][x - 1].topRight.show()
                        }
                    }
                })
            })
            
            unitarityUsed = true
        }
        else {
            let gateRemoved = false
            gates.forEach((row, y) => {
                row.forEach((gate, x) => {
                    if (!gateRemoved) {
                        if (gate.topLeft.visible() && (gate.bottomLeft.visible() || y === circuitDepth - 1)) {
                            gate.gate.hide()
                            gate.bottomLeft.hide()
                            gate.topLeft.hide()
                            y - 1 >= 0 && gates[y - 1][x + 1].bottomLeft.show()
                            y + 1 < circuitDepth && gates[y + 1][x + 1].topLeft.show()
                            gateRemoved = true
                        }
                        if (gate.topRight.visible() && (gate.bottomRight.visible() || y === circuitDepth - 1)) {
                            gate.gate.hide()
                            gate.bottomRight.hide()
                            gate.topRight.hide()
                            y - 1 >= 0 && gates[y - 1][x - 1].bottomRight.show()
                            y + 1 < circuitDepth && gates[y + 1][x - 1].topRight.show()
                            gateRemoved = true
                        }
                    }
                })
            })
        }
    })

})




