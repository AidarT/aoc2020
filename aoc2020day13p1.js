const fs = require('fs');

day13()

function inv_mod(a, m) {
    let m0 = m, t, q, x0 = 0, x1 = 1
    if (m === 1) {return 0}

    while (a > 1) {
        q = Math.floor(a / m)
        t = m

        m = a % m
        a = t
        t = x0
        x0 = x1 - q * x0
        x1 = t
    }

    if (x1 < 0) {
        x1 += m0
    }

    return x1
}

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
    input[1].split(",").reverse().forEach((a, i) => {
        if (a !== "x") {
            dif.push(i)
        }
    })
    dif = dif.reverse()

    let prod = nums.reduce((a, b) => a * b, 1)
    let pp = nums.map(a => prod/a)
    let inv = nums.map((a, i) => inv_mod(pp[i],a))
    let part2 = inv.reduce((prev, cur, i) =>
       prev +  BigInt(dif[i]) *  BigInt(inv[i]) *  BigInt(pp[i])
    , BigInt(0))
    part2 = part2 % BigInt(prod) - BigInt(dif[0])

    console.log(part1 + " " + part2)
}
