function matrixDiagonalSums(matrix) {
    let firstDiagonalSum = 0;
    let secondDisgonal = 0;

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            firstDiagonalSum += matrix[row][col+row];
            secondDisgonal += matrix[row][matrix[row].length-1 - row];
            break;
        }
    }

    console.log(`${firstDiagonalSum} ${secondDisgonal}`);
}


matrixDiagonalSums([[20, 40], [10, 60]]);
console.log('-'.repeat(100));
matrixDiagonalSums([[3, 5, 17], [-1, 7, 14], [1, -8, 89]]);
console.log('-'.repeat(100));
matrixDiagonalSums([[1,2,3], [2,2], [4,5,6,7,8,9]]);