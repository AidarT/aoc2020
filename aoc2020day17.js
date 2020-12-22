const fs = require('fs');

day17()

function day17() {
    let input = fs.readFileSync('C:\\Users\\Hazard\\Documents\\input.txt', "utf8")

    let cube = [input.split("\r\n").map(a => a.split(""))]
    cube.push(cube[0].map(a => a.map(a => ".")))
    cube.push(cube[1])
    // cube[1] = cube[0].slice(); cube[0] = cube[2].slice();
    cube[1] = JSON.parse(JSON.stringify(cube[0])); cube[0] = JSON.parse(JSON.stringify(cube[2]));

    const dir = [
        [-1, -1, -1], [-1, -1, 0], [-1, -1, 1],
        [-1, 0, -1], [-1, 0, 0], [-1, 0, 1],
        [-1, 1, -1], [-1, 1, 0], [-1, 1, -1],
        [0, -1, -1], [0, -1, 0], [0, -1, 1],
        [0, 0, -1], [0, 0, 1],
        [0, 1, -1], [0, 1, 0], [0, 1, 1],
        [1, -1, -1], [1, -1, 0], [1, -1, 1],
        [1, 0, -1], [1, 0, 0], [1, 0, 1],
        [1, 1, -1], [1, 1, 0], [1, 1, -1]
    ]

    cube.push(cube[0].map(a => a.map(a => ".")))
    cube.unshift(cube[0].map(a => a.map(a => ".")))
    cube.forEach(a => {
        a.forEach(a => {
            a.push(".");
            a.unshift(".")
        })
        a.push(a[0].map(a => "."));
        a.unshift(a[0].map(a => "."))
    })

    const part1 = 0

    const part2 = 0

    console.log(part1 + " " + part2)
}
