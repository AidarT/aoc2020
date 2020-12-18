const fs = require('fs');

day18()

function day18() {
    let input = fs.readFileSync('C:\\Users\\User\\Documents\\input.txt', "utf8")

    input = input.split("\r\n");
    let newInput = input.slice()

    while(true) {
        let parentheses = input.map(a => a.match(/\((\d+\W{1,3})+\d+\):?/g))

        if (parentheses.every(a => a === null) === true) {break}

        parentheses.forEach((a, i) => {
            if (a !== null) {
                a.forEach(a => {
                    let memb = a.match(/\d+/g).map(Number)
                    let sign = a.match(/\+|\*/g)
                    let answ = eq_solve(memb, sign)
                    input[i] = input[i].replace(a, answ.toString())
                })
            }
        })
    }

    let nums = input.map(a => a.match(/\d+/g).map(Number))
    let signs = input.map(a => a.split("").filter(a => a !== " ").filter(a => a.match(/\W/g)))
    
    let part1 = nums.reduce((prev, cur,i) => {
        return prev + eq_solve(cur, signs[i])}, 0)

    for (let i = 0; i < newInput.length; i++) {
        while(true) {
            let sums = newInput[i].match(/\d+\s\+\s\d+/g)
            if (sums === null) {break}
            sums.forEach((a) => {
                if (a !== null) {
                    let memb = a.match(/\d+/g).map(Number)
                    let answ = memb.reduce((prev, cur) => prev + cur, 0)
                    newInput[i] = newInput[i].replace(a, answ.toString())
                }
            })
        }
    }

    newInput = newInput.map((a, i) => {
        if (a.match(/\(\d+\)/g) !== null) {
            let b = a.match(/\(\d+\)/g).map(a => a.match(/\d+/))
            newInput[i] = a.replace(/\(\d+\)/g, a.match(/\(\d+\)/g).map(a => a.match(/\d+/g)))
        }
    })

    while(true) {
        let parentheses = newInput.map(a => a.match(/\((\d+\W{1,3})+\d+\):?/g))

        if (parentheses.every(a => a === null) === true) {break}

        for (let i = 0; i < parentheses.length; i++) {
            if (parentheses[i] !== null) {
                for (let ii = 0; ii < parentheses[i].length; ii++) {
                    while(true) {
                        let sums = parentheses[i][ii].match(/\d+\s\+\s\d+/g)
                        if (sums === null) {break}
                        sums.forEach((a) => {
                            if (a !== null) {
                                let memb = a.match(/\d+/g).map(Number)
                                let answ = memb.reduce((prev, cur) => prev + cur, 0)
                                newInput[i] = newInput[i].replace(parentheses[i][ii],
                                    parentheses[i][ii].replace(a, answ.toString()))
                                parentheses[i][ii] = parentheses[i][ii].replace(a, answ.toString())
                            }
                        })
                    }
                }
            }
        }
        parentheses.forEach((a, i) => {
            if (a !== null) {
                a.forEach(a => {
                    let memb = a.match(/\d+/g).map(Number)
                    let answ = memb.reduce((prev, cur) => prev * cur, 1)
                    newInput[i] = newInput[i].replace(a, answ.toString())
                })
            }
        })
    }

    for (let i = 0; i < newInput.length; i++) {
        while(true) {
            let sums = newInput[i].match(/\d+\s\+\s\d+/g)
            if (sums === null) {break}
            sums.forEach((a) => {
                if (a !== null) {
                    let memb = a.match(/\d+/g).map(Number)
                    let answ = memb.reduce((prev, cur) => prev + cur, 0)
                    newInput[i] = newInput[i].replace(a, answ.toString())
                }
            })
        }
    }

    let part2 = newInput.reduce((prev, cur) => {
        return prev + cur.match(/\d+/g).map(Number).reduce((prev, cur) => prev * cur, 1)
    }, 0)

    //newInput = newInput.map(a => a.match(/\d+/g).map(Number).reduce((prev, cur) => prev * cur, 1))

    console.log(part1 + " " + part2)
}

function eq_solve(nums, signs) {
    return nums.reduce((prev, cur, j) => {
        if (signs[j-1] === "+") {return prev + cur}
        if (signs[j-1] === "*") {return prev * cur}
    })
}
