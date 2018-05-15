function drawSquare(n) {
    let rowCount = n%2 === 0 ? n-1 : n;
    let colCount = 2*n-1;
    let middle = Math.ceil(n/2);

    let plus ='+';
    let dash = '-';
    let pike = '|';
    let space = ' ';


    let result = '';
    for (let i = 1; i <= rowCount; i++) {
        for (let j = 1; j <= colCount; j++) {
            if(i == 1 || i == middle || i == rowCount){
                result += (j == 1 || j == n || j == colCount)? plus : dash;
            }
            else{
                result += (j == 1 || j == n || j == colCount)? pike : space;
            }
        }
        result += '\n';
    }

    console.log(result);
}

drawSquare(6);