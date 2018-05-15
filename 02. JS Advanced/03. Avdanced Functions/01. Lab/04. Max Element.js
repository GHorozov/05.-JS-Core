function largestElement(arr) {
    //I
    //return Number(arr.sort((a, b) => b - a).splice(0, 1));

    //II
    // let maxNumber = Number.NEGATIVE_INFINITY;
    // for (let n of arr) {
    //     if(maxNumber < n){
    //         maxNumber = n
    //     }
    // }
    //
    // return Number(maxNumber);

    //III
    //return Math.max(...arr);

    //IV
    return Math.max.apply('', arr);
}

console.log(largestElement(
    [10, 20, 5]
));
//
// largestElement(
//     [1, 44, 123, 33]
// );