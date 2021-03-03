const fs = require('fs');

day21()

function day21() {
    const input = fs.readFileSync('C:\\Users\\User\\Documents\\input.txt', "utf8").split("\r\n")

    let ingr_list = {}
    let allerg_list = {}
    input.forEach(food => {
        let ingredients = food.split("contains")[0].match(/[a-z]+/g)
        let allergens = food.split("contains")[1].match(/[a-z]+/g)
        ingredients.forEach(ingr => {
            if (!ingr_list.hasOwnProperty(ingr)) {
                ingr_list[ingr] = {}
            }
            allergens.forEach(allerg => {
                if (!allerg_list.hasOwnProperty(allerg)) {
                    allerg_list[allerg] = 1
                }
                if (!ingr_list[ingr].hasOwnProperty(allerg)) {
                    ingr_list[ingr][allerg] = 1
                } else {
                    ingr_list[ingr][allerg]++
                }
            })
            if (!ingr_list[ingr].hasOwnProperty("count")) {
                ingr_list[ingr].count = 1
            } else {
                ingr_list[ingr].count++
            }
        })
    })

    Object.keys(ingr_list).forEach(ingr => {
        Object.keys(allerg_list).forEach(allerg => {
            if (ingr_list[ingr].hasOwnProperty(allerg)) {
                allerg_list[allerg] = Math.max(ingr_list[ingr][allerg],allerg_list[allerg])
            }
        })
    })

    Object.keys(ingr_list).forEach(ingr => {
        let key = 0
        Object.keys(ingr_list[ingr]).forEach(allerg => {
            
        })
    })

    let part1 = 0

    let part2 = 0

    console.log(part1 + " " + part2)
}

