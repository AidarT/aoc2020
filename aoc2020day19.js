const fs = require('fs');

day19()

function day19() {
    let input = fs.readFileSync('C:\\Users\\Hazard\\Documents\\input.txt', "utf8")

    input = input.split("\r\n\r\n");

    let messages = input[1].split("\r\n");
    let rules = {}
    input[0].split("\r\n").forEach(a => {
        let [num, rule] = a.split(": ")
        if (isNaN(parseInt(rule))) {rule = rule.match(/[a-z]/)[0]}
        rules[parseInt(num)] = rule
    })

    let part1 = 0

    let part2 = 0

    console.log(part1 + " " + part2)
}
