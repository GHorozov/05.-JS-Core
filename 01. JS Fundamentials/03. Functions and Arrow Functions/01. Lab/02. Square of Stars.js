function drawSquareOfStars(n = 5) {
    let symbol = '* ';

    // if(n == ''){
    //     drawSquareOfStars(5);
    // }

    for (let i = 1; i <= n; i++) {
        console.log(symbol.repeat(n));
    }
}

drawSquareOfStars(10 );