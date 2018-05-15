function drawTriangleOfStars(n) {
    let symbol = '*';
    for (let i = 1; i <= n; i++) {
        console.log(symbol.repeat(i));
    }

    for (let i = n-1; i > 0; i--) {
        console.log(symbol.repeat(i));
    }
}

drawTriangleOfStars(5);
drawTriangleOfStars(1);
drawTriangleOfStars(10);