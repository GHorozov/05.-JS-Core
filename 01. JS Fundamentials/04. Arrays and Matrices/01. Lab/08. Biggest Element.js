function biggestNumberInMatrix(matrix) {
    let biggestNum = Number.NEGATIVE_INFINITY;
    matrix.forEach(row => row.forEach(c => biggestNum = Math.max(biggestNum, c)));

    return biggestNum;
}

console.log(biggestNumberInMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));