function roundingNumbers(numbers) {
    //console.log(Number(numbers[0].toFixed(numbers[1]))); // work but judge don't like it

    let number = numbers[0];
    let precision = numbers[1];

    var factor = Math.pow(10, precision); // make precision with this line
    console.log((Math.round(number * factor) / factor)); // if precisions is 1000 result is number * 1000 / 1000
}

roundingNumbers([3.1415926535897932384626433832795, 2]);
roundingNumbers([10.5, 3]);