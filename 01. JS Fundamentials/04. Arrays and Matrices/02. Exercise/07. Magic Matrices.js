function magicMatrix(matrix) {
    let sumFirstRow = matrix[0].reduce((a,b) => a+b);

    for (let row = 0; row < matrix.length; row++) {
        let sumRow = 0;
        let sumCol = 0;
        for (let col = 0; col < matrix.length; col++) {
            sumRow += Number(matrix[row][col]); //take sum of row
            sumCol += Number(matrix[col][row]); //take sum of colon
        }
        if(sumFirstRow != sumCol || sumRow != sumCol){
            return false;
        }
    }

    return true;
}


console.log(magicMatrix(
    [   [4, 5, 6],
        [6, 5, 4],
        [5, 5, 5]
    ]));

console.log(magicMatrix(
    [   [11, 32, 45],
        [21, 0, 1],
        [21, 1, 1]
    ]
));

console.log(magicMatrix(
    [   [1, 0, 0],
        [0, 0, 1],
        [0, 1, 0]
    ]
));