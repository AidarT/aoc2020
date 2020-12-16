const fs = require('fs');

day16()

function day16() {
    let input = fs.readFileSync('C:\\Users\\User\\Documents\\input.txt', "utf8", (err, data) => {
        if (err) throw err;
        console.log(data);
    });
    let rules = {}
    input.split("your ticket:")[0].split("\r\n").filter(a => a !== "")
        .map(rule => {
            const [left, right] = rule.split(": ");
            rules[left] = [parseInt(right),
                parseInt(right.split("-")[1]),
                parseInt(right.split(" or ")[1]),
                parseInt(right.split(" or ")[1].split("-")[1])]
        })
    let your_t = input.split("your ticket:")[1].split("nearby tickets:")[0]
        .split("\r\n").filter(a => a !== "")
    let nrby_t = input.split("your ticket:")[1].split("nearby tickets:")[1]
        .split("\r\n").filter(a => a !== "")

    let red = []
    let part1 = nrby_t.reduce((prev, cur, i) => {
        cur.split(",").forEach(a => {
            a = parseInt(a)
            let key = 0
            for (let rule in rules) {
                if (!(rules[rule][0] <= a && rules[rule][1] >= a) && !(rules[rule][2] <= a && rules[rule][3] >= a)) {
                    key++
                }
            }
            if (key === Object.keys(rules).length) {
                prev += a
                red.push(i)
            }
        })
        return prev
    }, 0)

    for (let i = nrby_t.length - 1; i >= 0; i--) {
        if (red.includes(i)) {
            nrby_t.splice(i, 1)
        }
    }

    let rule_names = []
    let j = 0
    while (j < nrby_t[0].split(",").length) {
        rule_names[j] = []
        for (let rule in rules) {
            let key = 0
            nrby_t.forEach((cur, i) => {
                let a = cur.split(",")[j]
                a = parseInt(a)
                if (!(rules[rule][0] <= a && rules[rule][1] >= a) && !(rules[rule][2] <= a && rules[rule][3] >= a)) {
                    key++
                }
            })
            if (key === 0 && !rule_names[j].includes(rule)) {
                rule_names[j].push(rule)
            }
        }
        j++
    }

    j = 1
    while (true) {
        rule_names.forEach((rule, ind) => {
            if (rule.length === 1) {
                rule_names.forEach((el, i) => {
                    if (i !== ind && el.includes(rule[0])) {
                        el.splice(el.indexOf(rule[0]), 1)
                    }
                })
            }
        })
        if (rule_names.reduce((prev,cur) => {return prev + cur.length},0) === rule_names.length) {
            break
        }
    }

    let part2 = 1
    rule_names.forEach((a, i) => {
        if (a[0].includes("departure")) {
            let num = parseInt(your_t[0].split(",")[i])
            part2 *= num
        }
    })

    console.log(part1 + " " + part2)
}
