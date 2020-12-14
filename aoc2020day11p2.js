const fs = require('fs');

day11p2()

function ch_search(range,i,j,di,dj) {
    let n = 1
    if (range[i+di].charAt(j+dj) === "#") {return 1}
    else if (range[i+di].charAt(j+dj) === ".") {
        let jj = j+dj, ii = i+di
        if (di === 0 && dj > 0) {
            while (range[i].charAt(j+n) === "." && j+n+1<range[i].length) {n++; jj = j + n}
        } else if (di > 0 && dj === 0) {
            while (range[i+n].charAt(j) === "." && i+n+1<range.length) {n++; ii = i + n}
        } else if (di > 0 && dj > 0) {
            while (range[i+n].charAt(j+n) === "." && i+n+1<range.length && j+n+1<range[i].length) {n++; ii = i + n; jj = j + n}
        } else if (di === 0 && dj < 0) {
            while (range[i].charAt(j-n) === "." && j-n-1>=0) {n++; jj = j - n}
        } else if (di < 0 && dj === 0) {
            while (range[i-n].charAt(j) === "." && i-n-1>=0) {n++; ii = i - n}
        } else if (di < 0 && dj < 0) {
            while (range[i-n].charAt(j-n) === "." && i-n-1>=0 && j-n-1>=0) {n++; ii = i - n; jj = j - n}
        } else if (di < 0 && dj > 0) {
            while (range[i-n].charAt(j+n) === "." && i-n-1>=0 && j+n+1<range[i].length) {n++; ii = i - n; jj = j + n}
        } else if (di > 0 && dj < 0) {
            while (range[i+n].charAt(j-n) === "." && i+n+1<range.length && j-n-1>=0) {n++; ii = i + n; jj = j - n}
        }
        if (range[ii].charAt(jj) === "#") {return 1}
    }
    return 0
}

function day11p2() {
    let range = fs.readFileSync('C:\\Users\\User\\Documents\\input11.txt', "utf8", (err, data) => {
        if (err) throw err;
        console.log(data);
    });
    range = range.split("\r\n");
    let key = 999
    let n
    while (key !== 0) {
        key = 0
        let range2 = []
        for (let i = 0; i < range.length; i++) {
            let tag1 = range[i];
            for (let j = 0; j<range[i].length; j++) {
                if ((range[i].charAt(j) === "L") || (range[i].charAt(j) === "#")) {
                    let count1 = 0
                    if (i===0 && j===0) {
                        let sss = ch_search(range,i,j,0,1)
                        count1 = count1 + ch_search(range,i,j,0,1)
                        count1 = count1 + ch_search(range,i,j,1,0)
                        count1 = count1 + ch_search(range,i,j,1,1)
                        if ((count1 < 1) && (range[i].charAt(j) === "L")) {
                            tag1 = "#" + tag1.substring(1,tag1.length)
                            key++
                        } else if (count1 > 4 && (range[i].charAt(j) === "#")) {
                            tag1 = "L" + tag1.substring(1,tag1.length)
                            key++
                        }
                    } else if (i === range.length-1 && j === range[i].length-1) {
                        count1 = count1 + ch_search(range,i,j,0,-1)
                        count1 = count1 + ch_search(range,i,j,-1,0)
                        count1 = count1 + ch_search(range,i,j,-1,-1)
                        if ((count1 < 1) && (range[i].charAt(j) === "L")) {
                            tag1 = tag1.substring(0,tag1.length-1) + "#"
                            key++
                        } else if (count1 > 4 && (range[i].charAt(j) === "#")) {
                            tag1 = tag1.substring(0,tag1.length-1) + "L"
                            key++
                        }
                    } else if (i === 0 && j === range[i].length-1) {
                        count1 = count1 + ch_search(range,i,j,0,-1)
                        count1 = count1 + ch_search(range,i,j,1,0)
                        count1 = count1 + ch_search(range,i,j,1,-1)
                        if ((count1 < 1) && (range[i].charAt(j) === "L")) {
                            tag1 = tag1.substring(0,tag1.length-1) + "#"
                            key++
                        } else if (count1 > 4 && (range[i].charAt(j) === "#")) {
                            tag1 = tag1.substring(0,tag1.length-1) + "L"
                            key++
                        }
                    } else if (i === range.length-1 && j === 0) {
                        count1 = count1 + ch_search(range,i,j,0,1)
                        count1 = count1 + ch_search(range,i,j,-1,0)
                        count1 = count1 + ch_search(range,i,j,-1,1)
                        if ((count1 < 1) && (range[i].charAt(j) === "L")) {
                            tag1 = "#" + tag1.substring(1,tag1.length)
                            key++
                        } else if (count1 > 4 && (range[i].charAt(j) === "#")) {
                            tag1 = "L" + tag1.substring(1,tag1.length)
                            key++
                        }
                    } else if (i === 0) {
                        count1 = count1 + ch_search(range,i,j,0,1)
                        count1 = count1 + ch_search(range,i,j,0,-1)
                        count1 = count1 + ch_search(range,i,j,1,-1)
                        count1 = count1 + ch_search(range,i,j,1,0)
                        count1 = count1 + ch_search(range,i,j,1,1)
                        if ((count1 < 1) && (range[i].charAt(j) === "L")) {
                            tag1 = tag1.substring(0,j) + "#" + tag1.substring(j+1,tag1.length)
                            key++
                        } else if (count1 > 4 && (range[i].charAt(j) === "#")) {
                            tag1 = tag1.substring(0,j) + "L" + tag1.substring(j+1,tag1.length)
                            key++
                        }
                    } else if (j === 0) {
                        count1 = count1 + ch_search(range,i,j,0,1)
                        count1 = count1 + ch_search(range,i,j,1,0)
                        count1 = count1 + ch_search(range,i,j,-1,1)
                        count1 = count1 + ch_search(range,i,j,-1,0)
                        count1 = count1 + ch_search(range,i,j,1,1)
                        if ((count1 < 1) && (range[i].charAt(j) === "L")) {
                            tag1 = "#" + tag1.substring(1,tag1.length)
                            key++
                        } else if (count1 > 4 && (range[i].charAt(j) === "#")) {
                            tag1 = "L" + tag1.substring(1,tag1.length)
                            key++
                        }
                    } else if (j === range[i].length-1) {
                        count1 = count1 + ch_search(range,i,j,1,-1)
                        count1 = count1 + ch_search(range,i,j,0,-1)
                        count1 = count1 + ch_search(range,i,j,1,0)
                        count1 = count1 + ch_search(range,i,j,-1,0)
                        count1 = count1 + ch_search(range,i,j,-1,-1)
                        if ((count1 < 1) && (range[i].charAt(j) === "L")) {
                            tag1 = tag1.substring(0,tag1.length-1) + "#"
                            key++
                        } else if (count1 > 4 && (range[i].charAt(j) === "#")) {
                            tag1 = tag1.substring(0,tag1.length-1) + "L"
                            key++
                        }
                    } else if (i === range.length-1) {
                        count1 = count1 + ch_search(range,i,j,0,1)
                        count1 = count1 + ch_search(range,i,j,0,-1)
                        count1 = count1 + ch_search(range,i,j,-1,1)
                        count1 = count1 + ch_search(range,i,j,-1,0)
                        count1 = count1 + ch_search(range,i,j,-1,-1)
                        if ((count1 < 1) && (range[i].charAt(j) === "L")) {
                            tag1 = tag1.substring(0,j) + "#" + tag1.substring(j+1,tag1.length)
                            key++
                        } else if (count1 > 4 && (range[i].charAt(j) === "#")) {
                            tag1 = tag1.substring(0,j) + "L" + tag1.substring(j+1,tag1.length)
                            key++
                        }
                    } else {
                        count1 = count1 + ch_search(range,i,j,-1,-1)
                        count1 = count1 + ch_search(range,i,j,0,-1)
                        count1 = count1 + ch_search(range,i,j,1,-1)
                        count1 = count1 + ch_search(range,i,j,-1,0)
                        count1 = count1 + ch_search(range,i,j,-1,1)
                        count1 = count1 + ch_search(range,i,j,0,1)
                        count1 = count1 + ch_search(range,i,j,1,1)
                        count1 = count1 + ch_search(range,i,j,1,0)
                        if ((count1 < 1) && (range[i].charAt(j) === "L")) {
                            tag1 = tag1.substring(0,j) + "#" + tag1.substring(j+1,tag1.length)
                            key++
                        } else if (count1 > 4 && (range[i].charAt(j) === "#")) {
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
    let count = 0
    for (let i = 0; i < range.length; i++) {
        let tag1 = range[i];
        for (let j = 0; j < range[i].length; j++) {
            if (range[i].charAt(j) === "#") {count++}
        }
    }
    console.log(count)
}