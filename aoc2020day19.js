const fs = require('fs');

day19()

function day19() {
    let input = fs.readFileSync('C:\\Users\\User\\Documents\\input.txt', "utf8")
    input = input.split("\r\n\r\n");

    let messages = input[1].split("\r\n");
    let rules = {}
    input[0].split("\r\n").forEach(a => {
        let [num, rule] = a.split(": ")
        if (isNaN(parseInt(rule))) {rule = rule.match(/[a-z]/)[0]}
        rules[parseInt(num)] = rule
    })

    let reg_exp = rule_ins("0", rules, 1).replace(/\s/g, "")
    reg_exp = new RegExp("^" + reg_exp + "$", "g");
    let part1 = messages.filter(a => a.match(reg_exp) !== null)

    rules[8] = "42 | 42 8"
    rules[11] = "42 31 | 42 11 31"

    reg_exp = rule_ins("0", rules, 1).replace(/\s/g, "")
    reg_exp = new RegExp("^" + reg_exp + "$", "g");
    let part2 = messages.filter(a => a.match(reg_exp) !== null)

    console.log(part1.length + " " + part2.length)
}

function rule_ins(start, rules, cycles) {
    start = start.split(" ")
    for (let i = 0; i < start.length; i++) {
        if (start[i].match(/[ab\|]/) === null) {
            if (cycles < 50) {
                start[i] = rule_ins(rules[start[i]], rules, cycles + 1)
            }
        }
    }
    if (start.includes("|")) {
        return "(" + start.join(" ") + ")"
    } else {
        return start.join(" ")
    }
}