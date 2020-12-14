const fs = require('fs');

day11p1()

function day11p1() {
    var range = fs.readFileSync('C:\\Users\\User\\Documents\\input11.txt', "utf8", (err, data) => {
        if (err) throw err;
        console.log(data);
    });
    range = range.split("\r\n");
    var sum = 0
    var key = 999
    while (key != 0) {
        key = 0
        var range2 = []
        for (var i = 0; i < range.length; i++) {
            var tag1 = range[i];
            for (var j = 0; j<range[i].length; j++) {
                if (range[i].charAt(j) == "L") {
                    var count1 = 0
                    if (i==0 && j==0) {
                        if (range[i].charAt(j+1) == "#") {count1++}
                        if (range[i+1].charAt(j) == "#") {count1++}
                        if (range[i+1].charAt(j+1) == "#") {count1++}
                        if (count1 < 1) {
                            tag1 = "#" + tag1.substring(1,tag1.length)
                            key++
                        }
                    } else if (i==range.length-1 && j==range[i].length-1) {
                        if (range[i].charAt(j-1) == "#") {count1++}
                        if (range[i-1].charAt(j) == "#") {count1++}
                        if (range[i-1].charAt(j-1) == "#") {count1++}
                        if (count1 < 1) {
                            tag1 = tag1.substring(0,tag1.length-1) + "#"
                            key++
                        }
                    } else if (i==0 && j==range[i].length-1) {
                        if (range[i].charAt(j-1) == "#") {count1++}
                        if (range[i+1].charAt(j) == "#") {count1++}
                        if (range[i+1].charAt(j-1) == "#") {count1++}
                        if (count1 < 1) {
                            tag1 = tag1.substring(0,tag1.length-1) + "#"
                            key++
                        }
                    } else if (i==range.length-1 && j==0) {
                        if (range[i].charAt(j+1) == "#") {count1++}
                        if (range[i-1].charAt(j) == "#") {count1++}
                        if (range[i-1].charAt(j+1) == "#") {count1++}
                        if (count1 < 1) {
                            tag1 = "#" + tag1.substring(1,tag1.length)
                            key++
                        }
                    } else if (i==0) {
                        if (range[i].charAt(j+1) == "#") {count1++}
                        if (range[i].charAt(j-1) == "#") {count1++}
                        if (range[i+1].charAt(j-1) == "#") {count1++}
                        if (range[i+1].charAt(j) == "#") {count1++}
                        if (range[i+1].charAt(j+1) == "#") {count1++}
                        if (count1 <1) {
                            tag1 = tag1.substring(0,j) + "#" + tag1.substring(j+1,tag1.length)
                            key++
                        }
                    } else if (j==0) {
                        if (range[i].charAt(j+1) == "#") {count1++}
                        if (range[i+1].charAt(j) == "#") {count1++}
                        if (range[i-1].charAt(j+1) == "#") {count1++}
                        if (range[i-1].charAt(j) == "#") {count1++}
                        if (range[i+1].charAt(j+1) == "#") {count1++}
                        if (count1 <1) {
                            tag1 = "#" + tag1.substring(1,tag1.length)
                            key++
                        }
                    } else if (j==range[i].length-1) {
                        if (range[i+1].charAt(j-1) == "#") {count1++}
                        if (range[i].charAt(j-1) == "#") {count1++}
                        if (range[i+1].charAt(j) == "#") {count1++}
                        if (range[i-1].charAt(j) == "#") {count1++}
                        if (range[i-1].charAt(j-1) == "#") {count1++}
                        if (count1 <1) {
                            tag1 = tag1.substring(0,tag1.length-1) + "#"
                            key++
                        }
                    } else if (i==range.length-1) {
                        if (range[i].charAt(j+1) == "#") {count1++}
                        if (range[i].charAt(j-1) == "#") {count1++}
                        if (range[i-1].charAt(j+1) == "#") {count1++}
                        if (range[i-1].charAt(j) == "#") {count1++}
                        if (range[i-1].charAt(j-1) == "#") {count1++}
                        if (count1 <1) {
                            tag1 = tag1.substring(0,j) + "#" + tag1.substring(j+1,tag1.length)
                            key++
                        }
                    } else {
                        if (range[i-1].charAt(j-1) == "#") {count1++}
                        if (range[i].charAt(j-1) == "#") {count1++}
                        if (range[i+1].charAt(j-1) == "#") {count1++}
                        if (range[i-1].charAt(j) == "#") {count1++}
                        if (range[i-1].charAt(j+1) == "#") {count1++}
                        if (range[i].charAt(j+1) == "#") {count1++}
                        if (range[i+1].charAt(j+1) == "#") {count1++}
                        if (range[i+1].charAt(j) == "#") {count1++}
                        if (count1 <1) {
                            tag1 = tag1.substring(0,j) + "#" + tag1.substring(j+1,tag1.length)
                            key++
                        }
                    }
                } else if (range[i].charAt(j) == "#") {
                    var count = 0
                    if (i==0 && j==0) {
                        if (range[i].charAt(j+1) == "#") {count++}
                        if (range[i+1].charAt(j) == "#") {count++}
                        if (range[i+1].charAt(j+1) == "#") {count++}
                        if (count > 3) {
                            tag1 = "L" + tag1.substring(1,tag1.length)
                            key++
                        }
                    } else if (i==range.length-1 && j==range[i].length-1) {
                        if (range[i].charAt(j-1) == "#") {count++}
                        if (range[i-1].charAt(j) == "#") {count++}
                        if (range[i-1].charAt(j-1) == "#") {count++}
                        if (count > 3) {
                            tag1 = tag1.substring(0,tag1.length-1) + "L"
                            key++
                        }
                    } else if (i==0 && j==range[i].length-1) {
                        if (range[i].charAt(j-1) == "#") {count++}
                        if (range[i+1].charAt(j) == "#") {count++}
                        if (range[i+1].charAt(j-1) == "#") {count++}
                        if (count > 3) {
                            tag1 = tag1.substring(0,tag1.length-1) + "L"
                            key++
                        }
                    } else if (i==range.length-1 && j==0) {
                        if (range[i].charAt(j+1) == "#") {count++}
                        if (range[i-1].charAt(j) == "#") {count++}
                        if (range[i-1].charAt(j+1) == "#") {count++}
                        if (count > 3) {
                            tag1 = "L" + tag1.substring(1,tag1.length)
                            key++
                        }
                    } else if (i==0) {
                        if (range[i].charAt(j+1) == "#") {count++}
                        if (range[i].charAt(j-1) == "#") {count++}
                        if (range[i+1].charAt(j-1) == "#") {count++}
                        if (range[i+1].charAt(j) == "#") {count++}
                        if (range[i+1].charAt(j+1) == "#") {count++}
                        if (count > 3) {
                            tag1 = tag1.substring(0,j) + "L" + tag1.substring(j+1,tag1.length)
                            key++
                        }
                    } else if (j==0) {
                        if (range[i].charAt(j+1) == "#") {count++}
                        if (range[i+1].charAt(j) == "#") {count++}
                        if (range[i-1].charAt(j+1) == "#") {count++}
                        if (range[i-1].charAt(j) == "#") {count++}
                        if (range[i+1].charAt(j+1) == "#") {count++}
                        if (count > 3) {
                            tag1 = "L" + tag1.substring(1,tag1.length)
                            key++
                        }
                    } else if (j==range[i].length-1) {
                        if (range[i+1].charAt(j-1) == "#") {count++}
                        if (range[i].charAt(j-1) == "#") {count++}
                        if (range[i+1].charAt(j) == "#") {count++}
                        if (range[i-1].charAt(j) == "#") {count++}
                        if (range[i-1].charAt(j-1) == "#") {count++}
                        if (count > 3) {
                            tag1 = tag1.substring(0,tag1.length-1) + "L"
                            key++
                        }
                    } else if (i==range.length-1) {
                        if (range[i].charAt(j+1) == "#") {count++}
                        if (range[i].charAt(j-1) == "#") {count++}
                        if (range[i-1].charAt(j+1) == "#") {count++}
                        if (range[i-1].charAt(j) == "#") {count++}
                        if (range[i-1].charAt(j-1) == "#") {count++}
                        if (count > 3) {
                            tag1 = tag1.substring(0,j) + "L" + tag1.substring(j+1,tag1.length)
                            key++
                        }
                    } else {
                        if (range[i-1].charAt(j-1) == "#") {count++}
                        if (range[i].charAt(j-1) == "#") {count++}
                        if (range[i+1].charAt(j-1) == "#") {count++}
                        if (range[i-1].charAt(j) == "#") {count++}
                        if (range[i-1].charAt(j+1) == "#") {count++}
                        if (range[i].charAt(j+1) == "#") {count++}
                        if (range[i+1].charAt(j+1) == "#") {count++}
                        if (range[i+1].charAt(j) == "#") {count++}
                        if (count > 3) {
                            tag1 = tag1.substring(0,j) + "L" + tag1.substring(j+1,tag1.length)
                            key++
                        }
                    }
                }
            }
            range2.push(tag1)
        }
        range = range2.slice()
    }
    count = 0
    for (var i = 0; i < range.length; i++) {
        tag1 = range[i];
        for (var j = 0; j < range[i].length; j++) {
            if (range[i].charAt(j) == "#") {
                count++
            }
        }
    }
    console.log(count)
}