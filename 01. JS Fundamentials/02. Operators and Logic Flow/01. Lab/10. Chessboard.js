function printChessBoard(n) {
    let result = '<div class="chessboard">\n';
    for (let i = 1; i <= n; i++) {
        result += '  <div>\n';
        for (let j = 1; j <= n; j++) {
            let color = (i + j) % 2 ? 'white' : 'black';
            result += `    <span class="${color}"></span>\n`;
        }
        result += ' </div>\n';
    }
    result += '</div>\n';

    return result;
}

console.log(printChessBoard(3));