const fs = require('fs');

day25()

function day25() {
    let input = fs.readFileSync('C:\\Users\\User\\Documents\\input.txt', "utf8").split("\r\n").map(Number);

    let doors_pub = input[0], cards_pub = input[1]
    let doors_loop_size = 0

    let tmp = 1
    while (tmp !== doors_pub) {
        tmp = transform(tmp, 7)
        doors_loop_size++
    }
    let part1 = 1
    for (let i = 1; i <= doors_loop_size; i++) {
        part1 = transform(part1, cards_pub)
    }

    let part2 = 0

    console.log(part1 + " " + part2)
}

function transform(val, subj) {
   return  (val * subj) % 20201227
}