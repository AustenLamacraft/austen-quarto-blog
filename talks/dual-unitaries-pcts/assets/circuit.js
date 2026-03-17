

var circuit = SVG('#circuit')
var U = SVG('g#unitary')

U.dmove(-40,0)

let width = U.width()

let numWide = 5
let numDeep = 5

let blocks = []

for (let y = 0; y < numDeep; y++) {
    for (let x = 0; x < numWide; x++) {
        const newBlock = U.clone()
        newBlock.dmove(width * (2 * x + y % 2), width * y)
        newBlock.addTo(circuit)
    } 
}


