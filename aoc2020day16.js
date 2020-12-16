const fs = require('fs');

day16()

function day16() {
    let input = fs.readFileSync('C:\\Users\\User\\Documents\\input.txt', "utf8")
    let rules = {}
    input.split("your ticket:")[0].split("\r\n").filter(a => a !== "").forEach(rule => {
        const [left, right] = rule.split(": ");
        rules[left] = [...right.match(/\d+/g).map(Number)]
    })
    const your_t = input.split("your ticket:")[1].split("nearby tickets:")[0]
        .split("\r\n").filter(a => a !== "").map(a => [...a.match(/\d+/g).map(Number)])[0]
    let nrby_t = input.split("nearby tickets:")[1]
        .split("\r\n").filter(a => a !== "").map(a => [...a.match(/\d+/g).map(Number)])

    const valid = (r, num) => (r[0] <= num && r[1] >= num) || (r[2] <= num && r[3] >= num)

    const part1 = nrby_t.reduce((sum, t) =>
        sum + t.filter(t => Object.keys(rules).every(r => !valid(rules[r], t)))
            .reduce((sum, valid) => sum + valid, 0), 0)

    nrby_t = nrby_t.filter(cur => cur.every(t => !Object.keys(rules).every(r => !valid(rules[r], t))))

    let rule_names = nrby_t[0].map((a, j) => Object.keys(rules)
        .filter(r => nrby_t.every(t => valid(rules[r], t[j]))))

    while (!rule_names.every(rule => rule.length === 1)) {
        rule_names.forEach((rule, ind) => {
            if (rule.length === 1) {
                rule_names.forEach((el, i) => {
                    if (i !== ind && el.includes(rule[0])) {
                        el.splice(el.indexOf(rule[0]), 1)
                    }
                })
            }
        })
    }

    const part2 = your_t.filter((a, i) => rule_names[i][0].includes("departure"))
        .reduce((prev,cur) => prev * cur, 1)

    console.log(part1 + " " + part2)
}
