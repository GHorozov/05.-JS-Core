function isPrime(n) {
    let isPrimeNumber = true;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if(n % i == 0){
            isPrimeNumber = false;
            break;
        }
    }

    return isPrimeNumber && (n > 1);
}

console.log(isPrime(-1))