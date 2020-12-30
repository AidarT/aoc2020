const fs = require('fs');
const neighb_dir = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

day20()

function day20() {
    let input = fs.readFileSync('C:\\Users\\User\\Documents\\input.txt', "utf8").split("\r\n\r\n")
    let tiles = {}
    input.forEach(a => {
        let [num, image] = a.split(":\r\n")
        tiles[parseInt(num.split(" ")[1])] = image.split("\r\n")
    })

    let jigsaw = {}, jigsaw_num = {}
    jigsaw["0, 0"] = tiles[Object.keys(tiles)[0]], jigsaw_num["0, 0"] = parseInt(Object.keys(tiles)[0])
    // let jigsaw = [tiles[Object.keys(tiles)[0]]], jigsaw_num = [parseInt(Object.keys(tiles)[0])], jigsaw_coord = [[0, 0]]
    while (Object.keys(jigsaw).length !== Object.keys(tiles).length) {
        for (let tile in jigsaw) {
            let edges = getEdges(jigsaw[tile])
            tiles.forEach(a => {
                let newTile = a
                for (let i = 1; i <= 4; i++) {
                    let newEdges = getEdges(newTile)

                    newTile = rotateTileRight(newTile)
                }
            })

            let tmp = 1
        }
    }

    let part1 = 0

    let part2 = 0

    console.log(part1 + " " + part2)
}

function getEdges(tile) {
    let up = tile[0], down = tile[tile.length - 1]
    let left = tile.reduce((prev, cur) => prev + cur[0], ""),
        right = tile.reduce((prev, cur) => prev+ cur[cur.length-1], "")
    return [left, up, right, down]
}

function rotateTileRight(tile) {
    let newTile = []
    for (let i = 0; i < tile.length; i++) {
        let line = tile.reduceRight((prev, cur) => prev + cur[i], "")
        newTile.push(line)
    }
    return newTile
}