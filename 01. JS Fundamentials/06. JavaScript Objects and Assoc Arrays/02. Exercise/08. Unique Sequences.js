function uniqueSequance(input) {
    let map = new Map();
    for (let line of input) {
       let currentArray = JSON.parse(line).sort((a, b) => b - a);
       let arrName = `[${currentArray.join(', ')}]`;

       if(!map.has(arrName)){
           map.set(arrName, currentArray.length);
       }
    }


    console.log([...map]
        .sort((a, b) => a[1] - b[1])
        .map(x => x[0])
        .join('\n'));
}

uniqueSequance(
        ['[-3, -2, -1, 0, 1, 2, 3, 4]',
        '[10, 1, -17, 0, 2, 13]',
        '[4, -3, 3, -2, 2, -1, 1, 0]']
);

// uniqueSequance(
//         [7.14, 7.180, 7.339, 80.099]
//         [7.339, 80.0990, 7.140000, 7.18]
//         [7.339, 7.180, 7.14, 80.099]
// );