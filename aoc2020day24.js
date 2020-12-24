const fs = require('fs');

day24()

function day24() {
    let input = fs.readFileSync('C:\\Users\\User\\Documents\\input.txt', "utf8").split("\r\n");

    let black = []
    const dir = a => {switch (a) {
        case "se":
            return [0, -1, 1]
        case "sw":
            return [-1, 0, 1]
        case "nw":
            return [0, 1, -1]
        case "ne":
            return [1, 0, -1]
        case "e":
            return [1, -1, 0]
        case "w":
            return [-1, 1, 0]
    }}

    input.forEach(a => {
        let moves = a.match(/se|sw|nw|ne|e|w/g).map(a => dir(a))
        let fin_coord = moves.reduce((prev, cur) => prev.map((a,i) => a + cur[i]))
        if (!black.includes(fin_coord.toString())) {
            black.push(fin_coord.toString())
        } else {
            black.splice(black.indexOf(fin_coord.toString()),1)
        }
    })
    const part1 = black.length

    let new_black
    const neighb_dir = [[0, -1, 1], [-1, 0, 1], [0, 1, -1], [1, 0, -1], [1, -1, 0], [-1, 1, 0]];

    for (let day = 1; day <= 100; day++) {
        new_black = []
        for (let i = 0; i < black.length; i++) {
            let coord = black[i].split(",").map(Number)
            let neighb = neighb_dir.map(a => a.map((a, i) => a + coord[i]))
            neighb.unshift(coord)
            neighb.forEach(a => {
                if (!new_black.includes(a.toString())) {
                    let bl_count = neighb_count(a, black)
                    if (black.includes(a.toString())) {
                        if (bl_count > 0 && bl_count < 3) {
                            new_black.push(a.toString())
                        }
                    } else {
                        if (bl_count === 2) {
                            new_black.push(a.toString())
                        }
                    }
                }
            })
        }
        black = new_black.slice()
    }
    let part2 = new_black.length

    console.log(part1 + " " + part2)
}

function neighb_count(coord, array) {
    const neighb_dir = [[0, -1, 1], [-1, 0, 1], [0, 1, -1], [1, 0, -1], [1, -1, 0], [-1, 1, 0]];
    let neighb = neighb_dir.map(a => a.map((a,i) => a + coord[i]))
    return neighb.reduce((prev, cur) => array.includes(cur.toString()) ? prev + 1 : prev, 0)
}