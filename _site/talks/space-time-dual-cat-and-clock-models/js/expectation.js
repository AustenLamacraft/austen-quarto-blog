export function expectation() {
    let circuit = SVG('#gate')
    gate = circuit.findOne('#gate')

    const blue = '#5594c3'
    const red = '#d84141'

    // Hide original 
    const gateAndContractions = circuit.findOne('#gate-and-contractions').hide()
    

    // The four contractions
    const topLeft = circuit.findOne('#top-left')
    const topRight = circuit.findOne('#top-right')
    const bottomLeft = circuit.findOne('#bottom-left')
    const bottomRight = circuit.findOne('#bottom-right')
    
    const gateWidth = 20
    const gateHeight = 20

    const circuitWidth = 10
    const circuitDepth = 3

    gate.size(gateWidth)

    // Build the circuit

    for (let y = 0; y < circuitDepth; y++) {
        for (let x = 0; x < circuitWidth; x++) {
            if ((x + y) % 2 === 0) {
                gate.findOne('#rect826').css({fill: blue})
                gate.clone().dmove(gateWidth * x, gateHeight * (circuitDepth + y)).addTo(circuit)
                y === 0 && x === 4 && topLeft.clone().dmove(gateWidth * x, gateHeight * (circuitDepth + y)).addTo(circuit)
                gate.findOne('#rect826').css({fill: red})
                gate.clone().dmove(gateWidth * x, gateHeight * (circuitDepth -1 - y)).addTo(circuit)
            }
        }

    }


}




