function drawTriangleOfDollars(number) {
    let symbol = '$';

    for ( i = 1; i <= number; i++) {
        console.log(symbol.repeat(i));
    }
}

drawTriangleOfDollars(3);