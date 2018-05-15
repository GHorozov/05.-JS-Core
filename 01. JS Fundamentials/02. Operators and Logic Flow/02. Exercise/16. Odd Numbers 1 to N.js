function takeOddNumbers(number) {
    let arr = [];

    for ( i = 1; i <= number; i++) {
        if(i % 2 !== 0){
            arr.push(i);
        }
    }

    return arr.join('\n');
}


console.log(takeOddNumbers(5));
console.log(takeOddNumbers(4));
console.log(takeOddNumbers(7));
