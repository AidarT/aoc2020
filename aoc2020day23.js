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
            if (!picked_up_cups.includes(dest_cup)) {break}
            dest_cup = dest_cup - 1 > 0 ? (dest_cup - 1).toString() : Math.max(...cups_up.map(Number)).toString()
        }
        cups = cups_up.join('').split(dest_cup)
        cups = (cups[0] + dest_cup + picked_up_cups.join('') + cups[1]).split("")
        mark = cups.indexOf(cur_cup) + 1 > cups.length - 1 ? 0 : cups.indexOf(cur_cup) + 1
    }

    cups = cups.join('')
    const part1 = cups.split("1")[1] + cups.split("1")[0]

    cups = "219748365".split("").map(Number)
    for (let i = Math.max(...cups.map(Number))+1; i <= 1000000; i++) {
        cups.push(i)
    }
    cups = cups.map(a => ({cup : a, next : NaN}))
    cups.forEach((a, i) => (a.next = cups[(cups.length + i + 1) % cups.length]))
    const cups_sorted = Object.fromEntries(cups.map(c => [c.cup, c]));
    cur_cup = cups[0]
    for (let i = 1; i <= 10000000; i++) {
        const picked_first = cur_cup.next
        dest_cup = cur_cup.cup - 1 > 0 ? cur_cup.cup - 1  : 1000000
        while (true) {
            if (dest_cup !== Number(picked_first.cup) && dest_cup !== Number(picked_first.next.cup) &&
                dest_cup !== Number(picked_first.next.next.cup)) {break}
            dest_cup = dest_cup - 1 > 0 ? dest_cup - 1 : 1000000
        }
        dest_cup = cups_sorted[dest_cup]
        const cur_cup_next = cur_cup.next.next.next.next
        cur_cup.next.next.next.next = dest_cup.next
        cur_cup.next = cur_cup_next
        dest_cup.next = picked_first
        cur_cup = cur_cup.next
    }

    const part2 = cups_sorted[1].next.cup * cups_sorted[1].next.next.cup;

    console.log(part1 + " " + part2)
}