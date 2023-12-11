var circuit = SVG('#unfolded-rho')
var U = SVG('g#g960')
var Ud = SVG('g#g1162')

// U.dmove(-40,0)

let width = U.width()

U.scale(0.75)
Ud.scale(0.75)

let numWide = 5
let numDeep = 3

let blocks = []

for (let y = 0; y < numDeep; y++) {
    for (let x = 0; x < numWide; x++) {
        const newBlock = U.clone()
        newBlock.dmove(width * (2 * x + y % 2), width * y)
        newBlock.addTo(circuit)
    } 
}

Ud.dmove(0, numDeep * width + 20)

for (let y = 0; y < numDeep; y++) {
    for (let x = 0; x < numWide; x++) {
        const newBlock = Ud.clone()
        newBlock.dmove(width * (2 * x + y % 2), width * y)
        newBlock.addTo(circuit)
    } 
}

var rho = SVG('g#g67')

rho.dmove(30, 25)