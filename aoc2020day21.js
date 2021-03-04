const fs = require('fs');

day21()

function day21() {
    const input = fs.readFileSync('C:\\Users\\User\\Documents\\input.txt', "utf8").split("\r\n")

    let ingr_list = {}, allerg_list = {}
    input.forEach(food => {
        const ingredients = food.split("contains")[0].match(/[a-z]+/g)
        const allergens = food.split("contains")[1].match(/[a-z]+/g)
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

    let part1 = 0
    Object.keys(ingr_list).forEach(ingr => {
        if (Object.keys(ingr_list[ingr]).filter(allerg => ingr_list[ingr][allerg] >= allerg_list[allerg]).length < 1) {
            part1 = part1 + ingr_list[ingr].count
            delete ingr_list[ingr]
        }
    })

    Object.keys(ingr_list).forEach(ingr => delete ingr_list[ingr].count)
    while (true) {
        Object.keys(allerg_list).forEach(allerg => {
            if (!isNaN(parseInt(allerg_list[allerg]))) {
                let count = 0, ingr_pick = ""
                Object.keys(ingr_list).forEach(ingr => {
                    if (ingr_list[ingr].hasOwnProperty(allerg)) {
                        if (ingr_list[ingr][allerg] >= allerg_list[allerg]) {
                            count++
                            ingr_pick = ingr
                        } else {
                            delete ingr_list[ingr][allerg]
                        }
                    }
                })
                if (count === 1) {
                    allerg_list[allerg] = ingr_pick
                    Object.keys(ingr_list[ingr_pick]).forEach(allerg_to_del => {
                        if (allerg_to_del !== allerg) {
                            delete ingr_list[ingr_pick][allerg_to_del]
                        }
                    })
                }
            }
        })
        if (Object.keys(ingr_list).filter(ingr => Object.keys(ingr_list[ingr]).length > 1).length < 1) {break}
    }

    let part2 = Object.entries(allerg_list).sort().reduce((prev, cur) => prev + cur[1].toString() + ",","")
    part2 = part2.substring(0, part2.length - 1)

    console.log(part1 + " " + part2)
}