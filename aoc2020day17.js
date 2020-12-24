const fs = require('fs');
const dir = [
    [-1, -1, -1], [-1, -1, 0], [-1, -1, 1],
    [-1, 0, -1], [-1, 0, 0], [-1, 0, 1],
    [-1, 1, -1], [-1, 1, 0], [-1, 1, 1],
    [0, -1, -1], [0, -1, 0], [0, -1, 1],
    [0, 0, -1], [0, 0, 1],
    [0, 1, -1], [0, 1, 0], [0, 1, 1],
    [1, -1, -1], [1, -1, 0], [1, -1, 1],
    [1, 0, -1], [1, 0, 0], [1, 0, 1],
    [1, 1, -1], [1, 1, 0], [1, 1, 1]
]
const mega_dir = [
    [-1, -1, -1, 0],    [-1, -1, 0, 0], [-1, -1, 1, 0],
    [-1, 0, -1, 0],     [-1, 0, 0, 0],  [-1, 0, 1, 0],
    [-1, 1, -1, 0],     [-1, 1, 0, 0],  [-1, 1, 1, 0],
    [0, -1, -1, 0],     [0, -1, 0, 0],  [0, -1, 1, 0],
    [0, 0, -1, 0],                      [0, 0, 1, 0],
    [0, 1, -1, 0],      [0, 1, 0, 0],   [0, 1, 1, 0],
    [1, -1, -1, 0],     [1, -1, 0, 0],  [1, -1, 1, 0],
    [1, 0, -1, 0],      [1, 0, 0, 0],   [1, 0, 1, 0],
    [1, 1, -1, 0],      [1, 1, 0, 0],   [1, 1, 1, 0],

    [-1, -1, -1, -1],    [-1, -1, 0, -1], [-1, -1, 1, -1],
    [-1, 0, -1, -1],     [-1, 0, 0, -1],  [-1, 0, 1, -1],
    [-1, 1, -1, -1],     [-1, 1, 0, -1],  [-1, 1, 1, -1],
    [0, -1, -1, -1],     [0, -1, 0, -1],  [0, -1, 1, -1],
    [0, 0, -1, -1],      [0, 0, 0, -1],   [0, 0, 1, -1],
    [0, 1, -1, -1],      [0, 1, 0, -1],   [0, 1, 1, -1],
    [1, -1, -1, -1],     [1, -1, 0, -1],  [1, -1, 1, -1],
    [1, 0, -1, -1],      [1, 0, 0, -1],   [1, 0, 1, -1],
    [1, 1, -1, -1],      [1, 1, 0, -1],   [1, 1, 1, -1],

    [-1, -1, -1, 1],    [-1, -1, 0, 1], [-1, -1, 1, 1],
    [-1, 0, -1, 1],     [-1, 0, 0, 1],  [-1, 0, 1, 1],
    [-1, 1, -1, 1],     [-1, 1, 0, 1],  [-1, 1, 1, 1],
    [0, -1, -1, 1],     [0, -1, 0, 1],  [0, -1, 1, 1],
    [0, 0, -1, 1],      [0, 0, 0, 1],    [0, 0, 1, 1],
    [0, 1, -1, 1],      [0, 1, 0, 1],   [0, 1, 1, 1],
    [1, -1, -1, 1],     [1, -1, 0, 1],  [1, -1, 1, 1],
    [1, 0, -1, 1],      [1, 0, 0, 1],   [1, 0, 1, 1],
    [1, 1, -1, 1],      [1, 1, 0, 1],   [1, 1, 1, 1]
]

day17()

function day17() {
    let input = fs.readFileSync('C:\\Users\\Hazard\\Documents\\input.txt', "utf8")

    input = input.split("\r\n").map(a => a.split(""))
    let active = [], mega_active = []
    input.forEach((a,i) => {
        a.forEach((a,j) => {
            if (a === "#") {
                active.push([i,j,0])
                mega_active.push([i,j,0,0])
            }
        })
    })

    active = active.map(a => a.join(","))

    let new_active = []
    for (let cycle = 1; cycle <= 6; cycle++) {
        new_active = []
        for (let i = 0; i < active.length; i++) {
            let coord = active[i].split(",").map(Number)
            let neighb = dir.map(a => a.map((a, i) => a + coord[i]))
            neighb.unshift(coord)
            neighb.forEach(a => {
                if (!new_active.includes(a.toString())) {
                    let bl_count = neighb_count(a, active)
                    if (active.includes(a.toString())) {
                        if (bl_count >= 2 && bl_count <= 3) {
                            new_active.push(a.toString())
                        }
                    } else {
                        if (bl_count === 3) {
                            new_active.push(a.toString())
                        }
                    }
                }
            })
        }
        active = new_active.slice()
    }

    const part1 = new_active.length

    mega_active = mega_active.map(a => a.join(","))

    new_active = []
    for (let cycle = 1; cycle <= 6; cycle++) {
        new_active = []
        for (let i = 0; i < mega_active.length; i++) {
            let coord = mega_active[i].split(",").map(Number)
            let neighb = mega_dir.map(a => a.map((a, i) => a + coord[i]))
            neighb.unshift(coord)
            neighb.forEach(a => {
                if (!new_active.includes(a.toString())) {
                    let bl_count = mega_neighb_count(a, mega_active)
                    if (mega_active.includes(a.toString())) {
                        if (bl_count >= 2 && bl_count <= 3) {
                            new_active.push(a.toString())
                        }
                    } else {
                        if (bl_count === 3) {
                            new_active.push(a.toString())
                        }
                    }
                }
            })
        }
        mega_active = new_active.slice()
    }

    const part2 = new_active.length

    console.log(part1 + " " + part2)
}

function neighb_count(coord, array) {
    let neighb = dir.map(a => a.map((a,i) => a + coord[i]))
    return neighb.reduce((prev, cur) => array.includes(cur.toString()) ? prev + 1 : prev, 0)
}

function mega_neighb_count(coord, array) {
    let neighb = mega_dir.map(a => a.map((a,i) => a + coord[i]))
    return neighb.reduce((prev, cur) => array.includes(cur.toString()) ? prev + 1 : prev, 0)
}