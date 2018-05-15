function diagonalAttack(input) {
    let matrix = input.map(x => x.split(' ').map(Number));

    if(isDiagonalWithEqualSum(matrix) !== 0){
        let diagonalSumNumber = isDiagonalWithEqualSum(matrix);

        let d1 = 0;
        let d2 = matrix.length-1;

        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {

                if( `${row}+${col}` != `${row}+${d1}` && `${row}+${col}` != `${row}+${d2}`){
                    matrix[row][col] = diagonalSumNumber;
                }
            }
            d1++;
            d2--;
        }

        printMatrix(matrix);

    } else {
        printMatrix(matrix);
    }

    function isDiagonalWithEqualSum(matrix) {
        let diagonalOne = 0;
        let diagonalTwo = 0;
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                diagonalOne += matrix[row][col + row];
                diagonalTwo += matrix[row][matrix[row].length -1 - row];
             break;
            }
        }

        if(diagonalOne === diagonalTwo){
            return diagonalOne;
        }

        return 0;
    }

    function printMatrix(matrix) {
        let result = matrix.map(x => x.join(' ')).join('\n');

        console.log(result);
    }
}

let input =
    [
        '5 3 12 3 1',
        '11 4 23 2 5',
        '101 12 3 21 10',
        '1 4 5 2 2',
        '5 22 33 11 1'
    ];

//let input =
    [
        '1 1 1',
        '1 1 1',
        '1 1 0'
    ];



diagonalAttack(input);