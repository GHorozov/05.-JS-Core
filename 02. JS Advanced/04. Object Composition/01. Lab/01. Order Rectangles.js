function orderRectangles(matrix) {
    for (let row = 0; row < matrix.length; row++) {
        matrix[row] = {
            width: matrix[row][0],
            height: matrix[row][1],
            area: function () {
                return this.width * this.height;
            },
            compareTo: function (otherRect) {
                let diff = otherRect.area() - this.area();
                if(diff !== 0){
                    return diff; //first criteria
                }else {
                    return otherRect.width - this.width; //second criteria
                }
            }
        }
    }

    matrix.sort((a, b) => a.compareTo(b));
    return matrix;
}

console.log(orderRectangles([[10, 5], [5, 12]]));
console.log(orderRectangles([[10, 5], [3, 20], [5, 12]]));