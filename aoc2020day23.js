const fs = require('fs');

day23()

function day23() {
    let cups = "219748365".split("")
    let cur_cup, picked_up_cups, dest_cup, mark = 0

    for (let i = 1; i <= 100; i++) {
        cur_cup = cups[mark]
        picked_up_cups=[]
        let cups_up = cups.slice()
        for (let j = 1; j <= 3; j++) {
            let ind = mark + j > cups.length - 1 ? mark + j - cups.length : mark + j
            picked_up_cups.push(cups[ind])
            cups_up.splice(cups_up.indexOf(picked_up_cups[j-1]),1)
        }
        dest_cup = cur_cup - 1 > 0 ? (cur_cup - 1).toString() : Math.max(...cups_up.map(Number)).toString()
        while (true) {
            if (cups_up.includes(dest_cup)) {break}
            dest_cup = dest_cup - 1 > 0 ? (dest_cup - 1).toString() : Math.max(...cups_up.map(Number)).toString()
        }
        cups = cups_up.join('').split(dest_cup)
        cups = (cups[0] + dest_cup + picked_up_cups.join('') + cups[1]).split("")
        mark = cups.indexOf(cur_cup) + 1 > cups.length - 1 ? 0 : cups.indexOf(cur_cup) + 1
    }

    cups = cups.join('')
    let part1 = cups.split("1")[1] + cups.split("1")[0]

    cups = "219748365".split("")
    for (let i = Math.max(...cups.map(Number))+1; i <= 1000000; i++) {
        cups.push(i.toString())
    }
    mark = 0
    for (let i = 1; i <= 10000000; i++) {
        cur_cup = cups[mark]
        picked_up_cups=[]
        let cups_up = cups.slice()
        for (let j = 1; j <= 3; j++) {
            let ind = mark + j > cups.length - 1 ? mark + j - cups.length : mark + j
            picked_up_cups.push(cups[ind])
            cups_up.splice(cups_up.indexOf(picked_up_cups[j-1]),1)
        }
        dest_cup = cur_cup - 1 > 0 ? (cur_cup - 1).toString() : (1000000).toString()
        while (true) {
            if (cups_up.includes(dest_cup)) {break}
            dest_cup = dest_cup - 1 > 0 ? (dest_cup - 1).toString() : (1000000).toString()
        }
        // cups = cups_up.join(',').split(dest_cup)
        // cups = (cups[0] + dest_cup + "," + picked_up_cups.join(',') + cups[1]).split(",")
        if (cups_up.indexOf(dest_cup) === 0) {
            cups = cups_up.slice()
            cups.shift()
            cups = cups.join(',')
            cups = (dest_cup + "," + picked_up_cups.join(',') + "," + cups).split(",")
        } else if (cups_up.indexOf(dest_cup) === cups_up.length-1) {
            cups = cups_up.slice()
            cups.pop()
            cups = cups.join(',')
            cups = (cups + "," + dest_cup + "," + picked_up_cups.join(',')).split(",")
        } else if (cups_up.indexOf(dest_cup) > 0) {
            cups = cups_up.join(',').split(',' + dest_cup + ',')
            cups = (cups[0] + "," + dest_cup + "," + picked_up_cups.join(',') + "," + cups[1]).split(",")
        }
        mark = cups.indexOf(cur_cup) + 1 > cups.length - 1 ? 0 : cups.indexOf(cur_cup) + 1
    }

    let part2 = parseInt(cups[cups.indexOf("1") + 1]) * parseInt(cups[cups.indexOf("1") + 2])

    console.log(part1 + " " + part2)
}