function isOddOrEven(n) {
    if(n - Math.floor(n) !== 0){
        console.log("invalid");
        return;
    }

    console.log(n % 2 === 0 ? "even" : "odd");
}

isOddOrEven(1.3);