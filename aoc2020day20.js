const fs = require('fs');

day20()

function day20() {
    const input = fs.readFileSync('C:\\Users\\User\\Documents\\input.txt', "utf8").split("\r\n\r\n")
    let tiles = {}
    input.forEach(a => {
        let [num, image] = a.split(":\r\n")
        tiles[parseInt(num.split(" ")[1])] = image.split("\r\n")
    })

    let jigsaw = {}, jigsaw_num = {}
    jigsaw["0, 0"] = tiles[Object.keys(tiles)[0]]
    jigsaw_num["0, 0"] = parseInt(Object.keys(tiles)[0])
    while (Object.keys(jigsaw).length !== Object.keys(tiles).length) {
        for (let tile in jigsaw) {
            if (tileNeighbCheck(tile, jigsaw_num)) {
                let edges = getEdges(jigsaw[tile])
                Object.keys(tiles).forEach(a => {
                    if (!Object.values(jigsaw_num).includes(Number(a))) {
                        let tileToFit = tiles[a]
                        for (let i = 1; i <= 8; i++) {
                            if (i === 5) {
                                tileToFit = tileToFit.reverse()
                            }
                            let edgesToFit = getEdges(tileToFit)
                            let shift = fitEdges(edges, edgesToFit)
                            if (shift !== "0, 0") {
                                const newTileNum = newPos(tile, shift)
                                jigsaw_num[newTileNum] = Number(a)
                                jigsaw[newTileNum] = tileToFit
                                break
                            }
                            tileToFit = rotateTileRight(tileToFit)
                        }
                    }
                })
            }
        }
    }

    let max_num_x = 0, min_num_x = 0, max_num_y = 0, min_num_y = 0
    Object.keys(jigsaw_num).forEach(coord => {
        const [x, y] = coord.match(/-?\d+/g).map(Number)
        max_num_x = Math.max(x, max_num_x)
        min_num_x = Math.min(x, min_num_x)
        max_num_y = Math.max(y, max_num_y)
        min_num_y = Math.min(y, min_num_y)
    })
    let part1 = jigsaw_num[min_num_x + ", " + min_num_y] * jigsaw_num[max_num_x + ", " + min_num_y]
        * jigsaw_num[min_num_x + ", " + max_num_y] * jigsaw_num[max_num_x + ", " + max_num_y]

    for (let tile in jigsaw) {
        jigsaw[tile] = removeBorders(jigsaw[tile])
    }
    let jigsawPicture = []
    for (let y = max_num_y; y >= min_num_y; y--) {
        for (let row = 0; row < jigsaw["0, " + y].length; row++) {
            let line = ""
            for (let x = min_num_x; x <= max_num_x; x++) {
                line = line + jigsaw[x + ", " + y][row]
            }
            jigsawPicture.push(line)
        }

    }
    const seaMonster = ("                  # \n" +
        "#    ##    ##    ###\n" +
        " #  #  #  #  #  #   ").split("\n")
    let key = false
    for (let i = 1; i <= 8; i++) {
        if (i === 5) {
            jigsawPicture = jigsawPicture.reverse()
        }
        for (let line = 0; line < jigsawPicture.length - 2; line++) {
            [jigsawPicture, key] = checkRowForMonsters(jigsawPicture, seaMonster, line, false)
        }
        if (key === true) {break}
        jigsawPicture = rotateTileRight(jigsawPicture)
    }
    let part2 = 0

    console.log(part1 + " " + part2)
}

function getEdges(tile) {
    const up = tile[0], down = tile[tile.length - 1],
        left = tile.reduce((prev, cur) => prev + cur[0], ""),
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

function removeBorders(tile) {
    tile.pop()
    tile.shift()
    tile.forEach((line, i) => {
        tile[i] = line.slice(1, line.length - 1)
    })
    return tile
}

function fitEdges(edges, edgesToFit) {
    if (edges[0] === edgesToFit[2]) {return "-1, 0"}
    if (edges[1] === edgesToFit[3]) {return "0, 1"}
    if (edges[2] === edgesToFit[0]) {return "1, 0"}
    if (edges[3] === edgesToFit[1]) {return "0, -1"}
    return "0, 0"
}

function newPos(curPos, shift) {
    const [x, y] = curPos.match(/-?\d+/g).map(Number)
    const [shift_x, shift_y] = shift.match(/-?\d+/g).map(Number)
    return (x + shift_x) + ", " + (y + shift_y)
}

function tileNeighbCheck(tile, jigsaw_num) {
    const [x, y] = tile.match(/-?\d+/g).map(Number)
    if (Object.keys(jigsaw_num).includes((x - 1) + ", " + y)) {
        if (Object.keys(jigsaw_num).includes((x + 1) + ", " + y)) {
            if (Object.keys(jigsaw_num).includes(x + ", " + (y - 1))) {
                if (Object.keys(jigsaw_num).includes(x + ", " + (y + 1))) {
                    {return false}
                }
            }
        }
    }
    return true
}

function checkRowForMonsters(jigsawPicture, seaMonster, line, mark) {
    let key = true
    for (let col = 0; col < jigsawPicture[line].length - seaMonster[0].length; col++) {
        for (let row_m = 0; row_m < seaMonster.length; row_m++) {
            for (let col_m = 0; col_m < seaMonster[0].length; col_m++) {
                if (seaMonster[row_m].charAt(col_m) === "#" && jigsawPicture[line + row_m].charAt(col + col_m) !== "#") {
                    key = false
                    break
                } else if (mark && seaMonster[row_m].charAt(col_m) === "#" &&
                    jigsawPicture[line + row_m].charAt(col + col_m) === "#") {
                    jigsawPicture[line + row_m] = jigsawPicture[line + row_m].substring(0, col + col_m) + "O"
                        + jigsawPicture[line + row_m].substring(col + col_m + 1)
                }
            }
            if (key === false) {break}
        }
        if (key === true) {break} else if (col + 1 < jigsawPicture[line].length - seaMonster[0].length) {key = true}
    }
    if (key === true) {
        jigsawPicture = checkRowForMonsters(jigsawPicture, seaMonster, line, true)[0]
    }
    return [jigsawPicture, key]
}