const fs = require('fs');

day22()

function day22() {
    let input = fs.readFileSync('C:\\Users\\Hazard\\Documents\\input.txt', "utf8").split("\r\n\r\n")
    let player1_deck = input[0].split("\r\n").filter(Number).map(Number)
    let player2_deck = input[1].split("\r\n").filter(Number).map(Number)
    const player1_order = player1_deck.slice(), player2_order = player2_deck.slice()

    let game_res = crab_game(player1_deck.slice(), player2_deck.slice())
    let winner = game_res[0].length > 0 ? game_res[0] : game_res[1]
    let part1 = winner.reduce((prev,cur,i) => prev + cur*(winner.length - i), 0)

    game_res = crab_game_rec(player1_order.slice(), player2_order.slice())
    winner = game_res[0].length > 0 ? game_res[0] : game_res[1]
    let part2 = winner.reduce((prev,cur,i) => prev + cur*(winner.length - i), 0)

    console.log(part1 + " " + part2)
}

function crab_game(player1_deck, player2_deck) {
    while (player1_deck.length > 0  && player2_deck.length > 0) {
        let player1_move = player1_deck.shift()
        let player2_move = player2_deck.shift()
        if (player1_move > player2_move) {
            player1_deck.push(player1_move)
            player1_deck.push(player2_move)
        } else {
            player2_deck.push(player2_move)
            player2_deck.push(player1_move)
        }
    }
    return [player1_deck, player2_deck]
}

function crab_game_rec(player1_deck, player2_deck) {
    let game_history = []
    while (player1_deck.length > 0  && player2_deck.length > 0) {
        if (!game_history.includes(player1_deck.join() + player2_deck.join())) {
            game_history.push(player1_deck.join() + player2_deck.join())
        } else {
            player2_deck = []
            break
        }
        let player1_move = player1_deck.shift()
        let player2_move = player2_deck.shift()
        if (player1_deck.length >= player1_move && player2_deck.length >= player2_move) {
            let player1_up_deck = player1_deck.filter((a, i) => i < player1_move)
            let player2_up_deck = player2_deck.filter((a, i) => i < player2_move)
            let game_res = crab_game_rec(player1_up_deck, player2_up_deck)
            if (game_res[0].length > game_res[1].length) {
                player1_deck.push(player1_move)
                player1_deck.push(player2_move)
            } else {
                player2_deck.push(player2_move)
                player2_deck.push(player1_move)
            }
        } else {
            if (player1_move > player2_move) {
                player1_deck.push(player1_move)
                player1_deck.push(player2_move)
            } else {
                player2_deck.push(player2_move)
                player2_deck.push(player1_move)
            }
        }
    }
    return [player1_deck, player2_deck]
}