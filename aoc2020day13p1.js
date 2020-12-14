const fs = require('fs');

day13()

function day13() {
    let input = fs.readFileSync('C:\\Users\\Hazard\\Documents\\input.txt', "utf8", (err, data) => {
        if (err) throw err;
        console.log(data);
    });

    input = input.split("\r\n");

    let nums = input[1].split(",").filter(a => a !== "x").map(a => parseInt(a))

    const ts = parseInt(input[0])
    let buses = []
    nums.forEach((a, i) => {
        buses.push(Math.floor(ts/a)*a + nums[i])
    })

    const part1 = (Math.min(...buses)-ts) * nums[buses.indexOf(Math.min(...buses))]

    let dif = []
    input[1].split(",").forEach((a, i) => {
        if (a !== "x") {
            dif.push(i)
        }
    })

    let step = Math.max(...nums)
    let part2 = Math.floor(100000000000000/step)*step-dif[nums.indexOf(step)], key = 0
    let iter = nums.map(a => 0)
    while (key === 0) {
        iter = nums.map((a,i) => {
            let b = part2 % a === 0 ? 0 : a
            if (Math.floor(part2 / a) * a + b === part2 + dif[i]) {
                return 1
            } else {
                return 0
            }
        })
        if (iter.length === iter.filter(a => a === 1).length) {
            break
        }
        part2+=step
    }


    console.log(part1)
}

