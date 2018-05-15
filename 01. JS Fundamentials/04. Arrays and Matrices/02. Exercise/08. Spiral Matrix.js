function spiralMatrix(r, c) {
    let matrix = [];

    for (let i = 0; i < r; i++) {
        matrix.push('0'.repeat(c).split('').map(Number));
    }
    
    let number = 1;
    let limit  = r * c;

    let currentRow = 0;
    let currentCol = 0;
    let rotations = 0;

    while(limit >= number){

        //right
        for (let i = rotations; i < c - rotations; i++) {
           matrix[currentRow][currentCol++] = number++;
        }

        //down
        currentCol -= 1;
        for (let i = ++currentRow ; i < r - rotations; i++) {
            matrix[currentRow++][currentCol] = number++;
        }

        //left
        currentRow -= 1;
        for (let i = c  - 1 - rotations; i > rotations; i--) {
             matrix[currentRow][--currentCol] = number++;
        }

        //up
        for (let i = 0 + rotations ; i < c - 2 - rotations; i++) {
            matrix[--currentRow][currentCol] = number++;
        }

        rotations++;
        currentCol++;
    }

    printMatrix(matrix);

    function printMatrix(matrix) {
        let result = matrix.map(x => x.join(' ')).join('\n');

        console.log(result);
    }
}

spiralMatrix(3, 3);
//spiralMatrix(5, 5);