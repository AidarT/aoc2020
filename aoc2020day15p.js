day15()

function day15() {
    let input = "9,3,1,0,8,4"
    input = input.split(",").map(Number)

    let inds = {}, last_inds = {}
    for (let i = 0; i < 30000000; i++) {
        inds[i] = undefined;
        last_inds[i] = undefined
    }
    input.forEach((a,i) => {inds[a] = i; last_inds[a] = i})
    let last_el = 4
    let count = input.length
    let part1
    while (count < 30000000) {
        last_el = last_inds[last_el] === inds[last_el] ? 0 : inds[last_el] - last_inds[last_el]
        last_inds[last_el] = inds[last_el] === undefined ? count : inds[last_el]
        inds[last_el] = count
        count++
        if (count === 2020) {part1 = last_el}
    }
    let part2 = last_el

    console.log(part1 + " " + part2)
}