const fs = require('fs');

day14()

function day14() {
    let input = fs.readFileSync('C:\\Users\\User\\Documents\\input.txt', "utf8", (err, data) => {
        if (err) throw err;
        console.log(data);
    });

    input = input.split("\r\n").map(line => line.split(" = "))

    let mask, mem = {}

    input.forEach(line => {
        if (line[0] === "mask") {
            mask = line[1]
        } else {
            let ind = parseInt(line[0].split("[")[1]);
            mem[ind] = parseInt(line[1]).toString(2)
            let newVal = mask.split(""), j = mem[ind].length - 1
            for (let i = mask.length - 1; i >= 0; i--) {
                if (newVal[i] === "X") {
                    newVal[i]  = j >= 0 ? mem[ind].charAt(j) : "0"
                }
                j--;
            }
            mem[ind] = parseInt(newVal.toString().replace(/,/g,""),2)
        }
    })

    let part1 = 0
    for (let elem in mem) {
        part1 = part1 + mem[elem]
    }

    mem = {}
    input.forEach(line => {
        if (line[0] === "mask") {
            mask = line[1]
        } else {
            let ind = parseInt(line[0].split("[")[1]).toString(2)
            let newInd = mask.split(""), j = ind.length - 1
            for (let i = newInd.length - 1; i >= 0; i--) {
                if (newInd[i] === "0") {
                    newInd[i]  = j >= 0 ? ind.charAt(j) : "0"
                }
                j--;
            }
            let max = Math.pow(2,newInd.filter(a => a === "X").length)
            for (let ii = 0; ii < max; ii++) {
                ind = newInd.slice()
                let j = ii.toString(2).length - 1
                for (let i = newInd.length - 1; i >= 0; i--) {
                    if (newInd[i] === "X") {
                        ind[i] = j >= 0 ? ii.toString(2).charAt(j) : "0"
                        j--;
                    }
                }
                ind = parseInt(ind.toString().replace(/,/g,""),2)
                mem[ind] = parseInt(line[1])
            }
        }
    })

    let part2 = 0
    for (let elem in mem) {
        part2 = part2 + mem[elem]
    }

    console.log(part1 + " " + part2)
}

