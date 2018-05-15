function calcCompauntInterest(numbers) {
    //P is the principal sum
    //i is the nominal interest rate
    //n is the compounding frequency
    //t is the overall length of time the interest is applied

    let P = numbers[0];
    let i = numbers[1] / 100; // to take interest rate express as fraction
    let n = 12 / numbers[2]; // devide 1 year to periods, frequency in 1 year
    let t = numbers[3] ;

    let FV = P * Math.pow(1 + (i / n), n*t);

    console.log(FV.toFixed(2));
}

calcCompauntInterest([1500, 4.3, 3, 6]);