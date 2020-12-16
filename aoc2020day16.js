const fs = require('fs');

day16()

function day16() {
    let input = fs.readFileSync('C:\\Users\\User\\Documents\\input.txt', "utf8", (err, data) => {
        if (err) throw err;
        console.log(data);
    });
    let rules = {}
    input.split("your ticket:")[0].split("\r\n").filter(a => a !== "")
        .forEach(rule => {
            const [left, right] = rule.split(": ");
            rules[left] = [...right.match(/\d+/g).map(Number)]
        })
    const your_t = input.split("your ticket:")[1].split("nearby tickets:")[0]
        .split("\r\n").filter(a => a !== "").map(a => [...a.match(/\d+/g).map(Number)])[0]
    let nrby_t = input.split("nearby tickets:")[1]
        .split("\r\n").filter(a => a !== "").map(a => [...a.match(/\d+/g).map(Number)])

    const part1 = nrby_t.reduce((sum, cur) =>
        sum + cur.filter(t => Object.keys(rules).every(r =>
            !(rules[r][0] <= t && rules[r][1] >= t) && !(rules[r][2] <= t && rules[r][3] >= t)))
            .reduce((sum, valid) => sum + valid, 0), 0)

    nrby_t = nrby_t.filter(cur => cur.every(t => !Object.keys(rules).every(r =>
        !(rules[r][0] <= t && rules[r][1] >= t) && !(rules[r][2] <= t && rules[r][3] >= t)))
    )

    let rule_names = [], j = 0
    while (j < nrby_t[0].length) {
        rule_names[j] = []
        for (let r in rules) {
            let key = nrby_t.every(t =>
                (rules[r][0] <= t[j] && rules[r][1] >= t[j]) || (rules[r][2] <= t[j] && rules[r][3] >= t[j])            )
            if (key === true && !rule_names[j].includes(r)) {
                rule_names[j].push(r)
            }
        }
        j++
    }

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

    const part2 = your_t.filter((a,i) => rule_names[i][0].includes("departure"))
        .reduce((prev,cur) => prev * cur, 1)

    console.log(part1 + " " + part2)
}
