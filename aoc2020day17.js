const fs = require('fs');

day17()

function day17() {
    let input = fs.readFileSync('C:\\Users\\User\\Documents\\input.txt', "utf8")

    let cube = [input.split("\r\n").map(a => a.split(""))]
    cube.push(cube[0].map(a => a.map(a => ".")))
    cube.push(cube[1])
    cube[1] = cube[0].slice(); cube[0] = cube[2].slice();


    const dir = []

    const part1 = 0

    const part2 = 0

    console.log(part1 + " " + part2)
}
