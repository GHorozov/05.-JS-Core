function biggestNumber(numbers) {
    //return Math.max(numbers[0], numbers[1], numbers[2]); //first way
    return Math.max.apply(null, numbers); // second way
}

console.log(biggestNumber([5, -2, 7]));