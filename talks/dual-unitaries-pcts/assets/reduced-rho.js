
var reducedRho = SVG('#folded-rho')

var scaleFactor = 0.75
let numWide = 10
let numDeep = 4
let startRho = 2
let endRho = 4

var contractedUUd = reducedRho.findOne('g#g11641')
contractedUUd.scale(scaleFactor)


var UUd = contractedUUd.findOne('g#g344')
var U = UUd.findOne("g#g960")
var contraction = contractedUUd.findOne('g#g11283')


let width = U.width()
let height = U.height()

let blocks = []

for (let y = 0; y < numDeep; y++) {
    blocks.push([])
    for (let x = 0; x < numWide; x++) {
        const newBlock = contractedUUd.clone()
        newBlock.dmove(width * (2 * x + y % 2), height * y)
        newBlock.addTo(reducedRho)
        const [topContraction, bottomContraction, Us] = newBlock.children()
        bottomContraction.attr({visibility: 'hidden'})
        
        // The region of the reduced density matrix
        if ((y!==0) || ((x >= startRho) && (x <= endRho))) {
            topContraction.attr({visibility: 'hidden'})
        }

        const [topLeftContraction, topRightContraction] = topContraction.children()
        // logic for light cone
        if ((y !== 0) && (startRho - x === Math.ceil(y / 2)) ) {
            topLeftContraction.attr({visibility: 'visible'})
        }
        if ((y !== 0) && (x - endRho === Math.floor(y / 2)) ) {
            topRightContraction.attr({visibility: 'visible'})
        }
        if ((startRho - x > Math.ceil(y / 2)) || (x - endRho > Math.floor(y / 2)) ) {
            newBlock.attr({visibility: 'hidden'})
        }
        
        // newBlock.click(function() {
        //     const [Us, topContraction, bottomContraction] = this.children()
        //     // this.attr({visibility: 'hidden'})
        //     Us.attr({visibility: 'hidden'})
        //     topContraction.attr({visibility: 'hidden'})
        //     bottomContraction.attr({visibility: 'visible'})
        //     // console.log(this.get(2))
        //   })
        blocks[y][x] = newBlock
    } 
}

contractedUUd.attr({visibility: 'hidden'})

let rho0 = SVG('g#g67')

rho0.dmove(45, 43)