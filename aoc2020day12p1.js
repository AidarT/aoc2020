const fs = require('fs');

day12p1()

function day12p1() {
    let input = fs.readFileSync('C:\\Users\\Hazard\\Documents\\input.txt', "utf8", (err, data) => {
        if (err) throw err;
        console.log(data);
    });
    let reg_rule_instr = /[A-Z]/
    let reg_rule_amount = /[0-9]+/
    input = input.split("\r\n").map(b => [reg_rule_instr.exec(b)[0], parseInt(reg_rule_amount.exec(b)[0])]);

    const part1 = input.reduce((prev, cur) => {
        let instEW = prev[0], amountEW = prev[1], instNS = prev[2], amountNS = prev[3], course = prev[4], shift, zaplatka = cur[0]
        if (cur[0] === "F") {
            if (course === prev[0]) {
                amountEW += cur[1]
            } else if (course === prev[2]) {
                amountNS += cur[1]
            } else if ((course === "E" && prev[0] === "W") || (course === "W" && prev[0] === "E")) {
                amountEW -= cur[1]
            } else if ((course === "N" && prev[2] === "S") || (course === "S" && prev[2] === "N")) {
                amountNS -= cur[1]
            }
        } else if ((cur[0] === "L") || (cur[0] === "R")) {
            if (cur[1] === 90) {shift = -1}
            if (cur[1] === 180) {shift = -2}
            if (cur[1] === 270) {shift = -3}
            if (cur[0] === "R") {shift *= -1}
            course = shiftcourse(course, shift)
        } else if ((cur[0] === "E") || (cur[0] === "W")) {
            amountEW = zaplatka === instEW ? amountEW + cur[1] : amountEW - cur[1]
        } else if ((cur[0] === "N") || (cur[0] === "S")) {
            amountNS = zaplatka === instNS ? amountNS + cur[1] : amountNS - cur[1]
        }

        [instEW, amountEW] = undzerocheck(instEW, amountEW);
        [instNS, amountNS] = undzerocheck(instNS, amountNS);

        return [instEW, amountEW,instNS,amountNS, course]
    }, ["E",0,"N",0,"E"])


    console.log(part1 + " " + (part1[1]+part1[3]))
}

function undzerocheck(inst, amount) {
    if (amount < 0) {
        amount *= -1
        inst = shiftcourse(inst, 2)
    }
    return [inst, amount]
}

function shiftcourse(inst, shift) {
    const course_type = ["E","S","W","N"]
    let ind = course_type.indexOf(inst)
    ind = ind + shift
    if (ind < 0) {ind += course_type.length}
    if (ind > course_type.length-1) {ind -= course_type.length}
    inst = course_type[ind]

    return inst
}