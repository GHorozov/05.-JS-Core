function expedition(matrix1, matrix2, overlayCoordinates, start) {
    let steps = 1;
    rewriteMatrix(matrix1, matrix2, overlayCoordinates);

    //route
    let startRow = Number(start[0]);
    let startCol = Number(start[1]);
    let direction;
    while (true) {
        if (startRow + 1 < matrix1.length && matrix1[startRow + 1][startCol] === 0 && direction !== 'Up') {
            startRow++;
            direction = 'Down';
        }else if(startCol + 1 < matrix1[0].length && matrix1[startRow][startCol + 1] === 0 && direction !== 'Left'){
            startCol++;
            direction = 'Right';
        }else if(startRow  > 0 && matrix1[startRow - 1][startCol] === 0 && direction !== 'Down'){
            startRow--;
            direction = 'Up';
        }else  if(startCol  > 0 && matrix1[startRow][startCol - 1] === 0 && direction !== 'Right'){
            startCol--;
            direction = 'Left';
        }else{
            break;
        }

        steps++;
    }

    console.log(steps);
    defineQuadrantExit(matrix1, startRow, startCol);

    function rewriteMatrix(matrix1, matrix2, overlayCoordinates) {
        for (let coordinates of overlayCoordinates) {
            let row = Number(coordinates[0]);
            let col = Number(coordinates[1]);

            for (let i = 0; i < matrix2.length; i++) {
                if (i + row < matrix1.length) {
                    for (let j = 0; j < matrix2[0].length; j++) {
                        if (matrix1[i + row][j + col] !== undefined && matrix2[i][j] === 1) {
                            matrix1[i + row][j + col] = matrix1[i + row][j + col] === 0 ? 1 : 0;
                        }
                    }
                }
            }
        }
    }

    function defineQuadrantExit(matrix1, startRow, startCol) {

        if(startRow === 0){
            console.log('Top');
        }else if(startRow === matrix1.length-1){
            console.log('Bottom');
        }else if(startCol === 0){
            console.log('Left');
        }else if(startCol === matrix1[0].length-1){
            console.log('Right');
        } else if (startCol >= matrix1[0].length / 2 && startRow < matrix1.length / 2) {
            console.log("Dead end 1");
        } else if (startCol < matrix1[0].length / 2 && startRow < matrix1.length / 2) {
            console.log("Dead end 2");
        } else if (startCol < matrix1[0].length / 2 && startRow >= matrix1.length / 2) {
            console.log("Dead end 3");
        } else if (startCol >= matrix1[0].length / 2 && startRow >= matrix1.length / 2) {
            console.log("Dead end 4");
        }
    }
}


//Author solution
// function expedition(primary, secondary, targets, startingPoint) {
//     let steps = 1;
//     let primaryMatrixRows = primary.length;
//     let primaryMatrixCols = primary[0].length;
//     let secondaryMatrixRows = secondary.length;
//     let secondaryMatrixCols = secondary[0].length;
//
//     for (let target of targets) {
//         modifyPrimary(target);
//     }
//
//     let currentPosition = [startingPoint[0], startingPoint[1]];
//     let previousDirection;
//
//     while (true) {
//         if (currentPosition[0] + 1 < primaryMatrixRows && primary[currentPosition[0] + 1][currentPosition[1]] == 0 && previousDirection != "up") {
//             currentPosition = [currentPosition[0] + 1, currentPosition[1]];
//             previousDirection = "down";
//         } else if (currentPosition[1] + 1 < primaryMatrixCols && primary[currentPosition[0]][currentPosition[1] + 1] == 0 && previousDirection != "left") {
//             currentPosition = [currentPosition[0], currentPosition[1] + 1];
//             previousDirection = "right";
//         } else if (currentPosition[0] > 0 && primary[currentPosition[0] - 1][currentPosition[1]] == 0 && previousDirection != "down") {
//             currentPosition = [currentPosition[0] - 1, currentPosition[1]];
//             previousDirection = "up";
//         } else if (currentPosition[1] > 0 && primary[currentPosition[0]][currentPosition[1] - 1] == 0 && previousDirection != "right") {
//             currentPosition = [currentPosition[0], currentPosition[1] - 1];
//             previousDirection = "left";
//         } else {
//             break;
//         }
//         steps++;
//     }
//
//     console.log(steps);
//     definePosition(currentPosition);
//
//     function modifyPrimary(coordinates) {
//         let row = Number(coordinates[0]);
//         let col = Number(coordinates[1]);
//         for (let i = 0; i < secondaryMatrixRows; i++) {
//             if (i + row < primaryMatrixRows) {
//                 for (let j = 0; j < secondaryMatrixCols; j++) {
//                     if (primary[i + row][j + col] != undefined && secondary[i][j] == 1) {
//                         primary[i + row][j + col] = primary[i + row][j + col] == 0 ? 1 : 0;
//                     }
//                 }
//             }
//         }
//     }
//
//     function definePosition(currentPosition) {
//         let currentRow = currentPosition[0];
//         let currentCol = currentPosition[1];
//         if (currentRow == 0) {
//             console.log("Top");
//         } else if (currentRow == primaryMatrixRows - 1) {
//             console.log("Bottom");
//         } else if (currentCol == 0) {
//             console.log("Left");
//         } else if (currentCol == primaryMatrixCols - 1) {
//             console.log("Right");
//         } else if (currentRow < primaryMatrixRows / 2 && currentCol >= primaryMatrixCols / 2) {
//             console.log("Dead end 1");
//         } else if (currentRow < primaryMatrixRows / 2 && currentCol < primaryMatrixCols / 2) {
//             console.log("Dead end 2");
//         } else if (currentRow >= primaryMatrixRows / 2 && currentCol < primaryMatrixCols / 2) {
//             console.log("Dead end 3");
//         } else if (currentRow >= primaryMatrixRows / 2 && currentCol >= primaryMatrixCols / 2) {
//             console.log("Dead end 4");
//         }
//     }
// }

expedition(
   [
       [1, 1],
       [1, 1],
       [0, 0],
       [1, 1],
       [1, 1],
       [1, 1]
   ],
    [
        [0, 0],
        [0, 0]
    ],
    ['STOP'],
    [2, 1]
);


// expedition(
//     [
//         [1, 1, 0, 1, 1, 1, 1, 0],
//         [0, 1, 1, 1, 0, 0, 0, 1],
//         [1, 0, 0, 1, 0, 0, 0, 1],
//         [0, 0, 0, 1, 1, 0, 0, 1],
//         [1, 0, 0, 1, 1, 1, 1, 1],
//         [1, 0, 1, 1, 0, 1, 0, 0]
//     ],
//     [
//         [0, 1, 1],
//         [0, 1, 0],
//         [1, 1, 0]
//     ],
//     [
//         [1, 1],
//         [2, 3],
//         [5, 3]
//     ],
//     [0, 2]
// );

// expedition([[1, 1, 0, 1],
//         [0, 1, 1, 0],
//         [0, 0, 1, 0],
//         [1, 0, 1, 0]],
//     [[0, 0, 1, 0, 1],
//         [1, 0, 0, 1, 1],
//         [1, 0, 1, 1, 1],
//         [1, 0, 1, 0, 1]],
//     [[0, 0],
//         [2, 1],
//         [1, 0]],
//     [2, 0]
// );