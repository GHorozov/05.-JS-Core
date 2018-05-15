function orbitTask(arr){
    let targetRow = arr[0];
    let targetCol = arr[1];
    let x = arr[2];
    let y = arr[3];

    let matrix = fillMatrixWthZeroes(targetRow, targetCol);

    let number = 1;
    matrix[x][y] = number;
    let waveCount = 1;

    while (!isFilled(matrix)) {
        number++;

        let topX = Math.max(0, x - waveCount);
        let topY = Math.max(0, y - waveCount);
        let bottomX = Math.min(matrix.length - 1, x + waveCount);
        let bottomY = Math.min(matrix[0].length - 1, y + waveCount);

        for (let row = topX; row <= bottomX; row++) {
            for (let col = topY; col <= bottomY; col++) {
                if (matrix[row][col] === 0) {
                    matrix[row][col] = number;
                }
            }
        }
        waveCount++
    }

    printMatrix(matrix);

    function isFilled(matrix) {
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col] === 0) {
                    return false
                }
            }
        }

        return true
    }

    function printMatrix(matrix){
        console.log(matrix.map(x => x.join(' ')).join('\n'));
    }

    function fillMatrixWthZeroes(rows, cols){
        let matrix =[];
        for (let row = 0; row < rows; row++) {
            matrix.push('0'.repeat(cols).split('').map(Number));
        }

        return matrix;
    }
}

orbitTask([5, 5, 2, 2]);